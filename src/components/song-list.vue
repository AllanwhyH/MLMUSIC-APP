<template>
    <div class="song-list">
        <ul>
            <li class="item" @click="selectItem(song,index)" v-for="(song, index) in songs" :key="item.id">
            <!-- <div class="rank" v-show="rank">
                <span :class="getRankCls(index)">{{getRankText(index)}}</span>
            </div> -->
            <p class="count">{{index + 1}}</p>
            <div class="content">
                <h2 class="name">{{song.name}}</h2>
                <p class="desc">{{getDesc(song)}}</p>
            </div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props: {
            songs: {
                type: Array
            }
        },
        methods: {
            selectItem ( index) {
                this.$emit('select', index)
            },
            
        }
    }
</script>
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
