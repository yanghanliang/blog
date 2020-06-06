<template>
    <div class="w">
		<!-- <my-tag :contentWidth="true" :tagData="{ id: 1, name: '测试一下' }" field="name" @handleDelete="handleDelete" @handleConfirm="handleConfirm"></my-tag> -->
		<!-- <contract-seal></contract-seal> -->
		<!-- <picture-synthesis></picture-synthesis> -->
		<!-- <u-key></u-key> -->
		<!-- <image-clipper></image-clipper> -->
		<!-- <content-block></content-block> -->
		<!-- <my-crumbs></my-crumbs> -->
		<show-image />
    </div>
</template>

<script>
// import myTag from '@/components/webs/public/myTag/index'
// import contractSeal from '@/components/webs/public/contractSeal/index.vue'
// import pictureSynthesis from '@/components/canvas/pictureSynthesis/index.vue'
// import uKey from '@/components/ukey'
// import imageClipper from '@/components/canvas/imageClipper/index'
// import contentBlock from '@/components/webs/public/contentBlock/index'
// import myCrumbs from '@/components/webs/public/myCrumbs'
import showImage from '@/components/test/showImage'

export default {
	components: {
		// myTag,
		// contractSeal,
		// uKey,
		// pictureSynthesis,
		// imageClipper,
		// contentBlock,
		// myCrumbs,
		showImage
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
