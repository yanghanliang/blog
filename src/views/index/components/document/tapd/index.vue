<template>
	<div class="tapd">
		<el-upload
			class="upload-demo"
			drag
			:action="`${Global.baseURL}uploadFile`"
			:show-file-list="false"
			:http-request="httpRequest"
			multiple
		>
			<template v-if="status === 'success'">
				<div>
				</div>
			</template>
			<template v-else>
				<i class="el-icon-upload"></i>
				<div class="el-upload__tip" slot="tip">请上传doc文件</div>
				<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			</template>
		</el-upload>
	</div>
</template>

<script>
export default {
	name: 'Tapd',
	data () {
		return {
			status: ''
		}
	},
	methods: {
		// 覆盖默认的上传行为
		async httpRequest (file) {
			let formdata = new FormData()
			formdata.append('file', file.file)
			this.status = 'upload'

			try {
				let { data } = await this.$http({
					url: `uploadFile?uploadDir=./uploadFile/excel&type=excel&name=${file.file.name}`,
					method: 'post',
					data: formdata, // 必须是 FormData 对象
					headers: {'Content-Type': 'multipart/form-data'},
				})

				if (data.status === 200) {
					this.status = 'success'
				}
			} catch (e) {
				console.log(e)
			}
		},
	}
}
</script>

<style lang="scss" scoped>
</style>
