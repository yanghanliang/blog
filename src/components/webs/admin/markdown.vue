<template>
    <div>
        <mavon-editor v-model="value" @change="changeData" @save="gg"/>
    </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      defaultData: 'preview'
    }
  },
  methods: {
    changeData(value, render) {
      console.log('value', value)
      console.log('render', render)
    },
    gg() {
      console.log('我变了')
    }
  }
}
</script>

<style>

</style>
