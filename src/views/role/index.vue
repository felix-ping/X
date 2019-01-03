<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 搜索功能 begin -->
      <el-input v-model="listQuery.name" placeholder="角色名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
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
      <el-table-column align="center" label="角色名称" width="95">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag type="published">可用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
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

    <el-dialog :visible.sync="dialogFormVisible" title="新增&修改">
      <el-form ref="dataForm" :model="addOrEditTemp" label-position="left" label-width="80px" style="width: 450px; margin-left:50px;">
        <el-form-item label="角色名">
          <el-input v-model="addOrEditTemp.name"/>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addOrEditTemp.mobile"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="addOrEditTemp.age" placeholder="请选择">
            <el-option
              v-for="item in [{label: '启用', value: 1 }, { label: '禁用', value: 2 }]"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>

        <el-form-item label="会员">
          <v-checkbox :options="['增加', '修改', '删除', '查询']"/>
        </el-form-item>

        <el-form-item label="积分">
          <v-checkbox :options="['增加', '修改', '删除', '查询']"/>
        </el-form-item>

        <el-form-item label="会员">
          <v-checkbox :options="['增加', '修改', '删除', '查询']"/>
        </el-form-item>

        <el-form-item label="会员">
          <v-checkbox :options="['增加', '修改', '删除', '查询']"/>
        </el-form-item>

        <el-form-item label="会员">
          <v-checkbox :options="['增加', '修改', '删除', '查询']"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handlePostRow">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, fetchRule } from '@/api/vip'
import CheckBoxForRole from '@/components/CheckBoxForRole'

export default {
  components: {
    'v-checkbox': CheckBoxForRole
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
    handleDelete(row) {
      // 删除接口
      console.log(row.id)
    },
    handleAddOrEdit(isAdd, row) {
      this.addOrEditTemp = isAdd ? {} : row
      this.dialogFormVisible = true
    },
    handlePostRow() {
      // add or edit 数据发送后台
      console.log(this.addOrEditTemp)
      this.dialogFormVisible = false
    }
  }
}
</script>

