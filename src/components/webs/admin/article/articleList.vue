<template>
    <div class="content_right">
        <!-- 调用自己封装的面包屑组件 -->
        <my-crumbs :ri="routingInformation"></my-crumbs>

        <!-- dataTable -->
        <el-table
			:data="tableData"
			sortable="custom"
			@sort-change="sortChange"
            :default-sort="{prop: 'createtime', order: 'descending'}"
			class="dataTable"
		>
            <el-table-column fixed="left" sortable prop="title" label="文章标题" width="300">
            </el-table-column>
            <el-table-column prop="classname" label="分类" sortable width="180">
            </el-table-column>
            <el-table-column prop="synopsis" label="文章简介" width="140" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="createtime" label="创建时间" sortable :formatter="dateFormat" width="300">
            </el-table-column>
            <el-table-column prop="updatetime" label="更新时间" sortable :formatter="dateFormat" width="300">
            </el-table-column>
            <el-table-column prop="read" label="阅读数" sortable width="180">
            </el-table-column>
            <el-table-column prop="praise" label="点赞数" sortable width="180">
            </el-table-column>
            <el-table-column prop="original" label="文章出处" sortable width="180">
				<template slot-scope="{row}">
					<span>{{ row.original ? '原创' : '转载' }}</span>
				</template>
            </el-table-column>
            <!-- <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="100">
        <template slot-scope="scope">
            <el-button @click="deleteArticle(scope.row.id)" type="text" size="small">删除</el-button>
            <router-link class="edit" :to="{ name: 'editArticle', params: { articleId: scope.row.id }}">编辑</router-link>
        </template>
      </el-table-column> -->
            <el-table-column fixed="right" align="center" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="deleteArticle(scope.row.id)" type="text" size="small">删除</el-button>
                    <router-link class="edit" :to="{ name: 'editArticle', params: { articleId: scope.row.id }}">编辑
                    </router-link>
                </template>
                <template slot="header" slot-scope="scope">
                    <el-input v-model="sortData.searchData" size="mini" @input="searchFn" placeholder="输入关键字搜索" />
                </template>
            </el-table-column>
        </el-table>
        <!-- 删除的弹窗 -->
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <span>您确定删除此文章吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteData">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="clickPage" :current-page="sortData.currentPage"
            :page-sizes="pageSizes" :page-size="sortData.pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
import moment from 'moment'

export default {
	data () {
		return {
			routingInformation: {
				name1: '首页',
				name2: '文章列表',
				router: '/'
			},
			tableData: [], // 表格中的所有数据
			dialogVisible: false, // 弹窗(显示||隐藏)
			id: '',
			total: 0, // 文章表中所有的条数
			sortData: {
				sortField: 'createtime', // 排序的字段  排序的数据(设置首次排序[需要和element设置的一致])
				orderBy: 'descending', // 排序方式
				pageSize: 10, // 每页显示的条数(和后端数据接口一致)
				currentNumber: 0, // 当前第几条 = (当前页-1) * 每页条数
				currentPage: 1, // 当前页码
				searchData: '' // 搜索框中的数据
			},
			retainTotal: 0, // 保留文章表中所有的条数
			pageSizes: [5, 10, 15, 20]
		}
	},
	created () {
		this.getData() // 获取文章列表数据
	},
	methods: {
		async getData () { // 获取文章列表数据
			const data = await this.$http.get(
				`articleList/${this.sortData.sortField}/${this.sortData.orderBy}/${this.sortData.pageSize}`
			) // 发送请求
			this.total = data.getArticleNumber // 获取表数据的总条数
			this.retainTotal = data.getArticleNumber // 保留表数据的总条数
			this.tableData = data.data // 渲染表格数据
		},
		stitchingString (str) { // 字符串拼接
			if (str.length > 26) {
				return str.substr(0, 26) + '...'
			}
			return str
		},
		deleteArticle (id) { // 点击删除按钮时执行
			this.dialogVisible = true // 显示弹窗
			this.id = id // 保存 id
		},
		async deleteData () { // 删除数据(在删除弹窗里,点击确定按钮时执行)
			this.dialogVisible = false // 隐藏弹窗
			const { data } = await this.$http.delete(`deleteArticle/${this.id}`)
			this.total = data.getArticleNumber
			if (data.deleteData && data.deleteData.status === 200) {
				// 为了减轻服务器压力,所做的js优化(使用分页后不行了)
				// this.deleteTableData(this.id)
				this.getData()
				// 弹出提示框
				this.$message({
					type: 'success',
					message: data.deleteData.msg,
					center: true
				})
			} else {
				// 弹出提示框
				this.$message({
					type: 'error',
					message: data.msg,
					center: true
				})
			}
		},
		deleteTableData (id) { // 删除表格数据
			const data = this.tableData // 获取表格数据
			for (let i = 0; i < data.length; i++) {
				if (data[i].id === id) { // 找到删除的数据
					data.splice(i, 1) // 删除数据
					break // 跳出当前循环
				}
			}
		},
		handleSizeChange (val) { // 每页条数改变时执行
			this.sortData.pageSize = val // 更新每页条数
			this.paging() // 获取分页数据并渲染
		},
		clickPage (val) { // 点击页码
			this.sortData.currentPage = val // 更新当前页码
			this.paging() // 获取分页数据并渲染
		},
		async paging () { // 分页
			const {
				data
			} = await this.$http.post('paging', this.sortData)
			if (data.getData.status === 200 && this.sortData.searchData === '') {
				this.total = this.retainTotal // 修改总条数
				this.tableData = data.getData.data // 重新赋值
			} else {
				this.tableData = data.getData.data // 重新赋值
				this.total = data.getNumber // 修改总条数
				if (data.getData.status !== 200) {
					// 给出提示
					this.$message({
						message: data.getData.msg,
						type: 'warrning'
					})
				}
			}
		},
		searchFn () { // 搜索内容
			this.sortData.currentPage = 1 // 重置当前页
			this.paging()
		},
		async sortChange (column) { // 排序方式改变时执行(文档说明)
			// 因为第一次页面加载就执行此函数,故做此判断,减少请求,优化代码(自己测试得出)
			if (this.sortData.sortField !== column.prop || this.sortData.orderBy !== column.order) {
				this.sortData.sortField = column.prop // 修改排序字段
				this.sortData.orderBy = column.order // 修改排序方式
				this.paging() // 调用分页的方法
			}
		},
		// 时间格式化
		dateFormat: function (row, column) {
			// column.property 列字段名称
			// row[column.property] 对应的数据
			var date = row[column.property]
			if (date == null) {
				return '暂无更新'
			}
			return moment(date).format('YYYY年-MM月-DD日 HH时:mm分:ss秒 星期E')
		}
	}
}

</script>

<style scoped>
    .dataTable {
        margin: 0 auto;
    }

    .dataTable>>>tr td:nth-child(3)>div {
        width: 140px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .content_right .dataTableBox {
        box-shadow: 1px 2px 13px -4px black;
    }

    .el-dialog__wrapper {
        overflow: hidden;
    }

    .cell .edit {
        color: #409EFF;
        font-size: 12px;
    }

    /* 分页 */
    .content_right>>>.el-pagination__jump,
    .content_right>>>.el-pagination__total {
        color: #ffffff;
    }

    .el-pagination {
        margin-top: 10px;
        text-align: center;
    }

</style>
