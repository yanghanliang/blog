<template>
    <div class="category">
        <div class="s_title">
            <span>分类</span>
            <div class="st_line"></div>
        </div>
        <div class="s_box clearfix">
            <span @click="getData(value.classname)" v-for="value in categoryData" :key="value.id">{{ value.classname }}</span>
        </div>
    </div>
</template>

<script>
export default {
	name: 'category',
	props: {
		categoryId: {
			default: null
		}
	},
	data() {
		return {
			categoryData: [],
			articleId: this.$route.params.articleId
		}
	},
	created() {
		this.getCategoryData() // 获取分类数据
	},
	methods: {
		async getCategoryData() { // 获取分类数据
			const {
				data
			} = await this.$http.get('category?type=1') // 发送请求

			if (this.categoryId) {
				this.categoryData = data.filter(item => {
					if (item.id === this.categoryId || item.pid === this.articleId) {
						return item
					}
				})
			} else {
				this.categoryData = data // 将获取到的数据绑定到 vue 中
			}
		},
		getData(content) {
			if (this.$route.name === 'common') {
				this.getArticleCategoryData(content)
			}
		},
		async getArticleCategoryData(content) {
			const {
				data
			} = await this.$http.get(`articleCategory/${content}`)
			if (data.getData.status === 200) {
				// 把点击的值传给父组件
				let params = Object.assign({ className: content }, data)
				this.$emit('getData', params)
			} else {
				this.$message({
					message: '此为测试模块，暂无数据!',
					type: 'warrning'
				})
			}
		}
	}
}

</script>

<style scoped>
    /* category-start */
    .category {
        margin-top: 0.1rem;
    }

    .category .s_title {
        height: 0.4rem;
        line-height: 0.4rem;
        position: relative;
        background-color: #ffffff;
    }

    .category .s_title span {
        font-size: 17px;
        text-align: left;
        display: inherit;
        font-weight: bold;
        text-indent: 0.2rem;
    }

    .category .s_title .st_line {
        width: 0%;
        height: 0.02rem;
        bottom: 0;
        position: absolute;
        transition: all 1s linear;
    }

    .category:hover .st_line {
        width: 100%;
        /* Safari 5.1 - 6.0 */
        background: -webkit-repeating-linear-gradient(left top, #00cdfb, #c1e2dc, #f500cc, #fe4365);
        /* Opera 11.1 - 12.0 */
        background: -o-repeating-linear-gradient(left top, #00cdfb, #c1e2dc, #f500cc, #fe4365);
        /* Firefox 3.6 - 15 */
        background: -moz-repeating-linear-gradient(left top, #00cdfb, #c1e2dc, #f500cc, #fe4365);
        /* 标准的语法 */
        background: repeating-linear-gradient(left top, #00cdfb, #c1e2dc, #f500cc, #fe4365);
        /* #00cdfb, #c1e2dc, #f500cc, #fe4365 */
        /* red, orange, indigo, violet */
    }

    /* s_box-start */
    .category .s_box {
        min-height: 3.09rem;
        margin-top: 0.02rem;
        background-color: #fff;
        padding: 0.08rem 0.2rem 0.2rem;
    }

    .category .s_box span {
        float: left;
        height: 0.24rem;
        color: #fff;
        cursor: pointer;
        line-height: 0.24rem;
        border-radius: 0.08rem;
        padding: 0.03rem 0.1rem;
        margin: 0.1rem 0.1rem 0 0;
    }

    .category .s_box span:nth-child(9n-1) {
        background-color: #3299BB;
    }

    .category .s_box span:nth-child(9n-2) {
        background-color: #036564;
    }

    .category .s_box span:nth-child(9n-3) {
        background-color: #EB6841;
    }

    .category .s_box span:nth-child(9n-4) {
        background-color: #FE4365;
    }

    .category .s_box span:nth-child(9n-5) {
        background-color: #FC9D9A;
    }

    .category .s_box span:nth-child(9n-6) {
        background-color: #EDC951;
    }

    .category .s_box span:nth-child(9n-7) {
        background-color: #C8C8A9;
    }

    .category .s_box span:nth-child(9n-8) {
        background-color: #83AF9B;
    }

    .category .s_box span:nth-child(9n-9) {
        background-color: #5edc5a;
    }

    /* s_box-end */
    /* category-end */

</style>
