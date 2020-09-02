<template>
    <div class="w bookmark">
		<my-nav
			:nav-status="true"
			:firstTrigger="false"
			:isEdit="true"
			:isView="true"
			:data="bookmarkData"
			ref="myNav"
			:isBlank="true"
			:clickOpen="false"
		>
		</my-nav>
    </div>
</template>

<script>
import myNav from '@/components/webs/public/myNav/index'

export default {
	name: 'bookmark',
	components: {
		myNav
	},
	data () {
		return {
			bookmarkData: [
				{
					name: '文章',
					level: 0,
					status: 'open',
					icon: 'my-icon-wenzhang',
					router: '/admin/articleList',
					identification: 'article',
					children: [
						{
							name: '添加文章',
							level: 1,
							status: 'open',
							router: '/admin/addArticle',
							children: [
								// {
								// 	index: '1-7-2-1',
								// 	name: 'hh',
								// 	status: 'open',
								// 	level: 2,
								// 	children: [
								// 		{
								// 			index: '1-7-2-1-1',
								// 			name: 'gg',
								// 			level: 3,
								// 		}
								// 	]
								// },
								// {
								// 	name: 'hh',
								// 	status: 'open',
								// 	level: 2,
								// }
							]
						},
						{
							name: '文章列表',
							level: 1,
							router: '/admin/articleList',
						}
					]
				},
				{
					name: '分类',
					level: 0,
					status: 'close',
					icon: 'my-icon-category',
					router: '/admin/categoryList?type=1',
					identification: 'category',
					children: [
						{
							name: '添加分类',
							level: 1,
							router: '/admin/addCategory',
						},
						{
							name: '分类列表',
							level: 1,
							router: '/admin/categoryList',
						}
					]
				},
				{
					name: '权限',
					level: 0,
					status: 'close',
					icon: 'my-icon-setting-permissions',
					router: '/admin/jurisdiction/list',
					identification: 'jurisdiction',
					children: [
						{
							name: '权限列表',
							level: 1,
							status: 'close',
							router: '/admin/jurisdiction/list',
							children: [
								{
									name: '页面',
									level: 2,
									router: '/admin/jurisdiction/list?distribution=1',
								},
								{
									name: '接口',
									level: 2,
									router: '/admin/jurisdiction/list?distribution=0',
								}
							]
						},
						{
							name: '添加权限',
							level: 1,
							router: '/admin/jurisdiction/add',
						}
					]
				},
				{
					name: '用户',
					level: 0,
					status: 'close',
					icon: 'my-icon-yonghufangkeshu',
					router: '/admin/user/list',
					identification: 'user',
					children: [
						{
							name: '用户列表',
							level: 1,
							router: '/admin/user/list',
						}
					]
				},
				{
					name: '书签',
					level: 0,
					status: 'close',
					icon: 'my-icon-yonghufangkeshu',
					router: '/admin/bookmark/add',
					identification: 'user',
					children: [
						{
							name: '添加分类',
							level: 1,
							router: '/admin/bookmark/add',
						},
						{
							name: '分类列表',
							level: 1,
							router: '/admin/bookmark/list',
						}
					]
				}
			]
		}
	},
	created () {
		this.getBookmarkData()
	},
	methods: {
		// 获取书签数据
		async getBookmarkData () {
			let data = await this.$http.get('bookmark/nav')
			this.bookmarkData = this.handleData(data)
			console.log(this.bookmarkData, 'bookmarkData')
		},
		// 处理数据
		handleData (data) {
			let arr = []
			let ipc = function (obj, level) {
				for (let i = 0, length = data.length; i < length; i++) {
					let item = data[i]
					if (item.pid === obj.id) {
						ipc(item, level + 1)

						Object.assign(item, {
							level: level,
							status: 'open',
							icon: item.icon ? item.icon : 'my-icon-wenzhang',
							router: item.link,
							identification: '/bookmark',
						})

						if (obj.children) {
							obj.children.push(item)
						} else {
							obj.children = [item]
						}
					}
				}
				return obj
			}

			for (let i = 0, length = data.length; i < length; i++) {
				let item = data[i]
				if (item.pid === 0) {
					Object.assign(item, {
						level: 0,
						status: 'open',
						icon: item.icon ? item.icon : 'my-icon-wenzhang',
						router: '/index/bookmark',
						identification: i === 0 ? '/bookmark' : '/abc',
					})
					arr.push(ipc(item, 1))
				}
			}
			console.log(JSON.stringify(arr), 'arr')
			return arr
		}
	},
}
</script>

<style lang="scss" scoped>
.bookmark {
	text-align: left;
}
</style>
