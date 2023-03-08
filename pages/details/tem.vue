<template>
	<view class="tem">
		<view class="title1">
			<text style = "text-align: center;">{{productName}}</text>
			
			
			
			<button size = "mini" type = "primary" style = "float: right; margin-top: 10px;" @click="open">
				阈值设置
			</button>

		</view>
		<uni-popup ref="popup" type="dialog">
				<view style="background-color: #fff;padding: 15px;">
				
							<uni-forms :modelValue="tempAndHumi"  label-position="top" label-width = "100px">
										<uni-forms-item label="温度最小值"  name = "tempDown">
											<uni-easyinput type="text" v-model="tempAndHumi.tempDown" placeholder="请输入" />
										</uni-forms-item>
										<uni-forms-item label="温度最大值" name="tempUp">
											<uni-easyinput type="text" v-model="tempAndHumi.tempUp" placeholder="请输入" />
										</uni-forms-item>
										<uni-forms-item label="湿度最小值" name="humiDown">
											<uni-easyinput type="text" v-model="tempAndHumi.humiDown" placeholder="请输入" />
										</uni-forms-item>
										<uni-forms-item label="湿度最大值" name="humiUp">
											<uni-easyinput type="text" v-model="tempAndHumi.humiUp" placeholder="请输入" />
										</uni-forms-item>
										<uni-forms-item >
											<button style = 'float: left'  @click = "close" type = "info">取消</button>
											<button style = 'float: right'  @click = "setting" type = "primary">修改</button>
										</uni-forms-item>
									</uni-forms>
						</view>
			<!-- <uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog> -->
<!-- 		<view >
			<input type="text">
			<input type="text">
		
		</view> -->
		
		</uni-popup>
		<t-table>
			<t-tr>
				<t-th>传感器</t-th>
				<t-th>温度/℃</t-th>
				<t-th>湿度/%</t-th>
				<t-th>最后更新时间</t-th>
			</t-tr>
			<t-tr v-for="(item,index) in humiHandleData" :key="index">
				<t-td>{{ item.sensor}}</t-td>
				<t-td>{{ item.temp }}℃</t-td>
				<t-td>{{ item.humi }}%</t-td>
				<t-td>{{ item.time }}</t-td>
			</t-tr>
		</t-table>
		<view class="title">
			温湿度历史数据
		</view>
		<u-dropdown height="50">
			<u-dropdown-item v-model="value" height="400" :title="sensor" :options="options" @change="change">
			</u-dropdown-item>
		</u-dropdown>
		<!-- <view style="text-align: center;margin-top: 15px;">
			{{sensor}}
		</view> -->
		<view class="charts-box">
			<qiun-data-charts type="line" :chartData="chartData" background="none" :opts="chartOptions" />
		</view>
		<view class="section section_gap" style = "margin-bottom: 20px;">
			<view class="body-view">
				<slider @change="slider3change" max="29" min="5" value="20" show-value />
			</view>
		</view>
	</view>
</template>

