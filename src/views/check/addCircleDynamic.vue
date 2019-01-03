<template>
  <div class="app-container">
    <h2 class="top"> 新增圈子动态
      <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" class="top-btn" @click="handleAdd">新增</el-button>
      <el-button class="top-btn" @click="$router.back()">返回</el-button>
    </h2>
    <el-form :inline="true" :model="formData" label-width="120px">
      <el-form-item class="width-25" label="文章作者">
        <el-select
          v-model="formData.userId"
          :remote-method="remoteMethod"
          :loading="loading"
          filterable
          remote
          placeholder="输入用户名查询"
          class="inp-w">
          <el-option
            v-for="item in virtualVip"
            :key="item.userId"
            :label="item.nickName"
            :value="item.userId"/>
        </el-select>
      </el-form-item>
      <el-form-item class="width-25" label="文章内容">
        <el-input v-model="formData.content" :rows="5" type="textarea" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="发布地址">
        <el-input v-model="formData.address" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="发布圈子">
        <el-select
          v-model="formData.circleId"
          placeholder="请选择圈子"
          class="inp-w">
          <el-option
            v-for="item in circleList"
            :key="item.circleId"
            :label="item.name"
            :value="item.circleId"/>
        </el-select>
        {{ formData.userId ? '': '请先选择文章作者' }}
      </el-form-item>
      <el-form-item class="width-25" label="点赞数量">
        <el-input v-model.number="formData.count" type="number" class="inp-w"/>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="formData.type">
          <el-radio label="0">动态</el-radio>
          <el-radio label="1">图片</el-radio>
          <el-radio label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <br>
      <el-form-item v-if="formData.type === '1'" key="1" label="图片">
        <el-upload
          ref="upload"
          :on-success="(res) => uploadCoverImg(res)"
          :on-remove="(file, list) => removeCoverImg(file, list)"
          :limit="9"
          :action="imgServeUrl"
          accept="image/*"
          list-type="picture-card">
          <i class="el-icon-plus"/>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="formData.type === '2'" key="2" label="视频">
        <el-upload
          ref="upload1"
          :limit="1"
          :on-success="handleVideoUpdate"
          :action="imgServeUrl"
          accept="video/*">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getVirtualSelect, addImgText, getVipCircleSelect } from '../../api/check'

export default {
  data() {
    return {
      fullscreenLoading: false,
      virtualVip: [],
      imgServeUrl: process.env.BASE_API + '/sysUpload?type=8',
      formData: {
        coverUrlList: [],
        type: '1'
      },
      loading: false,
      circleList: []
    }
  },
  watch: {
    'formData.type'(newVal) {
      this.$set(this.formData, 'coverUrlList', [])
    },
    'formData.userId'(newVal) {
      if (newVal) {
        getVipCircleSelect(newVal).then(res => {
          this.circleList = res.data
          this.$set(this.formData, 'circleId', null)
        })
      }
    }
  },
  methods: {
    uploadCoverImg(res) {
      this.$set(this.formData, 'coverUrlList', [...this.formData.coverUrlList, res.data])
    },
    removeCoverImg(file, list) {
      const coverUrlList = JSON.parse(JSON.stringify(this.formData.coverUrlList))
      const index = coverUrlList.indexOf(file.response.data)
      coverUrlList.splice(index, 1)
      this.$set(this.formData, 'coverUrlList', coverUrlList)
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        getVirtualSelect(query).then(res => {
          this.loading = false
          this.virtualVip = res.data
        })
      } else {
        this.virtualVip = []
      }
    },
    handleVideoUpdate(res) {
      this.$set(this.formData, 'coverUrlList', [res.data])
    },
    handleAdd() {
      const formData = JSON.parse(JSON.stringify(this.formData))
      let urls = ''
      formData.coverUrlList && formData.coverUrlList.forEach(item => {
        if (urls) {
          urls += (',' + item)
        } else {
          urls = item
        }
      })
      delete formData.coverUrlList
      formData.urls = urls
      this.fullscreenLoading = true
      addImgText(formData).then(res => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      }, _ => {}).then(_ => {
        this.fullscreenLoading = false
        this.formData = { type: '1' }
        this.$refs.upload
          ? this.$refs.upload.clearFiles()
          : this.$refs.upload1.clearFiles()
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
