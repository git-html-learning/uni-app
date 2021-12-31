<template>
	<view class="page-nitrogen">
		我是
		<view class="userinfo">
			<view class="username">
				欢迎用户：{{ username }}
			</view>
			<text></text>
			<button class="cu-btn bg-blue"  @tap="modalName='DialogModal1'">退出登录</button>
		</view>
		
		<view class="header">
			<view class="header-item">
				<text class="iconfont icon-computer-line"></text>
				运行状态：{{ flagIsRunning?'仓内数据监测':'未运行' }}
			</view>
		</view>
		
		<view class="content-nitrogen-data" v-if="flagIsRunning">
			
			<view class="charts-box">
				<view class="chart-item-box">
					<qiun-data-charts
					type="gauge"
				  :opts="options"
					:chartData="chartData"/>	
				</view>
				<view class="chart-item-box">
					<qiun-data-charts
					type="gauge"
				  :opts="options2"
					:chartData="chartData2"/>	
				</view>
			</view>
			
			<view class="data-item data-item2">
				<view class="item-title">仓内平均数据</view>
				<view class="item-gasdata">
					<text class="iconfont icon-chongzi"></text>
					<text class="item-gasdata-title">氧气(%)：</text>
					<text class="item-gasdata-data">{{ data_1.o2.toFixed(2) }}</text>
				</view>
				<view class="item-gasdata">
					<text class="iconfont icon-eryanghuatan1"></text>
					<text class="item-gasdata-title">二氧化碳(%)：</text>
					<text class="item-gasdata-data">{{ data_1.co2.toFixed(2) }}</text>
				</view>
				<view class="item-gasdata">
					<text class="iconfont icon-yangqi"></text>
					<text class="item-gasdata-title">磷化氢(ppm)：</text>
					<text class="item-gasdata-data">{{ data_1.ph3.toFixed(2) }}</text>
				</view>
				<view class="item-gasdata">
					<text class="iconfont icon-linhuaqing1"></text>
					<text class="item-gasdata-title">虫害(个)：</text>
					<text class="item-gasdata-data">{{ dataBug }}</text>
				</view>
			</view>
			
			<view class="data-item3">
				<view class="item-title">仓内各点数据</view>
				<view class="item-points-data-box">
					
					<view class="point-item" v-for="item in Object.keys(dataPoints)" :key="item">
						<view class="point-item-title">{{ dataPoints[item].name }}</view>
						<view class="point-item-gasdata">
							<view class="point-item-gasdata-title">氧气浓度(%)</view>
							<view class="point-item-gasdata-data">{{ dataPoints[item].o2.toFixed(2) }}</view>
						</view>
						<view class="point-item-gasdata">
							<view class="point-item-gasdata-title">二氧化碳浓度(%)</view>
							<view class="point-item-gasdata-data">{{ dataPoints[item].co2.toFixed(2) }}</view>
						</view>
						<view class="point-item-gasdata">
							<view class="point-item-gasdata-title">氮气浓度(%)</view>
							<view class="point-item-gasdata-data">{{ dataPoints[item].n2.toFixed(2) }}</view>
						</view>
						<view class="point-item-gasdata">
							<view class="point-item-gasdata-title">磷化氢浓度(ppm)</view>
							<view class="point-item-gasdata-data">{{ dataPoints[item].ph3.toFixed(2) }}</view>
						</view>
					</view>
					
				</view>
			</view>
			
		</view>
		
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white justify-end">
					<view class="content">
						<view style="fontWeight:bold;fontSize:36rpx;">提示</view>
					</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					确定要退出登录吗？
				</view>
				<view class="cu-bar bg-white ">
					<view class="action">
						<button class="cu-btn line-blue margin-left-xl" @tap="hideModal">取消</button>
					</view>
					<view class="action">
						<button class="cu-btn bg-red margin-right-xl" @tap="logout">确定</button>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default { 
		data () {
			return {
				flagNewUser: true,
				
				username: '',
				modalName: null,
				
				flagIsRunning: false, // 设备组运行状态
				flagIsAirChecking: false, // 检查气密性状态？检测气密性时不可进行开启关闭设备组、开启关闭制氮机等操作
				flagIsNitrogenRunning: false, // 制氮机运行状态

				// 制氮机相关信息
				productKey: undefined, // 制氮产品的key
				devKeyNitrogen: undefined, // 制氮机的key
				devKeyAirCheck: undefined, // 气密性的key
				devKeyHardware: undefined, // 设备组的key
				devKeyGas: undefined, // 气体浓度的key
				devKeyPressure: undefined, // 压力大小的key
				devKeyBug: undefined, // 害虫检测设备的key

				// 表格，制氮机配置
				dataTable: [],

				// 弹出框，充氮配置
				dataForm: {  // 数据
					n2Way: 0,
					targetN2: undefined,
				},

				// 仓内数据
				dataPoints: {
					1: { name: '空间监测点', o2: '-', co2: '-', n2: '-', ph3: '-' },
					33: { name: '测试点1', o2: '-', co2: '-', n2: '-', ph3: '-' },
					34: { name: '测试点2', o2: '-', co2: '-', n2: '-', ph3: '-' },
					35: { name: '测试点3', o2: '-', co2: '-', n2: '-', ph3: '-' },
					36: { name: '测试点4', o2: '-', co2: '-', n2: '-', ph3: '-' },
					37: { name: '测试点5', o2: '-', co2: '-', n2: '-', ph3: '-' },
					38: { name: '测试点6', o2: '-', co2: '-', n2: '-', ph3: '-' },
					39: { name: '测试点7', o2: '-', co2: '-', n2: '-', ph3: '-' },
					40: { name: '测试点8', o2: '-', co2: '-', n2: '-', ph3: '-' }
				},
				dataPressure: 0, // 压力大小
				dataBug: 0, // 害虫数量
				data_1: { // 仓内平均数据
					n2: 0,
					o2: 0,
					co2: 0,
					ph3: 0,
				},
				timer: 0, // 定时刷新数据定时器
				
				// ucharts配置
				chartData:{
					"categories": [
						{
							"value": 1,
							"color": "#1890FF"
						}
					],
					"series": [{
						"name": "完成率",
						"data": 0.66
					}]
				},
				options:{
					"type": "gauge",
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
						"#9A60B4",
						"#ea7ccc"
					],
					"rotate": false,
					"errorReload": true,
					"fontSize": 10,
					"fontColor": "#666666",
					"enableScroll": false,
					"touchMoveLimit": 60,
					"enableMarkLine": false,
					"dataLabel": true,
					"dataPointShape": true,
					"dataPointShapeType": "solid",
					"tapLegend": true,
					"title": {
						"name": "20Pa",
						"fontSize": 18,
						"color": "#000000",
						"offsetX": 0,
						"offsetY": 50
					},
					"subtitle": {
						"name": "氮气浓度",
						"fontSize": 10,
						"color": "#000000",
						"offsetX": 0,
						"offsetY": -45
					},
					"extra": {
						"gauge": {
							"type": "default",
							"width": 13,
							"labelColor": "#666666",
							"labelOffset": 13,
							"startAngle": 0.75,
							"endAngle": 0.25,
							"startNumber": 0,
							"endNumber": 100,
							"format": "",
							"splitLine": {
								"fixRadius": 0,
								"splitNumber": 10,
								"width": 30,
								"color": "#FFFFFF",
								"childNumber": 5,
								"childWidth": 5
							},
							"pointer": {
								"width": 15,
								"color": "1890FF",
							},
							"labelFormat": ""
						}
					}
				},
				chartData2:{
					"categories": [
						{
							"value": 1,
							"color": "#1890FF"
						}
					],
					"series": [{
						"name": "完成率",
						"data": 0.9
					}]
				},
				options2:{
					"type": "gauge",
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
						"#9A60B4",
						"#ea7ccc"
					],
					"rotate": false,
					"errorReload": true,
					"fontSize": 10,
					"fontColor": "#666666",
					"enableScroll": false,
					"touchMoveLimit": 60,
					"enableMarkLine": false,
					"dataLabel": true,
					"dataPointShape": true,
					"dataPointShapeType": "solid",
					"tapLegend": true,
					"title": {
						"name": "20Pa",
						"fontSize": 18,
						"color": "#000000",
						"offsetX": 0,
						"offsetY": 50
					},
					"subtitle": {
						"name": "仓内压力",
						"fontSize": 10,
						"color": "#000000",
						"offsetX": 0,
						"offsetY": -45
					},
					"extra": {
						"gauge": {
							"type": "default",
							"width": 13,
							"labelColor": "#666666",
							"labelOffset": 13,
							"startAngle": 0.75,
							"endAngle": 0.25,
							"startNumber": -400,
							"endNumber": 400,
							"format": "",
							"splitLine": {
								"fixRadius": 0,
								"splitNumber": 10,
								"width": 30,
								"color": "#FFFFFF",
								"childNumber": 5,
								"childWidth": 5
							},
							"pointer": {
								"width": 15,
								"color": "1890FF",
							},
							"labelFormat": ""
						}
					}
				},


			}
		},
		onLoad() {
		},
		onShow() {
			// 获取用户名
			this.username = uni.getStorageSync('username_nitrogen')
			if (!this.flagNewUser) return
			this.start()
			this.flagNewUser = false
		},
		onPullDownRefresh () {
			this.getGasPreData()
		},
		methods: {
			
			// 初始化数据
			async start () {
	
				uni.showLoading()
	
				// 找到制氮产品
				const p = await this.$api.getProduct()
				if (p.code!==200) return uni.hideLoading()
				let pro = p.data.productInfo.find(a => { return a.typeIdentify==='N2' })
				if (!pro) {
					this.$message('您未安装相关制氮设备', 3)
					uni.hideLoading()
					return 
				}
				this.productKey = pro.productKey
	
				// 找到制氮机等其他设备
				const p2 = await this.$api.getDeviceList(pro.productKey)
				if (p2.code!==200) return
				p2.data.deviceInfo.forEach(item => {
					switch (item.deviceType) {
						case 'N2':
							this.devKeyNitrogen = item.deviceKey
							break
						case 'airCheck':
							this.devKeyAirCheck = item.deviceKey
							break
						case 'hardware':
							this.devKeyHardware = item.deviceKey
							break
						case 'xc-air':
							this.devKeyGas = item.deviceKey
							break
						case 'xc-pressure':
							this.devKeyPressure = item.deviceKey
							break
						case 'xc-bug':
							this.devKeyBug = item.deviceKey
							break
					}
				})
	
				// this.getHardwareStatus()
				this.getGasPreData()
				// clearInterval(this.timer)
				// this.timer = setInterval(() => {
				// 	this.getGasPreData()
				// }, 30000)
	
	
				this.getAirCheckStatus()
				this.getNitrogenStatus()
	
			},
			
			// ------------------------------------ 获取运行状态 -------------------------------------
			// 获取设备组是否工作状态，停止/运行
			async getHardwareStatus () {
	
				// 获取设备组状态
				let params = {
					productKey: this.productKey,
					deviceKey: this.devKeyHardware,
					extraInfo: {
						key: 'n2status',
						Value: ["open", "close"]
					}
				}
				
				let res = await this.$api.getDeviceStatusExtra(params)
				console.log(res)
	
	
				let a = true
				// a = false
				this.flagIsRunning = a
				console.log('设备组状态：' + this.flagIsRunning)
				if (this.flagIsRunning) {
					this.getGasPreData()
				}
	
			},
	
			// 获取检查气密性状态
			async getAirCheckStatus () {
				
				let params = {
					productKey: this.productKey,
					deviceKey: this.devKeyAirCheck,
					extraInfo: {
						key: 'n2status',
						Value: ["airTeststart", "airTestendWitherr", "airTestendWithOK"]
					}
				}
				// 
				let res = await this.$api.getDeviceStatusExtra(params)
				if (res.code===20010) {
					this.flagIsAirChecking = false
					console.log('气密性状态：' + false)
				} else if (res.code===200) {
					if (['airTestendWitherr', 'airTestendWithOK'].includes(res.data.data.extraInfo.n2status.Value)) {
						this.flagIsAirChecking = false
					} else {
						this.flagIsAirChecking = true
					}
					console.log('气密性状态：' + res.data.data.extraInfo.n2status.Value)
				}
	
			},
	
			// 获取制氮机状态
			async getNitrogenStatus () {
	
				let params = {
					productKey: this.productKey,
					deviceKey: this.devKeyNitrogen,
					extraInfo: {
						key: 'n2status',
						Value: ["open", "close"]
					}
				}
				let res = await this.$api.getDeviceStatusExtra(params)
				if (res.code!==200) {
					this.$message(res.msg)
					return
				}
				if (res.data.data.extraInfo.n2status.Value === 'open') {
					this.flagIsNitrogenRunning = true
				} else {
					this.flagIsNitrogenRunning = false
				}
				this.getNitrogenData()
				console.log('制氮机状态：' + res.data.data.extraInfo.n2status.Value)
	
			},
	
			// ------------------------------------ 获取仓内数据 -------------------------------------
			// 获取制氮机数据
			async getNitrogenData () {
	
				// 找到制氮设备最新数据
				const res = await this.$api.getRecentData(this.productKey, this.devKeyNitrogen, 10)
				if (res.code!==200) {
					this.$message("获取制氮机数据失败")
					return
				}
				// 处理制氮机数据
				const deviceData = res.data.deviceData.find(a => {
					return a.data&&('chundu' in a.data)
				})
				let dataTable = {
					deviceKey: deviceData.deviceKey,
					deviceName: '制氮机1号',
					chundu: deviceData.data.chundu ,
					liuliang: deviceData.data.liuliang,
					yali: deviceData.data.yali
				}
				this.dataTable = [dataTable]
				// 模拟数据
				// this.dataTable = [{
				//   deviceKey: '123',
				//   deviceName: '制氮机1号',
				//   chundu: '-',
				//   liuliang: '-',
				//   yali: '-',
				//   status: 0
				// }]
			},
	
			// 获取仓内气体、压力数据
			async getGasPreData () {
				console.log("获取压力气体数据...")
	
				let res = await this.$api.getRecentData(this.productKey, this.devKeyHardware, 50)
				setTimeout(() => {
					this.$message('刷新成功')
					uni.stopPullDownRefresh()
				}, 500)
				uni.hideLoading()
				if (res.code!==200){
					// this.initChartN2()
					// this.initChartPressure()
					return
				}
	
				/** --------------------设备组是否在线临时判断------------------ */
				const flagOnlineDev = res.data.deviceData.find(a => {
					if ('time' in a && !isNaN(parseInt(a.time))) {
						return true
					}
				})
				if (flagOnlineDev) {
					const time = Date.now()
					if (time-flagOnlineDev.time < 10*60*1000) {
						this.flagIsRunning = true
						console.log("设备组状态：" + true);
					} else {
						this.flagIsRunning = false
						console.log("设备组状态：" + false);
						return
					}
				}
				/** ------------------------------------------------------------ */
	
				let dataPressure = '-'
				let n2 = 0
				let o2 = 0
				let co2 = 0
				let ph3 = 0
				let numData = 0
				let dataPoints = {
					1: { name: '空间监测点', o2: '-', co2: '-', n2: '-', ph3: '-' },
					33: { name: '测试点1', o2: '-', co2: '-', n2: '-', ph3: '-' },
					34: { name: '测试点2', o2: '-', co2: '-', n2: '-', ph3: '-' },
					35: { name: '测试点3', o2: '-', co2: '-', n2: '-', ph3: '-' },
					36: { name: '测试点4', o2: '-', co2: '-', n2: '-', ph3: '-' },
					37: { name: '测试点5', o2: '-', co2: '-', n2: '-', ph3: '-' },
					38: { name: '测试点6', o2: '-', co2: '-', n2: '-', ph3: '-' },
					39: { name: '测试点7', o2: '-', co2: '-', n2: '-', ph3: '-' },
					40: { name: '测试点8', o2: '-', co2: '-', n2: '-', ph3: '-' }
				}
				res.data.deviceData.forEach(item => {
					if ('o2' in item && dataPoints[item.kzqNo].n2==='-') {
	
						dataPoints[item.kzqNo].n2 = item.n2
						dataPoints[item.kzqNo].o2 = item.o2
						dataPoints[item.kzqNo].co2 = item.co2
						dataPoints[item.kzqNo].ph3 = 0
						n2 += item.n2
						o2 += item.o2
						co2 += item.co2
						numData++
	
					} else if ('in_Pa' in item && dataPressure==='-') {
						dataPressure = item.in_Pa
						this.options2.title.name = item.in_Pa + 'Pa'
						this.chartData2.series[0].data = (item.in_Pa+400)/800
					}
				})
				this.dataPoints = dataPoints
				console.log(dataPoints)
				this.dataPressure = dataPressure!=='-'?dataPressure:0
				// 平均值
				let data_1 = {
					n2: 0,
					o2: 0,
					co2: 0,
					ph3: 0
				}
				if (numData!==0) {
					data_1.n2 = parseFloat((n2/numData).toFixed(1))
					data_1.o2 = parseFloat((o2/numData).toFixed(1))
					data_1.co2 = parseFloat((co2/numData).toFixed(1))
					data_1.ph3 = parseFloat((ph3/numData).toFixed(1))
				} else {
					data_1.n2 = 0
					data_1.o2 = 0
					data_1.co2 = 0
					data_1.ph3 = 0
				}
				this.data_1 = data_1
				this.options.title.name = data_1.n2 + '%'
				this.chartData.series[0].data = parseFloat(data_1.n2)/100
	
				setTimeout(() => {
					// this.initChartN2()
					// this.initChartPressure()
				})
				
			},

			
			// 对话框隐藏
			hideModal () {
				this.modalName = null
			},
			// 登出
			logout () {
				this.flagNewUser = true
				this.modalName = null
				uni.reLaunch({
					url: '../login'
				})
				
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.page-nitrogen {
		
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
		
		.header {
			background-color: #FFFFFF;
			box-shadow: 0 0px 5px $uni-border-color;
			.header-item {
				height: 40px;
				display: flex;
				align-items: center;
				.iconfont {
					margin-left: 8px;
					font-size: 22px;
					min-width: 30px;
				}
				.icon-computer-line, .icon-a-shijian {
					color: #2FC25B;
				}
				.icon-yali, .icon-tequandanqi {
					color: #1890FF;
				}
			}
		}
		
		.content-nitrogen-data {
			.charts-box {
				box-shadow: 0 1px 5px $uni-border-color;
				background-color: #FFFFFF;
				display: flex;
				justify-content: center;
				.chart-item-box {
					height: 200px;
					width: 45%;
				}
			}
			
			.data-item {
				margin-top: 20px;
				background-color: #FFFFFF;
				padding: 10px;
				border-radius: 3px;
				box-shadow: 0 0px 5px $uni-border-color;
				.item-title {
					font-weight: bold;
					height: 28px;
					line-height: 28px;
					border-bottom: solid 1px $uni-border-color;
				}
				.item-gasdata {
					height: 23px;
					line-height: 23px;
					.iconfont {
						margin: 0 20px 0 35px;
						font-size: 15px;
						color: #2FC25B;
					}
					.item-gasdata-title {
						display: inline-block;
						min-width: 40%;
					}
					.item-gasdata-data {
						font-weight: bold;
					}
				}
			}
			.data-item2 {
				.item-gasdata {
					.iconfont {
						color: #1890FF;
					}
				}
			}
			
			.data-item3 {
				margin-top: 20px;
				background-color: $uni-bg-color-grey;
				.item-title {
					padding-left: 10px;
					border-radius: 3px;
					// border-top-left-radius: 6px;
					// border-top-right-radius: 6px;
					background-color: #FFFFFF;
					font-weight: bold;
					height: 30px;
					line-height: 30px;
					box-shadow: 0 0 3px $uni-border-color;
				}
				
				.item-points-data-box {
					padding: 5px;
					display: flex;
					flex-wrap: wrap;
					.point-item {
						font-size: 10px;
						width: 48%;
						background-color: #FFFFFF;
						padding: 5px;
						border-radius: 3px;
						box-shadow: 1px 1px 6px $uni-border-color;
						.point-item-title {
							padding-left: 5px;
							height: 28px;
							line-height: 28px;
							text-align: center;
							border-bottom: solid 1px $uni-border-color;
						}
						.point-item-gasdata {
							padding-left: 10px;
							height: 28px;
							line-height: 28px;
							display: flex;
							.point-item-gasdata-title {
								min-width: 70%;
							}
						}
					}
				}
				
				.item-points-data-box {
					.point-item:nth-child(2n+1) {
						width: 48%;
						margin-right: 4%;
					}
					.point-item:nth-child(n+3) {
						margin-top: 10px;
					}
				}
				
			}
			
		}
		
			
	}
</style>
