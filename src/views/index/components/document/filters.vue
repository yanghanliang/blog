<template>
    <div>
        <ul>
            <li>
                money
            </li>
            <li class="mb20 mt20">分转元</li>
            <li>
                123456 ------ {{ 123456 | money }}
            </li>
            <li>
                123456 ------ {{ 123456 | money({ symbol: false, decimal: false }) }}
            </li>
            <li>
                12345600 ------ {{ 12345600 | money({ symbol: false, decimal: false }) }}
            </li>
            <li class="mb20 mt20">元转分</li>
            <li>1 ------ {{ 1 | money({ conversion: 'down' }) }}</li>
            <li>1.12 ------ {{ 1.12 | money({ conversion: 'down' }) }}</li>
            <li>1.06 ------ {{ 1.06 | money({ conversion: 'down' }) }}</li>
        </ul>
        <code-block class="mt20" name="filters" />
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
// 局部组件
import { money } from '@/plugins/filters/part/index'

export default {
	name: 'filters',
	components: {
		codeBlock
	},
	filters: {
		money
	},
	data () {
		return {
			tableData: [
				{
					params: 'value',
					explain: '金额',
					type: 'number/string',
					option: '*',
					default: '-'
				},
				{
					params: 'params',
					explain: '配置项',
					type: 'object',
					option: '{}',
					default: JSON.stringify({
						conversion: 'up',
						symbol: ',',
						decimal: true
					})
				},
				{
					params: 'params.conversion',
					explain: '转换: up 分转元 100 => 1, down 元转分 1 =>100',
					type: 'number/string',
					option: 'up/down',
					default: 'up'
				},
				{
					params: 'params.symbol',
					explain: '千分位符号',
					type: 'boolean/string',
					option: ', . false',
					default: ','
				},
				{
					params: 'params.decimal',
					explain: '是否保留两位小数',
					type: 'boolean',
					option: 'true/false',
					default: 'true'
				}
			]
		}
	},
}
</script>

<style lang="scss" scoped>
</style>
