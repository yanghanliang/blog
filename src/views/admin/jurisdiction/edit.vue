<template>
    <div class="content_right form-box">
        <!-- 调用自己封装的面包屑组件 -->
        <my-crumbs :ri="routingInformation"></my-crumbs>

        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
            <el-form-item label="权限名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入权限名称"></el-input>
            </el-form-item>
            <el-form-item label="权限标识" prop="identification">
                <el-input v-model="form.identification" placeholder="请输入权限标识"></el-input>
            </el-form-item>
			<el-form-item label="分布">
				<el-radio-group v-model="form.distribution">
					<el-radio :label="0">api</el-radio>
					<el-radio :label="1">view</el-radio>
				</el-radio-group>
			</el-form-item>
            <el-form-item label="所属级别">
                <el-select v-model="form.pid" placeholder="请选择所属级别">
                    <template v-for="item in jurisdictionList">
                        <el-option :label="item.j_name" :value="item.id" :key="item.id"></el-option>
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
	name: 'editJurisdiction',
	data() {
		let name = async (rule, value, callback) => {
			if (value) {
				callback()
			} else {
				callback(new Error('请输入权限名称'))
			}
		}
		let identification = async (rule, value, callback) => {
			if (value) {
				callback()
			} else {
				callback(new Error('请输入权限标识'))
			}
		}
		return {
			routingInformation: {
				name1: '首页',
				name2: '修改权限',
				router: '/'
			},
			form: {
				name: '',
				identification: '',
				pid: 0,
				distribution: 0,
			},
			jurisdictionList: [], // 权限列表
			rules: {
				name: [
					{ validator: name, trigger: 'blur' }
				],
				identification: [
					{ validator: identification, trigger: 'blur' }
				]
			},
			id: this.$route.params.id
		}
	},
	created() {
		this.getJurisdictionList()
		if (this.id) {
			this.getJurisdictionDetails()
		}
	},
	methods: {
		// 获取权限列表
		async getJurisdictionList() {
			try {
				const data =  await this.$http.get('jurisdiction/list')
				this.jurisdictionList = [{
					j_name: '最高级别',
					id: 0,
				}].concat(data)
			} catch (e) {
				console.log(e)
			}
		},
		// 添加权限
		async onSubmit() {
			// 验证
			const verification =  await this.Global.verification(this, 'form')
			if (!verification) {
				return false
			}

			const postData = {
				name: this.form.name,
				identification: this.form.identification,
				pid: this.form.pid,
				distribution: this.form.distribution
			}

			try {
				await this.$http.put(`jurisdiction/edit/${this.id}`, postData)
				this.$message.success('修改成功')
				this.$router.push({
					name: 'jurisdictionList'
				})
			} catch (e) {
				console.log(e)
			}
		},
		// 获取权限详情
		async getJurisdictionDetails() {
			try {
				const data = await this.$http.get(`jurisdiction/details/${this.id}`)
				this.form.name = data.j_name
				this.form.identification = data.identification
				this.form.pid = data.j_pid
				this.form.distribution = data.distribution
			} catch (e) {
				console.log(e)
			}
		}
	},
}
</script>

<style lang="scss" scoped>
.content_right {
    form {
        height: 100%;
        padding: 24px 22px 2px 22px;
    }
}
</style>
