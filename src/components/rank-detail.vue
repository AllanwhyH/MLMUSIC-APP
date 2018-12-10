<template>
    <transition name="slide">
        <div class="music-list">
            <div class="header" ref="header" style="margin-top:9px">
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
            ref="list">
            <div class="music-list-wrapper">
                <div class="bg-image" :style="`background-image:url(${list.coverImgUrl})`" ref="bgImage">
                <div class="filter"></div>
                <div class="text">
                    <h2 class="list-title">
                    <!-- <p class="music">云音乐</p> -->
                        {{title}}
                    </h2>
                    <!--<p class="update">{{updateTime}}</p>-->
                </div>
                </div>
                <div class="song-list-wrapper">
                <div class="sequence-play" v-show="listDetail.length" @click="sequence">
                    <i class="iconfont icon-bofangicon"></i>
                    <span class="text">播放全部</span>
                    <span class="count">(共{{6}}首)</span>
                </div>
                <!--<song-list @select="selectItem" :songs="listDetail"></song-list>-->
                    <div class="song-list">
                        <ul>
                            <li class="item" @click="selectItem(song,index)" v-for="(song, index) in listDetail" :key="index">
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
            <div v-show="!listDetail.length" class="loading-content">
                <loading></loading>
            </div>
          </scroll>
        </div>
    </transition>
</template>
<script>    
    import Scroll from '../components/scroll.vue'
    import {mapGetters, mapActions} from 'vuex'
    import SongList from '../components/song-list.vue'
    import Loading from '../components/loading.vue'
    //import { playlistMixin } from '../common/js/mixin'
    export default {
        data () {
            return {
                listDetail:[],
                id:"",
                scrollY: 0,
                node: null,
                headerTitle:"歌手",
                playCount:"",
                list:[],
                title:""
            }
            
        },
        props:["songs"],
        
        mounted(){
            this.id = this.$route.params.id
            this.axios.get(
                `http://localhost:3000/playlist/detail?id=${this.id}`,
                
            ).then(res=>{
                console.log(res.data)
                this.list = res.data.playlist
                //console.log(this.list)
                this.title = res.data.playlist.name
                //console.log(res.data.playlist.tracks)
                this.listDetail = res.data.playlist.tracks
                // for(let p of list){
                //     this.listDetail.push(p.al)
                // }
                console.log(this.listDetail)
                //this.listDetail = res.data
            })
            this.axios.get(
                `http://localhost:3000/playlist/detail?id=${this.id}`
            ).then(res2=>{
                console.log(res2.data)
            })
            
            
        },
        methods:{
            handlePlaylist (playlist) {
                const bottom = playlist.length > 0 ? '60px' : ''
                this.$refs.list.$el.style.bottom = bottom
                this.$refs.list.refresh()
            },
            _normalizeSongs (list) {
                if (!this.topList.id) {
                    this.$router.push('/rank')
                    return
                }
                let ret = []
                list.forEach((item) => {
                    ret.push(createSong(item))
                })
                this.listDetail = ret
            },
            selectItem (item, index) {
                this.selectPlay({
                    list: this.listDetail,
                    index: index
                })
            },
            back () {
                this.$router.back()
            },
            sequence(){
                let list = this.listDetail
                this.sequencePlay({
                    list: list
                })
            },
            scroll (pos) {
                this.scrollY = pos.y
            },
            ...mapActions([
                'selectPlay',
                'sequencePlay'
            ])
        },
        computed:{
            updateTime () {
                let time = new Date(this.topList.updateTime)
                let month = time.getMonth() + 1
                let day = time.getDate()
                return `最近更新:${month}月${day}日`
            },
            ...mapGetters([
                'topList'
            ])
        },
        components:{
            "song-list":SongList,
            "loading":Loading,
            "scroll":Scroll,
        },
        created(){
            //this.selectItem()
            //console.log(this.$route.params.idx)
            let Id = this.$route.params.idx
            this.idx = Id
            this.listenScroll = true
            this.probeType = 3
        }
    }
</script>
<style lang="scss" >
@import "../common/scss/variable";
@import "../common/scss/mixin";
  .slide-enter-active, .slide-leave-active {
  transition: all 0.2s
    }
    .slide-enter, .slide-leave-to {
    transform: translate3d(30%, 0, 0);
    opacity: 0;
    }

    .music-list {
    position: fixed;
    z-index: 100;
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
            width: 80%;
            height: 40px;
            bottom: 50px;
            left: 20px;
            color: #fff;
            .list-title {
                position: absolute;
                bottom: 0;
                font-style: italic;
                font-size: $font-size-large;
                line-height: 18px;
                font-weight: bold;
                letter-spacing: 1px;
                .music {
                position: absolute;
                top: -20px;
                left: 5px;
                font-style: italic;
                font-weight: bold;
                font-size: $font-size-medium;
                }
            }
            .update {
                position: absolute;
                top: 45px;
                left: 7px;
                line-height: 14px;
                font-size: $font-size-small;
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
