<template>
    <el-card id="staffGathering">
        <!-- 面包屑 -->
        <my-bread level1="出勤与收款" level2="收款"></my-bread>
             <!-- tabs显示三种收款方式 -->
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" class="gathering">
                <el-tab-pane label="微信二维码收款" name="first">
                    <!-- 微信二维码图片 -->
                    <div class="wxImg">
                        <div v-if="this.wx_pay===null">
                            暂未上传收款二维码
                        </div>
                    </div>
                    <!-- 设置按钮 -->
                    <el-button type="info" class="leaderBtn" @click="setWx()">设置微信二维码</el-button>
                </el-tab-pane>
                <el-tab-pane label="支付宝二维码收款" name="second">
                    <!-- 支付宝二维码图片 -->
                     <div class="zfbImg">
                         <div v-if="this.alipay===null">
                            暂未上传收款二维码
                        </div>
                    </div>
                    <!-- 设置按钮 -->
                    <el-button type="info" class="leaderBtn" @click="setZfb()">设置支付宝二维码</el-button>
                </el-tab-pane>
                <el-tab-pane label="第三方收款" name="third">
                     <!-- 第三方二维码图片 -->
                     <div class="elseImg">
                         <div v-if="this.bank===null">
                            暂未上传收款二维码
                        </div>
                    </div>
                    <!-- 设置按钮 -->
                    <el-button type="info" class="leaderBtn" @click="setElse()">设置第三方二维码</el-button>
                </el-tab-pane>

            </el-tabs>
            <!-- 设置微信二维码的弹出框 -->
            <form id="gatheringWx">
                <el-dialog
                title="上传微信收款二维码"
                :visible.sync="dialogVisibleWx"
                size="tiny">
                <!-- 上传图片 -->
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-success="successWx"
                    :on-remove="removeWx"
                    >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog>
                  <img width="100%" :src="dialogImageUrlWx" alt="">
                </el-dialog>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleWx = false">取 消</el-button>
                  <el-button type="primary" @click="subWx()">确 定</el-button>
                </span>
                </el-dialog>
                <input type="text" :value="this.$store.state.userId" style="display:none" name="user_id">
                <input type="text" :value="this.$store.state.teamId" style="display:none" name="team_id">
                <input type="text" value="0" style="display:none" name="is_pay">
            </form>
            <!-- 设置支付宝二维码的弹出框 -->
            <form id="gatheringZfb">
                <el-dialog
                    title="上传支付宝收款二维码"
                    :visible.sync="dialogVisibleZfb"
                    size="tiny">
                    <!-- 上传图片 -->
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-success="successZfb"
                        :on-remove="removeZfb"
                        >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog>
                      <img width="100%" :src="dialogImageUrlZfb" alt="">
                    </el-dialog>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisibleZfb = false">取 消</el-button>
                      <el-button type="primary" @click="subZfb()">确 定</el-button>
                    </span>
                </el-dialog>
                <input type="text" :value="this.$store.state.userId" style="display:none" name="user_id">
                <input type="text" :value="this.$store.state.teamId" style="display:none" name="team_id">
                <input type="text" value="1" style="display:none" name="is_pay">
            </form>
            <!-- 设置第三方支付的弹出框 -->
            <form id="gatheringElse">
                <el-dialog
                title="上传第三方收款二维码"
                :visible.sync="dialogVisibleElse"
                size="tiny">
                <!-- 上传图片 -->
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-success="successElse"
                    :on-remove="removeElse"
                    >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog>
                  <img width="100%" :src="dialogImageUrlElse" alt="">
                </el-dialog>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleElse = false">取 消</el-button>
                  <el-button type="primary" @click="subElse()">确 定</el-button>
                </span>
                </el-dialog>
                <input type="text" :value="this.$store.state.userId" style="display:none" name="user_id">
                <input type="text" :value="this.$store.state.teamId" style="display:none" name="team_id">
                <input type="text" value="2" style="display:none" name="is_pay">
            </form>
    </el-card>
