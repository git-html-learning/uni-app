import $http from './http.js'

const baseUrl = "https://api.ahusmart.com/api/v1"

//-------------------------------------设备管理-------------------------------------

export const getDeviceData = (data) => { //获取设备当前最新数据
	return $http({
		url: baseUrl + '/batchDeviceData',
		method: 'post',
		data: {
			"productKey": data.productKey,
			"deviceKeyList": data.deviceKeyList
		}
	})
}

export const getDeviceHisData = (data) => { //获取设备历史数据
	return $http({
		url: baseUrl + '/recentData',
		method: 'post',
		data: {
			"productKey": data.productKey,
			"deviceKey": data.deviceKey,
			"num": data.num, // 指定数量，最小值为1
			"asc": 0
		}
	})
}



export const getDeviceDetail = (productKey, deviceKey) => { // 设备详情
	return $http({
		url: baseUrl + '/deviceDetail?productKey=' + productKey + '&deviceKey=' + deviceKey,
		method: 'get'
	})
}

export const updateDevice = (data) => { // 更新设备
	return $http({
		url: baseUrl + '/device',
		method: 'put',
		data,
	})
}

export const deleteDevice = (productKey, deviceKey) => { // 删除设备
	return $http({
		url: baseUrl + '/device?productKey=' + productKey + "&deviceKey=" + deviceKey,
		method: 'delete'
	})
}

export const addDeviceToHONEN = (productKey, data) => { // 创建设备
	return $http({
		url: baseUrl + '/device?productKey=' + productKey,
		method: 'post',
		data,
	})
}

export const deviceTemplate = (devicetype) => { //获取指定设备模板
	return $http({
		url: baseUrl + '/formwork?devicetype=' + devicetype,
		method: 'get',
	})
}

export const issuePort = (data) => { //下发接口
	return $http({
		url: baseUrl + '/newDownRaw?deviceType=kbox1&bodyType=json&timeout=2',
		method: 'post',
		data: data
	})
}

export const checkFromHONEN = (simId) => { // 查看云平台是否有某设备
	return $http({
		url: baseUrl + '/deviceDetail',
		method: 'post',
		data: {
			"simId": {
				"adminVisible": true,
				"userEditable": true,
				"userVisible": true,
				"Name": "设备入网号",
				"Value": simId,
				"adminEditable": true
			}
		}
	})
}

//------------------------------------- 设备注册电信云相关 -------------------------------------

export const checkFromDIANXINYUN = (simId) => { // 查看电信云是否注册某设备
	return $http({
		url: 'http://49.4.8.167:30061/hasdevice?simId=' + simId,
		method: 'get'
	})
}

export const addDeviceSS2 = (simId, name, modalType) => { // 注册电信云
	return $http({
		url: 'http://49.4.8.167:30061/register?simId=' + simId + '&name=' + name + '&modalType=' +
			modalType,
		method: 'get'
	})
}

export const addDeviceSS3 = (name, simId, SN, modalType, rowData) => { // 注册电信云（配合应用服务器，整理文档用）
	return $http({
		url: 'http://49.4.8.167:30061/register2?name=' + name + '&simId=' + simId + '&SN=' + SN +
			'&modalType=' + modalType + '&rowData=' + rowData,
		method: 'get'
	})
}

export const addDeviceSS = (productKey, data) => { // 云平台接口，一键注册电信云、云平台
	return $http({
		url: baseUrl + '/deviceSimId?productKey=' + productKey,
		method: 'post',
		data: {
			...data
		}
	})
}
