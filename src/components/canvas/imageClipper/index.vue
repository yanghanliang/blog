<template>
    <div class="image-clipper">
		<div class="handle-region">
			<span @click="clickCircular">圆</span>
			<hr>
			<span @click="clickRectangle">方形</span>
			<hr>
			<el-slider v-model="zoom"></el-slider>
			<hr>
			<span @click="confirmCrop">裁剪</span>
		</div>
		<div class="content-region">
			<a :href="imageUrl" download="beautifulGirl">
				<img :src="imageUrl" alt="裁剪后的图片" ref="synthesis">
			</a>
			<div ref="cRBox" :class="['clipping-region', status]">
				<canvas ref="canvas" class="canvas"></canvas>
				<ul class="clipping-box" ref="clippingBox" id="clippingBox" :style="style">
					<li class="tl"></li>
					<li class="tm"></li>
					<li class="tr"></li>
					<li class="rm"></li>
					<li class="rb"></li>
					<li class="bm"></li>
					<li class="bl"></li>
					<li class="lm"></li>
				</ul>
				<img src="../../../assets/backgroundImages/headPortrait/gn.jpeg" alt="需要裁剪的图片" ref="bgImage">
			</div>
		</div>
    </div>
</template>

<script>
/**
 * 可以实现：
 * 裁剪区域可随意拖动且可截取区域内的内容
 * 裁剪区域可按随意放大或缩小且可截取区域内的内容
 * 裁剪区域可随意拖动且随意放大或缩小且可截取区域内的内容
 * ---
 * 如果是长方形或者是正方形
 * 可拖动的地方有边和角
 * 点击的时候回显示8个点，其中4个是夹角，当选择夹角的时候已对角作为参考。
 * 当选择一个边的时候，已另一个边作为参考
 */
