<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 搜索功能 begin -->
      <el-input v-model="listQuery.name" placeholder="姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.systemRoleNameId" placeholder="用户角色" class="filter-item">
        <el-option
          v-for="item in [{label: '全部', value: null},{label: '管理员', value: 1},{label: '审核员', value: 2},{label: '店长', value: 3},{label: '店员', value: 4}]"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <!-- 搜索功能 end -->
      <el-button class="filter-item" type="primary" @click="handleAddOrEdit(true)">新增</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="账号">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="电话号码">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="所属角色" align="center">
        <template slot-scope="scope">
          {{ scope.row.systemRoleName }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleAddOrEdit(false, scope.row)"> 修改 </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页功能 begin -->
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.current" :page-sizes="[10,20,30, 50]" :page-size="listQuery.size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <!-- 分页功能 end -->

    <el-dialog :visible.sync="dialogFormVisible" title="新增&修改">
      <el-form ref="dataForm" :model="addOrEditTemp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="账号">
          <el-input v-model="addOrEditTemp.username"/>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="addOrEditTemp.name"/>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="addOrEditTemp.phone"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addOrEditTemp.password" type="password"/>
        </el-form-item>
        <el-form-item label="确定密码">
          <el-input v-model="addOrEditTemp.password2" type="password"/>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="addOrEditTemp.roleId" placeholder="请选择">
            <el-option
              v-for="item in [{label: '管理员', value: 1 }, { label: '审核员', value: 2 }, {label: '店长', value: 3}, {label: '店员', value: 4}]"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handlePostRow">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getAccount, editAccount, addAccount, getAccountDetail, deleteAccount } from '../../api/account'

export default {
  data() {
    return {
      list: null,
      // 搜索
      listQuery: {
        current: 1,
        size: 20,
        mobile: undefined,
        name: undefined
      },
      listLoading: true,
      total: null,
      addOrEditTemp: {},
      dialogFormVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getAccount(this.listQuery).then(response => {
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
    handleDelete(row) {
      const funDelete = () => deleteAccount(row.id).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getList()
      })
      this.$confirm('确认删除？')
        .then(_ => {
          funDelete()
        })
    },
    handleAddOrEdit(isAdd, row) {
      this.addOrEditTemp = {}
      this.dialogFormVisible = true
      if (!isAdd) {
        getAccountDetail(row.id).then(res => {
          res.data.roleId = res.data.systemRoleNameId
          this.addOrEditTemp = res.data
        })
      }
    },
    handlePostRow() {
      if (this.addOrEditTemp.password && (this.addOrEditTemp.password !== this.addOrEditTemp.password2)) {
        this.$message({
          message: '两次密码不一致',
          type: 'error'
        })
        return false
      }
      // add or edit 数据发送后台
      if (this.addOrEditTemp.id) {
        editAccount(this.addOrEditTemp).then(res => {
          this.getList()
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        })
      } else {
        addAccount(this.addOrEditTemp).then(res => {
          this.getList()
          this.$message({
            message: '新增成功',
            type: 'success'
          })
        })
      }
      this.dialogFormVisible = false
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
