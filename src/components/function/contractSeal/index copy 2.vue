<template>
    <div class="signature">
		<ul class="handle-region">
			<li>签章</li>
			<li>请选择合同</li>
			<li>
				<i class="el-icon-picture" @click="dialogVisible = true"></i>
			</li>
			<li>
				<div id="chapter-box" class="chapter-box">
					<!-- draggable="false" 禁用默认拖动效果 -->
					<img src="./images/chapter.png" draggable="false" class="chapter" id="chapter">
				</div>
			</li>
			<li>
				<button @click="pictureSynthesis">合成</button>
			</li>
		</ul>
		<div class="content-region">
			<canvas ref='canvas' id="canvas"></canvas>
			<img src="" alt="合成后的图片" class="synthesis">
		</div>

		<el-dialog class="ta-center" title="请选择合同" :visible.sync="dialogVisible">
			<handle-file @success="wordToPdf" />
			<!-- <span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="pictureConversion">确 定</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>
			</span> -->
		</el-dialog>
	</div>
</template>

<script>
import PDFJS from 'pdfjs-dist'
import handleFile from './main/handleFile'

export default {
	name: 'signature', // 签章
	components: {
		handleFile
	},
	data () {
		return {
			pdfurl: 'http://47.98.182.149:3001/uploadFile/word/upload_47362e33d9654e49c45edd496ab423b8.pdf', // pdf链接地址
			pdfDoc: null, // pdfjs 生成的对象
			currentPage: 1, // 当前页
			scale: 1.4, // 放大倍数
			canvas: null, // pdf的canvas元素
			coordinate: [], // 章的坐标
			dialogVisible: false,
		}
	},
	computed: {
		ctx () {
			return this.canvas.getContext('2d')
		}
	},
	mounted () {
		this.initPdf()
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
				this.registerEvents()
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
				console.log('??')
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
			console.log(imgInfo, 'imgInfo')
			const canvas = document.querySelector('canvas').getBoundingClientRect()
			console.log(canvas, 'canvas')

			for (let i = 0, length = this.coordinate.length; i < length; i++) {
				let item = this.coordinate[i]
				console.log(imgEle, 0, 0, 150, 150, item.x - canvas.x, item.y - canvas.y, 150, 150)
				this.ctx.drawImage(imgEle, 0, 0, 150, 150, item.x - canvas.x, item.y - canvas.y, 150 / 1.4, 150 / 1.4)
			}

			document.querySelector('.synthesis').setAttribute('src', this.canvas.toDataURL())
		},
		// 点击下载
		clickDownload () {
			this.pictureSynthesis()
		},
		// word转换为pdf成功后执行
		wordToPdf (url) {
			this.pdfurl = url
			this.dialogVisible = false
			console.log(this.pdfurl, 'this.pdfurl')
			this.initPdf()
		}
	},
}
</script>

<style lang="scss" scoped>
.signature {
	box-sizing: border-box;

	.handle-region {
		width: 300px;
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

		.el-icon-picture {
			font-size: 30px;
			cursor: pointer;
			color: $theme-color;
		}

		.chapter-box {
			display: inline-block;
		}
	}

	.content-region {
		min-height: 900px;
		text-align: center;
		position: relative;
		margin-left: 343px;
	}
}
</style>
