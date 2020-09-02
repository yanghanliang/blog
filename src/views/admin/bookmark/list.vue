<template>
    <div class="bookmark-list">
        <el-table :data="tableData" border>
            <el-table-column type="index" width="50" label="序号">
            </el-table-column>
			<el-table-column prop="name" label="书签名">
            </el-table-column>
            <el-table-column prop="class_name" label="类名">
            </el-table-column>
            <el-table-column prop="link" label="链接地址">
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
				<template slot="header" slot-scope="scope">
                    <el-input clearable v-model="pagination.searchData" size="mini" @keyup.enter.native="searchFn" @input="searchFn" placeholder="输入关键字搜索" />
                </template>
                <template slot-scope="{ row }">
                    <el-button @click="jump(row)" type="text" size="small">修改</el-button>
                    <el-button type="text" size="small" @click="showDialog(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
		<!-- 分页 -->
        <el-pagination class="ta-right mt20" @size-change="handleSizeChange" @current-change="clickPage" :current-page="pagination.currentPage"
            :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total">
        </el-pagination>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <span>是否删除“ {{ row.name }}” 这个分类?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteCategory">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
	name: 'bookmarkList',
	data () {
		return {
			tableData: [],
			dialogVisible: false,
			row: {}, // 行数据
			pagination: {
				total: 0,
				currentPage: 1,
				pageSize: 10,
				searchData: '',
				pageSizes: [5, 10, 15, 20],
			},
		}
	},
	created () {
		this.loadData() // 获取书签列表
	},
	methods: {
		async loadData () { // 获取书签列表
			const postData = {
				currentPage: this.pagination.currentPage,
				pageSize: this.pagination.pageSize,
				searchData: this.pagination.searchData
			}
			console.log(postData, '(postData')
			try {
				const data = await this.$http.get('bookmark/list', { params: postData })
				this.tableData = data.list
				this.pagination.total = data.total
			} catch (err) {
				console.log(err, 'err')
			}
		},
		showDialog (row) { // 显示对话框
			this.dialogVisible = true // 显示提示框
			this.row = row // 将行数据存储在 vue 中
		},
		async deleteCategory () { // 删除分类数据
			this.dialogVisible = false // 关闭对话框
			const data = await this.$http.delete(`bookmark/delete/${this.row.id}`)
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
		},
		// 跳转到修改书签
		jump (row) {
			this.$router.push({ name: 'editBookmark', query: { id: row.id } })
		},
		// 每页条数改变时执行
		handleSizeChange (val) {
			// 更新每页条数
			this.pagination.pageSize = val
			// 获取分页数据并渲染
			this.loadData()
		},
		// 点击页码
		clickPage (val) {
			// 更新当前页码
			this.pagination.currentPage = val
			// 获取分页数据并渲染
			this.loadData()
		},
		// 书签搜索
		searchFn () {
			// 更新当前页码
			this.pagination.currentPage = 1
			// 获取分页数据并渲染
			this.loadData()
		}
	}
}
</script>

<style lang="scss" scoped>
</style>
