<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="用户昵称"
        clearable
        class="filter-item el-form-default-width"
      />
      <el-select
        v-model="listQuery.enable"
        placeholder="提现状态"
        clearable
        class="filter-item el-form-default-width"
      >
        <el-option
          v-for="(item, index) in [{label: '待审核', value: 0},{label: '审核未通过', value: 1},{label: '审核通过', value: 2}]"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="clickSearch">搜索</el-button>
    </div>
    <div class="filter-container right">
      <!-- <el-button type="primary" icon="el-icon-arrow-right" @click="clickClassification">商品分类</el-button> -->
      <!-- <el-button type="primary" icon="el-icon-plus" @click="addIfication">添加商品</el-button> -->
    </div>
    <el-table
      v-loading="listLoading"
      :data="table"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="单号">
        <template slot-scope="scope">{{ scope.row.endTime }}</template>
      </el-table-column>
      <el-table-column align="center" label="金币">
        <template slot-scope="scope">{{ scope.row.price }}</template>
      </el-table-column>
      <el-table-column align="center" label="提现">
        <template slot-scope="scope">{{ scope.row.seq }}</template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">{{ scope.row.seq }}</template>
      </el-table-column>
      <el-table-column align="center" label="提现时间">
        <template slot-scope="scope">{{ scope.row.seq }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="mini" @click="clickWatch(scope.row)">详情</el-button> -->
          <el-button type="primary" size="mini" @click="clickDelete(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        v-show="page.total>0"
        :current-page="listQuery.current"
        :total="page.total"
        :page-size="listQuery.size"
        :page-sizes="page.sizes"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="changePageSize"
        @current-change="clickPageCurrent"
      />
    </div>
  </div>
</template>
<script>
import { getGoods } from '../../api/secKill'
export default {
  name: 'RepastProductsTable',
  data() {
    return {
      form: {
        type: '',
        typeList: [],
        number: '',
        status: '',
        statusList: [],
        name: '',
        rules: [],
        time: null
      },
      table: [],
      listQuery: {
        current: 1,
        size: 20,
        name: null,
        enable: null
      },
      listLoading: {
        table: false
      },
      page: {
        total: 0,
        sizes: [10, 20, 30, 50]
      }
    }
  },
  created() {
    // this.getFristList()
    this.getList()
  },
  mounted() {},
  methods: {
    // clickClassification() {
    //   this.$router.push('/commodity/drinkclass')
    // },
    getList() {
      this.listLoading = true
      getGoods(this.listQuery).then(response => {
        this.table = response.data.records
        this.page.total = parseInt(response.data.total)
        this.listLoading = false
      })
    },
    getFristList() {
      sysOrderingGoodsCategoryFirstList().then(response => {
        this.form.typeList = response.data
      })
    },
    /**
     * 商品上架
     */
    clickPutaway() {},

    clickWatch(data) {
      this.$router.push({
        path: '/check/wishAuditDetail',
        query: { id: data.id }
      })
      // ?id:' + data.id
    },
    clickDelete(row) {
      if (row.enable == 0) {
        const funDelete = () =>
          deleteGoods(row.id).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getList()
          })
        this.$confirm('确认删除？').then(_ => {
          funDelete()
        })
      } else {
        this.$confirm('商品上架状态不可删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success',
          center: true
        }).then(() => {})
      }
    },

    clickPageCurrent(val) {
      this.listQuery.current = val
      this.getList()
    },
    changePageSize(val) {
      this.listQuery.size = val
      this.getList()
    },
    clickSearch() {
      this.listQuery.current = 1
      this.getList()
    },
    addIfication() {
      this.$router.push({ name: 'EntranceAdd' })
    },
    handelClick(val) {
      // orderingGoodsSetEnable({
      //   id: val.id,
      //   enable: !val.enable
      // })
      //   .then(res => {
      //     // 上架下架
      //     this.$message({
      //       message: '商品状态成功',
      //       type: 'success'
      //     })
      //     this.getList()
      //   })
      //   .catch(res => {})
    }
  }
}
</script>

<style rel="stylesheet/scss" scoped lang="scss">
.filter-container {
  vertical-align: middle;
}
.el-form-default-width {
  width: 200px;
}
.right {
  text-align: right;
}
</style>

