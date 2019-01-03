<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 搜索功能 begin -->
      <el-input
        v-model="listQuery.storeName"
        placeholder="店铺名称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <!-- 搜索功能 end -->
      <el-button class="filter-item" type="primary" @click="handleAdd()">新增</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="店铺名称" align="center" width="300">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="店铺地址" align="center" width="300">
        <template slot-scope="scope">{{ scope.row.address }}</template>
      </el-table-column>
      <el-table-column label="联系方式" align="center" width="300">
        <template slot-scope="scope">{{ scope.row.telephone }}</template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template
          slot-scope="scope"
        >{{ scope.row.status === 0 ? '未开业' : scope.row.status === 1 ? '营业中' : '暂停营业' }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleGoDetail(scope.row)">查看编辑</el-button>
          <el-button type="primary" size="mini" @click="handleGoGoodsList(scope.row)">商品管理</el-button>
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
    <el-dialog :visible.sync="showPreImg" title="图片" width="80%">
      <img :src="blowImg" style="display: block; margin: 0 auto" alt>
    </el-dialog>
  </div>
</template>

<script>
import { getStore } from '../../api/store'
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
      vipRule: {
        student: {},
        common: {},
        spreader: {}
      },
      total: null,
      dialogFormVisible: false,
      showPreImg: false,
      blowImg: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getStore(this.listQuery).then(response => {
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
    handleGoDetail(row) {
      this.$router.push('/store/storeDetail?id=' + row.id)
    },
    handleGoGoodsList(data) {
      this.$router.push({
        path: '/store/storeCenterList',
        query: { id: data.id }
      })
    },
    handleAdd() {
      this.$router.push('/store/storeDetail')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.i-size {
  height: 100px;
}
</style>
