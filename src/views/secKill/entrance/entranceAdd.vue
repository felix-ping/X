<template>
  <div class="content">
    <div class="title">
      <h2>票卷详情</h2>
    </div>
    <div>
      <el-form
        :model="formData"
        status-icon
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm"
        :inline="true"
        :hide-required-asterisk="true"
        style="width:1000px;margin:0 auto;"
      >
        <el-form-item label="票卷名称" class="marginTop">
          <el-input v-model="formData.name" class="el-form-default-width"></el-input>
        </el-form-item>
        <el-form-item label="票卷价格" class="marginTop">
          <el-input v-model="formData.discountPrice" class="el-form-default-width"></el-input>
        </el-form-item>
        <el-form-item label="票卷原价" class="marginTop">
          <el-input v-model="formData.price" class="el-form-default-width" style="”width:100px"></el-input>
        </el-form-item>
        <el-form-item label="使用门店" class="marginTop">
          <el-select
            class="el-form-default-width"
            style="”width:100px"
            v-model="formData.storeIds"
            multiple
            placeholder="请选择"
            @change="changeStoreIds"
          >
            <el-option v-for="item in storeIds" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择分类" class="marginTop">
          <!-- 一级 -->
          <el-select
            style="width:200px;"
            v-model="formData.toolDictId"
            @change="changeToolDictId"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in ticketList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="marginTop">
          <!-- 二级 -->
          <div
            v-for="item,index in ticketListTwoClone"
            :key="item.id"
            :class="index > 0 ? 'marginTop' : ''"
          >
            <el-select
              style="width:90px;margin-left:10px;"
              v-model=" formData.ticketType[index]"
              @change="ticketTypeChange(index)"
              clearable
              :key="index"
              :disabled="true"
            >
              <el-option
                v-for="item,index in ticketListTwo"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <!-- 三级 -->
            <el-select
              :ref="item.name"
              style="width:90px;margin-left:10px;"
              v-model="formData.orderingGoodCategoryParentId[index] "
              clearable
              placeholder="请选择"
              @change=" orderingGoodCategoryParentIdChange(index)"
            >
              <el-option
                v-for="item in orderingGoodCategoryParentList[index] "
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <!-- 四级 -->
            <el-select
              :ref="item.name"
              v-model="formData.orderingGoodCategoryId[index]"
              style="width:90px;margin-left:10px;"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in orderingGoodCategoryList[index]"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="票卷有效期" class="marginTop">
          <el-date-picker v-model="formData.gmtEnd" type="datetime" placeholder="选择开始日期时间"></el-date-picker>
          <el-date-picker
            style="margin-left:40px;"
            v-model="formData.gmtBegin"
            type="datetime"
            placeholder="选择结束日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="margin-left:30px" label="单票有效天数" class="marginTop">
          <el-input
            v-model="formData.effectiveDays"
            placeholder="请输入单票有效天数"
            class="el-form-default-width"
            style="”width:100px"
          ></el-input>
        </el-form-item>
        <br>
        <el-form-item label="票数设置" class="marginTop">
          <el-input
            v-model="formData.number"
            placeholder="请输入每个时间段需要的票数"
            class="el-form-default-width"
            style="”width:100px"
            :disabled="ballot"
          ></el-input>
          <el-checkbox style="margin-left:28px;" v-model="minute">分钟设置</el-checkbox>
        </el-form-item>
        <br>
        <el-form-item label="秒杀时间" class="marginTop">
          <div
            v-for="item,index in timeList"
            :key="index"
            :style="index>0?'margin-top:15px':'margin-top:10px;'"
          >
            <el-input
              v-model="formData.upDetail[item.leftTime.slice(0,2)].number"
              placeholder
              class="inp-min"
              type="number"
              :disabled="minuteList"
            >
              <template slot="prepend">{{item.leftTime}}</template>
              <template slot="append">张</template>
            </el-input>
            <el-input
              v-model="formData.upDetail[item.rightTime.slice(0,2)].number"
              placeholder
              class="inp-min"
              style="”width:400px"
              type="number"
              :disabled="minuteList"
            >
              <template slot="prepend">{{item.rightTime}}</template>
              <template slot="append">张</template>
            </el-input>
            <br>
          </div>
          <div>
            <el-collapse-transition>
              <div v-show="show">
                <div
                  v-for="item,index in timeListTwo"
                  :key="index"
                  class="transition-box"
                  :style="index>0?'margin-top:15px':'margin-top:10px;'"
                >
                  <el-input
                    v-model="formData.upDetail[item.leftTime.slice(0,2)].number"
                    placeholder
                    class="inp-min"
                    type="number"
                    :disabled="minuteList"
                  >
                    <template slot="prepend">{{item.leftTime}}</template>
                    <template slot="append">张</template>
                  </el-input>
                  <el-input
                    v-model="formData.upDetail[item.rightTime.slice(0,2)].number"
                    placeholder
                    class="inp-min"
                    type="number"
                    :disabled="minuteList"
                  >
                    <template slot="prepend">{{item.rightTime}}</template>
                    <template slot="append">张</template>
                  </el-input>
                  <br>
                </div>
              </div>
            </el-collapse-transition>
          </div>
          <el-button style="margin-left:43%;margin-top:20px;" @click="showList()">{{showName}}</el-button>
        </el-form-item>
        <el-form-item label="满减金额" class="marginTop">
          <el-input
            v-model=" formData.maxPrice"
            placeholder="减少金额"
            class="el-form-default-width"
            style="”width:100px"
          ></el-input>
        </el-form-item>
        <el-form-item label="减少金额" class="marginTop">
          <el-input
            v-model=" formData.minPrice"
            placeholder="减少金额"
            class="el-form-default-width"
            style="”width:100px"
          ></el-input>
        </el-form-item>
        <br>
        <el-form-item label="票卷限制" class="marginTop">
          <div class="flex">
            <el-checkbox v-model="checkAll" @change="handleCheckAllChange">所有人</el-checkbox>
            <el-checkbox-group
              style="margin-left:15px;"
              v-model="formData.seniority"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox v-for="city in limit" :label="city.id" :key="city.id">{{city.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <br>
        <el-form-item label="支付方式" class="marginTop">
          <div class="flex">
            <el-checkbox-group v-model=" formData.payWay">
              <el-checkbox v-for="city in payment" :label="city.id" :key="city.id">{{city.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <br>
        <el-form-item label="排序" class="marginTop">
          <el-input
            v-model="formData.seq"
            placeholder="请输入排序"
            class="el-form-default-width"
            style="”width:100px"
          ></el-input>
        </el-form-item>
        <br>
        <el-form-item label="是否可邀请" class="marginTop">
          <el-radio v-model="InvitationFlag" :label="true">是</el-radio>
          <el-radio v-model="InvitationFlag" :label="false">否</el-radio>
          <el-input
            v-model="formData.severalPeople"
            placeholder="请输入人员上限制"
            class="el-form-default-width"
            style="”width:100px;margin-left:20px;"
            :disabled=" !InvitationFlag"
          ></el-input>
          <el-input
            v-model="formData.nextPrice"
            placeholder="请输入价格"
            class="el-form-default-width"
            style="”width:100px;margin-left:20px;"
            :disabled="!InvitationFlag"
          ></el-input>
        </el-form-item>
        <br>
        <el-form-item label="是否可退款" style="margin-top:15px;">
          <el-radio v-model="formData.refundFlag" :label="true">是</el-radio>
          <el-radio v-model="formData.refundFlag" :label="false">否</el-radio>
        </el-form-item>
        <br>
        <el-form-item label="产品介绍" style="margin-top:15px;">
          <el-input
            rows="6"
            cols="75"
            v-model="formData.summary"
            type="textarea"
            :autosize="{ minRows: 10, maxRows:30,minCols:30,maxCols:40}"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <br>
        <el-form-item label="上传列表图" style="margin-top:15px;">
          <el-upload
            :action="imgServeUrl"
            list-type="picture-card"
            :file-list="fileCoverUrlList"
            :on-preview="handlePictureCardPreviewOne"
            :on-success="(res) => uploadCoverImg(res)"
            :on-remove="(file, list) => removeCoverImg(file, list)"
            :before-upload="beforeUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisibleOne">
            <img width="100%" :src="dialogImageUrlOne" alt>
          </el-dialog>
        </el-form-item>
        <br>
        <el-form-item label="上传详情图" style="margin-top:15px;">
          <el-upload
            :action="imgServeUrl"
            :on-success="(res) => uploadCoverImg1(res)"
            :on-remove="(file, list) => removeCoverImgTwo(file, list)"
            :limit="1"
            :file-list="fileCoverUrlList1"
            list-type="picture-card"
            :before-upload="beforeUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisibleTwo">
            <img width="100%" :src="dialogImageUrlTwo" alt>
          </el-dialog>
        </el-form-item>
        <br>
        <el-form-item label="商品状态" style="margin-top:15px;">
          <el-radio style="margin-left:30px;" v-model="formData.sell" :label="true">上架</el-radio>
          <el-radio v-model="formData.sell" :label="false">下架</el-radio>
        </el-form-item>
        <br>
        <el-form-item style="margin-left:300px;padding:50px 0;">
          <el-button @click="handelGoBack">返回</el-button>
          <el-button type="primary" @click="handeClick">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  listByOperate,
  sysSecondKillGoodsSort,
  storeGoodsList,
  sysSecondKillGoodsSaveOrUpdate
} from '../../../api/secKill'
export default {
  data() {
    return {
      date: '',
      minute: false,
      minuteList: true,
      ballot: false,
      InvitationFlag: '',
      storeIds: [], // 门店下拉数据
      ticketList: [], //票卷的一二级分类
      ticketListTwo: [], //票卷的二级分类
      ticketListTwoClone: [{}],
      orderingGoodCategoryParentList: [], //一级商品 下拉数据
      orderingGoodCategoryList: [], //二级商品 下拉数据
      formData: {
        name: '', //秒杀商品名称
        price: '', //票卷原价
        discountPrice: '', //票卷抵扣价格
        storeIds: [], //使用门店id数组
        gmtBegin: '', //票卷有效开始时间
        coverUrl: '', //票卷有效结束时间
        effectiveDays: '', //有效天数
        number: '', //票数设置(统一设置的票数，就不要传json对象字符串)
        upDetail: {
          '06': { number: null },
          '08': { number: null },
          '10': { number: null },
          '12': { number: null },
          '14': { number: null },
          '16': { number: null },
          '18': { number: null },
          '20': { number: null },
          '22': { number: null },
          '24': { number: null },
          '02': { number: null },
          '04': { number: null }
        }, //	秒杀时间json对象字符串
        seniority: [], //会员资格
        payWay: [], //支付方式
        sell: true, //是否下架
        seq: '', //是否置顶
        summary: '', //商品简介
        coverUrl: '', //封面图
        bannerUrl: '', //轮播图
        severalPeople: '', //可邀请人数（含本人）
        nextPrice: '', //邀请人数的下级价格
        toolDictId: '', //票劵类型  1级
        ticketType: [], //  用途 二级
        maxPrice: '', // 优惠最大满减金额(满减劵的时候传)
        minPrice: '', // 优惠最小满减金额(满减劵的时候传)
        storeOrderingGoodsId: '', //门店商品id
        orderingGoodCategoryParentId: [], //点餐商品一级分类
        orderingGoodCategoryId: [], //点餐商品二级分类分类id
        refundFlag: '', //是否可退款  传true false
        discountedPrice: '', //优惠价格(餐饮劵如果不是抵扣的是商品而是满减的价格就设置，没有就不设置)
        ticketType: '' // 秒杀劵的使用路径(多中用逗号隔开)
      },
      timeList: [
        {
          leftTime: '06:00',
          rightTime: '08:00'
        },
        {
          leftTime: '10:00',
          rightTime: '12:00'
        },
        {
          leftTime: '14:00',
          rightTime: '16:00'
        },
        {
          leftTime: '18:00',
          rightTime: '20:00'
        }
      ],
      timeListTwo: [
        {
          leftTime: '22:00',
          rightTime: '24:00'
        },
        {
          leftTime: '02:00',
          rightTime: '04:00'
        }
      ],
      limit: [
        {
          name: '推广合伙人',
          id: '2'
        },
        {
          name: '仅限学生会员',
          id: '1'
        },
        {
          name: '仅限普通会员',
          id: '0'
        }
      ],
      payment: [
        { name: '金豆', id: '1' },
        { name: '银豆', id: '2' },
        { name: '铜豆', id: '3' },
        { name: '支付宝', id: '4' },
        { name: '微信', id: '5' }
      ],
      show: false,
      showName: '全部展开',
      checkAll: false,
      checkedLimit: [],
      cities: this.limit,
      isIndeterminate: true,
      radio: 1, //是否可邀请
      timeRadio: 1, //上架下架
      dialogVisibleOne: false,
      dialogVisibleTwo: false,
      dialogImageUrlOne: '', //列表图点击放大图标后显示图片的地址
      dialogImageUrlTwo: '', //详情图点击放大图标后显示图片的地址
      imgServeUrl: process.env.BASE_API + '/sysUpload?type=11' //图片上传地址
    }
  },
  created() {
    this.getList()
  },
  watch: {
    minute(newVal, oldVal) {
      if (newVal == true) {
        this.minuteList = false
        this.ballot = true
      } else {
        this.minuteList = true
        this.ballot = false
      }
    },
    ticketListTwoClone: {
      handler(newValue, oldValue) {
        for (let i = 0; i < newValue.length; i++) {}
      }
    },
    ticketListTwoClone: {
      //监听 票卷的用户
      handler(newValue, oldValue) {
        this.formData.ticketType = new Array(newValue.length)
        for (let i = 0; i < newValue.length; i++) {
          this.formData.ticketType[i] = newValue[i].id
        }
        for (let j = 0; j < this.formData.ticketType.length; j++) {
          if (this.formData.ticketType[j] == 1) {
            storeGoodsList({
              storeIds: this.formData.storeIds.join(),
              id: this.formData.ticketType[j]
            }).then(res => {
              this.$set(this.orderingGoodCategoryParentList, j, res.data)
            })
          }
        }
      }
    },
    toolDictId(newVal, oldValue) {
      if (newVal != '') {
        this.ticketList.forEach((element, index) => {
          if (element.id == newVal) {
            this.ticketListTwo = element.list
            this.ticketListTwoClone = element.list
          }
        })
      } else {
        this.ticketListTwoClone = [{}]
        this.ticketListTwo = []
      }
      this.formData.orderingGoodCategoryParentId = new Array(
        this.ticketListTwo.length
      )
      this.formData.orderingGoodCategoryId = new Array(
        this.ticketListTwo.length
      )
      this.orderingGoodCategoryParentList = new Array(this.ticketListTwo.length)
      this.orderingGoodCategoryList = new Array(this.ticketListTwo.length)

      this.ticketListTwo.forEach(ele => {
        this.orderingGoodCategoryParentList.push([])
        this.orderingGoodCategoryList.push([])
      })
    }
  },
  computed: {
    fileCoverUrlList() {
      const url = this.formData.coverUrl
      return url ? [{ name: url, url: url }] : []
    },
    fileCoverUrlList1() {
      const url = this.formData.bannerUrl
      return url ? [{ name: url, url: url }] : []
    },

    toolDictId() {
      return this.formData.toolDictId
    }
  },

  methods: {
    getList() {
      listByOperate().then(res => {
        //开业的门店列表
        this.storeIds = res.data
      })
      sysSecondKillGoodsSort().then(res => {
        //卷的分类列表
        this.ticketList = res.data
      })
      this.ticketListTwo
    },
    changeStoreIds() {
      this.formData.toolDictId = ''
      this.ticketListTwoClone = [{}]
      this.ticketListTwo = [] //清空
      this.formData.orderingGoodCategoryParentId = new Array(
        this.ticketListTwo.length
      )
      this.formData.orderingGoodCategoryId = new Array(
        this.ticketListTwo.length
      )
      this.orderingGoodCategoryParentList = new Array(this.ticketListTwo.length)
      this.orderingGoodCategoryList = new Array(this.ticketListTwo.length)
    },
    changeToolDictId(val) {},

    orderingGoodCategoryParentIdChange(index) {
      //三级 change 事件
      this.formData.orderingGoodCategoryId[index] = '' // 二级数据绑定的数据 清空
      this.orderingGoodCategoryList[index] = [] //二级商品 下拉数据  清空
      const ev = event.currentTarget.innerText
      this.orderingGoodCategoryParentList[index].forEach(ele => {
        if (ele.name == ev) {
          this.orderingGoodCategoryList[index] = ele.list
        }
      })
    },
    showList() {
      this.show = !this.show
      if (this.show == true) {
        this.showName = '全部收起'
      } else {
        this.showName = '全部展开'
      }
    }, //
    handleCheckAllChange(val) {
      val
        ? this.limit.forEach(ele => {
            this.formData.seniority.push(ele.id)
          })
        : (this.formData.seniority = [])
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.limit.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.limit.length
    },
    uploadCoverImg(res) {
      this.$set(this.formData, 'coverUrl', res.data)
    },
    removeCoverImg(file, list) {
      this.$set(this.formData, 'coverUrl', '')
    },
    uploadCoverImg1(res) {
      this.$set(this.formData, 'bannerUrl', res.data)
    },
    removeCoverImg1(file, list) {
      this.$set(this.formData, 'bannerUrl', '')
    },
    handelGoBack() {
      //返回
      this.$router.back()
    },
    handeClick() {
      let data = JSON.parse(JSON.stringify(this.formData))
      this.tostring(data)
    },
    tostring(data) {
      if (data.storeIds > 0) {
        data.orderingGoodsId = this.$refs.点餐 ? this.$refs.点餐[0].value : '' //对应门店商品一级
        data.storeOrderingGoodsId = this.$refs.点餐
          ? this.$refs.点餐[1].value
          : '' //对应门店商品二级
        data.orderingGoodCategoryParentId = ''
        data.orderingGoodCategoryId = ''
      } else {
        data.orderingGoodCategoryParentId = this.$refs.点餐
          ? this.$refs.点餐[0].value
          : '' //商品一级
        data.orderingGoodCategoryId = this.$refs.点餐
          ? this.$refs.点餐[1].value
          : '' //商品二级
        data.orderingGoodsId = ''
        data.storeOrderingGoodsId = ''
      }
      data.storeIds = data.storeIds.toString()
      data.ticketType = data.ticketType.toString()
      this.minute
        ? (data.upDetail = JSON.stringify(data.upDetail))
        : (data.upDetail = '')
      this.minute ? (data.number = '') : data.number
      data.seniority = data.seniority.toString() //  票卷限制
      data.payWay = data.payWay.toString() // 支付方式
      this.InvitationFlag ? data.severalPeople : (data.severalPeople = '')
      this.InvitationFlag ? data.nextPrice : (data.nextPrice = '')
      sysSecondKillGoodsSaveOrUpdate(data).then(res => {})
    },

    handlePictureCardPreviewOne(file) {
      this.dialogImageUrlOne = file.url
      this.dialogVisibleOne = true
    },
    handlePictureCardPreviewTwo(file) {
      this.dialogImageUrlTwo = file.url
      this.dialogVisibleTwo = true
    },
    beforeUpload(file) {
      let isJPG = false
      const istp = file.name.substring(file.name.lastIndexOf('.') + 1)
      const tuArr = [
        'bmp',
        'jpg',
        'png',
        'tif',
        'gif',
        'pcx',
        'tga',
        'exif',
        'fpx',
        'svg',
        'psd',
        'cdr',
        'pcd',
        'dxf',
        'ufo',
        'eps',
        'ai',
        'raw',
        'WMF',
        'webp'
      ]
      tuArr.forEach(ele => {
        if (ele == istp) {
          isJPG = true
        }
      })
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传图片格式不正确!')
      }
      if (!isLt2M) {
        this.$message.error('上传icon大小不能超过 2MB!')
      }
      const isSize = new Promise(function(resolve, reject) {
        let width = 750
        let height = 1334
        let _URL = window.URL || window.webkitURL
        let img = new Image()
        img.onload = function() {
          let valid = img.width >= width && img.height >= height
          valid ? resolve() : reject()
        }
        img.src = _URL.createObjectURL(file)
      }).then(
        () => {
          return file
        },
        () => {
          this.$message.error('上传的图片必须是大于或等于750*1334!')
          return Promise.reject()
        }
      )
      return isJPG && isLt2M && isSize
    }
  }
}
</script>
<style scoped lang="scss">
.marginTop {
  margin-top: 15px;
}
.el-form-default-width {
  width: 200px;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.content {
  width: 70%;
  margin: 0 auto;
}
.input-class {
  width: 200px;
}
.inp-min {
  width: 300px;
}
.transition-box {
  height: 40px !important;
}
</style>

