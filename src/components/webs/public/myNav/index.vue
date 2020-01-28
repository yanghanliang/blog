<template>
    <nav class="clearfix" @mouseenter="openNav" @mouseleave="closeNav">
        <div class="nav-left">
			<a
				v-for="(item, index) in data"
				@click="mouseenter(item)"
				:class="{'active': item.status === 'open'}"
				href="javascript:;"
				:key="index"
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
	name: 'nav',
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
					children: [
						{
							name: '添加文章',
							level: 1,
							status: 'open',
							router: '/admin/addArticle',
							children: [
								{
									index: '1-7-2-1',
									name: 'hh',
									status: 'open',
									level: 2,
									children: [
										{
											index: '1-7-2-1-1',
											name: 'gg',
											level: 3,
										}
									]
								},
								{
									name: 'hh',
									status: 'open',
									level: 2,
								}
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
				}
			],
			currentChildren: [], // 当前的子集数据
			currentTitle: '标题',
			navStatus: false, // 菜单状态(打开||关闭)
		}
	},
	created() {
		this.currentChildren = this.data[0].children
		this.currentTitle = this.data[0].name
	},
	methods: {
		// 鼠标移入时,将对应的数据给子菜单,并变化数据
		mouseenter(item) {
			this.currentChildren = item.children
			this.currentTitle = item.name

			this.data.forEach(obj => {
				if (item === obj) {
					obj.status = 'open'
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
		}
	},
}
</script>

<style lang="scss">
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
			display: block;
			line-height: 48px;
			text-align: center;

			i[class*="icon"] {
				font-size: 26px;
			}

			&.active {
				color: red;
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
