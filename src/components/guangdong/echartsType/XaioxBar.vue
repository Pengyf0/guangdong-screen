<template>
    <div :id="barObj?.id" class="echartMar"></div>
</template>

<script>
export default {
    data() {
        return {


        }
    },
    props: {
        barObj: {
            type: Object,
            default: () => { },
        },
        // barObj: {
        // id: "bar3",
        // 	xAxisData: ["0点", "3点", "6点", "12点", "15点", "24点"],
        // 	seriesData: [ 135, 147, 218, 448,500,1000],
        //  color: '#FF9F00'
        // 	},
    },
    mounted() {
        this.echartsInit();
    },
    methods: {
        echartsInit() {
            //折线图初始化并且赋值
            let myChart = this.$echarts.init(
                document.getElementById(this.barObj?.id)
            );
            let option = {
                grid: {
                    left: "5%",
                    right: "8%",
                    bottom: "5%",
                    top: "10%",
                    containLabel: true,
                },
                xAxis: {
                    type: "category",
                    show: true,
                    axisLabel: {
                        show: true,
                        rotate: 45,
                        color: '#C0C0BF'
                    },
                    axisTick: {
                        show: false,
                    },
                    data: this.barObj?.xAxisData
                },
                yAxis: {
                    type: "value",
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashe',
                            color: '#B3B4CD',
                            opacity: 0.3,
                        }
                    },
                    axisLabel: {
                        color: '#C0C0BF'
                    },
                },
                series: [
                    {
                        data: this.barObj?.seriesData,
                        type: "bar",
                        barWidth: 12,
                        itemStyle: {
                            color: this.barObj.color
                        },
                        label: {
                            show: true,
                            position: "outside", //数据显示位置
                            color: this.barObj.color,
                            fontSize: 12, //数据文字大小
                        },
                    },
                ],
            };
            myChart.setOption(option);

        }
    }
}
</script>
 
<style lang = "less" scoped>
.echartMar {
    width: 100%;
    height: calc(100% - 92px);
}
</style>