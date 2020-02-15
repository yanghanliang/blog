<template>
    <div id="app">
        <!-- 调用头部公共组件 -->
        <my-header></my-header>
        <router-view />
        <!-- 调用底部公共组件 -->
        <my-footer></my-footer>
    </div>
</template>

<script>
// 导入 header
import myHeader from '@/components/webs/public/myHeader'
// 导入 footer
import myFooter from '@/components/webs/public/myFooter'

export default {
	name: 'App',
	components: {
		myHeader,
		myFooter
	},
	methods: {
	},
	watch: {
		$route(to, from) {
			console.log(to, from, 'route')
		}
	},
}

</script>

<style scoped>
</style>
