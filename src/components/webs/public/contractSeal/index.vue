<template>
    <div class="signature">
		<div class="clearfix">
			<div class="s-left fl">
				<div class="chapter" @mousedown="mousedown">章</div>
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
	name: 'signature',
	data() {
		return {
			pdfurl: 'http://47.98.182.149:3001/uploadFileURl/pdf/user.pdf', // pdf链接地址
			pdfDoc: null, // pdfjs 生成的对象
			currentPage: 1, // 当前页
			scale: 1.4, // 放大倍数
			canvas: null, // pdf的canvas元素
		}
	},
	computed: {
		ctx() {
			return this.canvas.getContext('2d')
		}
	},
	mounted() {
		this.initPdf()
	},
	methods: {
		// 渲染pdf
		renderPage(num) {
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
		initPdf() {
			// 获取 canvas
			this.canvas = this.$refs.canvas
			// 初始化pdf
			PDFJS.getDocument(this.pdfurl).then((pdfDoc_) => {
				this.pdfDoc = pdfDoc_
				this.page_count = this.pdfDoc.numPages
				this.renderPage(this.currentPage)
			}).catch(function(err) {
				if (err) {
					console.log(err)
					this.throwerr(this.pdfurl)
				}
			})
		},
		// 鼠标按下章时执行
		mousedown(e) {
			// 获取点击的元素
			let ele = e.target
			// 获取元素信息
			let eleInfo = ele.getBoundingClientRect()
			// 克隆这个元素及它的所有子节点
			let cloneEle = ele.cloneNode(true)
			// 获取body
			let body = document.querySelector('body')
			// 把克隆的元素放入body中
			body.appendChild(cloneEle)
			// console.log(e, 'e')
			// 设置属性
			cloneEle.style.position = 'absolute'
			cloneEle.style.top = eleInfo.top + 'px'
			cloneEle.style.left = eleInfo.left + 'px'
			// 给克隆的元素注册事件
			this.registerEvents(cloneEle)
		},
		// 注册事件
		registerEvents(ele) {
			let Drag = function(params) {
				this.ele = params.ele
				this.isDown = false // 鼠标状态： false 抬起 || true 按下
			}

			// 鼠标按下事件
			Drag.prototype.mousedown = function() {
				let that = this
				this.ele.addEventListener('mousedown', function(e) {
					that.isDown = true
					console.log('鼠标按下事件')
				})
			}

			// 鼠标移动
			Drag.prototype.mousemove = function() {
				let that = this
				window.addEventListener('mousemove', function(e) {
					// 防止鼠标在移动的过程中抬起
					if (that.isDown === false) {
						return
					}

					// 移动滑块
					that.ele.style.left = e.x - that.sliderWidth + 'px'

					// 移动滑块(块)
					that.move(e)
				})
			}

			// 鼠标抬起
			Drag.prototype.mouseup = function() {
				let that = this
				document.addEventListener('mouseup', function() {
					that.isDown = false
				})
			}

			new Drag({ ele: ele })
		}
	},
}
</script>

<style lang="scss">
.chapter {
	width: 150px;
	height: 150px;
	border-radius: 50%;
	line-height: 150px;
	text-align: center;
	background-color: pink;
}
</style>

<style lang="scss" scoped>
.signature {
	box-sizing: border-box;

	.s-left {
		width: 200px;
		height: 1000px;
		padding: 20px;
		border: 1px solid #fff;
	}

	.s-right {
		width: 900px;
		min-height: 900px;
		text-align: center;
	}
}
</style>
