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
            <div class="content_left">
                <div class="cl_box" v-for="data in article" :key="data.id">
                    <div class="clb_top clearfix">
                        <img src="../../../assets/images/index/text02.jpg" alt="">
                        <div class="clbt_right">
                            <h2>{{ data.title }}</h2>
                            <p>
                                {{ data.content }}
                            </p>
                        </div>
                    </div>
                    <div class="clb_bottom clearfix">
                        <div class="clbb_left">
                            <i class="icon">&#xe606;</i>
                            <a href="#">{{ data.type }}</a>
                            &nbsp;
                            <i class="icon">&#xe613;</i>
                            <a>{{ data.createtime | formatDate('YYYY-MM-DD')}}</a>
                            &nbsp;
                            <i class="icon">&#xe609;</i>
                            <a>浏览（<span>{{ data.read }}</span>）</a>
                        </div>
                        <router-link :to="{ name: 'articles' }">阅读原文</router-link>
                    </div>
                </div>
                <div class="cl_box">
                    <div class="clb_top clearfix">
                        <img src="../../../assets/images/index/text02.jpg" alt="">
                        <div class="clbt_right">
                            <h2>陌上花开,可缓缓归易</h2>
                            <p>
                                用最简单的代码，实现瀑布流布局，没有繁琐的css，没有jq，只需要做到以下就可以实现瀑布流的效果。思路很简单，看成是三列布局，分别用三个ul来调用。帝国cms列表模板，...
                            </p>
                        </div>
                    </div>
                    <div class="clb_bottom clearfix">
                        <div class="clbb_left">
                            <i class="icon">&#xe606;</i>
                            <a href="#">CSS3|Html5</a>
                            &nbsp;
                            <i class="icon">&#xe613;</i>
                            <a>2018-05-04</a>
                            &nbsp;
                            <i class="icon">&#xe609;</i>
                            <a>浏览（<span>0</span>）</a>
                        </div>
                        <a href="http://">阅读原文</a>
                    </div>
                </div>
                <div class="cl_box">
                    <div class="clb_top clearfix">
                        <img src="../../../assets/images/index/text02.jpg" alt="">
                        <div class="clbt_right">
                            <h2>陌上花开,可缓缓归易</h2>
                            <p>
                                用最简单的代码，实现瀑布流布局，没有繁琐的css，没有jq，只需要做到以下就可以实现瀑布流的效果。思路很简单，看成是三列布局，分别用三个ul来调用。帝国cms列表模板，...
                            </p>
                        </div>
                    </div>
                    <div class="clb_bottom clearfix">
                        <div class="clbb_left">
                            <i class="icon">&#xe606;</i>
                            <a href="#">CSS3|Html5</a>
                            &nbsp;
                            <i class="icon">&#xe613;</i>
                            <a>2018-05-04</a>
                            &nbsp;
                            <i class="icon">&#xe609;</i>
                            <a>浏览（<span>0</span>）</a>
                        </div>
                        <a href="http://">阅读原文</a>
                    </div>
                </div>
                <div class="cl_box">
                    <div class="clb_top clearfix">
                        <img src="../../../assets/images/index/text02.jpg" alt="">
                        <div class="clbt_right">
                            <h2>陌上花开,可缓缓归易</h2>
                            <p>
                                用最简单的代码，实现瀑布流布局，没有繁琐的css，没有jq，只需要做到以下就可以实现瀑布流的效果。思路很简单，看成是三列布局，分别用三个ul来调用。帝国cms列表模板，...
                            </p>
                        </div>
                    </div>
                    <div class="clb_bottom clearfix">
                        <div class="clbb_left">
                            <i class="icon">&#xe606;</i>
                            <a href="#">CSS3|Html5</a>
                            &nbsp;
                            <i class="icon">&#xe613;</i>
                            <a>2018-05-04</a>
                            &nbsp;
                            <i class="icon">&#xe609;</i>
                            <a>浏览（<span>0</span>）</a>
                        </div>
                        <a href="http://">阅读原文</a>
                    </div>
                </div>
            </div>
            <div class="content_right">
                <div class="synopsis">
                    <!-- s_bg 背景 -->
                    <img class="s_bg" src="../../../assets/images/index/banner.png" alt="背景墙的图片">
                    <img class="s_head_portrait" src="../../../assets/images/index/avatar.jpg" alt="头像">
                    <div class="s_content">
                        <h2>{{ personal_information.alias }} | {{ personal_information.name }}</h2>
                        <h3>- {{ personal_information.occupation }} -</h3>
                        <p>{{ personal_information.synopsis }}</p>
                    </div>
                </div>
                <!-- 还不知道放什么 -->
                <div class="smg">
                    <div class="s_title">
                        <h2>标签云</h2>
                        <div class="st_line"></div>
                    </div>
                    <div class="s_box clearfix">
                        <a href="#">陌上花开</a>
                        <a href="#">校园生活</a>
                        <a href="#">html5</a>
                        <a href="#">SumSung</a>
                        <a href="#">青春</a>
                        <a href="#">温暖</a>
                        <a href="#">阳光</a>
                        <a href="#">三星</a>
                        <a href="#">华维荣耀</a>
                    </div>
                </div>
            </div>
        </div>

        <footer>页脚部分</footer>
    </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      article: [], // 文章数据
      personal_information: {} // 个人信息数据
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const data = await this.$http.get('index') // 发送请求,获取数据
      this.article = data.data.article // 将获取到的文章数据赋值给 vue
      this.personal_information = data.data.personal_information // 将获取到的个人信息数据赋值给 vue
    }
  }
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

