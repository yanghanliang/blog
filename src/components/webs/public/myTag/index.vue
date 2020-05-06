<template>
    <div class="my-tag">
        <div class="mt-content">
            <span>标签</span>
            <i @click="status = 'active'" class="my-icon-more display-ib rotate90 cursor-pointer"></i>
        </div>
        <template v-if="status === 'active'">
            <ul class="active occlusion-layer">
                <li>标签</li>
            </ul>
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

    .mt-content {

    }
}
</style>
