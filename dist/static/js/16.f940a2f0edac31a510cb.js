webpackJsonp([16],{KxtW:function(t,e){},fZ2C:function(t,e){},pwMf:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("Ek6N"),i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("section",{staticClass:"layout-left"},[t._t("layout-left",function(){return[t._v("layout-left")]})],2),t._v(" "),n("section",{staticClass:"layout-right"},[t._t("layout-right",function(){return[t._v("layout-right")]})],2)])},staticRenderFns:[]};var a=n("VU/8")({name:"rightAuto"},i,!1,function(t){n("fZ2C")},"data-v-78c41076",null).exports,r={name:"componentsViews",components:{logo:o.a,rightAuto:a},data:function(){return{navList:[{className:"canvas",children:[{route:"progress",text:"progress 进度条"},{route:"imageclipper",text:"imageClipper 图片裁剪"},{route:"contractseal",text:"signature 签章"}]},{className:"小玩意",children:[{route:"circular",text:"随机分布 圆"},{route:"square",text:"随机分布 方形"},{route:"filters",text:"自己封装的过滤器"}]},{className:"dom",children:[{route:"slider",text:"滑块"},{route:"tag",text:"编辑标签"}]},{className:"svg",children:[{route:"connection",text:"connection 连线"}]},{className:"二次封装",children:[{route:"echarts",text:"myEcharts"}]},{className:"demo",children:[{route:"demo1",text:"demo1"}]}]}},mounted:function(){},beforeDestroy:function(){},methods:{refreshCircular:function(t){var e=this;this[t]=!1,this.$nextTick(function(){e[t]=!0})},effect:function(){!function(){var t,e,n,o=void 0,i=void 0,a=document.createElement("canvas"),r=a.getContext("2d"),c=(t=document.getElementsByTagName("script"),e=t.length,n=t[e-1],{length:e,z:n.getAttribute("zIndex")||-1,opacity:n.getAttribute("opacity")||.5,color:n.getAttribute("color")||"0,0,0",count:n.getAttribute("count")||99});function s(){o=a.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,i=a.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}a.id="c_n"+c.length,a.className="effect",a.style.cssText="position:fixed;top:0;left:0;z-index:"+c.z+";opacity:"+c.opacity,document.getElementsByTagName("body")[0].appendChild(a),s(),window.onresize=s;for(var l=Math.random,u=[],m=0;m<c.count;m++){var d=l()*o,f=l()*i,x=2*l()-1,y=2*l()-1;u.push({x:d,y:f,xa:x,ya:y,max:6e3})}var h={x:null,y:null,max:2e4};window.onmousemove=function(t){t=t||window.event,h.x=t.clientX,h.y=t.clientY},window.onmouseout=function(){h.x=null,h.y=null};var v=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/45)};function g(){r.clearRect(0,0,o,i);var t,e,n=[h].concat(u);u.forEach(function(a){a.x+=a.xa,a.y+=a.ya,a.xa=a.xa*(a.x>o||a.x<0?-1:1),a.ya=a.ya*(a.y>i||a.y<0?-1:1),r.fillRect(a.x-.5,a.y-.5,1,1);for(var s=0;s<n.length;s++)if(a!==(t=n[s])&&null!==t.x&&null!==t.y){var l=a.x-t.x,u=a.y-t.y,m=l*l+u*u;m<t.max&&(t===h&&m>t.max/2&&(a.x=a.x-.03*l,a.y=a.y-.03*u),e=(t.max-m)/t.max,r.beginPath(),r.lineWidth=e/2,r.strokeStyle="rgba("+c.color+","+(e+.2)+")",r.moveTo(a.x,a.y),r.lineTo(t.x,t.y),r.stroke())}n.splice(n.indexOf(a),1)}),v(g)}setTimeout(function(){g()},100)}()},removeCanvas:function(){document.querySelector(".effect").remove()}}},c={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("right-auto",{staticClass:"components"},[n("div",{staticClass:"left-box",attrs:{slot:"layout-left"},slot:"layout-left"},[n("logo",{staticClass:"logo"}),t._v(" "),t._l(t.navList,function(e,o){return n("ul",{key:o},[n("span",{staticClass:"lb-class"},[t._v(t._s(e.className))]),t._v(" "),t._l(e.children,function(e,o){return n("li",{key:o,class:{active:t.$route.path.includes(e.route)}},[n("router-link",{attrs:{to:e.route}},[t._v(t._s(e.text))])],1)})],2)})],2),t._v(" "),n("router-view",{attrs:{slot:"layout-right"},slot:"layout-right"})],1)},staticRenderFns:[]};var s=n("VU/8")(r,c,!1,function(t){n("KxtW")},"data-v-4086cb5e",null);e.default=s.exports}});