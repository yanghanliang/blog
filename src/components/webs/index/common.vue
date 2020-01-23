<template>
    <div class="common">
        <el-input placeholder="请输入您要搜索的内容" v-model="pageData.searchData" :autofocus="true" @input="searchInput"
            @keyup.enter.native="searchEnter" clearable class="search">
        </el-input>

        <div class="content clearfix">
            <div class="content_right">
                <div class="synopsis">
                    <!-- s_bg 背景 -->
                    <img class="s_bg" src="../../../assets/index/index/images/banner.png" alt="背景墙的图片">
                    <img class="s_head_portrait" src="../../../assets/index/index/images/avatar.jpg" alt="头像">
                    <div class="s_content">
                        <h2>{{ personalInformation.alias }} | {{ personalInformation.name }}</h2>
                        <h3>- {{ personalInformation.occupation }} -</h3>
                        <p>{{ personalInformation.synopsis }}</p>
                    </div>
                </div>
                <category></category>
            </div>
            <div class="content_left" ref="content_left">
                <div class="cl_box" v-for="data in article" :key="data.id">
                    <div class="clb_top clearfix">
                        <img src="../../../assets/index/index/images/text02.jpg" alt="">
                        <div class="clbt_right">
                            <h2>{{ data.title }}</h2>
                            <p>
                                {{ data.synopsis }}
                            </p>
                        </div>
                    </div>
                    <div class="clb_bottom clearfix">
                        <div class="clbb_left">
							<my-icon class="fs17" identification="icon"></my-icon>
                            <span>{{ data.classname }}</span>
							<my-icon class="shengri-copy" identification="shengri-copy"></my-icon>
                            <span>{{ data.createtime | formatDate('YYYY-MM-DD')}}</span>
							<my-icon class="liulan fs17" identification="liulan"></my-icon>
                            <a>浏览({{ data.read }})</a>
                        </div>
                        <span @click="clickRead(data.id)">阅读全文</span>
                    </div>
                </div>
                <div v-if="pageData.tips !== ''" class="tips">{{ pageData.tips }}</div>
                <div v-else class="loading"></div>
            </div>
        </div>
    </div>
</template>

<script>
// 导入 category
import category from '@/components/webs/public/category'

export default {
	name: 'common',
	components: {
		category
	},
	data() {
		return {
			article: [], // 文章数据
			personalInformation: {}, // 个人信息数据
			lock: true, // 锁,为了手动防止删除搜索时,跳转到搜索页面
			pageData: {
				currentPage: 2, // 当前页（由于默认第一次获取5条数据，所以从5开始
				pageSize: 5, // 每页条数
				orderBy: 'descending', // 排序方式
				lock: true, // 锁,为了防止多次请求，得到响应后再开启请求
				tips: '', // 提示
				searchData: '' // 搜索内容
			}
		}
	},
	created() {
		this.loadData() // 加载数据
		this.tips() // 友情提示
	},
	mounted() {
		this.scroll()
	},
	computed: { // 配合 switch 监听对象中某一特定值
		searchData() {
			return this.pageData.searchData
		}
	},
	methods: {
		async loadData() { // 加载数据
			const {
				data
			} = await this.$http.get('index') // 发送请求,获取数据
			this.article = data.article // 将获取到的文章数据赋值给 vue
			this.personalInformation = data.personalInformation // 将获取到的个人信息数据赋值给 vue
		},
		async searchFn() { // 搜索内容
			const {
				data
			} = await this.$http.post('searchData', {
				searchData: this.pageData.searchData
			})
			if (data.getData.status === 200) {
				this.article = data.getData.data // 显示内容
				// 给出提示
				this.$message({
					message: `搜索到与 "${this.pageData.searchData}" 相关的数据共有 ${data.getNumber} 条!`,
					type: 'success'
				})
			} else if (this.lock) {
				this.lock = false // 关闭锁
				// 给出提示
				this.$message({
					message: data.getData.msg + '即将跳转百度搜索!',
					type: 'warrning',
					data: this.pageData.searchData, // 把数据存储在这
					duration: 3000, // 缩短时间，提高用户体验
					onClose: function (message) { // 参数为message实例,所以想要获取数据,则必须将数据以以上方式存储
						window.open(`https://www.baidu.com/s?wd=${message.data}`, '_blank')
					}
				})
			}
			this.$refs.content_left.scrollTop = 0 // 重置内容元素向上卷曲的距离
			this.pageData.currentPage = 2 // 重置当前页
			this.pageData.tips = '' // 重置提示
		},
		searchInput() { // 输入搜索hui
			// 为了不让用户输入字母数字时,没有数据时,出现多次跳转搜索页面
			if (!/[0-9a-zA-Z]+/.test(this.pageData.searchData)) { // 如果输入有数字字母则不执行
				this.searchFn() // 搜索内容
			}
		},
		searchEnter() { // 回车搜索
			this.lock = true // 关闭锁
			this.searchFn() // 搜索内容
		},
		scroll() { // 页面滚到底部(懒加载)
			const ele = this.$refs.content_left // 获取左边容器
			const that = this // 保存 this
			ele.onscroll = async function () {
				// clientHeight 可见区域的高度（不加边线）
				// scrollTop 滚动条卷上去的高度
				// scrollHeight 元素的总高度
				if (this.scrollTop + this.clientHeight >= this.scrollHeight && that.pageData
					.lock) { // 判断是否置底
					that.pageData.lock = false // 关闭
					const {
						data
					} = await that.$http.post(`paging`, that.pageData)
					if (data.getData.status === 200) {
						for (var i = 0; i < data.getData.data.length; i++) {
							that.article.push(data.getData.data[i]) // 将获取到的文章数据赋值给 vue
						}
						that.pageData.currentPage += 1 // 加一页
						that.pageData.lock = true // 开启
					} else {
						that.pageData.tips = data.getData.msg // 当没有数据时, 添加一条提示信息
					}
				}
			}
		},
		async clickRead(id) { // 点击阅读全文时执行
			// 跳转文章详情页
			this.$router.push({
				path: `/articleDetails/${id}`
			})
			// 记录文章阅读数
			await this.$http.get(`recordReadingNumber/${id}`)
		},
		tips() {
			this.$message({
				message: '目前此网站正在建设中~'
			})
		}
	},
	watch: {
		searchData: function (newQuestion, oldQuestion) { // 配合计算属性,监听对象中特定的值
			this.pageData.lock = true
		}
	}
}

