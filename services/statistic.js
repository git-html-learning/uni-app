import $http from './http.js'

const baseUrl = "https://api.ahusmart.com/api/v1"

//------------------------------------- 历史数据 -------------------------------------

export const getBatchDeviceData = (productKey, deviceKeyList) => { // 设备最新数据
	return $http({
		url: baseUrl + '/batchDeviceData',
		method: 'post',
		data: {
			productKey,
			deviceKeyList
		}
	})
}

export const getHistoryData = (deviceKey, startTime, endTime, asc) => { // 历史数据
	return $http({
		url: baseUrl + '/historyData',
		method: 'post',
		data: {
			deviceKey,
			startTime,
			endTime,
			asc
		}
	})
}

export const getRecentData = (productKey, deviceKey, num, asc=0) => { // 历史数据
	return $http({
		url: baseUrl + '/recentData',
		method: 'post',
		data: {
			productKey,
			deviceKey,
			num,
			asc
		}
	})
}

export const getProductDataPoint = (productKey,startTime,endTime) => { // 节点时间数据（某个时刻前后一段时间的一条数据）
	return $http({
		url: baseUrl + '/productDataPoint',
		method: 'post',
		data: {
			productKey,
			startTime,
			endTime
		}
	})
}

export const getProductDataLatest = (username, productKey,startTime,endTime) => { // 节点时间数据
	return $http({
		url: baseUrl + '/latestProductData',
		method: 'post',
		data: {
			username,
			productKey,
			startTime,
			endTime
		}
	})
}



//------------------------------------- 报警信息 -------------------------------------

export const updateOneAlert = (data) => { // 更新一条报警信息
	return $http({
		url: baseUrl + '/alertStatus',
		method: 'post',
		data
	})
}

export const updateSomeAlert = (data) => { // 更新多条报警信息
	return $http({
		url: baseUrl + '/productAlertInfos',
		method: 'post',
		data
	})
}

//-------------------------------------统计信息-------------------------------------

export const getUserAlertInfos = (data) => { // 报警信息分布（按年/月/日/时）
	return $http({
		url: baseUrl + '/userAlertInfos',
		method: 'post',
		data
	})
}

export const getAlertDistribution = (data) => { // 报警信息分布（按年/月/日/时）
	return $http({
		url: baseUrl + '/alertDistribution',
		method: 'post',
		data
	})
}

export const getDeviceKeys = () => { // 设备keys
	return $http({
		url: baseUrl + '/deviceKeys',
		method: 'get'
	})
}


export const getAllStatus = (timeout) => { // 设备所有在线离线信息
	return $http({
		url: baseUrl + '/allStatus?timeout=' + timeout,
		method: 'get'
	})
}

export const getDeviceStatusExtra = (data) => {
	return $http({
		url: baseUrl + '/DeviceDataExtra',
		method: 'post',
		data
	})
}
