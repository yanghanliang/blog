/**
 * 全局过滤器
 * (自动载入)
 */
import Vue from 'vue'

// 引入 moment 格式化时间
import moment from 'moment'

// 调用时间格式化 moment
Vue.filter('formatDate', function (date, formateStr) {
	if (date === null) {
		return '暂无更新~'
	}
	return moment(date).format(formateStr)
})
