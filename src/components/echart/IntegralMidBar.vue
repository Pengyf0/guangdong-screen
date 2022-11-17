<template>
  <dv-scroll-board
    :hoverPause="false"
    :config="configdata"
    style="width: 450px; height: 700px; margin-top: 20px"
    class="dv-scroll-board"
    @click="barClickEvent"
  />
</template>

<script>
import { getCashoutOrderRank } from "@/request/httpApi";
export default {
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      configdata: {},
      orgLv: "1",
      status: 1, //判断状态属于一级行还是二级行
      orgId: "",
      firstLevenData: {
        //城市生活积分支付最新数据(列表)
        //城市生活积分支付最新数据(列表)
        header: ["省份", "笔数", "抵现金额"], //表头
        headerBGC: "#003b51", //表头和第排序的背景
        data: [],
        rowNum: 15,
        carousel: "page",
        index: true, //显示行号
        align: ["left", "left", "right", "right"],
        indexHeader: "排名", //表头
        waitTime: 10000, //翻页时间
        columnWidth: [120, 200, 160, 180, 0],
      },
      secondLevendata: {
        //城市生活积分支付最新数据(列表)
        header: ["城市", "笔数", "抵现金额"], //表头
        headerBGC: "#003b51", //表头和第排序的背景
        data: [],
        rowNum: 15,
        carousel: "page",
        index: true, //显示行号
        align: ["left", "left", "right", "right"],
        indexHeader: "排名", //表头
        waitTime: 10000, //翻页时间
        columnWidth: [120, 200, 160, 180, 0],
      },
    };
  },
  mounted() {
    // console.log(this.config, this.configdata);
    this.draw();
    this.$bus.$on("changListSecondEvent", (orgId) => {
      //  点击地图区域列表显示二级行
      this.showSecond(orgId);
    });
    this.$bus.$on("changListFirstEvent", () => {
      //  点击地图外区域列表显示一级行
      this.showFirst();
    });
  },
  methods: {
    // 点击列表显示一级行
    showFirst() {
      getCashoutOrderRank({ orgLv: "1", parentOrg: "" })
        .then((res) => {
          console.log("点击事件显示一级行", res);
          this.status = 1;
          let firstData = [];
          firstData = res.sort(this.sortData("orderRank"));
          this.firstLevenData.data = [];
          firstData.map((items) => {
            this.firstLevenData.data.push([
              items.orgName,
              Number(
                Number(items.apntCashoutOrderNum).toFixed()
              ).toLocaleString("en-US"),
              Number(Number(items.apntCashoutAmt).toFixed()).toLocaleString(
                "en-US"
              ),
              `<span style=" display: none;">${items.orgId}</span>`,
            ]);
          });
          console.log("this.firstLevenData", this.firstLevenData);
          this.configdata = { ...this.firstLevenData };
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击列表显示二级行
    showSecond(id) {
      getCashoutOrderRank({ orgLv: "2", parentOrg: id })
        .then((res) => {
          this.status = 2;
          console.log("点击事件显示二级行", res);
          let midBarData = [];
          midBarData = res.sort(this.sortData("orderRank"));
          this.secondLevendata.data = [];
          midBarData.map((items) => {
            this.secondLevendata.data.push([
              items.orgName,
              Number(
                Number(items.apntCashoutOrderNum).toFixed()
              ).toLocaleString("en-US"),
              Number(Number(items.apntCashoutAmt).toFixed()).toLocaleString(
                "en-US"
              ),

              `<span style=" display: none;">${items.orgId}</span>`,
            ]);
          });
          console.log("this.secondLevendata", this.secondLevendata);

          this.configdata = { ...this.secondLevendata };
        })
        .catch((err) => {
          console.log(err);
        });
    },
    draw() {
      // 接收传的数据
      console.log("数据更新");
      this.configdata = { ...this.config };
    },
    sortData(attr) {
      return function (a, b) {
        return a[attr] - b[attr];
      };
    },

    barClickEvent(rowdata) {
      // rowdata .row 行数据
      // console.log(rowdata.row[4]);
      let orgId = "";
      orgId = rowdata.row[4].match(/\d+/g)[0];
      console.log("orgId", orgId);

      console.log(this.configdata);
      //  点击后显示二级数据  orgLv: "2" 表示城市

      if (this.status == 1) {
        // 二级
        this.showSecond(orgId);
        return;
      } else {
        // 一级
        this.showFirst();
        return;
      }
    },
  },
  watch: {
    config: {
      handler() {
        this.draw();
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
.dv-scroll-board {
  .ceil {
    /deep/span {
      background-color: none !important;
    }
  }
}
</style>
