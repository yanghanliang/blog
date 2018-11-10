// 导入发生请求的模块
import axios from 'axios'

const MyAxios = {}

MyAxios.install = function(Vue) {
  // 创建请求连接
  // 设置 Vue 实例的属性
  Vue.prototype.$http = axios.create({
    baseURL: 'http://localhost:3001/', // 基地址
    timeout: 1000 // 失效时间
  })
}

// 导出发送请求的方法
export default MyAxios
