<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 搜索功能 begin -->
      <el-input v-model="listQuery.name" placeholder="消息名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.mobile" placeholder="发送者" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-date-picker v-model="listQuery.time" type="datetime" class="filter-item" placeholder="时间" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <!-- 搜索功能 end -->
      <el-button class="filter-item" type="primary" @click="handleDialogForAdd">新建</el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row @sort-change="handleSort">
      <el-table-column align="center" label="序号" width="95" prop="age" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.age }}
        </template>
      </el-table-column>
      <el-table-column label="消息名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发送者" align="center">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column label="时间" align="center" prop="mobile" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column label="内容" align="center">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页功能 begin -->
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.current" :page-sizes="[10,20,30, 50]" :page-size="listQuery.size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <!-- 分页功能 end -->

    <!-- 新增弹窗框 begin -->
    <el-dialog :visible.sync="dialogFormVisible" title="新增">
      <el-form ref="dataForm" :model="addTemp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="发送人">
          <el-input v-model="addTemp.name"/>
        </el-form-item>
        <el-form-item label="消息名称">
          <el-input v-model="addTemp.mobile"/>
        </el-form-item>
        <el-form-item label="接受人">
          <el-input v-model="addTemp.mobile"/>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="addTemp.desc" type="textarea"/>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmForAddDia">确定</el-button>
      </div>
    </el-dialog>
    <!-- 新增弹窗框 end -->

  </div>
</template>

<script>
import { fetchList } from '@/api/vip'

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
      fetchList(this.listQuery).then(response => {
        this.list = response.data.vips
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
      this.addTemp = {}
      this.dialogFormVisible = true
    },
    // 排序
    handleSort({ column, prop, order }) {
      console.log(column, prop, order)
      // TODO: 和后台商量怎么把排序的参数传给后台。
    },
    // 新增弹窗框 上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
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
