<template>
    <el-card>
        <!-- 面包屑组件 -->
        <my-bread level1="出勤与收款" level2="内勤打卡"></my-bread>
        <!-- 日期筛选 -->
            <div class="block" style="margin-top:40px">
              <el-date-picker
                v-model="value2"
                align="right"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
              <el-button
              type="info"
              size="small"
              @click="searchcardIn()"
              >
              查询
              </el-button>
            </div>
        <!-- 内勤打卡记录 -->
        <el-table
            :data="tableData"
            style="width: 100%;
            margin-top:20px
            "
            >
            <el-table-column
              prop="punch_time"
              label="打卡时间"
              width="">
              <template slot-scope="list">{{list.row.punch_time_str*1000 | dateformat('YYYY-MM-DD HH:mm:ss')}}</template>
            </el-table-column>
    
            <el-table-column
              prop="punch_address"
              label="打卡位置">
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
    data(){
        return{
            tableData:[],
            value2:'',
            pagenum: 1,
            pagesize: 2,
            total: 0,
        }
    },
    //在此钩子函数中获取数据,发送请求
    created(){
        this.getCardInData()
        this.total = this.tableData.length
    },
    methods:{
        //获取上下班打卡的页面数据
        getCardInData(){
            var _this = this
            $.ajax({
              //几个参数需要注意一下
              type: "GET",//方法类型
              dataType: "json",//预期服务器返回的数据类型
              url: "http://192.168.2.124/salestest/team/SysGetOnPunch" ,//url
              data: {user_id:this.$store.state.userId,team_id:this.$store.state.teamId},
              success: function (res) {
                if(res.recode!=400){
                  _this.$message.warning(res.reinfo)
                }
                  console.log(res)
                  _this.tableData = res.data.punch_info
                   _this.total = _this.tableData.length
              },
              error:function(res){
                console.log(11)
                console.log(res)
              }
            });
        },
        //点击查询需向后端发送请求
        searchcardIn(){

        },
         //改变每页显示数据的条数
        handleSizeChange(val){
            this.pagesize = val;
            this.pagenum = 1;
            
        },
        //改变当前页面码数
        handleCurrentChange(val){
            this.pagenum = val; 
            
        },
    }
}
</script>

<style>

</style>
