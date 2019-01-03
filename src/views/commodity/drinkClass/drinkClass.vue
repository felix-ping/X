<template>
  <div class="app-container">
    <h2 class="top">
      <!-- <el-select v-model="storeId" placeholder="选择门店">
        <el-option
          v-for="item in storeList"
          :key="item.id"
          :label="item.name"
          :value="item.id" />
      </el-select>-->
      <el-button type="primary" @click="$router.back()">返回</el-button>
      <el-button type="primary" class="top-btn" @click="handleAddOrEditParent()">添加一级类目</el-button>
    </h2>
    <!-- <div class="main-box">
      <el-collapse class="collapse">
        <el-collapse-item
          v-for="(item, index) in classData"
          :key="index"
          :title="item.firName + '(' + item.firInitial + ')'"
          :name="index"
        >
          <div v-for="(child, index) in item.secList" :key="index" class="item">
            <span>{{ child.secName + '(' + child.secInitial + ')' }}</span>
            <i class="el-icon-delete" @click="handleDelete(child)"/>
            <i class="el-icon-edit" @click="handleAddOrEditChild(item, child)"/>
          </div>
          <div class="cz">
            <div v-for="(item, index) in classData" :key="index" class="cz-item">
              <i class="el-icon-circle-plus" @click="handleAddOrEditChild(item)"/>
              <i class="el-icon-edit" @click="handleAddOrEditParent(item)"/>
              <i class="el-icon-delete" @click="handleDelete(item)"/>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    -->
    <div class="template-container">
      <div v-for="(item, index) in classData" :key="index" class="bank">
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
              style="color: #409EFF;"
              class="el-icon el-icon-circle-plus"
              @click="handleAddOrEditChild(item, index)"
            />
            <i
              style="color:#b3e19d"
              class="el-icon el-icon-edit-outline m-l-5"
              @click="handleAddOrEditParent(item, index)"
            />
            <i
              style="color:#f56c6c"
              class="el-icon el-icon-delete m-l-5"
              @click="handleDelete(item, index)"
            />
          </div>
        </div>
        <el-collapse-transition>
          <ul v-show="item.visible" class="second-bank">
            <div class="m-t-5"/>
            <li v-for="(subItem, subIndex) in item.list" :key="subIndex">
              <div class="left">
                <em>名称:</em>
                <span class="m-l-10">{{ subItem.name }}</span>
                <em>排序:</em>
                <span class="m-l-10">{{ subItem.seq }}</span>
                <em>商品前缀:</em>
                <span class="m-l-10">{{ subItem. abbreviate }}</span>
              </div>
              <div class="right">
                <i
                  style="color:#b3e19d"
                  class="el-icon el-icon-edit-outline m-l-5"
                  @click="handleDetailOrEditChild(item,index, subItem, subIndex)"
                />
                <i
                  style="color:#f56c6c"
                  class="el-icon el-icon-delete m-l-5"
                  @click="clickDeleteSecondRank(item,index, subItem,subIndex)"
                />
              </div>
            </li>
          </ul>
        </el-collapse-transition>
      </div>
      <el-dialog :visible.sync="dialogVisible" :title="dialogTitleOne" width="35%">
        <el-form ref="formOne" :model="dialogDataOne" :rules="rulesOne" label-width="80px">
          <el-form-item label="分类名称" prop="name">
            <el-input
              v-model="dialogDataOne.name"
              placeholder="请输入分类名称"
              style="width: 300px;"
              clearable
            />
          </el-form-item>
          <el-form-item label="排序" prop="seq">
            <el-input
              v-model="dialogDataOne.seq"
              placeholder="请输入排序"
              style="width: 300px;"
              clearable
            />
          </el-form-item>
          <el-form-item label="编号前缀" prop="abbreviate">
            <el-input
              v-model="dialogDataOne.abbreviate"
              placeholder="请输入编号前缀"
              style="width: 300px;"
              clearable
            />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSuccessOne">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :visible.sync="dialogVisibleTwo"
        :rules="rulesTwo"
        :title="dialogTitleTwo"
        width="35%"
      >
        <el-form ref="formTwo" :model="dialogDataTwo" :rules="rulesTwo" label-width="80px">
          <el-form-item label="分类名称" prop="name">
            <el-input
              placeholder="请输入分类名称"
              v-model="dialogDataTwo.name"
              style="width: 300px;"
              clearable
            />
          </el-form-item>
          <el-form-item label="排序" prop="seq">
            <el-input
              placeholder="请输入排序"
              v-model="dialogDataTwo.seq"
              style="width: 300px;"
              clearable
            />
          </el-form-item>
          <el-form-item label="编号前缀" prop="abbreviate">
            <el-input
              placeholder="请输入编号前缀"
              v-model="dialogDataTwo.abbreviate"
              style="width: 300px;"
              clearable
            />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleTwo = false">取 消</el-button>
          <el-button type="primary" @click="handleSuccessTwo">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  addOrEditParentClass, // 添加修改一级分类
  addOrEditParentClassTwo, // 添加修改二级分类
  sysOrderingGoodsCategoryList, // 获取分类列表
  deleteClass, // 删除出一级分类
  deleteTwoClass // 删除二级分类
} from '../../../api/commodity'
// import { getStore } from '../../api/store'
import UploadImg from '../../../components/UploadImg'

