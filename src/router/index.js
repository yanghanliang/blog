// 引入全局变量
import Global from '@/plugins/global'
import Vue from 'vue'
import Router from 'vue-router'
// 导入消息提示
import {
	Message,
} from 'element-ui'
const index = () => import('@/components/webs/index/index')

// admin-start
const login = () => import('@/views/login')
const admin = () => import('@/components/webs/admin/index')
const addArticle = () => import('@/components/webs/admin/article/addArticle')
const articleList = () => import('@/components/webs/admin/article/articleList')
const addCategory = () => import('@/components/webs/admin/category/addCategory')
const categoryList = () => import('@/components/webs/admin/category/categoryList')
const editCategory = () => import('@/components/webs/admin/category/editCategory')
const jurisdictionList = () => import('@/views/admin/jurisdiction/list')
const addJurisdiction = () => import('@/views/admin/jurisdiction/add')
const editJurisdiction = () => import('@/views/admin/jurisdiction/edit')
const userList = () => import('@/views/admin/user/list')
// admin-end

// index-start
const common = () => import('@/components/webs/index/common')
const articleDetails = () => import('@/components/webs/index/article/details/index')
const catalogList = () => import('@/components/webs/index/catalog/catalogList')
const componentsViews = () => import('@/views/index/components/view')
const progress = () => import('@/views/index/components/document/progress')
const circular = () => import('@/views/index/components/document/circular')
const square = () => import('@/views/index/components/document/square')
const slider = () => import('@/views/index/components/document/slider')
const connection = () => import('@/views/index/components/document/connection')
const myEcharts = () => import('@/views/index/components/document/echarts')
const personalResume = () => import('@/views/index/personalResume')
const webinfo = () => import('@/views/index/webinfo/index')
// index-end

// mobile-start
const mobile = () => import('@/views/mobile/index')
const mArticleList = () => import('@/views/mobile/index/article/list')
// mobile-end

Vue.use(Router)

const router = new Router({
	mode: 'history', // 可以去掉 url 的 #
	routes: [
		{
			path: '/',
			name: 'index',
			component: index,
			redirect: '/common',
			children: [
				{
					path: 'common',
					name: 'common',
					component: common
				},
				{
					path: 'catalogList',
					name: 'catalogList',
					component: catalogList
				},
				{
					path: '/articleDetails/:articleId',
					name: 'articleDetails',
					component: articleDetails
				},
				{
					path: 'views/components',
					name: 'componentsViews',
					component: componentsViews,
					redirect: 'views/components/progress',
					children: [
						{
							path: 'progress',
							name: 'progress',
							component: progress,
						},
						{
							path: 'circular',
							name: 'circular',
							component: circular
						},
						{
							path: 'square',
							name: 'square',
							component: square
						},
						{
							path: 'slider',
							name: 'slider',
							component: slider
						},
						{
							path: 'connection',
							name: 'connection',
							component: connection
						},
						{
							path: 'echarts',
							name: 'myEcharts',
							component: myEcharts
						}
					]
				},
				{
					path: '/personal/resume',
					name: 'personalResume',
					component: personalResume
				},
				{
					path: 'webinfo',
					name: 'webinfo',
					component: webinfo
				}
			]
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
			component: admin,
			redirect: '/admin/articleList',
			children: [
				{
					path: 'addArticle',
					name: 'addArticle',
					component: addArticle
				},
				{
					path: 'articleList',
					name: 'articleList',
					component: articleList
				},
				{
					path: 'addArticle/:articleId',
					name: 'editArticle',
					component: addArticle
				},
				{
					path: 'addCategory',
					name: 'addCategory',
					component: addCategory
				},
				{
					path: 'categoryList',
					name: 'categoryList',
					component: categoryList
				},
				{
					path: 'editCategory/:categoryId',
					name: 'editCategory',
					component: editCategory
				},
				{
					path: 'jurisdiction/list',
					name: 'jurisdictionList',
					component: jurisdictionList
				},
				{
					path: 'jurisdiction/add',
					name: 'addJurisdiction',
					component: addJurisdiction
				},
				{
					path: 'jurisdiction/edit/:id',
					name: 'editJurisdiction',
					component: editJurisdiction
				},
				{
					path: 'user/list',
					name: 'userList',
					component: userList
				}
			]
		},
		{
			path: '/mobile',
			name: 'mobile',
			component: mobile,
			redirect: '/mobile/article/list',
			children: [
				{
					path: 'common',
					name: 'mCommon',
					component: mArticleList
				},
				{
					path: 'article/list',
					name: 'mArticleList',
					component: mArticleList
				},
				{
					path: 'articleDetails/:articleId',
					name: 'mArticleDetails',
					component: articleDetails
				},
				{
					path: 'personal/resume',
					name: 'mPersonalResume',
					component: personalResume
				},
			]
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
