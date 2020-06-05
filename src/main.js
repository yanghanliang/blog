// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 插件-start
// 引入 element-ui
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// Added non-passive event listener to a scroll-blocking 'touchstart' event. Consider marking event han
// 兼容

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
import '@/assets/css/font/symobl.js'
import './assets/icon.js'
// 引入前后台需要的公共样式
import '@/assets/css/index.scss'
// myStyle - end

// public-start
// 引入自己的面包屑组件
import myCrumbs from '@/components/webs/public/myCrumbs'

// 引入自己的字体图片组件
import myIcon from '@/components/webs/public/myIcon'
// public-start

// 引入全局变量
import global_ from '@/plugins/global' // 引用文件

// Vue.config.devtools = true // 标记为开发环境，让 devtools 能够正常运行

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

/**
 * 金额转换
 * @param {number|string}           value 金额
 * @param {object}                  params
 * @param {string}					params.conversion 转换：up||down; up 分转元 100 => 1, down 元转分 1 =>100
 * @param {string}					params.symbol 千分位符号: , .
 * @param {boolean}					params.decimal 是否保留两位小数: true||false
 */
// Vue.filter('money', function (value, params) {
// 	if (params && params.conversion) {
// 		// 为了避免小数点做运算的问题： 201 * 0.01 = 2.0100000000000002
// 		if (params.conversion === 'up') {
// 			value = value / 100
// 		} else if (params.conversion === 'down') {
// 			value = value * 100
// 		}
// 	}

// 	// 千分位符号
// 	if (params && params.symbol) {
// 		const arr = String(value).split('.')

// 		/**
//          * 从后往前截取字符串
//          * @param {object}           params
//          * @param {string}           params.str
//          * @param {number}           params.step
//          */
// 		const newArr = []
// 		const recursion = function (params) {
// 			if (params.str.length > params.step) {
// 				const item = params.str.slice(-params.step)
// 				newArr.unshift(item)
// 				recursion({
// 					str: params.str.slice(0, -params.step),
// 					step: params.step
// 				})
// 			} else {
// 				if (params.str) {
// 					newArr.unshift(params.str)
// 				}
// 			}
// 		}
// 		recursion({
// 			str: String(arr[0]),
// 			step: 3
// 		})

// 		const str = newArr.join(params.symbol)

// 		if (arr.length > 1) {
// 			return str + '.' + arr[1]
// 		} else {
// 			return str
// 		}
// 	}

// 	console.log(params, 'params')

// 	// 保留小数点
// 	if (params && params.decimal) {
// 		let temp = String(value)
// 		console.log(temp.indexOf('.'), temp.slice(temp.indexOf('.')).length, '????')
// 		if (!temp.includes('.')) {
// 			console.log(0)
// 			return value + '.00'
// 		} else if (temp.slice(temp.indexOf('.')).length === 1) {
// 			// 小数点只有一位时走这
// 			console.log(1)
// 			return value + '0'
// 		}
// 	}
// 	return value
// })

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
