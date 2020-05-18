<template>
    <div class="image-clipper">
		<div class="handle-region">
			<span @click="clickShow">圆</span>
			<hr>
			<el-slider v-model="zoom"></el-slider>
			<hr>
			<span @click="confirmCrop">裁剪</span>
		</div>
		<input type="text" v-model="zoom">
		<div class="content-region">
			<a :href="imageUrl" download="beautifulGirl">
				<img :src="imageUrl" alt="裁剪后的图片" ref="synthesis">
			</a>
			<div ref="cRBox" :class="['clipping-region', status]">
				<canvas ref="canvas" class="canvas"></canvas>
				<div class="clipping-box" ref="clippingBox" :style="style"></div>
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
					if (e.target.className.includes('clipping-box')) {
						document.body.style.cursor = 'pointer'
						this.ele = e.target
						this.ele.style.position = 'absolute'
						this.eleInfo = this.ele.getBoundingClientRect()
						console.log(this.eleInfo, 'this.eleInfo')
						this.isDown = true
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
		clickShow() {
			this.zoom = 50
			this.status = 'circular'
			const proportion = 600 / 100 * this.zoom
			let left = 600 / 2 - proportion / 2
			this.style = `width: ${proportion}px; height: ${proportion}px; top: ${left}px; left: ${left}px;` // 600 是clipping-box的宽度
			this.top = left
			this.left = left
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
		}
	}
}
</style>
