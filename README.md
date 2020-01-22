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
  <input type="text" autocomplete="off" class="el-input__inner">
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

## vue 操作“动态数据渲染”出来的 DOM

> 借助 `highlight.js` 插件实现代码高亮

### 关键点

+ 添加序列号 （可以不用考虑 vue）
  + 去除两边的换行 (为了下面的`html`结构好看-换行书写-于是引出以下问题)
    + 因为下面还需要使用正则,所以一开始我想用正则匹配，于是发现了 `/^a(.*)a$/` 
    ```js
      var str = 'abcdehjjsajhjjajhja' 
      str.replace(/^a(.*)a$/, function(input, $1){return $1}) // 可以获得去除两边a后的字符串 bcdehjjsajhjjajhj
    ```
      + 然后出现一个问题,正则怎么匹配 "包括换行"的任意字符(除换行外的任意单个字符是 . )
        + 发现: [\d\D] [\s\S] [\g] [.] [a] 很多中括号中添加绝大多数字符,都能匹配包括换行的任意字符
          + str.replace(/^\n([\d\D]*)\n$/, function(input, $1) {return $1}) 最开始我没想出来,于是有了下一种方法
      + 直接简单粗暴的猜想
        + `str.trim()` 可以去除字符串两边的空格, 所以我用它来验证我的猜想(去除两边的换行和空格),事实证明确实可以

> 虽然想得复杂了,但是我第一次发现 replace 还能这么写, trim 还可以这么用 以及如何匹配包括换行的任意字符和匹配任意两端字符的方法

```html
<section>
  <pre>
    <code>
  var box = document.querySelect('.box')
  box.onclick = function() {
      console.log("hh")
  }
    </code>
  </pre>
</section>
```

```js

let str = document.getElementsByTagName('code').innerText.trim()
item.innerHTML = '<ol><li>  ' + str.replace(/\n/g, '\n</li><li>  ') + '\n</li></ol>'

```
+ 复制 (需要考虑 vue)
  + 点击复制按钮实现，将当前的代码块复制上
```js
let str = item.innerText.trim()
item.innerHTML = '<ol><li>  ' + str.replace(/\n/g, '\n</li><li>  ') + '\n</li></ol><div class="copy" style="top: 10px; right: 20px; color: #333; font-size: 12px; cursor: pointer; position: absolute; padding: 2px 10px; text-align: center; border-radius: 3px; background-color: #fff; font-family: 微软雅黑, 宋体;">复制</div>'
```        
  + 单纯的实现点击复杂当前按钮下的代码块,很简单(不考虑 vue)
    + 直接写一个方法在 <javascript>function copy(that) {}</javascript>
    + <div onclick="copy(this)"> 在 div 中添加点击事件
  + 在 vue 中这样写是不对的, 会提示找不到 copy 或者说他不是一个方法
    + 不考虑动态渲染数据,可以添加自定义指令的方法来实现
      + 可参考一下博文 https://blog.csdn.net/littlebearGreat/article/details/81131463
      + 在不断尝试中发现 自定义方法也是可以的, 以及了解到 watch
        ```vue
          // 监听一个数据的变化， 变化时立即执行以下方法（不推荐使用箭头函数）
          watch: {
            a: function (val, oldVal) {
              console.log('new: %s, old: %s', val, oldVal)
          }


          // 发送请求获取数据之后，操作DOM， 使用这个方法比较好
          // DOM 还没有更新
          this.$nextTick(function () {
            // DOM 现在更新了
            // `this` 绑定到当前实例
            this.doSomethingElse()
          })
        ```
      + this.$nextTick() 考虑代码块可能是在动态渲染出来的DOM元素中,于是有了这个方法
        + 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
  + 复制需要两个方法
    + `document.getElementsByTagName('textarea').select()`
      + 选择对象 - 好像只有表单元素才有这个方法, 如: input textarea (头铁般的试出来的)
    + `document.execCommand('Copy')`
      + 复制成功返回一个 `true` (Boolean)

