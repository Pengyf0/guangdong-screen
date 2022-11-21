
<template>
	<div :id="lineObj?.id" style="width: 100%; height: 100%"></div>
</template>

<script>
export default {
	props: {
		lineObj: {
			//默认传入图表id,以及X轴数组Y轴数据，格式如下默认
			type: Object,
			default: () => {},
		},
		// lineData: {
		// 		id: "line1",
		// 		xAxisData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		// 		seriesData: [150, 230, 224, 218, 135, 147, 260],
		// 	},
	},
	data() {
		return {};
	},
	mounted() {
		this.echartsInit();
	},
	methods: {
		echartsInit() {
			//折线图初始化并且赋值
			let myChart = this.$echarts.init(
				document.getElementById(this.lineObj?.id)
			);
			let option = {
				xAxis: {
					type: "category",
					data: this.lineObj?.xAxisData,
				},
				yAxis: {
					type: "value",
				},
				series: [
					{
						data: this.lineObj?.seriesData,
						type: "line",
					},
				],
			};
			myChart.setOption(option);
			// window.addEventListener("resize", function () {
			// 	myChart.resize();
			// });
		},
	},
};
</script>
<style lang="less" scoped>
</style>