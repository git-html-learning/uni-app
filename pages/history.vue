<template>
	<view class="page-history">
		
		<view class="granary">
			<view class="title">请选择记录类型</view>
			<view class="dropdown-box">
				<view class="dropdown-box-title">记录类型</view>
				<dropdown :current="valueSelect" :list="listDropdown" @onClick="dropDownChange" />
			</view>
		</view>
		
		<view class="granary">
			<view class="title">
				请选择查看时间
				<button class="cu-btn bg-blue sm" @tap="handleClick">查询</button>
			</view>
			<view class="dropdown-box">
				
				<picker :style="{
					marginRight: '20px'
				}" mode="date" :value="valueDate" @change="bindDateChange">
					<view class="uni-input">开始时间：{{ valueDate }}</view>
				</picker>
				
				<picker mode="date" :value="valueDate2" @change="bindDateChange2">
					<view class="uni-input">结束时间：{{ valueDate2 }}</view>
				</picker>
				
			</view>
		</view>
		
		<view class="mytable-gas-view" v-if="valueSelect===0">
			<text class="row1-col2-row1-text">氮气浓度(%)</text>
			<view class="mytable-box">
				<view class="row1">
					<view class="row1-col1 col-item">检测时间</view>
					<view class="row1-col2">
						<view class="row1-col2-row1 col-item">
						</view>
						<view class="row1-col2-row2">
							<view class="row1-col2-row2-col col-item">1#</view>
							<view class="row1-col2-row2-col col-item">2#</view>
							<view class="row1-col2-row2-col col-item">3#</view>
							<view class="row1-col2-row2-col col-item">4#</view>
							<view class="row1-col2-row2-col col-item">5#</view>
							<view class="row1-col2-row2-col col-item">6#</view>
							<view class="row1-col2-row2-col col-item">7#</view>
							<view class="row1-col2-row2-col col-item">8#</view>
							<view class="row1-col2-row2-col col-item">空间</view>
							<view class="row1-col2-row2-col col-item">最高</view>
							<view class="row1-col2-row2-col col-item">最低</view>
							<view class="row1-col2-row2-col col-item">平均</view>
						</view>
					</view>
				</view>
				<view class="row2" v-for="(item, index) in dataTable2" :key="index">
					<view class="row2-col col-item">{{ item.date }}</view>
					<view class="row2-col col-item">{{ item.n2_1 }}</view>
					<view class="row2-col col-item">{{ item.n2_2 }}</view>
					<view class="row2-col col-item">{{ item.n2_3 }}</view>
					<view class="row2-col col-item">{{ item.n2_4 }}</view>
					<view class="row2-col col-item">{{ item.n2_5 }}</view>
					<view class="row2-col col-item">{{ item.n2_6 }}</view>
					<view class="row2-col col-item">{{ item.n2_7 }}</view>
					<view class="row2-col col-item">{{ item.n2_8 }}</view>
					<view class="row2-col col-item">{{ item.n2_8 }}</view>
					<view class="row2-col col-item">{{ item.n2_max }}</view>
					<view class="row2-col col-item">{{ item.n2_min }}</view>
					<view class="row2-col col-item">{{ item.n2_ave }}</view>
				</view>
			</view>
		</view>
		
		<view class="mytable-pre-view" v-if="valueSelect===1">
			<view class="mytable-box">
				<view class="row">
					<view class="row-col">检测时间</view>
					<view class="row-col">检测点</view>
					<view class="row-col">压力(Pa)</view>
				</view>
				<view class="row" v-for="(item, index) in dataTable2" :key="index">
					<view class="row-col">{{ item.date }}</view>
					<view class="row-col">{{ item.deviceName }}</view>
					<view class="row-col">{{ item.in_Pa }}</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import dropdown from '../components/dropdown/dt-dropdown.vue'
	export default { 
		components: {
			dropdown
		},
		data () {
			return {
				flagNewUser: true,
				
				listDropdown: ['气体浓度', '压力大小'],
				
				// 显示的日期
				valueDate: '',
				valueDate2: '',
				// 获取记录的时间
				startTime: undefined,
				endTime: undefined,
				
				valueSelect: 0, // 0气体1压力
				isBtnShow: true,
				// 表格配置
				dataTable: [],

				// 制氮机相关信息
				productKey: undefined, // 制氮产品的key
				devKeyNitrogen: undefined, // 制氮机的key
				devKeyAirCheck: undefined, // 气密性的key
				devKeyHardware: undefined, // 设备组的key
				devKeyGas: undefined, // 气体浓度的key
				devKeyPressure: undefined, // 压力大小的key
				devKeyBug: undefined, // 害虫检测设备的key
				
			}
		},
		computed: {
			dataTable2 () {
				return this.dataTable.filter(item => item.type===this.valueSelect)
			}
		},
		onShow() {
			this.initializeTime()
			
			if (!this.flagNewUser) return
			this.start()
			this.flagNewUser = false
		
		},
		methods: {
			
			dropDownChange (v) {
				if (v===this.valueSelect) return
				uni.showLoading()
				setTimeout(() => {
					this.valueSelect = v
					uni.hideLoading()
				}, 300)
			},
			bindDateChange (e) {
				this.valueDate = e.detail.value
			},
			bindDateChange2 (e) {
				this.valueDate2 = e.detail.value
			},

			// 获取初始数据
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
	
				this.initializeTime()
				this.getGasPreData()
	
			},
	
			// 初始化时间（默认时间今天）
			initializeTime () {
				const date = new Date()
				const year = date.getFullYear()
				const month = date.getMonth()
				const day = date.getDate()
				
				this.valueDate = year + '-' +
					((month + 1) < 10 ? ('0' + (month + 1)) : (month + 1)) + '-' +
					(day< 10 ? ('0' + day) : day)
				this.valueDate2 = this.valueDate
				
				this.startTime = new Date(year, month, day).getTime()
				this.endTime = new Date(year, month, day).getTime() + 24*60*60*1000

				
			},
	
			// 获取设备数据
			async getGasPreData () {
				uni.showLoading()
				console.log("获取气体、压力记录")
				console.log("开始时间："+this.$time2date(this.startTime))
				console.log("结束时间："+this.$time2date(this.endTime))
				const res = await this.$api.getHistoryData(this.devKeyHardware, this.startTime, this.endTime)
				uni.hideLoading()
				if (res.code!==200) {
					this.dataTable = []
					return
				}
				let data = res.data.deviceData.filter(a => {
					return !('o2' in a)
				})
				data.forEach(item => {
					if ('Custom' in item) { // 气体数据
						let n2_sum = 0
						let n2_max = -9999
						let n2_min = 9999
						item.n2.forEach((item2, index) => {
							item['n2_' + (index+1)] = item2.toFixed(2)
							n2_sum += item2
							n2_max = item2>n2_max?item2:n2_max
							n2_min = item2<n2_min?item2:n2_min
	
						})
						item.n2_max = n2_max===-9999?0:n2_max.toFixed(2)
						item.n2_min = n2_min===9999?0:n2_min.toFixed(2)
						item.n2_ave = (n2_sum/9).toFixed(2)
						item.type = 0
						
					} else if ('in_Pa' in item) { // 压力数据
						item.in_Pa = item.in_Pa.toFixed(1)
						item.type = 1
					} else {
						item.type = 99
					}
				})
				this.dataTable = Object.freeze(data)
				uni.hideLoading()
				console.log(this.dataTable);
	
			},
	
			// 获得操作日志
			getLogs () {
				console.log("获取操作日志")
				setTimeout(() => {
					uni.hideLoading()
				}, 300)
			},
			
			handleClick () {
				console.log('点击查询')
				const dateArr = this.valueDate.split('-')
				const dateArr2 = this.valueDate2.split('-')
				
				let startTime = new Date(parseInt(dateArr[0]), parseInt(dateArr[1])-1, parseInt(dateArr[2])).getTime()
				let endTime = new Date(parseInt(dateArr2[0]), parseInt(dateArr2[1])-1, parseInt(dateArr2[2])).getTime()
				
				if (startTime > endTime) {
					// 开始时间不得大于结束时间
					let temp = endTime
					endTime = startTime+ 24*60*60*1000
					startTime = temp
					let temp2 = this.valueDate2
					this.valueDate2 = this.valueDate
					this.valueDate = temp2
				} else {
					endTime += 24*60*60*1000
				}
				this.startTime = startTime
				this.endTime = endTime
				this.getGasPreData()

			},
			
		}
	
	
	}
