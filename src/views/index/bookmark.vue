<template>
    <div class="w bookmark">
		<my-nav :nav-status="true" :firstTrigger="false"></my-nav>
    </div>
</template>

<script>
import myNav from '@/components/webs/public/myNav/index'

export default {
	name: 'bookmark',
	components: {
		myNav
	}
}
</script>

<style lang="scss" scoped>
.bookmark {
	nav {

	}
}
</style>
