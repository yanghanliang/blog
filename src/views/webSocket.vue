<template>
    <div class="websocket">
        <div class="tips" v-if="onlineNumber">在线人数：{{ onlineNumber }}</div>
		<div class="list clearfix scrollbar">
			<div v-for="(item, index) in chatRecord" :key="index" :class="['list-item', id === item.id ? 'ta-right' : '']">
				<template v-if="id === item.id">
					<span>{{ item.content }}：</span>
					<img v-if="item.headPortraitUrl" :src="item.headPortraitUrl" alt="头像">
				</template>
				<template v-else>
					<img v-if="item.headPortraitUrl" :src="item.headPortraitUrl" alt="头像">
					<span>：{{ item.content }}</span>
				</template>
			</div>
			<div ref="bottom"></div>
		</div>
		<div class="clearfix">
			<el-input class="w80 fl" ref="input" v-model="message" placeholder="请输入内容" @keyup.enter.native="send"></el-input>
			<el-button class="w20 fr" @click="send">发送</el-button>
		</div>
    </div>
</template>

<script>
import Global from '@/plugins/global'
const ws = new WebSocket(`ws://${Global.localhostIp}`)

export default {
	name: 'webSocket',
	data () {
		return {
			// 聊天记录
			chatRecord: [],
			message: '',
			id: '',
			// 头像列表
			headPortraitList: ['a.jpg', 'b.jpg', 'c.jpg', 'd.jpeg'],
			// 在线人数
			onlineNumber: ''
		}
	},
	mounted () {
		this.postData()
	},
	methods: {
		postData () {
			// var mess = document.getElementById('mess')
			if (window.WebSocket) {
				ws.onopen = (e) => {
					// console.log('连接服务器成功')
					// let sendData = JSON.stringify({
					// 	headPortraitList: this.headPortraitList[index%4]
					// })
					// ws.send(sendData)
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
					console.log(res.data, 'res.data')
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
						this.$nextTick(() => {
							this.$refs.bottom.scrollIntoView()
						})
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
		// 发送聊天消息
		send () {
			let req = JSON.stringify({
				id: this.id,
				content: this.message
			})
			ws.send(req)
			this.message = ''
			this.$refs.input.focus()
		}
	},
}
</script>

<style lang="scss" scoped>
.websocket {
	width: 500px;
	padding: 10px;
	border-radius: 5px;
	margin: 100px auto;
	border: 1px solid $border-color;

	@media (max-device-width: 435px) {
		width: 300px;
	}

	.tips {
		text-align: center;
	}

	.w80 {
		width: 80%;
	}

	.w20 {
		width: 20%;
	}

	.list {
		height: 300px;
		overflow: auto;

		.list-item {
			img {
				width: 50px;
				border-radius: 50%;
			}

			span {
				line-height: 59px;
				display: inline-block;
				vertical-align: top;
			}
		}
	}
}
</style>
