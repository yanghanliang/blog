<template>
	<component :is="currentComponent"></component>
</template>

<script>
import myBar from '@/components/function/myEcharts/main/bar'

export default {
	components: {
		myBar
	},
	data() {
		return {
			currentComponent: myBar
		}
	},
	created() {
		console.log(123)
	},
}
</script>

<style lang="">

</style>
