
<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 搜索功能 begin -->
      <el-select v-model="listQuery.status" placeholder="状态" class="filter-item">
        <el-option
          v-for="item in [{value: null, label: '全部'},{value: 0, label: '待审核'}, {value: 1, label: '不通过'}, {value: 2, label: '已通过'}]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="会员类型" class="filter-item">
        <el-option
          v-for="item in [{value: null, label: '全部'},{value: 1, label: '学生会员'}, {value: 2, label: '推广合伙人'}]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-model="listQuery.nickName"
        placeholder="昵称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-date-picker
        v-model="listQuery.formTime"
        type="datetime"
        class="filter-item"
        placeholder="开始时间"
        value-format="yyyy-MM-dd HH:mm:ss"
      />
      <el-date-picker
        v-model="listQuery.toTime"
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
      <el-table-column label="昵称" align="center">
        <template slot-scope="scope">{{ scope.row.nickName }}</template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template
          slot-scope="scope"
        >{{ scope.row.gender == 1 ? '男' : scope.row.gender == 2 ? '女' : '未知' }}</template>
      </el-table-column>
      <el-table-column label="提交时间" align="center" width="300">
        <template slot-scope="scope">{{ scope.row.commitTime }}</template>
      </el-table-column>
      <el-table-column label="审核类型" align="center">
        <template slot-scope="scope">{{ scope.row.type == 1 ? '学生会员' : '推广合伙人' }}</template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template
          slot-scope="scope"
        >{{ scope.row.status == 1 ? '不通过' : scope.row.status == 2 ? '已通过' : '待审核' }}</template>
      </el-table-column>
      <el-table-column label="联系方式" align="center">
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
  </div>
</template>

<script>
import { getVipCheck } from '../../api/check'
import * as validate from '../../utils/validate'
export default {
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
    this.getList()
    this.setScreenList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getVipCheck(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = parseInt(response.data.total)
        this.listLoading = false
      })
    },
    // 搜索和分页 begin
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
      this.$store.commit('setSearchlistHy', this.listQuery)
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
    handleGoDetail(row) {
      this.$router.push(
        '/check/vipDetail?id=' + row.userId + '&type=' + row.type
      )
    },
    setScreenList() {
      if (validate.validatANo(this.$store.state.search.searchlistHy)) {
        this.listQuery = this.$store.state.search.searchlistHy
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.i-size {
  height: 100px;
}
</style>
