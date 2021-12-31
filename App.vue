<script>
	export default {
		onLaunch: function() {},
		onShow: function() {},
		onHide: function() {}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	@import "./static/css/colorui/main.css";
	@import "./static/css/colorui/icon.css";
	@import "./static/css/ali/iconfont.css";

	page {
		background-color: $uni-bg-color-grey;
		font-size: 30rpx;
	}

	input {
		font-size: 30rpx;
	}
</style>
