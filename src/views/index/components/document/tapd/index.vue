<template>
	<div class="tapd">
		<el-upload
      v-if="source.length === 0"
			class="upload-demo"
			drag
			:action="`${Global.baseURL}uploadFile`"
			:show-file-list="false"
			:http-request="httpRequest"
			multiple
		>
			<template v-if="status === 'success'">
				<div>
				</div>
			</template>
			<template v-else>
				<i class="el-icon-upload"></i>
				<div class="el-upload__tip" slot="tip">请上传excel文件</div>
				<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			</template>
		</el-upload>
    <div class="tapd-content" v-else>
      <div class="tc-header line pb10 mb10">
        <el-checkbox :indeterminate="isIndeterminateF" v-model="checkAllF" @change="handleCheckAllChangeF">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="selectedFilter" @change="handlerFilter">
          <el-checkbox v-for="item in filterList" :label="item" :key="item">{{item}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="tc-header">
        <el-checkbox :indeterminate="isIndeterminateC" v-model="checkAllC" @change="handleCheckAllChangeC">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="selectedCustom" @change="handlerCustom">
          <el-checkbox v-for="item in customList" :label="item" :key="item">{{item}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="pd20 clearfix">
        <my-echarts
          v-if="barData.xAxisData"
          class="min-echarts mt20 fl"
          title="文章详情"
          width="48%"
          height="300px"
          :txt="barData.xAxisData"
          :data="barData.seriesData"
          :axisLabel="{
            interval: 0,
            rotate: -30,
          }"
          :grid="{
            left: 30,
            top: 30,
            bottom: 50,
            right: 55,
          }"
          @getEchartsObj="echartsRegisterEvents"
        />
        <my-echarts
          class="min-echarts mt20 fr"
          type="pie"
          width="48%"
          seriesName="缺陷类型"
          height="300px"
          :txt="currentClick.xAxisData"
          :data="currentClick.seriesData"
          :axisLabel="{}"
        />
      </div>
    </div>
	</div>
</template>

