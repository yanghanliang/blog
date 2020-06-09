<template>
    <div class="w">
		<!-- <my-tag :contentWidth="true" :tagData="{ id: 1, name: '测试一下' }" field="name" @handleDelete="handleDelete" @handleConfirm="handleConfirm"></my-tag> -->
		<contract-seal></contract-seal>
		<!-- <u-key></u-key> -->
		<!-- <content-block></content-block> -->
		<!-- <my-crumbs></my-crumbs> -->
		<!-- <show-image /> -->
		<!-- <upload-file /> -->
    </div>
</template>

<script>
// import myTag from '@/components/webs/public/myTag/index'
import contractSeal from '@/components/function/contractSeal/index'
// import uKey from '@/components/ukey'
// import contentBlock from '@/components/webs/public/contentBlock/index'
// import myCrumbs from '@/components/webs/public/myCrumbs'
// import showImage from '@/components/test/showImage'
// import uploadFile from '@/components/webs/public/uploadFile/index'

export default {
	components: {
		// myTag,
		contractSeal,
		// uKey,
		// contentBlock,
		// myCrumbs,
		// showImage,
		// uploadFile
	},
	methods: {
		handleDelete (data) {
			console.log(data, '删除')
		},
		handleConfirm (data) {
			console.log(data.value, '确定')
		}
	},
}
</script>

<style lang="scss">

</style>
