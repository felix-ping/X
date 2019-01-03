<template>
  <div class="app-container">
    <h2 class="top">
      {{ isStudentVip ? '学生会员审核' : '推广合伙人审核' }}
      <el-button type="primary" class="top-btn" @click="handleSubmit">提交</el-button>
      <el-button class="top-btn" @click="$router.back()">返回</el-button>
    </h2>
    <el-form :inline="true" :model="checkData" label-width="120px">
      <el-form-item class="width-25" label="审核">
        <el-radio v-model="checkData.authCode" label="2">通过</el-radio>
        <el-radio v-model="checkData.authCode" label="1">拒绝</el-radio>
      </el-form-item>
      <el-form-item class="width-25" label="反馈">
        <el-input v-model="checkData.recard" :rows="5" class="inp-w" type="textarea"/>
      </el-form-item>
    </el-form>
    <h2>审核信息</h2>
    <el-form :inline="true" :disabled="true" :model="formData" label-width="120px">
      <el-form-item class="width-25" label="学信码">
        <el-input v-model="formData.studentCode" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="审核状态">
        <el-input
          :value="formData.status == 0 ? '待审核' : formData.status == 1 ? '不通过' : '已通过'"
          class="inp-w"
        />
      </el-form-item>
      <el-form-item :label="isStudentVip ? '学生证照片' : '省份证正反面照片'" class="width-25">
        <img
          v-for="(url, index) in formData.cardUrl.split(',')"
          :src="url"
          :key="index"
          class="i-size"
          @click="handleBlow(formData.cardUrl)"
        >
      </el-form-item>
    </el-form>
    <el-dialog
      :visible.sync="showPreImg"
      :before-close="handleClose"
      title="图片"
      width="80%"
      height="30%"
    >
      <div id="showPreImg">
        <img
          v-for="(url, index) in formData.cardUrl.split(',')"
          id="showPreImg"
          :src="url"
          :key="index"
          width="600;"
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getVipCheckDetail, checkVip } from '../../api/check'
import { successMsg } from '../../utils'

export default {
  filters: {
    arrToText(arr) {
      return arr
    }
  },
  data() {
    return {
      formData: { cardUrl: '' },
      checkData: {},
      blowImg: '',
      showPreImg: false,
      isStudentVip: false
    }
  },
  created() {
    this.isStudentVip = parseInt(this.$route.query.type) === 1
    getVipCheckDetail(this.$route.query.id).then(res => {
      this.formData = res.data
    })
  },
  methods: {
    handleSubmit() {
      const params = {
        roleType: this.$route.query.type,
        userId: this.$route.query.id,
        ...this.checkData
      }
      checkVip(params).then(res => {
        successMsg('提交成功')
        this.$router.back()
      })
    },
    handleBlow(url) {
      this.blowImg = url
      this.showPreImg = true
    },
    handleClose() {
      this.showPreImg = false
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  padding-top: 100px;
  position: relative;
}
.width-25 {
  width: 42%;
}
.img-box {
  img {
    width: 60%;
    height: 60%;
  }
}
.b-btn {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
  bottom: 20px;
  padding-right: 20px;
  left: 0;
}
.inp-w {
  width: 300px;
}
.top {
  position: absolute;
  width: 100%;
  top: 30px;
  margin: 0 auto 30px;
  background: #ffffff;
}
.top-btn:first-child {
  margin-right: 100px;
}
.top-btn {
  float: right;
  margin-right: 20px;
}
.i-size {
  display: block;
  width: 300px;
  height: 200px;
  background: #eee;
}
#showPreImg {
  width: 600px;
  margin: 0 auto;
}
</style>
