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
    background-color: cornflowerblue;
}

.layout-right {
    right: 0;
    top: 60px;
    bottom: 50px;
    width: 300px;
    position: absolute;
    border: 1px solid #ddd;
}
</style>
