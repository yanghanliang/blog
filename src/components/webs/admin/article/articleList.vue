<template>
  <div class="content_right">
    <!-- breadcrumb -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">NFV集成硬件部署LLD方案XX省XX项目</el-breadcrumb-item>
      <el-breadcrumb-item>项目详细信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- dataTable -->
      <!-- height="407" -->
    <el-table
      :data="tableData"
      sortable="custom"
      @sort-change="sortChange"
      :default-sort = "{prop: 'createtime', order: 'descending'}"
      class="dataTable">
      <el-table-column
        fixed
        sortable
        prop="title"
        label="文章标题"
        width="300">
      </el-table-column>
      <el-table-column
        prop="classname"
        label="分类"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="synopsis"
        label="文章简介"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="创建时间"
        sortable
        width="300">
      </el-table-column>
      <el-table-column
        prop="updatetime"
        label="更新时间"
        sortable
        width="300">
      </el-table-column>
      <el-table-column
        prop="read"
        label="阅读数"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="praise"
        label="点赞"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="original"
        label="原创0,转载1"
        sortable
        width="180">
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
      <el-table-column
        fixed="right"
        align="center"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="deleteArticle(scope.row.id)" type="text" size="small">删除</el-button>
          <router-link class="edit" :to="{ name: 'editArticle', params: { articleId: scope.row.id }}">编辑</router-link>
        </template>
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="searchData"
            size="mini"
            @input="searchFn"
            placeholder="输入关键字搜索"/>
        </template>
      </el-table-column>
    </el-table>
    <!-- 删除的弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>您确定删除此文章吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteData">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="clickPage"
      :current-page="currentPage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: null, // 表格中的所有数据
      searchData: '', // 搜索框中的数据
      dialogVisible: false, // 弹窗(显示||隐藏)
      id: '',
      total: 0, // 文章表中所有的条数
      currentPage: 1, // 当前页码
      pageSize: 6, // 每页显示的条数(和后端数据接口一致)
      sortField: 'createtime', // 排序的字段  排序的数据(设置首次排序[需要和element设置的一致])
      orderBy: 'descending' // 排序方式
    }
  },
  created() {
    this.getData() // 获取文章列表数据
  },
  methods: {
    async getData() { // 获取文章列表数据
      const { data } = await this.$http.get(`articleList/${this.sortField}/${this.orderBy}/${this.pageSize}`) // 发送请求
      this.total = data.getArticleNumber // 获取表数据的总条数
      this.tableData = data.data // 渲染表格数据
    },
    stitchingString(str) { // 字符串拼接
      if (str.length > 26) {
        return str.substr(0, 26) + '...'
      }
      return str
    },
    deleteArticle(id) { // 点击删除按钮时执行
      this.dialogVisible = true // 显示弹窗
      this.id = id // 保存 id
    },
    async deleteData() { // 删除数据(在删除弹窗里,点击确定按钮时执行)
      this.dialogVisible = false // 隐藏弹窗
      const { data } = await this.$http.delete(`deleteArticle/${this.id}`)
      this.total = data.getArticleNumber
      if (data.deleteData.status === 200) {
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
    deleteTableData(id) { // 删除表格数据
      const data = this.tableData // 获取表格数据
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) { // 找到删除的数据
          data.splice(i, 1) // 删除数据
          break // 跳出当前循环
        }
      }
    },
    handleSizeChange(val) { // 每页条数改变时执行
      this.pageSize = val // 更新每页条数
      this.paging() // 获取分页数据并渲染
    },
    clickPage(val) { // 点击页码
      this.currentPage = val // 更新当前页码
      this.paging() // 获取分页数据并渲染
    },
    async paging() { // 分页
      const currentNumber = (this.currentPage - 1) * this.pageSize // 当前第几条 = (当前页-1) * 每页条数
      const { data } = await this.$http.get(`paging/${currentNumber}/${this.pageSize}`)
      if (data.status === 200) {
        this.tableData = data.data // 重新赋值
      }
    },
    async searchFn() {
      // 搜索内容
      const { data } = await this.$http.post('searchData', { searchData: this.searchData })
      if (data.status === 200) {
        this.tableData = data.data // 显示内容
        this.total = data.data.length // 修改总条数
      } else {
        // 给出提示
        this.$message({
          message: data.msg,
          type: 'warrning'
        })
      }
    },
    async sortChange(column) { // 排序方式改变时执行(文档说明)
      // 因为第一次页面加载就执行此函数,故做此判断,减少请求,优化代码(自己测试得出)
      if (this.sortField !== column.prop || this.orderBy !== column.order) {
        this.sortField = column.prop // 修改排序字段
        this.orderBy = column.order // 修改排序方式
        const data = await this.$http.get(`getOrderData/${this.sortField}/${this.orderBy}/${this.pageSize}`)
        this.tableData = data.data // 渲染表格数据
      }
    }
  }
}
</script>

<style scoped>
/* reset-el-breadcrumb-style */
.el-breadcrumb {
  margin: 15px 0;
}

.el-breadcrumb >>> .el-breadcrumb__inner.is-link {
  color: #a1c0ff;
}

.el-breadcrumb >>> .el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #dedede;
}
/* reset-el-breadcrumb-style */

.dataTable {
  width: 1100px;
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
.content_right >>> .el-pagination__jump,.content_right >>> .el-pagination__total {
  color: #ffffff;
}

.el-pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
