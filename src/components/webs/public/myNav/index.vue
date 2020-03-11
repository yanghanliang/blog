<template>
    <nav class="clearfix" @mouseenter="openNav" @mouseleave="closeNav">
        <div class="nav-left">
			<a
				v-for="(item, index) in data"
				@click="mouseenter(item)"
				:class="{'active': item.status === 'open'}"
				href="javascript:;"
				:key="index"
				:title="item.name"
			>
				<i :class="item.icon"></i>
			</a>
		</div>
		<div :class="['nav-right', {'open': navStatus}]">
			<div class="title">
				{{ currentTitle }}
			</div>
			<my-children :data="currentChildren"></my-children>
		</div>
    </nav>
</template>

<script>
import myChildren from './myChildren'

export default {
	name: 'myNav',
	components: {
		myChildren
	},
	data() {
		return {
			data: [
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
					router: '/admin/categoryList',
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
							router: '/admin/jurisdiction/list',
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
				}
			],
			currentChildren: [], // 当前的子集数据
			currentTitle: '标题',
			navStatus: false, // 菜单状态(打开||关闭)
		}
	},
	created() {
		this.routerChange(this.$route)
	},
	methods: {
		// 鼠标移入时,将对应的数据给子菜单,并变化数据
		mouseenter(item) {
			this.currentChildren = item.children
			this.currentTitle = item.name
			// 防止自己跳转到自己
			if (item.router === this.$route.path) return false
			this.data.forEach(obj => {
				if (item === obj) {
					obj.status = 'open'
					this.$router.push(obj.router)
				} else {
					obj.status = 'close'
				}
			})
		},
		// 打开菜单
		openNav() {
			this.navStatus = true
		},
		// 关闭菜单
		closeNav() {
			this.navStatus = false
		},
		// 路由变化时更新导航状态
		routerChange(route) {
			let url = route.path.toLocaleLowerCase()
			this.data.forEach((item) => {
				if (url.includes(item.identification)) {
					this.currentChildren = item.children
					this.currentTitle = item.name
					item.status = 'open'
				} else {
					item.status = 'close'
				}
			})
		}
	},
	watch: {
		$route: {
			handler: function(route) {
				this.routerChange(route)
			},
			// deep: true
		}
	},
}
</script>

<style lang="scss">
@import '@/assets/css/color/index.scss'; // 使用方法

nav {
	height: 100%;

	>div {
		float: left;
	}

	.nav-left {
		width: 58px;

		a {
			width: 100%;
			height: 48px;
			color: $ash;
			display: block;
			line-height: 48px;
			text-align: center;

			i[class*="icon"] {
				font-size: 26px;
			}

			&.active {
				color: $green;
			}
		}
	}

	.nav-right {
		width: 182px;
		height: 100%;
		display: none;
		background-color: #F2F2F3;

		&.open {
			display: block;
		}

		.title {
			height: 76px;
			font-size: 16px;
			line-height: 76px;
			font-weight: bold;
			text-indent: 40px;
		}
	}
}
</style>
