<template>
    <div class="content_right">
        <el-table height="600" :data="tableData" border @sort-change="sortChange" :default-sort="{ prop: sortData.sortField, order: sortData.orderBy }">
            <el-table-column type="index" width="50" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="classname" label="类名">
            </el-table-column>
            <el-table-column label="层级">
                <template slot-scope="{ row }">
                    <span v-if="row.pid === 0">一级</span>
                    <span v-else>{{ row.pid_classname }}</span>
                </template>
            </el-table-column>
			<el-table-column prop="type" label="类型" sortable="custom">
				<template slot-scope="{ row }">
					<span>{{ row.type | type }}</span>
				</template>
			</el-table-column>
            <el-table-column label="操作" width="200">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="sortData.searchData" size="mini" @input="searchFn" placeholder="输入类名搜索" />
                </template>
                <template slot-scope="row">
                    <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button> -->
                    <el-button type="text" size="small" @click="showDialog(row)">删除</el-button>
                    <router-link class="edit" :to="'/admin/editCategory/'+ row.id">编辑</router-link>
                </template>
            </el-table-column>
        </el-table>

		<!-- 分页 -->
        <el-pagination class="mt20 ta-right" @size-change="handleSizeChange" @current-change="clickPage" :current-page="sortData.currentPage"
            :page-sizes="pageSizes" :page-size="sortData.pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

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
			row: {}, // 行数据
			sortData: {
				sortField: 'type', // 排序的字段  排序的数据(设置首次排序[需要和element设置的一致])
				orderBy: 'descending', // 排序方式
				pageSize: 10, // 每页显示的条数(和后端数据接口一致)
				currentNumber: 0, // 当前第几条 = (当前页-1) * 每页条数
				currentPage: 1, // 当前页码
				searchData: '' // 搜索框中的数据
			},
			total: 0
		}
	},
	filters: {
		type (value) {
			let arr = value.split(',')
			let newArr = []
			const text = [
				{
					id: 1,
					name: '文章'
				},
				{
					id: 2,
					name: '书签'
				}
			]
			arr.forEach(id => {
				text.forEach(item => {
					if (Number(id) === item.id) {
						newArr.push(item.name)
					}
				})
			})

			return newArr.join('&&')
		}
	},
	created () {
		this.loadData() // 获取分类数据
	},
	methods: {
		async loadData () { // 获取分类数据
			try {
				const data = await this.$http.post('category', this.sortData)
				this.tableData = data.list
				this.total = data.total
			} catch (err) {
				console.log(err)
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
		},
		// 排序方式改变时执行(文档说明)
		async sortChange (column) {
			if (this.sortData.sortField !== column.prop || this.sortData.orderBy !== column.order) {
				// 修改排序字段
				this.sortData.sortField = column.prop
				// 修改排序方式
				this.sortData.orderBy = column.order
				// 调用分页的方法
				this.loadData()
			}
		},
		// 每页条数改变时执行
		handleSizeChange (val) {
			// 更新每页条数
			this.sortData.pageSize = val
			// 获取分页数据并渲染
			this.loadData()
		},
		// 点击页码
		clickPage (val) {
			// 更新当前页码
			this.sortData.currentPage = val
			// 获取分页数据并渲染
			this.loadData()
		},
		// 搜索内容
		searchFn () {
			// 重置当前页
			this.sortData.currentPage = 1
			this.loadData()
		},
	},
	watch: {
		'$route': function (now, old) {
			this.loadData()
		}
	},
}

</script>

<style scoped>
.cell .edit {
	color: #409EFF;
	font-size: 12px;
}
</style>
