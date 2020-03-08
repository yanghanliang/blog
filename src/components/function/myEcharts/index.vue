<template>
	<div class="echarts-box">
		<div class="eb-header clearfix" v-if="time">
			<span class="ebh-title">{{ title }}</span>
			<my-data @dateChange="dateChange" :dateType="time"></my-data>
		</div>
		<div class="line"></div>
		<my-bar class="eb-content" v-if="type === 'bar'" :xAxisData="txt" :seriesName="title" :seriesData="data" :axisLabel="axisLabel"></my-bar>
		<my-pie class="eb-content" v-else-if="type === 'pie'" :seriesData="pieData.seriesData"></my-pie>
		<my-line class="eb-content" v-else-if="type === 'line'" :xAxisData="txt" :date="date" :seriesData="seriesData"></my-line>
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
		},
		time: {
			type: [Number, String],
			defaulte: ''
		},
		getDataFn: {
			type: Function,
			defaulte: null
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
				console.log(this.seriesData, '获取数据')
			}
			console.log(date, 'echarts盒子')
		}
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/color/index.scss';

.echarts-box {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	border: 1px solid $border-color;

	.eb-header {
		height: 38px;
		padding: 5px 10px;
		line-height: 38px;

		.ebh-title {
			float: left;
			font-size: 16px;
		}
	}

	.line {
		content: "";
		display: block;
		height: 1px;
		background-color: $border-color;
	}

	.eb-content {
		padding: 10px;
		box-sizing: border-box;
		height: calc(100% - 38px - 10px);
	}
}
</style>
