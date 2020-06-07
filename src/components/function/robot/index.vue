<template>
    <div :class="['robot', {'active': reply}]" @click="tipsShow = !tipsShow">
        <i class="my-icon-jiqiren"></i>
        <div :class="['bubble', {'no': length > 10}]">
            <div v-if="length <= 10">{{ reply }}</div>
			<p v-else>{{ reply }}</p>
        </div>
		<div :class="['tips', {block: tipsShow}]">
			<p>选择机器人，支持功能： 天气、歌词、人工智能聊天</p>
			<el-radio v-model="radio" :label="1">纯中英文翻译</el-radio>
			<el-radio v-model="radio" :label="2">机器人</el-radio>
		</div>
        <div class="input-box">
            <input type="text" v-model="value" @keyup.enter="getData" title="调用百度接口做的中英文翻译" placeholder="畅想未来">
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import md5 from 'md5'

export default {
	name: 'robot',
	data () {
		return {
			value: '', // 输入的值
			reply: '', // 回复的值
			length: 0, // 回复值的长度
			radio: 1, // 模式
			tipsShow: false, // 提示，默认隐藏
		}
	},
	computed: {
		to () {
			return /[\u4e00-\u9fa5]/.test(this.value) ? 'en' : 'zh'
		}
	},
	methods: {
		// 获取翻译数据
		async getTranslateData () {
			let appid = '20200303000391987',
				from = 'auto',
				salt = '3456',
				sign = md5(appid + this.value + salt + 'RGOnevMzjIctm4bDGy07') // md5加密

			try {
				const { data } = await axios({
					url: `/baidu?q=${this.value}&from=${from}&to=${this.to}&appid=${appid}&salt=${salt}&sign=${sign}`,
					method: 'get',
				})
				this.length = data.trans_result[0].dst.length
				if (this.to === 'zh') {
					if (this.length > 86) {
						this.reply = data.trans_result[0].dst.slice(0, 86) + '...'
					} else {
						this.reply = data.trans_result[0].dst
					}
				} else {
					if (this.length > 154) {
						this.reply = data.trans_result[0].dst.slice(0, 154) + '...'
					} else {
						this.reply = data.trans_result[0].dst
					}
				}
			} catch (e) {
				console.log(e)
				this.reply = ''
			}
		},
		// 机器人
		async robot () {
			try {
				const { data } = await axios({
					method: 'get',
					url: `/robot?key=free&appid=0&msg=${encodeURI(this.value)}`
				})

				if (data.result === 0) {
					this.length = data.content.length
					this.reply = data.content
				}
			} catch (e) {
				console.log(e)
			}
		},
		// 获取数据
		getData () {
			if (this.radio === 1) {
				this.getTranslateData()
			} else {
				this.robot()
			}
		},
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/color/index.scss'; // 使用方法

.bubble {
    top: -50%;
    width: 100px;
    height: 100px;
    position: absolute;
    transition: opacity .5s .5s linear;
    transform: translate(60%, -120%);

    &::before {
        width: 10%;
        height: 10%;
        content: "";
        bottom: 0;
        opacity: 0;
        position: absolute;
        border-radius: 50%;
        transition: opacity .2s 0s linear;
        border: 1px solid $border-color;
        transform: translate(-100%, 366%);
    }

    &::after {
        width: 20%;
        height: 20%;
        content: "";
        bottom: 0;
        opacity: 0;
        position: absolute;
        border-radius: 50%;
        transition: opacity .3s .2s linear;
        transform: translate(-14%, 112%);
        border: 1px solid $border-color;
	}

	&.no {
		&::before, &::after {
			opacity: 0 !important;
		}
	}

    div {
        width: 100%;
        height: 100%;
		opacity: 0;
		padding: 20px;
		font-size: 12px;
		line-height: 22px;
		text-align: center;
        border-radius: 50%;
		box-sizing: border-box;
        transition: opacity .5s .5s linear;
		border: 1px solid $border-color;
	}

	p {
		width: 208%;
		height: 161%;
		padding: 10px;
		opacity: 0;
		text-indent: 14px;
		box-sizing: border-box;
		border: 1px solid #ddd;
		transition: opacity .5s 1s linear;
	}
}

.robot {
    top: 60%;
	right: 30px;
	z-index: 9999;
    position: fixed;
    transform: translateY(-50%);

    .my-icon-jiqiren {
        font-size: 50px;
        cursor: pointer;
		color: $theme-color2;
    }

	&:hover {
		.input-box {
            opacity: 1;
		}

		&.active {
			.bubble {
				div, p, &::before, &::after {
					opacity: 1;
				}
			}
		}
	}

    .input-box {
        opacity: 0;
        display: inline;
        position: relative;
        transition: opacity .5s 0s linear;

        input {
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            border-radius: 5px;
        }

        &::before {
            content: '';
            right: 100%;
            top: -6px;
            width: 9px;
            height: 10px;
            // border-width: 0;
            position: absolute;
            color: $theme-color;
            // border-style: solid;
			border: 0 solid transparent;
			border-bottom-width: 7px;
            border-radius: 0 0 0 32px;
            // border-color: transparent;
            border-bottom-color: currentColor;
        }
    }

	.tips {
		padding: 10px;
		display: none;
		position: absolute;
		border-radius: 5px;
		background-color: #fff;
		transform: translateX(-100%);
		box-shadow: -2px 1px 8px -3px black;

		&.block {
			display: block;
		}

		&::after{
			content:'';
			position:absolute;
			left:100%;
			top:0px;
			width:16px;
			height:16px;
			border-width:0;
			border-style:solid;
			border-color:transparent;
			border-bottom-width:10px;
			border-bottom-color: #dddddd;
			border-radius:0 0 32px 0;
			color:#dddddd;
		}

		p {
			margin-bottom: 10px;
		}
	}
}
</style>
