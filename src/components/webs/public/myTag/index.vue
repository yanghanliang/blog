<template>
    <div :class="['my-tag', 'clearfix', status, { 'simple': simple }]">
		<!-- <input
			type="text"
			ref="content"
			:disabled="disabled"
			v-model="tagData.value"
			size="auto"
			:class="['div-input', { 'max-w-unset': widthAuto }]" /> -->
		<div
			type="text"
			ref="content"
			:contenteditable="disabled"
			:class="['div-input', { 'max-w-unset': widthAuto }]"
			@keyup.enter ="handleConfig"
		>
			{{ tagData[field] }}
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
                    <i @click="handleCannel" class="my-icon-xianshi_quxiao" title="取消"></i>
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
		// 宽度自适应
		widthAuto: {
			type: Boolean,
			default: false
		},
		// 值的字段
		field: {
			type: String,
			default: 'value'
		},
		// 开启极简模式
		simple: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		disabled () {
			if (this.status === 'edit') {
				return true
			} else {
				return false
			}
		}
	},
	data () {
		return {
			status: 'default',
		}
	},
	methods: {
		// 编辑
		edit () {
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
				ele.scrollLeft = 1000

				// input 的方式 (不好做宽度自适应)
				// ele.focus()
				// ele.selectionStart = (this.tagData.value + '').length
			})
		},
		// 点击确认时执行
		handleConfig () {
			let value = this.$refs.content.innerText.trim()
			this.$refs.content.innerText = value // 兼容回车键
			this.status = 'defalut'
			this.tagData[this.field] = value
			this.$emit('handleConfirm', this.tagData)
			this.$refs.content.scrollLeft = 0
		},
		// 点击取消时执行
		handleCannel () {
			this.$refs.content.scrollLeft = 0
			this.status = 'defalut'
			this.$refs.content.innerText = this.tagData[this.field]
		},
		// 点击删除时执行
		handleDelete () {
			this.$emit('handleDelete', this.tagData)
		}
	},
}
</script>

<style lang="scss" scoped>
.my-tag {
    padding: 0 10px;
    min-width: 100px;
    border-radius: 5px;
    position: relative;
    display: inline-block;

	&:not(.simple) {
		height: 30px;
		line-height: 30px;
		border: 1px solid $border-color;
	}

	&.simple {
		box-sizing: border-box;
	}

	&:not(.edit) .div-input {
		text-overflow: ellipsis;
	}

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
		&:not(.simple) {
			box-shadow: 0px 0px 5px -3px black;
		}

        .icon-box {
            width: 50px;

            .my-icon-more {
                display: none;
            }
        }
	}

	&.active:not(.simple) {
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

	&:hover:not(.simple) {
		box-shadow: 0px 0px 5px -3px black;
	}
}
</style>
