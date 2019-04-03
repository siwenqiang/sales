<template>
    <el-card>
        <!-- 面包屑组件 -->
        <my-bread level1="出勤与收款" level2="补卡"></my-bread>
         <!-- 点击补卡申请显示弹出框 -->
        <el-button type="primary" @click="editFillcard()" class="fillcard">补卡申请</el-button>
        <!-- 日期筛选 -->
          <div class="block" style="margin-top:0px">
            <el-date-picker
              v-model="value2"
              align="right"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <el-button
            type="info"
            size="small"
            @click="searchStaffFillCard()"
            >
            查询
            </el-button>
          </div>

        <el-dialog
          class="fillcard_form"
          title="提示"
          :visible.sync="dialogVisible"
          size="tiny"
          >
          <!-- 弹出一个可以补卡申请的表单 -->
          <el-form ref="form" :model="form" enctype="multipart/form-data" id="fillcardForm">
              <el-form-item label="要补卡的时间">
                <div class="block">
                  <el-date-picker
                    v-model="form.date"
                    type="datetime"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    @change="formatTime">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="上传图片">
                <el-upload
                  action="http://192.168.2.124/salestest/user"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-success="handlePicture"
                  :on-change="changeFile"
                  :on-remove="remove"
                  :data="imgdata"
                  >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisibleImg" size="tiny">
                  <div class="imgBox">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </div>
                </el-dialog>
              </el-form-item>
              <el-form-item label="补卡原因">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              
              <input type="text" :value="this.form.date" style="display:none" name="punch_time">
              <input type="text" :value="this.form.desc" style="display:none" name="remark">
              <input type="text" :value="this.$store.state.userId" style="display:none" name="user_id">
              <input type="text" :value="this.$store.state.teamId" style="display:none" name="team_id">
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="fillcard()">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 列表显示补卡记录 -->
         <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="realname"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="username"
              label="电话">
            </el-table-column>
             <el-table-column
              prop="date"
              label="补卡日期">
            </el-table-column>
            <el-table-column
              prop="time"
              label="补卡时间">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="补卡原因">
            </el-table-column>
             <el-table-column
              prop="image"
              label="附带照片">
              <template slot-scope="list">
                <a v-if="list.row.image.length!=0" href="javascript:void(0);">
                  <img v-image-preview style="height:50px;width:50px;margin-right:5px" :src="v" alt="" v-for="v in list.row.image" :key="v">
                </a>
              </template>
            </el-table-column>
            <el-table-column
              label="审核状态"
              width="180"
            >
              <template slot-scope="list">
                <span v-if="list.row.state==0">待审核</span>
                <span v-if="list.row.state==1">已审核</span>
              </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
    inject:['reload'],
    data(){
        return{
            tableData: [],
            dialogImageUrl: '',
            dialogVisibleImg: false,
            dialogVisible: false,
            form:{
                date:'',
                desc:'',
            },
            imgdata:{user_id:this.$store.state.userId},
            value2:'',
            imageUrl:'',
        }
    },
    created(){
      this.getfillCardList()
    },
    methods:{
      //移除照片时
      remove(file,fileList){
        console.log(file)
        console.log(fileList)
        // form.removeChild(input);
        //实现移除图片并且移除相应的Input框
        var inputs = document.querySelectorAll('.fuck')
        var form = document.getElementById("fillcardForm"); 
        for(var i =0;i<inputs.length;i++){
          $("input[uid=" + file.uid + "]").remove();
        } 
      },
      //转base64
      changeFile(file, fileList) {
       
      },
        //获取补卡记录列表
        getfillCardList(){
          var _this = this
          $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "http://192.168.2.124/salestest/team/SysSupplyList" ,//url
            data: {team_id:this.$store.state.teamId,user_id:this.$store.state.userId},
            success: function (res) {
              if(res.recode!=400){
                _this.$message.warning(res.reinfo)
              }
               _this.tableData = res.data.list
              console.log(res)
            },
          });
        },
        //上传成功时的回调
        handlePicture(response,file,fileList){
          console.log(file)
          console.log(file.raw)
          var This = this;
        //this.imageUrl = URL.createObjectURL(file.raw);
        var reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = function(e){ 
            // this.result // 这个就是base64编码了
            This.imageUrl = this.result;
            var form = document.getElementById("fillcardForm"); 
            var input = document.createElement("input");  
            input.setAttribute('type', 'text');     
            input.setAttribute('name','image[]'); 
            input.setAttribute('uid',file.uid);
            input.setAttribute('class','fuck');
            input.value = This.imageUrl 
            form.appendChild(input);   
        }
        // $('.img1').val(This.imageUrl)
          // console.log(response)
          // console.log(file)
          // console.log(fileList)
          
        },
        //实现图片的预览功能
        handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisibleImg = true;
        // console.log(file)
        },
       //向后台发送正确的格式的时间数据格式
        formatTime(time){
          this.form.date = time
        },
        editFillcard(){
            this.dialogVisible = true
        },
        //需向后端发送补卡申请的请求
        fillcard(){

          var _this = this
          $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "http://192.168.2.124/salestest/team/SysInSupply" ,//url
            data: $('.el-form').serialize(),
            success: function (res) {
              if(res.recode!=400){
                _this.$message.warning(res.reinfo)
              }else{
                //刷新页面，目的是让表单中的数据清空
                _this.reload()
                _this.getfillCardList()
                _this.dialogVisible = false
                console.log(res)
              }
             
            },
          });
            
        },
        //查询具体哪一天自己的补卡记录，需向后端发起请求
        searchStaffFillCard(){

        }
    }
}
</script>

<style>
#fillcardForm label{
  text-align: left;
}
.fillcard{
    margin: 40px 0;
}
.fillcard_form .el-dialog{
    height: auto;
}
.fillcard_form .el-form-item__label{
    display: block;
    float: none;
    font-weight: 900;
}
.fillcard_form .el-form-item{
    margin-bottom: 0px;
    margin-top: 20px
}
.fillcard_form .el-form-item__content{
    margin-left: 0px !important
}
.fillcard_form .el-textarea__inner{
    min-height: 90px !important
}
.fuck{
  display: none
}
</style>
