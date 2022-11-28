
<template>
	<div :id="id" style="width: 100%; height: 100%"></div>
</template>

<script>
import zhongguo from "@/assets/json/china.json";

export default {
	props: {
		id: {
			//默认传入图表id,格式如下默认
			type: String,
			default: "chinaMap",
		},
		sixArr:{
			type: Array,
			default: ()=>[],
		}
	},
	data() {
		return {};
	},
	mounted() {
		
		
		this.echartsInit();
	},
	watch: {
		sixArr: {
			handler() {
				this.echartsInit()
			},
			deep: true
		}
	},
	methods: {
		getCityVal(name){
			return this.sixArr.filter(item=>item.city?.slice(0,2) == name)[0]?.value
		},
		echartsInit() {
			//折线图初始化并且赋值
			let myChart = this.$echarts.init(document.getElementById(this.id));
			let option = {
				// backgroundColor: "#000",
				geo: {
					type: "map",
					top: "-12%",
					left: "-15%",
					map: "china", //chinaMap需要和registerMap中的第一个参数保持一致
					// roam: true, // 设置允许缩放以及拖动的效果
					zoom: 1.4,
					aspectScale: 1.7,
					label: {
						show: false, //展示标签
					},
					itemStyle: {
						areaColor: "#CF753C", //默认区块颜色
						borderColor: "#B46631", //区块描边颜色
						borderWidth: 1, //区块描边颜色
						emphasis: {
							areaColor: "#DA681B", //鼠标划过区块的颜色
						},
					},
					regions: [
						//对不同的区块进行着色
						{
							name: "北京", //区块名称
							itemStyle: {
								areaColor: "red",
							},
						},
					],
					center: [87.617733, 43.792818], //设置地图中心点的坐标 （图为将新疆设置为地图中心点）
				},
				series: [
					{
						type: "effectScatter",
						coordinateSystem: "geo",
						effectType: "ripple",
						showEffectOn: "render",
						symbolSize: [5, 3],
						rippleEffect: {
							period: 3,
							scale: 5,
							brushType: "fill",
						},
						hoverAnimation: true,
						itemStyle: {
							color: "#fff",
							shadowBlur: 6,
							shadowColor: "#fff",
						},
						zlevel: 1,
						data: [
							{ name: "北京", value: [116.46, 39.92] },
							{ name: "上海", value: [121.48, 31.22] },
							{ name: "广州", value: [113.280637, 23.125178] },
							{ name: "深圳", value: [114.085947, 22.547] },
							{ name: "成都", value: [104.065735, 30.659462] },
							{ name: "杭州", value: [120.153576, 30.287459] },
						],
					},
					{
						type: "lines",
						label: {
							show: true,
							// padding: [10, 20],
							color: "#fff",
							// areaColor:'#323C48',
							// backgroundColor: "#402412",
							opacity: 0.9,
							borderRadius: 6,
							// formatter: "{b} {c}",
							formatter: (p) => {
								// 前三后三不同颜色
								if (p.name == "广州") {
									return `{a|${p.name} ${p.value}}`;
								} else {
									return `{b|${p.name} ${p.value}}`;
								}
							},
							rich: {
								a: {
									backgroundColor: "#F7BD27",
									color: "#733B00",
									height: 30,
									padding: [0, 10],
								},
								b: {
									backgroundColor: "#402412",
									height: 30,
									padding: [0, 10],
								},
							},
						},
						lineStyle: {
							type: "solid",
							opacity: 1,
							color: "#fff",
						},
						symbol: "triangle",
						symbolSize: [0, 5],
						data: [
							{
								name: "北京",
								value: this.getCityVal("北京"),
								coords: [
									[116.46, 39.92],
									[116.46, 48.22],
								],
							},
							{
								name: "上海",
								value:  this.getCityVal("上海"),
								coords: [
									[121.48, 31.22],
									[121.48, 40.22],
								],
							},
							{
								name: "广州",
								value:  this.getCityVal("广州"),
								coords: [
									[113.280637, 23.125178],
									[113.280637, 33.125178],
								],
							},
							{
								name: "深圳",
								value:  this.getCityVal("深圳"),
								coords: [
									[114.085947, 22.547],
									[114.085947, 28.547],
								],
							},
							{
								name: "成都",
								value: this.getCityVal("成都"),
								coords: [
									[104.065735, 30.659462],
									[104.065735, 40.659462],
								],
							},
							{
								name: "杭州",
								value: this.getCityVal("杭州"),
								coords: [
									[120.153576, 30.287459],
									[120.153576, 35.287459],
								],
							},
							//
						],
					},
					// {
					// 	type: "map",
					// 	data: [{ name: "北京", value: 200, itemStyle: { color: "red" } }],
					// },
				],
			};
			// 地图注册，第一个参数的名字必须和option.geo.map一致
			this.$echarts.registerMap("china", zhongguo);
			myChart.setOption(option,true);
			window.addEventListener("resize", function () {
				myChart.resize();
			});
		},
	},
};
</script>
<style lang="less" scoped>
</style>