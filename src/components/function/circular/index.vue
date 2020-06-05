<template>
    <div class="box" id="circular"></div>
</template>

<script>
export default {
	name: 'circular',
	props: {
		data: {
			type: Array,
			default: function () {
				return [
					{
						txt: '天气',
						value: 100
					},
					{
						txt: '游戏',
						value: 50
					},
					{
						txt: '音乐',
						value: 75
					},
					{
						txt: '编程',
						value: 45
					},
					{
						txt: '小说',
						value: 40
					},
					{
						txt: '情商',
						value: 30
					},
					{
						text: '智商',
						value: 70
					},
					{
						txt: '内向',
						value: 65
					},
					{
						txt: '长相',
						value: 75
					},
					{
						txt: '您',
						value: 100
					}
				]
			}
		},
	},
	mounted () {
		this.init()
	},
	methods: {
		init () {
			const that = this
			let Circular = function () {
				this.box = this.$('#circular')
				this.width = this.getStyle(this.box, 'width')
				this.o = this.width / 2 // 圆心
				this.yCoordinate = [] // y 轴坐标
				this.xCoordinate = [] // x 轴坐标
				this.coordinate = [] // 圆的位置坐标
				this.circular = 40 // 圆的宽高
				this.number = 10 // 小圆的个数
				this.data = that.data // 数组对象
				this.maxValue = 0 // 数组中的最大值

				this.init()
			}

			Circular.prototype.init = function () {
				// 数据处理-排序
				this.data = this.sort({
					data: this.data,
					key: 'value'
				})
				this.maxValue = this.data[0].value
				// 获取坐标
				this.getCoordinate()
				// 打乱数组
				this.coordinate = this.disruptedArr({
					data: this.coordinate
				})
				// 创建元素
				this.forCreatedEle()
			}

			/**
             * 循环创建所需要的所有元素
             */
			Circular.prototype.forCreatedEle = function () {
				for (let i = 0; i < this.number; i++) {
					let item = this.coordinate[i]
					let data = that.data[i]
					if (!data) {
						return false
					}

					let postData = {
						box: this.box,
						x: item.x,
						y: item.y,
						w: this.circular / this.maxValue * data.value
					}

					this.createdElement(postData)
				}
			}

			/**
             * 获取坐标
             * @param {object}              params
             * @param {}                    params.
             */
			Circular.prototype.getCoordinate = function () {
				this.yCoordinate = this.randomCoordinate({
					range: {
						max: this.width - this.circular / 2,
						min: this.circular / 2
					},
				})

				// 去掉不需要的距离
				this.yCoordinate = this.arrExclude({
					data: this.yCoordinate,
					difference: this.circular,
					symbol: '>'
				})

				let length = this.yCoordinate.length
				const value = {
					o: {
						x: this.o,
						y: this.o
					},
					r: this.o - this.circular / 2
				}

				for (let i = 0; i < length; i++) {
					let y = this.yCoordinate[i]
					let postData = Object.assign({}, value, {
						y: y
					})

					// 获取 x 的范围
					let obj = this.getCircularRange(postData)

					// 可以看到 x 轴可选范围
					// this.createdElement({
					//     box: this.box,
					//     x: obj.x,
					//     y: y,
					//     w: obj.range
					// })

					let postData2 = {
						range: {
							max: obj.range + obj.x + this.circular,
							min: obj.x + this.circular / 2
						},
					}

					// 获取 x 轴范围内的随机数
					let arr = this.randomCoordinate(postData2)

					// 去掉不需要的距离
					arr = this.arrExclude({
						data: arr,
						difference: this.circular,
						symbol: '>'
					})

					let arrLength = arr.length

					// 循环获取位置坐标
					for (let j = 0; j < arrLength - 1; j++) {
						let coordinate = {
							x: arr[j],
							y: y,
							left: obj.x
						}

						this.coordinate.push(coordinate)
					}
				}

				// console.log(this.coordinate, 'this.coordinate')
				this.number = this.coordinate.length
				console.log(`最多可插入${this.coordinate.length}个圆`)
			}

			/*
            * 创建元素
            * @param {object}              params
            * @param {object}              params.box - DOM - 追加到的元素
            * @param {number}              params.x - x 轴坐标
            * @param {number}              params.y - y 轴坐标
            * @param {number}              params.w - 宽度
            */
			Circular.prototype.createdElement = function (params) {
				let ele = document.createElement('div')
				ele.className = 'circular'
				ele.style.top = params.y + 'px'
				ele.style.left = params.x + 'px'
				ele.style.width = params.w + 'px'
				ele.style.height = params.w + 'px'

				params.box.appendChild(ele)
			}

			/*
            * 获取圆上的坐标
            * 已知 y 轴一点，获取该 y 轴上 x 可用范围（不超出圆的范围
            * 需要用到数学的勾股定理
            * 直角三角形: 斜边平方 = 两直角边平方之和
            * @param {object}                  params
            * @param {number}                  params.y // y 轴坐标
            * @param {object}                  params.o // 圆心坐标
            * @param {number}                  params.o.x // 圆心在 x 轴方向的 x 坐标
            * @param {number}                  params.o.y // 圆心在 y 轴方向的 y 坐标
            * @param {number}                  params.r // 半径
            * @return {object}                 params
            * @return {number}                 params.range // 可用范围
            * @return {number}                 params.x // left 距离左边的距离
            */
			Circular.prototype.getCircularRange = function (params) {
				// 先判断 y 轴所在位置
				let y = null
				let x = null
				let left = null

				if (params.y === params.r) {
					y = params.r
				} else {
					y = Math.abs(params.r - params.y)
				}

				// 一边的(一半)
				x = Math.sqrt(Math.pow(params.r, 2) - Math.pow(y, 2))
				// 距离左边的位置
				left = params.r - x
				// 全部
				x = x * 2

				return {
					range: x,
					x: left
				}
			}

			/*
            * 获取元素
            * 和 jQuery 获取元素一致
            * @param {object}           params
            * @param {string}           params.select
            */
			Circular.prototype.$ = function (select) {
				return document.querySelector(select)
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

			/**
			 * 数组对象排序
			 * @param {object}           params
			 * @param {array}            params.data 数组对象 [{value: 50}]
			 * @param {string}           params.key  已对象中的 key 为判断对象 value
			 * @param {string,boolean}   param.sort  升序或降序 默认降序 可选值 true 'desc'
			 * @return {array}           排序好之后的数组
			 */
			Circular.prototype.sort = function (params) {
				const data = params.data
				const key = params.key
				const sort = params.sort ? '>' : '<' // 默认是降序

				for (let i = 0, length = data.length; i < length - 1; i++) {
					for (let j = 0; j < length - i - 1; j++) {
						let rule = eval(data[j][key] + sort + data[j + 1][key])
						if (rule) {
							let temp = Object.assign({}, data[j])
							data[j] = data[j + 1]
							data[j + 1] = temp
						}
					}
				}
				return data
			}

			new Circular()
		}
	},
}
</script>

<style lang="scss" scoped>
.box {
    width: 300px;
    height: 300px;
    border-radius: 5px;
    position: relative;
    border-radius: 50%;
    border: 4px solid #ddd;
    box-shadow: -4px 3px 12px 0px black;

    >>> .circular {
        height: 2px;
        border-radius: 50%;
        position: absolute;
        background-color: aquamarine;
		box-shadow: -2px 1px 4px 0px black;
    }
}
</style>
