<template>
    <div class="mobile">
        <router-view />
    </div>
</template>

<script>
export default {
	name: 'mobile',
	created() {
		this.tips()
	},
	methods: {
		tips() {
			const h = this.$createElement
			this.$notify({
				offset: 100,
				duration: 30000,
				title: '关于移动端兼容~',
				message: h('i', { style: 'color: teal' }, `目前正在建设中，移动端只做两个页面的兼容，请您用电脑打开此网站，以便观看完整功能~`)
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
