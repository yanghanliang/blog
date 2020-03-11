<template>
    <div ref="echarts" class="echarts"></div>
</template>

<script>
import echarts from 'echarts'
// import typeOption from './typeOption.js'

export default {
	name: 'pie', // 饼状图
	props: {
		title: {
			type: String,
			default: '标题'
		},
		seriesData: {
			type: Array,
			default: function() {
				return [
					{value: 335, name: '直接访问'},
					{value: 310, name: '邮件营销'},
					{value: 274, name: '联盟广告'},
					{value: 235, name: '视频广告'},
					{value: 400, name: '搜索引擎'}
				]
			}
		},
		seriesCenter: { // 控制饼状图的位置
			type: Array,
			default: function() {
				return ['50%', '60%']
			}
		}
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
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: this.seriesCenter, // 可以控制饼图的位置，[x, y]
						data: this.seriesData,
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}
				]
			})
		},
	},
	watch: {
		seriesData(now, before) { // 监听数据变化，更新图表
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
