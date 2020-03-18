<template>
    <div class="w components-box clearfix body-box">
		<!-- <div class="components-box">
			<my-progress></my-progress>
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
				<li><a href="progress">progress 进度条</a></li>
			</ul>
			<ul>
				<span class="lb-class">小玩意</span>
				<li><a href="circular">随机分布 圆</a></li>
				<li><a href="square">随机分布 方形</a></li>
			</ul>
			<ul>
				<span class="lb-class">dom</span>
				<li><a href="slider">滑块</a></li>
			</ul>
			<ul>
				<span class="lb-class">svg</span>
				<li><a href="connection">connection 连线</a></li>
			</ul>
			<ul>
				<span class="lb-class">echarts</span>
				<li><a href="echarts">myEcharts</a></li>
			</ul>
		</div>
		<div class="right-box">
			<router-view />
		</div>
    </div>
</template>

<script>
import logo from '@/components/canvas/logo'

export default {
	name: 'componentsViews',
	components: {
		logo,
	},
	data() {
		return {
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

		span {
			font-size: 12px;
		}

		.logo {
			top: -55px;
			left: -50px;
			position: absolute;
			transform: scale(.5);
		}

		.lb-class {
			color: $ash;
			line-height: 40px;
		}

		ul {
			line-height: 0;
			margin-bottom: 5px;

			li {
				margin-bottom: 10px;

				&:nth-last-child(1) {
					margin-bottom: 0;
				}

				a {
					height: 20px;
					display: block;
					color: $main-font;
					line-height: 20px;
				}
			}
		}

	}

	.right-box {
		width: 908px;
		min-height: 787px;
		float: right;
		padding: 20px;
	}
}
</style>
