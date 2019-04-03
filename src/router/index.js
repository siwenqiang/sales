import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import StaffNotice from '@/components/staff/staffNotice'
import LeaderNotice from '@/components/leader/leaderNotice'
import StaffFillcard from '@/components/staff/staffFillcard'
import LeaderFillcard from '@/components/leader/leaderFillcard'
import StaffLeave from '@/components/staff/staffLeave'
import LeaderLeave from '@/components/leader/leaderLeave'
import LeaderGathering from '@/components/leader/leaderGathering'
import StaffGathering from '@/components/staff/staffGathering'
import StaffCardIn from '@/components/staff/staffCardIn'
import StaffCardOut from '@/components/staff/staffCardOut'
import LeaderCardIn from '@/components/leader/leaderCardIn'
import LeaderCardOut from '@/components/leader/leaderCardOut'
import LeaderList from '@/components/leader/leaderList'
import StaffList from '@/components/staff/staffList'
import StaffCenter from '@/components/staff/staffCenter'
import LeaderCenter from '@/components/leader/leaderCenter'
import StaffClient from '@/components/staff/staffClient'
import LeaderClient from '@/components/leader/leaderClient'
import ModifyPassword from '@/components/modifyPassword'
import StaffAttendance from '@/components/staff/staffAttendance'
import LeaderDayAttendance from '@/components/leader/leaderDayAttendance'
import LeaderMonthAttendance from '@/components/leader/leaderMonthAttendance'
import LeaderClientFollow_up from '@/components/leader/leaderClientFollow_up'
import LeaderClientFixed from '@/components/leader/LeaderClientFixed'
import StaffClientFollow_up from '@/components/staff/staffClientFollow_up'
import StaffClientFixed from '@/components/staff/staffClientFixed'
import store from '../main.js'

Vue.use(Router)

//实例化一个router对象
const router = new Router({
  routes:[{
    path:'/',
    component:Login,
    
  },
  {
    path:'/login',
    component:Login,
    name:'login'
  },
  {
    path:'/home',
    component:Home,
    name:'home',
    children:[
      {
        path:'/staffNotice',
        component:StaffNotice
      },
      {
        path:'/leaderNotice',
        component:LeaderNotice
      },
      {
        path:'/staffFillcard',
        component:StaffFillcard
      },
      {
        path:'/leaderFillcard',
        component:LeaderFillcard
      },
      {
        path:'/staffLeave',
        component:StaffLeave
      },
      {
        path:'/leaderLeave',
        component:LeaderLeave
      },
      {
        path:'/leaderGathering',
        component:LeaderGathering
      },
      {
        path:'/staffGathering',
        component:StaffGathering
      },
      {
        path:'/staffCardIn',
        component:StaffCardIn
      },
      {
        path:'/staffCardOut',
        component:StaffCardOut
      },
      {
        path:'/leaderCardIn',
        component:LeaderCardIn
      },
      {
        path:'/leaderCardOut',
        component:LeaderCardOut
      },
      {
        path:'/leaderList',
        component:LeaderList
      },
      {
        path:'/staffList',
        component:StaffList
      },
      {
        path:'/staffCenter',
        component:StaffCenter
      },
      {
        path:'/leaderCenter',
        component:LeaderCenter
      },
      {
        path:'/staffClient',
        component:StaffClient
      },
      {
        path:'/leaderClient',
        component:LeaderClient
      },
      {
        path:'/modifyPassword',
        component:ModifyPassword
      },
      {
        path:'/staffAttendance',
        component:StaffAttendance
      },
      {
        path:'/leaderDayAttendance',
        component:LeaderDayAttendance
      },
      {
        path:'/leaderMonthAttendance',
        component:LeaderMonthAttendance
      },
      {
        path:'/leaderClientFollow_up',
        component:LeaderClientFollow_up
      },
      {
        path:'/leaderClientFixed',
        component:LeaderClientFixed
      },
      {
        path:'/staffClientFollow_up',
        component:StaffClientFollow_up
      },
      {
        path:'/staffClientFixed',
        component:StaffClientFixed
      }
    ]
  }
]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') { // 当路由为login时就直接下一步操作
      next();
  } else { // 否则就需要判断
      if(sessionStorage.userId){  // 如果有用户名就进行下一步操作
        next()
      }else{
        
        next({path: '/login'})  // 没有用户名就跳转到login页面
      }
  }
})

// router.beforeEach((to,from,next)=>{
//   if(to.name!='login'){
//     if(store.state.userId===''){
//       router.push({name:'login'})
//     }else{
//       next()
//       console.log(2)
//     }
//   }else{
//     next()
//     router.push({name:'home'})
//     console.log(3)
//   }
// })
export default router
