<template>
    <div>
        <Header></Header>
        <tab></tab>
        <!--<router-view></router-view>-->
        
    </div>
</template>
<script>
import Tab from '@/components/tab2.vue'
import Header from '@/components/Header.vue'
// import Nav from '@/components/Tab.vue'
    export default {
        components:{
            Header,
            Tab
            // Nav
        }
    }
</script>

<style>
    
</style>