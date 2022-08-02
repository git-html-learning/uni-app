<template>
	<view class="oil">
		<view class="" v-if="dataShow">
			<view class="title1">
				{{productName}}
			</view>
			<u-notice-bar mode="horizontal" :list="list" type="success" v-if="!noticeShow"></u-notice-bar>
			<u-notice-bar mode="horizontal" :list="list" type="success" color="#ff9649" background-color="#fff8e7"
				v-if="noticeShow"></u-notice-bar>
			<view class="charts-box">
				<qiun-data-charts type="arcbar" :chartData="chartData" :opts="options" background="none" />
			</view>
		</view>
		<view class="layout1" v-if="!dataShow" style="line-height: 50px; text-align: center; margin-top: 50px;">
			当前设备未注册胎温胎压设备，暂无数据！！
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataShow: true,
				productName: "",
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
				oilDkList: [],
				oilThres: "10",
				noticeShow: false,

			};
		},
		onShow() {
			this.productKey = uni.getStorageSync('truck_productKey')
			console.log(this.chartData.series[0].data);
			this.start()
		},
		methods: {
			async start() {
				const res = await this.$api.getDeviceList(this.productKey)
				if (res.code == 200) {
					this.productName = res.data.productName
					for (var i = 0; i < res.data.deviceInfo.length; i++) {
						if (res.data.deviceInfo[i].deviceType == "oil") {
							this.oilDkList.push(res.data.deviceInfo[i].deviceKey);
						}
					}
					// console.log(this.humiDkList);
					if (this.oilDkList.length !== 0) {
						this.dataShow = true
						this.getOil()
					} else {
						this.dataShow = false
					}

				}
			},
			async getOil() {
				const res = await this.$api.getDeviceData({
					productKey: this.productKey,
					deviceKeyList: this.oilDkList
				})
				console.log(res);
				if (res.code == 200) {
					if (res.data.deviceData[0].oil < 0) {
						this.oillevel = 0
					} else {
						this.oillevel = res.data.deviceData[0].oil
					}
					this.oilThres = uni.getStorageSync("oil")
					console.log(this.oilThres)
					if (this.oilThres <= this.oillevel) {

						this.options.title.name = this.oillevel + "%"
						this.chartData.series[0].data = (this.oillevel) / 100
						this.list[0] = "当前油量为" + this.oillevel + "%"
						this.noticeShow = false
					} else {
						this.options.title.name = this.oillevel + "%"
						this.chartData.series[0].data = (this.oillevel) / 100
						this.list[0] = "当前油量为" + this.oillevel + "，低于设定阈值" + this.oilThres
						this.list[1] = "请注意！！！"
						this.noticeShow = true
					}
				} else {
					// console.log(res.code)
					// this.oillevel = 0
					// this.options.title.name = this.oillevel + "%"
					// this.chartData.series[0].data = (this.oillevel) / 100
					// this.list[0] = "当前车辆无油位数据"
					// this.options.subtitle.name = "当前车辆无油位数据"
					uni.showToast({
						title: res.msg,
						icon :'none'
					})
				}

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

	.layout1 {
		background-color: #fff;
		position: relative;
		overflow: hidden;
		margin-top: 2px;
		margin-left: 4%;
		width: 350px;
		height: 50px;
		border: 1px solid black;
		border-radius: 20px;
	}
</style>
