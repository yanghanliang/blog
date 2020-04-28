let props = {
	seriesName: {
		type: String,
		default: '标题'
	},
	axisLabel: {
		type: Object,
		default: function() {
			return { // 使文字倾斜，达到展示全部的文字
				interval: 0, // 0 展示全部
				rotate: -30, // 倾斜角度
			}
		}
	},
	date: {
		type: Array,
		default: []
	},
	option: { // echarts 的配置项
		type: Object
	},
	toolbox: {
		type: Object,
	},
	color: {
		type: Object,
	},
	seriesData: {
		type: Array,
		default: null
	},
	getDataFn: {
		type: Function,
		default: null
	},
	xAxisData: {
		type: Array,
	}
}

export default { props }
