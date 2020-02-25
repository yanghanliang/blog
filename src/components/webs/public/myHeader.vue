<template>
    <div class="header-box">
		<el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" :router="true"
			background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<!-- <a href="#">logo</a> -->
			<!-- <el-menu-item index="1">目录</el-menu-item> -->
			<!-- <el-submenu index="2">
			<template slot="title">我的工作台</template>
			<el-menu-item index="2-1">选项1</el-menu-item>
			<el-menu-item index="2-2">选项2</el-menu-item>
			<el-menu-item index="2-3">选项3</el-menu-item>
			<el-submenu index="2-4">
				<template slot="title">选项4</template>
				<el-menu-item index="2-4-1">选项1</el-menu-item>
				<el-menu-item index="2-4-2">选项2</el-menu-item>
				<el-menu-item index="2-4-3">选项3</el-menu-item>
			</el-submenu>
			</el-submenu> -->
			<el-menu-item index="/common">
				<!-- <router-link to="/catalogList">日志</router-link> -->
				首页
			</el-menu-item>
			<el-submenu index="1">
				<template slot="title">分类</template>
				<el-submenu v-if="catalog.children" v-for="catalog in catalogs" :index="catalog.index" :key="catalog.id">
					<template slot="title">{{ catalog.classname }}</template>
					<el-menu-item v-if="!two.children" v-for="two in catalog.children" :index="two.index" :key="two.id">
						{{ two.classname }}</el-menu-item>

					<el-submenu v-if="two.children" v-for="two in catalog.children" :index="two.index" :key="two.id">
						<template slot="title">{{ two.classname }}</template>
						<el-menu-item v-if="!three.children" v-for="three in two.children" :index="three.index"
							:key="three.id">
							{{ three.classname }}</el-menu-item>

						<el-submenu v-if="three.children" v-for="three in two.children" :index="three.index"
							:key="three.id">
							<template slot="title">{{ three.classname }}</template>
							<el-menu-item v-if="!four.children" v-for="four in three.children" :index="four.index"
								:key="four.id">
								{{ four.classname }}</el-menu-item>

							<el-submenu v-if="four.children" v-for="four in three.children" :index="four.index"
								:key="four.id">
								<template slot="title">{{ four.classname }}</template>
								<el-menu-item v-if="!five.children" v-for="five in four.children" :index="five.index"
									:key="five.id">
									{{ five.classname }}</el-menu-item>
							</el-submenu>
						</el-submenu>
					</el-submenu>
				</el-submenu>
				<el-menu-item v-if="!catalog.children" v-for="catalog in catalogs" :index="catalog.index" :key="catalog.id">
					{{ catalog.classname }}</el-menu-item>
				<!-- <el-submenu index="2-4">
					<template slot="title">选项4</template>
					<el-menu-item index="2-4-1">选项1</el-menu-item>
					<el-menu-item index="2-4-2">选项2</el-menu-item>
					<el-menu-item index="2-4-3">选项3</el-menu-item>
				</el-submenu> -->
			</el-submenu>
			<el-menu-item index="/catalogList">
				<!-- <router-link to="/catalogList">日志</router-link> -->
				日志
			</el-menu-item>
			<el-menu-item index="/admin">后台</el-menu-item>
			<el-menu-item index="/views/components">小需求</el-menu-item>
			<el-submenu index="git">
				<template slot="title">GitHub</template>
				<el-menu-item index=""><a href="https://github.com/yanghanliang/blog" target="_blank">git</a></el-menu-item>
				<el-menu-item index=""><a href="https://github.com/yanghanliang/blog-api" target="_blank">git-api</a>
				</el-menu-item>
			</el-submenu>
		</el-menu>
		<!-- <logo></logo> -->
		<div class="hb-box">
			<template v-if="userInfo">
				<span color2>欢迎：{{ userInfo.alias }}~</span>
				<ul class="user-box">
					<li @click="signOut">退出</li>
				</ul>
			</template>
			<template v-else>
				<router-link to="/login">登录</router-link>
				<span color>|</span>
				<router-link to="/register">注册</router-link>
			</template>
		</div>
	</div>
</template>

