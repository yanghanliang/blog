<template>
    <section>
        <section class="layout-left">
            <slot name="layout-left">layout-left</slot>
        </section>
        <section class="layout-right">
            <slot name="layout-right">layout-right</slot>
        </section>
    </section>
</template>

<script>
export default {
	name: 'rightAuto'
}
</script>

<style lang="scss" scoped>
.layout-left {
    top: 60px;
    bottom: 50px;
    position: absolute;
    border: 1px solid #ddd;
}

.layout-right {
    margin-left: 320px;
}
</style>
