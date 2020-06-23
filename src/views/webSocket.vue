<template>
    <div>
        <div id="mess">正在连接...</div>
        <div class="kuang">
            <div class="value" id="value1">小明小明</div>
            <div class="value" id="value2">大胸大胸</div>
            <div class="value" id="value3">小张小张</div>
        </div>
    </div>
</template>

<script>
export default {
	name: 'webSocket',
	mounted () {
		this.postData()
	},
	methods: {
		postData () {
			var mess = document.getElementById('mess')
			if (window.WebSocket) {
				var ws = new WebSocket('ws://127.0.0.1:8001')

				ws.onopen = function (e) {
					console.log('连接服务器成功')
					ws.send('game1')
				}
				ws.onclose = function (e) {
					console.log('服务器关闭')
				}
				ws.onerror = function () {
					console.log('连接出错')
				}

				ws.onmessage = function (e) {
					mess.innerHTML = '连接成功'
					console.log(e, 'e---没点')
					document.querySelector('.kuang').onclick = function (e) {
						var time = new Date()
						console.log(e, 'e???---点了')
						ws.send(time + '  game1点击了“' + e.target.innerHTML + '”')
					}
				}
			}
		}
	},
}
</script>

<style lang="scss" scoped>
</style>
