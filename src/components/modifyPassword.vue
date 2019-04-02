<template>
    <el-card>
        <!-- 面包屑组件 -->
        <my-bread level1="个人中心" level2="修改密码"></my-bread>
        <!-- 表单修改密码 -->
        <el-form ref="form" :model="form">
            <el-form-item prop="note">
                <el-input  type="password" ref='note' v-model="form.oldPwd" placeholder="请输入旧密码" style="width:30%;margin-top:40px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" ref="newPwd" v-model.number="form.newPwd" placeholder="请输入新密码" style="width:30%;margin-top:40px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" ref="againNewpwd" v-model.number="form.againNewpwd" placeholder="请再次输入新密码" style="width:30%;margin-top:40px;"></el-input>
            </el-form-item>
            <el-button type="primary" size="small" @click="modifierPwd()" style="margin-top:20px;">完成</el-button>
        </el-form>
    </el-card>
</template>

<script>
export default {
    data(){
        return{
            form:{
                oldPwd:'',
                newPwd:'',
                againNewpwd:''
            },
        }
    },
    methods:{
        modifierPwd(){
            if(this.$refs.newPwd.value===this.$refs.againNewpwd.value){
                //此处需向后端发送请求
                var _this = this
                $.ajax({
                  //几个参数需要注意一下
                  type: "POST",//方法类型
                  dataType: "json",//预期服务器返回的数据类型
                  url: "http://192.168.2.124/salestest/user/SysUpdatePwd" ,//url
                  data: {reepassword:this.form.oldPwd,password:this.form.newPwd,repassword:this.form.againNewpwd,user_id:this.$store.state.userId},
                  success: function (res) {
                    if(res.recode!=400){
                      _this.$message.warning(res.reinfo)
                      console.log(res)
                    }else{
                        _this.$message.warning(res.reinfo)
                        _this.$router.push({
                            path:'/login'
                        })
                    }
                  },
                });
            }else{
              this.$message.warning('您输入的两次密码不一致')
            }
        },
    }
}
</script>

<style>

</style>
