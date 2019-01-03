<template>
  <div class="app-container">
    <h2 class="top">
      {{ isAdd ? '新增宣传活动' : '修改宣传活动' }}
      <el-button type="primary" class="top-btn" @click="handleAddOrEdit">保存</el-button>
      <el-button class="top-btn" @click="$router.back()">返回</el-button>
    </h2>
    <el-form :inline="true" :model="formData" label-width="120px">
      <el-form-item label="封面图" class="width-25">
        <v-upload-img
          :type="1"
          :default-img="formData.coverUrl"
          @uploadImgSuccess="(img)=> formData.coverUrl = img"
        />
      </el-form-item>
      <el-form-item label="弹框图" class="width-25">
        <v-upload-img
          :type="1"
          :default-img="formData.popupUrl"
          @uploadImgSuccess="(img)=> formData.popupUrl = img"
        />
      </el-form-item>
      <el-form-item class="width-25" label="活动名称">
        <el-input v-model="formData.title" style="width: 250px"/>
      </el-form-item>
      <el-form-item class="width-25" label="是否启用弹出框">
        <el-radio v-model="formData.popup" :label="true">启动</el-radio>
        <el-radio v-model="formData.popup" :label="false">禁用</el-radio>
      </el-form-item>
      <el-form-item class="width-25" label="活动简介">
        <el-input v-model="formData.summary" style="width: 250px"/>
      </el-form-item>
      <el-form-item class="width-25" label="活动链接">
        <el-input v-model="formData.url" style="width: 250px"/>
      </el-form-item>
      <el-form-item label="开始时间" class="width-25">
        <el-date-picker
          v-model="formData.beginTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 250px"
        />
      </el-form-item>
      <el-form-item label="结束时间" class="width-25">
        <el-date-picker
          v-model="formData.endTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 250px;"
        />
      </el-form-item>
      <el-form-item label="排序" class="width-25">
        <el-input v-model="formData.seq" style="width: 250px"/>
      </el-form-item>
      <el-form-item label="显示状态">
        <el-radio v-model="formData.enable" :label="true">启动</el-radio>
        <el-radio v-model="formData.enable" :label="false">禁用</el-radio>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formData.status">
          <el-option
            v-for="item in [{label:'未发布',id:0},{label:'展示中',id:1},{label:'人工下架',id:2}]"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="b-btn"/>
  </div>
</template>

<script>
import {
  getHostActivityDetail,
  addOrEditHostActivity
} from '../../api/activity'
import UploadImg from '../../components/UploadImg'
import { successMsg } from '../../utils'

export default {
  components: {
    'v-upload-img': UploadImg
  },
  data() {
    return {
      isAdd: true,
      formData: {}
    }
  },
  created() {
    if (!this.$route.query.id) return false
    this.isAdd = false
    getHostActivityDetail(this.$route.query.id).then(res => {
      this.formData = res.data
    })
  },
  methods: {
    handleAddOrEdit() {
      addOrEditHostActivity(this.formData).then(res => {
        successMsg(this.isAdd ? '新增成功' : '修改成功')
        this.$router.back()
      })
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
</style>
