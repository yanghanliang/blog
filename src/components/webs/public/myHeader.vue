<template>
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
</template>

<script>
export default {
  name: 'myHeard'
}
</script>

<style scoped>
/* header_right-start */
.header_right>li {
    display: inline-block;
}

.header_right>li {
    margin-right: 0.16rem;
}

.header_right>li:nth-last-child(1) {
    margin-right: 1rem;
}
/* header_right-end */
</style>
