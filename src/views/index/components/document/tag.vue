<template>
    <div>
       <my-tag :tagData="{ id: 1, name: '面朝大海，春暖花开~' }" field="name" :contentWidth="true" @handleDelete="handleDelete" @handleConfirm="handleConfirm"></my-tag>

    </div>
</template>

<script>
import myTag from '@/components/webs/public/myTag/index'

export default {
	name: 'tag',
	components: {
		myTag
	},
	methods: {
		handleDelete (data) {
			console.log(data, '删除')
		},
		handleConfirm (data) {
			console.log(data, '确定')
		}
	},
}
</script>

<style lang="scss" scoped>
</style>
