<template>
    <router-view></router-view>
</template>

<script>
export default {

}

</script>

<style lang="scss" scoped>
@import '@/assets/css/color/index.scss';

.content_right {
    overflow: hidden;
    padding: 0 20px;
    color: #b1bdd4;
    min-height: 100%;
    background-color: $bgc;
}

.el-breadcrumb {
    margin: 20px 0;
}

.el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: #9a9a9a;
}

.el-breadcrumb__inner.is-link {
    color: #d6d6d6;
}
</style>
