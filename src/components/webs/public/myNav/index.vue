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
				<i :title="item.icon" :class="item.icon"></i>
			</a>
		</div>
		<div :class="['nav-right', {'open': navStatus}]">
			<div class="nr-content">
				<div class="title">
					{{ currentTitle }}
				</div>
				<my-children :data="currentChildren" :isBlank="isBlank">
					<div slot="content">a</div>
				</my-children>
			</div>
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
	props: {
		data: {
			type: Array,
			default: function() {
				return [
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
						identification: 'bookmark',
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
		// 菜单状态(打开||关闭)
		navStatus: {
			type: Boolean,
			default: false
		},
		// 点击第一层级是否进行跳转
		firstTrigger: {
			type: Boolean,
			default: true
		},
		// 站内跳转（false）站外跳转（true）
		isBlank: {
			type: Boolean,
		}
	},
	data() {
		return {
			currentChildren: [], // 当前的子集数据
			currentTitle: '标题',
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
					this.firstTrigger && this.$router.push(obj.router)
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
		},
		data: function() {
			this.routerChange(this.$route)
		}
	},
}
</script>

<style lang="scss">
@import '@/assets/css/color/index.scss'; // 使用方法

nav {
	height: 100%;
	position: relative;

	>div {
		float: left;
	}

	.nav-left {
		width: 58px;;

		// &::before {
		// 	top: 0;
		// 	bottom: 0;
		// 	width: 58px;
		// 	content: "";
		// 	position: absolute;
		// 	border-right: 1px solid #ddd
		// }

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

		.nr-content {
			width: 182px;
			top: 0;
			bottom: 0;
			position: absolute;
			background-color: #F2F2F3;
		}

		&.open {
			display: block;
		}

		.title {
			height: 76px;
			font-size: 16px;
			line-height: 76px;
			font-weight: bold;
			text-indent: 40px;
			text-align: left;
		}
	}
}
</style>
