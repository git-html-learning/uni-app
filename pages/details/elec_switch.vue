<template>
	<view class="elec">
		<view class="title">
			{{productName}}
		</view>

		<view class="nav">
			<view class="nav_item1">
				<text>照明灯</text>
				<view class="iconfont aa" v-show="!checked1">&#xe600;</view>
				<view class="iconfont bb" v-show="checked1">&#xe600;</view>
				<text v-show="!checked1">关</text>
				<u-switch v-model="checked1" @change="elecs1()" active-color="#6147f4"></u-switch>
				<text v-show="checked1">开</text>
			</view>
		</view>
		<view class="nav">
			<view class="nav_item">
				<text>杀菌灯</text>
				<view class="iconfont aa" v-show="!checked2">&#xe600;</view>
				<view class="iconfont bb" v-show="checked2">&#xe600;</view>
				<text v-show="!checked2">关</text>
				<u-switch v-model="checked2" @change="elecs2()" active-color="#6147f4"></u-switch>
				<text v-show="checked2">开</text>
			</view>
			<view class="nav_item">
				<text>消毒灯</text>
				<view class="iconfont aa" v-show="!checked3">&#xe600;</view>
				<view class="iconfont bb" v-show="checked3">&#xe600;</view>
				<text v-show="!checked3">关</text>
				<u-switch v-model="checked3" @change="elecs3()" active-color="#6147f4"></u-switch>
				<text v-show="checked3">开</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				productName:"",
				checked1: null,
				checked2: true,
				checked3: true,
				productKey: "",
				doorDkList: [],
				lightOriData: [],

			};
		},
		onShow() {
			this.productKey = uni.getStorageSync('truck_productKey')
			// console.log(this.productKey);
			this.start()
		},
		methods: {
			edit(item) {
				uni.showToast({
					title: item.name,
					icon: 'none'
				});
			},
			async start() {
				const res = await this.$api.getDeviceList(this.productKey)
				// console.log(res);
				if (res.code == 200) {
					this.productName = res.data.productName;
					for (var i = 0; i < res.data.deviceInfo.length; i++) {
						if (res.data.deviceInfo[i].deviceType == "door") {
							this.doorDkList.push(res.data.deviceInfo[i].deviceKey);
						}
					}
					// console.log(this.doorDkList);
					this.getLight()
				}
			},
			async getLight() {
				const res = await this.$api.getDeviceData({
					productKey: this.productKey,
					deviceKeyList: this.doorDkList
				})
				// console.log(res);
				if (res.code == 200) {
					this.lightOriData = res.data.deviceData[0].electrical;
					switch (this.lightOriData[0]) {
						case 0:
							this.checked1 = false;
							break;
						case 1:
							this.checked1 = true;
							break;
					}
				}
			},
			elecs1() {
				console.log(this.checked1);
				// if (this.checked1 = true) {
				// 	console.log("正在开灯");
				// 	console.log(this.checked1);
				// } else if(this.checked1 = false) {
				// 	console.log("正在关灯");
				// }
			},
			elecs2() {
				console.log(this.checked2);
			},
			elecs3() {
				console.log(this.checked3);
			},

		}
	};
</script>

<style lang="scss">
	.elec {
		// background-color: #eee;
		overflow: hidden;

		.title {
			height: 50px;
			line-height: 50px;
			color: black;
			text-align: center;
			// letter-spacing: 5px;
			background-color: #fff;
			margin: 7rpx 0;
			font-size: 50rpx;
			border-bottom-style: solid;
			border-bottom-width: 0.5px;
		}

		.nav {
			display: flex;

			.nav_item {
				width: 50%;
				text-align: center;
				margin-top: 20px;

				.aa {
					width: 120rpx;
					height: 120rpx;
					margin: 10px auto;
					line-height: 120rpx;
					font-size: 80rpx;
					color: #515151;
				}

				.bb {
					width: 120rpx;
					height: 120rpx;
					margin: 10px auto;
					line-height: 120rpx;
					font-size: 80rpx;
					color: #6147f4;
				}

				text {
					font-size: 30rpx;
				}
			}

			.nav_item1 {
				width: 100%;
				text-align: center;
				margin-top: 20px;

				.aa {
					width: 120rpx;
					height: 120rpx;
					margin: 10px auto;
					line-height: 120rpx;
					font-size: 80rpx;
					color: #515151;
				}

				.bb {
					width: 120rpx;
					height: 120rpx;
					margin: 10px auto;
					line-height: 120rpx;
					font-size: 80rpx;
					color: #6147f4;
				}

				text {
					font-size: 30rpx;
				}
			}
		}

	}

	@font-face {
		font-family: 'iconfont';
		/* Project id 2813508 */
		src: url('//at.alicdn.com/t/font_2813508_nsfkrbudlj.woff2?t=1631670312511') format('woff2'),
			url('//at.alicdn.com/t/font_2813508_nsfkrbudlj.woff?t=1631670312511') format('woff'),
			url('//at.alicdn.com/t/font_2813508_nsfkrbudlj.ttf?t=1631670312511') format('truetype');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
