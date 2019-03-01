<template>
  <router-view></router-view>
</template>

<script>
export default {

}
</script>

<style scoped>
.content_right {
  flex: 16;
  padding: 0 20px;
  color: #b1bdd4;
  min-height: 8.37rem;
  background-color: pink;
  background: url(../../../assets/backgroundImages/m12.jpg) no-repeat;
  background-size: cover;
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
