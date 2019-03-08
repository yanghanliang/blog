<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- routing information 缩写为 RI 路由信息 -->
        <el-breadcrumb-item :to="{ path: ri.router }">{{ ri.name1 }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ ri.name2 }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  name: 'MyCrumbs',
  props: ['ri']
}
</script>

<style>
</style>
