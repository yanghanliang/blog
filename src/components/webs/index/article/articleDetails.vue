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

        <!-- 调用自己封装的面包屑组件 -->
        <my-crumbs :ri="routingInformation"></my-crumbs>

        <div class="content clearfix scrollbar">
          <div class="left" ref="articleContent">
            <h1>{{ title }} <i class="icon" title="原创">&#xe612;</i></h1>
            <mavon-editor v-model="value" :subfield="false" :defaultOpen="defaultData" :toolbarsFlag="false" :boxShadow="false" />
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
  data() {
    return { // value的值是经过markdown解析后的文本，可使用`@change="changeData"`在控制台打印显示
      title: '',
      value: '',
      defaultData: 'preview',
      routingInformation: {
        name1: '首页',
        name2: '文章详情',
        router: '/'
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const data = await this.$http.get(`articleDetakils/${this.$route.params.articleId}`)
      // this.$refs.articleContent.innerHTML = data.data[0].content
      // console.log(data.data[0].content)
      // var str = data.data[0].content
      // var start_index = str.indexOf('_0"')
      // var middle_index = str.indexOf('</h', start_index)
      // var start_str = str.substr(0, middle_index)
      // var middle_str = str.substr(middle_index)
      // this.value = start_str + '<i class="icon" title="原创">&#xe612;</i>' + middle_str
      this.title = data.data[0].title
      this.value = data.data[0].content
      // this.code_highlight(this.$refs.articleContent) // 代码高亮
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
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  background-color: #fff;
  margin: 0 0.2rem 0.2rem 0;
  border: 1px solid #e0e0e0;
}

.content .left>.original {
  top: 20px;
  right: 200px;
  position: absolute;
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

.content .left >>> .v-note-wrapper .v-note-panel .v-note-show .v-show-content {
  background-color: #fff;
}

.content .left >>> .v-note-wrapper .v-note-panel {
  border: none;
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
