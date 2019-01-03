<template>
  <div class="app-container">
    <div class="app-container-content">
      <h3>提现详情</h3>
      <hr>
      <el-form :inline="true" v-model="formData" label-width="150px">
        <el-form-item label="用户名：" class="itemClass">
          <section>{{val}}</section>
        </el-form-item>
        <el-form-item class="itemClass" label="手机号码">
          <section>{{val}}</section>
        </el-form-item>
        <br>
        <el-form-item class="itemClass" label="提现金币">
          <span>{{val}}</span>
        </el-form-item>
        <el-form-item class="itemClass" label="金额">
          <span>{{val}}</span>
        </el-form-item>
        <el-form-item class="itemClass" label="状态">
          <span>{{val}}</span>
        </el-form-item>
        <el-form-item class="itemClass" label="提现路径">
          <span>{{val}}</span>
        </el-form-item>
        <el-form-item class="itemClass" label="提现记录">
          <span>{{val}}</span>
        </el-form-item>
        <el-form-item class="itemClass" label="提现账号">
          <span>{{val}}</span>
        </el-form-item>
        <el-form-item class="itemClass" label="审核人">
          <span>{{val}}</span>
        </el-form-item>

        <div style="width:50%; margin:0 auto;">
          <el-radio v-model="radio" label="0">通过</el-radio>
          <el-radio v-model="radio" label="1">不通过</el-radio>
        </div>
      </el-form>
      <h3>提现凭证</h3>
      <hr>
      <el-upload
        style="margin:10px 0 0 150px;"
        :action="imgServeUrl"
        list-type="picture-card"
        :on-success="(res) => uploadCoverImg(res)"
        :on-remove="(file, list) => removeCoverImg(file, list)"
        :on-preview="handlePictureCardPreview"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </div>
    <div class="footerButton">
      <el-button @click="goBack()">返回</el-button>
      <el-button type="primary" @click="goClick">完成</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      radio: '0',
      val: '111111111111',
      dialogImageUrl: '',
      dialogVisible: false,
      imgServeUrl: process.env.BASE_API + '/sysUpload?type=12' //图片上传地址
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    uploadCoverImg(res) {
      //图片事件
      this.$set(this.formData, 'coverUrl', res.data)
    },
    removeCoverImg(file, list) {
      this.$set(this.formData, 'coverUrl', undefined)
    },
    goClick() {
      // 完成事件
    },
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style rel="stylesheet/scss" scoped lang="scss">
.itemClass {
  width: 42%;
}
.app-container-content {
  width: 60%;
  margin: 0 auto;
}
.footerButton {
  width: 20%;
  margin-left: 30%;
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}
</style>

