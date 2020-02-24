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
				<template slot-scope="{row}">
					<template v-if="tags.length > 0">
						<el-tag v-for="tag in tags"
							:key="tag.id" closable :type="tag.is_open | statusHandle"
							@close="deleteUserJurisdiction(tag.id)"
						>
							{{tag.j_name}}
						</el-tag>
					</template>
					<template v-else>
						<my-icon identification="meiyouxiangguan" class="no-data" title="暂无数据"></my-icon>
					</template>
					<el-select
						v-if="selectVisible"
						v-model="selectedList"
						multiple
						collapse-tags
						style="margin-left: 20px;"
						placeholder="请选择您所需要添加的权限"
						@visible-change="addUserJurisdiction"
					>
						<template v-for="item in jurisdictionList">
							<el-option v-if="!tagIds.includes(item.id)" :key="item.id" :label="item.j_name" :value="item.id">
							</el-option>
						</template>
					</el-select>
					<el-button v-else class="button-new-tag" size="small" @click="selectVisible = !selectVisible">+ New Tag</el-button>
				</template>
			</el-table-column>
            <el-table-column key="tt" prop="username" label="用户名">
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
			selectVisible: false,
			selectedList: [],
			jurisdictionList: [],
			// 当前行
			currentRow: {},
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
	computed: {
		// 已选的 tag id 数组
		tagIds() {
			return this.tags.map((item) => {
				return item.id
			})
		}
	},
	created() {
		this.getUserList()
		this.getJurisdictionList()
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
				console.log(data, 'data')
				this.tags = data
			} catch (e) {
				console.log(e)
			}
		},
		// 点击展开行时执行
		async rowExpand(row, event, column) {
			Array.prototype.remove = function (val) {
				let index = this.indexOf(val)
				if (index > -1) {
					this.splice(index, 1)
				}
			}

			if (this.entexpands.indexOf(row.id) < 0) {
				this.entexpands = []
				// 更新当前行
				this.currentRow = row
				await this.getUserJurisdiction(row.username)
				this.entexpands.push(row.id)
			} else {
				this.entexpands.remove(row.id)
			}
		},
		// 获取权限列表
		async getJurisdictionList() {
			try {
				const data = await this.$http.get('jurisdiction/list')
				this.jurisdictionList = data
			} catch (e) {
				console.log(e)
			}
		},
		// 添加用户权限
		addUserJurisdiction(value) {
			// 下拉框隐藏 && 选中值
			if (!value && this.selectedList.length > 0) {
				const itemObjArr = this.jurisdictionList.filter((item) => {
					if (this.selectedList.includes(item.id)) {
						return item
					}
				})
				this.tags = [].concat(this.tags, itemObjArr)
				this.editUserJurisdiction('添加成功~')
				this.selectedList = []
			}
		},
		// 删除用户权限
		deleteUserJurisdiction(id) {
			this.tags = this.tags.filter((item) => {
				if (item.id !== id) {
					return item
				}
			})
			this.editUserJurisdiction('删除成功~')
		},
		// 修改用户权限
		async editUserJurisdiction(msg) {
			const postData = {
				jurisdictionId: this.tagIds.join(','),
				id: this.currentRow.id
			}
			try {
				const { data } = await this.$http.put('user/jurisdiction/edit', postData)
				this.$message.success(msg)
				// 更新 token
				window.localStorage.setItem('token', data.token)
				this.getNotJurisdiction()
			} catch (e) {
				console.log(e)
			}
		},
		// 获取用户不存且需要验证的路由权限
		async getNotJurisdiction() {
			try {
				const data = await this.$http.get('user/not/jurisdiction')
				this.__proto__._jurisdiction = data
				window.localStorage.setItem('_jurisdiction', JSON.stringify(data))
			} catch (e) {
				console.log(e)
			}
		}
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

	.no-data {
		font-size: 44px;
		vertical-align: middle;
	}
}
</style>
