const now = new Date()
const today = moment(now).format('YYYY-MM-DD')
const weekOfday = moment().format('E') // 计算今天是这周第几天

module.exports = [
	{
		title: '今天',
		date: [today, today]
	},
	{
		title: '本周',
		date: [moment().subtract(weekOfday - 1, 'days').format('YYYY-MM-DD'), today]
	},
	{
		title: '本月至今',
		date: [moment(now).format('YYYY-MM-') + '01', today],
	},
	{
		title: '近三个月',
		date: [moment(now).subtract(3, 'months').format('YYYY-MM-'), today]
	},
	{
		title: '近六个月',
		date: [moment(now).subtract(6, 'months').format('YYYY-MM-'), today]
	},
	{
		title: '今年至今',
		date: [moment(now).format('YYYY-') + '01-01', today]
	}
]
