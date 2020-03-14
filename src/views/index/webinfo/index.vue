<template>
    <div class="webinfo w">
		<div class="we-content clearfix">
			<my-echarts :txt="xAxisData" title="站点信息" type="line" :getDataFn="getData" :time="3" class="echarts fl" :axisLabel="{}"></my-echarts>
			<my-echarts class="min-echarts mt20 fl" :txt="barData.xAxisData" :data="barData.seriesData" :axisLabel="{}"></my-echarts>
			<my-echarts class="min-echarts mt20 fr" type="pie" :txt="article.xAxisData" :data="article.seriesData" :axisLabel="{}"></my-echarts>
			<my-echarts class="min-echarts mt20 fl" type="pie" :txt="comment.xAxisData" :data="comment.seriesData" :axisLabel="{}"></my-echarts>
		</div>
    </div>
</template>

<script>
import myEcharts from '@/components/function/myEcharts'

export default {
	name: 'webinfo',
	components: {
		myEcharts
	},
	data() {
		return {
			xAxisData: ['注册人数', '站点访问量', '文章发布量'],
			barData: {
				xAxisData: [],
				seriesData: []
			},
			article: {
				xAxisData: [],
				seriesData: []
			},
			comment: {
				xAxisData: [],
				seriesData: []
			}
		}
	},
	created() {
		this.articleSumReport()
	},
	methods: {
		async getData(params) {
			const postData = {
				startTime: params.date[0],
				endTime: params.date[1],
				file: 1
			}
			try {
				const data = await this.$http.post('echarts/web/info', postData)
				return Object.values(data)
			} catch (e) {
				return []
			}
		},
		async articleSumReport() {
			try {
				const { title, data } =  await this.$http.get('echarts/article/sum/report')
				this.barData.xAxisData = title
				this.barData.seriesData = data
				this.article.xAxisData = [title[2], title[3]]
				this.article.seriesData = [data[2], data[3]]
				this.comment.xAxisData = [title[4], title[5]]
				this.comment.seriesData = [data[4], data[5]]
			} catch (e) {
				console.log(e)
			}
		}
	},
}
</script>

<style lang="scss" scoped>
.webinfo {
	padding: 40px;
	background-color: #fff;

	.we-content {
		width: 1200px;
		margin: 40px auto;

		.echarts-box {
			height: 500px;
			background-color: #fff;
		}

		.min-echarts {
			width: 48%;
			height: 300px;
		}
	}
}

@media (max-device-width: 435px) {
    .webinfo {
		padding: 0;

		.we-content {
			width: 100%;

			.echarts-box {
				height: 350px;
			}
		}
	}
}
</style>