+ 下载 highlight.js
npm install highlight.js --save

+ 添加自定义方法
plugins/highlight.js 自己写的自定义方法
```js
// 引入highlight.js 插件(需要安装)
import Hljs from 'highlight.js'
// 引入自己喜欢的 主题(样式)
import 'highlight.js/styles/dark.css'

let Highlight = {}
Highlight.install = function (Vue) {
  // 先有数据再绑定，调用highlightA
  Vue.prototype.code_highlight = function(el) {
    // 等待下一次更新结束后执行
    this.$nextTick(function() {
      // 获取当前下的所有代码块
      let code = el.querySelectorAll('code')
      for (let i = 0; i < code.length; i++) {
        const item = code[i]
        // 获取代码块元素中的代码内容,并且去除两边的空格和换行
        let str = item.innerText.trim()
        item.innerHTML = '<ol><li>  ' + str.replace(/\n/g, '\n</li><li>  ') + '\n</li></ol><div class="copy" style="top: 10px; right: 20px; color: #333; font-size: 12px; cursor: pointer; position: absolute; padding: 2px 10px; text-align: center; border-radius: 3px; background-color: #fff; font-family: 微软雅黑, 宋体;">复制</div>'
        // 代码高亮
        Hljs.highlightBlock(item)

        // 实现点击复制的功能
        let copy = el.querySelector('.copy')
        copy.onclick = function() {
          var that = this
          // 创建一个文本域
          var textarea = document.createElement('textarea')
          textarea.value = this.parentElement.querySelector('ol').innerText
          document.body.appendChild(textarea) // 文本域 可以保留代码块中的换行
          textarea.select() // 选择对象 - 好像只有表单元素才有这个方法, 如: input textarea
          if (document.execCommand('Copy')) { // 执行浏览器复制命令
            this.innerText = '复制成功'
            setTimeout(function() {
              that.innerText = '复制'
            }, 1000)
          }
          textarea.remove() // 删除不必要的 html 结构
        }
      }
    })
  }
}

// 导出自定义方法
export default Highlight
```
+ 在 main.js 中

```js
// highlight.js代码高亮指令
import Highlight from './plugins/highlight'

// 调用 highlight.js 代码高亮插件
Vue.use(Highlight)
```
+ 在组件中使用
```js
export default {
  name: 'articles_details',
  components: {
    myHeader,
    myFooter,
    category
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const data = await this.$http.get(`articleDetakils/${this.$route.params.articleId}`)
      this.$refs.articleContent.innerHTML = data.data[0].content
      this.code_highlight(this.$refs.articleContent) // 代码高亮
    }
  }
}
```

## 字符串拼接

```js

var startIndex = str.indexOf('_0"')
var middleIndex = str.indexOf('</h', startIndex) // 找到需要的拼接点
var startStr = str.substr(0, middleIndex)
var middleStr = str.substr(middleIndex)
this.form.content = startStr + '<i class="icon original" title="原创">&#xe612;</i>' + middleStr

```

## mavonEditor

> https://blog.csdn.net/wn1245343496/article/details/82147850 参考文档

> 去除加载时的 transition 效果

+ 找到 node_modules/mavon-editor/dist/mavon-editor.js
+ 搜索下面这段代码，然后删除 transition 属性即可

```
-ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-transition: all 0.3s linear 0s;\n  transition: all 0.3s linear 0s;\n  background: #fff;\n  z-index: 1500;\n

```

##
里层div的高度始终与外层div的高度一样
解决方案: 利用绝对定位;top的值为0,bottom的值也为0 即可让里层div的高度与外层的高度一样


##

+ 浏览器提示：

element-ui.common.js?ccbf:10621 [Violation] Added non-passive event listener to a scroll-blocking 'mousewheel' event. Consider marking event handler as 'passive' to make the page more responsive. See https://www.chromestatus.com/feature/5745543795965952

