<template>
    <el-card>
        <my-bread level1="客户管理" level2="客户维护"></my-bread>
        <el-form id="first_form" v-model="form">
            <el-form-item label="选择员工" prop="staffList" style="margin-top:20px;display:inline-block;" id="staff">
                <el-select v-model="form.staffList" placeholder="请选择你要查看的员工">
                  <el-option label="张三" value="shanghai"></el-option>
                  <el-option label="李四" value="beijing"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-table
            ref="multipleTable"
            :data="tableData3"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="name"
              label="客户名字">
            </el-table-column>
            <el-table-column
              prop="person"
              label="跟进人员">
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <!-- <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button> -->
          <el-button @click="toggleSelection()">取消选择</el-button>
          <el-button type="info" @click="handleSearch">更改跟进人员</el-button>
        </div>
        <!-- 弹出一个对话框，显示要更换跟进人员的列表 -->
        <el-dialog
          title="更改跟进人员名单"
          :visible.sync="dialogVisibleClientInfo"
          size="tiny">
                <el-radio-group v-model="value">
                  <el-radio v-for="v in clientInfo" :key="v" :label="v"></el-radio>
                </el-radio-group>
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
            value:'',
            clientInfo:['张三','李四','王五','马六'],
            dialogVisibleClientInfo:false,
            form:{
                staffList:[],
            },
            tableData3: [{
              person: '张三',
              name: '王小虎',
            }, {
              person: '李四',
              name: '王二虎',
            }, {
              person: '王五',
              name: '王三虎',
            }, {
              person: '马六',
              name: '王四虎',
            }, {
              person: '张三',
              name: '王五虎',
            }, {
              person: '张三',
              name: '王六虎',
            }, {
              person: '张三',
              name: '王七虎',
            }],
            multipleSelection: []
        }
    },
    methods: {
        handleSearch(){
            this.dialogVisibleClientInfo = true
        },
        toggleSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        }
    }
}
</script>

<style>

</style>