</script>

<style lang="scss" scoped>
@import "@/assets/css/loading/a.scss";

.fs17 {
	font-size: 17px;
}

.common {
    padding-bottom: 90px;
}

/* search-start */
.search {
    left: 50%;
    width: 4rem;
    height: 0.4rem;
    margin: 0.2rem auto;
    transform: translateX(-50%);
}

.search>>>input {
    border-radius: 1.2rem;
}

/* search-end */

/* content-start */
.content {
    width: 12rem;
    margin: 0 auto;
}

/* content_left-start */
.content_left {
    float: left;
    width: 8.4rem;
    /* min-height: 10rem; */
    height: 7rem;
    overflow-y: scroll;
}

.content_left::-webkit-scrollbar {
    display: none;
}

/* cl_box-start */
.content_left .cl_box {
    width: 8rem;
    height: 2rem;
    padding: 0.2rem;
    margin-bottom: 0.1rem;
    border-radius: 0.05rem;
    background-color: #fff;
}

/* clb_top-start */
.content_left .cl_box .clb_top {
    width: 100%;
    height: 1.6rem;
    margin-bottom: 0.2rem;
}

.cl_box .clb_top>img {
    float: left;
    width: 2.8rem;
    height: 1.6rem;
    border-radius: 0.05rem;
}

.cl_box .clb_top .clbt_right {
    float: right;
    width: 5rem;
    height: 100%;
}

.clb_top .clbt_right p {
    color: #888;
    margin-bottom: 0.1rem;
}

/* clb_top-end */

/* clb_bottom-start */
.cl_box .clb_bottom .clbb_left {
	float: left;

	span {
		color: #096;
		margin-right: 10px;
	}

	.shengri-copy {
		vertical-align: initial;
	}

	.liulan {
		vertical-align: bottom;
	}
}

/* .cl_box .clb_bottom>a {
float: right;
} */
.cl_box .clb_bottom>span {
    float: right;
    color: #096;
    cursor: pointer;
}

/* clb_bottom-end */
/* cl_box-end */
.content_left .tips {
    padding: 0.1rem;
    color: #26b3ae;
    text-align: center;
    border-radius: 0.05rem;
    background-color: #e6e6e6;
}

/* content_left-end */

/* content_right-start */
.content_right {
    float: right;
    width: 3.36rem;
}

/* synopsis-start */
.content_right .synopsis {
    position: relative;
    background-color: #ffffff;
}

.content_right .synopsis .s_bg {
    width: 100%;
    margin-bottom: 0.3rem;
}

.content_right .synopsis .s_head_portrait {
    top: 0;
    left: 50%;
    width: 1.03rem;
    height: 1.03rem;
    border-radius: 50%;
    position: absolute;
	transform: translate(-50%, -50%);
	box-shadow: 2px 4px 7px 0px #404040;
}

.content_right .synopsis .s_content {
    text-align: center;
}

.synopsis .s_content h3 {
    font-weight: normal;
    text-shadow: -0.01rem -0.01rem white, 0.01rem 0.01rem #333;
}

.synopsis .s_content p {
    color: #888;
    line-height: 0.26rem;
    padding: 0.1rem 0.3rem;
}

/* synopsis-end */
/* content_right-end */
/* content-end */

</style>
