<template>
    <div class="image-clipper clearfix">
		<ul class="handle-region clearfix">
			<li>工具栏</li>
			<li class="no" attr-no="1">请选择需要裁剪的图片</li>
			<li>
				<i class="el-icon-picture" @click="dialogVisible = true"></i>
			</li>
			<li class="no" attr-no="2">请选择裁剪形状</li>
			<li>
				<div class="circular mr20" @click="clickCircular">圆</div>
				<div class="rectangle" @click="clickRectangle">方形</div>
			</li>
			<li class="no" attr-no="3">请选择裁剪范围</li>
			<li>
				<el-slider v-model="zoom"></el-slider>
			</li>
			<li class="no" attr-no="4">请选择背景颜色</li>
			<li>
				<photoshop-picker v-model="backgroundColor"></photoshop-picker>
			</li>
			<li class="no" attr-no="5">确定裁剪</li>
			<li>
				<my-icon identification="jiandao" class="jiandao" @click.native="confirmCrop"></my-icon>
			</li>
		</ul>
		<div class="content-region" ref="contentRegion">
			<a v-show="imageUrl" :href="imageUrl" download="beautifulGirl" title="点击下载">
				<img :src="imageUrl" alt="裁剪后的图片" ref="synthesis">
			</a>
			<div v-show="!imageUrl" ref="cRBox" :class="['clipping-region', status]">
				<canvas width="800px" height="800px" ref="canvas" class="canvas"></canvas>
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
				<!-- <img src="../../../assets/backgroundImages/headPortrait/gn.jpeg" alt="需要裁剪的图片" ref="bgImage"> -->
			</div>
		</div>
		<el-dialog class="ta-center" title="请选择需要裁剪的图片" :visible.sync="dialogVisible">
			<show-image @showSuccess="showSuccess" />
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="pictureConversion">确 定</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
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
import showImage from '@/components/test/showImage'
import { Photoshop } from 'vue-color'

