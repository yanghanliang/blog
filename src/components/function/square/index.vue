<template>
    <div class="box" id="square"></div>
</template>

<script>
export default {
	mounted () {
		this.init()
	},
	methods: {
		init () {
			function Circular () {
				this.box = document.querySelector('#square')
				this.width = this.getStyle(this.box, 'width')
				this.height = this.getStyle(this.box, 'height')
				this.number = 30
				this.xCoordinate = []
				this.yCoordinate = []
				this.coordinate = []
				this.circularWidth = 30

				this.init()
			}

			Circular.prototype.init = function () {
				// 获取一定范围内随机不重复的 x 轴和 y 轴的数据
				this.getRangeCoo()
				// 去除相隔一点范围内的数据（防止重叠
				this.differenceValue()
				// 将两个坐标合在一起
				this.coordinate = this.concatArr({
					arr: this.xCoordinate,
					arrs: this.yCoordinate
				})
				console.log('数据最多能放' + this.coordinate.length + '个')
				// 打乱数组
				this.coordinate = this.disruptedArr({
					data: this.coordinate
				})
				// 创建元素
				this.forCreatedEle()
			}

			Circular.prototype.createdEle = function (params) {
				let ele = document.createElement('div')

				ele.className = 'circular'
				ele.style.top = params.y + 'px'
				ele.style.left = params.x + 'px'

				this.box.appendChild(ele)
			}

			// 获取一定范围内随机不重复的数
			Circular.prototype.getRangeCoo = function () {
				let xParams = {
					range: {
						min: 0,
						max: this.width - this.circularWidth
					},
					number: this.number,
				}
				let yParams = {
					range: {
						min: 0,
						max: this.height - this.circularWidth
					},
					number: this.number,
				}
				this.xCoordinate = this.randomCoordinate(xParams)
				this.yCoordinate = this.randomCoordinate(yParams)
			}

			// 去掉相邻之间一定范围内差值的数
			Circular.prototype.differenceValue = function () {
				let x = {
					data: this.xCoordinate,
					difference: this.circularWidth,
					symbol: '>'
				}
				let y = {
					data: this.yCoordinate,
					difference: this.circularWidth,
					symbol: '>'
				}
				this.xCoordinate = this.arrExclude(x)
				this.yCoordinate = this.arrExclude(y)
			}

			// 创建元素
			Circular.prototype.forCreatedEle = function () {
				for (let i = 0; i < this.number; i++) {
					this.createdEle(this.coordinate[i])
				}
			}

			/*
            * 传如两个数组合成一个数组对象
            * @param {object}           params
            * @param {array}            params.arr
            * @param {array}            params.arrs
            */
			Circular.prototype.concatArr = function (params) {
				let arr = params.arr
				let arrs = params.arrs
				let length = arr.length
				let leng = arrs.length
				let data = []

				for (let i = 0; i < length; i++) {
					for (let j = 0; j < leng; j++) {
						let obj = {
							x: arr[i],
							y: arrs[j]
						}

						data.push(obj)
					}
				}

				return data
			}

			/**
             * 获取属性值
             * @param {object} ele  - DOM 对象
             * @param {string} attr - 属性
             * @returns {number} value 属性值
             *
             */
			Circular.prototype.getStyle = function (ele, attr) {
				if (window.getComputedStyle) {
					let value = window.getComputedStyle(ele, null)[attr]
					let index = value.indexOf('px')
					return Number(value.slice(0, index))
				} else {
					// console.log('老铁！解决下兼容')
					return ele.currentStyle
				}
			}

			/*
            * 获取某段范围内的随机不重复数据（坐标）
            * 适用范围是 number 比较大，且 range 比较大 例如 - number 10 range 300
            * @author          yanghanliang
            * @created         2019-10-15
            * @lastEditDate    2019-10-15
            * @param {object}  params
            * @param {object}  params.range            范围
            * @param {array}  params.range.min         最小值 - 默认为 0
            * @param {array}  params.range.max         最大值
            * @param {number}  params.number           个数 - 有默认值： 可用范围内的 2%
            * @return {array}  较为均匀的随机值
            */
			Circular.prototype.randomCoordinate = function (params) {
				params.range.min = params.range.min ? params.range.min : 0

				let random = Math.ceil((params.range.max - params.range.min) * 0.02)
				random = random < 0 ? 1 : random

				let defaultValue = {
					number: random,
				}
				params = this.paramsInherit({
					params: params,
					defaultValue: defaultValue
				})

				let range = params.range.max - params.range.min
				let average = Math.floor(range / params.number)
				let temp = params.range.min
				let data = [] // 从小到大的值

				for (let i = 0; i < params.number; i++) {
					let value = temp + average
					let random = this.random({
						min: temp,
						max: value,
					})
					data.push(random)
					temp = value
				}
				return data
			}

			/*
            * 参数继承-如果传入的参数存在则替换掉默认值
            * 现在只支持对象的参数
            * @param {object}          params
            * @param {object}          params.params - 传入的参数
            * @param {object}          params.defaultValue - 默认值 不存在默认值时，默认为 0
            * @return {object}         param 继承默认值后的参数
            */
			Circular.prototype.paramsInherit = function (params) {
				let recursion = function (param, defaultValue) {
					// 循环默认值
					for (let key in defaultValue) {
						// 判断参数中是否存在默认值
						let type = typeof param[key]
						if (type === 'object') {
							recursion(param[key], defaultValue[key])
						} else {
							if (!param[key]) {
								if (type === 'object') {
									recursion(param[key], defaultValue[key])
								} else {
									// 不存在，则给参数补充上
									param[key] = defaultValue[key]
								}
							}
						}
					}
				}

				recursion(params.params, params.defaultValue)
				return params.params
			}

			/**
             * 获取某个范围的随机数
             * @param {object}      params
             * @param {object}      params.symbol
             * @param {string}      params.symbol.min 默认: 'contain' - 'contain' 标识包含 'not' 标识不包含
             * @param {string}      params.symbol.max 默认: 'contain' - 'contain' 标识包含 'not' 标识不包含
             * @param {number}      params.min 最小值
             * @param {number}      params.max 最大值
             * @returns {number} value 默认情况下: min 到 max 之间的值 - 包含最大值和最小值
             */
			Circular.prototype.random = function (params) {
				// 需要传递的参数
				let postData = {
					params: params,
					defaultValue: {
						symbol: {
							min: 'contain',
							max: 'contain'
						}
					}
				}
				params = this.paramsInherit(postData)
				let symbol = params.symbol
				let random = Math.random()
				let max = params.max
				let min = params.min

				if (symbol.min === 'contain' && symbol.max === 'contain') {
					// console.log('[0-5]')
					return Math.floor(random * (max - min + 1)) + min
				} else if (symbol.min === 'not' && symbol.max === 'contain') {
					// console.log('(0-5]')
					return Math.ceil(random * (max - min) + 1) + min - 1
				} else if (symbol.min === 'contain' && symbol.max === 'not') {
					// console.log('[0-5)')
					return Math.floor(random * (max - min)) + min
				} else if (symbol.min === 'not' && symbol.max === 'not') {
					// console.log('(0-5)')
					let temp = Math.floor(random * (max - min) + 1) + min
					return temp >= max ? temp - 1 : temp
				}
			}

			/*
            * 去掉数组中差距小于或大于某值的数
            * @param {object}      params
            * @param {array}       params.data 排序好的数字数组
            * @param {number}      params.difference 差额（小圆的 width
            * @param {string}      params.symbol 符号 > < = 运算符
            */
			Circular.prototype.arrExclude = function (params) {
				let data = params.data

				for (let i = 0; i < data.length - 1; i++) {
					let previous = data[i] // 1
					let latter = data[i + 1] // 2
					let value = Math.round(Math.abs(previous - latter)) // 1
					let str = value + params.symbol + params.difference // 1 > 3

					if (!eval(str)) { // true
						data.splice(i + 1, 1) // [1, 3, 4, 5, 6]
						--i
					}
				}

				return data
				// {
				//     data: [1, 2, 3, 4, 5, 6],
				//     difference: 2,
				//     symbol: '>'
				// }
				// 去掉这个数组中 差距大于 2 的数据
			}

			/*
            * 打乱数组
            * @param {object}           params
            * @param {array}            params.data
            * @return {array}           打乱后的数组
            */
			Circular.prototype.disruptedArr = function (params) {
				return params.data.sort(function () {
					return Math.random() > 0.5 ? -1 : 1
				})
			}

			new Circular()
		}
	},
}
</script>

<style lang="scss" scoped>
.box {
    width: 500px;
    height: 300px;
    margin: 30px auto;
    border-radius: 5px;
    position: relative;
    border: 1px solid #ddd;

    >>> .circular {
        width: 30px;
        height: 30px;
        position: absolute;
        background-color: aquamarine;
    }
}
</style>
