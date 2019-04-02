<template>
    <el-card>
        <!-- 面包屑组件-->
        <my-bread level1="通讯录" level2="领导通讯录列表"></my-bread>
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

        <el-button type="info" @click="showAddUser()" id="skyblue" style="display:block;margin-top:20px;margin-bottom:20px">添加客户</el-button>
        <!-- 通讯录列表 -->
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="name"
              label="姓名"
            >
            </el-table-column>
            <el-table-column
              prop="tel"
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
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item
                    label="个人联系方式"
                    prop="personPhone"
                >
                    <el-input v-model.number="form.personPhone"></el-input>
                </el-form-item>
                 <el-form-item label="公司名称">
                    <el-input v-model="form.companyName"></el-input>
                </el-form-item>
                <el-form-item label="公司地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <!-- 校验电话必须为数字 -->
                <el-form-item
                    label="公司联系方式"
                    prop="companyPhone"
                    >
                    <el-input v-model.number="form.companyPhone"></el-input>
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
        tableData: [{
            name:'张三',
            position:'北京众要机械科技有限公司-技术部',
            tel:18588888888,
            email:'553785985@qq.com'
        }, {
            name:'李四',
            position:'北京众要机械科技有限公司-销售部',
            tel:18588888888,
            email:'553785985@qq.com'                     
        }, {
            name:'王五',
            position:'北京众要机械科技有限公司-人事部',
            tel:18588888888,
            email:'553785985@qq.com'                                              
        }, {
            name:'马六',
            position:'北京众要机械科技有限公司-财务部',
            tel:18588888888,
            email:'553785985@qq.com'                                            
        }],
        dialogVisible:false,
        dialogVisibleCheck:false,
        form:{
            name:'',
            personPhone:'',
            companyPhone:'',
            position:'',
            companyName:'',
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
    methods:{
        //每页显示条数改变时
        handleSizeChange(){

        },
        //当前页面改变时
        handleCurrentChange(){

        },
        //点击提交需向后端发起请求
        addClient(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                   this.dialogVisible = false
                } else {
                  return false;

                }
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

</style>

