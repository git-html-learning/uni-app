<template>
	<view class="tem">
		<view class="title1">
			{{productName}}
		</view>


		<view class="layout" v-if="dataShow">
			<view class="pic" style="width: 70%; margin-left: 15%; height: 150px; ">
				<img src=".../../static/卡车.png" alt="" style="margin-top: 10px; width:100%; height: 150px;" />
			</view>
			<view class="left-item">
				<table>
					<tr>
						<td style="background-color: #f9f9f9">胎2</td>
					</tr>
					<tr>
						<td v-show="normal1">正常</td>
						<td v-show="!normal1" style="color: red">异常</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[1].tireTemp)<parseInt(this.tireTemp) ? '' : 'error']">
							{{tireHandleData[1].tireTemp}}°C</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[1].tirePress)<parseInt(this.tirePress) ? '' : 'error']">
							{{tireHandleData[1].tirePress}}kPa</td>
					</tr>
				</table>
				<table>
					<tr>
						<td style="background-color: #f9f9f9">胎1</td>
					</tr>
					<tr>
						<td v-show="normal0">正常</td>
						<td v-show="!normal0" style="color: red">异常</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[0].tireTemp)<parseInt(this.tireTemp) ? '' : 'error']">
							{{tireHandleData[0].tireTemp}}°C</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[0].tirePress)<parseInt(this.tirePress) ? '' : 'error']">
							{{tireHandleData[0].tirePress}}kPa</td>
					</tr>
				</table>
				<table>
					<tr>
						<td style="background-color: #f9f9f9">胎6</td>
					</tr>
					<tr>
						<td v-show="normal5">正常</td>
						<td v-show="!normal5" style="color: red">异常</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[5].tireTemp)<parseInt(this.tireTemp) ? '' : 'error']">
							{{tireHandleData[5].tireTemp}}°C</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[5].tirePress)<parseInt(this.tirePress) ? '' : 'error']">
							{{tireHandleData[5].tirePress}}kPa</td>
					</tr>
				</table>

				<table>
					<tr>
						<td style="background-color: #f9f9f9">胎5</td>
					</tr>
					<tr>
						<td v-show="normal4">正常</td>
						<td v-show="!normal4" style="color: red">异常</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[4].tireTemp)<parseInt(this.tireTemp) ? '' : 'error']">
							{{tireHandleData[4].tireTemp}}°C</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[4].tirePress)<parseInt(this.tirePress) ? '' : 'error']">
							{{tireHandleData[4].tirePress}}kPa</td>
					</tr>
				</table>
				<table>
					<tr>
						<td style="background-color: #f9f9f9">胎10</td>
					</tr>
					<tr>
						<td v-show="normal9">正常</td>
						<td v-show="!normal9" style="color: red">异常</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[9].tireTemp)<parseInt(this.tireTemp) ? '' : 'error']">
							{{tireHandleData[9].tireTemp}}°C</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[9].tirePress)<parseInt(this.tirePress) ? '' : 'error']">
							{{tireHandleData[9].tirePress}}kPa</td>
					</tr>
				</table>
				<table>
					<tr>
						<td style="background-color: #f9f9f9">胎9</td>
					</tr>
					<tr>
						<td v-show="normal8">正常</td>
						<td v-show="!normal8" style="color: red">异常</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[8].tireTemp)<parseInt(this.tireTemp) ? '' : 'error']">
							{{tireHandleData[8].tireTemp}}°C</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[8].tirePress)<parseInt(this.tirePress) ? '' : 'error']">
							{{tireHandleData[8].tirePress}}kPa</td>
					</tr>
				</table>
			</view>
			<view class="left-num">
				<view class="first"></view>
				<view class="second"></view>
				<view class="third"></view>
			</view>
			<view class="right-num">
				<view class="first"></view>
				<view class="second"></view>
				<view class="third"></view>
			</view>
			<view class="right-item">
				<table>
					<tr>
						<td style="background-color: #f9f9f9">胎4</td>
					</tr>
					<tr>
						<td v-show="normal3">正常</td>
						<td v-show="!normal3" style="color: red">异常</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[3].tireTemp)<parseInt(this.tireTemp) ? '' : 'error']">
							{{tireHandleData[3].tireTemp}}°C</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[3].tirePress)<parseInt(this.tirePress) ? '' : 'error']">
							{{tireHandleData[3].tirePress}}kPa</td>
					</tr>
				</table>
				<table>
					<tr>
						<td style="background-color: #f9f9f9">胎3</td>
					</tr>
					<tr>
						<td v-show="normal2">正常</td>
						<td v-show="!normal2" style="color: red">异常</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[2].tireTemp)<parseInt(this.tireTemp) ? '' : 'error']">
							{{tireHandleData[2].tireTemp}}°C</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[2].tirePress)<parseInt(this.tirePress) ? '' : 'error']">
							{{tireHandleData[2].tirePress}}kPa</td>
					</tr>
				</table>
				<table>
					<tr>
						<td style="background-color: #f9f9f9">胎8</td>
					</tr>
					<tr>
						<td v-show="normal7">正常</td>
						<td v-show="!normal7" style="color: red">异常</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[7].tireTemp)<parseInt(this.tireTemp) ? '' : 'error']">
							{{tireHandleData[7].tireTemp}}°C</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[7].tirePress)<parseInt(this.tirePress) ? '' : 'error']">
							{{tireHandleData[7].tirePress}}kPa</td>
					</tr>
				</table>

				<table>
					<tr>
						<td style="background-color: #f9f9f9">胎7</td>
					</tr>
					<tr>
						<td v-show="normal6">正常</td>
						<td v-show="!normal6" style="color: red">异常</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[6].tireTemp)<parseInt(this.tireTemp )? '' : 'error']">
							{{tireHandleData[6].tireTemp}}°C</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[6].tirePress)<parseInt(this.tirePress) ? '' : 'error']">
							{{tireHandleData[6].tirePress}}kPa</td>
					</tr>
				</table>
				<table>
					<tr>
						<td style="background-color: #f9f9f9">胎12</td>
					</tr>
					<tr>
						<td v-show="normal11">正常</td>
						<td v-show="!normal11" style="color: red">异常</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[11].tireTemp)<parseInt(this.tireTemp) ? '' : 'error']">
							{{tireHandleData[11].tireTemp}}°C</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[11].tirePress)<parseInt(this.tirePress) ? '' : 'error']">
							{{tireHandleData[11].tirePress}}kPa</td>
					</tr>
				</table>
				<table>
					<tr>
						<td style="background-color: #f9f9f9">胎11</td>
					</tr>
					<tr>
						<td v-show="normal10">正常</td>
						<td v-show="!normal10" style="color: red">异常</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[10].tireTemp)<parseInt(this.tireTemp) ? '' : 'error']">
							{{tireHandleData[10].tireTemp}}°C</td>
					</tr>
					<tr>
						<td :class="[parseInt(tireHandleData[10].tirePress)<parseInt(this.tirePress) ? '' : 'error']">
							{{tireHandleData[10].tirePress}}kPa</td>
					</tr>
				</table>
			</view>
		</view>

		<view class="layout1" v-if="!dataShow" style="line-height: 50px; text-align: center; margin-top: 50px;">
			当前设备未注册胎温胎压设备，暂无数据！！
		</view>
		<view class="title" v-show="dataShow">
			胎温胎压历史数据
		</view>
		<view v-if="dataShow">
			<!-- <u-dropdown>
				<u-dropdown-item v-model="value" height="400px" title="选择轮胎" :options="options" @change="change">
				</u-dropdown-item>
			</u-dropdown> -->
			<u-tabs :list="list" :is-scroll="true" :current="current" @change="change"></u-tabs>
		</view>
		<view style="text-align: center;margin-top: 15px;" v-show="dataShow">
			{{tire}}
		</view>
		<view class="charts-box" v-show="dataShow">
			<qiun-data-charts type="line" :chartData="chartData" background="none" :opts="chartOptions" />
		</view>
	</view>
