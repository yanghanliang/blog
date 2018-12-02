/*
 Navicat Premium Data Transfer

 Source Server         : 本地mysql
 Source Server Type    : MySQL
 Source Server Version : 50553
 Source Host           : localhost:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 50553
 File Encoding         : 65001

 Date: 28/11/2018 14:20:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) DEFAULT NULL COMMENT '评论的id',
  `type` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类',
  `title` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章标题',
  `synopsis` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章简介',
  `createtime` int(10) NOT NULL COMMENT '创建时间',
  `read` int(11) NOT NULL DEFAULT 0 COMMENT '阅读数',
  `praise` int(11) NOT NULL DEFAULT 0 COMMENT '点赞',
  `original` int(1) NOT NULL DEFAULT 0 COMMENT '原创0,转载1',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章内容',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, NULL, 'CSS3|Html5 ', '陌上花开,可缓缓归易', '用最简单的代码，实现瀑布流布局，没有繁琐的css，没有jq，只需要做到以下就可以实现瀑布流的效果。思路很简单，看成是三列布局，分别用三个ul来调用。帝国cms列表模板，...', 2147483647, 20, 5, 0, '<h1>在 Vue 中借助 `highlight.js` 插件,实现代码高亮 <i class=\"icon\" title=\"原创\">&#xe612;</i></h1>\r\n            <section>\r\n              <h2>添加序列号 （可以不用考虑 vue）</h2>\r\n              <p>去除两边的换行 (为了下面的`html`结构好看-换行书写-于是引出以下问题)</p>\r\n              <pre>\r\n                <code language=\"html\">\r\n<header>\r\n    <h1>Example HTML</h1>\r\n</header>\r\n<main class=\"style\">\r\n    <p>Some text</p>\r\n</main>\r\n                </code>\r\n              </pre>\r\n            </section>\r\n            <section>\r\n              <h2>1、CSS3飘带状3D菜单 菜单带小图标</h2>\r\n              <p>这次我们要来分享一款很特别的CSS3菜单，菜单的外观是飘带状的，并且每一个菜单项有一个精美的小图标，鼠标滑过菜单项时，菜单项就会向上凸起，像是飘带飘动一样，形成非常酷的3D视觉效果。这款CSS3飘带状3D菜单非常适合作一些活动页面的菜单导航。</p>\r\n            </section>\r\n            <section>\r\n              <h2>1、Javascript 代码高亮</h2>\r\n                  <pre>\r\n                    <code>\r\nvar box = document.querySelect(\'.box\')\r\nbox.onclick = function() {\r\n    console.log(\"hh\")\r\n}\r\n                      </code>\r\n                  </pre>\r\n            </section>');
INSERT INTO `article` VALUES (2, NULL, 'JavaScript', '数组的常用方法', '空间看对方律师代理费独立思考方面来看当时没考虑方面舍得浪费马上到了父母了都是父母分开的没考虑模块；的手里的卡是否立刻大师傅撒快递费到付我可佛罗伦萨没', 2147483647, 55, 10, 0, '<section>\n              <h2>1、Javascript 代码高亮</h2>\n                  <pre>\n                    <code>\nvar box = document.querySelect(\'.box\')\nbox.onclick = function() {\n    console.log(\"hh\")\n}\nvar textarea = document.createElement(\'textarea\')\n            textarea.value = that.parentElement.querySelector(\'ol\').innerText\n            document.body.appendChild(textarea) // text 可以保留换行\n            textarea.select() // 选择对象 - 好像只有表单元素才有这个方法, 如: input textarea\n            if(document.execCommand(\"Copy\")) { // 执行浏览器复制命令\n                that.innerText = \'复制成功\'\n                setTimeout(function() {\n                    that.innerText = \'复制\'\n                }, 1000)\n            }\n            textarea.remove() // 删除不必要的 html 结构\n                      </code>\n                  </pre>\n            </section>');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '类型',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '评论的时间',
  `head_portrait` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '头像',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '评论的内容',
  `alias` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'xx' COMMENT '别名',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (1, 'CSS3|Html5 ', '2018-11-10 00:00:00', NULL, 'sdkjfksd卡就收到你发的是会计会计师啥看法但是马拉松的劳动手册；sadly啦什么大事的了马上离开的马路上溜达溜达', 'xx');
INSERT INTO `comment` VALUES (2, 'JavaScript', '2018-11-07 00:00:00', NULL, '阿森纳的看啥没到拉萨的； 啦双开门的雷克沙买了多少了拉开玛莎拉蒂吗使命朵拉送快递拉萨，打算，打算', 'gg');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `name` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `alias` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'yanghanliang' COMMENT '别名',
  `tel` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '电话',
  `background_wall` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '背景墙',
  `head_portrait` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '头像',
  `occupation` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'WEB开发工程师' COMMENT '职业',
  `synopsis` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '简介',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', '1218866243Yh*', '杨汉梁', 'yanghanliang', '147852315**', '../../../assets/images/index/banner.png', '../../../assets/images/index/avatar.jpg', 'WEB开发工程师', '一个喜欢游戏和编程的愣头小青年, 在这里分享一些,个人关于前端的知识感悟,以及一些自己觉得不错的dd');

SET FOREIGN_KEY_CHECKS = 1;
