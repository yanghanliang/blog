<template>
  <div>
    <table>
      <tr>
        <th>姓名</th>
        <th>年龄</th>
      </tr>
      <tr>
        <td>
          <input type="text" v-model="list.name" placeholder="请输入用户名称"></td>
        <td>
          <input type="text" v-model="list.age" placeholder="请输入年龄">
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <button type="submit" @click.prevent="edit">修改</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'edit',
  data() {
    return {
      list: {},
      user_id: ''
    }
  },
  mounted() {
    this.user_id = this.$route.params.user_id
    this.$http.get(`http://localhost:3000/data/${this.user_id}`)
      .then((response) => {
        this.list = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    edit() {
      this.$http.patch(`http://localhost:3000/data/${this.user_id}`, this.list)
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ name: 'listUser' })
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
table {
  text-align: left;
}

input {
  border: 1px solid #ebebeb;
}

button {
  padding: 4px;
  margin-left: 50px;
  border: 1px solid #ebebeb;
}
</style>
