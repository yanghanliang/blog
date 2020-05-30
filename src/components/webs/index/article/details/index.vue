<template>
    <div class="article-details">
        <div class="w">
            <div class="search">
                <!-- <form name="form1" method="post" action="?c=Index&a=search" target="_blank">
                <input class="sear_input" name="textword" autofocus="autofocus" type="text" placeholder="搜索从这里开始...">
                <button type="submit" class="iconfont icon-sousuo"></button>
            </form> -->
                <!-- <el-form ref="form" label-width="80px">
                    <el-input placeholder="请输入内容" clearable></el-input>
                    <el-button icon="el-icon-search" circle></el-button>
                </el-form> -->
            </div>

            <!-- 调用自己封装的面包屑组件 -->
            <my-crumbs model="simple" />

            <div class="content clearfix scrollbar">
                <div class="left" ref="articleContent">
                    <div class="title">
                        <i v-if="articleData.original === 0" class="icon red" title="原创" red>&#xe612;</i>
                        <h1>{{ articleData.title }}</h1>
                    </div>
                    <ul class="describe clearfix">
                        <li>分类： {{ articleData.classname }}</li>
                        <li>创建时间： {{ articleData.createtime | formatDate('YYYY-MM-DD') }}</li>
                        <li>更新时间： {{ articleData.updatetime | formatDate('YYYY-MM-DD') }}</li>
                        <li>阅读数： {{ articleData.read }}</li>
                        <li>点赞数： {{ articleData.praise }}</li>
                    </ul>
                    <mavon-editor v-model="articleData.content" :subfield="false" defaultOpen="preview"
                        :toolbarsFlag="false" :boxShadow="false" />
                    <div class="subscript">
                        -------------------- 本文结束 <my-icon class="fs40" identification="niu"></my-icon> 感谢阅读 --------------------
                    </div>
                    <!-- <div class="line"></div> -->
                    <div class="page clearfix">
                        <div v-if="preArticle.status === 200" @click="clickDuring(preArticle.data.id)" class="page_pre">
                            <i class="icon">&#xe639;</i>{{ preArticle.data.title }}</div>
                        <div v-if="nextArticle.status === 200" @click="clickDuring(nextArticle.data.id)"
                            class="page_next">{{ nextArticle.data.title }}<i class="icon">&#xe638;</i></div>
                    </div>
					<template v-if="Global.equipment === 'pc'">
						<div class="line mt20 mb20"></div>
						<div class="comment">
							<my-icon color class="fs40" identification="pinglun1"></my-icon>
						</div>
						<!-- 发布评论-start -->
						<el-form :model="commentForm" status-icon :rules="rules" ref="commentForm" label-width="100px" class="demo-ruleForm">
							<template v-if="!userInfo">
								<el-form-item label="昵称" prop="alias">
									<el-input v-model="commentForm.alias" @input="aliasLock=true"></el-input>
								</el-form-item>
								<el-form-item label="邮箱" prop="mailbox">
									<el-input v-model="commentForm.mailbox" placeholder="请输入邮箱"></el-input>
								</el-form-item>
								<el-form-item label="密码" prop="password">
									<el-input type="text" onfocus="this.type = 'password'" v-model="commentForm.password" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item label="确认密码" prop="checkPass">
									<el-input type="text" onfocus="this.type = 'password'" v-model="commentForm.checkPass" autocomplete="off"></el-input>
								</el-form-item>
							</template>
							<el-form-item label="评论" prop="comment_content">
								<el-input type="textarea" placeholder="畅所欲言~" v-model="commentForm.comment_content">
								</el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="submitForm('commentForm', '/addComment', commentForm)">走你~
								</el-button>
								<el-button @click="resetForm('commentForm')">重置</el-button>
							</el-form-item>
						</el-form>
						<template v-if="commentData.length > 0">
							<!-- 显示评论-start -->
							<div class="show_comment" v-for="(data, parentIndex) in commentData" :key="parentIndex">
								<div :class="index%2 === 1 ? 'sc_box right' : 'sc_box'" v-for="(item, index) in data"
									:key="index">
									<div class="scb_header clearfix">
										<div class="scbh_img_box" @click="editHeadPortrait(item)">
											<img :src="Global.baseURL+ item.head_portrait_url" alt="头像">
										</div>
										<div class="scbh_arrow"></div>
										<span>{{ item.alias }}</span>
									</div>
									<div class="scb_body">
										<my-icon identification="caozuoqipao" color class="icon"></my-icon>
										<p>{{ item.comment_content }}</p>
									</div>
									<div class="scb_footer clearfix">
										<div class="commentary_time">
											<my-icon identification="shijian1"></my-icon> {{ item.time }}
										</div>
										<el-button class="replay" type="text"
											@click="replay(item.alias, item.id, parentIndex, index)">
											<my-icon identification="chakantiezihuifu"></my-icon>
										</el-button>
									</div>
								</div>
							</div>
							<!-- 显示评论-end -->
						</template>
						<template v-else>
							<ul class="no_data">
								<li>
									<my-icon class="fs40" identification="meiyouxiangguan"></my-icon>
								</li>
								<li>没有数据~</li>
							</ul>
						</template>
						<!-- 发布评论-end -->
					</template>
                </div>
                <div class="right">
                    <!-- Relevant recommendations Abbreviations rr -->
                    <!-- 相关推荐 简写 rr -->
                    <ul class="rr" v-if="recommend.data.length > 0">
                        <h3>您可能需要</h3>
                        <li v-for="(item, index) in recommend.data" :key="item.id">
							<a :href="item.id">{{ (index + 1) + (recommend.currentPage - 1) * recommend.pageSize }}. {{ item.title }}</a>
						</li>
                       <el-pagination class="mt20" small :hide-on-single-page="isPagination"
							:pager-count="5"
							background
							:page-size="recommend.pageSize"
							:current-page.sync="recommend.currentPage"
							layout="prev, pager, next"
							@current-change="getRecommendData"
							:total="recommend.total">
						</el-pagination>
                    </ul>
                    <category :class="{'mt0': recommend.data.length === 0}" key="articles_details" :category-id="articleData.category_id"></category>
					<div class="secondary">
						<el-popover
							placement="top-start"
							width="200"
							trigger="hover"
							content="如果您觉得这篇文章还不错，就点个赞吧~">
							<i slot="reference" :class="['my-icon-dianzan', { 'active': praiseStatus }]" @click="editPraise"></i>
						</el-popover>
					</div>
                </div>
            </div>
        </div>

        <!-- 回复评论的对话框-start -->
        <el-dialog :title="replyAlias" :visible.sync="dialogFormVisible">
            <el-form :model="replyForm" status-icon :rules="rules" ref="replyForm" label-width="100px"
                class="demo-ruleForm">
				<template v-if="!userInfo">
					<el-form-item label="昵称" prop="alias">
						<!-- <el-input v-model="replyForm.alias" v-bind:disabled="Boolean(alias)"></el-input> -->
						<el-input v-model="replyForm.alias" @input="aliasLock=true"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" prop="mailbox">
						<el-input v-model="replyForm.mailbox" placeholder="请输入邮箱"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password" :rules="replyVerification">
						<el-input type="text" onfocus="this.type = 'password'" autocomplete="off" v-model="replyForm.password"
							placeholder="添加密码后，可防止其他人修改您的 头像、 昵称、 邮箱、 评论内容"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="checkPass" :rules="replyVerification2">
						<el-input type="text" onfocus="this.type = 'password'" v-model="replyForm.checkPass" autocomplete="off"></el-input>
					</el-form-item>
				</template>
                <el-form-item label="评论" prop="comment_content">
                    <el-input type="textarea" placeholder="畅所欲言~" v-model="replyForm.comment_content"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                        @click="submitForm('replyForm', '/addReply', replyForm, closeDialogBoxes)">走你~</el-button>
                    <el-button @click="resetForm('replyForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 回复评论的对话框-end -->

        <!-- 修改评论信息的对话框-start -->
        <el-dialog title="修改信息" :visible.sync="dialogFormVisible2">
            <div class="clearfix">
                <div class="edit_head_portrait">
                    <label class="el-form-item__label" style="width: 80px;">上传图片</label>
                    <!--elementui的上传图片的upload组件-->
                    <el-upload class="upload-demo"
						:action="`${Global.baseURL}uploadFile`"
						:before-upload="beforeupload"
						:show-file-list="false"
						:http-request="httpRequest"
						drag
						style="margin-left:80px;"
					>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">文件大小不能超过1MB</div>
                    </el-upload>
                    <el-form :model="user" status-icon :rules="rules" ref="user" label-width="80px"
                        class="demo-ruleForm">
                        <el-form-item label="昵称" prop="alias">
                            <el-input v-model="user.alias" placeholder="请输入您要修改的昵称~" class="password"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="mailbox">
                            <el-input v-model="user.mailbox" placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password" :rules="userVerification">
                            <el-input type="text" onfocus="this.type = 'password'" autocomplete="off" v-model="user.password" placeholder="请输入密码"
                                class="password"></el-input>
                        </el-form-item>
                        <el-form-item label="评论" prop="comment_content">
                            <el-input type="textarea" placeholder="畅所欲言~" v-model="user.comment_content"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">走你~</el-button>
                            <el-button @click="resetForm('user')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>

				<div class="head_portrait_preview">
					<my-progress
						ref="myProgress"
						:showPercentage="false"
						:showSlider="false"
						:progressValue="progressPercent"
						>
						<img slot="content" :src="imgSrc" alt="">
					</my-progress>
				</div>
            </div>
        </el-dialog>
        <!-- 修改评论信息的对话框-end -->
    </div>
