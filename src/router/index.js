import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from './../views/GoodsList'
import Title from './../views/Title'
import Image from './../views/Image'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods',  //动态路由，必须输入这个地址才能访问到对应的页面
      name: 'GoodsList',
      component: GoodsList,
      children:[
        {
          path: 'title',
          name: 'title',
          component:Title
        },
        {
          path: 'img',
          name: 'img',
          component:Image
        }
      ]
    }
    ]

})
