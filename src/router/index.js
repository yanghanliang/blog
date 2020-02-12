import Vue from 'vue'
import Router from 'vue-router'
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
// admin-end

// index-start
const common = () => import('@/components/webs/index/common')
const articleDetails = () => import('@/components/webs/index/article/articleDetails')
const catalogList = () => import('@/components/webs/index/catalog/catalogList')
const componentsViews = () => import('@/views/index/components/view')
// index-end

Vue.use(Router)

export default new Router({
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
					path: 'componentsViews',
					name: componentsViews,
					component: componentsViews
				}
			]
		},
		{
			path: '/login',
			name: 'login',
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
				}
			]
		}
	]
})
