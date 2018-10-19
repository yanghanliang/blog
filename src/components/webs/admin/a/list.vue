<template>
    <div>
        a 列表
        <button @click="addUser">添加用户</button>
        <table>
          <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>年龄</th>
          </tr>
          <tr v-for="(list, index) in lists" :key="list.id">
            <td>{{ index + 1 }}</td>
            <td>{{ list.name }}</td>
            <td>{{ list.age }}</td>
            <td><button @click.prevent="deleteUser(list.id)">删除</button></td>
            <td><router-link :to="{ name: 'editUser', params: { user_id: list.id } }">修改</router-link></td>
          </tr>
        </table>
    </div>
</template>

<script>
export default {
  name: 'a',
  data() {
    return {
      lists: []
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    // 获取数据渲染页面
    loadData() {
      this.$http.get('http://localhost:3000/data')
        .then((response) => {
          this.lists = response.data // 获取数据
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 删除用户
    deleteUser(id) {
      // 删除前提示
      if (!confirm('您是否确认删除')) {
        return
      }

      this.$http.delete(`http://localhost:3000/data/${id}`)
        .then((response) => {
          if (response.status === 200) {
            console.log('删除成功')
            this.loadData()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 添加用户
    addUser() {
      this.$router.push({ name: 'addUser' })
    }
  }
}
</script>

<style>

</style>
