(function(t){function n(n){for(var a,c,i=n[0],s=n[1],u=n[2],p=0,f=[];p<i.length;p++)c=i[p],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&f.push(r[c][0]),r[c]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a]);l&&l(n);while(f.length)f.shift()();return o.push.apply(o,u||[]),e()}function e(){for(var t,n=0;n<o.length;n++){for(var e=o[n],a=!0,i=1;i<e.length;i++){var s=e[i];0!==r[s]&&(a=!1)}a&&(o.splice(n--,1),t=c(c.s=e[0]))}return t}var a={},r={app:0},o=[];function c(n){if(a[n])return a[n].exports;var e=a[n]={i:n,l:!1,exports:{}};return t[n].call(e.exports,e,e.exports,c),e.l=!0,e.exports}c.m=t,c.c=a,c.d=function(t,n,e){c.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,n){if(1&n&&(t=c(t)),8&n)return t;if(4&n&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(c.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var a in t)c.d(e,a,function(n){return t[n]}.bind(null,a));return e},c.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(n,"a",n),n},c.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},c.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=n,i=i.slice();for(var u=0;u<i.length;u++)n(i[u]);var l=s;o.push([0,"chunk-vendors"]),e()})({0:function(t,n,e){t.exports=e("56d7")},"14ac":function(t,n,e){},"56d7":function(t,n,e){"use strict";e.r(n);e("e260"),e("e6cf"),e("cca6"),e("a79d");var a=e("2b0e"),r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-app",[e("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[e("v-icon",[t._v("mdi-share-variant")]),e("v-app-bar-title",{staticClass:"app-title"},[t._v("我的分享")]),e("v-spacer"),e("v-btn",{attrs:{text:""}},[e("v-icon",[t._v("mdi-cloud-upload")])],1),e("v-btn",{attrs:{text:""}},[e("v-icon",[t._v("mdi-content-copy")])],1)],1),e("v-main",[e("ShareList",{attrs:{"data-url":t.shareListURL}})],1)],1)},o=[],c=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("v-list",[e("v-list-item-group",{attrs:{color:"primary"}},t._l(t.items,(function(n,a){return e("v-list-item",{key:a,on:{click:function(){return t.download(n.url)}}},[e("v-list-item-icon",[e("v-icon",{domProps:{textContent:t._s(n.icon)}})],1),e("v-list-item-content",[e("v-list-item-title",{domProps:{textContent:t._s(n.text)}})],1),e("v-list-item-action",[e("v-icon",[t._v("mdi-download")])],1)],1)})),1)],1),e("v-snackbar",{attrs:{timeout:t.snackbar.timeout,color:t.snackbar.color,top:"true"},scopedSlots:t._u([{key:"action",fn:function(n){var a=n.attrs;return[e("v-btn",t._b({attrs:{text:""},on:{click:function(n){t.snackbar.show=!1}}},"v-btn",a,!1),[t._v(" Close ")])]}}]),model:{value:t.snackbar.show,callback:function(n){t.$set(t.snackbar,"show",n)},expression:"snackbar.show"}},[t._v(" "+t._s(t.snackbar.text)+" ")])],1)},i=[],s=e("bc3a"),u=e.n(s),l={name:"ShareList",props:{dataUrl:String},data:function(){return{items:[{text:"Real-Time",icon:"mdi-clock",url:"http://172.16.1.27:12345/shares/1"},{text:"Audience",icon:"mdi-account",url:"http://172.16.1.27:12345/shares/2"},{text:"Conversions",icon:"mdi-flag",url:"http://172.16.1.27:12345/shares/3"}],snackbar:{show:!1,text:"",color:"",timeout:6e3}}},created:function(){this.loadData()},methods:{loadData:function(){var t=this;u.a.get(this.dataUrl).then((function(n){t.$data.items=n})).catch((function(n){t.showError(n.message)}))},download:function(t){window.open(t)},showMessage:function(t){this.snackbar.text=t,this.snackbar.color="#2196f3",this.snackbar.show=!0},showSuccess:function(t){this.snackbar.text=t,this.snackbar.color="#4caf50",this.snackbar.show=!0},showWarning:function(t){this.snackbar.text=t,this.snackbar.color="#ff9800",this.snackbar.show=!0},showError:function(t){this.snackbar.text=t,this.snackbar.color="#f44336",this.snackbar.show=!0}}},p=l,f=e("2877"),h=e("6544"),d=e.n(h),b=e("8336"),v=e("132d"),m=e("8860"),k=e("da13"),w=e("1800"),y=e("5d23"),x=e("1baa"),_=e("34c3"),g=e("2db4"),V=Object(f["a"])(p,c,i,!1,null,null,null),L=V.exports;d()(V,{VBtn:b["a"],VIcon:v["a"],VList:m["a"],VListItem:k["a"],VListItemAction:w["a"],VListItemContent:y["a"],VListItemGroup:x["a"],VListItemIcon:_["a"],VListItemTitle:y["b"],VSnackbar:g["a"]});var O={name:"App",components:{ShareList:L},data:function(){return{shareListURL:"http://localhost:8080/files"}}},S=O,j=(e("6174"),e("7496")),I=e("40dc"),P=e("bb78"),A=e("f6c4"),C=e("2fa4"),M=Object(f["a"])(S,r,o,!1,null,"10a34cd0",null),T=M.exports;d()(M,{VApp:j["a"],VAppBar:I["a"],VAppBarTitle:P["a"],VBtn:b["a"],VIcon:v["a"],VMain:A["a"],VSpacer:C["a"]});var $=e("f309");a["a"].use($["a"]);var B=new $["a"]({theme:{themes:{light:{primary:"#3f51b5",secondary:"#b0bec5",accent:"#8c9eff",error:"#b71c1c"}}}});a["a"].config.productionTip=!1,new a["a"]({vuetify:B,render:function(t){return t(T)}}).$mount("#app")},6174:function(t,n,e){"use strict";e("14ac")}});
//# sourceMappingURL=app.3c390b4d.js.map