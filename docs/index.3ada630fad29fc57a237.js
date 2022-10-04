!function(){"use strict";class t{constructor(t){this.$el="string"==typeof t?document.querySelector(t):t}html(t){return"string"==typeof t?(this.$el.innerHTML=t,this):this.$el.outerHTML}get text(){return this.$el.textContent.trim()}set text(t){return this.$el.textContent=t}get dataset(){return this.$el.dataset}css(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object.keys(t).forEach((e=>{this.$el.style[e]=t[e]}))}getAll(t){let s=this.$el.querySelectorAll(t);const r=[];return s.forEach((t=>{r.push(e(t))})),s=null,r}find(t){return e(this.$el.querySelector(t))}addClass(t){return this.$el.classList.add(t),this}getStyles(t){return t.reduce(((t,e)=>(t[e]=this.$el.style[e],t)),{})}get nodeName(){return this.$el.nodeName}get parent(){return e(this.$el.parentElement)}toggleClass(t){this.$el.classList.toggle(t)}id(){return this.$el.dataset.id}removeClass(t){return this.$el.classList.remove(t),this}clear(){return this.$el.innerHTML="",this}append(t){this.$el.append(t.$el)}on(t,e){this.$el.addEventListener(t,e)}remove(){this.$el.remove()}get value(){return this.$el.value}off(t,e){this.$el.removeEventListener(t,e)}closest(t){return e(this.$el.closest(t))}getCords(){return this.$el.getBoundingClientRect()}}function e(e){return new t(e)}e.create=function(t){let s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";const r=document.createElement(t);return s&&r.classList.add(s),e(r)};class s{static get path(){return window.location.hash.slice(1)}static get param(){return s.path.split("/")}}class r{constructor(t){this.param=t}getRoot(){throw new Error("Need implementation")}afterRender(){}destroy(){}}function n(){const t=function(){const t=[];for(let e=0;e<localStorage.length;e++)if(localStorage.key(e).includes("excel")){const s=localStorage.key(e);t.push({[s]:JSON.parse(localStorage.getItem(s))})}return t}();return t.length?`\n    <ul class="db__list">\n      ${function(t){return t.map((t=>{const e=Object.keys(t)[0],s=t[e].tableName,r=t[e].dateOfOpen;return function(t,e,s){return`\n    <li class="db__record">\n      <a class="db__link" href="#excel/${t}">${e}</a>\n      <strong>${s}</strong>\n    </li>\n  `}(e.split(":")[1],s,r)}))}(t).join("")}\n    </ul>\n  `:"<p>Пока не создано ни одной таблицы</p>"}const o={fontWeight:"normal",fontStyle:"normal",textDecoration:"none",textAlign:"left"};function i(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!e)return JSON.parse(localStorage.getItem(t));localStorage.setItem(t,JSON.stringify(e))}function a(){const t=new Date;return`${t.getDate()>=10?t.getDate():`0${t.getDate()}`}.${t.getMonth()+1>=10?t.getMonth()+1:`0${t.getMonth()+1}`}.${t.getFullYear()}`}function l(t){return!isNaN(Number(t.value[1].slice(0,1)))&&!isNaN(Number(t.value[2].slice(0,1)))}function c(t){return isNaN(Number(t.value[1].slice(0,1)))&&!isNaN(Number(t.value[2].slice(0,1)))}function u(t){return!isNaN(Number(t.value[1].slice(0,1)))&&isNaN(Number(t.value[2].slice(0,1)))}function h(t){return isNaN(Number(t.value[1].slice(0,1)))&&isNaN(Number(t.value[2].slice(0,1)))}class d{constructor(){this.rowState={},this.colState={},this.dataState={},this.stylesState={},this.tableName="Новая Таблица",this.currentText="",this.dateOfOpen=a(),this.currentStyles=o}}i("excelState");const p="TABLE_RESIZE",m="CHANGE_TEXT",b="APPLY_STYLE",v="CHANGE_STYLES",f="CHANGE_TABLE_NAME";function g(t,e){let s,r;switch(e.type){case p:return s="col"===e.data.type?"colState":"rowState",{...t,[s]:y(t,s,e)};case m:return s="dataState",{...t,currentText:e.data.value,[s]:y(t,s,e)};case v:return{...t,currentStyles:e.data};case b:return s="stylesState",r=t[s]||{},e.data.ids.forEach((t=>{r[t]={...r[t],...e.data.value}})),{...t,stylesState:r,currentStyles:{...t.currentStyles,...e.data.value}};case f:return s="tableName",{...t,[s]:e.data};default:return t}}function y(t,e,s){const r=t[e]||{};return r[s.data.id]=s.data.value,r}class ${constructor(){this.listeners={}}emit(t){for(var e=arguments.length,s=new Array(e>1?e-1:0),r=1;r<e;r++)s[r-1]=arguments[r];return!!Array.isArray(this.listeners[t])&&(this.listeners[t].forEach((t=>t(...s))),!0)}subscribe(t,e){return this.listeners[t]=this.listeners[t]||[],this.listeners[t].push(e),()=>{this.listeners[t].filter((t=>t!==e))}}}class w{constructor(t){this.store=t,this.sub=null,this.prevState={}}subscribeComponents(t){this.prevState=this.store.getState(),this.sub=this.store.subscribe((e=>{Object.keys(e).forEach((s=>{var r,n;r=this.prevState[s],n=e[s],("object"==typeof r&&"object"==typeof n?JSON.stringify(r)===JSON.stringify(n):r===n)||t.forEach((t=>{if(t.subscriptions.includes(s)){const r={[s]:e[s]};t.onStoreChanges(r)}}))})),this.prevState=this.store.getState()}))}unsubscribeFromStore(){this.sub.unsubscribe()}}class x{constructor(t){this.components=t.components||[],this.emitter=new $,this.store=t.store,this.subscriber=new w(this.store)}getRoot(){const t=e.create("div","excel"),s={emitter:this.emitter,store:this.store};return this.components=this.components.map((r=>{const n=e.create("div",r.className),o=new r(n,s);return n.html(o.toHTML()),t.append(n),o})),t}init(){this.subscriber.subscribeComponents(this.components),this.components.forEach((t=>{t.init()}))}destroy(){this.components.forEach((t=>{t.destroy()})),this.subscriber.unsubscribeFromStore()}}function S(t){return"on"+((e=t).charAt(0).toUpperCase()+e.slice(1));var e}class N extends class{constructor(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(!t)throw new Error("There is no $root");this.$root=t,this.listeners=e}initDomListeners(){this.listeners.forEach((t=>{const e=S(t);if(!this[e])throw new Error(`No method "${e}" in ${this.name}`);this[e]=this[e].bind(this),this.$root.on(t,this[e],e)}))}removeDomListeners(){this.listeners.forEach((t=>{let e=S(t);this.$root.off(t,this[e])}))}}{constructor(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};super(t,e.listeners),this.name=e.name,this.emitter=e.emitter,this.unsubscribers=[],this.store=e.store,this.subscriptions=e.subscriptions||[],this.prepare()}onStoreChanges(){}prepare(){}init(){this.initDomListeners()}$emit(t){for(var e=arguments.length,s=new Array(e>1?e-1:0),r=1;r<e;r++)s[r-1]=arguments[r];return this.emitter.emit(t,...s)}$on(t,e){const s=this.emitter.subscribe(t,e);this.unsubscribers.push(s)}$dispatch(t){this.store.dispatch(t)}destroy(){this.unsubscribers.forEach((t=>t())),this.removeDomListeners()}toHTML(){return""}}class _ extends N{constructor(t,e){super(t,{name:"Header",listeners:["input","click"],...e}),this.$headerInput=null}onInput(t){const e=this.$headerInput.value;this.$dispatch({type:f,data:e})}onClick(t){const s=e(t.target);if("btn-delete"===s.dataset.type){const t=window.location.hash.split("/")[1];localStorage.removeItem(`excel:${t}`),document.location.hash="#"}"btn-сlose"===s.dataset.type&&(document.location.hash="#")}init(){super.init(),this.$headerInput=this.$root.find(".input")}toHTML(){return`\n          <input type="text" class="input" value="${this.store.getState().tableName}" />\n          <div>\n            <div class="button" data-type="btn-delete">\n              <span data-type="btn-delete" class="material-icons">delete</span>\n            </div>\n            <div class="button" data-type="btn-сlose">\n              <span data-type="btn-сlose" class="material-icons">close</span>\n            </div>\n          </div>\n    `}}function k(t,e){return`<div data-type="button" data-value='${JSON.stringify(e)}' style="background: ${t}" class="color-circle-selector"></div>`}function C(t){const e=`data-type="${t.type}" data-value='${JSON.stringify(t.value)}'`,s=t.style?t.style:"";let r="";return"dropdown"===t.type&&(r=function(t){let e=t.dropdownButtons.reduce(((t,e)=>{const s=e.style?e.style:"",r=`data-type="${e.type}" data-value='${JSON.stringify(e.value)}'`;return t+=`\n      <div ${r} class="button ${e.active?"active":""}">\n        ${e.icon?`<span style='${s}' ${r} class="material-icons ">${e.icon}</span>`:""}\n        ${e.html?e.html:""}\n      </div>\n      `}),"");return`\n    <div data-type="dropdown-menu" class="dropdown-buttons">\n      ${e}\n    </div>\n    `}(t)),`\n  <div ${e} class="button ${t.active?"active":""}">\n    ${t.icon?`<span style='${s}' ${e} class="material-icons ">${t.icon}</span>`:""}\n    ${t.html?t.html:""}\n    ${r}\n  </div>\n  `}_.className="excel__header";class E extends N{constructor(){super(...arguments)}get template(){return JSON.stringify(this.state)}initState(t){this.state={...t}}setState(t){this.state={...this.state,...t},this.$root=this.$root.html(this.template)}}class A extends E{constructor(t,e){super(t,{name:"toolbar",listeners:["click"],subscriptions:["currentStyles"],...e})}prepare(){this.initState(o)}onClick(t){const s=e(t.target);if("button"===s.dataset.type){const t=JSON.parse(s.dataset.value);this.$emit("toolbar:applyStyle",t),this.setState(t)}if("dropdown"===s.dataset.type){let t;"SPAN"===s.nodeName&&(t=s.parent.find('[data-type="dropdown-menu"]'),t.toggleClass("visible")),"DIV"===s.nodeName&&(t=s.find('[data-type="dropdown-menu"]'),t.toggleClass("visible"))}}onStoreChanges(t){this.setState(t.currentStyles)}get template(){return[{icon:"format_bold",type:"button",active:"bold"===(t=this.state).fontWeight,value:{fontWeight:"bold"===t.fontWeight?"normal":"bold"}},{icon:"format_italic",type:"button",active:"italic"===t.fontStyle,value:{fontStyle:"italic"===t.fontStyle?"normal":"italic"}},{icon:"format_underlined",type:"button",active:"underline"===t.textDecoration,value:{textDecoration:"underline"===t.textDecoration?"none":"underline"}},{icon:"format_color_text",type:"dropdown",value:"drop",dropdownButtons:[{html:k("black",{color:"black"}),type:"button",value:{color:"black"}},{html:k("yellow",{color:"yellow"}),type:"button",value:{color:"yellow"}},{html:k("blue",{color:"blue"}),type:"button",value:{color:"blue"}},{html:k("violet",{color:"violet"}),type:"button",value:{color:"violet"}},{html:k("chocolate",{color:"chocolate"}),type:"button",value:{color:"chocolate"}},{html:k("skyblue",{color:"skyblue"}),type:"button",value:{color:"skyblue"}},{html:k("red",{color:"red"}),type:"button",value:{color:"red"}},{html:k("white",{color:"white"}),type:"button",value:{color:"white"}},{html:k("gray",{color:"gray"}),type:"button",value:{color:"gray"}},{html:k("lime",{color:"lime"}),type:"button",value:{color:"lime"}}]},{icon:"format_color_fill",type:"dropdown",value:"drop",dropdownButtons:[{html:k("black",{backgroundColor:"black"}),type:"button",value:{backgroundColor:"black"}},{html:k("yellow",{backgroundColor:"yellow"}),type:"button",value:{color:"yellow"}},{html:k("blue",{backgroundColor:"blue"}),type:"button",value:{color:"blue"}},{html:k("violet",{backgroundColor:"violet"}),type:"button",value:{color:"violet"}},{html:k("chocolate",{backgroundColor:"chocolate"}),type:"button",value:{color:"chocolate"}},{html:k("skyblue",{backgroundColor:"skyblue"}),type:"button",value:{color:"skyblue"}},{html:k("red",{backgroundColor:"red"}),type:"button",value:{color:"red"}},{html:k("white",{backgroundColor:"white"}),type:"button",value:{color:"white"}},{html:k("gray",{backgroundColor:"gray"}),type:"button",value:{color:"gray"}},{html:k("lime",{backgroundColor:"lime"}),type:"button",value:{color:"lime"}}]},{icon:"format_align_left",type:"button",active:"left"===t.textAlign,value:{textAlign:"left"}},{icon:"format_align_center",type:"button",active:"center"===t.textAlign,value:{textAlign:"center"}},{icon:"format_align_right",type:"button",active:"right"===t.textAlign,value:{textAlign:"right"}}].map(C).join("");var t}toHTML(){return this.template}}A.className="excel__toolbar";class T{constructor(){this.dictionary={sum:{regExp:[/=сумм\((\d+|\w\d+);\s?(\d+|\w\d+)\)/,/=(\d+|\w\d+)\s?\+\s?(\d+|\w\d+)/],value:"=сумм(;)",hint:"Сумма двух чисел или ячеек"},sumDiapason:{regExp:[/=сумм\((d+|\w\d+):\s?(d+|\w\d+)\)/],value:'"=сумм(:)"',hint:"Сумма диапазона двух ячеек"},minus:{regExp:[/=минус\((\d+|\w\d+);\s?(\d+|\w\d+)\)/,/=(\d+|\w\d+)\s?-\s?(\d+|\w\d+)/],value:"=минус(;)",hint:"Разность двух чисел или ячеек"},minimal:{regExp:[/=мин\((\d+|\w\d+);\s?(\d+|\w\d+)\)/],value:"=мин(;)",hint:"Минимальное из двух чисел или ячеек"},minimalDiapason:{regExp:[/=мин\((d+|\w\d+):\s?(d+|\w\d+)\)/],value:"=мин(:)",hint:"Минимальное из диапазона ячеек"}}}testOnExpression(t){const e=Object.keys(this.dictionary);let s=null;return e.forEach((e=>{let r=null;Array.isArray(this.dictionary[e].regExp)?this.dictionary[e].regExp.forEach((e=>{t.match(e)&&(r=t.match(e))})):r=t.match(this.dictionary.regExp[e]),null!==r&&(s={},s.value=r,s.key=e)})),s}}function O(t,s){let r=0,[n,o,i,a]=function(t){let e=t.value[1].slice(0,1).toUpperCase().charCodeAt(0)-65,s=Number(t.value[1].slice(1,2))-1,r=t.value[2].slice(0,1).toUpperCase().charCodeAt(0)-65,n=Number(t.value[2].slice(1,2))-1;return[e,s,r,n]}(t);switch(t.key){case"sum":if(l(t)&&(r=Number(t.value[1])+Number(t.value[2])),c(t)){const e=D(t.value[1]);r=Number(e.text)+Number(t.value[2])}if(u(t)){const e=D(t.value[2]);r=Number(e.text)+Number(t.value[1])}if(h(t)){const e=D(t.value[1]),s=D(t.value[2]);r=Number(e.text)+Number(s.text)}return s.text=r,r;case"sumDiapason":for(let t=o;t<=a;t++)for(let s=n;s<=i;s++){r+=Number(e(`[data-id="${t}:${s}"]`).text)}return r;case"minus":if(l(t)&&(r=Number(t.value[1])-Number(t.value[2])),c(t)){const e=D(t.value[1]);r=Number(e.text)-Number(t.value[2])}if(u(t)){const e=D(t.value[2]);r=Number(e.text)-Number(t.value[1])}if(h(t)){const e=D(t.value[1]),s=D(t.value[2]);r=Number(e.text)-Number(s.text)}return s.text=r,r;case"minimal":if(l(t)&&(r=Math.min(Number(t.value[1]),Number(t.value[2]))),c(t)){const e=D(t.value[1]);r=Math.min(Number(e.text),Number(t.value[2]))}if(u(t)){const e=D(t.value[2]);r=Math.min(Number(e.text),Number(t.value[1]))}if(h(t)){const e=D(t.value[1]),s=D(t.value[2]);r=Math.min(Number(e.text),Number(s.text))}return s.text=r,r;case"minimalDiapason":const d=[];for(let t=o;t<=a;t++)for(let s=n;s<=i;s++){const r=Number(e(`[data-id="${t}:${s}"]`).text);d.push(r)}return d.sort(((t,e)=>t-e)),r=d[0],r}}function D(t){return e(`[data-id="${`${Number(t.slice(1,2))-1}:${t.toUpperCase().charCodeAt(0)-65}`}"]`)}class L extends E{constructor(t,e){super(t,{name:"Formula",listeners:["input","keydown","click"],subscriptions:["currentText"],...e}),this.regDict=new T,this.$formula=null,this.anyClickCloseHandler=this.anyClickCloseHandler.bind(this)}init(){super.init(),this.$formula=this.$root.find(".formula-input"),this.$on("table:selection",(t=>{this.$formula.text=t.text})),this.$on("table:move",(t=>{this.$formula.text=t.text})),document.body.addEventListener("click",this.anyClickCloseHandler)}destroy(){super.destroy(),document.body.removeEventListener("click",this.anyClickCloseHandler)}anyClickCloseHandler(t){t.path.includes(this.$root.$el)||this.closeHelper()}onStoreChanges(t){this.$formula.text=t.currentText}closeHelper(){e(".formula-helper").css({display:"none"})}prepare(){}onInput(t){this.$emit("formula:input",t.target.textContent);e(".formula-helper").css({display:"block"})}onClick(t){this.$root.getAll(".formula-helper__item").forEach((e=>{if(t.path.includes(e.$el)){const t=e.find(".formula-helper__value").text;this.$formula.text=t,this.$emit("formula:input",t),this.$formula.$el.focus(),this.closeHelper()}}))}onKeydown(t){if("Enter"===t.key||"Tab"===t.key){t.preventDefault(),this.closeHelper();const e=this.regDict.testOnExpression(this.$formula.text);if(e){const t=O(e,this.$formula,this.$emit);this.$emit("formula:input",t)}this.$emit("formula:enterPress")}"Escape"===t.key&&this.closeHelper()}toHTML(){return`\n      <div class="formula-info">fx</div>\n      <div class="formula-input" contenteditable spellcheck="false"></div>\n      ${function(t){const e=[],s=Object.values(t.dictionary);let r="";return s.forEach((t=>{e.push({value:t.value,hint:t.hint})})),e.forEach((t=>{r+=`\n    <li class="formula-helper__item">\n      <p class="formula-helper__value">${t.value}</p>\n      <span class="formula-helper__hint">${t.hint}</span>\n    </li>`})),`<ul class="formula-helper">\n    ${r}\n  </ul>`}(this.regDict)}\n      \n    `}}L.className="excel__formula";const H=65,I=90;function M(t,e){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";const r=""!==s?'<div class="row-resize" data-resize="row"></div>':"",n=e?'style="height: '+e+'px"':"";return`\n    <div class="row" ${n} data-row="${s-1}" data-type="resizeble">\n      <div data-address-row="${s-1}" class="row-info">\n        ${s}\n        ${r}\n      </div>\n      <div class="row-data">${t}</div>\n    </div>\n  `}function R(t,e){return new Array(I-H+1).fill("").map(((s,r)=>function(t,e,s){const r=s.dataState,n=s.colState[t],i=`${e}:${t}`,a=n?"width: "+n+"px":"";let l=(c={...o,...s.stylesState[i]},Object.keys(c).reduce(((t,e)=>{var s;return t+`${s=e,s.replace(/([A-Z])/g,(t=>`-${t[0].toLowerCase()}`))}: ${c[e]}; `}),""));var c;return`\n    <div data-col-idx="${t}" style="${a}; ${l}" data-id="${i}" class="cell" contenteditable="true">\n      ${r[i]||""}\n    </div>\n  `}(r,t,e))).join("")}function j(t,e,s){return`\n    <div class="column" data-col="${e}" ${s?'style="width: '+s+'px"':""} data-type="resizeble">\n      ${t}\n      <div class="col-resize" data-resize="col"></div>\n    </div>\n  `}function z(t,e){!function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}(t,e),e.add(t)}function J(t,e,s){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return s}var P=new WeakSet,Y=new WeakSet;class G{constructor(t){z(this,Y),z(this,P),this.$root=t,this.group=[],this.$current=null}select(t){this.$current&&J(this,Y,K).call(this),this.removeSelect(),this.group.push(t),this.$current=t,t.addClass("selected"),t.$el.focus(),J(this,P,B).call(this)}getGroupIds(){return this.group.map((t=>t.id()))}move(t){if("ArrowLeft"===t){let[t,e]=this.$current.dataset.id.split(":").map((t=>Number(t)));if(e>=1){let s=this.$root.find(`[data-id="${t}:${e-1}"]`);this.select(s)}}if("ArrowRight"===t||"Tab"===t){let[t,e]=this.$current.dataset.id.split(":").map((t=>Number(t)));if(e<25){let s=this.$root.find(`[data-id="${t}:${e+1}"]`);this.select(s)}}if("ArrowDown"===t||"Enter"===t){let[t,e]=this.$current.dataset.id.split(":").map((t=>Number(t)));if(t<29){let s=this.$root.find(`[data-id="${t+1}:${e}"]`);this.select(s)}}if("ArrowUp"===t){let[t,e]=this.$current.dataset.id.split(":").map((t=>Number(t)));if(t>0){let s=this.$root.find(`[data-id="${t-1}:${e}"]`);this.select(s)}}}applyStyle(t){this.group.forEach((e=>e.css(t)))}removeSelect(){this.group.forEach((t=>t.removeClass("selected"))),this.group=[]}selectGroup(t){this.removeSelect(),this.group=[],t.forEach((t=>{t.addClass("selected"),this.group.push(t)}))}}function B(){let[t,s]=this.$current.dataset.id.split(":");e(`[data-address-row="${t}"]`).addClass("active_address_cell"),e(`[data-col="${s}"]`).addClass("active_address_cell")}function K(){let[t,s]=this.$current.dataset.id.split(":");e(`[data-address-row="${t}"]`).removeClass("active_address_cell"),e(`[data-col="${s}"]`).removeClass("active_address_cell")}class U extends N{constructor(t,e){super(t,{name:"Table",listeners:["mousedown","keydown","input"],...e}),this.regDict=new T}prepare(){this.selection=new G(this.$root),this.$on("formula:input",(t=>{this.selection.$current.text=t,this.changeTextInStore(t)})),this.$on("formula:enterPress",(()=>{this.selection.select(this.selection.$current)}))}init(){super.init();const t=this.$root.find('[data-id="0:0"]');this.selection.select(t),this.$emit("table:selection",t),this.changeTextInStore(t.text),this.parseStylesOfCell(),this.$on("toolbar:applyStyle",(t=>{var e;this.selection.applyStyle(t),this.$dispatch((e={ids:this.selection.getGroupIds(),value:t},{type:b,data:e}))}))}toHTML(){return function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:15,e=arguments.length>1?arguments[1]:void 0;const s=[],r=new Array(I-H+1).fill("").map(((t,e)=>String.fromCharCode(H+e))).map(((t,s)=>j(t,s,e.colState[s]))).join("");s.push(M(r));for(let r=0;r<t;r++)s.push(M(R(r,e),e.rowState[r],r+1));return s.join("")}(30,this.store.getState())}changeTextInStore(t){var e;this.$dispatch((e={value:String(t),id:this.selection.$current.id()},{type:m,data:e}))}onInput(t){t.target.hasAttribute("data-id")&&this.changeTextInStore(e(t.target).text)}async resize(t){try{const s=await function(t,s){return new Promise((r=>{const n=e(s.target).closest('[data-type = "resizeble"]'),o=n.getCords(),i=s.target.dataset.resize,a=e.create("div","resize-highliter");if(n.append(a),"col"===i){let e=Number.parseInt(n.dataset.col);const s=t.getAll(`.cell[data-col-idx="${e}"]`);let i;a.css({position:"absolute",top:"0",right:"-1px",width:"1px","z-index":3,height:"100vh","background-color":"rgba(66, 177, 255, 0.4)"}),document.onmousemove=t=>{const e=t.pageX-o.right;i=o.width+e,i-o.width>=0?a.css({width:e+"px",right:-e+"px"}):a.css({width:-e+"px",right:0})},document.onmouseup=()=>{a.remove(),n.css({width:i+"px"}),s.forEach((t=>t.css({width:i+"px"}))),document.onmousemove=null,document.onmouseup=null,r({value:i,id:n.dataset.col,type:"col"})}}if("row"===i){let t;a.css({position:"absolute",bottom:"-1px",left:"0",width:"100vw","z-index":3,height:"1px","background-color":"rgba(66, 177, 255, 0.4)"}),document.onmousemove=e=>{const s=e.pageY-o.bottom;t=o.height+s-window.scrollY,t-o.height<=0?a.css({height:-s+window.scrollY+"px",bottom:"0px"}):a.css({height:s-window.scrollY+"px",bottom:-s+window.scrollY+"px"})},document.onmouseup=()=>{a.remove(),n.css({height:t+"px"}),r({id:n.dataset.row,value:t,type:"row"}),document.onmousemove=null,document.onmouseup=null}}}))}(this.$root,t);this.$dispatch(function(t){return{type:p,data:t}}(s))}catch(t){console.warn("ERROR",t.message)}}parseStylesOfCell(){const t=this.selection.$current.getStyles(Object.keys(o));this.$dispatch({type:v,data:t})}onMousedown(t){if(t.target.dataset.resize&&this.resize(t),t.target.dataset.id){const s=e(t.target);if(this.$emit("table:selection",s),t.shiftKey){const t=function(t,e,s){let[r,n]=e.dataset.id.split(":").map((t=>Number(t))),[o,i]=t.dataset.id.split(":").map((t=>Number.parseInt(t)));[o,r]=[r,o].sort(((t,e)=>t-e)),[i,n]=[i,n].sort(((t,e)=>t-e));let a=[];for(let t=o;t<=r;t++)for(let e=i;e<=n;e++){const r=s.find(`[data-id="${t}:${e}"]`);a.push(r)}return a}(this.selection.$current,s,this.$root);this.selection.selectGroup(t)}else this.selection.select(s),this.parseStylesOfCell(),this.changeTextInStore(s.text)}}onKeydown(t){if("Enter"===t.key){t.preventDefault();const s=this.regDict.testOnExpression(this.selection.$current.text);if(s){console.log(s);const t=O(s,e(".formula-input"));this.$emit("formula:input",t)}}"ArrowLeft"!==t.key&&"ArrowRight"!==t.key&&"ArrowUp"!==t.key&&"ArrowDown"!==t.key&&"Enter"!==t.key&&"Tab"!==t.key||t.shiftKey||t.ctrlKey?t.ctrlKey:(t.preventDefault(),this.selection.move(t.key),this.parseStylesOfCell(),this.$emit("table:move",this.selection.$current))}}U.className="excel__table";new class{constructor(t,s){if(!t)throw new Error("Selector is required in Router");this.$selector=e(t),this.routes=s,this.page=null,this.changePageHolder=this.changePageHolder.bind(this),this.init(),this.changePageHolder()}init(){window.addEventListener("hashchange",this.changePageHolder)}changePageHolder(t){let e=s.param[1];e||(e=Date.now()),this.page&&(this.page.destroy(),this.$selector.clear());const r=s.param.includes("excel")?this.routes.excel:this.routes.dashboard;this.page=new r(e),this.$selector.append(this.page.getRoot()),this.page.afterRender()}}("#app",{dashboard:class extends r{getRoot(){const t=Date.now(),s=e.create("div","db");return s.html(`\n    <div class="db__header">\n      <h1>Excel Dashboard</h1>\n    </div>\n\n    <div class="db__new">\n      <div class="db__view">\n        <a href="#excel/${t}" class="db__create">\n          Новая <br/>\n          Таблица\n        </a>\n      </div>\n    </div>\n\n    <div class="db__table db__view">\n      <div class="db__list-header">\n        <span>Название</span>\n        <span>Дата открытия</span>\n      </div>\n\n      ${n()}\n    </div>\n  \n    `),s}},excel:class extends r{getRoot(){const t=new d,e=`excel:${this.param}`,s=a(),r=i(e)?i(e):t;r.dateOfOpen=s;const n=function(t){let e=t({...arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}},{type:"__INIT__"}),s=[];return{subscribe:t=>(s.push(t),{unsubscribe(){s=s.filter((e=>e!==t))}}),dispatch(r){e=t(e,r),s.forEach((t=>t(e)))},getState:()=>JSON.parse(JSON.stringify(e))}}(g,r);return n.subscribe(function(t,e){let s;return function(){for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];const i=()=>{clearTimeout(s),t(...n)};clearTimeout(s),s=setTimeout(i,e)}}((t=>{i(e,t),console.log("Состояние приложения:",t)}),350)),this.excel=new x({components:[_,A,L,U],store:n}),this.excel.getRoot()}afterRender(){this.excel.init()}destroy(){this.excel.destroy()}}})}();