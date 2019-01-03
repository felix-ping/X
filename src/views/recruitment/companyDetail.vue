<template>
  <div class="app-container">
    <h2 class="top"> {{ id ? '修改':'新增' }}公司
      <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" class="top-btn" @click="handleAddOrEdit">{{ id ? '修改' : '新增' }}</el-button>
      <el-button class="top-btn" @click="$router.back()">返回</el-button>
    </h2>
    <el-form ref="ruleForm" :inline="true" :rules="rules" :model="formData" label-width="120px">
      <el-form-item class="width-25" label="公司名称" prop="name">
        <el-input v-model="formData.name" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="公司地址" prop="areaToolDistrictId">
        <el-select v-model="formData.provinceToolDistrictId" placeholder="省" style="width: 100px">
          <el-option
            v-for="item in sheng"
            :key="item.id"
            :label="item.name"
            :value="item.id"/>
        </el-select>
        <el-select v-model="formData.cityToolDistrictId" placeholder="市" style="width: 100px">
          <el-option
            v-for="item in shi"
            :key="item.id"
            :label="item.name"
            :value="item.id"/>
        </el-select>
        <el-select v-model="formData.areaToolDistrictId" placeholder="区" style="width: 100px">
          <el-option
            v-for="item in qu"
            :key="item.id"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item class="width-25" label="详细地址" prop="address">
        <el-input v-model="formData.address" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="公司官网" prop="officialWebsite">
        <el-input v-model="formData.officialWebsite" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="融资阶段" prop="financingStage">
        <el-select v-model="formData.financingStage" placeholder="融资" class="inp-w">
          <el-option
            v-for="item in [{value: 0, label: '未融资'}, {value: 1, label: '天使轮'},{value: 2, label: 'A轮'},{value: 3, label: 'B轮'},{value: 4, label: 'C轮'},{value: 5, label: 'D轮'},{value: 6, label: '已上市'},{value: 7, label: '不需要融资'}]"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item class="width-25" label="联系人" prop="contact">
        <el-input v-model="formData.contact" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="行业领域" prop="industrySector">
        <el-input v-model="formData.industrySector" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="联系电话" prop="mobile">
        <el-input v-model="formData.mobile" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="公司性质" prop="nature">
        <el-select v-model="formData.nature" placeholder="性质" class="inp-w">
          <el-option
            v-for="item in [{value: 0, label: '国有经济'}, {value: 1, label: '集体经济'},{value: 2, label: '私营经济'},{value: 3, label: '个体经济'},{value: 4, label: '联营经济'},{value: 5, label: '股份制'},{value: 6, label: '外商投资'},{value: 7, label: '港澳台投资'},{value: 8, label: '其他'}]"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item class="width-25" label="公司邮箱" prop="mailbox">
        <el-input v-model="formData.mailbox" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="公司规模" prop="scale">
        <el-select v-model="formData.scale" placeholder="规模" class="inp-w">
          <el-option
            v-for="item in [{value: 0, label: '0-20人'}, {value: 1, label: '20-99人'},{value: 2, label: '100-499人'},{value: 3, label: '500-999人'},{value: 4, label: '1000-9999人'},{value: 5, label: '10000以上'}]"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item class="width-25" label="公司介绍" prop="introduction">
        <el-input v-model="formData.introduction" :rows="8" type="textarea" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="公司logo">
        <v-upload-img :default-img="formData.logo" :type="6" @uploadImgSuccess="img => formData.logo = img"/>
      </el-form-item>
      <el-form-item label="公司图片">
        <el-upload
          :on-success="(res) => uploadCoverImg(res)"
          :on-remove="(file, list) => removeCoverImg(file, list)"
          :limit="9"
          :file-list="fileCoverUrlList"
          :action="imgServeUrl"
          list-type="picture-card">
          <i class="el-icon-plus"/>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addOrEditCompany, getCompanyDetail } from '../../api/recruitment'
import UploadImg from '../../components/UploadImg'
import addressJson from '../../assets/address'

export default {
  components: {
    'v-upload-img': UploadImg
  },
  data() {
    return {
      fullscreenLoading: false,
      isAjax: false,
      sheng: addressJson,
      shi: [],
      qu: [],
      imgServeUrl: process.env.BASE_API + '/sysUpload?type=7',
      id: this.$route.query.id,
      formData: {
        coverUrlList: []
      },
      rules: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        areaToolDistrictId: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        address: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        financingStage: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        nature: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        contact: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        industrySector: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码', trigger: ['blur', 'change'] }
        ],
        mailbox: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        scale: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    fileCoverUrlList() {
      return this.formData.coverUrlList.map(item => ({ name: item, url: item }))
    }
  },
  watch: {
    'formData.provinceToolDistrictId'(newVal) {
      this.shi = this.sheng.filter(item => item.id === newVal)[0].city
      if (this.isAjax) return false
      this.qu = []
      this.$set(this.formData, 'cityToolDistrictId', null)
      this.$set(this.formData, 'areaToolDistrictId', null)
    },
    'formData.cityToolDistrictId'(newVal) {
      if (newVal !== null) {
        this.qu = this.shi.filter(item => item.id === newVal)[0].area
      }
      if (this.isAjax) {
        this.isAjax = false
        return false
      }
      this.$set(this.formData, 'areaToolDistrictId', null)
    }
  },
  created() {
    if (this.id) {
      getCompanyDetail(this.$route.query.id).then(res => {
        res.data.areaToolDistrictId = parseInt(res.data.areaToolDistrictId)
        res.data.cityToolDistrictId = parseInt(res.data.cityToolDistrictId)
        res.data.provinceToolDistrictId = parseInt(res.data.provinceToolDistrictId)
        if (res.data.coverUrl) {
          res.data.coverUrlList = res.data.coverUrl.split(',')
        } else {
          res.data.coverUrlList = []
        }
        this.formData = res.data
        this.isAjax = true
      })
    }
  },
  methods: {
    uploadCoverImg(res) {
      this.$set(this.formData, 'coverUrlList', [...this.formData.coverUrlList, res.data])
    },
    removeCoverImg(file, list) {
      const coverUrlList = JSON.parse(JSON.stringify(this.formData.coverUrlList))
      const index = coverUrlList.indexOf(file.name)
      coverUrlList.splice(index, 1)
      this.$set(this.formData, 'coverUrlList', coverUrlList)
    },
    handleAddOrEdit() {
      let coverUrl = ''
      const formData = JSON.parse(JSON.stringify(this.formData))
      if (!formData.coverUrlList.length) return this.$message({ type: 'error', message: '公司图片不能为空' })
      if (!formData.logo) return this.$message({ type: 'error', message: '公司logo不能为空' })
      formData.coverUrlList.forEach(item => {
        if (!coverUrl) {
          coverUrl = item
        } else {
          coverUrl += (',' + item)
        }
      })
      delete formData.coverUrlList

      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // 全屏loading显示
          this.fullscreenLoading = true
          addOrEditCompany({ ...formData, coverUrl }).then(res => {
            this.$message({
              type: 'success',
              message: this.id ? '修改成功' : '添加成功'
            })
          }, _ => {}).then(_ => {
            // 全屏loading隐藏
            this.fullscreenLoading = false
          })
        }
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
