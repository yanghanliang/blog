<template>
    <div ref="echarts" class="echarts"></div>
</template>

<script>
import echarts from 'echarts'
import props from './props'
// import typeOption from './typeOption.js'

export default {
	name: 'myEcharts',
	mixins: [].concat(props),
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
					data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
				},
				yAxis: {
					// minInterval: 1, // y轴坐标值的差值如设置 10，则y轴展示 10 20 30 40 ...
				},
				grid: {
					// 组件离容器的距离（边距）
					left: 30,
					top: 30,
					bottom: 30,
					right: 10,
				},
				series: [{
					name: '销量',
					type: 'bar',
					data: [5, 20, 36, 10, 10, 20]
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
