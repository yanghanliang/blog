import Hljs from 'highlight.js'
import 'highlight.js/styles/dark.css'

let Highlight = {}
Highlight.install = function (Vue) {
  // 先有数据再绑定，调用highlightA
  Vue.directive('highlightA', {
    inserted: function(el) {
      let blocks = el.querySelectorAll('pre code') // 获取 el 下的所有 code
      for (let i = 0; i < blocks.length; i++) {
        const item = blocks[i]
        let str = item.innerHTML.trim()
        item.innerHTML = '<ol><li>  ' + str.replace(/\n/g, '\n</li><li>  ') + '\n</li></ol><div class="copy" style="top: 10px; right: 20px; color: #333; font-size: 12px; cursor: pointer; position: absolute; padding: 2px 10px; text-align: center; border-radius: 3px; background-color: #fff; font-family: 微软雅黑, 宋体;">复制</div>'
        Hljs.highlightBlock(item)

        // 实现点击复制的功能
        let copy = el.querySelector('.copy')
        copy.onclick = function() {
          var that = this
          var textarea = document.createElement('textarea')
          textarea.value = this.parentElement.querySelector('ol').innerText
          document.body.appendChild(textarea) // text 可以保留换行
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
    }
  })
}

export default Highlight
