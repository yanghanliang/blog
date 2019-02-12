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
            <mavon-editor v-model="articleData.content" :subfield="false" defaultOpen="preview" :toolbarsFlag="false" :boxShadow="false" />
            <div class="subscript">
              -------------------- 本文结束 <my-icon identification="niu"></my-icon> 感谢阅读 --------------------
            </div>
            <div class="line"></div>
            <div class="page clearfix">
              <div v-if="preArticle.status === 200" @click="clickDuring(preArticle.data.id)" class="page_pre"><i class="icon">&#xe639;</i>{{ preArticle.data.title }}</div>
              <div v-if="nextArticle.status === 200" @click="clickDuring(nextArticle.data.id)" class="page_next">{{ nextArticle.data.title }}<i class="icon">&#xe638;</i></div>
            </div>
            <div class="line"></div>
            <div class="comment">
              <my-icon identification="pinglun1"></my-icon>
            </div>
            <el-form :model="commentForm" status-icon :rules="rules" ref="commentForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="昵称" prop="alias">
                <el-input v-model="commentForm.alias"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="mailbox">
                <el-input v-model="commentForm.mailbox"></el-input>
              </el-form-item>
              <el-form-item label="评论" prop="comment_content">
                <el-input type="textarea" placeholder="畅所欲言~" v-model="commentForm.comment_content"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('commentForm')">走你~</el-button>
                <el-button @click="resetForm('commentForm')">重置</el-button>
              </el-form-item>
            </el-form>
            <div class="show_comment">
              <div class="sc_box">
                <div class="scb_header clearfix">
                  <div class="scbh_img_box">
                    <img src="../../../../assets/user_head_portrait/test.jpeg" alt="头像">
                  </div>
                  <div class="scbh_arrow"></div>
                  <span>昵称</span>
                </div>
                <div class="scb_body">
                  <my-icon identification="caozuoqipao"></my-icon>
                  <p>: 上看见的是开始疯狂的事烦恼都是开放年代开始</p>
                </div>
                <div class="scb_footer clearfix">
                  <div class="commentary_time">
                    <my-icon identification="shijian1"></my-icon> 一天前
                  </div>
                  <my-icon class="replay" identification="chakantiezihuifu"></my-icon>
                </div>
              </div>
              <div class="sc_box right">
                <div class="scb_header clearfix">
                  <div class="scbh_img_box">
                    <img src="../../../../assets/user_head_portrait/test.jpeg" alt="头像">
                  </div>
                  <div class="scbh_arrow"></div>
                  <span>昵称</span>
                </div>
                <div class="scb_body">
                  <my-icon identification="caozuoqipao"></my-icon>
                  <p>: 上看见的是开始疯狂的事烦恼都是开放年代开始</p>
                </div>
                <div class="scb_footer clearfix">
                  <div class="commentary_time">
                    <my-icon identification="shijian1"></my-icon> 一天前
                  </div>
                  <my-icon class="replay" identification="chakantiezihuifu"></my-icon>
                </div>
              </div>
            </div>
            <div class="show_comment">
              <div class="sc_box">
                <div class="scb_header clearfix">
                  <div class="scbh_img_box">
                    <img src="../../../../assets/user_head_portrait/test.jpeg" alt="头像">
                  </div>
                  <div class="scbh_arrow"></div>
                  <span>昵称</span>
                </div>
                <div class="scb_body">
                  <my-icon identification="caozuoqipao"></my-icon>
                  <p>: 上看见的是开始疯狂的事烦恼都是开放年代开始</p>
                </div>
                <div class="scb_footer clearfix">
                  <div class="commentary_time">
                    <my-icon identification="shijian1"></my-icon> 一天前
                  </div>
                  <my-icon class="replay" identification="chakantiezihuifu"></my-icon>
                </div>
              </div>
            </div>
            <div class="show_comment">
              <div class="sc_box">
                <div class="scb_header clearfix">
                  <div class="scbh_img_box">
                    <img src="../../../../assets/user_head_portrait/test.jpeg" alt="头像">
                  </div>
                  <div class="scbh_arrow"></div>
                  <span>昵称</span>
                </div>
                <div class="scb_body">
                  <my-icon identification="caozuoqipao"></my-icon>
                  <p>: 上看见的是开始疯狂的事烦恼都是开放年代开始</p>
                </div>
                <div class="scb_footer clearfix">
                  <div class="commentary_time">
                    <my-icon identification="shijian1"></my-icon> 一天前
                  </div>
                  <my-icon class="replay" identification="chakantiezihuifu"></my-icon>
                </div>
              </div>
            </div>
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
    var validatePass = (rule, value, callback) => {
      if (/\S/.test(value)) {
        const reg = /[0-9a-zA-Z_.-]+[@]{1}[0-9a-zA-Z_.-]+([.]\bcom\b)$/
        if (reg.test(this.commentForm.mailbox)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱'))
        }
      }
      callback()
    }
    return {
      articleData: {},
      routingInformation: {
        name1: '首页',
        name2: '文章详情',
        router: '/'
      },
      preArticle: {},
      nextArticle: {},
      commentForm: {
        alias: '',
        mailbox: '',
        article_id: this.$route.params.articleId,
        comment_content: ''
      },
      rules: {
        alias: [
          { required: true, message: '请输入活动名称', trigger: 'change' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'change' }
        ],
        mailbox: [
          { validator: validatePass, trigger: 'change' }
        ],
        comment_content: [
          { required: true,
            pattern: /[0-9a-zA-Z_.-\D]+/,
            message: '说点啥',
            trigger: 'change',
            transform(value) {
              return value.trim()
            }
          }
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
    },
    // form 表单的方法
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) { // 数据验证成功
          const { data } = await this.$http.post('/addComment', this.commentForm)
          if (data.status === 200) {
            this.$message({
              type: 'success',
              message: data.msg
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
    // form 表单的方法
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
  width: 7.9rem;
  height: 100%;
  float: left;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  padding-bottom: 10px;
  background-color: #fff;
  padding: 0 0.2rem 0.2rem 0.2rem;
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

/* reset-element-ui-style-start */
.el-textarea >>> .el-textarea__inner {
  min-height: 135px !important;
}

.el-form-item.is-success >>> .el-input__inner,.el-form-item.is-success >>> .el-textarea__inner {
  border-color: #3299bb;
}
/* reset-element-ui-style-end */

/* reset-markdown-style-start */
.content .left >>> .v-note-wrapper .v-note-panel .v-note-show .v-show-content {
  background-color: #fff;
}

.content .left >>> .v-note-wrapper .v-note-panel {
  border: none;
}
/* reset-markdown-style-end */

.content .left .comment {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: -3px 3px 9px black;
}

.comment .icon {
  font-size: 50px;
  line-height: 70px;
}

/* show_comment-start */
.show_comment {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px dashed #dad6d6;
}

/* scb_header-start */
.show_comment .sc_box {
  margin-bottom: 50px;
}

.sc_box .scb_header .scbh_img_box {
  width: 40px;
  height: 40px;
  float: left;
  overflow: hidden;
  border-radius: 50%;
  border: 3px solid #999;
}

.sc_box .scb_header .scbh_img_box img {
  width: 100%;
}

.sc_box .scb_header .scbh_arrow {
  width: 0px;
  height: 0px;
  float: left;
  margin-top: 12px;
  border-top: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid #4ec3a4;
}

.sc_box .scb_header>span {
  float: left;
  color: #a9d6cd;
  line-height: 46px;
  margin-left: 20px;
}
/* scb_header-end */
.sc_box .scb_body {
  padding: 20px;
  text-align: left;
  border-radius: 5px;
  position: relative;
  margin: 50px 0 20px 0;
  border: 1px solid #b355b1;
}

.sc_box .scb_body p {
  color: #d4d4d4;
}

.sc_box .scb_body .icon {
  top: -32px;
  font-size: 30px;
  position: absolute;

}

.sc_box .scb_body .icon {
  left: 10px;
}

.sc_box.right .scb_body .icon {
  left: auto;
  right: 10px;
}

.sc_box .scb_footer .commentary_time {
  float: left;
  color: #999;
}

.sc_box .scb_footer .replay {
  float: right;
  font-size: 18px;
  cursor: pointer;
}

/* .scb_header.right-start */
.sc_box.right .scb_header .scbh_img_box,.sc_box.right .scb_header>span {
  float: right;
}

.sc_box.right .scb_header .scbh_arrow {
  float: right;
  border-top: 10px solid transparent;
  border-right: 10px solid #4ec3a4;
  border-bottom: 10px solid transparent;
  border-left: 10px solid transparent;
}

.sc_box.right .scb_header>span {
  margin-right: 20px;
}
/* .scb_header.right-end */
/* show_comment-end */
/* left-end */

/* right-start */
.content>.right {
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
