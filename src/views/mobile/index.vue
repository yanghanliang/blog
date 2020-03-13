<template>
    <div class="mobile">
        <div class="mo-top">
            <div class="mo-header">
                <el-input placeholder="请输入您要搜索的内容" v-model="pageData.searchData" :autofocus="true" @input="searchInput" clearable class="search">
                    <i slot="suffix" @click="searchclick" class="el-input__icon el-icon-search"></i>
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
        </div>
        <article-list ref="contentLeft" class="article-list" :data="article" :pageData="pageData" @noData="jump"></article-list>
    </div>
</template>

<script>
// 导入文章列表
import articleList from '@/components/webs/index/article/list'

export default {
	components: {
		articleList
	},
	data() {
		return {
			search: '',
			article: [],
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
	},
	methods: {
		// 输入搜索hui
		searchInput() {
			// 为了不让用户输入字母数字时,没有数据时,出现多次跳转搜索页面
			if (!/[0-9a-zA-Z]+/.test(this.pageData.searchData)) { // 如果输入有数字字母则不执行
				this.$refs.contentLeft.searchFn() // 搜索内容
			}
		},
		// 点击搜索
		searchclick() {
			this.lock = true // 开启锁
			this.$refs.contentLeft.searchFn() // 搜索内容
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

    .mo-top {
        width: 100%;
        z-index: 2;
        position: fixed;
        background-color: #fff;
        box-shadow: 0px 0px 10px -4px black;
    }

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

    .article-list {
        margin-top: 122px;
    }
}
</style>
