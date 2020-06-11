<template>
    <mavon-editor
        class="rich-text"
        v-model="content"
        :subfield="edit"
        :tabSize="4"
        @save="saveContent"
        defaultOpen="preview"
        :toolbarsFlag="edit"
        :boxShadow="false">
    </mavon-editor>
</template>

<script>
export default {
	// 代码块
	name: 'codeBlock',
	props: {
		name: {
			props: {
				type: String,
				required: true
			}
		}
	},
	data () {
		return {
			content: '',
			noJurisdiction: window.localStorage.getItem('_jurisdiction')
		}
	},
	computed: {
		edit () {
			if (!this.noJurisdiction || this.noJurisdiction.includes('component')) {
				return false
			} else {
				return true
			}
		}
	},
	created () {
		this.getComponentsDetails()
	},
	methods: {
		// 保存内容
		async saveContent (content) {
			let postData = {
				name: this.name,
				content: content
			}
			try {
				const { data } = await this.$http.put('components/edit', postData)
				this.$message.success(data.msg)
			} catch (e) {
				console.log(e)
			}
		},
		// 获取组件详情
		async getComponentsDetails () {
			try {
				const data = await this.$http.get(`components/details?name=${this.name}`)
				this.content = data[0].content
			} catch (e) {
				console.log(e)
			}
		}
	},
}
</script>

<style lang="scss" scoped>
</style>
