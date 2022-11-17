<template>
  <div id="index" ref="appRef">
    <div class="bgc">
      <dv-border-box-8 :dur="30">
        <dv-loading v-if="loading">Loading...</dv-loading>
        <Head :viewTitle="operateTie"> </Head>
        <dv-decoration-5 style="width: 100%; height: 40px" :dur="30" />
        <div class="contanier">
          <div class="left_box">
            <OperateLeftBox
              :UserAllCnt="UserAllCnt"
              :UserActvCnt="UserActvCnt"
              :RealTimeIndex="RealTimeIndex"
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
                      <span> {{ MainIndicators.userAllCnt }}</span>
                    </div>
                    <div class="total_tit">
                      <span>累计注册</span>
                      <span> 昨日: {{ MainIndicators.userNewCnt }}</span>
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
                      <span> {{ MainIndicators.userDailyActvCnt }}</span>
                    </div>
                    <div class="total_tit">
                      <span>日活</span>
                      <span>
                        日活率:
                        {{
                          Number(MainIndicators.userDailyActvRatio) | numFilter
                        }}%</span
                      >
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
                      <span> {{ MainIndicators.userMonthlyActvCnt }}</span>
                    </div>
                    <div class="total_tit">
                      <span>月活</span>
                      <span>
                        月活率:
                        {{
                          Number(MainIndicators.userMonthlyActvRatio)
                            | numFilter
                        }}%</span
                      >
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
                      <span> {{ MainIndicators.mctAllCnt }}</span>
                    </div>
                    <div class="total_tit">累计商户</div>
                  </div>
                </li>
              </ul>
            </div>
            <MidBox :salesData="salesData" :mapData="mapData" v-if="flag" />
          </div>
          <div class="right_box">
            <RightBox
              :topConfig="topConfig"
              :midConfig="midConfig"
              :bomConfig="bomConfig"
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
import OperateLeftBox from "@/components/content/OperateLeftBox.vue";
import RightBox from "@/components/content/RightBox.vue";
import MidBox from "@/components/content/MidBox.vue";
//  /mcpbd-data/data/realTimeIndex
// export const getRealTimeIndex
import {
  getMainIndex,
  getUserAllCnt,
  getUserActvCnt,
  getRegionUserAllCnt,
  getRegionUserActvDailyCnt,
  getRegionUserNewCnt,
  getRegionIndex,
  getProvinceIndex,
  getRealTimeIndex,
} from "../request/httpApi";

