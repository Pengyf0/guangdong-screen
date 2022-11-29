<template>
	<div class="head">
		<div class="titBox"></div>
		<div class="timeBox">
			<div class="subTime">
				<div class="dataTime">{{ newTime }}</div>
				<div class="yearTime">
					<div class="yearTimeTop">{{ newWeek }}</div>
					<div class="yearTimeBottom">{{ newDay }}</div>
				</div>
			</div>
			<div class="genxin">
				<span>0{{ min }} : {{ count > 9 ? count : "0" + count }}</span> 后更新
			</div>
		</div>
	</div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
	data() {
		return {
			newTime: "", //时间
			newWeek: "", //星期
			newDay: "", //日期
			realTime: null, //实时时间
		};
	},
	computed: {
		count() {
			return this.$store.state.gzDap.count
		},
		min() {
			return this.$store.state.gzDap.min
		}
	},

	mounted() {
		// 实时变化时间
		this.realTime = setInterval(() => {
			this.getTime();
			this.$store.commit("gzDap/changeCount");
			if (this.count == 0 && this.min == 0){
				this.$store.commit("gzDap/hdCount")
				this.$emit('headinit')
			} ;

		}, 1000);
	},
	methods: {
		// 当前时间
		getTime() {
			let t = new Date();
			let y = t.getFullYear();
			let mm = t.getMonth() + 1;
			let m = mm < 10 ? "0" + mm : mm;
			let d = t.getDate() < 10 ? "0" + t.getDate() : t.getDate();
			let h = t.getHours() < 10 ? "0" + t.getHours() : t.getHours();
			let mi = t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes();
			let s = t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds();
			// 时分秒
			this.newTime = h + ":" + mi + ":" + s;
			// 年月日
			this.newDay = y + "-" + m + "-" + d;
			// 星期几
			let weekDays = [
				"星期天",
				"星期一",
				"星期二",
				"星期三",
				"星期四",
				"星期五",
				"星期六",
			];
			let week = t.getDay();
			this.newWeek = weekDays[week];
		},
	},
	destroyed() {
		// 清除定时器
		if (this.realTime) clearInterval(this.realTime);
	},
};
</script>
 
<style lang = "less" scoped>
.head {
	width: 100%;
	height: 93px;

	.titBox {
		width: 1862px;
		height: 93px;
		background-image: url("@/assets/images/head.png");
	}

	.timeBox {
		position: absolute;
		top: 54px;
		width: 1862px;
		display: flex;
		justify-content: space-between;
		height: 37px;
		// padding: 0 30px;
		box-sizing: border-box;

		.subTime {
			width: 215px;
			height: 37px;
			font-size: 32px;
			display: flex;
			justify-content: space-between;
			font-family: FZLTXHJW--GB1-0, FZLTXHJW--GB1;
			font-weight: normal;
			color: #C0C0BF;
			line-height: 37px;
		}

		.yearTime {
			font-size: 12px;
			line-height: 18px;
			margin-left: 10px;

			.yearTimeBottom {
				width: 78px;
			}
		}

		.genxin {
			font-size: 18px;
			font-family: momospace, PingFangSC-Regular, PingFang SC;
			color: #ffffff;
			line-height: 25px;

			span {
				color: #ff6600;
				display: inline-block;
				width: 60px;
			}
		}
	}
}
</style>