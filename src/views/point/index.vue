<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" @click="handleAddOrEdit(true)">增加</el-button>
      <el-button class="filter-item" @click="handleEditPercent">设置现金积分比</el-button>
      <el-button class="filter-item" @click="handleEditRule">积分使用规则</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="积分所得方式" width="300">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="积分" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleAddOrEdit(false, scope.row)"> 修改 </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.current" :page-sizes="[10,20,30, 50]" :page-size="listQuery.size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :visible.sync="dialogFormVisible" title="新增&修改">
      <el-form ref="dataForm" :model="addOrEditTemp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="积分所得方式">
          <el-input v-model="addOrEditTemp.name"/>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="addOrEditTemp.mobile"/>
        </el-form-item>
        <el-form-item label="积分数">
          <el-input v-model="addOrEditTemp.mobile"/>
        </el-form-item>
        <el-form-item label="操作">
          <el-select v-model="addOrEditTemp.age" placeholder="请选择">
            <el-option
              v-for="item in [{label: '加', value: 1 }, { label: '减', value: 2 }]"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handlePostRow">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPercentVisible" title="设置比例">
      <el-form ref="dataForm" :model="percentTemp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="积分">
          <el-input v-model="percentTemp.point"/>
        </el-form-item>
        <el-form-item label="现金">
          <el-input v-model="percentTemp.money"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPercentVisible = false">取消</el-button>
        <el-button type="primary" @click="handlePostPercent">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="积分使用规则" :visible.sync="dialogRuleVisible">
      <el-form :inline="true" ref="dataForm" :model="ruleTemp" label-position="left" label-width="90px" style="margin-left: 50px">
        <div class="dialog-title">消费积分</div>
        <el-row class="m-b-20">
          <el-col :span="6" style="font-weight: 600;">使用角色:</el-col>
          <el-col :span="6">普通会员</el-col>
          <el-col :span="6">学生会员</el-col>
          <el-col :span="6">推广合伙人</el-col>
        </el-row>

        <el-row>
          <el-col :span="6" style="font-weight: 600">是否能提现:</el-col>
          <el-col :span="6" v-for="item in [1,2,3]" :key="item">
              <el-select v-model="addOrEditTemp.age" style="width: 100px; margin-left: -20px;">
                <el-option
                  v-for="item in [{ label: '是', value: 1 }, { label: '否', value: 2}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-col>
        </el-row>

        <div class="dialog-title">推广积分</div>
        <el-row class="m-b-20">
          <el-col :span="6" style="font-weight: 600;">使用角色:</el-col>
          <el-col :span="6">普通会员</el-col>
          <el-col :span="6">学生会员</el-col>
          <el-col :span="6">推广合伙人</el-col>
        </el-row>

        <el-row>
          <el-col :span="6" style="font-weight: 600">是否能提现:</el-col>
          <el-col :span="6" v-for="item in [1,2,3]" :key="item">
              <el-select v-model="addOrEditTemp.age" style="width: 100px; margin-left: -20px;">
                <el-option
                  v-for="item in [{ label: '是', value: 1 }, { label: '否', value: 2}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-col>
        </el-row>

        <div class="dialog-title">推广合伙人</div>
        <el-row class="m-b-20">
          <el-col :span="6" style="font-weight: 600;">使用角色:</el-col>
          <el-col :span="6">普通会员</el-col>
          <el-col :span="6">学生会员</el-col>
          <el-col :span="6">推广合伙人</el-col>
        </el-row>

        <el-row>
          <el-col :span="6" style="font-weight: 600">是否能提现:</el-col>
          <el-col :span="6" v-for="item in [1,2,3]" :key="item">
              <el-select v-model="addOrEditTemp.age" style="width: 100px; margin-left: -20px;">
                <el-option
                  v-for="item in [{ label: '是', value: 1 }, { label: '否', value: 2}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-col>
        </el-row>

     </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRuleVisible = false">取消</el-button>
        <el-button type="primary" @click="handlePostRule">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, fetchRule } from '@/api/vip'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      addOrEditTemp: {},
      percentTemp: {},
      ruleTemp: {
        shop: {},
        spread: {},
        give: {}
      },
      listQuery: {
        current: 1,
        size: 20,
      },
      total: null,
      dialogFormVisible: false,
      dialogPercentVisible: false,
      dialogRuleVisible: false
    }
  },
  created() {
    this.getList();
 },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.vips
        this.total = parseInt(response.data.total)
        this.listLoading = false
      })
	  },
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleAddOrEdit(isAdd, row) {
      this.addOrEditTemp = isAdd ? {}  : row;
      this.dialogFormVisible = true;
    },
    handlePostRow() {
      // add or edit 数据发送后台
      console.log(this.addOrEditTemp);
      this.dialogFormVisible = false;
    },
    handleDelete(row) {
      // 删除通过id
      console.log(row.id)
    },
    handlePostPercent() {
      // 修改比例
      console.log(this.percentTemp)
    },
    handleEditPercent() {
      // 获取之前的比例 mock
      this.percentTemp = {
        point: 100,
        money: 1
      }
      this.dialogPercentVisible = true;
    },
    handlePostRule(){
      // post发送修改后的积分规则
      console.log(this.ruleTemp);
      this.dialogRuleVisible = false;
    },
    handleEditRule() {
      // 获取之前的积分规则数据
      this.dialogRuleVisible = true;
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dialog-title {
  font-size: 17px;
  font-weight: 600;
  margin-top: 40px;
  margin-bottom: 20px;
}
.m-b-20 {
  margin-bottom: 20px;
}
</style>
