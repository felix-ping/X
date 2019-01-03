<template>
  <div>
    <div class="centent">
      <h2>商品图片</h2>
      <br>
      <hr>
      <div class="imgs">
        <img src>
      </div>
      <h2>商品详情</h2>
      <hr>
      <div class="centenDetail">
        <div class="left">
          <div class="leftTitlle">票卷名称:</div>
          <div class="rightCenten">{{1}}</div>
        </div>
        <div class="left">
          <div class="leftTitlle">使用门店:</div>
          <div class="rightCenten">￥{{2}}</div>
        </div>
        <div class="left">
          <div class="leftTitlle">票卷有效期:</div>
          <div class="rightCenten">{{3}}</div>
        </div>
        <div class="left">
          <div class="leftTitlle">票数设置:</div>
          <div class="rightCenten">{{4}}</div>
        </div>
        <div class="left">
          <div class="leftTitlle">使用人群限制:</div>
          <div class="rightCenten">{{4}}</div>
        </div>
        <div class="left">
          <div class="leftTitlle">支付方式:</div>
          <div class="rightCenten">{{5}}</div>
        </div>
        <div class="left">
          <div class="leftTitlle">是否置顶:</div>
          <div class="rightCenten">{{6}}</div>
        </div>
        <div class="left">
          <div class="leftTitlle">产品介绍:</div>
          <div class="rightCenten">{{7}}</div>
        </div>
      </div>
      <div class="footerButton">
        <el-button @click="clickBack">返回</el-button>
        <el-button @click="clickEditor">编辑</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {},
  methods: {
    clickBack() {
      //返回
      this.$router.back()
    },
    clickEditor() {
      this.$router.push({
        path: '/secKill/entranceAdd',
        query: { id: this.$route.query.id }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.centent {
  width: 75%;
  margin: 0 auto;
  .imgs {
    height: 150px;
  }
  .centenDetail {
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
  .rightCenten {
    padding: 0 20px;
    font-size: 17px;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 400;
    font-style: normal;
    color: #909399;
    font-weight: 700;
  }
  .footerButton {
    width: 30%;
    display: flex;
    justify-content: space-around;
    padding: 50px 0;
    margin-left: 15%;
  }
}
</style>

