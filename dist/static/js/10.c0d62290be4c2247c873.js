webpackJsonp([10],{GKFO:function(t,s){},HZjz:function(t,s,a){t.exports=a.p+"static/img/avatar.440dc1d.jpg"},KiV2:function(t,s,a){"use strict";s.a=function(t,s){(s=Object(i.b)({params:s,defaultValue:{conversion:"up",symbol:",",decimal:!0}}))&&s.conversion&&("up"===s.conversion?t/=100:"down"===s.conversion&&(t=Math.floor(100*t),s.decimal=!1));if(s&&s.symbol){var a=String(t).split("."),e=[];!function t(s){if(s.str.length>s.step){var a=s.str.slice(-s.step);e.unshift(a),t({str:s.str.slice(0,-s.step),step:s.step})}else s.str&&e.unshift(s.str)}({str:String(a[0]),step:3});var n=e.join(s.symbol);return a.length>1?1===String(a[1]).length&&s.decimal?n+"."+a[1]+"0":n+"."+a[1]:s.decimal?n+".00":n}if(s&&s.decimal){var l=String(t);if(console.log(l.indexOf("."),l.slice(l.indexOf(".")).length,"????"),!l.includes("."))return console.log(0),t+".00";if(1===l.slice(l.indexOf(".")).length)return console.log(1),t+"0"}return t};var i=a("lwFf")},c92Y:function(t,s){},lVmq:function(t,s){},zH4n:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("section",[t._t("default"),t._v(" "),a("section",{staticClass:"layout-left"},[t._t("content",function(){return[t._v("内容")]})],2),t._v(" "),a("section",{staticClass:"layout-right"},[t._t("nav",function(){return[t._v("nav")]})],2)],2)},staticRenderFns:[]};var e=a("VU/8")({},i,!1,function(t){a("c92Y")},"data-v-1dd86a3f",null).exports,n={name:"mySelect",props:{textAlign:{type:String,default:"tz-right"},id:{type:[Number,String]}},data:function(){return{status:!1,selectedItem:{},optionList:[{id:1,text:"Today"},{id:2,text:"Today2"},{id:3,text:"Today3"}]}},created:function(){this.setDefalut()},methods:{setOption:function(t){this.selectedItem=t,this.status=!1,this.$emit("update:id",t.id)},openSelect:function(){this.status=!0},closeSelect:function(){this.status=!1},setDefalut:function(){var t=this;this.optionList.forEach(function(s){s.id===t.id&&(t.selectedItem=s)})}}},l={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{class:["my-select",t.status?"open":"close",t.textAlign],on:{click:t.openSelect,mouseleave:t.closeSelect}},[a("div",{staticClass:"ms-content"},[a("span",{},[t._v(t._s(t.selectedItem.text))]),t._v(" "),a("i",{staticClass:"el-icon-arrow-right"})]),t._v(" "),a("ul",{staticClass:"ms-option"},[t._l(t.optionList,function(s,i){return[a("li",{key:i,on:{click:function(a){return a.stopPropagation(),t.setOption(s)}}},[t._v(t._s(s.text))])]})],2)])},staticRenderFns:[]};var c=a("VU/8")(n,l,!1,function(t){a("GKFO")},"data-v-e8b2a98e",null).exports,o=a("Ek6N"),r=a("Pg0u"),v=a.n(r),d=a("KiV2"),f={name:"demo",components:{leftAuto:e,mySelect:c,logo:o.a},filters:{money:d.a},data:function(){return{one:"",two:"",navList:[{id:1,status:!0,text:"Dashboard"},{id:2,status:!1,text:"Services"},{id:3,status:!1,text:"History"},{id:4,status:!1,text:"Actions"}],savingsEcharts:null,balanceEcharts:null,id:1}},mounted:function(){this.initSavings(),this.initBalance(),this.resize()},methods:{initSavings:function(){this.savingsEcharts=v.a.init(this.$refs.savings);this.savingsEcharts.setOption({tooltip:{trigger:"item",show:!0,formatter:"+{c}%"},axisPointer:{show:!1},xAxis:[{type:"category",data:["$10","$20","$30","$40","$50"],axisLine:{lineStyle:{color:"#999"}}}],grid:{top:10,right:15,left:45},toolbox:{},yAxis:[{type:"value",maxInterval:100,minInterval:25,splitLine:{lineStyle:{type:"dashed",color:"#DDD"}},axisLabel:{show:!0,interval:"auto",formatter:"{value} %"},splitNumber:4,axisLine:{show:!1,lineStyle:{color:"#333"}},nameTextStyle:{color:"#999"},splitArea:{show:!1}}],series:[{name:"课时",type:"line",data:[0,50,60,86,23],lineStyle:{normal:{width:8,color:{type:"linear",colorStops:[{offset:0,color:"#A9F387"},{offset:1,color:"#48D8BF"}],globalCoord:!1},shadowColor:"rgba(72,216,191, 0.3)",shadowBlur:10,shadowOffsetY:20}},itemStyle:{normal:{color:"#fff",borderWidth:10,borderColor:"#A9F387"}},smooth:!0}]})},initBalance:function(){this.balanceEcharts=v.a.init(this.$refs.balance);var t={title:{text:"$5,349",textStyle:{color:"#01c4a3",fontSize:30},subtext:"Balance",subtextStyle:{color:"#909090",fontSize:15},itemGap:0,left:"center",top:"center"},angleAxis:{max:100,clockwise:!1,axisLine:{show:!1},axisTick:{show:!1},axisLabel:{show:!1},splitLine:{show:!1}},radiusAxis:{type:"category",axisLine:{show:!1},axisTick:{show:!1},axisLabel:{show:!1},splitLine:{show:!1}},polar:{center:["50%","50%"],radius:"120%"},series:[{type:"bar",data:[{name:"作文得分",value:25,itemStyle:{normal:{color:new v.a.graphic.LinearGradient(1,0,0,0,[{offset:0,color:"#f36a6a"},{offset:1,color:"#ff0000"}])}}}],coordinateSystem:"polar",roundCap:!0,barWidth:20,barGap:"-100%",z:4},{type:"bar",data:[{name:"作文得分",value:45,itemStyle:{normal:{color:new v.a.graphic.LinearGradient(1,0,0,0,[{offset:0,color:"#000000"},{offset:1,color:"#0acfa1"}])}}}],coordinateSystem:"polar",roundCap:!0,barWidth:20,barGap:"-100%",z:3},{type:"bar",data:[{name:"作文得分",value:75,itemStyle:{normal:{color:new v.a.graphic.LinearGradient(1,0,0,0,[{offset:0,color:"#aaf14f"},{offset:1,color:"#0acfa1"}])}}}],coordinateSystem:"polar",roundCap:!0,barWidth:20,barGap:"-100%",z:2},{type:"bar",data:[{value:100,itemStyle:{color:"#e2e2e2",shadowColor:"rgba(0, 0, 0, 0.2)",shadowBlur:5,shadowOffsetY:2}}],coordinateSystem:"polar",roundCap:!0,barWidth:20,barGap:"-100%",z:1}]};this.balanceEcharts.setOption(t)},resize:function(){var t=this;window.addEventListener("resize",function(){setTimeout(function(){t.savingsEcharts.resize(),t.balanceEcharts.resize()})})},clickNav:function(t){this.navList.forEach(function(s,a){t.id===s.id?s.status=!0:s.status=!1})}}},u={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"demo"},[i("left-auto",{staticClass:"position-relative"},[i("div",{staticClass:"personal",attrs:{slot:"nav"},slot:"nav"},[i("div",{staticClass:"personal-top clearfix"},[i("i",{staticClass:"fl my-icon-xiaoxi"}),t._v(" "),i("div",{staticClass:"fr user clearfix"},[i("div",{staticClass:"user-head-portrait fr"},[i("img",{attrs:{src:a("HZjz"),alt:""}})]),t._v(" "),i("span",{staticClass:"user-name fr"},[t._v("\n\t\t\t\t\t\t\tAnstasia\n\t\t\t\t\t\t")])])]),t._v(" "),i("div",{ref:"balance",staticClass:"balance"}),t._v(" "),i("div",{staticClass:"clearfix transitions-title"},[i("span",{staticClass:"fl"},[t._v("Transitions")]),t._v(" "),i("my-select",{staticClass:"fr",attrs:{id:t.id},on:{"update:id":function(s){t.id=s}}})],1),t._v(" "),i("ul",{staticClass:"transactions"},[i("li",{staticClass:"t-item"},[i("i",{staticClass:"my-icon-tubiaoku"}),t._v(" "),i("span",{staticClass:"ti-title"},[t._v("Dribbble Pro Plan")]),t._v(" "),i("span",{staticClass:"fr",attrs:{red:""}},[t._v("-$100")])]),t._v(" "),i("li",{staticClass:"t-item"},[i("i",{staticClass:"my-icon-tubiaoku"}),t._v(" "),i("span",{staticClass:"ti-title"},[t._v("Dribbble Pro Plan")]),t._v(" "),i("span",{staticClass:"fr color-blue"},[t._v("+$100")])]),t._v(" "),i("li",{staticClass:"t-item"},[i("i",{staticClass:"my-icon-tubiaoku"}),t._v(" "),i("span",{staticClass:"ti-title"},[t._v("Dribbble Pro Plan")]),t._v(" "),i("span",{staticClass:"fr",attrs:{red:""}},[t._v("-$100")])])]),t._v(" "),i("button",{staticClass:"btn clearfix"},[i("span",{staticClass:"fl"},[t._v("Transfer Money")]),t._v(" "),i("i",{staticClass:"my-icon-sanjiaoyou fr"})]),t._v(" "),i("div",{staticClass:"news"},[i("i",{staticClass:"my-icon-pinglun2"})])]),t._v(" "),i("div",{staticClass:"demo-content",attrs:{slot:"content"},slot:"content"},[i("div",{staticClass:"top clearfix"},[i("div",{staticClass:"logo fl"},[i("router-link",{attrs:{to:"/"}},[i("logo")],1)],1),t._v(" "),i("ul",{staticClass:"nav clearfix fl"},[t._l(t.navList,function(s,a){return[i("li",{key:a,class:{active:s.status},on:{click:function(a){return t.clickNav(s)}}},[t._v(t._s(s.text))])]})],2),t._v(" "),i("el-input",{staticClass:"search fr",attrs:{placeholder:"请输入您要搜索的内容",autofocus:!0,clearable:"","suffix-icon":"el-icon-search"},on:{input:t.searchInput},nativeOn:{keyup:function(s){return!s.type.indexOf("key")&&t._k(s.keyCode,"enter",13,s.key,"Enter")?null:t.searchEnter.apply(null,arguments)}},model:{value:t.search,callback:function(s){t.search=s},expression:"search"}})],1),t._v(" "),i("div",{staticClass:"cards clearfix mb40"},[i("div",{staticClass:"public-title clearfix"},[i("span",{staticClass:"fl"},[t._v("Cards")]),t._v(" "),i("span",{staticClass:"fr"},[t._v("View all cards")])]),t._v(" "),i("ul",{staticClass:"cards-item bgc-red"},[i("li",[t._v("Assakdkasjdka")]),t._v(" "),i("li",[t._v("$"+t._s(t._f("money")(22e4,{conversion:"up",symbol:",",decimal:!0})))]),t._v(" "),i("li",[t._v("*** *** *** *** *** **23")]),t._v(" "),i("li",[i("span",[t._v("Monzo")]),t._v(" "),i("el-switch",{staticClass:"fr",attrs:{"active-color":"#13ce66","inactive-color":"#065af3"},model:{value:t.one,callback:function(s){t.one=s},expression:"one"}})],1)]),t._v(" "),i("ul",{staticClass:"cards-item bgc-blue"},[i("li",[t._v("Assakdkasjdka")]),t._v(" "),i("li",[t._v("$"+t._s(t._f("money")(6854179522,{conversion:"up",symbol:",",decimal:!0})))]),t._v(" "),i("li",[t._v("*** *** *** *** *** **23")]),t._v(" "),i("li",[i("span",[t._v("Monzo")]),t._v(" "),i("el-switch",{staticClass:"fr",attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:t.two,callback:function(s){t.two=s},expression:"two"}})],1)]),t._v(" "),i("div",{staticClass:"add-card"},[i("div",{staticClass:"ac-content"},[i("div",{staticClass:"add-icon"},[i("i",{staticClass:"display-b my-icon-jia"})]),t._v(" "),i("span",{staticClass:"display-b"},[t._v("Add New Card")])])])]),t._v(" "),i("div",{staticClass:"dc-content"},[i("div",{staticClass:"services"},[i("div",{staticClass:"public-title clearfix"},[i("span",{staticClass:"fl"},[t._v("Main Services")]),t._v(" "),i("span",{staticClass:"fr"},[t._v("View all")])]),t._v(" "),i("div",{staticClass:"clearfix"},[i("div",{staticClass:"services-item"},[i("i",{staticClass:"display-b my-icon-jiaoyipaixing"}),t._v(" "),i("span",[t._v("Transitions")])]),t._v(" "),i("div",{staticClass:"services-item"},[i("i",{staticClass:"display-b my-icon-dengpao"}),t._v(" "),i("span",[t._v("Transitions")])]),t._v(" "),i("div",{staticClass:"services-item"},[i("i",{staticClass:"display-b my-icon-jiaoyi"}),t._v(" "),i("span",[t._v("Transitions")])]),t._v(" "),i("div",{staticClass:"services-item"},[i("i",{staticClass:"display-b my-icon-qianbao"}),t._v(" "),i("span",[t._v("Transitions")])]),t._v(" "),i("div",{staticClass:"services-item"},[i("i",{staticClass:"display-b my-icon-shijian1"}),t._v(" "),i("span",[t._v("Transitions")])]),t._v(" "),i("div",{staticClass:"services-item"},[i("i",{staticClass:"display-b my-icon-category"}),t._v(" "),i("span",[t._v("Transitions")])])])]),t._v(" "),i("div",{staticClass:"dcc-right"},[i("div",{staticClass:"current"},[i("div",{staticClass:"public-title clearfix"},[i("span",{staticClass:"fl"},[t._v("Current")]),t._v(" "),i("span",{staticClass:"fr"},[t._v("View all")])]),t._v(" "),i("div",{staticClass:"current-item clearfix"},[i("span",{staticClass:"fl"},[t._v("10638736812545")]),t._v(" "),i("div",{staticClass:"line"}),t._v(" "),i("span",{staticClass:"fr money"},[t._v("$"+t._s(t._f("money")(123456,{conversion:"up",symbol:",",decimal:!0})))])]),t._v(" "),i("div",{staticClass:"current-item clearfix"},[i("span",{staticClass:"fl"},[t._v("10638736812545")]),t._v(" "),i("div",{staticClass:"line"}),t._v(" "),i("span",{staticClass:"fr money"},[t._v("$"+t._s(t._f("money")(666456,{conversion:"up",symbol:",",decimal:!0})))])]),t._v(" "),i("div",{staticClass:"current-item clearfix"},[i("span",{staticClass:"fl"},[t._v("10638736812545")]),t._v(" "),i("div",{staticClass:"line"}),t._v(" "),i("span",{staticClass:"fr money"},[t._v("$"+t._s(t._f("money")(654321,{conversion:"up",symbol:",",decimal:!0})))])])]),t._v(" "),i("div",{staticClass:"savings mt40"},[i("div",{staticClass:"public-title clearfix"},[i("span",{staticClass:"fl"},[t._v("Current")]),t._v(" "),i("span",{staticClass:"fr"},[t._v("View all")])]),t._v(" "),i("div",{staticClass:"savings-content clearfix"},[i("div",{ref:"savings",staticClass:"savings-echarts fl",attrs:{id:"savings"}}),t._v(" "),i("ul",{staticClass:"fr sc-box"},[i("li",{staticClass:"clearfix"},[i("span",{staticClass:"fl"},[t._v("Total")]),t._v(" "),i("span",{staticClass:"fr money"},[t._v("$"+t._s(t._f("money")(1e4,{conversion:"up",symbol:",",decimal:!0})))])]),t._v(" "),i("li",{staticClass:"clearfix"},[i("span",{staticClass:"fl"},[t._v("Total week")]),t._v(" "),i("span",{staticClass:"fr money"},[t._v("$"+t._s(t._f("money")(256789,{conversion:"up",symbol:",",decimal:!0})))])]),t._v(" "),i("li",{staticClass:"clearfix"},[i("span",{staticClass:"fl"},[t._v("This month")]),t._v(" "),i("span",{staticClass:"fr money"},[t._v("$"+t._s(t._f("money")(68541,{conversion:"up",symbol:",",decimal:!0})))])])])])])])])])])],1)},staticRenderFns:[]};var p=a("VU/8")(f,u,!1,function(t){a("lVmq")},"data-v-80b1bb5e",null);s.default=p.exports}});