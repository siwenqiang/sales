<template>
    <el-card>
        <!-- 面包屑组件 -->
        <my-bread level1="个人中心" level2="个人资料"></my-bread>
        <!-- 表单展示个人资料，并可以进行修改 -->
        <el-form ref="form" :model="form" label-width="80px" style="margin-top:60px;">
            <el-form-item label="姓名" style="width:600px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" style="width:600px">
              <el-input v-model="form.mobile"></el-input>
            </el-form-item>
             <el-form-item label="邮箱" style="width:600px">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="modify()">修改</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    data() {
      return {
        form: {
          name: '',
          mobile:'',
          email:''
        }
      }
    },
    created(){
      this.getUserinfo()
    },
    methods:{
        //获取用户基本信息
        getUserinfo(){
          console.log(222)
          var _this = this
          $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "http://192.168.2.124/salestest/user/SysGetUserInfo" ,//url
            data: {user_id:_this.$store.state.userId},
            success: function (res) {
              if(res.recode!=400){
                _this.$message.warning(res.reinfo)
                console.log(res)
              }else{
                _this.form.name = res.data.realname
                _this.form.email = res.data.email
                _this.form.mobile = res.data.mobile
                console.log(res)

              }
            },
          });
        },
        //需向后端发起请求
        modify(){
          var _this = this
          $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "http://192.168.2.124/salestest/user/SysUpdateUserInfo" ,//url
            data: {realname:_this.form.name,phone:_this.form.mobile,email:_this.form.email,user_id:_this.$store.state.userId},
            success: function (res) {
              if(res.recode!=400){
                _this.$message.warning(res.reinfo)
                console.log(res)
              }else{
                console.log(res)
                _this.$message.warning(res.reinfo)
              }
            },
          });
        }
    }
}
</script>

<style>

</style>
