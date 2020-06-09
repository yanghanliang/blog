<template>
	<right-auto class="components">
		<div class="left-box" slot="layout-left">
			<logo class="logo"></logo>
			<ul v-for="(item, index) in navList" :key="index">
				<span class="lb-class">{{ item.className }}</span>
				<li v-for="(ite, inde) in item.children" :class="{ active: $route.path.includes(ite.route) }" :key="inde">
					<router-link :to="ite.route">{{ ite.text }}</router-link>
				</li>
			</ul>
		</div>
		<router-view slot="layout-right" />
	</right-auto>
</template>

<script>
import logo from '@/components/canvas/logo'
import rightAuto from '@/components/webs/public/layout/content/main/rightAuto'

export default {
	name: 'componentsViews',
	components: {
		logo,
		rightAuto
	},
	data () {
		return {
			navList: [
				{
					className: 'canvas',
					children: [
						{
							route: 'progress',
							text: 'progress 进度条'
						},
						{
							route: 'imageclipper',
							text: 'imageClipper 图片裁剪'
						},
						{
							route: 'contractseal',
							text: 'signature 签章'
						}
					]
				},
				{
					className: '小玩意',
					children: [
						{
							route: 'circular',
							text: '随机分布 圆'
						},
						{
							route: 'square',
							text: '随机分布 方形'
						}
					]
				},
				{
					className: 'dom',
					children: [
						{
							route: 'slider',
							text: '滑块'
						},
						{
							route: 'tag',
							text: '编辑标签'
						}
					]
				},
				{
					className: 'svg',
					children: [
						{
							route: 'connection',
							text: 'connection 连线'
						}
					]
				},
				{
					className: '二次封装',
					children: [
						{
							route: 'echarts',
							text: 'myEcharts'
						}
					]
				}
			]
		}
	},
	mounted () {
		// this.effect()
	},
	beforeDestroy () {
		// this.removeCanvas()
	},
	methods: {
		// 刷新圆
		refreshCircular (ele) {
			this[ele] = false
			this.$nextTick(() => {
				this[ele] = true
			})
		},
		// 效果
		effect () {
			(function () {
				let W, H
				// canvas元素相关
				// 创建canvas元素，并设置canvas元素的id
				var canvas = document.createElement('canvas'),
					context = canvas.getContext('2d'),
					attr = getAttr()
				// 设置创建的canvas的相关属性
				canvas.id = 'c_n' + attr.length
				canvas.className = 'effect'
				canvas.style.cssText = 'position:fixed;top:0;left:0;z-index:' + attr.z + ';opacity:' + attr.opacity
				// 将canvas元素添加到body元素中
				document.getElementsByTagName('body')[0].appendChild(canvas)
				// 该函数设置了canvas元素的width属性和height属性
				getWindowWH()
				// onresize 事件会在窗口或框架被调整大小时发生
				// 此处即为当窗口大小改变时，重新获取窗口的宽高和设置canvas元素的宽高
				window.onresize = getWindowWH
				// 该函数会得到引用了本文件的script元素，
				// 因为本文件中在赋值时执行了一次getScript函数，html文件引用本文件时，本文件之后的script标签还没有被浏览器解释，
				// 所以得到的script数组中，引用了本文的script元素在该数组的末尾
				// 该函数的用意为使开发者能直接修改在html中引入该文件的script元素的属性来修改画布的一些属性，画布的z-index，透明度和小方块数量，颜色
				// 与前面往body元素添加canvas元素的代码配合，当开发者想要使用该特效作为背景时，只需在html文件中添加script元素并引用本文件即可
				function getAttr () {
					let scripts = document.getElementsByTagName('script'),
						len = scripts.length,
						script = scripts[len - 1] // v为最后一个script元素，即引用了本文件的script元素
					return {
						length: len,
						z: script.getAttribute('zIndex') || -1,
						opacity: script.getAttribute('opacity') || 0.5,
						color: script.getAttribute('color') || '0,0,0',
						count: script.getAttribute('count') || 99
					}
				}
				// 获得窗口宽高，并设置canvas元素宽高
				function getWindowWH () {
					W = canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
					H = canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
				}
				// 生成随机位置的小方块
				var random = Math.random,
					squares = [] // 存放小方块
				// 往squares[]数组放小方块
				for (let p = 0; p < attr.count; p++) {
					var squareX = random() * W,
						// 横坐标
						squareY = random() * H,
						// 纵坐标
						squareXa = 2 * random() - 1,
						// x轴位移 -1,1
						squareYa = 2 * random() - 1 // y轴位移
					squares.push({
						x: squareX,
						y: squareY,
						xa: squareXa,
						ya: squareYa,
						max: 6000
					})
				}
				// 生成鼠标小方块
				var mouse = {
					x: null,
					y: null,
					max: 20000
				}
				// 获取鼠标所在坐标
				window.onmousemove = function (i) {
					// i为W3C DOM，window.event 为 IE DOM，以实现兼容IE
					// 不过目前似乎IE已经支持W3C DOM，我用的是IE11，我注释掉下一句代码也能实现鼠标交互效果，
					// 网上说7/8/9是不支持的，本人没有试验，
					// 当然加上是没有错的
					i = i || window.event
					mouse.x = i.clientX
					mouse.y = i.clientY
				}
				// 鼠标移出窗口后，消除鼠标小方块
				window.onmouseout = function () {
					mouse.x = null
					mouse.y = null
				}
				// 绘制小方块，小方块移动(碰到边界反向移动)，小方块受鼠标束缚
				var animation = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
				function (i) {
					window.setTimeout(i, 1000 / 45)
				} // 各个浏览器支持的requestAnimationFrame有所不同，兼容各个浏览器
				function draw () {
					// 清除画布
					context.clearRect(0, 0, W, H)
					var w = [mouse].concat(squares) // 连接(合并)鼠标小方块数组和其他小方块数组
					var x, A
					// square属性表：x，y，xa，ya，max
					squares.forEach(function (i) {
						// 实现小方块定向移动
						i.x += i.xa
						i.y += i.ya
						// 控制小方块移动方向
						// 当小方块达到窗口边界时，反向移动
						i.xa = i.xa * (i.x > W || i.x < 0 ? -1 : 1)
						i.ya = i.ya * (i.y > H || i.y < 0 ? -1 : 1)
						// fillRect前两个参数为矩形左上角的x，y坐标，后两个分别为宽度和高度
						// 绘制小方块
						context.fillRect(i.x - 0.5, i.y - 0.5, 1, 1)
						// 遍历w中所有元素
						for (let n = 0; n < w.length; n++) {
							x = w[n]
							// 如果x与i不是同一个对象实例且x的xy坐标存在
							if (i !== x && x.x !== null && x.y !== null) {
								let xDiff = i.x - x.x // i和x的x坐标差
								let yDiff = i.y - x.y // i和x的y坐标差
								let distance = xDiff * xDiff + yDiff * yDiff // 斜边平方
								if (distance < x.max) {
									// 使i小方块受鼠标小方块束缚，即如果i小方块与鼠标小方块距离过大，i小方块会被鼠标小方块束缚,
									// 造成 多个小方块以鼠标为圆心，mouse.max/2为半径绕成一圈
									if (x === mouse && distance > x.max / 2) {
										i.x = i.x - 0.03 * xDiff
										i.y = i.y - 0.03 * yDiff
									}
									A = (x.max - distance) / x.max
									context.beginPath()
									// 设置画笔的画线的粗细与两个小方块的距离相关，范围0-0.5，两个小方块距离越远画线越细，达到max时画线消失
									context.lineWidth = A / 2
									// 设置画笔的画线颜色为s.c即画布颜色，透明度为(A+0.2)即两个小方块距离越远画线越淡
									context.strokeStyle = 'rgba(' + attr.color + ',' + (A + 0.2) + ')'
									// 设置画笔的笔触为i小方块
									context.moveTo(i.x, i.y)
									// 使画笔的笔触移动到x小方块
									context.lineTo(x.x, x.y)
									// 完成画线的绘制，即绘制连接小方块的线
									context.stroke()
								}
							}
						}
						// 把i小方块从w数组中去掉
						// 防止两个小方块重复连线
						w.splice(w.indexOf(i), 1)
					})
					// window.requestAnimationFrame与setTimeout相似，形成递归调用，
					// 不过window.requestAnimationFrame采用系统时间间隔，保持最佳绘制效率,提供了更好地优化，使动画更流畅
					// 经过浏览器优化，动画更流畅；
					// 窗口没激活时，动画将停止，省计算资源;
					animation(draw)
				}
				// 此处是等待0.1秒后，执行一次draw()，真正的动画效果是用window.requestAnimationFrame实现的
				setTimeout(function () {
					draw()
				},
				100)
			}())
		},
		// 清除效果
		removeCanvas () {
			document.querySelector('.effect').remove()
		},
	},
}
</script>

