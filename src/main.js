// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入 element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入自己的重置样式
import './assets/reset.css'

// 引入前后台需要的公共样式
import './assets/public.css'

// 导入发送请求的插件
import MyAxios from './plugins/myAxios'

// 调用发送请求的插件
Vue.use(MyAxios)

// 调用发送请求的插件
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
