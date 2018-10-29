# blog

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

***

## 开发笔记

> main.js 是入口文件, 可在它里面调用自己的"样式"

> 设计用户表
```sql
create table if not exists user(
	id int not null auto_increment primary key,
	username varchar(25) not null,
	password varchar(32) not null,
	name varchar(25) not null,
	tel char(11)
)engine=innodb;


INSERT INTO `user` (`username`, `password`, `name`, `tel`) VALUES
('admin', '123456', '王麻子', '13671181498')

```

## vue 中事件修饰符的使用
+ <el-input v-model="form.password" @keyup.enter.native="login"></el-input>
	+ @keyup.enter 是vue 封装的事件,添加 .native 可以将它转化为 DOM 原生的事件
