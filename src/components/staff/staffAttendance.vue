<template>
    <el-card>
        <my-bread level1="工作" level2="我的考勤"></my-bread>
        <div class="block">
            <el-date-picker
              v-model="value"
              type="month"
              placeholder="选择月"
              style="margin:20px 0">
            </el-date-picker>
            <el-button type="info" @click="searchMonth()">查询</el-button>
        </div>
        <el-table
            :data="tableData5"
            style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="签到时间">
                      <span>{{ props.row.signIn }}</span>
                    </el-form-item>
                    <el-form-item label="签退时间">
                      <span>{{ props.row.signOut }}</span>
                    </el-form-item>
                    <el-form-item label="外出打卡">
                      <span>{{ props.row.outCard }}</span>
                    </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              label="日期"
              prop="date">
            </el-table-column>
            <el-table-column
              label="迟到"
              prop="">
            </el-table-column>
            <el-table-column
              label="早退"
              prop="">
            </el-table-column>
            <el-table-column
              label="缺卡"
              prop="">
            </el-table-column>
            <el-table-column
              label="旷工"
              prop="">
            </el-table-column>
            <el-table-column
              label="外勤"
              prop="">
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
    data(){
        return{
            props:[],
            value:'',
            tableData5: [{
              date: '2019-3-26',
              signIn:'2019-3-26 08:58',
              signOut:'2019-3-26 18:10',
              outCard:''
            }, {
              date: '2019-3-27',
              signIn:'2019-3-27 08:58',
              signOut:'2019-3-27 18:10',
              outCard:''
            }, {
              date: '2019-3-28',
              signIn:'2019-3-28 08:58',
              signOut:'2019-3-28 18:10',
              outCard:''
            }, {
              date: '2019-3-29',
              signIn:'2019-3-29 08:58',
              signOut:'2019-3-29 18:10',
              outCard:''
            },
            {
              date: '2019-3-29',
              signIn:'2019-3-29 08:58',
              signOut:'2019-3-29 18:10',
              outCard:''
            },
            {
              date: '2019-3-29',
              signIn:'2019-3-29 08:58',
              signOut:'2019-3-29 18:10',
              outCard:''
            },
            {
              date: '2019-3-29',
              signIn:'2019-3-29 08:58',
              signOut:'2019-3-29 18:10',
              outCard:''
            },
            {
              date: '2019-3-29',
              signIn:'2019-3-29 08:58',
              signOut:'2019-3-29 18:10',
              outCard:''
            },
            {
              date: '2019-3-29',
              signIn:'2019-3-29 08:58',
              signOut:'2019-3-29 18:10',
              outCard:''
            },
            {
              date: '2019-3-29',
              signIn:'2019-3-29 08:58',
              signOut:'2019-3-29 18:10',
              outCard:''
            },
            {
              date: '2019-3-29',
              signIn:'2019-3-29 08:58',
              signOut:'2019-3-29 18:10',
              outCard:''
            },
            {
              date: '2019-3-29',
              signIn:'2019-3-29 08:58',
              signOut:'2019-3-29 18:10',
              outCard:''
            },
            {
              date: '2019-3-29',
              signIn:'2019-3-29 08:58',
              signOut:'2019-3-29 18:10',
              outCard:''
            },
            {
              date: '2019-3-29',
              signIn:'2019-3-29 08:58',
              signOut:'2019-3-29 18:10',
              outCard:''
            },
            {
              date: '2019-3-29',
              signIn:'2019-3-29 08:58',
              signOut:'2019-3-29 18:10',
              outCard:''
            },
            ]
        }
    },
    methods:{
        //需向后端发送请求查询具体月份的考勤情况
        searchMonth(){

        }
    }
}
</script>

<style>
     .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
