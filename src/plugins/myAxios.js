// 导入发生请求的模块
import axios from 'axios'
// 引入消息提示
import { Message } from 'element-ui'
// 引入全局变量
import Global from '@/plugins/global'

const MyAxios = {}

MyAxios.install = function (Vue) {
	// 创建请求连接
	// 设置 Vue 实例的属性
	const instance = axios.create({
		baseURL: Global.baseURL, // 基地址 'http://localhost:3001/'
		timeout: 5000, // 失效时间
	})

	// 添加请求拦截器
	instance.interceptors.request.use(function (config) {
		// 在发送请求之前执行
		if (config.url.toLowerCase() !== 'login') {
			// 请求前将 token 设置在请求头中
			const token = localStorage.getItem('token')
			config.headers.Authorization = token
		}
		return config
	}, function (error) {
		// 处理请求错误
		return Promise.reject(error)
	})

	// 添加响应拦截器
	instance.interceptors.response.use(function (response) {
		// 处理响应数据前执行
		const {
			data
		} = response
		if (data.data && data.type !== 'token') {
			// 这样做之后取数据的时候可以少取一层
			return data.data
		} else if (data.type === 'token' && data.status === 201) {
			// 清空登录状态
			window.localStorage.removeItem('token')
			window.localStorage.removeItem('user')

			Message.info({
				message: data.msg,
				onClose: () => {
					location.href = '/login'
				}
			})
			return
		}
		return response
	}, function (error) {
		// 处理响应错误
		return Promise.reject(error)
	})

	Vue.prototype.$http = instance
}

// 导出发送请求的方法
export default MyAxios
