webpackHotUpdate(0,{169:function(t,e,n){"use strict";function i(t){v.fillStyle="rgba(0, 0, 0, 0.1)",v.fillRect(0,0,h.width,h.height),v.fillStyle="rgba(255, 255, 255, 1)";for(var e in y)if(y.hasOwnProperty(e)){var n=y[e];n.id,n.x,n.y,v.beginPath(),v.arc(n.x,n.y,s,0,2*Math.PI),v.fill(),v.stroke()}requestAnimationFrame(i)}function o(t){var e=t.targetTouches[0];w=e.clientX,g=e.clientY}function c(t){}function r(t){w=t.x,g=t.y}function d(){f.emit("event",{id:f.id,x:w,y:g}),setTimeout(d,m)}function u(){h.width=document.documentElement.clientWidth,h.height=document.documentElement.clientHeight}var a=n(386),l=function(t){return t&&t.__esModule?t:{default:t}}(a),f=(0,l.default)("http://meramind.ru:9090"),s=5,m=13,h=document.createElement("canvas"),v=h.getContext("2d"),w=0,g=0,y={};document.body.appendChild(h),window.addEventListener("resize",u),u(),i(),f.on("connect_error",function(t){console.log("Error connecting to server")}),f.on("connect",function(t){window.addEventListener("mousemove",r),window.addEventListener("touchstart",c),window.addEventListener("touchmove",o),d()}),f.on("clients",function(t){y=t})}});