<template>
    <div class="index">
        <header>
            <h1>后台首页</h1>
        </header>
        <div class="content">
            <div class="content_left">
                <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                    <el-radio-button :label="false">展开</el-radio-button>
                    <el-radio-button :label="true">收起</el-radio-button>
                </el-radio-group>
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse" :router="true">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="icon" style="color: #2456bb;">&#xe63a;</i>
                            <span slot="title">文章</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/admin/addArticle">添加文章</el-menu-item>
                            <el-menu-item index="/admin/articleList">文章列表</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="HTML">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <span slot="title">CSS</span>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-shuangsechangyongtubiao-"></use>
                            </svg>
                            <span slot="title">分类</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/admin/addCategory">添加分类</el-menu-item>
                            <el-menu-item index="/admin/categoryList">分类列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu> -->
                <my-nav></my-nav>
            </div>
            <right-content></right-content>
        </div>
    </div>
</template>

<script>
// 导航
import myNav from '@/components/webs/public/myNav/index'
// 引入右边内容区域
import RightContent from '@/components/webs/admin/RightContent'

export default {
	name: 'admin',
	components: {
		myNav,
		RightContent
	},
	data() {
		return {
			isCollapse: true
		}
	},
	beforeCreate() {
		const token = localStorage.getItem('token')
		if (!token) {
			// 弹出提示
			this.$message({
				type: 'error',
				message: '您还没有登录, 请先登录!',
				center: true
			})

			// 跳转到登录页面
			this.$router.push({
				name: 'login'
			})
		}
	}
}

</script>

<style scoped>
    .index {
        height: 100%;
        position: relative;
    }

    header>h1 {
        margin: 0;
    }

    .content {
        height: calc(100% - 50px);
    }

    .content_left {
        float: left;
        height: 100%;
        background-color: #fff;
    }

    .content::before {
        content: '';
        float: left;
        /* min-width: 139px; */
        min-height: 100%x;
    }

    .content_left li a {
        width: 100%;
        height: 30px;
        display: block;
        color: #ffffff;
        line-height: 30px;
        background-color: #666;
    }

    .content_left li a:hover {
        background-color: blue;
    }

    .content_left .hover a {
        background-color: blue;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    .el-submenu__title .icon {
        font-size: 0.3rem;
    }

</style>
