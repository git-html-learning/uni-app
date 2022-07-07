<template>
	<view class="">
		<uni-list>
			<uni-list>
				<uni-list-chat v-for="(item,index) in noticeData" :key="index" avatar="/static/冷链车.png"
					:avatar-circle="true" :title="item.carNum" :note="item.note" :time="item.time" clickable
					@click="showMore(item)" style="height: 80px;">
				</uni-list-chat>

			</uni-list>
		</uni-list>
	</view>
</template>

<script>
	import {
		noticeByPage
		
	} from "@/services/notice";
	export default {
		data() {
			return {
				noticeData: [{
						carNum: "皖A85230",
						note: "该车在2020年10月25日15:33车厢温度传感器1温度过高！",
						time: "2020/10/25 15:33"
					},
					{
						carNum: "A7670C",
						note: "该车在2020年10月24日10:23车厢温度传感器2湿度过高！",
						time: "2020/10/24 10:23"
					},
					{
						carNum: "皖A85230",
						note: "该车在2020年10月25日15:03震动值过高！",
						time: "2020/10/23 15:03"
					},
					{
						carNum: "皖A85230",
						note: "该车在2020年10月25日15:33车厢温度传感器1温度过高！",
						time: "2020/10/25 15:33"
					},
					{
						carNum: "A7670C",
						note: "该车在2020年10月25日15:33车厢温度传感器1温度过高！",
						time: "2020/10/25 15:33"
					},
					{
						carNum: "A7670C",
						note: "该车在2020年10月25日15:33车厢温度传感器1温度过高！",
						time: "2020/10/25 15:33"
					},
					{
						carNum: "皖A85230",
						note: "该车在2020年10月25日15:33车厢温度传感器1温度过高！",
						time: "2020/10/25 15:33"
					},
					{
						carNum: "皖A85230",
						note: "该车在2020年10月25日15:33车厢温度传感器1温度过高！",
						time: "2020/10/25 15:33"
					},
					{
						carNum: "A7670C",
						note: "该车在2020年10月25日15:33车厢温度传感器1温度过高！",
						time: "2020/10/25 15:33"
					},
					{
						carNum: "皖A85230",
						note: "该车在2020年10月25日15:33车厢温度传感器1温度过高！",
						time: "2020/10/25 15:33"
					},
					{
						carNum: "皖A85230",
						note: "该车在2020年10月25日15:33车厢温度传感器1温度过高！",
						time: "2020/10/25 15:33"
					},
				]
			}
		},
		created() {
		this.dataPrepare()	
		},
		methods: {
			dataPrepare() {
				noticeByPage().then((res)=>{
					console.log(res)
					if (res.msg == "ok") {
						res.data.alertInfo.forEach(item=>{
							var obj = {
								carNum:item.productName,
								note: item.Content,
								time:item.date
							}
							this.noticeData.push(obj)
						})
						// this.noticeData.push(res.data.alertInfo)
					}
				})
			},
			showMore(data) {
				console.log(data);
				uni.showModal({
					title: '详细信息',
					content: data.note,
					showCancel: false,
					confirmColor: "#6147f4",
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style>
</style>
