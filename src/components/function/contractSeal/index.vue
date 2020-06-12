<template>
    <div class="signature">
		<ul class="handle-region">
			<li>签章</li>
			<li class="no" attr-no="1">请上传您需要签章的合同</li>
			<li>
				<i class="el-icon-picture" @click="dialogVisible = true"></i>
			</li>
			<li class="no" attr-no="2">把章拖到您想盖的地方</li>
			<li>
				<div id="chapter-box" class="chapter-box">
					<!-- draggable="false" 禁用默认拖动效果 -->
					<!-- 选择的章分辨率必须和图片大小一致 -->
					<img src="./images/chapter.png" draggable="false" class="chapter" id="chapter">
				</div>
			</li>
			<li class="no" attr-no="3">确认盖章</li>
			<li>
				<i class="my-icon-gaizhang" @click="pictureSynthesis"></i>
			</li>
			<li>此功能目前只是实现了功能，但还没来得及优化</li>
		</ul>
		<div class="content-region" ref="contentRegion">
			<canvas v-show="!src" ref='canvas' id="canvas"></canvas>
			<a v-show="src" :href="src" download="beautifulGirl" title="点击下载">
				<img v-show="src" :src="src" alt="合成后的图片" class="synthesis">
			</a>
			<el-pagination
				background
				v-if="total > 1"
				class="mt10 mb10"
				layout="prev, pager, next"
				@current-change="renderPage"
				:page-size="1"
				:total="total">
			</el-pagination>
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
			pdfurl: 'http://47.98.182.149:3001/uploadFile/pdf/contract_seal.pdf', // pdf链接地址
			pdfDoc: null, // pdfjs 生成的对象
			currentPage: 1, // 当前页
			scale: 1.4, // 放大倍数
			canvas: null, // pdf的canvas元素
			coordinate: [], // 章的坐标
			dialogVisible: false,
			src: '',
			total: 0
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
				this.total = this.pdfDoc._pdfInfo.numPages
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
						cloneEle.className = 'chapter clone'
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
							y: this.y - this.eleInfo.height / 2 + this.scrollTop - this.vue.$refs.contentRegion.offsetTop
						}
						this.vue.coordinate.push(coordinate)
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
			const cloneAll = document.querySelectorAll('.clone')

			for (let i = 0, length = this.coordinate.length; i < length; i++) {
				let item = this.coordinate[i]
				this.ctx.drawImage(imgEle, 0, 0, imgInfo.width, imgInfo.height, item.x - canvas.x, item.y, imgInfo.width, imgInfo.height)
			}

			document.querySelector('#chapter').removeAttribute('style')
			this.src = this.canvas.toDataURL()
			cloneAll.forEach((item) => {
				item.remove()
			})
			this.$message.success('签章成功，点击图片即可下载~')
			// document.querySelector('.synthesis').setAttribute('src', this.canvas.toDataURL())
		},
		// 点击下载
		clickDownload () {
			this.pictureSynthesis()
		},
		// word转换为pdf成功后执行
		wordToPdf (url) {
			this.pdfurl = url
			this.dialogVisible = false
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
		}

		.el-icon-picture, .my-icon-gaizhang {
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

		canvas {
			box-shadow: 0 0 10px -3px #0000004f;
		}
	}
}
</style>
