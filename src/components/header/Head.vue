<template>
  <div class="top_title">
    <span class="Tit">{{ viewTitle }}</span>
    <span class="subTit" v-if="newTime">当前时间：{{ newTime }}</span>
    <span
      class="back"><el-button
      round
        size="small"
        type="primary"
        style="font-size: 16px"
        @click="backhome"
      >返回首页</el-button>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    viewTitle: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      newTime: "", //时间
      changeTimer: null, //时间定时器
    };
  },
  mounted() {
    // 时间实时变化
    this.changeTimer = setInterval(() => {
      this.getTime();
    }, 1000);
  },
  destroyed() {
    // 页面销毁清楚时间定时器
    if (this.changeTimer) {
      clearInterval(this.changeTimer);
    }
  },
  methods: {
    backhome(){
      this.$router.push('/')
    },
    // 当前时间
    getTime() {
      let t = new Date();
      let y = t.getFullYear();
      let mm = t.getMonth() + 1;
      let m = mm < 10 ? "0" + mm : mm;
      let d = t.getDate() < 10 ? "0" + t.getDate() : t.getDate();
      let h = t.getHours() < 10 ? "0" + t.getHours() : t.getHours();
      let mi = t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes();
      let s = t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds();

      this.newTime =
        y + "年" + m + "月" + d + "日" + " " + h + ":" + mi + ":" + s;
      //  console.log(this.newTime, '当前时间')
    },
  },
};
</script>
<style lang="less" scoped>
.top_title {
  text-align: center;
  height: 60px;

  .Tit {
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 48px;
    color: #fff;
    line-height: 60px;
  }
  .subTit {
    position: absolute;
    top: 15px;
    left: 75%;
    font-size: 16px;
    color: rgb(162, 153, 153);
    line-height: 60px;
  }
  .back {
    position: absolute;
    top: 15px;
    left: 90%;
    font-size: 16px;
    color: rgb(162, 153, 153);
    line-height: 60px;
  }
}
</style>
