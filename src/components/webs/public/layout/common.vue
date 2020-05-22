<template>
	<section class="layout">
        <header>
            <slot name="header">header</slot>
        </header>
        <slot name="content">content</slot>
        <footer>
            <slot name="footer">footer</slot>
        </footer>
	</section>
</template>

<script>
export default {
	name: 'layoutCommon',
	props: {
		content: {
			type: String,
			default: 'left' // 默认左边是内容
		}
	},
	computed: {
		// 内容位置
		contentLocation() {
			return this.content === 'left'
		}
	}
}
</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
    font-size: 14px;
    min-height: 100%;
    position: absolute;
    padding-bottom: 50px;
    box-sizing: border-box;

    header {
        height: 60px;
        line-height: 60px;
    }

    footer {
        bottom: 0;
        height: 50px;
        line-height: 50px;
        position: absolute;
    }
}
</style>
