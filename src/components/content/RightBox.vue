<template>
  <div class="right_box">
    <div class="Title">分行龙虎榜</div>
    <ul>
      <dv-border-box-12>
        <li>
          <h3>
            <i class="el-icon-s-flag" circle></i>
            累计用户数 &nbsp; &nbsp;
            <!-- <el-button round size="small" type="primary" style="font-size: 16px"
              >查看更多</el-button
            > -->
          </h3>
          <RightBarBoxOne :topData="topConfig" /></li
      ></dv-border-box-12>
      <dv-border-box-12>
        <li>
          <h3>
            <i class="el-icon-s-flag" circle></i>
            日活用户数 &nbsp; &nbsp;
            <!-- <el-button round size="small" type="primary" style="font-size: 16px"
              >查看更多</el-button
            > -->
          </h3>
          <RightBarBoxTwo :midData="midConfig" /></li
      ></dv-border-box-12>
      <dv-border-box-12>
        <li>
          <h3>
            <i class="el-icon-s-flag" circle></i>
            新增用户数 &nbsp; &nbsp;
            <!-- <el-button round size="small" type="primary" style="font-size: 16px"
              >查看更多</el-button
            > -->
          </h3>

          <RightBarBoxThree :bomData="bomConfig" /></li
      ></dv-border-box-12>
    </ul>
  </div>
</template>

<script>
import RightBarBoxOne from "@/components/echart/RightBarBoxOne";
import RightBarBoxTwo from "@/components/echart/RightBarBoxTwo";
import RightBarBoxThree from "@/components/echart/RightBarBoxThree";

export default {
  props: {
    topConfig: {
      type: Object,
      default: () => ({}),
      // 累计用户数量
    },
    midConfig: {
      type: Object,
      default: () => ({}),
      // 日活用户数量
    },
    bomConfig: {
      type: Object,
      default: () => ({}),
      // 日活用户数量
    },
  },
  components: {
    RightBarBoxOne,
    RightBarBoxTwo,
    RightBarBoxThree,
  },
};
</script>

<style lang="less" scoped>
.right_box {
  // margin: 0 20px;
  // flex: 1;
  // color: rgb(185, 200, 248);
  li {
    padding: 20px 10px 0 10px;
    margin-top: 20px;
  }
  .Title {
    text-align: center;
    font-size: 36px;
  }
  .dv-cap-chart {
    width: 90%;
    height: 190px;
    margin-top: 20px;
    // background-color: #fff;
  }
}
</style>
