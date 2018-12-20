<template>
    <div class="category">
        <div class="s_title">
            <h3>分类</h3>
            <div class="st_line"></div>
        </div>
        <div class="s_box clearfix">
            <a href="#" v-for="value in categoryData" :key="value.id">{{ value.classname }}</a>
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
</template>

<script>
export default {
  name: 'category',
  data() {
    return {
      categoryData: []
    }
  },
  created() {
    this.getCategoryData() // 获取分类数据
  },
  methods: {
    async getCategoryData() { // 获取分类数据
      const { data } = await this.$http.get('category') // 发送请求
      this.categoryData = data // 将获取到的数据绑定到 vue 中
    }
  }
}
</script>

<style scoped>
/* category-start */
.category {
    margin-top: 0.1rem;
}

.category .s_title {
    height: 0.4rem;
    line-height: 0.4rem;
    position: relative;
    background-color: #ffffff;
}

.category .s_title h3 {
    text-align: left;
    text-indent: 20px;
}

.category .s_title .st_line {
    width: 0%;
    height: 2px;
    bottom: 0px;
    position: absolute;
    transition:all 1s linear;
}

.category:hover .st_line {
    width: 100%;
    /* Safari 5.1 - 6.0 */
    background: -webkit-repeating-linear-gradient(left top, #00cdfb, #c1e2dc, #f500cc, #fe4365);
    /* Opera 11.1 - 12.0 */
    background: -o-repeating-linear-gradient(left top, #00cdfb, #c1e2dc, #f500cc, #fe4365);
    /* Firefox 3.6 - 15 */
    background: -moz-repeating-linear-gradient(left top, #00cdfb, #c1e2dc, #f500cc, #fe4365);
    /* 标准的语法 */
    background: repeating-linear-gradient(left top, #00cdfb, #c1e2dc, #f500cc, #fe4365);
    /* #00cdfb, #c1e2dc, #f500cc, #fe4365 */
    /* red, orange, indigo, violet */
}

/* s_box-start */
.category .s_box  {
    margin-top: 0.02rem;
    background-color: #fff;
    padding: 0.08rem 0.2rem 0.2rem;
}

.category .s_box a {
    float: left;
    height: 24px;
    color: #fff;
    line-height: 0.24rem;
    border-radius: 0.08rem;
    padding: 0.03rem 0.1rem;
    margin: 0.1rem 0.1rem 0 0;
}

.category .s_box a:nth-child(2n+1) {
    background-color: #3299BB;
}
.category .s_box a:nth-child(2n+2) {
    background-color: #036564;
}
.category .s_box a:nth-child(2n+3) {
    background-color: #EB6841;
}
.category .s_box a:nth-child(2n+4) {
    background-color: #FE4365;
}
.category .s_box a:nth-child(2n+5) {
    background-color: #FC9D9A;
}
.category .s_box a:nth-child(2n+6) {
    background-color: #EDC951;
}
.category .s_box a:nth-child(2n+7) {
    background-color: #C8C8A9;
}
.category .s_box a:nth-child(2n+8) {
    background-color: #83AF9B;
}
.category .s_box a:nth-child(2n+9) {
    background-color: #3299BB;
}
/* s_box-end */
/* category-end */
</style>
