<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 搜索功能 begin -->
      <el-select v-model="listQuery.status" placeholder="查看状态" class="filter-item">
        <el-option
          v-for="item in [{label: '全部', value: null},{label: '未查看', value: 0},{label: '已查看', value: 1}]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-model="listQuery.name"
        placeholder="企业名称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-date-picker
        v-model="listQuery.beginTime"
        type="datetime"
        class="filter-item"
        placeholder="开始时间"
        value-format="yyyy-MM-dd HH:mm:ss"
      />
      <el-date-picker
        v-model="listQuery.endTime"
        type="datetime"
        class="filter-item"
        placeholder="结束时间"
        value-format="yyyy-MM-dd HH:mm:ss"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <!-- 搜索功能 end -->
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" label="企业名称">
        <template slot-scope="scope">{{ scope.row.enterpriseName }}</template>
      </el-table-column>
      <el-table-column align="center" label="经营类型">
        <template slot-scope="scope">{{ scope.row.type }}</template>
      </el-table-column>
      <el-table-column align="center" label="法人代表">
        <template slot-scope="scope">{{ scope.row.legal }}</template>
      </el-table-column>
      <el-table-column align="center" label="注册号">
        <template slot-scope="scope">{{ scope.row.registNumber }}</template>
      </el-table-column>
      <el-table-column align="center" label="提交时间">
        <template slot-scope="scope">{{ scope.row.gmtCreate }}</template>
      </el-table-column>
      <el-table-column align="center" label="机构代码">
        <template slot-scope="scope">{{ scope.row.orgCode }}</template>
      </el-table-column>
      <el-table-column align="center" label="查看状态">
        <template slot-scope="scope">{{ scope.row.status === 0 ? '未查看' : '已查看' }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.row)">查看详情</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
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
  </div>
</template>

<script>
import { getSelllerJoin, deleteSelllerJoin } from '../../api/check'
import UploadImg from '../../components/UploadImg'
import * as validate from '../../utils/validate'
export default {
  components: {
    'v-upload-img': UploadImg
  },
  data() {
    return {
      list: null,
      // 搜索
      listQuery: {
        current: 1,
        size: 20
      },
      listLoading: true,
      total: null
    }
  },
  created() {
    this.setScreenList()
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getSelllerJoin(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = parseInt(response.data.total)
        this.listLoading = false
      })
    },
    // 搜索和分页 begin
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
      this.$store.commit('setSearchlistSc', this.listQuery)
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
      const funDelete = () =>
        deleteSelllerJoin(row.id).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getList()
        })
      this.$confirm('确认删除？').then(_ => {
        funDelete()
      })
    },
    handleDetail(row) {
      this.$router.push('/check/sellerJoinDetail?id=' + row.id)
    },
    setScreenList() {
      if (validate.validatANo(this.$store.state.search.searchlistSc)) {
        this.listQuery = this.$store.state.search.searchlistSc
      }
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
