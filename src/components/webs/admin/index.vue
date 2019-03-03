<template>
    <div class="index">
        <header><h1>后台首页</h1></header>
        <div class="content">
            <div class="content_left">
                <!-- <router-link to="/admin/listUser" tag="li" active-class="hover"><a>a</a></router-link>
                <router-link to="/admin/b" tag="li" active-class="hover"><a>b</a></router-link> -->
                <!-- <li><a href="#">a</a></li> -->
                <!-- <li><a href="#">b</a></li> -->
                <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                    <el-radio-button :label="false">展开</el-radio-button>
                    <el-radio-button :label="true">收起</el-radio-button>
                </el-radio-group>
                <el-menu
                  default-active="1-4-1"
                  class="el-menu-vertical-demo"
                  :collapse="isCollapse"
                  :router="true">
                    <el-submenu index="1">
                        <template slot="title">
                          <i class="icon" style="color: #2456bb;">&#xe63a;</i>
                          <span slot="title">文章</span>
                        </template>
                        <el-menu-item-group>
                        <!-- <span slot="title">javaScript</span> -->
                          <el-menu-item index="/admin/addArticle">添加文章</el-menu-item>
                          <el-menu-item index="/admin/articleList">文章列表</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="HTML">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                          <span slot="title">CSS</span>
                          <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-submenu index="2">
                      <template slot="title">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-shuangsechangyongtubiao-"></use>
                        </svg>
                        <span slot="title">分类</span>
                      </template>
                      <el-menu-item-group>
                        <el-menu-item index="/admin/addCategory">添加分类</el-menu-item>
                        <el-menu-item index="/admin/categoryList">分类列表</el-menu-item>
                      </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </div>
            <right-content></right-content>
        </div>
        <footer>底部内容区域</footer>
    </div>
</template>

<script>
// 引入右边内容区域
import RightContent from '@/components/webs/admin/RightContent'

export default {
  name: 'admin',
  data() {
    return {
      isCollapse: true
    }
  },
  components: {
    RightContent
  },
  beforeCreate() {
    const token = sessionStorage.getItem('token')
    if (!token) {
      // 弹出提示
      this.$message({
        type: 'error',
        message: '您还没有登录, 请先登录!',
        center: true
      })

      // 跳转到登录页面
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>
.index {
  min-height: 100%;
}

header > h1 {
  margin: 0;
}

.content {
  display: flex;
  min-height: 8.38rem;
}

.content_left {
  flex: 2;
  background-color: #fff;
}

.content::before {
  content: '';
  float: left;
  /* min-width: 139px; */
  min-height: 100%x;
}

.content_left li a {
  width: 100%;
  height: 30px;
  display: block;
  color: #ffffff;
  line-height: 30px;
  background-color: #666;
}

.content_left li a:hover {
  background-color: blue;
}

.content_left .hover a {
  background-color: blue;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-submenu__title .icon {
    font-size: 0.3rem;
}
</style>
