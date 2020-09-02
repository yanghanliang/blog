<template>
    <div class="add-bookmark">
        <el-form class="form-box" :rules="rules" ref="form" :model="form" label-width="80px">
            <el-form-item label="书签名称" prop="bookmarkName">
                <el-input v-model="form.bookmarkName" placeholder="请输入书签名称" v-focus></el-input>
            </el-form-item>
            <el-form-item label="层级" prop="pid">
                <el-select v-model="form.pid" placeholder="请选择层级">
                    <el-option v-for="data in bookmarkList" :key="data.id" :label="data.name" :value="data.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图标">
                <el-input v-model="form.icon" placeholder="请输入图标类名"></el-input>
            </el-form-item>
			<el-form-item label="链接" prop="link" v-if="this.form.pid !== 0">
                <el-input v-model="form.link" placeholder="请输入链接地址"></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 22px;">
                <el-button type="primary" @click="submit">保存</el-button>
                <el-button @click="$router.go(-1)">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
	name: 'addBookmark',
	data () {
		let validatePass = async (rule, value, callback) => {
			if (value) {
				if (this.bookmarkId) {
					return callback()
				}
				const data = await this.$http.get(`bookmark/query?bookmarkName=${value}`)
				if (data.length > 0) {
					callback(new Error('此书签名已存在'))
				} else {
					callback()
				}
			} else {
				callback(new Error('请输入书签名'))
			}
		}
		let validateLink = (rule, value, callback) => {
			if (value) {
				if (/^(http||https):\/\//.test(value)) {
					return callback()
				} else {
					callback(new Error('请输入正确的网址'))
				}
			}
			return callback()
		}
		return {
			bookmarkList: [],
			form: {
				pid: 0,
				link: '',
				icon: '',
				bookmarkName: '',
			},
			rules: {
				bookmarkName: [
					{ required: true, validator: validatePass, trigger: 'change' }
				],
				pid: [
					{ required: true, message: '请选择层级', trigger: 'change' }
				],
				link: [
					{ validator: validateLink, trigger: 'change' }
				]
			},
			bookmarkId: this.$route.query.id
		}
	},
	created () {
		// 获取分类数据
		this.loadData()
		// 判断是否是修改
		if (this.bookmarkId) {
			this.getDetail()
		}
	},
	methods: {
		async loadData () {
			// 获取书签分类数据
			const data = await this.$http.get('bookmark/categoryList')
			// 将分类数据赋值给 vue
			this.bookmarkList = [].concat(data, { id: 0, name: '第一层级' })
		},
		// 添加书签
		async submit () {
			// 验证
			const verification =  await this.Global.verification(this, 'form')
			if (!verification) {
				return false
			}

			let data = {}
			if (this.bookmarkId) {
				const className = { className: this.bookmarkList.filter(item => item.id === this.form.pid)[0].name }
				const postData = Object.assign({ id: this.bookmarkId }, this.form, className)
				data = await this.$http.put('bookmark/edit', postData)
			} else {
				const className = this.bookmarkList.filter(item => item.id === this.form.pid)[0].name
				const postData = Object.assign({ className }, this.form)
				data = await this.$http.post('bookmark/add', postData)
			}

			if (data.status === 200) {
				this.$message({
					message: data.msg,
					type: 'success'
				})
				// 跳转页面
				this.$router.push({ name: 'bookmarkList' })
			}
		},
		// 获取书签详情
		async getDetail () {
			try {
				const data = await this.$http.get(`/bookmark/detail?id=${this.bookmarkId}`)
				this.form.pid = data.pid
				this.form.link = data.link
				this.form.icon = data.icon
				this.form.bookmarkName = data.name
			} catch (err) {
				console.log(err)
			}
		}
	}
}

</script>

<style lang="scss" scoped>
</style>
