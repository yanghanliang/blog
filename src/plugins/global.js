export default {
	baseURL: 'http://localhost:3001/', // 接口基地址
	verification: async (that, formName) => { // 表单验证
		try {
			return await that.$refs[formName].validate()
		} catch (e) {
			// e === false
			return false
		}
	}
}
