<template>
  <div :id="adata.Id" :style="adata.style"></div>
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
    adata: {
      type: Object,
    },
   
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      // 初始化echart
      this.chartOne = this.$echarts.init(document.getElementById(this.adata.Id), null, {renderer: 'svg'});
      this.draw();
    },
    draw() {

      this.chartOne.setOption(
        {
          color: [this.adata.color], //圆圈的颜色
          tooltip: {
            trigger: "axis",
          },
          legend: {
            right: "20",
            data: [this.adata.text],
            icon: "circle",

            textStyle: {
              fontSize: 16,
              color: "#fff",
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            top: "18%",
            bottom:'12%',
            containLabel: true,
          },
          xAxis: {
            type: "category",
            data: this.adata.Date,
            axisLine: {
              show: true,
              onZero: false,
              lineStyle: {
                color: "#fff",
              },
            },
            nameTextStyle: {
              align: "center",
              fontWeight: "bold",
            },
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value}",
            },
            axisLine: {
              onZero: true,
              lineStyle: {
                color: "#fff",
              },
            },
            // min: (value) => {
            //   return value.min ;
            // },
            // max: (value) => {
            //   return value.max ;
            // },
          },
          series: [
            {
              name: this.adata.text,
              type: "line",   
              data: this.adata.Cnt, //数据
              lineStyle: {
                color: this.adata.color,
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

<style lang="less" scoped>
 
</style>
