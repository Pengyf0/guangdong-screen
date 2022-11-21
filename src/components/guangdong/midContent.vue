<template>
	<div>
		<section class="midContent">
			<div class="mid1">
				<div class="contTop">
					<div>新增用户</div>
					<div>活跃用户</div>
					<div>aum20w以上</div>
					<div>aum50W以上</div>
				</div>
				<div class="leftBar"></div>
			</div>
			<div class="mid2">
				<div class="contTop"></div>
				<div class="midMap"></div>
			</div>
			<div class="mid3">
				<div class="contTop">
					<my-line :lineObj="lineData"></my-line>
				</div>
				<div class="rightTable"></div>
			</div>
		</section>
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
				id: "line3",
				xAxisData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				seriesData: [150, 230, 224, 218, 135, 147, 260],
			},
		};
	},
};
</script>
<style lang="less" scoped>
.midContent {
	height: 650px;
	padding: 10px 0;
	text-align: center;
	display: flex;
	box-sizing: border-box;
	.mid1 {
		width: 560px;
		.contTop {
			height: 310px;
			border: 1px solid black;
			padding: 20px 50px;
			display: flex;
			flex-flow: wrap;
			justify-content: space-between;
			box-sizing: border-box;
			div {
				width: 200px;
				height: 120px;
				border: 1px solid black;
			}
		}
		.leftBar {
			height: 310px;
			margin-top: 10px;
			border: 1px solid black;
		}
	}
	.mid2 {
		width: 740px;
		.contTop {
			height: 240px;
			border: 1px solid black;
		}
		.midMap {
			height: 390px;
			border: 1px solid black;
		}
	}
	.mid3 {
		width: 560px;
		.contTop {
			height: 240px;
			border: 1px solid black;
		}
		.rightTable {
			height: 380px;
			margin-top: 10px;
			border: 1px solid black;
		}
	}
}
</style>