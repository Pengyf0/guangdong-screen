<template>
  <div id="bar2" style="width: 100%; height: 220px"></div>
</template>

<script>
export default {
  data() {
    return {
      options: {},
      chartOne: null,
    };
  },
  props: {
    midData: {
      type: Object,
      default: () => ({}),
      // 累计用户数量
    },
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
  
      // 初始化echart
      this.chartOne = this.$echarts.init(document.getElementById("bar2"), null, {renderer: 'svg'});
      this.draw();
    },
    draw() {
      this.chartOne.setOption(
        {
          color: ["#ffdb5c", "#9fe6b8", "#67e0e3", "#32c5e9", "#37a2da"],
           tooltip: {
            show: false,
          },
          grid: {
            left: "20%",
            right: "20%",
            bottom: "15%",
            top: "15%",
          },
          xAxis: {
            type: "value",
            boundaryGap: [0, 0.01],
            show: false,
          },
          yAxis: {
            axisLine: {
              // 坐标轴 轴线
              show: false, // 是否显示
            },
            axisTick: {
              //是否显示坐标断线
              show: false,
            },
            axisLabel: {
              color: "#fff", //显示文字
               fontSize: 14, //数据文字大小
                fontWeight: 500,
            },
            // show:false,
            type: "category",
            data: this.midData.name,
          },
          series: [
            {
              name: "2012",
              type: "bar",
              data: this.midData.userCnt,
              colorBy: "data", //按数据变色
              barWidth: "28%", //图形宽度
              showBackground: true,
              backgroundStyle: {
                shadowColor: "#333",
                shadowBlur: 3,
                borderColor: "#333",
                color: "#000",
                // opacity: 0.1,
                borderType: "solid",
                borderWidth: 1,
                borderRadius: [20, 20, 20, 20],
              },
              barCategoryGap: "40%", // 柱形的间距
              itemStyle: {
                // 图形的形状
                borderRadius: [20, 20, 20, 20],
              },
              label: {
                show: true,
                position: "outside", //数据显示位置，默认显示在中间
                color: "#fff", //数据文字颜色
                fontSize: 14, //数据文字大小
                fontWeight: 500,
                formatter: function (p) {
                  let value = "";
                  if (p.value > 0) {
                    value = p.value;
                    if (value > 999) {
                      // 数值加千分号
                      let parts = value.toString().split(".");
                      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      value = parts.join(".");
                    }
                  }
                  return value;
                },
              },
            },
          ],
        },
        true
      );
    },
  },
  watch: {
    adata: {
      handler() {
        this.draw();
      },

      deep: true,
    },
  },
};
</script>

<style lang="less" scoped></style>
