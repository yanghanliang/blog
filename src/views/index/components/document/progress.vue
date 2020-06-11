<template>
    <div>
        <my-progress class="progress" :progressValue="50">
			<div slot="content">文字描述</div>
		</my-progress>
		<code-block name="progress" />
        <el-table :data="tableData" style="width: 100%" >
            <el-table-column prop="params" label="参数"></el-table-column>
            <el-table-column prop="explain" label="说明"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="option" label="可选值"></el-table-column>
            <el-table-column prop="default" label="默认值"></el-table-column>
        </el-table>
    </div>
</template>

<script>
// 代码块
import codeBlock from '@/components/webs/public/codeBlock/index'
import myProgress from '@/components/canvas/progress/index'

export default {
	components: {
		myProgress,
		codeBlock
	},
	data () {
		return {
			tableData: [
				{
					params: 'showPercentage',
					explain: '是否显示百分比',
					type: 'boolean',
					option: 'true/false',
					default: 'true'
				},
				{
					params: 'showSlider',
					explain: '是否显示可拖拽按钮',
					type: 'boolean',
					option: 'true/false',
					default: 'true'
				},
				{
					params: 'progressValue',
					explain: '百分比',
					type: 'number',
					option: '0-100',
					default: '0'
				},
				{
					params: 'direction',
					explain: '方向:true逆时针转动，false顺时针转动',
					type: 'boolean',
					option: 'true/false',
					default: 'true'
				},
				{
					params: 'width',
					explain: '组件宽高',
					type: 'number/string',
					option: '-',
					default: '205'
				},
				{
					params: 'color',
					explain: '颜色',
					type: 'array',
					option: '-',
					default: JSON.stringify([
						{
							value: 0,
							color: '#096'
						},
						{
							value: 0.5,
							color: '#43ffe1'
						},
						{
							value: 0.8,
							color: '#7F86E4'
						},
						{
							value: 1,
							color: '#ff4343'
						}
					])
				},

			],
		}
	},
}
</script>

<style lang="scss" scoped>
.rich-text {
	margin: 20px 0;
}

.progress {
	.content {
		>div {
			margin-top: 70px;
		}
	}
}
</style>
