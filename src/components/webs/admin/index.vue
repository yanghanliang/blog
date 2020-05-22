<template>
	<right-auto>
		<my-nav slot="layout-left"></my-nav>
        <right-content slot="layout-right"></right-content>
	</right-auto>
    <!-- <div class="admin">
        <my-nav class="fl"></my-nav>
        <right-content></right-content>
    </div> -->
</template>

<script>
// 导入布局组件
import rightAuto from '@/components/webs/public/layout/content/main/rightAuto'
// 导航
import myNav from '@/components/webs/public/myNav/index'
// 引入右边内容区域
import RightContent from '@/components/webs/admin/RightContent'

export default {
	name: 'admin',
	components: {
		rightAuto,
		myNav,
		RightContent
	},
	data() {
		return {
			isCollapse: true
		}
	},
	beforeCreate() {
		const token = localStorage.getItem('token')
		if (!token) {
			// 弹出提示
			this.$message({
				type: 'error',
				message: '您还没有登录, 请先登录!',
				center: true
			})

			// 跳转到登录页面
			this.$router.push({
				name: 'login'
			})
		}
	}
}

</script>

<style lang="scss">
.admin {
	left: 0;
    right: 0;
    top: 60px;
    bottom: 50px;
	position: absolute;

    .my-nav {
        display: inline-block;
    }

    .right-content {
        float: left;
    }
}
</style>
