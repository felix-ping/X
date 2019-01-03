<template>
  <div class="app-container">
    <div class="app-container-content">
      <el-form v-model="formData" label-width="150px">
        <el-form-item class="item-top" label="优惠卷使用类型:">
          <el-select class="formIetm"></el-select>
        </el-form-item>
        <el-form-item class="item-top" label="优惠卷使用类型:">
          <el-checkbox-group v-model="formData.checkList">
            <el-checkbox label="会员注册" value="0"></el-checkbox>
            <el-checkbox label="普通会员" value="1"></el-checkbox>
            <el-checkbox label="推广合伙人" value="2"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="item-top" label="自定义:">
          <el-button size="mini" type="primary">导入用户列表</el-button>
        </el-form-item>
        <el-form-item class="item-top" label="赠送数量">
          <el-input class="formIetm"></el-input>
        </el-form-item>

        <el-form-item class="item-top" label="添加用户:">
          <el-input class="formIetm" placeholder="请输入手机号"></el-input>
          <el-button type="primary">添加用户</el-button>
          <br>
          <el-table class="table" :data="table" border fit highlight-current-row>
            <el-table-column align="center" label="昵称">
              <template slot-scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column align="center" label="手机号">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>

            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <!-- <el-button type="primary" size="mini" @click="clickWatch(scope.row)">修改</el-button> -->
                <el-button type="danger" size="mini" @click="clickDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      table: [],
      formData: {
        checkList: [],
        height: '10px'
      }
    }
  },
  computed: {}
}
</script>
<style scoped lang="scss">
.app-container-content {
  width: 50%;
  margin: 0 auto;
}
.formIetm {
  width: 200px;
}
.item-top {
  margin-top: 40px;
}
.table {
  margin-top: 20px;
  width: 500px;
}
</style>



