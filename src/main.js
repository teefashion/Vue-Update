// 1.0 导入vue核心包
import Vue from 'vue';
// 2.0 导入App.vue的vue对象

import App from './App.vue';
// 3.0 将 vue-route 集成到这个项目中来
import VueRouter from 'vue-router';
// 3.0.1 将 vueRoute 对象绑定到vue对象上
Vue.use(VueRouter);
// 3.0.2 导入路由规则对应的组件对象
import home from './components/Home.vue';
import shopcar from './components/shopcar/car.vue';
import newlist from './components/news/newslist.vue';
import newsinfo from './components/news/newsinfo.vue';
import photolist from './components/photo/photolist.vue'
import photoinfo from './components/photo/photoinfo.vue'
import goodslist from './components/goods/goodslist.vue'
import goodsinfo from './components/goods/goodsinfo.vue';
import goodsdesc from './components/goods/goodsdesc.vue';
import goodscomment from './components/goods/goodscomment.vue';
import car from './components/shopcar/car.vue';

// 3.0.3 定义路由规则
var router1 = new VueRouter({
    linkActiveClass: 'mui-active',
    routes: [
        {path: '/',redirect:'/home'},
        {path: '/home', component: home},
        {path: '/shopcar', component: shopcar},
        {path: '/news/newslist', component: newlist},
        {path: '/news/newsinfo/:id', component: newsinfo},
        {path: '/photo/photolist', component: photolist},
        {path: '/photo/photoinfo/:id', component: photoinfo},
        {path: '/goods/goodslist', component: goodslist},
        {path: '/goods/goodsinfo/:id', component: goodsinfo},
        {path: '/goods/goodsdesc/:id', component: goodsdesc},
        {path: '/goods/goodscomment/:id', component: goodscomment},
        {path: '/shopcar/car', component: car},


    ]
})

// 4.0 使用mint-ui
import mintUi from 'mint-ui';
import 'mint-ui/lib/style.min.css'
// 4.1 将 mint-ui 对象绑定到vue对象上
Vue.use(mintUi);

// 5.0 使用mui
import '../statics/mui/css/mui.css'

// 6.0 引入全局 css
import '../statics/css/site.css'

// 7.0 引入vue-resource， 并绑定， 就会自动在Vue实例上注册一个$http对象
import VueResource from 'vue-resource'

Vue.use(VueResource);
import VuePreview from 'vue-preview'
Vue.use(VuePreview);
// 3.0 利用Vue对象进行解析渲染
//引入日期格式化的工具
import moment from 'moment'

Vue.filter('datefmt', function (input, fmtstring) {
    return moment(input).format(fmtstring)
})
new Vue({
	el:'#app',
	// 使用路由对象实例
	router:router1,
	// render:function(create){create(App)} //es5的写法
	render:c=>c(App)  // es6的函数写法 =>：goes to
});
