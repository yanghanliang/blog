<template>
    <div class="shuai">
        <div class="box" v-for="(item, index) in modelData" :key="index">
            <input type="text" value="ab" disabled>
            <div class="icon_box" @click="edit($event)">
                <!-- <i class="el-icon-edit"></i> -->
            </div>
        </div>
        <div class="box">
            <input type="text" value="" disabled>
            <div class="icon_box">
                <i class="el-icon-edit" @click="edit($event)"></i>
                <i class="el-icon-success" @click="success($event)"></i>
                <i class="el-icon-error"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	data () {
		return {
			show: 0,
			modelData: [], // 模板数据
			currentData: [] // 当前数据
		}
	},
	methods: {
		// 点击修改时执行
		edit (e) {
			// 显示按钮
			// this.show = 1
			// 获取元素
			let ele = e.currentTarget
			let input = ele.parentElement.previousElementSibling
			let success = ele.nextElementSibling
			let error = success.nextElementSibling
			ele.style.display = 'none'
			success.style.display = 'inline-block'
			error.style.display = 'inline-block'
			// 删除禁用
			input.removeAttribute('disabled')
			// 获取焦点
			input.focus()
			// 获取内容长度
			var len = input.value.length
			// 将光标移动到最后
			input.selectionStart = len
		},
		// 点击保存时执行
		success (e) {
			// 获取元素
			let ele = e.currentTarget
			let input = ele.parentElement.previousElementSibling
			let edit = ele.previousElementSibling
			let error = ele.nextElementSibling
			// 将值保存起来
			this.modelData.push(input.value)
			// 初始化新增按钮
			input.value = ''
			edit.style.display = 'inline-block'
			error.style.display = 'none'
			ele.style.display = 'none'
		}
	}
}
</script>

<style scoped>
.shuai {
    padding: 100px 0 0 400px;
}

.box {
    width: 100px;
    height: 35px;
    line-height: 35ox;
    position: relative;
    padding-right: 57px;
    padding-left: 10px;
    background-color: #fff;
}

.box>input {
    width: 100%;
    height: 100%;
    text-align: center;
    border-radius: 5px;
    background-color: transparent;
}

.box>.icon_box {
    top: 50%;
    right: 10px;
    z-index: 2;
    cursor: pointer;
    position: absolute;
    transform: translateY(-50%);
}

.box >>> .icon_box i {
    margin-left: 5px;
}

.box >>> .icon_box .el-icon-success,.box >>> .icon_box .el-icon-error {
    display: none;
}

</style>
