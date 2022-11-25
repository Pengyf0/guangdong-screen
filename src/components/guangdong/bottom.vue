
<template>
	<div>
		<ul class="bottom">
			<li>
				<div class="title">
					<span></span>
					<i class="icon1"></i>
					全国六地区最新日活
				</div>
				<myYaioxBar :barObj="dayBarData"></myYaioxBar>
			</li>
			<li>
				<div class="title">
					<span></span>
					<i class="icon2"></i>
					惠省钱（建行生活入口）数据
				</div>
				<div class="cumText">
					近30天累计：{{ cumAndAdd.thirty }}
					<span>当天新增：{{ cumAndAdd.onDay }}</span>
				</div>
				<myXaioxBar :barObj="moneyBarData"></myXaioxBar>
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
import myYaioxBar from "./echartsType/YaioxBar.vue";
import myXaioxBar from "./echartsType/XaioxBar.vue";
export default {
	props: {
		obj3: {
			type: Object,
			default: () => {},
		},
	},
	components: {
		myLine,
		myTitle,
		myYaioxBar,
		myXaioxBar,
	},
	data() {
		return {
			img1: require("@/assets/images/bao.png"),
			img2: require("@/assets/images/add.png"),
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
			// 全国六地区最新日活
			dayBarData: {
				id: "bar2",
				yAxisData: ["北京", "天津", "上海", "广州", "成都", "深圳"],
				seriesData: [10020, 5000, 4448, 3218, 2147, 1835], //倒序
				color: ["#FADE4D", "#F7BC27", "#F7BD27"],
			},
			// 惠省钱（建行生活入口）数据
			moneyBarData: {
				id: "bar3",
				xAxisData: ["0点", "3点", "6点", "12点", "15点", "24点"],
				seriesData: [135, 147, 218, 448, 500, 104],
				color: "#FF6600",
			},
			// 惠省钱（建行生活入口）数据
			cumAndAdd: {
				thirty: 2008,
				onDay: 200,
			},
		};
	},
	mounted() {
		this.$nextTick(() => {
			console.log(this.obj3, 77);
		});
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
	height: 295px;
	margin-top: 10px;
	display: flex;
	box-sizing: border-box;
	li {
		height: 285px;
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
				background: url(@/assets/images/user.png) no-repeat;
				background-size: 100% 100%;
			}

			.icon2 {
				background: url(@/assets/images/me.png) no-repeat;
				background-size: 100% 100%;
			}

			.icon3 {
				background: url(@/assets/images/user.png) no-repeat;
				background-size: 100% 100%;
			}

			.icon4 {
				background: url(@/assets/images/bao.png) no-repeat;
				background-size: 100% 100%;
			}

			.icon5 {
				background: url(@/assets/images/add.png) no-repeat;
				background-size: 100% 100%;
			}
		}

		.cumText {
			font-size: 12px;
			font-family: FZLanTingHeiS-DB-GB-Regular, FZLanTingHeiS-DB-GB;
			color: #c0c0bf;
			padding: 20px;
			box-sizing: border-box;

			span {
				margin-left: 36px;
			}
		}
	}

	li + li {
		margin-left: 10px;
	}
}
</style>