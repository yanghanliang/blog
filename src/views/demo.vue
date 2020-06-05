<template>
    <div class="demo">
        <left-auto class="position-relative">
			<div slot="nav" class="personal">
				<div class="personal-top clearfix">
					<i class="fl my-icon-xiaoxi"></i>
					<div class="fr user clearfix">
						<div class="user-head-portrait fr">
							<img src="../assets/index/index/images/avatar.jpg" alt="">
						</div>
						<span class="user-name fr">
							Anstasia
						</span>
					</div>
				</div>
				<div ref="balance" class="balance"></div>
				<div class="clearfix transitions-title">
					<span class="fl ">Transitions</span>
					<my-select class="fr" :id.sync="id"></my-select>
				</div>
				<ul class="transactions">
					<li class="t-item">
						<i class="my-icon-tubiaoku"></i>
						<span class="ti-title">Dribbble Pro Plan</span>
						<span class="fr" red>-$100</span>
					</li>
					<li class="t-item">
						<i class="my-icon-tubiaoku"></i>
						<span class="ti-title">Dribbble Pro Plan</span>
						<span class="fr color-blue">+$100</span>
					</li>
					<li class="t-item">
						<i class="my-icon-tubiaoku"></i>
						<span class="ti-title">Dribbble Pro Plan</span>
						<span class="fr" red>-$100</span>
					</li>
				</ul>
				<button class="btn clearfix">
					<span class="fl">Transfer Money</span>
					<i class="my-icon-sanjiaoyou fr"></i>
				</button>
				<div class="news">
					<i class="my-icon-pinglun2"></i>
				</div>
			</div>
			<div slot="content" class="demo-content">
				<div class="top clearfix">
					<div class="logo fl">
						<logo />
					</div>
					<ul class="nav clearfix fl">
						<template v-for="(item, index) in navList">
							<li :class="{ active: item.status }" @click="clickNav(item)" :key="index">{{ item.text }}</li>
						</template>
					</ul>
					<el-input placeholder="请输入您要搜索的内容" v-model="search" :autofocus="true" @input="searchInput"
						@keyup.enter.native="searchEnter" clearable class="search fr" suffix-icon="el-icon-search">
					</el-input>
				</div>
				<div class="cards clearfix mb40">
					<div class="public-title clearfix">
						<span class="fl">Cards</span>
						<span class="fr">View all cards</span>
					</div>
					<ul class="cards-item bgc-red">
						<li>Assakdkasjdka</li>
						<li>${{ 220000 | money({ conversion: 'up', symbol: ',', decimal: true }) }}</li>
						<li>*** *** *** *** *** **23</li>
						<li>
							<span>Monzo</span>
							<el-switch
								v-model="one"
								class="fr"
								active-color="#13ce66"
								inactive-color="#065af3">
							</el-switch>
						</li>
					</ul>
					<ul class="cards-item bgc-blue">
						<li>Assakdkasjdka</li>
						<li>${{ 6854179522 | money({ conversion: 'up', symbol: ',', decimal: true }) }}</li>
						<li>*** *** *** *** *** **23</li>
						<li>
							<span>Monzo</span>
							<el-switch
								class="fr"
								v-model="two"
								active-color="#13ce66"
								inactive-color="#ff4949">
							</el-switch>
						</li>
					</ul>
					<div class="add-card">
						<div class="ac-content">
							<div class="add-icon">
								<i class="display-b my-icon-jia"></i>
							</div>
							<span class="display-b">Add New Card</span>
						</div>
					</div>
				</div>
				<div class="dc-content">
					<div class="services">
						<div class="public-title clearfix">
							<span class="fl">Main Services</span>
							<span class="fr">View all</span>
						</div>
						<div class="clearfix">
							<div class="services-item">
								<i class="display-b my-icon-jiaoyipaixing"></i>
								<span>Transitions</span>
							</div>
							<div class="services-item">
								<i class="display-b my-icon-dengpao"></i>
								<span>Transitions</span>
							</div>
							<div class="services-item">
								<i class="display-b my-icon-jiaoyi"></i>
								<span>Transitions</span>
							</div>
							<div class="services-item">
								<i class="display-b my-icon-qianbao"></i>
								<span>Transitions</span>
							</div>
							<div class="services-item">
								<i class="display-b my-icon-shijian1"></i>
								<span>Transitions</span>
							</div>
							<div class="services-item">
								<i class="display-b my-icon-category"></i>
								<span>Transitions</span>
							</div>
						</div>
					</div>
					<div class="dcc-right">
						<div class="current">
							<div class="public-title clearfix">
								<span class="fl">Current</span>
								<span class="fr">View all</span>
							</div>
							<div class="current-item clearfix">
								<span class="fl">10638736812545</span>
								<div class="line"></div>
								<span class="fr money">${{ 123456 | money({ conversion: 'up', symbol: ',', decimal: true }) }}</span>
							</div>
							<div class="current-item clearfix">
								<span class="fl">10638736812545</span>
								<div class="line"></div>
								<span class="fr money">${{ 666456 | money({ conversion: 'up', symbol: ',', decimal: true }) }}</span>
							</div>
							<div class="current-item clearfix">
								<span class="fl">10638736812545</span>
								<div class="line"></div>
								<span class="fr money">${{ 654321 | money({ conversion: 'up', symbol: ',', decimal: true }) }}</span>
							</div>
						</div>
						<div class="savings mt40">
							<div class="public-title clearfix">
								<span class="fl">Current</span>
								<span class="fr">View all</span>
							</div>
							<div class="savings-content clearfix">
								<div id="savings" ref="savings" class="savings-echarts fl"></div>
								<ul class="fr sc-box">
									<li class="clearfix">
										<span class="fl">Total</span>
										<span class="fr money">${{ 10000 | money({ conversion: 'up', symbol: ',', decimal: true }) }}</span>
									</li>
									<li class="clearfix">
										<span class="fl">Total week</span>
										<span class="fr money">${{ 256789 | money({ conversion: 'up', symbol: ',', decimal: true }) }}</span>
									</li>
									<li class="clearfix">
										<span class="fl">This month</span>
										<span class="fr money">${{ 68541 | money({ conversion: 'up', symbol: ',', decimal: true }) }}</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
        </left-auto>
    </div>
