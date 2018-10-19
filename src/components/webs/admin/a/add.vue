<template>
    <div>
      <h1>添加的页面</h1>
      <form action="">
        <input type="text" placeholder="请输入姓名" v-model="formData.name">
        <input type="text" placeholder="请输入年龄" v-model="formData.age">
        <button type="submit" @click.prevent="addUser">添加</button>
      </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'add',
  data() {
    return {
      formData: {
        name: '',
        age: ''
      }
    }
  },
  methods: {
    addUser() {
      axios.post('http://localhost:3000/data', this.formData)
        .then((response) => {
          if (response.status === 201) {
            this.$router.push({name: 'list'})
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
</style>
