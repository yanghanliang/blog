<template>
    <div>
        <div class="cb-content">
			<i class="my-icon-ai244" @click="refreshCircular('showSquare')"></i>
			<my-square ref="square" v-if="showSquare"></my-square>
		</div>
    </div>
</template>

<script>
import mySquare from '@/components/function/square/index'

export default {
	components: {
		mySquare
	},
	data() {
		return {
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

<style lang="scss" scoped>
.cb-content {
    position: relative;
    display: inline-block;

    .my-icon-ai244 {
        top: 36px;
        right: 10px;
        z-index: 1;
        font-size: 20px;
        cursor: pointer;
        position: absolute;
    }
}
</style>
