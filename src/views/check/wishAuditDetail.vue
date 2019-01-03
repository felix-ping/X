<template>
  <div class="app-container">
    <div class="contentBox">
      <h2>心愿单</h2>
      <div class="content">{{text}}</div>
      <el-button class="goBack" @click="clickBack">返回</el-button>
    </div>
  </div>
</template>
<script>
import { getwishAuditDetail } from '../../api/check'
export default {
  data() {
    return {
      text:
        '人生的旅途，一路走来总会遇到一些携手赶路的同行者，儿时的玩伴，学生时代的同窗，工作时的同事，……!我们总会在不同的阶段不同的地点不同的场景下结识一些志同道合的人携手同行，曾经的欢声笑语里记录着我们彼此美好的回忆。漫漫旅途，我们只不过是匆匆赶路的人，有不期而遇的相识，便会有无可奈何的挥手告别，这一路上有多少的同行者已四散天涯，其实我们都明白聚散终有时，谁也不能相陪到最后。当我们彼此挥手告别时，多少次都在期许着下一次的相聚，却在一声声的再见中再也不曾相聚，曾经的暖炉夜话，终成一曲相忘于江湖的悲歌，我们也只不过成了各自人生中的匆匆过客。有些的分离，却也有再一次的聚首，然，经年后，我们再一次的聚首，多少的场景里当我们手中的烟蒂湮灭，我们品尝到的也只是失落，本以为的酒逢知己，却只有相对无言，本应该喜极而泣的聚首，却在一片沉默中草草收场。正如那句歌词：“许多年以后，是你变了?是我变了?”。真的是相见不如怀念!',
      id: this.$route.query.id
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    clickBack() {
      this.$router.back()
    },
    getDetail() {
      getwishAuditDetail()
    }
  }
}
</script>
<style rel="stylesheet/scss" scoped lang="scss">
.contentBox {
  width: 800px;
  min-height: 600px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 10px 30px;
  position: relative;
}
h2 {
  font-family: 'Courier New', Courier, monospace;
}
.content {
  text-indent: 32px;
  font-family: 'Courier New', Courier, monospace;
  color: #606266;
}
.goBack {
  position: absolute;
  left: 50px;
  bottom: 30px;
}
</style>