<style lang="scss" scoped>
.components {
	>>> .layout-left {
		width: 2.1rem;
		border-top-right-radius: 40px;
		border-bottom-right-radius: 40px;
		box-shadow: 0 0 7px -2px #00000059;
		background-color: #fff;

		.left-box {
			top: 0;
			bottom: 0;
			text-align: left;
			position: absolute;
			padding: 1rem 0.2rem 0.2rem 0.2rem;

			span {
				font-size: 12px;
			}

			.logo {
				top: -55px;
				left: -50px;
				position: absolute;
				transform: scale(.5);
			}

			.lb-class {
				color: $ash;
				line-height: 40px;
			}

			ul {
				line-height: 0;
				margin-bottom: 5px;

				li {
					margin-bottom: 10px;

					&:nth-last-child(1) {
						margin-bottom: 0;
					}

					&.active a {
						color: $theme-color2;
					}

					a {
						height: 20px;
						display: block;
						color: $main-font;
						line-height: 20px;
					}
				}
			}

		}
	}

	>>> .layout-right {
		padding: 20px;
		margin-left: 234px;
		background-color: #fff;
		border-top-left-radius: 30px;
		border-bottom-left-radius: 30px;
		box-shadow: 0 0 8px -2px #00000059;
	}
}
</style>
