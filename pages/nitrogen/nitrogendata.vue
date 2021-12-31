<template>
	<view class="page-nitrogen-data">
		
		<view class="header">
			<view class="header-item">
				<text class="iconfont icon-computer-line"></text>
				运行状态：{{ nitrogenStatus.text }}
			</view>
			<view class="header-item">
				<text class="iconfont icon-a-shijian"></text>
				运行时间：{{ nitrogenStatus.runningTime }}
			</view>
			<view class="header-item">
				<text class="iconfont icon-tequandanqi"></text>
				氮气浓度：<text style="fontWeight:bold;fontSize:20px;">{{ granaryAve.n2Ave }}</text>%
			</view>
			<view class="header-item">
				<text class="iconfont icon-yali"></text>
				仓内气压：<text style="fontWeight:bold;fontSize:20px;">{{ pessure }}</text>Pa
			</view>
		</view>
		
		<view class="data-item">
			<view class="item-title">制氮机数据</view>
			<view class="item-gasdata">
				<text class="iconfont icon-N2"></text>
				<text class="item-gasdata-title">氮气纯度：</text>
				<text class="item-gasdata-data">{{ nitrogenData.n2 }}%</text>
			</view>
			<view class="item-gasdata">
				<text class="iconfont icon-yali1"></text>
				<text class="item-gasdata-title">气体压力：</text>
				<text class="item-gasdata-data">{{ nitrogenData.pressure }}Pa</text>
			</view>
			<view class="item-gasdata">
				<text class="iconfont icon-wendu"></text>
				<text class="item-gasdata-title">气体温度：</text>
				<text class="item-gasdata-data">{{ nitrogenData.temp }}℃</text>
			</view>
			<view class="item-gasdata">
				<text class="iconfont icon-qiti"></text>
				<text class="item-gasdata-title">气体流量：</text>
				<text class="item-gasdata-data">{{ nitrogenData.purity }}</text>
			</view>
		</view>
		
		<view class="data-item data-item2">
			<view class="item-title">仓内平均数据</view>
			<view class="item-gasdata">
				<text class="iconfont icon-eryanghuatan1"></text>
				<text class="item-gasdata-title">二氧化碳：</text>
				<text class="item-gasdata-data">{{ granaryAve.co2Ave }}%</text>
			</view>
			<view class="item-gasdata">
				<text class="iconfont icon-yangqi"></text>
				<text class="item-gasdata-title">氧气：</text>
				<text class="item-gasdata-data">{{ granaryAve.o2Ave }}%</text>
			</view>
			<view class="item-gasdata">
				<text class="iconfont icon-linhuaqing1"></text>
				<text class="item-gasdata-title">磷化氢：</text>
				<text class="item-gasdata-data">{{ granaryAve.ph3Ave }} ppm</text>
			</view>
			<view class="item-gasdata">
				<text class="iconfont icon-chongzi"></text>
				<text class="item-gasdata-title">虫害：</text>
				<text class="item-gasdata-data">{{ granaryAve.bugAve }}个</text>
			</view>
		</view>
		
		<view class="data-item3">
			<view class="item-title">仓内各点数据</view>
			<view class="item-points-data-box">
				<view class="point-item">
					<view class="point-item-title">测试点1</view>
					<view class="point-item-gasdata">
						氧气浓度/%：{{ o2 }}
					</view>
					<view class="point-item-gasdata">
						二氧化碳浓度/%：{{ o2 }}
					</view>
					<view class="point-item-gasdata">
						氮气浓度/%：{{ o2 }}
					</view>
					<view class="point-item-gasdata">
						磷化氢浓度/ppm：{{ o2 }}
					</view>
				</view>
				
				<view class="point-item">
					<view class="point-item-title">测试点1</view>
					<view class="point-item-gasdata">
						氧气浓度/%：{{ o2 }}
					</view>
					<view class="point-item-gasdata">
						二氧化碳浓度/%：{{ o2 }}
					</view>
					<view class="point-item-gasdata">
						氮气浓度/%：{{ o2 }}
					</view>
					<view class="point-item-gasdata">
						磷化氢浓度/ppm：{{ o2 }}
					</view>
				</view>
				
				<view class="point-item">
					<view class="point-item-title">测试点1</view>
					<view class="point-item-gasdata">
						氧气浓度/%：{{ o2 }}
					</view>
					<view class="point-item-gasdata">
						二氧化碳浓度/%：{{ o2 }}
					</view>
					<view class="point-item-gasdata">
						氮气浓度/%：{{ o2 }}
					</view>
					<view class="point-item-gasdata">
						磷化氢浓度/ppm：{{ o2 }}
					</view>
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				
				// 运行状态
				nitrogenStatus: {
					text: '仓内数据监测',
					runningTime: '02小时46分10秒',
				},
				
				// 仓内数据
				pessure: 10,
				n2Ave: 95,
				granaryAve: {
					n2Ave: 97.6,
					co2Ave: 0.04,
					o2Ave: 0.93,
					ph3Ave: 0,
					bugAve: 0
				},
				
				// 制氮机数据
				nitrogenData: {
					n2: 99,
					pressure: 10,
					temp: 12,
					purity: 0.8
				},
				
				o2: 0.78
				
			}
		},
		onLoad() {
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	
	.page-nitrogen-data {
		padding-top: 10px;
		.header {
			background-color: #FFFFFF;
			box-shadow: 0 0px 5px $uni-border-color;
			.header-item {
				height: 40px;
				display: flex;
				align-items: center;
				.iconfont {
					margin-left: 8px;
					font-size: 22px;
					min-width: 30px;
				}
				.icon-computer-line, .icon-a-shijian {
					color: #2FC25B;
				}
				.icon-yali, .icon-tequandanqi {
					color: #1890FF;
				}
			}
		}
		
		.data-item {
			margin-top: 20px;
			background-color: #FFFFFF;
			padding: 10px;
			border-radius: 6px;
			box-shadow: 0 0px 5px $uni-border-color;
			.item-title {
				font-weight: bold;
				height: 28px;
				line-height: 28px;
				border-bottom: solid 1px $uni-border-color;
			}
			.item-gasdata {
				height: 23px;
				line-height: 23px;
				.iconfont {
					margin: 0 5px 0 15px;
					font-size: 15px;
					color: #2FC25B;
				}
				.item-gasdata-title {
					display: inline-block;
					min-width: 30%;
				}
				.item-gasdata-data {
					font-weight: bold;
				}
			}
		}
		.data-item2 {
			.item-gasdata {
				.iconfont {
					color: #1890FF;
				}
			}
		}
		
		.data-item3 {
			margin-top: 20px;
			background-color: $uni-bg-color-grey;
			.item-title {
				padding-left: 10px;
				border-radius: 3px;
				// border-top-left-radius: 6px;
				// border-top-right-radius: 6px;
				background-color: #FFFFFF;
				font-weight: bold;
				height: 30px;
				line-height: 30px;
				box-shadow: 0 0 3px $uni-border-color;
			}
			
			.item-points-data-box {
				padding: 10px;
				display: flex;
				flex-wrap: wrap;
				.point-item {
					font-size: 10px;
					width: 48%;
					background-color: #FFFFFF;
					padding: 5px;
					border-radius: 6px;
					box-shadow: -2px -2px 6px $uni-border-color;
					.point-item-title {
						padding-left: 5px;
						height: 28px;
						line-height: 28px;
						text-align: center;
						border-bottom: solid 1px $uni-border-color;
					}
					.point-item-gasdata {
						padding-left: 10px;
						height: 28px;
						line-height: 28px;
					}
				}
			}
			
			.item-points-data-box {
				.point-item:nth-child(2n+1) {
					width: 48%;
					margin-right: 4%;
				}
				.point-item:nth-child(n+3) {
					margin-top: 10px;
				}
			}
			
		}
		
	}

</style>
