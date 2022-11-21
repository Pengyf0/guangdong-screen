
<template>
	<div>
		<ul class="bottom">
			<li></li>
			<li></li>
			<li></li>
			<li>
				<my-line :lineObj="lineData"></my-line>
			</li>
			<li>
				<my-line :lineObj="lineData2"></my-line>
			</li>
		</ul>
	</div>
</template>

<script>
import myLine from "./echartsType/line.vue";
export default {
	components: {
		myLine,
	},
	data() {
		return {
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
	border: 1px solid black;
	padding: 10px 0;
	display: flex;
	li {
		height: 295px;
		width: 365px;
		border: 1px solid black;
	}
	li + li {
		margin-left: 10px;
	}
}
</style>