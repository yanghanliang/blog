webpackJsonp([38],{Jn6K:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Xxa5"),n=a.n(r),s=a("exGp"),o=a.n(s),c={name:"addCategory",data:function(){return{categoryData:[],form:{classname:"",pid:0,type:1,layername:"第一层级"}}},created:function(){this.getCategoryData()},methods:{getCategoryData:function(){var e=this;return o()(n.a.mark(function t(){var a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.post("category",{type:e.form.type});case 2:a=t.sent,e.categoryData=a.list;case 4:case"end":return t.stop()}},t,e)}))()},addCategory:function(){var e=this;return o()(n.a.mark(function t(){var a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.post("addCategory",e.form);case 2:200===(a=t.sent).status?(e.$message({message:a.msg,type:"success"}),e.$router.push({name:"categoryList"})):e.$message({message:"估计是后端数据问题",type:"error"});case 4:case"end":return t.stop()}},t,e)}))()}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content_right"},[a("el-form",{ref:"form",staticClass:"form-box",attrs:{model:e.form,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"分类名称"}},[a("el-input",{model:{value:e.form.classname,callback:function(t){e.$set(e.form,"classname",t)},expression:"form.classname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"层级"}},[a("el-select",{attrs:{placeholder:"请选择层级"},model:{value:e.form.layername,callback:function(t){e.$set(e.form,"layername",t)},expression:"form.layername"}},e._l(e.categoryData,function(e){return a("el-option",{key:e.id,attrs:{label:e.classname,value:e.id}})}),1)],1),e._v(" "),a("el-form-item",{staticStyle:{"margin-top":"22px"}},[a("el-button",{attrs:{type:"primary"},on:{click:e.addCategory}},[e._v("保存")]),e._v(" "),a("el-button",{on:{click:function(t){return e.$router.push({name:"articleList"})}}},[e._v("取消")])],1)],1)],1)},staticRenderFns:[]};var i=a("VU/8")(c,l,!1,function(e){a("ngjz")},"data-v-07006a20",null);t.default=i.exports},ngjz:function(e,t){}});