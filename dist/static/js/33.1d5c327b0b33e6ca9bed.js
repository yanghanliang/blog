webpackJsonp([33],{"6jVb":function(t,e){},PJ2m:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("Xxa5"),i=n.n(s),r=n("exGp"),a=n.n(r),c={name:"userList",data:function(){return{routingInformation:{name1:"首页",name2:"用户列表",router:"/"},tableData:[],tags:[],entexpands:[],selectVisible:!1,selectedList:[],jurisdictionList:[],currentRow:{}}},filters:{statusHandle:function(t){return t?"success":"danger"}},computed:{tagIds:function(){return this.tags.map(function(t){return t.id})}},created:function(){this.getUserList(),this.getJurisdictionList()},methods:{getUserList:function(){var t=this;return a()(i.a.mark(function e(){var n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$http.get("user/list");case 3:n=e.sent,t.tableData=n,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}},e,t,[[0,7]])}))()},getUserJurisdiction:function(t){var e=this;return a()(i.a.mark(function n(){var s,r;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return s={userName:t},n.prev=1,n.next=4,e.$http.post("user/jurisdictions",s);case 4:r=n.sent,e.tags=r,n.next=11;break;case 8:n.prev=8,n.t0=n.catch(1),console.log(n.t0);case 11:case"end":return n.stop()}},n,e,[[1,8]])}))()},rowExpand:function(t,e,n){var s=this;return a()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(Array.prototype.remove=function(t){var e=this.indexOf(t);e>-1&&this.splice(e,1)},!(s.entexpands.indexOf(t.id)<0)){e.next=9;break}return s.entexpands=[],s.currentRow=t,e.next=6,s.getUserJurisdiction(t.username);case 6:s.entexpands.push(t.id),e.next=10;break;case 9:s.entexpands.remove(t.id);case 10:case"end":return e.stop()}},e,s)}))()},getJurisdictionList:function(){var t=this;return a()(i.a.mark(function e(){var n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$http.get("jurisdiction/list");case 3:n=e.sent,t.jurisdictionList=n,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}},e,t,[[0,7]])}))()},addUserJurisdiction:function(t){var e=this;if(!t&&this.selectedList.length>0){var n=this.jurisdictionList.filter(function(t){if(e.selectedList.includes(t.id))return t});this.tags=[].concat(this.tags,n),this.editUserJurisdiction("添加成功~"),this.selectedList=[]}},deleteUserJurisdiction:function(t){this.tags=this.tags.filter(function(e){if(e.id!==t)return e}),this.editUserJurisdiction("删除成功~")},editUserJurisdiction:function(t){var e=this;return a()(i.a.mark(function n(){var s,r,a;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return s={jurisdictionId:e.tagIds.join(","),id:e.currentRow.id},n.prev=1,n.next=4,e.$http.put("user/jurisdiction/edit",s);case 4:r=n.sent,a=r.data,e.$message.success(t),window.localStorage.setItem("token",a.token),e.Global.getNotJurisdiction(e),n.next=14;break;case 11:n.prev=11,n.t0=n.catch(1),console.log(n.t0);case 14:case"end":return n.stop()}},n,e,[[1,11]])}))()}}},o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"user-list"},[n("el-table",{staticClass:"dataTable",attrs:{data:t.tableData,"row-key":"id","expand-row-keys":t.entexpands,border:""},on:{"row-click":t.rowExpand,"expand-change":t.rowExpand}},[n("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return e.row,[t.tags.length>0?t._l(t.tags,function(e){return n("el-tag",{key:e.id,attrs:{closable:"",type:t._f("statusHandle")(e.is_open)},on:{close:function(n){return t.deleteUserJurisdiction(e.id)}}},[t._v("\n\t\t\t\t\t\t\t"+t._s(e.j_name)+"\n\t\t\t\t\t\t")])}):[n("my-icon",{staticClass:"no-data",attrs:{identification:"meiyouxiangguan",title:"暂无数据"}})],t._v(" "),t.selectVisible?n("el-select",{staticStyle:{"margin-left":"20px"},attrs:{multiple:"","collapse-tags":"",placeholder:"请选择您所需要添加的权限"},on:{"visible-change":t.addUserJurisdiction},model:{value:t.selectedList,callback:function(e){t.selectedList=e},expression:"selectedList"}},[t._l(t.jurisdictionList,function(e){return[t.tagIds.includes(e.id)?t._e():n("el-option",{key:e.id,attrs:{label:e.j_name,value:e.id}})]})],2):n("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:function(e){t.selectVisible=!t.selectVisible}}},[t._v("+ New Tag")])]}}])}),t._v(" "),n("el-table-column",{key:"tt",attrs:{prop:"username",label:"用户名"}}),t._v(" "),n("el-table-column",{attrs:{prop:"alias",label:"昵称"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(t){t.row}}])})],1)],1)},staticRenderFns:[]};var u=n("VU/8")(c,o,!1,function(t){n("6jVb")},"data-v-56ef0d4e",null);e.default=u.exports}});