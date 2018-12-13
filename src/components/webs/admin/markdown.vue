<template>
  <div class="content_right">
    <h4>添加文章</h4>
    <el-form ref="form" :model="form" label-width="80px">
         <el-form-item label="文章标题">
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
      this.form.content = render
    },
    async addArticle() {
      const data = await this.$http.post('addArticle', this.form)
      console.log(data)
    }
  }
}
</script>

<style scoped>
.content_right {
  width: 12.17rem;
  float: right;
}

.content_right>h4 {
  text-indent: 0.12rem;
}

.content_right .el-textarea {
  width: 5rem;
}
</style>
