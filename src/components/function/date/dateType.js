const now = new Date()
const today = moment(now).format('YYYY-MM-DD')
const weekOfday = moment().format('E') // 计算今天是这周第几天

module.exports = [
	{
		title: '今天',
		date: [today, today]
	},
	{
		title: '近一周',
		date: [moment().subtract(weekOfday - 1, 'days').format('YYYY-MM-DD'), today]
	},
	{
		title: '近一月',
		date: [moment(now).format('YYYY-MM-') + '01', today],
	},
	{
		title: '近一年',
		date: [moment(now).format('YYYY-') + '01-01', today]
	}
]
