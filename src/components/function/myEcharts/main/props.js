let props = {
	seriesName: {
		type: String,
		default: '标题'
	},
	axisLabel: {
		type: Object,
		default: function () {
      return {}
      // 示例
			// return { // 使文字倾斜，达到展示全部的文字
			// 	interval: 0, // 0 展示全部
			// 	rotate: -30, // 倾斜角度
			// }
		}
	},
  grid: {
    type: Object,
		default: function () {
			return {
        // 组件离容器的距离（边距）
        left: 30,
        top: 30,
        bottom: 30,
        right: 15,
			}
		}
  },
	option: { // echarts 的配置项
		type: Object
	},
	toolbox: {
		type: Object,
	},
  // 主题颜色
	color: {
    type: Array,
    default: function () {
      return ['#1785FF', '#2FC25B', '#FACC14', '#223273', '#8A52D9', '#FF6642']
    }
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
