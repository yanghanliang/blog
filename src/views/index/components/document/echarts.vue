<template>
    <div>
		<h2>基于echarts的二次分装</h2>
		<div class="clearfix mb20">
			<my-echarts width="48%" class="fl"></my-echarts>
			<my-echarts width="48%" type="line" class="fr"></my-echarts>
			<my-echarts width="48%" type="pie" class="fl mt20"></my-echarts>
		</div>
		<code-block name="echartsBase" />
		<div class="clearfix mt20 mb20">
			<my-echarts class="fl" width="48%" title="地理位置" :txt="['北京', '上海', '广东', '深圳']" :data="[600, 800, 200, 900]"></my-echarts>
			<my-echarts class="fr" width="48%" :txt="['北京', '上海', '广东', '深圳']" title="站点信息" :getDataFn="configGetData" :time="3"></my-echarts>
		</div>
		<code-block name="configEcharts" />
		<my-echarts key="def" :time="2" title="柱状图动画延迟" :option="option"></my-echarts>
		<code-block name="optionEcharts" />
		<el-table :data="tableData" style="width: 100%">
            <el-table-column prop="params" label="参数" width="180"></el-table-column>
            <el-table-column prop="explain" label="说明" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="type" label="类型" width="180" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="option" label="可选值" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="default" label="默认值"></el-table-column>
        </el-table>
    </div>
</template>

<script>
// 代码块
import codeBlock from '@/components/webs/public/codeBlock/index'
import myEcharts from '@/components/function/myEcharts'

var xAxisData = []
var data1 = []
var data2 = []
for (var i = 0; i < 100; i++) {
	xAxisData.push('类目' + i)
	data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
	data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
}

let option = {
	legend: {
		data: ['bar', 'bar2']
	},
	toolbox: {
		// y: 'bottom',
		feature: {
			magicType: {
				type: ['stack', 'tiled']
			},
			dataView: {},
			saveAsImage: {
				pixelRatio: 2
			}
		}
	},
	tooltip: {},
	xAxis: {
		data: xAxisData,
		splitLine: {
			show: false
		}
	},
	yAxis: {
	},
	series: [{
		name: 'bar',
		type: 'bar',
		data: data1,
		animationDelay: function (idx) {
			return idx * 10
		}
	}, {
		name: 'bar2',
		type: 'bar',
		data: data2,
		animationDelay: function (idx) {
			return idx * 10 + 100
		}
	}],
	animationEasing: 'elasticOut',
	animationDelayUpdate: function (idx) {
		return idx * 5
	}
}

export default {
	components: {
		myEcharts,
		codeBlock
	},
	data () {
		return {
			option: option,
			tableData: [
				{
					params: 'type',
					explain: '图表类型',
					type: 'string',
					option: 'bar、line、pie',
					default: 'bar'
				},
				{
					params: 'title',
					explain: '标题',
					type: 'string',
					option: '*',
					default: '标题'
				},
				{
					params: 'seriesName',
					explain: '鼠标悬浮时提示内容的标题，默认会取title',
					type: 'string',
					option: '*',
					default: ''
				},
				{
					params: 'txt',
					explain: '图表中的文字',
					type: 'array',
					option: '-',
					default: `['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'], 具体看示例`
				},
				{
					params: 'data',
					explain: '图表中的数据',
					type: 'array',
					option: '-',
					default: '[5, 20, 36, 10, 10, 20], 具体看示例'
				},
				{
					params: 'axisLabel',
					explain: `坐标轴刻度标签的相关设置(当type==='bar'时生效)`,
					type: 'object',
					option: '-, https://www.echartsjs.com/zh/option.html#xAxis.axisLabel可参照官网',
					default: `{ // 使文字倾斜，达到展示全部的文字
						interval: 0, // 0 展示全部
						rotate: -30, // 倾斜角度
					}`
				},
				{
					params: 'time',
					explain: '时间',
					type: 'number',
					option: '1(今天)，2(本周)，3(本月至今)，4(近三个月)，5(近六个月)，4(今年至今)',
					default: '-'
				},
				{
					params: 'getDataFn',
					explain: '获取图表数据的方法(必须有返回值)',
					type: 'function',
					option: '-',
					default: 'null'
				},
				{
					params: 'seriesCenter',
					explain: '控制饼状图的位置',
					type: 'string',
					option: '-',
					default: `['50%', '60%']`
				},
				{
					params: 'width',
					explain: '为了更好的适配，宽高需要带单位',
					type: 'string',
					option: '0%-100%, 200px, 5rem, 10em...',
					default: '100%'
				},
				{
					params: 'height',
					explain: `根据父元素的高度来判断
						如果父元素的高度小于100px或大于默认高度，则设置为默认高度
						如果父元素的高度大于100px且小于默认高度，则继承父元素的高度
						同时还可以传入高度，自定义高度`,
					type: 'string',
					option: '[100px-defaultHeight]',
					default: '-'
				},
				{
					params: 'defaultHeight',
					explain: '默认高度（不需要带单位）',
					type: 'number',
					option: '-',
					default: '400'
				},
				{
					params: 'option',
					explain: 'echarts里的option',
					type: 'object',
					option: '-',
					default: '-'
				},
				{
					params: 'toolbox',
					explain: '工具栏，https://www.echartsjs.com/zh/option.html#toolbox可参考官网配置',
					type: 'object',
					option: '-',
					default: `{
						feature: {
							dataView: {}, // 数据视图
							saveAsImage: { // 可点击下载为图片
								pixelRatio: 2
							}
						}
					}`
				},
				{
					params: 'color',
					explain: '主题颜色',
					type: 'array',
					option: '-',
					default: `['#1785FF', '#2FC25B', '#FACC14', '#223273', '#8A52D9', '#FF6642']`
				}
			]
		}
	},
	methods: {
		// 获取数据
		configGetData (params) {
			return [10, 40, 80, 120]
		}
	},
}
</script>

<style lang="scss" scoped>
</style>
