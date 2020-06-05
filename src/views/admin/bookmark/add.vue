<template>
    <div class="content_right">
        <el-form class="admin_category form-box" :rules="rules" ref="form" :model="form" label-width="80px">
            <el-form-item label="书签名称" prop="bookmarkName">
                <el-input v-model="form.bookmarkName" placeholder="请输入书签名称" v-focus></el-input>
            </el-form-item>
            <el-form-item label="层级">
                <el-select v-model="form.pid" placeholder="请选择层级">
                    <el-option v-for="data in bookmarkList" :key="data.id" :label="data.name" :value="data.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图标">
                <el-input v-model="form.icon" placeholder="请输入图标类名"></el-input>
            </el-form-item>
			<el-form-item label="链接" v-if="form.pid !== 0">
                <el-input v-model="form.link"></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 22px;">
                <el-button type="primary" @click="addBookmark">保存</el-button>
                <el-button @click="$router.push({ name: 'articleList' })">取消</el-button>
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
					{
						validator: validatePass, trigger: 'change'
					}
				]
			}
		}
	},
	created () {
		this.loadData() // 获取分类数据
	},
	methods: {
		async loadData () {
			const data = await this.$http.get('bookmark/list') // 获取分类数据
			this.bookmarkList = [{ id: 0, name: '第一层级', pid: 0 }].concat(data) // 将分类数据赋值给 vue
		},
		// 添加书签
		async addBookmark () {
			// 验证
			const verification =  await this.Global.verification(this, 'form')
			if (!verification) {
				return false
			}
			const {
				data
			} = await this.$http.post('bookmark/add', this.form)
			if (data.status === 200) {
				this.$message({
					message: data.msg,
					type: 'success'
				})
				// // 跳转页面
				// this.$router.push({
				// 	name: 'categoryList',
				// 	query: {
				// 		type: this.form.type[0]
				// 	}
				// })
			} else {
				this.$message({
					message: '估计是后端数据问题',
					type: 'error'
				})
			}
		}
	}
}

</script>

<style lang="scss" scoped>
.admin_category {
	top: 50%;
	left: 50%;
	position: absolute;
	display: inline-block;
	transform: translate(-50%, -50%);
}
</style>
