webpackJsonp([30],{SGde:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=t("woOf"),o=t.n(a),n=t("Xxa5"),i=t.n(n),s=t("exGp"),c=t.n(s),m={name:"addBookmark",data:function(){var e,r=this;return{bookmarkList:[],form:{pid:0,link:"",icon:"",bookmarkName:""},rules:{bookmarkName:[{required:!0,validator:(e=c()(i.a.mark(function e(t,a,o){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=9;break}if(!r.bookmarkId){e.next=3;break}return e.abrupt("return",o());case 3:return e.next=5,r.$http.get("bookmark/query?bookmarkName="+a);case 5:e.sent.length>0?o(new Error("此书签名已存在")):o(),e.next=10;break;case 9:o(new Error("请输入书签名"));case 10:case"end":return e.stop()}},e,r)})),function(r,t,a){return e.apply(this,arguments)}),trigger:"change"}],pid:[{required:!0,message:"请选择层级",trigger:"change"}],link:[{validator:function(e,r,t){if(r){if(/^(http||https):\/\//.test(r))return t();t(new Error("请输入正确的网址"))}return t()},trigger:"change"}]},bookmarkId:this.$route.query.id}},created:function(){this.loadData(),this.bookmarkId&&this.getDetail()},methods:{loadData:function(){var e=this;return c()(i.a.mark(function r(){var t;return i.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.$http.get("bookmark/categoryList");case 2:t=r.sent,e.bookmarkList=[].concat(t,{id:0,name:"第一层级"});case 4:case"end":return r.stop()}},r,e)}))()},submit:function(){var e=this;return c()(i.a.mark(function r(){var t,a,n,s,c;return i.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.Global.verification(e,"form");case 2:if(r.sent){r.next=5;break}return r.abrupt("return",!1);case 5:if(t={},!e.bookmarkId){r.next=14;break}return a={className:e.bookmarkList.filter(function(r){return r.id===e.form.pid})[0].name},n=o()({id:e.bookmarkId},e.form,a),r.next=11,e.$http.put("bookmark/edit",n);case 11:t=r.sent,r.next=19;break;case 14:return s=e.bookmarkList.filter(function(r){return r.id===e.form.pid})[0].name,c=o()({className:s},e.form),r.next=18,e.$http.post("bookmark/add",c);case 18:t=r.sent;case 19:200===t.status&&(e.$message({message:t.msg,type:"success"}),e.$router.push({name:"bookmarkList"}));case 20:case"end":return r.stop()}},r,e)}))()},getDetail:function(){var e=this;return c()(i.a.mark(function r(){var t;return i.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e.$http.get("/bookmark/detail?id="+e.bookmarkId);case 3:t=r.sent,e.form.pid=t.pid,e.form.link=t.link,e.form.icon=t.icon,e.form.bookmarkName=t.name,r.next=13;break;case 10:r.prev=10,r.t0=r.catch(0),console.log(r.t0);case 13:case"end":return r.stop()}},r,e,[[0,10]])}))()}}},l={render:function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"add-bookmark"},[t("el-form",{ref:"form",staticClass:"form-box",attrs:{rules:e.rules,model:e.form,"label-width":"80px"}},[t("el-form-item",{attrs:{label:"书签名称",prop:"bookmarkName"}},[t("el-input",{directives:[{name:"focus",rawName:"v-focus"}],attrs:{placeholder:"请输入书签名称"},model:{value:e.form.bookmarkName,callback:function(r){e.$set(e.form,"bookmarkName",r)},expression:"form.bookmarkName"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"层级",prop:"pid"}},[t("el-select",{attrs:{placeholder:"请选择层级"},model:{value:e.form.pid,callback:function(r){e.$set(e.form,"pid",r)},expression:"form.pid"}},e._l(e.bookmarkList,function(e){return t("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1)],1),e._v(" "),t("el-form-item",{attrs:{label:"图标"}},[t("el-input",{attrs:{placeholder:"请输入图标类名"},model:{value:e.form.icon,callback:function(r){e.$set(e.form,"icon",r)},expression:"form.icon"}})],1),e._v(" "),0!==this.form.pid?t("el-form-item",{attrs:{label:"链接",prop:"link"}},[t("el-input",{attrs:{placeholder:"请输入链接地址"},model:{value:e.form.link,callback:function(r){e.$set(e.form,"link",r)},expression:"form.link"}})],1):e._e(),e._v(" "),t("el-form-item",{staticStyle:{"margin-top":"22px"}},[t("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("保存")]),e._v(" "),t("el-button",{on:{click:function(r){return e.$router.go(-1)}}},[e._v("取消")])],1)],1)],1)},staticRenderFns:[]};var u=t("VU/8")(m,l,!1,function(e){t("t0b8")},"data-v-61fe3152",null);r.default=u.exports},t0b8:function(e,r){}});