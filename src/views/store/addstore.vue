<template>
  <div>
    <div class="app-container">
      <h3>商品信息</h3>
      <div class="centen">
        <el-form label-width="100px">
          <div class="title" v-for="item,index in showList" :key="item.id">
            <span>{{item.name}}</span>
            <el-form-item
              style="margin:0 0 0 60px;"
              v-for="subItem,subIndex in item.showList"
              :label="subItem.name"
              :key="subItem.id"
              lable-width="100px"
              :v-show="subIndex > 3"
            >
              <el-checkbox-group v-model="checked">
                <el-checkbox
                  v-for="city,cityIndex in subItem.goodsList"
                  :label="city.id"
                  :key="cityIndex"
                >{{ city.name }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-collapse-transition>
              <div v-show="item.visible">
                <el-form-item
                  style="margin:0 0 0 60px;"
                  v-for="subItem,subIndex in item.list"
                  :label="subItem.name"
                  :key="subItem.id"
                  lable-width="100px"
                >
                  <el-checkbox-group v-model="checked">
                    <el-checkbox
                      v-for="city,cityIndex in subItem.goodsList"
                      :label="city.id"
                      :key="cityIndex"
                    >{{ city.name }}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </el-collapse-transition>
            <el-button
              v-show="item.list.length>0"
              style="height:10px;line-height:2px;margin-left:200px;"
              @click="clickShow(item)"
            >{{item.buttonTitle}}</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <div class="foot">
      <div class="centerFooter">
        <el-button @click="handelBack">返回</el-button>
        <el-button @click="handelClick" type="primary">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  sysStoreOrderingGoodsGoodList,
  sysStoreOrderingGoodsSaveGoods
} from '../../api/store'
export default {
  data() {
    return {
      showList: [],
      checked: [],
      show: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      sysStoreOrderingGoodsGoodList().then(res => {
        res.data.forEach(ele => {
          ele.visible = false
          ele.buttonTitle = '展示更多'
          ele.showList = ele.list.splice(0, 4)
        })
        this.showList = res.data
      })
    },
    handelBack() {
      this.$router.back()
    },
    handelClick() {
      this.$confirm('是否确认提交', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
        center: true
      }).then(() => {
        sysStoreOrderingGoodsSaveGoods({
          storeId: this.$route.query.id,
          orderingGoodsIds: this.checked.join()
        }).then(res => {
          this.$message({ type: 'success', message: '新增修改成功' })
          this.$router.back()
        })
      })
    },
    clickShow(item) {
      item.visible = !item.visible
      if (item.visible) {
        item.buttonTitle = '收起'
      } else {
        item.buttonTitle = '展示更多'
      }
    }
  }
}
</script>
<style scoped lang="scss">
.centent {
  margin-top: 10px;
}
.el-form-item__label {
  width: 100px !important;
}
.app-container {
  width: 80%;
  margin: 0 auto;
}
.title {
  margin-left: 20px;
  span {
    display: block;
    margin-top: 20px;
    font-size: 20px;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 700;
    margin-left: 30px;
  }
}
.centerFooter {
  width: 20%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
</style>