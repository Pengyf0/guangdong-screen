<template>
  <div>
    <section class="midContent">
      <div class="mid1">
        <div class="midTit"></div>
        <div class="contTop">
          <div>
            <span>新增用户</span><br />
            <span class="mid1Num">{{ obj1.newMebCnt.value }}</span
            ><span class="unit">人</span><br />
            <span class="mid1Time">{{
              obj1.newMebCnt.date ?? "2022-11-16"
            }}</span>
          </div>
          <div>
            <span>活跃用户</span><br />
            <span class="mid1Num">{{ obj1.actMebCnt.value }}</span
            ><span class="unit">人</span><br />
            <span class="mid1Time">{{
              obj1.actMebCnt.date ?? "2022-11-16"
            }}</span>
          </div>
          <div>
            <span>aum20w以上</span><br />
            <span class="mid1Num">{{ obj1.aum20Cnt.value }}</span
            ><span class="unit">%</span><br />
            <span class="mid1Time">{{
              obj1.aum20Cnt.date ?? "2022-11-16"
            }}</span>
          </div>
          <div>
            <span>aum50W以上</span><br />
            <span class="mid1Num">{{ obj1.aum50Cnt.value ?? "0" }}</span
            ><span class="unit">%</span><br />
            <span class="mid1Time">{{
              obj1.aum50Cnt.date ?? "2022-11-16"
            }}</span>
          </div>
        </div>
        <div class="leftBar">
          <myTitle :text="text[1]" :img="img2" />
          <myYaioxBar v-if="barShow" :barObj="regBarData"></myYaioxBar>
        </div>
      </div>
      <div class="mid2">
        <div class="contTop">
          <div class="centReg">累计注册人数（人）</div>
          <div class="centNum">{{ obj1.mebCnt ?? "0" }}</div>
          <ul class="centUser">
            <li>
              累计生活卡用户<span>{{ obj1.lifecardCnt ?? "0" }}</span
              >&nbsp;人
            </li>
            <li>
              累计合作商户<span>{{ obj1.mctCnt ?? "0" }}</span
              >&nbsp;家
            </li>
          </ul>
        </div>
        <div class="midMap">
          <div class="six">全国六地区注册用户（人/日）</div>
          <div class="time">2022-11-16</div>
          <div class="city">
            <myChinaMap :id="'chinaMap'" :sixArr="sixArr"></myChinaMap>
            <!-- <div class="city1">成都 1788</div>
						<div class="city2">北京 1070</div>
						<div class="city3">上海 2933</div>
						<div class="city4">深圳 3505</div>
						<div class="city5">杭州 633</div>
						<div class="city6 active">广州 1210</div> -->
          </div>
        </div>
      </div>
      <div class="mid3">
        <div class="contTop">
          <myTitle :text="text[2]" :img="img1" />
          <my-line :lineObj="lineData"></my-line>
        </div>
        <div class="rightTable">
          <myTable :tableData="tableData"></myTable>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import myLine from "./echartsType/line.vue";
import myTitle from "./title/Title.vue";
import myYaioxBar from "./echartsType/YaioxBar.vue";
import myTable from "./table/scrollTbale.vue";
import myChinaMap from "./echartsType/ChinaMap.vue";
export default {
  props: {
    obj1: {
      type: Object,
      default: () => {},
    },
    obj2: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    myLine,
    myTitle,
    myTable,
    myYaioxBar,
    myChinaMap,
  },
  mounted() {
    this.$nextTick(() => {
      this.regBarData.yAxisData = this.obj2.registArea6?.map(
        (item) => item.city
      );
      this.regBarData.seriesData = this.obj2.registArea6?.map(
        (item) => item.value
      );
      this.tableData = this.obj2.listAum;
      this.lineData.xAxisData = this.obj1.dayLiveRecent12?.map((el) => {
        return el.date.replaceAll("-", "/");
      });
      this.lineData.seriesData = this.obj1.dayLiveRecent12?.map((el) => {
        return el.value;
      });
	  this.sixArr = this.obj2.registAreaMap6
      this.barShow = true;
    });
  },
  data() {
    return {
      img1: require("@/assets/images/user.png"),
      img2: require("@/assets/images/add.png"),
      text: ["近12天日活跃用户", "全国六地区注册累计榜", "近12天日活跃用户"],
      lineData: {
        id: "line3",
        xAxisData: [
          "2022/11/12",
          "2022/11/13",
          "2022/11/14",
          "2022/11/15",
          "2022/11/16",
          "2022/11/17",
          "2022/11/18",
          "2022/11/19",
          "2022/11/20",
          "2022/11/21",
          "2022/11/22",
        ],
        seriesData: [
          128608, 130376, 120842, 117704, 120084, 127877, 127052, 128051,
          132261, 120525, 119876,
        ],
      },
      // 全国六区累计注册
      barShow: false,
      regBarData: {
        id: "bar1",
        yAxisData: ["广州", "北京", "上海", "天津", "重庆", "深圳"],
        seriesData: [1000, 500, 448, 218, 147, 135],
        color: ["#FF9F00", "#FF6200", "#FF6600"],
      },
	   // 全国六区注册用户（人/日）
	  sixArr:[],
      // 左上数据
      leftTopData: {
        addUser: {
          num: 1210,
          time: "2022-11-16",
        },
        actUser: {
          num: 185112,
          time: "2022-11-16",
        },
        twentyW: {
          num: 27.62,
          time: "2022-12-10",
        },
        fifTyW: {
          num: 50.62,
          time: "2022-12-10",
        },
      },
      // 中上累计数据
      cumUserData: {
        cumReg: 1565482,
        cumLife: 22222,
        cumMer: 22542,
      },
      //表格数据
      tableData: [],
    };
  },
};
</script>
<style lang="less" scoped>
@font-face {
  font-family: "DS-Digib";
  src: url("@/assets/font/DIN\ Alternate\ Bold.ttf");
}

