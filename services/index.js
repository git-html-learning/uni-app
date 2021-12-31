const requireApi = require.context(
// 批量导出(循环遍历)
	// api目录的路径
	'.',
	// 是否查询子目录
	false,
	// 查询文件后缀，正则
	/.js$/
)

let module = {}
// 遍历
requireApi.keys().forEach((item, index) => {
	if (item === './index.js' || item === './http.js') return
	// 合并对象
	Object.assign(module, requireApi(item))
})

export default module