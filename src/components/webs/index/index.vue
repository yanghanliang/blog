<template>
    <div>
        <!-- 调用头部公共组件 -->
        <my-header></my-header>
        <div class="container">
            <router-view :key="$route.path"></router-view>
            <robot class="robot"></robot>
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
// 导入机器人
import robot from '@/components/function/robot/index'

export default {
	name: 'index',
	components: {
		myHeader,
		myFooter,
		robot
	}
}

</script>

<style lang="scss" scoped>
@media screen and (max-width: 1800px) {
    .robot {
        display: none;
    }
}

.container {
    min-height: 827px;
}
</style>
