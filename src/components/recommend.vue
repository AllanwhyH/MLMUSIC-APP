<template>
   <!--<div id="item1mobile" class="mui-slider-item mui-control-content ">	
        <swiper-box></swiper-box>
        <Card :tui="tuiList" ></Card>
        <Video></Video>
    </div>-->
    <div class="recommend" ref="recommend" >
        <scroll class="recommend-content" ref="scroll" :data="playList">
        <div>
            <div v-show="banner.length" class="decorate" v-if="banner.length"></div>
            <div v-if="banner.length" class="slider-wrapper">
                <swiper :banners="banner"></swiper>
            </div>
            <div class="recommend-list" ref="recommendList">
            <h1 class="title">推荐歌单</h1>
            <ul>
                <li class="item" v-for="item in playList" :key="item.id">
                <div class="icon" @click="selectList(item)">
                    <div class="gradients"></div>
                    <img v-lazy="item.picUrl">
                </div>
                <p class="play-count">
                    <i class="fa fa-headphones"></i>
                    {{Math.floor(item.playCount / 10000) }}万
                </p>
                <div class="text">
                    <p class="name" style="font-size:12px;color:#000;">{{item.name}}</p>
                </div>
                </li>
            </ul>
            </div>
            <div class="recommend-song" ref="recommendSong">
            <h1 class="title">推荐歌曲</h1>
            <ul>
                <li class="item" v-for="item in recommendMusic" :key="item.id" @click="selectSong(item)">
                <div class="icon">
                    <img v-lazy="item.picUrl">
                </div>
                <p class="text">{{item.name}}</p>
                <p class="singer">{{item.singer}}</p>
                </li>
            </ul>
            </div>
        </div>
        </scroll>
        <router-view></router-view>
    </div>
    
</template>
<script>
    import Scroll from '../components/scroll.vue'
    import Loading from '../components/loading.vue'
    import Swiper from '../components/swiper.vue'
    //import {mapMutations, mapActions} from 'vuex'
    //import { getRecommendMusic } from 'api/recommend.js'
    //import Card from '../components/Card.vue'
    //import swiper from '../components/swiper.vue'
    //import Video from '../components/Video.vue'
    export default {
        data(){
            return {
                //tuiList:[],
                banner: [],
                playList: [],
                recommendMusic: []
            }
        },
        mounted(){
            this.axios.get(
                "http://localhost:3000/personalized"
            ).then(res1=>{
                console.log(res1.data.result)
                this.playList = res1.data.result
            })
            this.axios.get(
                "http://localhost:3000/banner"
            ).then(res2=>{
                console.log(res2.data)
                this.banner = res2.data.banners
            });
            this.axios.get(
                "http://localhost:3000/personalized/djprogram"
            ).then(res3=>{
                console.log(res3)
                this.recommendMusic = res3.data.result
            })

        },
        methods:{
            selectList(item){
                this.$router.push({
                    path: `/recommend/${item.id}`
                })
                //this.setMusicList(item)
            },
            //...mapMutations({
            //    setMusicList: 'SET_MUSIC_LIST',
            //})
        },
        components:{
            //"Card":Card,
            //"swiper-box":swiper,
            //"Video":Video
            "scroll":Scroll,
            "loading":Loading,
            "swiper":Swiper
        },
    }
</script>
<style>
    ul{
        padding:0;
        margin:0;
    }
</style>
<style lang="scss" >
@import "../common/scss/variable";
@import "../common/scss/mixin";
 .recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  z-index: 100;
  .recommend-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .decorate {
      position: absolute;
      top: -30vh;
      z-index: -10;
      background: $color-theme;
      width: 100%;
      height: 50vh;
      vertical-align: inherit;
    }
    .slider-wrapper {
      width: 96%;
      margin: 0 auto;
      border-radius: 5px;
      overflow: hidden;
    }
    .recommend-list {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      text-align: center;
      .title {
        height: 65px;
        line-height: 65px;
        padding-left: 1.5%;
        text-align: left;
        font-size: $font-size-medium;
        font-weight: bold;
        color: $color-text;
      }
      .item {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        width: 33%;
        padding: 0 1%;
        .icon {
          position: relative;
          display: inline-block;
          width: 100%;
          margin-bottom: 5px;
          .gradients {
            position: absolute;
            top: 0;
            width: 100%;
            height: 35px;
            border-radius: 3px;
            background: linear-gradient(rgba(109, 109, 109, 0.4),rgba(255, 255, 255, 0));
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 3px;
          }
        }
        .play-count {
          position: absolute;
          top: 5px;
          right: 8px;
          font-size: $font-size-small-s;
          color: $color-text-l
        }
        .text {
          float: left;
          line-height: 16px;
          text-align: left;
          height: 40px;
          line-height: 16px;
          overflow: hidden;
          margin-bottom: 10px;
          font-size: $font-size-small;
        }
      }
    }
    .recommend-song {
      margin-top: -20px;
      box-sizing: border-box;
      width: 100%;
      text-align: center;
      .title {
        height: 65px;
        line-height: 65px;
        padding-left: 1.5%;
        text-align: left;
        font-size: $font-size-medium;
        font-weight: bold;
        color: $color-text;
      }
      .item {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        width: 33%;
        padding: 0 1%;
        .icon {
          position: relative;
          display: inline-block;
          width: 100%;
          margin-bottom: 5px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 3px;
          }
        }
        .text {
          line-height: 16px;
          text-align: left;
          height: 16px;
          @include no-wrap();
          font-size: $font-size-small;
        }
        .singer {
          line-height: 16px;
          margin-bottom: 10px;
          text-align: left;
          @include no-wrap();
          font-size: $font-size-small;
          color: $color-text-g;
        }
      }
    }
  }
 }
</style>