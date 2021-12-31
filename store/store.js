import Vue from 'vue'

export const store = Vue.observable({
	version: '1.0',
	hasLogin: false
})

export const mutations = {
	setUsername (username) {
		store.username = username
	},
	setHasLogin (hasLogin) {
		store.hasLogin = hasLogin
	},
}