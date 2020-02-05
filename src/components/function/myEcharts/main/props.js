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
	}
}

export default { props }
