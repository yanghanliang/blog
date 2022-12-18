export default {
	baseURL: 'https://www.openinfo.cloud/api/', // 接口基地址
	localhostIp: '116.205.136.244:8090', // 本地的 ip
	verification: async (that, formName) => { // 表单验证
		// 使用方法
		// const verification =  await this.Global.verification(this, 'form')
		// if (!verification) {
		// 	return false
		// }
		try {
			return await that.$refs[formName].validate()
		} catch (e) {
			// e === false
			return false
		}
	},
	// 获取用户不存且需要验证的路由权限
	// this.Global.getNotJurisdiction(this)
	getNotJurisdiction: async (that) => {
		try {
			const data = await that.$http.get('user/not/jurisdiction')
			that.__proto__._jurisdiction = data
			window.localStorage.setItem('_jurisdiction', JSON.stringify(data))
		} catch (e) {
			console.log(e)
		}
	},
	// 用来判断是不是移动端
	equipment: /Mobile/.test(navigator.userAgent) ? 'mobile' : 'pc',
	/**
	 * 参数继承-如果传入的参数存在则替换掉默认值
	 * 现在只支持对象的参数
	 * @param {object}          params
	 * @param {object}          params.params - 传入的参数
	 * @param {object}          params.defaultValue - 默认值 不存在默认值时，默认为 0
	 * @return {object}         param 继承默认值后的参数
	 */
	paramsInherit: function (params) { // 可删
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
	},
	ip: returnCitySN.cip
}
