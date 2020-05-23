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
const bookmark = () => import('@/views/index/bookmark')
const test = () => import('@/views/test')
// index-end

export default [
	{
		path: 'common',
		name: 'common',
		component: common
	},
	{
		path: 'catalogList',
		name: 'catalogList',
		component: catalogList,
		meta: { title: '日志列表' },
	},
	{
		path: '/articleDetails/:articleId',
		name: 'articleDetails',
		component: articleDetails,
		meta: { title: '文章详情' },
	},
	{
		path: 'views/components',
		name: 'componentsViews',
		component: componentsViews,
		meta: { title: '组件' },
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
	},
	{
		path: 'bookmark',
		name: 'bookmark',
		component: bookmark
	},
	{
		path: 'test',
		name: 'test',
		component: test,
		meta: { title: '操作' },
	}
]
