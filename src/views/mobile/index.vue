<template>
    <div class="mobile">
        <router-view />
    </div>
</template>

<script>
export default {
	name: 'mobile',
	created () {
		this.tips()
	},
	methods: {
		tips () {
			this.$message({
				message: '目前正在建设中，移动端只做两个页面的兼容，请您用电脑打开此网站，以便观看完整功能~!',
				type: 'info',
				duration: 5000, // 缩短时间，提高用户体验
			})
		},
	},
}
</script>

<style lang="scss" scoped>
    .mobile {
        height: 100%;
    }
</style>
