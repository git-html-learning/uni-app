<template>
	<view class="page-nitrogen">
		
		<view class="header">
			<view class="username">
				欢迎用户：{{ username }}
			</view>
			<text></text>
			<button class="cu-btn bg-blue"  @tap="modalName='DialogModal1'">退出登录</button>
		</view>
		
		<view class="granary">
			<view class="title">请选择操作仓库</view>
			<view class="dropdown-box">
				<view class="dropdown-box-title">仓库名称</view>
				<dropdown :current="indexGranary" :list="list" @onClick="dropDownChange" />
			</view>
		</view>
		
		<view class="granary">
			<view class="title">请选择操作方式</view>
			<view class="dropdown-box">
				<view class="dropdown-box-title">充氮方式</view>
				<dropdown :current="indexMethod" :list="list2" @onClick="dropDownChange2" />
			</view>
		</view>
		
		<view class="flex justify-center">
			<button style="width:70%;" class="cu-btn bg-blue margin-top-lg"  @tap="jumpToNitrogenData">进入充氮配置</button>
		</view>
		
		
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white justify-end">
					<view class="content">
						<view style="fontWeight:bold;fontSize:36rpx;">提示</view>
					</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					确定要退出登录吗？
				</view>
				<view class="cu-bar bg-white ">
					<view class="action">
						<button class="cu-btn line-blue margin-left-xl" @tap="hideModal">取消</button>
					</view>
					<view class="action">
						<button class="cu-btn bg-red margin-right-xl" @tap="logout">确定</button>
					</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import dropdown from '../../components/dropdown/dt-dropdown.vue'
	export default { 
		components: {
			dropdown
		},
		data () {
			return {
				
				username: '',
				modalName: null,
				
				list: ['13仓', '14仓'],
				indexGranary: 0,
				
				list2: ['智能充氮', '手动操作'],
				indexMethod: 0,
				
			}
		},
		onLoad() {
		},
		onShow() {
			// 获取用户名
			this.username = uni.getStorageSync('username_nitrogen')
		},
		methods: {
			
			dropDownChange (v) {
				this.indexGranary = v
			},
			dropDownChange2 (v) {
				this.indexMethod = v
			},
			
			jumpToNitrogenData () {
				uni.navigateTo({
					url: './nitrogendata'
				})
			},
			
			// 对话框隐藏
			hideModal () {
				this.modalName = null
			},
			
			// 登出
			logout () {
				this.modalName = null
				uni.reLaunch({
					url: '../login'
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.page-nitrogen {
		
		.header {
			display: flex;
			margin: 5px 0;
			padding: 10px;
			border-radius: 5px;
			background-color: #FFFFFF;
			align-items: center;
			justify-content: space-between;
			box-shadow: 0 0 5px $uni-border-color;
		}
		
		.granary {
			background-color: #FFFFFF;
			margin-top: 20px;
			padding: 10px;
			border-radius: 5px;
			background-color: #FFFFFF;
			box-shadow: 0 0 5px $uni-border-color;
			.title {
				font-weight: bold;
				padding: 5px 0;
				border-bottom: solid 1px $uni-border-color;
			}
			.dropdown-box {
				margin-top: 20px;
				margin-bottom: 10px;
				display: flex;
				align-items: center;
				justify-content: center;
				.dropdown-box-title {
					font-size: 13px;
					margin-right: 10px;
				}
			}
		}
		
	}
</style>
