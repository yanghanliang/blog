<template>
    <div class="content_left" ref="content_left">
        <div class="cl_box" v-for="data in article" :key="data.id">
            <div class="clb_top clearfix">
                <template v-if="isExistence(data) < 3">
                    <img src="../../../assets/index/index/images/text02.jpg" alt="">
                </template>
                <template v-else-if="isExistence(data) === 4">
                    <div class="clbt_left">
                        <my-echarts class="pd0 pie" :txt="xAxisData" :title="data.title" :data="data | seriesData" type="pie" :seriesCenter="['50%', '70%']"></my-echarts>
                    </div>
                </template>
                <template v-else>
                    <div class="clbt_left">
                        <my-echarts class="bar" :txt="xAxisData" :title="data.title" :data="data | seriesData"></my-echarts>
                    </div>
                </template>
                <div class="clbt_right">
                    <h2>{{ data.title }}</h2>
                    <p>
                        {{ data.synopsis }}
                    </p>
                </div>
            </div>
            <div class="clb_bottom clearfix">
                <div class="clbb_left">
                    <my-icon class="fs17" identification="icon"></my-icon>
                    <span>{{ data.classname }}</span>
                    <my-icon class="shengri-copy" identification="shengri-copy"></my-icon>
                    <span>{{ data.createtime | formatDate('YYYY-MM-DD')}}</span>
                    <my-icon class="liulan fs17" identification="liulan"></my-icon>
                    <a>浏览({{ data.read }})</a>
                </div>
                <span @click="clickRead(data.id)">阅读全文</span>
            </div>
        </div>
        <div v-if="pageData.tips !== ''" class="tips">{{ pageData.tips }}</div>
        <div v-else class="loading"></div>
    </div>
</template>

<script>
export default {
	name: 'articleList',
}
</script>

<style lang="">

</style>
