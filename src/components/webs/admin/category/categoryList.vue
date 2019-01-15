<template>
    <div class="category_list">
        <!-- 面包屑 -->
        <el-table
            height="400"
            :data="tableData">
            <el-table-column
                type="index"
                width="50">
            </el-table-column>
            <el-table-column
                prop="classname"
                label="类名"
                width="180">
            </el-table-column>
            <el-table-column
                label="层级"
                width="180">
                <template slot-scope="scope">
                    <span v-if="scope.row.pid === 0">一级</span>
                    <span v-else-if="scope.row.pid === 1">二级</span>
                    <span v-else-if="scope.row.pid === 2">三级</span>
                    <span v-else-if="scope.row.pid === 3">四级</span>
                    <span v-else-if="scope.row.pid === 4">五级</span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                    <el-button type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.loadData() // 获取分类数据
  },
  methods: {
    async loadData() {
      const { data } = await this.$http.get('category')
      this.tableData = data
    }
  }
}
</script>

<style scoped>
.category_list {
    overflow: hidden;
}

.category_list .el-table {
    width: 525px;
    margin: 100px auto;
}
</style>
