<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 搜索功能 begin -->
      <el-select v-model="listQuery.seq" placeholder="置顶状态" class="filter-item">
        <el-option
          v-for="item in [{value: null, label: '全部'},{value: 0, label: '未置顶'}, {value: 1, label: '已置顶'}]"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-input v-model="listQuery.positionName" placeholder="职位标题" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.companyName" placeholder="公司名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-date-picker v-model="listQuery.startTime" type="datetime" class="filter-item" placeholder="发布开始时间" value-format="yyyy-MM-dd HH:mm:ss" />
      <el-date-picker v-model="listQuery.endTime" type="datetime" class="filter-item" placeholder="发布结束时间" value-format="yyyy-MM-dd HH:mm:ss" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <!-- 搜索功能 end -->
      <el-button class="filter-item" type="primary" @click="handleAddOrEdit(false)">新增</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="职位标题" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.positionName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.companyName }}
        </template>
      </el-table-column>
      <el-table-column label="联系方式" align="center">
        <template slot-scope="scope">
          {{ scope.row.contactMobile }}
        </template>
      </el-table-column>
      <el-table-column label="发布时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.gmtCreate }}
        </template>
      </el-table-column>
      <el-table-column label="置顶状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.seq === 1 ? '已置顶' : '未置顶' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleAddOrEdit(scope.row)"> 修改 </el-button>
          <el-button type="primary" size="mini" @click="handleSetTop(scope.row)"> {{ scope.row.seq === 1 ? '取消置顶' : '置顶' }} </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页功能 begin -->
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.current" :page-sizes="[10,20,30, 50]" :page-size="listQuery.size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <!-- 分页功能 end -->

  </div>
</template>

<script>
import { getPosition, setPositionTop, deletePosition } from '../../api/recruitment'

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
      total: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getPosition(this.listQuery).then(response => {
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
    handleAddOrEdit(row) {
      if (row) {
        this.$router.push('/recruitment/positionDetail?id=' + row.id)
      } else {
        this.$router.push('/recruitment/positionDetail')
      }
    },
    handleSetTop(row) {
      setPositionTop({ id: row.id, seq: row.seq === 1 ? 0 : 1 }).then(res => {
        this.$message({ message: '修改成功', type: 'success' })
        this.getList()
      })
    },
    handleDelete(row) {
      deletePosition(row.id).then(res => {
        this.$message({ message: '删除成功', type: 'success' })
        this.getList()
      })
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
