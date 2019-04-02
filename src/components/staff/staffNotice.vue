<template>
    <el-card>
        <my-bread level1="出勤与收款" level2="公告"></my-bread>
       
        <!-- 日期筛选 -->
          <div class="block" style="margin-top:30px">
            <el-date-picker
              v-model="value2"
              align="right"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <el-button
            type="info"
            size="small"
            @click="searchNotice()"
            >
            查询
            </el-button>
          </div>
        <!-- 列表显示公告 -->
         <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="release_time"
              label="发布日期">
            </el-table-column>
            <el-table-column
              prop="author"
              label="作者">
            </el-table-column>
            <el-table-column
              prop="title"
              label="标题">
            </el-table-column>
            <el-table-column
              prop="title">
              <template slot-scope="list">
                <el-button
                size="small"
                type="warning"
                @click="handleSearch(list.row)">查看公告详情</el-button>
              </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- 
        handleSizeChange:每页显示条数改变时
        handleCurrentChange:当前页码改变时
        current-page:当前页码
        page-sizes:控制每页显示条数所在的数组
        layout:分页组件的小功能
        total:数据总个数
          -->
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
        <!-- 公告详情的弹出框 -->
        <el-dialog
          title="公告详情"
          :visible.sync="dialogVisibleNotice"
          size="tiny">
          <el-form  v-model="noticeInfo">
            <el-form-item label="公告标题">
              <el-input v-model="noticeInfo.title" readonly></el-input>
            </el-form-item>
            <el-form-item id="textarea" label="公告内容">
              <el-input type="textarea" v-model="noticeInfo.content" readonly></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleNotice = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleNotice = false">确 定</el-button>
          </span>
        </el-dialog>
    </el-card>
  
</template>

<script>
export default {
    data() {
      return {
        tableData: [],
        noticeInfo:{},
        dialogVisibleNotice:false,
        value2:'',
        pagenum: 1,
        pagesize: 2,
        total: -1,
      }
    },
    created(){
      this.getNoticeList()
    },
    methods:{
        //查询公告详情
        handleSearch(notice){
          var _this = this
          this.dialogVisibleNotice = true
          $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "http://192.168.2.124/salestest/Notice/SysGetNoticeInfo" ,//url
            data: {notice_id:notice.id},
            success: function (res) {
              if(res.recode!=400){
                _this.$message.warning(res.reinfo)
              }
                _this.noticeInfo = res.data
              console.log(res)
            },
          });
        },
        //当前页码发生改变时
        handleCurrentChange(val){
          this.pagenum = val;
          this.getNoticeList();
          console.log(val)
        },
        //当前页面显示条数改变时
        handleSizeChange(val){
          this.pagesize = val;
          this.pagenum = 1;
          this.getNoticeList();
          console.log(val)
        },
        //获取公告列表
        getNoticeList(){
          var _this = this
          $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "http://192.168.2.124/salestest/Notice/SysGetNoticeList" ,//url
            data: {page:this.pagenum,size:this.pagesize,team_id:this.$store.state.teamId},
            success: function (res) {
              if(res.recode!=400){
                _this.$message.warning(res.reinfo)
              }
              _this.tableData = res.data.result
              _this.total = res.data.count
              console.log(res)
            },
          });
        },
        showEditannounce(){
            this.dialogVisible = true;
            // var box = document.querySelector('.announce_form .el-form-item__content')
            // box.style.marginTop = '0px'
        },
        //查询日期具体哪一天的公告
        searchNotice(){

        }
    }
}
</script>

<style>

</style>
