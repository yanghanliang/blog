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
  created() {
    this.meteorShower()
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

      let current = setInterval(delay, pt.meteorNumber.time)

      document.addEventListener('visibilitychange', function () { // 浏览器切换事件
        if (document.visibilityState === 'hidden') { // 状态判断
          current = setInterval(delay, pt.meteorNumber.time) // 进入当前页面，开启流星雨效果
        } else { // 切换出当前页面
          clearInterval(current) // 关闭流星雨效果
        }
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
        background-color: #5f9ee4;
        background: url(../assets/backgroundImages/login.jpg) no-repeat;
        background-size: cover;
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
