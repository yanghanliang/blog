<template>
	<el-breadcrumb separator-class="el-icon-arrow-right">
		<!-- routing information 缩写为 RI 路由信息 -->
		<el-breadcrumb-item :to="{ path: ri.router }">{{ ri.name1 }}</el-breadcrumb-item>
		<el-breadcrumb-item>{{ ri.name2 }}</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script>
export default {
	name: 'MyCrumbs',
	props: ['ri'],
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
			const params = {
				routeList: this.$router.options.routes,
				currentRoute: this.$router.history.current.path,
				parentInfo: {
					title: [],
					path: []
				},
				tempPath: ''
			}

			const recursion = function (params, tempPath) {
				const data = params.routeList
				for (let i = 0, length = data.length; i < length; i++) {
					let item = data[i]
					let path = tempPath + item.path
					console.log(path, '===', params.currentRoute)
					if (path === params.currentRoute) {
						console.log('????????')
						debugger
						return false
					} else if (item.children) {
						params.parentInfo.title.push(item.name)
						params.parentInfo.path.push(item.path)
						let str = path === '/' ? '/' : path + '/'
						params.routeList = item.children

						recursion(params, str)
					}
				}
			}

			console.log(params, 'params')
			const routeInfo = recursion(params, '')
			console.log(routeInfo, 'routeInfo')
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
