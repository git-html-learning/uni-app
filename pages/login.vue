<template>
	<view class="page-login">

		<image class="login-image" src="../static/img/bgimg.jpg"></image>
		<view class="login-box">
			<view class="login-title">{{ title }}</view>
			<view class="login-item">
				<text class="iconfont icon-dingbudaohang-zhangh"></text>
				<input v-model="username" type="text" placeholder="请输入账号" />
			</view>
			<view class="login-item">
				<text class="iconfont icon-mima"></text>
				<input v-model="password" type="password" placeholder="请输入密码" />
			</view>
			<!-- <u-toast ref="uToast" /> -->
			<view class="login-item">
				<button :style="{ width:'100%' }" :loading="loadingBtn" class="cu-btn lg"
					style="background-color: #6147f4;color: #fff;" @click="handleLogin">登录</button>
			</view>
			<view class="login-item">
				<checkbox-group class="flex" @change="CheckboxChange">
					<checkbox class='blue' :class="checkbox[0].checked?'checked':''"
						:checked="checkbox[0].checked?true:false" value="a"></checkbox>
					<view class="login-item-memory" @tap="CheckboxChange">记住密码</view>
				</checkbox-group>
			</view>
		</view>



	</view>
</template>

<script>
	import {
		store
	} from '../store/store.js'
	export default {
		data() {
			return {

				title: '冷藏车监控',
				username: '',
				password: '',
				memory: 1,
				info: '',

				loadingBtn: false,
				checkbox: [{
					checked: true
				}]
			}
		},
		onLoad() {},
		onShow() {
			this.username = uni.getStorageSync('username_nitrogen')
			let memory = uni.getStorageSync('memory_nitrogen')
			if (isNaN(parseInt(memory))) return
			this.checkbox[0].checked = parseInt(memory) === 1 ? true : false
			if (parseInt(memory) !== 1) return
			this.password = uni.getStorageSync('password_nitrogen')
		},
		methods: {
			// 登录
			handleLogin() {
				// 预校验
				if (this.username === '') {
					uni.showToast({
						title: '请输入用户名',
						icon: 'none'
					})
					return
				} else if (this.password === '') {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return
				}
				this.loadingBtn = true
				this.$api.login(this.username, this.password).then((res) => {
					this.loadingBtn = false
					console.log(res);
					this.info = res.msg
					// this.$refs.uToast.show({
					// 	title: this.info,
					// 	type: 'success',
					// })
					if (res.code === 200) {
						//	保存token
						uni.setStorageSync('token_nitrogen', res.data.token)
						// 保存用户名
						uni.setStorageSync('username_nitrogen', this.username)
						uni.setStorageSync('memory_nitrogen', this.checkbox[0].checked ? 1 : 0)
						if (this.checkbox[0].checked) {
							uni.setStorageSync('password_nitrogen', this.password)
						} else {
							uni.removeStorage({
								key: 'password_nitrogen'
							})
						}

						// 跳转
						uni.switchTab({
							// url: "./nitrogen/nitrogen",
							url: "./homepage/home"
						})
					} else {
						console.log(res)
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},

			CheckboxChange(e) {
				this.checkbox[0].checked = !this.checkbox[0].checked
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page-login {
		height: calc(100vh - 45px);
		z-index: 30;

		.login-image {
			z-index: 1;
			position: absolute;
			height: calc(100vh - 45px);
			filter: blur(3px);
			width: 100vh;
		}

		.login-box {
			position: absolute;
			z-index: 2;
			top: 15%;
			width: 90%;
			padding: 40px 30px;
			margin-left: 5%;
			border: solid 1px $uni-border-color;
			border-radius: 8px;
			background-color: rgba($color: #FFFFFF, $alpha: .2);

			.login-title {
				font-size: 30px;
				text-align: center;
				margin-bottom: 40px;
			}

			.login-item {
				width: 100%;
				height: 40px;
				margin-bottom: 20px;
				display: flex;
				align-items: center;
				border-bottom: solid 1px $uni-border-color;
				color: rgba($color: #000000, $alpha: .6);

				.iconfont {
					font-size: 22px;
					margin-right: 5px;
					color: rgba($color: #000000, $alpha: .5);
				}

				.login-item-memory {
					margin-left: 5px;
					color: #FFFFFF;
					display: flex;
					justify-content: center;
					position: relative;
					top: 3px;
				}

			}

			.login-item:last-child {
				border-bottom: none;
			}
		}
	}
</style>
