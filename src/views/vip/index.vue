<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 搜索功能 begin -->
      <el-input
        v-model="listQuery.nickName"
        placeholder="昵称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select v-model="listQuery.roleType" placeholder="会员类型" class="filter-item">
        <el-option
          v-for="item in [{value: null, label: '全部'},{value: 0, label: '普通会员'}, {value: 1, label: '学生会员'}, {value: 2, label: '推广合伙人'}]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="listQuery.status" placeholder="会员状态" class="filter-item">
        <el-option
          v-for="item in [{value: null, label: '全部'},{value: 0, label: '待审核'}, {value: 1, label: '未通过'}, {value: 2, label: '已通过'}]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="listQuery.operate" placeholder="是否为运营号" class="filter-item">
        <el-option
          v-for="item in [{value: null, label: '全部'},{value: 0, label: '否'}, {value: 1, label: '是'}]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <!-- 搜索功能 end -->
      <el-button class="filter-item" type="primary" @click="handleAddVirtualVip">新增运营号</el-button>
      <el-button class="filter-item" type="primary" @click="handleLeadingIn">导入</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" label="全选" width="95"></el-table-column>
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.gender === 1 ? '男' : scope.row.gender === 2 ? '女' : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center">
        <template slot-scope="scope">{{ scope.row.nickName }}</template>
      </el-table-column>
      <el-table-column label="地区" align="center">
        <template slot-scope="scope">{{ scope.row.cityName }}</template>
      </el-table-column>
      <el-table-column label="审核状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" type="success">待审核</el-tag>
          <el-tag v-else-if="scope.row.status === 1" type="danger">未通过</el-tag>
          <el-tag v-else-if="scope.row.status === 2" type="info">已通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="会员类型" align="center">
        <template
          slot-scope="scope"
        >{{ scope.row.role === 0 ? '普通会员' : scope.row.role === 1 ? '学生会员' : '推广合伙人' }}</template>
      </el-table-column>
      <el-table-column label="电话号码" align="center">
        <template slot-scope="scope">{{ scope.row.mobile }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleGoDetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 begin -->
    <div class="pagination-container">
      <el-pagination
        v-show="total>0"
        :current-page="listQuery.current"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.size"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 分页功能 end -->
    <el-dialog :visible.sync="dialogFormVisible" title="会员规则">
      <el-form
        ref="dataForm"
        :model="vipRule"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <div class="dialog-title">普通会员</div>
        <el-form-item label="享受折扣" prop="student.discount">
          <el-input v-model="vipRule.common.discount"/>
        </el-form-item>
        <el-form-item label="积分返还" prop="student.return">
          <el-input v-model="vipRule.common.return"/>
        </el-form-item>
        <div class="dialog-title">学生会员</div>
        <el-form-item label="享受折扣" prop="student.discount">
          <el-input v-model="vipRule.student.discount"/>
        </el-form-item>
        <el-form-item label="积分返还" prop="student.return">
          <el-input v-model="vipRule.student.return"/>
        </el-form-item>
        <div class="dialog-title">推广合伙人</div>
        <el-form-item label="享受折扣" prop="spreader.discount">
          <el-input v-model="vipRule.spreader.discount"/>
        </el-form-item>
        <el-form-item label="积分返还" prop="spreader.return">
          <el-input v-model="vipRule.spreader.return"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEditRule">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getVip } from '../../api/vip'
export default {
  data() {
    return {
      list: null,
      checkedList: [],
      // 搜索
      listQuery: {
        current: 1,
        size: 20,
        mobile: undefined,
        name: undefined
      },
      listLoading: true,
      vipRule: {
        student: {},
        common: {},
        spreader: {}
      },
      total: null,
      dialogFormVisible: false
    }
  },
  created() {
    this.getList()
  },
  activated() {},
  methods: {
    getList() {
      this.listLoading = true
      getVip(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = parseInt(response.data.total)
        this.listLoading = false
      })
    },
    // 搜索和分页 begin
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.current = val
      this.getList()
    },
    // 搜索和分页 end
    handleEditRule() {
      console.log(this.vipRule)
      // post 修改结果发送给后台
    },
    handleGoDetail(row) {
      this.$router.push('/vip/detial?id=' + row.userId)
    },
    handleAddVirtualVip() {
      this.$router.push('/vip/addVirtualVip')
    },
    handleSelectionChange(val) {
      //select 选择框
    },
    handleLeadingIn() {
      //导入功能
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.dialog-title {
  font-size: 17px;
  font-weight: 600;
  margin-left: -20px;
  margin-bottom: 20px;
}
</style>
