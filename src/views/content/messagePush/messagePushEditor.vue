<template>
  <div class="app-container">
    <el-form label-width="100px">
      <el-form-item label="类型" class="redItem">
        <el-radio v-model="radio" label="1">app消息</el-radio>
        <el-radio v-model="radio" label="2">push推送</el-radio>
      </el-form-item>
      <el-form-item label="通知标题" class="redItem">
        <el-input class="el-form-default-width"></el-input>
      </el-form-item>
      <el-form-item label="通知标题">
        <el-input
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 15}"
          class="el-form-default-width"
        ></el-input>
      </el-form-item>

      <el-form-item label="通知标题">
        <div class="flex">
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange">所有人</el-checkbox>
          <el-checkbox-group
            style="margin-left:5px;"
            v-model="checkedLimit"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox v-for="city in limit" :label="city.id" :key="city.id">{{city.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item label="后续动作">
        <el-radio v-model="radio" label="1">启动app</el-radio>
        <el-radio v-model="radio" label="2">打开链接</el-radio>
      </el-form-item>
      <el-form-item label="推送方式" class="redItem">
        <el-radio v-model="radio" label="1">即使</el-radio>
        <el-radio v-model="radio" label="2">定时</el-radio>
        <br>
        <el-radio v-model="radio" label="2">定时展示</el-radio>
        <el-radio v-model="radio" label="2">定时</el-radio>
      </el-form-item>
      <el-form-item label="跳转链接">
        <el-input placeholder></el-input>
      </el-form-item>
    </el-form>
    <div class="footerButton">
      <el-button class="clickBack()">返回</el-button>
      <el-button type="primary" class="handClick()">提交</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: null,
      checkAll: false,
      checkedLimit: [],
      cities: this.limit,
      limit: [
        {
          name: '普通会员',
          id: '0'
        },
        {
          name: '仅限学生会员',
          id: '1'
        },
        {
          name: '推广合伙人',
          id: '2'
        }
      ]
    }
  },
  methods: {
    handleCheckAllChange(val) {
      val
        ? this.limit.forEach(ele => {
            this.checkedLimit.push(ele.id)
          })
        : (this.checkedLimit = [])
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.limit.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.limit.length
    },
    clickBack() {
      //返回提交
      this.$router.back()
    },
    handClick() {
      //提交
    }
  }
}
</script>
<style rel="stylesheet/scss" scoped lang="scss">
.app-container {
  width: 50%;
  margin: 0 auto;
  padding-top: 80px;
}
.el-form-default-width {
  width: 350px;
}
.flex {
  width: 78%;
  display: flex;
  justify-content: space-between;
}
.footerButton {
  width: 50%;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
}
</style>