+ 进入上面的网站查看 ：

被动事件监听器： 
在EventListenerOptions字典中公开“被动”布尔值。实现关于调度被动EventListeners的行为，以便在执行被动注册的回调内部调用preventDefault只会向控制台生成警告。可用于显着提高滚动性能。

解决：
http://www.it1352.com/818517.html

简而言之：
document.addEventListener（'touchstart'，handler，true）;
变成这样： 
document.addEventListener（'touchstart'，handler，{capture：true}）;
因为在您的情况下，您将触发器的事件监听器附加到它应该是这样的：
document.addEventListener（'touchstart'，handler，{passive：true}）; 


我是找到提示的文件
+ node_modules/element-ui/lib/element-ui.common.js

找到这个方法（10619行
var mousewheel = function mousewheel(element, callback) {
  if (element && element.addEventListener) {
    element.addEventListener(isFirefox ? 'DOMMouseScroll' : 'mousewheel', function (event) {
      var normalized = (0, _normalizeWheel2.default)(event);
      callback && callback.apply(this, [event, normalized]);
    });
  }
};

改为：

var mousewheel = function mousewheel(element, callback) {
  if (element && element.addEventListener) {
    element.addEventListener(isFirefox ? 'DOMMouseScroll' : 'mousewheel', function (event) {
      var normalized = (0, _normalizeWheel2.default)(event);
      callback && callback.apply(this, [event, normalized]);
    }, {passive:true});
  }
};



+ 浏览器提示
[Violation] Added non-passive event listener to a scroll-blocking 'touchmove' event. Consider marking event handler as 'passive' to make the page more responsive. See https://www.chromestatus.com/feature/5745543795965952

+ node_modules/element-ui/lib/utils/popup/popup-manager.js

modalDom.addEventListener('touchmove', function (event) {
  event.preventDefault();
  event.stopPropagation();
});

modalDom.addEventListener('touchmove', function (event) {
  event.preventDefault();
  event.stopPropagation();
}, {passive: true});


就不会有提示了


## 表格

> 使用 element-ui 想让表格出现滚动条,必须给每一个列都设置宽度

## 遇到过这个问题

我的情况是: 当dialog出现时, 页面右边缩小了5px, 看起来像是楼主所说的抖动了一下.然后我看了一下页面的样式,发现body多了样式样式,padding-right:5px 和 overflow: hidden.
然后我就在全局设置body的padding-right:0 !important 就好了!


## 搜索

+ 可以按照"标题"||"内容"||"分类"||"文章简介"进行搜索
+ 如果搜索不到则自动跳转百度进行搜索

```js
 window.open(`https://www.baidu.com/s?wd=${message.data}`, '_blank') // 在新窗口中打开链接
```

+ `@keyup.enter.native="searchFn"`  回车时才执行
+ `@input="searchFn"` 为了提高用户体验我使用了,input值一改变就去执行
  + `element` 中 `input` 的 `change` 事件是移除焦点才触发


> 想要变成输入就触发：使用 `@input`


## 路由

要解决的问题是在进入页面或加载某一父级路由时默认加载其某一特定路由． 
进入 /admin 时,默认进入他下面的字路由 articleList

加上 `redirect: '/admin/articleList'`, 

设置 `redirect` 属性为对应子路由路径, 即转发到默认的子路由路径即可

```router/index.js

