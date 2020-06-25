<template>
    <div class="left-content">
		<el-input v-model="search" placeholder="关键字搜索" clearable></el-input>
		<div class="mt10 mb10">
			<span>显示方式：</span>
			<el-select v-model="showType" placeholder="请选择" @change="selechChange">
				<el-option label="按列表" :value="1"></el-option>
				<el-option label="按目录树" :value="2"></el-option>
			</el-select>
		</div>
		<el-table
			ref="multipleTable"
			:data="tableData"
			tooltip-effect="dark"
			style="width: 100%"
			v-show="showType === 1"
			@selection-change="tableSelectionChange"
		>
			<el-table-column
				type="selection"
				width="55"
			>
			</el-table-column>
			<el-table-column
				prop="jobNumber"
				label="工号"
				width="120"
			>
				<template slot-scope="{ row }">
					<div v-show="search" v-html="textReplace(row.jobNumber)"></div>
					<span v-show="!search">{{ row.jobNumber }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="name"
				label="姓名"
				width="120"
			>
				<template slot-scope="{ row }">
					<div v-show="search" v-html="textReplace(row.name)"></div>
					<span v-show="!search">{{ row.name }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="departmentName"
				label="部门"
				show-overflow-tooltip
			>
				<template slot-scope="{ row }">
					<div v-show="search" v-html="textReplace(row.departmentName)"></div>
					<span v-show="!search">{{ row.departmentName }}</span>
				</template>
			</el-table-column>
		</el-table>
		<el-tree
			:data="treeData"
			show-checkbox
			node-key="id"
			:props="defaultProps"
			:default-expanded-keys="treeKeys"
			ref="tree"
			v-show="showType === 2"
			@check-change="treeSelectionChange"
		>
			<span class="custom-tree-node" slot-scope="{ node, data }">
				<div v-show="search" v-html="textReplace(node.label)"></div>
				<span v-show="!search">{{ node.label }}</span>
			</span>
		</el-tree>
    </div>
</template>

<script>
import vueObj from './vueObj'
import { deepCopy } from '@/plugins/tool/my'

export default {
	props: {
		data: {
			type: Array,
			required: true
		}
	},
	data () {
		return {
			search: '',
			tableData: [],
			tableSelected: [], // 表格选中后的值
			defaultProps: {
				children: 'children',
				label: 'name'
			},
			treeData: [],
			treeSelected: [], // 树型结构选中后的值
			showType: 1,
			treeKeys: [], // 为了切换时效果更好
			original: {
				tree: [],
				table: [],
				selected: [],
			},
		}
	},
	created () {
		vueObj.$on('cannelSelected', (row, type) => {
			if (type === 1) {
				// 更新数据
				this.tableSelected.forEach((item, index) => {
					if (item.id === row.id) {
						this.$refs.multipleTable.toggleRowSelection(item)
						this.original.selected = this.original.selected.filter(item => item !== row.id)
					}
				})
			} else {
				const newData = this.treeSelected.filter(item => {
					return item.id !== row.id
				})
				this.$refs.tree.setCheckedNodes(newData)
			}
		})

		this.transformationTree()
	},
	methods: {
		// 表格改变时执行
		tableSelectionChange (val) {
			this.tableSelected = val
			const keys = val.map(item => item.id)
			this.original.selected = this.original.selected.concat(keys)
			this.original.selected = [...new Set(this.original.selected)]
		},
		// 转换为树型结构
		transformationTree () {
			let departmentId = []
			let newData = []

			this.tableData = deepCopy(this.data)
			// 分组
			this.tableData.forEach(item => {
				// 部门名称分组
				if (!departmentId.includes(item.departmentId)) {
					let obj = {
						name: item.departmentName,
						children: []
					}
					departmentId.push(item.departmentId)
					newData[item.departmentId] = obj
				}
				// 数据分组
				newData[item.departmentId].children.push(item)
			})
			this.treeData = [
				{
					id: 0,
					name: '全公司',
					children: newData
				}
			]

			// 深拷贝（做搜索用的）
			this.original.table = deepCopy(this.tableData)
			this.original.tree = deepCopy(this.treeData)
		},
		// 树改变时执行
		treeSelectionChange (params) {
			this.treeSelected = this.$refs.tree.getCheckedNodes(true)
			const keys = this.$refs.tree.getCheckedKeys(true)
			vueObj.$emit('setTableData', keys, this.showType)

			this.original.selected = this.original.selected.concat(keys)
			this.original.selected = [...new Set(this.original.selected)]
		},
		// 切换显示效果时执行
		selechChange (val) {
			if (val === 1) {
				// 表格
				this.$refs.multipleTable.clearSelection()
				this.treeSelected = this.$refs.tree.getCheckedNodes(true)
				this.treeSelected.forEach(row => {
					this.$nextTick(() => {
						this.$refs.multipleTable.toggleRowSelection(row, true)
					})
				})
			} else {
				// tree
				this.$refs.tree.setCheckedNodes(this.tableSelected)
				this.treeSelected = this.tableSelected
				this.treeKeys = this.tableSelected.map((item) => {
					return item.id
				})
			}
			vueObj.$emit('setType', val)
		},
		textReplace (val) {
			if (val) {
				return val.replace(this.search, `<span red>${this.search}</span>`)
			} else {
				return val
			}
		},
		// 找到选中的选项(搜索后用的)
		updateSelectTable () {
			this.$nextTick(() => {
				this.tableSelected = this.tableData.filter(item => {
					if (this.original.selected.includes(item.id)) {
						this.$refs.multipleTable.toggleRowSelection(item, true)
						return item
					}
				})
			})
		}
	},
	watch: {
		search: function (newVal, oldVal) {
			let tempTableData = deepCopy(this.original.table)
			// 注意在这里已经重新赋值，会导致已选中的选项清空
			this.tableData = tempTableData.filter((item) => {
				if (item.name.includes(this.search) || item.jobNumber.includes(this.search) || item.departmentName.includes(this.search)) {
					return item
				}
			})

			if (this.showType === 2) {
				// 可优化
				let departmentId = []
				let newData = []
				let keys = []
				// 分组
				this.tableData.forEach(item => {
					// 部门名称分组
					if (!departmentId.includes(item.departmentId)) {
						let obj = {
							name: item.departmentName,
							children: []
						}
						departmentId.push(item.departmentId)
						newData[item.departmentId] = obj
					}
					// 数据分组
					newData[item.departmentId].children.push(item)
					keys.push(item.id)
				})
				// 去掉空数组
				newData = newData.filter(item => item)
				this.treeData = [
					{
						id: 0,
						name: '全公司',
						children: newData
					}
				]
				// 展开
				this.treeKeys = keys
			}

			// 防止搜索后选中的数据丢失
			// 开启锁
			if (oldVal === '') {
				if (this.showType === 1) {
					this.original.selected = this.tableSelected.map(item => item.id)
				} else {
					this.original.selected = this.treeSelected.map(item => item.id)
				}
			}

			if (newVal === '' && this.showType === 2) {
				this.original.selected = this.original.selected.concat(this.$refs.tree.getCheckedKeys(true))
				this.original.selected = [...new Set(this.original.selected)]
			}

			if (this.showType === 1) {
				// 更新选中的table选项
				this.updateSelectTable()
			} else {
				this.$nextTick(() => {
					this.$refs.tree.setCheckedKeys(this.original.selected)
				})
			}
		},
		'original.selected': function (newVal) {
			vueObj.$emit('setTableData', newVal, this.showType)
		}
	},
}
</script>

<style lang="scss" scoped>
.left-content {
	width: 50%;
}
</style>
