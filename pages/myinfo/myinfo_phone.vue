<template>
	<view class="content">
		<view class="title">设置手机号</view>
		<view class="data">
			<view class="data_title">手机号</view>
			<input type="text" v-model="phone" placeholder="请输入您的手机号"/>
		</view>
		<view class="operation">
			<button class="cu-btn lg" style="background-color: #6147f4;color: #fff;" @click="handleSubmit" :loading="loadingBtn">提交</button>
		</view>
	</view>
</template>

<script>
	// 修改成后定时跳转的定时器
	var timer
	var _self
	export default {
		data() {
			return {
				username: '',
				phone: '',
				
				// 用于提交的信息
				userinfo: {},
				
				loadingBtn: false,
				
			}
		},
		methods: {
			// 得到用户信息
			getUserinfo () {
				this.$api.getUserInfo(this.username).then(res => {
					console.log(res)
					if (res.code === 200) {
						_self.userinfo = res.data
						_self.phone = res.data.phone
					} else {
						uni.showToast({
							title: '获取用户信息失败',
							icon: 'none'
						})
					}
				})
			},
			// 修改
			handleSubmit () {
				this.userinfo.phone = this.phone
				this.loadingBtn = true
				this.$api.updateUserInfo(this.userinfo).then(res => {
					if (res.code === 200) {
						// 修改成功跳转页面
						timer = setTimeout(function() {
							uni.showToast({
								title: '修改邮箱成功',
								icon: 'none',
								duration: 2000
							})
							_self.loadingBtn = false
							setTimeout(() => {
								uni.switchTab({
									url:'./myinfo',
								})
							}, 300)
						},500)
					} else {
						timer = setTimeout(function() {
							uni.showToast({
								title: '修改邮箱失败，' + res.msg,
								icon: 'none',
								duration: 2000
							})
							_self.loadingBtn = false
							setTimeout(() => {
								uni.switchTab({
									url:'./myinfo',
								})
							}, 300)
						},500)
					}
				})
			}
		},
		onLoad(opts) {
			_self = this
			this.username = uni.getStorageSync('username_nitrogen')
			
			this.getUserinfo()
		},
		// 离开页面清除定时器
		onUnload: function() {
			clearInterval(timer)
		}
	}
</script>

<style lang="less">
	page {
		background-color: #fff;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		.title {
			height: 300rpx;
			font-size: 35rpx;
			font-weight: 600;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.data {
			width: 500rpx;
			height: 90rpx;
			display: flex;
			align-items: center;
			border-top: solid 1rpx #eee;
			border-bottom: solid 1rpx #eee;
			.data_title {
				width: 150rpx;
			}
			input {
				font-size: 28rpx;
			}
		}
		.operation {
			margin-top: 600rpx;
			button {
				width: 400rpx;
			}
		}
	}
</style>