</template>

<script>
import leftAuto from '@/components/webs/public/layout/content/main/leftAuto'
import mySelect from '@/components/webs/public/mySelect/index'
import logo from '@/components/canvas/logo/index'
import echarts from 'echarts'

export default {
	name: 'demo',
	components: {
		leftAuto,
		mySelect,
		logo
	},
	filters: {
		money (value, params) {
			if (params && params.conversion) {
				// 为了避免小数点做运算的问题： 201 * 0.01 = 2.0100000000000002
				if (params.conversion === 'up') {
					value = value / 100
				} else if (params.conversion === 'down') {
					value = value * 100
				}
			}

			// 千分位符号
			if (params && params.symbol) {
				const arr = String(value).split('.')

				/**
				 * 从后往前截取字符串
				 * @param {object}           params
				 * @param {string}           params.str
				 * @param {number}           params.step
				 */
				const newArr = []
				const recursion = function (params) {
					if (params.str.length > params.step) {
						const item = params.str.slice(-params.step)
						newArr.unshift(item)
						recursion({
							str: params.str.slice(0, -params.step),
							step: params.step
						})
					} else {
						if (params.str) {
							newArr.unshift(params.str)
						}
					}
				}
				recursion({
					str: String(arr[0]),
					step: 3
				})

				const str = newArr.join(params.symbol)

				if (arr.length > 1) {
					if (String(arr[1]).length === 1 && params.decimal) {
						return str + '.' + arr[1] + '0'
					} else {
						return str + '.' + arr[1]
					}
				} else {
					if (params.decimal) {
						return str + '.00'
					} else {
						return str
					}
				}
			}

			console.log(params, 'params')

			// 保留小数点
			if (params && params.decimal) {
				let temp = String(value)
				console.log(temp.indexOf('.'), temp.slice(temp.indexOf('.')).length, '????')
				if (!temp.includes('.')) {
					console.log(0)
					return value + '.00'
				} else if (temp.slice(temp.indexOf('.')).length === 1) {
					// 小数点只有一位时走这
					console.log(1)
					return value + '0'
				}
			}
			return value
		}
	},
	data () {
		return {
			one: '',
			two: '',
			navList: [
				{
					id: 1,
					status: true,
					text: 'Dashboard'
				},
				{
					id: 2,
					status: false,
					text: 'Services'
				},
				{
					id: 3,
					status: false,
					text: 'History'
				},
				{
					id: 4,
					status: false,
					text: 'Actions'
				}
			],
			savingsEcharts: null,
			balanceEcharts: null,
			id: 1
		}
	},
	mounted () {
		this.initSavings()
		this.initBalance()
		this.resize()
	},
	methods: {
		initSavings () {
			this.savingsEcharts = echarts.init(this.$refs.savings)

			let option = {
				tooltip: {
					trigger: 'item',
					show: true,
					formatter: '+{c}%'
				},
				axisPointer: { show: false },
				xAxis: [{
					type: 'category',
					data: ['$10', '$20', '$30', '$40', '$50'],
					axisLine: {
						lineStyle: {
							color: '#999'
						}
					}
				}],
				grid: {
					// 组件离容器的距离（边距）
					top: 10,
					right: 15,
					left: 45
				},
				toolbox: {
				},
				yAxis: [
					{
						type: 'value',
						maxInterval: 100,
						minInterval: 25,
						splitLine: {
							lineStyle: {
								type: 'dashed',
								color: '#DDD'
							}
						},
						axisLabel: {
							show: true,
							interval: 'auto',
							formatter: '{value} %'
						},
						splitNumber: 4,
						axisLine: {
							show: false,
							lineStyle: {
								color: '#333'
							},
						},
						nameTextStyle: {
							color: '#999'
						},
						splitArea: {
							show: false
						}
					}
				],
				series: [{
					name: '课时',
					type: 'line',
					data: [0, 50, 60, 86, 23],
					lineStyle: {
						normal: {
							width: 8,
							color: {
								type: 'linear',

								colorStops: [{
									offset: 0,
									color: '#A9F387' // 0% 处的颜色
								}, {
									offset: 1,
									color: '#48D8BF' // 100% 处的颜色
								}],
								globalCoord: false // 缺省为 false
							},
							shadowColor: 'rgba(72,216,191, 0.3)',
							shadowBlur: 10,
							shadowOffsetY: 20
						}
					},
					itemStyle: {
						normal: {
							color: '#fff',
							borderWidth: 10,
							/* shadowColor: 'rgba(72,216,191, 0.3)',
							shadowBlur: 100, */
							borderColor: '#A9F387'
						}
					},
					smooth: true
				}]
			}

			// 绘制图表
			this.savingsEcharts.setOption(option)
		},
		initBalance () {
			this.balanceEcharts = echarts.init(this.$refs.balance)

			let option = {
				title: {
					text: '$5,349',
					textStyle: {
						color: '#01c4a3',
						fontSize: 30
					},
					subtext: 'Balance',
					subtextStyle: {
						color: '#909090',
						fontSize: 15
					},
					itemGap: 0, // 主副标题距离
					left: 'center',
					top: 'center'
				},
				angleAxis: {
					max: 100, // 满分
					clockwise: false, // 逆时针
					// 隐藏刻度线
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						show: false
					},
					splitLine: {
						show: false
					}
				},
				radiusAxis: {
					type: 'category',
					// 隐藏刻度线
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						show: false
					},
					splitLine: {
						show: false
					}
				},
				polar: {
					center: ['50%', '50%'],
					radius: '120%' // 图形大小
				},
				series: [
					{
						type: 'bar',
						data: [
							{
								name: '作文得分',
								value: 25,
								itemStyle: {
									normal: {
										color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
											offset: 0,
											color: '#f36a6a'
										}, {
											offset: 1,
											color: '#ff0000'
										}])
									}
								},
							}
						],
						coordinateSystem: 'polar',
						roundCap: true,
						barWidth: 20,
						barGap: '-100%', // 两环重叠
						z: 4,
					},
					{
						type: 'bar',
						data: [
							{
								name: '作文得分',
								value: 45,
								itemStyle: {
									normal: {
										color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
											offset: 0,
											color: '#000000'
										}, {
											offset: 1,
											color: '#0acfa1'
										}])
									}
								},
							}
						],
						coordinateSystem: 'polar',
						roundCap: true,
						barWidth: 20,
						barGap: '-100%', // 两环重叠
						z: 3,
					},
					{
						type: 'bar',
						data: [
							{
								name: '作文得分',
								value: 75,
								itemStyle: {
									normal: {
										color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
											offset: 0,
											color: '#aaf14f'
										}, {
											offset: 1,
											color: '#0acfa1'
										}])
									}
								},
							}
						],
						coordinateSystem: 'polar',
						roundCap: true,
						barWidth: 20,
						barGap: '-100%', // 两环重叠
						z: 2,
					},
					{ // 灰色环
						type: 'bar',
						data: [{
							value: 100,
							itemStyle: {
								color: '#e2e2e2',
								shadowColor: 'rgba(0, 0, 0, 0.2)',
								shadowBlur: 5,
								shadowOffsetY: 2
							}
						}],
						coordinateSystem: 'polar',
						roundCap: true,
						barWidth: 20,
						barGap: '-100%', // 两环重叠
						z: 1
					}
				]
			}

			// 绘制图表
			this.balanceEcharts.setOption(option)
		},
		resize () {
			const that = this
			window.addEventListener('resize', function () {
				setTimeout(() => {
					that.savingsEcharts.resize()
					that.balanceEcharts.resize()
				})
			})
		},
		clickNav (current) {
			this.navList.forEach((item, index) => {
				if (current.id === item.id) {
					item.status = true
				} else {
					item.status = false
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
$color-red: #ff565f;
$color-blue: #1289a1;
$color-main: #3c4049;
$color-secondary: #b9b9b9;

.bgc-blue {
	background-color: $color-blue;
}

.bgc-red {
	background-color: $color-red;
}

.color-blue {
	color: $color-blue;
}

.money {
	color: $color-main;
	font-weight: bold;
}

.demo {
	background-color: #fff;

	>>> .layout-right {
		top: 0;
		bottom: 0;
		width: 20%;
		min-width: 296px;
		max-width: 350px;
		background-color: #fff;
		border-top-left-radius: 50px;
		border-bottom-left-radius: 50px;
		box-shadow: 0px 0px 16px 0px #0000009c;

		.personal {
			padding: 20px 20px 0 20px;

			.personal-top {
				line-height: 50px;

				.my-icon-xiaoxi {
					font-size: 22px;
					position: relative;

					&::after {
						content: "";
						top: 14px;
						width: 8px;
						right: 2px;
						height: 8px;
						display: block;
						border-radius: 50%;
						position: absolute;
						background-color: red;
					}
				}

				.user {
					.user-name {
						margin-right: 10px;
						font-weight: bold;
						color: $color-main;
					}

					.user-head-portrait {
						width: 50px;
						height: 50px;
						border-radius: 50%;
						overflow: hidden;

						img {
							width: 100%;
						}
					}
				}
			}

			.balance {
				width: 100%;
				height: 40vh;
				margin: 20px auto;
			}

			.transitions-title {
				font-size: 16px;
				margin-bottom: 20px;
				color: $color-secondary;

				i {
					font-size: 16px;
				}

				.my-select {
					width: 60%;
				}
			}

			.transactions {
				.t-item {
					padding: 0 10px;
					margin-bottom: 20px;

					i {
						color: red;
						padding: 5px;
						font-size: 26px;
						border-radius: 5px;
						vertical-align: middle;
						background-color: #fff;
					}

					.ti-title {
						margin-left: 24px;
						font-weight: bold;
						color: #5a5e6a;
					}
				}
			}

			.btn {
				width: 90%;
				height: 40px;
				color: #fff;
				margin: 40px auto 0;
				display: block;
				padding: 0 20px;
				line-height: 40px;
				border-radius: 26px;
				background-color: $color-red;
				box-shadow: 0 0 4px -2px black;
			}

			.news {
				width: 40px;
				height: 40px;
				bottom: 40px;
				right: 20px;
				color: #fff;
				cursor: pointer;
				line-height: 40px;
				text-align: center;
				border-radius: 50%;
				position: absolute;
				box-shadow: 0 0 4px -2px black;
				background-color: rgb(15, 143, 162);

				i {
					font-size: 16px;
				}
			}
		}
	}

	>>> .layout-left  {
		margin-right: 25%;
		background-color: #fff;

		.demo-content {
			padding: 40px 40px 0 40px;

			.public-title {
				margin-bottom: 30px;

				span:nth-child(1) {
					font-size: 20px;
					color: $color-main;
				}

				span:nth-child(2) {
					font-size: 14px;
					color: $color-secondary;
				}
			}

			.top {
				.logo {
					zoom: 0.5;
					margin-top: -86px;
					margin-left: -61px;
				}
				.nav {
					li {
						float: left;
						height: 42px;
						color: $color-secondary;
						cursor: pointer;
						font-weight: bold;
						line-height: 42px;
						margin-right: 40px;

						&.active {
							color: $color-main;
						}
					}
				}

				.search {
					width: 260px;
					border-radius: 15px;

					input {
						border-radius: 30px;
					}
				}
			}

			.cards {
				.cards-item {
					width: 330px;
					height: 154px;
					padding: 20px;
					float: left;
					border-radius: 20px;
					margin: 0 20px 20px 0;

					li {
						height: 27px;
						line-height: 27px;
					}

					li:nth-child(even) {
						color: #fff;
					}

					li:nth-child(1) {
						font-size: 12px;
					}

					li:nth-child(3) {
						margin: 20px 0;
					}

					li:nth-child(4) {
						font-size: 16px;
					}
				}

				.add-card {
					width: 330px;
					height: 154px;
					padding: 20px;
					float: left;
					text-align: center;
					position: relative;
					border-radius: 20px;
					background-color: #f8f8f8;

					.ac-content {
						top: 50%;
						left: 50%;
						cursor: pointer;
						color: #aaaaaa;
						position: absolute;
						transform: translate(-50%, -50%);

						.add-icon {
							width: 40px;
							height: 40px;
							margin: 0 auto;
							line-height: 40px;
							border-radius: 50%;
							border: 1px dashed #ddd;

							i {
								font-size: 16px;
							}
						}
					}
				}
			}

			.dc-content {
				display: flex;

				.services {
					width: 23%;
					max-width: 260px;
					min-width: 200px;
					margin-right: 3%;

					.services-item {
						width: 35%;
						height: 35%;
						max-width: 100px;
						max-height: 100px;
						padding: 10px;
						margin-bottom: 20px;
						text-align: center;
						border-radius: 20px;
						background-color: #fff;
						box-shadow: 0px 0px 20px -7px #9c9c9c;

						&:nth-child(odd) {
							margin-right: 20px;
							float: left;
						}

						&:nth-child(even) {
							float: right;
						}

						i {
							font-size: 60px;
							color: $color-red;
						}

						span {
							color: $color-main;
						}
					}
				}

				.dcc-right {
					float: right;
					width: 77%;
					min-width: 400px;

					.line {
						margin: 0 110px 0 170px;
					}

					.current {
						margin-bottom: 20px;

						.current-item {
							font-size: 17px;
							overflow: hidden;
							margin-top: 20px;

							span:nth-child(1) {
								color: $color-secondary;
							}

							span:nth-child(2) {
								color: $color-main;
							}

							.line {
								&::before {
									left: 0;
									top: 21px;
									bottom: 0;
									width: 100%;
									height: 0;
									display: block;
									position: absolute;
									background-color: transparent;
									border-bottom: 1px dashed #ff0000;
								}
							}
						}
					}

					.savings-content {
						.savings-echarts {
							min-width: 60%;
							height: 30vh;
						}

						.sc-box {
							width: 37%;
							padding-left: 2%;
							min-width: 192px;
							line-height: 25px;
							box-sizing: border-box;

							span {
								font-size: 17px;

								&:nth-child(1) {
									color: $color-secondary;
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
