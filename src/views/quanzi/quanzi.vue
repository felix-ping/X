<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 搜索功能 begin -->
      <el-input v-model="listQuery.name" placeholder="圈子名字" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.type" placeholder="状态" class="filter-item">
        <el-option
          v-for="item in [{label: '全部', value: null},{label: '校园圈', value: 19},{label: '文娱圈', value: 20}]"
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
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="圈子名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="圈子类别">
        <template slot-scope="scope">
          {{ scope.row.typeToolDictId == 19 ? '校园圈' : '文娱圈' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.gmtCreate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序">
        <template slot-scope="scope">
          {{ scope.row.seq }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleGoQuanziUser(scope.row)"> 人员管理 </el-button>
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

    <!--修改和新增弹出框 begin-->
    <el-dialog :visible.sync="dialogFormVisible" :title="addOrEditTemp.id ? '修改' : '新增'">
      <el-form ref="dataForm" :model="addOrEditTemp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="圈子名称">
          <el-input v-model="addOrEditTemp.name"/>
        </el-form-item>
        <el-form-item label="圈子类别">
          <el-select v-model="addOrEditTemp.type" placeholder="状态" class="filter-item">
            <el-option
              v-for="item in [{label: '校园圈', value: 19},{label: '文娱圈', value: 20}]"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="圈子排序">
          <el-input v-model.number="addOrEditTemp.seq" type="number"/>
        </el-form-item>
        <el-form-item label="圈子头像">
          <v-upload-img :default-img="addOrEditTemp.circleUrl" :type="4" @uploadImgSuccess="img => addOrEditTemp.circleUrl = img"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handlePostRow">确定</el-button>
      </div>
    </el-dialog>
    <!--修改和新增弹出框 end-->

  </div>
</template>

<script>
import { getQuanzi, deleteQuanzi, addOrEditQuanzi } from '../../api/quanzi'
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
        size: 20
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
      getQuanzi(this.listQuery).then(response => {
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
      const funDelete = () => deleteQuanzi(row.id).then(res => {
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
        this.addOrEditTemp.id = row.id
        this.addOrEditTemp.name = row.name
        this.addOrEditTemp.typeToolDictId = row.type
        this.addOrEditTemp.coverUrl = row.circleUrl
      }
    },
    handlePostRow() {
      addOrEditQuanzi(this.addOrEditTemp).then(res => {
        this.getList()
        this.dialogFormVisible = false
        this.$message({
          message: this.addOrEditTemp.id ? '修改成功' : '添加成功',
          type: 'success'
        })
      })
    },
    handleGoQuanziUser(row) {
      this.$router.push('/quanzi/quanziUser?id=' + row.id)
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
