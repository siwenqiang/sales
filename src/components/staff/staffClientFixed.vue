<template>
    <el-card>
        <my-bread level1="客户管理" level2="客户维护"></my-bread>
        <el-table
            :data="tableData"
            style="width: 100%;margin-top:20px">
            <el-table-column
              prop="cust_name"   
              label="客户名称">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width="300">
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="联系方式">
            </el-table-column>
            <el-table-column
              prop="level_name"
              label="客户等级">
            </el-table-column>
            <el-table-column
              width="120">
              <template slot-scope="list">
                <el-button
                size="small"
                type="info"
                @click="handleSearch(list.row)">查看维护详情</el-button>
              </template>
            </el-table-column>
            <el-table-column
              width="120">
              <template slot-scope="list">
                <el-button
                size="small"
                type="primary"
                @click="handleSearchRecord(list.row)">查看维护记录</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="title"
              width="120">
              <template slot-scope="list">
                <el-button
                size="small"
                type="warning"
                @click="handleFixed(list.row)">维护</el-button>
              </template>
            </el-table-column>
        </el-table>
        <!-- 弹出对话框显示该客户的维护详情 -->
        <el-dialog
          class="fixedInfo"
          title="维护记录详情"
          :visible.sync="dialogVisibleClientFixedInfo"
          size="tiny">
          <el-form  v-model="ClientFixedInfo">
            <el-form-item label="客户名称">
              <el-input v-model="ClientFixedInfo.cust_name" readonly></el-input>
            </el-form-item>
            <el-form-item label="客户地址">
              <el-input v-model="ClientFixedInfo.address" readonly></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="ClientFixedInfo.mobile" readonly></el-input>
            </el-form-item>
            <el-form-item label="客户等级">
              <el-input v-model="ClientFixedInfo.level_name" readonly></el-input>
            </el-form-item>
            <el-form-item label="跟进人员">
              <el-input v-model="ClientFixedInfo.realname" readonly></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleClientFixedInfo = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleClientFixedInfo = false">确定</el-button>
          </span>
        </el-dialog>
        <!-- 弹出对话框显示维护客户的表单 -->
        <el-dialog
          title="维护更新"
          :visible.sync="dialogVisibleClientFixedUpdate"
          size="tiny">
          <el-form  v-model="ClientFixedUpdate">
            <el-form-item label="客户名称">
              <el-input v-model="ClientFixedUpdate.name" ></el-input>
            </el-form-item>
            <el-form-item label="客户地址">
              <el-input v-model="ClientFixedUpdate.address" ></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="ClientFixedUpdate.tel" ></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="ClientFixedUpdate.client_level" placeholder="请选择客户级别">
                <el-option v-for="(v,i) in clientLevel" :key="i" :label="v.level_name" :value="v.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="其他联系方式">
              <el-input v-model="ClientFixedUpdate.otherTel" ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleClientFixedUpdate = false">取 消</el-button>
            <el-button type="primary" @click="submitClientFixed">提交</el-button>
          </span>
        </el-dialog>
        <!-- 弹出框列表显示维护客户的记录 -->
        <el-dialog
          title="维护更新记录"
          :visible.sync="dialogVisibleClientFixedRecord"
          size="tiny">
          <el-table
            :data="RecordTableData"
            style="width: 100%">
             <el-table-column
              prop="create_time"
              label="创建日期">
            </el-table-column>
             <el-table-column
              prop="cust_name"
              label="客户名称">
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="手机号">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
            <el-table-column
              prop="realname"
              label="跟进人员">
            </el-table-column>
            
          </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleClientFixedRecord = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleClientFixedRecord = false">提交</el-button>
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
    data() {
        return {
            clientLevel:[],
            RecordTableData:[],
            dialogVisibleClientFixedRecord:false,
            pagenum: 1,
            pagesize: 2,
            total: -1,
            ClientFixedUpdate:{
                name:'',
                address:'',
                tel:'',
                client_level:'',
                otherTel:'',
                id:''
            },
            dialogVisibleClientFixedUpdate:false,
            ClientFixedInfo:[{
                name:'',
                address:'',
                tel:'',
                level_name:'',
                realname:''
            }],
            dialogVisibleClientFixedInfo:false,
            tableData: []
        }
    },
    created(){
      this.getStaffClientList()
      this.getClientLevel()
    },
    methods:{
        //提交客户维护表单
        submitClientFixed(){
           var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/customer/SysInCustomerMaintain" ,//url
              data: {user_id:this.$store.state.userId,team_id:this.$store.state.teamId,customer_id:this.ClientFixedUpdate.id,cust_name:this.ClientFixedUpdate.name,mobile:this.ClientFixedUpdate.tel,level_id:this.ClientFixedUpdate.client_level,address:this.ClientFixedUpdate.address,other_mobile:this.ClientFixedUpdate.otherTel},
              success: function (res) {
                if(res.recode!=400){
                  _this.$message.warning(res.reinfo)
                }else{
                  _this.dialogVisibleClientFixedUpdate = false
                  console.log(res)
                }
              },
            });
        },
        //获取客户级别信息列表
        getClientLevel(){
          var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/customer/SysGetCustomerType" ,//url
              data: {},
              success: function (res) {
                if(res.recode!=400){
                  _this.$message.warning(res.reinfo)
                }else{
                  _this.clientLevel = res.data   
                  console.log(res)
                }
              },
            });
        },
        //查询客户维护的历史记录
        handleSearchRecord(item){
          
          var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/customer/SysGetCustomerMaintainInfo" ,//url
              data: {user_id:this.$store.state.userId,team_id:this.$store.state.teamId,customer_id:item.id},
              success: function (res) {
                if(res.recode!=400){
                  console.log(res)
                  _this.$message.warning(res.reinfo)
                }else{
                  
                  _this.RecordTableData = res.data.maintainInfo
                  console.log(res)
                  _this.dialogVisibleClientFixedRecord = true
                }
              },
          });
        },
       //获取客户维护列表
       getStaffClientList(){
          var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/customer/SysGetCustomerMaintainList" ,//url
              data: {user_id:this.$store.state.userId,team_id:this.$store.state.teamId,page:this.pagenum,size:this.pagesize},
              success: function (res) {
                if(res.recode!=400){
                  _this.$message.warning(res.reinfo)
                }else{
                  _this.tableData = res.data
                  _this.total = res.data.length
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
        handleFixed(row){
            this.ClientFixedUpdate = {}
            var _this = this
            //查看客户维护详情
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/customer/SysGetCustomerMaintainInfo" ,//url
              data: {user_id:this.$store.state.userId,team_id:this.$store.state.teamId,customer_id:row.id},
              success: function (res) {
                if(res.recode!=400){
                  console.log(res)
                  _this.$message.warning(res.reinfo)
                }else{
                  
                  _this.ClientFixedUpdate.name = res.data.cust_name
                  _this.ClientFixedUpdate.id = res.data.id
                  console.log(res)
                  _this.dialogVisibleClientFixedUpdate = true
                }
              },
          });
        },
        handleSearch(row){
          
          var _this = this
            //查看客户维护详情
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/customer/SysGetCustomerMaintainInfo" ,//url
              data: {user_id:this.$store.state.userId,team_id:this.$store.state.teamId,customer_id:row.id},
              success: function (res) {
                if(res.recode!=400){
                  console.log(res)
                  _this.$message.warning(res.reinfo)
                }else{
                  
                  _this.ClientFixedInfo = res.data
                  console.log(res)
                  _this.dialogVisibleClientFixedInfo = true
                }
              },
          });
            
        }
    }
}
</script>

<style>

</style>
