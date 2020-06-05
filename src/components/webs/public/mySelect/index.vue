<template>
    <div :class="['my-select', status ? 'open' : 'close', textAlign]" @click="openSelect" @mouseleave="closeSelect">
        <div class="ms-content">
            <span class="">{{ selectedItem.text }}</span>
            <i class="el-icon-arrow-right"></i>
        </div>
        <ul class="ms-option">
            <template v-for="(item, index) in optionList">
                <li @click.stop="setOption(item)" :key="index">{{ item.text }}</li>
            </template>
        </ul>
    </div>
</template>

<script>
export default {
	name: 'mySelect',
	props: {
		// 文本对齐方式
		textAlign: {
			type: String,
			default: 'tz-right'
		},
		id: {
			type: [Number, String]
		}
	},
	data () {
		return {
			status: false,
			selectedItem: {},
			optionList: [
				{
					id: 1,
					text: 'Today'
				},
				{
					id: 2,
					text: 'Today2'
				},
				{
					id: 3,
					text: 'Today3'
				}
			]
		}
	},
	created () {
		this.setDefalut()
	},
	methods: {
		setOption (item) {
			this.selectedItem = item
			this.status = false
			this.$emit('update:id', item.id)
		},
		openSelect () {
			this.status = true
		},
		closeSelect () {
			this.status = false
		},
		setDefalut () {
			this.optionList.forEach(item => {
				if (item.id === this.id) {
					this.selectedItem = item
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.my-select {
    width: 200px;
    height: 30px;
    color: #ddd;
    cursor: pointer;
    line-height: 30px;

    .ms-option {
        display: block;
        padding-right: 40px;
		color: #ddd;
		left: 0;
		right: 0;
		z-index: 2;
		position: absolute;
		background-color: #fff;
    }

    &.close {
        .ms-option {
            display: none;
        }
    }

    .ms-content {
		text-align: right;

		i {
			transition: all .2s linear;
		}
	}

	&.open {
		.ms-content i {
			transform: rotate(90deg);
		}
	}
}
</style>
