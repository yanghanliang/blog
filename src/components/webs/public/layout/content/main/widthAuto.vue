<template>
    <section class="width-auto">
        <section class="wa-left">
            <slot name="layout-left">layout-left</slot>
        </section>
        <section class="wa-right">
            <slot name="layout-right">layout-right</slot>
        </section>
    </section>
</template>

<script>
export default {
	name: 'widthAuto'
}
</script>

<style lang="scss" scoped>
.width-auto {
	min-height: 100%;
	position: relative;

	.wa-left {
		float: left;
		height: 300px;
		
		&::before {
			top: 0;
			bottom: 0;
			width: 58px;
			content: "";
			z-index: -1;
			position: absolute;
			border-right: 1px solid #ddd;
		}
	}

	.wa-right {
		/* 关键 */
		overflow: hidden;
	}
}

// .layout-left:hover {
//     width: 300px;
// }

// .layout-left::before {
//     top: 0;
//     bottom: 0;
//     content: "";
//     width: 200px;
//     position: absolute;
// }

// .layout-left:hover::before {
//     width: 300px;
// }
</style>
