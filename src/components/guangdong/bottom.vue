
<template>
	<div>
		<ul class="bottom">
			<li>
				<div class="title">
					<span></span>
					<i class="icon1"></i>
					全国六地区最新日活
				</div>
			</li>
			<li>
				<div class="title">
					<span></span>
					<i class="icon2"></i>
					惠省钱（建行生活入口）数据
				</div>
			</li>
			<li>
				<div class="title">
					<span></span>
					<i class="icon3"></i>
					周均日活前三城市近5天走势
				</div>
				<div id="top3Flow" style="width: 100%; height: calc(100% - 36px)"></div>
			</li>
			<li>
				<div class="title">
					<span></span>
					<i class="icon4"></i>
					近5天生活卡新增
				</div>
				<my-line :lineObj="lineData"></my-line>
			</li>
			<li>
				<div class="title">
					<span></span>
					<i class="icon5"></i>
					近5天新增注册
				</div>
				<my-line :lineObj="lineData2"></my-line>
			</li>
		</ul>
	</div>
</template>

<script>
import myLine from "./echartsType/line.vue";
import myTitle from "./title/Title.vue";
export default {
	components: {
		myLine,
		myTitle,
	},
	data() {
		return {
			img1: require("@/assets/image/bao.png"),
			img2: require("@/assets/image/add.png"),
			text: ["近5天生活卡新增", "近5天新增注册"],
			lineData: {
				id: "line",
				xAxisData: [
					"2022/11/12",
					"2022/11/13",
					"2022/11/14",
					"2022/11/15",
					"2022/11/16",
				],
				seriesData: [63, 58, 178, 179, 162],
			},
			lineData2: {
				id: "line2",
				xAxisData: [
					"2022/11/12",
					"2022/11/13",
					"2022/11/14",
					"2022/11/15",
					"2022/11/16",
				],
				seriesData: [1367, 1560, 1440, 878, 723],
			},
			top3FlowData: {
				id: "top3Flow",
				xAxisData: [
					"2022/11/12",
					"2022/11/13",
					"2022/11/14",
					"2022/11/15",
					"2022/11/16",
				],
				seriesData: [137, 160, 440, 78, 123],
			},
		};
	},
	mounted() {
		this.icon3Init();
	},
	methods: {
		icon3Init() {
			//第三个折线图，三折现对比，周均日活前三城市近5天走势
			let myChart = this.$echarts.init(document.getElementById("top3Flow"));
			let option = {
				grid: {
					top: "15%",
					left: "5%",
					bottom: "5%",
					containLabel: true,
				},
				tooltip: {
					trigger: "axis",
				},
				legend: {
					textStyle: {
						fontSize: 12, //字体大小
						color: "#C0C0BF", //字体颜色
					},
					left: "5%",
				},
				xAxis: {
					type: "category",
					data: this.top3FlowData.xAxisData,
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
						name: "成都",
						type: "line",
						data: [10, 11, 13, 11, 12, 12, 9],
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
					},
					{
						name: "广州",
						type: "line",
						data: [1, -2, 2, 5, 3, 2, 0],
						lineStyle: {
							color: "#4288FC",
							width: 1,
						},
						showSymbol: true, //是否默认展示圆点
						symbol: "circle", //设定为实心点
						symbolSize: 8, //设定实心点的大小
						itemStyle: {
							normal: {
								color: "#4288FC",
							},
						},
					},
					{
						name: "深圳",
						type: "line",
						data: [1, 4, 5, 2, 1],
						lineStyle: {
							color: "#EE7D15",
							width: 1,
						},
						showSymbol: true, //是否默认展示圆点
						symbol: "circle", //设定为实心点
						symbolSize: 8, //设定实心点的大小
						itemStyle: {
							normal: {
								color: "#EE7D15",
							},
						},
					},
				],
			};
			myChart.setOption(option);
			window.addEventListener("resize", function () {
				myChart.resize();
			});
		},
	},
};
</script>
<style lang="less" scoped>
.bottom {
	height: 315px;
	border: 1px solid #fff;
	padding: 10px 0;
	display: flex;

	li {
		height: 295px;
		width: 365px;
		background: rgba(34, 34, 34, 0.5);
		.title {
			height: 36px;
			font-size: 18px;
			white-space: nowrap;
			background: linear-gradient(
				90deg,
				rgba(255, 159, 0, 0.63) 0%,
				rgba(255, 102, 0, 0) 100%
			);
			width: 267px;
			display: flex;
			align-items: center;
			span {
				height: 22px;
				border-left: 2px solid #fff;
			}
			i {
				height: 24px;
				width: 24px;
				display: inline-block;
				margin: 0 8px;
			}
			.icon1 {
				background: url(@/assets/image/user.png) no-repeat;
				background-size: 100% 100%;
			}
			.icon2 {
				background: url(../../assets/image/me.png) no-repeat;
				background-size: 100% 100%;
			}
			.icon3 {
				background: url(@/assets/image/user.png) no-repeat;
				background-size: 100% 100%;
			}
			.icon4 {
				background: url(@/assets/image/bao.png) no-repeat;
				background-size: 100% 100%;
			}
			.icon5 {
				background: url(@/assets/image/add.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}

	li + li {
		margin-left: 10px;
	}
}
</style>