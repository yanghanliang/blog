webpackJsonp([18],{"F6S/":function(t,i){},eR2I:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s={mounted:function(){this.init()},methods:{init:function(){var t=function(t){this.box=document.querySelector(t.ele),this.ul=this.box.querySelector("ul"),this.liAll=this.ul.querySelectorAll("li"),this.li=this.liAll[0],this.liWidth=this.li.getBoundingClientRect().width,this.ulInfo=this.ul.getBoundingClientRect(),this.slider=this.box.querySelector(".slider"),this.sliderWidth=this.slider.getBoundingClientRect().width,this.borderRight=this.getStyle(this.li,"borderRight"),this.isDown=!1,this.color=["#5CE394","#56DE8D","#51DB86","#4BD67F","#46D278","#41CF71","#3CCC6C","#37C765","#31C35D","#31C35D"],this.index=0,this.defaultColor="#DDDDDD",this.init()};t.prototype.init=function(){this.clickUl(),this.mousedown(),this.mousemove(),this.mouseup()},t.prototype.clickUl=function(){var t=this;this.ul.addEventListener("click",function(i){t.move(i)})},t.prototype.setColor=function(){for(var t=0;t<this.color.length;t++)-1===this.index?this.liAll[t].style.backgroundColor=this.defaultColor:t<=this.index?this.liAll[t].style.backgroundColor=this.color[t]:this.liAll[t].style.backgroundColor=this.defaultColor},t.prototype.mousedown=function(){var t=this;this.slider.addEventListener("mousedown",function(i){t.isDown=!0})},t.prototype.mousemove=function(){var t=this;window.addEventListener("mousemove",function(i){!1!==t.isDown&&(t.slider.style.left=i.clientX-t.sliderWidth+"px",t.move(i))})},t.prototype.mouseup=function(){var t=this;document.addEventListener("mouseup",function(){t.isDown=!1})},t.prototype.move=function(t){var i=t.clientX-this.ulInfo.x,e=Math.floor(i/this.liWidth),s=i%this.liWidth,l=0;s=s>this.liWidth/2?0:-1,this.index=e+s,-1===this.index?l=(l=this.liAll[0].offsetLeft)-this.borderRight-this.sliderWidth/2:(this.index<0?this.index=0:this.index>9&&(this.index=9),l=(l=this.liAll[this.index].offsetLeft)+this.liWidth-this.borderRight-this.sliderWidth/2),this.slider.style.left=l+"px",this.setColor()},t.prototype.getStyle=function(t,i){if(window.getComputedStyle){var e=window.getComputedStyle(t,null)[i],s=e.indexOf("px");return Number(e.slice(0,s))}return t.currentStyle},new t({ele:".slider-box"})}}},l={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"slider-box"},[e("ul",[e("li"),t._v(" "),e("li"),t._v(" "),e("li"),t._v(" "),e("li"),t._v(" "),e("li"),t._v(" "),e("li"),t._v(" "),e("li"),t._v(" "),e("li"),t._v(" "),e("li"),t._v(" "),e("li")]),t._v(" "),e("div",{staticClass:"slider"})])}]};var o={components:{mySlider:e("VU/8")(s,l,!1,function(t){e("F6S/")},"data-v-6996df32",null).exports}},n={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",[i("div",{staticClass:"cb-content"},[i("my-slider")],1)])},staticRenderFns:[]};var r=e("VU/8")(o,n,!1,function(t){e("tYmE")},null,null);i.default=r.exports},tYmE:function(t,i){}});