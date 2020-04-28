<template>
    <div class="connection clearfix">
        <ul class="co_left">
			<template v-for="(item, index) in leftData">
				<li @mousedown="getStartCoordinate" :key="'left-' + index">{{ item }}</li>
			</template>
        </ul>
		<!-- 剪刀 -->
		<svg version="1.1" xmlns="http://www.w3.org/2000/svg">
			<symbol width="18px" height="15px" viewBox="0 0 18 15" id="scissors">
				<g stroke="none" stroke-width="1" fill-rule="evenodd">
					<g transform="translate(-1, 0)" fill-rule="nonzero">
						<path d="M2.15139089,8.38696897 L1.91979391,8.71622093 C1.82573347,8.85259217 1.747064,9.04286222 1.75341717,9.25766058 C1.75611298,9.47578279 1.83626757,9.70492248 1.99014535,9.93835622 C2.21526822,10.2766834 2.61375827,10.6373187 3.23698308,11.0074902 L8.49561842,14.2943297 L8.39785704,11.7465765 L2.15143659,8.38694861 L2.15139089,8.38696897 Z" transform="translate(5.124338, 11.340639) rotate(-60.000000) translate(-5.124338, -11.340639) "></path>
						<path d="M17.7652914,4.46752066 L17.7652431,4.46751993 L13.0240642,7.1401352 L11.2387239,6.1976818 L12.328745,5.52569376 C12.6889461,5.26756795 12.8106272,5.08248958 12.9145273,4.81569308 C13.0125666,4.54560875 13.0545837,4.15963242 13.1175106,3.63341907 C13.2136669,2.89362972 13.3936644,2.13753272 13.8657151,1.50729544 C14.3329666,0.878579852 15.0993739,0.455665739 16.119138,0.394457167 C16.129798,0.396223297 16.1423476,0.394809179 16.1530076,0.396575309 C17.1698622,0.333708189 17.9005097,0.562048647 18.3614926,1.02753532 C18.8224756,1.49302199 18.9577317,2.13886796 18.935999,2.75996027 C18.9259589,3.09207943 18.8387729,3.43583428 18.6328664,3.72984427 C18.4269599,4.02385426 18.1386514,4.24632745 17.7719803,4.46281871 L17.7652914,4.46752066 Z M15.1290676,2.21180718 L15.1290793,2.21178742 C14.1736859,2.78199619 13.7779625,3.99968446 14.2474991,4.93016396 L17.7082091,2.86915701 C17.2405323,1.93550677 16.0873706,1.64325696 15.1290676,2.21180718 Z"></path>
						<path d="M12.1672181,10.1256747 L12.1671934,10.1256344 L10.5886029,9.2949512 L1.36187119,4.44394758 L1.56048322,4.05716725 C1.6409747,3.8954413 1.7802081,3.72023593 1.97629538,3.59380722 C2.17429059,3.46420851 2.41762161,3.38961961 2.69483037,3.37625466 C3.10333123,3.35210514 3.60191435,3.45871458 4.21550844,3.739592 L7.53094441,5.14777213 L12.2462304,7.62832976 L12.2405849,7.637831 C12.2244763,7.65834493 12.210264,7.67570861 12.197095,7.69787158 C12.1166035,7.85959753 12.1699213,8.04571562 12.3208605,8.11350844 L12.6150003,8.24896673 L17.5516683,10.5539704 L17.559407,10.5540978 C17.9083257,10.7287144 18.1811419,10.919766 18.3682471,11.1893915 C18.5534743,11.4621776 18.6178623,11.793831 18.6040728,12.1323012 C18.584218,12.750233 18.3998172,13.415208 17.9066639,13.9365007 C17.408693,14.4593049 16.656924,14.772202 15.6409158,14.8270896 C14.6048344,14.8960531 13.8540975,14.5635768 13.4240767,13.9803484 C12.9950874,13.401939 12.8698556,12.6603963 12.8240781,11.9296357 C12.7981611,11.4084429 12.7841488,11.0248257 12.704495,10.7648321 C12.6210853,10.5111596 12.5090139,10.3385407 12.1672181,10.1256747 Z M14.0303205,10.4446766 C13.488648,11.428522 13.7911657,12.6072715 14.7074627,13.0748703 C15.6189606,13.5439908 16.8020015,13.1226121 17.3455519,12.1356063 L14.0303205,10.4446766 Z" id="合并形状"></path>
					</g>
				</g>
			</symbol>
		</svg>
		<!-- 画布 -->
        <svg widtj="400px" height="400px" ref="svg" class="svg-line" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<!-- 已连接的线 -->
			<g v-for="(item, index) in lineArr" :key="'g-' + index">
				<polyline @mouseenter="mouseenter" @mouseleave="mouseleave" @click="deleteLine(index)" :points="item" marker-end="url(#arrow)" :key="'line-' + index"></polyline>
				<use xlink:href="#scissors" width="19" height="16" fill="blue"></use>
			</g>
			<!-- 当前移动的线 -->
			<polyline :points="coordinate" marker-end="url(#arrow)"></polyline>
			<!-- 箭头 -->
			<marker id="arrow" markerUnits="strokeWidth" markerWidth="12" markerHeight="12" viewBox="0 0 12 12" refX="9" refY="6" orient="auto"><path d="M2,2 L10,6 L2,10 L6,6 L2,2"></path></marker>
		</svg>
        <ul class="co_right">
            <template v-for="(item, index) in rightData">
				<li :key="'right-' + index">{{ item }}</li>
			</template>
        </ul>
    </div>
