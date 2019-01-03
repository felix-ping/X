<template>
  <div class="app-container">
    <div class="app-container-top">
      <h3>订单信息</h3>
      <div class="app-container-top-content">
        <el-form
          label-width="100px"
          :inline="true"
          style="width:85%;margin:0 auto;margin-top:10px;"
        >
          <el-form-item label="订单号:">
            <div class="contentRight"></div>
          </el-form-item>
          <el-form-item label="订单时间:">
            <div class="contentRight"></div>
          </el-form-item>
          <el-form-item label="订单状态:">
            <div class="contentRight"></div>
          </el-form-item>
          <el-form-item label="支付时间:">
            <div class="contentRight"></div>
          </el-form-item>
          <el-form-item label="预约时间:">
            <div class="contentRight"></div>
          </el-form-item>
          <el-form-item label="餐桌号:">
            <div class="contentRight"></div>
          </el-form-item>
        </el-form>
      </div>

      <h3>商品信息</h3>
      <div class="app-container-bottom-content">
        <el-table :data="table" element-loading-text="Loading" border fit highlight-current-row>
          <el-table-column align="center" label="订单编号">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column align="center" label="订单时间">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column align="center" label="订单状态">
            <template slot-scope="scope">{{ scope.row.endTime }}</template>
          </el-table-column>
          <el-table-column align="center" label="预约时间">
            <template slot-scope="scope">{{ scope.row.price }}</template>
          </el-table-column>
          <el-table-column align="center" label="订单金额">
            <template slot-scope="scope">{{ scope.row.seq }}</template>
          </el-table-column>
          <el-table-column align="center" label="优惠金额">
            <template slot-scope="scope">{{ scope.row.seq }}</template>
          </el-table-column>
          <el-table-column align="center" label="实付金额">
            <template slot-scope="scope">{{ scope.row.seq }}</template>
          </el-table-column>
          <el-table-column align="center" label="付款方式">
            <template slot-scope="scope">{{ scope.row.seq }}</template>
          </el-table-column>
        </el-table>
        <div class="contentBottum">
          <ul class="left" style="border-right:1px solid #000000">
            <li>
              <span class="titleLeft">订单金额:</span>
              <span>￥5555</span>
            </li>
            <li>
              <span>优惠金额:</span>
              <span>￥55</span>
            </li>
            <li>
              <span>金币抵扣:</span>
              <span>￥55</span>
            </li>
            <li>
              <span>银币抵扣:</span>
              <span>￥55</span>
            </li>
            <li>
              <span>会员折扣:</span>
              <span>￥55</span>
            </li>
          </ul>

          <ul class="left">
            <li>
              <span>实付金额:</span>
              <span>￥5555</span>
            </li>
            <li>
              <span>金币:</span>
              <span>￥55</span>
            </li>
            <li>
              <span>银币:</span>
              <span>￥55</span>
            </li>
            <li>
              <span>付款方式:</span>
              <span>￥55</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="footerButton">
        <el-button type="primary" @click="goClick()">确认接单</el-button>
        <el-button @click="goBack()">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      table: [],
      listLoading: {
        table: false
      },
      page: {
        total: 0,
        sizes: [10, 20, 30, 50]
      }
    }
  },
  created() {},

  methods: {
    getList() {
      this.listLoading = true
      getGoods(this.listQuery).then(response => {
        this.table = response.data.records
        this.page.total = parseInt(response.data.total)
        this.listLoading = false
      })
    },
    goBack() {
      this.$router.back()
    },
    goClick() {
      this.$confirm('确认接单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
        center: true
      }).then(() => {})
    }
  }
}
</script>
<style scoped lang="scss">
.app-container-top {
  width: 70%;

  margin: 0 auto;
}
.app-container-top-content {
  width: 100%;
  height: 200px;
  border: 1px solid #000000;
}
.app-container-top-content {
  width: 100%;
  border: 1px solid #000000;
}
.contentRight {
  width: 250px;
}
.app-container-bottom-content {
  width: 100%;
  border: 1px solid #000000;
  padding: 20px;
}
.left {
  float: left;
  padding: 0 20px;
}
.contentBottum {
  overflow: hidden;
  margin-left: 70%;
}
ul {
  min-width: 150px;
}
ul li {
  padding: 5px 0;
  list-style: none;
  color: #606266;
  font-weight: 600;
  font-size: 14px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.titleLeft {
  text-align: left;
}
.footerButton {
  width: 20%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  padding: 80px 0;
}
</style>


