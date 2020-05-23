<template>
	<el-breadcrumb separator-class="el-icon-arrow-right">
		<!-- routing information 缩写为 RI 路由信息 -->
		<template v-for="(item, index) in routeInfo.path">
			<el-breadcrumb-item :to="{ path: ri.router }" :key="index">{{ routeInfo.title[index] }}</el-breadcrumb-item>
		</template>
	</el-breadcrumb>
</template>

<script>
export default {
	name: 'MyCrumbs',
	props: ['ri'],
	filters: {
		jump (value) {
		}
	},
	data () {
		return {
			routeInfo: {
				path: [],
				title: []
			}
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
			const currentRoute = this.$route
			let lock = true

			const recursion = (data, title = [], path = [], prentPath = '', i = 0) => {
				if (data[i] && lock) {
					let tempPath = data[i].path === '/' ? '/' : prentPath + data[i].path
					if (tempPath === currentRoute.path) {
						// 停止递归
						lock = false
						// 把当前路由追加到数据中
						title.concat(currentRoute.meta.title)
						path.concat(currentRoute.path)
						this.routeInfo = { title, path }
					} else if (data[i].children) {
						recursion(data[i].children, title.concat(data[i].meta.title), path.concat(data[i].path), tempPath)
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
