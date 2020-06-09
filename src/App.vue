<template>
    <div id="app" class="app">
		<router-view />
    </div>
</template>

<script>
export default {
	name: 'App',
	components: {
	},
	data () {
		return {
			ip: returnCitySN.cip,
			ipInfo: null,
			time: new Date().getTime(),
			sumTime: 0
		}
	},
	created () {
		this.ipIsExistence()
		this.getUserJurisdiction()
	},
	mounted () {
		window.addEventListener('beforeunload', () => {
			let sumTime = Number(window.localStorage.getItem('time') || this.sumTime) + new Date().getTime() - this.time // 毫秒
			window.localStorage.setItem('time', sumTime)
		})
	},
	methods: {
		async getUserIp () {
			const data = await this.$http.get('user/ip')
			this.ip = data
		},
		// 获取用户权限
		async getUserJurisdiction () {
			try {
				const data = await this.$http.get('user/jurisdiction')
				this.__proto__._jurisdiction = data
				window.localStorage.setItem('_jurisdiction', JSON.stringify(data))
			} catch (e) {
				console.log(e)
			}
		},
		// 判断ip是否存在
		async ipIsExistence () {
			try {
				const data = await this.$http.post('echarts/web/is/ip', {
					ip: this.ip
				})
				if (data.length > 0) {
					const sumTime = window.localStorage.getItem('time')
					if (sumTime) {
						data[0].sum_time = sumTime
					} else {
						window.localStorage.setItem('time', data[0].sum_time)
					}
					this.ipInfo = data[0]
					// const h = this.$createElement
					// const showTime = Math.ceil(this.ipInfo.sum_time / 1000 / 60)
					// this.$notify({
					// 	offset: 100,
					// 	duration: 30000,
					// 	title: '欢迎浏览~',
					// 	message: h('i', { style: 'color: teal; font-style: normal;' }, `(｡･∀･)ﾉﾞ嗨！您已浏览此网站共${showTime}分钟`)
					// })
				} else {
					const h = this.$createElement
					this.$notify({
						offset: 100,
						duration: 30000,
						title: '欢迎浏览~',
						message: h('i', { style: 'color: teal' }, `本站是一个前后端分离的项目，前端用vue、vue-router、element-ui，后端是express、mysql搭建的，本站的主要功能有: 权限控制、文章管理、分类管理、用户管理、图片上传等，站长做了一个百度翻译的小功能机器人`)
					})
				}

				this.addBrowseUser()
			} catch (e) {
				console.log(e, 'e')
			}
		},
		// 添加浏览用户
		async addBrowseUser () {
			if (this.ipInfo) {
				// 第二次浏览本站
				try {
					// 防止用户切换浏览器或者更换电脑时丢失数据
					this.sumTime = this.ipInfo.sum_time === 'NaN' ? 0 : this.ipInfo.sum_time
					const sumTime = window.localStorage.getItem('time') || 0 // 毫秒
					await this.$http.get(`echarts/update/browse/user?id=${this.ipInfo.id}&sumTime=${sumTime}`)
				} catch (e) {
					console.log(e)
				}
			} else {
				// 第一次浏览本站
				try {
					const postData = {
						ip: this.ip
					}

					// window.localStorage.setItem('time', sumTime)
					await this.$http.post('echarts/add/browse/user', postData)
				} catch (e) {
					console.log(e)
				}
			}
		},
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