<script>
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
import { getDeviceData } from '../../services/device';
import { editProduct,getDeviceList } from '../../services/product';
	export default {
		components: {
			tTable,
			tTh,
			tTr,
			tTd
		},
		data() {
			return {
				value: 1,
				sensor: "温湿度节点1",
				options: [{
						label: '温湿度节点1',
						value: 1,
					},
					{
						label: '温湿度节点2',
						value: 2,
					},
					{
						label: '温湿度节点3',
						value: 3,
					},
					{
						label: '温湿度节点4',
						value: 4,
					},
					{
						label: '温湿度节点5',
						value: 5,
					},
					{
						label: '温湿度节点6',
						value: 6,
					},
					{
						label: '温湿度节点7(厢外)',
						value: 7,
					},
				],
				productKey: "",
				humiDkList: [],
				humiOriData: [],
				humiHandleData: [],
				hisDate: [],
				hisTemp: [],
				hisHumi: [],
				hisDate1: [],
				hisTemp1: [],
				hisHumi1: [],
				maxtemp: "",
				mintemp: "",
				maxhumi: "",
				minhumi: "",
				num: "5",
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
				productName: "",
				chartOptions: {
					"type": "line",
					"dataLabel": false,
					"padding": [15, 10, 0, 15],
					"xAxis": {
						"disableGrid": true,
						// "rotateLabel":true,
						"labelCount": 2,
						"formatter": function(value) {
							return value.slice(5, 10) + "\n" + value.slice(11, 16);
						},
						"textStyle": {
							"color": "#fff" //坐标值得具体的颜色
						}

					},
					"yAxis": {
						"gridType": "dash",
						"dashLength": 2,
						"showTitle": true,
						"splitNumber": 2,
						"data": [{
							"position": 'left',
							"title": "温度/℃"
						}, {
							"position": 'right',
							"title": "湿度/%"
						}]

					},
					"legend": {},

					"extra": {
						"line": {
							"type": "curve",
							"width": 2
						},
					}
				},
				"tempAndHumi": {
											"humiDown": "",
											"humiUp": "",
											"tempDown": "",
											"tempUp": ""
										},

			};
		},
		onShow() {
			this.productKey = uni.getStorageSync('truck_productKey')
			console.log(this.productKey);
			this.start()
		},
		
		methods: {
			async start() {
				this.tempAndHumi.humiDown = uni.getStorageSync("humiDown")
				this.tempAndHumi.humiUp = uni.getStorageSync("humiUp")
				this.tempAndHumi.tempDown = uni.getStorageSync("tempDown")
				this.tempAndHumi.tempUp = uni.getStorageSync("tempUp")
				const res = await this.$api.getDeviceList(this.productKey)
				// console.log(res);
				this.productName = res.data.productName;
				if (res.code == 200) {
					for (var i = 0; i < res.data.deviceInfo.length; i++) {
						if (res.data.deviceInfo[i].deviceType == "TempAndHumi") {
							this.humiDkList.push(res.data.deviceInfo[i].deviceKey);
						}
					}
					// console.log(this.humiDkList);
					this.getHumi()
				}
			},
			async getHumi() {
				const res = await this.$api.getDeviceData({
					productKey: this.productKey,
					deviceKeyList: this.humiDkList
				})
				console.log(res);
				if (res.code == 200) {
					this.humiOriData = []
					for (var i = 0; i < res.data.deviceData.length; i++) {
						var obj = {
							sensor: res.data.deviceData[i].deviceName,
							temp: res.data.deviceData[i].temp,
							humi: res.data.deviceData[i].humi,
							time: res.data.deviceData[i].date,
							oil: res.data.deviceData[i].oil,
							dk: res.data.deviceData[i].deviceKey,
						};
						this.humiOriData.push(obj);
					}
					// console.log("humiOriData", this.humiOriData);
					this.humiHandleData = JSON.parse(JSON.stringify(this.humiOriData));
					// console.log(this.humiHandleData);
					this.humiHandleData.sort(function(a, b) {
						var sensorA = a.sensor.toUpperCase(); // ignore upper and lowercase
						var sensorB = b.sensor.toUpperCase(); // ignore upper and lowercase
						if (sensorA < sensorB) {
							return -1;
						}
						if (sensorA > sensorB) {
							return 1;
						}
						return 0;
					});
					for (var i = 0; i < this.humiHandleData.length; i++) {
						this.humiHandleData[i].sensor = this.humiHandleData[i].sensor.replace(
							"TH",
							"温湿度节点"
						);
						// var obj1 = {
						//   name: this.humiHandleData[i].sensor,
						//   date: this.humiHandleData[i].time,
						//   dk: this.humiHandleData[i].dk,
						// };
						// this.sensorList.push(obj1);
					}
					// console.log("humiHandleData", this.humiHandleData);
					// console.log(this.sensorList);
				}
				this.getHisData()
			},
			slider3change(e) {
				// console.log(e)
				this.num = e.detail.value

				this.hisDate1 = this.hisDate.slice(this.hisDate.length - this.num - 1, this.hisDate.length - 1)
				this.hisTemp1 = this.hisTemp.slice(this.hisTemp.length - this.num - 1, this.hisTemp.length - 1)
				this.hisHumi1 = this.hisHumi.slice(this.hisHumi.length - this.num - 1, this.hisHumi.length - 1)
				this.maxtemp = Math.max.apply(null, this.hisTemp1);
				this.mintemp = Math.min.apply(null, this.hisTemp1);

				this.maxhumi = Math.max.apply(null, this.hisHumi1);
				this.minhumi = Math.min.apply(null, this.hisHumi1);

				this.chartData.categories = this.hisDate1
				this.chartData.series[0].name = "温度"
				this.chartData.series[0].data = this.hisTemp1
				this.chartData.series[1].name = "湿度"
				this.chartData.series[1].data = this.hisHumi1

			},
			async getHisData() {
				this.hisDate = []
				this.hisHumi = []
				this.hisTemp = []
				const res = await this.$api.getDeviceHisData({
					productKey: this.productKey,
					deviceKey: this.humiHandleData[0].dk,
					num: 30
				})
				console.log(res);
				if (res.code == 200) {
					for (var i = 0; i < res.data.deviceData.length; i++) {
						this.hisDate.push(res.data.deviceData[i].date);
						this.hisTemp.push(res.data.deviceData[i].temp);
						this.hisHumi.push(res.data.deviceData[i].humi);
					}
				}
				console.log(this.hisDate);
				this.hisDate1 = this.hisDate
				this.hisTemp1 = this.hisTemp
				this.hisHumi1 = this.hisHumi
				this.hisDate1 = this.hisDate.slice(this.hisDate.length - 20- 1, this.hisDate.length - 1)
				this.hisTemp1 = this.hisTemp.slice(this.hisTemp.length - 20 - 1, this.hisTemp.length - 1)
				this.hisHumi1 = this.hisHumi.slice(this.hisHumi.length - 20 - 1, this.hisHumi.length - 1)
				console.log(this.hisDate);
				console.log(this.hisDate1);
				console.log(this.hisTemp1);
				console.log(this.hisHumi1);
				this.maxtemp = Math.max.apply(null, this.hisTemp1);
				this.mintemp = Math.min.apply(null, this.hisTemp1);
				// console.log(this.maxtemp,this.mintemp);
				this.maxhumi = Math.max.apply(null, this.hisHumi1);
				this.minhumi = Math.min.apply(null, this.hisHumi1);
				// console.log(this.maxhumi,this.minhumi);
				// console.log(this.chartOptions.yAxis.splitNumber);
				// if ((this.maxhumi - this.minhumi >= 5) || (this.maxhumi - this.minhumi >= 5) == 0) {
				// 	this.chartOptions.yAxis.splitNumber = 5
				// } else {
				// 	this.chartOptions.yAxis.splitNumber = this.maxhumi - this.minhumi
				// }
				this.chartData.categories = this.hisDate1
				this.chartData.series[0].name = "温度"
				this.chartData.series[0].data = this.hisTemp1
				this.chartData.series[1].name = "湿度"
				this.chartData.series[1].data = this.hisHumi1
			},
			edit(item) {
				uni.showToast({
					title: item.name,
					icon: 'none'
				});
			},
				open() {
						this.$refs.popup.open()
					},
					/**
					 * 点击取消按钮触发
					 * @param {Object} done
					 */
					close() {
						// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
						// ...
						this.$refs.popup.close()
					},
			change(index) {
				// console.log(index);
				this.hisDate = []
				this.hisTemp = []
				this.hisHumi = []
				console.log(this.humiHandleData[index - 1]);
				this.sensor = "温湿度节点" + (index)
				this.$api.getDeviceHisData({
					productKey: this.productKey,
					deviceKey: this.humiHandleData[index - 1].dk,
					num: 30
				}).then((res) => {
					console.log(res);
					if (res.code == 200) {
						for (var i = 0; i < res.data.deviceData.length; i++) {
							this.hisDate.push(res.data.deviceData[i].date);
							this.hisTemp.push(res.data.deviceData[i].temp);
							this.hisHumi.push(res.data.deviceData[i].humi);
						}
						this.hisDate1 = this.hisDate.slice(this.hisDate.length - this.num - 1, this.hisDate.length - 1)
						this.hisTemp1 = this.hisTemp.slice(this.hisTemp.length - this.num - 1, this.hisTemp.length - 1)
						this.hisHumi1 = this.hisHumi.slice(this.hisHumi.length - this.num - 1, this.hisHumi.length - 1)
						this.maxtemp = Math.max.apply(null, this.hisTemp1);
						this.mintemp = Math.min.apply(null, this.hisTemp1);
						// console.log(this.maxtemp,this.mintemp);
						this.maxhumi = Math.max.apply(null, this.hisHumi1);
						this.minhumi = Math.min.apply(null, this.hisHumi1);
						// console.log(this.maxhumi,this.minhumi);
						// console.log(this.chartOptions.yAxis.splitNumber);
						// if ((this.maxhumi - this.minhumi >= 5) || (this.maxhumi - this.minhumi >= 5) == 0) {
						// 	this.chartOptions.yAxis.splitNumber = 5
						// } else {
						// 	this.chartOptions.yAxis.splitNumber = this.maxhumi - this.minhumi
						// }
						this.chartData.categories = this.hisDate1
						this.chartData.series[0].name = "温度"
						this.chartData.series[0].data = this.hisTemp1
						this.chartData.series[1].name = "湿度"
						this.chartData.series[1].data = this.hisHumi1
					}
				})

			},
				
			setting() {
				console.log("设置阈值")
					
				if(this.tempAndHumi.tempDown == ""||this.tempAndHumi.tempUp == ""||this.tempAndHumi.humiDown == ""||this.tempAndHumi.humiUp == "") {
						uni.showToast({
										title: '阈值不可为空',
										icon: 'none'
									})
				} else{
					//修改产品信息
					console.log("12")
					// var value = uni.getStorageSync("value")
						
					getDeviceList(this.productKey).then((res)=>{
						console.log(res)
						if(res.code == 200) {
								
							var data = {
								productName: res.data.productName,
								productKey: res.data.productKey,
								typeIdentify: res.data.typeIdentify,
								protocolType: res.data.protocolType,
								productType: res.data.productType,
								extraInfo: res.data.extraInfo,
								description: "",
								
							};
							data.extraInfo.thresholdValue.tempAndHumi = this.tempAndHumi
							console.log(data)
								
							editProduct(data).then((res)=>{
								console.log(res)
								if(res.code == 200) {
									uni.showToast({
										title:"修改成功"
									})
									uni.setStorageSync('humiDown', this.tempAndHumi.humiDown)
									uni.setStorageSync('humiUp', this.tempAndHumi.humiUp)
									uni.setStorageSync('tempDown', this.tempAndHumi.tempDown)
									uni.setStorageSync('tempUp', this.tempAndHumi.tempUp)	
								}
							})
						}
						
					})
					
				}
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
	}
</style>
