<template>
	<view class="layout">


		<uni-forms :modelValue="formData" :rules="Rules" ref="formData" label-position="left" label-width="120px">
			<uni-forms-item label="车牌号" name="productName">
				<uni-easyinput type="text" v-model="formData.productName" placeholder="车牌号" />
			</uni-forms-item>
			<uni-forms-item label="imei号" name="typeIdentify">
				<uni-easyinput type="text" v-model="formData.typeIdentify" placeholder="imei号" />
			</uni-forms-item>
			<uni-forms-item label="温湿度传感器数" name="num1">
				<!-- <uni-easyinput type="text" v-model="formData.num1" placeholder="传感器数量" /> -->
				<uni-number-box v-model="formData.num1"></uni-number-box>
			</uni-forms-item>
			<uni-forms-item label="油位监测设备数" name="num2">
				<!-- <uni-easyinput type="text" v-model="formData.num2" placeholder="监测设备数量" /> -->
				<uni-number-box v-model="formData.num2"></uni-number-box>
			</uni-forms-item>
			<uni-forms-item label="照明灯数" name="num3">
				<!-- <uni-easyinput type="text" v-model="formData.num3" placeholder="照明灯数量" /> -->
				<uni-number-box v-model="formData.num3"></uni-number-box>
			</uni-forms-item>
			<uni-forms-item label="杀菌灯数" name="num4">
				<!-- <uni-easyinput type="text" v-model="formData.num4" placeholder="杀菌灯数量" /> -->
				<uni-number-box v-model="formData.num4"></uni-number-box>
			</uni-forms-item>
			<uni-forms-item label="胎温胎压传感数" name="num5">
				<!-- <uni-easyinput type="text" v-model="formData.num5" placeholder="胎温胎压传感器数量" /> -->
				<uni-number-box v-model="formData.num5"></uni-number-box>
			</uni-forms-item>

			<uni-forms-item label="门数" name="num6">
				<!-- <uni-easyinput type="text" v-model="formData.num6" placeholder="门数量" /> -->
				<uni-number-box v-model="formData.num6"></uni-number-box>
			</uni-forms-item>
			<uni-forms-item label="横向震动监测数" name="num7">
				<!-- <uni-easyinput type="text" v-model="formData.num7" placeholder="横向震动监测数量" /> -->
				<uni-number-box v-model="formData.num7"></uni-number-box>
			</uni-forms-item>
			<uni-forms-item label="纵向震动监测数" name="num8">
				<!-- <uni-easyinput type="text" v-model="formData.num8" placeholder="纵向震动监测数量" /> -->
				<uni-number-box v-model="formData.num8"></uni-number-box>
			</uni-forms-item>

		</uni-forms>
		<button type="primary" @click="submit">提交</button>
	</view>
</template>
<script>
	import {
		registerVeh,
		getDeviceList
	} from "@/services/product";
	import {
		userRegister
	} from "@/services/user";
	import {
		editUser
	} from "@/services/admin";
	import {
		addDeviceToHONEN
	} from "@/services/device";
	export default {
		name: "register",
		data() {
			return {
				formData: {
					productName: "",
					typeIdentify: "",
					num1: "8",
					num2: "1",
					num3: "1",
					num4: "1",
					num5: "12",
					num6: "3",
					num7: "1",
					num8: "1",
				},
				// 自定义表单校验规则
				Rules: {
					productName: {
						rules: [{
							required: true,
							errorMessage: '车牌号不能为空'
						}]
					},
					typeIdentify: {
						rules: [{
							required: true,
							errorMessage: 'imei号不能为空'
						}, {
							minLength: 15,
							maxLength: 20,
							errorMessage: 'imei号长度至少为15位',
						}]
					},


				},
				productKey: "",
				productName: ""
			}
		},
		methods: {
			submit() {
				if (this.formData.productName == "") {
					uni.showToast({
						title: '车牌号不能为空',
						icon: 'none'
					})

				} else if (this.formData.typeIdentify == "") {
					uni.showToast({
						title: 'imei号不能为空',
						icon: 'none'
					})
				} else if (this.formData.typeIdentify.length < 15) {
					uni.showToast({
						title: 'imei号至少是15位',
						icon: 'none'
					})
				} else {
					registerVeh(this.formData).then((res) => {
						console.log(res)
							if (res.code == 200) {
								this.productName = res.data.productName
								this.productKey = res.data.productKey
								//注册用户

								var obj = {
									username: this.productName,
									password: "123456",
									phone: "",
									email: ""
								}
console.log(obj)
								userRegister(obj).then((res) => {
									console.log(res)
										if (res.code == 200) {
											var obj = {
												username: this.productName,
												password: "123456",
												phone: "",
												email: "",
												extraInfo: {
													role: "user",
													pk: this.productKey
												}
											}
console.log(obj)
											editUser(this.productName, obj).then((res) => {
												console.log(res)
													if (res.code == 200){
															var deviceList = [{
																	deviceName: "TH1",
																	nickname: "",
																	netType: "4G",
																	deviceType: "TempAndHumi",
																	extraInfo: {},
																},
																{
																	deviceName: "TH2",
																	nickname: "",
																	netType: "4G",
																	deviceType: "TempAndHumi",
																	extraInfo: {},
																},
																{
																	deviceName: "TH3",
																	nickname: "",
																	netType: "4G",
																	deviceType: "TempAndHumi",
																	extraInfo: {},
																},
																{
																	deviceName: "TH4",
																	nickname: "",
																	netType: "4G",
																	deviceType: "TempAndHumi",
																	extraInfo: {},
																},
																{
																	deviceName: "TH5",
																	nickname: "",
																	netType: "4G",
																	deviceType: "TempAndHumi",
																	extraInfo: {},
																},
																{
																	deviceName: "TH6",
																	nickname: "",
																	netType: "4G",
																	deviceType: "TempAndHumi",
																	extraInfo: {},
																},
																{
																	deviceName: "TH7",
																	nickname: "",
																	netType: "4G",
																	deviceType: "TempAndHumi",
																	extraInfo: {},
																},
																{
																	deviceName: "door_1",
																	nickname: "",
																	netType: "4G",
																	deviceType: "door",
																	extraInfo: {},
																},
																{
																	deviceName: "door_2",
																	nickname: "",
																	netType: "4G",
																	deviceType: "door",
																	extraInfo: {},
																},
																{
																	deviceName: "Alarm",
																	nickname: "",
																	netType: "4G",
																	deviceType: "alarm",
																	extraInfo: {},
																},
																{
																	deviceName: "GPS",
																	nickname: "",
																	netType: "4G",
																	deviceType: "gps",
																	extraInfo: {},
																},
																{
																	deviceName: "Oil",
																	nickname: "",
																	netType: "4G",
																	deviceType: "oil",
																	extraInfo: {},
																},
																{
																	deviceName: "ACC",
																	nickname: "",
																	netType: "4G",
																	deviceType: "acc",
																	extraInfo: {},
																}
															];
															var index = 0;
															
		deviceList.forEach((item)=>{
				
			addDeviceToHONEN(this.productKey,item).then((res)=>{
				console.log(res)
				index = index+1;
					
				if(index == deviceList.length) {
					uni.showToast({
						title: `冷藏车${this.productName}注册成功`,
						icon: 'none'
					})
					this.formData.productName = ""
					this.formData.typeIdentify = ""
				}
			})
		}
											)


														}
													})
											}
										})

								}
							})










					}
				}
			}

		}
</script>
<style lang="scss" scoped>
	.layout {
		padding: 10px;
	}
</style>
