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
        <span>近七日</span>
        <i class="el-icon-date fr"></i>
    </div>
</template>

<script>
export default {
	props: {
		date: {
			type: Array
		}
	},
	components: {},
	data() {
		return {
			time: [],
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now()
				},
				shortcuts: [
					{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date())
						}
					},
					{
						text: '昨天',
						onClick(picker) {
							const date = new Date()
							date.setTime(date.getTime() - 3600 * 1000 * 24)
							picker.$emit('pick', date)
						}
					},
					{
						text: '一周前',
						onClick(picker) {
							const date = new Date()
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
							picker.$emit('pick', date)
						}
					}
				]
			}
		}
	},
	computed: {},
	created() {
		this.initData() // 初始化时间
	},
	methods: {
		triggerFocus() {
			this.$refs.date.focus()
			console.log(this.$refs)
		},
		dateChange() {
			// vueObj.$emit('dateChange', this.date, this)
			this.$emit('dateChange', this.time)
		},
		initData() {
			this.time = this.date
		}
	},
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/color/index.scss'; // 使用方法

.my-date {
    width: 2.86rem;
    height: .44rem;
    cursor: pointer;
    line-height: .444rem;
    border-radius: .03rem;
    padding-right: .12rem;
    background-color: #fff;
    border: 1px solid $border-color;

    .el-date-editor--daterange.el-input__inner {
        width: auto;
        border: none;
        background-color: transparent;

        &::after {
            content: "";
            width: 1px;
            height: .17rem;
            margin-left: .1rem;
            display: inline-block;
            background-color: $border-color;
        }

    }

    .el-icon-date {
        margin-top: .15rem;
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
        }

        .el-date-editor .el-range__close-icon {
            display: none;
        }
    }
</style>
