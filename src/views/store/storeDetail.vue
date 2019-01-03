<template>
  <div class="app-container">
    <h2 class="top"> {{ isAdd ? '添加店铺' : '店铺详情' }}
      <el-button type="primary" class="top-btn" @click="handleEditOrAdd">{{ isAdd ? '添加' : '修改' }}</el-button>
      <el-button class="top-btn" @click="$router.back()">返回</el-button>
    </h2>
    <el-form :inline="true" :model="formData" label-width="120px">
      <el-form-item class="width-25" label="店铺名称">
        <el-input v-model="formData.name" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="店铺地址">
        <el-input v-model="formData.address" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="联系方式">
        <el-input v-model="formData.telephone" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="营业状态">
        <el-select v-model="formData.status" placeholder="营业状态" class="filter-item">
          <el-option
            v-for="item in [{value: 0, label: '未开业'}, {value: 1, label: '营业中'}, {value: 2, label: '暂停营业'}]"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item class="width-25" label="营业时间">
        <el-time-picker v-model="beginTime" placeholder="开始时间" value-format="HH:mm:ss"/>
        <el-time-picker v-model="endTime" placeholder="结束时间" value-format="HH:mm:ss"/>
      </el-form-item>
      <el-form-item class="width-25" label="店铺简介">
        <el-input v-model="formData.describing" :rows="5" type="textarea" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="封面图">
        <v-upload-img :type="3" :default-img="formData.coverUrl" @uploadImgSuccess="img => formData.coverUrl = img"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addOrEditStore, getStoreDetail } from '../../api/store'
import UploadImg from '../../components/UploadImg'

export default {
  components: {
    'v-upload-img': UploadImg
  },
  filters: {
    arrToText(arr) {
      return arr
    }
  },
  data() {
    return {
      formData: {},
      isAdd: true,
      beginTime: '',
      endTime: ''
    }
  },
  created() {
    if (!this.$route.query.id) return false
    this.isAdd = false
    getStoreDetail(this.$route.query.id).then(res => {
      const arr = res.data.shopHours.split('-')
      this.formData = res.data
      this.beginTime = arr[0]
      this.endTime = arr[1]
    })
  },
  methods: {
    handleEditOrAdd() {
      const params = {}
      params.storeId = this.formData.id
      params.storeName = this.formData.name
      params.storeAddress = this.formData.address
      params.storeTelephone = this.formData.telephone
      params.storeStatus = this.formData.status
      params.storeCoverUrl = this.formData.coverUrl
      params.storeIntroduction = this.formData.describing
      params.storeTime = this.beginTime + '-' + this.endTime
      addOrEditStore(params).then(res => {
        this.$message({ message: this.isAdd ? '添加成功' : '修改成功', type: 'success' })
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
