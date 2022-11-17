<template>
  <div id="index" ref="appRef">
    <div class="bgc">
      <dv-border-box-8 :dur="30">
        <dv-loading v-if="loading">Loading...</dv-loading>
        <Head :viewTitle="intergralTie"> </Head>
        <dv-decoration-5 style="width: 100%; height: 40px" :dur="30" />
        <div class="contanier">
          <div class="left_box">
            <IntegralLeftBox
              :InteAllCnt="InteAllCnt"
              :InteTransaction="InteTransaction"
              :InteOrder="InteOrder"
              :InteDeduction="InteDeduction"
              v-if="flag"
            />
          </div>
          <div class="mid_box">
            <div class="mid_title">
              <ul v-if="flag">
                <li>
                  <div class="first_con">
                    <div class="mid_con">
                      <el-button
                        type="primary"
                        icon="el-icon-s-custom"
                      ></el-button>
                    </div>
                  </div>
                  <div class="total_num">
                    <div class="to_num">
                      <span class="number">
                        {{ MainIndicators.regApntCustNum }}</span
                      >
                    </div>
                    <div class="total_tit">
                      <div class="subTit">建行生活积分用户累计数</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="first_con">
                    <div class="mid_con">
                      <el-button
                        type="primary"
                        icon="el-icon-share"
                      ></el-button>
                    </div>
                  </div>
                  <div class="total_num">
                    <div class="to_num">
                      <span class="number">
                        {{ MainIndicators.apntDealUserNum }}</span
                      >
                    </div>
                    <div class="total_tit">
                      <div class="subTit">积分支付交易用户累计数</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="first_con">
                    <div class="mid_con">
                      <el-button
                        type="primary"
                        icon="el-icon-share"
                      ></el-button>
                    </div>
                  </div>
                  <div class="total_num">
                    <div class="to_num">
                      <span class="number">
                        {{ MainIndicators.apntCashoutAmt }}</span
                      >
                    </div>
                    <div class="total_tit">
                      <div class="subTit">积分支付抵扣金额累计</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="first_con">
                    <div class="mid_con">
                      <el-button
                        type="primary"
                        icon="el-icon-s-shop"
                      ></el-button>
                    </div>
                  </div>
                  <div class="total_num">
                    <div class="to_num">
                      <span class="number"> {{ MainIndicators.thatCnt }}</span>
                    </div>
                    <div class="total_tit">
                      <div class="subTit">本周新增积分用户数</div>
                      <div class="lastWeek">
                        上周：{{ MainIndicators.lastCnt }}
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <IntegralMidBox
              :salesData="salesData"
              :mapData="mapData"
              v-if="flag"
            />
          </div>
          <div class="right_box">
            <IntegralRightBox
              :topConfig="topConfig"
              :midConfig="midConfig"
              :bomConfig="bomConfig"
              :orderData="orderData"
              :jhshIntegralData="jhshIntegralData"
              v-if="flag"
            />
          </div>
        </div>
      </dv-border-box-8>
    </div>
  </div>
</template>

<script>
import drawMixin from "../utils/drawMixin";
import Head from "@/components/header/Head.vue";
import IntegralLeftBox from "@/components/content/IntegralLeftBox.vue";
import IntegralRightBox from "@/components/content/IntegralRightBox.vue";
import IntegralMidBox from "@/components/content/IntegralMidBox.vue";

import {
  getRegApntCustNumList,
  getApntDealUserNumList,
  getApntPayAmtList,
  getApntCashoutAmtList,
  getRegApntCustNum,
  getApntDealUserNum,
  getApntCashoutAmt,
  getApntNewUserNum,
  getSignMctNumRank,
  getOrgCashoutOrderNumRank,
  getMctCashoutOrderNumRank,
  getApntRatioStat,
  getCashoutOrderRank,
} from "../request/httpApi";
// /jkdp/apnt/signMctNumRank  一级行本周签约商户数

