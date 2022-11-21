<template >
	<div class="mainIndex">
		<headerVue />
		<Content />
		<Bottom />
	</div>
</template>
<script>
import headerVue from "@/components/guangdong/header.vue";
import Content from "@/components/guangdong/midContent.vue";
import Bottom from "@/components/guangdong/bottom.vue";
import drawMixin from "../utils/drawMixin";
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
	background-color: #000;
	color: #fff;
}
</style>