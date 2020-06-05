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
		component: addArticle,
		meta: { title: '添加文章' },
	},
	{
		path: 'articleList',
		name: 'articleList',
		component: articleList,
		meta: { title: '文章列表' },
	},
	{
		path: 'editArticle/:articleId',
		name: 'editArticle',
		component: addArticle,
		meta: { title: '修改文章' },
	},
	{
		path: 'addCategory',
		name: 'addCategory',
		component: addCategory,
		meta: { title: '添加分类' },
	},
	{
		path: 'categoryList',
		name: 'categoryList',
		component: categoryList,
		meta: { title: '分类列表' },
	},
	{
		path: 'editCategory/:categoryId',
		name: 'editCategory',
		component: editCategory,
		meta: { title: '修改分类' },
	},
	{
		path: 'jurisdiction/list',
		name: 'jurisdictionList',
		component: jurisdictionList,
		meta: { title: '权限列表' },
	},
	{
		path: 'jurisdiction/add',
		name: 'addJurisdiction',
		component: addJurisdiction,
		meta: { title: '添加权限' },
	},
	{
		path: 'jurisdiction/edit/:id',
		name: 'editJurisdiction',
		component: editJurisdiction,
		meta: { title: '修改权限' },
	},
	{
		path: 'user/list',
		name: 'userList',
		component: userList,
		meta: { title: '用户列表' },
	},
	{
		path: 'bookmark/add',
		name: 'addBookmark',
		component: addBookmark,
		meta: { title: '添加用户' },
	}
]
