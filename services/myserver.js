import $http from './http.js'

const baseUrl = "http://49.4.8.167:30057"


export const newData = (username, productKeyList) => {
	return $http({
		url: baseUrl + '/newData',
		method: 'post',
		data: {
			username,
			productKeyList
		}
	})
}

export const getProductHistoryData = (username,productKeyList,startTime,endTime,share) => {
	return $http({
		url: baseUrl + '/productHistoryData',
		method: 'post',
		data: {
			username,
			productKeyList,
			startTime,
			endTime,
			share
		}
	})
}
