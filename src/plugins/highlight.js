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
      function transference(str) {
        var s = ''
        if (str.length === 0) return ''
        s = str.replace(/&/g, '&amp;')
        s = s.replace(/</g, '&lt;')
        s = s.replace(/>/g, '&gt;')
        return s
      }

      // 获取当前下的所有代码块
      let code = el.querySelectorAll('code')

      for (let i = 0; i < code.length; i++) {
        let item = code[i]
        // 获取代码块元素中的代码内容,并且去除两边的空格和换行
        let str = item.innerHTML.trim() // 必须要用 innerHTML
        let languageValue = item.attributes['language']

        // 如果是 html 结构的代码则进行转义
        if (languageValue !== undefined && languageValue.value === 'html') {
          str = transference(str)
        }

        item.innerHTML = '<ol><li>  ' + str.replace(/\n/g, '\n</li><li>  ') + '\n</li></ol><div class="copy" style="top: 10px; right: 20px; color: #333; font-size: 12px; cursor: pointer; position: absolute; padding: 2px 10px; text-align: center; border-radius: 3px; background-color: #fff; font-family: 微软雅黑, 宋体;">复制</div>'
        // 代码高亮
        Hljs.highlightBlock(item)
      }

      let copy = el.querySelectorAll('.copy')
      for (var i = 0; i < copy.length; i++) {
        copy[i].onclick = function() {
          var that = this
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
