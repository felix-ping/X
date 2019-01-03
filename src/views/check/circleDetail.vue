<template>
  <div class="app-container">
    <h2 class="top"> 圈子详情
      <el-button type="danger" class="top-btn" @click="handleDelete">删除</el-button>
      <el-button class="top-btn" @click="$router.back()">返回</el-button>
    </h2>
    <el-form :inline="true" :disabled="true" :model="formData" label-width="120px">
      <el-form-item class="width-25" label="用户名">
        <el-input v-model="formData.nickName" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="发送时间">
        <el-input v-model="formData.gmtCreate" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="文字内容">
        <el-input v-model="formData.content" :rows="5" type="textarea" class="inp-w"/>
      </el-form-item>
      <h2>图片视频</h2>
      <el-form-item v-for="url in formData.urlList" :key="url" class="width-25">
        <img v-if="url.indexOf('mp4') === -1" :src="formData.studentIdUrl" class="i-size" @click="handleBlow(url)">
        <video v-else :src="url" class="i-size" controls/>
      </el-form-item>
    </el-form>

    <el-dialog
      :visible.sync="showPreImg"
      title="图片"
      width="80%">
      <img :src="blowImg" style="display: block; margin: 0 auto" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getCircleDetail, deleteCircle } from '../../api/check'
import { successMsg } from '../../utils'

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
    getCircleDetail(this.$route.query.id).then(res => {
      this.formData = res.data
    })
  },
  methods: {
    handleDelete() {
      this.$confirm('确认关闭？')
        .then(_ => {
          deleteCircle(this.formData.id).then(res => {
            successMsg('删除成功')
            this.$router.back()
          })
        })
        .catch(_ => {})
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
