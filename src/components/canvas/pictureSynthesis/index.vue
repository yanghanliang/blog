<template>
	<div class="picture-synthesis">
		<div class="background-map-box clearfix">
			<img class="background-map" src="../../../assets/backgroundImages/login.jpg" alt="背景图">
		</div>
	</div>
</template>

<script>
export default {
	name: 'pictureSynthesis', // 图片合成
}
</script>

<style lang="scss" scoped>
.picture-synthesis {
	padding-top: 20px;

	.background-map-box {
		border: 1px dashed blue;

		img {
			width: 100%;
			float: left;
		}
	}
}
</style>