{
      path: '/admin',
      name: 'admin',
      component: admin,
      redirect: '/admin/articleList', // 加上这行代码即可
      children: [
        {
          path: 'addArticle',
          name: 'addArticle',
          component: addArticle
        },
        {
          path: 'articleList',
          name: 'articleList',
          component: articleList
        },
        {
          path: 'addArticle/:articleId',
          name: 'editArticle',
          component: addArticle
        }
      ]

```



## js获取各种高度总结

+ https://blog.csdn.net/leileibrother/article/details/78686250


> admin-article 这里的`paging`分页方法融合了以下几种功能

+ 分页
+ 排序
+ 搜索

## 判断是否置底

this.scrollTop + this.clientHeight >= this.scrollHeight

+ clientHeight 可见区域的高度（不加边线）
+ scrollTop 滚动条卷上去的高度
+ scrollHeight 元素的总高度


## 监听对象中的某个特定值

data() {
  return {
    pageData: {
      currentPage: 2, // 当前页（由于默认第一次获取5条数据，所以从5开始
      pageSize: 5, // 每页条数
      orderBy: 'descending', // 排序方式
      lock: true, // 锁,为了防止多次请求，得到响应后再开启请求
      tips: '', // 提示
      searchData: '' // 搜索内容
    }
  }
},
computed: { // 配合 switch 监听对象中某一特定值
  searchData() {
    return this.pageData.searchData
  }
},
watch: {
    searchData: function(newQuestion, oldQuestion) { // 配合计算属性,监听对象中特定的值
      this.pageData.lock = true
    }
  }


## 监听路由参数变化
watch: {
  $route() { // 监听路由变化
    this.loadData()
  } 
}

## 父组件给子组件传值以 “对象” 的方式

+ 第一步创建一个文件 myCrumbs.vue 子组件

```vue

<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- routing information 缩写为 RI 路由信息 -->
        <el-breadcrumb-item :to="{ path: ri.router }">{{ ri.name1 }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ ri.name2 }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  name: 'MyCrumbs',
  props: ['ri']
}
</script>

<style>

</style>

```

+ 第二步
在 main.js 文件中引入组件 并 注册

```vue

// 引入自己的面包屑组件
import myCrumbs from '@/components/webs/public/myCrumbs'

// 注册自己的面包屑组件
// 引用子组件的 name 作为组件名
Vue.component(myCrumbs.name, myCrumbs)

```

+ 第三步 在父组件中调用

```vue

<!-- 调用自己封装的面包屑组件 -->
<my-crumbs :ri="routingInformation"></my-crumbs>


export default {
  data() {
    return {
      routingInformation: {
        name1: '首页',
        name2: '文章详情',
        router: '/'
      }
    }
  }
}

```

---

## js 中对象数据的排序始终是从小到大

```js
// 原数据
var arr = {
  "2019": [],
  "2018": [],
  "2017": [],
  "2016": []
}

console.log(arr)
// 渲染后:
{2016: Array(0), 2017: Array(0), 2018: Array(0), 2019: Array(0)}
2016: []
2017: []
2018: []
2019: []
__proto__: Object

```

> 将数字类型的数据,用对于的字母代替

``` a -> 2019 ```

+ 变成

```js
var arr = {
  "a": [],
  "b": [],
  "c": [],
  "d": []
}
```

+ 然后再利用计算属性,将 字母(a) 转化为 数字(2019)

```html

<div class="catalog" v-for="(item, index) in catalogData" :key="index" v-if="item.length > 1">
  <h2>{{ index | date }}</h2>
  <div class="list_box" v-for="data in item" :key="data.id">
    <div class="left_radius">
      <div class="lr_radius"></div>
      <div class="lr_rectangle">01</div>
      <ul class="lb_content">
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon"></use>
          </svg>
          {{ data.title }}
        </li>
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shengri-copy"></use>
          </svg>
          {{ data.createtime | formatDate('MM-DD-HH') }}
        </li>
      </ul>
    </div>
  </div>
</div>

```


```vue

filters: {
  date: function(value) {
    if (value === 'a') {
      return '2019'
    } else if (value === 'b') {
      return '2018'
    } else if (value === 'c') {
      return '2017'
    } else if (value === 'd') {
      return '2016'
    }
  }
}

