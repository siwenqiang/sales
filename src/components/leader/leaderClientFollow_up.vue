<template>
    <el-card>
        <my-bread level1="客户管理" level2="客户跟进"></my-bread>
        <el-form id="first_form" v-model="form">
            <el-form-item label="选择员工" style="margin-top:20px;display:inline-block;" id="staff">
              <el-select v-model="use_id" placeholder="请选择你要查看的员工" @change="serchStaffClient">
                <el-option v-for="(v,i) in form.staffList" :key="i" :label="v.realname" :value="v.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择开始时间" style="margin-top:20px;display:inline-block;width:316px" id="month">
                <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="value"
                    type="date"
                    placeholder="请选择日期"
                    @change="searchDate1">
                </el-date-picker>
            </el-form-item>
             <el-form-item label="选择结束时间" style="margin-top:20px;display:inline-block;width:316px" id="month">
                <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="value1"
                    type="date"
                    placeholder="请选择日期"
                    @change="searchDate">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div class="leaderboxtwo">
            <div class="day">
                <span class="num">{{this.day_count}}</span><span>次</span>
                <p>今日跟进次数</p>
            </div>
            <div class="month">
                <span class="num">{{this.month_count}}</span><span>次</span>
                <p>本月跟进次数</p>
            </div>
        </div>
        <!-- 全部员工的跟进客户列表 -->
         <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="cust_name"
              label="客户名称">
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="手机号">
            </el-table-column>
            <el-table-column
              prop="follow_time"
              label="跟进日期">
            </el-table-column>
            <el-table-column
              prop="realname"
              label="跟进人员">
            </el-table-column>
            <el-table-column
              prop="title">
              <template slot-scope="list">
                <el-button
                size="small"
                type="warning"
                @click="handleSearch(list.row)">查看跟进详情</el-button>
              </template>
            </el-table-column>
        </el-table>
        <!-- 弹出对话框显示跟进详情 -->
        <el-dialog
          title="跟进详情"
          :visible.sync="dialogVisibleClientInfo"
          size="tiny">
          <el-form  v-model="clientInfo">
            <el-form-item label="客户名称">
              <el-input v-model="clientInfo.name" readonly></el-input>
            </el-form-item>
            <el-form-item label="客户地址">
              <el-input v-model="clientInfo.address" readonly></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="clientInfo.tel" readonly></el-input>
            </el-form-item>
            <el-form-item label="跟进日期">
              <el-input v-model="clientInfo.date" readonly></el-input>
            </el-form-item>
            <el-form-item label="跟进方式">
              <el-input v-model="clientInfo.type" readonly></el-input>
            </el-form-item>
            <el-form-item label="跟进结果">
              <el-input v-model="clientInfo.result" readonly></el-input>
            </el-form-item>
            <el-form-item label="预约时间">
              <el-input v-model="clientInfo.time" readonly></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleClientInfo = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleClientInfo = false">确 定</el-button>
          </span>
        </el-dialog>
         <!-- 分页 -->
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
            day_count:'',
            month_count:'',
            pagenum: 1,
            pagesize: 2,
            total: -1,
            use_id:'',
            clientInfo:{
                name:'众要机械技术有限公司',
                address:'绿地起航国际9号楼',
                tel:18539228888,
                date:'2019-4-2',
                type:'到公司访问',
                result:'客户暂时处在观望中，下次继续跟进',
                time:'2019-4-2 15:36'
            },
            dialogVisibleClientInfo:false,
            form:{
              staffList:[],
              searchMonth:'',
            },
            value:'',
            value1:'',
            tableData: []
        }
    },
    created(){
      this.getTeamList()
      //没有定向选择的时候默认选择全部的客户跟进记录
      this.getFollowList()
    },
    methods:{
        searchDate1(time){
          this.value = time
          this.getFollowList()
        },
        searchDate(time){
          this.value1 = time
          this.getFollowList()
        },
        //查看一段时间下的某员工的跟进记录
        getFollowList(){
          var _this = this
          $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "http://192.168.2.124/salestest/customer/SysAdminGetCustomerFollow" ,//url
            data: {user_id:this.$store.state.userId,team_id:this.$store.state.teamId,use_id:this.use_id,page:this.pagenum,size:this.pagesize,start_time:this.value,end_time:this.value1},
            success: function (res) {
              if(res.recode!=400){
                _this.$message.warning(res.reinfo)
              }else{
                _this.month_count = res.data.month_count
                _this.day_count = res.data.day_count
                _this.tableData = res.data.list
                _this.total = res.data.count
                console.log(res)
              }
            },
          });
        },
       //当前页码发生改变时
        handleCurrentChange(val){
          this.pagenum = val;
          console.log(val)
        },
        //当前页面显示条数改变时
        handleSizeChange(val){
          this.pagesize = val;
          this.pagenum = 1;
          console.log(val)
        },
        //查询某位员工下的客户
        serchStaffClient(){
          this.getFollowList()
        },
        //获取团队成员
        getTeamList(){
          var _this = this
          $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "http://192.168.2.124/salestest/customer/SysGetTeamUser" ,//url
            data: {user_id:this.$store.state.userId,team_id:this.$store.state.teamId},
            success: function (res) {
              if(res.recode!=400){
                _this.$message.warning(res.reinfo)
              }else{
                _this.form.staffList = res.data
                console.log(res)
              }
            },
          });
        },
        handleSearch(){
            this.dialogVisibleClientInfo = true
        }
    }
}
</script>

<style>
.num{
    margin-top:20px;
    display: inline-block;
    font-size:48px;
}
.month{
    color:white;
    text-align:center;
    float:right;
    width:200px;
    height:150px;
    background-color: rgba(245,139,139,1);
    border-radius: 8px
}
.day{
    color:white;
    text-align:center;
    float:left;
    width:200px;
    height:150px;
    background-color: rgba(126,182,234,1);
     border-radius: 8px
}
.leaderboxtwo{
    position: relative;
    top:-20px;
    margin-top:-20px;
    margin-left:180px;
    width: 800px;
    height: 150px;
    display: inline-block;
}
#staff .el-form-item__content{
    float:right
}
#month .el-form-item__content{
    float:right
}
#first_form{
    display: inline-block;
    width:22%;
}
</style>
