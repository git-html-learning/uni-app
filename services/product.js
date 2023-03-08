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



export const registerVeh = (data) =>{   //注册车辆
    return $http({
        url: baseUrl +"/product",
        method: "POST",
        data: {
                   "protocolType": "MQTT",
                   "productName": data.productName,
                   "productType": 1,
                   "typeIdentify": data.typeIdentify,
                   "description": "此产品为冷藏车产品",
                   "extraInfo": {
					   "role": "user",   
					   "status": {
						   "if":"un",
						   "grouper":""
					   },
                       "tempAndHumi": {
                           "Name": "温湿度传感器数量",
                           "Value": data.num1
                       },
                       "oil": {
                           "Name": "油位监测设备数量",
                           "Value": data.num2
                       },
                       "light01": {
                           "Name": "照明灯数量",
                           "Value": data.num3
                       },
                       "light02": {
                           "Name": "杀菌灯数量",
                           "Value": data.num4
                       },
                       "tireTempPress": {
                           "Name": "胎温胎压传感器数量",
                           "Value": data.num5
                       },
                       "door": {
                           "Name": "门数量",
                           "Value": data.num6
                       },
                       "shake01": {
                           "Name": "横向震动监测数量",
                           "Value": data.num7
                       },
                       "shake02": {
                           "Name": "纵向震动监测数量",
                           "Value": data.num8
                       }
       
                   },
				   }
    })
}