</template>

<script>
export default {
	name: 'connection',
	data() {
		return {
			leftData: ['a', 'b', 'c'],
			rightData: [1, 2, 3],
			points: {
				startX: '0',
				startY: '0',
				endX: '0',
				endY: '0'
			},
			isDown: false,
			svg: '',
			lineArr: []
		}
	},
	computed: {
		coordinate() {
			if (this.points.startX && this.points.startY && this.points.endX && this.points.endY) {
				let value = `${this.points.startX},${this.points.startY} ${this.points.endX},${this.points.endY}`
				return value
			} else {
				return ''
			}
		}
	},
	created() {
		this.registerEvent()
	},
	mounted() {
		// 获取svg信息
		this.svg = this.$refs.svg.getBoundingClientRect()
	},
	methods: {
		// 获取开始坐标
		getStartCoordinate(event) {
			this.points.startX = '0'
			this.points.startY = event.y - this.svg.y
			this.isDown = true
		},
		// 注册事件
		registerEvent() {
			let that = this
			// 鼠标移动
			window.onmousemove = function(event) {
				// 防止鼠标在移动的过程中抬起
				if (that.isDown === false) {
					return
				}
				// 分别兼容ie和chrome
				let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft
				let scrollY = document.documentElement.scrollTop || document.body.scrollTop
				let e = window.event || event // 利用传参兼容火狐
				// 获取 x 和 y
				let endX = e.clientX + scrollX,
					endY = e.clientY + scrollY

				that.points.endX = endX - that.svg.x
				that.points.endY = endY - that.svg.y
			}

			// 鼠标抬起事件
			document.onmouseup = function(event) {
				// 防止鼠标在移动的过程中抬起-很有必要
				if (that.isDown === false) {
					return
				}
				// let e = window.event || event // 利用传参兼容火狐
				// let target = e.target ? e.target : e.srcElement // 兼容所有浏览器
				that.isDown = false
				that.points.endX = that.svg.width
				let points = `${that.points.startX},${that.points.startY} ${that.points.endX},${that.points.endY}`
				that.lineArr.push(points)
				// 重置结束的坐标
				that.points.endX = ''
			}
		},
		// 鼠标移入线条
		mouseenter(event) {
			let use = event.target.nextElementSibling
			// 注意这里修改位置必须是x,y而不是margin left ...
			use.setAttribute('x', event.x - this.svg.x - 10)
			use.setAttribute('y', event.y - this.svg.y - 10)
			use.style.display = 'block'
		},
		// 鼠标移出线条
		mouseleave(event) {
			let use = event.target.nextElementSibling
			use.style.display = 'none'
		},
		// 删除线条
		deleteLine(index) {
			this.lineArr.splice(index, 1)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/color/index.scss'; // 使用方法

.connection {
    .co_left,.co_right {
        width: 100px;
		height: 200px;
		float: left;
		border: 1px solid $border-color;

        li {
            height: 30px;
			line-height: 30px;
			user-select: none;
            border-bottom: 1px solid $border-color;
        }
	}

	.svg-line {
		float: left;

		polyline {
			fill: transparent;
			stroke: #89adea;
			stroke-width: 1;
		}

		g {
			use {
				display: none;
				position: fixed;
			}

			&:hover {
				use {
					display: block;
				}
			}
		}
	}
}
</style>
