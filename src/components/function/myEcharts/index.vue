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
			<my-bar class="eb-content" v-if="type === 'bar'" :option="option" :xAxisData="txt" :seriesName="title" :seriesData="data" :axisLabel="axisLabel"></my-bar>
			<my-pie class="eb-content" v-else-if="type === 'pie'" :seriesData="pieData.seriesData" :seriesName="title" :seriesCenter="seriesCenter"></my-pie>
			<my-line class="eb-content" v-else-if="type === 'line'" :xAxisData="txt" :date="date" :seriesData="seriesData"></my-line>
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
			defaulte: '标题'
		},
		txt: {
			type: Array,
			defaulte: function() {
				return []
			}
		},
		data: {
			type: Array,
			defaulte: function() {
				return []
			}
		},
		axisLabel: {
			type: Object,
			default: function() {
				return {}
			}
		},
		time: {
			type: Number,
			defaulte: ''
		},
		getDataFn: {
			type: Function,
			defaulte: null
		},
		seriesCenter: { // 控制饼状图的位置
			type: Array,
			default: function() {
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
		}
	},
	components: {
		myBar,
		myPie,
		myData,
		myLine
	},
	data() {
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
			pieData: {
				seriesData: []
			},
			date: [],
			seriesData: [], // echarts 数据
			style: '',
			show: false
		}
	},
	filters: {
		currentComponent(type) {
			const typeList = [
				{
					type: 'pie',
					name: 'myPie'
				},
				{
					type: 'bar',
					name: 'myBar'
				}
			]

			for (let i = 0, length = typeList.length; i < length; i++) {
				let item = typeList[i]
				if (item.type === type) {
					return item.name
				}
			}
		}
	},
	created() {
		this.handleData()
	},
	mounted() {
		this.setBoxWH()
	},
	methods: {
		handleData() {
			if (this.type === 'pie') {
				this.pieData.seriesData = this.data.map((item, index) => {
					return {
						value: item,
						name: this.txt[index]
					}
				})
			}
		},
		// 时间改变时执行
		async dateChange(date) {
			if (this.getDataFn) {
				// 获取数据
				let params = {
					date: date
				}
				this.seriesData = await this.getDataFn(params)
			}
		},
		// 设置容器宽高
		// 可以根据父元素的高度来判断
		// 如果父元素的高度小于100px或大于默认高度，则设置为默认高度
		// 如果父元素的高度大于100px且小于默认高度，则继承父元素的高度
		// 同时还可以传入高度，自定义高度,
		// 宽度默认100%，可自定义高度
		setBoxWH() {
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
	watch: {
		data() {
			this.handleData()
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
