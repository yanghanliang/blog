<template>
    <div class="left_content">
        左边内容
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'LeftContent'
}
</script>

<style>
    .left_content {
        width: 840px;
        min-height: 800px;
        float: left;
        background-color: pink;
    }
</style>
