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
export default {
	components: {
		headerVue,
		Content,
		Bottom,
	},
	data() {
		return {};
	},
};
</script>

<style lang="less" scoped>
.mainIndex {
	padding: 20px;
}
</style>