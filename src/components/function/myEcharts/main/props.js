let props = {
	type: {
		type: String,
		default: 'bar'
	},
	xAxisData: {
		type: Array,
		default: function() {
			return ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
		}
	},
	seriesName: {
		type: String,
		default: '标题'
	},
	seriesData: {
		type: Array,
		default: function() {
			return [5, 20, 36, 10, 10, 20]
		}
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
	}
}

export default { props }
