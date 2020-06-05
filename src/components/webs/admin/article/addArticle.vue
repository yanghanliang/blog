<template>
    <div class="content_right">
        <h4>{{ buttonText }}</h4>
        <el-form ref="form" :rules="rules" :model="form" label-width="80px" :hide-required-asterisk="true">
            <el-form-item label="文章标题" class="box" prop="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="文章分类" prop="classname">
                <el-select v-model="form.classname" placeholder="请选择分类">
                    <el-option v-for="category in categoryData" :label="category.classname" :value="category.id"
                        :key="category.id"></el-option>
                </el-select>
            </el-form-item>
            <!-- 简介 -->
            <el-form-item label="文章简介" prop="synopsis">
                <el-input type="textarea" v-model="form.synopsis"></el-input>
            </el-form-item>
			<el-form-item label="文章出自">
				<el-radio v-model="form.original" :label="0">原创</el-radio>
				<el-radio v-model="form.original" :label="1">转载</el-radio>
			</el-form-item>
            <mavon-editor ref="mavonEditor" @imgAdd="imgAdd" @save="addArticle" @imgDel="imgDel" v-model="form.content" :subfield="true" />
            <el-form-item style="margin-top: 22px;">
                <el-button type="primary" @click="addArticle">{{ buttonText }}</el-button>
                <el-button @click="handleCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
	name: 'handleArticle',
	data () {
		return {
			form: {
				title: '', // 文章标题
				classname: '', // 文章类名
				synopsis: '', // 文章描述
				content: '', // 文章内容
				categoryId: '', // 保存原类名 ID
				id: '', // 文章 id(修改时才用到)
				original: 0, // 默认是原创文章
			},
			buttonText: '添加文章', // 默认提交按钮文字
			url: 'addArticle', // 默认提交地址
			type: 'post', // 默认请求方式
			categoryData: '', // 分页数据
			rules: {
				title: [
					{ required: true, message: '请输入标题', trigger: 'change' }
				],
				classname: [
					{ required: true, message: '请选择分类', trigger: 'change' }
				],
				synopsis: [
					{ required: true, message: '请输入内容', trigger: 'change' }
				]
			}
		}
	},
	created () {
		// 获取分类数据
		this.getCategoryData()

		// 获取路由参数
		const articleId = this.$route.params.articleId

		// 将文章的数据还原
		if (this.$route.path.includes('/admin/editArticle')) {
			let articleData = window.sessionStorage.getItem('articleData')
			if (articleData) {
				this.form = JSON.parse(articleData)
				// 修改请求类型
				this.type = 'put'
				// 修改按钮文字
				this.buttonText = '修改文章'
				// 修改url 状态
				this.url = `editArticle/${articleId}`
				return
			}
		}

		// 获取文章详情
		if (articleId) {
			this.getEditData(articleId)
		}
	},
	methods: {
		// 点击添加文章||修改文章时执行
		async addArticle () {
			// 验证
			const verification =  await this.Global.verification(this, 'form')
			if (!verification) {
				return false
			}

			// 如果没有修改类名，那么 this.form.classname 是字符串类型，则取原来的值
			// 如果修改了类名， 那么 this.form.classname 是数字类型，则取当前的值
			this.form.classname = typeof this.form.classname === 'string' ? this.form.categoryId : this.form
				.classname

			// 操作前先将数据保存，防止登录验证时自动跳转导致数据丢失
			window.sessionStorage.setItem('articleData', JSON.stringify(this.form))
			const data = await this.$http[this.type](this.url, this.form)

			if (data && data.data.status === 200) {
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
				data && this.$message({
					type: 'error',
					message: data.data.msg,
					center: true
				})
			}
		},
		async getEditData (articleId) { // 获取修改数据
			let {
				data
			} = await this.$http.get(`articleDetails/${articleId}`)
			data = data[0]
			this.form.title = data.title
			this.form.classname = data.classname
			this.form.categoryId = data.category_id // 保存原类名 ID
			this.form.synopsis = data.synopsis
			this.form.content = data.content
			this.form.original = data.original
			this.buttonText = '修改文章'
			this.url = `editArticle/${articleId}` // 修改url
			this.type = 'put' // 修改请求类型
		},
		async getCategoryData () { // 获取分类数据
			const {
				data
			} = await this.$http.get('category')
			this.categoryData = data
		},
		// 添加图片
		async imgAdd (pos, $file) {
			var formdata = new FormData()
			formdata.append('file', $file)
			formdata.append('url', '/uploadFileURl/article')
			try {
				let { data } = await this.$http({
					url: 'uploadFile?uploadDir=./uploadFileURl/article',
					method: 'post',
					data: formdata, // 必须是 FormData 对象
					headers: {'Content-Type': 'multipart/form-data'},
				})

				if (data.status === 200) {
					this.$refs.mavonEditor.$img2Url(pos, this.Global.baseURL + data.url)
				}
			} catch (e) {
				console.log(e)
				this.$message.error('请求超时~')
			}
		},
		// 删除图片
		async imgDel (files) {
			let index = files[0].indexOf('uploadFileURl')
			let path = './' + files[0].slice(index)
			const postData = {
				path: path
			}

			try {
				this.$http.post('deleteFile', postData)
			} catch (e) {
				console.log(e)
			}
		},
		// 点击取消时执行
		handleCancel () {
			window.sessionStorage.removeItem('articleData')
			$router.push({ name: 'articleList' })
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

<style lang="scss" scoped>
@import '@/assets/css/color/index.scss';

    .content_right>h4 {
		color: $main-font;
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
        color: $secondary;
    }

    .el-form-item>>>.el-textarea__inner {
        min-height: 80px !important;
        font: 400 13.3333px Arial;
    }

    .el-form>>>.v-note-wrapper {
        min-height: 500px;
    }

</style>
