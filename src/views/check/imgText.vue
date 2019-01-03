<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 搜索功能 begin -->
      <el-input
        v-model="listQuery.nickName"
        placeholder="用户昵称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select v-model="listQuery.status" placeholder="状态" class="filter-item">
        <el-option
          v-for="item in [{value: null, label: '全部'},{value: 0, label: '正常'}, {value: 1, label: '已删除'}]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="类型" class="filter-item">
        <el-option
          v-for="item in [{value: null, label: '全部'},{value: 0, label: '文字'},{value: 1, label: '图片'}, {value: 2, label: '视频'}]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <!-- 搜索功能 end -->
      <el-button class="filter-item" type="primary" @click="handleAdd">新增图文</el-button>
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
      <el-table-column label="发布内容" align="center">
        <template slot-scope="scope">
          <span class="warp-5">{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片视频" align="center">
        <template slot-scope="scope">
          <img
            v-if="scope.row.type === 1"
            :src="scope.row.urlList[0]"
            class="i-size"
            alt
            @click="handleBlow(scope.row.urlList[0])"
          >
          <video v-if="scope.row.type === 2" :src="scope.row.urlList[0]" controls class="i-size"/>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" type="success">正常</el-tag>
          <el-tag v-else-if="scope.row.status === 1" type="danger">已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" align="center">
        <template slot-scope="scope">{{ scope.row.gmtCreate }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" size="mini" @click="handleGoDetail(scope.row)">查看详情</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </div>
          <div>
            <el-button
              style="margin-top:15px; width:80px;"
              type="primary"
              size="mini"
              @click="handleStick(scope.row)"
            >置顶</el-button>
            <el-button type="danger" size="mini" @click="handleDefriend(scope.row)">拉黑</el-button>
          </div>
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
      <img :src="blowImg" style="display: block; margin: 0 auto;width: 800px" alt>
    </el-dialog>
  </div>
</template>

<script>
import { getImgText, deleteImgText } from '../../api/check'
import { successMsg } from '../../utils'
import * as validate from '../../utils/validate'
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
    this.setScreenList()
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getImgText(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = parseInt(response.data.total)
        this.listLoading = false
      })
    },
    // 搜索和分页 begin
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
      this.$store.commit('setSearchlistTw', this.listQuery)
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
      this.$router.push('/check/imgTextDetail?id=' + row.id)
    },
    handleBlow(img) {
      this.showPreImg = true
      this.blowImg = img
    },
    handleDelete(row) {
      const funDelete = () =>
        deleteImgText(row.id).then(res => {
          successMsg('删除成功')
          this.getList()
        })
      this.$confirm('确认删除？').then(_ => {
        funDelete()
      })
    },
    handleAdd() {
      this.$router.push('/check/addImgText')
    },
    setScreenList() {
      if (validate.validatANo(this.$store.state.search.searchlistTw)) {
        this.listQuery = this.$store.state.search.searchlistTw
      }
    },
    handleStick() {
      //置顶操作
    },
    handleDefriend() {
      //拉黑功能
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.i-size {
  height: 100px;
}
</style>
