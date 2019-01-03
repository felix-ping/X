<template>
  <div class="app-container">
    <h2 class="top"> {{ isAdd ? '新增门店活动' : '修改门店活动' }}
      <el-button type="primary" class="top-btn" @click="handleAddOrEdit">保存</el-button>
      <el-button class="top-btn" @click="$router.back()">返回</el-button>
    </h2>
    <el-form :inline="true" :model="formData" label-width="120px">
      <el-form-item label="上传图片" class="width-25">
        <v-upload-img :type="2" :default-img="formData.coverUrl" @uploadImgSuccess="(img)=> formData.coverUrl = img"/>
      </el-form-item>
      <br>
      <el-form-item class="width-25" label="活动名称">
        <el-input v-model="formData.summary" style="width: 250px"/>
      </el-form-item>
      <el-form-item class="width-25" label="选择门店">
        <el-select v-model="formData.storeId" placeholder="请选择">
          <el-option
            v-for="item in stores"
            :key="item.id"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item class="width-25" label="活动简介">
        <el-input v-model="formData.remark" style="width: 250px"/>
      </el-form-item>
      <el-form-item class="width-25" label="活动链接">
        <el-input v-model="formData.url" style="width: 250px"/>
      </el-form-item>
      <el-form-item label="开始时间" class="width-25">
        <el-date-picker v-model="formData.beginTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" style="width: 250px"/>
      </el-form-item>
      <el-form-item label="结束时间" class="width-25">
        <el-date-picker v-model="formData.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" style="width: 250px;"/>
      </el-form-item>
      <el-form-item label="排序" class="width-25">
        <el-input v-model="formData.seq" style="width: 250px"/>
      </el-form-item>
      <el-form-item label="显示状态">
        <el-radio v-model="formData.enable" :label="1">启动</el-radio>
        <el-radio v-model="formData.enable" :label="0">禁用</el-radio>
      </el-form-item>
    </el-form>
    <div class="b-btn"/>
  </div>
</template>

<script>
import { addOrEditStoreActivity, getStoreActivityDetail } from '../../api/activity'
import { getStore } from '../../api/store'
import UploadImg from '../../components/UploadImg'
import { successMsg } from '../../utils'

export default {
  components: {
    'v-upload-img': UploadImg
  },
  data() {
    return {
      isAdd: true,
      formData: {},
      stores: []
    }
  },
  created() {
    getStore({ size: 100, current: 1 }).then(res => {
      this.stores = res.data.records
    })
    if (!this.$route.query.id) return false
    this.isAdd = false
    getStoreActivityDetail(this.$route.query.id).then(res => {
      this.formData = res.data
    })
  },
  methods: {
    handleAddOrEdit() {
      addOrEditStoreActivity(this.formData).then(res => {
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
