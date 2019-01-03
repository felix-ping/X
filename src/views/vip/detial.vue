<template>
  <div class="app-container">
    <h2 class="top"> {{ formData.role === 0 ? '普通会员' : formData.role === 1 ? '学生会员详情' : '推广合伙人详情' }}
      <!--<el-button type="primary" class="top-btn" @click="handleAddOrEdit">保存</el-button>-->
      <el-button class="top-btn" @click="$router.back()">返回</el-button>
    </h2>
    <el-form :inline="true" :disabled="true" :model="formData" label-width="120px">
      <el-form-item class="width-25" label="昵称">
        <el-input v-model="formData.nickNameNoEncrypt" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="会员类型">
        <el-input :value="formData.role === 0 ? '普通会员' : formData.role === 1 ? '学生会员' : '推广合伙人'" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="性别">
        <el-input :value="formData.gender === 0 ? '未知' : formData.gender === 1 ? '男' : '女'" class="inp-w" />
      </el-form-item>
      <el-form-item class="width-25" label="金币">
        <el-input v-model="formData.goldCoin" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="地区">
        <el-input v-model="formData.cityName" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="银币">
        <el-input v-model="formData.silverCoin" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="手机号">
        <el-input v-model="formData.mobile" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="铜币">
        <el-input v-model="formData.copperCoin" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="收货地址">
        <el-input v-model="formData.strAddress" :rows="5" class="inp-w" type="textarea"/>
      </el-form-item>
      <el-form-item class="width-25" label="铜币">
        <el-input v-model="formData.copperCoin" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="学信号">
        <el-input v-model="formData.studentCode" class="inp-w"/>
      </el-form-item>
      <el-form-item v-if="formData.studentIdUrl" class="width-25" label="学生证照片">
        <img :src="formData.studentIdUrl" class="i-size" alt="">
      </el-form-item>
      <el-form-item v-if="formData.idCardUrl" class="width-25" label="身份证正面">
        <img :src="formData.idCardUrl && formData.idCardUrl.split(',')[0]" class="i-size" alt="">
      </el-form-item>
      <el-form-item v-if="formData.idCardUrl" class="width-25" label="身份证反面">
        <img :src="formData.idCardUrl && formData.idCardUrl.split(',')[1]" class="i-size" alt="">
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getVipDetail } from '../../api/vip'

export default {
  filters: {
    arrToText(arr) {
      return arr
    }
  },
  data() {
    return {
      formData: {}
    }
  },
  created() {
    getVipDetail(this.$route.query.id).then(res => {
      this.formData = res.data
      this.formData.addressList.forEach(item => {
        this.formData.strAddress += item
      })
    })
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
