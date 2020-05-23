<template>
	<el-breadcrumb separator-class="el-icon-arrow-right">
		<!-- routing information 缩写为 RI 路由信息 -->
		<!-- <el-breadcrumb-item :to="{ path: ri.router }">{{ ri.name1 }}</el-breadcrumb-item>
		<el-breadcrumb-item>{{ ri.name2 }}</el-breadcrumb-item> -->
	</el-breadcrumb>
</template>

<script>
export default {
	name: 'MyCrumbs',
	props: ['ri'],
	data () {
		return {
			routeInfo: {}
		}
	},
	created () {
		// routingInformation: {
		// 		name1: '首页',
		// 		name2: '添加权限',
		// 		router: '/'
		// 	},
		console.log(this.$router, this.$route, 'router')
		this.matchRoute()
	},
	methods: {
		/**
		 * 匹配当前路由
		 * @param {object}           params
		 * @param {}               params.
		 */
		matchRoute () {
			const routeList = this.$router.options.routes
			const currentRoute = this.$router.history.current.path
			let lock = true

			const recursion = (data, title = [], path = [], prentPath = '', i = 0) => {
				if (data[i] && lock) {
					let tempPath = data[i].path === '/' ? '/' : prentPath + data[i].path
					if (tempPath === currentRoute) {
						lock = false
						this.routeInfo = { title, path }
					} else if (data[i].children) {
						recursion(data[i].children, title.concat(data[i].name), path.concat(data[i].path), tempPath)
					}

					recursion(data, title, path, prentPath, i + 1)
				}
			}

			recursion(routeList)
			console.log(this.routeInfo, 'routeInfo')
		}
	},
}

</script>

<style>
.el-breadcrumb {
	margin: 15px 0;
}

.el-breadcrumb>>>.el-breadcrumb__inner.is-link {
	color: #a1c0ff;
}

.el-breadcrumb>>>.el-breadcrumb__item:last-child .el-breadcrumb__inner {
	color: #dedede;
}

@media (max-device-width: 435px) {
    .el-breadcrumb {
		font-size: 12px;
	}
}
</style>
