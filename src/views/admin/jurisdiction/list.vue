<template>
    <div class="content_right">
        <!-- 调用自己封装的面包屑组件 -->
        <my-crumbs :ri="routingInformation"></my-crumbs>

		<!-- dataTable -->
        <el-table
			:data="tableData"
			class="dataTable"
		>
            <el-table-column prop="j_name" label="权限名称">
            </el-table-column>
            <el-table-column prop="identification" label="权限标识">
            </el-table-column>
            <el-table-column prop="is_open" label="状态">
				<template slot-scope="{ row }">
					<el-switch
						v-model="row.is_open"
						:active-value="1"
						:inactive-value="0"
						@change="statusChange(row)"
						active-color="#13ce66"
						inactive-color="#ff4949">
					</el-switch>
				</template>
            </el-table-column>
			<el-table-column prop="distribution" label="模块">
				<template slot-scope="{ row }">
					<span>{{ row.distribution === 0 ? 'api' : 'view' }}</span>
				</template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="{ row }">
                    <router-link :to="{ name: 'editJurisdiction', params: { id: row.id }}">修改</router-link>
					<a href="javascipt:;" @click="deleteJurisdiction(row.id)">删除</a>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
	name: 'jurisdictionList',
	data () {
		return {
			routingInformation: {
				name1: '首页',
				name2: '接口权限列表',
				router: '/'
			},
			tableData: [],
		}
	},
	created () {
		this.getTableData()
	},
	methods: {
		async getTableData () {
			try {
				const data =  await this.$http.get(`jurisdiction/list/${this.$route.query.distribution}`)
				this.tableData = data
			} catch (e) {
				console.log(e)
			}
		},
		// 状态改变时执行
		async statusChange (row) {
			const postData = {
				name: row.j_name,
				identification: row.identification,
				distribution: row.distribution,
				pid: row.j_pid,
				isOpen: row.is_open
			}
			try {
				const { data } = await this.$http.put(`jurisdiction/edit/${row.id}`, postData)
				if (data.status === 200) {
					this.$message.success('操作成功')
					this.Global.getNotJurisdiction(this)
				} else {
					this.getTableData()
					this.$message.error(data.msg)
				}
			} catch (e) {
				console.log(e)
			}
		},
		// 删除权限
		deleteJurisdiction (id) {
			this.$alert('您是否确定删除此权限？', '删除权限', {
				confirmButtonText: '确定',
				callback: async action => {
					try {
						this.$http.delete(`jurisdiction/delete/${id}`)
						this.$message.success('删除成功~')
						this.getTableData()
					} catch (e) {
						console.log(e)
					}
				}
			})
		}
	},
	watch: {
		'$route': function (now, old) {
			this.getTableData()
		}
	},
}
</script>

<style lang="scss">
</style>
