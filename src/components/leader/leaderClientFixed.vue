<template>
    <el-card>
        <my-bread level1="客户管理" level2="客户维护"></my-bread>
        <el-form id="first_form" v-model="form">
            <el-form-item label="选择员工" prop="staffList" style="margin-top:20px;display:inline-block;" id="staff">
              <el-select v-model="use_id" placeholder="请选择你要查看的员工" @change="searchStaffClient">
                <el-option v-for="(v,i) in form.staffList" :key="i" :label="v.realname" :value="v.id"></el-option>
              </el-select>
            </el-form-item>
        </el-form>
        <el-table
            ref="multipleTable"
            :data="tableData3"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="cust_name"
              label="客户名字">
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="联系方式">
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <!-- <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button> -->
          <el-button @click="toggleSelection()">取消选择</el-button>
          <el-button type="info" @click="handleSearch">更改跟进人员</el-button>
        </div>
        <!-- 弹出一个对话框，显示要更换跟进人员的列表 -->
        <el-dialog
          title="更改跟进人员名单"
          :visible.sync="dialogVisibleClientInfo"
          size="tiny">
          <el-radio-group v-model="value">
            <el-radio v-for="v in clientInfo" :key="v.id" :label="v.realname" @change="staff_id(v.id)"></el-radio>
          </el-radio-group>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleClientInfo = false">取 消</el-button>
            <el-button type="primary" @click="changeClientFollow">确 定</el-button>
          </span>
        </el-dialog>
    </el-card>
</template>

<script>
export default {
    inject:['reload'],
    data(){
        return{
            sub_use_id:'',
            client_id:[],
            use_id:'',
            value:'',
            clientInfo:[],
            dialogVisibleClientInfo:false,
            form:{
                staffList:[],
            },
            tableData3: [],
            multipleSelection: []
        }
    },
    created(){
      
      this.getClient()
      this.getTeamList()
    },
    methods: {
        staff_id(id){
          this.sub_use_id = id
          console.log(this.value)
          console.log(id)
        },
        //更改客户的跟进人员
        changeClientFollow(){
          var _this = this
          $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "http://192.168.2.124/salestest/customer/SysUodateCustoerUser" ,//url
            data: {user_id:this.$store.state.userId,team_id:this.$store.state.teamId,use_id:this.sub_use_id,customer_id:this.client_id},
            success: function (res) {
              if(res.recode!=400){
                _this.$message.warning(res.reinfo)
              }else{
                _this.dialogVisibleClientInfo = false
                _this.reload()
                console.log(res)
              }
            },
          });
        },
        //查询某员工下的客户
        searchStaffClient(){
          this.getClient()
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
                _this.clientInfo = res.data
                _this.form.staffList = res.data
                console.log(res)
              }
            },
          });
        },
        //管理员查看公司客户
        getClient(){
          var _this = this
          $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "http://192.168.2.124/salestest/customer/SysAdminGetCustomer" ,//url
            data: {user_id:this.$store.state.userId,team_id:this.$store.state.teamId,use_id:this.use_id},
            success: function (res) {
              if(res.recode!=400){
                _this.$message.warning(res.reinfo)
              }else{
                _this.tableData3 = res.data
                console.log(res)
              }
            },
          });
        },
        handleSearch(){
            this.dialogVisibleClientInfo = true
        },
        toggleSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
          console.log(val)
          console.log(this.multipleSelection)
          for(var i = 0;i<this.multipleSelection.length;i++){
            this.client_id.push(this.multipleSelection[i].id)
          }
          console.log(this.client_id)
        }
    }
}
</script>

<style>

</style>
