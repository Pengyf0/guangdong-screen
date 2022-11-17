<template>
  <div class="right_box">
    <div class="Title">分行龙虎榜</div>
    <ul>
      <dv-border-box-12>
        <li class="bar_box">
          <h3>
            <i class="el-icon-s-flag" circle></i>
            一级行本周签约商户数 &nbsp;

            <el-button
              round
              @click="signDialogVisible = true"
              size="small"
              type="primary"
              style="font-size: 16px"
              >查看更多</el-button
            >
          </h3>
          <IntegraRightBar :barData="topConfig" /></li
      ></dv-border-box-12>
      <dv-border-box-12>
        <li class="bar_box">
          <h3>
            <i class="el-icon-s-flag" circle></i>
            一级行本周订单笔数 &nbsp;
            <el-button
              round
              @click="orgCashoutDialogVisible = true"
              size="small"
              type="primary"
              style="font-size: 16px"
              >查看更多</el-button
            >
          </h3>
          <IntegraRightBar :barData="midConfig" /></li
      ></dv-border-box-12>
      <dv-border-box-12>
        <li class="bar_box">
          <h3>
            <i class="el-icon-s-flag" circle></i> 商户本周订单笔数 &nbsp; &nbsp;

            <el-button
              round
              @click="mctDialogVisible = true"
              size="small"
              type="primary"
              style="font-size: 16px"
              >查看更多</el-button
            >
          </h3>

          <IntegraRightBar :barData="bomConfig" /></li
      ></dv-border-box-12>
      <!-- <dv-border-box-12> -->
      <li class="pie_box">
        <ul class="pie_chart_box">
          <li class="pie_b">
            <div class="pie">
              <IntegralPie :piedata="orderData" />
            </div>
            <div class="title">本周积分抵现订单 占比</div>
          </li>

          <li class="pie_b">
            <div class="pie">
              <IntegralPie :piedata="jhshIntegralData" />
            </div>
            <div class="title">本周建行生活积分用户数 占比</div>
          </li>
        </ul>
      </li>
      <!-- </dv-border-box-12 -->
    </ul>
    <el-dialog
      title="分行积分商户签约情况（以累计的签约门店排序）"
      :visible.sync="signDialogVisible"
      width="60%"
      style="margin-top: 25vh"
      :before-close="signHandleClose"
      :modal="false"
    >
      <el-table
        :data="signListData"
        style="font-size: 20px; background-color: #000; color: #fff"
      >
        <el-table-column
          width="180"
          property="sort"
          label="排名"
        ></el-table-column>
        <el-table-column
          width="200"
          property="name"
          label="一级分行"
        ></el-table-column>
        <el-table-column
          width="200"
          property="weekSignMct"
          label="本周签约商户数"
        ></el-table-column>
        <el-table-column
          width="200"
          property="weekSignStore"
          label="本周签约门店数"
        ></el-table-column>
        <el-table-column
          width="200"
          property="cntSignMct"
          label="累计签约商户数"
        ></el-table-column>
        <el-table-column
          width="200"
          property="cntSignStore"
          label="累计签约门店数"
        ></el-table-column>
      </el-table>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="signDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="signDialogVisible = false"
          >确 定</el-button
        >
      </span> -->
    </el-dialog>
    <el-dialog
      title="分行积分支付交易情况（以本周积分支付抵扣金额排序）"
      :visible.sync="orgCashoutDialogVisible"
      width="60%"
      style="margin-top: 25vh"
      :before-close="orgCashoutHandleClose"
      :modal="false"
    >
      <el-table
        :data="orgCashoutData"
        style="font-size: 20px; background-color: #000; color: #fff"
      >
        <el-table-column
          width="180"
          property="sort"
          label="排名"
        ></el-table-column>
        <el-table-column
          width="200"
          property="name"
          label="一级分行"
        ></el-table-column>
        <el-table-column
          width="200"
          property="weekOrderNum"
          label="本周订单笔数"
        ></el-table-column>
        <el-table-column
          width="200"
          property="weekSignCashout"
          label="本周抵扣金额"
        ></el-table-column>
        <el-table-column
          width="200"
          property="cntOrderNum"
          label="累计抵扣金额"
        ></el-table-column>
        <el-table-column
          width="200"
          property="cntSignCashouts"
          label="累计订单金额"
        ></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog
      title="商户积分支付交易TOP10 （以本周积分支付抵扣金额排序）"
      :visible.sync="mctDialogVisible"
      width="60%"
      style="margin-top: 25vh"
      :before-close="mctHandleClose"
      :modal="false"
    >
      <el-table
        :data="mctCashoutData"
        style="font-size: 20px; background-color: #000; color: #fff"
      >
        <el-table-column
          width="180"
          property="sort"
          label="排名"
        ></el-table-column>
        <el-table-column
          width="200"
          property="name"
          label="商户名称"
        ></el-table-column>

        <el-table-column
          width="200"
          property="brandName"
          label="品牌名称"
        ></el-table-column>
        <el-table-column
          width="200"
          property="weekSignStore"
          label="本周订单数"
        ></el-table-column>
        <el-table-column
          width="200"
          property="wekCashoutNum"
          label="本周抵扣金额"
        ></el-table-column>
        <el-table-column
          width="200"
          property="cntCashoutNum"
          label="累计抵扣金额"
        ></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import IntegraRightBar from "@/components/echart/IntegraRightBar";
