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