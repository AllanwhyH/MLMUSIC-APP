<template>
    <!--<div id="item2mobile" class="mui-slider-item mui-control-content mui-active">
        <div class="rank" ref="rank">
            <ul >
                <a class="item"  v-for="(item,index) in yunTopList" :key="index" @click.stop="selectItem(index)">
                    <div class="icon">
                        <img v-lazy="item.coverImgUrl" width="100" height="100">
                    </div>
                    <ul class="songlist">
                        <li class="song" v-for="(song, index) in item.tracks" :key="index">
                        <span>{{index + 1}}.</span>
                        <span>{{song.first}} - {{song.second}}</span>
                        </li>
                    </ul>
                </a>
            </ul>
                <div class="loading-container" v-show="!yunTopList.length">
                <loading></loading>
            </div> 
            <router-view></router-view>
        </div>

    </div>-->
    <div class="rank" ref="rank">
    <scroll class="toplist" ref="scroll">
      <ul>
        <li class="item" v-for="(item,index ) in yunTopList" :key="item.id" @click="selectItem(item)">
          <div class="icon">
            <img v-lazy="item.coverImgUrl" width="100" height="100">
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, index) in item.tracks" :key="index">
              <span>{{index + 1}}.</span>
              <span>{{song.first}} - {{song.second}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <!-- <div class="loading-container" v-show="!yunTopList.length">
        <loading></loading>
      </div> -->
      <div v-show="showLoading" class="loading-content">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script>
    import Scroll from '../components/scroll.vue'
    import Loading from '../components/loading.vue'
    import {mapMutations} from 'vuex'    
    const YUNMUSIC_TOP = [0, 1, 2, 3, 4, 22, 23]   
    export default {
       // mixins: [playlistMixin],
        data(){
            return {
                yunTopList:[],
                showLoading:true
            }
        },
        
        methods:{
            selectItem(item){
                //console.log(12345)
                this.$router.push({path:`/rank/${item.id}`})
            },
            handlePlaylist (playlist) {
                const bottom = playlist.length > 0 ? '60px' : ''
                this.$refs.rank.style.bottom = bottom
                this.$refs.scroll.refresh()
            },
            _getTopList () {
                for (let i = 0; i < YUNMUSIC_TOP.length; i++) {
                    getTop(YUNMUSIC_TOP[i]).then((res) => {
                    let list = res.data.playlist
                    list.top = res.data.playlist.tracks.slice(0, 3)
                    this.yunTopList.push(list)
                    // console.log(list)
                    })
                    if (i === YUNMUSIC_TOP.length - 1) {
                    this.showLoading = false
                    }
                }
            },
            ...mapMutations({
                setTopList: 'SET_TOP_LIST'
            })
            
        },
        mounted(){
            /*this.axios.get(
                `http://localhost:3000/top/list?idx=${0}`
            ).then(res0=>{
                console.log(res0.data)
            })*/
            this.axios.get(
                "http://localhost:3000/toplist/detail",
            ).then(res=>{
                //console.log(res.data.list)
                this.yunTopList = res.data.list
                console.log(this.yunTopList)
            }),
            this.axios.get(
                "http://localhost:3000/toplist"
            ).then(res1=>{
                console.log(res1.data)
            })
            
        },
        components:{
            "scroll":Scroll,
            "loading":Loading
        },
        computed:{
            
        }
    }
</script>
<style>
    ul{
        padding:0;
        margin:0;
    }
</style>
<style scoped lang="scss" >
@import "../common/scss/variable";
@import "../common/scss/mixin";


.rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .toplist {
    height: 100%;
    overflow: hidden;
    padding-top: 5px;
    .item {
      display: flex;
      margin: 0 10px;
      padding: 3px 0;
      height: 107px;
      border-bottom: 1px solid rgb(228, 228, 228);
      &:last-child {
        padding-bottom: 20px;
      }
      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
        img {
          border-radius: 3px;
        }
      }
      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        // background: $color-dialog-background;
        color: $color-text;
        font-size: $font-size-small-x;
        .song {
          @include no-wrap();
          line-height: 30px;
          text-align:left;
        }
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
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
