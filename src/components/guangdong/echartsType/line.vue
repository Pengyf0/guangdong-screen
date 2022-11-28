
<template>
	<div :id="lineObj?.id" style="width: 100%; height: calc(100% - 36px)"></div>
</template>

<script>

export default {
	props: {
		lineObj: {
			//默认传入图表id,以及X轴数组Y轴数据，格式如下默认
			type: Object,
			default: () => { },
		},
		// lineData: {
		// 		id: "line1",
		// 		xAxisData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		// 		seriesData: [150, 230, 224, 218, 135, 147, 260],
		// 	},
	},
	data() {
		return {
			myChart:null
		};
	},
	mounted() {
		this.myChart = this.$echarts.init(
			document.getElementById(this.lineObj?.id)
		);
		this.echartsInit();
	},
	methods: {
		echartsInit() {
			//折线图初始化并且赋值
			let _this =this
			let option = {
				grid: {
					top: "10%",
					bottom: "5%",
					containLabel: true,
				},
				xAxis: {
					type: "category",
					data: this.lineObj?.xAxisData,
					axisLine: {
						lineStyle: {
							color: "#B3B4CD",
							opacity: 0.3,
						},
					},
					axisTick: {
						show: false,
					},
					axisLabel: {
						color: "#C0C0BF",
						interval: 0,
						rotate: 38,
					},
				},
				yAxis: {
					type: "value",
					scale: true, //y轴不从0开始
					splitLine: {
						lineStyle: {
							color: "#B3B4CD",
							opacity: 0.3,
						},
					},
					axisLabel: {
						color: "#C0C0BF",
					},
				},
				series: [
					{
						data: this.lineObj?.seriesData,
						type: "line",
						lineStyle: {
							color: "#F7BC27",
							width: 1,
						},
						showSymbol: true, //是否默认展示圆点
						symbol: "circle", //设定为实心点
						symbolSize: 8, //设定实心点的大小
						itemStyle: {
							normal: {
								color: "#F7BC27",
							},
						},
						label: {
							show: true,
							position: "top",
							color: "#F7BC27",
						},
					},
				],
			};
			this.myChart.setOption(option,true);
			window.addEventListener("resize", function () {
				_this.myChart.resize();
			});
		},
	},
	watch: {
		lineObj: {
			handler() {
				this.echartsInit()
			},
			deep: true
		}
	}
};
</script>
<style lang="less" scoped>

</style>