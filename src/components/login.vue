<template>
  <div class="box">
    <!-- 表单验证账号和密码 -->
    <el-form label-position="top" label-width="80px" :model="formdata" class="form">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" class="btn" @click.prevent="handleLogin()">登录</el-button>
      <!-- 忘记密码 -->
      <a href="javascript:;" style="float:right;margin-top:10px;text-decoration:none;color:red" @click="forgetPwd()">忘记密码</a>
      <!-- 注册账号 -->
      <a href="javascript:;" style="float:left;margin-top:10px;text-decoration:none;color:#409eff" @click="register()">注册账号</a>
    </el-form>
    <!-- 忘记密码 -->
      <el-dialog
        title="修改密码"
        :visible.sync="dialogVisiblePwd"
        size="tiny">
        <!-- 步骤条 -->
        <el-steps :space="100" :active="1*activeName" finish-status="success">
          <el-step title="手机验证"></el-step>
          <el-step title="密码重置"></el-step>
        </el-steps>
        <!-- tab页和表单填写 -->
        <el-form :rules="rules" ref="form" :model="form">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="手机验证" name="1">
              <el-form-item prop="phone" required>
                <el-input v-model.number="form.phone" placeholder="请输入手机号" style="width:30%;margin-top:40px;"></el-input>
                <el-button type="info" size='small' @click="sendNum()">发送验证码</el-button>
              </el-form-item>
              <el-form-item prop="note">
                <el-input  ref='note' v-model="form.note" placeholder="请输入短信验证码" style="width:43%;margin-top:40px;"></el-input>
              </el-form-item>
              <el-button type="primary" size="small" @click="nextStep('form')" style="margin-top:20px;">下一步</el-button>
            </el-tab-pane>
            <el-tab-pane label="密码重置" name="2" :disabled="flag">
              <el-form-item>
                <el-input type="password" ref="newPwd" v-model.number="form.newPwd" placeholder="请输入新密码" style="width:30%;margin-top:40px;"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input type="password" ref="againNewpwd" v-model.number="form.againNewpwd" placeholder="请再次输入新密码" style="width:30%;margin-top:40px;"></el-input>
              </el-form-item>
              <el-button type="primary" size="small" @click="modifierPwd()" style="margin-top:20px;">完成</el-button>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </el-dialog>
    <!-- 注册账号 -->
      <el-dialog
        title="注册账号"
        :visible.sync="dialogVisibleRegister"
        size="tiny">
        <el-form :rules="rules" :model="formRegister" ref="formRegister">
          <el-form-item prop="phone">
            <el-input v-model.number="formRegister.phone" placeholder="请输入手机号" style="width:30%;margin-top:20px;"></el-input>
            <el-button type="info" size='small' @click="sendNumRegister()">发送验证码</el-button>
          </el-form-item>
          <el-form-item prop="note">
            <el-input v-model="formRegister.note" placeholder="请输入短信验证码" style="width:30%;margin-top:20px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" ref="RnewPwd" v-model.number="formRegister.newPwd" placeholder="请输入新密码" style="width:30%;margin-top:20px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" ref="RagainNewpwd" v-model.number="formRegister.againNewpwd" placeholder="请再次输入新密码" style="width:30%;margin-top:20px;"></el-input>
          </el-form-item>
          <el-button type="primary" size="small" @click="RegisterModifierPwd('formRegister')" style="margin-top:20px;">完成</el-button>  
        </el-form>
      </el-dialog>
  </div>
</template>

