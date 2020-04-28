<template>
    <div class="slider-box">
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <div class="slider"></div>
    </div>
</template>

<script>
export default {
	mounted() {
		this.init()
	},
	methods: {
		init() {
			/**
             * 滑块
             * @param {object}           params
             * @param {string}           params.ele 盒子元素
             */
			let Slider = function(params) {
				this.box = document.querySelector(params.ele)
				this.ul = this.box.querySelector('ul')
				this.liAll = this.ul.querySelectorAll('li')
				this.li = this.liAll[0]
				this.liWidth = this.li.getBoundingClientRect().width
				this.ulInfo = this.ul.getBoundingClientRect()
				this.slider = this.box.querySelector('.slider') // 滑块
				this.sliderWidth = this.slider.getBoundingClientRect().width // 滑块的宽
				this.borderRight = this.getStyle(this.li, 'borderRight') // 右边框
				this.isDown = false // 鼠标状态
				this.color = ['#5CE394', '#56DE8D', '#51DB86', '#4BD67F', '#46D278', '#41CF71', '#3CCC6C', '#37C765', '#31C35D', '#31C35D']
				this.index = 0
				this.defaultColor = '#DDDDDD'

				this.init()
			}

			Slider.prototype.init = function() {
				this.clickUl()
				this.mousedown()
				this.mousemove()
				this.mouseup()
			}

			Slider.prototype.clickUl = function() {
				let that = this
				this.ul.addEventListener('click', function(e) {
					// 移动滑块(块)
					that.move(e)
				})
			}

			// 设置颜色
			Slider.prototype.setColor = function() {
				for (let i = 0; i < this.color.length; i++) {
					if (this.index === -1) {
						this.liAll[i].style.backgroundColor = this.defaultColor
					} else {
						if (i <= this.index) {
							this.liAll[i].style.backgroundColor = this.color[i]
						} else {
							this.liAll[i].style.backgroundColor = this.defaultColor
						}
					}
				}
			}

			// 鼠标按下事件
			Slider.prototype.mousedown = function() {
				let that = this
				this.slider.addEventListener('mousedown', function(e) {
					that.isDown = true
					// console.log('鼠标按下事件')
				})
			}

			// 鼠标移动
			Slider.prototype.mousemove = function() {
				let that = this
				window.addEventListener('mousemove', function(e) {
					// 防止鼠标在移动的过程中抬起
					if (that.isDown === false) {
						return
					}

					// 移动滑块
					that.slider.style.left = e.clientX - that.sliderWidth + 'px'

					// 移动滑块(块)
					that.move(e)
				})
				// window.onmousemove = function(e) {
				//     // 防止鼠标在移动的过程中抬起
				//     if (that.isDown === false) {
				//         return
				//     }

				//     // 移动滑块
				//     that.slider.style.left = e.clientX - that.sliderWidth + 'px'

				//     // 移动滑块(块)
				//     that.move(e)
				// }
			}

			// 鼠标抬起事件
			Slider.prototype.mouseup = function() {
				let that = this
				document.addEventListener('mouseup', function() {
					that.isDown = false
				})
			}

			/**
             * 移动滑块
             * @param {object}           e - event
             */
			Slider.prototype.move = function(e) {
				// 获取 x
				let x = e.clientX - this.ulInfo.x
				let step = Math.floor(x / this.liWidth)
				let value = x % this.liWidth
				let left = 0
				value = value > this.liWidth / 2 ? 0 : -1
				this.index = step + value

				if (this.index === -1) {
					// 获取距离
					left = this.liAll[0].offsetLeft
					// 计算距离
					left = left - this.borderRight - this.sliderWidth / 2
				} else {
					if (this.index < 0) {
						this.index = 0
					} else if (this.index > 9) {
						this.index = 9
					}
					// 获取距离
					left = this.liAll[this.index].offsetLeft
					// 计算距离
					left = left + this.liWidth - this.borderRight - this.sliderWidth / 2
				}

				// console.log(this.borderRight, 'this.borderRight ')
				this.slider.style.left = left + 'px'

				this.setColor()
			}

			/**
             * 获取属性值
             * @param {object} ele  - DOM 对象
             * @param {string} attr - 属性
             * @returns {number} value 属性值
             *
             */
			Slider.prototype.getStyle = function (ele, attr) {
				if (window.getComputedStyle) {
					let value = window.getComputedStyle(ele, null)[attr]
					let index = value.indexOf('px')
					return Number(value.slice(0, index))
				} else {
					// console.log('老铁！解决下兼容')
					return ele.currentStyle
				}
			}

			new Slider({
				ele: '.slider-box'
			})
		}
	},
}
</script>

<style lang="scss" scoped>
.slider-box {
    width: 700px;
    height: 200px;
    margin: 50px auto;
    position: relative;

    >ul {
        height: 50px;
        cursor: pointer;

        >li {
            width: 60px;
            height: 8px;
            float: left;
            border-right: 4px solid #fff;
            background-color: #DDDDDD;
        }
    }

    >.slider {
        width: 10px;
        height: 14px;
        top: -25px;
        cursor: pointer;
        user-select: none;
        position: absolute;

        &::after {
            content: "";
            width: 13px;
            position: absolute;
            height: 13px;
            border-radius: 50%;
            background-color: #31C35D;
        }

        &::before {
            content: "";
            width: 0;
            height: 0;
            bottom: -13px;
            position: absolute;
            border-top: 12px solid #31C35D;
            border-right: 6.5px solid transparent;
            border-bottom: 7px solid transparent;
            border-left: 6.5px solid transparent;
        }
    }
}
</style>
