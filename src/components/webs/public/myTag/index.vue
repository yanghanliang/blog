<template>
    <div class="my-tag">
        <template v-if="status === 'default'">
            <span>标签</span>
			<i class="my-icon-more display-ib rotate90 cursor-pointer"></i>
        </template>
        <template v-else-if="status === 'active'">
            <div class="active occlusion-layer">
                <span>标签</span>
            </div>
        </template>
    </div>
</template>

<script>
export default {
	name: 'myTag',
	data() {
		return {
			status: 'default'
		}
	},
}
</script>

<style lang="scss" scoped>
.my-tag {
    .active {
		display: inline-block;
		padding: 10px;
		border-radius: 5px;
		background-color: aquamarine;
    }
}
</style>
