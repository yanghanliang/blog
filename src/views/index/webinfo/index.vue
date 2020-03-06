<template>
    <div class="w">
		<div class="echarts-box">
			<my-echarts :txt="xAxisData" :data="echartsData" class="echarts" :axisLabel="{}"></my-echarts>
		</div>
    </div>
</template>

<script>
import myEcharts from '@/components/function/myEcharts'

export default {
	name: 'webinfo',
	components: {
		myEcharts
	},
	data() {
		return {
			xAxisData: ['注册人数', '浏览人数', '文章浏览量'],
			echartsData: []
		}
	},
	created() {
		this.getData()
	},
	methods: {
		async getData() {
			try {
				const data = await this.$http.post('echarts/web/info')
				this.echartsData = Object.values(data)
				console.log(data, 'data', this.echartsData)
			} catch (e) {
				console.log(e)
			}
		}
	},
}
</script>

<style lang="scss" scoped>
.echarts-box {
	width: 400px;
	height: 300px;
	margin: 20px auto;
}
</style>
