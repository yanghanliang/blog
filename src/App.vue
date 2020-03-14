<template>
    <div id="app" class="app">
        <router-view />
    </div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			ip: returnCitySN['cip'],
			region: returnCitySN['cname'], // 地域
			ipInfo: null,
			time: new Date().getTime()
		}
	},
	created() {
		this.getUserJurisdiction()
		this.ipIsExistence()
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
		},
		// 判断ip是否存在
		async ipIsExistence() {
			try {
				const data = await this.$http.post('echarts/web/is/ip', {
					ip: this.ip
				})
				if (data.length > 0) {
					this.ipInfo = data[0]
				} else {
					const h = this.$createElement
					this.$notify({
						offset: 100,
						duration: 30000,
						title: '欢迎浏览，这次是您的第一次浏览~',
						message: h('i', { style: 'color: teal' }, `本站是一个前后端分离的项目，前端用vue、vue-router、element-ui，后端是express、mysql搭建的，本站的主要功能有: 权限控制、文章管理、分类管理、用户管理、图片上传等，站长做了一个百度翻译的小功能机器人，在分辨率大于1800时才能看`)
					})
				}
				this.addBrowseUser()
			} catch (e) {
				console.log(e, 'e')
			}
		},
		async addBrowseUser() {
			if (this.ipInfo) {
				// 第二次浏览本站
				try {
					// const postData = {
					// 	id: this.ipInfo.id,
					// 	sumTime: new Date().getTime() - this.time + this.ipInfo.sum_time, // 毫秒
					// }
					const sumTime = new Date().getTime() - this.time + this.ipInfo.sum_time // 毫秒
					await this.$http.get(`echarts/update/browse/user?id=${this.ipInfo.id}&sumTime=${sumTime}`)
				} catch (e) {
					console.log(e)
				}
			} else {
				console.log('123')
				// 第一次浏览本站
				try {
					const postData = {
						ip: this.ip,
						sumTime: new Date().getTime() - this.time, // 毫秒
					}
					await this.$http.post('echarts/add/browse/user', postData)
				} catch (e) {
					console.log(e)
				}
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
