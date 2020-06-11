var xAxisData = []
var data1 = []
var data2 = []
for (var i = 0; i < 100; i++) {
	xAxisData.push('类目' + i)
	data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
	data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
}
export const optionA = {
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

export const optionB = {
	title: {
		text: '$5,349',
		textStyle: {
			color: '#01c4a3',
			fontSize: 30
		},
		subtext: 'Balance',
		subtextStyle: {
			color: '#909090',
			fontSize: 15
		},
		itemGap: 0, // 主副标题距离
		left: 'center',
		top: 'center'
	},
	angleAxis: {
		max: 100, // 满分
		clockwise: false, // 逆时针
		// 隐藏刻度线
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		axisLabel: {
			show: false
		},
		splitLine: {
			show: false
		}
	},
	radiusAxis: {
		type: 'category',
		// 隐藏刻度线
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		axisLabel: {
			show: false
		},
		splitLine: {
			show: false
		}
	},
	polar: {
		center: ['50%', '50%'],
		radius: '120%' // 图形大小
	},
	series: [
		{
			type: 'bar',
			data: [
				{
					name: '作文得分',
					value: 25,
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
								offset: 0,
								color: '#f36a6a'
							}, {
								offset: 1,
								color: '#ff0000'
							}])
						}
					},
				}
			],
			coordinateSystem: 'polar',
			roundCap: true,
			barWidth: 20,
			barGap: '-100%', // 两环重叠
			z: 4,
		},
		{
			type: 'bar',
			data: [
				{
					name: '作文得分',
					value: 45,
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
								offset: 0,
								color: '#000000'
							}, {
								offset: 1,
								color: '#0acfa1'
							}])
						}
					},
				}
			],
			coordinateSystem: 'polar',
			roundCap: true,
			barWidth: 20,
			barGap: '-100%', // 两环重叠
			z: 3,
		},
		{
			type: 'bar',
			data: [
				{
					name: '作文得分',
					value: 75,
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
								offset: 0,
								color: '#aaf14f'
							}, {
								offset: 1,
								color: '#0acfa1'
							}])
						}
					},
				}
			],
			coordinateSystem: 'polar',
			roundCap: true,
			barWidth: 20,
			barGap: '-100%', // 两环重叠
			z: 2,
		},
		{ // 灰色环
			type: 'bar',
			data: [{
				value: 100,
				itemStyle: {
					color: '#e2e2e2',
					shadowColor: 'rgba(0, 0, 0, 0.2)',
					shadowBlur: 5,
					shadowOffsetY: 2
				}
			}],
			coordinateSystem: 'polar',
			roundCap: true,
			barWidth: 20,
			barGap: '-100%', // 两环重叠
			z: 1
		}
	]
}

export const optionC = {
	tooltip: {
		trigger: 'item',
		show: true,
		formatter: '+{c}%'
	},
	axisPointer: { show: false },
	xAxis: [{
		type: 'category',
		data: ['$10', '$20', '$30', '$40', '$50'],
		axisLine: {
			lineStyle: {
				color: '#999'
			}
		}
	}],
	toolbox: {
	},
	yAxis: [
		{
			type: 'value',
			maxInterval: 100,
			minInterval: 25,
			splitLine: {
				lineStyle: {
					type: 'dashed',
					color: '#DDD'
				}
			},
			axisLabel: {
				show: true,
				interval: 'auto',
				formatter: '{value} %'
			},
			splitNumber: 4,
			axisLine: {
				show: false,
				lineStyle: {
					color: '#333'
				},
			},
			nameTextStyle: {
				color: '#999'
			},
			splitArea: {
				show: false
			}
		}
	],
	series: [{
		name: '课时',
		type: 'line',
		data: [0, 25, 20, 36, 23, 85],
		lineStyle: {
			normal: {
				width: 8,
				color: {
					type: 'linear',

					colorStops: [{
						offset: 0,
						color: '#A9F387' // 0% 处的颜色
					}, {
						offset: 1,
						color: '#48D8BF' // 100% 处的颜色
					}],
					globalCoord: false // 缺省为 false
				},
				shadowColor: 'rgba(72,216,191, 0.3)',
				shadowBlur: 10,
				shadowOffsetY: 20
			}
		},
		itemStyle: {
			normal: {
				color: '#fff',
				borderWidth: 10,
				/* shadowColor: 'rgba(72,216,191, 0.3)',
                shadowBlur: 100, */
				borderColor: '#A9F387'
			}
		},
		smooth: true
	}]
}
