<template>
    <ul>
        <li v-for="(item, index) in data" :key="index">
            <div :class="['clearfix', item.router === $route.path ? 'active' : '']">
				<i @click.stop="clickSwitch(item)" :class="item | iconClass" :style="item | style"></i>
				<a @click="jump(item.router)" href="javascript:;">{{ item.name }}</a>
			</div>
            <my-children v-if="item.children && item.status === 'open'" :data="item.children"></my-children>
        </li>
    </ul>
</template>

<script>
export default {
	name: 'myChildren',
	props: {
		data: {
			type: Array
		},
		title: {
			type: String,
			defalute: '标题'
		}
	},
	filters: {
		iconClass(item) {
			let className = [item.status]
			if (item.children && item.children.length > 0) {
				if (item.status === 'open') {
					className.push('my-icon-sanjiaoxia')
				} else {
					className.push('my-icon-sanjiaoyou')
				}
			} else if (item.level > 1) {
				className.push('my-icon-icon-test')
			}

			return className.join(' ')
		},
		style(item) {
			let left = 2 + item.level * 20
			return `margin-left: ${left}px;`
		}
	},
	methods: {
		dataHandle() {
		},
		// 点击开关时执行
		clickSwitch(row) {
			row.status = row.status === 'close' ? 'open' : 'close'
			return false
		},
		// 组件跳转不刷新页面
		jump(router) {
			this.$router.push({
				path: router
			})
		}
	},
}

</script>

<style lang="scss" scoped>
@import '@/assets/css/color/index.scss'; // 使用方法

ul {
	li {
		width: 100%;

		div {
			color: #000;
			min-height: 40px;
			line-height: 40px;

			&:hover {
				background-color: #E5E8EC;
			}

			&.active {
				background-color: #E5E8EC;

				a {
					color: $green;
				}
			}

			i {
				width: 0;
				height: 40px;
				float: left;
				margin-left: 30px;
				margin-right: 10px;

				&.iconzhijiaochi {
					font-size: 12px;
				}
			}

			a {
				float: left;
				color: #000;
				margin-left: 8px;
			}
		}
	}
}
</style>
