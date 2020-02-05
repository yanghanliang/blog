<template>
	<div class="echarts-box">
		<my-bar v-if="type === 'bar'" :xAxisData="txt" :seriesName="title" :seriesData="data"></my-bar>
		<my-pie v-else-if="type === 'pie'" :seriesData="pieData.seriesData"></my-pie>
	</div>
</template>

<script>
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
		}
	},
	components: {
		myBar,
		myPie
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
			}
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
		}
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/color/index.scss';

.echarts-box {
	min-width: 100%;
	min-height: 100%;
	padding: 10px;
	box-sizing: border-box;
	border: 1px solid $theme-color;
}
</style>
