import Vue from 'vue'
import Router from 'vue-router'



import Home from '@/view/Home'
// import Video from '@/view/Video'
import Collection from '@/view/Collection'
import Personal from '@/view/Personal'
import Channel from '@/view/Channel'
import Detail from '@/view/Detail'
import Search from '@/view/Search'
// import Detail from '@/pages/home/detail'
// import Channel from '@/pages/home/channel'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/home/:type',
      component: Home,
    },
    {
      path: '/video',
      component: function (resolve) {
        require(['../view/Video.vue'], resolve);
      }
    },
    {
      path: '/collection',
      component: Collection
    },
    {
      path: '/personal',
      component: Personal
    },
    {
      path: '/detail',
      component: Detail
    },
    {
      path:'/search',
      component:Search
    },
    {
      path: '/',
      redirect: "/home/all"
    },
  ],
})
