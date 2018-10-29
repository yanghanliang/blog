<template>
    <div class="login">
        <el-form class="login-form" ref="form" label-position="top" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.username" autofocus></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" @keyup.enter.native="login"></el-input>
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
    login() {
      this.$http.post('http://localhost:3001/login', this.form)
        .then((req, res) => {
          if (req.data.state === 200) {
            // 弹出提示框
            this.$message({
              type: 'success',
              message: req.data.msg,
              center: true
            })

            // 保存 token
            window.sessionStorage.setItem('token', req.data.token)

            // 跳转页面
          } else {
            // 弹出提示框
            this.$message({
              type: 'error',
              message: req.data.msg,
              center: true
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
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
