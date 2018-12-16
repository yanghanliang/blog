<template>
  <div class="content_right">
    <!-- breadcrumb -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">NFV集成硬件部署LLD方案XX省XX项目</el-breadcrumb-item>
      <el-breadcrumb-item>项目详细信息</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="tab_switch">
      <el-button type="info" plain>项目成员信息</el-button>
      <el-button type="info" plain>项目软硬件信息</el-button>
      <el-button type="info" plain>组网拓扑图</el-button>
      <el-button type="info" plain>机柜布局</el-button>
      <el-button type="info" plain>配电情况</el-button>
    </el-row>

    <!-- dataTable -->
    <el-table
      :data="tableData"
      class="dataTable">
      <el-table-column
        fixed
        prop="title"
        label="文章标题"
        width="300">
      </el-table-column>
      <el-table-column
        prop="type"
        label="分类"
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
        width="180">
      </el-table-column>
      <el-table-column
        prop="updatetime"
        label="更新时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="read"
        label="阅读数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="praise"
        label="点赞"
        width="180">
      </el-table-column>
      <el-table-column
        prop="original"
        label="原创0,转载1"
        width="180">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
            <el-button @click="handleClick(scope.row.id)" type="text" size="small">查看</el-button>
            <router-link :to="{ name: 'editArticle', params: { articleId: scope.row.id }}">编辑</router-link>
            <!-- <el-button to="/articleList/1" type="text" size="small">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: null,
      search: ''
    }
  },
  created() {
    this.getData() // 获取文章列表数据
  },
  methods: {
    async getData() { // 获取文章列表数据
      const {data} = await this.$http.get('articleList') // 发送请求
      let tableData = [] // 保存表格数据
      for (let i = 0; i < data.length; i++) {
        let rowData = data[i] // 获取一行的数据
        // 将一行数据转化为对象,并追加到表格数据中
        tableData.push({
          title: this.stitchingString(rowData.title),
          type: rowData.type,
          synopsis: rowData.synopsis,
          createtime: rowData.createtime,
          updatetime: rowData.updatetime === null ? '暂未更新' : rowData.updatetime,
          read: rowData.read,
          praise: rowData.praise,
          original: rowData.original,
          id: rowData.id
        })
      }
      this.tableData = tableData // 渲染表格数据
    },
    stitchingString(str) { // 字符串拼接
      if (str.length > 26) {
        return str.substr(0, 26) + '...'
      }
      return str
    },
    handleClick(data) {
      console.log(data)
    }
  }
}
</script>

<style scoped>
.content_right .tab_switch {
  margin: 20px auto;
}

.dataTable {
    width: 1100px;
}

.content_right .dataTableBox {
  box-shadow: 1px 2px 13px -4px black;
}
</style>
