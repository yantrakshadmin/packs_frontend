(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[10],{101:function(e,t,n){"use strict";n.r(t),n.d(t,"NotFound404Screen",(function(){return u}));n(106);var a=n(65),r=n(0),o=n.n(r),l=(n(268),n(49)),u=function(){return o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"image",style:{backgroundImage:"url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",height:"400px",backgroundPosition:"center"}}),o.a.createElement("div",{className:"content"},o.a.createElement("h1",null,"404"),o.a.createElement("h2",null,"Page Not Found"),o.a.createElement(a.a,{onClick:function(){return Object(l.c)("/")}},"Return To Home")))};t.default=u},132:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n(34),r=function(e){return{type:a.b,payload:e}}},149:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return o}));var a=n(34),r=function(e){return{type:a.h,payload:e}},o=function(){return{type:a.d}}},164:function(e,t,n){e.exports=n.p+"static/media/Yantraksh Logo.87d0dc2b.png"},188:function(e,t,n){e.exports=n(269)},193:function(e,t,n){},194:function(e,t,n){},268:function(e,t,n){},269:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(12),l=n.n(o),u=(n(193),n(194),n(187),n(56)),c=n(159),i=n(59),s=n.n(i),m=n(88),p=n(104),d={get:function(){var e=Object(m.a)(s.a.mark((function e(t,n){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",p.reactLocalStorage.getObject(t,n));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),set:function(){var e=Object(m.a)(s.a.mark((function e(t,n){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",p.reactLocalStorage.setObject(t,n));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),delete:function(){var e=Object(m.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",p.reactLocalStorage.remove(t));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()};window.storage=d;var b=n(45),f=n(160),h=n(119),y=n(161),g=n.n(y),E=n(40),O=n(34),j={loading:!1,userMeta:{type:"public"},error:""},C={products:[],pfepData:{}},P={currentPage:1},v=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||b.d,k={key:"root",storage:g.a},S=Object(b.c)({user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,t=arguments.length>1?arguments[1]:void 0,n=function(t){return Object(E.a)(Object(E.a)({},e),t)};switch(t.type){case O.f:return n({loading:!0});case O.e:return n({loading:!1,userMeta:null,error:t.payload});case O.g:return n({loading:!1,error:"",userMeta:t.payload});case O.h:return n({loading:!1,userMeta:t.payload,error:""});case O.d:return j;default:return e}},data:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case O.c:return Object(E.a)(Object(E.a)({},e),{},{products:t.payload});case O.a:return Object(E.a)(Object(E.a)({},e),{},{pfepData:Object(E.a)({},t.data)});default:return e}},page:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case O.b:return Object(E.a)(Object(E.a)({},e),{},{currentPage:t.payload});default:return e}}}),z=Object(h.a)(k,S),w=Object(b.e)(z,v(Object(b.a)(f.a))),M=Object(h.b)(w),N=n(95),R=n(49),_=[{Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(4),n.e(5),n.e(37)]).then(n.bind(null,618))})),path:"/"},{Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(35)]).then(n.bind(null,594))})),path:"/sign-up/client/"},{Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(36)]).then(n.bind(null,595))})),path:"/sign-up/employee/"},{path:"*",Component:Object(a.lazy)((function(){return Promise.resolve().then(n.bind(null,101))}))}],x=[{path:"/edit-profile/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(4),n.e(31)]).then(n.bind(null,596))}))},{path:"*",Component:Object(a.lazy)((function(){return Promise.resolve().then(n.bind(null,101))}))}],A=[{path:"/docket/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(6),n.e(5),n.e(38)]).then(n.bind(null,597))}))},{path:"/return-docket/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(6),n.e(5),n.e(9)]).then(n.bind(null,598))}))}],D=[{path:"/return-docket/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(6),n.e(5),n.e(9)]).then(n.bind(null,598))}))}],I=[{path:"/edit-profile/",Component:Object(a.lazy)((function(){return Promise.resolve().then(n.bind(null,101))}))},{path:"/return-dockets/return/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(4),n.e(30)]).then(n.bind(null,478))}))},{path:"*",Component:Object(a.lazy)((function(){return Promise.resolve().then(n.bind(null,101))}))},{path:"/create-allotment/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(4),n.e(32)]).then(n.bind(null,621))}))}],T=[{name:"Dashboard",icon:["fas","home"],path:"/dashboard/",Component:Object(a.lazy)((function(){return Promise.resolve().then(n.bind(null,101))}))},{name:"Masters",icon:["fas","layer-group"],path:"/masters/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(7)]).then(n.bind(null,610))})),isSubMenu:!0,subMenu:[{name:"Products",path:"/master/products/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(7)]).then(n.bind(null,610))}))},{name:"Kits",path:"/master/kits/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(19)]).then(n.bind(null,613))}))},{name:"Flows",path:"/master/flows/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(18)]).then(n.bind(null,616))}))},{name:"Sender Clients",path:"/master/clients/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(25)]).then(n.bind(null,624))}))},{name:"Receiver Clients",path:"/master/receiver-clients/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(23)]).then(n.bind(null,614))}))},{name:"Warehouses",path:"/master/warehouses/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(17)]).then(n.bind(null,615))}))},{name:"Vendors",path:"/master/vendors/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(24)]).then(n.bind(null,611))}))}]},{name:"Material Requests",icon:["fas","layer-group"],path:"/material-request/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(34)]).then(n.bind(null,631))}))},{name:"Allotment Dockets",icon:["fas","layer-group"],path:"/allotment-dockets/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(14)]).then(n.bind(null,617))}))},{name:"Return Dockets",icon:["fas","layer-group"],path:"/return-dockets/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(13)]).then(n.bind(null,619))}))},{name:"GRN",icon:["fas","layer-group"],path:"/grn/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(15)]).then(n.bind(null,608))}))},{name:"PFEP",icon:["fas","layer-group"],path:"/reports/",isSubMenu:!0,subMenu:[{name:"Leads Master",path:"/pfep/leads/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(21)]).then(n.bind(null,599))}))},{name:"Create PFEP",path:"/pfep/create/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(16)]).then(n.bind(null,609))}))}]},{name:"Reports",icon:["fas","layer-group"],path:"/reports/",isSubMenu:!0,subMenu:[{name:"Allotments",path:"/reports/allotments/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(26)]).then(n.bind(null,600))}))},{name:"Returns",path:"/reports/returns/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(28)]).then(n.bind(null,620))}))},{name:"Stocking",path:"/reports/stocking/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(27)]).then(n.bind(null,601))}))}]}],F=[{name:"Masters",icon:["fas","layer-group"],path:"/masters/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(8)]).then(n.bind(null,602))})),isSubMenu:!0,subMenu:[{name:"Kits",icon:["fas","layer-group"],path:"/kits/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(8)]).then(n.bind(null,602))}))},{name:"Client Flows",icon:["fas","layer-group"],path:"/client-flows/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(33)]).then(n.bind(null,603))}))}]},{name:"Material Requests",icon:["fas","layer-group"],path:"/material-request/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(22)]).then(n.bind(null,612))}))},{name:"My Allotments",icon:["fas","layer-group"],path:"/allotments/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(20)]).then(n.bind(null,604))}))},{name:"Return Reports",icon:["fas","layer-group"],path:"/return-reports/",Component:Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(29)]).then(n.bind(null,605))}))}],L=(n(177),n(108)),U=(n(181),n(125)),G=(n(208),n(175)),H=n(107),q=(n(180),n(131)),K=(n(214),n(58)),Y=(n(216),n(54)),J=n(149),V=n(132),W=n(164),X=n.n(W),B=n(117),Q=Y.a.SubMenu,Z=K.a.Header,$=K.a.Content,ee=K.a.Sider,te=K.a.Footer,ne=q.a.Text,ae=Object(u.b)((function(e){return{user:e.user.userMeta}}),{changePage:V.a})((function(e){var t=e.routes,n=e.navigate,o=e.children,l=e.user,c=e.changePage,i=Object(a.useState)(!1),s=Object(H.a)(i,2),m=s[0],p=s[1],d=Object(a.useState)(80),b=Object(H.a)(d,2),f=b[0],h=b[1],y=Object(u.c)(),g=r.a.createElement(Y.a,null,r.a.createElement(Y.a.Item,{key:"0"},r.a.createElement(R.a,{to:"/".concat(l.type,"/edit-profile/")},"Edit Profile")),r.a.createElement(Y.a.Divider,null),r.a.createElement(Y.a.Item,{key:"1",onClick:function(){return y(Object(J.a)()),void n("../")}},r.a.createElement(ne,{type:"danger"},"Log Out")));return r.a.createElement(K.a,{className:""},r.a.createElement(Z,{className:"header row align-center justify-between",style:{backgroundColor:"#fff",paddingLeft:20,paddingRight:20}},r.a.createElement("div",{className:"bg-white m-0 row align-center"},r.a.createElement("img",{style:{height:"33px",width:"135px",position:"absolute"},alt:"Yantraksh",src:X.a})),r.a.createElement(U.a,{overlay:g,trigger:["click"]},r.a.createElement("div",{className:"row align-center"},r.a.createElement("p",{className:"m-2"},l.name),r.a.createElement(G.a,{size:"large",src:l.dp})))),r.a.createElement(L.a,{style:{margin:0,padding:0}}),r.a.createElement(K.a,null,r.a.createElement(ee,{collapsible:!0,width:200,collapsedWidth:f,onCollapse:function(){h(80),p(!m)},className:"site-layout-background"},r.a.createElement(Y.a,{theme:"dark",mode:"inline",inlineCollapsed:!0,defaultSelectedKeys:[t[0].name],defaultOpenKeys:[t[0].name],style:{height:"100%",borderRight:0}},t.map((function(e){return e.subMenu?r.a.createElement(Q,{key:e.name,icon:r.a.createElement(B.a,{icon:e.icon,style:{marginRight:m?50:5}}),title:e.name},e.subMenu.map((function(e){return r.a.createElement(Y.a.Item,{key:e.name},r.a.createElement(R.a,{to:"/".concat(l.type).concat(e.path),key:e.name,onClick:function(){return c(1)}},e.name))}))):r.a.createElement(Y.a.Item,{key:e.name,icon:r.a.createElement(B.a,{icon:e.icon,style:{marginRight:m?50:5}})},r.a.createElement(R.a,{to:"/".concat(l.type).concat(e.path),key:e.name,onClick:function(){return c(1)}},e.name))})))),r.a.createElement(K.a,{style:{padding:"24px"}},r.a.createElement(a.Suspense,{fallback:r.a.createElement(N.a,null)},r.a.createElement($,{className:"site-layout-background content-style",style:{minHeight:"calc( 100vh - 184px )"}},o)),r.a.createElement(te,{className:"row justify-end "},r.a.createElement("span",null,r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://yantraksh.com"},"Yantraksh Logistics Pvt. Ltd.")," ","\xa9 All rights reserved")))),r.a.createElement(L.a,{style:{margin:0,padding:0}}))})),re=function(e){var t=e.navigate,n=e.user;return Object(a.useEffect)((function(){t("/".concat(n.type,"/dashboard/"))}),[n.type,t]),null},oe=n(101),le=function(e){var t=e.routes,n=e.extraRoutes,a=e.user,o=e.outerRoutes;return r.a.createElement(R.b,null,r.a.createElement(re,{path:"/",user:a}),o?o.map((function(e,t){return r.a.createElement(e.Component,{path:"/".concat(a.type).concat(e.path),key:t.toString()})})):null,r.a.createElement(ae,{path:"/".concat(a.type,"/"),routes:t},t.map((function(e,t){return r.a.createElement(e.Component,{path:"".concat(e.path),key:t.toString()})})),t.map((function(e){return e.subMenu?e.subMenu.map((function(e,t){return r.a.createElement(e.Component,{path:"".concat(e.path),key:t.toString()})})):null})),n?n.map((function(e,t){return r.a.createElement(e.Component,{path:"".concat(e.path),key:t.toString()})})):null,r.a.createElement(oe.NotFound404Screen,{default:!0})))},ue=Object(u.b)((function(e){return{user:e.user.userMeta}}))((function(e){var t=e.user;if(t)switch(t.type){case"public":return r.a.createElement(R.b,null,_.map((function(e,t){return r.a.createElement(e.Component,{path:e.path,key:t.toString()})})),r.a.createElement(oe.NotFound404Screen,{default:!0}));case"employee":return r.a.createElement(le,{routes:T,extraRoutes:I,outerRoutes:A,user:t});case"client":return r.a.createElement(le,{routes:F,extraRoutes:x,outerRoutes:D,user:t});default:return null}}));var ce=function(){return r.a.createElement(u.a,{store:w},r.a.createElement(c.a,{persistor:M},r.a.createElement(a.Suspense,{fallback:r.a.createElement(N.a,null)},r.a.createElement(ue,null))))},ie=n(84),se=n(172),me=n(173),pe=n(174);ie.b.add(se.a,me.a,pe.a),l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ce,null)),document.getElementById("root"))},34:function(e,t,n){"use strict";n.d(t,"f",(function(){return a})),n.d(t,"e",(function(){return r})),n.d(t,"g",(function(){return o})),n.d(t,"h",(function(){return l})),n.d(t,"d",(function(){return u})),n.d(t,"c",(function(){return c})),n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return s}));var a="SIGN_UP_START",r="SIGN_UP_FAILURE",o="SIGN_UP_SUCCESS",l="USER_AUTHENTICATED",u="SIGN_OUT_USER",c="FETCH_PRODUCTS",i="CHANGE_PAGE",s="ADD_PFEP_DATA"},95:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var a=n(0),r=n.n(a),o=n(179),l=function(){return r.a.createElement("div",{className:"column h-100 w-100 align-center justify-center"},r.a.createElement("div",{className:"m-2"},r.a.createElement(o.a,{style:{fontSize:30}})),r.a.createElement("p",null,"Loading..."))}}},[[188,11,12]]]);
//# sourceMappingURL=main.45cdca51.chunk.js.map