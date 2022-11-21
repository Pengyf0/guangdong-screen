
<template>
	<div>
		<ul class="bottom">
			<li></li>
			<li></li>
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
import myTitle from './title/Title.vue'
export default {
	components: {
		myLine,
		myTitle
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
		height: 295;
		width: 365px;
		border: 1px solid #fff;
	}

	li+li {
		margin-left: 10px;
	}
}
</style>