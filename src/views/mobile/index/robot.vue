<template>
    <div class="robot">
        <div class="content">
            <template v-for="(item, index) in data">
				<div :key="index">
					<div class="rc-left clearfix" v-if="item.status === 0">
						<div class="head-portrait"></div>
						<div class="rcl-content">{{ item.send }}</div>
					</div>
					<div class="rc-right clearfix" v-else>
						<div class="head-portrait"></div>
						<div class="rcl-content">{{ item.reply }}</div>
					</div>
				</div>
            </template>
        </div>
        <div class="input-box clearfix">
            <div class="input" contenteditable="true" @input="textChange" ref="input"></div>
            <button @click="send">发送</button>
        </div>
    </div>
</template>

<script>
export default {
	data() {
		return {
			data: [
				// {
				// 	send: '看到开发商的链接放到手机里四点九分零四',
				// 	status: 0
				// },
				// {
				// 	reply: 'reply看到开发商的链接放到手机里四点九分零四',
				// 	status: 1
				// }
			],
			value: '我喜欢你',
		}
	},
	methods: {
		async send() {
			this.data.push({
				send: this.value,
				status: 0 // 发送是0，回复是1
			})
			this.value = ''
			this.$refs.input.innerText = ''

			try {
				const { data } = await axios({
					method: 'get',
					url: `/robot?key=free&appid=0&msg=${this.value}`
				})

				if (data.result === 0) {
					this.reply = data.content
					this.data.push({
						reply: data.content,
						status: 1 // 发送是0，回复是1
					})
				}
			} catch (e) {
				console.log(e)
			}
		},
		textChange() {
			this.value = this.$refs.input.innerText
		}
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/color/index.scss'; // 使用方法

.robot {
    height: 100%;
    position: relative;

    .content {
        height: 80%;
        padding: 10px;

        .rc-left, .rc-right {
            .head-portrait {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 2px solid #ddd;
                background-size: cover;
            }

            .rcl-content {
                min-height: 20px;
                max-width: 50%;
                padding: 10px;
                position: relative;
                border-radius: 5px;
                background-color: #fff;
            }
        }

        .rc-left {
            text-align: left;

            .head-portrait {
                float: left;
                background-image: url('../../../assets/backgroundImages/headPortrait/lxl.gif');
            }

            .rcl-content {
                float: left;
                margin-left: 20px;

                &::before {
                    content:'';
					width:0px;
					height:0px;
					position: absolute;
					left: 0;
					transform: translateX(-100%);
					border-top:10px solid transparent;
					border-right:10px solid #fff;
					border-bottom:10px solid transparent;
					border-left:10px solid transparent;
                }
            }
        }

        .rc-right {
            text-align: right;
            margin: 10px 0;

            .head-portrait {
                float: right;
                background-image: url('../../../assets/backgroundImages/headPortrait/gn.jpeg');
            }

            .rcl-content {
                float: right;
                margin-right: 20px;

                &::before {
					content:'';
					width:0px;
					height:0px;
					position: absolute;
					right: 0;
					transform: translateX(100%);
					border-top:10px solid transparent;
					border-right:10px solid transparent;
					border-bottom:10px solid transparent;
					border-left:10px solid #fff;
                }
            }
        }
    }

    .input-box {
        width: 100%;
        max-height: 20%;
        bottom: 0;
        padding: 10px;
        box-sizing: border-box;
        position: absolute;

        .input {
            width: 80%;
            min-height: 30px;
            padding: 0 5px;
            line-height: 30px;
            float: left;
            outline-style: none;
            border-radius: 5px;
            background-color: #fff;
        }

        button {
            float: right;
            color: #fff;
            padding: 0 10px;
            height: 30px;
            line-height: 30px;
            border-radius: 5px;
            background-color: $theme-color;
        }
    }
}
</style>
