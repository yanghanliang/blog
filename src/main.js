// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 插件-start
// 引入 element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入 moment 格式化时间
import moment from 'moment'

// 导入发送请求的插件
import MyAxios from './plugins/myAxios'

// 导入 markdown
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// 插件-end

// myStyle - start
// 引入字体图标
import './assets/css/iconfont.css'
import './assets/icon.js'
// 引入自己的重置样式
import './assets/css/reset.css'
// 引入前后台需要的公共样式
import './assets/css/public.css'
// myStyle - end

// public-start
// 引入自己的面包屑组件
import myCrumbs from '@/components/webs/public/myCrumbs'

// 引入自己的字体图片组件
import myIcon from '@/components/webs/public/myIcon'
// public-start

// 引入全局变量
import global_ from '@/plugins/global' // 引用文件

// 调用发送请求的插件
Vue.use(MyAxios)

// 调用 element
Vue.use(ElementUI)

// 调用 markdown
Vue.use(mavonEditor)

// 调用自己的面包屑组件
Vue.component(myCrumbs.name, myCrumbs)

// 调用自己的字体图标组件
Vue.component(myIcon.name, myIcon)

// 调用时间格式化 moment
Vue.filter('formatDate', function (date, formateStr) {
  if (date === null) {
    return '暂无更新~'
  }
  return moment(date).format(formateStr)
})

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.querySelector('input').focus()
  }
})

Vue.prototype.Global = global_ // 挂载到Vue实例上面

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
