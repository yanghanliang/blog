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
          </el-select>
        </el-form-item>
        <!-- 简介 -->
        <el-form-item label="文章简介">
          <el-input type="textarea" v-model="form.synopsis"></el-input>
        </el-form-item>
        <mavon-editor @change="changeData"/>
        <el-form-item style="margin-top: 22px;">
          <el-button type="primary" @click="addArticle">添加文章</el-button>
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
        content: ''
      },
      // value: '',
      defaultData: 'preview'
    }
  },
  methods: {
    changeData(value, render) {
      var str = render
      var startIndex = str.indexOf('_0"')
      var middleIndex = str.indexOf('</h', startIndex)
      var startStr = str.substr(0, middleIndex)
      var middleStr = str.substr(middleIndex)
      this.form.content = startStr + '<i class="icon original" title="原创">&#xe612;</i>' + middleStr
      console.log(this.form.content)
    },
    async addArticle() {
      // console.log(mavonEditor)
      // console.log(markdownValue )
      // console.log(this.form.content)
      const data = await this.$http.post('addArticle', this.form)
      console.log(data)
    }
  }
}
</script>

<style scoped>
.content_right {
  float: right;
  width: 11.45rem;
  color: #b1bdd4;
}

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
</style>
