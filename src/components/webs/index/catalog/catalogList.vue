<template>
    <div>
        <div class="catalog" v-for="(item, index) in catalogData" :key="index" v-if="item.length > 1">
          <h2>{{ index | date }}</h2>
          <div class="list_box" v-for="data in item" :key="data.id">
            <div class="left_radius">
              <div class="lr_radius"></div>
              <div class="lr_rectangle">01</div>
              <ul class="lb_content">
                <li>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-icon"></use>
                  </svg>
                  {{ data.title }}
                </li>
                <li>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shengri-copy"></use>
                  </svg>
                  {{ data.createtime | formatDate('MM-DD-HH') }}
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import myHeader from '@/components/webs/public/myHeader'
import myFooter from '@/components/webs/public/myFooter'

export default {
  name: 'catalogList',
  components: {
    myHeader,
    myFooter
  },
  data() {
    return {
      catalogData: {
        'a': [], // 2019
        'b': [], // 2018
        'c': [], // 2017
        'd': [] // 2016
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const { data } = await this.$http.get('catalog')
      if (data.status === 200) {
        let tempData = data.data
        for (let i = 0; i < tempData.length; i++) {
          let createtime = tempData[i].createtime
          if (createtime > 1451577600000 && createtime < 1483200000000) { // 2016
            this.catalogData['d'].push(tempData[i])
          } else if (createtime > 1483200000000 && createtime < 1514736000000) { // 2017
            this.catalogData['c'].push(tempData[i])
          } else if (createtime > 1514736000000 && createtime < 1546272000000) { // 2018
            this.catalogData['b'].push(tempData[i])
          } else if (createtime > 1546272000000 && createtime < 1577808000000) { // 2019
            this.catalogData['a'].push(tempData[i])
          }
        }
      } else {
        this.$message({
          message: data.msg
        })
      }
    }
  },
  filters: {
    date: function(value) { // 字母转换为对应的年份
      if (value === 'a') {
        return '2019'
      } else if (value === 'b') {
        return '2018'
      } else if (value === 'c') {
        return '2017'
      } else if (value === 'd') {
        return '2016'
      }
    }
  }
}
</script>

<style scoped>
.list_box {
  width: 800px;
  margin: 70px auto;
}

.list_box .left_radius {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  position: relative;
  background-color: aqua;
  box-shadow: -5px 4px 10px 0px black;
}

.left_radius .lr_radius {
  width: 60px;
  height: 60px;
  top: 50%;
  left: 50%;
  z-index: 2;
  border-radius: 50%;
  position: absolute;
  /* background-color: #fff; */
  transform: translate(-50%, -50%);
  box-shadow: inset 3px 12px 12px 0px black;
}

.left_radius .lr_rectangle {
  top: 50%;
  right: 7px;
  width: 50px;
  height: 45px;
  font-size: 40px;
  line-height: 45px;
  text-indent: 1px;
  position: absolute;
  background-color: #fff;
  transform: translateY(-50%);
  box-shadow:0px 15px 10px -15px #ccc;
  /* box-shadow: inset 2px -13px 21px -13px #000; */
}

.left_radius .lb_content {
  top: 50%;
  left: 113px;
  min-width: 200px;
  height: 45px;
  padding-left: 30px;
  line-height: 45px;
  position: absolute;
  background-color: #fff;
  transform: translateY(-50%);
}

.left_radius .lb_content>li {
  height: 50%;
  line-height: 22px;
}
</style>
