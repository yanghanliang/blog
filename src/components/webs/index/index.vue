<template>
    <div class="container">
        <my-header></my-header>

        <div class="search"><input type="search" placeholder="请输入您要搜索的内容" autofocus></div>

        <div class="content clearfix">
            <div class="content_left">
                <div class="cl_box" v-for="data in article" :key="data.id">
                    <div class="clb_top clearfix">
                        <img src="../../../assets/index/index/images/text02.jpg" alt="">
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
                        <router-link :to="{ name: 'articleDetails' }">阅读原文</router-link>
                    </div>
                </div>
                <div class="cl_box">
                    <div class="clb_top clearfix">
                        <img src="../../../assets/index/index/images/text02.jpg" alt="">
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
                        <img src="../../../assets/index/index/images/text02.jpg" alt="">
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
                        <img src="../../../assets/index/index/images/text02.jpg" alt="">
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
                    <img class="s_bg" src="../../../assets/index/index/images/banner.png" alt="背景墙的图片">
                    <img class="s_head_portrait" src="../../../assets/index/index/images/avatar.jpg" alt="头像">
                    <div class="s_content">
                        <h2>{{ personal_information.alias }} | {{ personal_information.name }}</h2>
                        <h3>- {{ personal_information.occupation }} -</h3>
                        <p>{{ personal_information.synopsis }}</p>
                    </div>
                </div>
                <!-- 还不知道放什么 -->
                <!-- <div class="smg">
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
                </div> -->
                <category></category>
            </div>
        </div>

        <my-footer></my-footer>
    </div>
</template>

<script>
// 导入 header
import myHeader from '@/components/webs/public/myHeader'
// 导入 footer
import myFooter from '@/components/webs/public/myFooter'
// 导入 category
import category from '@/components/webs/public/category'

export default {
  name: 'index',
  components: {
    myHeader,
    myFooter,
    category
  },
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
/* search-start */
.search {
    width: 200px;
    height: 36px;
    margin: 0.2rem auto;
    text-indent: 25px;
    line-height: 36px;
    border-radius: 50%;
    border: 1px solid darkgray;
}
/* search-end */

/* content-start */
.content {
    width: 1200px;
    margin: 0 auto;
}

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
    border-radius: 0.05rem;
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
/* content_right-end */
/* content-end */
</style>
