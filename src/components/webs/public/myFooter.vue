<template>
    <footer>
        <span>
            <logo class="logo" />
            邮箱： localhost_liang@163.com
        </span>
    </footer>
</template>

<script>
import logo from '@/components/canvas/logo/index'

export default {
    name: 'myFooter',
    components: {
        logo
    }
}

</script>

<style lang="scss">
@import '@/assets/css/color/index.scss'; // 使用方法

footer {
    width: 100%;
    height: 50px;
    font-size: 14px;
    line-height: 50px;
    text-align: center;
    background-color: rgb(84, 92, 100);

    span {
        color: $border-hover;
        position: relative;
        
        canvas.logo {
            top: -95px;
            left: -124px;
            position: absolute;
            transform: scale(.3);
        }
    }
}
</style>
