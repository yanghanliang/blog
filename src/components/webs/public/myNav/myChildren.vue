<template>
    <ul>
        <li v-for="(item, index) in data" :key="index">
            <a @click.stop="clickSwitch(item)" class="clearfix" :href="item.router">
				<i :class="item | iconClass" :style="item | style"></i>
				<span>{{ item.name }}</span>
			</a>
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
			if (item.children) {
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
			console.log(this.data, 'data', row)
			return false
		}
	},
}

</script>

<style lang="scss" scoped>
ul {
	li {
		width: 100%;

		a {
			color: #000;
			min-height: 40px;
			line-height: 40px;

			&:hover {
				background-color: #E5E8EC;
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

			span {
				float: left;
				margin-left: 8px;
			}
		}
	}
}
</style>
