<template>
    <div class="temp">
        <div id="cate">
            <ul v-bind="{style:'width:'+ulWidth+'px'}">
                <li @click="getimgs">全部</li>
                <li v-for="item in cates" @click='getimgs(item.id)'>{{item.title}}</li>
            </ul>
        </div>

        <!--2.0 图片列表-->
        <div id="imglist">
            <ul>
                <li v-for="item in list">
                    <router-link v-bind='{to:"/photo/photoinfo/"+item.id}'>
                    <img v-lazy="item.img_url">
                    <div id="desc">
                        <h5 v-text="item.title"></h5>
                        <p v-text="item.zhaiyao"></p>
                    </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import common from '../../kits/common.js';
import {Toast} from 'mint-ui';
  export default {
    data() {
      return {
        cates: [],
        ulWidth:320,
        list:[]
      }
    },
    created: function () {
      var all=0;//0是获取全部的数据
      this.getimgs(all);
      this.getCates()
    },
    methods: {
      getimgs(cateid){
        cateid=cateid || 0;
        var url=common.apidomain+'/api/getimages/'+cateid;
        this.$http.get(url).then(function(res){
          var body=res.body;
          if(body.status!=0){
            Toast(body.message);
            return;
          }
          this.list=body.message;
        })
      },
      getCates(){
        var url=common.apidomain+'/api/getimgcategory';
        this.$http.get(url).then(function(res){
          if(res.body.status!=0){
            Toast(res.body.message)
            return;
          }
          this.cates=res.body.message;
          var w=62;
         var count = res.body.message.length +1;
          this.ulWidth=w*count;
        })
      }
    }
  }
</script>

<style scoped>
    /*1.0 图片分类*/
    #cate{
        width: 375px;
        max-width: 375px;
        overflow-x: auto;
    }
    #cate ul{
        margin: 0px;
        padding-left: 10px;
    }
    #cate li{
        cursor: pointer;
        list-style: none;
        display: inline-block;
        color:#0094ff;
        font-size: 14px;
        padding-left: 6px;
    }

    /*实现图片列表样式*/
    #imglist{

    }
    #imglist ul {
        padding-left: 0px;
    }
    #imglist li{
        list-style:none;
        position: relative ;
    }
    #imglist img{
        width:100%;
        height: 300px;
    }

    #desc{
        width: 100%;
        background-color: rgba(0,0,0,0.2);
        position: absolute;
        bottom: 2px;
        left: 0px;
    }

    #desc h5{
        color: #ffffff;
        font-weight: bold;
    }
    #desc p{
        color:#fff;
    }

    image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
</style>
