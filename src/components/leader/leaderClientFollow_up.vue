<template>
    <el-card>
        <my-bread level1="客户管理" level2="客户跟进"></my-bread>
        <el-form id="first_form">
            <el-form-item label="选择员工" prop="staffList" style="margin-top:20px;display:inline-block;" id="staff">
                <el-select v-model="form.staffList" placeholder="请选择你要查看的员工">
                  <el-option label="张三" value="shanghai"></el-option>
                  <el-option label="李四" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择月份" prop="searchMonth" style="margin-top:20px;display:inline-block;" id="month">
                <el-date-picker
                    v-model="value"
                    type="month"
                    placeholder="请选择你要查看的月份">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div class="box">
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
            style="width: 100%">
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
            <el-form-item label="跟进日期">
              <el-input v-model="clientInfo.date" readonly></el-input>
            </el-form-item>
            <el-form-item label="跟进方式">
              <el-input v-model="clientInfo.type" readonly></el-input>
            </el-form-item>
            <el-form-item label="跟进结果">
              <el-input v-model="clientInfo.result" readonly></el-input>
            </el-form-item>
            <el-form-item label="预约时间">
              <el-input v-model="clientInfo.time" readonly></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleClientInfo = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleClientInfo = false">确 定</el-button>
          </span>
        </el-dialog>
    </el-card>
</template>

<script>
export default {
    data(){
        return{
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
            value:'',
            tableData: [{
              date: '2016-05-02',
              name: '王小虎',
              tel:18539226666,
              person:'张三'
            }, {
              date: '2016-05-04',
              name: '王二虎',
              tel:18539226666,
              person:'张三'
            }, {
              date: '2016-05-01',
              name: '王三虎',
              tel:18539226666,
              person:'张三'
            }, {
              date: '2016-05-03',
              name: '王四虎',
              tel:18539226666,
              person:'张三'
            }]
        }
    },
    methods:{
        handleSearch(){
            this.dialogVisibleClientInfo = true
        }
    }
}
</script>

<style>
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
.box{
    position: relative;
    top:-20px;
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
