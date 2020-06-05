<template>
    <section>
        <slot></slot>
        <section class="layout-left">
            <slot name="content">内容</slot>
        </section>
        <section class="layout-right">
            <slot name="nav">nav</slot>
        </section>
    </section>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.layout-left {
    margin-right: 320px;
}

.layout-right {
    right: 0;
    top: 60px;
    bottom: 50px;
    width: 300px;
    position: absolute;
}
</style>
