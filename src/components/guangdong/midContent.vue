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
				<div class="contTop"></div>
				<div class="rightTable"></div>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
};
</script>
<style lang="less" scoped>
.midContent {
	height: 450px;
	text-align: center;
	display: flex;
	box-sizing: border-box;
	.mid1 {
		flex: 1;
		.contTop {
			height: 200px;
			border: 1px solid black;
			display: flex;
			flex-flow: wrap;
			justify-content: space-betw;
			div {
				width: 49%;
				height: 100px;
				border: 1px solid black;
			}
		}
		.leftBar {
			height: 250px;
			border: 1px solid black;
		}
	}
	.mid2 {
		flex: 1;
		.contTop {
			height: 140px;
			border: 1px solid black;
		}
		.midMap {
			height: 310px;
			border: 1px solid black;
		}
	}
	.mid3 {
		flex: 1;
		.contTop {
			height: 170px;
			border: 1px solid black;
		}
		.rightTable {
			height: 280px;
			border: 1px solid black;
		}
	}
}
</style>