<template>
    <el-card>
        <my-bread level1="客户管理" level2="客户跟进"></my-bread>
        <el-button type="info" @click="addClientFollow_up" style="position:relative;bottom:80px;">跟进详情汇报</el-button>
        <div class="boxtwo">
            <div class="day">
                <span class="num">6</span><span>次</span>
                <p>今日跟进次数</p>
            </div>
            <div class="month">
                <span class="num">59</span><span>次</span>
                <p>本月跟进次数</p>
            </div>
        </div>
        <!-- 全部员工的跟进客户列表 -->
         <el-table
            :data="tableData"
            stripe
            style="width: 100%;margin-top:40px">
            <el-table-column
              prop="name"
              label="客户名称">
            </el-table-column>
            <el-table-column
              prop="tel"
              label="手机号">
            </el-table-column>
            <el-table-column
              prop="date"
              label="跟进日期">
            </el-table-column>
            <el-table-column
              prop="person"
              label="跟进人员">
            </el-table-column>
            <el-table-column
              prop="title">
              <template slot-scope="list">
                <el-button
                size="small"
                type="warning"
                @click="handleSearch(list.row)">查看跟进详情</el-button>
              </template>
            </el-table-column>
        </el-table>
        <!-- 弹出对话框显示跟进详情 -->
        <el-dialog
          title="跟进详情"
          :visible.sync="dialogVisibleClientInfo"
          size="tiny">
          <el-form  v-model="clientInfo">
            <el-form-item label="客户名称">
              <el-input v-model="clientInfo.name" readonly></el-input>
            </el-form-item>
            <el-form-item label="客户地址">
              <el-input v-model="clientInfo.address" readonly></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="clientInfo.tel" readonly></el-input>
            </el-form-item>
            <el-form-item label="跟进日期" class="follow_date">
              <el-input v-model="clientInfo.date" readonly></el-input>
            </el-form-item>
            <el-form-item label="跟进方式">
              <el-input v-model="clientInfo.type" readonly></el-input>
            </el-form-item>
            <el-form-item label="跟进结果">
              <el-input v-model="clientInfo.result" readonly></el-input>
            </el-form-item>
            <el-form-item label="预约时间" class="follow_time">
                <el-input v-model="clientInfo.time" readonly></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleClientInfo = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleClientInfo = false">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 弹出对话框显示跟进汇报表单 -->
        <el-dialog
          title="跟进详情"
          :visible.sync="dialogVisibleClientInfoAdd"
          size="tiny">
          <el-form  v-model="addClientInfo">
            <el-form-item label="客户名称">
              <el-input v-model="addClientInfo.name" readonly></el-input>
            </el-form-item>
            <el-form-item label="客户地址">
              <el-input v-model="addClientInfo.address" readonly></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="addClientInfo.tel" readonly></el-input>
            </el-form-item>
            <el-form-item label="跟进日期" class="follow_date">
              <el-input v-model="addClientInfo.date" readonly></el-input>
            </el-form-item>
            <el-form-item label="跟进方式">
              <el-input v-model="addClientInfo.type" readonly></el-input>
            </el-form-item>
            <el-form-item label="跟进结果">
              <el-input v-model="addClientInfo.result" readonly></el-input>
            </el-form-item>
            <el-form-item label="预约时间" class="follow_time">
                <el-input v-model="addClientInfo.time" readonly></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleClientInfoAdd = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleClientInfoAdd = false">提交</el-button>
          </span>
        </el-dialog>
    </el-card>
</template>

<script>
export default {
    data(){
        return{
            addClientInfo:{
                name:'',
                address:'',
                tel:'',
                date:'',
                type:'',
                result:'',
                time:''
            },
            dialogVisibleClientInfoAdd:false,
            clientInfo:{
                name:'众要机械技术有限公司',
                address:'绿地起航国际9号楼',
                tel:18539228888,
                date:'2019-4-2',
                type:'到公司访问',
                result:'客户暂时处在观望中，下次继续跟进',
                time:'2019-4-2 15:36'
            },
            dialogVisibleClientInfo:false,
            form:{
                staffList:[],
                searchMonth:'',
            },
            tableData: [{
              date: '2016-05-02',
              name: '王小虎',
              tel:18539226666,
              person:'张三'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              tel:18539226666,
              person:'张三'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              tel:18539226666,
              person:'张三'
            }, {
              date: '2016-05-03',
              name: '王小虎',
              tel:18539226666,
              person:'张三'
            }]
        }
    },
    methods:{
        //显示增加跟进汇报的表单
        addClientFollow_up(){
            this.dialogVisibleClientInfoAdd = true
        },
        handleSearch(){
            this.dialogVisibleClientInfo = true
        }
    }
}
</script>

<style>
.follow_date .el-form-item__label{
    float:none
}
.follow_time .el-form-item__label{
    float:none
}
.num{
    margin-top:20px;
    display: inline-block;
    font-size:48px;
}
.month{
    color:white;
    text-align:center;
    float:right;
    width:200px;
    height:150px;
    background-color: rgba(245,139,139,1);
    border-radius: 8px
}
.day{
    color:white;
    text-align:center;
    float:left;
    width:200px;
    height:150px;
    background-color: rgba(126,182,234,1);
     border-radius: 8px
}
.boxtwo{
    position: relative;
    top:40px;
    margin-top:-20px;
    margin-left:180px;
    width: 800px;
    height: 150px;
    display: inline-block;
}
#staff .el-form-item__content{
    float:right
}
#month .el-form-item__content{
    float:right
}
#first_form{
    display: inline-block;
    width:22%;
}
</style>
