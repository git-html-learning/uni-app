<template>
	<view class="home">
		<view class="" v-if="dataShow">
			<view class="title1">
				{{productName}}
			</view>
			<view class="charts-box">
				<qiun-data-charts type="line" :chartData="chartData" background="none" :opts="chartOptions" />
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
				productKey: "",
				productName: "",
				accDkList: [],
				humiOriData: [],
				humiHandleData: [],
				hisVibDate: [],
				hisVib: [],
				chartData: {
					"categories": [],
					"series": [{
						"name": "",
						"data": []
					}]
				},
				chartOptions: {
					"type": "line",
					"dataLabel": false,
					"padding": [15, 10, 0, 15],
					"xAxis": {
						"disableGrid": true,
						// "rotateLabel":true,
						"labelCount": 2,
					},
					"yAxis": {
						"gridType": "dash",
						"dashLength": 2,
						"showTitle": true,
						"splitNumber": 2,
						"data": [{
							"position": 'left',
							"title": "震动值"
						}]

					},
					"legend": {},
					"extra": {
						"line": {
							"type": "straight",
							"width": 2
						},
					}
				}

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
				if (res.code == 200) {
					this.accDkList = []
					this.productName = res.data.productName;
					for (var i = 0; i < res.data.deviceInfo.length; i++) {
						if (res.data.deviceInfo[i].deviceType == "acc") {
							this.accDkList.push(res.data.deviceInfo[i].deviceKey);
						}
					}
					// console.log(this.humiDkList);
					this.getHisData()
				}
				console.log(this.accDkList)
			},
			// async getVib() {
			// 	const res = await this.$api.getDeviceData({
			// 		productKey: this.productKey,
			// 		deviceKeyList: this.accDkList
			// 	})
			// 	console.log(res);
			// 	if (res.code == 200) {
			// 		for (var i = 0; i < res.data.deviceData.length; i++) {
			// 			var obj = {
			// 				sensor: res.data.deviceData[i].deviceName,
			// 				temp: res.data.deviceData[i].temp,
			// 				humi: res.data.deviceData[i].humi,
			// 				time: res.data.deviceData[i].date,
			// 				oil: res.data.deviceData[i].oil,
			// 				dk: res.data.deviceData[i].deviceKey,
			// 			};
			// 			this.humiOriData.push(obj);
			// 		}
			// 		// console.log("humiOriData", this.humiOriData);
			// 		this.humiHandleData = JSON.parse(JSON.stringify(this.humiOriData));
			// 		// console.log(this.humiHandleData);
			// 		this.humiHandleData.sort(function(a, b) {
			// 			var sensorA = a.sensor.toUpperCase(); // ignore upper and lowercase
			// 			var sensorB = b.sensor.toUpperCase(); // ignore upper and lowercase
			// 			if (sensorA < sensorB) {
			// 				return -1;
			// 			}
			// 			if (sensorA > sensorB) {
			// 				return 1;
			// 			}
			// 			return 0;
			// 		});
			// 		for (var i = 0; i < this.humiHandleData.length; i++) {
			// 			this.humiHandleData[i].sensor = this.humiHandleData[i].sensor.replace(
			// 				"TH",
			// 				"温湿度节点"
			// 			);
			// 			// var obj1 = {
			// 			//   name: this.humiHandleData[i].sensor,
			// 			//   date: this.humiHandleData[i].time,
			// 			//   dk: this.humiHandleData[i].dk,
			// 			// };
			// 			// this.sensorList.push(obj1);
			// 		}
			// 		// console.log("humiHandleData", this.humiHandleData);
			// 		// console.log(this.sensorList);
			// 	}
			// 	this.getHisData()
			// },
			async getHisData() {
				this.hisVibDate = []
				this.hisVib = []
				if (this.accDkList.length !== 0) {
					this.dataShow = true
					this.hisEndTime = Date.parse(new Date()) / 1000;
					const res = await this.$api.getDeviceHisData({
						productKey: this.productKey,
						deviceKey: this.accDkList[0],
						num: 50
					})
					console.log(res);
					if (res.code == 200) {
						for (var i = 0; i < res.data.deviceData.length; i++) {
							this.hisVibDate.push(res.data.deviceData[i].date);
							var value =
								res.data.deviceData[i].acc.X +
								res.data.deviceData[i].acc.Y +
								res.data.deviceData[i].acc.Z;
							this.hisVib.push(value);
						}
						console.log("hisVibDate", this.hisVibDate);
						console.log("hisVib", this.hisVib);
						this.chartData.categories = this.hisVibDate
						this.chartData.series[0].name = "震动值"
						this.chartData.series[0].data = this.hisVib
					} else {
						uni.showToast({
							title: res.msg,
							icon :'none'
						})
					}
			
				} else {
					this.dataShow = false
				}

			},

		}
	}
</script>

<style lang="scss">
	.home {
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

		.charts-box {
			width: 100%;
			height: 300px;
		}
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
