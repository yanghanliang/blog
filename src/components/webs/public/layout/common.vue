<template>
	<div class="layout">
        <header>header</header>
		<div class="layout-left"></div>
		<div class="layout-right"></div>
        <footer>footer</footer>
	</div>
</template>

<script>
export default {
	name: 'layoutCommon'
}
</script>

<style lang="scss" scoped>
.layout {
    width: 1200px;
    margin-top: 10px;
    min-height: 100%;
    position: absolute;
    border: 1px solid #ddd;

    header {
        height: 50px;
        line-height: 50px;
    }

    footer {
        bottom: 0;
        height: 50px;
        line-height: 50px;
        position: absolute;
    }

    .layout-left {
        top: 50px;
        bottom: 50px;
        width: 300px;
        position: absolute;
        border: 1px solid #ddd;
    }

    .layout-right {
        width: 200px;
        margin-left: 320px;
        background-color: cornflowerblue;
    }
}
</style>
