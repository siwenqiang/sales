<template>
    <el-card>
        <!-- 面包屑 -->
        <my-bread level1="出勤与收款" level2="补卡记录"></my-bread>
        <!-- 日期筛选 -->
            <div class="block" style="margin-top:20px">
              <el-date-picker
                v-model="value2"
                align="right"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
              <el-button
              type="info"
              size="small"
              @click="searchFillcard()"
              >
              查询
              </el-button>
            </div>
         <!-- 列表显示补卡记录 -->
        <el-table
            :data="tableData"
            stripe
            style="width: 100%;margin-top:20px;">
            <el-table-column
              prop="realname"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="username"
              label="电话"
              width="120"
              >
            </el-table-column>
            <el-table-column
              prop="punch_time"
              label="补卡时间">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="补卡原因">
            </el-table-column>
             <el-table-column
              prop="image"
              label="附带照片">
              <template slot-scope="list">
                <a v-if="list.row.image.length!=0" href="javascript:void(0);">
                  <img v-image-preview style="height:50px;width:50px;margin-right:5px" :src="v" alt="" v-for="v in list.row.image" :key="v">
                </a>
              </template>
            </el-table-column>
            <el-table-column
              label="审核状态"
              width="180"
            >
              <template slot-scope="list">
                <span v-if="list.row.state==0">待审核</span>
                <span v-if="list.row.state==1">已审核</span>
              </template>
            </el-table-column>
            <el-table-column
            label="操作"
            >
            <template slot-scope="list">
                <el-button type="success" size="small" @click="pass(list.row.punch_id)" v-if="list.row.state==0">通过</el-button>
                <el-button type="danger" size="small" @click="nopass(list.row.punch_id)" v-if="list.row.state==0">不通过</el-button>
            </template>
            </el-table-column>
        </el-table>
           <!-- 分页 -->
    <!-- 
  handleSizeChange:每页显示条数改变时
  handleCurrentChange:当前页码改变时
  current-page:当前页码
  page-sizes:控制每页显示条数所在的数组
  layout:分页组件的小功能
  total:数据总个数
    -->
    <el-pagination
      style="margin-top:20px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8,10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
      

       
    </el-card>
</template>

<script>
export default {
    data(){
        return{
            // 员工请假数据列表
            tableData: [],
            pagenum: 1,
            pagesize: 2,
            total: 0,

            // 日期选择器的数据
            pickerOptions1: {
              shortcuts: [{
                text: '今天',
                onClick(picker) {
                  picker.$emit('pick', new Date());
                }
              }, {
                text: '昨天',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24);
                  picker.$emit('pick', date);
                }
              }, {
                text: '一周前',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', date);
                }
              }]
            },
            value2: '',
            form:{
              desc:''
            }
        }
    },
    created(){
        this.total = this.tableData.length
        this.getFillcardList()
    },
    methods:{
      
        //获取补卡申请列表
        getFillcardList(){
          var _this = this
          $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "http://192.168.2.124/salestest/team/SysConGetPunchList" ,//url
            data: {team_id:this.$store.state.teamId,user_id:this.$store.state.userId},
            success: function (res) {
              if(res.recode!=400){
                _this.$message.warning(res.reinfo)
              }
              _this.tableData = res.data
              console.log(res)
            },
          });
        },
        //改变每页显示数据的条数
        handleSizeChange(val){
            this.pagesize = val;
            this.pagenum = 1;
            
        },
        //改变当前页面码数
        handleCurrentChange(val){
            this.pagenum = val; 
            
        },
        //查询某个员工的补卡记录(查询历史记录),需向后端发起请求
        handleSearch(){
            this.dialogTableVisible = true;
        },
        //补卡通过
        //管理员补卡审批操作
        pass(punch_id){
          var _this = this
          $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "http://192.168.2.124/salestest/Team/SysConInPunch" ,//url
            data: {team_id:this.$store.state.teamId,user_id:this.$store.state.userId,punch_id:punch_id,state:1},
            success: function (res) {
              if(res.recode!=400){
                _this.$message.warning(res.reinfo)
              }
              _this.getFillcardList()
              console.log(res)
            },
          });
        },
        //补卡不通过
        //管理员补卡审批操作
        nopass(){
           var _this = this
          $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "http://192.168.2.124/salestest/Team/SysConInPunch" ,//url
            data: {team_id:this.$store.state.teamId,user_id:this.$store.state.userId,punch_id:punch_id,state:2},
            success: function (res) {
              if(res.recode!=400){
                _this.$message.warning(res.reinfo)
              }
              _this.getFillcardList()
              console.log(res)
            },
          });
        },
        //查询具体哪一天的员工补卡记录，需向后端发送请求
        searchFillcard(){
            
        }
        
    }
}
</script>

<style>
.leaveDialog textarea{
  min-height: 135px !important
}
</style>