<script>
/* eslint-disable */
import myEcharts from '@/components/function/myEcharts'
import source from './data'
export default {
	name: 'Tapd',
  components: {
    myEcharts,
  },
  computed: {
    isIndeterminateF() {
      if (this.selectedFilter.length && this.selectedFilter.length < this.filterList.length) {
        return true;
      }
      if (this.selectedFilter.length === this.filterList.length) {
        return false;
      }
      if (!this.selectedFilter.length) {
        return false;
      }
    },
    isIndeterminateC() {
      if (this.selectedCustom.length && this.selectedCustom.length < this.customList.length) {
        return true;
      }
      if (this.selectedCustom.length === this.customList.length) {
        return false;
      }
      if (!this.selectedCustom.length) {
        return false;
      }
    },
    showData() {
      const indexs = [];
      this.selectedFilter.forEach((item) => {
        indexs.push(this.filterList.indexOf(item))
      })
      if (!indexs.length) {
        return;
      }

      if (indexs.length > 1) {
        // todo
        return this.handlerDimensionCountSum()
      }

      return this.handlerCountSum({
        key: indexs[0],
        data: this.source.data.slice(1),
        isSort: this.selectedCustom.includes('排序'),
        isMerge: this.selectedCustom.includes('数据合并'),
      })
    },
    barData() {
      if (!this.showData) {
        return {}
      }
      return {
				xAxisData: Object.keys(this.showData),
				seriesData: Object.values(this.showData)
			}
    },
  },
	data () {
		return {
			status: '',
      checkAllF: false,
      checkAllC: false,
      // source: [],
      source,
      selectedFilter: [],
      selectedCustom: [],
      filterList: ['上海', '北京', '广州', '深圳'],
      customList: ['排序', '数据合并'],
      currentClick: {},
		}
	},
  created() {
    this.handlerRegisterEvents();
  },
	methods: {
    // 注册事件
    handlerRegisterEvents() {
      this.handlerData()
    },
		// 覆盖默认的上传行为
		async httpRequest (file) {
			let formdata = new FormData()
			formdata.append('file', file.file)
			this.status = 'upload'

			try {
				let data = await this.$http({
					url: `uploadFile?uploadDir=./uploadFile/excel&type=excel&name=${Date.parse(new Date())}_${file.file.name}`,
					method: 'post',
					data: formdata, // 必须是 FormData 对象
					headers: {'Content-Type': 'multipart/form-data'},
				})

        this.source = data
        this.handlerData()
			} catch (e) {
				console.log(e)
			}
		},
    // 操作数据
    handlerData() {
      // 获取筛选项
      this.filterList = this.source.data[0]
      // 获取数据
      const infoData = this.source.data.slice(1)
    },
    // 条数汇总
    handlerCountSum(params) {
      // 参数合并：默认值
      const P = Object.assign({
        isSort: true,
        isMerge: false,
      }, params)

      const temp = {};
      P.data.forEach((item) => {
        if (!item[P.key]) {
          return
        }
        if (P.isMerge && item[P.key].includes(';')) {
          item[P.key].split(';').forEach((items) => {
            if (temp[items]) {
              temp[items] += 1 
            } else {
              temp[items] = 1
            }    
          })
        } else {
          if (temp[item[P.key]]) {
            temp[item[P.key]] += 1 
          } else {
            temp[item[P.key]] = 1
          }
        }
      })

      if (P.isSort) {
        const arr = [];
        for (const key in temp) {
          arr.push({
            [key]: temp[key]
          })
        }
        arr.sort((a, b) => {
          const v1 = a[Object.keys(a)]
          const v2 = b[Object.keys(b)]
          if (v1 > v2) {
            return 1
          }
          if (v1 === v2) {
            return 0
          }
          if (v1 < v2) {
            return -1
          }
        })
        const sortObj = {};
        arr.forEach((item) => {
          const k = Object.keys(item)
          sortObj[k] = item[k]
        })
        return sortObj
      }

      return temp;
    },
    // 多维度数据汇总
    handlerDimensionCountSum() {

    },
    // 选择过滤条件
    handlerFilter(value) {
      let checkedCount = value.length;
      this.checkAllF = checkedCount === this.filterList.length;
    },
    // 执行全选或全不选
    handleCheckAllChangeF(val) {
      this.selectedFilter = val ? this.filterList : [];
    },
    // 选择过滤条件
    handlerCustom(value) {
      let checkedCount = value.length;
      this.checkAllC = checkedCount === this.customList.length;
    },
    // 执行全选或全不选
    handleCheckAllChangeC(val) {
      this.selectedCustom = val ? this.customList : [];
    },
    echartsRegisterEvents(echarts) {
      echarts.on('click', (params) => {
        const data = this.handlerTypeSum({
          txt: params.name,
          index: this.handlerFindKey({
            data: this.source.data[0],
            txt: '缺陷类型',
          }),
          data: this.source.data.slice(1),
        })
        this.currentClick = {
          xAxisData: Object.keys(data),
          seriesData: Object.values(data)
        }
      })
    },
    // bug类型汇总
    handlerTypeSum(params) {
      let temp = {}
      let personnelK = this.handlerFindKey({ txt: '开发人员' })
      console.log(personnelK, 'personnelK')
      debugger;
      params.data.forEach((item) => {
        console.log(item[personnelK], params.txt, 'item[personnelK] !== params.name')
        debugger;
        if (item[personnelK] !== params.txt || !item[params.index]) {
          return;
        }

        if (temp[item[params.index]]) {
          temp[item[params.index]] += 1
        } else {
          temp[item[params.index]] = 1
        }
      })
      console.log(temp, 'temp')
      debugger
      return temp
    },
    // 查找下标
    handlerFindKey(params) {
      // 参数合并：默认值
      const P = Object.assign({
        data: this.source.data[0]
      }, params)
      return P.data.findIndex((item) => item === params.txt)
    },
	}
}
</script>

<style lang="scss" scoped>
</style>
