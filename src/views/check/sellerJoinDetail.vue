<template>
  <div class="app-container">
    <h2 class="top"> 商家入驻详情
      <el-button class="top-btn" @click="$router.back()">返回</el-button>
    </h2>
    <el-form :inline="true" :disabled="true" :model="formData" label-width="120px">
      <el-form-item class="width-25" label="企业名称">
        <el-input v-model="formData.enterpriseName" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="店铺名称">
        <el-input v-model="formData.storeName" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="经营类型">
        <el-input v-model="formData.type" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="法人代表">
        <el-input v-model="formData.legal" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="注册号">
        <el-input v-model="formData.registNumber" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="机构代码">
        <el-input v-model="formData.orgCode" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="用户昵称">
        <el-input v-model="formData.name" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="真实姓名">
        <el-input v-model="formData.realName" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="手机号">
        <el-input v-model="formData.mobile" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="营业执照号">
        <el-input v-model="formData.businessLicenseNumber" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="提交日期">
        <el-input v-model="formData.gmtCreate" class="inp-w"/>
      </el-form-item>
      <br>
      <el-form-item label="身份正反面照片" class="width-25">
        <img :src="formData.idcardFronturl" class="i-size" @click="handleBlow(formData.idcardFronturl)">
        <img :src="formData.idcardBackurl" class="i-size" @click="handleBlow(formData.idcardBackurl)">
      </el-form-item>
      <el-form-item label="营业执照号" class="width-25">
        <img :src="formData.licenseUrl" class="i-size" @click="handleBlow(formData.licenseUrl)">
      </el-form-item>
    </el-form>

    <el-dialog
      :visible.sync="showPreImg"
      title="图片"
      width="80%">
      <img :src="blowImg" style="display: block; margin: 0 auto; width: 600px" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getSelllerJoinDetail } from '../../api/check'

export default {
  filters: {
    arrToText(arr) {
      return arr
    }
  },
  data() {
    return {
      formData: {},
      blowImg: '',
      showPreImg: false
    }
  },
  created() {
    getSelllerJoinDetail(this.$route.query.id).then(res => {
      this.formData = res.data
    })
  },
  methods: {
    handleSubmit() {
      // todo
    },
    handleBlow(url) {
      this.blowImg = url
      this.showPreImg = true
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
</style>
