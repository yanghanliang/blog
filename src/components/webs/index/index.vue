<template>
    <div class="container">
        <header class="clearfix">
            <div class="header_left">logo(首页)</div>
            <ul class="header_right">
                <li>
                <a href="#">关于我</a>
                </li>
                <li>
                <a href="#">学习笔记</a>
                </li>
                <li>
                <a href="#">资源共享</a>
                </li>
            </ul>
        </header>

        <div class="search"><input type="search" placeholder="请输入您要搜索的内容" autofocus></div>

        <div class="content clearfix">
            <!-- 左边部分 -->
            <left-content></left-content>
            <!-- 右边部分 -->
            <right-content></right-content>
        </div>

        <footer>页脚部分</footer>
    </div>
</template>

<script>
// 引入左边内容
import LeftContent from '@/components/webs/index/LeftContent'

// 引入右边内容
import RightContent from '@/components/webs/index/RightContent'

export default {
  name: 'index',
  components: {
    LeftContent,
    RightContent
  }
}
</script>

<style scoped>
/* header_right-start */
.header_right>li {
    display: inline-block;
}

.header_right>li {
    margin-right: 16px;
}

.header_right>li:nth-last-child(1) {
    margin-right: 100px;
}
/* header_right-end */

/* search-start */
.search {
    width: 200px;
    height: 36px;
    margin: 0 auto;
    text-indent: 25px;
    line-height: 36px;
    border-radius: 50%;
    border: 1px solid darkgray;
}
/* search-end */
</style>
