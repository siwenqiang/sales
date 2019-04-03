<template>
    <el-container class="container">
        
        <!-- 左侧侧边栏 -->
        <el-container>
            <el-aside width="200px" class="aside">
                <el-menu 
                  class="el-menu-vertical-demo"
                  router
                  background-color="#2b3a41"
                  text-color="#b0ccd9"
                  active-text-color="#409eff"
                  :default-openeds="arr"
                  unique-opened
                  >
                    <!-- 首页 -->
                    <el-submenu index="1">
                      <template slot="title">首页</template>
                        <el-menu-item :index="staffNotice" v-if="this.$store.state.flag===2">员工公告</el-menu-item>
                        <el-menu-item :index="leaderNotice" v-if="this.$store.state.flag===1">领导公告</el-menu-item>
                        <el-menu-item :index="leaderFillcard" v-if="this.$store.state.flag===1">领导补卡申请</el-menu-item>
                        <el-menu-item :index="staffFillcard" v-if="this.$store.state.flag===2">员工补卡申请</el-menu-item>
                        <el-menu-item :index="leaderLeave" v-if="this.$store.state.flag===1">领导请假</el-menu-item>
                        <el-menu-item :index="staffLeave" v-if="this.$store.state.flag===2">员工请假</el-menu-item>
                        <el-menu-item :index="leaderGathering" v-if="this.$store.state.flag===1">领导收款</el-menu-item>                      
                        <el-menu-item :index="staffGathering" v-if="this.$store.state.flag===2">员工收款</el-menu-item>
                        <el-submenu v-if="this.$store.state.flag===1" index="1-1">
                          <template slot="title">领导打卡记录</template>
                          <el-menu-item :index="leaderCardIn">上下班打卡</el-menu-item>
                          <el-menu-item :index="leaderCardOut">外出打卡</el-menu-item>
                        </el-submenu>
                        <el-submenu v-if="this.$store.state.flag===2" index="1-2">
                          <template slot="title">员工打卡记录</template>
                          <el-menu-item :index="staffCardIn">上下班打卡</el-menu-item>
                          <el-menu-item :index="staffCardOut">外出打卡</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <!-- 工作 -->
                    <el-submenu index="2">
                      <template slot="title">工作</template>
                        <el-menu-item :index="staffAttendance" v-if="this.$store.state.flag===2">员工-我的考勤</el-menu-item>
                        <el-submenu index="2-4" v-if="this.$store.state.flag===1">
                          <template slot="title" >查看考勤</template>
                          <el-menu-item :index="leaderDayAttendance">日考勤</el-menu-item>
                          <el-menu-item :index="leaderMonthAttendance">月考勤</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2-1" v-if="this.$store.state.flag===1">
                          <template slot="title" >客户管理</template>
                          <el-menu-item :index="leaderClientFollow_up">客户跟进</el-menu-item>
                          <el-menu-item :index="leaderClientFixed">客户维护</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2-2" v-if="this.$store.state.flag===2">
                          <template slot="title" >客户管理</template>
                          <el-menu-item :index="staffClientFollow_up">客户跟进</el-menu-item>
                          <el-menu-item :index="staffClientFixed">客户维护</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="2-3">选项3</el-menu-item>
                    </el-submenu>
                    <!-- 通讯录 -->
                    <el-submenu index="3">
                      <template slot="title">通讯录</template>
                        <el-menu-item :index="leaderList" v-if="this.$store.state.flag===1">领导通讯录列表</el-menu-item>
                        <el-menu-item :index="staffList" v-if="this.$store.state.flag===2">员工通讯录列表</el-menu-item>
                    </el-submenu>
                    <!-- 我的详情 -->
                    <el-submenu index="4">
                      <template slot="title">个人中心</template>
                      <el-menu-item :index="staffCenter" v-if="this.$store.state.flag===2">员工个人资料</el-menu-item>
                      <el-menu-item :index="leaderCenter" v-if="this.$store.state.flag===1">领导个人资料</el-menu-item>
                      <el-menu-item :index="staffClient" v-if="this.$store.state.flag===2">员工客户列表</el-menu-item>
                      <el-menu-item :index="leaderClient" v-if="this.$store.state.flag===1">领导客户列表</el-menu-item>
                      <el-menu-item :index="modifyPassword" :router="false">修改密码</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main class="main" style="">
              <el-header class="header" style="margin-bottom:10px">
                <el-row>
                  <el-col :span="16" class="content">
                    <h2>后台管理系统</h2>
                  </el-col>
                  <el-col :span="4" style="height:60px;line-height:60px">
                    <span style="color:white">您好,{{this.username}}</span>
                  </el-col>
                  <!-- 切换团队 -->
                  <el-col :span="2">
                    <el-button type="info" size="small" style="margin-top:15px;" @click="showSwitchTeam()">切换团队</el-button>
                  </el-col>
                  <el-col :span="2">
                    <a class="contenttwo" href="javascript:;" style="color:white" @click="quit()">退出</a>
                  </el-col>
                </el-row>
              </el-header>
              <router-view></router-view>
            </el-main>
        </el-container>
        <!-- 切换团队的对话框 -->
        <el-dialog
          title="请选择要切换的团队"
          :visible.sync="dialogVisible"
          size="tiny"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :show-close="false">
          <el-form :model="formData">
            <el-form-item label="请选择">
              <el-select v-model="formData.teamId" placeholder="请选择要切换到的团队">
                <el-option v-if="v.state===1" v-for="(v,i) in TeamList" :key="i" :label="v.team" :value="v.team_id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="switchTeam()">确 定</el-button>
          </span>
        </el-dialog>
        <!--  -->
    </el-container>
