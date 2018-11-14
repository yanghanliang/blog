<template>
  <div class="body">
    <my-header></my-header>

    <div class="w">
        <div class="search">
            <!-- <form name="form1" method="post" action="?c=Index&a=search" target="_blank">
                <input class="sear_input" name="textword" autofocus="autofocus" type="text" placeholder="搜索从这里开始...">
                <button type="submit" class="iconfont icon-sousuo"></button>
            </form> -->
            <el-form ref="form" label-width="80px">
              <el-input placeholder="请输入内容" clearable></el-input>
              <el-button icon="el-icon-search" circle></el-button>
            </el-form>
        </div>

        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content clearfix scrollbar">
          <div class="left">
            <h1>nodejs中的async模块学习 <i class="icon" title="原创">&#xe612;</i></h1>
            <section>
              <h2>8个3D视觉效果的HTML5动画欣赏</h2>
              <p>现在的网页中应用了越来越多的3D应用，特别是基于HTML5 Canvas的动画特效，让用户有一种非常震撼的视觉体验。本文收集了8个非常炫酷的3D视觉效果的HTML5动画，都有源代码分享，你可以学习你感兴趣的HTML5动画，一起来看看。</p>
            </section>
            <section>
              <h2>1、CSS3飘带状3D菜单 菜单带小图标</h2>
              <p>这次我们要来分享一款很特别的CSS3菜单，菜单的外观是飘带状的，并且每一个菜单项有一个精美的小图标，鼠标滑过菜单项时，菜单项就会向上凸起，像是飘带飘动一样，形成非常酷的3D视觉效果。这款CSS3飘带状3D菜单非常适合作一些活动页面的菜单导航。</p>
            </section>
            <section>
              <h2>1、Javascript 代码高亮</h2>
                  <pre v-highlightA>
                    <code>
var box = document.querySelect('.box')
box.onclick = function() {
    console.log("hh")
}
                      </code>
                  </pre>
            </section>
          </div>
          <div class="right">
            <!-- Relevant recommendations Abbreviations rr -->
            <!-- 相关推荐 简写 rr -->
            <ol class="rr">
              <h3>你可能需要</h3>
              <li><a href="#">CSS 从喜欢到厌烦</a></li>
              <li><a href="#">CSS 从简单到烦躁</a></li>
              <li><a href="#">CSS 从了解到全然不解</a></li>
              <li><a href="#">CSS 线性渐变</a></li>
              <li><a href="#">CSS 径向渐变</a></li>
              <li><a href="#">CSS animation</a></li>
            </ol>

            <category></category>

          </div>
        </div>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
// 导入 header
import myHeader from '@/components/webs/public/myHeader'
// 导入 footer
import myFooter from '@/components/webs/public/myFooter'
// 导入 category
import category from '@/components/webs/public/category'

export default {
  name: 'articles_details',
  components: {
    myHeader,
    myFooter,
    category
  }
}
</script>

<style scoped>
.body {
  height: 100%;
}

.body .w .el-breadcrumb {
  margin-bottom: 0.2rem;
}

/* search-start */
.search {
  width: 400px;
  margin: 20px auto 20px;
}

.search .el-form .el-input {
  float: left;
  width: 3.1rem;
}
/* search-end */

/* content-start */
.content {
  overflow-y: auto;
  overflow-x: hidden;
}

/* left-start */
.content .left {
  width: 62%;
  height: 100%;
  float: left;
  padding: 0.2rem;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 0.05rem;
  background-color: #fff;
  margin: 0 0.2rem 0.2rem 0;
  border: 1px solid #ebebeb;
}

.content .left h1>i {
  cursor: default;
}

.content .left section {
  margin-bottom: 0.6rem;
}

.content .left section h2 {
  text-align: left;
}

.content .left p {
  text-align: left;
}
/* left-end */

/* right-start */
.content .right {
  width: 30%;
  float: right;
  vertical-align: top;
}

.content .right .rr {
  padding: 0.2rem;
  text-align: left;
  background-color: #fff;
  border: 1px solid #ebebeb;
}

.content .right .rr li {
  color: #666;
  height: 0.3rem;
  line-height: 0.3rem;
  font-weight: normal;
  margin-left: 0.16rem;
}

.content .right .rr li a {
  color: #666;
}

.content .right>.bg_img_b {
  width: 50%;
}

.category {
  margin-bottom: 20px;
}
/* right-end */
/* content-end */
</style>
