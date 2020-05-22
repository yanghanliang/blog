<template>
    <section class="layout-content">
		<section class="layout-left">
			<slot name="layout-left"></slot>
		</section>
		<div class="ll-before"></div>
		<section class="layout-right">
			<slot name="layout-right"></slot>
		</section>
	</section>
</template>

<script>
export default {
	name: 'widthAuto'
}
</script>

<style lang="scss" scoped>
.layout-content {
	.layout-left {
		top: 0;
		bottom: 0;
		width: 58px;
		position: absolute;
	}

	.layout-left:hover {
		width: 240px;

		+ .ll-before {
			width: 240px;
		}
	}

	.layout-left nav > .open{
		width: 240px;

		+ .ll-before {
			width: 240px;
		}
	}

	.ll-before {
		width: 58px;
		height: 20px;
		float: left;
		margin-right: 15px;
		transition: width .15s linear;
	}

	.layout-right {
		overflow: hidden;
	}
}
</style>
