<template>
    <div class="webinfo">
		<div class="we-content">
			<my-echarts :txt="xAxisData" title="站点信息" type="line" :data="echartsData" :getDataFn="getData" :time="3" class="echarts" :axisLabel="{}"></my-echarts>
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
			xAxisData: ['注册人数', '站点访问量', '文章浏览量'],
			echartsData: []
		}
	},
	created() {
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
		}
	},
}
</script>

<style lang="scss" scoped>
.webinfo {
	padding: 40px;

	.we-content {
		width: 1200px;
		height: 500px;
		margin: 40px auto;

		.echarts-box {
			background-color: #fff;
		}
	}
}
</style>
