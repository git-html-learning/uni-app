<template>
	<view class="tem">
		<view class="title1">
			皖A85230
		</view>

		<!-- <view>
			<t-table>
				<t-tr>
					<t-th>传感器</t-th>
					<t-th>温度/℃</t-th>
					<t-th>压强/bar</t-th>
					<t-th>最后更新时间</t-th>
				</t-tr>
				<t-tr v-for="(item,index) in tableList" :key="index">
					<t-td>{{ item.name}}</t-td>
					<t-td>{{ item.temp }}</t-td>
					<t-td>{{ item.pressure }}</t-td>
					<t-td>{{ item.time }}</t-td>
				</t-tr>
			</t-table>
		</view> -->

		<view class="layout">
			<view class="pic">
				<img src=".../../static/卡车.png" alt=""
					style="margin-left: 22%; margin-top: 10px; width:200px; height: 150px;" />
			</view>
			<view class="left-item">
				<table>
					<tr>
						<td>胎2</td>
					</tr>
					<tr>
						<td>正常</td>
					</tr>
					<tr>
						<td>32°C</td>
					</tr>
					<tr>
						<td>6bar</td>
					</tr>
				</table>
				<table>
					<tr>
						<td>胎1</td>
					</tr>
					<tr>
						<td>正常</td>
					</tr>
					<tr>
						<td>32°C</td>
					</tr>
					<tr>
						<td>6bar</td>
					</tr>
				</table>
				<table>
					<tr>
						<td>胎6</td>
					</tr>
					<tr>
						<td>正常</td>
					</tr>
					<tr>
						<td>32°C</td>
					</tr>
					<tr>
						<td>6bar</td>
					</tr>
				</table>

				<table>
					<tr>
						<td>胎5</td>
					</tr>
					<tr>
						<td>正常</td>
					</tr>
					<tr>
						<td>32°C</td>
					</tr>
					<tr>
						<td>6bar</td>
					</tr>
				</table>
				<table>
					<tr>
						<td>胎10</td>
					</tr>
					<tr>
						<td>正常</td>
					</tr>
					<tr>
						<td>32°C</td>
					</tr>
					<tr>
						<td>6bar</td>
					</tr>
				</table>
				<table>
					<tr>
						<td>胎9</td>
					</tr>
					<tr>
						<td>正常</td>
					</tr>
					<tr>
						<td>32°C</td>
					</tr>
					<tr>
						<td>6bar</td>
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
						<td>胎4</td>
					</tr>
					<tr>
						<td>正常</td>
					</tr>
					<tr>
						<td>32°C</td>
					</tr>
					<tr>
						<td>6bar</td>
					</tr>
				</table>
				<table>
					<tr>
						<td>胎3</td>
					</tr>
					<tr>
						<td>正常</td>
					</tr>
					<tr>
						<td>32°C</td>
					</tr>
					<tr>
						<td>6bar</td>
					</tr>
				</table>
				<table>
					<tr>
						<td>胎8</td>
					</tr>
					<tr>
						<td>正常</td>
					</tr>
					<tr>
						<td>32°C</td>
					</tr>
					<tr>
						<td>6bar</td>
					</tr>
				</table>

				<table>
					<tr>
						<td>胎7</td>
					</tr>
					<tr>
						<td>正常</td>
					</tr>
					<tr>
						<td>32°C</td>
					</tr>
					<tr>
						<td>6bar</td>
					</tr>
				</table>
				<table>
					<tr>
						<td>胎12</td>
					</tr>
					<tr>
						<td>正常</td>
					</tr>
					<tr>
						<td>32°C</td>
					</tr>
					<tr>
						<td>6bar</td>
					</tr>
				</table>
				<table>
					<tr>
						<td>胎11</td>
					</tr>
					<tr>
						<td>正常</td>
					</tr>
					<tr>
						<td>32°C</td>
					</tr>
					<tr>
						<td>6bar</td>
					</tr>
				</table>
			</view>
		</view>


		<view class="title">
			胎温胎压历史数据
		</view>
		<view>
			<!-- <u-dropdown>
				<u-dropdown-item v-model="value" height="400px" title="选择轮胎" :options="options" @change="change">
				</u-dropdown-item>
			</u-dropdown> -->
			<u-tabs :list="list" :is-scroll="true" :current="current" @change="change"></u-tabs>
		</view>
		<view style="text-align: center;margin-top: 15px;">
			{{tire}}
		</view>
		<view class="charts-box">
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
				}

			};
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
						if (res.data.deviceInfo[i].deviceType == "TireTempPress") {
							this.tireDkList.push(res.data.deviceInfo[i].deviceKey);
						}
					}
					// console.log(this.tireDkList);
					this.getTire()
				}
			},
			async getTire() {
				const res = await this.$api.getDeviceData({
					productKey: this.productKey,
					deviceKeyList: this.tireDkList
				})
				// console.log(res);
				if (res.code == 200) {
					for (var i = 0; i < res.data.deviceData.length; i++) {
						var obj = {
							tire: res.data.deviceData[i].deviceName,
							tirePress: res.data.deviceData[i].tirePress,
							tireTemp: res.data.deviceData[i].tireTemp,
							time: res.data.deviceData[i].date,
							dk: res.data.deviceData[i].deviceKey,
						};
						this.tireOriData.push(obj);
					}
					// console.log("tireOriData", this.tireOriData);
					this.tireHandleData = JSON.parse(JSON.stringify(this.tireOriData));
					// console.log(this.tireHandleData);
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
						// var obj1 = {
						//   name: this.tireHandleData[i].tire,
						//   date: this.tireHandleData[i].time,
						//   dk: this.tireHandleData[i].dk,
						// };
						// this.tireList.push(obj1);
					}
					// console.log("tireHandleData", this.tireHandleData);
				}
				this.getHisData()
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
			background-color: #fff;
			position: relative;
			overflow: hidden;
			margin-top: 2px;
			margin-left: 4%;
			width: 350px;
			height: 550px;
			border: 1px solid black;
			border-radius: 20px;
		}

		.layout .pic {
			width: 350px;
			height: 130px;
			/* border: 1px solid black;            */
		}

		.left-item {
			width: 120px;
			height: 100%;
			float: left;
			
			/* border: 1px solid black;  */
		}

		.right-item {
			width: 120px;
			height: 100%;
			float: right;
			/* border: 1px solid black;  */
		}

		table {
			border-right: 1px solid;
			border-top: 1px solid;
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
			border-left: 1px solid;
			border-bottom: 1px solid;
			font-size: 14px;
			padding: 2px 3px;
		}

		.left-num {
			float: left;
			width: 54px;
			height: 100%;
		}

		.right-num {
			float: left;
			width: 54px;
			height: 100%;
		}

		.first {
			margin-top: 30px;
			width: 54px;
			height: 58px;
			border-bottom: 1px solid black;
			border-right: 1px solid black;
		}

		.second {
			width: 54px;
			height: 130px;
			/* background-color: rgb(23, 39, 79);    */
			border-bottom: 1px solid black;
			border-right: 1px solid black;
		}

		.third {
			width: 54px;
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
</style>
