<template>
    <div class="content-left" @scroll.passive="scroll($event)" ref="contentLeft">
        <div class="cl_box" v-for="data in article" :key="data.id">
            <div class="clb_top clearfix">
				<div class="clbt_left">
					<template v-if="isExistence(data) < 3">
						<!-- <img src="../../../../assets/index/index/images/text02.jpg" alt=""> -->
					</template>
					<template v-else-if="isExistence(data) === 4">
						<my-echarts class="pd0 pie" :txt="xAxisData" :title="data.title" :data="data | seriesData" type="pie" :seriesCenter="['50%', '70%']"></my-echarts>
					</template>
					<template v-else>
						<my-echarts class="bar" :txt="xAxisData" :title="data.title" :data="data | seriesData"></my-echarts>
					</template>
				</div>
                <div class="clbt_right">
                    <h2>{{ data.title }}</h2>
                    <p>
                        {{ data.synopsis }}
                    </p>
                </div>
            </div>
            <div class="clb_bottom clearfix">
                <div class="clbb_left clearfix">
                    <my-icon class="category-icon" identification="icon"></my-icon>
                    <span>{{ data.classname }}</span>
                    <my-icon class="shengri-copy" identification="shengri-copy"></my-icon>
                    <span>{{ data.createtime | formatDate('YYYY-MM-DD')}}</span>
                    <my-icon class="liulan fs17" identification="liulan"></my-icon>
                    <a>浏览({{ data.read }})</a>
                </div>
                <span @click="clickRead(data.id)">阅读全文</span>
            </div>
        </div>
        <div v-show="loading" class="loading"></div>
        <div v-if="pageData.tips" class="tips">{{ pageData.tips }}</div>
    </div>
</template>

<script>
// 导入 myEcharts
import myEcharts from '@/components/function/myEcharts/index'

const fieldList = ['read', 'praise', 'reprint', 'comment_number', 'reward']

