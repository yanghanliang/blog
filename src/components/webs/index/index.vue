<template>
  <div class="container">
      <my-header></my-header>

      <!-- <div class="search"><input v-model="searchData" @keyup.enter="searchFn" type="search" placeholder="请输入您要搜索的内容" autofocus></div> -->
    <!-- @keyup.enter.native="searchFn" -->
      <el-input
        placeholder="请输入您要搜索的内容"
        v-model="searchData"
        :autofocus="true"
        @input="searchInput"
        @keyup.enter.native="searchEnter"
        clearable
        class="search">
      </el-input>

      <div class="content clearfix">
            <div class="content_left" ref="content_left">
                <div class="cl_box" v-for="data in article" :key="data.id">
                    <div class="clb_top clearfix">
                        <img src="../../../assets/index/index/images/text02.jpg" alt="">
                        <div class="clbt_right">
                            <h2>{{ data.title }}</h2>
                            <p>
                                {{ data.synopsis }}
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
                        <router-link :to="'/articleDetails/'+data.id">阅读原文</router-link>
                    </div>
                </div>
                <!-- <div class="cl_box">
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
                </div> -->
            </div>
            <div class="content_right">
                <div class="synopsis">
                    <!-- s_bg 背景 -->
                    <img class="s_bg" src="../../../assets/index/index/images/banner.png" alt="背景墙的图片">
                    <img class="s_head_portrait" src="../../../assets/index/index/images/avatar.jpg" alt="头像">
                    <div class="s_content">
                        <h2>{{ personalInformation.alias }} | {{ personalInformation.name }}</h2>
                        <h3>- {{ personalInformation.occupation }} -</h3>
                        <p>{{ personalInformation.synopsis }}</p>
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
      personalInformation: {}, // 个人信息数据
      searchData: '', // 搜索内容
      lock: true, // 锁,为了手动防止删除搜索时,跳转到搜索页面
      currentPage: 5, // 当前页（由于默认第一次获取5条数据，所以从5开始
      pageSize: 5, // 每页条数
      abc: true
    }
  },
  created() {
    this.loadData()
  },
  mounted() {
    this.scroll()
  },
  methods: {
    async loadData() {
      const { data } = await this.$http.get('index') // 发送请求,获取数据
      console.log(data.article)
      this.article = data.article // 将获取到的文章数据赋值给 vue
      this.personalInformation = data.personalInformation // 将获取到的个人信息数据赋值给 vue
    },
    async searchFn() { // 搜索内容
      const { data } = await this.$http.post('searchData', { searchData: this.searchData })
      if (data.status === 200) {
        this.article = data.data // 显示内容
      } else if (this.lock) {
        this.lock = false // 关闭锁
        // 给出提示
        this.$message({
          message: data.msg + '即将跳转百度搜索!',
          type: 'warrning',
          data: this.searchData, // 把数据存储在这
          duration: 1000, // 缩短时间，提高用户体验
          onClose: function(message) { // 参数为message实例,所以想要获取数据,则必须将数据以以上方式存储
            window.open(`https://www.baidu.com/s?wd=${message.data}`, '_blank')
          }
        })
      }
    },
    searchInput() { // 输入搜索
      // 为了不让用户输入字母数字时,没有数据时,出现多次跳转搜索页面
      if (!/[0-9a-zA-Z]+/.test(this.searchData)) { // 如果输入有数字字母则不执行
        this.searchFn() // 搜索内容
      }
    },
    searchEnter() { // 回车搜索
      this.searchFn() // 搜索内容
    },
    scroll() { // 页面滚到
      const ele = this.$refs.content_left // 获取左边容器
      const that = this // 保存 this
      //   function getScrollTop() {
      //     var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0
      //     if (document.body) {
      //       bodyScrollTop = document.body.scrollTop
      //     }
      //     if (document.getElementsByClassName('content_left')) {
      //       documentScrollTop = document.getElementsByClassName('content_left').scrollTop
      //     }
      //     scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
      //     return scrollTop
      //   }
      //   // 文档的总高度
      //   function getScrollHeight() {
      //     var scrollHeight = 0, eleScrollHeight = 0, documentScrollHeight = 0
      //     eleScrollHeight = ele.scrollHeight

      //     if (document.getElementsByClassName('content_left')) {
      //       documentScrollHeight = document.getElementsByClassName('content_left').scrollHeight
      //     }
      //     scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
      //     return scrollHeight
      //   }
      //   function getWindowHeight() {
      //     var windowHeight = 0
      //     if (document.compatMode == 'CSS1Compat') {
      //       windowHeight = document.getElementsByClassName('content_left').clientHeight
      //     } else {
      //       windowHeight = document.body.clientHeight
      //     }
      //     return windowHeight
      //   }
      ele.onscroll = async function() {
        // clientHeight 可见区域的高度（不加边线）
        // scrollTop 滚动条卷上去的高度
        // scrollHeight 元素的总高度
        if (this.scrollTop + this.clientHeight >= this.scrollHeight && that.abc) { // 判断是否
          that.abc = false
          const { data } = await that.$http.get(`paging/${that.currentPage}/${that.pageSize}`)
          if (data.status === 200) {
            for (var i = 0; i < data.data.length; i++) {
              that.article.push(data.data[i]) // 将获取到的文章数据赋值给 vue
            }
            that.currentPage += 5
            that.abc = true
          }
        }
      }
    }
  },
  watch: {
    searchData: function(newQuestion, oldQuestion) {
      if (newQuestion.length > oldQuestion.length) { // 在搜索框中写入数据时开启"没有数据自动跳转搜索"
        this.lock = true // 开启锁
      }
    }
  }
}
</script>

<style scoped>
/* search-start */
.search {
    width: 400px;
    margin: 20px auto;
    left: 50%;
    transform: translateX(-50%);
}

.search >>> input {
    border-radius: 20px;
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
    /* min-height: 10rem; */
    height: 7rem;
    overflow-y: scroll;
}

.content_left::-webkit-scrollbar {
    display: none;
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
