import $http from './http.js'

export const login = (username, password) => { // 登录
	return $http({
		url: 'https://api.ahusmart.com/session',
		method: 'post',
		data: {
			username,
			password
		}
	})
}

const baseUrl = "https://api.ahusmart.com/api/v1"

export const getUserInfo = (username) => { // 个人信息
	return $http({
		url: baseUrl + '/user/' + username,
		method: 'get'
	})
}

export const updateUserInfo = (data) => { // 更新个人信息
	return $http({
		url: baseUrl + '/user',
		method: 'put',
		data
	})
}

