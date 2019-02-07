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
            <h1>{{ articleData.title }} <i class="icon" title="原创">&#xe612;</i></h1>
            <ul class="describe clearfix">
              <li>分类： {{ articleData.classname }}</li>
              <li>创建时间： {{ articleData.updatetime | formatDate('YYYY-MM-DD') }}</li>
              <li>更新时间： {{ articleData.createtime | formatDate('YYYY-MM-DD') }}</li>
              <li>阅读数： {{ articleData.read }}</li>
              <li>点赞数： {{ articleData.praise }}</li>
            </ul>
            <mavon-editor v-model="articleData.content" :subfield="false" :defaultOpen="defaultData" :toolbarsFlag="false" :boxShadow="false" />
            <div class="subscript">
              -------------------- 本文结束 <my-icon identification="niu"></my-icon> 感谢阅读 --------------------
            </div>
            <div class="line"></div>
            <div class="page clearfix">
              <div v-if="preArticle.status === 200" @click="clickDuring(preArticle.data.id)" class="page_pre"><i class="icon">&#xe639;</i>{{ preArticle.data.title }}</div>
              <div v-if="nextArticle.status === 200" @click="clickDuring(nextArticle.data.id)" class="page_next">{{ nextArticle.data.title }}<i class="icon">&#xe638;</i></div>
            </div>
            <div class="line"></div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="活动区域" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="活动时间" required>
                <el-col :span="11">
                  <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="date2">
                    <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="即时配送" prop="delivery">
                <el-switch v-model="ruleForm.delivery"></el-switch>
              </el-form-item>
              <el-form-item label="活动性质" prop="type">
                <el-checkbox-group v-model="ruleForm.type">
                  <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                  <el-checkbox label="地推活动" name="type"></el-checkbox>
                  <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                  <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="特殊资源" prop="resource">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio label="线上品牌商赞助"></el-radio>
                  <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="活动形式" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
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
    return {
      articleData: {},
      defaultData: 'preview',
      routingInformation: {
        name1: '首页',
        name2: '文章详情',
        router: '/'
      },
      preArticle: {},
      nextArticle: {},
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.loadData() // 获取文章详情数据
  },
  methods: {
    async loadData() { // 获取文章详情数据
      const { data } = await this.$http.get(`articleDetails/${this.$route.params.articleId}`)
      this.articleData = data[0] // 将数据赋值给 vue
      const bodyEle = document.querySelector('html') // 获取 html 元素
      bodyEle.scrollTop = 0 // 置顶
      this.during() // 获取上一篇和下一篇的数据
    },
    async during() { // 获取上一篇和下一篇的数据
      const { data } = await this.$http.get(`during/${this.articleData.updatetime}`) // 发送请求
      this.preArticle = data.preArticle // 将值赋值给 vue
      this.nextArticle = data.nextArticle
    },
    clickDuring(id) { // 点击上上一页或下一页时执行
      this.$router.push({
        path: `/articleDetails/${id}`
      })
    },
    onSubmit() {
      console.log('submit!')
    }
  },
  watch: {
    $route() { // 监听路由变化
      this.loadData()
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
  width: 8.1rem;
  height: 100%;
  float: left;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  padding-bottom: 10px;
  background-color: #fff;
  margin: 0 0.2rem 0.2rem 0;
}

/* describe-start */
.content .left h1 {
  position: relative;
}

.content .left h1>i {
  top: 12px;
  right: -36px;
  position: absolute;
}

.content .left .describe {
  margin: 0 auto 0.1rem;
  display: inline-block;
}

.content .left .describe li {
  float: left;
  color: #4ec3a4;
  margin-right: 0.1rem;
  border-radius: 0.15rem;
  padding: 0.04rem 0.08rem;
  border: 1px solid #a9d6cd;
}
/* describe-end */

/* subscript-start */
.content .left .subscript {
  color: #d4d4d4;
}

.content .left .subscript .icon {
  font-size: 35px;
}
/* subscript-end */

.content .left .line {
  width: 100%;
  height: 1px;
  margin: 20px 0;
  background-color: #ececec;
}

/* page-start */
.page {
  color: #e26060;
  padding: 0 100px;
}

.page .page_pre {
  float: left;
  cursor: pointer;
}

.page .page_pre i {
  margin-right: 10px;
}

.page .page_next {
  float: right;
  cursor: pointer;
}

.page .page_next i {
  margin-left: 10px;
}
/* page-end */

/* .content .left>.original {
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
} */

/* reset-markdown-style-start */
.content .left >>> .v-note-wrapper .v-note-panel .v-note-show .v-show-content {
  background-color: #fff;
}

.content .left >>> .v-note-wrapper .v-note-panel {
  border: none;
}
/* reset-markdown-style-end */
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
