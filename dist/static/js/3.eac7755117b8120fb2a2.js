webpackJsonp([3],{"/rKk":function(e,t){},"4WTo":function(e,t,n){var r=n("NWt+");e.exports=function(e,t){var n=[];return r(e,!1,n.push,n,t),n}},"5zde":function(e,t,n){n("zQR9"),n("qyJz"),e.exports=n("FeBl").Array.from},"7Doy":function(e,t,n){var r=n("EqjI"),a=n("7UMu"),i=n("dSzd")("species");e.exports=function(e){var t;return a(e)&&("function"!=typeof(t=e.constructor)||t!==Array&&!a(t.prototype)||(t=void 0),r(t)&&null===(t=t[i])&&(t=void 0)),void 0===t?Array:t}},"9Bbf":function(e,t,n){"use strict";var r=n("kM2E");e.exports=function(e){r(r.S,e,{of:function(){for(var e=arguments.length,t=new Array(e);e--;)t[e]=arguments[e];return new this(t)}})}},"9C8M":function(e,t,n){"use strict";var r=n("evD5").f,a=n("Yobk"),i=n("xH/j"),s=n("+ZMJ"),o=n("2KxR"),c=n("NWt+"),l=n("vIB/"),u=n("EGZi"),h=n("bRrM"),d=n("+E39"),f=n("06OY").fastKey,p=n("LIJb"),v=d?"_s":"size",m=function(e,t){var n,r=f(t);if("F"!==r)return e._i[r];for(n=e._f;n;n=n.n)if(n.k==t)return n};e.exports={getConstructor:function(e,t,n,l){var u=e(function(e,r){o(e,u,t,"_i"),e._t=t,e._i=a(null),e._f=void 0,e._l=void 0,e[v]=0,void 0!=r&&c(r,n,e[l],e)});return i(u.prototype,{clear:function(){for(var e=p(this,t),n=e._i,r=e._f;r;r=r.n)r.r=!0,r.p&&(r.p=r.p.n=void 0),delete n[r.i];e._f=e._l=void 0,e[v]=0},delete:function(e){var n=p(this,t),r=m(n,e);if(r){var a=r.n,i=r.p;delete n._i[r.i],r.r=!0,i&&(i.n=a),a&&(a.p=i),n._f==r&&(n._f=a),n._l==r&&(n._l=i),n[v]--}return!!r},forEach:function(e){p(this,t);for(var n,r=s(e,arguments.length>1?arguments[1]:void 0,3);n=n?n.n:this._f;)for(r(n.v,n.k,this);n&&n.r;)n=n.p},has:function(e){return!!m(p(this,t),e)}}),d&&r(u.prototype,"size",{get:function(){return p(this,t)[v]}}),u},def:function(e,t,n){var r,a,i=m(e,t);return i?i.v=n:(e._l=i={i:a=f(t,!0),k:t,v:n,p:r=e._l,n:void 0,r:!1},e._f||(e._f=i),r&&(r.n=i),e[v]++,"F"!==a&&(e._i[a]=i)),e},getEntry:m,setStrong:function(e,t,n){l(e,t,function(e,n){this._t=p(e,t),this._k=n,this._l=void 0},function(){for(var e=this._k,t=this._l;t&&t.r;)t=t.p;return this._t&&(this._l=t=t?t.n:this._t._f)?u(0,"keys"==e?t.k:"values"==e?t.v:[t.k,t.v]):(this._t=void 0,u(1))},n?"entries":"values",!n,!0),h(t)}}},A1av:function(e,t){},ALrJ:function(e,t,n){var r=n("+ZMJ"),a=n("MU5D"),i=n("sB3e"),s=n("QRG4"),o=n("oeOm");e.exports=function(e,t){var n=1==e,c=2==e,l=3==e,u=4==e,h=6==e,d=5==e||h,f=t||o;return function(t,o,p){for(var v,m,_=i(t),b=a(_),y=r(o,p,3),w=s(b.length),g=0,S=n?f(t,w):c?f(t,0):void 0;w>g;g++)if((d||g in b)&&(m=y(v=b[g],g,_),e))if(n)S[g]=m;else if(m)switch(e){case 3:return!0;case 5:return v;case 6:return g;case 2:S.push(v)}else if(u)return!1;return h?-1:l||u?u:S}}},BDhv:function(e,t,n){var r=n("kM2E");r(r.P+r.R,"Set",{toJSON:n("m9gC")("Set")})},Gu7T:function(e,t,n){"use strict";t.__esModule=!0;var r,a=n("c/Tr"),i=(r=a)&&r.__esModule?r:{default:r};t.default=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return(0,i.default)(e)}},HpRW:function(e,t,n){"use strict";var r=n("kM2E"),a=n("lOnJ"),i=n("+ZMJ"),s=n("NWt+");e.exports=function(e){r(r.S,e,{from:function(e){var t,n,r,o,c=arguments[1];return a(this),(t=void 0!==c)&&a(c),void 0==e?new this:(n=[],t?(r=0,o=i(c,arguments[2],2),s(e,!1,function(e){n.push(o(e,r++))})):s(e,!1,n.push,n),new this(n))}})}},LIJb:function(e,t,n){var r=n("EqjI");e.exports=function(e,t){if(!r(e)||e._t!==t)throw TypeError("Incompatible receiver, "+t+" required!");return e}},SibQ:function(e,t){},"c/Tr":function(e,t,n){e.exports={default:n("5zde"),__esModule:!0}},fBQ2:function(e,t,n){"use strict";var r=n("evD5"),a=n("X8DO");e.exports=function(e,t,n){t in e?r.f(e,t,a(0,n)):e[t]=n}},ioQ5:function(e,t,n){n("HpRW")("Set")},lHA8:function(e,t,n){e.exports={default:n("pPW7"),__esModule:!0}},m9gC:function(e,t,n){var r=n("RY/4"),a=n("4WTo");e.exports=function(e){return function(){if(r(this)!=e)throw TypeError(e+"#toJSON isn't generic");return a(this)}}},oNmr:function(e,t,n){n("9Bbf")("Set")},oeOm:function(e,t,n){var r=n("7Doy");e.exports=function(e,t){return new(r(e))(t)}},pPW7:function(e,t,n){n("M6a0"),n("zQR9"),n("+tPU"),n("ttyz"),n("BDhv"),n("oNmr"),n("ioQ5"),e.exports=n("FeBl").Set},qJKj:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=[{id:1,jobNumber:"001",name:"张三",departmentName:"财务部",departmentId:0},{id:2,jobNumber:"002",name:"王五",departmentName:"技术部",departmentId:1},{id:3,jobNumber:"003",name:"小明",departmentName:"销售部",departmentId:2},{id:4,jobNumber:"004",name:"刘大麻子",departmentName:"技术部",departmentId:1}],a=n("lHA8"),i=n.n(a),s=n("Gu7T"),o=n.n(s),c=n("lRwf"),l=new(n.n(c).a),u=n("lwFf"),h={props:{data:{type:Array,required:!0}},data:function(){return{search:"",tableData:[],tableSelected:[],defaultProps:{children:"children",label:"name"},treeData:[],treeSelected:[],showType:1,treeKeys:[],original:{tree:[],table:[],selected:[]}}},created:function(){var e=this;l.$on("cannelSelected",function(t,n){if(1===n)e.tableSelected.forEach(function(n,r){n.id===t.id&&(e.$refs.multipleTable.toggleRowSelection(n),e.original.selected=e.original.selected.filter(function(e){return e!==t.id}))});else{var r=e.treeSelected.filter(function(e){return e.id!==t.id});e.$refs.tree.setCheckedNodes(r)}}),this.transformationTree()},methods:{tableSelectionChange:function(e){this.tableSelected=e;var t=e.map(function(e){return e.id});this.original.selected=this.original.selected.concat(t),this.original.selected=[].concat(o()(new i.a(this.original.selected)))},transformationTree:function(){var e=[],t=[];this.tableData=Object(u.a)(this.data),this.tableData.forEach(function(n){if(!e.includes(n.departmentId)){var r={name:n.departmentName,children:[]};e.push(n.departmentId),t[n.departmentId]=r}t[n.departmentId].children.push(n)}),this.treeData=[{id:0,name:"全公司",children:t}],this.original.table=Object(u.a)(this.tableData),this.original.tree=Object(u.a)(this.treeData)},treeSelectionChange:function(e){this.treeSelected=this.$refs.tree.getCheckedNodes(!0);var t=this.$refs.tree.getCheckedKeys(!0);l.$emit("setTableData",t,this.showType),this.original.selected=this.original.selected.concat(t),this.original.selected=[].concat(o()(new i.a(this.original.selected)))},selechChange:function(e){var t=this;1===e?(this.$refs.multipleTable.clearSelection(),this.treeSelected=this.$refs.tree.getCheckedNodes(!0),this.treeSelected.forEach(function(e){t.$nextTick(function(){t.$refs.multipleTable.toggleRowSelection(e,!0)})})):(this.$refs.tree.setCheckedNodes(this.tableSelected),this.treeSelected=this.tableSelected,this.treeKeys=this.tableSelected.map(function(e){return e.id})),l.$emit("setType",e)},textReplace:function(e){return e?e.replace(this.search,"<span red>"+this.search+"</span>"):e},updateSelectTable:function(){var e=this;this.$nextTick(function(){e.tableSelected=e.tableData.filter(function(t){if(e.original.selected.includes(t.id))return e.$refs.multipleTable.toggleRowSelection(t,!0),t})})}},watch:{search:function(e,t){var n=this,r=Object(u.a)(this.original.table);if(this.tableData=r.filter(function(e){if(e.name.includes(n.search)||e.jobNumber.includes(n.search)||e.departmentName.includes(n.search))return e}),2===this.showType){var a=[],s=[],c=[];this.tableData.forEach(function(e){if(!a.includes(e.departmentId)){var t={name:e.departmentName,children:[]};a.push(e.departmentId),s[e.departmentId]=t}s[e.departmentId].children.push(e),c.push(e.id)}),s=s.filter(function(e){return e}),this.treeData=[{id:0,name:"全公司",children:s}],this.treeKeys=c}""===t&&(1===this.showType?this.original.selected=this.tableSelected.map(function(e){return e.id}):this.original.selected=this.treeSelected.map(function(e){return e.id})),""===e&&2===this.showType&&(this.original.selected=this.original.selected.concat(this.$refs.tree.getCheckedKeys(!0)),this.original.selected=[].concat(o()(new i.a(this.original.selected)))),1===this.showType?this.updateSelectTable():this.$nextTick(function(){n.$refs.tree.setCheckedKeys(n.original.selected)})},"original.selected":function(e){l.$emit("setTableData",e,this.showType)}}},d={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"left-content"},[n("el-input",{attrs:{placeholder:"关键字搜索",clearable:""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),e._v(" "),n("div",{staticClass:"mt10 mb10"},[n("span",[e._v("显示方式：")]),e._v(" "),n("el-select",{attrs:{placeholder:"请选择"},on:{change:e.selechChange},model:{value:e.showType,callback:function(t){e.showType=t},expression:"showType"}},[n("el-option",{attrs:{label:"按列表",value:1}}),e._v(" "),n("el-option",{attrs:{label:"按目录树",value:2}})],1)],1),e._v(" "),n("el-table",{directives:[{name:"show",rawName:"v-show",value:1===e.showType,expression:"showType === 1"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark"},on:{"selection-change":e.tableSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),n("el-table-column",{attrs:{prop:"jobNumber",label:"工号",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("div",{directives:[{name:"show",rawName:"v-show",value:e.search,expression:"search"}],domProps:{innerHTML:e._s(e.textReplace(r.jobNumber))}}),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:!e.search,expression:"!search"}]},[e._v(e._s(r.jobNumber))])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"name",label:"姓名",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("div",{directives:[{name:"show",rawName:"v-show",value:e.search,expression:"search"}],domProps:{innerHTML:e._s(e.textReplace(r.name))}}),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:!e.search,expression:"!search"}]},[e._v(e._s(r.name))])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"departmentName",label:"部门","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("div",{directives:[{name:"show",rawName:"v-show",value:e.search,expression:"search"}],domProps:{innerHTML:e._s(e.textReplace(r.departmentName))}}),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:!e.search,expression:"!search"}]},[e._v(e._s(r.departmentName))])]}}])})],1),e._v(" "),n("el-tree",{directives:[{name:"show",rawName:"v-show",value:2===e.showType,expression:"showType === 2"}],ref:"tree",attrs:{data:e.treeData,"show-checkbox":"","node-key":"id",props:e.defaultProps,"default-expanded-keys":e.treeKeys},on:{"check-change":e.treeSelectionChange},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.node;return t.data,n("span",{staticClass:"custom-tree-node"},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.search,expression:"search"}],domProps:{innerHTML:e._s(e.textReplace(r.label))}}),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:!e.search,expression:"!search"}]},[e._v(e._s(r.label))])])}}])})],1)},staticRenderFns:[]};var f=n("VU/8")(h,d,!1,function(e){n("/rKk")},"data-v-f6bbb5ca",null).exports,p=n("mvHQ"),v=n.n(p),m={props:{data:{type:Array,required:!0}},data:function(){return{type:1,search:"",tempData:[],keys:[],list:[]}},created:function(){this.init()},methods:{init:function(){var e=this;l.$on("setTableData",function(t,n){e.keys=t,e.type=n}),l.$on("setType",function(t){e.type=t})},cannelSelected:function(e){l.$emit("cannelSelected",e,this.type)},textReplace:function(e){return e?e.replace(this.search,"<span red>"+this.search+"</span>"):e},getSelectedData:function(){alert(v()(this.list))}},watch:{search:function(e){var t=this;this.list=this.tempData.filter(function(e){if(e.name.includes(t.search)||e.jobNumber.includes(t.search)||e.departmentName.includes(t.search))return e})},keys:function(){var e=this,t=Object(u.a)(this.data);this.list=t.filter(function(t){return e.keys.includes(t.id)}),this.tempData=Object(u.a)(this.list)}}},_={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",{staticClass:"right-content"},[n("el-input",{staticClass:"mb20",attrs:{placeholder:"关键字搜索",clearable:""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),e._v(" "),e.list.length?[e._l(e.list,function(t){return n("li",{key:t.id},[e.search?[n("span",{domProps:{innerHTML:e._s(e.textReplace(t.jobNumber+"-"+t.name))}}),e._v(" "),n("span",{domProps:{innerHTML:e._s(e.textReplace(t.departmentName))}},[e._v(e._s(t.departmentName))])]:[n("span",[e._v(e._s(t.jobNumber)+"-"+e._s(t.name))]),e._v(" "),n("span",[e._v(e._s(t.departmentName))])],e._v(" "),n("i",{staticClass:"el-icon-close fr",on:{click:function(n){return e.cannelSelected(t)}}})],2)}),e._v(" "),n("el-button",{staticClass:"mt40",attrs:{type:"primary",size:"small"},on:{click:e.getSelectedData}},[e._v("取选择结果")])]:[n("div",{staticClass:"ta-center mt40"},[n("my-icon",{staticClass:"meiyouxiangguan",attrs:{identification:"meiyouxiangguan"}}),e._v(" "),n("span",{staticClass:"display-b"},[e._v("暂无数据")])],1)]],2)},staticRenderFns:[]};var b={name:"demo1",components:{leftContent:f,rightContent:n("VU/8")(m,_,!1,function(e){n("A1av")},"data-v-1649e39e",null).exports},data:function(){return{tableData:r}}},y={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("div",{staticClass:"clearfix"},[t("left-content",{staticClass:"fl",attrs:{data:this.tableData}}),this._v(" "),t("right-content",{staticClass:"fr",attrs:{data:this.tableData}})],1),this._v(" "),t("h3",{staticClass:"mt40"},[this._v("性能优化方面")]),this._v(" "),this._m(0)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("ol",[t("li",[this._v("减少数据请求次数： 使用本地存储，如localStorage或sessionStorage或者将数据存储在内存中（我是存在内存中），前端做搜索 --- 并发量")]),this._v(" "),t("li",[this._v("根据实际情况选择：v-show 和 v-if --- 页面性能")])])}]};var w=n("VU/8")(b,y,!1,function(e){n("SibQ")},"data-v-4a144686",null);t.default=w.exports},qo66:function(e,t,n){"use strict";var r=n("7KvD"),a=n("kM2E"),i=n("06OY"),s=n("S82l"),o=n("hJx8"),c=n("xH/j"),l=n("NWt+"),u=n("2KxR"),h=n("EqjI"),d=n("e6n0"),f=n("evD5").f,p=n("ALrJ")(0),v=n("+E39");e.exports=function(e,t,n,m,_,b){var y=r[e],w=y,g=_?"set":"add",S=w&&w.prototype,x={};return v&&"function"==typeof w&&(b||S.forEach&&!s(function(){(new w).entries().next()}))?(w=t(function(t,n){u(t,w,e,"_c"),t._c=new y,void 0!=n&&l(n,_,t[g],t)}),p("add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON".split(","),function(e){var t="add"==e||"set"==e;e in S&&(!b||"clear"!=e)&&o(w.prototype,e,function(n,r){if(u(this,w,e),!t&&b&&!h(n))return"get"==e&&void 0;var a=this._c[e](0===n?0:n,r);return t?this:a})}),b||f(w.prototype,"size",{get:function(){return this._c.size}})):(w=m.getConstructor(t,e,_,g),c(w.prototype,n),i.NEED=!0),d(w,e),x[e]=w,a(a.G+a.W+a.F,x),b||m.setStrong(w,e,_),w}},qyJz:function(e,t,n){"use strict";var r=n("+ZMJ"),a=n("kM2E"),i=n("sB3e"),s=n("msXi"),o=n("Mhyx"),c=n("QRG4"),l=n("fBQ2"),u=n("3fs2");a(a.S+a.F*!n("dY0y")(function(e){Array.from(e)}),"Array",{from:function(e){var t,n,a,h,d=i(e),f="function"==typeof this?this:Array,p=arguments.length,v=p>1?arguments[1]:void 0,m=void 0!==v,_=0,b=u(d);if(m&&(v=r(v,p>2?arguments[2]:void 0,2)),void 0==b||f==Array&&o(b))for(n=new f(t=c(d.length));t>_;_++)l(n,_,m?v(d[_],_):d[_]);else for(h=b.call(d),n=new f;!(a=h.next()).done;_++)l(n,_,m?s(h,v,[a.value,_],!0):a.value);return n.length=_,n}})},ttyz:function(e,t,n){"use strict";var r=n("9C8M"),a=n("LIJb");e.exports=n("qo66")("Set",function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}},{add:function(e){return r.def(a(this,"Set"),e=0===e?0:e,e)}},r)}});