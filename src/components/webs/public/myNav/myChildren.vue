<template>
    <ul>
        <li v-for="(item, index) in data" :key="index">
            <div @click.stop="clickSwitch(item)" :class="['clearfix', $route.fullPath.includes(item.router) ? 'active' : '']">
				<!-- {{ item }} -->
				<!-- 是否可以编辑 -->
				<a @click="jump(item.router)" href="javascript:;">
					<i v-if="item.children" :class="item | iconClass"></i>
					<span :class="{ 'ml32': !item.children }" :style="item | style">{{ item.name }}</span>
				</a>
				<!-- <my-tag :tagData="item" field="name" class="fr" :simple="true"></my-tag> -->
			</div>
            <my-children v-if="item.children && item.status === 'open'" :data="item.children"></my-children>
        </li>
    </ul>
</template>

<script>
import myTag from '@/components/webs/public/myTag/index'

export default {
	name: 'myChildren',
	props: {
		data: {
			type: Array
		},
		title: {
			type: String,
			defalut: '标题'
		},
		// 站内跳转（false）站外跳转（true）
		isBlank: {
			type: Boolean,
			defalut: false
		},
		// 是否可以编辑
		isEdit: {
			type: Boolean,
			default: false
		}
	},
	components: {
		myTag
	},
	filters: {
		iconClass (item) {
			let className = [item.status]
			let icon = item.icon ? item.icon : 'my-icon-icon-test'
			if (item.children && item.children.length > 0) {
				if (item.status === 'open') {
					className.push('my-icon-sanjiaoxia')
				} else {
					className.push('my-icon-sanjiaoyou')
				}
			} else if (item.level > 1) {
				className.push(icon)
			}

			return className.join(' ')
		},
		style (item) {
			let left = 2 + item.level * 20
			return `margin-left: ${left}px;`
		},
		active (router, $route) {
			let active = $route.includes(router)
			return active
		}
	},
	methods: {
		dataHandle () {
		},
		// 点击开关时执行
		clickSwitch (row) {
			row.status = row.status === 'close' ? 'open' : 'close'
			return false
		},
		// 组件跳转不刷新页面
		jump (router) {
			if (this.isBlank) {
				// 站外跳转
				window.open(router, '_blank')
			} else {
				// 防止自己跳自己
				if (this.$route.path !== router) {
					// 站内跳转
					this.$router.push({
						path: router
					})
				}
			}
		}
	},
}

</script>

<style lang="scss" scoped>
.ml32 {
	margin-left: 32px;
}

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

			&.active:not(.simple) {
				background-color: #E5E8EC;

				a {
					color: $green;
				}
			}

			i {
				width: 0;
				height: 40px;
				float: left;

				&.iconzhijiaochi {
					font-size: 12px;
				}
			}

			a {
				width: 100%;
				float: left;
				color: #000;
				padding-left: 20px;
				box-sizing: border-box;
			}
		}
	}
}
</style>
