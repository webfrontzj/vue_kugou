import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/newSongs',
      component: require('../views/NewSongs').default,//不加.default的话会报template or render function not defined
      alias:'/'
    },{
      path:'/rank',
      component:require('../views/rank').default
    },{
      path:'/rank/info/:id',
      component:require('../views/RankInfo').default
    },{
      path:'/plist',
      component:require('../views/plist').default
    },{
      path:'/plist/info/:id',
      component:require('../views/PlistInfo.vue').default
    },{
      path:'/singer',
      component:require('../views/singer').default
    },{
      path:'/singer/list/:id',
      component:require('../views/SingerList').default
    },{
      path:'/singer/info/:id',
      component:require('../views/SingerInfo').default
    },{
      path:'/search',
      component:require('../views/search').default
    }
  ]
})