```

---

> element-ui 表单自定义规则，发现怎么也执行不了提交的回调函数

```js
var validatePass = (rule, value, callback) => {
  if (/\S/.test(value)) {
    const reg = /[0-9a-zA-Z_.-]+[@]{1}[0-9a-zA-Z_.-]+([.]\bcom\b)$/
    if (reg.test(this.ruleForm.mailbox)) {
      callback()
    } else {
      callback(new Error('请输入正确的邮箱'))
    }
  }
  callback() // 原因是： 这里忘加回调函数了
}
```


## 流星雨效果（login）

```js

var meteorShower = function (parameter) {
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
    max: 3,
    min: 1,
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

      meteor.style.transform = ` rotate(-45deg) translate3d(${startTop}px, 3px, 0)`
    }, pt.eachTime)
    }
    coreFn(endTop, endLeft)
  }

  let delay = function() { // 延迟流星的生成
    if (document.hidden === false) {
      setTimeout(function () {
        meteorEffect()
      }, Math.random() * 10)
    } else {
      return false
    }
  }

  let current = setInterval(delay, pt.meteorNumber.time)

  document.addEventListener('visibilitychange', function() { // 浏览器切换事件
    if (document.visibilityState === 'hidden') { // 状态判断
      current = setInterval(delay, pt.meteorNumber.time) // 进入当前页面，开启流星雨效果
    } else { // 切换出当前页面
      clearInterval(current) // 关闭流星雨效果
    }
  })
}

meteorShower()

```

## 评论

> 发布评论

+ 验证
  + 当昵称的值发生变化时，立即向服务器发送请求。服务器拿到值后，去数据库查询，如果在评论表中存在此昵称（值）即判断为此用户不是第一次评论（不是新用户）
    + 数据表中存在此昵称,则提示此用户输入密码，才可进行评论（防止他人乱用本网站的用户昵称
      + 当密码的值改变时，向服务器发送请求，在服务器端拿到数据后，去数据表中进行查询
        + 当密码不正确时提示用户
        + 当密码正确时，提示用户，并在确认密码中自动填入正确密码（他输入正确密码时的值）。因为评论时，当密码存在时，需要密码和确认密码一致，才能通form表单的验证
    + 数据表中不存在此昵称，提示用户昵称可用
  + 当邮箱的值发生变化时，判断邮箱格式是否正确，并显示相应的提示
  + 当密码的值发生变化时，判断密码格式是否正确，并显示相应的提示
    + 注意：
    + 这里要区分昵称是否存在数据表中，也就是需要判断此用户是否是新用户，和上面的昵称验证中的密码验证，是一样的，只是添加了判断
      + 如果昵称存在，则判断密码是否正确，和上面的昵称验证中的密码验证方式一致
      + 如果昵称不存在，则只判断密码格式是否正确，并显示相应的提示
  + 当确认密码的值发生变化时或提交表单时，判断确认密码是否和发布评论的密码一致，并判断，并显示相应的提示
+ 当点击提交时，需要通过所有验证才可进行提交



## 项目打包 

### 1. `npm run build`

会生成 `dist` 文件

`dist/static/js/app.813b0d769eea464f2d4a.js`  - 自己写的文件
`dist/static/js/vendor.15c0dc361c63eaf0b47c.js` - 第三方包文件


### 2. 懒加载： 用的时候才加载

拆分上述文件,可参照官网 Vue-Router


> 找到 `router/index.js` 文件，配置路由懒加载

`import addArticle from '@/components/webs/admin/article/addArticle'`

将除了 `Vue` 和 `Router` 以外的所有以`路由方式加载`的文件，都改成以下这种形式

`const addArticle = () => import('@/components/webs/admin/article/addArticle')`

路由方式加载的文件：
  + 需要经过`路由`跳转（切换）的文件


### 3. 重新 `npm run build`

对于 Vue, element-ui 这种第三包库，打包的文件较大，需要特殊处理。   cdn 处理 可参照vue官网， 教程/安装

cdn 比放将这些库放在自己的服务器上有什么好处??

例如我将我的服务器部署在腾讯的北京服务器中，那么在北京的用户访问这个服务器就比较快。而cdn是在`主要的城市`中部署了服务器，
假如，这里的主要城市是： 北京，上海，广东，那么在这些地方的用户访问这个服务器就比较快。
那么针对用户相对而言，就会广一些，访问速度就会提高。
当用户访问一个网站是，就会去下载，这个网站相应的文件，那么去哪下呢？   `cdn`做出了，优先选择，会根据用户所在城市，
就近选择服务器进行下载。`由于将大文件放入了cdn`,而`cdn`这种形式，不仅提高了访问速度，也减轻了自己服务器的压力

### 4. 安装 npm install http-server -g 这个服务器，检测是否打包成功

进入 dist 文件夹中，运行 hs -o 启动服务

> import 这种文件应该放在路由懒加载之前

#### 在调试的时候注意浏览器缓存

### 4. https://www.bootcdn.cn/ 去这个网站找相应的库的`cdn`链接

beta  测试版本

使用压缩版本 `.min`

在 package.json 中找到需要cdn的文件

在cdn网站找到对应的cdn链接，复制到 index.html中

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>blog</title>
    <!-- 添加 element-ui的css文件时，要将main.js中的import 'element-ui/lib/theme-chalk/index.css'注释掉 -->
    <link href="https://cdn.bootcss.com/element-ui/2.4.11/theme-chalk/index.css" rel="stylesheet">
  </head>
  <body>
    <div id="app"></div>
    <!-- 注意引入的先后顺序 -->
    <script src="https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js"></script>
    <script src="https://cdn.bootcss.com/vue/2.5.2/vue.min.js"></script>
    <script src="https://cdn.bootcss.com/element-ui/2.4.11/index.js"></script>
    <script src="https://cdn.bootcss.com/axios/0.18.0/axios.min.js"></script>
    <script src="https://cdn.bootcss.com/moment.js/2.23.0/moment.min.js"></script>
    <!-- built files will be auto injected -->
  </body>
</html>


```


