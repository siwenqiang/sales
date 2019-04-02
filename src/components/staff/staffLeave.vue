<template>
    <el-card id="staffLeave">
        <!-- 面包屑组件 -->
        <my-bread level1="出勤与收款" level2="请假"></my-bread>
         <!-- 点击补卡申请显示弹出框 -->
        <el-button type="primary" @click="showLeave()" class="announce" style="margin:40px 0;">请假申请</el-button>
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
            @click="searchLeave()"
            >
            查询
            </el-button>
          </div>

        <el-dialog
          id="announce_form"
          title="请假申请"
          :visible.sync="dialogVisible"
          size="tiny"
          >
          <!-- 弹出一个可以发布公告的表单 -->
          <el-form ref="form" :model="form" label-width="80px" id="fillLeave">
            <!-- 开始时间 -->
              <el-form-item label="开始时间">
                <el-date-picker type="datetime" placeholder="选择日期" v-model="form.Amdate"  @change="transformTime" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>
              <!-- 结束时间 -->
               <el-form-item label="结束时间" style="magin:20px 0">
                <el-date-picker type="datetime" placeholder="选择日期" v-model="form.Pmdate" @change="countTime"  value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>
              <!-- 计算时长 -->
              <el-form-item label="请假时长" style="width:22%">
                <el-input v-model="time" readonly></el-input>
              </el-form-item>
              <!-- 选择请假类型 -->
              <el-form-item label="请假类型">
                <!-- option绑定的value值就是将来表单提交给select绑定的v-model值 -->
                <el-select v-model="form.type" placeholder="请选择请假类型">
                  <el-option :label="v.name" :value="v.id" v-for="(v,i) in this.leaveType" :key="i"></el-option>
                 
                </el-select>
              </el-form-item>
              <!-- 上传请假附带照片 -->
              <el-form-item label="上传图片" style="margin-top:20px">
                  <el-upload
                    action="http://192.168.2.124/salestest/user"
                    class="upload-demo"
                    :on-preview="handlePictureCardPreview"
                    :on-success="handlePicture"
                    :on-remove="remove"
                    :before-upload="beforeAvatarUpload"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
                  </el-upload>
              </el-form-item>
              <el-form-item label="请假原因" id="staffleave_reson">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <input type="text" style="display:none" :value="this.$store.state.userId" name="user_id">
              <input type="text" style="display:none" :value="this.$store.state.teamId" name="team_id">
              <input type="text" style="display:none" :value="this.form.time" name="length">
              <input type="text" style="display:none" :value="this.form.type" name="type_id">
              <input type="text" style="display:none" :value="this.form.desc" name="remark">
              <input type="text" style="display:none" :value="this.form.Amdate" name="start_time">
              <input type="text" style="display:none" :value="this.form.Pmdate" name="end_time">
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="staffLeave()">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 列表显示补卡记录 -->
         <el-table
            :data="tableData"
            stripe
            style="width: 100%;position:static">
            <el-table-column
              prop="create_time"
              label="创建日期">
            </el-table-column>
            <el-table-column
              prop="realname"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="start_time"
              label="开始时间">
            </el-table-column>
            <el-table-column
              prop="end_time"
              label="结束时间">
            </el-table-column>
             <el-table-column
              prop="leave_type_name"
              label="请假类型">
            </el-table-column>
            <!-- <el-table-column
              label="附带照片"
              width="240"
              >
              <template slot-scope="list">
                <a v-if="list.row.src!=''" href="javascript:void(0);"><img v-image-preview style="height:50px;width:50px;" :src="list.row.src" alt=""></a>
              </template>
            </el-table-column> -->
            <el-table-column
              prop="status"
              label="审核状态"
              >
              <template slot-scope="list">
                <span v-if="list.row.status==0">待审核</span>
                <span v-if="list.row.status==1">审核通过</span>
                <span v-if="list.row.status==2">审核未通过</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="title">
              <template slot-scope="list">
                <el-button
                size="small"
                type="warning"
                @click="handleSearch(list.row)">查看请假详情</el-button>
              </template>
            </el-table-column>
        </el-table>
        <!-- 请假详情页 -->
        <el-dialog
          title="公告详情"
          :visible.sync="dialogVisibleLeave"
          size="tiny">
          <el-form v-model="leaveInfo">
            <el-form-item label="请假类型">
              <el-input readonly v-model="leaveInfo.leave_type_name"></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-input readonly v-model="leaveInfo.start_time"></el-input>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-input readonly v-model="leaveInfo.start_time"></el-input>
            </el-form-item>
            <el-form-item label="时长">
              <el-input readonly v-model="leaveInfo.length"></el-input>
            </el-form-item>
            <el-form-item label="请假事由">
              <el-input type="textarea" readonly v-model="leaveInfo.remark"></el-input>
            </el-form-item>
            <el-form-item label="照片">
               <!-- <template slot-scope="leaveInfo"> -->
                <!-- <a v-if="leaveInfo.image.length!=0" href="javascript:void(0);"> -->
                  <img  v-image-preview style="height:50px;width:50px;margin-right:5px" :src="v.image" alt="" v-for="v in leaveInfo.image" :key="v.id">
                <!-- </a> -->
              <!-- </template> -->
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleNotice = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleLeave = false">确 定</el-button>
          </span>
        </el-dialog>
    </el-card>
