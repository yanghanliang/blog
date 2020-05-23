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
            <div class="show" ref="show"></div>
        </div>
        <div class="input-box clearfix">
            <div class="input" contenteditable="true" @input="textChange" ref="input" placeholder="和机器人聊聊~"></div>
            <button @click="send">发送</button>
        </div>
    </div>
</template>

<script>
export default {
	data () {
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
			value: '',
		}
	},
	methods: {
		// 获取数据
		async send () {
			this.data.push({
				send: this.value,
				status: 0 // 发送是0，回复是1
			})
			this.$refs.input.innerText = ''
			this.bottomSetting()

			try {
				const { data } = await axios({
					method: 'get',
					url: `/robot?key=free&appid=0&msg=${encodeURI(this.value)}`
				})

				if (data.result === 0) {
					this.reply = data.content
					this.data.push({
						reply: data.content,
						status: 1 // 发送是0，回复是1
					})

					this.bottomSetting()
				}
			} catch (e) {
				console.log(e)
			}
			this.value = ''
		},
		// 实现数据双向绑定
		textChange () {
			this.value = this.$refs.input.innerText
		},
		// 置底
		bottomSetting () {
			// 让页面置底
			this.$nextTick(() => {
				this.$refs.show.scrollIntoView()
			})
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
		overflow: auto;
		position: relative;

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
            }
        }

        .rc-left {
            margin: 10px 0;
            .head-portrait {
                float: left;
                background-image: url('../../../assets/backgroundImages/headPortrait/lxl.gif');
            }

            .rcl-content {
                float: left;
                margin-left: 20px;
                background-color: #fff;

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
            margin: 10px 0;

            .head-portrait {
                float: right;
                background-image: url('../../../assets/backgroundImages/headPortrait/gn.jpeg');
            }

            .rcl-content {
                float: right;
                margin-right: 20px;
                background-color: #64edc0;

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
					border-left:10px solid #64edc0;
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
            caret-color: $theme-color2;
            outline-style: none;
            border-radius: 5px;
            background-color: #fff;

            /*为空时显示 element attribute content*/
            &:empty:before {
                content: attr(placeholder);
                color: $secondary;
            }
            /*焦点时内容为空*/
            &:focus:before {
                content: none;
            }
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
