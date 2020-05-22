<template>
    <router-view :key="$route.path"></router-view>
    <!-- <div>
        <robot class="robot"></robot>
    </div> -->
</template>

<script>
// 导入机器人
// import robot from '@/components/function/robot/index'

export default {
	name: 'index',
	components: {
		// robot
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
