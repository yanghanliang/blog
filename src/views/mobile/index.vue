<template>
    <div class="mobile">
        <div class="mo-header">
            <el-input placeholder="请输入您要搜索的内容" v-model="search" :autofocus="true" @input="searchInput"
                @keyup.enter.native="searchInput" clearable class="search">
            </el-input>
        </div>
        <div class="mo-nav clearfix line">
            <ul>
                <li><i class="my-icon-houtaiguanli"></i></li>
                <li>后台</li>
            </ul>
            <ul>
                <li><i class="my-icon-xiangmuxuqiu-"></i></li>
                <li>小需求</li>
            </ul>
            <ul>
                <li><i class="my-icon-yulanjianli"></i></li>
                <li>个人简历</li>
            </ul>
            <ul>
                <li><i class="my-icon-zhandianshujutongji"></i></li>
                <li>站点信息</li>
            </ul>
            <ul>
                <li><i class="my-icon-github"></i></li>
                <li>github</li>
            </ul>
        </div>
        <div class="mo-content" ref="content">
            <template v-for="(item) in articleList">
                <div class="mc-item line" :key="item.id">
                    <div class="mi-top clearfix">
                        <div class="mt-left">
                        </div>
                        <div class="mt-right">
                            <h2>{{ item.title }}</h2>
                            <p class="mt10">{{ synopsis }}</p>
                        </div>
                    </div>
                    <div class="mi-bottom clearfix">
                        <div class="mb-left clearfix">
                            <my-icon class="fs20 fl" identification="icon"></my-icon>
                            <span class="fl lh16">{{ item.classname }}</span>
                            <my-icon class="shengri-copy fs17 fl" identification="shengri-copy"></my-icon>
                            <span class="fl">{{ item.createtime | formatDate('YYYY-MM-DD') }}</span>
                            <my-icon class="liulan fs17 fl mt2" identification="liulan"></my-icon>
                            <a class="fl">浏览({{ item.read }})</a>
                        </div>
                        <span>阅读全文</span>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
	data() {
		return {
			search: '',
			articleList: [],
			pageData: {
				currentPage: 2, // 当前页（由于默认第一次获取5条数据，所以从5开始
				pageSize: 5, // 每页条数
				orderBy: 'descending', // 排序方式
				lock: true, // 锁,为了防止多次请求，得到响应后再开启请求
				tips: '', // 提示
				searchData: '', // 搜索内容
				classname: '', // 分类名称
			}
		}
	},
	created() {
		this.loadData()
	},
	methods: {
		searchInput() {

		},
		// 加载数据
		async loadData() {
			try {
				const { data } = await this.$http.get('index') // 发送请求,获取数据
				this.articleList = data.article // 将获取到的文章数据赋值给 vue
			} catch (e) {
				console.log(e)
			}
		},
		scroll() { // 页面滚到底部(懒加载)
			const ele = this.$refs.content // 获取左边容器
			const that = this // 保存 this
			ele.onscroll = async function () {
				// clientHeight 可见区域的高度（不加边线）
				// scrollTop 滚动条卷上去的高度
				// scrollHeight 元素的总高度
				// 判断是否置底
				if (this.scrollTop + this.clientHeight >= this.scrollHeight && that.pageData.lock) {
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
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/color/index.scss'; // 使用方法

div {
    font-size: 12px;
}

.fs20 {
    font-size: 20px;
}

.fs17 {
    font-size: 17px;
}

.lh16 {
    line-height: 16px;
}

.mt2 {
    margin-top: 2px;
}

.mobile {
    min-height: 100%;
    background-color: #fff;

    .mo-header {
        height: 44px;
        line-height: 44px;
        text-align: center;

        .search {
            width: 80%;
            margin: 0 auto;

            >>> .el-input__inner {
                height: 30px;
                line-height: 30px;
                border-radius: 20px;
            }

            margin: 0 auto;
        }
    }

    .mo-nav {
        margin-top: 10px;
        padding-bottom: 10px;

        ul {
            width: 20%;
            float: left;
            text-align: center;

            li {
                &:nth-child(1) {
                    width: 42px;
                    height: 42px;
                    margin: 0 auto;
                    line-height: 42px;
                    border-radius: 50%;
                    box-shadow: 0 0 5px -2px black;

                    i {
                        font-size: 22px;
                        color: $theme-color2;
                    }

                    .my-icon-xiangmuxuqiu- {
                        font-size: 28px;
                    }

                    .my-icon-github {
                        font-size: 24px;
                    }
                }

                &:nth-child(2) {
                    font-size: 12px;
                }
            }
        }
    }

    .mo-content {
        margin-top: 10px;

        .mc-item {
            padding: 10px;
            position: relative;

            .mi-top {
                margin-bottom: 10px;

                .mt-left {
                    width: 210px;
                    height: 100px;
                    float: left;
                    margin-right: 10px;
                    border-radius: 5px;
                    background-size: cover;
                    background-image: url('../../assets/index/index/images/text02.jpg');
                }

                .mt-right {
                    float: left;

                    h2 {
                        line-height: 16px;
                        font-size: 16px;
                        margin: 5px 0;
                    }

                    p {
                        font-size: 12px;
                        color: $secondary;
                    }
                }
            }

            .mi-bottom {
                line-height: 20px;

                .mb-left {
                    float: left;
                }

                >span {
                    float: right;
                    cursor: pointer;
                }

                span,a {
                    margin: 0 8px 0 4px;
                }

                a {
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
