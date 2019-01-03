<template>
  <div class="app-container">
    <h2 class="top"> {{ id ? '修改':'新增' }}招聘信息
      <el-button type="primary" class="top-btn" @click="handleAddOrEdit">{{ id ? '修改' : '新增' }}</el-button>
      <el-button class="top-btn" @click="$router.back()">返回</el-button>
    </h2>
    <el-form ref="ruleForm" :inline="true" :rules="rules" :model="formData" label-width="120px">
      <el-form-item class="width-25" label="职位标题" prop="name">
        <el-input v-model="formData.name" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="公司信息" prop="companyId">
        <el-select v-model="formData.companyId" placeholder="请选择公司" class="inp-w">
          <el-option
            v-for="item in selectCompany"
            :key="item.id"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item class="width-25" label="工作地点" prop="areaToolDistrictId">
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
      <el-form-item class="width-25" label="工作性质" prop="nature">
        <el-radio-group v-model="formData.nature">
          <el-radio :label="0">全职</el-radio>
          <el-radio :label="1">兼职</el-radio>
          <el-radio :label="2">实习</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="width-25" label="学历要求" prop="education">
        <el-select v-model="formData.education" placeholder="请选择学历要求" class="inp-w">
          <el-option
            v-for="item in [{value: 0, label: '不限'}, {value: 1, label: '大专及大专以上'},{value: 2, label: '本科及本科以上'},{value: 3, label: '研究生及研究生以上'},{value: 4, label: '博士'}]"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item class="width-25" label="工作经验" prop="workExperience">
        <el-select v-model="formData.workExperience" placeholder="请选择工作经验" class="inp-w">
          <el-option
            v-for="item in [{value: 0, label: '不限'}, {value: 1, label: '应届生'},{value: 2, label: '一年以下'},{value: 3, label: ':1-3年'},{value: 4, label: '3-5年'},{value: 5, label: '5-10年'},{value: 6, label: '10年以上'}]"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item class="width-25" label="工资计算" prop="wageRange">
        <el-radio-group v-model="formData.wageRange">
          <el-radio :label="0">月薪</el-radio>
          <el-radio :label="1">日薪</el-radio>
          <el-radio :label="2">时薪</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item type="number" class="width-25" label="最低工资" prop="wageMin">
        <el-input v-model.number="formData.wageMin" type="number" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="最高工资" prop="wageMax">
        <el-input v-model.number="formData.wageMax" type="number" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="联系人姓名" prop="contactName">
        <el-input v-model="formData.contactName" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="联系人电话" prop="contactMobile">
        <el-input v-model="formData.contactMobile" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="联系人邮箱" prop="contactEmail">
        <el-input v-model="formData.contactEmail" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="职位详情" prop="content">
        <el-input v-model="formData.content" :rows="8" type="textarea" class="inp-w"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addOrEditPosition, getPositionDetail, getCompanySelect } from '../../api/recruitment'
import UploadImg from '../../components/UploadImg'
import addressJson from '../../assets/address'

export default {
  components: {
    'v-upload-img': UploadImg
  },
  data() {
    return {
      selectCompany: [],
      isAjax: false,
      sheng: addressJson,
      shi: [],
      qu: [],
      imgServeUrl: process.env.BASE_API + '/sysUpload?type=7',
      id: this.$route.query.id,
      formData: {
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
        companyId: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        workExperience: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        nature: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        content: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        wageMin: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        wageRange: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        education: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        contactMobile: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码', trigger: ['blur', 'change'] }
        ],
        contactEmail: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        wageMax: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
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
    getCompanySelect().then(res => {
      this.selectCompany = res.data
    })
    if (this.id) {
      getPositionDetail(this.$route.query.id).then(res => {
        res.data.areaToolDistrictId = parseInt(res.data.areaToolDistrictId)
        res.data.cityToolDistrictId = parseInt(res.data.cityToolDistrictId)
        res.data.provinceToolDistrictId = parseInt(res.data.provinceToolDistrictId)
        this.formData = res.data
        this.isAjax = true
      })
    }
  },
  methods: {
    handleAddOrEdit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          addOrEditPosition(this.formData).then(res => {
            this.$message({
              type: 'success',
              message: this.id ? '修改成功' : '添加成功'
            })
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
