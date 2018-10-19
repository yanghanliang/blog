import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/webs/index/index'
import admin from '@/components/webs/admin/index'

// admin-start
import listUser from '@/components/webs/admin/a/list'
import addUser from '@/components/webs/admin/a/add'
import editUser from '@/components/webs/admin/a/edit'
// admin-end

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      children: [
        {
          path: 'listUser',
          name: 'listUser',
          component: listUser
        },
        {
          path: 'addUser',
          name: 'addUser',
          component: addUser
        },
        {
          path: 'editUser/:user_id',
          name: 'editUser',
          component: editUser
        }
      ]
    }
  ]
})
