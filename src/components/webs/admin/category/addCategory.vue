<template>
    <div class="content_right">
        <el-form class="form-box" ref="form" :model="form" label-width="80px">
            <el-form-item label="分类名称">
                <el-input v-model="form.classname"></el-input>
            </el-form-item>
			<el-form-item label="类型">
                <el-select v-model="form.type" placeholder="请选择层级" @change="getCategoryData">
                    <el-option v-for="(item, key) in typeList" :key="key" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="层级">
                <el-select v-model="form.layername" placeholder="请选择层级">
                    <el-option v-for="data in categoryData" :key="data.id" :label="data.classname" :value="data.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="margin-top: 22px;">
                <el-button type="primary" @click="addCategory">保存</el-button>
                <el-button @click="$router.push({ name: 'articleList' })">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
	name: 'addCategory',
	data () {
		return {
			categoryData: [],
			form: {
				classname: '',
				pid: 0,
				type: 1,
				layername: '第一层级'
			},
			typeList: [
				{
					label: '文章',
					value: 1
				},
				{
					label: '书签',
					value: 2
				}
			]
		}
	},
	created () {
		this.getCategoryData()
	},
	methods: {
		// 获取分类数据
		async getCategoryData () {
			const data = await this.$http.post('category', { type: this.form.type })
			// 将分类数据赋值给 vue
			this.categoryData = data.list
		},
		async addCategory () {
			const data = await this.$http.post('addCategory', this.form)
			console.log(data, 'data')
			if (data.status === 200) {
				this.$message({
					message: data.msg,
					type: 'success'
				})
				// 跳转页面
				this.$router.push({
					name: 'categoryList'
				})
			} else {
				this.$message({
					message: '估计是后端数据问题',
					type: 'error'
				})
			}
		},
	}
}

</script>

<style lang="scss" scoped>
</style>