export default {
	name: 'imageClipper', // 图片裁剪
	props: {
		// imageUrl: {
		// 	type: String,
		// 	default: '',
		// }
	},
	computed: {
		// style() {
		// 	const proportion = 600 / 100 * this.zoom
		// 	const left = 600 / 2 - proportion / 2
		// 	return `width: ${proportion}px; height: ${proportion}px; top: ${left}px; left: ${left}px;` // 600 是clipping-box的宽度
		// }
	},
	data() {
		return {
			status: 'default',
			Drag: null,
			ctx: null,
			zoom: 0,
			imageUrl: '',
			isMove: false, // 是否移动过
			style: '',
			canvas: {
				width: 600,
				height: 600
			},
			lock: true
		}
	},
	mounted() {
		this.pictureConversion()
		this.registerEvents()
	},
	methods: {
		/**
		 * 1. 有图片作为背景图（可拖动）
		 * 2. 有裁剪区域（div）先以圆形裁剪
		 * 3. 圆可以拖动放大或缩小（以圆中心为基准）
		 * 4. 利用canvas裁剪的方法clip进行裁剪
		 * 5. 裁剪前需要先画圆ctx.arc(x , y, r, sAngle, eAngle, counterclockwise)，再裁剪
		 * 6. x = box.x - canvas.x ; y = box.y - canvas.y
		 * @param {object}           params
		 * @param {}               params.
		 */
		registerEvents() {
			let Drag = function(params) {
				this.isDown = false
				this.eleInfo = null
				this.ele = null
				this.scrollTop = 0
				this.x = 0
				this.y = 0
				this.parent = document.querySelector('.clipping-region')
				this.parentInfo = this.parent.getBoundingClientRect()
				this.vm = params.vue
				// 用来裁剪点的
				this.temp = {
					ele: '',
					x: 0, // 参照点
					y: 0, // 参照点
					className: '',
				}
				this.classList = ['tl', 'tm', 'tr', 'rm', 'rb', 'bm', 'bl', 'lm']

				this.init()
			}

			Drag.prototype.init = function() {
				this.mousedown()
				this.mousemove()
				this.mouseup()
				this.scroll()
			}

			// 元素按下
			Drag.prototype.mousedown = function() {
				this.parent.addEventListener('mousedown', e => {
					let className = e.target.className
					// 元素移动
					if (className.includes('clipping-box')) {
						document.body.style.cursor = 'pointer'
						this.ele = e.target
						this.ele.style.position = 'absolute'
						this.eleInfo = this.ele.getBoundingClientRect()
						this.isDown = true
					}

					// 裁剪点的缩放
					if (className.includes('tl')) {
						this.temp.ele = document.querySelector('#clippingBox')
						const eleInfo = this.temp.ele.getBoundingClientRect()
						this.temp.className = 'tl'
						this.temp.x = this.temp.ele.offsetLeft + eleInfo.width // 赋值之后不会改变
						this.temp.y = this.temp.ele.offsetTop + eleInfo.height // 赋值之后不会改变
						console.log(this.temp, 'temp')
						this.isDown = true
						this.temp.ele.style.position = 'absolute'
					} else if (className.includes('tr')) {
						this.temp.ele = document.querySelector('#clippingBox')
						const eleInfo = this.temp.ele.getBoundingClientRect()
						this.temp.className = 'tr'
						this.temp.x = this.temp.ele.offsetLeft // 赋值之后不会改变
						this.temp.y = this.temp.ele.offsetTop + eleInfo.height // 赋值之后不会改变
						console.log(this.temp, 'temp')
						this.isDown = true
						this.temp.ele.style.position = 'absolute'
					}
				})
			}

			// 鼠标移动
			Drag.prototype.mousemove = function() {
				document.addEventListener('mousemove', e => {
					if (this.isDown) {
						this.x = e.x
						this.y = e.y
						this.move()
					}
				})
			}

			// 元素抬起
			Drag.prototype.mouseup = function() {
				document.addEventListener('mouseup', e => {
					this.isDown = false
					document.body.style.cursor = 'default'

					// 矩形
					if (this.classList.includes(e.target.className)) {
						this.temp.ele = ''
					}
				})
			}

			// 元素滚动
			Drag.prototype.scroll = function() {
				document.addEventListener('scroll', e => {
					this.scrollTop = document.documentElement.scrollTop
					this.move()
				})
			}

			// 元素移动
			Drag.prototype.move = function() {
				if (this.ele && this.isDown) {
					this.ele.style.top = this.y - this.eleInfo.height / 2 + this.scrollTop - this.parent.offsetTop + 'px'
					this.ele.style.left = this.x - this.eleInfo.width / 2 - this.parent.offsetLeft + 'px'
					this.vm.isMove = true
				}

				if (this.temp.ele && this.isDown) {
					let params = {
						x: this.x - this.parent.offsetLeft,
						y: this.y + this.scrollTop - this.parent.offsetTop
					}
					this.changeClippingBox(params)
				}
			}

			/**
			 * 改变裁剪区域
			 * @param {object}           params
			 * @param {number}           params.x
			 * @param {number}           params.y
			 */
			Drag.prototype.changeClippingBox = function(params) {
				console.log(params, this.temp, '???????', this.temp.x - params.x, this.temp.y - params.y)
				this.temp.ele.style.width = Math.abs(this.temp.x - params.x) + 'px'
				this.temp.ele.style.height = Math.abs(this.temp.y - params.y) + 'px'

				this.temp.ele.style.top = params.y + 'px'
				this.temp.ele.style.left = params.x + 'px'

				// this.temp.ele.style.top = params.y + 'px'
				// this.temp.ele.style.left = this.temp.x + 'px'
			}

			this.Drag = new Drag({ vue: this })
		},
		// image => canvas 图片转换
		pictureConversion() {
			const imageEle = this.$refs.bgImage
			imageEle.addEventListener('load', e => {
				const imageInfo = imageEle.getBoundingClientRect()
				const canvas = this.$refs.canvas
				canvas.width = this.canvas.width
				canvas.height = this.canvas.height
				// const canvasInfo = canvas.getBoundingClientRect()
				this.ctx = canvas.getContext('2d')
				this.ctx.drawImage(imageEle, 0, 0, imageInfo.width, imageInfo.height, 0, 0, this.canvas.width, this.canvas.height)
			})
		},
		// 裁剪
		confirmCrop() {
			const synthesis = this.$refs.synthesis
			// 别给 clipping-box 裁剪盒子设置 transform: translate(-50%, 10px);
			const clippingBoxEle = document.querySelector('.clipping-box')
			const clippingBoxInfo = clippingBoxEle.getBoundingClientRect()
			let x = clippingBoxEle.offsetLeft
			let y = clippingBoxEle.offsetTop
			if (this.isMove) {
				x = clippingBoxEle.offsetLeft + clippingBoxInfo.width / 2
				y = clippingBoxEle.offsetTop + clippingBoxInfo.height / 2
			}
			console.log(x, y)
			console.log(clippingBoxEle.offsetLeft, clippingBoxEle.offsetTop)
			const r = clippingBoxInfo.height / 2
			const top = clippingBoxEle.offsetTop
			const left = clippingBoxEle.offsetLeft

			// 核心-start
			this.ctx.beginPath()
			this.ctx.globalCompositeOperation = 'destination-atop'
			this.ctx.arc(x, y, r, 0, 2 * Math.PI)
			// 核心-end
			this.ctx.fill()
			this.ctx.drawImage(synthesis, 0, 0, clippingBoxEle.width, clippingBoxEle.height, left, top, clippingBoxEle.width, clippingBoxEle.height)
			this.imageUrl = this.$refs.canvas.toDataURL()
		},
		// 点击圆
		clickCircular() {
			this.status = 'circular'
			this.cropInit()
		},
		// 点击矩形
		clickRectangle() {
			this.status = 'rectangle'
			this.cropInit()
		},
		// 裁剪初始化
		cropInit() {
			this.zoom = 50
			const proportion = 600 / 100 * this.zoom
			let left = 600 / 2 - proportion / 2
			this.style = `width: ${proportion}px; height: ${proportion}px; top: ${left}px; left: ${left}px;` // 600 是clipping-box的宽度
		}
	},
	watch: {
		zoom(newValue, oldValue) {
			if (!this.lock) return false
			this.$nextTick(() => {
				setTimeout(() => {
					this.lock = false
					const proportion = this.canvas.width / 100 * newValue
					const ele = this.$refs.clippingBox
					const eleInfo = ele.getBoundingClientRect()
					const width = ele.style.width.split('px')[0]
					// const height = ele.style.height.split('px')[0]
					let top = this.canvas.width / 2 - proportion / 2
					let left = this.canvas.width / 2 - proportion / 2
					if (newValue > oldValue) {
						// 放大
						console.log(eleInfo.width, width, 'width')
						let difference = (proportion * 100 - width * 100) / 100 / 2
						if (this.isMove) {
							top = ele.offsetTop - difference
							left = ele.offsetLeft - difference
							console.log(ele.offsetTop, ele.offsetLeft)
						}
					} else {
						console.log(eleInfo.width, width, 'width')
						// 缩小
						let difference = (width * 100 - proportion * 100) / 100 / 2
						if (this.isMove) {
							top = ele.offsetTop + difference
							left = ele.offsetLeft + difference
							console.log(ele.offsetTop, ele.offsetLeft)
						}
					}
					this.style = `width: ${proportion}px; height: ${proportion}px; top: ${top}px; left: ${left}px;` // 600 是clipping-box的宽度
					setTimeout(() => {
						this.lock = true
					})
				})
			})
		}
	},
}
</script>

