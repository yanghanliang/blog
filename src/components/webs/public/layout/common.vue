<template>
	<div class="layout">
		<div class="layout-left"></div>
		<div class="layout-right"></div>
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
}

.layout-left {
    top: 0;
    bottom: 0;
    width: 300px;
    position: absolute;
    border: 1px solid #ddd;
}

.layout-right {
    width: 200px;
    margin-left: 320px;
    background-color: cornflowerblue;
}
</style>
