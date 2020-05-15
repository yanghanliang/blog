<template>
    <div>

    </div>
</template>

<script>
export default {
	data() {
		return {
			scope: '<dogscope/>',
			challenge: '', // 后台返回挑战数据
			authCode: '', // 后台返回authCode
		}
	},
	methods: {
		checkDog() { // 检查超级狗
			let stat = ''
			if (this.authCode === '') {
				this.getAuthCode()
			}

			objAuth = getAuthObject()
			if (navigator.userAgent.indexOf('Chrome') > 0) {
				objAuth.GetUserNameEx(this.scope, this.authCode)
			} else {
				if (objAuth.hasOwnProperty('Open') === false) {
					this.$message.info('您未安装系统必需的控件')
					setTimeout(this.checkDog, 5000)
					return
				}
				stat = objAuth.Open(this.scope, this.authCode)
				if (stat !== 0) {
					this.$message.info(reportStatus(stat))
				}
				stat = objAuth.GetUserName()
				if (stat !== 0) {
					objAuth.Close()
					this.$message.info(reportStatus(stat))
					return false
				}
				this.uKeyForm.username = objAuth.UserNameStr
			}
			setTimeout(this.checkDog, 2000)
		},
		loadFunc() { // 加载相关函数
			if (navigator.userAgent.indexOf('Window') > 0) {
				if (navigator.userAgent.indexOf('Chrome') > 0) { // Chrome
					emitter.$on('message', (event) => {
						if (event.source !== window) {
							return
						}
						if (event.data.type === 'SNTL_FROM_HOST') {
							let ReturnText = event.data.text
							// 获取超级狗中返回的用户名
							if (ReturnText.InvokeMethod === 'GetUserNameEx') {
								if (ReturnText.Status === '0') {
									this.uKeyForm.username = ReturnText.UserNameStr
								} else {
									this.uKeyForm.userName = ''
									this.$message.info(reportStatus(parseInt(ReturnText.Status)))
								}
							} else if (ReturnText.InvokeMethod === 'GetDigestEx') { // 获取超级狗中返回的摘要加密串，发送到服务端验证
								if (ReturnText.Status === '0') {
									// 获取digest做验证操作
									this.uKeyDoAuth(ReturnText.DogIdStr, ReturnText.DigestStr)
								} else {
									this.$message.info(reportStatus(parseInt(ReturnText.Status)))
								}
							}
						}
					}, false, window)
				} else if (window.ActiveXObject || 'ActiveXObject' in window) { // IE
					// $scope.objAuth.SetCheckDogCallBack('insertDog', 'removeDog');
				}
				setTimeout(this.checkDog, 2000)
			} else if (navigator.userAgent.indexOf('Mac') > 0 || navigator.userAgent.indexOf('Linux') > 0) {
				setTimeout(this.checkDog, 2000)
			}
		},
		uKeyLogin(formName) { // 超级狗登录
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.uKeyForm.password.length < 6 || this.uKeyForm.password.length > 16) {
						this.$message.info(reportStatus(905))
						return false
					}
					// Get Object
					objAuth = getAuthObject()

					// Get Auth Code
					if (this.authCode === '') {
						this.getAuthCode()
					}
					if (navigator.userAgent.indexOf('Chrome') > 0) { // Chrome
						// Get challenge string
						if (this.challenge === '') {
							this.getChallenge()
						}
						if (this.challenge.indexOf('error') !== -1) {
							if (this.challenge.indexOf('undefined function dog_auth_get_challenge') !== -1) {
								this.$message.info(reportStatus(920))
							} else {
								this.$message.info(reportStatus(917))
							}
							objAuth.Close()
							return false
						} else if (this.challenge.indexOf('session_start') !== -1) {
							if (this.challenge.indexOf('No such file or directory') !== -1) {
								this.$message.info(reportStatus(919))
							} else {
								this.$message.info(reportStatus(917))
							}
							objAuth.Close()
							return false
						}
						objAuth.GetDigestEx(this.scope, this.authCode, this.uKeyForm.password, this.challenge)
						return false
					}
					if (!!window.ActiveXObject || 'ActiveXObject' in window) { // IE
						let stat = ''
						let dogID = ''
						// let digest = '';
						// Open the dog
						stat = objAuth.Open(this.scope, this.authCode)
						if (stat !== 0) {
							this.$message.info(reportStatus(stat))
							return false
						}

						// Verify the password
						stat = objAuth.VerifyUserPin(this.uKeyForm.password)
						if (stat !== 0) {
							objAuth.Close()
							this.$message.info(reportStatus(stat))
							return false
						}

						// Get the DogID
						stat = objAuth.GetDogID()
						if (stat !== 0) {
							objAuth.Close()
							this.$message.info(reportStatus(stat))
							return false
						}
						dogID = objAuth.DogIdStr
						if (this.challenge === '') {
							this.getChallenge()
						}
						if (this.challenge.indexOf('error') !== -1) {
							if (this.challenge.indexOf('undefined function dog_auth_get_challenge') !== -1) {
								this.$message.info(reportStatus(920))
							} else {
								this.$message.info(reportStatus(917))
							}
							objAuth.Close()
							return false
						} else if (this.challenge.indexOf('session_start') !== -1) {
							if (this.challenge.indexOf('No such file or directory') !== -1) {
								this.$message.info(reportStatus(919))
							} else {
								this.$message.info(reportStatus(917))
							}
							objAuth.Close()
							return false
						}
						// 获取digest
						stat = objAuth.GetDigest(this.challenge)
						if (stat !== 0) {
							objAuth.Close()
							this.$message.info(reportStatus(stat))
							return false
						}
						digest = objAuth.DigestStr
						this.uKeyDoAuth(dogID, digest)
					}
				} else {
					return false
				}
			})
		},
		uKeyDoAuth(dogId, digest) { // 超级狗验证
			loginService.uKeyLogin({
				dogid: dogId,
				digest: digest,
				challenge: this.challenge,
			}).then((res) => {
				// 验证成功
			}).catch(() => {
				this.$message.error('验证失败')
			})
		},
	},
}
</script>

<style lang="">

</style>