<style lang="scss" scoped>
.image-clipper {

	.handle-region {
		width: 300px;
		height: 500px;
		float: left;
		padding: 20px;
		border: 1px solid #ddd;
	}

	.content-region {
		width: 800px;
		height: 100%;
		float: right;

		.clipping-region {
			position: relative;
			display: inline-block;

			canvas {
				float: left;
			}

			img {
				left: 0;
				visibility: hidden;
				position: absolute;
			}

			.clipping-box {
				display: none;
			}

			&.circular {
				.clipping-box {
					z-index: 1;
					width: 100%;
					height: 100%;
					display: block;
					position: absolute;
					border-radius: 50%;
					border: 1px dashed red;
				}
			}

			&.rectangle {
				.clipping-box {
					z-index: 1;
					width: 100%;
					height: 100%;
					display: block;
					position: absolute;
					border: 1px dashed red;

					li {
						width: 10px;
						height: 10px;
						content: "";
						display: block;
						position: absolute;
						background-color: aquamarine;

						&:nth-child(1) {
							top: 0;
							left: 0;
							transform: translate(-50%, -50%);
						}

						&:nth-child(2) {
							top: 0;
							left: 50%;
							transform: translate(-50%, -50%);
						}

						&:nth-child(3) {
							top: 0;
							left: 100%;
							transform: translate(-50%, -50%);
						}

						&:nth-child(4) {
							top: 50%;
							left: 100%;
							transform: translate(-50%, -50%);
						}

						&:nth-child(5) {
							top: 100%;
							left: 100%;
							transform: translate(-50%, -50%);
						}

						&:nth-child(6) {
							top: 100%;
							left: 50%;
							transform: translate(-50%, -50%);
						}

						&:nth-child(6) {
							top: 100%;
							left: 50%;
							transform: translate(-50%, -50%);
						}

						&:nth-child(7) {
							top: 100%;
							left: 0;
							transform: translate(-50%, -50%);
						}

						&:nth-child(8) {
							top: 50%;
							left: 0;
							transform: translate(-50%, -50%);
						}
					}
				}
			}
		}
	}
}
</style>