/* content_left-start */
.content_left {
    float: left;
    width: 8.4rem;
    min-height: 10rem;
}

/* cl_box-start */
.content_left .cl_box {
    width: 8rem;
    height: 2rem;
    padding: 0.2rem;
    margin-bottom: 0.1rem;
    background-color: #fff;
}

/* clb_top-start */
.content_left .cl_box .clb_top {
    width: 100%;
    height: 1.6rem;
    margin-bottom: 0.2rem;
}

.cl_box .clb_top>img {
    float: left;
    width: 2.4rem;
    height: 1.6rem;
    border-radius: 5px;
}

.cl_box .clb_top .clbt_right {
    float: right;
    width: 5rem;
    height: 100%;
}

.clb_top .clbt_right p {
    color: #888;
    margin-bottom: 0.1rem;
}
/* clb_top-end */

/* clb_bottom-start */
.cl_box .clb_bottom .clbb_left {
    float: left;
}

.cl_box .clb_bottom>a {
    float: right;
}
/* clb_bottom-end */
/* cl_box-end */
/* content_left-end */

/* content_right-start */
.content_right {
    float: right;
    width: 3.36rem;
    height: 10rem;
}

/* synopsis-start */
.content_right .synopsis {
    position: relative;
    background-color: #ffffff;
}

.content_right .synopsis .s_bg {
    width: 100%;
    margin-bottom: 0.3rem;
}

.content_right .synopsis .s_head_portrait {
    left: 50%;
    border-radius: 50%;
    position: absolute;
    transform: translate(-50%, -92%);
}

.content_right .synopsis .s_content {
    text-align: center;
}

.synopsis .s_content h3 {
    font-weight: normal;
}

.synopsis .s_content p {
    color: #888;
    line-height: 26px;
    padding: 10px 30px;
}
/* synopsis-end */

/* smg-start */
.content_right .smg {
    margin-top: 0.1rem;
}

.content_right .smg .s_title {
    height: 0.5rem;
    position: relative;
    background-color: #ffffff;
}

.content_right .smg .s_title h2 {
    margin-left: 10px;
    line-height: 0.5rem;
}

.content_right .smg .s_title .st_line {
    width: 0%;
    height: 2px;
    bottom: 0px;
    position: absolute;
    transition:all 1s linear;
}

.content_right .smg:hover .st_line {
    width: 100%;
    /* Safari 5.1 - 6.0 */
    background: -webkit-repeating-linear-gradient(left top, red, orange, yellow, green, blue, indigo, violet);
    /* Opera 11.1 - 12.0 */
    background: -o-repeating-linear-gradient(left top, red, orange, yellow, green, blue, indigo, violet);
    /* Firefox 3.6 - 15 */
    background: -moz-repeating-linear-gradient(left top, red, orange, yellow, green, blue, indigo, violet);
    /* 标准的语法 */
    background: repeating-linear-gradient(left top, red, orange, yellow, green, blue, indigo, violet);
}

/* s_box-start */
.content_right .smg .s_box  {
    margin-top: 2px;
    padding: 0 20px 20px;
    background-color: #fff;
}

.content_right .smg .s_box a {
    float: left;
    height: 24px;
    color: #fff;
    padding: 3px 10px;
    line-height: 24px;
    border-radius: 8px;
    margin: 10px 10px 0 0;
}

.smg .s_box a:nth-child(2n+1) {
    background-color: #3299BB;
}
.smg .s_box a:nth-child(2n+2) {
    background-color: #036564;
}
.smg .s_box a:nth-child(2n+3) {
    background-color: #EB6841;
}
.smg .s_box a:nth-child(2n+4) {
    background-color: #FE4365;
}
.smg .s_box a:nth-child(2n+5) {
    background-color: #FC9D9A;
}
.smg .s_box a:nth-child(2n+6) {
    background-color: #EDC951;
}
.smg .s_box a:nth-child(2n+7) {
    background-color: #C8C8A9;
}
.smg .s_box a:nth-child(2n+8) {
    background-color: #83AF9B;
}
.smg .s_box a:nth-child(2n+9) {
    background-color: #3299BB;
}
/* s_box-end */
/* smg-end */
/* content_right-end */

</style>
