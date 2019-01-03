<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 搜索功能 begin -->
      <!--<el-input v-model="listQuery.mobile" placeholder="标题" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>-->
      <!--<el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>-->
      <el-button class="filter-item" type="primary" @click="handleAddOrEdit(true)">新增</el-button>
      <!-- 搜索功能 end -->
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
      <el-table-column align="center" label="标题">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
      <el-table-column label="图片" align="center" width="150">
        <template slot-scope="scope">
          <img :src="scope.row.bannerUrl" style="width: 100px;" alt="">
        </template>
      </el-table-column>
      <el-table-column label="位置排序" align="center">
        <template slot-scope="scope">
          {{ scope.row.seq }}
        </template>
      </el-table-column>
      <el-table-column label="轮播上传时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.gmtCreate }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.enable">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleAddOrEdit(false, scope.row)"> 修改</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)"> 删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogFormVisible" :title="isAdd ? '新增' : '修改'">
      <el-form
        ref="dataForm"
        :model="addOrEditTemp"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;">
        <el-form-item label="标题">
          <el-input v-model="addOrEditTemp.remark" />
        </el-form-item>
        <el-form-item label="位置排序">
          <el-input v-model.number="addOrEditTemp.seq" type="number" />
        </el-form-item>
        <el-form-item label="有效时间">
          <el-date-picker
            v-model="addOrEditTemp.time"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"/>
        </el-form-item>
        <el-form-item label="广告地址">
          <el-input v-model="addOrEditTemp.url"/>
        </el-form-item>
        <el-form-item label="关联活动">
          <el-select v-model="addOrEditTemp.activityId" placeholder="请选择">
            <el-option
              v-for="item in [{label: '活动1', value: 1 }, { label: '活动2', value: 2 }]"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="addOrEditTemp.enable" :label="true">启动</el-radio>
          <el-radio v-model="addOrEditTemp.enable" :label="false">禁用</el-radio>
        </el-form-item>
        <el-form-item label="上传图片">
          <v-upload-img :type="0" :default-img="addOrEditTemp.bannerUrl" shape="oblong" @uploadImgSuccess="img => addOrEditTemp.bannerUrl = img"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handlePostRow">确定</el-button>
      </div>
    </el-dialog>

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
        @current-change="handleCurrentChange"/>
    </div>
    <!-- 分页功能 end -->

  </div>
</template>

<script>
import { getBanners, getBannerDetail, removeBanner, updateBanner, addBanner } from '../../api/config'
import { parseTime, successMsg } from '../../utils'
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
      isAdd: false,
      dialogFormVisible: false,
      addOrEditTemp: {}
    }
  },
  watch: {
    'addOrEditTemp.seq'(newVal, oldVal) {
      if (newVal > 10000) {
        this.$message({
          type: 'error',
          message: '排序字段太长了'
        })
        this.$set(this.addOrEditTemp, 'seq', 0)
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getBanners(this.listQuery).then(response => {
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
    handleAddOrEdit(isAdd, row) {
      this.isAdd = !!isAdd
      this.addOrEditTemp = {}
      if (!isAdd) {
        getBannerDetail(row.id).then((res) => {
          const data = res.data
          this.addOrEditTemp = data
          this.addOrEditTemp.time = [new Date(data.beginTime), new Date(data.endTime)]
        })
      }
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      removeBanner(row.id).then(res => {
        this.getList()
        successMsg('删除成功')
      })
    },
    // add or edit 数据发送后台
    handlePostRow() {
      const data = JSON.parse(JSON.stringify(this.addOrEditTemp))
      data.beginTime = parseTime(this.addOrEditTemp.time[0])
      data.endTime = parseTime(this.addOrEditTemp.time[1])
      delete data.activityTitle
      delete data.time
      if (!this.isAdd) {
        updateBanner(data).then(res => {
          this.getList()
          successMsg('修改成功')
        })
      } else {
        addBanner(data).then(res => {
          this.getList()
          successMsg('新增成功')
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

  .avatar {
    width: 350px;
    height: 178px;
    display: block;
  }
</style>
