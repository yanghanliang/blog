// 引入全局变量
import Global from '@/plugins/global'
import Vue from 'vue'
import Router from 'vue-router'
// 导入消息提示
import {
	Message,
} from 'element-ui'
// import mobile from './main/mobile'

const webIndex = () => import('@/components/webs/index/index')

// admin-start
const login = () => import('@/views/login')
const webAdmin = () => import('@/components/webs/admin/index')
// const addArticle = () => import('@/components/webs/admin/article/addArticle')
// const articleList = () => import('@/components/webs/admin/article/articleList')
// const addCategory = () => import('@/components/webs/admin/category/addCategory')
// const categoryList = () => import('@/components/webs/admin/category/categoryList')
// const editCategory = () => import('@/components/webs/admin/category/editCategory')
// const jurisdictionList = () => import('@/views/admin/jurisdiction/list')
// const addJurisdiction = () => import('@/views/admin/jurisdiction/add')
// const editJurisdiction = () => import('@/views/admin/jurisdiction/edit')
// const userList = () => import('@/views/admin/user/list')
// const addBookmark = () => import('@/views/admin/bookmark/add')
// admin-end

// index-start
// const common = () => import('@/components/webs/index/common')
// const articleDetails = () => import('@/components/webs/index/article/details/index')
// const catalogList = () => import('@/components/webs/index/catalog/catalogList')
// const componentsViews = () => import('@/views/index/components/view')
// const progress = () => import('@/views/index/components/document/progress')
// const circular = () => import('@/views/index/components/document/circular')
// const square = () => import('@/views/index/components/document/square')
// const slider = () => import('@/views/index/components/document/slider')
// const connection = () => import('@/views/index/components/document/connection')
// const myEcharts = () => import('@/views/index/components/document/echarts')
// const personalResume = () => import('@/views/index/personalResume')
// const webinfo = () => import('@/views/index/webinfo/index')
// const bookmark = () => import('@/views/index/bookmark')
// const test = () => import('@/views/test')
// index-end

// mobile-start
const webMobile = () => import('@/views/mobile/index')
// const mArticleList = () => import('@/views/mobile/index/article/list')
// const inDevelopment = () => import('@/views/public/inDevelopment')
// const robot = () => import('@/views/mobile/index/robot')
// mobile-end

// 需要导入的模块
const variableList = ['index', 'admin', 'mobile']
// 循环定义全局变量
variableList.forEach(function (name) {
	this['_' + name] = []
}, window)
// 导入./mian下所有的路由
const requireModule = require.context('./main', true, /\.js$/)

requireModule.keys().forEach(fileName => {
	// 把路径 ./index.js 变成 index
	let variableName = fileName.match(/[a-zA-Z0-9]+/)[0]
	// 如果导入的这个模块时定义要导入的则赋值
	if (variableList.includes(variableName)) {
		// 为了防止变量名冲突，加了前缀
		window['_' + variableName] = requireModule(fileName).default
	}
})

console.log(_index, _admin, _mobile)

Vue.use(Router)

const router = new Router({
	mode: 'history', // 可以去掉 url 的 #
	routes: [
		{
			path: '/',
			name: 'index',
			component: webIndex,
			redirect: '/common',
			children: _index
		},
		{
			path: '/login',
			name: 'login',
			component: login
		},
		{
			path: '/register',
			name: 'register',
			component: login
		},
		{
			path: '/admin',
			name: 'admin',
			component: webAdmin,
			redirect: '/admin/articleList',
			children: _admin
		},
		{
			path: '/mobile',
			name: 'mobile',
			component: webMobile,
			redirect: '/mobile/article/list',
			children: _mobile
		}
	]
})

// 路由守卫
router.beforeEach((to, from, next) => {
	let _jurisdiction = JSON.parse(window.localStorage.getItem('_jurisdiction'))
	if (_jurisdiction.includes(to.name)) {
		Message.error('您没有此权限')
		next({
			path: from.path
		})
	} else {
		if (Global.equipment === 'mobile') {
			const toPath = to.path.includes('mobile') ? to.path.includes('mobile') : '/mobile' + to.path
			next({ path: toPath })
		} else {
			next()
		}
	}
})

export default router
