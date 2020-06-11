/**
 * 原创小工具
 */

/**
 * 参数继承-如果传入的参数存在则替换掉默认值
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
				if (param[key] !== undefined) {
					if (type === 'object') {
						recursion(param[key], defaultValue[key])
					} else {
						// 不存在，则给参数补充上
						defaultValue[key] = param[key]
					}
				}
			}
		}
	}

	recursion(params.params, params.defaultValue)
	console.log(params.defaultValue, 'params.defaultValue')
	return params.defaultValue
}
