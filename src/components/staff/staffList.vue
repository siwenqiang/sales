<template>
    <el-card>
        <!-- 面包屑组件-->
        <my-bread level1="通讯录" level2="员工通讯录列表"></my-bread>
        <!-- 搜索功能 -->
         <el-input
          placeholder="搜索团队成员"
          v-model="query"
          class="input-with-select"
          clearable
          @clear="clearInput()"
          style="width:0;margin-top:20px"
        >
          <el-button slot="append" icon="el-icon-search" @click.prevent="searchUser()"></el-button>
        </el-input>

       
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
        form:{
            name:'',
            tel:'',
            position:''
        },
        query:'',
        pagenum: 1,
        pagesize: 2,
        total: 0,
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
    }
}
</script>

<style>

</style>