</template>

<script>

export default {
    inject:['reload'],
    data() {
        return {
            bank:'',
            alipay:'',
            wx_pay:'',
            activeName2: 'first',
            dialogImageUrlWx: '',
            dialogVisibleWx: false,
            dialogImageUrlZfb: '',
            dialogVisibleZfb: false,
            dialogImageUrlElse: '',
            dialogVisibleElse:false,
           
        };
    },
    created(){
        this.getGatheringImg()
    },
    methods: {
        //获取三种支付方式的二维码图片
        getGatheringImg(){
            var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/team/SysGetPunchReceivables" ,//url
              data: {team_id:this.$store.state.teamId},
              success: function (res) {
                if(res.recode!=400){
                  _this.$message.warning(res.reinfo)
                }else{
                    _this.bank = res.data.bank;
                    _this.alipay = res.data.alipay;
                    _this.wx_pay = res.data.wx_pay;
                    $('.elseImg').css("background-image","url("+res.data.bank+")");
                    $('.zfbImg').css("background-image","url("+res.data.alipay+")");
                    $('.wxImg').css("background-image","url("+res.data.wx_pay+")");
                  //刷新页面，目的是让表单中的数据清空
                  console.log(res)
                }
              },
            });
        },
        handleClick(tab, event) {
            console.log(tab)
        },
        // 显示设置微信二维码弹出框
        setWx(){
            this.dialogVisibleWx = true;
        },
        //显示设置支付宝二维码弹出框
        setZfb(){
            this.dialogVisibleZfb = true;
        },
        //显示设置第三方二维码弹出框
        setElse(){
            this.dialogVisibleElse = true;
        },
        successWx(response,file,filelist){
            var This = this;
            //this.imageUrl = URL.createObjectURL(file.raw);
            var reader = new FileReader();
            reader.readAsDataURL(file.raw);
            reader.onload = function(e){ 
                // this.result // 这个就是base64编码了
                This.imageUrl = this.result;
                var form = document.getElementById("gatheringWx"); 
                var input = document.createElement("input");  
                input.setAttribute('type', 'text');     
                input.setAttribute('name','image'); 
                input.setAttribute('uid',file.uid);
                input.setAttribute('class','gatheringWxInput');
                input.value = This.imageUrl 
                form.appendChild(input);   
            }
            // 实现只能上传一张图片
            if($('.el-upload-list--picture-card').children('li').length>0){
                $('.el-upload--picture-card').hide()
            }
           
            this.dialogImageUrlWx = file.url
            
        },
        //当添加一张照片以后，又移除掉这张照片时，此时filelist为0，将上传图片显示
        removeWx(file,filelist){
            //实现移除图片并且移除相应的Input框
            var inputs = document.querySelectorAll('.gatheringWxInput')
            var form = document.getElementById("gatheringWx"); 
            for(var i =0;i<inputs.length;i++){
              $("input[uid=" + file.uid + "]").remove();
            } 
            if(filelist.length==0){
                $('.el-upload--picture-card').show()
            }
        },
       
        //点击确定上传微信二维码，需向藕断发送请求
        subWx(){
            console.log(111)
            var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/team/SysInPunchReceivables2" ,//url
              data: $('#gatheringWx').serialize(),
              success: function (res) {
                if(res.recode!=400){
                  _this.$message.warning(res.reinfo)
                }else{
                  //刷新页面，目的是让表单中的数据清空
                   _this.$message.success('上传成功')
                  _this.reload()
                   _this.dialogVisibleWx = false
                  console.log(res)
                }
              },
            });
        },
        successZfb(response,file){
            var This = this;
            //this.imageUrl = URL.createObjectURL(file.raw);
            var reader = new FileReader();
            reader.readAsDataURL(file.raw);
            reader.onload = function(e){ 
                // this.result // 这个就是base64编码了
                This.imageUrl = this.result;
                var form = document.getElementById("gatheringZfb"); 
                var input = document.createElement("input");  
                input.setAttribute('type', 'text');     
                input.setAttribute('name','image'); 
                input.setAttribute('uid',file.uid);
                input.setAttribute('class','gatheringZfbInput');
                input.value = This.imageUrl 
                form.appendChild(input);   
            }
            if($('.el-upload-list--picture-card').children('li').length>0){
                $('.el-upload--picture-card').hide()
            }

            this.dialogImageUrlZfb = file.url
        },
        removeZfb(file,filelist){
            //实现移除图片并且移除相应的Input框
            var inputs = document.querySelectorAll('.gatheringZfbInput')
            var form = document.getElementById("gatheringZfb"); 
            for(var i =0;i<inputs.length;i++){
              $("input[uid=" + file.uid + "]").remove();
            } 
            if(filelist.length==0){
                $('.el-upload--picture-card').show()
            }
        },
       
        //点击确定上传支付宝二维码，需向发送请求
        subZfb(){
            console.log(222)
            var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/team/SysInPunchReceivables2" ,//url
              data: $('#gatheringZfb').serialize(),
              success: function (res) {
                if(res.recode!=400){
                    _this.$message.warning(res.reinfo)
                }else{
                  //刷新页面，目的是让表单中的数据清空
                   _this.$message.success('上传成功')
                    _this.reload()
                    _this.dialogVisibleZfb = false
                    console.log(res)
                }
              },
            });
            
        },
        successElse(response,file){
            var This = this;
            //this.imageUrl = URL.createObjectURL(file.raw);
            var reader = new FileReader();
            reader.readAsDataURL(file.raw);
            reader.onload = function(e){ 
                // this.result // 这个就是base64编码了
                This.imageUrl = this.result;
                var form = document.getElementById("gatheringElse"); 
                var input = document.createElement("input");  
                input.setAttribute('type', 'text');     
                input.setAttribute('name','image'); 
                input.setAttribute('uid',file.uid);
                input.setAttribute('class','gatheringElseInput');
                input.value = This.imageUrl 
                form.appendChild(input);   
            }
            if($('.el-upload-list--picture-card').children('li').length>0){
                $('.el-upload--picture-card').hide()
            }

            this.dialogImageUrlElse = file.url
        },
        removeElse(file,filelist){
             //实现移除图片并且移除相应的Input框
            var inputs = document.querySelectorAll('.gatheringELseInput')
            var form = document.getElementById("gatheringElse"); 
            for(var i =0;i<inputs.length;i++){
              $("input[uid=" + file.uid + "]").remove();
            } 
            if(filelist.length==0){
                $('.el-upload--picture-card').show()
            }
        },
        //点击确定上传第三方二维码，需向发送请求
        subElse(){
            console.log(333)
            var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/team/SysInPunchReceivables2" ,//url
              data: $('#gatheringElse').serialize(),
              success: function (res) {
                if(res.recode!=400){
                    _this.$message.warning(res.reinfo)
                }else{
                  //刷新页面，目的是让表单中的数据清空
                    _this.$message.success('上传成功')
                    _this.reload()
                    _this.dialogVisibleElse = false
                    console.log(res)
                   
                }
              },
            });
        },
    }
}
</script>

<style>
.gathering{
    margin-top:40px;
}
.wxImg{
    width: 200px;
    height:200px;
    background-image: url(../../assets/text1.jpg);
    background-repeat: no-repeat;
    background-size:contain
}
.zfbImg{
    width: 200px;
    height:200px;
    background-image: url(http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg);
    background-repeat: no-repeat;
    background-size:contain
}
.elseImg{
    width: 200px;
    height:200px;
    background-image: url(http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg);
    background-repeat: no-repeat;
    background-size:contain
}
.leaderBtn{
    margin-top: 20px;
}
</style>
