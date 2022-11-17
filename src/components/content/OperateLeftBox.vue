<template>
  <div class="left_box">
    <div class="Title">实时用户数据</div>
    <dv-border-box-12>
      <div class="week_trend">
        <div class="title">累计注册用户</div>
        <OperateLineLeft :OperateLineData="UserAllCnt" />
      </div>
    </dv-border-box-12>

    <dv-border-box-12>
      <div class="week_trend">
        <div class="title">日活用户趋势</div>
        <OperateLineLeft :OperateLineData="UserActvCnt" />
      </div>
    </dv-border-box-12>
    <dv-border-box-12>
      <div class="week_trend">
        <div class="title">当日新增注册</div>
        <OperateLineLeft :OperateLineData="RealTimeIndex" />
        <!-- <div id="line3" style="width: 100%; height: 220px"></div> -->
      </div>
    </dv-border-box-12>
  </div>
</template>
<script>
// import LineOne from "@/components/echart/LineOne.vue";
// import LineTwo from "@/components/echart/LineTwo.vue";
// import LineThree from "@/components/echart/LineThree.vue";
import OperateLineLeft from "@/components/echart/OperateLineLeft.vue";
export default {
  props: {
    UserAllCnt: {
      type: Object,
      default: () => ({}),
      //累计用户注册数据
    },
    UserActvCnt: {
      type: Object,
      default: () => ({}),
    },
    RealTimeIndex: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    // LineOne,
    // LineTwo,
    // LineThree,
    OperateLineLeft,
  },
  watch: {},
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.left_box {
  .Title {
    color: rgb(185, 200, 248);
    text-align: center;
    font-size: 36px;
  }
  .week_trend {
    // background-color: rgba(201, 197, 197, 0.1);
    border-radius: 15px;
    margin: 20px 0;
    height: 263px;
    padding: 10px;
    box-sizing: border-box;
    .title {
      height: 30px;
      line-height: 30px;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      color: rgb(185, 200, 248);
    }
    #line {
    }
  }
}
</style>
