<template>
    <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <!-- <a href="#">logo</a> -->
        <!-- <el-menu-item index="1">目录</el-menu-item> -->
        <el-submenu index="1">
          <template slot="title">目录</template>
            <el-submenu v-for="catalog in catalogs" :index="catalog.index" :key="catalog.index">
              <template slot="title">{{ catalog.title }}</template>
              <el-menu-item v-for="value in catalog.children" :index="value.index" :key="value.index">{{ value.title }}</el-menu-item>
            </el-submenu>
            <!-- <el-submenu index="1-1">
                <template slot="title">CSS</template>
                <el-menu-item index="1-1-1">table</el-menu-item>
                <el-menu-item index="1-1-2">button</el-menu-item>
                <el-menu-item index="1-1-3">page</el-menu-item>
            </el-submenu> -->
            <!-- <el-submenu index="1-2">
                <template slot="title">HTML</template>
                <el-menu-item index="1-2-1">section</el-menu-item>
            </el-submenu>
            <el-submenu index="1-3">
                <template slot="title">JavaScript</template>
                <el-menu-item index="1-3-1">Jquery</el-menu-item>
                <el-menu-item index="1-3-2">Vue</el-menu-item>
                <el-menu-item index="1-3-3">NodeJs</el-menu-item>
            </el-submenu> -->
            <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: 'myHeard',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      catalogs: [
        {
          index: '1-1',
          title: 'CSS',
          children: [
            {
              index: '1-1-1',
              title: 'table'
            },
            {
              index: '1-1-2',
              title: 'button'
            },
            {
              index: '1-1-3',
              title: 'page'
            }
          ]
        },
        {
          index: '1-2',
          title: 'HTML',
          children: [
            {
              index: '1-2-1',
              title: 'section'
            }
          ]
        },
        {
          index: '1-3',
          title: 'JavaScript',
          children: [
            {
              index: '1-3-1',
              title: 'Jquery'
            },
            {
              index: '1-3-2',
              title: 'JavaScript'
            },
            {
              index: '1-3-3',
              title: 'Vue'
            },
            {
              index: '1-3-4',
              title: 'NodeJs'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
</style>
