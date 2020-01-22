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
.el-breadcrumb {
	margin: 15px 0;
}

.el-breadcrumb>>>.el-breadcrumb__inner.is-link {
	color: #a1c0ff;
}

.el-breadcrumb>>>.el-breadcrumb__item:last-child .el-breadcrumb__inner {
	color: #dedede;
}

</style>
