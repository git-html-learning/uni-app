<template>
	<view class="home">

		<view class="userinfo">
			<view class="username">
				欢迎用户：{{ username }}
			</view>
			<text></text>
			<button class="cu-btn" style="background-color: #6147f4;color: #fff;"
				@click="modalName='DialogModal1'">退出登录</button>
		</view>

		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''" @click="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white justify-end">
					<view class="content">
						<view style="fontWeight:bold;fontSize:36rpx;">提示</view>
					</view>
					<view class="action" @click="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					确定要退出登录吗？
				</view>
				<view class="cu-bar bg-white ">
					<view class="action">
						<button class="cu-btn line-blue margin-left-xl" @click="hideModal">取消</button>
					</view>
					<view class="action">
						<button class="cu-btn bg-red margin-right-xl" @click="logout">确定</button>
					</view>
				</view>
			</view>
		</view>

		<swiper circular :autoplay="true" :interval="5000" indicator-dots :duration="800">
			<swiper-item>
				<image src="../../static/1.jpeg"></image>
			</swiper-item>
		<!-- 	<swiper-item>
				<image src="../../static/2.jpeg"></image>
			</swiper-item> -->
		</swiper>
		<view style="height: 50px; ">
			<uni-row>
				<uni-col :span = "22">
					<uni-data-select  v-model="value" :localdata="options" @change="change"></uni-data-select>
				</uni-col>
				<uni-col :span = "2">
						<img @click = "reset()" src="@/static/刷新.png" style = "width: 20px; height: 20px; margin-top: 25px; " alt="">
				</uni-col>
			</uni-row>
					

		</view>

		<!-- 导航区域 -->
		<view class="nav" style="margin-top: 30px;">
					<view class="nav_item">
						<view class="iconfont" @click="register()" style = "height: 60px;">
							<img  src="@/static/冷藏车注册.png" style = "width: 45px; height: 45px;" alt="">
							</view>
						<text style = "margin-top: -10px;">冷藏车注册</text>
					</view>
					<view class="nav_item">
						<view class="iconfont" @click="position()" style = "height: 60px;">
							<img  src="@/static/定位.png" style = "width: 45px; height: 45px; " alt="">
							</view>
						<text>位置信息</text>
					</view>
				</view>
		<view class="nav" >
			<view class="nav_item">
				<view class="iconfont" @click="tem()">&#xe600;</view>
				<text>温湿度值</text>
			</view>
			<view class="nav_item">
				<view class="iconfont" @click="oil()">&#xe694;</view>
				<text>油位监控</text>
			</view>
		</view>
		<view class="nav">
			<view class="nav_item">
				<view class="iconfont aa" @click="tire()">&#xe678;</view>
				<text>胎温胎压</text>
			</view>
			<view class="nav_item">
				<view class="iconfont" @click="elec()">&#xe601;</view>
				<text>电器开关</text>
			</view>
		</view>
		<view class="nav">
			<view class="nav_item">
				<view class="iconfont" @click="door()">&#xe610;</view>
				<text>车门状态</text>
			</view>
			<view class="nav_item">
				<view class="iconfont" @click="vibration()">&#xe7a1;</view>
				<text>震动监测</text>
			</view>
		</view>

		<view>
			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message type="warn" message="请先选中冷藏车!!!" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>

	</view>
</template>

<script>
	import {
		getProduct
	} from "@/services/product";
	export default {
		data() {
			return {
				username: '',
				modalName: null,
				productKey: "",
				value: "",
				options: [

				],

			}
		},
		onShow() {
			// 获取用户名
			this.username = uni.getStorageSync('username_nitrogen')
			this.start()
			this.prepare();
		
		},
		methods: {
			prepare() {
				this.value = ""
				uni.setStorageSync('truck_productKey', this.value)
				getProduct().then((res) => {
					console.log(res)

					if (res.msg == "ok") {
						this.options = []
						res.data.productInfo.forEach(item => {
							if (item.productName !== "通宇项目司机") {
								var obj = {
									text: item.productName,
									value: item.productKey
								}
								this.options.push(obj)
							}

						})
						// this.options.pu
						console.log(this.options)
					}
				})
			},

			// 对话框隐藏
			hideModal() {
				this.modalName = null
			},
			// 登出
			logout() {
				this.flagNewUser = true
				this.modalName = null
				uni.reLaunch({
					url: '../login'
				})
			},
			async start() {
				const res = await this.$api.getProduct()
				// console.log("12");
				console.log(res);
				if (res.code == 200) {
					for (var i = 0; i < res.data.productInfo.length; i++) {
						if (res.data.productInfo[i].typeIdentify != "tysj") {
							// console.log(res.data.productInfo[i]);
							this.productKey = res.data.productInfo[i].productKey
						}
					}
					console.log(this.productKey);
					uni.setStorageSync('truck_productKey', this.productKey)
				}
			},
			register() {
				uni.navigateTo({
					url: "../details/register"
				})
			},
			position() {
				// console.log(this.value);
				if (this.value === "") {
					this.$refs.message.open()
				} else {
					uni.navigateTo({
						url: "../details/position"
					})
				}

			},
			tem() {
				if (this.value === "") {
					this.$refs.message.open()
				} else {
					uni.navigateTo({
						url: "../details/tem"
					})
				}

			},
			oil() {
				if (this.value === "") {
					this.$refs.message.open()
				} else {
					uni.navigateTo({
						url: "../details/oil"
					})
				}

			},
			tire() {
				if (this.value === "") {
					this.$refs.message.open()
				} else {
					uni.navigateTo({
						url: "../details/tire_tem"
					})
				}

			},
			elec() {
				if (this.value === "") {
					this.$refs.message.open()
				} else {
					uni.navigateTo({
						url: "../details/elec_switch"
					})
				}

			},
			door() {
				if (this.value === "") {
					this.$refs.message.open()
				} else {
					uni.navigateTo({
						url: "../details/door"
					})
				}

			},
			vibration() {
				if (this.value === "") {
					this.$refs.message.open()
				} else {
					uni.navigateTo({
						url: "../details/vibration"
					})
				}
			},
			change(index) {
				console.log(index)
				uni.setStorageSync('truck_productKey', index)
			},
			reset() {
				this.prepare()
			}
		}
	}
</script>

<style lang="scss">
	.home {
		.userinfo {
			display: flex;
			margin: 5px 0;
			padding: 10px;
			border-radius: 5px;
			background-color: #FFFFFF;
			align-items: center;
			justify-content: space-between;
			box-shadow: 0 0 5px $uni-border-color;
		}

		swiper {
			width: 750rpx;
			height: 380rpx;

			image {
				height: 100%;
				width: 100%;
			}
		}

		.nav {
			display: flex;

			.nav_item {
				width: 50%;
				text-align: center;

				view {
					width: 120rpx;
					height: 120rpx;
					// background-color: #6147f4;
					border-radius: 60rpx;
					margin: 10px auto;
					line-height: 120rpx;
					color: #6147f4;
					// color: #fff;
					font-size: 80rpx;
				}

				.aa {
					font-size: 120rpx;
				}

				text {
					font-size: 30rpx;
				}
			}
		}
	}

	//icon样式引入
	@font-face {
		font-family: 'iconfont';
		/* Project id 2801983 */
		src: url('//at.alicdn.com/t/font_2801983_huhg7kqb9de.woff2?t=1634782922777') format('woff2'),
			url('//at.alicdn.com/t/font_2801983_huhg7kqb9de.woff?t=1634782922777') format('woff'),
			url('//at.alicdn.com/t/font_2801983_huhg7kqb9de.ttf?t=1634782922777') format('truetype');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>

