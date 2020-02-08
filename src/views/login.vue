<template>
    <div class="login">
        <el-form class="login-form" ref="form" :rules="rules" label-position="top" :model="form" label-width="80px" @submit.native.prevent :hide-required-asterisk="true">
			<el-tabs v-model="activeName" @tab-click="resetForm">
				<el-tab-pane label="用户登录" name="login">
				</el-tab-pane>
				<el-tab-pane label="用户注册" name="register">
				</el-tab-pane>
				<template v-if="activeName === 'login'">
					<el-form-item label="用户名" prop="username">
						<el-input class="box-show-inster" v-model="form.username" v-focus maxlength="20">
							<span slot="suffix">{{ form.username.length }}/20</span>
						</el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input type="password" class="box-show-inster" v-model="form.password" @keyup.enter.native="login"></el-input>
						<!-- 这个是为了去掉浏览器默认的自动填充，这些都是在登录成功后点击浏览器默认的保存密码是才会出现的，不保存密码，则不会出现这种情况 -->
						<!-- <input type="password" autocomplete="new-password" style="display: none"/> -->
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="login" class="btn-login">登录</el-button>
					</el-form-item>
				</template>
				<template v-else>
					<el-form-item label="用户名" prop="username" key="username">
						<el-input v-model="form.username" type="text" autocomplete="off" v-focus maxlength="20">
							<span slot="suffix">{{ form.username.length }}/20</span>
						</el-input>
					</el-form-item>
					<el-form-item label="昵称" key="alias">
						<el-input v-model="form.alias" type="text"  maxlength="20">
							<span slot="suffix">{{ form.alias.length }}/20</span>
						</el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password" key="password">
						<el-input :type="type.password" @focus="passwordFocus" ref="password" autocomplete="off" v-model="form.password"></el-input>
						<!-- 这个是为了去掉浏览器默认的自动填充，这些都是在登录成功后点击浏览器默认的保存密码是才会出现的，不保存密码，则不会出现这种情况 -->
						<input type="password" autocomplete="new-password" style="display: none"/>
					</el-form-item>
					<el-form-item label="确认密码" autocomplete="off" prop="confirmPassword" key="passwords">
						<el-input :type="type.confirmPassword" @focus="confirmPasswordFocus" ref="confirmPassword" v-model="form.confirmPassword" @keyup.enter.native="register"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="register" class="btn-login">注册</el-button>
					</el-form-item>
				</template>
			</el-tabs>
        </el-form>
    </div>
</template>

