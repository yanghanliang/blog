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
			<template v-if="status === 'defult'">
				<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				<div class="el-upload__tip" slot="tip">请上传doc文件</div>
			</template>
			<template v-else-if="status === 'upload'">
				<span>正在上传...</span>
			</template>
			<template v-else-if="status === 'transformation'">
				<span>正在转换为pdf文件...</span>
			</template>
			<template v-else>
				<span>转换成功</span>
			</template>
        </el-upload>
    </div>
</template>

<script>
export default {
	name: 'uploadFile',
	data () {
		return {
			wordUrl: '',
			status: 'defult'
		}
	},
	created () {
	},
	methods: {
		// 覆盖默认的上传行为
		async httpRequest (file) {
			let formdata = new FormData()
			formdata.append('file', file.file)
			this.status = 'upload'

			try {
				let { data } = await this.$http({
					url: 'uploadFile?uploadDir=./uploadFile/word&type=word',
					method: 'post',
					data: formdata, // 必须是 FormData 对象
					headers: {'Content-Type': 'multipart/form-data'},
				})

				if (data.status === 200) {
					this.wordUrl = data.url
					this.status = 'transformation'
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

			try {
				let { url } = await this.$http.post('/fileconversion', postData)
				url =  this.Global.baseURL + url
				this.status = 'success'
				this.$emit('success', url)
			} catch (err) {
				console.log(err)
			}
		}
	},
}
</script>

<style lang="scss" scoped>
</style>
