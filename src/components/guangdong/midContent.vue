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
					<myTitle :text="text[2]" :img="img1" />
					<my-line :lineObj="lineData"></my-line>
				</div>
				<div class="rightTable">
					<myTable></myTable>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import myLine from "./echartsType/line.vue";
import myTitle from "./title/Title.vue";
import myTable from "./table/scrollTbale.vue";
export default {
	components: {
		myLine,
		myTitle,
		myTable,
	},
	data() {
		return {
			img1: require("@/assets/image/user.png"),
			text: [
				"近12天日活跃用户",
				"全国六地区注册累计榜",
				"周均日活前三城市近5天走势",
			],
			lineData: {
				id: "line3",
				xAxisData: [
					"2022/11/12",
					"2022/11/13",
					"2022/11/14",
					"2022/11/15",
					"2022/11/16",
					"2022/11/17",
					"2022/11/18",
					"2022/11/19",
					"2022/11/20",
					"2022/11/21",
					"2022/11/22",
				],
				seriesData: [
					128608, 130376, 120842, 117704, 120084, 127877, 127052, 128051,
					132261, 120525, 119876,
				],
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
	background: rgba(34, 34, 34, 0.5);

	.mid1 {
		width: 560px;

		.contTop {
			height: 310px;
			border: 1px solid #fff;
			padding: 20px 50px;
			display: flex;
			flex-flow: wrap;
			justify-content: space-between;
			box-sizing: border-box;

			div {
				width: 200px;
				height: 120px;
				border: 1px solid #fff;
			}
		}

		.leftBar {
			height: 310px;
			margin-top: 10px;
			border: 1px solid #fff;
		}
	}

	.mid2 {
		width: 740px;

		.contTop {
			height: 240px;
			border: 1px solid #fff;
		}

		.midMap {
			height: 390px;
			border: 1px solid #fff;
		}
	}

	.mid3 {
		width: 560px;

		.contTop {
			height: 240px;
			border: 1px solid #fff;
			background: rgba(34, 34, 34, 0.5);
		}

		.rightTable {
			height: 380px;
			margin-top: 10px;
			border: 1px solid #fff;
			background: rgba(34, 34, 34, 0.5);
		}
	}
}
</style>