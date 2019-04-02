<template>
    <el-card id="staffLeave">
        <!-- 面包屑组件 -->
        <my-bread level1="出勤与收款" level2="请假"></my-bread>
        <!-- 日期筛选 -->
          <div class="block" style="margin:20px 0">
            <el-date-picker
              v-model="value2"
              align="right"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <el-button
            type="info"
            size="small"
            @click="searchLeave()"
            >
            查询
            </el-button>
          </div>
        <!-- 列表显示补卡记录 -->
         <el-table
            :data="tableData"
            stripe
            style="width: 100%;position:static">
            <el-table-column
              prop="create_time"
              label="创建日期">
            </el-table-column>
            <el-table-column
              prop="realname"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="start_time"
              label="开始时间">
            </el-table-column>
            <el-table-column
              prop="end_time"
              label="结束时间">
            </el-table-column>
             <el-table-column
              prop="leave_type_name"
              label="请假类型">
            </el-table-column>
            <!-- <el-table-column
              label="附带照片"
              width="240"
              >
              <template slot-scope="list">
                <a v-if="list.row.src!=''" href="javascript:void(0);"><img v-image-preview style="height:50px;width:50px;" :src="list.row.src" alt=""></a>
              </template>
            </el-table-column> -->
            <el-table-column
              prop="status"
              label="审核状态"
              >
              <template slot-scope="list">
                <span v-if="list.row.status==0">待审核</span>
                <span v-if="list.row.status==1">审核通过</span>
                <span v-if="list.row.status==2">审核未通过</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="title">
              <template slot-scope="list">
                <el-button
                size="small"
                type="warning"
                @click="handleSearch(list.row)">查看请假详情</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
            <template slot-scope="list">
            <el-button type="success" size="small" @click="pass(list.row)">通过</el-button>
            <el-button type="danger" size="small" @click="nopass(list.row)">不通过</el-button>
            </template>
            </el-table-column>

        </el-table>
        <!-- 请假详情页 -->
        <el-dialog
          title="公告详情"
          :visible.sync="dialogVisibleLeave"
          size="tiny">
          <el-form v-model="leaveInfo">
            <el-form-item label="请假类型">
              <el-input readonly v-model="leaveInfo.leave_type_name"></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-input readonly v-model="leaveInfo.start_time"></el-input>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-input readonly v-model="leaveInfo.start_time"></el-input>
            </el-form-item>
            <el-form-item label="时长">
              <el-input readonly v-model="leaveInfo.length"></el-input>
            </el-form-item>
            <el-form-item label="请假事由">
              <el-input type="textarea" readonly v-model="leaveInfo.remark"></el-input>
            </el-form-item>
            <el-form-item label="照片">
               <!-- <template slot-scope="leaveInfo"> -->
                <!-- <a v-if="leaveInfo.image.length!=0" href="javascript:void(0);"> -->
                  <img  v-image-preview style="height:50px;width:50px;margin-right:5px" :src="v.image" alt="" v-for="v in leaveInfo.image" :key="v.id">
                <!-- </a> -->
              <!-- </template> -->
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleNotice = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleLeave = false">确 定</el-button>
          </span>
        </el-dialog>
    </el-card>
</template>

<script>
export default {
    inject:['reload'],
    data(){
        return{
            leaveInfo:{},
            dialogVisibleLeave:false,
            //显示带小时代单位的时长
            time:'',
            value1:'',
            leaveType:[],
            tableData: [],
            imgUrl:'',
            dialogVisible: false,
            value2:'',
            arr:[]
        }
    },
    created(){
      this.getLeaveType()
      this.getleaveList()
    },
    methods:{
        //审批通过
        pass(item){
          var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/leave/SysConInLeave" ,//url
              data: {user_id:this.$store.state.userId,team_id:this.$store.state.teamId,leave_id:item.id,status:1},
              success: function (res) {
                if(res.recode!=400){
                  _this.$message.warning(res.reinfo)
                }else{
                  _this.getleaveList()
                   console.log(res)      
                }         
              },
            });
        },
        //审批不通过
        nopass(item){
          var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/leave/SysConInLeave" ,//url
              data: {user_id:this.$store.state.userId,team_id:this.$store.state.teamId,leave_id:item.id,status:2},
              success: function (res) {
                if(res.recode!=400){
                  _this.$message.warning(res.reinfo)
                }else{
                  _this.getleaveList()
                   console.log(res)      
                }         
              },
            });
        },
        //查询请假详情
        handleSearch(leave){
          this.leaveInfo = {}
          this.dialogVisibleLeave = true
          var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/leave/SysGetLeaveInfo" ,//url
              data: {user_id:this.$store.state.userId,team_id:this.$store.state.teamId,leave_id:leave.id},
              success: function (res) {
                if(res.recode!=400){
                  _this.$message.warning(res.reinfo)
                }else{
                  _this.leaveInfo = res.data
                  console.log(res)
                }   
              },
            });
        },
        //获取请假类型
        getLeaveType(){
           var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/leave/SysGetLeaveType" ,//url
              data: {},
              success: function (res) {
                if(res.recode!=400){
                  _this.$message.warning(res.reinfo)
                }
                  _this.leaveType = res.data
                  console.log(res)                
              },
            });
        },
        //获取请假数据列表
        getleaveList(){
          var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/leave/SysGetLeaveList" ,//url
              data: {user_id:this.$store.state.userId,team_id:this.$store.state.teamId},
              success: function (res) {
                if(res.recode!=400){
                  _this.$message.warning(res.reinfo)
                }else{
                  _this.tableData = res.data                  
                   console.log(res) 
                }                               
              },
            });
        },
        //显示请假申请的弹出框
        showLeave(){
            this.dialogVisible = true;
        },
        //图片上传成功后的函数
        staffLeaveImg(response,file){
          this.imgUrl = file.url
          // console.log(111)
          // console.log(file)
        },
        //查询具体哪一天自己的请假记录
        searchLeave(){

        }
    }
}
</script>

<style>
.vue-directive-image-previewer{
  z-index:9999
}
  #staffLeave .el-dialog{
    height:auto
  }
  /* #staffLeave .el-form-item{
    margin-top:-20px;
  } */
  #staffleave_reson{
    margin-top: 10px !important
  }
</style>
