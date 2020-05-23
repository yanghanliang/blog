<template>
	<div :class="['echarts-box', { 'pd20': !time }]" :style="style" ref="echartsBox">
		<template v-if="time">
			<div class="eb-header clearfix">
				<span class="ebh-title">{{ title }}</span>
				<my-data @dateChange="dateChange" :dateType="time"></my-data>
			</div>
			<div class="line"></div>
		</template>
		<template v-if="style">
			<component class="eb-content" :is="currentComponent"
				:option="option"
				:xAxisData="xAxisData"
				:seriesData="seriesData"
				:seriesName="title"
				:axisLabel="axisLabel"
				:date="date"
				:seriesCenter="seriesCenter"
				:toolbox="toolbox"
				:color="color"
				>
			</component>
			<!-- <my-bar class="eb-content" v-if="type === 'bar'" :option="option" :xAxisData="txt" :seriesData="data" :seriesName="title" :axisLabel="axisLabel"></my-bar>
			<my-pie class="eb-content" v-else-if="type === 'pie'" :xAxisData="txt" :seriesData="data" :seriesName="title" :seriesCenter="seriesCenter"></my-pie>
			<my-line class="eb-content" v-else-if="type === 'line'" :xAxisData="txt" :seriesData="data" :date="date"></my-line> -->
		</template>
	</div>
</template>

<script>
import myData from '@/components/function/date/index'
import myLine from '@/components/function/myEcharts/main/line'
import myBar from '@/components/function/myEcharts/main/bar'
import myPie from '@/components/function/myEcharts/main/pie'

