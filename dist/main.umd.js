!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self)["@ypa/cyborg-js"]={})}(this,function(t){"use strict";var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function n(t,e){return t(e={exports:{}},e.exports),e.exports}var r,i,o,u="object",a=function(t){return t&&t.Math==Math&&t},c=a(typeof globalThis==u&&globalThis)||a(typeof window==u&&window)||a(typeof self==u&&self)||a(typeof e==u&&e)||Function("return this")(),f=function(t){try{return!!t()}catch(t){return!0}},l=!f(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}),s={}.propertyIsEnumerable,h=Object.getOwnPropertyDescriptor,v={f:h&&!s.call({1:2},1)?function(t){var e=h(this,t);return!!e&&e.enumerable}:s},p=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}},d={}.toString,g=function(t){return d.call(t).slice(8,-1)},y="".split,m=f(function(){return!Object("z").propertyIsEnumerable(0)})?function(t){return"String"==g(t)?y.call(t,""):Object(t)}:Object,b=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t},w=function(t){return m(b(t))},x=function(t){return"object"==typeof t?null!==t:"function"==typeof t},E=function(t,e){if(!x(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!x(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!x(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!x(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")},S={}.hasOwnProperty,k=function(t,e){return S.call(t,e)},O=c.document,I=x(O)&&x(O.createElement),j=function(t){return I?O.createElement(t):{}},T=!l&&!f(function(){return 7!=Object.defineProperty(j("div"),"a",{get:function(){return 7}}).a}),L=Object.getOwnPropertyDescriptor,A={f:l?L:function(t,e){if(t=w(t),e=E(e,!0),T)try{return L(t,e)}catch(t){}if(k(t,e))return p(!v.f.call(t,e),t[e])}},M=function(t){if(!x(t))throw TypeError(String(t)+" is not an object");return t},R=Object.defineProperty,P={f:l?R:function(t,e,n){if(M(t),e=E(e,!0),M(n),T)try{return R(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},_=l?function(t,e,n){return P.f(t,e,p(1,n))}:function(t,e,n){return t[e]=n,t},D=function(t,e){try{_(c,t,e)}catch(n){c[t]=e}return e},C=n(function(t){var e=c["__core-js_shared__"]||D("__core-js_shared__",{});(t.exports=function(t,n){return e[t]||(e[t]=void 0!==n?n:{})})("versions",[]).push({version:"3.2.1",mode:"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})}),N=C("native-function-to-string",Function.toString),z=c.WeakMap,F="function"==typeof z&&/native code/.test(N.call(z)),W=0,G=Math.random(),U=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++W+G).toString(36)},B=C("keys"),V=function(t){return B[t]||(B[t]=U(t))},$={},q=c.WeakMap;if(F){var H=new q,Q=H.get,K=H.has,Y=H.set;r=function(t,e){return Y.call(H,t,e),e},i=function(t){return Q.call(H,t)||{}},o=function(t){return K.call(H,t)}}else{var J=V("state");$[J]=!0,r=function(t,e){return _(t,J,e),e},i=function(t){return k(t,J)?t[J]:{}},o=function(t){return k(t,J)}}var X={set:r,get:i,has:o,enforce:function(t){return o(t)?i(t):r(t,{})},getterFor:function(t){return function(e){var n;if(!x(e)||(n=i(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}}},Z=n(function(t){var e=X.get,n=X.enforce,r=String(N).split("toString");C("inspectSource",function(t){return N.call(t)}),(t.exports=function(t,e,i,o){var u=!!o&&!!o.unsafe,a=!!o&&!!o.enumerable,f=!!o&&!!o.noTargetGet;"function"==typeof i&&("string"!=typeof e||k(i,"name")||_(i,"name",e),n(i).source=r.join("string"==typeof e?e:"")),t!==c?(u?!f&&t[e]&&(a=!0):delete t[e],a?t[e]=i:_(t,e,i)):a?t[e]=i:D(e,i)})(Function.prototype,"toString",function(){return"function"==typeof this&&e(this).source||N.call(this)})}),tt=c,et=function(t){return"function"==typeof t?t:void 0},nt=function(t,e){return arguments.length<2?et(tt[t])||et(c[t]):tt[t]&&tt[t][e]||c[t]&&c[t][e]},rt=Math.ceil,it=Math.floor,ot=function(t){return isNaN(t=+t)?0:(t>0?it:rt)(t)},ut=Math.min,at=function(t){return t>0?ut(ot(t),9007199254740991):0},ct=Math.max,ft=Math.min,lt=function(t,e){var n=ot(t);return n<0?ct(n+e,0):ft(n,e)},st=function(t){return function(e,n,r){var i,o=w(e),u=at(o.length),a=lt(r,u);if(t&&n!=n){for(;u>a;)if((i=o[a++])!=i)return!0}else for(;u>a;a++)if((t||a in o)&&o[a]===n)return t||a||0;return!t&&-1}},ht={includes:st(!0),indexOf:st(!1)}.indexOf,vt=function(t,e){var n,r=w(t),i=0,o=[];for(n in r)!k($,n)&&k(r,n)&&o.push(n);for(;e.length>i;)k(r,n=e[i++])&&(~ht(o,n)||o.push(n));return o},pt=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],dt=pt.concat("length","prototype"),gt={f:Object.getOwnPropertyNames||function(t){return vt(t,dt)}},yt={f:Object.getOwnPropertySymbols},mt=nt("Reflect","ownKeys")||function(t){var e=gt.f(M(t)),n=yt.f;return n?e.concat(n(t)):e},bt=function(t,e){for(var n=mt(e),r=P.f,i=A.f,o=0;o<n.length;o++){var u=n[o];k(t,u)||r(t,u,i(e,u))}},wt=/#|\.prototype\./,xt=function(t,e){var n=St[Et(t)];return n==Ot||n!=kt&&("function"==typeof e?f(e):!!e)},Et=xt.normalize=function(t){return String(t).replace(wt,".").toLowerCase()},St=xt.data={},kt=xt.NATIVE="N",Ot=xt.POLYFILL="P",It=xt,jt=A.f,Tt=function(t,e){var n,r,i,o,u,a=t.target,f=t.global,l=t.stat;if(n=f?c:l?c[a]||D(a,{}):(c[a]||{}).prototype)for(r in e){if(o=e[r],i=t.noTargetGet?(u=jt(n,r))&&u.value:n[r],!It(f?r:a+(l?".":"#")+r,t.forced)&&void 0!==i){if(typeof o==typeof i)continue;bt(o,i)}(t.sham||i&&i.sham)&&_(o,"sham",!0),Z(n,r,o,t)}},Lt=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t},At=function(t,e,n){if(Lt(t),void 0===e)return t;switch(n){case 0:return function(){return t.call(e)};case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,i){return t.call(e,n,r,i)}}return function(){return t.apply(e,arguments)}},Mt=function(t){return Object(b(t))},Rt=Array.isArray||function(t){return"Array"==g(t)},Pt=!!Object.getOwnPropertySymbols&&!f(function(){return!String(Symbol())}),_t=c.Symbol,Dt=C("wks"),Ct=function(t){return Dt[t]||(Dt[t]=Pt&&_t[t]||(Pt?_t:U)("Symbol."+t))},Nt=Ct("species"),zt=function(t,e){var n;return Rt(t)&&("function"!=typeof(n=t.constructor)||n!==Array&&!Rt(n.prototype)?x(n)&&null===(n=n[Nt])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===e?0:e)},Ft=[].push,Wt=function(t){var e=1==t,n=2==t,r=3==t,i=4==t,o=6==t,u=5==t||o;return function(a,c,f,l){for(var s,h,v=Mt(a),p=m(v),d=At(c,f,3),g=at(p.length),y=0,b=l||zt,w=e?b(a,g):n?b(a,0):void 0;g>y;y++)if((u||y in p)&&(h=d(s=p[y],y,v),t))if(e)w[y]=h;else if(h)switch(t){case 3:return!0;case 5:return s;case 6:return y;case 2:Ft.call(w,s)}else if(i)return!1;return o?-1:r||i?i:w}},Gt={forEach:Wt(0),map:Wt(1),filter:Wt(2),some:Wt(3),every:Wt(4),find:Wt(5),findIndex:Wt(6)},Ut=function(t,e){var n=[][t];return!n||!f(function(){n.call(null,e||function(){throw 1},1)})},Bt=Gt.forEach,Vt=Ut("forEach")?function(t){return Bt(this,t,arguments.length>1?arguments[1]:void 0)}:[].forEach;Tt({target:"Array",proto:!0,forced:[].forEach!=Vt},{forEach:Vt});var $t,qt,Ht=RegExp.prototype.exec,Qt=String.prototype.replace,Kt=Ht,Yt=($t=/a/,qt=/b*/g,Ht.call($t,"a"),Ht.call(qt,"a"),0!==$t.lastIndex||0!==qt.lastIndex),Jt=void 0!==/()??/.exec("")[1];(Yt||Jt)&&(Kt=function(t){var e,n,r,i,o=this;return Jt&&(n=new RegExp("^"+o.source+"$(?!\\s)",function(){var t=M(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}.call(o))),Yt&&(e=o.lastIndex),r=Ht.call(o,t),Yt&&r&&(o.lastIndex=o.global?r.index+r[0].length:e),Jt&&r&&r.length>1&&Qt.call(r[0],n,function(){for(i=1;i<arguments.length-2;i++)void 0===arguments[i]&&(r[i]=void 0)}),r});var Xt=Kt;Tt({target:"RegExp",proto:!0,forced:/./.exec!==Xt},{exec:Xt});var Zt=Ct("species"),te=!f(function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}),ee=!f(function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}),ne=function(t,e,n,r){var i=Ct(t),o=!f(function(){var e={};return e[i]=function(){return 7},7!=""[t](e)}),u=o&&!f(function(){var e=!1,n=/a/;return n.exec=function(){return e=!0,null},"split"===t&&(n.constructor={},n.constructor[Zt]=function(){return n}),n[i](""),!e});if(!o||!u||"replace"===t&&!te||"split"===t&&!ee){var a=/./[i],c=n(i,""[t],function(t,e,n,r,i){return e.exec===Xt?o&&!i?{done:!0,value:a.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}}),l=c[0],s=c[1];Z(String.prototype,t,l),Z(RegExp.prototype,i,2==e?function(t,e){return s.call(t,this,e)}:function(t){return s.call(t,this)}),r&&_(RegExp.prototype[i],"sham",!0)}},re=function(t){return function(e,n){var r,i,o=String(b(e)),u=ot(n),a=o.length;return u<0||u>=a?t?"":void 0:(r=o.charCodeAt(u))<55296||r>56319||u+1===a||(i=o.charCodeAt(u+1))<56320||i>57343?t?o.charAt(u):r:t?o.slice(u,u+2):i-56320+(r-55296<<10)+65536}},ie={codeAt:re(!1),charAt:re(!0)},oe=ie.charAt,ue=function(t,e,n){return e+(n?oe(t,e).length:1)},ae=function(t,e){var n=t.exec;if("function"==typeof n){var r=n.call(t,e);if("object"!=typeof r)throw TypeError("RegExp exec method returned something other than an Object or null");return r}if("RegExp"!==g(t))throw TypeError("RegExp#exec called on incompatible receiver");return Xt.call(t,e)},ce=Math.max,fe=Math.min,le=Math.floor,se=/\$([$&'`]|\d\d?|<[^>]*>)/g,he=/\$([$&'`]|\d\d?)/g;ne("replace",2,function(t,e,n){return[function(n,r){var i=b(this),o=null==n?void 0:n[t];return void 0!==o?o.call(n,i,r):e.call(String(i),n,r)},function(t,i){var o=n(e,t,this,i);if(o.done)return o.value;var u=M(t),a=String(this),c="function"==typeof i;c||(i=String(i));var f=u.global;if(f){var l=u.unicode;u.lastIndex=0}for(var s=[];;){var h=ae(u,a);if(null===h)break;if(s.push(h),!f)break;""===String(h[0])&&(u.lastIndex=ue(a,at(u.lastIndex),l))}for(var v,p="",d=0,g=0;g<s.length;g++){h=s[g];for(var y=String(h[0]),m=ce(fe(ot(h.index),a.length),0),b=[],w=1;w<h.length;w++)b.push(void 0===(v=h[w])?v:String(v));var x=h.groups;if(c){var E=[y].concat(b,m,a);void 0!==x&&E.push(x);var S=String(i.apply(void 0,E))}else S=r(y,a,m,b,x,i);m>=d&&(p+=a.slice(d,m)+S,d=m+y.length)}return p+a.slice(d)}];function r(t,n,r,i,o,u){var a=r+t.length,c=i.length,f=he;return void 0!==o&&(o=Mt(o),f=se),e.call(u,f,function(e,u){var f;switch(u.charAt(0)){case"$":return"$";case"&":return t;case"`":return n.slice(0,r);case"'":return n.slice(a);case"<":f=o[u.slice(1,-1)];break;default:var l=+u;if(0===l)return e;if(l>c){var s=le(l/10);return 0===s?e:s<=c?void 0===i[s-1]?u.charAt(1):i[s-1]+u.charAt(1):e}f=i[l-1]}return void 0===f?"":f})}});var ve=Ct("match"),pe=Ct("species"),de=[].push,ge=Math.min,ye=!f(function(){return!RegExp(4294967295,"y")});ne("split",2,function(t,e,n){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,n){var r,i,o=String(b(this)),u=void 0===n?4294967295:n>>>0;if(0===u)return[];if(void 0===t)return[o];if(!x(r=t)||(void 0!==(i=r[ve])?!i:"RegExp"!=g(r)))return e.call(o,t,u);for(var a,c,f,l=[],s=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),h=0,v=new RegExp(t.source,s+"g");(a=Xt.call(v,o))&&!((c=v.lastIndex)>h&&(l.push(o.slice(h,a.index)),a.length>1&&a.index<o.length&&de.apply(l,a.slice(1)),f=a[0].length,h=c,l.length>=u));)v.lastIndex===a.index&&v.lastIndex++;return h===o.length?!f&&v.test("")||l.push(""):l.push(o.slice(h)),l.length>u?l.slice(0,u):l}:"0".split(void 0,0).length?function(t,n){return void 0===t&&0===n?[]:e.call(this,t,n)}:e,[function(e,n){var i=b(this),o=null==e?void 0:e[t];return void 0!==o?o.call(e,i,n):r.call(String(i),e,n)},function(t,i){var o=n(r,t,this,i,r!==e);if(o.done)return o.value;var u=M(t),a=String(this),c=function(t,e){var n,r=M(t).constructor;return void 0===r||null==(n=M(r)[pe])?e:Lt(n)}(u,RegExp),f=u.unicode,l=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(ye?"y":"g"),s=new c(ye?u:"^(?:"+u.source+")",l),h=void 0===i?4294967295:i>>>0;if(0===h)return[];if(0===a.length)return null===ae(s,a)?[a]:[];for(var v=0,p=0,d=[];p<a.length;){s.lastIndex=ye?p:0;var g,y=ae(s,ye?a:a.slice(p));if(null===y||(g=ge(at(s.lastIndex+(ye?0:p)),a.length))===v)p=ue(a,p,f);else{if(d.push(a.slice(v,p)),d.length===h)return d;for(var m=1;m<=y.length-1;m++)if(d.push(y[m]),d.length===h)return d;p=v=g}}return d.push(a.slice(v)),d}]},!ye);var me={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0};for(var be in me){var we=c[be],xe=we&&we.prototype;if(xe&&xe.forEach!==Vt)try{_(xe,"forEach",Vt)}catch(t){xe.forEach=Vt}}function Ee(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Se(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function ke(t,e,n){return e&&Se(t.prototype,e),n&&Se(t,n),t}function Oe(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Ie(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");var n=e.get(t);return n.get?n.get.call(t):n.value}function je(t,e,n){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");var r=e.get(t);if(r.set)r.set.call(t,n);else{if(!r.writable)throw new TypeError("attempted to set read only private field");r.value=n}return n}function Te(t,e,n){if(t!==e)throw new TypeError("Private static access of wrong provenance");return n.value}function Le(t,e,n,r){if(t!==e)throw new TypeError("Private static access of wrong provenance");if(!n.writable)throw new TypeError("attempted to set read only private field");return n.value=r,r}var Ae=Ct("species"),Me=function(t){return!f(function(){var e=[];return(e.constructor={})[Ae]=function(){return{foo:1}},1!==e[t](Boolean).foo})},Re=Gt.filter;Tt({target:"Array",proto:!0,forced:!Me("filter")},{filter:function(t){return Re(this,t,arguments.length>1?arguments[1]:void 0)}});var Pe=Object.keys||function(t){return vt(t,pt)},_e=l?Object.defineProperties:function(t,e){M(t);for(var n,r=Pe(e),i=r.length,o=0;i>o;)P.f(t,n=r[o++],e[n]);return t},De=nt("document","documentElement"),Ce=V("IE_PROTO"),Ne=function(){},ze=function(){var t,e=j("iframe"),n=pt.length;for(e.style.display="none",De.appendChild(e),e.src=String("javascript:"),(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),ze=t.F;n--;)delete ze.prototype[pt[n]];return ze()},Fe=Object.create||function(t,e){var n;return null!==t?(Ne.prototype=M(t),n=new Ne,Ne.prototype=null,n[Ce]=t):n=ze(),void 0===e?n:_e(n,e)};$[Ce]=!0;var We=Ct("unscopables"),Ge=Array.prototype;null==Ge[We]&&_(Ge,We,Fe(null));var Ue=function(t){Ge[We][t]=!0},Be=Gt.findIndex,Ve=!0;"findIndex"in[]&&Array(1).findIndex(function(){Ve=!1}),Tt({target:"Array",proto:!0,forced:Ve},{findIndex:function(t){return Be(this,t,arguments.length>1?arguments[1]:void 0)}}),Ue("findIndex");var $e,qe,He,Qe={},Ke=!f(function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}),Ye=V("IE_PROTO"),Je=Object.prototype,Xe=Ke?Object.getPrototypeOf:function(t){return t=Mt(t),k(t,Ye)?t[Ye]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?Je:null},Ze=Ct("iterator"),tn=!1;[].keys&&("next"in(He=[].keys())?(qe=Xe(Xe(He)))!==Object.prototype&&($e=qe):tn=!0),null==$e&&($e={}),k($e,Ze)||_($e,Ze,function(){return this});var en={IteratorPrototype:$e,BUGGY_SAFARI_ITERATORS:tn},nn=P.f,rn=Ct("toStringTag"),on=function(t,e,n){t&&!k(t=n?t:t.prototype,rn)&&nn(t,rn,{configurable:!0,value:e})},un=en.IteratorPrototype,an=function(){return this},cn=Object.setPrototypeOf||("__proto__"in{}?function(){var t,e=!1,n={};try{(t=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(n,[]),e=n instanceof Array}catch(t){}return function(n,r){return M(n),function(t){if(!x(t)&&null!==t)throw TypeError("Can't set "+String(t)+" as a prototype")}(r),e?t.call(n,r):n.__proto__=r,n}}():void 0),fn=en.IteratorPrototype,ln=en.BUGGY_SAFARI_ITERATORS,sn=Ct("iterator"),hn=function(){return this},vn=function(t,e,n,r,i,o,u){!function(t,e,n){var r=e+" Iterator";t.prototype=Fe(un,{next:p(1,n)}),on(t,r,!1),Qe[r]=an}(n,e,r);var a,c,f,l=function(t){if(t===i&&g)return g;if(!ln&&t in v)return v[t];switch(t){case"keys":case"values":case"entries":return function(){return new n(this,t)}}return function(){return new n(this)}},s=e+" Iterator",h=!1,v=t.prototype,d=v[sn]||v["@@iterator"]||i&&v[i],g=!ln&&d||l(i),y="Array"==e&&v.entries||d;if(y&&(a=Xe(y.call(new t)),fn!==Object.prototype&&a.next&&(Xe(a)!==fn&&(cn?cn(a,fn):"function"!=typeof a[sn]&&_(a,sn,hn)),on(a,s,!0))),"values"==i&&d&&"values"!==d.name&&(h=!0,g=function(){return d.call(this)}),v[sn]!==g&&_(v,sn,g),Qe[e]=g,i)if(c={values:l("values"),keys:o?g:l("keys"),entries:l("entries")},u)for(f in c)!ln&&!h&&f in v||Z(v,f,c[f]);else Tt({target:e,proto:!0,forced:ln||h},c);return c},pn=X.set,dn=X.getterFor("Array Iterator"),gn=vn(Array,"Array",function(t,e){pn(this,{type:"Array Iterator",target:w(t),index:0,kind:e})},function(){var t=dn(this),e=t.target,n=t.kind,r=t.index++;return!e||r>=e.length?(t.target=void 0,{value:void 0,done:!0}):"keys"==n?{value:r,done:!1}:"values"==n?{value:e[r],done:!1}:{value:[r,e[r]],done:!1}},"values");Qe.Arguments=Qe.Array,Ue("keys"),Ue("values"),Ue("entries");var yn=Math.max,mn=Math.min;Tt({target:"Array",proto:!0,forced:!Me("splice")},{splice:function(t,e){var n,r,i,o,u,a,c,f,l,s,h=Mt(this),v=at(h.length),d=lt(t,v),g=arguments.length;if(0===g?n=r=0:1===g?(n=0,r=v-d):(n=g-2,r=mn(yn(ot(e),0),v-d)),v+n-r>9007199254740991)throw TypeError("Maximum allowed length exceeded");for(i=zt(h,r),o=0;o<r;o++)(u=d+o)in h&&(c=i,f=o,l=h[u],s=void 0,(s=E(f))in c?P.f(c,s,p(0,l)):c[s]=l);if(i.length=r,n<r){for(o=d;o<v-r;o++)a=o+n,(u=o+r)in h?h[a]=h[u]:delete h[a];for(o=v;o>v-r+n;o--)delete h[o-1]}else if(n>r)for(o=v-r;o>d;o--)a=o+n-1,(u=o+r-1)in h?h[a]=h[u]:delete h[a];for(o=0;o<n;o++)h[o+d]=arguments[o+2];return h.length=v-r+n,i}});var bn=P.f,wn=Function.prototype,xn=wn.toString,En=/^\s*function ([^ (]*)/;!l||"name"in wn||bn(wn,"name",{configurable:!0,get:function(){try{return xn.call(this).match(En)[1]}catch(t){return""}}});var Sn=Ct("toStringTag"),kn="Arguments"==g(function(){return arguments}()),On=function(t){var e,n,r;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),Sn))?n:kn?g(e):"Object"==(r=g(e))&&"function"==typeof e.callee?"Arguments":r},In={};In[Ct("toStringTag")]="z";var jn="[object z]"!==String(In)?function(){return"[object "+On(this)+"]"}:In.toString,Tn=Object.prototype;jn!==Tn.toString&&Z(Tn,"toString",jn,{unsafe:!0});var Ln=ie.charAt,An=X.set,Mn=X.getterFor("String Iterator");vn(String,"String",function(t){An(this,{type:"String Iterator",string:String(t),index:0})},function(){var t,e=Mn(this),n=e.string,r=e.index;return r>=n.length?{value:void 0,done:!0}:(t=Ln(n,r),e.index+=t.length,{value:t,done:!1})});var Rn=function(t,e,n){for(var r in e)Z(t,r,e[r],n);return t},Pn=!f(function(){return Object.isExtensible(Object.preventExtensions({}))}),_n=n(function(t){var e=P.f,n=U("meta"),r=0,i=Object.isExtensible||function(){return!0},o=function(t){e(t,n,{value:{objectID:"O"+ ++r,weakData:{}}})},u=t.exports={REQUIRED:!1,fastKey:function(t,e){if(!x(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!k(t,n)){if(!i(t))return"F";if(!e)return"E";o(t)}return t[n].objectID},getWeakData:function(t,e){if(!k(t,n)){if(!i(t))return!0;if(!e)return!1;o(t)}return t[n].weakData},onFreeze:function(t){return Pn&&u.REQUIRED&&i(t)&&!k(t,n)&&o(t),t}};$[n]=!0}),Dn=(_n.REQUIRED,_n.fastKey,_n.getWeakData,_n.onFreeze,Ct("iterator")),Cn=Array.prototype,Nn=Ct("iterator"),zn=function(t,e,n,r){try{return r?e(M(n)[0],n[1]):e(n)}catch(e){var i=t.return;throw void 0!==i&&M(i.call(t)),e}},Fn=n(function(t){var e=function(t,e){this.stopped=t,this.result=e};(t.exports=function(t,n,r,i,o){var u,a,c,f,l,s,h,v=At(n,r,i?2:1);if(o)u=t;else{if("function"!=typeof(a=function(t){if(null!=t)return t[Nn]||t["@@iterator"]||Qe[On(t)]}(t)))throw TypeError("Target is not iterable");if(void 0!==(h=a)&&(Qe.Array===h||Cn[Dn]===h)){for(c=0,f=at(t.length);f>c;c++)if((l=i?v(M(s=t[c])[0],s[1]):v(t[c]))&&l instanceof e)return l;return new e(!1)}u=a.call(t)}for(;!(s=u.next()).done;)if((l=zn(u,v,s.value,i))&&l instanceof e)return l;return new e(!1)}).stop=function(t){return new e(!0,t)}}),Wn=function(t,e,n){if(!(t instanceof e))throw TypeError("Incorrect "+(n?n+" ":"")+"invocation");return t},Gn=Ct("iterator"),Un=!1;try{var Bn=0;({next:function(){return{done:!!Bn++}},return:function(){Un=!0}})[Gn]=function(){return this}}catch(t){}var Vn=function(t,e,n,r,i){var o=c[t],u=o&&o.prototype,a=o,l=r?"set":"add",s={},h=function(t){var e=u[t];Z(u,t,"add"==t?function(t){return e.call(this,0===t?0:t),this}:"delete"==t?function(t){return!(i&&!x(t))&&e.call(this,0===t?0:t)}:"get"==t?function(t){return i&&!x(t)?void 0:e.call(this,0===t?0:t)}:"has"==t?function(t){return!(i&&!x(t))&&e.call(this,0===t?0:t)}:function(t,n){return e.call(this,0===t?0:t,n),this})};if(It(t,"function"!=typeof o||!(i||u.forEach&&!f(function(){(new o).entries().next()}))))a=n.getConstructor(e,t,r,l),_n.REQUIRED=!0;else if(It(t,!0)){var v=new a,p=v[l](i?{}:-0,1)!=v,d=f(function(){v.has(1)}),g=function(t,e){if(!e&&!Un)return!1;var n=!1;try{var r={};r[Gn]=function(){return{next:function(){return{done:n=!0}}}},t(r)}catch(t){}return n}(function(t){new o(t)}),y=!i&&f(function(){for(var t=new o,e=5;e--;)t[l](e,e);return!t.has(-0)});g||((a=e(function(e,n){Wn(e,a,t);var i=function(t,e,n){var r,i;return cn&&"function"==typeof(r=e.constructor)&&r!==n&&x(i=r.prototype)&&i!==n.prototype&&cn(t,i),t}(new o,e,a);return null!=n&&Fn(n,i[l],i,r),i})).prototype=u,u.constructor=a),(d||y)&&(h("delete"),h("has"),r&&h("get")),(y||p)&&h(l),i&&u.clear&&delete u.clear}return s[t]=a,Tt({global:!0,forced:a!=o},s),on(a,t),i||n.setStrong(a,t,r),a},$n=_n.getWeakData,qn=X.set,Hn=X.getterFor,Qn=Gt.find,Kn=Gt.findIndex,Yn=0,Jn=function(t){return t.frozen||(t.frozen=new Xn)},Xn=function(){this.entries=[]},Zn=function(t,e){return Qn(t.entries,function(t){return t[0]===e})};Xn.prototype={get:function(t){var e=Zn(this,t);if(e)return e[1]},has:function(t){return!!Zn(this,t)},set:function(t,e){var n=Zn(this,t);n?n[1]=e:this.entries.push([t,e])},delete:function(t){var e=Kn(this.entries,function(e){return e[0]===t});return~e&&this.entries.splice(e,1),!!~e}};var tr={getConstructor:function(t,e,n,r){var i=t(function(t,o){Wn(t,i,e),qn(t,{type:e,id:Yn++,frozen:void 0}),null!=o&&Fn(o,t[r],t,n)}),o=Hn(e),u=function(t,e,n){var r=o(t),i=$n(M(e),!0);return!0===i?Jn(r).set(e,n):i[r.id]=n,t};return Rn(i.prototype,{delete:function(t){var e=o(this);if(!x(t))return!1;var n=$n(t);return!0===n?Jn(e).delete(t):n&&k(n,e.id)&&delete n[e.id]},has:function(t){var e=o(this);if(!x(t))return!1;var n=$n(t);return!0===n?Jn(e).has(t):n&&k(n,e.id)}}),Rn(i.prototype,n?{get:function(t){var e=o(this);if(x(t)){var n=$n(t);return!0===n?Jn(e).get(t):n?n[e.id]:void 0}},set:function(t,e){return u(this,t,e)}}:{add:function(t){return u(this,t,!0)}}),i}},er=(n(function(t){var e,n=X.enforce,r=!c.ActiveXObject&&"ActiveXObject"in c,i=Object.isExtensible,o=function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}},u=t.exports=Vn("WeakMap",o,tr,!0,!0);if(F&&r){e=tr.getConstructor(o,"WeakMap",!0),_n.REQUIRED=!0;var a=u.prototype,f=a.delete,l=a.has,s=a.get,h=a.set;Rn(a,{delete:function(t){if(x(t)&&!i(t)){var r=n(this);return r.frozen||(r.frozen=new e),f.call(this,t)||r.frozen.delete(t)}return f.call(this,t)},has:function(t){if(x(t)&&!i(t)){var r=n(this);return r.frozen||(r.frozen=new e),l.call(this,t)||r.frozen.has(t)}return l.call(this,t)},get:function(t){if(x(t)&&!i(t)){var r=n(this);return r.frozen||(r.frozen=new e),l.call(this,t)?s.call(this,t):r.frozen.get(t)}return s.call(this,t)},set:function(t,r){if(x(t)&&!i(t)){var o=n(this);o.frozen||(o.frozen=new e),l.call(this,t)?h.call(this,t,r):o.frozen.set(t,r)}else h.call(this,t,r);return this}})}}),Ct("iterator")),nr=Ct("toStringTag"),rr=gn.values;for(var ir in me){var or=c[ir],ur=or&&or.prototype;if(ur){if(ur[er]!==rr)try{_(ur,er,rr)}catch(t){ur[er]=rr}if(ur[nr]||_(ur,nr,ir),me[ir])for(var ar in gn)if(ur[ar]!==gn[ar])try{_(ur,ar,gn[ar])}catch(t){ur[ar]=gn[ar]}}}var cr=function(){function t(e,n,r){Ee(this,t),fr.set(this,{writable:!0,value:void 0}),lr.set(this,{writable:!0,value:void 0}),sr.set(this,{writable:!0,value:void 0}),je(this,fr,n),je(this,sr,r),je(this,lr,e)}return ke(t,[{key:"name",get:function(){return Ie(this,fr)}},{key:"handler",get:function(){return Ie(this,sr)}},{key:"target",get:function(){return Ie(this,lr)}}]),t}(),fr=new WeakMap,lr=new WeakMap,sr=new WeakMap,hr=function(){function t(){if(Ee(this,t),vr.set(this,{writable:!0,value:void 0}),Te(t,t,pr))throw new Error("Use NotificationController.getInstance()");Le(t,t,pr,this),je(this,vr,[])}return ke(t,[{key:"notify",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Ie(this,vr).filter(function(e){return e.name===t}).forEach(function(n){e.notification=t,n.handler(e)})}},{key:"addListener",value:function(t,e,n){var r=new cr(t,e,n.bind(t));Ie(this,vr).push(r)}},{key:"removeListener",value:function(t,e){var n=Ie(this,vr),r=n.findIndex(function(n){return n.name===t&&n.target===e});je(this,vr,n.splice(r,1))}},{key:"removeAllListenersFor",value:function(t){var e=Ie(this,vr);je(this,vr,e.filter(function(e){return e.target.name!==t.name}))}},{key:"listeners",get:function(){return Ie(this,vr)}}],[{key:"getInstance",value:function(){return Te(t,t,pr)?Te(t,t,pr):new t}}]),t}(),vr=new WeakMap,pr={writable:!0,value:void 0},dr="DOMContentLoaded",gr="DOMNodeRemovedFromDocument",yr=function(){function t(){if(Ee(this,t),Oe(this,"components",void 0),Oe(this,"componentsMap",void 0),Te(t,t,mr))throw new Error("Use MotherBoard.getInstance()");Le(t,t,mr,this),this.components=[],this.init()}return ke(t,[{key:"init",value:function(){var t=this;window.onload=function(){t.onload()},window.onbeforeunload=function(){t.destroy()},document.addEventListener(dr,function(){t.bind()},!1)}},{key:"bind",value:function(){this.build(window.document);var t=document.querySelector("html");t&&(t.classList.remove("no-js"),t.classList.add("js"))}},{key:"onload",value:function(){this.components.forEach(function(t){t.onload()})}},{key:"build",value:function(t){var e=t.querySelectorAll("[data-component]");if(e.length>0){var n=this;e.forEach(function(t){var e=n.getComponentByName(n.componentsMap,t.dataset.component);if(e){var r=new e;n.registerNotifcation({name:t.dataset.component,notifications:t.dataset.notifications,classRef:r}),r.bind(t),n.components.push(r),r.addEventListener(gr,function(){r.destroy()},!1)}})}}},{key:"registerNotifcation",value:function(t){if(t.notifications){var e=t.notifications.replace(" ","").split(","),n=t.classRef;e.forEach(function(t){hr.getInstance().addListener(n,t,n.handleNotifications)})}}},{key:"getComponentByName",value:function(t,e){return t[e]}},{key:"destroy",value:function(){for(;this.components.length>0;){var t=this.components[0];t&&t.el.remove(),this.components.shift()}}},{key:"notifier",get:function(){return hr.getInstance()}}],[{key:"getInstance",value:function(){return Te(t,t,mr)?Te(t,t,mr):new t}}]),t}(),mr={writable:!0,value:void 0},br=function(){function t(e,n){Ee(this,t),wr.set(this,{writable:!0,value:void 0}),xr.set(this,{writable:!0,value:void 0}),je(this,wr,e),je(this,xr,n)}return ke(t,[{key:"name",get:function(){return Ie(this,wr)}},{key:"handler",get:function(){return Ie(this,xr)}}]),t}(),wr=new WeakMap,xr=new WeakMap,Er=function(){function t(){Ee(this,t),Sr.set(this,{writable:!0,value:void 0}),kr.set(this,{writable:!0,value:void 0}),Or.set(this,{writable:!0,value:void 0})}return ke(t,[{key:"bind",value:function(t){je(this,Sr,t),this.name=t.dataset.component,je(this,kr,[]),je(this,Or,yr.getInstance())}},{key:"onload",value:function(){}},{key:"handleNotifications",value:function(t){}},{key:"addEventListener",value:function(t,e){Ie(this,kr).push(new br(t,e)),this.el.addEventListener(t,e,!1)}},{key:"removeEventListener",value:function(t,e){var n=Ie(this,kr).findIndex(function(n){return n.name===t&&n.handler===e});Ie(this,kr).splice(n,1),this.el.removeEventListener(t,e)}},{key:"addListener",value:function(t){Ie(this,Or).notifier.addListener(this,t,this.handleNotifications)}},{key:"removeListener",value:function(t){Ie(this,Or).notifier.removeListener(t,this)}},{key:"notify",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Ie(this,Or).notifier.notify(t,e)}},{key:"render",value:function(t){if(this.el.children)for(;this.el.children.length>0;)this.el.children[0].remove();this.el.innerHTML=this.getTemplate(t),Ie(this,Or).build(this.el)}},{key:"getTemplate",value:function(t){return""}},{key:"destroy",value:function(){for(;Ie(this,kr).length>0;)this.removeEventListener(Ie(this,kr)[0].name,Ie(this,kr)[0].handler);Ie(this,Or).notifier.removeAllListenersFor(this)}},{key:"el",get:function(){return Ie(this,Sr)}}]),t}(),Sr=new WeakMap,kr=new WeakMap,Or=new WeakMap,Ir=Date.prototype,jr=Ir.toString,Tr=Ir.getTime;new Date(NaN)+""!="Invalid Date"&&Z(Ir,"toString",function(){var t=Tr.call(this);return t==t?jr.call(this):"Invalid Date"});var Lr=[].sort,Ar=[1,2,3],Mr=f(function(){Ar.sort(void 0)}),Rr=f(function(){Ar.sort(null)}),Pr=Ut("sort");Tt({target:"Array",proto:!0,forced:Mr||!Rr||Pr},{sort:function(t){return void 0===t?Lr.call(Mt(this)):Lr.call(Mt(this),Lt(t))}});var _r=f(function(){Pe(1)});Tt({target:"Object",stat:!0,forced:_r},{keys:function(t){return Pe(Mt(t))}}),t.Component=Er,t.MotherBoard=yr,t.Notification=cr,t.equal=function(t,e){var n=Object.keys(t).sort(),r=Object.keys(e).sort(),i={},o={};return n.forEach(function(e){i[e]=t[e]}),r.forEach(function(t){o[t]=e[t]}),JSON.stringify(i)===JSON.stringify(o)},t.shuffle=function(t){for(var e=t.length;e>0;){var n=Math.floor(Math.random()*e),r=t[--e];t[e]=t[n],t[n]=r}return t},t.throttle=function(t,e){var n=0;return function(){var r=(new Date).getTime();if(!(r-n<e))return n=r,t.apply(void 0,arguments)}},Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=main.umd.js.map