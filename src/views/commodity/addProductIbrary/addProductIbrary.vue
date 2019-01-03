
<template>
  <div class="app-container">
    <div class="filter-container">
      <h3>商品图片</h3>
      <hr>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-upload
          :on-preview="handlePictureCardPreview"
          :on-remove="(file, list) => removeCoverImg(file, list)"
          :on-success="(res) => uploadCoverImg(res)"
          :action="imgServeUrl"
          :limit="1"
          list-type="picture-card"
          :file-list="fileList"
        >
          <i class="el-icon-plus"/>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img :src="ruleForm.coverUrl" width="100%" alt>
        </el-dialog>
        <h3>商品详情</h3>
        <hr>
        <el-form-item label="类别">
          <el-select v-model="CategorOne" placeholder="请选择一级列别" @change="changeCategoryList">
            <el-option
              v-for="item in CategoryListOne"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <el-select v-model="CategoryTwo" placeholder="请选择二级类别">
            <el-option
              v-for="item in CategoryListTwo"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="ruleForm.name" class="el-form-default-width"/>
        </el-form-item>
        <el-form-item label="商品编号" prop="number">
          <el-input v-model="ruleForm.number" class="el-form-default-width"/>
        </el-form-item>
        <el-form-item label="商品金额" required prop="price">
          <el-input v-model="ruleForm.price" class="el-form-default-width"/>
        </el-form-item>
        <el-form-item label="排序" prop="seq">
          <el-input v-model="ruleForm.seq" class="el-form-default-width"/>
        </el-form-item>
        <el-form-item label="商品状态" prop="delivery">
          <el-switch v-model="ruleForm.enable"/>
        </el-form-item>
        <el-form-item label="商品性质">
          <el-form-item id="bzpl" label="标准配料">
            <!-- <el-checkbox-group>标准配料 -->
            <!-- <el-checkbox v-for="item in dardList" :label="item.name" :key="item.id"/> -->
            <!-- <el-checkbox label="复选框 A"/>
            <el-checkbox label="复选框 B"/>-->
            <!-- </el-checkbox-group> -->
            <el-checkbox-group v-model="checkedCitiesOne">
              <el-checkbox
                v-for="city in standardList"
                :label="city.id"
                :key="city.name"
              >{{ city.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form-item>

        <el-form-item label="客户可自定义">
          <el-form-item id="bzpl" label="可选规格">
            <div v-for="item,index in optionalList" :key="item.id">
              <el-form-item :label="item.name">
                <el-checkbox-group v-model="checkedCitiesTwo[index]">
                  <el-checkbox
                    v-for="city in item.list"
                    :label="city.id"
                    :key="city.name"
                  >{{ city.name }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
          </el-form-item>
        </el-form-item>

<el-form-item>
  <el-form-item id="bzpl" label="可加配料">
            <el-checkbox-group v-model="checkedCitiesThree">
              <el-checkbox
                v-for="city in standardList"
                :label="city.id"
                :key="city.name"
              >{{ city.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form-item>
</el-form-item>
        
      </el-form>
    </div>
    <div id="footer">
      <div class="footerButton">
        <el-button @click="back()">返回</el-button>
        <el-button size="medium" type="primary" @click="clickConfirm">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  optionalList,
  standardList,
  sysOrderingGoodsCategoryList,
  saveOrUpdate,
  orderingGoodsDetails
} from '../../../api/commodity'
export default {
  data() {
    return {
      dialogVisible:false,
      fileList:[],
      checkList: [],
      imgServeUrl: process.env.BASE_API + '/sysUpload?type=8',
      CategoryListOne: [], // 商品一级分类
      CategoryListTwo: [], // 商品二级分类
      CategorOne: null,
      CategoryTwo: null,
      checkedCitiesOne: [], // 表准配料被选中
      checkedCitiesTwo: [], // 可选规格被选中
      checkedCitiesThree: [], // 可加配料别选中
      cities: [], // 配料字符串列表
      optionalList: [], // 后台规格数组
      standardList: [], // 后台配料数据
      ruleForm: {
        coverUrl: '',
        name: null,
        number: null,
        price: null,
        seq: null,
        enable: true, // 商品状态
        categoryId: null, // 二级分类id
        dardList: [], // 配料列表
        standardIds: [], // 标准配料ids
        canAddIds: '', // 可加配料ids
        optionalIds: '' // 可加g规格ids
      },
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        number: [
          { required: true, message: '请输入商品编号', trigger: 'blur' }
        ],
        seq: [{ required: true, message: '请输入商品排序', trigger: 'blur' },
         { pattern:/^([0-9]+(\.\d+)?|0\.\d+)$/, message: '请输入数字!', trigger: 'blur' }
        ],
        price: [{ required: true, message: '请输入商品金额', trigger: 'blur' },
         { pattern:/^([0-9]+(\.\d+)?|0\.\d+)$/, message: '请输入数字!', trigger: 'blur' }
        ]
      },
      id: this.$route.query.id
    }
  },
  created() {
    this.getList().then(() => {
      if (this.id) {
        // 判断是否进详情
        this.getDetail()
      }
    })
  },
  watch: {
    CategorOne(newVal, oldVal) {
      for (let i = 0; i < this.CategoryListOne.length; i++) {
        if (this.CategoryListOne[i].id == newVal) {
          this.CategoryListTwo = this.CategoryListOne[i].list
        }
      }
    }
  },
  mounted() {},
  updated() {},
  methods: {
    getDetail() {
      orderingGoodsDetails(this.$route.query.id).then(res => {

        this.fileList.push({url:res.data.coverUrl})
        this.ruleForm.id = res.data.id
        this.ruleForm.coverUrl = res.data.coverUrl
        this.CategorOne = res.data.categoryFirstId
        this.CategoryTwo = res.data.categoryTwoId
        this.ruleForm.name = res.data.name
        this.ruleForm.number = res.data.number
        this.ruleForm.price = res.data.price
        this.ruleForm.seq = res.data.seq
        res.data.enable == 1
          ? (this.ruleForm.enable = true)
          : (this.ruleForm.enable = false)
        res.data.standardList.forEach(ele => { //标准配料
          this.checkedCitiesOne.push(ele.id)
        })
       

         let arr=[]
        for (let i = 0; i < this.optionalList.length; i++) {
          for (let j = 0; j < res.data.optionalList.length; j++) {
            if (this.optionalList[i].id == res.data.optionalList[j].id) {
              res.data.optionalList[j].twoLibrary.forEach(ele =>{
                this.checkedCitiesTwo[i].push(ele.id)
              })
            }
          }
        }

        console.log(this.checkedCitiesTwo)
         //循环拿到规格id
        res.data.canAddList.forEach(ele => {
          //可加配料
          if(ele != null || ele != undefined || ele != ''){
             this.checkedCitiesThree.push(ele.id)
          }
        })
      })
    },
    uploadCoverImg(res) {
      // 上传图片
        // 图片地址保存
      this.$set(this.ruleForm, 'coverUrl', 
        res.data
      )
    },
    removeCoverImg(file, list) {
      const coverUrl = JSON.parse(JSON.stringify(this.ruleForm.coverUrl))
      const index = coverUrl.indexOf(file.response.data)
      coverUrl.splice(index, 1)
      this.$set(this.ruleForm, 'coverUrl', coverUrl)
    },

    handlePictureCardPreview(res) {
   
      // this.$set(this.ruleForm, 'coverUrlList', [
      //   ...this.ruleForm.coverUrlList,
      //   res.data
      // ])
    },

    handleRemove(res) {},
    getList() {
      return new Promise((resolve, reject) => {
        optionalList().then(response => {
          // 规格列表
          this.optionalList = response.data
          resolve(response.data)
          for (let i = 0; i < this.optionalList.length; i++) {
            this.checkedCitiesTwo.push([])
          }
        })
        standardList().then(response => {
          // 配料列表
         
          this.standardList = response.data
          response.data.forEach(element => {})
        })
        sysOrderingGoodsCategoryList().then(response => {
          // 商品分类列表
          this.CategoryListOne = response.data
        })
      })
    },
    changeCategoryList(val) {
      for (let i = 0; i < this.CategoryListOne.length; i++) {
        if (this.CategoryListOne[i].id == val) {
          this.CategoryListTwo = this.CategoryListOne[i].list
        }
      }
      this.CategoryTwo = null
    },
    clickConfirm() {
      this.$refs.ruleForm.validate(val => {
        var optionalIds = [] // 被勾选的规格名称数组

        var totaloptionalIds = []

        this.checkedCitiesTwo.forEach(ele => {
          // 全部的二级规格数组
          totaloptionalIds = totaloptionalIds.concat(ele)
        })
        if (val) {
          this.$confirm('是否确认提交', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success',
            center: true
          }).then(() => {
            saveOrUpdate({
              ...this.ruleForm,
              categoryId: this.CategoryTwo,
              standardIds: this.checkedCitiesOne.join(),
              optionalIds: totaloptionalIds.join(),
            
              canAddIds: this.checkedCitiesThree.join()
            }).then(res => {
              this.$message({ type: 'success', message: '新增修改成功' })
              this.$router.push('/commodity/repast-products-table')
            })
          })
        }
      })
    }, // 确定按钮
    back() {
      this.$router.back()
    },
  }
}
</script>
<style scoped lang="scss">
#kxgg .el-form-item__label {
  font-size: 15px !important;
}
.el-form-default-width {
  width: 300px;
}
.el-input__inner {
  width: 300px !important;
}
.filter-container {
  width: 75%;
  margin: 0 auto;
}
.footerButton {
  width: 400px;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
}
#bzpl {
  margin-top: 40px;
  width: 800px;
}
.el-checkbox {
  width: 100px;
  margin-left: 0 !important;
}
.filter-container {
  width: 75%;
  margin: 0 auto;
}
</style>