### 5.配置`webpake`

进入`webpake`官网，搜索cdn，选择 externals 找到 webpack.config.js webpake配置项

在自己的项目中找到webpake配置文件build/vue-loader.conf.js

```js
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  // 配置cdn
  externals: {
    // 前面的属性 vue 代表的是 import ... from 'vue'
    // 值 Vue 是 vue.js 暴露在全局中的构造函数名称
    // 因为已经在html中从cdn引用了，告诉webpake不需要打包了此文件
    // 配置时： 区分大小写字母
    // for(var p in window){ // 使用它查看构造函数名称 p
    //   console.log(p+'----'+typeof window[p]+'---'+window[p]);
    //  }
    vue: 'Vue',
    router: 'VueRouter',
    'element-ui': 'ELEMENT',
    axios: 'axios',
    moment: 'moment'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

```



-----

## 2020/01/09 23:07 v1.2


#### 在vue项目中使用sass的配置方法

> 1. 安装sass的依赖包

```

cnpm install --save-dev sass-loader@7.3.1
cnpm install --save-dev node-sass

```

> 2. 在build文件夹下的webpack.base.conf.js的rules里面添加配置

```js

{
 test: /\.sass$/,
 loaders: ['style', 'css', 'scss']
}

```

> 3. 在 `App.vue` 中修改 `style` 标签 `lang`

```vue

<style lang="scss">
$bac: blue;

#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  // margin-top: 60px;
  background-color: $bac;
}
</style>

```


#### nginx 配置

> 1. 让手机可以访问电脑（本地） web 服务（自己的网站）


```nginx

server {
	listen       8080;
	server_name  localhost;

	location / {
		proxy_pass http://127.0.0.1:8080;
	}
}

```


