<template>
  <div class="left_box">
    <div class="Title">最新用户数据</div>
    <dv-border-box-12>
      <div class="week_trend">
        <div class="title">建行生活积分用户累计数</div>
        <IntegralLineLeft :adata="InteAllCnt" />
      </div>
    </dv-border-box-12>

    <dv-border-box-12>
      <div class="week_trend">
        <div class="title">积分支付交易用户数</div>
        <IntegralLineLeft :adata="InteTransaction" />
      </div>
    </dv-border-box-12>
    <dv-border-box-12>
      <div class="week_trend">
        <div class="title">积分支付订单额</div>
        <IntegralLineLeft :adata="InteOrder" />
        <!-- <div id="line3" style="width: 100%; height: 220px"></div> -->
      </div>
    </dv-border-box-12>
    <dv-border-box-12>
      <div class="week_trend">
        <div class="title">积分支付抵扣金额</div>
        <IntegralLineLeft :adata="InteDeduction" />
        <!-- <div id="line3" style="width: 100%; height: 220px"></div> -->
      </div>
    </dv-border-box-12>
  </div>
</template>
<script>
import IntegralLineLeft from "@/components/echart/IntegralLineLeft.vue";

export default {
  props: {
    InteAllCnt: {
      type: Object,
      default: () => ({}),
      //累计用户注册数据
    },
    InteTransaction: {
      type: Object,
      default: () => ({}),
      //累计用户注册数据
    },
    InteOrder: {
      type: Object,
      default: () => ({}),
      //累计用户注册数据
    },
    InteDeduction: {
      type: Object,
      default: () => ({}),
      //累计用户注册数据
    },

  },
  data() {
    return {
      
    };
  },
  components: {
    IntegralLineLeft,
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
    margin: 10px 0;
    height: 210px;
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
