<template>
    <div>
		<!-- <my-echarts></my-echarts> -->
		<my-echarts type="line"></my-echarts>
		<!-- <my-echarts type="pie"></my-echarts> -->
		<mavon-editor
			class="mt20 mb20"
            v-model="content"
            :subfield="edit"
			:tabSize="4"
			@save="saveContent"
            defaultOpen="preview"
            :toolbarsFlag="edit"
            :boxShadow="false">
        </mavon-editor>
		<!-- <my-echarts :time="2" title="柱状图动画延迟" :option="option"></my-echarts> -->
    </div>
</template>

<script>
import myEcharts from '@/components/function/myEcharts'

var xAxisData = []
var data1 = []
var data2 = []
for (var i = 0; i < 100; i++) {
	xAxisData.push('类目' + i)
	data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
	data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
}

let option = {
	legend: {
		data: ['bar', 'bar2']
	},
	toolbox: {
		// y: 'bottom',
		feature: {
			magicType: {
				type: ['stack', 'tiled']
			},
			dataView: {},
			saveAsImage: {
				pixelRatio: 2
			}
		}
	},
	tooltip: {},
	xAxis: {
		data: xAxisData,
		splitLine: {
			show: false
		}
	},
	yAxis: {
	},
	series: [{
		name: 'bar',
		type: 'bar',
		data: data1,
		animationDelay: function (idx) {
			return idx * 10
		}
	}, {
		name: 'bar2',
		type: 'bar',
		data: data2,
		animationDelay: function (idx) {
			return idx * 10 + 100
		}
	}],
	animationEasing: 'elasticOut',
	animationDelayUpdate: function (idx) {
		return idx * 5
	}
}

export default {
	components: {
		myEcharts
	},
	computed: {
		edit() {
			return !this.noJurisdiction.includes('component')
		}
	},
	data() {
		return {
			name: 'echarts',
			content: '',
			noJurisdiction: window.localStorage.getItem('_jurisdiction'),
			option: option
		}
	},
	created() {
		this.getComponentsDetails()
	},
	methods: {
		// 保存内容
		async saveContent(content) {
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
		async getComponentsDetails() {
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
