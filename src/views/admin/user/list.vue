<template>
    <div class="user-list">
        <!-- 调用自己封装的面包屑组件 -->
        <my-crumbs :ri="routingInformation"></my-crumbs>
		<!-- dataTable -->
        <el-table
			:data="tableData"
			class="dataTable"
			@row-click="rowExpand"
			row-key="id"
			@expand-change="rowExpand"
			:expand-row-keys="entexpands"
		>
			<el-table-column type="expand">
				<template v-if="tags.length > 0">
					<el-tag v-for="tag in tags" :key="tag.id" closable :type="tag.is_open | statusHandle">
						{{tag.j_name}}
					</el-tag>
				</template>
				<template v-else>
					<div>
						暂无数据
					</div>
				</template>
				<!-- <el-input
					class="input-new-tag"
					v-if="inputVisible"
					v-model="inputValue"
					ref="saveTagInput"
					size="small"
					@keyup.enter.native="handleInputConfirm"
					@blur="handleInputConfirm"
				>

				</el-input> -->

				<!-- <el-select
					v-model="value2"
					multiple
					collapse-tags
					style="margin-left: 20px;"
					placeholder="请选择">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					>
					</el-option>
				</el-select>
				<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button> -->
			</el-table-column>
            <el-table-column prop="username" label="用户名">
            </el-table-column>
            <el-table-column prop="alias" label="昵称">
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="{ row }">
                    <!-- <router-link :to="{ name: 'editJurisdiction', params: { id: row.id }}">修改</router-link>
					<a href="javascipt:;" @click="deleteJurisdiction(row.id)">删除</a> -->
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
	name: 'userList',
	data() {
		return {
			routingInformation: {
				name1: '首页',
				name2: '用户列表',
				router: '/'
			},
			tableData: [],
			tags: [],
			entexpands: [],
			inputVisible: false,
		}
	},
	filters: {
		statusHandle(value) {
			if (value) {
				return 'success'
			} else {
				return 'danger'
			}
		}
	},
	created() {
		this.getUserList()
	},
	methods: {
		// 获取用户列表
		async getUserList() {
			try {
				const data = await this.$http.get('user/list')
				this.tableData = data
			} catch (e) {
				console.log(e)
			}
		},
		// 获取用户权限
		async getUserJurisdiction(userName) {
			const postData = {
				userName: userName
			}
			try {
				const data = await this.$http.post('user/jurisdictions', postData)
				this.tags = data
			} catch (e) {
				console.log(e)
			}
		},
		// 点击展开行时执行
		rowExpand(row, event, column) {
			Array.prototype.remove = function (val) {
				let index = this.indexOf(val)
				if (index > -1) {
					this.splice(index, 1)
				}
			}

			if (this.entexpands.indexOf(row.id) < 0) {
				this.entexpands = []
				this.getUserJurisdiction(row.username)
				this.entexpands.push(row.id)
			} else {
				this.entexpands.remove(row.id)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.user-list {
	padding: 0 20px;
	overflow: hidden;

	.el-tag {
		margin: 0 10px 10px 0;
	}
}
</style>