export default {
	name: 'articleList',
	components: {
		myEcharts,
	},
	props: {
		data: {
			type: Array,
			default: function() {
				return []
			}
		},
		searchData: {
			type: String,
			default: ''
		}
	},
	filters: {
		seriesData(row) {
			return fieldList.map((item) => {
				return row[item]
			})
		},
	},
	data() {
		return {
			article: [], // 文章数据
			xAxisData: ['阅读数', '点赞数', '转载数', '评论数', '打赏数'],
			loading: false,
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
		this.searchFn() // 加载数据
	},
	methods: {
		// 判断是否值全部存在
		isExistence(row) {
			let Identification = []
			fieldList.forEach((item) => {
				row[item] && Identification.push(row[item])
			})

			return Identification.length
		},
		// 页面滚到底部(懒加载)
		async scroll($event) {
			if (!$event) return false
			let ele = $event.target
			// clientHeight 可见区域的高度（不加边线）
			// scrollTop 滚动条卷上去的高度
			// scrollHeight 元素的总高度
			if (ele.scrollTop + ele.clientHeight >= ele.scrollHeight && this.pageData.lock) { // 判断是否置底
				this.pageData.lock = false // 关闭
				this.loading = true
				const {
					data
				} = await this.$http.post(`paging`, this.pageData)
				if (data.getData.status === 200) {
					for (var i = 0; i < data.getData.data.length; i++) {
						this.article.push(data.getData.data[i]) // 将获取到的文章数据赋值给 vue
					}
					this.pageData.currentPage += 1 // 加一页
					this.pageData.lock = true // 开启
				} else {
					this.pageData.tips = data.getData.msg // 当没有数据时, 添加一条提示信息
				}
				this.loading = false
			}
		},
		// 搜索内容
		async searchFn() {
			this.pageData.lock = false
			this.pageData.currentPage = 1
			const { data } = await this.$http.post('searchData', {
				searchData: this.searchData
			})
			if (data.getData.status === 200) {
				this.article = data.getData.data // 显示内容
				// 给出提示
				this.searchData && this.$message({
					message: `搜索到与 "${this.searchData}" 相关的数据共有 ${data.getNumber} 条!`,
					type: 'success'
				})
			} else {
				this.$emit('noData', data.getData.msg)
			}
			this.pageData.lock = true
			this.$refs.contentLeft.scrollTop = 0 // 重置内容元素向上卷曲的距离
			this.pageData.currentPage = 2 // 重置当前页
			this.pageData.tips = '' // 重置提示
			this.pageData.classname = '' // 重置分类
		},
		async clickRead(id) { // 点击阅读全文时执行
			// 跳转文章详情页
			this.$router.push({
				path: `/articleDetails/${id}`
			})
			// 记录文章阅读数
			await this.$http.get(`recordReadingNumber/${id}`)
		},
	},
	watch: {
		// 更新数据
		data(now, old) {
			if (now && now.length > 0) {
				this.article = now
			}
		},
		searchData(now, old) {
			this.pageData.currentPage = 1
			this.pageData.searchData = now
			this.searchFn()
		}
	},
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/loading/a.scss";
@import '@/assets/css/color/index.scss'; // 使用方法

.content-left {
	float: left;
	width: 8.4rem;
	/* min-height: 10rem; */
	height: 7rem;
	overflow-y: scroll;
	overflow-x: auto;

	&::-webkit-scrollbar {
		display: none;
	}

	.cl_box {
		width: 8rem;
		height: 2rem;
		padding: 0.2rem;
		margin-bottom: 0.1rem;
		border-radius: 0.05rem;
		background-color: #fff;

		.clb_top {
			width: 100%;
			height: 1.6rem;
			margin-bottom: 0.2rem;

			.clbt_left {
				float: left;
				width: 2.7rem;
				height: 1.7rem;
				border-radius: 5px;
				background-size: cover;
				background-image: url('../../../../assets/index/index/images/text02.jpg');

				.echarts-box {
					background-color: #fff;
				}
			}

			.clbt_right {
				float: right;
				width: 5rem;
				height: 100%;

				p {
					color: #888;
					margin-bottom: 0.1rem;
				}
			}
		}

		.clb_bottom {
			.clbb_left {
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

			>span {
				float: right;
				color: #096;
				cursor: pointer;
			}
		}
	}

	.tips {
		padding: 0.1rem;
		color: #26b3ae;
		text-align: center;
		border-radius: 0.05rem;
		background-color: #e6e6e6;
	}
}

@media (max-device-width: 435px) {
	.content-left {
		width: 100%;

		.cl_box {
			width: 100%;
			height: auto;
			padding: .1rem;
			margin-bottom: 0;
			position: relative;
			box-sizing: border-box;

			&::before {
				content: "";
				height: 1px;
				left: 0;
				bottom: 0;
				width: 100%;
				display: block;
				position: absolute;
				background-color: #ddd;
			}

			.clb_top {
				height: auto;
				margin-bottom: .1rem;

				.clbt_left {
					width: 2.1rem;
					height: 1rem;
					float: left;
					max-width: 51%;
					margin-right: 10px;

					.echarts-box {
						display: none;
					}
				}

				.clbt_right {
					float: left;
					width: auto;
					max-width: 46%;

					h2 {
						margin: .05rem 0;
                        font-size: .16rem;
						font-weight: 4rem;
                        line-height: .22rem;
                    }

                    p {
                        font-size: .12rem;
                        color: $secondary;
                    }
				}
			}

			.clb_bottom {
				line-height: .2rem;

				.clbb_left {
					>span,>svg {
						float: left;
						color: $main-font;
					}

					>span,>a {
						margin: 0 .08rem 0 .04rem;
						max-width: 1rem;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					.category-icon {
						font-size: .2rem;
					}

					.shengri-copy {
						font-size: .17rem;
					}

					.liulan {
						margin-top: .02rem;
						font-size: .17rem;
					}
				}

				span {
					color: $main-font;
					font-size: .12rem;
				}
			}
		}

		.tips {
			border-radius: 0;
		}
	}
}
</style>