<script>
export default {
  inject:['reload'],
 data(){
   //  校验验证码
  var validateMobileNote = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('验证码不能为空'));
        } else {

          callback();
        }
      };

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

   return{
     formdata:{
       username:'',
       password:''
     },
      dialogVisibleRegister:false,
      dialogVisiblePwd:false,
      activeName:'1',
      form:{
        phone:'',
        note:'',
        newPwd:'',
        againNewpwd:''
      },
      formRegister:{
        phone:'',
        note:'',
        newPwd:'',
        againNewpwd:''
      },
      rules: {
        phone: [
          {validator: validateMobilePhone, trigger: 'blur'}
        ],
        note: [
          {validator: validateMobileNote, trigger: 'blur'}
        ],
      },
      flag:true
   }
 },
 mounted(){
   
 },
 methods:{
   //注册账号发送手机验证码
  sendNumRegister(){
    var _this = this
      $.ajax({
        //几个参数需要注意一下
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "http://192.168.2.124/salestest/index/authentication" ,//url
        data: {mobile:this.formRegister.phone},
        success: function (res) {
          if(res.recode!=400){
            _this.$message.warning(res.reinfo)
          }
          console.log(res)
        },
      });
   },
   //
   RegisterModifierPwd(formName){
    var _this = this
     //验证验证码
     $.ajax({
        //几个参数需要注意一下
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "http://192.168.2.124/salestest/index/CheckRealCode" ,//url
        data: {mobile:this.formRegister.phone,checkcode:this.formRegister.note},
        success: function (res) {
         if(res.recode!=400){
            _this.$message.warning(res.reinfo)
            return false
            console.log(res)
         }else{
           console.log(_this)
           _this.$refs[formName].validate((valid) => {
            if (valid&&_this.$refs.RnewPwd.value===_this.$refs.RagainNewpwd.value) {
                    //此处需向后端发送请求
            $.ajax({
                  //几个参数需要注意一下
                  type: "POST",//方法类型
                  dataType: "json",//预期服务器返回的数据类型
                  url: "http://192.168.2.124/salestest/index/createUser" ,//url
                  data: {user:_this.formRegister.phone,pwd:_this.formRegister.newPwd,check:_this.formRegister.againNewpwd},
                  success: function (res) {
                    if(res.recode===400){
                      _this.dialogVisibleRegister = false
                      _this.reload()
                    }else{
                      _this.$message.warning(res.reinfo)
                    }
                    console.log(res)
                  },
                });

                } else {
                  _this.$message.warning('您输入的两次密码不一致')
                }
            });
            
         }
        },
      });
     
   },
   //点击注册账号显示注册账号的弹出框
   register(){
     this.dialogVisibleRegister = true
   },
    //忘记密码的第二步，判断输入两次密码是否一致
    modifierPwd(){
      if(this.$refs.newPwd.value===this.$refs.againNewpwd.value){
        //此处需向后端发送请求
         var _this = this
          $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "http://192.168.2.124/salestest/index/missPWD" ,//url
            data: {mobile:this.form.phone,pwd:this.form.newPwd,check:this.form.againNewpwd},
            success: function (res) {
              if(res.recode!=400){
                _this.$message.warning(res.reinfo)
              }else{
                _this.dialogVisiblePwd = false
                //刷新页面，目的是让表单中的数据清空
                _this.reload()
              }
            },
          });
        
      }else{
        this.$message.warning('您输入的两次密码不一致')
      }
    },
   //  当点击下一步进入密码重置,需向后端发起请求，若成功则进入下一步，若不成功则提示
   nextStep(formName){
     this.$refs[formName].validate((valid) => {
          if (valid) {
            //发送ajax请求
            var _this = this
              $.ajax({
                //几个参数需要注意一下
                type: "POST",//方法类型
                dataType: "json",//预期服务器返回的数据类型
                url: "http://192.168.2.124/salestest/index/checkMissCode" ,//url
                data: {mobile:this.form.phone,checkcode:this.form.note},
                success: function (res) {
                  if(res.recode!=400){
                    _this.$message.warning(res.reinfo)
                    console.log(res)
                  }else{
                    //进入到tab中的2时表示已经验证成功
                    _this.activeName = '2'
                    _this.flag = false
                    console.log(res)
                  }
                },
              });
            
          } else {
            return false;
          }
        });
     
   },
   // 当点击发送验证码时，需向后端发起请求
   sendNum(){
      var _this = this
      $.ajax({
        //几个参数需要注意一下
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "http://192.168.2.124/salestest/index/getMissCode" ,//url
        data: {mobile:this.form.phone},
        success: function (res) {
          if(res.recode!=400){
            _this.$message.warning(res.reinfo)
          }else{
            console.log(res)
          }
        },
      });
   },
   //当点击标签页时触发的事件
   handleClick(){

   },
   //点击忘记密码弹出修改密码的弹出框
   forgetPwd(){
     this.dialogVisiblePwd = true
   },
   handleLogin(){
     var _this = this
      $.ajax({
        //几个参数需要注意一下
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "http://192.168.2.124/salestest/index/userLogin" ,//url
        data: {user:this.formdata.username,pwd:this.formdata.password},
        success: function (res) {
          if(res.recode!=400){
            _this.$message.warning(res.reinfo)
          }else{
            sessionStorage.userId = res.data.id
            _this.$store.state.userId = res.data.id
            _this.$store.state.username = res.data.username
            console.log(res)
           _this.$router.push({
              path: "/home"
            });
          }
        },
      });
   }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.box{
  background-color: #444444;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  width: 400px;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
} 
.btn {
  width: 100%;
}
</style>
