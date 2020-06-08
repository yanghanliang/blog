<template>
    <div class="upload-file">
        <el-upload
            class="upload-demo"
            drag
            :action="`${Global.baseURL}uploadFile`"
            :show-file-list="false"
            :http-request="httpRequest"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>

<script>
export default {
	name: 'uploadFile',
	data () {
		return {
			wordUrl: ''
		}
	},
	created () {
	},
	methods: {
		// 覆盖默认的上传行为
		async httpRequest (file) {
			let formdata = new FormData()
			formdata.append('file', file.file)

			try {
				let { data } = await this.$http({
					url: 'uploadFile?uploadDir=./uploadFile/word&type=word',
					method: 'post',
					data: formdata, // 必须是 FormData 对象
					headers: {'Content-Type': 'multipart/form-data'},
				})

				if (data.status === 200) {
					this.wordUrl = data.url
					this.wordToPdf()
				}
			} catch (e) {
				console.log(e)
				this.$message.error('请求超时~')
			}
		},
		async wordToPdf () {
			const postData = {
				wordUrl: './' + this.wordUrl
			}
			const data = await this.$http.post('/fileconversion', postData)
			console.log(data, 'data')
		}
	},
}
</script>

<style lang="scss" scoped>
.upload-file {

}
</style>
