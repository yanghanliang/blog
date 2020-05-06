<template>
    <div class="w">
		<my-tag :contentWidth="true" :tagData="{ id: 1, name: '测试一下' }" field="name" @handleDelete="handleDelete" @handleConfirm="handleConfirm"></my-tag>
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
			console.log(data.value, '确定')
		}
	},
}
</script>

<style lang="scss">

</style>
