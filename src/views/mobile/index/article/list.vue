<template>
    <div class="mobile">
        <div class="mo-top">
            <div class="mo-header">
                <el-input placeholder="请输入您要搜索的内容" v-model="search" :autofocus="true" @input="searchInput" clearable class="search">
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
        <article-list class="article-list" :searchData="searchData" @noData="jump"></article-list>
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
			lock: false,
			searchData: '', // 传入组件中的搜索内容
			search: ''
		}
	},
	created() {
	},
	methods: {
		// 输入搜索
		searchInput() {
			this.lock = true // 关闭锁
			// 为了不让用户输入字母数字时,没有数据时,出现多次跳转搜索页面
			if (!/[0-9a-zA-Z]+/.test(this.search)) { // 如果输入有数字字母则不执行
				this.searchData = this.search
			}
		},
		// 点击搜索
		searchclick() {
			this.lock = true // 开启锁
			this.searchData = this.search
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
