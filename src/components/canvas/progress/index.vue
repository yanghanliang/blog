<template>
    <div class="box" :style="style">
        <div class="min-box slider"></div>
        <canvas id="canvas"></canvas>
        <div class="content">
			<slot name="content">
				<ul>
					<li>aaa</li>
					<li>bbb</li>
				</ul>
			</slot>
        </div>
    </div>
</template>

<script>
export default {
	props: {
		// 是否显示百分比
		showPercentage: {
			type: Boolean,
			default: true
		},
		// 是否显示可拖拽按钮
		showSlider: {
			type: Boolean,
			default: true
		},
		// 百分比
		progressValue: {
			type: Number,
			default: 0
		},
		direction: {
			type: Boolean,
			default: true // 默认逆时针转动
		},
		width: {
			type: [Number, String],
			default: 205
		},
		color: {
			type: Array,
			default: function () {
				return [
					{
						value: 0,
						color: '#096'
					},
					{
						value: 0.5,
						color: '#43ffe1'
					},
					{
						value: 0.8,
						color: '#7F86E4'
					},
					{
						value: 1,
						color: '#ff4343'
					}
				]
			}
		}
	},
	computed: {
		style() {
			return `width: ${this.width}px; height:${this.width}px;`
		}
	},
	mounted() {
		this.init()
	},
	data() {
		return {
			progress: null
		}
	},
	methods: {
		init() {
			let that = this

			var My = function (params) {
				this.canvas = document.querySelector('#canvas')
				this.box = this.canvas.parentElement
				this.slider = this.box.querySelector('.slider') // 滑块
				this.sliderInfo = this.slider.getBoundingClientRect()
				this.boxInfo = this.box.getBoundingClientRect()
				this.ctx = this.canvas.getContext('2d')
				this.time = 10
				this.value = params.value ? params.value : 0
				this.startAngle = -90 // 开始的角度  正值走的是顺时针
				this.endAngle = 0 // 结束的角度 负值走的是逆时针
				this.circularX = this.boxInfo.width / 2 // 圆心的 x 轴坐标 - 不能设置动态的值,会影响到渐变色
				this.circularY = this.boxInfo.height / 2 // 圆心的 y 轴坐标
				this.radius = 100 // 半径
				this.isPressDow = false // 鼠标默认是抬起的状态
				this.percentage = 0 // 百分比
				this.textTop = 40 // 文字距离上边的距离 可以为负数
				this.textSize = 20 // 字体大小
				// this.direction = !(this.startAngle > 0) // 旋转的方向 true - 逆时针 | false - 顺时针
				this.direction = that.direction // 旋转的方向 true - 逆时针 | false - 顺时针
				this.lineWidth = 6 // 线条宽度

				this.init()
			}

			// 初始化
			My.prototype.init = function () {
				this.endAngle = this.valueTangle({value: this.value})

				this.setBoxSize() // 设置盒子大小
				this.pressDown() // 鼠标按下滑块的事件
				this.mousemove() // 鼠标按下并且移动滑块的事件
				this.mouseup() // 鼠标抬起时执行的方法
				this.arcDrawing({
					startAngle: this.startAngle,
					endAngle: this.endAngle,
				}) // 画弧
			}

			// 设置盒子大小
			My.prototype.setBoxSize = function () {
				this.canvas.width = this.boxInfo.width
				this.canvas.height = this.boxInfo.height
				let content = this.box.querySelector('.content')
				let width = this.radius * 2 - this.lineWidth
				content.style.width = width + 'px'
				content.style.height = width + 'px'
			}

			/**
            * 动态画弧
            * @param {object} params
            * @param {number} params.endAngle      	结束的角度
			* @param {number} params.startAngle		开始的角度
            *
            */
			My.prototype.arcDrawing = function (params) {
				// 设置渐变
				let grd = this.ctx.createLinearGradient(0, 0, this.circularX, this.circularY)
				that.color.forEach(item => {
					grd.addColorStop(item.value, item.color)
				})
				// grd.addColorStop(0, '#096')
				// grd.addColorStop(0.5, '#43ffe1')
				// grd.addColorStop(0.8, '#7F86E4')
				// grd.addColorStop(1, '#ff4343')

				this.ctx.strokeStyle = grd
				this.ctx.lineWidth = this.lineWidth

				let startArc = this.getArcValue(params.startAngle)
				let temp = params.startAngle

				var clearId = setInterval(() => {
					let eAngle = this.getArcValue(temp) // 结束的弧度
					this.ctx.clearRect(0, 0, this.boxInfo.width, this.boxInfo.height) // 在给定的矩形内清除指定的像素
					this.ctx.beginPath() // 开始新的一条路径
					this.ctx.arc(this.circularX, this.circularY, this.radius, startArc, eAngle, this.direction)
					this.ctx.stroke()

					if (that.showPercentage) { // 是否显示百分比
						// 写字
						this.ctx.fillStyle = '#1d89d5'
						this.ctx.font = this.textSize + 'px Microsoft Yahei'
						this.ctx.textAlign = 'center'
						this.ctx.fillText(this.number(temp), this.circularX, this.circularY + this.textTop)
					}

					if (this.direction) {
						// 逆时针旋转, 角度为负值
						if (temp <= this.endAngle) {
							clearInterval(clearId)
							// 设置点的位置
							this.setSpotCoordinate({
								angle: 360 + this.endAngle
							})
							return false
						}

						temp--
					} else {
						// 顺时针旋转, 角度为正值
						if (temp >= params.endAngle) {
							clearInterval(clearId)
							// 设置点的位置
							this.setSpotCoordinate({
								angle: this.endAngle
							})
							return false
						}

						temp++
					}
				}, this.time)

				// this.ctx.globalCompositeOperation = 'source-atop'

				this.endAngle = params.endAngle // 更新最后的角度
			}

			/**
            * 补全-画弧
            * @param {object} params
            * @param {number} params.startAngle    开始的角度
            * @param {number} params.endAngle      结束的角度
            */
			My.prototype.ad = function (params) {
				this.ctx.clearRect(0, 0, this.boxInfo.width, this.boxInfo.height) // 在给定的矩形内清除指定的像素
				let startArc = this.getArcValue(params.startAngle) // 开始的弧度
				let endArc = this.getArcValue(params.endAngle) // 结束的弧度
				this.ctx.beginPath() // 开始新的一条路径
				this.ctx.arc(this.circularX, this.circularY, this.radius, startArc, endArc, this.direction)
				this.ctx.stroke()

				if (that.showPercentage) {
					// 写字
					this.ctx.fillText(this.number(params.endAngle), this.circularX, this.circularY + 40)
				}
			}

			/**
            * 数字处理
            * @param {number} angle 角度
            * @param {number} number 百分比
            */
			My.prototype.number = function (angle) {
				// console.log(angle, this.startAngle)
				let value = 0

				if (this.direction) {
					let sa = 360 + this.startAngle // 获取开始的实际角度
					if (angle > 0) {
						if (sa > angle) {
							value = sa - angle
						} else {
							value = sa + 360 - angle
						}
					} else {
						let temp = 360 + angle
						value = sa - temp
					}
				} else {
					if (angle > this.startAngle) {
						value = angle - this.startAngle
					} else {
						value = 360 - this.startAngle + angle
					}
				}

				let percentage = Math.round(value / 360 * 100)
				this.percentage = percentage
				return percentage + '%'
			}

			/**
            *  计算弧度
            *  @param  {number}        angle 角度 可传负值
            *  @return {number}        弧度
            *
            */
			My.prototype.getArcValue = function (angle) {
				let arc = Math.abs(angle) * Math.PI / 180
				if (angle > 0) {
					return arc
				} else {
					return -arc
				}
			}

			/*
            * 获取圆上的坐标
            * @param   {number} angle
            * @return  {object} coordinate 坐标 { x: value, y: value }
            */
			My.prototype.getCoordinate = function (angle) {
				let sAngle = 0
				let rightAngle = this.radius / Math.sin(2 * Math.PI / 360 * 90) // 直角
				if (angle <= 90) {
					sAngle = 90 - angle
					return {
						x: this.circularX + Math.sin(2 * Math.PI / 360 * sAngle) * rightAngle - this.sliderInfo.width /
                            2,
						y: this.circularY + Math.sin(2 * Math.PI / 360 * angle) * rightAngle - this.sliderInfo.height /
                            2
					}
				} else if (angle <= 180) {
					sAngle = 90 - (180 - angle)
					return {
						x: this.circularX - Math.sin(2 * Math.PI / 360 * sAngle) * rightAngle - this.sliderInfo.width /
                            2,
						y: this.circularY + Math.sin(2 * Math.PI / 360 * (180 - angle)) * rightAngle - this.sliderInfo
							.height / 2
					}
				} else if (angle <= 270) {
					sAngle = 270 - angle
					return {
						x: this.circularX - Math.sin(2 * Math.PI / 360 * sAngle) * rightAngle - this.sliderInfo.width / 2,
						y: this.circularY - Math.sin(2 * Math.PI / 360 * (180 - sAngle - 90)) * rightAngle - this.sliderInfo.height / 2
					}
				} else if (angle <= 360) {
					sAngle = 90 - (360 - angle)
					return {
						x: this.circularX + Math.sin(2 * Math.PI / 360 * sAngle) * rightAngle - this.sliderInfo.width /
                            2,
						y: this.circularY - Math.sin(2 * Math.PI / 360 * (360 - angle)) * rightAngle - this.sliderInfo
							.height / 2
					}
				}
			}

			/*
            * 设置点的位置
            * @param {object}  params
            * @param {angle}   params.angle 角度
            */
			My.prototype.setSpotCoordinate = function (params) {
				let coordinate = this.getCoordinate(params.angle)
				this.slider.style.left = coordinate.x + 'px'
				this.slider.style.top = coordinate.y + 'px'

				if (that.showSlider) {
					this.slider.style.opacity = 1
				} else {
					this.slider.style.display = 'none'
				}
			}

			/**
            * 已知一个点求角度
            * 获取角度
            * @param {Object} params.x x 轴坐标
            * @param {Object} params.y y 轴坐标
            * @return {number} 角度
            */
			My.prototype.getAngle = function (params) {
				let sinA = Math.sin(2 * Math.PI / 360 * 90)
				// let ab = 129 488
				let ab = params.y - this.circularY
				let oa = params.x - this.circularX
				let sino = sinA * ab / Math.sqrt(Math.pow(oa, 2) + Math.pow(ab, 2))
				params.sin = sino
				return this.getSinAngle(params)
			}

			/**
            * 获取 sin 角度
            * @param {object} params.sin   传入一个 sin 值
            * @param {object} params.x     传入一个元素所在的 x 轴坐标
            * @param {object} params.y     传入一个元素所在的 y 轴坐标
            * @return {number} angle
            * 正切 || 正弦 || 余弦也可用同理求出
            */
			My.prototype.getSinAngle = function (params) {
				if (params.x >= this.circularX && params.y >= this.circularY) {
					// console.log('0-90')
					return Math.asin(params.sin) / (Math.PI / 180)
				} else if (params.x >= this.circularX && params.y <= this.circularY) {
					// console.log('270-360', Math.asin(params.sin) / (Math.PI / 180))
					if (this.direction) {
						return 360 + Math.asin(params.sin) / (Math.PI / 180)
					} else {
						return Math.asin(params.sin) / (Math.PI / 180)
					}
				} else if (params.x <= this.circularX && params.y <= this.circularY) {
					// console.log('180-270', Math.asin(params.sin) / (Math.PI / 180))
					return 180 - Math.asin(params.sin) / (Math.PI / 180)
				} else if (params.x <= this.circularX && params.y >= this.circularY) {
					// console.log('90-180')
					return 180 - Math.asin(params.sin) / (Math.PI / 180)
				}
			}

			/**
            * 给滑块注册鼠标按下事件
            */
			My.prototype.pressDown = function () {
				let that = this
				that.slider.addEventListener('mousedown', function (event) {
					console.log('??????')
					// 利用传参兼容火狐
					let e = window.event || event
					// 获取目标元素
					let target = e.target ? e.target : e.srcElement
					// 获取元素标签内容
					let className = target.className
					if (className.includes('slider')) {
						console.log(1, '!!')
						that.isPressDown = true // 开启
						document.documentElement.style.cursor = 'pointer' // 改变鼠标的样式
						// that.slider.style.position = 'fixed' // 设置固定定位，以便移动
					}
				})
			}

			// 鼠标滑动时执行
			My.prototype.mousemove = function () {
				let that = this
				document.addEventListener('mousemove', function (event) {
					console.log('2')
					// 利用传参兼容火狐
					let e = window.event || event

					// 分别兼容ie和chrome
					let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft
					let scrollY = document.documentElement.scrollTop || document.body.scrollTop
					// console.log(scrollX, scrollY, e.clientX, e.clientY, '坐标')
					// 获取 x 和 y
					let x = e.clientX + scrollX - that.boxInfo.x
					let y = e.clientY + scrollY - that.boxInfo.y

					if (that.isPressDown) {
						console.log('3')
						// that.slider.style.left = x + 'px'
						// that.slider.style.top = y + 'px'
						// 获取当前鼠标的角度
						let angle = that.getAngle({
							x: x,
							y: y
						})

						// 为了让起始点从 270 开始而特殊处理
						// if(angle > 270) {
						//     angle = angle - 360
						// }

						// angle = 360 - angle

						// 获取当前元素在圆上的位置
						let coordinate = that.getCoordinate(angle)

						// if(!coordinate) {
						//     // 经过0度时 coordinate 为 undefind
						//     return false
						// }

						// 设置位置
						that.slider.style.left = coordinate.x + 'px'
						that.slider.style.top = coordinate.y + 'px'
						console.log(coordinate, 'coordinate')

						that.ad({
							startAngle: that.startAngle,
							endAngle: angle
						})

						// console.log(angle, '当前的角度')
						// console.log((angle + 90) / 360 * 100, '百分比')
					}
				})
			}

			// 鼠标抬起事件
			My.prototype.mouseup = function () {
				let that = this
				window.onmouseup = function (event) {
					// 修改按下的状态
					that.isPressDown = false
					document.documentElement.style.cursor = 'auto' // 改变鼠标的样式
				}
			}

			/**
            * 值转换为角
            * @param {number} params.value
            * @return {number} angle
            */
			My.prototype.valueTangle = function(params) {
				let angle = 360 / 100 * params.value

				if (this.direction) {
					if (angle <= 270) {
						return -(360 - Math.abs(270 - angle))
					} else {
						return -(angle + 90)
					}
				} else {
					return (angle - 90)
				}
			}

			that.progress = new My({ value: that.progressValue })
		}
	},
	watch: {
		progressValue(value) {
			// 把值转换成角
			let angle = this.progress.valueTangle({
				value: value
			})
			// 设置进度条
			this.progress.ad({
				startAngle: -90,
				endAngle: angle
			})
		}
	},
}
</script>

<style lang="scss">
.box {
    // width: 205px;
    // height: 205px;
	position: relative;

	canvas {
		z-index: 1;
		position: relative;
	}

    .slider {
        width: 14px;
        height: 14px;
        z-index: 2;
        opacity: 0;
        cursor: pointer;
		user-select: none;
        position: absolute;
        border-radius: 50%;
        background: -webkit-linear-gradient(40deg, red, pink); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(40deg, red, pink); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(40deg, red, pink); /* Firefox 3.6 - 15 */
        background: linear-gradient(40deg, red, pink); /* 标准的语法 */

        &::before {
            content: "";
            width: 6px;
            height: 6px;
            top: 50%;
            left: 50%;
            border-radius: 50%;
            position: absolute;
            background-color: #fff;
            transform: translate(-50%, -50%);
        }
    }

    .content {
        top: 50%;
        left: 50%;
		z-index: 0;
		overflow: hidden;
        border-radius: 50%;
        position: absolute;
        border: 6px solid #ddd;
        transform: translate(-50%, -50%);

        ul {
            top: 50px;
            left: 50%;
            position: absolute;
            transform: translateX(-50%);
        }
    }
}
</style>
