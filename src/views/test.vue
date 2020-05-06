<template>
    <div class="w">
		<my-tag :tagData="{ id: 1, value: '测试一下' }" @handleDelete="handleDelete" @handleConfirm="handleConfirm"></my-tag>
    </div>
</template>

<script>
import myTag from '@/components/webs/public/myTag/index'

export default {
	components: {
		myTag
	},
	methods: {
		handleDelete(data) {
			console.log(data, '删除')
		},
		handleConfirm(data) {
			console.log(data, '确定')
		}
	},
}
</script>

<style lang="scss">

</style>