export default {
  components: {
    'v-upload-img': UploadImg
  },
  filters: {
    getChildByParentId(id) {
      return this.child.filter(item => {
        return item.parentId === id
      })
    }
  },
  data() {
    return {
      storeId: null,
      dialogType: 1, // 1: 添加修改一级类目，2：添加修改二级类目
      dialogVisible: false, // 新增一级分类
      dialogVisibleTwo: false, // 新增二级分类
      dialogTitleOne: null,
      dialogTitleTwo: null,
      dialogDataOne: {},
      dialogDataTwo: {},
      classData: [],
      listBooleans: [],
      rulesOne: {
        name: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }
        ],
        seq: [
          {
            required: true,
            message: '请输入排序',
            trigger: 'blur'
          },
          {
            pattern: /^([0-9]+(\.\d+)?|0\.\d+)$/,
            message: '请输入数字!',
            trigger: 'blur'
          }
        ],
        abbreviate: [
          {
            required: true,
            message: '请输入编码前缀',
            trigger: 'blur'
          }
        ]
      },
      rulesTwo: {
        name: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }
        ],
        seq: [
          {
            required: true,
            message: '请输入排序',
            trigger: 'blur'
          },
          {
            pattern: /^([0-9]+(\.\d+)?|0\.\d+)$/,
            message: '请输入数字!',
            trigger: 'blur'
          }
        ],
        abbreviate: [
          {
            required: true,
            message: '编码前缀',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  // watch: {
  //   storeId() {
  //     this.getList()
  //   }
  // },
  created() {
    // getStore({ size: 1000, current: 1 }).then(res => {
    //   this.storeList = res.data.records
    // })
    this.getList()
  },
  methods: {
    getList() {
      const that = this
      sysOrderingGoodsCategoryList().then(response => {
        const arr = []
        if (that.classData.length > 0) {
          that.classData.forEach(ele => {
            if (ele.visible == true) {
              arr.push(ele.id)
            }
          })
          for (let j = 0; j < response.data.length; j++) {
            if (arr.length > 0) {
              for (let i = 0; i < arr.length; i++) {
                if (response.data[j].id == arr[i]) {
                  response.data[j].visible = true
                } else {
                  if (response.data[j].visible != true) {
                    response.data[j].visible = false
                  }
                }
              }
            } else {
              response.data.forEach(val => {
                val.visible = false
              })
            }
          }
        } else {
          response.data.forEach(val => {
            val.visible = false
          })
        }
        that.classData = response.data
      })
    },
    handleAddOrEditParent(item) {
      // 一级名称详情 或 新增一级名称
      if (item) {
        this.dialogTitleOne = '一级类目详情'
        this.dialogVisible = true
        this.storeId = item.id
        this.dialogDataOne.name = item.name
        this.dialogDataOne.seq = item.seq
        this.dialogDataOne.abbreviate = item.abbreviate // 详情数据复制， 修改接口参数
      } else {
        this.storeId = null
        this.dialogTitleOne = '一级类目新增'
        this.dialogVisible = true
        this.dialogDataOne = {}
      }
    },
    handleAddOrEditChild(item, index) {
      // 新增二级目录
      this.dialogDataTwo = {}
      this.dialogDataTwo.parentId = item.id
      this.dialogTitleTwo = '新增二级目录'
      this.storeId = item.id
      this.dialogVisibleTwo = true
    },
    handleDetailOrEditChild(item, index, subItem) {
      // 二级目录详情
      this.dialogTitleTwo = '二级目录详情'
      this.dialogVisibleTwo = true

      this.dialogDataTwo.name = subItem.name
      this.dialogDataTwo.seq = subItem.seq
      this.dialogDataTwo.abbreviate = subItem.abbreviate //
      this.dialogDataTwo.parentId = item.id
      this.dialogDataTwo.id = subItem.id
    },
    handleDelete(item) {
      const funDelete = () => {
        deleteClass(item.id).then(_ => {
          this.$message({ message: '删除成功', type: 'success' })
          this.getList()
        })
      }
      this.$confirm('确认删除？').then(_ => {
        funDelete()
      })
    },
    handleSuccessOne() {
      this.$refs.formOne.validate(valid => {
        if (valid) {
          this.$confirm('是否确认提交', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success',
            center: true
          }).then(() => {
            addOrEditParentClass({
              ...this.dialogDataOne,
              id: this.storeId
            }).then(res => {
              this.$message({ message: '添加或修改成功', type: 'success' })
              this.getList()
              this.dialogVisible = false
            })
          })
        }
      })
    },
    handleSuccessTwo() {
      this.$refs.formTwo.validate(valid => {
        if (valid) {
          this.$confirm('是否确认提交', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success',
            center: true
          }).then(() => {
            addOrEditParentClassTwo(this.dialogDataTwo).then(res => {
              this.$message({ message: '添加或修改成功', type: 'success' })
              this.getList()
              this.dialogVisibleTwo = false
            })
          })
        }
      })
    },
    init() {},

    clickAddFirstRank() {
      this.$refs.dialogFirstRank.show()
    },

    clickVisibleChildren(item, index) {
      this.classData[index].visible = !this.classData[index].visible
    },

    clickAddSecondRank() {},
    clickEditFirstRank() {},
    clickDeleteFirstRank() {},

    clickEditSecondRank(item, index, subIndex) {
      // this.storeId = item.id
      // this.dialogDataTwo.name = subIndex.name
      // this.dialogDataTwo.seq = subIndex.seq
      // this.dialogDataTwo.abbreviate = subIndex.abbreviate
    },
    clickDeleteSecondRank(item, index, subItem) {
      // 删除二级分类
      const funDelete = () => {
        deleteTwoClass(subItem.id).then(_ => {
          this.$message({ message: '删除成功', type: 'success' })
          this.getList()
        })
      }
      this.$confirm('确认删除？').then(_ => {
        funDelete()
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
.top {
  position: absolute;
  width: 100%;
  top: 30px;
  margin: 0 auto 30px;
  background: #ffffff;
  .top-btn {
    float: right;
    margin-right: 30px;
  }
}
.item {
  span {
    font-size: 16px;
  }
  i {
    font-size: 20px;
    width: 30px;
    float: right;
  }
}
.main-box {
  display: flex;
  .collapse {
    flex: 1;
  }
  .cz {
    width: 150px;
    .cz-item {
      height: 48px;
      line-height: 48px;
      text-align: center;
      i {
        font-size: 20px;
        width: 30px;
      }
    }
  }
}
.bank {
  min-height: 25px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #999;
  box-shadow: 1px 1px 2px 0 #999;
  border-radius: 5px;
  .el-icon {
    position: relative;
    cursor: pointer;
    font-size: 25px;
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

    color: #000;
    font-size: 20px;

    .title {
      margin: 0;
      padding: 0;
      font-weight: 500;
      color: #606266;
      font-size: 20px;
      font-weight: 700;
      font-family: 'Courier New', Courier, monospace;
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
    }
    span {
      padding: 0 5px;
    }
  }
}
em {
  font-style: normal;
}
</style>
