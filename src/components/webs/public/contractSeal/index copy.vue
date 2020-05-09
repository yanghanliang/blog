<template>
    <div class="helpCenter" v-loading="!isready">
        <div class="main" v-show="isready">
            <div class="side-bar">
                <h2>推拽章的信息</h2>
                <div class="side-barinfo">
                    <div class="signbutton">推动盖章</div>
                    <div class="sign-img" @mousedown='signPic' @mouseup='removeSignPic'>
                        <div class="sign-imginner">
                        <h2 style="color:#fff;text-align:center;">章托放</h2>
                        </div>
                        <!-- <img src="" style="width:200px;height:200px;" alt=""> -->
                    </div>
                </div>

            </div>
            <div class="center">
                <div class="sign-wrap" @mousedown='signPic' @mouseup='removeSignPic'></div>
                <canvas style="border:1px solid #f00" ref='canvasDOM' class="canvasstyle" id="the-canvas"></canvas>
            </div>
        </div>
        <div class="pdfBtn">
            <button type="primary" @click="prev"><i class="el-icon-arrow-left el-icon--left"></i>上一页</button>
            <span>Page: <span v-text="page_num"></span> / <span v-text="page_count"></span></span>
            <button type="primary" @click="next">下一页<i class="el-icon-arrow-right el-icon--right"></i></button>
            <input type="text" v-model='gotopage_num' style="width:100px;height:29px;" placeholder="请输入页数">
            <button @click="goTopage">确定</button>
            <button @click="downpdf">下载</button>
        </div>
    </div>
</template>

<script>
import PDFJS from '../../../../../node_modules/pdfjs-dist/build/pdf.js'
console.log(PDFJS, 'PDFJS')
// let PDFJS = require('pdfjs-dist')
// PDFJS.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.min')

