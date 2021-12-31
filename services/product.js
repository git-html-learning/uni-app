import $http from './http.js'

const baseUrl = "https://api.ahusmart.com/api/v1"

export const getProduct = (data) => { // 产品列表
	return $http({
		url: baseUrl + '/product',
		method: 'get'
	})
}

export const getDeviceList = (productKey) => { // 产品详情
	return $http({
		url: baseUrl + '/productDetail?productKey=' + productKey,
		method: 'get'
	})
}