</template>

<script>
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';

	export default {
		components: {
			tTable,
			tTh,
			tTr,
			tTd
		},
		data() {
			return {
				dataShow: false,
				productName: "",
				list: [{
					name: '胎1'
				}, {
					name: '胎2'
				}, {
					name: '胎3',
				}, {
					name: '胎4',
				}, {
					name: '胎5',
				}, {
					name: '胎6',
				}, {
					name: '胎7',
				}, {
					name: '胎8',
				}, {
					name: '胎9',
				}, {
					name: '胎10',
				}, {
					name: '胎11',
				}, {
					name: '胎12',
				}],
				current: 0,
				tableList: [{
						name: '胎1',
						temp: '20.0',
						pressure: '30',
						time: '2021-09-11 10:00:00'
					},
					{
						name: '胎2',
						temp: '21.0',
						pressure: '30',
						time: '2021-09-11 10:00:00'
					},
					{
						name: '胎3',
						temp: '20.0',
						pressure: '30',
						time: '2021-09-11 10:00:00'
					},
					{
						name: '胎4',
						temp: '20.0',
						pressure: '30',
						time: '2021-09-11 10:00:00'
					},
					{
						name: '胎5',
						temp: '20.0',
						pressure: '30',
						time: '2021-09-11 10:00:00'
					},
					{
						name: '胎6',
						temp: '20.0',
						pressure: '30',
						time: '2021-09-11 10:00:00'
					},
					{
						name: '胎7',
						temp: '20.0',
						pressure: '30',
						time: '2021-09-11 10:00:00'
					},
					{
						name: '胎8',
						temp: '20.0',
						pressure: '30',
						time: '2021-09-11 10:00:00'
					},
					{
						name: '胎9',
						temp: '20.0',
						pressure: '30',
						time: '2021-09-11 10:00:00'
					},
					{
						name: '胎10',
						temp: '20.0',
						pressure: '30',
						time: '2021-09-11 10:00:00'
					},
					{
						name: '胎11',
						temp: '20.0',
						pressure: '30',
						time: '2021-09-11 10:00:00'
					},
					{
						name: '胎12',
						temp: '20.0',
						pressure: '30',
						time: '2021-09-11 10:00:00'
					},

				],
				value: 1,
				tire: "胎1",
				options: [{
						label: '胎1',
						value: 1,
					},
					{
						label: '胎2',
						value: 2,
					},
					{
						label: '胎3',
						value: 3,
					},
					{
						label: '胎4',
						value: 4,
					},
					{
						label: '胎5',
						value: 5,
					},
					{
						label: '胎6',
						value: 6,
					},
					{
						label: '胎7',
						value: 7,
					},
					{
						label: '胎8',
						value: 8,
					},
					{
						label: '胎9',
						value: 9,
					},
					{
						label: '胎10',
						value: 10,
					},
					{
						label: '胎11',
						value: 11,
					},
					{
						label: '胎12',
						value: 12,
					},
				],
				productKey: "",
				tireDkList: [],
				tireOriData: [],
				tireHandleData: [],
				hisDate: [],
				hisTemp: [],
				hisHumi: [],
				chartData: {
					"categories": [],
					"series": [{
							"index": 0,
							"name": "",
							"data": []
						},
						{
							"index": 1,
							"name": "",
							"data": []
						},
					]
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
						"data": [{
							"position": 'left',
							"title": "胎温/℃"
						}, {
							"position": 'right',
							"title": "胎压/bar"
						}]

					},
					"legend": {},
					"extra": {
						"line": {
							"type": "straight",
							"width": 2
						},
					}
				},
				tireDkList: [],
				tireTemp: '90',
				tirePress: '5000',
				normal1: true,
				normal2: true,
				normal3: true,
				normal4: true,
				normal5: true,
				normal6: true,
				normal7: true,
				normal8: true,
				normal9: true,
				normal10: true,
				normal11: true,

			};
		},
		onShow() {
			this.productKey = uni.getStorageSync('truck_productKey')
			// console.log(this.productKey);
			this.start()
		},
		methods: {
			async start() {

				this.tireTemp = uni.getStorageSync('tireTemp')
				this.tirePress = uni.getStorageSync('tirePress')
				const res = await this.$api.getDeviceList(this.productKey)
				// console.log(res);
				if (res.code == 200) {
					this.productName = res.data.productName;
					this.tireDkList = [];
					for (var i = 0; i < res.data.deviceInfo.length; i++) {
						if (res.data.deviceInfo[i].deviceType == "TireTempPress") {
							this.tireDkList.push(res.data.deviceInfo[i].deviceKey);
						}
					}
					console.log(this.tireDkList);
					if (this.tireDkList.length == 0) {
						console.log("无数据")
					} else {
						this.dataShow = true;
						this.getTire()

					}

				}
			},
			getTire() {
				this.$api.getDeviceData({
					productKey: this.productKey,
					deviceKeyList: this.tireDkList
				}).then((res) => {
					if (res.code == 200) {
						console.log(res)
						for (var i = 0; i < res.data.deviceData.length; i++) {
							var obj = {
								tire: res.data.deviceData[i].deviceName,
								tirePress: (res.data.deviceData[i].tirePress * 10 / 10000).toFixed(1),
								tireTemp: (res.data.deviceData[i].tireTemp).toFixed(1),
								time: res.data.deviceData[i].date,
								dk: res.data.deviceData[i].deviceKey,
							};
							this.tireOriData.push(obj);
						}

						// console.log("tireOriData", this.tireOriData);
						this.tireHandleData = JSON.parse(JSON.stringify(this.tireOriData));

						if (parseInt(this.tireHandleData[1].tireTemp) < parseInt(this.tireTemp) && parseInt(this
								.tireHandleData[1].tirePress) < parseInt(this.tirePress)) {
							this.normal1 = true
						} else {
							this.normal1 = false
						}
						if (parseInt(this.tireHandleData[0].tireTemp) < parseInt(this.tireTemp) && parseInt(this
								.tireHandleData[0].tirePress) < parseInt(this.tirePress)) {
							this.normal0 = true
						} else {
							this.normal0 = false
						}
						if (parseInt(this.tireHandleData[2].tireTemp) < parseInt(this.tireTemp) && parseInt(this
								.tireHandleData[2].tirePress) < parseInt(this.tirePress)) {
							this.normal2 = true
						} else {
							this.normal2 = false
						}

						if (parseInt(this.tireHandleData[3].tireTemp) < parseInt(this.tireTemp) && parseInt(this
								.tireHandleData[3].tirePress) < parseInt(this.tirePress)) {
							this.normal3 = true
						} else {
							this.normal3 = false
						}
						if (parseInt(this.tireHandleData[4].tireTemp) < parseInt(this.tireTemp) && parseInt(this
								.tireHandleData[4].tirePress) < parseInt(this.tirePress)) {
							this.normal4 = true
						} else {
							this.normal4 = false
						}
						if (parseInt(this.tireHandleData[5].tireTemp) < parseInt(this.tireTemp) && parseInt(this
								.tireHandleData[5].tirePress) < parseInt(this.tirePress)) {
							this.normal5 = true
						} else {
							this.normal5 = false
						}
						if (parseInt(this.tireHandleData[6].tireTemp) < parseInt(this.tireTemp) && parseInt(this
								.tireHandleData[6].tirePress) < parseInt(this.tirePress)) {
							this.normal6 = true
						} else {
							this.normal6 = false
						}
						if (parseInt(this.tireHandleData[7].tireTemp) < parseInt(this.tireTemp) && parseInt(this
								.tireHandleData[7].tirePress) < parseInt(this.tirePress)) {
							this.normal7 = true
						} else {
							this.normal7 = false
						}
						if (parseInt(this.tireHandleData[8].tireTemp) < parseInt(this.tireTemp) && parseInt(this
								.tireHandleData[8].tirePress) < parseInt(this.tirePress)) {
							this.normal8 = true
						} else {
							this.normal8 = false
						}
						if (parseInt(this.tireHandleData[9].tireTemp) < parseInt(this.tireTemp) && parseInt(this
								.tireHandleData[9].tirePress) < parseInt(this.tirePress)) {
							this.normal9 = true
						} else {
							this.normal9 = false
						}
						if (parseInt(this.tireHandleData[10].tireTemp) < parseInt(this.tireTemp) && parseInt(this
								.tireHandleData[10].tirePress) < parseInt(this.tirePress)) {
							this.normal10 = true
						} else {
							this.normal10 = false
						}
						if (parseInt(this.tireHandleData[11].tireTemp) < parseInt(this.tireTemp) && parseInt(this
								.tireHandleData[11].tirePress) < parseInt(this.tirePress)) {
							this.normal11 = true
						} else {
							this.normal11 = false
						}







						console.log(this.tireHandleData);
						this.tireHandleData.sort(function(a, b) {
							var tireA = a.tire.toUpperCase(); // ignore upper and lowercase
							var tireB = b.tire.toUpperCase(); // ignore upper and lowercase
							if (tireA < tireB) {
								return -1;
							}
							if (tireA > tireB) {
								return 1;
							}
							return 0;
						});
						for (var i = 0; i < this.tireHandleData.length; i++) {
							this.tireHandleData[i].tire = "胎" + (i + 1);

						}
						this.getHisData()
					}
				})
				// console.log(res);

			},
			async getHisData() {
				this.hisDate = []
				this.hisTireTemp = []
				this.hisTirePress = []
				const res = await this.$api.getDeviceHisData({
					productKey: this.productKey,
					deviceKey: this.tireHandleData[0].dk,
					num: 10
				})
				console.log(res);
				if (res.code == 200) {
					for (var i = 0; i < res.data.deviceData.length; i++) {
						this.hisDate.push(res.data.deviceData[i].date);
						this.hisTireTemp.push(res.data.deviceData[i].tireTemp);
						this.hisTirePress.push(res.data.deviceData[i].tirePress);
					}
				}
				console.log(this.hisDate);
				console.log(this.hisTireTemp);
				console.log(this.hisTirePress);
				this.chartData.categories = this.hisDate
				this.chartData.series[0].name = "胎温"
				this.chartData.series[0].data = this.hisTireTemp
				this.chartData.series[1].name = "胎压"
				this.chartData.series[1].data = this.hisTirePress
			},
			change(index) {
				// console.log(index);
				this.current = index;
				this.hisDate = []
				this.hisTireTemp = []
				this.hisTirePress = []
				console.log(this.tireHandleData[index]);
				this.tire = "胎" + (index + 1)
				this.$api.getDeviceHisData({
					productKey: this.productKey,
					deviceKey: this.tireHandleData[index].dk,
					num: 10
				}).then((res) => {
					console.log(res);
					if (res.code == 200) {
						for (var i = 0; i < res.data.deviceData.length; i++) {
							this.hisDate.push(res.data.deviceData[i].date);
							this.hisTireTemp.push(res.data.deviceData[i].tireTemp);
							this.hisTirePress.push(res.data.deviceData[i].tirePress);
						}
						this.chartData.categories = this.hisDate
						this.chartData.series[0].name = "胎温"
						this.chartData.series[0].data = this.hisTireTemp
						this.chartData.series[1].name = "胎压"
						this.chartData.series[1].data = this.hisTirePress
					}
				})

			},
			edit(item) {
				uni.showToast({
					title: item.name,
					icon: 'none'
				});
			}
		}
	};
