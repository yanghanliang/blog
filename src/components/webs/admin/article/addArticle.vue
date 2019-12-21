<template>
    <div class="content_right">
        <h4>{{ buttonText }}</h4>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="文章标题" class="box">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="文章分类">
                <el-select v-model="form.classname" placeholder="请选择分类">
                    <el-option v-for="category in categoryData" :label="category.classname" :value="category.id"
                        :key="category.id"></el-option>
                </el-select>
            </el-form-item>
            <!-- 简介 -->
            <el-form-item label="文章简介">
                <el-input type="textarea" v-model="form.synopsis"></el-input>
            </el-form-item>
            <mavon-editor v-model="form.content" :subfield="true" />
            <el-form-item style="margin-top: 22px;">
                <el-button type="primary" @click="addArticle">{{ buttonText }}</el-button>
                <el-button @click="$router.push({ name: 'articleList' })">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    title: '', // 文章标题
                    classname: '', // 文章类名
                    synopsis: '', // 文章描述
                    content: '', // 文章内容
                    categoryId: '', // 保存原类名 ID
                    id: '' // 文章 id(修改时才用到)
                },
                buttonText: '添加文章', // 默认提交按钮文字
                url: 'addArticle', // 默认提交地址
                type: 'post', // 默认请求方式
                categoryData: '' // 分页数据
            }
        },
        created() {
            this.getCategoryData() // 获取分类数据
            const articleId = this.$route.params.articleId // 获取路由参数
            if (articleId) {
                this.getEditData(articleId)
            }
        },
        methods: {
            async addArticle() { // 点击添加文章||修改文章时执行
                // 如果没有修改类名，那么 this.form.classname 是字符串类型，则取原来的值
                // 如果修改了类名， 那么 this.form.classname 是数字类型，则取当前的值
                this.form.classname = typeof this.form.classname === 'string' ? this.form.categoryId : this.form
                    .classname
                const data = await this.$http[this.type](this.url, this.form)
                if (data.data.status === 200) {
                    // 弹出提示框
                    this.$message({
                        type: 'success',
                        message: data.data.msg,
                        center: true
                    })
                    // 跳转文章列表页
                    this.$router.push({
                        name: 'articleList'
                    })
                } else {
                    // 弹出提示框
                    this.$message({
                        type: 'error',
                        message: data.data.msg,
                        center: true
                    })
                }
            },
            async getEditData(articleId) { // 获取修改数据
                let {
                    data
                } = await this.$http.get(`articleDetails/${articleId}`)
                data = data[0]
                this.form.title = data.title
                this.form.classname = data.classname
                this.form.categoryId = data.category_id // 保存原类名 ID
                this.form.synopsis = data.synopsis
                this.form.content = data.content
                this.buttonText = '修改文章'
                this.url = `editArticle/${articleId}` // 修改url
                this.type = 'put' // 修改请求类型
            },
            async getCategoryData() { // 获取分类数据
                const {
                    data
                } = await this.$http.get('category')
                this.categoryData = data
            }
        },
        watch: {
            '$route.path': function (newVal, oldVal) {
                if (newVal === '/admin/addArticle') {
                    this.form.title = ''
                    this.form.classname = ''
                    this.form.synopsis = ''
                    this.form.content = ''
                    this.buttonText = '修改文章'
                    this.url = `addArticle` // 修改url
                    this.type = 'post' // 修改请求类型
                }
            }
        }
    }

</script>

<style scoped>
    .content_right>h4 {
        text-indent: 0.12rem;
    }

    .content_right .el-textarea,
    .el-select {
        width: 5rem;
    }

    .box {
        width: 580px;
    }

    .el-form-item>>>.el-form-item__label {
        color: #b1bdd4;
    }

    .el-form-item>>>.el-textarea__inner {
        min-height: 80px !important;
        font: 400 13.3333px Arial;
    }

    .el-form>>>.v-note-wrapper {
        min-height: 500px;
    }

</style>
