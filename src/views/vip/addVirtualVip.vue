<template>
  <div class="app-container">
    <h2 class="top">新增虚拟用户
      <el-button type="primary" class="top-btn" @click="handleAdd">新增</el-button>
      <el-button class="top-btn" @click="$router.back()">返回</el-button>
    </h2>
    <el-form :inline="true" :model="formData" label-width="120px">
      <el-form-item class="width-25" label="头像">
        <v-upload-img
          :type="9"
          :default-img="formData.headUrl"
          @uploadImgSuccess="img => formData.headUrl = img"
        />
      </el-form-item>
      <br>
      <el-form-item class="width-25" label="昵称">
        <el-input v-model="formData.nickName" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="性别">
        <el-select v-model="formData.sex" placeholder="请选择" class="inp-w">
          <el-option
            v-for="item in [{value: 1, label: '男' },{ value: 2, label: '女' }]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="width-25" label="粉丝">
        <el-input v-model.number="formData.fans" type="number" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="手机号">
        <el-input v-model.number="formData.mobile" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="关注人数">
        <el-input v-model="formData.care" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="会员类型">
        <el-select v-model="formData.memberType" placeholder="会员类型" class="inp-w">
          <el-option
            v-for="item in [{value: 0, label: '普通会员'}, {value: 1, label: '学生会员'}, {value: 2, label: '推广合伙人'}]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="关注圈子">
        <el-select
          v-model="formData.circleId"
          style="width: 800px;"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签"
        >
          <el-option v-for="item in circleList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCircleListForSelect, addVirtualVip } from '../../api/vip'
import UploadImg from '../../components/UploadImg'

export default {
  components: {
    'v-upload-img': UploadImg
  },
  data() {
    return {
      formData: {},
      circleList: []
    }
  },
  created() {
    getCircleListForSelect().then(res => {
      this.circleList = res.data
    })
  },
  methods: {
    handleAdd() {
      const formData = JSON.parse(JSON.stringify(this.formData))
      formData.circleId = ''
      this.formData.circleId.forEach(item => {
        if (formData.circleId === '') {
          formData.circleId = item
        } else {
          formData.circleId += ',' + item
        }
      })
      addVirtualVip(formData).then(res => {
        this.$message({
          type: 'success',
          message: '新增成功'
        })
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
