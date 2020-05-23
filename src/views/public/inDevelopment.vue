<template>
    <div class="in-development">
        <!-- 调用自己封装的面包屑组件 -->
        <my-crumbs :ri="routingInformation"></my-crumbs>
		<div class="box">
			<i class="my-icon-jianshe-"></i>
			<p class="mt20">此页面暂未做移动端兼容，请您用电脑打开，以便观看完整功能~</p>
		</div>
    </div>
</template>

<script>
export default {
	name: 'inDevelopment',
	data () {
		return {
			routingInformation: {
				name1: '首页',
				router: '/'
			},
		}
	},
}
</script>

<style lang="scss" scoped>
.in-development {
	width: 100%;
	height: 100%;
	padding: 20px;
	position: relative;
	text-align:  center;
	box-sizing: border-box;

	.box {
		top: 50%;
		left: 50%;
		position: absolute;
		transform: translate(-50%, -50%);

		.my-icon-jianshe- {
			font-size: 80px;
			margin-top: 50%;
		}

		p {
			line-height: 20px;
		}
	}
}
</style>
