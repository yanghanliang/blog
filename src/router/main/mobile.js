// mobile-start
// const mobile = () => import('@/views/mobile/index')
const mArticleList = () => import('@/views/mobile/index/article/list')
const inDevelopment = () => import('@/views/public/inDevelopment')
const robot = () => import('@/views/mobile/index/robot')
const articleDetails = () => import('@/components/webs/index/article/details/index')
const personalResume = () => import('@/views/index/personalResume')
// mobile-end

export default [
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
	{
		path: 'inDevelopment',
		name: 'inDevelopment',
		component: inDevelopment
	},
	{
		path: 'robot',
		name: 'robot',
		component: robot
	}
]
