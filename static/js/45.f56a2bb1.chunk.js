(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[45],{269:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var n={INPUT:"input",MULTIPLE_CHECKBOX:"MULTIPLE_CHECKBOX",INPUT_NUMBER:"input-number",PASSWORD:"password",TEXTAREA:"textarea",MARKDOWN:"markdown",SELECT:"select",CAPTCHA:"captcha",MONTH_PICKER:"month-picker",FILE_DRAG_DROP:"file-drag-drop",RANGE_PICKER:"range-picker",RADIO:"radio",SWITCH:"switch",HIDDEN:"hidden",DATE:"date",CASCADER:"cascader"};n.CAPTCHA},320:function(e,t,a){"use strict";a(346);var n=a(357),l=(a(347),a(354)),r=(a(323),a(280)),s=(a(348),a(355)),c=(a(349),a(356)),o=(a(281),a(282)),i=(a(172),a(277)),u=(a(314),a(276)),m=(a(324),a(279)),p=a(0),y=a.n(p),f=a(431),E=a(269),b=m.a.Option,d=u.a.Group,k={name:"file",action:function(e){return new Promise((function(t,a){setTimeout((function(){var a=new FileReader;a.addEventListener("load",(function(){t(a.result)}),!1),e&&a.readAsDataURL(e)}),1e3)}))}};t.a=function(e){var t=e.key,a=e.rules,p=e.kwargs,h=e.type,g=e.others,O=e.customLabel,C=e.noLabel,S={};switch(g&&g.formOptions&&(S=g.formOptions),h){case E.a.INPUT:return y.a.createElement(o.a.Item,Object.assign({key:t,label:C?null:O||t.charAt(0).toUpperCase()+t.slice(1),name:t,rules:a},S),y.a.createElement(i.a,Object.assign({},p,{size:"middle"})));case E.a.INPUT_NUMBER:return y.a.createElement(o.a.Item,Object.assign({key:t,label:C?null:O||t.charAt(0).toUpperCase()+t.slice(1),name:t,rules:a},S),y.a.createElement(c.a,Object.assign({},p,{size:"middle"})));case E.a.FILE_DRAG_DROP:return y.a.createElement(o.a.Item,Object.assign({key:t,label:C?null:O||t.charAt(0).toUpperCase()+t.slice(1),name:t,rules:a},S),y.a.createElement(s.a.Dragger,Object.assign({},p,k,{style:{maxHeight:"75px",width:"150px"}}),y.a.createElement("p",{className:"ant-upload-drag-icon"},y.a.createElement(f.a,{type:"inbox"})),g?y.a.createElement(y.a.Fragment,null,y.a.createElement("p",{className:"ant-upload-text p-1"},g.p1),y.a.createElement("p",{className:"ant-upload-hint p-1"},g.p2)):null));case E.a.SELECT:return y.a.createElement(o.a.Item,Object.assign({shouldUpdate:!0,key:t,label:C?null:O||t.charAt(0).toUpperCase()+t.slice(1),name:t,rules:a},S),y.a.createElement(m.a,p,g.selectOptions.map((function(e,t){return y.a.createElement(b,{key:t.toString(),search:e[g.customTitle],value:e.value||e[g.key]||e},g.customTitle?y.a.createElement("text",{style:{fontSize:13,fontWeight:"bold"}},e[g.customTitle]):e.label||e[g.key]||e,g.dataKeys?y.a.createElement("div",{className:"row",style:{flexWrap:"wrap"}},g.dataKeys.map((function(t){return y.a.createElement("text",{style:{fontSize:11,marginLeft:5,marginRight:5}},e[t])}))):null)}))));case E.a.RADIO:return y.a.createElement(o.a.Item,Object.assign({key:t,label:C?null:O||t.charAt(0).toUpperCase()+t.slice(1),name:t,rules:a},S),y.a.createElement(r.a.Group,{value:"Ggg"},g.radioOptions.map((function(e){return y.a.createElement(r.a,{key:e.value,value:e.value},e.label)}))));case E.a.DATE:return y.a.createElement(o.a.Item,Object.assign({key:t},S,{label:C?null:O||t.charAt(0).toUpperCase()+t.slice(1),name:t,rules:a}),y.a.createElement(l.a,{onChange:function(e){}}));case E.a.MULTIPLE_CHECKBOX:return y.a.createElement(o.a.Item,Object.assign({key:t,label:C?null:O||t.charAt(0).toUpperCase()+t.slice(1),name:t,rules:a},S),y.a.createElement(d,{onChange:g.onChange},g.checkOptions.map((function(e){return y.a.createElement(u.a,{value:e.value},e.label)}))));case E.a.SWITCH:return y.a.createElement(o.a.Item,Object.assign({key:t,valuePropName:"checked"},S,{label:C?null:O||t.charAt(0).toUpperCase()+t.slice(1),name:t,rules:a}),y.a.createElement(n.a,p));default:return null}}},716:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var n=a(269),l=[{key:"solution_flc",type:n.a.SWITCH,others:{defaultValue:!1,formOptions:{noStyle:!0}},customLabel:"FLC"},{key:"solution_fsc",type:n.a.SWITCH,others:{defaultValue:!1,formOptions:{noStyle:!0}},customLabel:"FSC"},{key:"solution_crate",type:n.a.SWITCH,others:{defaultValue:!1,formOptions:{noStyle:!0}},customLabel:"Crate"},{key:"solution_ppbox",type:n.a.SWITCH,others:{defaultValue:!1,formOptions:{noStyle:!0}},customLabel:"PP Box"},{key:"solution_pp",type:n.a.SWITCH,others:{defaultValue:!1,formOptions:{noStyle:!0}},customLabel:"Plastic Pallet"},{key:"solution_palletized_crate",type:n.a.SWITCH,others:{defaultValue:!1,formOptions:{noStyle:!0}},customLabel:"Palletized Crate"},{key:"solution_palletized_box",type:n.a.SWITCH,others:{defaultValue:!1,formOptions:{noStyle:!0}},customLabel:"Palletized Box Solution"},{key:"solution_wp",others:{defaultValue:!1,formOptions:{noStyle:!0}},type:n.a.SWITCH,customLabel:"Wooden Pallet"},{key:"solution_stacking_nesting",type:n.a.SWITCH,customLabel:"Stacking or Nesting of parts",others:{defaultValue:!1,formOptions:{noStyle:!0}}},{key:"p2p_contact",type:n.a.INPUT,customLabel:"Part to Part Contact Permissible?",kwargs:{placeholder:"Part to Part Contact Permissible"},others:{formOptions:{noStyle:!0}}},{key:"mul_parts_single_pocket",type:n.a.INPUT,kwargs:{placeholder:"Multiple Parts in Single Packet"},customLabel:"Multiple Parts in Single Packet",others:{formOptions:{noStyle:!0}}},{key:"min_max_margin",kwargs:{placeholder:"Min/Max Margin from Wall"},others:{formOptions:{noStyle:!0}},type:n.a.INPUT,customLabel:"Min/Max Margin from Wall"},{key:"other_spec",kwargs:{placeholder:"Other Specification"},others:{formOptions:{noStyle:!0}},type:n.a.INPUT,customLabel:"Other Specification"},{key:"parts_orientation",kwargs:{placeholder:"Part Orientation"},others:{formOptions:{noStyle:!0}},type:n.a.INPUT,customLabel:"Part Orientation"},{key:"parts_pm",kwargs:{placeholder:"Parts/PM"},others:{formOptions:{noStyle:!0}},type:n.a.INPUT,customLabel:"Parts/PM"}]},855:function(e,t,a){"use strict";a.r(t),a.d(t,"PFEPSolutionRequiredForm",(function(){return I}));a(267);var n=a(268),l=(a(175),a(117)),r=(a(101),a(62)),s=(a(270),a(272)),c=(a(271),a(273)),o=(a(171),a(103)),i=a(55),u=a.n(i),m=a(85),p=(a(281),a(282)),y=a(102),f=(a(181),a(49)),E=a(0),b=a.n(E),d=a(320),k=a(52),h=a(27),g=a(716),O=a(297),C=a(299),S=a(296),P=f.a.Item,I=function(e){var t=e.onCancel,a=e.active,i=e.onNext,I=Object(E.useState)(!1),T=Object(y.a)(I,2),v=T[0],L=T[1],N=Object(E.useState)(!1),_=Object(y.a)(N,2),j=_[0],w=_[1],A=p.a.useForm(),U=Object(y.a)(A,1)[0],R=Object(k.c)(),x=Object(k.d)((function(e){return e.data.pfepData})),H=function(){var e=Object(m.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return L(!0),e.next=3,R({type:h.b,data:t});case 3:L(!1),4===a&&i();case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(E.useEffect)((function(){4!==a&&(U.submit(),R({type:h.k}))}),[a]);var W=b.a.createElement(f.a,{onClick:function(e){"close"===e.key&&w(!1)}},b.a.createElement(P,{key:"close"},b.a.createElement("div",{className:"row justify-between align-center"},"Close",b.a.createElement(O.a,null))),g.a.slice(0,9).map((function(e,t){return b.a.createElement(P,{key:t.toString()},b.a.createElement("div",{className:"row justify-between"},b.a.createElement("div",{style:{flexWrap:"wrap",marginRight:"5px"}},e.customLabel," "),Object(d.a)(e)))})));return b.a.createElement(n.a,{spinning:v},b.a.createElement(o.a,{orientation:"left"},"Solution Required"),b.a.createElement(p.a,{onFinish:H,form:U,initialValues:x,layout:"vertical",autoComplete:"off"},b.a.createElement(s.a,{style:{justifyContent:"left"}},g.a.slice(9,10).map((function(e,t){return b.a.createElement(c.a,{span:4},b.a.createElement("div",{key:t.toString(),className:"p-2"},e.customLabel))})),g.a.slice(10,14).map((function(e,t){return b.a.createElement(c.a,{span:5},b.a.createElement("div",{key:t.toString(),className:"p-2"},e.customLabel))}))),b.a.createElement(s.a,{style:{justifyContent:"left"}},g.a.slice(9,10).map((function(e,t){return b.a.createElement(c.a,{span:4},b.a.createElement("div",{key:t.toString(),className:"p-2"},Object(d.a)(e)))})),g.a.slice(10,14).map((function(e,t){return b.a.createElement(c.a,{span:5},b.a.createElement("div",{key:t.toString(),className:"p-2"},Object(d.a)(e)))}))),b.a.createElement(s.a,{style:{justifyContent:"left"}},g.a.slice(14,15).map((function(e,t){return b.a.createElement(c.a,{span:5},b.a.createElement("div",{key:t.toString(),className:"p-2"},e.customLabel))}))),b.a.createElement(s.a,{style:{justifyContent:"left"}},g.a.slice(14,15).map((function(e,t){return b.a.createElement(c.a,{span:5},b.a.createElement("div",{key:t.toString(),className:"p-2"},Object(d.a)(e)))})),b.a.createElement(c.a,{span:5},b.a.createElement("div",{className:"p-2"},b.a.createElement(l.a,{trigger:["click"],overlay:W,onVisibleChange:function(e){w(e)},visible:j},b.a.createElement(r.a,{className:"ant-dropdown-link",onClick:function(e){return e.preventDefault()}},"Solution Required"," ",b.a.createElement(C.a,null)))),b.a.createElement("br",null),b.a.createElement("br",null),b.a.createElement("br",null))),b.a.createElement(s.a,{justify:"space-between"},b.a.createElement("div",{className:"row"},b.a.createElement(r.a,{type:"primary",htmlType:"submit",disabled:!0},"Submit"),b.a.createElement("div",{className:"p-2"}),b.a.createElement(r.a,{type:"primary",onClick:t},"Cancel")),b.a.createElement(r.a,{type:"link",htmlType:"submit"},b.a.createElement(S.a,{style:{fontSize:30}})))))};t.default=I}}]);
//# sourceMappingURL=45.f56a2bb1.chunk.js.map