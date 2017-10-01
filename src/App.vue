<!-- 以后项目的根组件 -->
<template>
	<div>
		<!-- 1.0 利用mint-ui中的header组件四线整个系统的头部 -->
		<mt-header fixed title="Vue项目商场"></mt-header>
        <!--1.0.1 统一的返回按钮-->
        <div v-if="isshow" id="back">
            <a href="javascript:void(0)" @click="backto">返回</a>
        </div>
		<!-- 2.0 利用vue-route的<router-view>进行占位 -->
		<router-view></router-view>
		<!-- 3.0 利用mui中的tabbar组件实现系统的地步 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/tabbar-with-chat">
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">会员</span>
            </router-link>
			<router-link class="mui-tab-item" to="/shopcar/car">
				<span class="mui-icon mui-icon-contact"><span class="mui-badge" id="badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/tabbar-with-map">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
	</div>
</template>
<script>
    //添加购物车的逻辑操作
   import {vm,COUNTSTR} from './kits/vm.js';
    vm.$on(COUNTSTR,function(count){
//		将count值追加到购物车中
      var badgeobj = document.querySelector('#badge');
      badgeobj.innerText = parseInt(badgeobj.innerText) + count;
    });
    // 负责导出 .vue这个组件对象(它本质上是一个Vue对象,所以Vue中该定义的元素都可以使用)
	export default{  // es6的导出对象的写法
		data(){  //等价于 es5的 data:function(){
			return {
              isshow:false
            }
		},
      watch:{
        '$route':function(newroute,oldroute){
          if(newroute.path.toLowerCase() == '/home'){
            this.isshow = false;
          }else{
            this.isshow = true;
          }
        }
      },
		methods:{
          backto(){
//				利用路由对象中的go(-1)来实现返回到上一级页面(这个方法是vue-router的方法)
            this.$router.go(-1);
          }
        },
		created(){}
	}
</script>
<style scoped>
    #back{
        width: 60px;
        position: absolute;
        top:10px;
        left:10px;
        z-index: 101;
    }
    #back a{
        color:white;
        font-size: 16px;
        font-weight: bold;
    }
</style>
