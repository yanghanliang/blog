<template>
    <component :is="layoutType"></component>
</template>

<script>
import leftAuto from '@/components/webs/public/layout/content/main/leftAuto'
import rightAuto from '@/components/webs/public/layout/content/main/rightAuto'

export default {
	name: 'layoutContent',
	props: {
		layoutType: {
			type: String,
			default: 'leftAuto'
		}
	},
	components: {
		leftAuto,
		rightAuto
	}
}
</script>

<style lang="">

</style>
