!function(e){function r(e){var r=document.getElementsByTagName("head")[0],n=document.createElement("script");n.type="text/javascript",n.charset="utf-8",n.src=d.p+""+e+"."+b+".hot-update.js",r.appendChild(n)}function n(e){if("undefined"==typeof XMLHttpRequest)return e(Error("No browser support"));try{var r=new XMLHttpRequest,n=d.p+""+b+".hot-update.json";r.open("GET",n,!0),r.timeout=1e4,r.send(null)}catch(r){return e(r)}r.onreadystatechange=function(){if(4===r.readyState)if(0===r.status)e(Error("Manifest request to "+n+" timed out."));else if(404===r.status)e();else if(200!==r.status&&304!==r.status)e(Error("Manifest request to "+n+" failed."));else{try{var t=JSON.parse(r.responseText)}catch(r){return void e(r)}e(null,t)}}}function t(e){function r(e,r){"ready"===E&&c("prepare"),x++,d.e(e,function(){function n(){x--,"prepare"===E&&(H[e]||l(e),0===x&&0===O&&u())}try{r.call(null,t)}finally{n()}})}var n=j[e];if(!n)return d;var t=function(r){return n.hot.active?j[r]?(j[r].parents.indexOf(e)<0&&j[r].parents.push(e),n.children.indexOf(r)<0&&n.children.push(r)):g=[e]:g=[],d(r)};for(var s in d)Object.prototype.hasOwnProperty.call(d,s)&&(v?Object.defineProperty(t,s,function(e){return{configurable:!0,enumerable:!0,get:function(){return d[e]},set:function(r){d[e]=r}}}(s)):t[s]=d[s]);return v?Object.defineProperty(t,"e",{enumerable:!0,value:r}):t.e=r,t}function s(e){var r={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],active:!0,accept:function(e,n){if(void 0===e)r._selfAccepted=!0;else if("function"==typeof e)r._selfAccepted=e;else if("object"==typeof e)for(var t=0;e.length>t;t++)r._acceptedDependencies[e[t]]=n;else r._acceptedDependencies[e]=n},decline:function(e){if(void 0===e)r._selfDeclined=!0;else if("number"==typeof e)r._declinedDependencies[e]=!0;else for(var n=0;e.length>n;n++)r._declinedDependencies[e[n]]=!0},dispose:function(e){r._disposeHandlers.push(e)},addDisposeHandler:function(e){r._disposeHandlers.push(e)},removeDisposeHandler:function(e){var n=r._disposeHandlers.indexOf(e);0>n||r._disposeHandlers.splice(n,1)},check:a,apply:f,status:function(e){return e?void k.push(e):E},addStatusHandler:function(e){k.push(e)},removeStatusHandler:function(e){var r=k.indexOf(e);0>r||k.splice(r,1)},data:w[e]};return r}function c(e){E=e;for(var r=0;k.length>r;r++)k[r].call(null,e)}function o(e){var r=+e+""===e;return r?+e:e}function a(e,r){if("idle"!==E)throw Error("check() is only allowed in idle status");"function"==typeof e?(y=!1,r=e):(y=e,r=r||function(e){if(e)throw e}),c("check"),n(function(e,n){if(e)return r(e);if(!n)return c("idle"),void r(null,null);D={},A={},H={};for(var t=0;n.c.length>t;t++)A[n.c[t]]=!0;m=n.h,c("prepare"),_=r,h={};var s=1;l(s),"prepare"===E&&0===x&&0===O&&u()})}function i(e,r){if(A[e]&&D[e]){D[e]=!1;for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(h[n]=r[n]);0===--O&&0===x&&u()}}function l(e){A[e]?(D[e]=!0,O++,r(e)):H[e]=!0}function u(){c("ready");var e=_;if(_=null,e)if(y)f(y,e);else{var r=[];for(var n in h)Object.prototype.hasOwnProperty.call(h,n)&&r.push(o(n));e(null,r)}}function f(r,n){function t(e){for(var r=[e],n={},t=r.slice();t.length>0;){var c=t.pop(),e=j[c];if(e&&!e.hot._selfAccepted){if(e.hot._selfDeclined)return Error("Aborted because of self decline: "+c);if(0===c)return;for(var o=0;e.parents.length>o;o++){var a=e.parents[o],i=j[a];if(i.hot._declinedDependencies[c])return Error("Aborted because of declined dependency: "+c+" in "+a);r.indexOf(a)<0&&(i.hot._acceptedDependencies[c]?(n[a]||(n[a]=[]),s(n[a],[c])):(delete n[a],r.push(a),t.push(a)))}}}return[r,n]}function s(e,r){for(var n=0;r.length>n;n++){var t=r[n];e.indexOf(t)<0&&e.push(t)}}if("ready"!==E)throw Error("apply() is only allowed in ready status");"function"==typeof r?(n=r,r={}):r&&"object"==typeof r?n=n||function(e){if(e)throw e}:(r={},n=n||function(e){if(e)throw e});var a={},i=[],l={};for(var u in h)if(Object.prototype.hasOwnProperty.call(h,u)){var f=o(u),p=t(f);if(!p){if(r.ignoreUnaccepted)continue;return c("abort"),n(Error("Aborted because "+f+" is not accepted"))}if(p instanceof Error)return c("abort"),n(p);l[f]=h[f],s(i,p[0]);for(var f in p[1])Object.prototype.hasOwnProperty.call(p[1],f)&&(a[f]||(a[f]=[]),s(a[f],p[1][f]))}for(var v=[],_=0;i.length>_;_++){var f=i[_];j[f]&&j[f].hot._selfAccepted&&v.push({module:f,errorHandler:j[f].hot._selfAccepted})}c("dispose");for(var y=i.slice();y.length>0;){var f=y.pop(),k=j[f];if(k){for(var O={},x=k.hot._disposeHandlers,H=0;x.length>H;H++){var D=x[H];D(O)}w[f]=O,k.hot.active=!1,delete j[f];for(var H=0;k.children.length>H;H++){var A=j[k.children[H]];if(A){var q=A.parents.indexOf(f);0>q||A.parents.splice(q,1)}}}}for(var f in a)if(Object.prototype.hasOwnProperty.call(a,f))for(var k=j[f],C=a[f],H=0;C.length>H;H++){var N=C[H],q=k.children.indexOf(N);0>q||k.children.splice(q,1)}c("apply"),b=m;for(var f in l)Object.prototype.hasOwnProperty.call(l,f)&&(e[f]=l[f]);var P=null;for(var f in a)if(Object.prototype.hasOwnProperty.call(a,f)){for(var k=j[f],C=a[f],L=[],_=0;C.length>_;_++){var N=C[_],D=k.hot._acceptedDependencies[N];L.indexOf(D)<0&&L.push(D)}for(var _=0;L.length>_;_++){var D=L[_];try{D(a)}catch(e){P||(P=e)}}}for(var _=0;v.length>_;_++){var T=v[_],f=T.module;g=[f];try{d(f)}catch(e){if("function"==typeof T.errorHandler)try{T.errorHandler(e)}catch(e){P||(P=e)}else P||(P=e)}}return P?(c("fail"),n(P)):(c("idle"),void n(null,i))}function d(r){if(j[r])return j[r].exports;var n=j[r]={exports:{},id:r,loaded:!1,hot:s(r),parents:g,children:[]};return e[r].call(n.exports,n,n.exports,t(r)),n.loaded=!0,n.exports}var p=this.webpackHotUpdate;this.webpackHotUpdate=function(e,r){i(e,r),p&&p(e,r)};var v=!1;try{Object.defineProperty({},"x",{get:function(){}}),v=!0}catch(e){}var _,h,m,y=!0,b="8f4cc2473ca95b082778",w={},g=[],k=[],E="idle",O=0,x=0,H={},D={},A={},j={};return d.m=e,d.c=j,d.p="D:\\DEV\\snowflake\\public\\assets\\js\\chunks\\8f4cc2473ca95b082778",d.h=function(){return b},t(0)(0)}({0:function(module,exports,__webpack_require__){eval("module.exports = __webpack_require__(114);\n\n\n//////////////////\n// WEBPACK FOOTER\n// multi smoothscroll\n// module id = 0\n// module chunks = 1\n//# sourceURL=webpack:///multi_smoothscroll?")},114:function(module,exports){eval('// SmoothScroll v0.9.9\r\n// Licensed under the terms of the MIT license.\r\n\r\n// People involved\r\n// - Balazs Galambosi: maintainer (CHANGELOG.txt)\r\n// - Patrick Brunner (patrickb1991@gmail.com)\r\n// - Michael Herf: ssc_pulse Algorithm\r\n\r\nfunction ssc_init() {\r\n    if (!document.body) return;\r\n    var e = document.body;\r\n    var t = document.documentElement;\r\n    var n = window.innerHeight;\r\n    var r = e.scrollHeight;\r\n    ssc_root = document.compatMode.indexOf("CSS") >= 0 ? t : e;\r\n    ssc_activeElement = e;\r\n    ssc_initdone = true;\r\n    if (top != self) {\r\n        ssc_frame = true\r\n    } else if (r > n && (e.offsetHeight <= n || t.offsetHeight <= n)) {\r\n        ssc_root.style.height = "auto";\r\n        if (ssc_root.offsetHeight <= n) {\r\n            var i = document.createElement("div");\r\n            i.style.clear = "both";\r\n            e.appendChild(i)\r\n        }\r\n    }\r\n    if (!ssc_fixedback) {\r\n        e.style.backgroundAttachment = "scroll";\r\n        t.style.backgroundAttachment = "scroll"\r\n    }\r\n    if (ssc_keyboardsupport) {\r\n        ssc_addEvent("keydown", ssc_keydown)\r\n    }\r\n}\r\n\r\nfunction ssc_scrollArray(e, t, n, r) {\r\n    r || (r = 1e3);\r\n    ssc_directionCheck(t, n);\r\n    ssc_que.push({\r\n        x: t,\r\n        y: n,\r\n        lastX: t < 0 ? .99 : -.99,\r\n        lastY: n < 0 ? .99 : -.99,\r\n        start: +(new Date)\r\n    });\r\n    if (ssc_pending) {\r\n        return\r\n    }\r\n    var i = function () {\r\n        var s = +(new Date);\r\n        var o = 0;\r\n        var u = 0;\r\n        for (var a = 0; a < ssc_que.length; a++) {\r\n            var f = ssc_que[a];\r\n            var l = s - f.start;\r\n            var c = l >= ssc_animtime;\r\n            var h = c ? 1 : l / ssc_animtime;\r\n            if (ssc_pulseAlgorithm) {\r\n                h = ssc_pulse(h)\r\n            }\r\n            var p = f.x * h - f.lastX >> 0;\r\n            var d = f.y * h - f.lastY >> 0;\r\n            o += p;\r\n            u += d;\r\n            f.lastX += p;\r\n            f.lastY += d;\r\n            if (c) {\r\n                ssc_que.splice(a, 1);\r\n                a--\r\n            }\r\n        }\r\n        if (t) {\r\n            var v = e.scrollLeft;\r\n            e.scrollLeft += o;\r\n            if (o && e.scrollLeft === v) {\r\n                t = 0\r\n            }\r\n        }\r\n        if (n) {\r\n            var m = e.scrollTop;\r\n            e.scrollTop += u;\r\n            if (u && e.scrollTop === m) {\r\n                n = 0\r\n            }\r\n        }\r\n        if (!t && !n) {\r\n            ssc_que = []\r\n        }\r\n        if (ssc_que.length) {\r\n            setTimeout(i, r / ssc_framerate + 1)\r\n        } else {\r\n            ssc_pending = false\r\n        }\r\n    };\r\n    setTimeout(i, 0);\r\n    ssc_pending = true\r\n}\r\n\r\nfunction ssc_wheel(e) {\r\n    if (!ssc_initdone) {\r\n        ssc_init()\r\n    }\r\n    var t = e.target;\r\n    var n = ssc_overflowingAncestor(t);\r\n    if (!n || e.defaultPrevented || ssc_isNodeName(ssc_activeElement, "embed") || ssc_isNodeName(t, "embed") && /\\.pdf/i.test(t.src)) {\r\n        return true\r\n    }\r\n    var r = e.wheelDeltaX || 0;\r\n    var i = e.wheelDeltaY || 0;\r\n    if (!r && !i) {\r\n        i = e.wheelDelta || 0\r\n    }\r\n    if (Math.abs(r) > 1.2) {\r\n        r *= ssc_stepsize / 120\r\n    }\r\n    if (Math.abs(i) > 1.2) {\r\n        i *= ssc_stepsize / 120\r\n    }\r\n    ssc_scrollArray(n, -r, -i);\r\n    e.preventDefault()\r\n}\r\n\r\nfunction ssc_keydown(e) {\r\n    var t = e.target;\r\n    var n = e.ctrlKey || e.altKey || e.metaKey;\r\n    if (/input|textarea|embed/i.test(t.nodeName) || t.isContentEditable || e.defaultPrevented || n) {\r\n        return true\r\n    }\r\n    if (ssc_isNodeName(t, "button") && e.keyCode === ssc_key.spacebar) {\r\n        return true\r\n    }\r\n    var r, i = 0,\r\n        s = 0;\r\n    var o = ssc_overflowingAncestor(ssc_activeElement);\r\n    var u = o.clientHeight;\r\n    if (o == document.body) {\r\n        u = window.innerHeight\r\n    }\r\n    switch (e.keyCode) {\r\n    case ssc_key.up:\r\n        s = -ssc_arrowscroll;\r\n        break;\r\n    case ssc_key.down:\r\n        s = ssc_arrowscroll;\r\n        break;\r\n    case ssc_key.spacebar:\r\n        r = e.shiftKey ? 1 : -1;\r\n        s = -r * u * .9;\r\n        break;\r\n    case ssc_key.pageup:\r\n        s = -u * .9;\r\n        break;\r\n    case ssc_key.pagedown:\r\n        s = u * .9;\r\n        break;\r\n    case ssc_key.home:\r\n        s = -o.scrollTop;\r\n        break;\r\n    case ssc_key.end:\r\n        var a = o.scrollHeight - o.scrollTop - u;\r\n        s = a > 0 ? a + 10 : 0;\r\n        break;\r\n    case ssc_key.left:\r\n        i = -ssc_arrowscroll;\r\n        break;\r\n    case ssc_key.right:\r\n        i = ssc_arrowscroll;\r\n        break;\r\n    default:\r\n        return true\r\n    }\r\n    ssc_scrollArray(o, i, s);\r\n    e.preventDefault()\r\n}\r\n\r\nfunction ssc_mousedown(e) {\r\n    ssc_activeElement = e.target\r\n}\r\n\r\nfunction ssc_setCache(e, t) {\r\n    for (var n = e.length; n--;) ssc_cache[ssc_uniqueID(e[n])] = t;\r\n    return t\r\n}\r\n\r\nfunction ssc_overflowingAncestor(e) {\r\n    var t = [];\r\n    var n = ssc_root.scrollHeight;\r\n    do {\r\n        var r = ssc_cache[ssc_uniqueID(e)];\r\n        if (r) {\r\n            return ssc_setCache(t, r)\r\n        }\r\n        t.push(e);\r\n        if (n === e.scrollHeight) {\r\n            if (!ssc_frame || ssc_root.clientHeight + 10 < n) {\r\n                return ssc_setCache(t, document.body)\r\n            }\r\n        } else if (e.clientHeight + 10 < e.scrollHeight) {\r\n            overflow = getComputedStyle(e, "").getPropertyValue("overflow");\r\n            if (overflow === "scroll" || overflow === "auto") {\r\n                return ssc_setCache(t, e)\r\n            }\r\n        }\r\n    } while (e = e.parentNode)\r\n}\r\n\r\nfunction ssc_addEvent(e, t, n) {\r\n    window.addEventListener(e, t, n || false)\r\n}\r\n\r\nfunction ssc_removeEvent(e, t, n) {\r\n    window.removeEventListener(e, t, n || false)\r\n}\r\n\r\nfunction ssc_isNodeName(e, t) {\r\n    return e.nodeName.toLowerCase() === t.toLowerCase()\r\n}\r\n\r\nfunction ssc_directionCheck(e, t) {\r\n    e = e > 0 ? 1 : -1;\r\n    t = t > 0 ? 1 : -1;\r\n    if (ssc_direction.x !== e || ssc_direction.y !== t) {\r\n        ssc_direction.x = e;\r\n        ssc_direction.y = t;\r\n        ssc_que = []\r\n    }\r\n}\r\n\r\nfunction ssc_pulse_(e) {\r\n    var t, n, r;\r\n    e = e * ssc_pulseScale;\r\n    if (e < 1) {\r\n        t = e - (1 - Math.exp(-e))\r\n    } else {\r\n        n = Math.exp(-1);\r\n        e -= 1;\r\n        r = 1 - Math.exp(-e);\r\n        t = n + r * (1 - n)\r\n    }\r\n    return t * ssc_pulseNormalize\r\n}\r\n\r\nfunction ssc_pulse(e) {\r\n    if (e >= 1) return 1;\r\n    if (e <= 0) return 0;\r\n    if (ssc_pulseNormalize == 1) {\r\n        ssc_pulseNormalize /= ssc_pulse_(1)\r\n    }\r\n    return ssc_pulse_(e)\r\n}\r\n\r\nvar ssc_framerate = 150;\r\nvar ssc_animtime = 500;\r\nvar ssc_stepsize = 150;\r\nvar ssc_pulseAlgorithm = true;\r\nvar ssc_pulseScale = 6;\r\nvar ssc_pulseNormalize = 1;\r\nvar ssc_keyboardsupport = true;\r\nvar ssc_arrowscroll = 50;\r\nvar ssc_frame = false;\r\nvar ssc_direction = {\r\n    x: 0,\r\n    y: 0\r\n};\r\n\r\nvar ssc_initdone = false;\r\nvar ssc_fixedback = true;\r\nvar ssc_root = document.documentElement;\r\nvar ssc_activeElement;\r\nvar ssc_key = {\r\n    left: 37,\r\n    up: 38,\r\n    right: 39,\r\n    down: 40,\r\n    spacebar: 32,\r\n    pageup: 33,\r\n    pagedown: 34,\r\n    end: 35,\r\n    home: 36\r\n};\r\n\r\nvar ssc_que = [];\r\nvar ssc_pending = false;\r\nvar ssc_cache = {};\r\n\r\nsetInterval(function () {\r\n    ssc_cache = {}\r\n}, 10 * 1e3);\r\n\r\nvar ssc_uniqueID = function () {\r\n    var e = 0;\r\n    return function (t) {\r\n        return t.ssc_uniqueID || (t.ssc_uniqueID = e++)\r\n    }\r\n}();\r\n\r\nvar ischrome = /chrome/.test(navigator.userAgent.toLowerCase());\r\n\r\nif (ischrome) {\r\n    ssc_addEvent("mousedown", ssc_mousedown);\r\n    ssc_addEvent("mousewheel", ssc_wheel);\r\n    ssc_addEvent("load", ssc_init)\r\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./assets/js/lib/smoothscroll/smoothscroll.js\n// module id = 114\n// module chunks = 1\n//# sourceURL=webpack:///./assets/js/lib/smoothscroll/smoothscroll.js?')}});