# blog

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

***
# 开发笔记


+ main.js 是入口文件, 可在它里面调用自己的"样式"

## 1. 功能介绍

##  login 页面
  + 密码框回车登录
    + 验证用户名和密码
  + 输入框自动获取焦点
  + 点击登录
    + 验证用户名和密码

***


## 2. vue 中事件修饰符的使用
+ <el-input v-model="form.password" @keyup.enter.native="login"></el-input>
	+ @keyup.enter 是vue 封装的事件,添加 .native 可以将它转化为 DOM 原生的事件


***

## 3. 自定义指令(踩过的坑)

+ focus

在使用element-ui时,注册全局自定义指令,如 focus 添加后没有效果, 原因是element-ui渲染出来的结构是div中
嵌套input,将el.focus() 修改为 el.querySelector('input').focus() 即可

```html
<el-input v-model="form.username" ref="focus"></el-input>

渲染为:

<div data-v-7589b93f="" class="el-input">
  <!---->
  <input type="text" autocomplete="off" class="el-input__inner">
  <!----><!----><!---->
</div>
```

```
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.querySelector('input').focus()
  }
})
```



***