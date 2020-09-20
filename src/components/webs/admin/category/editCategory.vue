<template>
    <div class="form-box">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="分类名称">
                <el-input v-model="form.classname"></el-input>
            </el-form-item>
            <el-form-item label="层级">
                <el-select v-model="form.layername" placeholder="请选择" @change="changeSelectValue">
                    <el-option v-for="item in categoryData" :key="item.id" :label="item.classname" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="margin-top: 22px;">
                <el-button type="primary" @click="editCategory">保存</el-button>
                <el-button @click="$router.push({ name: 'categoryList', query: { type: form.type[0] } })">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
	name: 'editCategory',
	data () {
		return {
			categoryData: [],
			form: {
				id: this.$route.params.categoryId,
				classname: '',
				pid: '',
				layername: '' // 层名
			}
		}
	},
	created () {
		this.getCategoryData() // 获取分类数据
		this.getEditCategoryData() // 获取需要修改的分类数据
	},
	methods: {
		async getCategoryData () {
			const data = await this.$http.post('category') // 获取分类数据
			this.categoryData = [].concat({ id: 0, pid: 0, classname: '第一层级' }, data.list) // 将分类数据赋值给 vue
		},
		async getEditCategoryData () { // 获取需要修改的分类数据
			const data = await this.$http.get(`editCategory/${this.form.id}`)
			this.form.classname = data[0].classname
			this.form.pid = data[0].pid
			this.form.layername = data[0].pid
		},
		async editCategory () {
			const data = await this.$http.put('updateCategory', this.form)
			if (data.status === 200) {
				this.$message({
					message: data.msg,
					type: 'success'
				})
				// 跳转页面
				this.$router.push({
					name: 'categoryList',
				})
			} else {
				this.$message({
					message: data.msg,
					type: 'error'
				})
			}
		},
		changeSelectValue (pid) {
			this.form.pid = pid
			const data = this.categoryData
			for (var i = 0; i < data.length; i++) {
				if (data[i].id === pid) {
					this.form.pid_classname = data[i].classname
					break
				}
			}
		}
	}
}

</script>

<style lang="scss" scoped>
</style>
