<template>
    <div class="login">
        <el-form class="login-form" ref="form" label-position="top" :model="form" label-width="80px">
            <h2>用户登录</h2>
            <el-form-item label="用户名">
                <el-input v-model="form.username" v-focus></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.password" @keyup.enter.native="login"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login" class="btn-login">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      const data = await this.$http.post('login', this.form)
      // 当请求结束后才会执行下面的代码, 下面的代码相当于写在了回调函数中
      if (data.data.status === 200) {
        // 弹出提示框
        this.$message({
          type: 'success',
          message: data.data.msg,
          center: true
        })

        // 保存 token
        sessionStorage.setItem('token', data.data.token)

        // 跳转页面
        this.$router.push({ name: 'admin' })
      } else {
        // 弹出提示框
        this.$message({
          type: 'error',
          message: data.data.msg,
          center: true
        })
      }
    }
  }
}
</script>

<style scoped>
.login {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #324152;
}

.login .login-form {
    width: 400px;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
}

.login .login-form .btn-login {
    width: 100%;
}
</style>
