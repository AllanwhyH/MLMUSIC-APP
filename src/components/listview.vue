<template>
    <scroll class="listview" ref="listview" :listenScroll="listenScroll" :probeType="probeType">
        <ul>
            <li v-for="group in data" class="list-group" :key="group.id" ref="listGroup">
                <h2 class="list-group-title">{{ group.title }}</h2>
                <ul>
                    <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item" :key="item.id">
                        <image v-lazy="item.avatar" class="avatar"/>
                        <span class="name">{{ item.name }}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart="onShortcutStart" @touchmove.stop.prevent="onShortcutMove">
            <ul>
                <li v-for="(item, index) in shortcutList" class="item" :data-index="index" :key="item.id" :class="{'current': currentIndex === index }">{{ item }}</li>
            </ul>
        </div>
    </scroll>
</template>
<script>   
    import Scroll from '../components/scroll.vue'
    export default {
        data(){
            return {}
        },
        props:{
            data:{
                type:Array
            }
        },
        methods:{
            onShortcutStart (e) {
                let anchorIndex = getData(e.target, 'index')
                let firstTouch = e.touches[0]
                this.touch.y1 = firstTouch.pageY
                this.touch.anchorIndex = anchorIndex
                this._scrollTo(anchorIndex)
            },
            onShortcutMove (e) {
                let firshTouch = e.touches[0]
                this.touch.y2 = firshTouch.pageY
                let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
                let anchorIndex = parseInt(this.touch.anchorIndex) + delta
                this._scrollTo(anchorIndex)
            },
        },
        created(){
            this.listenScroll = true
            this.probeType = 3
        },
        computed:{
            shortcutList () {
                return this.data.map((group) => {
                    if(typeof group.title != "undefined" ){
                        return group.title.substr(0,1)
                    } else {
                        group.title = ""
                    }
                    
                })
            },
        },
        components:{
            "scroll":Scroll
        }
    }
</script>
<style>
    
</style>