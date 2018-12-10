<template>
    <div>
        <header id="header" class="mui-bar mui-bar-transparent">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">歌单</h1>
		</header>
        <!--背景图片+播放列表+-->
        <div class="music-list-wrapper">
            <div class="bg-image" style="background-image:url(/static/img/jryx_3_bg.jpg)" >
                <div class="filter"></div>
                <div class="text">
                    <h2 class="list-title">合|想把爱慕编程旋律 送给你</h2>
                    <p class="play-count" v-if="playCount">
                    <i class="fa fa-headphones"></i>
                    35万
                    </p>
                </div>
                </div>
                <!--播放列表-->
                <div class="song-list-wrapper">
                    <div class="sequence-play" >
                        <i class="iconfont icon-bofangicon"></i>
                        <span class="text">播放全部</span>
                        <span class="count">(共50首)</span>
                    </div>
                    <song-list @select="selectItem" :songs="songsList"></song-list>
                </div>
            </div>
            
        </div>
       
</template>
<script>
import songList from '../components/song-list.vue'
    export default {
        data(){
            return {
                listDetail:[],
                title:"",
                playCount:"",
                songsList:[{id:1,name:"画",author:"赵雷"},{id:2,name:"画",author:"赵雷"},{id:3,name:"画",author:"赵雷"},{id:4,name:"画",author:"赵雷"},{id:5,name:"画",author:"赵雷"},{id:6,name:"画",author:"赵雷"},{id:7,name:"画",author:"赵雷"},{id:8,name:"画",author:"赵雷"},{id:9,name:"画",author:"赵雷"},{id:10,name:"画",author:"赵雷"},{id:11,name:"画",author:"赵雷"},{id:12,name:"画",author:"赵雷"},{id:13,name:"画",author:"赵雷"},{id:14,name:"画",author:"赵雷"},{id:15,name:"画",author:"赵雷"},{id:16,name:"画",author:"赵雷"},{id:17,name:"画",author:"赵雷"},{id:18,name:"画",author:"赵雷"},{id:19,name:"画",author:"赵雷"},{id:20,name:"画",author:"赵雷"},{id:21,name:"画",author:"赵雷"}]
            }
        },
        prpos:["songs"],
        components:{
            "song-list":songList
        },
        computed:{
           
        },
        mounted(){
            
        },
        methods:{
            selectItem(item,index){
                this.selectPlay({
                    list:this.listDetail,
                    index:index
                })
            },
            sequence(){
                let list = this.listDetail
                this.sequencePlay({
                    list:list
                })
            }
        },
       
    }
</script>
<style>

    .music-list-wrapper .bg-image {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 75%;
        transform-origin: top;
        background-size: cover;
        background-position: 0 30%;
    }
    .music-list-wrapper .bg-image .filter {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: black;
          opacity: 0.2;
    }
    .music-list-wrapper .bg-image .text {
          position: absolute;
          width: 80%;
          height: 40px;
          bottom: 50px;
          left: 15px;
          color: #fff;
    }
    .music-list-wrapper .bg-image .text .play-count {
            position: absolute;
            bottom: -16px;
            font-size: 11px;
    }
    .music-list-wrapper .bg-image .text .list-title {
            position: absolute;
            bottom: 0;
            font-size: 16px;
            line-height: 18px;
            font-weight: bold;
            letter-spacing: 1px;
    }
    .song-list-wrapper {
        padding: 41px 0 20px 0;
        border-radius: 10px;
        position: relative;
        top:-20px;
        background: #F2F3F4;
    }
    .song-list-wrapper .sequence-play {
          position: absolute;
          top: 0px;
          display: flex;
          align-items: center;
          width: 100%;
          height: 40px;
          padding-left: 16px;
          border-bottom: 1px solid rgb(228, 228, 228);
    }
    .song-list-wrapper .sequence-play .iconfont {
            font-size: 18px;
            color: #2E3030;
            padding-right: 14px;
    }
    .song-list-wrapper .sequence-play .text {
            font-size: 16px;
    }
    .song-list-wrapper .sequence-play .count {
            font-size: 14px;
            color: #757575; 
    }
       
</style>