<template>
	<view class='content'>
		<pickers @address="address" @close="close" :defaultAddress="defaultAddress">
			<view class="address">
				<view class="item province">
					<view class="item_title">省份</view>
					<view class="item_data">{{userinfo.userAddress.province}}</view>
					<view class="item_data_nodata" v-if='!userinfo.userAddress.province'>请选择</view>
					<text class="iconfont icon-xiangyou"></text>
				</view>
				<view class="item city">
					<view class="item_title">城市</view>
					<view class="item_data">{{userinfo.userAddress.city}}</view>
					<view class="item_data_nodata" v-if='!userinfo.userAddress.city'>请选择</view>
					<text class="iconfont icon-xiangyou"></text>
				</view>
				<view class="item county">
					<view class="item_title">区</view>
					<view class="item_data">{{userinfo.userAddress.county}}</view>
					<view class="item_data_nodata" v-if='!userinfo.userAddress.county'>请选择</view>
					<text class="iconfont icon-xiangyou"></text>
				</view>
			</view>
		</pickers>
		<view class="detail">
			<view class="detail_title">详细地址</view>
			<textarea placeholder="请填写详细地址" v-model="userinfo.userAddress.detail"/>
		</view>
		<view class="flex justify-center">
			<button class="cu-btn lg" style="background-color: #6147f4;color: #fff;" :loading="loadingBtn" @click="handleSubmit">保存</button>
		</view>
	</view>
</template>

<script>
	// 修改成后定时跳转的定时器
	var timer
	var _self
	import pickers from "../../components/ming-picker/ming-picker.vue"
	export default {
		components: {
			pickers
		},
		data() {
			return {
				username: '',
				defaultAddress: [],
				// 用于提交的信息
				userinfo: {
					userAddress: {}
				},
				loadingBtn: false
			}
		},
		methods: {
			address (e) {
				this.userinfo.userAddress.province = e.value[0]
				this.userinfo.userAddress.city = e.value[1]
				this.userinfo.userAddress.county = e.value[2]
			},
			close (e) {},
			// 得到用户信息
			getUserinfo () {
				this.$api.getUserInfo(this.username).then(res => {
					_self.userinfo = res.data
					_self.defaultAddressInit = []
					// 选择器初始值
					if (_self.userinfo.userAddress.province !== '') {
						_self.defaultAddress.push(_self.userinfo.userAddress.province)
					}
					if (_self.userinfo.userAddress.city !== '') {
						_self.defaultAddress.push(_self.userinfo.userAddress.city)
					}
					if (_self.userinfo.userAddress.county !== '') {
						_self.defaultAddress.push(_self.userinfo.userAddress.county)
					}
				})
			},
			
			// 保存地址
			handleSubmit () {
				this.loadingBtn = true
				this.$api.updateUserInfo(this.userinfo).then(res => {
					if (res.code === 200) {
						// 修改成功跳转页面
						timer = setTimeout(function() {
							_self.loadingBtn = false
							uni.showToast({
								title: '修改地址成功',
								icon: 'none'
							})
							setTimeout(() => {
								uni.switchTab({
									url:'./myinfo',
								})
							}, 300)
						},300)
					} else {
						timer = setTimeout(function() {
							_self.loadingBtn = false
							uni.showToast({
								title: '修改地址失败，' + res.msg,
								icon: 'none'
							}) 
							setTimeout(() => {
								uni.switchTab({
									url:'./myinfo',
								})
							}, 300)
						},300)
					}
				})
			}
		},
		onLoad(opts) {
			_self = this
			this.username = uni.getStorageSync('username_nitrogen')
			
			this.getUserinfo()
		},
		// 离开页面清楚定时器  ----------------------tabbar页面用 onHide()
		onUnload: function() {
			clearInterval(timer)
		}
	} 
</script>

<style lang="less">
	page {
		background-color: #efeff4
	}
	.content {
		padding-top: 20rpx;
		font-size: 28rpx;
		.address {
			background-color: #fff;
			padding-left: 30rpx;
			border-top-left-radius: 10rpx;
			border-top-right-radius: 10rpx;
			.item {
				box-sizing: border-box;
				
				height: 80rpx;
				display: flex;
				align-items: center;
				border-bottom: solid 1rpx #f5f5f5;
				.item_title {
					flex: 1;
				}
				.item_data {
				}
				text {
					color: #b1b1b1;
					font-size: 27rpx;
					margin-left: 30rpx;
					margin-right: 20rpx;
				}
				.item_data_nodata {
					color: #999999;
				}
			}
		}
		.detail {
			box-sizing: border-box;
			
			height: 120rpx;
			background-color: #fff;
			display: flex;
			border-bottom: solid 1rpx #f5f5f5;
			padding: 20rpx 50rpx 0 30rpx ;
			box-shadow: 5rpx 5rpx 5rpx #e6e6e6;
			border-bottom-left-radius: 10rpx;
			border-bottom-right-radius: 10rpx;
			.detail_title {
				flex: 1;
			}
			textarea {
				font-size: 28rpx;
				height: 100rpx;
				width: 500rpx;
				border-radius: 20rpx;
				text-align: right;
			}
		}
		button {
			margin-top: 30rpx;
			width: 400rpx;
		}
	}
</style>
