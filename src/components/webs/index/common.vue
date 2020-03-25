<template>
    <div class="common-box">
        <el-input placeholder="请输入您要搜索的内容" v-model="search" :autofocus="true" @input="searchInput"
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
                <category @getData="setCatgoryData"></category>
            </div>
            <article-list ref="contentLeft" :data="article" :classname="className" :searchData="searchData" @noData="jump"></article-list>
        </div>
    </div>
</template>

<script>
// 导入文章列表
import articleList from '@/components/webs/index/article/list'
// 导入 category
import category from '@/components/webs/public/category'

export default {
	name: 'common',
	components: {
		articleList,
		category,
	},
	data() {
		return {
			personalInformation: {}, // 个人信息数据
			lock: true, // 锁,为了手动防止删除搜索时,跳转到搜索页面
			searchData: '', // 传入组件中的搜索内容
			article: [],
			search: '',
			className: ''
		}
	},
	created() {
		this.getUserInfo()
		this.tips() // 友情提示
	},
	methods: {
		// 获取用户信息
		async getUserInfo() {
			try {
				this.personalInformation = await this.$http.get('user/details')
			} catch (e) {
				console.log(e)
			}
		},
		// 输入搜索
		searchInput() {
			// 为了不让用户输入字母数字时,没有数据时,出现多次跳转搜索页面
			if (!/[0-9a-zA-Z]+/.test(this.search)) { // 如果输入有数字字母则不执行
				this.searchData = this.search
			}
		},
		// 没有想要的数据时跳转到百度搜索
		jump(msg) {
			if (this.lock) {
				this.$message({
					message: msg + '即将跳转百度搜索!',
					type: 'warrning',
					showClose: true,
					customClass: 'shuai',
					data: this.searchData, // 把数据存储在这
					duration: 4000, // 不会自动关闭 4s 可以，超过4秒会被浏览器拦截
					onClose: function (message) { // 参数为message实例,所以想要获取数据,则必须将数据以以上方式存储
						window.open(`https://www.baidu.com/s?wd=${message.data}`, '_blank')
					}
				})

				// 实现取消跳转
				let message = document.querySelector('.shuai')
				document.querySelector('.shuai .el-icon-close').remove()
				let icon = document.createElement('i')
				icon.className = 'el-message__closeBtn el-icon-close'
				message.appendChild(icon)

				icon.onclick = function() {
					document.querySelector('.el-message').remove()
				}
			}
		},
		// 回车搜索
		searchEnter() {
			this.lock = true // 开启锁
			this.searchData = this.search
		},
		tips() {
			const h = this.$createElement
			this.$notify({
				offset: 100,
				duration: 3000,
				title: '本站状态',
				message: h('i', { style: 'color: teal' }, '目前此网站正在持续更新中，或许您下一次打开就会不一样哦~')
			})
		},
		setCatgoryData(data) {
			this.article = data.getData.data
			this.className = data.className // 重置分类
			this.$refs.contentLeft.scrollTop = 0 // 重置内容元素向上卷曲的距离
			// 给出提示
			this.$message({
				message: `搜索到与 "${data.className}" 相关的数据共有 ${data.getNumber} 条!`,
				type: 'success'
			})
		}
	},
}

</script>

<style lang="scss" scoped>
.fs17 {
	font-size: 17px;
}

.common-box {
	margin-bottom: 47px;
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

.echarts-box {
	width: 270px;
	height: 170px;

	&.bar {
		padding: 0 10px 10px;
	}

	&.pie {
		padding-top: 5px !important;
	}
}

.content {
    width: 12rem;
    margin: 0 auto;

	.content_right {
		float: right;
		width: 3.36rem;

		.synopsis {
			position: relative;
			background-color: #ffffff;

			.s_bg {
				width: 100%;
				margin-bottom: 0.3rem;
			}

			.s_head_portrait {
				top: 0;
				left: 50%;
				width: 1.03rem;
				height: 1.03rem;
				border-radius: 50%;
				position: absolute;
				transform: translate(-50%, -50%);
				box-shadow: 2px 4px 7px 0px #404040;
			}

			.s_content {
				text-align: center;

				h3 {
					font-weight: normal;
					text-shadow: -0.01rem -0.01rem white, 0.01rem 0.01rem #333;
				}

				p {
					color: #888;
					line-height: 0.26rem;
					padding: 0.1rem 0.3rem;
				}
			}
		}
	}
}
</style>
