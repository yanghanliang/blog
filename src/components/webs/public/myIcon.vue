<template>
    <svg class="icon" aria-hidden="true">
        <use :xlink:href="'#icon-'+identification"></use>
    </svg>
</template>

<script>
export default {
  name: 'MyIcon',
  props: ['identification']
}
</script>

<style>
</style>
