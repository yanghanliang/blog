<template>
    <div>
        <my-header></my-header>
        <!-- <mavon-editor v-model="value" :subfield="false" defaultOpen="preview"/> -->
        <mavon-editor v-model="value" :subfield="false" :defaultOpen="defaultData" :toolbarsFlag="false" :boxShadow="false" />
        <my-footer></my-footer>
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
      defaultData: 'preview',
      value: ''
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const { data } = await this.$http.get('testData')
      console.log(data.status, data.data)
      if (data.status === 200) {
        this.value = data.data[0].content
      }
    }
  }
}
</script>

<style scoped>
</style>
