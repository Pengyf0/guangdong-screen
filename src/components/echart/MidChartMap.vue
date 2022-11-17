<template>
  <div
    id="map"
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
    this.initChart();
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
    initChart() {
      this.$echarts.registerMap("china", china);
      this.chart = this.$echarts.init(document.getElementById("map"), null, {
        renderer: "svg",
      });
      this.drawMap();
    },
    drawMap() {
      this.chart.setOption(
        {
          title: {
          
            text: this.mapData.title,
            textStyle: {
              color: "#fff",
              fontSize: 28,
            },
          },

          tooltip: {
            show: true,
            trigger: "item",
            formatter: function (a, b) {
              // 将注册人数改千分位
              let a2 = "";
              let olda = Number(a["data"].value);

              if (olda >= 0) {
                a2 = olda;
                if (olda > 999) {
                  let parts = olda.toString().split(".");
                  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  a2 = parts.join(".");
                }
              }
              // 日活兼容
              let a3 = a["data"].ratio ? a["data"].ratio : 0;
              let a1 = a["name"];
              if (a1 == "台湾省" && !a2|| (a1 == "南海诸岛" && !a2)) {
                return `${a1}<br/> 暂无数据`;
              }

              return `${a1}<br/>累计注册: ${a2}  <br/>日活: ${a3} %`;
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
              data: this.mapData.mapArr, //有数据才显示颜色
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
            max: 10000000,
            text: ["累计注册/人", ""],
            color: ["#df3d20", "#fff"],
            inRange: {
              // color: [ "#fff","#44effb", "#3399ff","#2b8afe", "#006699"],
              color: ["#44effb", "#3399ff", "#2b8afe", "#006699"],
            },
          },
        },
        true
      );
    },
  },

  watch: {
    mapData: {
      handler() {
        this.drawMap();
      },
      deep: true,
    },
  },
};
</script>

<style></style>
