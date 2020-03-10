<template>
    <div>
        <div class="cb-content">
            <i class="my-icon-ai244" @click="refreshCircular('showCircular')"></i>
            <my-circular ref="circular" v-if="showCircular"></my-circular>
        </div>
		<p class="mt10">
			在不碰撞的情况下并且不超出“圆”外的随机分布,您可以点击刷新按钮试试哦~
		</p>
    </div>
</template>

<script>
import myCircular from '@/components/function/circular/index'

export default {
	components: {
		myCircular
	},
	data() {
		return {
			showCircular: true,
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

<style lang="scss" scoped>
.cb-content {
    display: inline-block;

    .my-icon-ai244 {
        float: right;
        font-size: 20px;
        cursor: pointer;
        margin-top: 20px;
    }
}
</style>
