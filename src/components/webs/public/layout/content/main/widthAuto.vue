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
    min-height: 100%;
	position: relative;
    // background: -webkit-linear-gradient(40deg, #b8fff5, pink); /* Safari 5.1 - 6.0 */
    // background: -o-linear-gradient(40deg, #b8fff5, pink); /* Opera 11.1 - 12.0 */
    // background: -moz-linear-gradient(40deg, #b8fff5, pink); /* Firefox 3.6 - 15 */
	// background: linear-gradient(40deg, #b8fff5, pink); /* 标准的语法 */

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
		transition: width .15s linear;
	}

	.layout-right {
		padding: 20px;
		min-height: 100%;
		overflow: hidden;
	}
}
</style>
