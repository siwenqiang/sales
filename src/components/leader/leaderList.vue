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

        <el-button type="primary" @click="showAddUser()" id="skyblue" style="display:block;margin-top:20px;margin-bottom:20px">添加联系人</el-button>
        <!-- 通讯录列表 -->
        <el-table
            
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="realname"
              label="姓名"
              width="240">
            </el-table-column>
            <el-table-column
              prop="username"
              label="手机号"
              width="360">
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱"
              >
            </el-table-column>
        </el-table>
        <!-- 添加联系人的弹出框 -->
        <el-dialog
            title="添加联系人"
            :visible.sync="dialogVisible"
            size="tiny">
            <el-form :model="form" :rules="rules" ref='form'>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="职位">
                    <el-input v-model="form.position"></el-input>
                </el-form-item>
                <!-- 校验电话必须为数字 -->
                <el-form-item
                    label="联系方式"
                    prop="tel"
                >
                    <el-input v-model.number="form.tel"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addLinkman('form')">提交</el-button>
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
        tableData: [],
        dialogVisible:false,
        form:{
            name:'',
            tel:'',
            position:''
        },
        query:'',
        pagenum: 1,
        pagesize: 2,
        total: 4,
        rules: {
          tel: [
            {validator: validateMobilePhone, trigger: 'blur'}
          ],
        },
      }
    },
    created(){
      this.getmobileList()
    },
    methods:{
        //获取通讯录信息
        getmobileList(){
          console.log(111)
          var _this = this
          $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "http://192.168.2.124/salestest/Infomation/index" ,//url
            data: {id:this.$store.state.userId,teamid:this.$store.state.teamId},
            success: function (res) {
              if(res.recode!=400){
                _this.$message.warning(res.reinfo)
              }
                console.log(res)
                _this.tableData = res.data.information
                 _this.total = _this.tableData.length
            },
            error:function(res){
              console.log(11)
              console.log(res)
            }
          });
        },
        //每页显示条数改变时
        handleSizeChange(){

        },
        //当前页面改变时
        handleCurrentChange(){

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
        // 点击确定添加客户，需向后端发起请求
        addLinkman(formName){
          this.$refs[formName].validate((valid) => {
              if (valid) {
                //需向后端发起请求
                 this.dialogVisible = false
              } else {
                return false;
              }
          });
        }
    }
}
</script>

<style>

</style>

