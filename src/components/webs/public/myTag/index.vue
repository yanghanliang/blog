<template>
    <div :class="['my-tag', 'mt20', 'clearfix', status]">
		<!-- <input
			type="text"
			ref="content"
			:disabled="disabled"
			v-model="tagData.value"
			size="auto"
			:class="['div-input', { 'max-w-unset': contentWidth }]" /> -->
		<div
			type="text"
			ref="content"
			:contenteditable="disabled"
			:class="['div-input', { 'max-w-unset': contentWidth }]"
			@keyup.enter ="handleConfig"
		>
			{{ tagData.value }}
		</div>
        <div class="fr icon-box">
            <i @click="status = 'active'" class="my-icon-more display-ib rotate90" title="点击展开"></i>
            <div class="handle">
                <template v-if="status === 'active'">
                    <i @click="edit" class="my-icon-bianji" title="编辑"></i>
                    <i @click="handleDelete" class="my-icon-icon" title="删除"></i>
                </template>
                <template v-else-if="status === 'edit'">
                    <i @click="handleConfig" class="my-icon-queding" title="确定"></i>
                    <i @click="status = 'defalut'" class="my-icon-xianshi_quxiao" title="取消"></i>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: 'myTag',
	props: {
		// 数据
		tagData: {
			type: Object,
			default: () => {
				return {
					id: 1,
					value: '面朝大海，春暖花开'
				}
			}
		},
		contentWidth: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		disabled() {
			if (this.status === 'edit') {
				return true
			} else {
				return false
			}
		}
	},
	data() {
		return {
			status: 'default',
		}
	},
	methods: {
		// 编辑
		edit() {
			// 改变状态
			this.status = 'edit'
			// 获取焦点
			let ele = this.$refs.content
			// 将光标移动到最后
			this.$nextTick(() => {
				// div 的方式 (操作DOM)
				let range = document.createRange()
				range.selectNodeContents(ele)
				range.collapse(false)
				let sel = window.getSelection()
				sel.removeAllRanges()
				sel.addRange(range)

				// input 的方式 (不好做宽度自适应)
				// ele.focus()
				// ele.selectionStart = (this.tagData.value + '').length
			})
		},
		// 点击确认时执行
		handleConfig() {
			let value = this.$refs.content.innerText.trim()
			this.$refs.content.innerText = value // 兼容回车键
			this.status = 'defalut'
			this.tagData.value = value
			this.$emit('handleConfirm', this.tagData)
		},
		// 点击删除时执行
		handleDelete() {
			this.$emit('handleDelete', this.tagData)
		}
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/color/index.scss';

.my-tag {
    height: 30px;
    padding: 0 10px;
    min-width: 100px;
    line-height: 30px;
    border-radius: 5px;
    position: relative;
    display: inline-block;
    border: 1px solid $border-color;

    .div-input {
		float: left;
		height: 100%;
		min-width: 80px;
		max-width: 100px;
        text-align: left;
		overflow-x: scroll;
		overflow-y: hidden;
		outline-style: none;
		white-space: nowrap;
		text-overflow: ellipsis;
		background-color: transparent;

		&::-webkit-scrollbar {
			display: none;
		}

		&.max-w-unset {
			max-width: unset;
			text-overflow: unset;
		}
    }

    .icon-box {
        float: right;
        position: relative;

		i {
			cursor: pointer;
		}

		.my-icon-more {
			margin-right: -5px;
		}

        .handle {
            top: 0;
            right: 0;
            position: absolute;
        }
	}

    &.active,&.edit {
		box-shadow: 0px 0px 5px -3px black;

        .icon-box {
            width: 50px;

            .my-icon-more {
                display: none;
            }
        }
	}

	&.active {
		background-color: #00000014;

		i {
			color: turquoise;
			text-shadow: 0px 1px 1px black;
		}

		.div-input {
			color: rgba(0, 0, 0, 0.2);
		}
	}

	&.edit {
		border-color: turquoise;

		i {
			color: turquoise;

			&:hover {
				color: #fff;
				border-radius: 50%;
				background-color: turquoise;
			}
		}
	}

	&:hover {
		box-shadow: 0px 0px 5px -3px black;
	}
}
</style>
