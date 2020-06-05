<template>
    <div ref="echarts" class="echarts"></div>
</template>

<script>
import echarts from 'echarts'
import props from './props'
// import typeOption from './typeOption.js'

export default {
	name: 'bar', // 柱状图
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
			let myChart = echarts.init(this.$refs.echarts)
			let option = {
				color: this.color,
				toolbox: this.toolbox,
				tooltip: {},
				xAxis: {
					axisTick: {
						alignWithLabel: {
							boundaryGap: true, // 让文字居中对齐刻度
						},
					},
					axisLabel: this.axisLabel, // 使文字倾斜，达到展示全部的文字
					data: this.xAxisData
				},
				yAxis: {
					// minInterval: 1, // y轴坐标值的差值如设置 10，则y轴展示 10 20 30 40 ...
				},
				grid: {
					// 组件离容器的距离（边距）
					left: 30,
					top: 30,
					bottom: 30,
					right: 15,
				},
				series: [{
					name: this.seriesName,
					type: 'bar',
					data: this.seriesData,
					itemStyle: {
						normal: {
							color: function (params) {
								// 注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
								var colorList = ['#1785FF', '#2FC25B', '#FACC14', '#223273', '#8A52D9', '#FF6642']
								return colorList[params.dataIndex]
							}
						}
					}
				}],
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
