webpackJsonp([26],{SQj8:function(e,t){},buPp:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n("mvHQ"),a=n.n(s),i=n("qGkB"),o=new WebSocket("wss://"+i.a.localhostIp),r={name:"webSocket",data:function(){return{chatRecord:[],message:"",id:"",headPortraitList:["a.jpg","b.jpg","c.jpg","d.jpeg"],onlineNumber:""}},mounted:function(){this.postData()},methods:{postData:function(){var e=this;window.WebSocket&&(o.onopen=function(e){},o.onclose=function(e){},o.onerror=function(){},o.onmessage=function(t){console.log(t.data,"res.data");var n=JSON.parse(t.data);if(e.id||(e.id=n.id,e.chatRecord=n.chatRecord||[],e.onlineNumber=n.length),1===n.type)n.content&&e.chatRecord.push(n),e.$nextTick(function(){e.$refs.bottom.scrollIntoView()});else{var s=e.$createElement,a=2===n.type?"登录":"跑";e.onlineNumber=n.length,e.$notify({offset:100,duration:2e3,title:"有新消息~",message:s("i",{style:"color: teal; font-style: normal;"},"(｡･∀･)ﾉﾞ嗨！有人"+a+"了噢~")})}})},send:function(){var e=a()({id:this.id,content:this.message});o.send(e),this.message="",this.$refs.input.focus()}}},c={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"websocket"},[e.onlineNumber?n("div",{staticClass:"tips"},[e._v("在线人数："+e._s(e.onlineNumber))]):e._e(),e._v(" "),n("div",{staticClass:"list clearfix scrollbar"},[e._l(e.chatRecord,function(t,s){return n("div",{key:s,class:["list-item",e.id===t.id?"ta-right":""]},[e.id===t.id?[n("span",[e._v(e._s(t.content)+"：")]),e._v(" "),t.headPortraitUrl?n("img",{attrs:{src:t.headPortraitUrl,alt:"头像"}}):e._e()]:[t.headPortraitUrl?n("img",{attrs:{src:t.headPortraitUrl,alt:"头像"}}):e._e(),e._v(" "),n("span",[e._v("："+e._s(t.content))])]],2)}),e._v(" "),n("div",{ref:"bottom"})],2),e._v(" "),n("div",{staticClass:"clearfix"},[n("el-input",{ref:"input",staticClass:"w80 fl",attrs:{placeholder:"请输入内容"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.send.apply(null,arguments)}},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}}),e._v(" "),n("el-button",{staticClass:"w20 fr",on:{click:e.send}},[e._v("发送")])],1)])},staticRenderFns:[]};var l=n("VU/8")(r,c,!1,function(e){n("SQj8")},"data-v-7f75614a",null);t.default=l.exports}});