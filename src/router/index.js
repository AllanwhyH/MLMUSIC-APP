import Vue from 'vue'
import Router from 'vue-router'
//import Index from '@/components/Index'
//import Home from '@/components/Home'
import VideoItem from '@/components/Video-item'
import Play from '@/components/player'
//import Tab from '@/components/Tab'
import RankDetail from '@/components/rank-detail'
import Recommend from '@/components/recommend'
import MusicList from '@/components/music-list'
import Rank from '@/components/rank'
import Singer from '@/components/Singer'


Vue.use(Router)

export default new Router({
  routes: [
    /**/
    //{ path: '/',name: 'Home',component: Home,children:[
      //{ path:'/',name: 'Index',component: Index},
      //{ path:'tab',component:Tab,children:[
       // { path:'recommend',component:Recommend},
       // { path:'rank',component:Rank},
      //]},

    //]},
    { path:'/',redirect:'/recommend'},
    { path: '/recommend',component: Recommend,children: [
        { path: ':id', component: MusicList}
      ]
    },
    { path:'/rank',component:Rank,children:[
      { path: ':id',component:RankDetail}
    ]},
    { path:'/singer',component:Singer},
    { path: '/video-item',name: 'VideoItem',component:VideoItem },
    { path:'/play',component:Play },
    { path:'/rankdetail/:idx',component:RankDetail},
    
    
  ]
})
