// admin-start
// const login = () => import('@/views/login')
// const admin = () => import('@/components/webs/admin/index')
const addArticle = () => import('@/components/webs/admin/article/addArticle')
const articleList = () => import('@/components/webs/admin/article/articleList')
const addCategory = () => import('@/components/webs/admin/category/addCategory')
const categoryList = () => import('@/components/webs/admin/category/categoryList')
const editCategory = () => import('@/components/webs/admin/category/editCategory')
const jurisdictionList = () => import('@/views/admin/jurisdiction/list')
const addJurisdiction = () => import('@/views/admin/jurisdiction/add')
const editJurisdiction = () => import('@/views/admin/jurisdiction/edit')
const userList = () => import('@/views/admin/user/list')
const addBookmark = () => import('@/views/admin/bookmark/add')
// admin-end

export default [
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
	},
	{
		path: 'bookmark/add',
		name: 'addBookmark',
		component: addBookmark
	}
]
