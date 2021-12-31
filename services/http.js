export default function $http(options) {
	const { url, method, data } = options
	
	let header = {}
	if (url === 'https://api.ahusmart.com/session' || url.indexOf('https://app.ahusmart.com') !== -1) {
		// 登录/apk更新 不拦截
	} else {
		// 此外拦截，携带身份信息
		const token = uni.getStorageSync('token_nitrogen')
		if (!token) {
			uni.showToast({
				title: '身份已过期',
				icon: 'none'
			})
			setTimeout( () => {
				uni.navigateTo({
					url: '../pages/login'
				})
			}, 500)
			return new Promise((resolve, reject) => {
				reject('身份已过期')
			})
		}
		header.token = token
	}
	
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			method,
			data,
			header
		}).then((response) => {
			let [error, res] = response;
			resolve(res.data);
		}).catch(error => {
			let [err, res] = error;
			reject(err)
		})
	})
	
}