
<template>
	<div>
		<ul class="bottom">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
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
.bottom {
	height: 250px;
	border: 1px solid black;
	display: flex;
	li {
		flex: 1;
		height: 250px;
		border: 1px solid black;
	}
}
</style>