<template>
  <div
    id="integralmap"
    :style="{
      width: '700px',
      height: '730px',
      marginTop: '10px',
    }"
  ></div>
</template>

<script>
import china from "@/assets/json/china.json";
export default {
  mounted() {
    console.log("this.mapData", this.mapData);
    this.$nextTick(function () {
      this.initChart(this.mapData);
    });
  },

  props: {
    mapData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      options: {},
      chart: null,
    };
  },
  methods: {
    // 地图
    initChart(data) {
      this.$echarts.registerMap("china", china);

      this.chart = this.$echarts.init(
        document.getElementById("integralmap"),
        null,
        {
          renderer: "svg",
        }
      );
      this.drawMap(data);
      let _this = this;
      this.chart.on("click", function (params) {
        // 点击地图区域
        console.log("地图区域点击事件", params.data.orgId);
        _this.$bus.$emit("changListSecondEvent", params.data.orgId);
      });

      this.chart.getZr().on("click", function (event) {
        // 点击空白区域
        if (!event.target) {
          console.log("地图外点击事件");
          _this.$bus.$emit("changListFirstEvent", "");
        }
      });
    },
    drawMap(data) {
      this.option = {
        title: {
          text: data.title,
          textStyle: {
            color: "#fff",
            fontSize: 28,
          },
        },

        tooltip: {
          show: true,
          trigger: "item",
          formatter: function (a, b) {
            // 地区名称
            let a1 = a["name"];
            if ((a1 == "台湾省" && !a2) || (a1 == "南海诸岛" && !a2)) {
              return `${a1}<br/> 暂无数据`;
            }
            // 将订单笔数改千分位
            let a2 = "";
            let olda = "";
            olda = Number(a["data"].value);

            if (olda >= 0) {
              a2 = olda;
              if (olda > 999) {
                let parts = olda.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                a2 = parts.join(".");
              }
            }
            // 支付金额
            let a3 = "";
            let apntNum = Number(a["data"].orderAmt);

            if (apntNum >= 0) {
              a3 = apntNum;
              if (apntNum > 999) {
                let aplay = apntNum.toString().split(".");
                aplay[0] = aplay[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                a3 = aplay.join(".");
              }
            }
            // 地区编码
            // let a4 = "";
            // let regionId = String(a["data"].orgId);
            // a4 = regionId;

            return `${a1} <br/>订单笔数: ${a3}<br/>抵扣金额: ${a2} `;
            // return `${a1} <br/>订单笔数: ${a3}<br/>抵扣金额: ${a2} <br/> ID:${a4}`;
          },
        },

        series: [
          {
            type: "map",
            map: "china",
            top: "150",
            zoom: 1.3,
            emphasis: {
              label: { show: false },
              itemStyle: {
                areaColor: "rgba(136, 132, 216)",
              },
            },
            itemStyle: {
              borderColor: "#fff",
            },
            data: data.mapArr, //有数据才显示颜色
          },
        ],

        visualMap: {
          show: true,
          type: "continuous",
          calculable: true,
          orient: "horizontal",
          textStyle: {
            color: "#fff",
            // fontWeight:700,
          },
          min: 0,
          max: 80000,
          // min: (value) => {
          //   return value.min;
          // },
          // max: (value) => {
          //   return value.max;
          // },

          text: ["抵扣金额", ""],
          color: ["#df3d20", "#fff"],
          inRange: {
            // color: [ "#fff","#44effb", "#3399ff","#2b8afe", "#006699"],
            color: ["#44effb", "#3399ff", "#2b8afe", "#006699"],
          },
        },
      };
      this.chart.setOption(this.option, true);
    },
  },

  watch: {
    mapData: {
      handler() {
        this.$nextTick(function () {
          this.initChart(this.mapData);
        });
      },
      deep: true,
    },
  },
};
</script>

<style></style>
