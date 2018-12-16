<template>
  <div class="content_right">
    <h4>添加文章</h4>
    <el-form ref="form" :model="form" label-width="80px">
       <el-form-item label="文章标题" class="box">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类">
        <el-select v-model="form.type" placeholder="请选择分类">
        <el-option label="javaScript" value="javaScript"></el-option>
        <el-option label="CSS" value="CSS"></el-option>
        <el-option label="HTML" value="HTML"></el-option>
        <el-option label="JavaScript | Vue" value="JavaScript | Vue"></el-option>
        </el-select>
      </el-form-item>
      <!-- 简介 -->
      <el-form-item label="文章简介">
        <el-input type="textarea" v-model="form.synopsis"></el-input>
      </el-form-item>
      <mavon-editor v-model="form.content" :subfield="true" @change="changeData"/>
      <el-form-item style="margin-top: 22px;">
        <el-button type="primary" @click="addArticle">{{ buttonText }}</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: '',
        type: '',
        synopsis: '',
        content: '',
        id: ''
      },
      // value: '',
      defaultData: 'preview',
      buttonText: '添加文章',
      url: 'addArticle',
      type: 'post'
    }
  },
  created() {
    const articleId = this.$route.params.articleId
    if (articleId) {
      this.getEditData(articleId)
    }
  },
  methods: {
    changeData(value, render) {
      let str = render
      let startIndex = str.indexOf('_0"')
      let middleIndex = str.indexOf('</h', startIndex)
      let startStr = str.substr(0, middleIndex)
      let middleStr = str.substr(middleIndex)
      this.form.content = startStr + '&nbsp;<i class="icon" title="原创">&#xe612;</i>' + middleStr
    },
    async addArticle() {
      const data = await this.$http[this.type](this.url, this.form)
      if (data.data.status === 200) {
        // 弹出提示框
        this.$message({
          type: 'success',
          message: data.data.msg,
          center: true
        })
        // 跳转文章列表页
        this.$router.push({ name: 'articleList' })
      } else {
        // 弹出提示框
        this.$message({
          type: 'error',
          message: data.data.msg,
          center: true
        })
      }
    },
    async getEditData(articleId) {
      const { data } = await this.$http.get(`articleDetakils/${articleId}`)
      this.form.title = data[0].title
      this.form.type = data[0].type
      this.form.synopsis = data[0].synopsis
      this.form.content = data[0].content
      this.buttonText = '修改文章'
      this.url = `editArticle/${articleId}` // 修改url
      this.type = 'put' // 修改请求类型
    }
  }
}
</script>

<style scoped>
.content_right>h4 {
  text-indent: 0.12rem;
}

.content_right .el-textarea,.el-select {
  width: 5rem;
}

.box {
  width: 580px;
}

.el-form-item >>> .el-form-item__label {
  color: #b1bdd4;
}

.el-form-item >>> .el-textarea__inner {
  min-height: 80px !important;
  font: 400 13.3333px Arial;
}
</style>
