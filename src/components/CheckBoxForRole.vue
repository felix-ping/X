<template>
  <div>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" class="inline" style="margin-right: 10px" @change="handleCheckAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="checked" class="inline" @change="handleCheckedChange">
      <el-checkbox v-for="item in options" :label="item" :key="item">{{ item }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: 'CheckBoxForRole',
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isIndeterminate: false,
      checked: [],
      checkAll: false
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.checked = val ? this.options : []
      this.isIndeterminate = false
    },
    handleCheckedChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.options.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.inline {
	display: inline-block;
}
</style>
