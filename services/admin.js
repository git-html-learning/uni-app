import $http from './http1.js'

export const adminLogin = (username, password) => { // 登录
	return $http({
		url: 'https://api.ahusmart.com/admin',
		method: 'post',
		data: {
			username,
			password
		}
	})
}
const baseUrl = "https://api.ahusmart.com/api/v1/admin"

//删除用户
export const deleteUser = (username) => {  
	return $http({
		url: baseUrl + '/user/'+username,
		method: 'delete'
	})
}

//修改用户信息
export const editUser = (username,data) => {  
	return $http({
		url: baseUrl + '/user/'+username,
		method: 'put',
		data
	})
}