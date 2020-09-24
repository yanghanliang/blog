<template>
    <div class="robot">
        <div class="content">
			<template v-if="type === 1">
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
			</template>
			<template v-else>
				<div class="tips" v-if="onlineNumber">在线人数：{{ onlineNumber }}</div>
				<template v-for="(item, index) in chatRecord">
					<div :key="index">
						<div class="rc-right clearfix" v-if="id === item.id">
							<img class="head-portrait" v-if="item.headPortraitUrl" :src="Global.baseURL + item.headPortraitUrl" alt="头像">
							<div class="rcl-content">{{ item.content }}</div>
						</div>
						<div class="rc-left clearfix" v-else>
							<img class="head-portrait" v-if="item.headPortraitUrl" :src="Global.baseURL + item.headPortraitUrl" alt="头像">
							<div class="rcl-content">{{ item.content }}</div>
						</div>
					</div>
				</template>
			</template>
            <div class="show" ref="show"></div>
        </div>
        <div class="input-box clearfix">
            <div class="input" contenteditable="true" @input="textChange" ref="input" placeholder="发送：/switch 即可切换机器人和即时聊天功能~"></div>
            <button @click="send">发送</button>
        </div>
    </div>
</template>

<script>
import Global from '@/plugins/global'
const ws = new WebSocket(`ws://${Global.localhostIp}`)

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
			// 1-聊天机器人，2-即时通讯
			type: 1,
			id: '',
			// 头像列表
			headPortraitList: ['a.jpg', 'b.jpg', 'c.jpg', 'd.jpeg'],
			// 在线人数
			onlineNumber: '',
			// 聊天记录
			chatRecord: [],
		}
	},
	created () {
		this.websoket()
	},
	methods: {
		// 获取数据
		async send () {
			if (this.value === '/switch') {
				let text = ''
				if (this.type === 1) {
					this.type = 2
					text = '即时通讯'
				} else {
					this.type = 1
					text = '机器人'
				}
				const h = this.$createElement
				// 通知
				this.$notify({
					offset: 100,
					duration: 2000,
					title: '切换成功',
					message: h('i', { style: 'color: teal; font-style: normal;' }, `(｡･∀･)ﾉﾞ当前是${text}~`)
				})
				this.value = ''
				this.$refs.input.innerText = ''
				this.$refs.input.focus()
				return
			}

			if (this.type === 1) {
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
			} else {
				let req = JSON.stringify({
					id: this.id,
					content: this.value
				})
				ws.send(req)
				this.$refs.input.innerText = ''
			}
			this.value = ''
			this.$refs.input.focus()
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
		},
		// 即时通讯
		websoket () {
			if (window.WebSocket) {
				ws.onopen = (e) => {
					// console.log('连接服务器成功')
				}

				ws.onclose = function (e) {
					// console.log('服务器关闭')
				}

				ws.onerror = function () {
					// console.log('连接出错')
				}

				// 收到消息处理
				ws.onmessage = (res) => {
					// mess.innerHTML = '连接成功'
					let resData = JSON.parse(res.data)
					// 第一次连接
					if (!this.id) {
						this.id = resData.id
						this.chatRecord = resData.chatRecord || []
						this.onlineNumber = resData.length
					}

					if (resData.type === 1) {
						// 消息
						resData.content && this.chatRecord.push(resData)
						// 自动滚动到底部
						this.bottomSetting()
					} else {
						const h = this.$createElement
						const text = resData.type === 2 ? '登录' : '跑'
						this.onlineNumber = resData.length
						// 通知
						this.$notify({
							offset: 100,
							duration: 2000,
							title: '有新消息~',
							message: h('i', { style: 'color: teal; font-style: normal;' }, `(｡･∀･)ﾉﾞ嗨！有人${text}了噢~`)
						})
					}
				}
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.robot {
    height: 100%;
    position: relative;
	background-image: url('../../../assets/backgroundImages/mobile/robot/xiong.jpeg');

    .content {
        height: 80%;
		padding: 10px;
		overflow: auto;
		position: relative;

		.tips {
			top: 20px;
			left: 50%;
			width: 100px;
			position: fixed;
			text-align: center;
			transform: translateX(-50%);
		}

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
					right: 1px;
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
        bottom: 0;
        max-height: 20%;
        padding: 10px 20px;
        position: absolute;
		box-sizing: border-box;

        .input {
            width: 86%;
            float: left;
            padding: 0 10px;
            min-height: 30px;
            line-height: 30px;
            outline-style: none;
			border-radius: 5px;
            background-color: #fff;
            caret-color: $theme-color2;
			border: 1px solid $border-color;

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
