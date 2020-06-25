/**
 * 原创小工具
 */

/**
 * 参数继承-如果传入的参数没有默认值，则给传入的参数赋上默认值
 * 现在只支持对象的参数
 * @param {object}          params
 * @param {object}          params.params - 传入的参数
 * @param {object}          params.defaultValue - 默认值 不存在默认值时，默认为 0
 * @return {object}         param 继承默认值后的参数
 */
export function paramsInherit (params) {
	// 如果没有传入参数则直接返回默认值
	if (!params.params) {
		return params.defaultValue
	}
	let recursion = function (param, defaultValue) {
		// 循环默认值
		for (let key in defaultValue) {
			// 判断参数中是否存在默认值
			let type = typeof param[key]
			if (type === 'object') {
				recursion(param[key], defaultValue[key])
			} else {
				// 如果传入的参数没有默认值，则给传入的参数赋上默认值
				if (param[key] === undefined) {
					param[key] = defaultValue[key]
				}
			}
		}
	}

	recursion(params.params, params.defaultValue)
	return params.params
}

/**
 * 判断数据类型
 * @author                  yanghanliang
 * @created                 2019-09-27
 * @lastEditDate            2019-09-27
 * @param {*}               value
 * @return {string} type    DataType
 */
export function isType (value) {
	// number boolean string array undefined null
	var type = typeof value
	if (type === 'object') {
		if (value.length) {
			return 'array'
		} else {
			return 'object'
		}
	} else {
		// 不考虑 null, undefined
		return 'string'
	}
}

/**
 * 深拷贝
 * @author                  yanghanliang
 * @created                 2019-09-27
 * @lastEditDate            2019-09-27
 * @param {object,array}    data
 * @return {object,array}   dataCopy
 */
export function deepCopy (data) {
	let type = isType(data)
	if (type === 'array') {
		let arr = []
		for (let i = 0, length = data.length; i < length; i++) {
			let item = data[i]
			let itemType = isType(item)
			if (itemType === 'object' || itemType === 'array') {
				let value = deepCopy(item)
				arr.push(value)
			} else {
				arr.push(item)
			}
		}
		return arr
	} else if (type === 'object') {
		let obj = {}
		for (let key in data) {
			let item = data[key]
			let itemType = isType(item)
			if (itemType === 'object' || itemType === 'array') {
				let value = deepCopy(item)
				obj[key] = value
			} else {
				obj[key] = item
			}
		}
		return obj
	}
}