</template>

<script>
export default {
    inject:['reload'],
    data(){
        return{
            leaveInfo:{},
            dialogVisibleLeave:false,
            //显示带小时代单位的时长
            time:'',
            value1:'',
            leaveType:[],
            tableData: [],
            imgUrl:'',
            dialogVisible: false,
            form:{
                //要提交给后台的纯数字的时长
                time:'',
                Amdate:'',
                Amday:'',
                Pmdate:'',
                Pmday:'',
                desc:'',
                type:'',
            },
            value2:'',
            arr:[]
        }
    },
    created(){
      this.getLeaveType()
      this.getleaveList()
    },
    methods:{
        //查询请假详情
        handleSearch(leave){
          this.leaveInfo = {}
          this.dialogVisibleLeave = true
          var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/leave/SysGetLeaveInfo" ,//url
              data: {user_id:this.$store.state.userId,team_id:this.$store.state.teamId,leave_id:leave.id},
              success: function (res) {
                if(res.recode!=400){
                  _this.$message.warning(res.reinfo)
                }else{
                  _this.leaveInfo = res.data
                  console.log(res)
                }   
              },
            });
        },
        //限制图片上传大小和格式
        beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        this.arr.push(isJPG)
        this.arr.push(isPNG)
        this.arr.push(isLt2M)
        if (!isJPG&&!isPNG) {
          this.$message.error('上传头像图片只能是 JPG/PNG格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
      
        return isPNG||isLt2M&isLt2M ;
      },
         //移除照片时
        remove(file,fileList){
          console.log(file)
          console.log(fileList)
          // form.removeChild(input);
          //实现移除图片并且移除相应的Input框
          var inputs = document.querySelectorAll('.fuck')
          var form = document.getElementById("fillLeave"); 
          for(var i =0;i<inputs.length;i++){
            $("input[uid=" + file.uid + "]").remove();
          } 
        },
        //实现图片的预览功能
         handlePictureCardPreview(file) {
         this.dialogImageUrl = file.url;
         this.dialogVisibleImg = true;
         // console.log(file)
         },
         //图片上传成功时的回调
         handlePicture(response,file,fileList){
           var This = this;
          //this.imageUrl = URL.createObjectURL(file.raw);
          var reader = new FileReader();
          reader.readAsDataURL(file.raw);
          reader.onload = function(e){ 
              // this.result // 这个就是base64编码了
              This.imageUrl = this.result;
              var form = document.getElementById("fillLeave"); 
              var input = document.createElement("input");  
              input.setAttribute('type', 'text');     
              input.setAttribute('name','image[]'); 
              input.setAttribute('uid',file.uid);
              input.setAttribute('class','fuck');
              input.value = This.imageUrl 
              form.appendChild(input);   
          }
          // $('.img1').val(This.imageUrl)
            console.log(response)
            console.log(file)
            console.log(fileList)

          },
        //转化日期格式
        transformTime(time){
          this.form.Amdate = time
        },
        //计算请假时间
        countTime(time){
          this.form.Pmdate = time
          var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/leave/SysGetLeaveLength" ,//url
              data: {user_id:this.$store.state.userId,team_id:this.$store.state.teamId,start_time:this.form.Amdate,end_time:this.form.Pmdate},
              success: function (res) {
                if(res.recode!=400){
                  _this.$message.warning(res.reinfo)
                }
                  _this.form.time = res.data
                  _this.time = res.data +'小时'
                  console.log(res)                
              },
            });
        },
        //获取请假类型
        getLeaveType(){
           var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/leave/SysGetLeaveType" ,//url
              data: {},
              success: function (res) {
                if(res.recode!=400){
                  _this.$message.warning(res.reinfo)
                }
                  _this.leaveType = res.data
                  console.log(res)                
              },
            });
        },
        //需向后端发起请假申请的请求
        staffLeave(){
          var _this = this
          $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "http://192.168.2.124/salestest/leave/SysInLeave" ,//url
            data: $('.el-form').serialize(),
            success: function (res) {
              if(res.recode!=400){
                _this.$message.warning(res.reinfo)
              }else{
                //刷新页面，目的是让表单中的数据清空
                _this.reload()
                 console.log(res) 
                _this.dialogVisible = false 
              }
                             
            },
          });
        },
        //获取请假数据列表
        getleaveList(){
          var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "POST",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/leave/SysGetLeaveList" ,//url
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
        //显示请假申请的弹出框
        showLeave(){
            this.dialogVisible = true;
        },
        //图片上传成功后的函数
        staffLeaveImg(response,file){
          this.imgUrl = file.url
          // console.log(111)
          // console.log(file)
        },
        //查询具体哪一天自己的请假记录
        searchLeave(){

        }
    }
}
</script>

<style>
.vue-directive-image-previewer{
  z-index:9999
}
  #staffLeave .el-dialog{
    height:auto
  }
  /* #staffLeave .el-form-item{
    margin-top:-20px;
  } */
  #staffleave_reson{
    margin-top: 10px !important
  }
</style>
