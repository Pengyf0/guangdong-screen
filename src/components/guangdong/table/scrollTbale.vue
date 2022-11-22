<template>
	<div class="scrollTbale">
		<div class="titl">
			<div class="titlItem" v-for="(item, ind) in title" :key="ind">
				{{ item }}
			</div>
		</div>
		<div
			class="tableOut"
			id="tableOut"
			@mouseenter="mouseenterEvent()"
			@mouseleave="mouseleaveEvent(50)"
		>
			<div id="scoll1">
				<!-- <div class="flexBox" v-for="index in 20" :key="index">
					{{ index }}
				</div> -->
				<div class="flxBox" v-for="(item, index) in tableData" :key="index">
					<div v-for="(it2, ind2) in item" :key="ind2">{{ it2 }}</div>
				</div>
			</div>
			<div id="scoll2"></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			timer: null,
			title: [
				"一级支行",
				"AUM5w注册数",
				"AUM5w\n覆盖度",
				"AUM20w\n注册数",
				"AUM20w\n覆盖度",
			],
			tableData: [
				{ city: "天河1", num1: "2", num2: "3", num3: "4", num4: "5" },
				{ city: "天河2", num1: "2", num2: "3", num3: "4", num4: "5" },
				{ city: "天河3", num1: "2", num2: "3", num3: "4", num4: "5" },
				{ city: "天河4", num1: "2", num2: "3", num3: "4", num4: "5" },
				{ city: "天河5", num1: "2", num2: "3", num3: "4", num4: "5" },
				{ city: "天河6", num1: "2", num2: "3", num3: "4", num4: "5" },
				{ city: "天河7", num1: "2", num2: "3", num3: "4", num4: "5" },
				{ city: "天河8", num1: "2", num2: "3", num3: "4", num4: "5" },
				{ city: "天河9", num1: "2", num2: "3", num3: "4", num4: "5" },
				{ city: "天河10", num1: "2", num2: "3", num3: "4", num4: "5" },
				{ city: "天河11", num1: "2", num2: "3", num3: "4", num4: "5" },
			],
		};
	},
	mounted() {
		this.scroll(50);
	},
	methods: {
		scroll(t) {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
			let tableOut = document.getElementById("tableOut");
			let ul = document.getElementById("scoll1");
			let ul2 = document.getElementById("scoll2");
			// 初始值
			tableOut.scrollTop = 0;
			// 赋值给空ul
			if (this.tableData.length < 11) return;
			ul2.innerHTML = ul.innerHTML;
			this.timer = setInterval(this.rollStart, t);
		},
		rollStart() {
			let ul = document.getElementById("scoll1");
			let tableOut = document.getElementById("tableOut");
			// console.log(tableOut.scrollTop, ul.scrollHeight);
			if (tableOut.scrollTop >= ul.scrollHeight) {
				tableOut.scrollTop = 0;
			} else {
				tableOut.scrollTop++;
			}
		},
		// 鼠标移入关闭定时器
		mouseenterEvent() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		// 鼠标移出重新调用定时器
		mouseleaveEvent(t) {
			if (!this.timer) {
				this.timer = setInterval(this.rollStart, t);
			}
		},
	},
};
</script>
<style lang="less" scoped>
.scrollTbale {
	height: 100%;
	width: 100%;
	&::-webkit-scrollbar {
		display: none;
	}
	.flxBox,
	.titl {
		height: 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: rgba(51, 51, 52, 0.5);
		color: #ff6600;
		padding: 0 20px;
		font-weight: 600;
		font-size: 14px;
		box-sizing: border-box;

		div:nth-of-type(1) {
			max-width: 60px;
		}
	}

	.flxBox:nth-of-type(odd) {
		background: rgba(34, 34, 34, 0.7);
	}

	.titl {
		height: 50px;
		div {
			width: 60px;
		}
	}
	.tableOut {
		height: calc(100% - 50px);
		overflow: auto;
	}
}
</style>