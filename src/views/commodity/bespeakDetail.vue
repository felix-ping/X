<template>
  <div class="app-container">
    <h2 class="top"> {{ isAdd ? '新增' : '添加' }}预约商品类目
      <el-button type="primary" class="top-btn" @click="handleSave">保存</el-button>
      <el-button class="top-btn" @click="$router.back()">返回</el-button>
    </h2>
    <el-form :inline="true" :model="formData" label-width="120px">
      <el-form-item class="width-25" label="商品图片">
        <el-upload
          :on-success="(res) => uploadCoverImg(res)"
          :on-remove="(file, list) => removeCoverImg(file, list)"
          :limit="1"
          :file-list="fileCoverUrlList"
          :action="imgServeUrl"
          list-type="picture-card">
          <i class="el-icon-plus"/>
        </el-upload>
      </el-form-item>
      <el-form-item class="width-25" label="类目名称">
        <el-input v-model="formData.goods.name" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="预约金额">
        <el-input v-model="formData.goods.price" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="商城页金额">
        <el-input v-model="formData.goods.seq" class="inp-w"/>
        (该价格会显示在商城页面，不设置则默认商城价格为正常金额)
      </el-form-item>
      <el-form-item class="width-25" label="排序">
        <el-input v-model="formData.goods.seq" class="inp-w"/>
      </el-form-item>
      <el-form-item class="width-25" label="类目状态">
        <el-switch v-model="formData.goods.sell" active-text="上架" inactive-text="下架"/>
      </el-form-item>
      <el-form-item class="width-25" label="类型">
        <el-select v-model="formData.goods.firType" placeholder="投放状态" class="filter-item">
          <el-option
            v-for="item in typeFirSelect"
            :key="item.firId"
            :label="item.firName"
            :value="item.firId"/>
        </el-select>
        <el-select v-model="formData.goods.storeGoodsCategoryId" placeholder="投放状态" class="filter-item">
          <el-option
            v-for="item in childFirSelect"
            :key="item.secId"
            :label="item.secName"
            :value="item.secId"/>
        </el-select>
      </el-form-item>
      <el-form-item class="width-25" label="状态">
        <el-switch v-model="formData.goods.sell" active-text="上架" inactive-text="下架"/>
      </el-form-item>
      <h2>规格 <el-button type="primary" @click="handleAddSpec">添加商品规格</el-button></h2>
      <el-card v-for="(item, index) in formData.specList" :key="index" shadow="never" class="gg-card">
        <i class="el-icon-close" @click="removeSpec(index)"/>
        <el-form-item class="width-25" label="规格名">
          <el-input v-model="item.parentName" class="inp-w"/>
        </el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="handleAddSpecParam(index)">添加规格值</el-button>
        <div v-for="(value, paraIndex) in item.paramList" :key="value.id">
          <el-form-item label="规格值">
            <el-input v-model="value.name" class="inp-w"/>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="value.price" class="inp-w"/>元
          </el-form-item>
          <el-button type="danger" icon="el-icon-delete" @click="handleRemoveSpecPara(index,paraIndex)"/>
        </div>
      </el-card>
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
import { getGoodsDetail, getClassForGood, addOrEditDrink } from '../../api/commodity'

export default {
  filters: {
    arrToText(arr) {
      return arr
    }
  },
  data() {
    return {
      imgServeUrl: process.env.BASE_API + '/sysUpload?type=5',
      isAdd: this.$route.query.isAdd === 'true',
      formData: { goods: {}},
      deleteSpecId: [],
      blowImg: '',
      showPreImg: false,
      typeFirSelect: []
    }
  },
  computed: {
    fileCoverUrlList() {
      const url = this.formData.goods.coverUrl
      return url ? [{ name: url, url: url }] : []
    },
    childFirSelect() {
      const firstType = this.typeFirSelect[this.formData.goods.firType]
      return firstType ? firstType.secList : []
    }
  },
  created() {
    // 获取类型下拉框数据
    getClassForGood().then(res => {
      this.typeFirSelect = res.data
    })
    if (!this.isAdd) {
      getGoodsDetail(this.$route.query.id).then(res => {
        this.formData = res.data
      })
    }
  },
  methods: {
    // upload img
    uploadCoverImg(res) {
      this.$set(this.formData.goods, 'coverUrl', res.data)
    },
    removeCoverImg(file, list) {
      this.$set(this.formData.goods, 'coverUrl', undefined)
    },
    // 保存
    handleSave() {
      const { goods, specList } = this.formData
      const jsonContent = []
      specList.forEach((item) => {
        const params = {
          specId: item.parentId || '',
          specName: item.parentName,
          specValueArray: []
        }
        item.paramList && item.paramList.forEach(value => {
          params.specValueArray.push({ specValueId: value.id, specValue: value.name, specPrice: value.price })
        })
        jsonContent.push(params)
      })
      // 把要删除的规格转换成，字符串拼接格式
      let deleteSpecIds = ''
      this.deleteSpecId.forEach(item => {
        deleteSpecIds += (deleteSpecIds ? (',' + item) : item)
      })
      const params = {
        goodsId: goods.id,
        storeId: goods.storeId,
        goodsName: goods.name,
        goodsPrice: goods.price,
        seq: goods.seq,
        sell: goods.sell,
        oneLevelId: goods.firType,
        secLevelId: goods.storeGoodsCategoryId,
        // getType: 暂时没有
        coverUrl: goods.coverUrl,
        jsonContent: JSON.stringify(jsonContent),
        delIds: deleteSpecIds
      }
      addOrEditDrink(params).then(_ => {
        this.$message({ type: 'success', message: this.isAdd ? '新增成功' : '修改成功' })
      })
    },
    // 新增规格
    handleAddSpec() {
      const formData = JSON.parse(JSON.stringify(this.formData))
      formData.specList.push({
        paramList: []
      })
      this.formData = formData
    },
    // 添加规格值
    handleAddSpecParam(index) {
      const formData = JSON.parse(JSON.stringify(this.formData))
      formData.specList[index].paramList.push({ price: 0 })
      this.formData = formData
    },
    /**
       * 删除规格选项
       * @param specIndex 规格index
       * @param paraIndex 规格选项index
       */
    handleRemoveSpecPara(specIndex, paraIndex) {
      const formData = JSON.parse(JSON.stringify(this.formData))
      const deleteParam = formData.specList[specIndex].paramList.splice(paraIndex, 1)[0]
      deleteParam.id && this.deleteSpecId.push(deleteParam.id)
      this.formData = formData
    },
    /**
       * 删除规格
       * @param spec
       */
    removeSpec(index) {
      const formData = JSON.parse(JSON.stringify(this.formData))
      const deleteSpec = formData.specList.splice(index, 1)[0]
      if (deleteSpec.parentId) {
        this.deleteSpecId.push(deleteSpec.parentId)
        deleteSpec.paramList && deleteSpec.paramList.forEach(item => {
          item.id && this.deleteSpecId.push(item.id)
        })
      }
      this.formData = formData
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
  .gg-card {
    margin-bottom: 20px;
    .el-icon-close {
      float: right;
    }
  }
</style>
