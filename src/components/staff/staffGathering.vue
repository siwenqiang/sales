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
            </el-tab-pane>
            <el-tab-pane label="支付宝二维码收款" name="second">
                <!-- 支付宝二维码图片 -->
                 <div class="zfbImg">
                    <div v-if="this.alipay===null">
                            暂未上传收款二维码
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="第三方收款" name="third">
               <!-- 第三方二维码图片 -->
                 <div class="elseImg">
                    <div v-if="this.bank===null">
                            暂未上传收款二维码
                    </div>
                </div>
            </el-tab-pane>
            
        </el-tabs>
    </el-card>
</template>

<script>

export default {
    data() {
        return {
            activeName2: 'first',
            bank:'',
            alipay:'',
            wx_pay:''
        };
    },
    created(){
        this.getGatheringImg()
    },
    methods: {
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
            console.log(tab, event);
        }
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
</style>
