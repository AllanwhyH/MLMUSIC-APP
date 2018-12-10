<template>
    <transition name="slide" mode="out-in">
        <div class="music-list">
            <div class="header" ref="header" style="margin-top:9px;">
                <div class="back" @click="back">
                    <i class="fa fa-angle-left"></i>
                </div>
                <div class="text">
                    <h1 class="title" style="font-size:16px;font-weight:normal;">{{headerTitle}}</h1>
                </div>
            </div>
            <scroll class="list"
            @scroll="scroll"
            :probe-type="probeType"
            :listen-scroll="listenScroll"
            :data="listDetail"
            ref="list">
            <div class="music-list-wrapper">
                <div class="bg-image" :style="bgStyle" ref="bgImage">
                    <div class="filter"></div>
                    <div class="text">
                        <h2 class="list-title">{{title}}</h2>
                        <p class="play-count" v-if="playCount" style="color:white;">
                        <i class="fa fa-headphones" ></i>
                        {{Math.floor(this.playCount / 10000) + '万'}}
                        </p>
                    </div>
                </div>
                <div class="song-list-wrapper">
                    <div class="sequence-play" v-show="listDetail.length" @click="sequence">
                        <i class="iconfont icon-bofangicon"></i>
                        <span class="text">播放全部</span>
                        <span class="count">(共{{listDetail.length}}首)</span>
                    </div>
                    <div class="song-list">
                        <ul>
                            <li v-for="(song, index) in listDetail" :key="index" class="item" @click="selectItem(song, index)">
                            <!-- <div class="rank" v-show="rank">
                                <span :class="getRankCls(index)">{{getRankText(index)}}</span>
                            </div> -->
                            <p class="count">{{index + 1}}</p>
                            <div class="content">
                                <h2 class="name">{{song.name}}</h2>
                                <p class="desc">{{song.ar[0].name}}</p>
                            </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            </scroll>
            <div v-show="!listDetail.length" class="loading-content">
            <loading></loading>
            </div>
        </div>
    </transition>
</template>
<script>    
    import Scroll from '../components/scroll.vue'
    import Loading from '../components/loading.vue'
    import { mapGetters, mapActions } from 'vuex'
    export default {
        data(){
            return {
                headerTitle: '歌单',
                scrollY:0,
                title:"",
                listDetail:[],
                bgImage:"",
                id:"",
                playCount:"",
                authors:[],
            }
        },
        created(){
            //this._getRecommendListDetail(this.musicList.id)
            this.probeType = 3
            this.listenScroll = true
        },
        mounted(){
            this.id = this.$route.params.id
            this.axios.get(
                `http://localhost:3000/playlist/detail?id=${this.id}`
            ).then(res=>{
                console.log(res.data)
                this.title = res.data.playlist.name
                this.playCount = res.data.playlist.playCount
                
                this.bgImage = res.data.playlist.coverImgUrl
                this.listDetail = res.data.playlist.tracks
                // for(let p of list){
                //     this.listDetail.push(p.al)
                //     this.authors.push(p.ar[0])
                // }
                console.log(this.listDetail)
                console.log(this.authors)
            })
        },
        computed:{
            bgStyle (){
                return `background-image: url(${this.bgImage})`
            },
            ...mapGetters([
               'musicList'
            ])
        },
        methods:{
            selectItem (item,index) {
                this.selectPlay({
                    list: this.listDetail,
                    index: index
                })
            },
            back(){
                this.$router.back()
            },
            scroll (pos) {
                this.scrollY = pos.y
            },
            _getRecommendListDetail (id) {
                if (!id) {
                    this.$router.push('/recommend')
                    return
                }
                this.axios.get(
                    `http://localhost:3000/playlist/detail?id=${id}`
                ).then(res=>{
                    if(res.status === ERR_OK) {
                        this.listDetail = res.data.result.tracks.map((item)=>{
                            return creadteRecommendListSong(item)
                        })
                    } else {
                        console.log('getRecommendListDetail 获取失败!')
                    }
                })
            },
            sequence () {
                let list = this.listDetail
                this.sequencePlay({
                    list: list
                })
            },
            ...mapActions([
               'selectPlay',
               'sequencePlay'
            ])   
        },
        components:{
            "scroll":Scroll,
            "loading":Loading
        }
    }    
</script>
<style lang="scss">
@import "../common/scss/variable";
@import "../common/scss/mixin";
@import "../common/scss/ali-icon";
.slide-enter-active, .slide-leave-active {
  transition: all 0.2s
}
.slide-enter, .slide-leave-to {
  transform: translate3d(30%, 0, 0);
  opacity: 0;
}

.music-list {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 44px;
    color: #fff;
    z-index: 100;
    .back {
      position: absolute;
      top: 0;
      left: 4px;
      .fa-angle-left {
        padding: 5px 10px;
        font-size: 30px;
      }
    }
    .text {
      position: absolute;
      left: 38px;
      line-height: 44px;
      font-size: $font-size-medium-x;
      @include no-wrap()
    }
  }
  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;
    .music-list-wrapper {
      .bg-image {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 75%;
        transform-origin: top;
        background-size: cover;
        background-position: 0 30%;
        .filter {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: black;
          opacity: 0.2;
        }
        .text {
          position: absolute;
          width: 100%;
          height: 40px;
          bottom: 50px;
          left: 15px;
          color: #fff;
          .play-count {
            position: absolute;
            bottom: -16px;
            font-size: $font-size-small;
          }
          .list-title {
            position: absolute;
            bottom: 0;
            font-size: $font-size-medium-x;
            line-height: 18px;
            font-weight: bold;
            letter-spacing: 1px;
          }
        }
      }
      .song-list-wrapper {
        padding: 41px 0 20px 0;
        border-radius: 10px;
        position: relative;
        top:-20px;
        background: $color-background;
        .sequence-play {
          position: absolute;
          // left: 8;
          top: 0px;
          display: flex;
          align-items: center;
          width: 100%;
          height: 40px;
          padding-left: 16px;
          border-bottom: 1px solid rgb(228, 228, 228);
          .iconfont {
            font-size: 18px;
            color: $color-text;
            padding-right: 14px;
          }
          .text {
            font-size: $font-size-medium-x;
          }
          .count {
            font-size: $font-size-medium;
            color: $color-text-g;
          }
        }
      }
      
      // position: fixed;
      // top: 0;
      // bottom: 0;
      // width: 100%;
      // background: $color-background;
      // height: 100%;
      // z-index: 20;
      // overflow: hidden;
        // padding: 5px 0 20px 0;
    }
  }
  .loading-content {
    position: fixed;
    width: 100%;
    top: 70%;
    transform: translateY(-50%);
  }
}
</style>
<style>
    ul,p{
    list-style:none;
    padding:0;
    margin:0;
    }
    .song-list .item {
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 60px;
    border-bottom: 1px solid rgb(228, 228, 228);
    }
    .song-list .item .count {
        flex: 0 0 50px;
        width: 50px;
        text-align: center;
        color:#757575; 
    }
    .song-list .item .content {
        flex: 1;
        line-height: 20px;
        overflow: hidden;
    }
    .song-list .item .content .name {
        margin-top: 4px;
        width: 80%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap; 
        color:#2E3030;   
        text-align:left;
        font-size:16px;
        line-height:20px;
        margin:0;
        font-weight:normal;
        
    }
    .song-list .item .content .desc {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 80%;
        font-size: 12px;
        color:#757575; 
        text-align:left;
        font-weight:400

    }
</style>
