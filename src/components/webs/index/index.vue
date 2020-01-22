<template>
    <div class="container">
        <!-- 调用头部公共组件 -->
        <my-header></my-header>

        <router-view></router-view>

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
.container {
    min-height: 100%;
    position: relative;
}
</style>