<script>
export default {
	name: 'myHeard',
	components: {
		// logo,
	},
	data() {
		return {
			// activeIndex: '/common',
			catalogs: [{
				index: '1-7',
				classname: 'CSS',
				children: [{
					index: '1-7-1',
					classname: 'table'
				},
				{
					index: '1-7-2',
					classname: 'button',
					children: [{
						index: '1-7-2-1',
						classname: 'hh',
						children: [{
							index: '1-7-2-1-1',
							classname: 'gg'
						}]
					}]
				},
				{
					index: '1-7-3',
					classname: 'page'
				}
				]
			},
			{
				index: '2-2',
				classname: 'HTML',
				children: [{
					index: '2-2-1',
					classname: 'section'
				}]
			},
			{
				index: '1-3',
				classname: 'JavaScript',
				children: [{
					index: '1-3-1',
					classname: 'Jquery'
				},
				{
					index: '1-3-2',
					classname: 'JavaScript'
				},
				{
					index: '1-3-3',
					classname: 'Vue'
				},
				{
					index: '1-3-4',
					classname: 'NodeJs'
				}
				]
			},
			{
				index: '1-4',
				classname: 'akjsaks'
			}
			],
			userInfo: ''
		}
	},
	created() {
		this.loadData() // 加载数据
		this.getUserInfo() // 获取用户信息
	},
	methods: {
		async loadData() { // 加载数据
			const {
				data
			} = await this.$http.get('/category')
			this.catalogs = this.InfinitePoleClassification(data) // 将数据修改成层级关系
		},
		InfinitePoleClassification(data) { // 无限极分类
			const sourceData = Object.assign([], data) // 对象值传递
			let finalData = [] // 存储最终数据
			for (let i = 0; i < sourceData.length; i++) {
				let value = sourceData[i]
				if (value.pid === 0) { // 判断是否是第一层级
					value.index = '1-' + value.id
					finalData.push(value) // 将第一层级的数追加到 finalData 中
					sourceData.splice(i, 1) // 去除数据源中的第一次层级
					i-- // 因为对象是引用传递， splice 后，数据源 data 已经更改，所以必须 i--
				}
			}

			function ipc(finalData) {
				if (finalData.length <= 0) {
					return false
				}
				let childrenArr = [] // 子数组
				for (let i = 0; i < finalData.length; i++) {
					for (let j = 0; j < sourceData.length; j++) {
						let value = sourceData[j]
						if (finalData[i].id === value.pid) { // 找到对应的子级
							finalData[i].children = [] // 声明子层级是数组
							value.index = finalData[i].index + '-' + value.id
							childrenArr.push(value) // 存储子数组
							finalData[i].children.push(value) // 将对应的子级放入最终数据中
							sourceData.splice(j, 1)
							j--
						}
					}
				}

				if (sourceData.length > 0) {
					ipc(childrenArr)
				}
			}

			console.log(finalData, 'finalData')
			ipc(finalData)
			return finalData
		},
		// 获取用户信息
		getUserInfo() {
			this.userInfo = JSON.parse(window.localStorage.getItem('user'))
		},
		// 退出登录
		signOut() {
			this.$confirm('您是想直接退出还是换一个账号登录?', '退出登录', {
				confirmButtonText: '直接退出',
				cancelButtonText: '切换账户',
				type: 'warning'
			}).then(() => {
				window.localStorage.removeItem('token')
				window.localStorage.removeItem('user')
				// this.$router.go(0)
				window.location.reload()
				this.$message({
					type: 'success',
					message: '退出成功~'
				})
			}).catch(() => {
				window.localStorage.removeItem('token')
				window.localStorage.removeItem('user')
				this.$router.push({
					name: 'login'
				})
			})
		}
	}
}

</script>

<style lang="scss" scoped>
@import '@/assets/css/color/index.scss'; // 使用方法

/* reset-style-start */
.el-menu--horizontal>.el-menu-item a {
	display: inline-block;
}

.el-menu.el-menu--horizontal {
    border-bottom: none;
}
/* reset-style-end */

.header-box {
	height: 60px;
	line-height: 60px;
	position: relative;

	canvas {
		top: -66px;
		right: -41px;
		transform: scale(.4);
		position: absolute;
	}

	.hb-box {
		top: 50%;
		right: 33px;
		position: absolute;
		transform: translateY(-50%);

		&:hover {
			.user-box {
				display: block;
			}
		}

		.user-box {
			width: 100%;
			display: none;
			color: $theme-color2;
			text-align: center;
			position: absolute;
			box-shadow: -3px 3px 7px 0px #cccccc;

			li {
				height: 40px;
				cursor: pointer;
				line-height: 40px;

				&:hover {
					background-color: $hover;
				}
			}
		}
	}
}
</style>
