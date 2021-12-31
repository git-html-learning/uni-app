import $http from './http.js'

const baseUrlApp = 'https://app.ahusmart.com'

export const checkVersion = (projectName) => {
	return $http({
		url: baseUrlApp + '/check?projectName=' + projectName + "&filetype=apk",
		method: 'get'
	})
}

export const downloadApp = (projectName, version, filename) => {
	return $http({
		url: baseUrlApp + '/download?projectName=' + projectName + "&version=" + version + "&filename=" + filename,
		method: 'get'
	})
}

export const checkVersion2 = (projectName) => {
	return $http({
		url: '/app/check?projectName=' + projectName + "&filetype=apk",
		method: 'get'
	})
}

export const downloadApp2 = (projectName, version, filename) => {
	return $http({
		url: '/app/download?projectName=' + projectName + "&version=" + version + "&filename=" + filename,
		method: 'get'
	})
}