</template>

<script>
// 导入 category
import category from '@/components/webs/public/category'
// 滑块(进度条)
import myProgress from '@/components/canvas/progress/index'

export default {
	name: 'articlesDetails',
	components: {
		category,
		myProgress
	},
	computed: {
		imgSrc () {
			return this.Global.baseURL + this.src
		},
		// 是否显示分页
		isPagination () {
			if (this.recommend.total > this.recommend.pageSize) {
				return false
			} else {
				return true
			}
		}
	},
	data () {
		let mailboxValidation = (rule, value, callback) => {
			if (/\S/.test(value) && value !== null) {
				const reg = /[0-9a-zA-Z_.-]+[@]{1}[0-9a-zA-Z_.-]+([.]\bcom\b)$/
				const length = value.trim().length
				if (reg.test(value) && length >= 8 && length <= 30) {
					callback()
				} else {
					callback(new Error('请输入正确的邮箱'))
				}
			}
			callback()
		}
		let aliasValidation = async (rule, value, callback) => { // 验证在此之前是否评论过
			if (!this.aliasLock) return false // 判断是否开启昵称验证
			let v = value.trim()
			if (v.length > 0) {
				const {
					data
				} = await this.$http.get(`aliasValidation/${v}`)
				if (data.status) {
					this.lock = false // 关闭密码验证
					callback()
				} else {
					this.$message({
						duration: 5000,
						message: '此昵称已被使用，如您是此用户并且设置过密码，则需要输入密码进行验证!'
					})
					this.lock = true // 开启密码验证
					this.aliasLock = false // 关闭昵称验证
					this.user.id = data.id
					callback()
				}
			}
		}
		let validatePass = async (rule, value, callback) => { // 发布评论的密码验证
			if (!this.lock) return callback() // 判断是否开启密码验证
			if (!value) return callback(new Error('请输入密码'))
			let postData = {
				id: this.user.id,
				password: value
			}
			const {
				data
			} = await this.$http.post('verifyPassword', postData)
			if (data) {
				// this.commentForm.checkPass = value // 让密码和确认密码同步
				this.aliasLock = false // 关闭昵称验证
				callback()
			} else {
				callback(new Error('密码不正确~'))
			}
		}
		let validatePass2 = (rule, value, callback) => { // 发布评论的确认密码验证
			if (value !== this.commentForm.password) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		}
		let validatePass3 = async (rule, value, callback) => { // 回复评论的密码验证
			if (!this.lock) return false // 判断是否开启密码验证
			let postData = {
				id: this.user.id,
				password: value
			}
			const {
				data
			} = await this.$http.post('verifyPassword', postData)
			if (data) {
				this.replyForm.checkPass = value // 让密码和确认密码同步
				this.aliasLock = false // 关闭昵称验证
				callback()
			} else {
				callback(new Error('密码不正确~'))
			}
		}
		let validatePass4 = async (rule, value, callback) => { // 修改评论的密码验证
			let postData = {
				id: this.user.id,
				password: value
			}
			const {
				data
			} = await this.$http.post('verifyPassword', postData)
			if (data) {
				callback()
			} else {
				callback(new Error('密码不正确~'))
			}
		}
		let validatePass5 = (rule, value, callback) => { // 回复评论的确认密码验证
			if (value !== this.replyForm.password) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		}
		return {
			articleData: {}, // 文章数据
			preArticle: {}, // 上一篇
			nextArticle: {}, // 下一篇
			commentForm: { // 发布评论的数据
				alias: '',
				mailbox: '',
				password: '',
				checkPass: '',
				comment_content: ''
			},
			passwodLock: false, // 决定评论密码的验证是否开启
			aliasLock: true, // 决定评论昵称的验证是否开启
			rules: { // 公共表单验证规则
				alias: [ // 昵称
					{
						required: true,
						message: '请输入活动名称',
						trigger: 'change'
					},
					{
						min: 1,
						max: 20,
						message: '长度在 1 到 20 个字符',
						trigger: 'change'
					},
					{
						validator: aliasValidation,
						trigger: 'change'
					}
				],
				mailbox: [ // 邮箱
					{
						validator: mailboxValidation,
						trigger: 'change'
					}
				],
				comment_content: [ // 评论内容
					{
						required: true,
						pattern: /[0-9a-zA-Z_.-\D]+/,
						message: '说点啥',
						trigger: 'change',
						transform (value) {
							return value.trim()
						}
					}
				],
				password: [ // 发布评论的密码验证
					{
						min: 6,
						max: 32,
						message: '长度在 6 到 32 个字符',
						trigger: 'change'
					},
					{
						validator: validatePass,
						trigger: 'change'
					}
				],
				checkPass: [ // 发布评论的确认密码验证
					{
						validator: validatePass2,
						trigger: 'change'
					}
				]
			},
			replyVerification: [ // 回复评论的密码验证
				{
					min: 6,
					max: 32,
					message: '长度在 6 到 32 个字符',
					trigger: 'change'
				},
				{
					validator: validatePass3,
					trigger: 'change'
				}
			],
			replyVerification2: [ // 回复评论的确认密码验证
				{
					validator: validatePass5,
					trigger: 'change'
				}
			],
			userVerification: [ // 修改评论的密码验证
				{
					validator: validatePass4,
					trigger: 'change'
				}
			],
			commentData: [], // 文章评论数据
			dialogFormVisible: false, // 回复评论的对话框
			dialogFormVisible2: false, // 修改评论的对话框
			replyAlias: '', // 回复人
			replyForm: { // 回复评论的数据
				alias: '',
				mailbox: '',
				password: '',
				checkPass: '',
				comment_id: '',
				comment_content: ''
			},
			src: '', // 修改评论信息对话框中头像的预览
			user: { // 修改评论的数据
				id: '',
				alias: '',
				mailbox: '',
				password: '',
				comment_content: ''
			},
			progressPercent: 0,
			// 登录后的用户信息
			userInfo: null,
			recommend: {
				data: [],
				pageSize: 6,
				currentPage: 1,
				total: 0,
			},
			praiseStatus: false, // 点赞的状态 false 没有点赞
		}
	},
	created () {
		this.loadData() // 获取文章详情数据
		this.getCommentData() // 获取评论数据
		this.getUserInfo() // 获取用户信息
	},
	methods: {
		async loadData () { // 获取文章详情数据
			const {
				data
			} = await this.$http.get(`articleDetails/${this.$route.params.articleId}`)
			this.articleData = data[0] // 将数据赋值给 vue
			// 兼容移动端
			let bodyEle = null
			console.log(this.Global.equipment, 'this.Global.equipment')
			if (this.Global.equipment === 'pc') {
				bodyEle = document.querySelector('html') // 获取 html 元素
			} else {
				bodyEle = document.querySelector('.article-details .left')
			}
			bodyEle.scrollTop = 0 // 置顶
			this.getRecommendData() // 获取推荐数据
			this.during() // 获取上一篇和下一篇的数据
		},
		async during () { // 获取上一篇和下一篇的数据
			const {
				data
			} = await this.$http.get(`during/${this.articleData.createtime}`) // 发送请求
			this.preArticle = data.preArticle // 将值赋值给 vue
			this.nextArticle = data.nextArticle
		},
		async getCommentData () { // 获取评论数据
			try {
				const data = await this.$http.get(`comment/${this.$route.params.articleId}`)
				this.commentData = data
			} catch (e) {
				console.log(e)
			}
		},
		clickDuring (id) { // 点击上上一页或下一页时执行
			this.$router.push({
				path: `/articleDetails/${id}`
			})
		},
		submitForm (formName, uri, fromData, callback) { // 提交评论
			this.$refs[formName].validate(async (valid) => {
				if (valid) { // 数据验证成功
					this[formName].article_id = this.$route.params.articleId
					const {
						data
					} = await this.$http.post(uri, fromData)
					if (data.status === 200) {
						this.$message({
							type: 'success',
							message: data.msg
						})

						callback && callback()
						this.resetForm(formName) // 清空评论内容
						this.getCommentData() // 重新获取数据（不可简化，因为回复需要id
						// this.defaultType()
					}
				} else {
					return false
				}
			})
		},
		resetForm (formName) { // 重置表单
			// 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
			this.$refs[formName].resetFields()
		},
		replay (alias, commentId, parentIndex, index) { // 回复评论
			this.dialogFormVisible = true // 显示对话框
			this.replyAlias = `回复 - ${alias} :` // 标题
			this.replyForm.comment_id = commentId // 评论 id
		},
		closeDialogBoxes () { // 关闭对话框
			this.dialogFormVisible = false
		},
		async editHeadPortrait (data) { // 点击评论头像时触发
			this.dialogFormVisible2 = true
			this.user.id = data.id
			this.user.alias = data.alias
			this.user.mailbox = data.mailbox ? '' : data.mailbox
			this.src = data.head_portrait_url
			this.user.comment_content = data.comment_content
			this.progressPercent = 0
			localStorage.setItem('alias', data.alias) // 记录昵称
		},
		// 阻止upload的自己上传，进行再操作
		beforeupload (file) {
			// // 创建临时的路径来展示图片
			// var windowURL = window.URL || window.webkitURL
			// this.src = windowURL.createObjectURL(file)
			// // 重新写一个表单上传的方法
			// this.param = new FormData()
			// this.param.append('file', file, file.name)
			// return false
			// console.log(file)
		},
		async onSubmit () { // 表单提交的事件
			this.$refs.user.validate(async (valid) => {
				if (valid) { // 数据验证成功
					let postData = {
						id: this.user.id,
						alias: this.user.alias,
						mailbox: this.user.mailbox,
						comment_content: this.user.comment_content,
						name_used_before: localStorage.getItem('alias'), // 获取曾用名
						head_portrait_url: this.src, // 头像
					}
					// 然后通过下面的方式把内容通过axios来传到后台
					// 下面的this.$http 是在主js中通过Vue.prototype.$http = axios 来把axios赋给它;
					const {
						data
					} = await this.$http.post('/modifyCommentInformation', postData)
					this.dialogFormVisible2 = false // 关闭对话框
					if (data.mci.status === 200) {
						this.getCommentData() // 重新获取评论数据
						this.resetForm('user') // 清空修改信息
					} else {
						this.$message.error(data.msg)
					}
				} else {
					return false
				}
			})
		},
		// 覆盖默认的上传行为
		async httpRequest (file) {
			let formdata = new FormData()
			formdata.append('file', file.file)
			this.progressPercent = 0

			try {
				let { data } = await this.$http({
					url: 'uploadFile',
					method: 'post',
					data: formdata, // 必须是 FormData 对象
					headers: {'Content-Type': 'multipart/form-data'},
					onUploadProgress: progressEvent => {
						// progressEvent.loaded:已上传文件大小
						// progressEvent.total:被上传文件的总大小
						this.progressPercent = (progressEvent.loaded / progressEvent.total * 100)
					}
				})

				if (data.status === 200) {
					this.src = data.url
				}
			} catch (e) {
				console.log(e)
				this.$message.error('请求超时~')
			}
		},
		// 获取用户信息
		getUserInfo () {
			const userInfo = JSON.parse(window.localStorage.getItem('user'))
			if (userInfo) {
				this.userInfo = userInfo
				this.commentForm.alias = userInfo.alias
				this.commentForm.mailbox = userInfo.mailbox
				this.commentForm.password = userInfo.password
				this.replyForm.alias = userInfo.alias
				this.replyForm.mailbox = userInfo.mailbox
				this.replyForm.password = userInfo.password
			}
		},
		// 获取推荐的数据
		async getRecommendData () {
			let postData = {
				currentPage: this.recommend.currentPage,
				pageSize: this.recommend.pageSize,
				categoryId: this.articleData.category_id,
				title: this.articleData.title,
				id: this.articleData.id
			}

			try {
				const { list, total } = await this.$http.post('article/recommend', postData)
				this.recommend.data = list
				this.recommend.total = total
			} catch (e) {
				console.log(e)
			}
		},
		// 更新点赞数
		async editPraise () {
			const top = document.documentElement.scrollTop
			let postData = {
				articleId: this.articleData.id,
				praise: this.articleData.praise
			}
			if (!this.praiseStatus) {
				// 点赞
				this.praiseStatus = true
				postData.praise = postData.praise + 1
			} else {
				// 取消点赞
				this.praiseStatus = false
				postData.praise = postData.praise - 1
			}

			try {
				await this.$http.post('article/praise', postData)
				await this.loadData()
				document.documentElement.scrollTop = top // 防止页面置顶
			} catch (e) {
				console.log(e)
			}
		}
	},
	watch: {
		$route () { // 监听路由变化
			this.loadData()
			this.getCommentData() // 重新获取评论数据
		},
		// alias(newData, oldData) { // 减少用户输入昵称,提高用户体验
		// 	this.commentForm.alias = newData
		// 	this.replyForm.alias = newData
		// },
	}
}

</script>

<style lang="scss" scoped>
@import '@/assets/css/color/index.scss'; // 使用方法
@import './index.scss';
@import './media.scss';
</style>