.midContent {
  height: 640px;
  padding-top: 10px;
  text-align: center;
  display: flex;
  box-sizing: border-box;

  .mid1 {
    width: 560px;

    .contTop {
      height: 310px;
      padding: 20px 50px;
      display: flex;
      flex-flow: wrap;
      justify-content: space-between;
      box-sizing: border-box;
      background: rgba(34, 34, 34, 0.5);

      div {
        width: 200px;
        height: 120px;
      }

      .mid1Num {
        height: 60px;
        font-size: 48px;
        font-family: DS-Digib;
        font-weight: bold;
        color: #f7bc27;
        line-height: 60px;
      }

      .mid1Time {
        font-size: 14px;
        color: #c0c0bf;
      }

      .unit {
        font-size: 20px;
        color: #f7bc27;
        font-family: DS-Digib;
        font-weight: bold;
      }
    }

    .midTit {
      height: 9px;
      width: 100%;
      background: url(@/assets/images/gztitle.png) no-repeat;
      background-size: 100% 100%;
    }

    .leftBar {
      height: 310px;
      margin-top: 10px;
      background: rgba(34, 34, 34, 0.5);
    }
  }

  .mid2 {
    width: 740px;

    .contTop {
      height: 240px;

      .centReg {
        height: 24px;
        font-size: 24px;
        color: #ffffff;
        line-height: 24px;
        margin-top: 10px;
      }

      .centNum {
        height: 60px;
        font-size: 80px;
        font-family: DS-Digib;
        font-weight: bold;
        color: #ff6600;
        line-height: 60px;
        margin-top: 18px;
      }

      .centUser {
        margin-top: 28px;
        display: flex;
        // justify-content: space-around;

        li {
          flex: 1;
          font-size: 18px;
          color: #c0c0bf;

          span {
            font-size: 36px;
            font-family: DS-Digib;
            font-weight: bold;
            color: #ffffff;
          }
        }
      }
    }

    .midMap {
      height: 390px;

      .six {
        height: 40px;
        line-height: 40px;
        font-size: 24px;
      }

      .time {
        font-size: 20px;
        color: #c0c0bf;
        opacity: 0.5;
      }

      .city {
        height: 320px;
        width: 100%;
        // position: relative;

        // div {
        // 	width: 121px;
        // 	height: 27px;
        // 	position: absolute;
        // 	background: linear-gradient(
        // 		90deg,
        // 		rgba(0, 0, 0, 0) 3%,
        // 		#000000 15%,
        // 		#000000 87%,
        // 		rgba(0, 0, 0, 0) 100%
        // 	);
        // 	border-radius: 0px 0px 0px 0px;
        // 	opacity: 0.7;
        // }

        .active {
          font-size: 20px;
          color: #733b00;
          background: linear-gradient(
            90deg,
            rgba(246, 188, 39, 0) 0%,
            #f7bd27 11%,
            #f7bd27 88%,
            rgba(246, 188, 39, 0) 100%
          );
          opacity: 1;
          font-family: FZLanTingHeiS-B-GB-Regular, FZLanTingHeiS-B-GB;
        }

        .city1 {
          left: 270px;
          top: 95px;
        }

        .city2 {
          left: 440px;
          top: 8px;
        }

        .city3 {
          left: 510px;
          top: 80px;
        }

        .city4 {
          right: 100px;
          bottom: 96px;
        }

        .city5 {
          right: 20px;
          bottom: 170px;
        }

        .city6 {
          left: 408px;
          top: 145px;
        }
      }
    }
  }

  .mid3 {
    width: 560px;

    .contTop {
      height: 240px;
      background: rgba(34, 34, 34, 0.5);
    }

    .rightTable {
      height: 380px;
      margin-top: 10px;
      background: rgba(34, 34, 34, 0.5);
    }
  }
}
</style>