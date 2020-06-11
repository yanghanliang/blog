<template>
    <div class="my-date" @click="triggerFocus">
        <el-date-picker
            v-model="time"
            type="daterange"
            align="right"
            unlink-panels
            :clearable="false"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="dateChange"
            ref="date"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions">
        </el-date-picker>
        <span class="fl">{{ title }}</span>
        <i class="el-icon-date fr"></i>
    </div>
</template>

<script>
// 导入时间类型
import dateType from './dateType'

export default {
	props: {
		date: {
			type: Array
		},
		dateType: {
			type: Number, // 1(今天)，2(本周)，3(本月至今)，4(近三个月)，5(近六个月)，6(今年至今)，7(近一周)
			default: 6
		}
	},
	components: {},
	data () {
		return {
			time: [],
			title: '今天',
			pickerOptions: {
				disabledDate (time) {
					return time.getTime() > Date.now()
				},
				shortcuts: [
					{
						text: '今天',
						onClick (picker) {
							picker.$emit('pick', dateType[0].date)
						}
					},
					{
						text: '本周至今',
						onClick (picker) {
							picker.$emit('pick', dateType[1].date)
						}
					},
					{
						text: '本月至今',
						onClick (picker) {
							picker.$emit('pick', dateType[2].date)
						}
					},
					{
						text: '最近三个月',
						onClick (picker) {
							picker.$emit('pick', dateType[3].date)
						}
					},
					{
						text: '最近六个月',
						onClick (picker) {
							picker.$emit('pick', dateType[4].date)
						}
					},
					{
						text: '今年至今',
						onClick (picker) {
							picker.$emit('pick', dateType[5].date)
						}
					},
					{
						text: '近一周',
						onClick (picker) {
							picker.$emit('pick', dateType[6].date)
						}
					},
				]
			}
		}
	},
	computed: {},
	created () {
		this.initData() // 初始化时间
	},
	methods: {
		triggerFocus () {
			this.$refs.date.focus()
		},
		dateChange (params) {
			this.$emit('dateChange', this.time)
			this.dateTitle()
		},
		initData () {
			this.time = dateType[this.dateType - 1].date
			this.title = dateType[this.dateType - 1].title
			// 将初始化的时间返回
			this.$emit('dateChange', this.time)
		},
		// 识别时间后转换为文字
		dateTitle () {
			for (let i = 0, length = dateType.length; i < length; i++) {
				let item = dateType[i]
				if (item.date[0] === this.time[0] && item.date[1] === this.time[1]) {
					this.title = item.title
					return false
				}
			}
			this.title = '~'
		}
	},
}
</script>

<style lang='scss' scoped>
.my-date {
	width: 290px;
    float: right;
    height: .38rem;
    cursor: pointer;
    line-height: .38rem;
    border-radius: .03rem;
    padding-right: .12rem;
	box-sizing: border-box;
    background-color: #fff;
    border: 1px solid $border-color;

    .el-date-editor--daterange.el-input__inner {
		padding: 0;
        width: auto;
		height: 100%;
        border: none;
		line-height: auto;
		float: left;
        background-color: transparent;

        &::after {
            content: "";
            width: 1px;
			height: .17rem;
			margin-right: 12px;
            display: inline-block;
            background-color: $border-color;
        }
    }

    .el-icon-date {
		line-height: .38rem;
    }
}

</style>

<style lang="scss">
    .my-date {
         .el-date-editor .el-range__icon {
            display: none;
        }

        .el-date-editor .el-range-input {
            width: .8rem;
			height: 78%;
        }

        .el-date-editor .el-range__close-icon {
            display: none;
        }
    }
</style>