export default {
  components: {
    Head,
    IntegralLeftBox,
    IntegralRightBox,
    IntegralMidBox,
  },
  mixins: [drawMixin],
  name: "HelloWorld",
  props: {},
  data() {
    return {
      intergralTie: "建行生活积分数据大屏",
      flag: false, //渲染子组件
      loading: true,
      loadTimer: null,
      resd: [],
      realVal: 0,
      MainIndicators: {
        // 主要指标 默认数据
        regApntCustNum: "0",
        apntDealUserNum: "0",
        apntCashoutAmt: "0",
        thatCnt: "0",
        lastCnt: "0",
      },

      InteAllCnt: {
        //  建行生活积分用户累计数折线
        Cnt: [], //数据
        Date: [], //日期数据
        Id: "one", //组件id
        text: "用户数", //文字描述
        color: "#007aff", //折线颜色
        style: "width: 100%; height:175px", //图形宽高
      },
      InteTransaction: {
        //  建行生活积分支付交易累计数折线
        Cnt: [],
        Date: [],
        Id: "two",
        text: "用户数",
        color: "#007aff",
        style: "width: 100%; height:175px",
      },
      InteOrder: {
        //  积分支付订单额折线
        Cnt: [],
        Date: [],
        Id: "three",
        text: "订单额",
        color: "#007aff",
        style: "width: 100%; height:175px",
      },
      InteDeduction: {
        // 积分抵扣金额折线
        Cnt: [],
        Date: [],
        Id: "four",
        text: "抵扣金额",
        color: "#ee345f",
        style: "width: 100%; height:175px",
      },
      salesData: {
        //城市生活积分支付最新数据(列表)
        header: ["省份", "笔数", "抵扣金额", ""], //表头
        headerBGC: "#003b51", //表头和第排序的背景
        data: [],
        rowNum: 15,
        carousel: "page",
        index: true, //显示行号
        align: ["left", "left", "left", "left"],
        indexHeader: "排名", //表头
        waitTime: 10000, //翻页时间
        columnWidth: [130, 240, 200, 220, 0],
      },
      //  一级行本周签约商户数
      topConfig: {
        name: [],
        result: [],
        id: "barOne",
      },
      //  一级行本周订单笔数
      midConfig: {
        name: [],
        result: [],
        id: "barTwo",
      },
      // 商户本周订单笔数
      bomConfig: {
        name: [],
        result: [],
        id: "barThree",
      },
      // 占比
      orderData: {
        ratio: 0,
        id: "pieOne",
      },

      jhshIntegralData: {
        ratio: 0,
        id: "pieThree",
      },

      mapData: {
        //地图数据
        mapArr: [],
        title: "城市生活积分支付最新数据",
      },
    };
  },
  mounted() {
    this.cancelLoading();
  },
  filters: {
    //过滤数据
    numFilter(val) {
      return (parseFloat(val) * 100).toFixed(1);
    },
  },
  created() {
    if (this.$route.params.pid == "236") {
      // 请求数据
      this.getJ();
    } else {
      this.$message({
        message: "请从首页输入正确密码进入",
        type: "warning",
      });
    }
  },
  methods: {
    // 地图测试数据
    randomData() {
      return Math.round(Math.random() * 500);
    },
    getShishi() {
      //
    },
    //
    sortData(attr) {
      return function (a, b) {
        return b[attr] - a[attr];
      };
    },
    //
    sortListData(attr) {
      return function (a, b) {
        return a[attr] - b[attr];
      };
    },
    getJ() {
      // 积分用户数折线
      let p1 = new Promise((resolve, reject) => {
        getRegApntCustNumList()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      // 积分支付用户数折线
      let p2 = new Promise((resolve, reject) => {
        getApntDealUserNumList()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      // 支付订单额折线
      let p3 = new Promise((resolve, reject) => {
        getApntPayAmtList()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      // 积分支付抵扣额折线
      let p4 = new Promise((resolve, reject) => {
        getApntCashoutAmtList()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });

      //积分用户累计数
      let p5 = new Promise((resolve, reject) => {
        getRegApntCustNum()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      // 积分支付交易用户数
      let p6 = new Promise((resolve, reject) => {
        getApntDealUserNum()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      // 积分支付抵扣金额累计
      let p7 = new Promise((resolve, reject) => {
        getApntCashoutAmt()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      // 一周新增积分用户数
      let p8 = new Promise((resolve, reject) => {
        getApntNewUserNum()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      // 一级行本周签约商户数
      let p9 = new Promise((resolve, reject) => {
        getSignMctNumRank()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      // 一级行本周订单笔数
      let p10 = new Promise((resolve, reject) => {
        getOrgCashoutOrderNumRank()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      // 商户本周订单笔数
      let p11 = new Promise((resolve, reject) => {
        getMctCashoutOrderNumRank()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      // 积分支付占比
      let p12 = new Promise((resolve, reject) => {
        getApntRatioStat()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      // 城市生活积分支付最新数据(列表)
      let p13 = new Promise((resolve, reject) => {
        getCashoutOrderRank({ orgLv: "1", parentOrg: "" })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });

      Promise.all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13])
        .then((res) => {
          //
          console.log(res);
          //  InteAllCnt
          //  积分用户累计数折线
          this.InteAllCnt.Cnt = [];
          this.InteAllCnt.Date = [];
          if (res[0]) {
            let RegApntCust = res[0];
            RegApntCust.map((item) => {
              this.InteAllCnt.Cnt.push(Number(Number(item.result).toFixed()));
              this.InteAllCnt.Date.push(item.statDate);
            });
          } else {
            console.log("积分用户累计数折线 InteAllCnt lose!");
          }

          //  InteTransaction
          //  积分支付用户数折线
          this.InteTransaction.Cnt = [];
          this.InteTransaction.Date = [];
          if (res[1]) {
            let apntDealUser = res[1];
            apntDealUser.map((item) => {
              this.InteTransaction.Cnt.push(
                Number(Number(item.result).toFixed())
              );
              this.InteTransaction.Date.push(item.statDate);
            });
          } else {
            console.log("积分支付用户数折线 InteTransaction lose!");
          }

          //  InteOrder
          //  积分支付订单额折线
          this.InteOrder.Cnt = [];
          this.InteOrder.Date = [];
          if (res[2]) {
            let apntPayAmtList = res[2];
            apntPayAmtList.map((item) => {
              this.InteOrder.Cnt.push(Number(Number(item.result).toFixed()));
              this.InteOrder.Date.push(item.statDate);
            });
          } else {
            console.log("积分支付订单额折线 InteOrder lose!");
          }

          //  InteOrder
          //  积分抵扣金额折线
          this.InteDeduction.Cnt = [];
          this.InteDeduction.Date = [];
          let apntCashoutAmtList = res[3];
          apntCashoutAmtList.map((item) => {
            this.InteDeduction.Cnt.push(Number(Number(item.result).toFixed()));
            this.InteDeduction.Date.push(item.statDate);
          });
          // 中间主要数据
          this.MainIndicators.regApntCustNum = "0";
          this.MainIndicators.regApntCustNum = Number(
            Number(res[4].result).toFixed()
          ).toLocaleString("en-US"); //使用千分符
          this.MainIndicators.apntDealUserNum = "0";
          this.MainIndicators.apntDealUserNum = Number(
            Number(res[5].result).toFixed()
          ).toLocaleString("en-US"); //使用千分符
          this.MainIndicators.apntCashoutAmt = "0";
          this.MainIndicators.apntCashoutAmt = Number(
            Number(res[6].result).toFixed()
          ).toLocaleString("en-US"); //使用千分符

          if (res[7][0]) {
            this.MainIndicators.thatCnt = "0";
            this.MainIndicators.thatCnt = Number(
              Number(res[7][0].result).toFixed()
            ).toLocaleString("en-US"); //使用千分符
          } else {
            console.log("this.MainIndicators1,err!");
          }
          if (res[7][1]) {
            this.MainIndicators.lastCnt = "0";
            this.MainIndicators.lastCnt = Number(
              Number(res[7][1].result).toFixed()
            ).toLocaleString("en-US"); //使用千分符
          } else {
            console.log("this.MainIndicators2,err!");
          }

          // console.log("   this.MainIndicators", this.MainIndicators);
          // 一级行本周签约商户数
          this.topConfig.name = [];
          this.topConfig.result = [];

          if (res[8]) {
            let signMctNumRank = [];
            signMctNumRank = res[8].sort(this.sortData("result")).slice(0, 5);
            signMctNumRank.map((item) => {
              this.topConfig.name.push(item.orgName);
              this.topConfig.result.push(Number(item.result));
            });
            this.topConfig.name.reverse();
            this.topConfig.result.reverse();
          }

          // 一级行本周订单笔数
          this.midConfig.name = [];
          this.midConfig.result = [];
          if (res[9]) {
            let orgCashoutOrderNumRank = [];
            orgCashoutOrderNumRank = res[9]
              .sort(this.sortData("result"))
              .slice(0, 5);
            orgCashoutOrderNumRank.map((item) => {
              this.midConfig.name.push(item.orgName);
              this.midConfig.result.push(Number(item.result));
            });
            this.midConfig.name.reverse();
            this.midConfig.result.reverse();
          }

          // 商户行本周订单笔数
          this.bomConfig.name = [];
          this.bomConfig.result = [];
          if (res[10]) {
            let mctCashoutOrderNumRank = [];
            mctCashoutOrderNumRank = res[10]
              .sort(this.sortData("result"))
              .slice(0, 5);
            mctCashoutOrderNumRank.map((item) => {
              this.bomConfig.name.push(item.mctNm);
              this.bomConfig.result.push(Number(item.result));
            });
            this.bomConfig.name.reverse();
            this.bomConfig.result.reverse();
          }

          // 占比
          if (res[11]) {
            let pieRatio = {};
            pieRatio = res[11];

            this.orderData.ratio = 0;
            this.orderData.ratio = (
              Number(pieRatio.apntCashoutOrderRatio) * 100
            ).toFixed();

            this.jhshIntegralData.ratio = 0;
            this.jhshIntegralData.ratio = (
              Number(pieRatio.apntUserRatio) * 100
            ).toFixed();
          } else {
            console.log("占比 pieRatio lose!");
          }
          // 城市生活积分支付最新数据(列表)
          this.salesData.data = [];
          this.mapData.mapArr = [];
          if (res[12]) {
            let midBarData = [];
            midBarData = res[12].sort(this.sortListData("orderRank"));
            midBarData.map((items) => {
              this.salesData.data.push([
                items.orgName,
                // 订单笔数
                Number(
                  Number(items.apntCashoutOrderNum).toFixed()
                ).toLocaleString("en-US"),
                // 抵扣金额
                Number(Number(items.apntCashoutAmt).toFixed()).toLocaleString(
                  "en-US"
                ),

                `<span style=" display: none;">${items.orgId}</span>`,
              ]);
            });
            // 城市生活积分支付最新数据（地图）按抵扣金额显示颜色value

            let FenUserMap = [];
            FenUserMap = res[12];
            this.mapData.mapArr = FenUserMap.map((item) => ({
              name: item.regionName,
              // value: Number(Number(item.apntCashoutOrderNum).toFixed()),
              // 抵扣金额
              value: Number(Number(item.apntCashoutAmt).toFixed()),
              // 订单笔数
              orderAmt: Number(Number(item.apntCashoutOrderNum).toFixed()),
              orgId: item.orgId,
            }));
            this.mapData.mapArr.push(
              {
                name: "南海诸岛",
                value: 0,
                // itemStyle: { opacity: 0, label: { show: false } },
              },
              {
                name: "台湾省",
                value: 0,
              }
            );
          } else {
            console.log("中间 salesData mapData lose!");
          }
          this.flag = true; //子组件渲染
        })
        .catch((err) => {
          console.log(err);
        });
    },

    cancelLoading() {
      if (!this.loadTimer) {
        this.loadTimer = setTimeout(() => {
          this.loading = false;
        }, 500);
      } else {
        clearTimeout(this.loadTimer);
      }
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
  destroyed() {},
};
</script>

<style scoped lang="less" scoped>
#index {
  width: 2048px;
  height: 1024px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left top;
  overflow: hidden;
  box-sizing: border-box;

  .bgc {
    background-image: url("../assets/pageBg.png");
    background-size: cover;
    background-position: center center;
    width: 100%;
    height: 100%;

    .contanier {
      width: 100%;
      height: calc(100% - 55px);
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      .left_box {
        flex: 1;
        padding: 0 20px;
        .week_trend {
          background-color: rgba(201, 197, 197, 0.1);
          border-radius: 15px;
          margin: 22px 0;
          height: 280px;
          padding: 10px;
          box-sizing: border-box;
          .title {
            height: 40px;
            line-height: 40px;
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            color: rgb(185, 200, 248);
          }
        }
      }
      .mid_box {
        flex: 2.5;

        .line_box {
          // padding: 20px;
          display: flex;
          justify-content: space-between;
          .lBox {
            // background: #fff;
          }
          .rBox {
            margin-left: 10px;
            .sales_box {
              margin-top: 10px;
              display: flex;
              justify-content: space-between;
              div {
                &:first-child {
                  margin-right: 10px;
                }
              }
            }
          }
        }
        .mid_title {
          ul {
            overflow: hidden;
            height: 100px;
            margin: 10px 0;
            display: flex;
            justify-content: space-between;

            li {
              display: flex;
              justify-content: space-between;
              width: 260px;
              padding: 3px;
              box-sizing: border-box;
              .first_con {
                margin-top: 23px;
                /deep/ .el-button {
                  font-size: 36px !important;
                  padding: 8px 12px !important;
                }
              }
              .total_num {
                flex: 1.5;
                margin-left: 15px;
                color: #fff;
                .to_num {
                  height: 48px;
                  line-height: 48px;
                  font-weight: bold;

                  margin-top: 5px;
                  .number {
                    font-size: 28px;
                  }
                }
                .total_tit {
                  margin-top: 5px;
                  font-size: 18px;
                  // margin-bottom: 0;
                  .subTit {
                    // &:first-child {
                    font-size: 16px;
                    line-height: 18px;
                  }
                  .lastWeek {
                    font-size: 12px;
                    text-align: right;
                    margin-top: 5px;
                  }
                }
              }
            }
          }
        }
      }
      .right_box {
        margin: 0 20px;
        flex: 1;
        color: rgb(185, 200, 248);
      }
    }
  }
}
</style>
