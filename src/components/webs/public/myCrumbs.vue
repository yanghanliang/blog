<template>
	<section :class="['crumbs', model]">
		<template v-for="(item, index) in routeInfo.path">
			<router-link :key="index" :class="{ 'linker': index !== 0 }" :to="{ path: routeInfo.path[index] }">{{ routeInfo.title[index] }}</router-link>
		</template>
	</section>
</template>

<script>
export default {
	name: 'MyCrumbs',
	props: {
		// 模式，传类也可以 [simple]
		model: {
			type: String,
			default: ''
		}
	},
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
					console.log(tempPath, '===', currentRoute.path)
					if (tempPath === currentRoute.path) {
						// 停止递归
						lock = false
						// 把当前路由追加到数据中
						title.push(this.$route.meta.title)
						path.push(this.$route.path)
						this.routeInfo = { title, path }
					} else if (data[i].children) {
						recursion(data[i].children, title.concat(data[i].meta.title), path.concat(data[i].path), tempPath === '/' ? '/' : tempPath + '/')
					} else if (tempPath.includes('/:')) {
						// 针对待参数的路由
						let tempPathStr = tempPath.split('/').slice(0, -1).join('')
						let currentRouteStr = currentRoute.path.split('/').slice(0, -1).join('')
						if (tempPathStr === currentRouteStr) {
							// 停止递归
							lock = false
							// 把当前路由追加到数据中
							title.push(this.$route.meta.title)
							path.push(this.$route.path)
							this.routeInfo = { title, path }
						}
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

<style lang="scss" scoped>
.crumbs {
	height: 20px;
	text-align: left;
	line-height: 20px;
	border-radius: 5px;
    margin-bottom: 10px;

	&:not(.simple) {
		padding: 20px;
		background-color: #fff;
	}

	.linker {
		&::before {
			content: "";
			width: 0;
			height: 0;
			margin: 0 15px;
			margin: 0 15px;
			display: inline-block;
			transform: rotate(-47deg);
			border-top: 5px solid #ff00e0;
			border-left: 5px solid #d4d4d4;
			border-right: 5px solid #3993d4;
			border-bottom: 5px solid #01ffff;
			box-shadow: -2px 2px 20px -1px #00f0fb;
		}
	}
}
</style>
