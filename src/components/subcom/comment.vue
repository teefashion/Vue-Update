<template>
	<div id='tmp1'>
		<div id="postcomment">
			<h3>提交评论</h3>
			<p class="p"></p>
			<textarea placeholder="请输入您要评论的内容..." v-model="postcontent"></textarea>
			<mt-button type="primary" size="large" @click="postcomment">发表</mt-button>
		</div>
        <div id="list">
            <h3>评论列表</h3>
            <p class="p"></p>
            <div v-for="(item,index) in list">
                <div class="title">
                    <span>第{{index + 1}}楼:</span>
                    <span>用户：{{item.user_name}}</span>
                    <span>发表时间：{{item.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
                </div>
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell" v-text="item.content"></li>
                </ul>
            </div>
        </div>
        <!--加载更多的按钮-->
        <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
    </div>
</template>
<script>
import common from '../../kits/common.js';
import { Toast } from 'mint-ui';
	export default({
		data(){
			return{
              postcontent:'',
              list:[],
              pageindex:1
			}
		},
		created:function(){
          this.getcommentlist(this.pageindex);
		},
		props:['id'],
		methods:{
          getcommentlist(pageindex){
            pageindex=pageindex || 1;//默认第一页显示数据
            var url  = common.apidomain + '/api/getcomments/'+this.id+'?pageindex='+pageindex;
            this.$http.get(url).then(function(res){
              if(res.body.status!=0){
                Toast(res.body.message);
                return;
              }
              this.list=this.list.concat(res.body.message);//拼接数据
            })
          },
			postcomment(){
             if(this.postcontent.trim().length<=0){
              Toast('请输入要评论的信息');
              }
				var url=common.apidomain+'/api/postcomment/'+this.id;
				this.$http.post(url,{content:this.postcontent},{emulateJSON:true}).then(function(res){
					Toast(res.body.message);
					this.list=[{
					  "user_name":'匿名用户',
                      "add_time":"new Date()",
                      "content":this.postcontent
                    }].concat(this.list);
					this.postcontent = '';
				})
			},
          getmore(){
			  this.pageindex++;
             this.getcommentlist(this.pageindex);
          }
		}
	})
</script>	
<style scoped>
	#postcomment{
	padding: 5px;
}
	 .p{
		height: 1px;
		width: 100%;
		border-bottom: 1px solid rgba(0,0,0,0.3);
	}
    /*2.0 评论列表的样式*/
    #list{
        padding: 5px;
    }
    .title{
        padding: 5px;
        color: #6d6d72;
        font-size: 15px;
        background-color: rgba(0,0,0,0.1);
    }
</style>