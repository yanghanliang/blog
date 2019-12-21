<template>
    <div class="content_right">
        <el-form class="admin_category" ref="form" :model="form" label-width="80px">
            <el-form-item label="分类名称">
                <el-input v-model="form.classname"></el-input>
            </el-form-item>
            <el-form-item label="层级">
                <el-select v-model="form.layername" placeholder="请选择层级" @change="changeSelectValue">
                    <el-option v-for="data in categoryData" :key="data.id" :label="data.classname" :value="data.id">
                    </el-option>
                    <!-- <el-option label="HTML" value="3"></el-option>
                <el-option label="javaSript" value="3"></el-option> -->
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
        data() {
            return {
                categoryData: [],
                form: {
                    classname: '',
                    pid: 0,
                    layername: '第一层级'
                }
            }
        },
        created() {
            this.loadData() // 获取分类数据
        },
        methods: {
            async loadData() {
                const {
                    data
                } = await this.$http.get('category') // 获取分类数据
                this.categoryData = data // 将分类数据赋值给 vue
            },
            async addCategory() {
                const {
                    data
                } = await this.$http.post('addCategory', this.form)
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
            changeSelectValue(pid) {
                this.form.pid = pid
            }
        }
	}

</script>

<style>
</style>
