<template>
    <div id="header">
        <div id="offCanvasWrapper" class="mui-off-canvas-wrap mui-draggable">
			<!--侧滑菜单部分-->
			<aside id="offCanvasSide" class="mui-off-canvas-left">
				<div id="offCanvasSideScroll" class="mui-scroll-wrapper">
					<div class="mui-scroll">
						<div class="title">侧滑导航</div>
						<div class="content">
							这是可拖动式侧滑菜单示例，你可以在这里放置任何内容；关闭侧滑菜单有多种方式： 1.在手机屏幕任意位置向左拖动(drag)；2.点击本侧滑菜单页之外的任意位置; 3.点击如下红色按钮
							<span class="android-only">；4.Android手机按back键；5.Android手机按menu键
							</span>。
							<p style="margin: 10px 15px;">
								<button id="offCanvasHide" type="button" class="mui-btn mui-btn-danger mui-btn-block" style="padding: 5px 20px;">关闭侧滑菜单</button>
							</p>

						</div>
						<div class="title" style="margin-bottom: 25px;">侧滑列表示例</div>
						<ul class="mui-table-view mui-table-view-chevron mui-table-view-inverted">
							<li class="mui-table-view-cell">
								<a class="mui-navigate-right">
									Item 1
								</a>
							</li>
							<li class="mui-table-view-cell">
								<a class="mui-navigate-right">
									Item 2
								</a>
							</li>
							<li class="mui-table-view-cell">
								<a class="mui-navigate-right">
									Item 3
								</a>
							</li>
							<li class="mui-table-view-cell">
								<a class="mui-navigate-right">
									Item 4
								</a>
							</li>
							<li class="mui-table-view-cell">
								<a class="mui-navigate-right">
									Item 5
								</a>
							</li>
							<li class="mui-table-view-cell">
								<a class="mui-navigate-right">
									Item 6
								</a>
							</li>
						</ul>
					</div>
				</div>
			</aside>
			<!--主界面部分-->
			<div class="mui-inner-wrap">
				<header id="myheader" class="mui-bar mui-bar-nav bg">
					<a href="#offCanvasSide" class="mui-icon mui-action-menu mui-icon-bars mui-pull-left"></a>
					<a class="mui-action-back mui-btn mui-btn-link mui-pull-right">关闭</a>
					<h1 class="mui-title">
						云音乐
					
					</h1>
				</header>
				<div id="offCanvasContentScroll" class="mui-content mui-scroll-wrapper">
					<div class="mui-scroll">
                        <!--Nav
						<Nav></Nav>-->
					</div>
				</div>
				<!-- off-canvas backdrop -->
				<div class="mui-off-canvas-backdrop"></div>
			</div>
		</div>
        
    </div>
</template>
<script>
    // import swiper from '../components/swiper.vue'
    import Nav from '../components/Tab.vue'
    export default {
        data(){
            return {
            //   list:[{img:"/static/img/lb_1.png"},{img:"/static/img/lb_2.png"},{img:"/static/img/lb_3.png"},{img:"/static/img/lb_4.png"},{img:"/static/img/lb_5.png"},{img:"/static/img/lb_6.png"},{img:"/static/img/lb_7.png"},{img:"/static/img/lb_8.png"}]
            }
        },
        components:{//2.注册
            // "swiper-box":swiper,
            "Nav":Nav
        },
        mounted(){
           
        }
        
        
    }
</script>

<style>
    #header{
        height:4000px;
    }
    #myheader{
        background:rgb(202,40,55);
    }
    #myheader a,#myheader h1{
        color:rgb(252,242,242);
    }
    #header .myImg{
        width:60%;
    }
    
    
    
	
</style>