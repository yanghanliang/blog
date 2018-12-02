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
          <div class="left" ref="articleContent">
            <!-- <h1>在 Vue 中借助 `highlight.js` 插件,实现代码高亮 <i class="icon" title="原创">&#xe612;</i></h1>
            <section>
              <h2>添加序列号 （可以不用考虑 vue）</h2>
              <p>去除两边的换行 (为了下面的`html`结构好看-换行书写-于是引出以下问题)</p>
              <pre>
                <code language="html">
<header>
  <h1>Example HTML</h1>
</header>
<main class="style">
  <p>Some text</p>
</main>
                </code>
              </pre>
              <h3>因为下面还需要使用正则,所以一开始我想用正则匹配，于是发现了 `/^a(.*)a$/`</h3>
              <pre>
                <code>
var str = 'abcdehjjsajhjjajhja'
// 可以获得去除两边a后的字符串 bcdehjjsajhjjajhj
str.replace(/^a(.*)a$/, function (input, $1){
  return $1
})
                </code>
              </pre>
              <h4>然后出现一个问题,正则怎么匹配 "包括换行"的任意字符(除换行外的任意单个字符是 . )</h4>
              <p>发现: [\d\D] [\s\S] [\g] [.] [a] 很多中括号中添加绝大多数字符,都能匹配包括换行的任意字符</p>
              <pre>
                <code>
// 最开始我没想出来,于是有了下一种方法
str.replace(/^\n([\d\D]*)\n$/, function (input, $1) {
  return $1
})
                </code>
              </pre>
              <h4>直接简单粗暴的猜想</h4>
              <p>`str.trim()` 可以去除字符串两边的空格, 所以我用它来验证我的猜想(去除两边的换行和空格),事实证明确实可以
<br/><br/>虽然想得复杂了,但是我第一次发现 replace 还能这么写, trim 还可以这么用 以及如何匹配包括换行的任意字符和匹配任意两端字符的方法</p>
              <h3>最后得出最终换行的代码:</h3>
              <pre>
                <code class="scrollbar" language="html">
let str = document.getElementsByTagName('code').innerText.trim()
item.innerHTML = '<ol><li>  ' + str.replace(/\n/g, '\n</li><li>  ') + '\n</li></ol>'
                </code>
              </pre>
            </section>
            <section>
              <h2>复制 (需要考虑 vue)</h2>
              <p>点击复制按钮实现，将当前的代码块复制上</p>
              <pre>
                <code class="scrollbar" language="html">
let str = item.innerText.trim()
item.innerHTML = '<ol><li>  ' + str.replace(/\n/g, '\n</li><li>  ') + '\n</li></ol><div class="copy" style="top: 10px; right: 20px; color: #333; font-size: 12px; cursor: pointer; position: absolute; padding: 2px 10px; text-align: center; border-radius: 3px; background-color: #fff; font-family: 微软雅黑, 宋体;">复制</div>'
                </code>
              </pre>
              <h3>单纯的实现点击复杂当前按钮下的代码块,很简单(不考虑 vue)</h3>
            </section>
            <section>
              <h2>1、Javascript 代码高亮</h2>
                  <pre>
                    <code>
var box = document.querySelect('.box')
box.onclick = function() {
    console.log("hh")
}
                      </code>
                  </pre>
            </section> -->
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
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const data = await this.$http.get(`articleDetakils/${this.$route.params.articleId}`)
      this.$refs.articleContent.innerHTML = data.data[0].content
      // console.log(data.data[0].content)
      this.code_highlight(this.$refs.articleContent) // 代码高亮
    }
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

.content .left >>> h1>i {
  cursor: default;
}

.content .left >>> section {
  text-align: left;
  margin-bottom: 0.6rem;
}

.content .left >>> section h2 {
  text-align: left;
}

.content .left >>> p {
  text-align: left;
  line-height: 24px;
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
