webpackJsonp([24],{WOc8:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),s=a.n(n),i=a("mvHQ"),r=a.n(i),c=a("exGp"),o=a.n(c),l=a("qGkB"),d=new WebSocket("ws://"+l.a.localhostIp),u={data:function(){return{data:[],value:"",type:1,id:"",headPortraitList:["a.jpg","b.jpg","c.jpg","d.jpeg"],onlineNumber:"",chatRecord:[]}},created:function(){this.websoket()},methods:{send:function(){var t=this;return o()(s.a.mark(function e(){var a,n,i,c,o;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("/switch"!==t.value){e.next=9;break}return a="",1===t.type?(t.type=2,a="即时通讯"):(t.type=1,a="机器人"),n=t.$createElement,t.$notify({offset:100,duration:2e3,title:"切换成功",message:n("i",{style:"color: teal; font-style: normal;"},"(｡･∀･)ﾉﾞ当前是"+a+"~")}),t.value="",t.$refs.input.innerText="",t.$refs.input.focus(),e.abrupt("return");case 9:if(1!==t.type){e.next=26;break}return t.data.push({send:t.value,status:0}),t.$refs.input.innerText="",t.bottomSetting(),e.prev=13,e.next=16,axios({method:"get",url:"/robot?key=free&appid=0&msg="+encodeURI(t.value)});case 16:i=e.sent,0===(c=i.data).result&&(t.reply=c.content,t.data.push({reply:c.content,status:1}),t.bottomSetting()),e.next=24;break;case 21:e.prev=21,e.t0=e.catch(13),console.log(e.t0);case 24:e.next=29;break;case 26:o=r()({id:t.id,content:t.value}),d.send(o),t.$refs.input.innerText="";case 29:t.value="",t.$refs.input.focus();case 31:case"end":return e.stop()}},e,t,[[13,21]])}))()},textChange:function(){this.value=this.$refs.input.innerText},bottomSetting:function(){var t=this;this.$nextTick(function(){t.$refs.show.scrollIntoView()})},websoket:function(){var t=this;window.WebSocket&&(d.onopen=function(t){},d.onclose=function(t){},d.onerror=function(){},d.onmessage=function(e){var a=JSON.parse(e.data);if(t.id||(t.id=a.id,t.chatRecord=a.chatRecord||[],t.onlineNumber=a.length),1===a.type)a.content&&t.chatRecord.push(a),t.bottomSetting();else{var n=t.$createElement,s=2===a.type?"登录":"跑";t.onlineNumber=a.length,t.$notify({offset:100,duration:2e3,title:"有新消息~",message:n("i",{style:"color: teal; font-style: normal;"},"(｡･∀･)ﾉﾞ嗨！有人"+s+"了噢~")})}})}}},v={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"robot"},[a("div",{staticClass:"content"},[1===t.type?[t._l(t.data,function(e,n){return[a("div",{key:n},[0===e.status?a("div",{staticClass:"rc-left clearfix"},[a("div",{staticClass:"head-portrait"}),t._v(" "),a("div",{staticClass:"rcl-content"},[t._v(t._s(e.send))])]):a("div",{staticClass:"rc-right clearfix"},[a("div",{staticClass:"head-portrait"}),t._v(" "),a("div",{staticClass:"rcl-content"},[t._v(t._s(e.reply))])])])]})]:[t.onlineNumber?a("div",{staticClass:"title"},[t._v("在线人数："+t._s(t.onlineNumber))]):t._e(),t._v(" "),t._l(t.chatRecord,function(e,n){return[a("div",{key:n},[t.id===e.id?a("div",{staticClass:"rc-right clearfix"},[e.headPortraitUrl?a("img",{staticClass:"head-portrait",attrs:{src:t.Global.baseURL+e.headPortraitUrl,alt:"头像"}}):t._e(),t._v(" "),a("div",{staticClass:"rcl-content"},[t._v(t._s(e.content))])]):a("div",{staticClass:"rc-left clearfix"},[e.headPortraitUrl?a("img",{staticClass:"head-portrait",attrs:{src:t.Global.baseURL+e.headPortraitUrl,alt:"头像"}}):t._e(),t._v(" "),a("div",{staticClass:"rcl-content"},[t._v(t._s(e.content))])])])]})],t._v(" "),a("div",{ref:"show",staticClass:"show"})],2),t._v(" "),a("div",{staticClass:"input-box clearfix"},[a("p",{staticClass:"tips"},[t._v("发送：/switch 即可切换“机器人”或“即时聊天”功能~")]),t._v(" "),a("div",{ref:"input",staticClass:"input",attrs:{contenteditable:"true",placeholder:"面朝大海，春暖花开。"},on:{input:t.textChange}}),t._v(" "),a("button",{on:{click:t.send}},[t._v("发送")])])])},staticRenderFns:[]};var f=a("VU/8")(u,v,!1,function(t){a("fQ0O")},"data-v-c07d2cde",null);e.default=f.exports},fQ0O:function(t,e){}});