<template>
    <div>
        <header><h1>后台首页</h1></header>
        <div class="content clearfix">
            <ul class="content_left">
                <router-link to="/admin/listUser" tag="li" active-class="hover"><a>a</a></router-link>
                <router-link to="/admin/b" tag="li" active-class="hover"><a>b</a></router-link>
                <!-- <li><a href="#">a</a></li> -->
                <!-- <li><a href="#">b</a></li> -->
            </ul>
            <right-content></right-content>
        </div>
        <footer>底部内容区域</footer>
    </div>
</template>

<script>
// 引入右边内容区域
import RightContent from '@/components/webs/admin/RightContent'

export default {
  name: 'admin',
  components: {
    RightContent
  }
}
</script>

<style scoped>
.content_left {
    float: left;
    width: 336px;
    height: 800px;
    background-color: #999;
}

.content_left li a {
    width: 100%;
    height: 30px;
    display: block;
    color: #ffffff;
    line-height: 30px;
    background-color: #666;
}

.content_left li a:hover {
    background-color: blue;
}

.content_left .hover a {
    background-color: blue;
}
</style>