import IntegralPie from "@/components/echart/IntegralPie";
// import RightBarBoxTwo from "@/components/echart/RightBarBoxTwo";
// import RightBarBoxThree from "@/components/echart/RightBarBoxThree";
import {
  getSignMctNumDetail,
  getOrgCashoutOrderNumDetail,
  getMctCashoutOrderNumDetail,
} from "@/request/httpApi";

//  分行积分商户签约情况
//getSignMctNumDetail
// 分行积分支付交易情况
//  getOrgCashoutOrderNumDetail
// 商户积分支付交易TOP10
//  getMctCashoutOrderNumDetail
export default {
  data() {
    return {
      signDialogVisible: false,
      orgCashoutDialogVisible: false,
      mctDialogVisible: false,
      signListData: [],
      orgCashoutData: [],
      mctCashoutData: [],
    };
  },
  props: {
    topConfig: {
      type: Object,
      default: () => ({}),
    },
    midConfig: {
      type: Object,
      default: () => ({}),
    },
    bomConfig: {
      type: Object,
      default: () => ({}),
    },
    orderData: {
      type: Object,
      default: () => ({}),
    },

    jhshIntegralData: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    // RightBarBoxOne,
    // RightBarBoxTwo,
    // RightBarBoxThree,
    IntegraRightBar,
    IntegralPie,
  },
  created() {
    this.getSignListData();
  },
  methods: {
    sortData(attr) {
      return function (a, b) {
        return a[attr] - b[attr];
      };
    },
    signHandleClose(done) {
      // 关闭弹框
      // this.$confirm("确认关闭？")
      //   .then((_) => {
      done();
      // })
      // .catch((_) => {});
    },
    orgCashoutHandleClose(done) {
      done();
    },
    mctHandleClose(done) {
      done();
    },
    getSignListData() {
      // 分行积分商户签约情况
      getSignMctNumDetail()
        .then((res) => {
          console.log("分行积分商户签约情况", res);
          let signList = res.sort(this.sortData("rankStore"));
          signList.map((item) => {
            this.signListData.push({
              sort: item.rankStore,
              name: item.orgName,
              weekSignMct: Number(
                Number(item.signMctNum).toFixed()
              ).toLocaleString("en-US"),
              weekSignStore: Number(
                Number(item.signStoreNum).toFixed()
              ).toLocaleString("en-US"),
              cntSignMct: Number(
                Number(item.signMctNumAll).toFixed()
              ).toLocaleString("en-US"),
              cntSignStore: Number(
                Number(item.signStoreNumAll).toFixed()
              ).toLocaleString("en-US"),
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
      // 分行积分支付交易情况
      getOrgCashoutOrderNumDetail()
        .then((res) => {
          console.log("分行积分支付交易情况", res);
          let apntTopList = res.sort(this.sortData("orderRank"));
          apntTopList.map((item) => {
            this.orgCashoutData.push({
              sort: item.orderRank,
              name: item.orgName,
              weekOrderNum: Number(
                Number(item.apntCashoutOrderNum).toFixed()
              ).toLocaleString("en-US"),
              weekSignCashout: Number(
                Number(item.apntCashoutAmt).toFixed()
              ).toLocaleString("en-US"),
              cntOrderNum: Number(
                Number(item.apntCashoutAmtAll).toFixed()
              ).toLocaleString("en-US"),
              cntSignCashouts: Number(
                Number(item.apntCashoutOrderAmtAll).toFixed()
              ).toLocaleString("en-US"),
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });

      // 商户积分支付交易TOP10

      getMctCashoutOrderNumDetail()
        .then((res) => {
          console.log("商户积分支付交易TOP10", res);
          let apntList = res.sort(this.sortData("orderRank"));
          apntList.map((item) => {
            this.mctCashoutData.push({
              sort: item.orderRank,
              name: item.mctNm,
              brandName: item.brandNm,
              weekSignStore: Number(
                Number(item.apntCashoutOrderNum).toFixed()
              ).toLocaleString("en-US"),
              wekCashoutNum: Number(
                Number(item.apntCashoutAmt).toFixed()
              ).toLocaleString("en-US"),
              cntCashoutNum: Number(
                Number(item.apntCashoutAmtAll).toFixed()
              ).toLocaleString("en-US"),
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.right_box {
  .bar_box {
    padding: 20px 10px 0 10px;
    margin: 10px 0;
    height: 210px;
    box-sizing: border-box;
  }
  .pie_box {
    height: 210px;
    padding: 0;
    box-sizing: border-box;
  }

  .Title {
    text-align: center;
    font-size: 36px;
  }
}

.pie_chart_box {
  height: 210px;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .pie_b {
    padding: 0;
    flex: 1;
    box-sizing: border-box;
    display: flex;
    justify-content: start;
    height: 50px;
    width: 100%;
    .pie {
      height: 70px;
      width: 70px;
    }
    .title {
      text-align: left;
      margin-left: 10px;
      font-size: 14px;
      line-height: 70px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #c0c0bf;
    }
  }
}
/deep/.el-dialog__title {
  font-size: 24px;
  color: #b9c8f8;
}

/deep/.el-table,
/deep/.el-dialog__body,
/deep/.el-dialog__header,
/deep/.el-table__header-wrapper,
/deep/.el-table__body-wrapper,
/deep/.el-table__cell {
  background-color: #003b51;
}
/deep/.el-table thead {
  background-color: #003b51;
  color: #000;
}

h3 {
  display: flex;
  justify-content: space-between;
}
// 更改鼠标移入列表整行的背景颜色
/deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #0a2732 !important;
}
</style>
