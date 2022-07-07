<template>
	<view>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map style="width: 100%; height: 90vh;" :enable-zoom="zoom" :latitude="latitude" :longitude="longitude"
					:markers="covers">
				</map>
			</view>
		</view>
		<view>
			<uni-popup ref="message" type="message">
				<uni-popup-message type="error" message="暂无GPS信息!!!" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>
	</view>
</template>
<script>
	import {
		getDeviceList
	} from "@/services/product";
	import {
		getDeviceData
	} from "@/services/device";
	export default {
		data() {
			return {
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: "",
				longitude: "",
				covers: [{
					latitude: "",
					longitude: "",
					iconPath: '/static/location.png',
					width: 35,
					height: 35,
				}],
				zoom: true,
			}
		},
		created() {
			this.prepare()
		},
		//监听页面卸载
		onUnload:function(){
		let pages = getCurrentPages().length - 1;
		    console.log('需要销毁的页面：'+pages);
		    wx.navigateBack({
		      delta: pages
		    })
		},

		methods: {
			prepare() {
				
				this.productKey = uni.getStorageSync('truck_productKey')
				console.log(this.productKey)
				getDeviceList(this.productKey).then((res) => {
					console.log(res)
					this.productName = res.data.productName
					console.log(this.productName)
					if (res.msg == "ok") {
						var deviceKeys = []
						res.data.deviceInfo.forEach(item => {
							if (item.deviceName === "GPS") {
								deviceKeys.push(item.deviceKey)
							}
						})
						console.log(deviceKeys)
						if (deviceKeys.length ==0 ) {
						
							console.log("为空")
							this.$refs.message.open("center")
						} else {
							
							getDeviceData({
								productKey: this.productKey,
								deviceKeyList: deviceKeys
							}).then((res) => {
								console.log(res)
								if (res.msg == "ok") {
									this.longitude = res.data.deviceData[0].Lon;
									this.latitude = res.data.deviceData[0].Lat;
									this.date = res.data.deviceData[0].date;
									this.covers = [{
											latitude: this.latitude,
											longitude: this.longitude,
											iconPath: '/static/location.png',
											width: 35,
											height: 35,
										}],
										this.center = {
											lng: this.lng,
											lat: this.lat
										}
									this.markerArr = {
										lng: this.lng,
										lat: this.lat,
										title: this.productName,
										date: this.date
									}
									console.log(this.markerArr)
								}
							})
						}

					} else {
						this.$refs.message.open("center")
					}
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.page-body {
		height: 90vh;
		width: 100%;
	}
</style>
