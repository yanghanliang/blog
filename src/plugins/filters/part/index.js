/**
 * 局部过滤器
 * (手动载入)
 */
// 载入工具
import { paramsInherit } from '@/plugins/tool/my.js'

/**
 * 金额转换
 * @param {number|string}           value 金额
 * @param {object}                  params
 * @param {string}					params.conversion 转换：up||down; up 分转元 100 => 1, down 元转分 1 =>100
 * @param {boolean|string}					params.symbol 千分位符号: , .
 * @param {boolean}					params.decimal 是否保留两位小数: true||false
 */
export function money (value, params)  {
	// 参数继承
	params = paramsInherit({
		params,
		defaultValue: {
			conversion: 'up',
			symbol: ',',
			decimal: true
		}
	})

	if (params && params.conversion) {
		// 为了避免小数点做运算的问题： 201 * 0.01 = 2.0100000000000002
		if (params.conversion === 'up') {
			value = value / 100
		} else if (params.conversion === 'down') {
			value = Math.floor(value * 100)
			params.decimal = false
		}
	}

	// 千分位符号
	if (params && params.symbol) {
		const arr = String(value).split('.')

		/**
         * 从后往前截取字符串
         * @param {object}           params
         * @param {string}           params.str
         * @param {number}           params.step
         */
		const newArr = []
		const recursion = function (params) {
			if (params.str.length > params.step) {
				const item = params.str.slice(-params.step)
				newArr.unshift(item)
				recursion({
					str: params.str.slice(0, -params.step),
					step: params.step
				})
			} else {
				if (params.str) {
					newArr.unshift(params.str)
				}
			}
		}
		recursion({
			str: String(arr[0]),
			step: 3
		})

		const str = newArr.join(params.symbol)

		if (arr.length > 1) {
			if (String(arr[1]).length === 1 && params.decimal) {
				return str + '.' + arr[1] + '0'
			} else {
				return str + '.' + arr[1]
			}
		} else {
			if (params.decimal) {
				return str + '.00'
			} else {
				return str
			}
		}
	}

	// 保留小数点
	if (params && params.decimal) {
		let temp = String(value)
		console.log(temp.indexOf('.'), temp.slice(temp.indexOf('.')).length, '????')
		if (!temp.includes('.')) {
			console.log(0)
			return value + '.00'
		} else if (temp.slice(temp.indexOf('.')).length === 1) {
			// 小数点只有一位时走这
			console.log(1)
			return value + '0'
		}
	}
	return value
}
