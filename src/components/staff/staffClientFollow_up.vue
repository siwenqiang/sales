<template>
    <el-card>
        <my-bread level1="客户管理" level2="客户跟进"></my-bread>
        <el-button type="info" @click="showAddClientFollow_up" style="position:relative;bottom:80px;">跟进详情汇报</el-button>
        <div class="boxtwo">
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
            style="width: 100%;margin-top:40px">
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
              prop="appment_time"
              label="跟进日期">
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
        <!-- 弹出对话框显示跟进详情 -->
        <el-dialog
          title="跟进详情"
          :visible.sync="dialogVisibleClientInfo"
          size="tiny">
          <el-form  v-model="clientInfo">
            <el-form-item label="客户名称">
              <el-input v-model="clientInfo.cust_name" readonly></el-input>
            </el-form-item>
            <el-form-item label="客户地址">
              <el-input v-model="clientInfo.address_lal" readonly></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="clientInfo.mobile" readonly></el-input>
            </el-form-item>
            <el-form-item label="跟进日期" class="follow_date">
              <el-input v-model="clientInfo.follow_time" readonly></el-input>
            </el-form-item>
            <el-form-item label="跟进方式">
              <el-input v-if="clientInfo.visit_type===1" v-model="this.dianhua" readonly></el-input>
              <el-input v-if="clientInfo.visit_type===2" v-model="this.QQ" readonly></el-input>
            </el-form-item>
            <el-form-item label="跟进结果">
              <el-input v-model="clientInfo.mark" readonly></el-input>
            </el-form-item>
            <el-form-item label="预约时间" class="follow_time">
                <el-input v-model="clientInfo.appment_time" readonly></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleClientInfo = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleClientInfo = false">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 弹出对话框显示跟进汇报表单 -->
        <el-dialog
          title="跟进详情"
          :visible.sync="dialogVisibleClientInfoAdd"
          size="tiny">
          <el-form  v-model="addClientInfo">
            <el-form-item label="客户名称" class="staffClientFollow_up_name">
              <el-select v-model="addClientInfo.name" placeholder="请选择客户">
                <el-option v-for="(v,i) in client_list" :key="i" :label="v.cust_name" :value="v.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户地址">
              <el-input v-model="addClientInfo.address"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="addClientInfo.tel"></el-input>
            </el-form-item>
            <el-form-item label="跟进日期" class="follow_date">
              <el-date-picker
                v-model="form.date"
                type="date"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd"
                @change="formatDate">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="跟进方式" class="staffClientFollow_up_type">
              <el-select v-model="addClientInfo.type" placeholder="请选择跟进方式">
                <el-option v-for="(v,i) in follow_type" :key="i" :label="v.name" :value="v.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="跟进结果">
              <el-input v-model="addClientInfo.result"></el-input>
            </el-form-item>
            <el-form-item label="预约时间" class="follow_time">
              <el-date-picker
                v-model="form.time"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:00:00"
                @change="formatTime">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="是否成单" class="staffClientFollow_up_switch">
              <el-switch
                v-model="value"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="是"
                inactive-text="否"
                active-value="1"
                inactive-value="2">
              </el-switch>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleClientInfoAdd = false">取 消</el-button>
            <el-button type="primary" @click="addClientFollow_up()">提交</el-button>
          </span>
        </el-dialog>
    </el-card>
</template>

<script>
export default {
    data(){
        return{
            dianhua:'电话',
            QQ:'QQ',
            day_count:'',
            month_count:'',
            value:'',
            follow_type:[],
            client_list:[],
            pagenum: 1,
            pagesize: 2,
            total: -1,
            addClientInfo:{
                name:'',
                address:'',
                tel:'',
                date:'',
                type:'',
                result:'',
                time:''
            },
            dialogVisibleClientInfoAdd:false,
            clientInfo:{
                name:'',
                address:'',
                tel:'',
                date:'',
                type:'',
                result:'',
                time:''
            },
            dialogVisibleClientInfo:false,
            form:{
                staffList:[],
                searchMonth:'',
            },
            tableData: []
        }
    },
    created(){
      this.getClientFollowList()
      this.getClientList()
      this.getFollowType()
    },
    methods:{
        //向后台发送正确的格式的时间数据格式
        formatTime(time){
            this.addClientInfo.time = time
          },
        //向后台发送正确的格式的时间数据格式
        formatDate(time){
          this.addClientInfo.date = time
        },
        //获取跟进方式
        getFollowType(){
          var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/customer/SysGetCustomerVisit" ,//url
              data: {},
              success: function (res) {
                if(res.recode!=400){
                  _this.$message.warning(res.reinfo)
                }else{
                    _this.follow_type = res.data
                    console.log(res)
                }
              },
            });
        },
        //提交客户跟进表单
        addClientFollow_up(){
          var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/customer/SysInCustomerFollow" ,//url
              data: {user_id:this.$store.state.userId,team_id:this.$store.state.teamId,customer_id:this.addClientInfo.name,mobile:this.addClientInfo.tel,follow_time:this.addClientInfo.date,appment_time:this.addClientInfo.time,mark:this.addClientInfo.result,address:this.addClientInfo.address,visit_type:this.addClientInfo.type,is_success:this.value},
              success: function (res) {
                if(res.recode!=400){
                  _this.$message.warning(res.reinfo)
                }else{
                    _this.dialogVisibleClientInfoAdd = false
                    _this.$message.success('提交成功')
                    _this.getClientFollowList()
                    console.log(res)
                }
              },
            });
        },
        //获取客户列表
        getClientList(){
            var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/customer/SysGetCustomerList" ,//url
              data: {user_id:this.$store.state.userId,team_id:this.$store.state.teamId},
              success: function (res) {
                if(res.recode!=400){
                  _this.$message.warning(res.reinfo)
                }else{
                    _this.client_list = res.data
                    console.log(res)
                }
              },
            });
        },
        //当前页码发生改变时
        handleCurrentChange(val){
          this.pagenum = val;
          this.getClientFollowList();
          console.log(val)
        },
        //当前页面显示条数改变时
        handleSizeChange(val){
          this.pagesize = val;
          this.pagenum = 1;
          this.getClientFollowList();
          console.log(val)
        },
        //获取客户跟进列表
        getClientFollowList(){
           var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/customer/SysGetCustomerFollowList" ,//url
              data: {user_id:this.$store.state.userId,team_id:this.$store.state.teamId,page:this.pagenum,size:this.pagesize},
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
        //显示增加跟进汇报的表单
        showAddClientFollow_up(){
            this.dialogVisibleClientInfoAdd = true
        },
        handleSearch(item){
          var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/customer/SysGetCustomerFollowInfo" ,//url
              data: {user_id:this.$store.state.userId,team_id:this.$store.state.teamId,follow_id:item.id},
              success: function (res) {
                if(res.recode!=400){
                  _this.$message.warning(res.reinfo)
                }else{
                  _this.clientInfo = res.data
                  _this.dialogVisibleClientInfo = true
                  console.log(res)
                }
              },
            });
            
        }
    }
}
</script>

<style>
.staffClientFollow_up_switch .el-form-item__label{
  float:none
}
.staffClientFollow_up_type .el-form-item__label{
  float:none
}
.staffClientFollow_up_name .el-form-item__label{
    float:none
}
.follow_date .el-form-item__label{
    float:none
}
.follow_time .el-form-item__label{
    float:none
}
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
.boxtwo{
    position: relative;
    top:40px;
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
