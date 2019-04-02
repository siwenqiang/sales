// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import moment from 'moment'
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/index.css'
import Mybread from '@/components/cusBread.vue'
//引入此组件为了可以使图片点击放大
import vueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
import $ from 'jquery'
// import Http from './plugins/http'
import axios from 'axios'

// 处理日期格式（全局过滤器）
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)

})
Vue.config.productionTip = false
//使用vueDirectiveImagePreviewer插件
Vue.use(vueDirectiveImagePreviewer)
// //挂载axios插件
// Vue.use(Http)
//使用VUEX
Vue.use(Vuex)
//声明一个全局组件
Vue.component(Mybread.name,Mybread)
//挂在elementui
Vue.use(ElementUI)
//创建一下仓库实例
const store = new Vuex.Store({
  state:{
    //2为员工，1为管理
    flag:1,
    userId:'',
    teamId:'',
    switchTeam:true,
    username:''
  }
})
export default store 
/* eslint-disable no-new */
const vue=new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

