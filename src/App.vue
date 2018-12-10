<template>
  <div id="app">
    <!--<router-view/>-->
    <!--<Header></Header>-->
    <MHeader></MHeader> 
    <Tab></Tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!--<router-view></router-view>-->
    <player></player>
  </div>
</template>

<script>
import Tab from '@/components/tab2.vue'
import MHeader from '@/components/m-header.vue'
import Player from '@/components/player.vue'
//import Header from '@/components/Header.vue'
// import Nav from '@/components/Tab.vue'
    export default {
        name: 'App',
        components:{
            //Header,
            "Tab":Tab,
            "MHeader":MHeader,
            "player":Player
            // Nav
        }
    }
</script>

<style>
body{
  
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
</style>
