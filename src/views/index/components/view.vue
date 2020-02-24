<template>
    <div class="w components-box clearfix body-box">
		<!-- <div class="components-box">
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
		</div> -->
		<div class="left-box">
			<logo class="logo"></logo>
			<ul>
				<span class="lb-class">canvas</span>
				<li><a href="#">Slider 滑块</a></li>
			</ul>
		</div>
		<div class="right-box">
			<router-view />
		</div>
    </div>
</template>

<script>
import logo from '@/components/canvas/logo'
import myCircular from '@/components/function/circular/index'
import mySquare from '@/components/function/square/index'
import mySlider from '@/components/function/slider/index'

export default {
	name: 'componentsViews',
	components: {
		logo,
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
			this[ele] = false
			this.$nextTick(() => {
				this[ele] = true
			})
		}
	},
}
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
@import '@/assets/css/color/index.scss'; // 使用方法

.components-box {
	position: relative;
	background-color: #fff;

	.left-box {
		top: 0;
		bottom: 0;
		width: 2.1rem;
		text-align: left;
		position: absolute;
		border-right: 1px solid $border-color;
		padding: 1rem 0.2rem 0.2rem 0.2rem;

		.logo {
			top: -55px;
			left: -50px;
			position: absolute;
			transform: scale(.5);
		}

		.lb-class {
			color: $ash;
		}

		li {
			a {
				color: $main-font;
				height: 40px;
				line-height: 40px;
			}
		}
	}

	.right-box {
		width: 908px;
		float: right;
		padding: 20px;
	}
}
</style>
