<template>
	<div class="scrollTbale">
		<div class="titl">
			<div>序号</div>
			<div>城市</div>
			<div>券名</div>
			<div>领取人数</div>
			<div>核销人数</div>
		</div>
		<div
			class="tableOut"
			id="tableOut"
			@mouseenter="mouseenterEvent()"
			@mouseleave="mouseleaveEvent(200)"
		>
			<div id="scoll1">
				<div class="flexBox" v-for="index in 20" :key="index">
					{{ index }}
				</div>
				<!-- <div class="flxBox" v-for="(item, index) in couponData" :key="index">
						<div>{{ item.rank > 9 ? item.rank : "0" + item.rank }}</div>
						<div>{{ item.orgName }}</div>
						<div :title="item.couponName">{{ item.couponName }}</div>
						<div>{{ item.gainCnt | numberFilter }}</div>
						<div>{{ item.verCnt | numberFilter }}</div>
					</div> -->
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
		};
	},
	mounted() {
		this.scroll(200);
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
			console.log("移入");
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
		line-height: 30px;
		display: flex;
		justify-content: space-between;
		background: rgba(51, 51, 52, 0.5);
		color: #ff6600;
		padding: 0 20px;
		font-weight: 600;
		box-sizing: border-box;

		div {
			flex: 1;
		}
		div:nth-of-type(1) {
			max-width: 50px;
		}
	}
	.titl {
		height: 50px;
		line-height: 30px;
	}
	.tableOut {
		height: calc(100% - 50px);
		overflow: auto;
	}
}
</style>