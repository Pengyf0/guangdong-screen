<template>
  <div :id="piedata.id" style="width: 100%; height: 100%"></div>
</template>

<script>
export default {
  data() {
    return {
      options: {},
      chart: null,
    };
  },
  props: {
    piedata: {
      type: Object,
      default: () => ({}),
    },
   
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      // 初始化echart
      this.chart = this.$echarts.init(
        document.getElementById(this.piedata.id),
        null,
        {
          renderer: "svg",
        }
      );
      this.draw();
    },
    draw() {
      this.chart.setOption(
        {
          series: [
            {
              type: "pie",
              radius: ["28", "32"],
              center: ["50%", "50%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center",
              },
              labelLine: {
                show: false,
              },
              data: [
                {
                  value: this.piedata.ratio, //数据 按比例显示的
                  selected: false,
                  itemStyle: {
                    //图形颜色
                    color: this.$echarts.graphic.LinearGradient(
                      1,
                      1,
                      1,
                      0, //(上-下 渐变)

                      [
                        { offset: 0, color: "#F7BD27" },

                        { offset: 1, color: "#FFF6CB" },
                      ],
                      false
                    ),

                    borderWidth: 2,
                    // borderRadius: 25,
                  },
                  label: {
                    // 是显示标签
                    color: "#C0C0BF ",
                    show: true,
                    position: "center",
                    fontSize: 18,
                    fontFamily: "Arial",
                    shadowColor: "transparent", //去掉文字阴影
                    // 标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行
                    formatter: "{d}%",
                  },
                },
                {
                  value: 100 - this.piedata.ratio, //数据 按比例显示的
                  name: "",
                  itemStyle: {
                    color: "rgba(192, 192, 191,.1) ", //剩余图形颜色
                  },
                  label: {
                    show: false,
                  },
                },
              ],
            },
          ],
        },
        true
      );
    },
  },
  watch: {
    piedata: {
      handler() {
        this.draw();
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped></style>