export default {
	name: 'myEcharts',
	props: {
		type: {
			type: String,
			default: 'bar'
		},
		title: {
			type: String,
			default: '标题'
		},
		txt: {
			type: Array,
		},
		data: {
			type: Array,
		},
		axisLabel: {
			type: Object,
			default: function () {
				return {}
			}
		},
		time: {
			type: Number,
		},
		getDataFn: {
			type: Function,
			default: null
		},
		seriesCenter: { // 控制饼状图的位置
			type: Array,
			default: function () {
				return ['50%', '60%']
			}
		},
		// 为了更好的适配，宽高需要带单位
		width: {
			type: String,
			default: '100%'
		},
		height: {
			type: String,
		},
		defaultHeight: {
			type: Number,
			default: 400
		},
		option: {
			type: Object
		},
		// 工具栏
		toolbox: {
			type: Object,
			default: function () {
				return {
					feature: {
						dataView: {}, // 数据视图
						saveAsImage: { // 可点击下载为图片
							pixelRatio: 2
						}
					}
				}
			}
		},
		// 主题颜色
		color: {
			type: Array,
			default: function () {
				return ['#1785FF', '#2FC25B', '#FACC14', '#223273', '#8A52D9', '#FF6642']
			}
		},
	},
	components: {
		myBar,
		myPie,
		myData,
		myLine
	},
	data () {
		return {
			typeList: [
				{
					type: 'pie',
					name: 'myPie'
				},
				{
					type: 'bar',
					name: 'myBar'
				}
			],
			date: [],
			style: '',
			show: false,
			fnGetData: [], // 调用方法获取的数据
		}
	},
	computed: {
		currentComponent () {
			const typeList = [
				{
					type: 'pie',
					name: 'myPie'
				},
				{
					type: 'bar',
					name: 'myBar'
				},
				{
					type: 'line',
					name: 'myLine'
				}
			]

			for (let i = 0, length = typeList.length; i < length; i++) {
				let item = typeList[i]
				if (item.type === this.type) {
					return item.name
				}
			}
		},
		seriesData () {
			if (this.getDataFn) {
				return this.fnGetData
			} else {
				if (this.data) {
					return this.data
				} else {
					if (this.type === 'bar') {
						return [5, 20, 36, 10, 10, 20]
					} else if (this.type === 'line') {
						return [
							{
								'2020-03-01': 0,
								'2020-03-02': 0,
								'2020-03-03': 0,
								'2020-03-04': 20,
								'2020-03-05': 0,
								'2020-03-06': 0,
								'2020-03-07': 0,
								'2020-03-08': 0,
								'2020-03-09': 0,
								'2020-03-10': 30,
								'2020-03-11': 0,
								'2020-03-12': 0,
								'2020-03-13': 0,
								'2020-03-14': 0,
								'2020-03-15': 5,
								'2020-03-16': 0,
								'2020-03-17': 0,
								'2020-03-18': 0,
							},
							{
								'2020-03-01': 0,
								'2020-03-02': 90,
								'2020-03-03': 0,
								'2020-03-04': 0,
								'2020-03-05': 0,
								'2020-03-06': 0,
								'2020-03-07': 50,
								'2020-03-08': 0,
								'2020-03-09': 0,
								'2020-03-10': 0,
								'2020-03-11': 0,
								'2020-03-12': 0,
								'2020-03-13': 0,
								'2020-03-14': 0,
								'2020-03-15': 0,
								'2020-03-16': 10,
								'2020-03-17': 0,
								'2020-03-18': 0,
							},
							{
								'2020-03-01': 0,
								'2020-03-02': 0,
								'2020-03-03': 0,
								'2020-03-04': 0,
								'2020-03-05': 60,
								'2020-03-06': 0,
								'2020-03-07': 0,
								'2020-03-08': 0,
								'2020-03-09': 0,
								'2020-03-10': 20,
								'2020-03-11': 0,
								'2020-03-12': 0,
								'2020-03-13': 0,
								'2020-03-14': 0,
								'2020-03-15': 0,
								'2020-03-16': 40,
								'2020-03-17': 0,
								'2020-03-18': 0,
							}
						]
					} else if (this.type === 'pie') {
						return [55, 80, 60]
					}
				}
			}
		},
		xAxisData () {
			if (this.txt) {
				return this.txt
			} else {
				if (this.type === 'bar') {
					return ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
				} else if (this.type === 'line') {
					return ['衬衫', '羊毛衫', '雪纺衫']
				} else if (this.type === 'pie') {
					return ['衬衫', '羊毛衫', '雪纺衫']
				}
			}
		}
	},
	mounted () {
		this.setBoxWH()
		if (!this.time && this.getDataFn) {
			this.fnGetData = this.getDataFn()
		}
	},
	methods: {
		// 时间改变时执行
		async dateChange (date) {
			if (this.getDataFn) {
				// 获取数据
				let params = {
					date: date
				}
				this.fnGetData = await this.getDataFn(params)
			}
		},
		// 设置容器宽高
		// 可以根据父元素的高度来判断
		// 如果父元素的高度小于100px或大于默认高度，则设置为默认高度
		// 如果父元素的高度大于100px且小于默认高度，则继承父元素的高度
		// 同时还可以传入高度，自定义高度,
		// 宽度默认100%，可自定义高度
		setBoxWH () {
			let height = ''
			let boxInfo = this.$refs.echartsBox.parentElement.getBoundingClientRect()
			if (this.height || boxInfo.height < 100 || boxInfo.height > this.defaultHeight) {
				height = this.defaultHeight + 'px'
			} else {
				height = boxInfo.height + 'px'
			}
			this.style = `width:${this.width}; height: ${height};`
		}
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/color/index.scss';

.echarts-box {
	width: 100%;
	height: 100%;
	border-radius: 5px;
	box-sizing: border-box;
	box-shadow: 0 0 17px -4px #a6a6a6;

	.eb-header {
		height: 38px;
		padding: 5px 10px;
		line-height: 38px;

		.ebh-title {
			float: left;
			font-size: 16px;
		}
	}

	.eb-header ~ .eb-content {
		padding: 10px;
		box-sizing: border-box;
		height: calc(100% - 38px - 10px);
	}

	.line {
		content: "";
		display: block;
		height: 1px;
		background-color: $border-color;
		box-shadow: 0 0 14px -8px black;
	}
}
</style>
