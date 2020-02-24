<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
	name: 'App',
	created() {
		this.getUserJurisdiction()
	},
	methods: {
		// 获取用户权限
		async getUserJurisdiction() {
			try {
				const data = await this.$http.get('user/jurisdiction')
				this.__proto__._jurisdiction = data
				window.localStorage.setItem('_jurisdiction', JSON.stringify(data))
			} catch (e) {
				console.log(e)
			}
		}
	},
	watch: {
		// $route(to, from) {
		// 	console.log(this._jurisdiction, '_jurisdiction')
		// 	if (!this._jurisdiction.includes(to.name)) {
		// 		this.$router.go(-1)
		// 	}
		// }
	},
}

</script>

<style scoped>
</style>
