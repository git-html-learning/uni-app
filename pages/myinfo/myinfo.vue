<template>
	<view class="page_myinfo">
		<view class="user_header">
			<image src="../../static/img/user.png" mode=""></image>
			<view class="user_header_wrapper">
				<view class="user_header_name">{{username}}</view>
				<!-- <view class="user_header_wechat">
					微信：
					{{userinfo.Wechat?'userinfo.wechat':'xxx'}}
				</view> -->
			</view>
		</view>
	<!-- 	<view class="user_item" >
			<text class="iconfont icon-youxiang user_item_icon_email" ></text>
			<view class="item_right item_right_border">
				<view class="user_item_title">邮箱</view>
				<view class="user_item_right">
					<view class="user_item_data">{{userinfo.email}}</view>
					<text class="iconfont icon-xiangyou"></text>
				</view>
			</view>
		</view>
		<view class="user_item" >
			<text class="iconfont icon-shouji-copy-copy user_item_icon_phone"></text>
			<view class="item_right item_right_border">
				<view class="user_item_title">手机号</view>
				<view class="user_item_right">
					<view class="user_item_data">{{userinfo.phone}}</view>
					<text class="iconfont icon-xiangyou"></text>
				</view>
			</view>
		</view> -->
		<view class="user_item" @click="handleChangeUserAddress()">
			<text class="iconfont icon-dizhi user_item_icon_address"></text>
			<view class="item_right">
				<view class="user_item_title">地址</view>
				<view class="user_item_right">
					<view class="user_item_data">{{userinfo.userAddress.province}} {{userinfo.userAddress.city}}</view>
					<text class="iconfont icon-xiangyou"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self
	export default {
		data() {
			return {
				username: '',
				userinfo: {
					userAddress: {}
				},
			}
		},
		onLoad() {
			_self = this
		},
		onShow() {
			this.username = uni.getStorageSync('username_nitrogen')
			this.getUserInfo()
		},
		methods: {
			// 获取用户信息
			getUserInfo () {
				this.$api.getUserInfo(this.username).then(res => {
					console.log(res);
					if (res.code === 200) {
						this.userinfo = res.data
						console.log(this.userinfo);
					} else {
						uni.showToast({
							title: '获取用户信息失败',
							icon: 'none'
						})
					}
				})
			},
			
			// 前往设备页
			handleToDevice () {
				uni.navigateTo({
					url: './deviceinfo/productinfo'
				})
			},
			
			// 修改信息
			handleChangeEmail () {
				uni.navigateTo({
					url: './myinfo_email'
				})
			},
			handleChangePhone () {
				uni.navigateTo({
					url: './myinfo_phone?phone=' + this.userinfo.phone
				})
			},
			handleChangeUserAddress () {
				uni.navigateTo({
					url: './myinfo_address'
				})
			}
		},
		
	}
</script>

<style lang="less" >
	page {
		background-color: #efeff4;
	}
	.page_myinfo {
		font-size: 28rpx;
		.user_header {
			border-top: solid 1rpx #e3e3e3;
			height: 250rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 20rpx;
				margin-left: 40rpx;
				margin-right: 55rpx;
			}
			.user_header_wrapper {
				display: flex;
				flex-direction: column;
				height: 150rpx;
				.user_header_name {
					height: 75rpx;
					font-size: 34rpx;
					line-height: 75rpx;
				}
				.user_header_wechat {
					height: 75rpx;
					line-height: 75rpx;
					font-size: 26rpx;
					color: #888888;
				}
			}
		}
		.user_item {
			background-color: #fff;
			display: flex;
			align-items: center;
			text {
				margin-left: 20rpx;
				margin-right: 20rpx;
			}
			.iconfont {
				font-size: 22px;
			}
			.user_item_icon_email {
				color: #FACC14;
			}
			.user_item_icon_phone {
				color: #1890FF;
			}
			.user_item_icon_address {
				color: #F04864;
			}
			.item_right {
				width: 100%;
				height: 90rpx;
				display: flex;
				align-items: center;
				.user_item_title {
					flex: 1;
				}
				.user_item_right {
					display: flex;
					color: #b1b1b1;
					.user_item_data {
						position: relative;
						top: 5rpx;
						font-size: 25rpx;
					}
					text {
						font-size: 27rpx;
						position: relative;
						top: 10rpx;
					}
				}
			}
			.item_right_border {
				border-bottom: solid 1rpx #d8d8d8;
			}
		}
		.user_item:active {
			background-color: #eee;
		}
		.deviceinfo {
			margin-top: 20rpx;
		}
	}
</style>
