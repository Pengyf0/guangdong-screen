<template >
	<div class="layout1">
		<div class="mainIndex" ref="appGD" >
			<headerVue @headinit = "getAlldata()"  />
			<Content :obj1="gzRow1VO" :obj2="gzRow2VO" />
			<Bottom :obj3="gzRow3VO" />
			<div class="botBg"></div>
		</div>
	</div>
</template>
<script>
import headerVue from "@/components/guangdong/header.vue";
import Content from "@/components/guangdong/midContent.vue";
import Bottom from "@/components/guangdong/bottom.vue";
import drawMixin from "../utils/GDdrawMixin";
import { gangzhouScreen } from "../request/httpApi";
export default {
	components: {
		headerVue,
		Content,
		Bottom,
	},
	mixins: [drawMixin],
	data() {
		return {
			gzRow1VO: {},
			gzRow2VO: {},
			gzRow3VO: {},
		};
	},
	// mounted() {
	// 	this.getAlldata();
	// },
	created() {
		this.getAlldata();
	},
	methods: {
		async getAlldata() {
			let { data, code } = await gangzhouScreen();
			if (code === 200) {
				let { gzRow1VO, gzRow2VO, gzRow3VO } = data;
				this.gzRow1VO = gzRow1VO;
				this.gzRow2VO = gzRow2VO;
				this.gzRow3VO = gzRow3VO;
				console.log('初始所有值', gzRow1VO, gzRow2VO, gzRow3VO);
			}
		},
	},
};
</script>

<style lang="less" scoped>
.layout1 {
	width: 100vw;
	height: 100vh;
	position: relative;
	overflow: hidden;
	background-color: #000;
	color: #fff;
}

.mainIndex {
	padding: 10px 30px;
	background-color: #000;
	color: #fff;
	width: 1920px;
	height: 1080px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	transform-origin: left top;
	overflow: hidden;
	box-sizing: border-box;
	background: url(@/assets/images/gzmap.png) no-repeat;
	background-size: 1366px 688px;
	background-position: 277px 210px;

	.botBg {
		height: 28px;
		background: url(@/assets/images/bottom.png) no-repeat;
		background-position: -36px 0;
	}
}
</style>