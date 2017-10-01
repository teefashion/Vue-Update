<template>
    <div class="temp">
        <!--1.0 商品轮播图-->
        <div class="silder">
            <silder :imgs="imgs"></silder>
        </div>

        <!--2.0 实现商品购买区-->
        <div id="buy">
            <h4>{{info.title}}</h4>
            <p class="line"></p>
            <ul>
                <li class="price">
                    市场价: <s>￥{{info.market_price}}</s>    销售价：<span>￥{{info.sell_price}}</span>
                </li>
                <li class="inputli">
                    购买数量：<inputNumber v-on:send="getdata"  class="inputNumber"></inputNumber>
                    <transition name="show"
                                @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"
                    >
                        <div v-if="isshow" class="ball"></div>
                    </transition>
                </li>
                <li>
                    <mt-button type="primary" size="small" >立即购买</mt-button>
                    <mt-button type="danger" size="small" @click='toshopcar'>加入购物车</mt-button>
                </li>
            </ul>
        </div>

        <div id="params">
            <h6>商品参数</h6>
            <p class="line"></p>
            <ul>
                <li>商品货号：{{info.goods_no}}</li>
                <li>库存情况：{{info.stock_quantity}}</li>
                <li>上架时间：{{info.add_time | datefmt('YYYY-MM-DD')}}</li>
            </ul>
        </div>

        <!--3.0 图文详情-->

        <div id="other">
            <router-link v-bind="{to:'/goods/goodsdesc/'+id}">
                <mt-button class="imgdesc" type="primary" size="large">图文详情</mt-button>
            </router-link>
            <router-link v-bind="{to:'/goods/goodscomment/'+id}">
            <mt-button type="danger" size="large">商品评论</mt-button>
            </router-link>
        </div>
        <!--4.0 商品评论-->

    </div>
</template>

<script>
  import common from '../../kits/common.js';
  import {Toast} from 'mint-ui';
  import silder from '../subcom/silder.vue';
  import inputNumber from '../subcom/inputNumber.vue';
  import {vm,COUNTSTR} from '../../kits/vm.js';
  import {setItem,valueObj} from '../../kits/localSg.js'
  export default {
    components:{
      silder,inputNumber
    },
    data(){
      return{
        inputNumberCount:1,
        imgs:[],
        id:0,
        info:{},
        isshow:false
      }
    },
    created(){
      this.id=this.$route.params.id;
      this.getimgs();
      this.getinfo();
    },
    methods:{
      beforeEnter(el){
        el.style.transform = "translate(0px,0px)";
      },
      enter(el,done){
        el.offsetWidth;
        el.style.transform = "translate(275px,366px)";
        done();
      },
      afterEnter(el){
        this.isshow = !this.isshow;
      },
      //添加到购物车
      toshopcar(){
        vm.$emit(COUNTSTR,this.inputNumberCount);
        //赋值id和购买数量
        valueObj.goodsid = this.id;
        valueObj.count = this.inputNumberCount;
        setItem(valueObj);
        this.isshow=!this.isshow;
      },
      getdata(count){
        this.inputNumberCount=count;
      },
      getinfo(){
        var url = common.apidomain +'/api/goods/getinfo/'+this.id;
        this.$http.get(url).then(function(res){
          this.info=res.body.message[0];
        })
      },
        getimgs(){
          var url  = common.apidomain + '/api/getthumimages/'+this.id;
          this.$http.get(url).then(function(res){
            this.imgs=res.body.message;
          })
        }
    }
  }
</script>

<style scoped>
    .silder{
        border:1px solid rgba(0,0,0,0.4);
        border-radius: 5px;
        margin: 5px;
    }

    #buy,#params,#other
    {
        margin: 5px;
        padding: 5px;
        border:1px solid rgba(0,0,0,0.4);
        border-radius: 5px;
    }
    .line{
        height: 1px;
        border: 1px solid rgba(0,0,0,0.2);
    }
    #buy ul,#params ul{
        padding-left: 0px;
    }
    #buy h4{
        color:#0094ff;
        padding: 5px;
    }
    #buy li,#params li{
        list-style: none;
        padding: 8px;
    }

    #buy .price span{
        color:red;
    }

    #other .imgdesc{
        margin-bottom: 20px;
    }
    .inputNumber{
        position: absolute;
        left:100px;
        top:5px;
    }
    .inputli{
        position: relative;
    }

    .ball{
        background-color: red;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        position: absolute;
        left:150px;
        top:10px;
        transition: all 0.4s ease;
        z-index: 100;
    }

</style>
