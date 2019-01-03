<template>
  <div class="app-container">
    <div class="top">
      <h2>商品图片</h2>
      <hr>
      <div class="imgDetail" @click="imgClick">
        <img width="100%" height="100%" :src="data.coverUrl">
      </div>
      <h2>商品详情</h2>
      <hr>
    </div>
    <div class="centent">
      <div class="cententTop">
        <div class="left">
          <div class="leftTitlle">商品名称:</div>
          <div class="rightCenten">{{data.name}}</div>
        </div>
        <div class="left">
          <div class="leftTitlle">商品金额:</div>
          <div class="rightCenten">￥{{data.price}}</div>
        </div>
        <div class="left">
          <div class="leftTitlle">排序:</div>
          <div class="rightCenten">{{data.seq}}</div>
        </div>
        <div class="left">
          <div class="leftTitlle">类别:</div>
          <div class="rightCenten">{{data.categoryFirstName}}</div>
        </div>
        <div class="left">
          <div class="leftTitlle">商品状态:</div>
          <div class="rightCenten">
            <el-switch
              style="display: block;"
              v-model="data.enable"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="上架"
              inactive-text="下架"
              @change="changeSwich"
            ></el-switch>
          </div>
        </div>
        <div class="left">
          <div class="leftTitlle">商品编号:</div>
          <div class="rightCenten">{{data.number}}</div>
        </div>
        <div class="left">
          <div class="leftTitlle">标准配料:</div>
          <div class="rightCenten">
            <span v-for="item,index in data.standardList" :key="index">{{item.name}}</span>
          </div>
        </div>
        <div class="left">
          <div class="leftTitlle">可加规格:</div>
          <div
            style="width:100%;margin-left:5%;"
            class="rightCenten"
            v-for="item,index in data.optionalList"
            :key="index"
          >
            <aside>
              {{item.name}}:
              <span v-for="subItem,index in item.twoLibrary">{{subItem.name}}</span>
            </aside>
          </div>
          <br>
        </div>
        <div class="left">
          <div class="leftTitlle">可加配料:</div>
          <div class="rightCenten">
            <span v-for="item,index in data.canAddList" :key="index">{{item.name}}</span>
          </div>
        </div>
      </div>
      <div id="footer">
        <el-button @click="handlerback">返回</el-button>
        <el-button @click="handlereditor">编辑</el-button>
      </div>
    </div>
    <el-dialog title="图片" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <img width="100%" height="100%" :src="data.coverUrl">
    </el-dialog>
  </div>
</template>
<script>
import {
  orderingGoodsDetails,
  orderingGoodsSetEnable
} from '../../../api/commodity'
export default {
  data() {
    return {
      dialogVisible: false,
      id: this.$route.query.id,
      data: {
        coverUrl:
          'https://dxlfb468n8ekd.cloudfront.net/gsc/5QA73A/1e/5a/08/1e5a08e0b8e24c1b83c8e5cacb6ad90d/images/圈子动态详情/u2563.png?token=1f869de014252dc53741fe25b936adb2'
      }
    }
  },
  created() {
    orderingGoodsDetails(this.$route.query.id).then(res => {
      this.data = res.data
      this.data.enable == 1
        ? (this.data.enable = true)
        : (this.data.enable = false)
    })
  },

  methods: {
    handlerback() {
      this.$router.back()
    },
    handlereditor() {
      if (this.data.enable == true) {
        this.$confirm('商品状态上架不可编辑', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {})
        return false
      }
      this.$router.push({
        path: '/commodity/addProductIbrary',
        query: { id: this.id }
      })
    },
    imgClick() {
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    changeSwich(val) {
      orderingGoodsSetEnable({
        id: this.$route.query.id,
        enable: this.data.enable
      })
        .then(res => {
          // 上架下架
          this.$message({
            message: '商品状态成功',
            type: 'success'
          })
        })
        .catch(res => {
          this.data.enable = !val
        })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  width: 80%;
  margin: 0 auto;
}
span {
  padding: 0 5px;
  font-size: 17px !important;
  font-family: 'Courier New', Courier, monospace !important;
  font-weight: 400 !important;
  font-style: normal !important;
  color: #909399 !important;
  font-weight: 700 !important;
}
.cententTop {
  margin-left: 20%;
  margin-top: 50px;
}
.left > div {
  float: left;
}
.left {
  overflow: hidden;
  padding-top: 40px;
}
.leftTitlle {
  font-family: 'Courier New', Courier, monospace;
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  width: 80px;
  color: #909399;
}
.el-switch__label {
  font-size: 17px !important;
  font-family: 'Courier New', Courier, monospace !important;
  font-weight: 400 !important;
  font-style: normal !important;
  color: #909399 !important;
  font-weight: 700 !important;
}
.rightCenten {
  padding: 0 20px;
  font-size: 17px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 400;
  font-style: normal;
  color: #909399;
  font-weight: 700;
}
.imgDetail {
  margin-left: 100px;
  width: 100px;
  height: 100px;
}
#footer {
  padding: 50px;
  width: 50%;
  margin: 0 auto;
  text-align: center;
}
</style>