</script>

<style lang="scss">
	.tem {
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

		.layout {
			// margin-left: 1%;
			background-color: #fff;
			position: relative;
			overflow: hidden;
			margin-top: 2px;
			margin-left: 2%;
			width: 96%;
			height: 550px;
			border: 1px solid black;
			border-radius: 20px;
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

		.layout .pic {
			width: 350px;
			height: 130px;
			/* border: 1px solid black;            */
		}

		.left-item {
			width: 40%;
			height: 100%;
			float: left;

			/* border: 1px solid black;  */
		}

		.right-item {
			width: 40%;
			height: 100%;
			float: right;
			/* border: 1px solid black;  */
		}

		table {
			border-right: 1px solid #e8ebf3;
			border-top: 1px solid #e8ebf3;
			border-collapse: collapse;
			// margin-left: 10px;
			margin-top: 35px;
			float: left;
		}

		.left-item table {
			margin-left: 10px;
		}

		.right-item table {
			float: right;
			margin-right: 10px;
		}

		td {
			border-left: 1px solid #e8ebf3;
			border-bottom: 1px solid #e8ebf3;
			font-size: 14px;
			padding: 2px 3px;
		}

		.left-num {
			float: left;
			width: 10%;
			height: 100%;
		}

		.right-num {
			float: left;
			width: 10%;
			height: 100%;
		}

		.first {
			margin-top: 30px;
			width: 100%;
			height: 58px;
			border-bottom: 1px solid black;
			border-right: 1px solid black;
		}

		.second {
			width: 100%;
			height: 130px;
			/* background-color: rgb(23, 39, 79);    */
			border-bottom: 1px solid black;
			border-right: 1px solid black;
		}

		.third {
			width: 100%;
			height: 125px;
			/* background-color: rgb(69, 141, 51); */
			border-bottom: 1px solid black;
			border-right: 1px solid black;
		}

		.right-num .first {
			border-right: none;
		}

		.right-num .second {
			border-right: none;
		}

		.right-num .third {
			border-right: none;
		}

		.left-num table {
			margin-top: 50px;
			margin-left: 1px;
			width: 47px;
			// border: none;
		}

		.right-num table {
			// margin-top: 50px;
			margin-right: 12px;
			width: 47px;
			// border: none;
		}

		.left-num tr td {
			border-bottom: 1px solid;
			// border-left: none;
		}

	}

	.error {
		color: red;
	}
</style>
