<template>
    <div class="clearfix">
        <div class="f_left">
            <div class="catalog" v-for="(item, index) in catalogData" :key="index" v-if="item.length > 1">
                <h2>{{ index | date }}</h2>
                <div class="list_box" v-for="(data, number) in item" :key="data.id">
                    <div class="left_radius">
                        <div class="lr_radius"></div>
                        <div class="lr_rectangle">{{ number | serialNumber }}</div>
                        <ul class="lb_content">
                            <li>
                                <router-link :to="'/articleDetails/'+ data.id">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-icon"></use>
                                    </svg>
                                    {{ data.title }}
                                </router-link>
                            </li>
                            <li>
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-shengri-copy"></use>
                                </svg>
                                {{ data.createtime | formatDate('MM-DD-HH') }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="effect clearfix">
            <div class="e_line"></div>
            <div class="e_line"></div>
            <div class="e_line"></div>
            <div class="e_line"></div>
            <div class="e_line"></div>
            <div class="e_line"></div>
            <div class="e_line"></div>
            <div class="e_line"></div>
        </div>
    </div>
</template>

<script>
import myHeader from '@/components/webs/public/myHeader'
import myFooter from '@/components/webs/public/myFooter'

export default {
	name: 'catalogList',
	components: {
		myHeader,
		myFooter
	},
	data() {
		return {
			catalogData: {
				'a': [], // 2019
				'b': [], // 2018
				'c': [], // 2017
				'd': [] // 2016
			}
		}
	},
	created() {
		this.loadData()
	},
	methods: {
		async loadData() {
			const {
				data
			} = await this.$http.get('catalog')
			if (data.status === 200) {
				let tempData = data.data
				for (let i = 0; i < tempData.length; i++) {
					let createtime = tempData[i].createtime
					if (createtime > 1451577600000 && createtime < 1483200000000) { // 2016
						this.catalogData['d'].push(tempData[i])
					} else if (createtime > 1483200000000 && createtime < 1514736000000) { // 2017
						this.catalogData['c'].push(tempData[i])
					} else if (createtime > 1514736000000 && createtime < 1546272000000) { // 2018
						this.catalogData['b'].push(tempData[i])
					} else if (createtime > 1546272000000 && createtime < 1577808000000) { // 2019
						this.catalogData['a'].push(tempData[i])
					}
				}
			} else {
				this.$message({
					message: data.msg
				})
			}
		}
	},
	filters: {
		date: function (value) { // 字母转换为对应的年份
			if (value === 'a') {
				return '2019'
			} else if (value === 'b') {
				return '2018'
			} else if (value === 'c') {
				return '2017'
			} else if (value === 'd') {
				return '2016'
			}
		},
		serialNumber: function (value) { // 序号转化
			value++
			if (value < 10) {
				return '0' + value
			} else {
				return value
			}
		}
	}
}

</script>

<style scoped>
    .f_left {
        float: left;
    }

    .catalog {
        width: 700px;
        overflow: hidden;
    }

    .catalog>h2 {
        text-shadow: -20px 0px 20px #ffecec, 2px 0px 0px #828282;
        ;
    }

    .catalog>h2::before {
        content: "";
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin: auto 15px 2px 70px;
        background-color: #42d0d0;
    }

    .list_box {
        margin: 70px 0 70px 200px;
    }

    .list_box .left_radius {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        position: relative;
        box-shadow: -5px 4px 10px 0px black;
    }

    .list_box:nth-child(9n-1) .left_radius {
        background-color: #3299BB;
    }

    .list_box:nth-child(9n-2) .left_radius {
        background-color: #036564;
    }

    .list_box:nth-child(9n-3) .left_radius {
        background-color: #EB6841;
    }

    .list_box:nth-child(9n-4) .left_radius {
        background-color: #FE4365;
    }

    .list_box:nth-child(9n-5) .left_radius {
        background-color: #FC9D9A;
    }

    .list_box:nth-child(9n-6) .left_radius {
        background-color: #EDC951;
    }

    .list_box:nth-child(9n-7) .left_radius {
        background-color: #C8C8A9;
    }

    .list_box:nth-child(9n-8) .left_radius {
        background-color: #83AF9B;
    }

    .list_box:nth-child(9n-9) .left_radius {
        background-color: aqua;
    }

    .left_radius .lr_radius {
        width: 60px;
        height: 60px;
        top: 50%;
        left: 50%;
        z-index: 2;
        border-radius: 50%;
        position: absolute;
        /* background-color: #fff; */
        transform: translate(-50%, -50%);
        box-shadow: inset 3px 12px 12px 0px black;
    }

    .left_radius .lr_rectangle {
        top: 50%;
        right: 7px;
        width: 50px;
        height: 45px;
        font-size: 40px;
        line-height: 45px;
        text-indent: 1px;
        position: absolute;
        background-color: #fff;
        transform: translateY(-50%);
        box-shadow: 0px 15px 10px -15px #ccc;
        /* box-shadow: inset 2px -13px 21px -13px #000; */
    }

    .left_radius .lb_content {
        top: 50%;
        left: 113px;
        min-width: 200px;
        height: 45px;
        padding-left: 30px;
        line-height: 45px;
        position: absolute;
        background-color: #fff;
        transform: translateY(-50%);
    }

    .left_radius .lb_content>li:nth-child(1) {
        font-size: 15px;
    }

    .left_radius .lb_content>li {
        height: 50%;
        line-height: 22px;
        font-weight: bold;
        text-shadow: -1px -1px white, 1px 1px #333;
    }

    .effect {
        float: right;
    }

    .effect>div {
        float: left;
        width: 5px;
        height: 80px;
        margin-left: 10px;
        background-color: #42d0d0;
    }

</style>
