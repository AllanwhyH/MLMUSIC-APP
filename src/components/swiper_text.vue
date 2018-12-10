<template>
    <!-- <div class="mui-content">
        <div id="slider" class="mui-slider swiper">
            <div class="mui-slider-group mui-slider-loop">
                额外增加的一个节点(循环轮播：第一个节点是最后一张轮播)
                <div class="mui-slider-item mui-slider-item-duplicate">
                    <a href="#">
                        <img src="../assets/img/xlb_1.png">
                        <p class="mui-slider-title">静静看这世界</p>
                    </a>
                </div>
                <div class="mui-slider-item" v-for="item of list" :key="item.id">
                    <a href="#">
                        <img :src="item.img">
                        <p class="mui-slider-title">幸福就是可以一起睡觉</p>
                    </a>
                </div> -->
                
                <!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播)
                <div class="mui-slider-item mui-slider-item-duplicate">
                    <a href="#">
                        <img src="../assets/img/xlb_1.png">
                        <p class="mui-slider-title">幸福就是可以一起睡觉</p>
                    </a>
                </div>
            </div>
            <div class="mui-slider-indicator mui-text-right">
                <div class="mui-indicator mui-active " v-for="item of list"></div>
                
            </div>
        </div>
    </div> -->
    <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in list" :key="item.id" >
            <h3><image width="200px" style="overflow:visible;display:block;z-index:3;"  height="100%" :src="item.img" /></h3>
        </el-carousel-item>
    </el-carousel>
</template>
<script>
    export default {
        data(){
            return {
                list:[{id:1,img:"/static/img/xlb_1.png"},{id:2,img:"/static/img/xlb_2.png"},{id:3,img:"/static/img/xlb_3.png"},{id:4,img:"/static/img/xlb_4.png"},{id:5,img:"/static/img/xlb_5.png"},{id:6,img:"/static/img/xlb_6.png"},{id:7,img:"/static/img/xlb_7.png"}]
            }
        },
        mounted(){
            var slider = mui(".swiper");
            slider.slider({
                interval: 5000
            });
        }
    }
    
</script>
<style >
    #slider .imgSize{
        width:96%;
        border-radius:10px;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }
    
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    
</style>