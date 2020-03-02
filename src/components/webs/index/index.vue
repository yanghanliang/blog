<template>
    <div>
        <!-- 调用头部公共组件 -->
        <my-header></my-header>
        <div class="container">
            <router-view :key="$route.path"></router-view>
        </div>
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
	name: 'index',
	components: {
		myHeader,
		myFooter
	}
}

</script>

<style scoped>
</style>
