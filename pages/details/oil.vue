<template>
	<view class="oil">
		<view class="title1">
			皖A85230
		</view>
		<!-- <view class="tip">
			剩余油量较充足，可放心使用！
		</view> -->
		<u-notice-bar mode="horizontal" :list="list" type="success"></u-notice-bar>
		<!-- <u-circle-progress active-color="#2979ff" :percent="oillevel">
			<view class="u-progress-content">
				<text>{{oillevel}}%</text>
			</view>
		</u-circle-progress> -->
		<view class="charts-box">
			<qiun-data-charts type="arcbar" :chartData="chartData" :opts="options" background="none" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oillevel: 0,
				list: [, "可放心使用！"],
				chartData: {
					categories: [],
					series: [{
						"color": "#2fc25b",
						"data": 0.1
					}],
				},
				options: {
					"type": "arcbar",
					"canvasId": "",
					"canvas2d": false,
					"background": "none",
					"animation": true,
					"timing": "easeOut",
					"duration": 1000,
					"color": [
						"#1890FF",
						"#91CB74",
						"#FAC858",
						"#EE6666",
						"#73C0DE",
						"#3CA272",
						"#FC8452",
						"#9A60B4",
						"#ea7ccc"
					],
					"rotate": false,
					"errorReload": true,
					"fontSize": 13,
					"fontColor": "#666666",
					"enableScroll": false,
					"touchMoveLimit": 60,
					"enableMarkLine": false,
					"dataLabel": true,
					"dataPointShape": true,
					"dataPointShapeType": "solid",
					"tapLegend": true,
					"title": {
						"name": null,
						"fontSize": 25,
						"color": "#00FF00",
						"offsetX": 0,
						"offsetY": 0
					},
					"subtitle": {
						"name": "当前油量",
						"fontSize": 15,
						"color": "#666666",
						"offsetX": 0,
						"offsetY": 0
					},
					"extra": {
						"arcbar": {
							"type": "default",
							"width": 12,
							"backgroundColor": "#E9E9E9",
							"startAngle": 0.75,
							"endAngle": 0.25,
							"gap": 2,
							"centerX": 0,
							"centerY": 0,
							"linearType": "none"
						}
					}
				},
				productKey: "",
				humiDkList: [],

			};
		},
		onShow() {
			// console.log(this.oillevel);
			// console.log(this.list);
			// console.log(this.options.title);
			this.productKey = uni.getStorageSync('truck_productKey')
			// console.log(this.productKey);
			console.log(this.chartData.series[0].data);
			this.start()
		},
		methods: {
			async start() {
				const res = await this.$api.getDeviceList(this.productKey)
				// console.log(res);
				if (res.code == 200) {
					for (var i = 0; i < res.data.deviceInfo.length; i++) {
						if (res.data.deviceInfo[i].deviceType == "TempAndHumi") {
							this.humiDkList.push(res.data.deviceInfo[i].deviceKey);
						}
					}
					// console.log(this.humiDkList);
					this.getOil()
				}
			},
			async getOil() {
				const res = await this.$api.getDeviceData({
					productKey: this.productKey,
					deviceKeyList: this.humiDkList
				})
				console.log(res);
				if (res.code == 200) {
					this.oillevel = res.data.deviceData[0].oil
					this.options.title.name = this.oillevel + "%"
					this.chartData.series[0].data = (this.oillevel) / 100
					this.list[0] = "当前油量为" + this.oillevel + "%"
					// console.log(this.chartData.series[0].data);
				}
				// console.log(this.oillevel);

			},

		}
	};
</script>

<style lang="scss">
	.oil {
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

		.tip {
			height: 50px;
			line-height: 50px;
			text-align: center;
			background-color: #eee;
		}
	}

	.u-progress-content {
		width: 500rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.charts-box {
		width: 100%;
		height: 375rpx;
		margin-top: 50px;
	}
</style>