</template>

<script>
export default {
  inject:['reload'],
  data(){
    return{
      username:this.$store.state.username,
      num:4,
      arr:["1"],
      list:[],
      staffNotice:"/staffNotice",
      leaderNotice:'/leaderNotice',
      staffFillcard:'/staffFillcard',
      leaderFillcard:'/leaderFillcard',
      staffLeave:'/staffLeave',
      leaderLeave:'/leaderLeave',
      leaderGathering:'/leaderGathering',
      staffGathering:'/staffGathering',
      staffCardIn:'/staffCardIn',
      staffCardOut:'/staffCardOut',
      leaderCardIn:'/leaderCardIn',
      leaderCardOut:'/leaderCardOut',
      leaderList:'/leaderList',
      staffList:'/staffList',
      staffCenter:'/staffCenter',
      leaderCenter:'/leadercenter',
      staffClient:'/staffClient',
      leaderClient:'/leaderClient',
      modifyPassword:'/modifyPassword',
      staffAttendance:'/staffAttendance',
      leaderDayAttendance:'/leaderDayAttendance',
      leaderMonthAttendance:'/leaderMonthAttendance',
      leaderClientFollow_up:'leaderClientFollow_up',
      leaderClientFixed:'leaderClientFixed',
      staffClientFollow_up:'staffClientFollow_up',
      staffClientFixed:'staffClientFixed',
      dialogVisible:true,
      formData:{
        teamId:''
      },
      //用来储存该用户所在的所有团队
      TeamList:[]
    }
  },
  created(){
    this.getTeamList()
    this.dialogVisible = this.$store.state.switchTeam
    console.log(this.dialogVisible)
    console.log(this.$store.state.username)
  },
  methods:{
    //获取团队列表
    getTeamList(){
       //获取团队列表
     var _this = this
      $.ajax({
        //几个参数需要注意一下
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "http://192.168.2.124/salestest/team/SysGetTeam" ,//url
        data: {id:_this.$store.state.userId},
        success: function (res) {
          if(res.recode!=400){
            _this.$message.warning(res.reinfo)
          }else{
            if(res.reinfo==='当前用户没有团队'){
              sessionStorage.removeItem('userId')
              _this.$router.push({name:'login'})
              _this.$message.error('当前用户没有团队，请先用手机加入或创建团队')
            }
            console.log(111)
            console.log(res)
            _this.TeamList = res.data
          }
        },
      });
    },
    //显示切换团队的弹出框
    showSwitchTeam(){
      this.dialogVisible = true
    },
    // 点击确定切换团队向后台发送请求
    switchTeam(){
      this.$store.state.teamId=this.formData.teamId
      
      var _this = this
      $.ajax({
        //几个参数需要注意一下
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "http://192.168.2.124/salestest/team/switchTeam" ,//url
        data: {user_id:_this.$store.state.userId,team_id:_this.formData.teamId},
        success: function (res) {
          if(res.recode!=400){
            _this.$message.warning(res.reinfo)
            console.log(res)
          }else{
            console.log(res)
            _this.$message.success('团队更新成功')
            console.log( _this.$store.state.switchTeam)
            _this.$store.state.switchTeam = false
            _this.dialogVisible = false
            _this.$router.push({path:'/home'})
            _this.$store.state.flag = res.data
            // console.log(res)
          }
        },
        error:function(res){
          console.log(res)
        }
      });
      
    },
    //退出功能
    quit(){
      sessionStorage.removeItem("userId")
      this.$store.state.userId = ''
      this.$store.state.switchTeam = true
      this.$router.push({
        name:'login'
      })
      this.$message.success('退出成功')
    }
  }
}
</script>

<style>
.container {
  height: 100%;
}
.header {
  background-color:#53bebd;
  padding: 0;
}
.content {
  color: white;
  height: 60px;
}
.header h2 {
  line-height: 60px;
  margin-left:21px;
}
.contenttwo {
  height: 60px;
  text-align: center;
  text-decoration: none;
  line-height: 60px;
}
.el-menu{
  height: 100%;
}

</style>