export default {
	name: 'helpCenter',
	data() {
		return {
			pdfurl: 'http://47.98.182.149:3001/uploadFileURl/pdf/user.pdf', // pdf链接地址
			pdfDoc: null, // pdfjs 生成的对象
			pageNum: 1, //
			pageRendering: false,
			pageNumPending: null,
			compuscale: 1, // 放大倍数
			scale: 1.6, // 放大倍数
			page_num: 0, // 当前页数
			page_count: 0, // 总页数
			gotopage_num: '', // 跳转到指定的页面
			// maxscale: 2, //最大放大倍数
			// minscale: 0.8, //最小放大倍数
			isready: false
		}
	},
	created() {
		var root = '$Urlhttp'
		if (root !== '/ssocorp') {
			this.ajaxUrl = ''
		}
		var root2 = '$webRoot'
		if (root2 === '/api') {
			this.ajaxUrl2 = '/api'
		} else if (root2 !== '/testca') {
			this.ajaxUrl2 = ''
		};
	},
	methods: {
		signPic(e) {
			document.addEventListener('mousemove', this.signmouseMve, false)
		},
		removeSignPic(e) {
			let signPicdom = document.querySelector('.sign-img')
			let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
			console.log(e)
			console.dir(signPicdom)
			console.log('scrollTop:', scrollTop)
			console.dir(this.$refs.canvasDOM)
			let perX = (this.getOffsetLeft(signPicdom) - this.getOffsetLeft(this.$refs.canvasDOM)) / this.$refs.canvasDOM.clientWidth
			let perY = (this.getOffsetTop(signPicdom) - this.getOffsetTop(this.$refs.canvasDOM) + scrollTop + 21) / this.$refs.canvasDOM.clientHeight
			let signWraphtml = document.querySelector('.sign-wrap')
			signWraphtml.style.top = this.$refs.canvasDOM.clientHeight * perY + 'px'
			signWraphtml.style.left = this.$refs.canvasDOM.clientWidth * perX + 'px'
			signWraphtml.appendChild(signPicdom.firstChild)
			document.removeEventListener('mousemove', this.signmouseMve, false)
			console.log({perX: parseInt(perX * 100) + '%', perY: parseInt(perY * 100) + '%'})
			return {perX: perX, perY: perY}// 获取到最后的位置；反出来；
		},
		signmouseMve(e) {
			var signPicdom = document.querySelector('.sign-img')
			if (!(document.querySelector('.sign-wrap').firstChild === null)) {
				signPicdom.appendChild(document.querySelector('.sign-wrap').firstChild)
			}
			var ev = e || event
			signPicdom.style.position = 'fixed'
			signPicdom.style.top = (this.getPos(ev).y - signPicdom.clientHeight / 2) + 'px'
			signPicdom.style.left = (this.getPos(ev).x - signPicdom.clientWidth / 2) + 'px'
		},
		getPos(ev) {
			// let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
			// let scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
			return {x: ev.clientX, y: ev.clientY}
		},
		getOffsetLeft(obj) {
			var tmp = obj.offsetLeft
			var val = obj.offsetParent
			while (val != null) {
				tmp += val.offsetLeft
				val = val.offsetParent
			}
			return tmp
		},
		getOffsetTop(obj) {
			var tmp = obj.offsetTop
			var val = obj.offsetParent
			while (val != null) {
				tmp += val.offsetTop
				val = val.offsetParent
			}
			return tmp
		},
		downpdf() { // 下载pdf
			window.open(this.pdfurl)
		},
		renderPage(num) { // 渲染pdf
			let vm = this
			this.pageRendering = true
			let canvas = document.getElementById('the-canvas')
			// Using promise to fetch the page
			this.pdfDoc.getPage(num).then(function(page) {
				var viewport = page.getViewport(vm.compuscale)
				// alert(vm.canvas.height)
				canvas.height = viewport.height
				canvas.width = viewport.width

				// Render PDF page into canvas context
				vm.isready = true
				var renderContext = {
					canvasContext: vm.ctx,
					viewport: viewport
				}
				var renderTask = page.render(renderContext)

				// Wait for rendering to finish
				renderTask.promise.then(function() {
					vm.pageRendering = false
					if (vm.pageNumPending !== null) {
						// New page rendering is pending
						vm.renderPage(vm.pageNumPending)
						vm.pageNumPending = null
					}
				})
			})
			vm.page_num = vm.pageNum
		},
		addscale() { // 放大
			if (this.compuscale >= this.maxscale) {
				return
			}
			this.compuscale += 0.1
			this.queueRenderPage(this.pageNum)
		},
		minus() { // 缩小
			if (this.compuscale <= this.minscale) {
				return
			}
			this.compuscale -= 0.1
			this.queueRenderPage(this.pageNum)
		},
		prev() { // 上一页
			let vm = this
			if (vm.pageNum <= 1) {
				return
			}
			vm.pageNum--
			vm.queueRenderPage(vm.pageNum)
		},
		next() { // 下一页
			let vm = this
			if (vm.pageNum >= vm.page_count) {
				return
			}
			vm.pageNum++
			vm.queueRenderPage(vm.pageNum)
		},
		// 跳转到指定的页
		goTopage() {
			var that = this
			if (Number.isNaN(that.gotopage_num / 1)) {
				this.$message.error('请输入数字')
				this.gotopage_num = ''
				return
			}
			if (this.gotopage_num < 1 || this.gotopage_num > this.page_count) {
				this.gotopage_num = ''
				this.$message.error('请输入范围内的页码')
				return
			};
			this.pageNum = this.gotopage_num
			this.queueRenderPage(that.gotopage_num)
		},
		closepdf() { // 关闭PDF
			this.pageNum = 1
			this.pdfDoc = null
			this.isready = false
			this.compuscale = this.scale
			this.$emit('closepdf')
		},
		throwerr(err) {
			this.$emit('pdferr', err)
		},
		queueRenderPage(num) {
			var a = parseInt(num)
			console.log(a)
			if (this.pageRendering) {
				this.pageNumPending = a
			} else {
				this.renderPage(a)
			}
		}
	},
	computed: {
		ctx() {
			let id = document.getElementById('the-canvas')
			return id.getContext('2d')
		},
		isshowpdf() {
			if (this.value === undefined) return false
			return this.value
		}
	},
	mounted() {
		this.compuscale = this.scale
		let vm = this
		var val = vm.pdfurl
		if (val === '' || val === undefined) return
		PDFJS.getDocument(val).then(function(pdfDoc_) { // 初始化pdf
			vm.pdfDoc = pdfDoc_
			vm.page_count = vm.pdfDoc.numPages
			vm.renderPage(vm.pageNum)
		}).catch(function(err) {
			if (err) {
				console.log(err)
				vm.throwerr(vm.pdfurl)
			}
		})
	}
}
</script>

<style lang="scss" scoped>
.helpCenter{
    background-color:#fff;

    .center {
        position: relative;
        text-align: center;
        padding-top: 20px;
        background: #fff;
    }

    .sign-wrap{
        position: absolute;
        .sign-img{
            position: relative;
        }
    }
}

.helpCenter .pdfBtn{
    width: 1200px;
    margin: 0 auto;
    background-color: #fff;
    text-align: center;
    margin-bottom:10px;

    button{
        cursor: pointer;
        width: 100px;
        height: 30px;
    }

}

.main{
    display: flex;
    justify-content: center;
}

.side-bar{
    .side-barinfo{
        width:300px;
        height: 100vh;
        border: 1px solid #fa0;
    }

    .signbutton{
        cursor: pointer;
    }
}

.sign-img{
    z-index: 18;
}
.sign-imginner{
    width: 200px;
    height: 200px;
    z-index: 18;
    background-color: pink;
//    display: none;
}
</style>