export default {
  components: {
    Head,
    OperateLeftBox,
    RightBox,
    MidBox,
  },
  mixins: [drawMixin],
  name: "HelloWorld",
  props: {},
  data() {
    return {
      operateTie: "建行生活平台运营数据速览",
      flag: false, //渲染子组件
      loading: true,
      loadTimer: null,
      resd: [],
      realVal: 0,
      MainIndicators: {
        // 主要指标 默认数据
        userAllCnt: "",
        userNewCnt: "",
        userDailyActvCnt: "",
        userDailyActvRatio: "",
        userMonthlyActvCnt: "",
        userMonthlyActvRatio: "",
        mctAllCnt: "",
      },

      //累计注册用户数折线
      UserAllCnt: {
        Cnt: [],
        Date: [],
        Id: "OperateLineOne",
        text: "用户数", //文字描述
        color: "#007aff", //折线颜色
        style: "width: 100%; height:220px", //图形宽高
      },
      //日活用户折线
      UserActvCnt: {
        Cnt: [],
        Date: [],
        Id: "OperateLineTwo",
        text: "用户数", //文字描述
        color: "#80FFA5", //折线颜色
        style: "width: 100%; height:220px", //图形宽高
      },
      // 当日新增注册折线
      RealTimeIndex: {
        Cnt: [],
        Date: [],
        Id: "OperateLineThree",
        text: "用户数", //文字描述
        color: "#fe6e5f", //折线颜色
        style: "width: 100%; height:220px", //图形宽高
      },
      salesData: {
        //中间右边数据
        header: ["城市", "累计注册", "昨日日活"], //表头
        headerBGC: "#003b51", //表头和第排序的背景
        data: [],
        rowNum: 15,
        carousel: "page",
        index: true, //显示行号
        align: ["center", "center", "right", "right"],
        indexHeader: "排名", //表头
        waitTime: 10000, //翻页时间
        columnWidth: [100],
      },
      topConfig: {
        name: [],
        userCnt: [],
      },
      midConfig: {
        name: [],
        userCnt: [],
      },
      bomConfig: {
        name: [],
        userCnt: [],
      },

      mapData: {
        //地图数据
        mapArr: [],
        tltle: "平台运营实时数据",
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
    console.log(this.$route.params.pid);
    if (this.$route.params.pid == "227") {
      // console.log(this.$route.params.pid, "进来了");
      this.getRouterPa();
    } else {
      this.$message({
        message: "请从首页输入正确密码进入",
        type: "warning",
      });
    }
  },
  methods: {
    getRouterPa() {
      this.getJ();
      this.getShishi();
      // 实时更新数据（隔一个小时请求数据）
      setInterval(() => {
        this.getJ();
      }, 3600000);
      // 右下角数据实时更新（1分钟）
      setInterval(() => {
        this.getShishi();
      }, 60000);
    },
    getShishi() {
      //
      getRealTimeIndex()
        .then((res) => {
          this.RealTimeIndex.Cnt = [];
          this.RealTimeIndex.Date = [];
          this.resd = res;
          this.resd.forEach((item) => {
            this.RealTimeIndex.Cnt.push(item.userAllCnt),
              this.RealTimeIndex.Date.push(item.calTime);
            this.RealTimeIndex.num = ++this.RealTimeIndex.num;
          });
        })
        .catch((err) => {
          return;
        });
    },
    sortData(attr) {
      return function (a, b) {
        return b[attr] - a[attr];
      };
    },
    getJ() {
      // 累计注册用户
      let p1 = new Promise((resolve, reject) => {
        getUserAllCnt()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });

      // 日活用户
      let p2 = new Promise((resolve, reject) => {
        getUserActvCnt()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      // 分行累计用户数
      let p3 = new Promise((resolve, reject) => {
        getRegionUserAllCnt()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      // 分行日活用户数
      let p4 = new Promise((resolve, reject) => {
        getRegionUserActvDailyCnt()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });

      // 分行新增用户数
      let p5 = new Promise((resolve, reject) => {
        getRegionUserNewCnt()
          .then((res) => {
            // console.log(res,898);

            setTimeout(() => {
              resolve(res);
            }, 500);
          })
          .catch((err) => {
            reject(err);
          });
      });
      // 分行指标排行表
      let p6 = new Promise((resolve, reject) => {
        getRegionIndex()
          .then((res) => {
            setTimeout(() => {
              resolve(res);
            }, 600);
          })
          .catch((err) => {
            reject(err);
          });
      });

      // 主要指标
      let p7 = new Promise((resolve, reject) => {
        getMainIndex()
          .then((res) => {
            setTimeout(() => {
              resolve(res);
            }, 700);
          })
          .catch((err) => {
            reject(err);
          });
      });
      // 地图数据省份
      let p8 = new Promise((resolve, reject) => {
        getProvinceIndex()
          .then((res) => {
            setTimeout(() => {
              resolve(res);
            }, 800);
          })
          .catch((err) => {
            reject(err);
          });
      });

      Promise.all([p1, p2, p3, p4, p5, p6, p7, p8])
        .then((res) => {
          console.log(res);
          // 累计注册用户
          this.UserAllCnt.Cnt = [];
          this.UserAllCnt.Date = [];
          res[0].map((item) => {
            this.UserAllCnt.Cnt.push(
              // Number((Number(item.userCnt) * 0.0001).toFixed())
              Number(Number(item.userCnt).toFixed())
            );
            this.UserAllCnt.Date.push(item.calDate);
          });

          // 日活用户趋势
          this.UserActvCnt.Cnt = [];
          this.UserActvCnt.Date = [];
          res[1].map((item) => {
            this.UserActvCnt.Cnt.push(Number(Number(item.userCnt).toFixed()));
            this.UserActvCnt.Date.push(item.calDate);
          });

          // 分行累计用户数 (只展示前5条数据)
          this.topConfig.name = [];
          this.topConfig.userCnt = [];
          let FenUserNum = res[2].sort(this.sortData("userCnt")).slice(0, 5);
          FenUserNum.map((item) => {
            this.topConfig.name.push(item.regionName);
            this.topConfig.userCnt.push(Number(item.userCnt));
          });
          this.topConfig.name.reverse();
          this.topConfig.userCnt.reverse();

          // 分行日活用户数
          this.midConfig.name = [];
          this.midConfig.userCnt = [];
          let FenUserActvNum = res[3]
            .sort(this.sortData("userCnt"))
            .slice(0, 5);
          FenUserActvNum.map((item) => {
            this.midConfig.name.push(item.regionName);
            this.midConfig.userCnt.push(Number(item.userCnt));
          });
          this.midConfig.name.reverse();
          this.midConfig.userCnt.reverse();

          // 分行新增用户数
          this.bomConfig.name = [];
          this.bomConfig.userCnt = [];
          let FenUserNewNum = res[4].sort(this.sortData("userCnt")).slice(0, 5);
          FenUserNewNum.map((item) => {
            this.bomConfig.name.push(item.regionName);
            this.bomConfig.userCnt.push(Number(item.userCnt));
          });
          this.bomConfig.name.reverse();
          this.bomConfig.userCnt.reverse();

          // 分行指标排行表
          let FenUserSortNum = res[5].sort(this.sortData("userAllCnt"));
          this.salesData.data = FenUserSortNum.map((item) => [
            item.regionName,
            Number(item.userAllCnt).toLocaleString("en-US"),
            Number((item.userActvDailyRatio * 100).toFixed(1)) + "%",
          ]);

          // 主要指标
          let mainIndex = res[6];
          this.MainIndicators.userAllCnt = Number(
            mainIndex.userAllCnt
          ).toLocaleString("en-US"); //使用千分符
          this.MainIndicators.userNewCnt = Number(
            mainIndex.userNewCnt
          ).toLocaleString("en-US");
          this.MainIndicators.userDailyActvCnt = Number(
            mainIndex.userDailyActvCnt
          ).toLocaleString("en-US");
          this.MainIndicators.userDailyActvRatio = mainIndex.userDailyActvRatio;
          this.MainIndicators.userMonthlyActvCnt = Number(
            mainIndex.userMonthlyActvCnt
          ).toLocaleString("en-US");
          this.MainIndicators.userMonthlyActvRatio =
            mainIndex.userMonthlyActvRatio;
          this.MainIndicators.mctAllCnt = Number(
            mainIndex.mctAllCnt
          ).toLocaleString("en-US");

          //  地图省份指标
          let FenUserMap = res[7];
          this.mapData.mapArr = FenUserMap.map((item) => ({
            name: item.regionName,
            value: Number(item.userAllCnt).toFixed(),
            ratio: (Number(item.userActvDailyRatio) * 100).toFixed(1),
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
          // .lBox {
          //   // background: #fff;
          // }
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
                  font-size: 28px;
                  margin-top: 5px;
                }
                .total_tit {
                  display: flex;
                  justify-content: space-between;
                  margin-top: 10px;
                  font-size: 18px;
                  // margin-bottom: 0;
                  span {
                    &:first-child {
                      font-size: 18px;
                      line-height: 18px;
                    }
                    &:last-child {
                      font-size: 14px;
                      line-height: 18px;
                      margin-top: 2px;
                    }
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
