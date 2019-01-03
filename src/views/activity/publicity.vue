<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 搜索功能 begin -->
      <el-input v-model="listQuery.title" placeholder="活动名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.types" placeholder="投放状态" class="filter-item">
        <el-option
          v-for="item in [{value: null, label: '全部'},{value: 0, label: '未开始'}, {value: 1, label: '进行中'}, {value: 2, label: '已结束'}]"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-date-picker v-model="listQuery.beginTime" type="datetime" placeholder="开始时间" value-format="yyyy-MM-dd HH:mm:ss" class="filter-item"/>
      <el-date-picker v-model="listQuery.endTime" type="datetime" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss" class="filter-item"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <!-- 搜索功能 end -->
      <el-button class="filter-item" type="primary" @click="handleDialogForAdd">新建活动</el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row @sort-change="handleSort">
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="活动名称" width="150" prop="age" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="活动简介" align="center" prop="mobile" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.summary }}
        </template>
      </el-table-column>
      <el-table-column label="投放状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.types === 0">未开始</el-tag>
          <el-tag v-else-if="scope.row.types === 1" type="success">进行中</el-tag>
          <el-tag v-else type="danger">已结束</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="投放开始时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.beginTime }}
        </template>
      </el-table-column>
      <el-table-column label="投放结束时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.endTime }}
        </template>
      </el-table-column>
      <el-table-column label="显示状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.enable">有效</el-tag>
          <el-tag v-else type="danger">无效</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.enable" size="mini" @click="handleSetEnable(scope.row)"> 设置为无效 </el-button>
          <el-button v-else size="mini" type="primary" plain @click="handleSetEnable(scope.row)"> 设置为有效 </el-button>
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)"> 修改 </el-button>
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
import { getHostActivity, removeHostActivity, addOrEditHostActivity } from '../../api/activity'
import { successMsg } from '../../utils'
import UploadImg from '../../components/UploadImg'

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
        size: 20,
        mobile: undefined,
        name: undefined
      },
      listLoading: true,
      total: null,
      addTemp: {},
      dialogFormVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getHostActivity(this.listQuery).then(response => {
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
    handleDialogForAdd() {
      this.$router.push('/activity/publicityDetail')
    },
    // 修改页面
    handleEdit(row) {
      this.$router.push('/activity/publicityDetail?id=' + row.id)
    },
    // 删除此条数据
    handleDelete(row) {
      removeHostActivity(row.id).then(res => {
        successMsg('删除成功')
        this.getList()
      })
    },
    // 此条数据显示状态
    handleSetEnable(row) {
      const data = JSON.parse(JSON.stringify(row))
      data.enable = !data.enable
      addOrEditHostActivity(data).then(() => {
        successMsg('设置状态成功')
        this.getList()
      })
    },
    // 排序
    handleSort({ column, prop, order }) {
      console.log(column, prop, order)
      // TODO: 和后台商量怎么把排序的参数传给后台。
    },
    // 新增弹出框确定按钮
    handleConfirmForAddDia() {
      console.log(this.addTemp)
      // :TODO: 新增消息接口
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
