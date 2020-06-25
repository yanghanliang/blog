<template>
    <ul class="right-content">
		<el-input class="mb20" v-model="search" placeholder="关键字搜索" clearable></el-input>
		<template v-if="list.length">
			<li v-for="item in list" :key="item.id">
				<template v-if="search">
					<span v-html="textReplace(item.jobNumber + '-' + item.name)"></span>
					<span v-html="textReplace(item.departmentName)">{{ item.departmentName }}</span>
				</template>
				<template v-else>
					<span>{{ item.jobNumber }}-{{ item.name }}</span>
					<span>{{ item.departmentName }}</span>
				</template>
				<i class="el-icon-close fr" @click="cannelSelected(item)"></i>
			</li>
			<el-button class="mt40" type="primary" @click="getSelectedData" size="small">取选择结果</el-button>
		</template>
		<template v-else>
			<div class="ta-center mt40">
				<my-icon class="meiyouxiangguan" identification="meiyouxiangguan"></my-icon>
				<span class="display-b">暂无数据</span>
			</div>
		</template>
    </ul>
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
			type: 1,
			search: '',
			tempData: [],
			keys: [],
			list: [],
		}
	},
	created () {
		this.init()
	},
	methods: {
		init () {
			vueObj.$on('setTableData', (keys, type) => {
				this.keys = keys
				this.type = type
			})
			vueObj.$on('setType', type => {
				this.type = type
			})
		},
		cannelSelected (row) {
			vueObj.$emit('cannelSelected', row, this.type)
		},
		textReplace (val) {
			if (val) {
				return val.replace(this.search, `<span red>${this.search}</span>`)
			} else {
				return val
			}
		},
		getSelectedData () {
			alert(JSON.stringify(this.list))
		}
	},
	watch: {
		search: function (newVal) {
			this.list = this.tempData.filter((item) => {
				if (item.name.includes(this.search) || item.jobNumber.includes(this.search) || item.departmentName.includes(this.search)) {
					return item
				}
			})
		},
		keys: function () {
			const data = deepCopy(this.data)
			this.list = data.filter(item => this.keys.includes(item.id))
			this.tempData = deepCopy(this.list)
		}
	},
}
</script>

<style lang="scss" scoped>
.right-content {
    width: 45%;
    margin-left: 5%;

    li {
        padding: 10px;
        height: 40px;

        &:hover {
            background-color: $table-hover;
        }

        span:nth-child(1) {
            width: 200px;
            display: inline-block;
        }

        i {
            cursor: pointer;
        }
	}

	.meiyouxiangguan {
		font-size: 50px;
	}
}
</style>
