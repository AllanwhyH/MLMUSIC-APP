<template>
    <div id="swiper" class="mui-slider swiper">
        <div class="mui-slider-group mui-slider-loop">
            <!--支持循环，需要重复图片节点-->
            <div class="mui-slider-item mui-slider-item-duplicate " style="border:0;"><a href="#"><img :src="banners[7].imageUrl" class="imgSize" /></a></div>
            <div class="mui-slider-item" v-for="item of banners " :key="item.id" style="border:0;"><a href="#"><img class="imgSize" :src="item.imageUrl" /></a></div>
            
            <!--支持循环，需要重复图片节点-->
            <div class="mui-slider-item mui-slider-item-duplicate" style="border:0;" ><a href="#"><img :src="banners[0].imageUrl"  class="imgSize"/></a></div>
        </div>
        <div class="mui-slider-indicator">
            <div class="mui-indicator mui-active" v-for="item of banners" :key="item.id"></div>
            
        </div>
    </div>  
</template>
<script>
    
    export default {
        data(){
            return {
                list:[]//list:[{img:"/static/img/lb_1.png"},{img:"/static/img/lb_2.png"},{img:"/static/img/lb_3.png"},{img:"/static/img/lb_4.png"},{img:"/static/img/lb_5.png"},{img:"/static/img/lb_6.png"},{img:"/static/img/lb_7.png"},{img:"/static/img/lb_8.png"}]
            }
        },
        props:["banners"],
        mounted(){
            var gallery = mui('.swiper');
            gallery.slider({
                interval:4000
            })
        },
        methdos:{
           
        },
        created(){
            
        }
    }
</script>

<style >
    
    #swiper .imgSize{
        height:156px;
    }
</style>