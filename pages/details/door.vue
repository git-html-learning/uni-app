<template>
	<view class="door">
		<view class="title1">
			皖A85230
		</view>
		<view class="nav">
			<view class="nav_item">
				<view class="iconfont aa" v-show="door1">&#xe63d;</view>
				<view class="iconfont aa" v-show="!door1">&#xe7bb;</view>
				<text>门1</text>
			</view>
			<view class="nav_item">
				<view class="iconfont aa" v-show="door2">&#xe63d;</view>
				<view class="iconfont aa" v-show="!door2">&#xe7bb;</view>
				<text>门2</text>
			</view>
		</view>
		<view class="nav">
			<view class="nav_item1">
				<u-tag v-show="door1" text="已开启" type="error" />
				<u-tag v-show="!door1" text="已关闭" color="#6147f4" border-color="#6147f4" />
			</view>
			<view class="nav_item1">
				<u-tag v-show="door2" text="已开启" type="error" />
				<u-tag v-show="!door2" text="已关闭" color="#6147f4" border-color="#6147f4" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				door1: true,
				door2: false,
				productKey: "",
				doorDkList: [],
				doorOriData: [],
				doorHandleData: [],

			}
		},
		onShow() {
			this.productKey = uni.getStorageSync('truck_productKey')
			// console.log(this.productKey);
			this.start()
		},
		methods: {
			async start() {
				const res = await this.$api.getDeviceList(this.productKey)
				// console.log(res);
				if (res.code == 200) {
					for (var i = 0; i < res.data.deviceInfo.length; i++) {
						if (res.data.deviceInfo[i].deviceType == "door") {
							this.doorDkList.push(res.data.deviceInfo[i].deviceKey);
						}
					}
					// console.log(this.doorDkList);
					this.getDoor()
				}
			},
			async getDoor() {
				const res = await this.$api.getDeviceData({
					productKey: this.productKey,
					deviceKeyList: this.doorDkList
				})
				// console.log(res);
				if (res.code == 200) {
					for (var i = 0; i < res.data.deviceData.length; i++) {
						var obj = {
							doorName: res.data.deviceData[i].deviceName,
							state: res.data.deviceData[i].door,
							date: res.data.deviceData[i].date,
							dk: res.data.deviceData[i].deviceKey,
						};
						this.doorOriData.push(obj);
					}
					// console.log("doorOriData", this.doorOriData);
					this.doorHandleData = JSON.parse(JSON.stringify(this.doorOriData));
					// console.log("doorHandleData",this.doorHandleData);
					this.doorHandleData.sort(function(a, b) {
						var doorA = a.doorName.toUpperCase(); // ignore upper and lowercase
						var doorB = b.doorName.toUpperCase(); // ignore upper and lowercase
						if (doorA < doorB) {
							return -1;
						}
						if (doorA > doorB) {
							return 1;
						}
						return 0;
					});
					console.log("doorHandleData", this.doorHandleData);
					this.door1 = this.doorHandleData[0].state.door_1;
					this.door2 = this.doorHandleData[1].state.door_2;
					// this.door2 = false
				}
			},
		}
	}
</script>

<style lang="scss">
	.door {
		// background-color: #eee;
		overflow: hidden;

		.title {
			height: 50px;
			line-height: 50px;
			color: #6147f4;
			text-align: center;
			letter-spacing: 5px;
			background-color: #fff;
			margin: 7rpx 0;
		}
		.title1 {
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

			.nav_item1 {
				width: 50%;
				text-align: center;

			}
		}
	}

	//icon样式引入
	@font-face {
		font-family: 'iconfont';
		/* Project id 2883334 */
		src: url('//at.alicdn.com/t/font_2883334_3mp9d9dqqqo.woff2?t=1634800079366') format('woff2'),
			url('//at.alicdn.com/t/font_2883334_3mp9d9dqqqo.woff?t=1634800079366') format('woff'),
			url('//at.alicdn.com/t/font_2883334_3mp9d9dqqqo.ttf?t=1634800079366') format('truetype');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
