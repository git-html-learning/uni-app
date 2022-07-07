import $http from './http.js'

export const noticeByPage = () => { // 分页查看用户报警记录
	return $http({
		url: 'https://api.ahusmart.com/api/v1/userAlertInfos',
		method: 'post',
		data: {
			"pageIndex":1,
			"pageSize":30,
			"asc":0,
			"unRead":2,
		}
	})
}
