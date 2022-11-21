<template >
	<div class="mainIndex" ref="appGD">
		<headerVue />
		<Content />
		<Bottom />
	</div>
</template>
<script>
import headerVue from "@/components/guangdong/header.vue";
import Content from "@/components/guangdong/midContent.vue";
import Bottom from "@/components/guangdong/bottom.vue";
import drawMixin from "../utils/GDdrawMixin";
export default {
	components: {
		headerVue,
		Content,
		Bottom,
	},
	mixins: [drawMixin],
	data() {
		return {};
	},
};
</script>

<style lang="less" scoped>
.mainIndex {
	padding: 10px 30px;
	width: 1920px;
	height: 1080px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	transform-origin: left top;
	overflow: hidden;
	box-sizing: border-box;
	// 	background-color: #222222;
}
</style>