<template>
    <div ref="echarts" class="echarts"></div>
</template>

<script>
import echarts from 'echarts'
import props from './props'
// import typeOption from './typeOption.js'

export default {
	name: 'line',
	mixins: [].concat(props),
	created () {
	},
	mounted () {
		// 直接传入数据，则自动初始化
		!this.getData && this.init()
	},
	methods: {
		init () {
			// 基于准备好的dom，初始化echarts实例
			// this.$refs.echarts
			// document.getElementById('echarts') || document.querySelect('.echarts') 这种方式，只能渲染出一个
			var myChart = echarts.init(this.$refs.echarts)
			let series = []
			if (!this.seriesData || this.seriesData.length === 0) {
				return false
			}
			Object.values(this.seriesData).forEach((item, key) => {
				let value = {
					name: this.xAxisData[key],
					type: 'line',
					areaStyle: {}, // 填充颜色
					data: Object.values(item)
				}
				series.push(value)
			})
			let option = {
				color: this.color,
				toolbox: this.toolbox,
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
			}

			// 可以直接传入echarts的配置项
			if (this.option) {
				option = this.Global.paramsInherit({
					params: this.option,
					defaultValue: option
				})
			}

			// 绘制图表
			myChart.setOption(option)
		}
	},
	watch: {
		seriesData (now, before) { // 监听数据变化，更新图表
			this.init()
		},
		time (date) { // 监听时间变化
			this.init()
		},
		option (now, before) { // 监听数据变化，更新图表
			this.init()
		},
	},
}
</script>

<style lang="scss" scoped>
.echarts {
	width: 100%;
	height: -webkit-fill-available;
}
</style>
