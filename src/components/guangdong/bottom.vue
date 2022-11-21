
<template>
	<div>
		<ul class="bottom">
			<li>
				<myYaioxBar :barObj="dayBarData"></myYaioxBar>
			</li>
			<li>
				<myXaioxBar :barObj="moneyBarData"></myXaioxBar>
			</li>
			<li></li>
			<li>
				<myTitle :text="text[0]" :img='img1' />
				<my-line :lineObj="lineData"></my-line>
			</li>
			<li>
				<myTitle :text="text[1]" :img='img2' />
				<my-line :lineObj="lineData2"></my-line>
			</li>
		</ul>
	</div>
</template>

<script>
import myLine from "./echartsType/line.vue";
import myTitle from './title/Title.vue';
import myYaioxBar from './echartsType/YaioxBar.vue'
import myXaioxBar from './echartsType/XaioxBar.vue'
export default {
	components: {
		myLine,
		myTitle,
		myYaioxBar,
		myXaioxBar
	},
	data() {
		return {
			img1: require('@/assets/image/bao.png'),
			img2: require('@/assets/image/add.png'),
			text: ['近5天生活卡新增', '近5天新增注册'],
			lineData: {
				id: "line",
				xAxisData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				seriesData: [150, 230, 224, 218, 135, 147, 260],
			},
			lineData2: {
				id: "line2",
				xAxisData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				seriesData: [180, 200, 220, 240, 260, 280, 300],
			},
			// 全国六地区最新日活
			dayBarData: {
				id: "bar2",
				yAxisData: ["北京", "天津", "上海", "广州", "成都", "深圳"],
				seriesData: [10020, 5000, 4448, 3218, 2147, 1835],//倒序
				color: ['#FADE4D', '#F7BC27', '#F7BD27']
			},
			// 惠省钱（建行生活入口）数据
			moneyBarData: {
				id: "bar3",
				xAxisData: ["0点", "3点", "6点", "12点", "15点", "24点"],
				seriesData: [135, 147, 218, 448, 500, 104],
				color: '#FF6600'
			},
		};
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
		border: 1px solid #fff;
	}

	li+li {
		margin-left: 10px;
	}
}
</style>