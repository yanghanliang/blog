import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/webs/index/index'

// admin-start
import login from '@/views/login'
import admin from '@/components/webs/admin/index'
// import listUser from '@/components/webs/admin/a/list'
// import addUser from '@/components/webs/admin/a/add'
// import editUser from '@/components/webs/admin/a/edit'
import addArticle from '@/components/webs/admin/article/addArticle'
import articleList from '@/components/webs/admin/article/articleList'
import addCategory from '@/components/webs/admin/category/addCategory'
import categoryList from '@/components/webs/admin/category/categoryList'
import editCategory from '@/components/webs/admin/category/editCategory'
// admin-end

// index-start
import common from '@/components/webs/index/common'
import articleDetails from '@/components/webs/index/article/articleDetails'
import catalogList from '@/components/webs/index/catalog/catalogList'
// index-end

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/common',
      children: [
        {
          path: 'common',
          name: 'common',
          component: common
        },
        {
          path: 'catalogList',
          name: 'catalogList',
          component: catalogList
        }
      ]
    },
    {
      path: '/articleDetails/:articleId',
      name: 'articleDetails',
      component: articleDetails
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      redirect: '/admin/articleList',
      children: [
        {
          path: 'addArticle',
          name: 'addArticle',
          component: addArticle
        },
        {
          path: 'articleList',
          name: 'articleList',
          component: articleList
        },
        {
          path: 'addArticle/:articleId',
          name: 'editArticle',
          component: addArticle
        },
        {
          path: 'addCategory',
          name: 'addCategory',
          component: addCategory
        },
        {
          path: 'categoryList',
          name: 'categoryList',
          component: categoryList
        },
        {
          path: 'editCategory/:categoryId',
          name: 'editCategory',
          component: editCategory
        }
      ]
    }
  ]
})