<script>
export default {
	name: 'login',
	data() {
		var username = async (rule, value, callback) => {
			if (value) {
				// 如果是登录,则不需要下面的验证
				if (this.activeName === 'login') {
					callback()
					return false
				}
				try {
					// 验证用户名是否重复
					const { data } = await this.$http.get(`user/userNameValidation?userName=${value}`)
					if (data.status) {
						callback()
					} else {
						callback(new Error('此用户名已被使用，请重新设置用户名'))
					}
				} catch (e) {
					console.log(e, '多半是接口问题')
					callback(new Error('请重试'))
				}
			} else {
				callback(new Error('请输入用户名'))
			}
		}
		var confirmPassword = (rule, value, callback) => {
			console.log(value, 'password')
			if (value) {
				// 验证用户名是否重复
				if (value === this.form.password) {
					callback()
				} else {
					callback(new Error('两次密码不一致'))
				}
			} else {
				return callback(new Error('请输入密码'))
			}
		}
		return {
			form: {
				alias: '',
				username: '',
				password: '',
				confirmPassword: '',
			},
			activeName: 'login',
			rules: {
				name: [
					{ trigger: 'change', message: '请输入用户名', required: true },
				],
				username: [
					{ validator: username, trigger: 'change', required: true }
				],
				password: [
					{ trigger: 'change', message: '请输入密码', required: true },
				],
				confirmPassword: [
					{ validator: confirmPassword, trigger: 'change', required: true }
				]
			},
			currentTimer: null,  // 流星雨的定时器
			type: {
				password: 'text',
				confirmPassword: 'text',
			},
			lock: true
		}
	},
	created() {
		this.meteorShower()
	},
	beforeDestroy() {
		// 如果不清除, 那么跳转到其他页面是还是会出现流星雨的效果，因为
		// 1、setInterval事件和组件的生命周期没有直接关系。
		// 2、setInterval会返回一个ID 值。setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭
		clearInterval(this.currentTimer) // 关闭流星雨效果
	},
	methods: {
		// 登录
		async login() {
			// 表单验证
			const rules = await this.Global.verification(this, 'form')
			if (!rules) {
				return false
			}
			let postData = {
				username: this.form.username,
				password: this.form.password
			}
			const data = await this.$http.post('login', postData)
			// 当请求结束后才会执行下面的代码, 下面的代码相当于写在了回调函数中
			if (data.data.status === 200) {
				// 弹出提示框
				this.$message({
					type: 'success',
					message: data.data.msg,
					center: true
				})

				// 保存 token
				localStorage.setItem('token', data.data.token)

				// 跳转页面
				this.$router.push({
					name: 'admin'
				})
			} else {
				// 弹出提示框
				this.$message({
					type: 'error',
					message: data.data.msg,
					center: true
				})
			}
		},
		// 流星
		meteorShower(parameter) {
			let pt = {
				eachStep: 5, // 流星每次移动的距离
				eachTime: 30, // 流行每 30 毫秒走一步
				st: { // 流星顶部开始的范围（随机值
					max: 200,
					min: 0
				},
				sl: { // 流星距离左边开始的范围（随机值
					max: window.screen.width,
					min: 300
				},
				et: { // 流星顶部结束的范围（随机值
					max: -400,
					min: 0
				},
				el: { // 流星距离左边结束的范围（随机值
					max: 1100,
					min: 300
				},
				meteorNumber: { // 流星1秒出现的个数
					max: 5,
					min: 2,
					time: 1000
				}
			}

			for (const key in parameter) {
				pt[key] = parameter[key]
			}

			function randomDistance(max, min) { // 封装随机数方法
				let distance = Math.floor(Math.random() * (max - min + 1) + min)
				return distance
			}

			const body = document.getElementsByTagName('body')[0]

			let meteorEffect = function () { // 流星雨效果
				let meteor = document.createElement('div')
				meteor.className = 'meteor' // 设置类名
				body.appendChild(meteor) // 追加到 body 中

				let startTop = randomDistance(pt.st.max, pt.st.min) // 流星顶部开始的范围（随机值
				let startLeft = randomDistance(pt.sl.max, pt.sl.min) // 流星距离左边开始的范围（随机值
				let endTop = randomDistance(pt.et.max, pt.et.min) // 流星顶部结束的范围（随机值
				let endLeft = randomDistance(pt.el.max, pt.el.min) // 流星距离左边结束的范围（随机值
				let x = Math.abs(endTop - startTop) / pt.eachStep // 没次步数的距离
				let stepNumber = x * 0.6 // 步数的60%
				let recordStepNumber = 0 // 记录步数
				let frontOpacity = 1 / stepNumber // 每次步数的透明度 60%
				let afterOpacity = 1 / (x * 0.4) // 每次步数的透明度 40%
				let opacityValue = 0 // 记录当前透明度
				meteor.style.top = startTop + 'px' // 设置初始位置
				meteor.style.left = startLeft + 'px' // 设置初始位置

				let coreFn = function (endTop, endLeft) {
					let timeId = setInterval(function () {
						recordStepNumber++ // 步数自加
						if (recordStepNumber < stepNumber) { // 处理 透明度的效果
							opacityValue += frontOpacity // 透明度 叠加
							meteor.style.opacity = opacityValue
						} else {
							opacityValue -= afterOpacity // 透明度递减
							meteor.style.opacity = opacityValue
						}

						if (endTop < startTop) {
							startTop = startTop - pt.eachStep
						} else {
							clearInterval(timeId)
							meteor.remove() // 删除流星
						}

						meteor.style.transform =
									` rotate(-45deg) translate3d(${startTop}px, 3px, 0)`
					}, pt.eachTime)
				}
				coreFn(endTop, endLeft)
			}

			let delay = function () { // 延迟流星的生成
				if (document.hidden === false) {
					setTimeout(function () {
						meteorEffect()
					}, Math.random() * 10)
				} else {
					return false
				}
			}

			this.currentTimer = setInterval(delay, pt.meteorNumber.time)

			document.addEventListener('visibilitychange', function () { // 浏览器切换事件
				if (document.visibilityState === 'hidden') { // 状态判断
					this.currentTimer = setInterval(delay, pt.meteorNumber.time) // 进入当前页面，开启流星雨效果
				} else { // 切换出当前页面
					clearInterval(this.currentTimer) // 关闭流星雨效果
				}
			})
		},
		// 注册
		async register() {
			// 表单验证
			const rules = await this.Global.verification(this, 'form')
			if (rules) {
				let postData = {
					alias: this.form.alias,
					userName: this.form.username,
					password: this.form.password,
				}
				try {
					const { data } = await this.$http.post('user/addUser', postData)
					if (data.status === 200) {
						this.$message.success('注册成功,请登录~')
						location.reload()
					}
				} catch (e) {
					console.log(e)
				}
			}
		},
		// 清空验证
		resetForm() {
			this.form.username = ''
			this.form.password = ''
			this.form.confirmPassword = ''
			this.$refs.form.resetFields()
		},
		// 这个是为了去掉浏览器默认的提示
		passwordFocus() {
			if (String(this.form.password).length === 0) {
				if (this.lock) {
					this.$refs.password.blur()
					this.lock = false
					setTimeout(() => {
						this.type.password = 'text'
						this.$refs.password.focus()
						this.lock = true
					})
				}
			}
		},
		confirmPasswordFocus() {
			if (String(this.form.confirmPassword).length === 0) {
				if (this.lock) {
					this.$refs.confirmPassword.blur()
					this.lock = false
					setTimeout(() => {
						this.type.confirmPassword = 'text'
						this.$refs.confirmPassword.focus()
						this.lock = true
					})
				}
			}
		}
	},
	watch: {
		// 这个是为了去掉浏览器默认的提示
		'form.password': function(value, v2) {
			if (this.activeName === 'login') {
				return false
			}
			if (String(value).length > 0) {
				setTimeout(() => {
					this.type.password = 'password'
				})
			} else if (this.$refs.password) {
				this.$refs.password.blur()
				this.lock = false
				setTimeout(() => {
					this.type.password = 'text'
					this.$refs.password.focus()
					this.lock = true
				})
			}
		},
		'form.confirmPassword': function(value) {
			if (this.activeName === 'login') {
				return false
			}
			if (String(value).length > 0) {
				setTimeout(() => {
					this.type.confirmPassword = 'password'
				})
			} else if (this.$refs.confirmPassword) {
				this.$refs.confirmPassword.blur()
				this.lock = false
				setTimeout(() => {
					this.type.confirmPassword = 'text'
					this.$refs.confirmPassword.focus()
					this.lock = true
				})
			}
		}
	},
}

</script>

<style lang="scss" scoped>
.login {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #5f9ee4;
	background: url(../assets/backgroundImages/login.jpg) no-repeat;
	background-size: cover;
}

.login .login-form {
	width: 400px;
	padding: 20px;
	border-radius: 5px;
	background-color: #fff;

	.box-show-inster >>> input {
		box-shadow: 0 0 0 1000px #fff inset;
	}
}

.login .login-form .btn-login {
	width: 100%;
}

</style>

<style>
    .meteor {
        opacity: 0;
        z-index: 99;
        position: fixed;
        border: 0px solid #fff;
        border-width: 0px 90px 2px 90px;
        box-shadow: 0 0 1px 0 rgba(255, 255, 255, .1);
        transform: rotate(-45deg) translate3d(1px, 3px, 0);
        /*变形*/
        border-color: transparent transparent transparent rgba(255, 255, 255, .5);
    }

</style>