</script>

<style lang="scss" scoped>
	.page-history {
		.granary {
			background-color: #FFFFFF;
			margin-top: 5px;
			padding: 10px;
			border-radius: 5px;
			background-color: #FFFFFF;
			box-shadow: 0 0 5px $uni-border-color;
			.title {
				font-weight: bold;
				padding: 5px 0;
				border-bottom: solid 1px $uni-border-color;
				button {
					float: right;
					right: 10px;
					bottom: 5px;
				}
			}
			.dropdown-box {
				margin-top: 20px;
				margin-bottom: 10px;
				display: flex;
				align-items: center;
				justify-content: center;
				.dropdown-box-title {
					font-size: 13px;
					margin-right: 10px;
				}
			}
			
		}

		.mytable-gas-view {
			.row1-col2-row1-text {
				font-size: 13px;
				position: relative;
				left: 55%;
				top: 23px;
				z-index: 99;
			}
			.mytable-box {
				border-left: solid 1px $uni-border-color;
				border-top: solid 1px $uni-border-color;
				position: relative;
				margin-bottom: 20px;
				background-color: #FFFFFF;
				overflow-x: scroll;
				font-size: 13px;
				.row1 {
					font-weight: bold;
					display: flex;
					.row1-col1 {
						position: sticky;
						left: 0;
						width: 100px;
						flex-shrink: 0;
						border-right: solid 1px $uni-border-color;
						border-bottom: solid 1px $uni-border-color;
						background-color: #FFFFFF;
					}
					.row1-col2 {
						.row1-col2-row1 {
							height: 30px;
							border-right: solid 1px $uni-border-color;
							border-bottom: solid 1px $uni-border-color;
						}
						.row1-col2-row2 {
							height: 30px;
							display: flex;
							.row1-col2-row2-col {
								width: 40px;
								flex-shrink: 0;
								border-right: solid 1px $uni-border-color;
								border-bottom: solid 1px $uni-border-color;
							}
						}
					}
				}
				.row2 {
					display: flex;
					.row2-col {
						font-size: 10px;
						width: 40px;
						flex-shrink: 0;
						border-right: solid 1px $uni-border-color;
						border-bottom: solid 1px $uni-border-color;
					}
					.row2-col:first-child {
						position: sticky;
						left: 0;
						width: 100px;
						background-color: #FFFFFF;
					}
				}
			}
			.col-item {
				padding: 2px 3px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		
		.mytable-pre-view {
			margin: 20px 0;
			background-color: #FFFFFF;
			border-left: solid 1px $uni-border-color;
			border-top: solid 1px $uni-border-color;
			.mytable-box {
				.row {
					height: 30px;
					font-size: 10px;
					display: flex;
					.row-col {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
						border-right: solid 1px $uni-border-color;
						border-bottom: solid 1px $uni-border-color;
					}
				}
				.row:first-child {
					font-size: 13px;
				}
			}
		}
		
	}
</style>
