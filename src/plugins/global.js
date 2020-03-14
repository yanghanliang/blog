export default {
	baseURL: 'http://47.98.182.149:3001/', // 接口基地址
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
	equipment: document.documentElement.offsetWidth >= 1200 ? 'pc' : 'mobile'
}
