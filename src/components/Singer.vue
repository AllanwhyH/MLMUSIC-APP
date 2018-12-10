<template>
    <div class="singer" ref="singer">
        <list-view :data="this.singers" @select="selectSinger" ref="list"></list-view>
        <router-view></router-view>
    </div>
</template>
<script>
    import ListView from '../components/listview.vue'
    const pinyin = require('pinyin')
    const HOT_NAME = '热门'
    const HOT_SINGERS = 10
    export default {
        data(){
            return {
                singers:[]
            }
        },
        //props:["singers"],
        mounted(){
            this.axios.get(
                "http://localhost:3000/top/artists?limit=100"
            ).then(res1=>{
                console.log(res1.data)
                this.singers = res1.data.artists
            })
        },
        created(){
            this._getSingers()
        },
        methods:{
            selectSinger (singer) {
                this.$router.push({
                    path: `/singer/${singer.id}`
                })
                
            },
            _getSingers () {
                this.axios.get(
                "http://localhost:3000/top/artists?limit=100"
                ).then(res1=>{
                    let s = res1.data.artists
                    s.map((item)=>{
                        let py = pinyin(item.name[0],{
                            style: pinyin.STYLE_FIRST_LETTER
                        })
                        item.initial = py[0][0].toUpperCase()
                    })
                    this.singers = this._normalizeSinger(s)
                })
            },
            _normalizeSinger (list) {
                let map = {
                    hot: {
                        title:HOT_NAME,
                        item: []
                    }
                }
                list.forEach((item, index) => {
                    if (index < HOT_SINGERS){
                        map.hot.items.push(new Singer({
                            id: item.id,
                            name: item.name,
                            avatar: item.img1v1Url,
                            aliaName: item.alias.join(' / ')
                        }))
                    }
                    const key = item.initial
                    if(!map[key]){
                        map[key] = {
                            title: key,
                            items: []
                        }
                    }
                    map[key].items.push(new Singer({
                        id: item.id,
                        name:item.name,
                        avatar: item.img1v1Url,
                        aliaName: item.alias[0]
                    }))
                })
                let hot = []
                let ret = []
                for(const key in map) {
                    let val = map[key]
                    if (val.title.match(/[A-Z]/)){
                        ret.push(val)
                    } else if (val.title === HOT_NAME) {
                        hot.push(val)
                    }
                }
                ret.sort((a,b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                })
                return hot.concat(ret)
            },
        },
        components:{
            "list-view":ListView
        }
    }
</script>
<style>
    
</style>