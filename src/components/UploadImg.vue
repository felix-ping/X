<template>
  <el-upload
    :show-file-list="false"
    :on-success="handleImgSuccess"
    :before-upload="beforeImgUpload"
    :action="serveUrl"
    class="avatar-uploader">
    <img v-if="imageUrl" :src="imageUrl" :class="shape === 'oblong' ? 'oblong' : 'square'" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"/>
  </el-upload>
</template>

<script>
export default {
  name: 'UploadImg',
  props: {
    defaultImg: {
      default: '',
      type: String
    },
    shape: {
      default: 'square',
      type: String
    },
    type: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      imageUrl: this.defaultImg,
      serveUrl: process.env.BASE_API + '/sysUpload?type=' + this.type
    }
  },
  watch: {
    defaultImg(newValue) {
      this.imageUrl = newValue
    }
  },
  methods: {
    handleImgSuccess(res, file) {
      this.imageUrl = res.data
      this.$emit('uploadImgSuccess', res.data)
    },
    beforeImgUpload(file) {
      // const isJPG = file.type === 'image/jpeg'
      // const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
      return true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<style rel="stylesheet/scss" lang="scss">
  .avatar.oblong {
    width: 350px;
    height: 178px;
  }
  .avatar.square {
    width: 178px;
    height: 178px;
  }
</style>
