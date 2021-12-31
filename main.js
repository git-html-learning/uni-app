import Vue from 'vue'
import uView from "uview-ui";
Vue.use(uView);
import App from './App'
import api from './services'
import formatTimeToStr from './utils/date'


Vue.config.productionTip = false

Vue.prototype.$time2date = formatTimeToStr
Vue.prototype.$api = api
Vue.prototype.$message = (title, duration = 2000, icon = 'none') => uni.showToast({
	title,
	duration,
	icon
})

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
