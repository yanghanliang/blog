<template>
    <div class="signature">
		<button @click="pictureSynthesis">合成</button>
		<img src="" alt="合成后的图片" class="synthesis">
		<div class="clearfix">
			<div class="s-left fl" id="chapter-box">
				<!-- draggable="false" 禁用默认拖动效果 -->
				<img src="../../../../assets/backgroundImages/headPortrait/chapter.jpg" draggable="false" class="chapter" id="chapter">
			</div>
			<div class="s-right fr">
				<canvas ref='canvas'></canvas>
			</div>
		</div>
	</div>
</template>

<script>
import PDFJS from 'pdfjs-dist'

export default {
	name: 'signature', // 签章
	data () {
		return {
			pdfurl: 'http://47.98.182.149:3001/uploadFileURl/pdf/user.pdf', // pdf链接地址
			pdfDoc: null, // pdfjs 生成的对象
			currentPage: 1, // 当前页
			scale: 1.4, // 放大倍数
			canvas: null, // pdf的canvas元素
			coordinate: []  // 章的坐标
		}
	},
	computed: {
		ctx () {
			return this.canvas.getContext('2d')
		}
	},
	mounted () {
		this.initPdf()
		this.registerEvents()
	},
	methods: {
		// 渲染pdf
		renderPage (num) {
			this.pdfDoc.getPage(num).then((page) => {
				var viewport = page.getViewport(this.scale)
				// console.log(viewport.width, 'viewport.width')
				this.canvas.height = viewport.height
				this.canvas.width = viewport.width

				var renderContext = {
					canvasContext: this.ctx,
					viewport: viewport
				}
				page.render(renderContext)
			})
		},
		// 初始化PDF
		initPdf () {
			// 获取 canvas
			this.canvas = this.$refs.canvas
			// 初始化pdf
			PDFJS.getDocument(this.pdfurl).then((pdfDoc_) => {
				this.pdfDoc = pdfDoc_
				this.page_count = this.pdfDoc.numPages
				this.renderPage(this.currentPage)
			}).catch(function (err) {
				if (err) {
					console.log(err)
					this.throwerr(this.pdfurl)
				}
			})
		},
		// 给章注册事件
		registerEvents () {
			let Drag = function (params) {
				this.vue = params.vm
				this.isDown = false
				this.eleInfo = null
				this.ele = null
				this.scrollTop = 0
				this.x = 0
				this.y = 0

				this.init()
			}

			// 事件初始化
			Drag.prototype.init = function () {
				this.mousedown()
				this.mousemove()
				this.mouseup()
				this.scroll()
			}

			// 元素按下
			Drag.prototype.mousedown = function () {
				let parent = document.querySelector('#chapter-box')
				parent.addEventListener('mousedown', e => {
					if (e.target.className.includes('chapter')) {
						this.ele = e.target
						document.body.style.cursor = 'pointer'
						let cloneEle = this.ele.cloneNode(true)
						cloneEle.removeAttribute('id')
						parent.appendChild(cloneEle)

						this.eleInfo = cloneEle.getBoundingClientRect()
						this.ele.style.position = 'absolute'
						this.ele.style.zIndex = 999
						this.isDown = true
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

					if (e.target.className.includes('chapter')) {
						// 保存坐标
						let coordinate = {
							x: this.x - this.eleInfo.width / 2,
							y: this.y + this.scrollTop - this.eleInfo.height / 2
						}
						this.vue.coordinate.push(coordinate)
					}
				})
			}

			// 元素滚动
			Drag.prototype.scroll = function () {
				document.addEventListener('scroll', e => {
					this.scrollTop = document.documentElement.scrollTop
					console.log(this.scrollTop, 'this.scrollTop')
					this.move()
				})
			}

			// 元素移动
			Drag.prototype.move = function () {
				if (this.ele && this.isDown) {
					this.ele.style.top = this.y - this.eleInfo.height / 2 + this.scrollTop + 'px'
					this.ele.style.left = this.x - this.eleInfo.width / 2 + 'px'
				}
			}

			new Drag({
				vm: this
			})
		},
		// 图片合成
		pictureSynthesis () {
			const imgEle = document.querySelector('#chapter')
			const imgInfo = imgEle.getBoundingClientRect()
			const canvas = this.canvas.getBoundingClientRect()

			for (let i = 0, length = this.coordinate.length; i < length; i++) {
				let item = this.coordinate[i]
				this.ctx.drawImage(imgEle, 0, 0, imgInfo.width, imgInfo.height, item.x - canvas.x, item.y - canvas.y, imgInfo.width, imgInfo.height)
			}

			document.querySelector('.synthesis').setAttribute('src', this.canvas.toDataURL())
		},
		// 点击下载
		clickDownload () {
			this.pictureSynthesis()
		},
	},
}
</script>

<style lang="scss" scoped>
.signature {
	box-sizing: border-box;

	.s-left {
		width: 200px;
		height: 1000px;
		padding: 20px;
		border: 1px solid #fff;

		.chapter {
			width: 150px;
			height: 150px;
			display: block;
			user-select: none;
			border-radius: 50%;
			line-height: 150px;
			text-align: center;
			background-color: pink;
		}
	}

	.s-right {
		width: 900px;
		min-height: 900px;
		text-align: center;
	}
}
</style>
