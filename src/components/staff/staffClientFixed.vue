<template>
    <el-card>
        <my-bread level1="客户管理" level2="客户维护"></my-bread>
        <el-table
            :data="tableData"
            style="width: 100%;margin-top:20px">
            <el-table-column
              prop="name"   
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width="400">
            </el-table-column>
            <el-table-column
              prop="tel"
              label="联系方式">
            </el-table-column>
            <el-table-column
              prop="clientLevel"
              label="客户等级">
            </el-table-column>
            <el-table-column
              prop="fixedPerson"
              label="维护人员">
            </el-table-column>
            <el-table-column
              prop="title"
              width="120">
              <template slot-scope="list">
                <el-button
                size="small"
                type="info"
                @click="handleSearch(list.row)">查看维护记录</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="title"
              width="120">
              <template slot-scope="list">
                <el-button
                size="small"
                type="warning"
                @click="handleFixed(list.row)">维护</el-button>
              </template>
            </el-table-column>
        </el-table>
        <!-- 弹出对话框显示该客户的维护记录 -->
        <el-dialog
          class="fixedInfo"
          title="维护记录详情"
          :visible.sync="dialogVisibleClientFixedInfo"
          size="tiny">
          <el-table
            :data="ClientFixedInfo"
            style="width: 100%;margin-top:20px"
            >
            <el-table-column
                fixed
              prop="name"   
              label="客户名称"
              width="200"
              >
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width="300">
            </el-table-column>
            <el-table-column
              prop="tel"
              label="联系方式"
              width="200">
            </el-table-column>
            <el-table-column
              prop="clientLevel"
              label="客户等级"
              width="100">
            </el-table-column>
            <el-table-column
              prop="fixedPerson"
              label="维护人员"
              width="100">
            </el-table-column>
        </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleClientFixedInfo = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleClientFixedInfo = false">确定</el-button>
          </span>
        </el-dialog>
        <!-- 弹出对话框显示维护客户的表单 -->
        <el-dialog
          title="跟进详情"
          :visible.sync="dialogVisibleClientFixedUpdate"
          size="tiny">
          <el-form  v-model="ClientFixedUpdate">
            <el-form-item label="客户名称">
              <el-input v-model="ClientFixedUpdate.name" ></el-input>
            </el-form-item>
            <el-form-item label="客户地址">
              <el-input v-model="ClientFixedUpdate.address" ></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="ClientFixedUpdate.tel" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="ClientFixedUpdate.client_level" placeholder="请选择客户级别">
                    <el-option label="客户收集" value="shanghai"></el-option>
                    <el-option label="意向筛选" value="beijing"></el-option>
                    <el-option label="交定金" value="beijing"></el-option>
                    <el-option label="成交客户" value="beijing"></el-option>
                    <el-option label="合作中客户" value="beijing"></el-option>
                    <el-option label="流式" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="其他联系方式">
              <el-input v-model="ClientFixedUpdate.tel" ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleClientFixedUpdate = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleClientFixedUpdate = false">提交</el-button>
          </span>
        </el-dialog>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            ClientFixedUpdate:{
                name:'大农机械有限公司',
                address:'',
                tel:'',
                client_level:'',
                otherTel:''
            },
            dialogVisibleClientFixedUpdate:false,
            ClientFixedInfo:[{
                name:'大农机械有限公司',
                address:'上海市普陀区金沙江路 1518 弄',
                tel:'18539228888',
                clientLevel:'客户采集',
                fixedPerson:'张三'
            }],
            dialogVisibleClientFixedInfo:false,
            tableData: [{
              clientLevel:'客户采集',
              tel: '18539228888',
              name: '大农机械有限公司',
              address: '上海市普陀区金沙江路 1518 弄',
              fixedPerson:'张三'
            }, {
              clientLevel:'客户采集',
              tel: '18539228887',
              name: '小农机械有限公司',
              address: '上海市普陀区金沙江路 1517 弄',
              fixedPerson:'张三'
            }, {
              clientLevel:'客户采集',
              tel: '18539228886',
              name: '中农机械有限公司',
              address: '上海市普陀区金沙江路 1519 弄',
              fixedPerson:'张三'
            }, {
              clientLevel:'客户采集',
              tel: '18539228885',
              name: '富农机械有限公司',
              address: '上海市普陀区金沙江路 1516 弄',
              fixedPerson:'张三'
            }]
        }
    },
    methods:{
        handleFixed(){
            this.dialogVisibleClientFixedUpdate = true
        },
        handleSearch(){
            this.dialogVisibleClientFixedInfo = true
        }
    }
}
</script>

<style>

</style>
