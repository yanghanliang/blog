<template>
    <div class="content_right">
        <!-- 面包屑 -->
        <el-table height="600" :data="tableData">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="classname" label="类名">
            </el-table-column>
            <el-table-column label="层级">
                <template slot-scope="scope">
                    <span v-if="scope.row.pid === 0">一级</span>
                    <span v-else>{{ scope.row.pid_classname }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button> -->
                    <router-link :to="'/admin/editCategory/'+ scope.row.id">修改</router-link>
                    <el-button type="text" size="small" @click="showDialog(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <span>是否删除“ {{ row.classname }}” 这个分类?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteCategory">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
	data () {
		return {
			tableData: [],
			dialogVisible: false,
			row: {} // 行数据
		}
	},
	created () {
		this.loadData() // 获取分类数据
	},
	methods: {
		async loadData () { // 获取分类数据
			const {
				data
			} = await this.$http.get('category')
			if (data.status !== 201) {
				this.tableData = data
			}
		},
		showDialog (row) { // 显示对话框
			this.dialogVisible = true // 显示提示框
			this.row = row // 将行数据存储在 vue 中
		},
		async deleteCategory () { // 删除分类数据
			this.dialogVisible = false // 关闭对话框
			const {
				data
			} = await this.$http.delete(`deleteCategory/${this.row.id}`)
			if (data.status === 200) {
				for (var i = 0; i < this.tableData.length; i++) { // 循环分类数据
					if (this.tableData[i].id === this.row.id) { // 找到删除的数据
						this.tableData.splice(i, 1) // 删除分类指定数据
					}
				}
				this.$message({
					type: 'success',
					message: data.msg
				})
			} else {
				this.$message({
					type: 'error',
					message: data.msg
				})
			}
		}
	},
	watch: {
		'$route': function (now, old) {
			this.loadData()
		}
	},
}

</script>

<style scoped>
    .content_right .el-table {
        width: 725px;
        margin: 100px auto;
    }

</style>
