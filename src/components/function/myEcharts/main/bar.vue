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
		console.log('2222')
	},
	mounted() {
		this.init()
	},
	methods: {
		init() {
			// 基于准备好的dom，初始化echarts实例
			// this.$refs.echarts
			// document.getElementById('echarts') || document.querySelect('.echarts') 这种方式，只能渲染出一个
			var myChart = echarts.init(this.$refs.echarts)
			// 绘制图表
			myChart.setOption({
				color: ['#1785FF', '#2FC25B', '#FACC14', '#223273', '#8A52D9', '#FF6642'],
				tooltip: {},
				xAxis: {
					axisTick: {
						alignWithLabel: {
							boundaryGap: true, // 让文字居中对齐刻度
						},
					},
					axisLabel: { // 使文字倾斜，达到展示全部的值
						interval: 0, // 0 展示全部
						rotate: -30, // 倾斜角度
					},
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
							color: function(params) {
								// 注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
								var colorList = ['#1785FF', '#2FC25B', '#FACC14', '#223273', '#8A52D9', '#FF6642']
								return colorList[params.dataIndex]
							}
						}
					}
				}],
			})
		}
	},
}
</script>

<style lang="scss" scoped>
.echarts {
	width: 100%;
	height: 100%;
}
</style>
