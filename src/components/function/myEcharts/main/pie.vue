<template>
    <div ref="echarts" class="echarts"></div>
</template>

<script>
import echarts from 'echarts'
import props from './props'
// import typeOption from './typeOption.js'

export default {
	name: 'pie', // 饼状图
	mixins: [].concat(props),
	props: {
		seriesCenter: { // 控制饼状图的位置
			type: Array,
			default: function() {
				return ['50%', '60%']
			}
		},
	},
	mounted() {
		// 直接传入数据，则自动初始化
		!this.getData && this.init()
	},
	methods: {
		init() {
			// 基于准备好的dom，初始化echarts实例
			// this.$refs.echarts
			// document.getElementById('echarts') || document.querySelect('.echarts') 这种方式，只能渲染出一个
			let myChart = echarts.init(this.$refs.echarts)
			let option = {
				color: this.color,
				toolbox: this.toolbox,
				title: {
					text: '',
					left: 'center'
				},
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)',
					position: function (pos, params, dom, rect, size) {
						// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
						var obj = { top: 30 }
						obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
						return obj
					}
				},
				legend: {
					orient: 'horizontal',
					top: 'top'
				},
				series: [
					{
						name: this.seriesName,
						type: 'pie',
						radius: '55%',
						center: this.seriesCenter, // 可以控制饼图的位置，[x, y]
						data: this.seriesData.map((item, index) => {
							return {
								value: item,
								name: this.xAxisData[index]
							}
						}),
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}
				]
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
		},
	},
	watch: {
		seriesData(now, before) { // 监听数据变化，更新图表
			this.init()
		},
		time(date) { // 监听时间变化
			this.init()
		},
		option(now, before) { // 监听数据变化，更新图表
			this.init()
		},
	},
}
</script>

<style lang="scss" scoped>
.echarts {
	width: 100%;
	height: 100%;
}
</style>
