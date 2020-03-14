<template>
    <div>
        <!-- 调用自己封装的面包屑组件 -->
        <my-crumbs :ri="routingInformation"></my-crumbs>
        <img src="../../assets/backgroundImages/personalResume.png" alt="个人简历">
    </div>
</template>

<script>
export default {
	data() {
		return {
			routingInformation: { // 面包屑数据
				name1: '首页',
				name2: '个人简历',
				router: '/'
			},
		}
	},
}
</script>

<style lang="scss" scoped>
div > img {
    margin: 100px auto;
    display: inherit;
}

@media (max-device-width: 435px) {
    div > img {
		width: 100%;
		margin: 0 0 10px 0;
    }
}
</style>
