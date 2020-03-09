<template>
    <div ref="echarts" class="echarts"></div>
</template>

<script>
import echarts from 'echarts'
import props from './props'
// import typeOption from './typeOption.js'

export default {
	name: 'bar',
	mixins: [].concat(props),
	created() {
	},
	mounted() {
	},
	methods: {
		init() {
			// 基于准备好的dom，初始化echarts实例
			// this.$refs.echarts
			// document.getElementById('echarts') || document.querySelect('.echarts') 这种方式，只能渲染出一个
			var myChart = echarts.init(this.$refs.echarts)
			let series = []
			Object.values(this.seriesData).forEach((item, key) => {
				let value = {
					name: this.xAxisData[key],
					type: 'line',
					areaStyle: {}, // 填充颜色
					data: Object.values(item)
				}
				series.push(value)
			})
			// 绘制图表
			myChart.setOption({
				color: ['#1785FF', '#2FC25B', '#FACC14', '#223273', '#8A52D9', '#FF6642'],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						}
					}
				},
				legend: {
					// data: ['联盟广告', '视频广告', ]
				},
				toolbox: {
					feature: {
						saveAsImage: {}
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [{
					// type: 'category',
					// boundaryGap: false, // 会隐藏x轴显示，导致x显示不完整
					data: Object.keys(this.seriesData[0])
				}],
				yAxis: [{
					type: 'value'
				}],
				series: series
			})
		}
	},
	watch: {
		seriesData(now, before) { // 监听数据变化，更新图表
			this.init()
		},
		time(date) { // 监听时间变化
			this.init()
		}
	},
}
</script>

<style lang="scss" scoped>
.echarts {
	width: 100%;
	height: -webkit-fill-available;
}
</style>
