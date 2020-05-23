<template>
    <layout-common>
        <my-header slot="header" />
        <my-footer slot="footer" />
        <section slot="content">
            <router-view />
            <robot class="robot"></robot>
        </section>
    </layout-common>
</template>

<script>
// 导入布局
import layoutCommon from '@/components/webs/public/layout/common'
// 导入 header
import myHeader from '@/components/webs/public/myHeader'
// 导入 footer
import myFooter from '@/components/webs/public/myFooter'
// 导入机器人
import robot from '@/components/function/robot/index'

export default {
	name: 'index',
	components: {
		layoutCommon,
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
</style>
