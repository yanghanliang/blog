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
                <el-input v-model="commentForm.alias" v-bind:disabled="Boolean(alias)"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="mailbox">
                <el-input v-model="commentForm.mailbox"></el-input>
              </el-form-item>
              <el-form-item label="评论" prop="comment_content">
                <el-input type="textarea" placeholder="畅所欲言~" v-model="commentForm.comment_content"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('commentForm', '/addComment', commentForm)">走你~</el-button>
                <el-button @click="resetForm('commentForm')">重置</el-button>
              </el-form-item>
            </el-form>
            <div class="show_comment" v-for="(data, parentIndex) in commentData" :key="parentIndex">
              <div :class="index%2 === 1 ? 'sc_box right' : 'sc_box'" v-for="(item, index) in data" :key="index">
                <div class="scb_header clearfix">
                  <div class="scbh_img_box" @click="editHeadPortrait(item.comment_id)">
                    <img :src="'http://localhost:3001/'+ item.head_portrait_url" alt="头像">
                  </div>
                  <div class="scbh_arrow"></div>
                  <span>{{ item.alias }}</span>
                </div>
                <div class="scb_body">
                  <my-icon identification="caozuoqipao"></my-icon>
                  <p>{{ item.comment_content }}</p>
                </div>
                <div class="scb_footer clearfix">
                  <div class="commentary_time">
                    <my-icon identification="shijian1"></my-icon> 一天前
                  </div>
                  <el-button class="replay" type="text" @click="replay(item.alias, item.id, parentIndex, index)">
                    <my-icon identification="chakantiezihuifu"></my-icon>
                  </el-button>
                </div>
              </div>
            </div>
            <ul class="no_data" v-if="!commentData">
              <li><my-icon identification="meiyouxiangguan"></my-icon></li>
              <li>没有数据~</li>
            </ul>
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

    <el-dialog :title="replyAlias" :visible.sync="dialogFormVisible">
      <el-form :model="replyForm" status-icon :rules="rules" ref="replyForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="昵称" prop="alias">
          <el-input v-model="replyForm.alias" v-bind:disabled="Boolean(alias)"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="mailbox">
          <el-input v-model="replyForm.mailbox"></el-input>
        </el-form-item>
        <el-form-item label="评论" prop="comment_content">
          <el-input type="textarea" placeholder="畅所欲言~" v-model="replyForm.comment_content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('replyForm', '/addReply', replyForm, closeDialogBoxes)">走你~</el-button>
          <el-button @click="resetForm('replyForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="修改头像" :visible.sync="dialogFormVisible2">
      <div class="clearfix">
        <div class="edit_head_portrait">
          <label class="el-form-item__label" style="width: 80px;">上传图片</label>
          <!--elementui的上传图片的upload组件-->
          <el-upload
            class="upload-demo"
            :before-upload="beforeupload"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            style="margin-left:80px;">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>

          <!--elementui的form组件-->
          <!-- <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动名称">
              <el-input v-model="form.name" name="names" style="width:360px;"></el-input>
            </el-form-item>
            <el-form-item>
              
            </el-form-item>
          </el-form> -->
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="dialogFormVisible2 = false">取消</el-button>
        </div>

        <div class="head_portrait_preview">
          <img :src="src" alt="">
        </div>
      </div>
    </el-dialog>
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
        const length = value.trim().length
        if (reg.test(value) && length >= 8 && length <= 30) {
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
      alias: window.sessionStorage.getItem('alias'),
      commentForm: {
        alias: window.sessionStorage.getItem('alias'),
        mailbox: '',
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
      },
      commentData: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      replyAlias: '', // 回复人
      replyForm: {
        alias: window.sessionStorage.getItem('alias'),
        mailbox: '',
        comment_id: '',
        comment_content: ''
      },
      // 图片上传
      form: { //form里面的参数
        name: ''
      },
      commentId: '',
      param: '', //表单要提交的参数
      src: "https://afp.alicdn.com/afp-creative/creative/u124884735/14945f2171400c10764ab8f3468470e4.jpg"
    }
  },
  created() {
    this.loadData() // 获取文章详情数据
    this.getCommentData() // 获取评论数据
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
    async getCommentData() { // 获取评论数据
      const { data } = await this.$http.get(`comment/${this.$route.params.articleId}`)
      this.commentData = data.data
    },
    clickDuring(id) { // 点击上上一页或下一页时执行
      this.$router.push({
        path: `/articleDetails/${id}`
      })
    },
    submitForm(formName, uri, fromData, callback) { // 提交评论
      this.$refs[formName].validate(async (valid) => {
        if (valid) { // 数据验证成功
          this[formName].article_id = this.$route.params.articleId
          const { data } = await this.$http.post(uri, fromData)
          if (data.status === 200) {
            this.$message({
              type: 'success',
              message: data.msg
            })
            if (!window.sessionStorage.getItem('alias')) { // 如果是游客则记录他的昵称
              window.sessionStorage.setItem('alias', this[formName].alias)
              this.alias = this[formName].alias
            }
            callback && callback()
            this.resetForm(formName) // 清空评论内容
            this.getCommentData() // 重新获取数据（不可简化，因为回复需要id
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) { // 重置表单
      // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$refs[formName].resetFields()
    },
    replay(alias, commentId, parentIndex, index) { // 回复评论
      this.dialogFormVisible = true // 显示对话框
      this.replyAlias = `回复 - ${alias} :` // 标题
      this.replyForm.comment_id = commentId // 评论 id
    },
    closeDialogBoxes() { // 关闭对话框
      this.dialogFormVisible = false
    },
    editHeadPortrait(commentId) {
      this.dialogFormVisible2 = true
      this.commentId = commentId
    },
    beforeRemove(file, fileList) {
      // return this.$confirm(`确定移除 ${ file.name }？`);
    },
    // 阻止upload的自己上传，进行再操作
    beforeupload(file) {
      // 创建临时的路径来展示图片
      var windowURL = window.URL || window.webkitURL
      // console.log('src',Object.assign({}, windowURL.createObjectURL(file)))
      this.src = windowURL.createObjectURL(file)
      console.log(this.src)
      // 重新写一个表单上传的方法
      this.param = new FormData();
      this.param.append('file', file, file.name)
      return false
    },
    //覆盖默认的上传行为
    httprequest() {
    },
    async onSubmit(){//表单提交的事件
      // var names = this.form.name
      // 下面append的东西就会到form表单数据的fields中；
      this.param.append('commentId', this.commentId)
      // let config = {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }
      // 然后通过下面的方式把内容通过axios来传到后台
      // 下面的this.$reqs 是在主js中通过Vue.prototype.$reqs = axios 来把axios赋给它;
      const { data } = await this.$http.post("/pictureUpload", this.param)

      this.dialogFormVisible2 = false
      if (data.status === 200) {
        this.src = this.Global.baseURL + data.path
        for (var i = 0; i < this.commentData.length; i++) {
          var temp = this.commentData[i]
          for (var j = 0; j < temp.length; j++) {
            console.log(temp[j].comment_id, this.commentId)
            if (temp[j].comment_id === this.commentId) {
              temp[j].head_portrait_url = data.head_portrait_url
              return false
            }
          }
        }
      }
    }
  },
  watch: {
    $route() { // 监听路由变化
      this.loadData()
      this.getCommentData() // 重新获取评论数据
    },
    alias(newData, oldData) { // 减少用户输入昵称,提高用户体验
      this.commentForm.alias = newData
      this.replyForm.alias = newData
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
  width: 4rem;
  margin: 0.2rem auto 0.2rem;
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
  width: 8.4rem;
  float: left;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  padding-bottom: 0.1rem;
  background-color: #fff;
  padding: 0 0.2rem 0.2rem 0.2rem;
}

.content .left .no_data {
  margin-top: 0.6rem;
}

.content .left .no_data .icon {
  font-size: 0.5rem;
}

/* describe-start */
.content .left h1 {
  position: relative;
}

.content .left h1>i {
  top: 0.12rem;
  right: -0.36rem;
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
  border: 0.01rem solid #a9d6cd;
}
/* describe-end */

/* subscript-start */
.content .left .subscript {
  color: #d4d4d4;
}

.content .left .subscript .icon {
  font-size: 0.35rem;
}
/* subscript-end */

.content .left .line {
  width: 100%;
  height: 0.01rem;
  margin: 0.2rem 0;
  background-color: #ececec;
}

/* page-start */
.page {
  color: #e26060;
  padding: 0 1rem;
}

.page .page_pre {
  float: left;
  cursor: pointer;
}

.page .page_pre i {
  margin-right: 0.1rem;
}

.page .page_next {
  float: right;
  cursor: pointer;
}

.page .page_next i {
  margin-left: 0.1rem;
}
/* page-end */

/* reset-element-ui-style-start */
.el-textarea >>> .el-textarea__inner {
  min-height: 1.35rem !important;
}

.el-form-item.is-success >>> .el-input__inner,.el-form-item.is-success >>> .el-textarea__inner {
  border-color: #3299bb;
}

.el-dialog__header >>> .el-dialog__title {
  color: #159484;
  text-shadow: 0.01rem 0.01rem white, -0.01rem -0.01rem #444;
}

.el-form-item >>> .el-form-item__content {
  text-align: center;
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
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  box-shadow: -0.03rem 0.03rem 0.09rem black;
}

.comment .icon {
  font-size: 0.5rem;
  line-height: 0.7rem;
}

/* show_comment-start */
.show_comment {
  margin-bottom: 0.2rem;
  padding-bottom: 0.2rem;
  border-bottom: 0.01rem dashed #dad6d6;
}

/* scb_header-start */
.show_comment .sc_box {
  margin-bottom: 0.5rem;
}

.sc_box .scb_header .scbh_img_box {
  width: 0.4rem;
  height: 0.4rem;
  float: left;
  cursor: pointer;
  overflow: hidden;
  border-radius: 50%;
  position: relative;
  border: 0.03rem solid #999;
}

.sc_box .scb_header .scbh_img_box img {
  top: 50%;
  left: 50%;
  width: 100%;
  position: absolute;
  transform: translate(-50%, -50%);
}

.sc_box .scb_header .scbh_arrow {
  width: 0;
  height: 0;
  float: left;
  margin-top: 0.12rem;
  border-top: 0.1rem solid transparent;
  border-right: 0.1rem solid transparent;
  border-bottom: 0.1rem solid transparent;
  border-left: 0.1rem solid #4ec3a4;
}

.sc_box .scb_header>span {
  float: left;
  color: #a9d6cd;
  line-height: 0.46rem;
  margin-left: 0.2rem;
}
/* scb_header-end */
.sc_box .scb_body {
  padding: 0.2rem;
  text-align: left;
  border-radius: 0.05rem;
  position: relative;
  margin: 0.5rem 0 0.2rem 0;
  border: 0.01rem solid #b355b1;
}

.sc_box .scb_body p {
  color: #da5858;
}

.sc_box.right .scb_body p {
  text-align: right;
}

.sc_box .scb_body .icon {
  top: -0.32rem;
  font-size: 0.3rem;
  position: absolute;

}

.sc_box .scb_body .icon {
  left: 0.1rem;
}

.sc_box.right .scb_body .icon {
  left: auto;
  right: 0.1rem;
}

.sc_box .scb_footer .commentary_time {
  float: left;
  color: #999;
}

.sc_box .scb_footer .replay {
  float: right;
  font-size: 0.18rem;
  cursor: pointer;
}

/* .scb_header.right-start */
.sc_box.right .scb_header .scbh_img_box,.sc_box.right .scb_header>span {
  float: right;
}

.sc_box.right .scb_header .scbh_arrow {
  float: right;
  border-top: 0.1rem solid transparent;
  border-right: 0.1rem solid #4ec3a4;
  border-bottom: 0.1rem solid transparent;
  border-left: 0.1rem solid transparent;
}

.sc_box.right .scb_header>span {
  margin-right: 0.2rem;
}
/* .scb_header.right-end */
/* show_comment-end */
/* left-end */

/* right-start */
.content>.right {
  width: 3rem;
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
  margin-bottom: 0.2rem;
}
/* right-end */
/* content-end */

.upload-demo {
  margin-bottom: 30px;
}

.edit_head_portrait {
  float: left;
  text-align: center;
}

.head_portrait_preview {
  float: right;
  width: 1.6rem;
  height: 1.6rem;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  border: 0.09rem solid #999;
}

.head_portrait_preview img {
  top: 50%;
  left: 50%;
  width: 100%;
  position: absolute;
  transform: translate(-50%, -50%);
}
</style>
