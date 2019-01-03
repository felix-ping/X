<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 搜索功能 begin -->
      <el-select v-model="listQuery.lable" placeholder="创业类型" class="filter-item">
        <el-option
          v-for="item in [{value: null, label: '全部'},{value: 14, label: '技术'}, {value: 15, label: '零售'}, {value: 16, label: '发明创造'}, {value: 17, label: '其他'}]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-model="listQuery.name"
        placeholder="昵称"
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
      <el-table-column label="创业类型" align="center">
        <template slot-scope="scope">{{ scope.row.label }}</template>
      </el-table-column>
      <el-table-column label="昵称" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="提交时间" align="center">
        <template slot-scope="scope">{{ scope.row.gmtCreate }}</template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">{{ scope.row.gender }}</template>
      </el-table-column>
      <el-table-column label="学校" align="center">
        <template slot-scope="scope">{{ scope.row.school }}</template>
      </el-table-column>
      <el-table-column label="年龄" align="center">
        <template slot-scope="scope">{{ scope.row.age }}</template>
      </el-table-column>
      <el-table-column label="联系方式" align="center">
        <template slot-scope="scope">{{ scope.row.telephone }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleGoDetail(scope.row)">查看详情</el-button>
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
import { getIdea, deleteIdea } from '../../api/check'
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
    this.setScreenList()
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getIdea(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = parseInt(response.data.total)
        this.listLoading = false
      })
    },
    // 搜索和分页 begin
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
      this.$store.commit('setSearchlistIdea', this.listQuery)
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
      this.$router.push('/check/ideaDetail?id=' + row.id)
    },
    handleDelete(row) {
      const funDelete = () =>
        deleteIdea(row.id).then(res => {
          this.$message({ message: '删除成功', type: 'success' })
          this.getList()
        })
      this.$confirm('确认删除？').then(_ => {
        funDelete()
      })
    },
    setScreenList() {
      if (validate.validatANo(this.$store.state.search.searchlistIdea)) {
        this.listQuery = this.$store.state.search.searchlistIdea
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
