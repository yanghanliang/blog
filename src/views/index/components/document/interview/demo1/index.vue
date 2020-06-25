<template>
	<div>
		<div class="clearfix">
			<left-content class="fl" :data="tableData" />
			<right-content class="fr" :data="tableData" />
		</div>
		<h3 class="mt40">性能优化方面</h3>
		<ol>
			<li>减少数据请求次数： 使用本地存储，如localStorage或sessionStorage或者将数据存储在内存中（我是存在内存中），前端做搜索 --- 并发量</li>
			<li>根据实际情况选择：v-show 和 v-if --- 页面性能</li>
		</ol>
	</div>
</template>

<script>
import { tableData } from './main/data'
import leftContent from './main/leftContent'
import rightContent from './main/rightContent'
export default {
	name: 'demo1',
	components: {
		leftContent,
		rightContent
	},
	data () {
		return {
			tableData
		}
	},
}
</script>

<style lang="scss" scoped>
</style>
