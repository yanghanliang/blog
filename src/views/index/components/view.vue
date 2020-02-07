<template>
    <div class="w clearfix pb90">
		<div class="components-box">
			<my-progress></my-progress>
		</div>
		<div class="components-box">
			<i class="my-icon-ai244" @click="refreshCircular('showCircular')"></i>
			<my-circular ref="circular" v-if="showCircular"></my-circular>
		</div>
		<div class="components-box">
			<i class="my-icon-ai244" @click="refreshCircular('showSquare')"></i>
			<my-square ref="square" v-if="showSquare"></my-square>
		</div>
		<div class="components-box">
			<my-slider></my-slider>
		</div>
    </div>
</template>

<script>
import myProgress from '@/components/canvas/progress/index'
import myCircular from '@/components/function/circular/index'
import mySquare from '@/components/function/square/index'
import mySlider from '@/components/function/slider/index'

export default {
	name: 'componentsViews',
	components: {
		myProgress,
		myCircular,
		mySquare,
		mySlider
	},
	data() {
		return {
			showCircular: true,
			showSquare: true
		}
	},
	methods: {
		// 刷新圆
		refreshCircular(ele) {
			console.log(ele, 'eke')
			this[ele] = false
			this.$nextTick(() => {
				this[ele] = true
			})
		}
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/color/index.scss'; // 使用方法

.components-box {
	float: left;
	margin: 20px;
	padding: 20px;
	border-radius: 5px;
	border: 5px solid $ash;

	.my-icon-ai244 {
		float: right;
		font-size: 20px;
		margin-right: 10px;
		cursor: pointer;
	}
}
</style>
