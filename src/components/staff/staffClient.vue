<template>
    <el-card>
        <!-- 面包屑组件-->
        <my-bread level1="通讯录" level2="员工通讯录列表"></my-bread>
        <!-- 搜索功能 -->
         <el-input
          placeholder="搜索客户"
          v-model="query"
          class="input-with-select"
          clearable
          @clear="clearInput()"
          style="width:0;margin-top:20px"
        >
          <el-button slot="append" icon="el-icon-search" @click.prevent="searchUser()"></el-button>
        </el-input>

        <el-button type="primary" @click="showAddUser()" id="skyblue" style="display:block;margin-top:20px;margin-bottom:20px">添加客户</el-button>
        <!-- 通讯录列表 -->
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="cust_name"
              label="姓名"
            >
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="手机号">
            </el-table-column>
            <el-table-column
                label="操作"
            >
                <template scope="">
                  <el-button @click="showClientInfo()" type="primary" size="small">查看客户详情</el-button> 
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加客户的弹出框 -->
        <el-dialog
            title="添加客户"
            :visible.sync="dialogVisible"
            size="tiny">
            <el-form :model="form" :rules="rules" ref='form'>
                <el-form-item label="客户名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item
                    label="手机号"
                    prop="phone">
                    <el-input v-model.number="form.phone"></el-input>
                </el-form-item>
                 <el-form-item label="客户级别" class="staffClient_level">
                    <el-select v-model="form.client_level" placeholder="请选择客户级别">
                         <el-option v-for="(v,i) in clientLevel" :key="i" :label="v.level_name" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <!-- 校验电话必须为数字 -->
                <el-form-item
                    label="其他联系方式"
                    prop="otherTel"
                    >
                    <el-input v-model="form.otherTel"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addClient('form')">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 添加展示客户详情的弹出框 -->
         <el-dialog
            title="客户详情"
            :visible.sync="dialogVisibleCheck"
            size="tiny">
            <el-form :model="formCheck" ref="form">
                <el-form-item label="创建日期">
                    <el-input v-model="formCheck.date" disabled></el-input>
                </el-form-item>
                <el-form-item label="公司名称">
                    <el-input v-model="formCheck.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="公司地址">
                    <el-input v-model="formCheck.address" disabled></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="formCheck.tel" disabled></el-input>
                </el-form-item>
            </el-form>
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
         //  校验手机号
  var validateMobilePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('手机号不能为空'));
        } else {
          if (value !== '') { 
            var reg=/^1[3456789]\d{9}$/;
            if(!reg.test(value)){
              callback(new Error('请输入有效的手机号码'));
            }
          }
          callback();
        }
      };
      return {
        clientLevel:[],
        tableData: [],
        dialogVisible:false,
        dialogVisibleCheck:false,
        form:{
            name:'',
            phone:'',
            otherTel:'',
            client_level:'',
            address:''
        },
        formCheck:{
            date:'2019-3-13',
            name:'北京众要机械科技有限公司',
            tel:18599999999,
            address:'顺义区绿地起航国际'
        },
        query:'',
        pagenum: 1,
        pagesize: 2,
        total: 4,
        rules: {
            personPhone: [
              {validator: validateMobilePhone, trigger: 'blur'}
            ],
            companyPhone: [
              {validator: validateMobilePhone, trigger: 'blur'}
            ],
        },
      }
    },
    created(){
        this.getClientList()
        this.getClientLevel()
    },
    methods:{
        //获取客户等级
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
                    _this.tableData = res.data
                    console.log(res)
                }
              },
            });
        },
        //每页显示条数改变时
        handleSizeChange(){

        },
        //当前页面改变时
        handleCurrentChange(){

        },
        //点击提交需向后端发起请求
        addClient(formName){
             var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/customer/SysInCustomer" ,//url
              data: {user_id:this.$store.state.userId,team_id:this.$store.state.teamId,cust_name:this.form.name,mobile:this.form.phone,level_id:this.form.client_level,address:this.form.address,other_mobile:this.form.otherTel},
              success: function (res) {
                if(res.recode!=400){
                  _this.$message.warning(res.reinfo)
                }else{
                    _this.getClientList()
                    _this.$message.success('客户添加成功')
                    _this.dialogVisible = false
                    _this.form = {}
                    console.log(res)
                }
              },
            });
        },
        //点击查看客户详情
        showClientInfo(){
            this.dialogVisibleCheck = true
        },
        //点击清空按钮时，可以重新获取数据,需向后端发送数据
        clearInput(){

        },
        //点击搜索按钮即可搜索到对应的用户，需向后端发送数据
        searchUser(){

        },
        //点击添加客户，显示添加客户的弹出窗
        showAddUser(){
            this.dialogVisible = true
        },
       
    }
}
</script>

<style>
.staffClient_level .el-form-item__label{
    float:none
}
</style>

