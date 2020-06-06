<template>
    <div :style="style" :class="['show-image', { 'w-auto': height, 'h-auto': width, 'img-existence': imgSrc }]" @click="triggerFileClick">
		<div class="si-add" v-show="!imgSrc">
			<i class="my-icon-jia"></i>
			<span>请选择需要显示的图片</span>
		</div>
        <img :src="imgSrc" alt="">
        <input class="file" type="file" @change="getImageInfo" ref="file" accept="image/*" />
    </div>
</template>

<script>
/**
 * 此组件可以用来显示本地的图片
 */
export default {
	name: 'getImageInfo',
	props: {
		/**
		 * 只传宽度，图片高度自适应
		 * 只传高度，图片宽度自适应
		 * 宽度和高度都传的话，图片会按传入的宽高显示，极有可能会导致图片失帧
		 * 宽高都不传的话，图片会按它本身的大小进行显示
		 * @param {object}           params
		 * @param {}               params.
		 */
		width: {
			type: String
		},
		height: {
			type: String
		}
	},
	computed: {
		style () {
			let style = ''
			if (this.width) {
				style += `width: ${this.width};`
			}
			if (this.height) {
				style +=  `height: ${this.height};`
			}
			return style
		}
	},
	data () {
		return {
			imgSrc: '',
		}
	},
	methods: {
		// 触发文件的点击事件
		triggerFileClick () {
			this.$refs.file.click()
		},
		// 获取图片信息
		getImageInfo () {
			const fileEle = this.$refs.file
			const file = fileEle.files[0]
			const reader = new FileReader()
			// 读取文件
			reader.readAsDataURL(file)
			// 图片读取完成后执行
			reader.onload = () => {
				this.imgSrc = reader.result
			}
		}
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/color/index.scss'; // 使用方法

.show-image {
	width: 400px;
	height: 400px;
	position: relative;
	display: inline-block;
	border: 2px solid $border-color;

	.si-add {
		top: 50%;
		left: 50%;
		color: $secondary;
		text-align: center;
		position: absolute;
		transform: translate(-50%, -50%);

		i {
			width: 40px;
			height: 40px;
			display: block;
			cursor: pointer;
			line-height: 40px;
			border-radius: 50%;
			margin: 0 auto 10px;
			border: 1px dashed $secondary;
		}
	}

	.file {
		display: none;
	}

	img {
		vertical-align: middle;
	}

	&.w-auto {
		width: auto;

		img {
			height: 100%;
		}
	}

	&.h-auto {
		height: auto;

		img {
			width: 100%;
		}
	}

	&.img-existence:not(.w-auto):not(.h-auto) {
		width: auto;
		height: auto;

		img {
			width: auto;
			height: auto;
		}
	}
}
</style>