export default {
	name: 'imageClipper', // 图片裁剪
	components: {
		showImage,
		'photoshop-picker': Photoshop
	},
	data () {
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
			lock: true,
			dialogVisible: false,
			imageInfo: {}, // 原图片信息
			backgroundColor: '#ffffff',
			step: 1
		}
	},
	mounted () {
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
		registerEvents () {
			let Drag = function (params) {
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
					width: 0,
					height: 0,
				}
				this.classList = ['tl', 'tm', 'tr', 'rm', 'rb', 'bm', 'bl', 'lm']

				this.init()
			}

			Drag.prototype.init = function () {
				this.mousedown()
				this.mousemove()
				this.mouseup()
				this.scroll()
			}

			// 元素按下
			Drag.prototype.mousedown = function () {
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
					if (!this.classList.includes(className)) return false
					this.temp.ele = document.querySelector('#clippingBox')
					const eleInfo = this.temp.ele.getBoundingClientRect()

					if (className.includes('tl')) {
						// 左上角
						this.temp.className = 'tl'
						this.temp.x = this.temp.ele.offsetLeft + eleInfo.width // 赋值之后不会改变
						this.temp.y = this.temp.ele.offsetTop + eleInfo.height // 赋值之后不会改变
						this.isDown = true
						this.temp.ele.style.position = 'absolute'
					} else if (className.includes('tr')) {
						// 右上角
						this.temp.className = 'tr'
						this.temp.x = this.temp.ele.offsetLeft // 赋值之后不会改变
						this.temp.y = this.temp.ele.offsetTop + eleInfo.height // 赋值之后不会改变
						this.isDown = true
						this.temp.ele.style.position = 'absolute'
					} else if (className.includes('rb')) {
						// 右下角
						this.temp.className = 'rb'
						this.temp.x = this.temp.ele.offsetLeft // 赋值之后不会改变
						this.temp.y = this.temp.ele.offsetTop // 赋值之后不会改变
						this.isDown = true
						this.temp.ele.style.position = 'absolute'
					} else if (className.includes('bl')) {
						// 左下角
						this.temp.className = 'bl'
						this.temp.x = this.temp.ele.offsetLeft + eleInfo.width // 赋值之后不会改变
						this.temp.y = this.temp.ele.offsetTop // 赋值之后不会改变
						this.isDown = true
						this.temp.ele.style.position = 'absolute'
					} else if (className.includes('tm')) {
						// 上中
						this.temp.className = 'tm'
						this.temp.x = this.temp.ele.offsetLeft // 赋值之后不会改变
						this.temp.y = this.temp.ele.offsetTop + eleInfo.height // 赋值之后不会改变
						this.temp.width = eleInfo.width // 赋值之后不会改变
						this.temp.height = eleInfo.height // 赋值之后不会改变
						this.isDown = true
						this.temp.ele.style.position = 'absolute'
					} else if (className.includes('rm')) {
						// 右中
						this.temp.className = 'rm'
						this.temp.x = this.temp.ele.offsetLeft // 赋值之后不会改变
						this.temp.y = this.temp.ele.offsetTop // 赋值之后不会改变
						this.temp.width = eleInfo.width // 赋值之后不会改变
						this.temp.height = eleInfo.height // 赋值之后不会改变
						this.isDown = true
						this.temp.ele.style.position = 'absolute'
					} else if (className.includes('bm')) {
						// 下中
						this.temp.className = 'bm'
						this.temp.x = this.temp.ele.offsetLeft // 赋值之后不会改变
						this.temp.y = this.temp.ele.offsetTop // 赋值之后不会改变
						this.temp.width = eleInfo.width // 赋值之后不会改变
						this.isDown = true
						this.temp.ele.style.position = 'absolute'
					} else if (className.includes('lm')) {
						// 下中
						this.temp.className = 'lm'
						this.temp.x = this.temp.ele.offsetLeft + eleInfo.width // 赋值之后不会改变
						this.temp.y = this.temp.ele.offsetTop // 赋值之后不会改变
						this.temp.width = eleInfo.width // 赋值之后不会改变
						this.isDown = true
						this.temp.ele.style.position = 'absolute'
					}
				})
			}

			// 鼠标移动
			Drag.prototype.mousemove = function () {
				document.addEventListener('mousemove', e => {
					if (this.isDown) {
						this.x = e.x
						this.y = e.y
						this.move()
					}
				})
			}

			// 元素抬起
			Drag.prototype.mouseup = function () {
				document.addEventListener('mouseup', e => {
					this.isDown = false
					document.body.style.cursor = 'default'

					// 矩形
					// console.log(this.classList, 'this.classList', e.target.className)
					if (this.temp.ele) {
						this.temp.ele = ''
					}
				})
			}

			// 元素滚动
			Drag.prototype.scroll = function () {
				document.addEventListener('scroll', e => {
					this.scrollTop = document.documentElement.scrollTop
					this.move()
				})
			}

			// 元素移动
			Drag.prototype.move = function () {
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
			 * @param {object}           params 鼠标的位置
			 * @param {number}           params.x
			 * @param {number}           params.y
			 */
			Drag.prototype.changeClippingBox = function (params) {
				// console.log(params, this.temp, '???????', this.temp.x - params.x, this.temp.y - params.y)

				if (['tl', 'tr', 'rb', 'bl'].includes(this.temp.className)) {
					this.temp.ele.style.width = Math.abs(this.temp.x - params.x) + 'px'
					this.temp.ele.style.height = Math.abs(this.temp.y - params.y) + 'px'
				}

				if (this.temp.className === 'tl') {
					// 左上角
					this.temp.ele.style.top = params.y + 'px'
					this.temp.ele.style.left = params.x + 'px'
				} else if (this.temp.className === 'tr') {
					// 右上角
					this.temp.ele.style.top = params.y + 'px'
					this.temp.ele.style.left = this.temp.x + 'px'
				} else if (this.temp.className === 'rb') {
					// 右下角
					this.temp.ele.style.top = this.temp.y + 'px'
					this.temp.ele.style.left = this.temp.x + 'px'
				} else if (this.temp.className === 'bl') {
					// 右下角
					this.temp.ele.style.top = this.temp.y + 'px'
					this.temp.ele.style.left = params.x + 'px'
				} else if (this.temp.className === 'tm') {
					// 上中
					this.temp.ele.style.width = params.width + 'px'
					this.temp.ele.style.height = Math.abs(params.y - this.temp.y) + 'px'
					this.temp.ele.style.top = params.y + 'px'
					this.temp.ele.style.left = this.temp.x + 'px'
				} else if (this.temp.className === 'rm') {
					// 右中
					this.temp.ele.style.width = Math.abs(params.x - this.temp.x) + 'px'
					this.temp.ele.style.height = params.height + 'px'
					this.temp.ele.style.top = this.temp.y + 'px'
					this.temp.ele.style.left = this.temp.x + 'px'
				} else if (this.temp.className === 'bm') {
					// 下中
					this.temp.ele.style.width = params.width + 'px'
					this.temp.ele.style.height = Math.abs(params.y - this.temp.y) + 'px'
					this.temp.ele.style.top = this.temp.y + 'px'
					this.temp.ele.style.left = this.temp.x + 'px'
				} else if (this.temp.className === 'lm') {
					// 左中
					this.temp.ele.style.width = Math.abs(params.x - this.temp.x) + 'px'
					this.temp.ele.style.height = params.height + 'px'
					this.temp.ele.style.top = this.temp.y + 'px'
					this.temp.ele.style.left = params.x + 'px'
				}
			}

			this.Drag = new Drag({ vue: this })
		},
		// image => canvas 图片转换
		pictureConversion () {
			const imageEle = this.imageInfo.ele
			const imageInfo = imageEle.getBoundingClientRect()
			const canvas = this.$refs.canvas
			const parentInfo = this.$refs.contentRegion.getBoundingClientRect()
			// this.canvas.width = parentInfo.width
			// canvas.width = this.canvas.width
			// canvas.height = this.canvas.height
			let width = imageInfo.width
			let height = imageInfo.height
			// let proportion = 0
			// 根据图片大小设置画布大小
			// const maxWH = Math.max(imageInfo.width, imageInfo.height, parentInfo.width, parentInfo.height)
			// console.log(maxWH, 'maxWH', imageInfo.height)
			// let top = maxWH / 2 - imageInfo.height / 2
			// let left = maxWH / 2 - imageInfo.width / 2
			let top = 0
			let left = 0
			if (imageInfo.width > parentInfo.width) {
				canvas.width = imageInfo.width
			} else {
				canvas.width = parentInfo.width
				left = (parentInfo.width - imageInfo.width) / 2
				console.log(left, 'left')
			}
			if (imageInfo.height > parentInfo.height) {
				canvas.height = imageInfo.height
			} else {
				canvas.height = parentInfo.height
				top = (parentInfo.height - imageInfo.height) / 2
				console.log(top, 'top')
			}

			// canvas.width = maxWH
			// canvas.height = maxWH
			// if (imageInfo.width > canvas.width || imageInfo.height > canvas.height) {
			// 	if (imageInfo.width > imageInfo.height) {
			// 		proportion = canvas.width / imageInfo.width
			// 		width = canvas.width
			// 		height = imageInfo.height * proportion
			// 		top = (canvas.height - height) / 2
			// 	} else {
			// 		proportion = canvas.height / imageInfo.height
			// 		width = imageInfo.width * proportion
			// 		height = canvas.height
			// 		left = (canvas.width - width) / 2
			// 	}
			// } else {
			// 	top = (canvas.height - height) / 2
			// 	left = (canvas.width - width) / 2
			// }
			this.ctx = canvas.getContext('2d')
			// 将图片转换为canvas
			this.ctx.drawImage(imageEle, 0, 0, imageInfo.width, imageInfo.height, left, top, width, height)
			this.dialogVisible = false
			console.log(this.dialogVisible, 'this.dialogVisible')
		},
		// 裁剪
		confirmCrop () {
			// 验证
			if (!this.verification()) {
				return false
			}
			const synthesis = this.$refs.synthesis
			// 别给 clipping-box 裁剪盒子设置 transform: translate(-50%, 10px);
			const clippingBoxEle = document.querySelector('.clipping-box')
			const clippingBoxInfo = clippingBoxEle.getBoundingClientRect()
			// let x = clippingBoxEle.offsetLeft
			// let y = clippingBoxEle.offsetTop
			// console.log(x, y, '????')
			// if (this.isMove) {
			let x = clippingBoxEle.offsetLeft + clippingBoxInfo.width / 2
			let y = clippingBoxEle.offsetTop + clippingBoxInfo.height / 2
			// }

			const r = clippingBoxInfo.height / 2
			const top = clippingBoxEle.offsetTop
			const left = clippingBoxEle.offsetLeft

			// 核心-start
			this.ctx.beginPath()
			this.ctx.globalCompositeOperation = 'destination-atop'
			if (this.status === 'circular') {
				this.ctx.arc(x, y, r, 0, 2 * Math.PI)
			} else if (this.status === 'rectangle') {
				this.ctx.rect(clippingBoxEle.offsetLeft, clippingBoxEle.offsetTop, clippingBoxInfo.width, clippingBoxInfo.height)
			}
			this.ctx.fillStyle = this.backgroundColor.hex8 ? this.backgroundColor.hex8 : '#fff'
			this.ctx.fill()
			// 核心-end
			this.ctx.drawImage(synthesis, 0, 0, clippingBoxEle.width, clippingBoxEle.height, left, top, clippingBoxEle.width, clippingBoxEle.height)
			this.imageUrl = this.$refs.canvas.toDataURL()
			this.$message.success('裁剪成功，点击图片即可下载~')
		},
		// 点击圆
		clickCircular () {
			this.status = 'circular'
			this.zoom = 50
			this.step = 3
		},
		// 点击矩形
		clickRectangle () {
			this.status = 'rectangle'
			this.zoom = 50
			this.step = 3
		},
		// 选择图片成功后更新图片信息
		showSuccess (imageInfo) {
			this.imageInfo = imageInfo
			this.step = 2
		},
		// 做一个简单的验证
		verification () {
			if (this.step === 1) {
				this.$message.info('请您先选择需要裁剪的图片')
				return false
			} else if (this.step === 2) {
				this.$message.info('请您选择裁剪形状')
				return false
			} else {
				return true
			}
		}
	},
	watch: {
		zoom (newValue, oldValue) {
			if (!this.lock) return false
			this.$nextTick(() => {
				setTimeout(() => {
					this.lock = false
					const canvas = this.$refs.canvas.getBoundingClientRect()
					const proportion = canvas.width / 100 * newValue
					const ele = this.$refs.clippingBox
					const width = ele.style.width.split('px')[0]
					// const height = ele.style.height.split('px')[0]
					let top = canvas.height / 2 - proportion / 2
					let left = canvas.width / 2 - proportion / 2 + this.$refs.canvas.offsetLeft
					if (newValue > oldValue) {
						// 放大
						let difference = (proportion * 100 - width * 100) / 100 / 2
						if (this.isMove) {
							top = ele.offsetTop - difference
							left = ele.offsetLeft - difference
						}
					} else {
						// 缩小
						let difference = (width * 100 - proportion * 100) / 100 / 2
						if (this.isMove) {
							top = ele.offsetTop + difference
							left = ele.offsetLeft + difference
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
.si-add {
	top: 50%;
	left: 50%;
	color: $secondary;
	text-align: center;
	position: absolute;
	transform: translate(-50%, -50%);

	i {
		width: 40px;
		height: 40px;
		display: block;
		cursor: pointer;
		line-height: 40px;
		border-radius: 50%;
		margin: 0 auto 10px;
		border: 1px dashed $secondary;
	}
}

.image-clipper {

	.handle-region {
		width: 510px;
		min-height: 500px;
		float: left;
		padding: 20px;
		text-align: left;
		border: 1px solid #ddd;

		>li {
			margin-bottom: 20px;
			padding-bottom: 20px;
			border-bottom: 1px solid #ddd;
		}

		.circular, .rectangle {
			width: 70px;
			height: 70px;
			cursor: pointer;
			line-height: 70px;
			text-align: center;
			display: inline-block;
			border: 1px solid #ddd;
		}

		.circular {
			border-radius: 50%;
		}

		.el-icon-picture, .jiandao {
			font-size: 30px;
			cursor: pointer;
			color: $theme-color;
		}
	}

	.content-region {
		height: 100%;
		margin-left: 552px;

		.clipping-region {
			width: 100%;
			position: relative;
			display: inline-block;

			canvas {
				// float: left;
				background-color: #ffffff;
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
