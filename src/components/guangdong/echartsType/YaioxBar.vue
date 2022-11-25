<template>
	<div :id="barObj?.id" class="echart" ref="YaioxBar"></div>
</template>

<script>
export default {
	data() {
		return {
			cardImg1: require("@/assets/images/card1.png"),
			cardImg2: require("@/assets/images/card2.png"),
			cardImg3: require("@/assets/images/card3.png"),
		};
	},
	props: {
		barObj: {
			type: Object,
			default: () => {},
		},
		// barObj: {
		// id: "bar1",
		// 	yAxisData: ["广州", "北京", "上海", "天津", "重庆", "深圳"],
		// 	seriesData: [ 135, 147, 218, 448,500,1000],
		//  color: ['#FF9F00', '#FF6200', '#FF6600']
		// 	},
	},
	mounted() {
		this.$nextTick(() => {
			this.echartsInit();
		});
	},
	methods: {
		echartsInit() {
			//折线图初始化并且赋值
			let myChart = this.$echarts.init(
				document.getElementById(this.barObj?.id)
			);
			let option = {
				grid: {
					left: "2%",
					right: "8%",
					bottom: "10%",
					top: "10%",
					containLabel: true,
				},
				xAxis: {
					type: "value",
					show: true,
					axisLabel: {
						show: false,
					},
					splitLine: {
						show: true,
						lineStyle: {
							type: "dashe",
							color: "#B3B4CD",
							opacity: 0.3,
						},
					},
				},
				yAxis: {
					type: "category",
					data: this.barObj?.yAxisData,
					inverse: true, //反转数据
					axisLine: {
						show: false,
					},
					axisTick: {
						show: false,
					},
					axisLabel: {
						textStyle: {
							color: "#C0C0BF",
							fontSize: "12",
						},
						formatter: (params) => {
							if (this.YDataIndex(params) == 0) {
								return `{a|} ${params}`;
							} else if (this.YDataIndex(params) == 1) {
								return `{b|} ${params}`;
							} else if (this.YDataIndex(params) == 2) {
								return `{c|} ${params}`;
							} else {
								return `{d|${this.YDataIndex(params) + 1}} ${params}`;
							}
						},
						rich: {
							a: {
								backgroundColor: {
									image: this.cardImg1,
								},
								height: 24,
								width: 24,
							},
							b: {
								backgroundColor: {
									image: this.cardImg2,
								},
								height: 24,
								width: 24,
							},
							c: {
								backgroundColor: {
									image: this.cardImg3,
								},
								height: 24,
								width: 24,
							},
							d: {
								color: this.barObj.color[2],
								width: 24,
								align: "center",
							},
						},
					},
				},
				series: [
					{
						data: this.barObj?.seriesData,
						type: "bar",
						barWidth: 12,
						itemStyle: {
							color: (params) => {
								return new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
									{
										offset: 0,
										color: "rgba(255,102,0,0)",
									},
									{
										offset: 1,
										color: this.barObj.color[0],
									},
								]);
							},
						},
						label: {
							show: true,
							position: "outside", //数据显示位置
							color: "#C0C0BF", //数据文字颜色
							fontSize: 12, //数据文字大小
							formatter: (p) => {
								// 前三后三不同颜色
								if (p.dataIndex > 2) {
									return `{a|${p.value}}`;
								} else {
									return `{b|${p.value}}`;
								}
							},
							rich: {
								a: {
									color: "#C0C0BF",
								},
								b: {
									color: this.barObj.color[1],
								},
							},
						},
					},
				],
			};
			myChart.setOption(option);
		},
		YDataIndex(v) {
			// console.log(this.barObj.yAxisData.indexOf(v));
			return this.barObj.yAxisData.indexOf(v);
		},
	},
};
</script>
 
<style lang = "less" scoped>
.echart {
	width: 100%;
	height: calc(100% - 36px);
}
</style>