<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="nameOne"
        placeholder="请选择一级名称"
        class="filter-item el-form-default-width"
        clearable
        labe
      >
        <el-option
          v-for="(item, index) in showList"
          :key="index"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-input
        style="width:200px;"
        v-model="nameTwo"
        placeholder="请选择配料/规格名"
        class="filter-item el-form-default-width"
        clearable
      ></el-input>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="clickSearch">搜索</el-button>
    </div>

    <div id="filter-container-right" class="filter-container">
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-plus"
        @click="clickAddFirstRank"
      >添加一级分类</el-button>
    </div>

    <div class="template-container">
      <div v-for="(item, index) in showList" :key="index" class="bank">
        <div class="first-bank">
          <div class="first-bank-left">
            <span class="title">{{ item.name }}</span>
            <i
              :class="[item.visible?'transform-icon':'']"
              class="el-icon el-icon-caret-bottom m-l-5"
              @click="clickVisibleChildren(item, index)"
            />
          </div>
          <div class="first-bank-right">
            <i
              class="el-icon el-icon-circle-plus"
              style="color: #409EFF;"
              @click="clickAddSecondRank(item, index)"
            />
            <i
              class="el-icon el-icon-edit-outline m-l-5"
              style="color:#b3e19d"
              @click="clickEditFirstRank(item, index)"
            />
            <i
              class="el-icon el-icon-delete m-l-5"
              style="color:#f56c6c"
              @click="clickDeleteFirstRank(item, index)"
            />
            <!-- <el-button type="danger" icon="el-icon-delete" circle></el-button> -->
          </div>
        </div>
        <el-collapse-transition accordion>
          <ul v-show="item.visible" class="second-bank">
            <div class="m-t-5"/>
            <li v-for="(subItem, subIndex) in item.list" :key="subIndex">
              <div class="left">
                <em>名称:</em>
                <span class="m-l-10">{{ subItem.name }}</span>
                <em>价格:</em>
                <span class="m-l-10 color-red">¥{{ subItem.price }}</span>
                <em>排序:</em>
                <span class="m-l-10">{{ subItem.seq }}</span>
              </div>
              <div class="right">
                <i
                  style="color:#b3e19d"
                  class="el-icon el-icon-edit-outline m-l-5"
                  @click="clickEditSecondRank(item,index, subItem, subItem)"
                />
                <i
                  style="color:#f56c6c"
                  class="el-icon el-icon-delete m-l-5"
                  @click="clickDeleteSecondRank(item,index, subItem, subItem)"
                />
              </div>
            </li>
          </ul>
        </el-collapse-transition>
      </div>

      <el-dialog
        :visible.sync="dialog.visibleOne"
        :title="dialogTitleOne"
        :before-close="clickCloseOne"
        width="500px"
        class="default-dialog"
      >
        <el-form ref="formOne" :model="formOne" :rules="rulesOne" size="small" label-width="100px">
          <!-- <el-form-item label="名称" prop="name">
        <el-input v-model="formProp.name" class="el-form-default-width" placeholder="请输入名称"/>
          </el-form-item>-->
          <el-form-item label="名称" prop="name">
            <el-input
              v-model="formOne.name"
              class="el-form-default-width"
              placeholder="请输入名称"
              clearable
            />
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="formOne.standard" placeholder="请选择类型">
              <el-option label="可加配料/标准配料" value="true"/>
              <el-option label="可加规格" value="false"/>
            </el-select>
          </el-form-item>
          <el-form-item label="是否多选">
            <el-switch
              v-model="formOne.multi"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="是"
              inactive-text="否"
            />
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button size="small" type="primary" @click="clickConfirmOne">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog
        :visible.sync="dialog.visibleTwo"
        :title="dialogTitleTwo"
        :before-close="clickCloseTwo"
        width="500px"
        class="default-dialog"
      >
        <el-form ref="formTwo" :model="formTwo" :rules="rulesTwo" size="small" label-width="100px">
          <el-form-item label="配料/规格" prop="name">
            <el-input
              v-model="formTwo.name"
              class="el-form-default-width"
              placeholder="请输入名称"
              clearable
            />
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input
              v-model="formTwo.price"
              class="el-form-default-width"
              placeholder="请输入价格"
              clearable
            />
          </el-form-item>
          <el-form-item label="排序" prop="seq">
            <el-input
              v-model="formTwo.seq"
              class="el-form-default-width"
              placeholder="请输入排序序号"
              clearable
            />
          </el-form-item>
        </el-form>

        <div slot="footer">
          <el-button size="small" type="primary" @click="clickConfirmTwo">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  orderingGoodsParamLibraryList,
  delFirstLevel,
  addOrUpdateTwoLevel,
  delTwoLevel,
  orderingGoodsScreen
} from '../../../api/commodity'
import { addOrUpdateFirstLevel } from '../../../api/commodity'
export default {
  name: 'IngredientsLibrary',
  data() {
    return {
      listLoading: true,
      nameOne: null,
      nameTwo: null,
      showList: [],
      dialogTitleOne: '新增配一级名称',
      dialogTitleTwo: '新增配料规格',
      typeList: [],
      dialog: {
        visibleOne: false,
        visibleTwo: false
      },
      formOne: {
        name: null,
        standard: '0',
        multi: false
      },
      formTwo: {
        parentId: null,
        name: null,
        seq: null,
        price: null
      },
      rulesOne: {
        name: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }
        ]
      },
      rulesTwo: {
        name: [
          {
            required: true,
            message: '请输入规格名',
            trigger: 'blur'
          }
        ],
        price: [
          {
            required: true,
            message: '请输入价格',
            trigger: 'blur'
          },
          {
            pattern: /^([0-9]+(\.\d+)?|0\.\d+)$/,
            message: '请输入数字!',
            trigger: 'blur'
          }
        ],
        seq: [
          {
            required: true,
            message: '请输入排序序号',
            trigger: 'blur'
          },
          {
            pattern: /^([0-9]+(\.\d+)?|0\.\d+)$/,
            message: '请输入数字!',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {},
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getList()
    },
    getList() {
      this.listLoading = true
      const that = this
      return new Promise(function(resolve, reject) {
        orderingGoodsParamLibraryList().then(response => {
          const arr = []
          if (that.showList.length > 0) {
            that.showList.forEach(ele => {
              if (ele.visible == true) {
                arr.push(ele.id)
              }
            })
            response.data.forEach(ele => {
              if (arr.length > 0) {
                arr.forEach(subEle => {
                  if (ele.id == subEle) {
                    ele.visible = true
                  } else {
                    if (ele.visible != true) {
                      ele.visible = false
                    }
                  }
                })
              } else {
                response.data.forEach(val => {
                  val.visible = false
                })
              }
            })
          } else {
            response.data.forEach(val => {
              val.visible = false
            })
          }
          that.showList = response.data
          resolve()
        })
      })
    },
    clickSearch() {
      //搜索
      if (
        (this.nameOne == undefined ||
          this.nameOne == null ||
          this.nameOne == '') &&
        (this.nameTwo == null || this.nameTwo == null || this.nameTwo == '')
      ) {
        this.getList()
      } else {
        orderingGoodsScreen({
          parentId: this.nameOne,
          name: this.nameTwo
        }).then(res => {
          this.showList.forEach(ele => {
            ele.visible = false
            res.data.forEach(subele => {
              if (ele.id == subele.id) {
                ele.list = subele.list
                setTimeout(() => {
                  ele.visible = true
                }, 1)
              }
            })
          })
        })
      }
    },
    clickAddFirstRank() {
      // 新增一级分类弹框
      this.dialog.visibleOne = true
      this.formOne = {
        name: null,
        standard: 'false',
        multi: false
      }
    },
    clickEditFirstRank(item) {
      // 一级名称详情
      this.dialog.visibleOne = true
      this.formOne.id = item.id
      this.formOne.name = item.name
      this.formOne.standard = item.standard.toString()
      this.formOne.multi = item.multi
    },
    clickVisibleChildren(item, index) {
      this.showList[index].visible = !this.showList[index].visible
    },
    clickAddSecondRank(item) {
      // 新增二级名称
      this.dialog.visibleTwo = true
      this.formTwo = {
        name: null,
        seq: null,
        price: null,
        parentId: item.id
      }
    },
    clickEditSecondRank(item, index, subItem) {
      // 二级详情
      this.dialog.visibleTwo = true
      this.formTwo.parentId = item.id
      this.formTwo.id = subItem.id
      this.formTwo.name = subItem.name
      this.formTwo.seq = subItem.seq
      this.formTwo.price = subItem.price
    },
    clickDeleteFirstRank(item) {
      // 一级名称删除
      const funDelete = () =>
        delFirstLevel(item.id).then(res => {
          this.$message({ message: '删除成功', type: 'success' })
          this.getList()
        })
      this.$confirm('确认删除？').then(_ => {
        funDelete()
      })
    },

    clickDeleteSecondRank(item, index, subItem, subIndex) {
      // 二级名称删除
      const funDelete = () =>
        delTwoLevel(subItem.id).then(res => {
          this.$message({ message: '删除成功', type: 'success' })
          this.getList()
        })
      this.$confirm('确认删除？').then(_ => {
        funDelete()
      })
    },

    clickConfirmOne() {
      // 一级弹框确定按钮
      this.$refs.formOne.validate(valid => {
        if (valid) {
          this.$confirm('是否确认提交', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success',
            center: true
          }).then(() => {
            addOrUpdateFirstLevel(this.formOne).then(res => {
              this.$message({
                type: 'success',
                message: '新增修改成功'
              })
              this.dialog.visibleOne = false
              this.getList()
            })
          })
        }
      })
    },
    clickConfirmTwo() {
      // 二级名称弹框确定按钮
      this.$refs.formTwo.validate(valid => {
        if (valid) {
          this.$confirm('是否确认提交', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success',
            center: true
          }).then(() => {
            addOrUpdateTwoLevel(this.formTwo).then(res => {
              this.$message({ type: 'success', message: '新增修改成功' })
              this.dialog.visibleTwo = false
              this.getList()
            })
          })
        }
      })
    },
    clickCloseOne(done) {
      // this.$refs.form.resetFields()
      // done()
      this.dialog.visibleOne = false
    },
    clickCloseTwo(done) {
      // this.$refs.form.resetFields()
      // done()
      this.dialog.visibleTwo = false
    }
  }
}
</script>
                        
<style scoped lang="scss">
.bank {
  min-height: 25px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ebeef5;
  box-shadow: 1px 1px 2px 0 #999;
  border-radius: 5px;

  .el-icon {
    font-size: 25px;
    position: relative;
    cursor: pointer;
    &:hover {
      transition: transform 0.2s;
      transform: scale(1.5);
    }
    color: #606266;
  }

  .first-bank {
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 16px;

    .title {
      margin: 0;
      padding: 0;
      font-weight: 500;
      color: #606266;
      font-size: 20px;
      font-weight: 700;
      font-family: 'Courier New', Courier, monospace;
    }
    .el-icon-caret-bottom {
      color: #606266;
    }
    .transform-icon {
      transform: rotateZ(180deg);
    }
  }

  ul.second-bank {
    padding: 0;
    margin: 0;

    & > li {
      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: 10px;
      border: 1px solid transparent;

      font-size: 16px;
      color: #999;
      cursor: pointer;

      &:hover {
        border-color: #999;
        border-radius: 100px;
      }
      font-family: 'Courier New', Courier, monospace;
    }
  }
}
#filter-container-right {
  text-align: right;
}
em {
  font-style: normal;
}
</style>
