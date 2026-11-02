var HeartTools=(()=>{var o0=Object.create;var Vr=Object.defineProperty;var l0=Object.getOwnPropertyDescriptor;var c0=Object.getOwnPropertyNames;var u0=Object.getPrototypeOf,h0=Object.prototype.hasOwnProperty;var f0=(l,e)=>()=>{try{return e||l((e={exports:{}}).exports,e),e.exports}catch(n){throw e=0,n}},d0=(l,e)=>{for(var n in e)Vr(l,n,{get:e[n],enumerable:!0})},au=(l,e,n,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let c of c0(e))!h0.call(l,c)&&c!==n&&Vr(l,c,{get:()=>e[c],enumerable:!(a=l0(e,c))||a.enumerable});return l};var p0=(l,e,n)=>(n=l!=null?o0(u0(l)):{},au(e||!l||!l.__esModule?Vr(n,"default",{value:l,enumerable:!0}):n,l)),m0=l=>au(Vr({},"__esModule",{value:!0}),l);var Kh=f0((Jh,ka)=>{var jh=(()=>{var l=Object.defineProperty,e=Object.getOwnPropertyDescriptor,n=Object.getOwnPropertyNames,a=Object.prototype.hasOwnProperty,c=(t,i)=>{for(var s in i)l(t,s,{get:i[s],enumerable:!0})},h=(t,i,s,r)=>{if(i&&typeof i=="object"||typeof i=="function")for(let o of n(i))!a.call(t,o)&&o!==s&&l(t,o,{get:()=>i[o],enumerable:!(r=e(i,o))||r.enumerable});return t},p=t=>h(l({},"__esModule",{value:!0}),t),d={};c(d,{BoundingBox:()=>ce,Font:()=>tu,Glyph:()=>fs,Path:()=>Ae,_parse:()=>_e,load:()=>s0,loadSync:()=>r0,parse:()=>i0});var y=0,x=-3;function _(){this.table=new Uint16Array(16),this.trans=new Uint16Array(288)}function M(t,i){this.source=t,this.sourceIndex=0,this.tag=0,this.bitcount=0,this.dest=i,this.destLen=0,this.ltree=new _,this.dtree=new _}var T=new _,w=new _,A=new Uint8Array(30),C=new Uint16Array(30),E=new Uint8Array(30),b=new Uint16Array(30),k=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),P=new _,V=new Uint8Array(320);function Z(t,i,s,r){var o,u;for(o=0;o<s;++o)t[o]=0;for(o=0;o<30-s;++o)t[o+s]=o/s|0;for(u=r,o=0;o<30;++o)i[o]=u,u+=1<<t[o]}function X(t,i){var s;for(s=0;s<7;++s)t.table[s]=0;for(t.table[7]=24,t.table[8]=152,t.table[9]=112,s=0;s<24;++s)t.trans[s]=256+s;for(s=0;s<144;++s)t.trans[24+s]=s;for(s=0;s<8;++s)t.trans[168+s]=280+s;for(s=0;s<112;++s)t.trans[176+s]=144+s;for(s=0;s<5;++s)i.table[s]=0;for(i.table[5]=32,s=0;s<32;++s)i.trans[s]=s}var W=new Uint16Array(16);function fe(t,i,s,r){var o,u;for(o=0;o<16;++o)t.table[o]=0;for(o=0;o<r;++o)t.table[i[s+o]]++;for(t.table[0]=0,u=0,o=0;o<16;++o)W[o]=u,u+=t.table[o];for(o=0;o<r;++o)i[s+o]&&(t.trans[W[i[s+o]]++]=o)}function D(t){t.bitcount--||(t.tag=t.source[t.sourceIndex++],t.bitcount=7);var i=t.tag&1;return t.tag>>>=1,i}function N(t,i,s){if(!i)return s;for(;t.bitcount<24;)t.tag|=t.source[t.sourceIndex++]<<t.bitcount,t.bitcount+=8;var r=t.tag&65535>>>16-i;return t.tag>>>=i,t.bitcount-=i,r+s}function ae(t,i){for(;t.bitcount<24;)t.tag|=t.source[t.sourceIndex++]<<t.bitcount,t.bitcount+=8;var s=0,r=0,o=0,u=t.tag;do r=2*r+(u&1),u>>>=1,++o,s+=i.table[o],r-=i.table[o];while(r>=0);return t.tag=u,t.bitcount-=o,i.trans[s+r]}function ge(t,i,s){var r,o,u,f,m,g;for(r=N(t,5,257),o=N(t,5,1),u=N(t,4,4),f=0;f<19;++f)V[f]=0;for(f=0;f<u;++f){var S=N(t,3,0);V[k[f]]=S}for(fe(P,V,0,19),m=0;m<r+o;){var v=ae(t,P);switch(v){case 16:var I=V[m-1];for(g=N(t,2,3);g;--g)V[m++]=I;break;case 17:for(g=N(t,3,3);g;--g)V[m++]=0;break;case 18:for(g=N(t,7,11);g;--g)V[m++]=0;break;default:V[m++]=v;break}}fe(i,V,0,r),fe(s,V,r,o)}function we(t,i,s){for(;;){var r=ae(t,i);if(r===256)return y;if(r<256)t.dest[t.destLen++]=r;else{var o,u,f,m;for(r-=257,o=N(t,A[r],C[r]),u=ae(t,s),f=t.destLen-N(t,E[u],b[u]),m=f;m<f+o;++m)t.dest[t.destLen++]=t.dest[m]}}}function q(t){for(var i,s,r;t.bitcount>8;)t.sourceIndex--,t.bitcount-=8;if(i=t.source[t.sourceIndex+1],i=256*i+t.source[t.sourceIndex],s=t.source[t.sourceIndex+3],s=256*s+t.source[t.sourceIndex+2],i!==(~s&65535))return x;for(t.sourceIndex+=4,r=i;r;--r)t.dest[t.destLen++]=t.source[t.sourceIndex++];return t.bitcount=0,y}function te(t,i){var s=new M(t,i),r,o,u;do{switch(r=D(s),o=N(s,2,0),o){case 0:u=q(s);break;case 1:u=we(s,T,w);break;case 2:ge(s,s.ltree,s.dtree),u=we(s,s.ltree,s.dtree);break;default:u=x}if(u!==y)throw new Error("Data error")}while(!r);return s.destLen<s.dest.length?typeof s.dest.slice=="function"?s.dest.slice(0,s.destLen):s.dest.subarray(0,s.destLen):s.dest}X(T,w),Z(A,C,4,3),Z(E,b,2,1),A[28]=0,C[28]=258;function le(t,i,s,r,o){return Math.pow(1-o,3)*t+3*Math.pow(1-o,2)*o*i+3*(1-o)*Math.pow(o,2)*s+Math.pow(o,3)*r}function ue(){this.x1=Number.NaN,this.y1=Number.NaN,this.x2=Number.NaN,this.y2=Number.NaN}ue.prototype.isEmpty=function(){return isNaN(this.x1)||isNaN(this.y1)||isNaN(this.x2)||isNaN(this.y2)},ue.prototype.addPoint=function(t,i){typeof t=="number"&&((isNaN(this.x1)||isNaN(this.x2))&&(this.x1=t,this.x2=t),t<this.x1&&(this.x1=t),t>this.x2&&(this.x2=t)),typeof i=="number"&&((isNaN(this.y1)||isNaN(this.y2))&&(this.y1=i,this.y2=i),i<this.y1&&(this.y1=i),i>this.y2&&(this.y2=i))},ue.prototype.addX=function(t){this.addPoint(t,null)},ue.prototype.addY=function(t){this.addPoint(null,t)},ue.prototype.addBezier=function(t,i,s,r,o,u,f,m){let g=[t,i],S=[s,r],v=[o,u],I=[f,m];this.addPoint(t,i),this.addPoint(f,m);for(let L=0;L<=1;L++){let B=6*g[L]-12*S[L]+6*v[L],F=-3*g[L]+9*S[L]-9*v[L]+3*I[L],z=3*S[L]-3*g[L];if(F===0){if(B===0)continue;let Xe=-z/B;0<Xe&&Xe<1&&(L===0&&this.addX(le(g[L],S[L],v[L],I[L],Xe)),L===1&&this.addY(le(g[L],S[L],v[L],I[L],Xe)));continue}let ie=Math.pow(B,2)-4*z*F;if(ie<0)continue;let ze=(-B+Math.sqrt(ie))/(2*F);0<ze&&ze<1&&(L===0&&this.addX(le(g[L],S[L],v[L],I[L],ze)),L===1&&this.addY(le(g[L],S[L],v[L],I[L],ze)));let Ne=(-B-Math.sqrt(ie))/(2*F);0<Ne&&Ne<1&&(L===0&&this.addX(le(g[L],S[L],v[L],I[L],Ne)),L===1&&this.addY(le(g[L],S[L],v[L],I[L],Ne)))}},ue.prototype.addQuad=function(t,i,s,r,o,u){let f=t+.6666666666666666*(s-t),m=i+2/3*(r-i),g=f+1/3*(o-t),S=m+1/3*(u-i);this.addBezier(t,i,f,m,g,S,o,u)};var ce=ue;function se(){this.commands=[],this.fill="black",this.stroke=null,this.strokeWidth=1}var pe={};function Me(t,i){let s=Math.floor(t),r=t-s;if(pe[i]||(pe[i]={}),pe[i][r]!==void 0){let u=pe[i][r];return s+u}let o=+(Math.round(r+"e+"+i)+"e-"+i);return pe[i][r]=o,s+o}function Le(t){let i=[[]],s=0,r=0;for(let o=0;o<t.length;o+=1){let u=i[i.length-1],f=t[o],m=u[0],g=u[1],S=u[u.length-1],v=t[o+1];u.push(f),f.type==="M"?(s=f.x,r=f.y):f.type==="L"&&(!v||v.type==="Z")?Math.abs(f.x-s)>1||Math.abs(f.y-r)>1||u.pop():f.type==="L"&&S&&S.x===f.x&&S.y===f.y?u.pop():f.type==="Z"&&(m&&g&&S&&m.type==="M"&&g.type==="L"&&S.type==="L"&&S.x===m.x&&S.y===m.y&&(u.shift(),u[0].type="M"),o+1<t.length&&i.push([]))}return t=[].concat.apply([],i),t}function oe(t){return Object.assign({},{decimalPlaces:2,optimize:!0,flipY:!0,flipYBase:void 0,scale:1,x:0,y:0},t)}function me(t){return parseInt(t)===t&&(t={decimalPlaces:t,flipY:!1}),Object.assign({},{decimalPlaces:2,optimize:!0,flipY:!0,flipYBase:void 0},t)}se.prototype.fromSVG=function(t,i={}){typeof SVGPathElement<"u"&&t instanceof SVGPathElement&&(t=t.getAttribute("d")),i=oe(i),this.commands=[];let s="0123456789",r="MmLlQqCcZzHhVv",o="SsTtAa",u="-+",f={},m=[""],g=!1;function S(F){return F.filter(z=>z.length).map(z=>{let ie=parseFloat(z);return(i.decimalPlaces||i.decimalPlaces===0)&&(ie=Me(ie,i.decimalPlaces)),ie})}function v(F){if(!this.commands.length)return F;let z=this.commands[this.commands.length-1];for(let ie=0;ie<F.length;ie++)F[ie]+=z[ie&1?"y":"x"];return F}function I(){if(f.type===void 0)return;let F=f.type.toUpperCase(),z=F!=="Z"&&f.type.toUpperCase()!==f.type,ie=S(m);if(m=[""],!ie.length&&F!=="Z")return;z&&F!=="H"&&F!=="V"&&(ie=v.apply(this,[ie]));let ze=this.commands.length&&this.commands[this.commands.length-1].x||0,Ne=this.commands.length&&this.commands[this.commands.length-1].y||0;switch(F){case"M":this.moveTo(...ie);break;case"L":this.lineTo(...ie);break;case"V":for(let Xe=0;Xe<ie.length;Xe++){let ct=0;z&&(ct=this.commands.length&&this.commands[this.commands.length-1].y||0),this.lineTo(ze,ie[Xe]+ct)}break;case"H":for(let Xe=0;Xe<ie.length;Xe++){let ct=0;z&&(ct=this.commands.length&&this.commands[this.commands.length-1].x||0),this.lineTo(ie[Xe]+ct,Ne)}break;case"C":this.bezierCurveTo(...ie);break;case"Q":this.quadraticCurveTo(...ie);break;case"Z":(this.commands.length<1||this.commands[this.commands.length-1].type!=="Z")&&this.close();break}if(this.commands.length)for(let Xe in this.commands[this.commands.length-1])this.commands[this.commands.length-1][Xe]===void 0&&(this.commands[this.commands.length-1][Xe]=0)}for(let F=0;F<t.length;F++){let z=t.charAt(F),ie=m[m.length-1];if(s.indexOf(z)>-1)m[m.length-1]+=z;else if(u.indexOf(z)>-1)if(!f.type&&!this.commands.length&&(f.type="L"),z==="-")!f.type||ie.indexOf("-")>0?g=!0:ie.length?m.push("-"):m[m.length-1]=z;else if(!f.type||ie.length>0)g=!0;else continue;else if(r.indexOf(z)>-1)f.type?(I.apply(this),f={type:z}):f.type=z;else{if(o.indexOf(z)>-1)throw new Error("Unsupported path command: "+z+". Currently supported commands are "+r.split("").join(", ")+".");` ,	
\r\f\v`.indexOf(z)>-1?m.push(""):z==="."?!f.type||ie.indexOf(z)>-1?g=!0:m[m.length-1]+=z:g=!0}if(g)throw new Error("Unexpected character: "+z+" at offset "+F)}I.apply(this),i.optimize&&(this.commands=Le(this.commands));let L=i.flipY,B=i.flipYBase;if(L===!0&&i.flipYBase===void 0){let F=this.getBoundingBox();B=F.y1+F.y2}for(let F in this.commands){let z=this.commands[F];for(let ie in z)["x","x1","x2"].includes(ie)?this.commands[F][ie]=i.x+z[ie]*i.scale:["y","y1","y2"].includes(ie)&&(this.commands[F][ie]=i.y+(L?B-z[ie]:z[ie])*i.scale)}return this},se.fromSVG=function(t,i){return new se().fromSVG(t,i)},se.prototype.moveTo=function(t,i){this.commands.push({type:"M",x:t,y:i})},se.prototype.lineTo=function(t,i){this.commands.push({type:"L",x:t,y:i})},se.prototype.curveTo=se.prototype.bezierCurveTo=function(t,i,s,r,o,u){this.commands.push({type:"C",x1:t,y1:i,x2:s,y2:r,x:o,y:u})},se.prototype.quadTo=se.prototype.quadraticCurveTo=function(t,i,s,r){this.commands.push({type:"Q",x1:t,y1:i,x:s,y:r})},se.prototype.close=se.prototype.closePath=function(){this.commands.push({type:"Z"})},se.prototype.extend=function(t){if(t.commands)t=t.commands;else if(t instanceof ce){let i=t;this.moveTo(i.x1,i.y1),this.lineTo(i.x2,i.y1),this.lineTo(i.x2,i.y2),this.lineTo(i.x1,i.y2),this.close();return}Array.prototype.push.apply(this.commands,t)},se.prototype.getBoundingBox=function(){let t=new ce,i=0,s=0,r=0,o=0;for(let u=0;u<this.commands.length;u++){let f=this.commands[u];switch(f.type){case"M":t.addPoint(f.x,f.y),i=r=f.x,s=o=f.y;break;case"L":t.addPoint(f.x,f.y),r=f.x,o=f.y;break;case"Q":t.addQuad(r,o,f.x1,f.y1,f.x,f.y),r=f.x,o=f.y;break;case"C":t.addBezier(r,o,f.x1,f.y1,f.x2,f.y2,f.x,f.y),r=f.x,o=f.y;break;case"Z":r=i,o=s;break;default:throw new Error("Unexpected path command "+f.type)}}return t.isEmpty()&&t.addPoint(0,0),t},se.prototype.draw=function(t){let i=this._layers;if(i&&i.length){for(let r=0;r<i.length;r++)this.draw.call(i[r],t);return}let s=this._image;if(s){t.drawImage(s.image,s.x,s.y,s.width,s.height);return}t.beginPath();for(let r=0;r<this.commands.length;r+=1){let o=this.commands[r];o.type==="M"?t.moveTo(o.x,o.y):o.type==="L"?t.lineTo(o.x,o.y):o.type==="C"?t.bezierCurveTo(o.x1,o.y1,o.x2,o.y2,o.x,o.y):o.type==="Q"?t.quadraticCurveTo(o.x1,o.y1,o.x,o.y):o.type==="Z"&&this.stroke&&this.strokeWidth&&t.closePath()}this.fill&&(t.fillStyle=this.fill,t.fill()),this.stroke&&(t.strokeStyle=this.stroke,t.lineWidth=this.strokeWidth,t.stroke())},se.prototype.toPathData=function(t){t=me(t);function i(m){let g=Me(m,t.decimalPlaces);return Math.round(m)===g?""+g:g.toFixed(t.decimalPlaces)}function s(){let m="";for(let g=0;g<arguments.length;g+=1){let S=arguments[g];S>=0&&g>0&&(m+=" "),m+=i(S)}return m}let r=this.commands;t.optimize&&(r=JSON.parse(JSON.stringify(this.commands)),r=Le(r));let o=t.flipY,u=t.flipYBase;if(o===!0&&u===void 0){let m=new se;m.extend(r);let g=m.getBoundingBox();u=g.y1+g.y2}let f="";for(let m=0;m<r.length;m+=1){let g=r[m];g.type==="M"?f+="M"+s(g.x,o?u-g.y:g.y):g.type==="L"?f+="L"+s(g.x,o?u-g.y:g.y):g.type==="C"?f+="C"+s(g.x1,o?u-g.y1:g.y1,g.x2,o?u-g.y2:g.y2,g.x,o?u-g.y:g.y):g.type==="Q"?f+="Q"+s(g.x1,o?u-g.y1:g.y1,g.x,o?u-g.y:g.y):g.type==="Z"&&(f+="Z")}return f},se.prototype.toSVG=function(t,i){this._layers&&this._layers.length&&console.warn("toSVG() does not support colr font layers yet"),this._image&&console.warn("toSVG() does not support SVG glyphs yet"),i||(i=this.toPathData(t));let s='<path d="';return s+=i,s+='"',this.fill!==void 0&&this.fill!=="black"&&(this.fill===null?s+=' fill="none"':s+=' fill="'+this.fill+'"'),this.stroke&&(s+=' stroke="'+this.stroke+'" stroke-width="'+this.strokeWidth+'"'),s+="/>",s},se.prototype.toDOMElement=function(t,i){this._layers&&this._layers.length&&console.warn("toDOMElement() does not support colr font layers yet"),i||(i=this.toPathData(t));let s=document.createElementNS("http://www.w3.org/2000/svg","path");return s.setAttribute("d",i),this.fill!==void 0&&this.fill!=="black"&&(this.fill===null?s.setAttribute("fill","none"):s.setAttribute("fill",this.fill)),this.stroke&&(s.setAttribute("stroke",this.stroke),s.setAttribute("stroke-width",this.strokeWidth)),s};var Ae=se;function He(t){throw new Error(t)}function Ge(t,i){t||He(i)}var he={fail:He,argument:Ge,assert:Ge},nt=32768,$e=2147483648,dt=-32768,K=32767+1/65536,Ft={},re={},xe={};function Pe(t){return function(){return t}}re.BYTE=function(t){return he.argument(t>=0&&t<=255,"Byte value should be between 0 and 255."),[t]},xe.BYTE=Pe(1),re.CHAR=function(t){return[t.charCodeAt(0)]},xe.CHAR=Pe(1),re.CHARARRAY=function(t){(t===null||typeof t>"u")&&(t="",console.warn("CHARARRAY with undefined or null value encountered and treated as an empty string. This is probably caused by a missing glyph name."));let i=[];for(let s=0;s<t.length;s+=1)i[s]=t.charCodeAt(s);return i},xe.CHARARRAY=function(t){return typeof t>"u"?0:t.length},re.USHORT=function(t){return[t>>8&255,t&255]},xe.USHORT=Pe(2),re.SHORT=function(t){return t>=nt&&(t=-(2*nt-t)),[t>>8&255,t&255]},xe.SHORT=Pe(2),re.UINT24=function(t){return[t>>16&255,t>>8&255,t&255]},xe.UINT24=Pe(3),re.ULONG=function(t){return[t>>24&255,t>>16&255,t>>8&255,t&255]},xe.ULONG=Pe(4),re.LONG=function(t){return t>=$e&&(t=-(2*$e-t)),[t>>24&255,t>>16&255,t>>8&255,t&255]},xe.LONG=Pe(4),re.FLOAT=function(t){if(t>K||t<dt)throw new Error(`Value ${t} is outside the range of representable values in 16.16 format`);let i=Math.round(t*65536)<<0;return re.ULONG(i)},xe.FLOAT=xe.ULONG,re.FIXED=re.ULONG,xe.FIXED=xe.ULONG,re.FWORD=re.SHORT,xe.FWORD=xe.SHORT,re.UFWORD=re.USHORT,xe.UFWORD=xe.USHORT,re.F2DOT14=function(t){return re.USHORT(t*16384)},xe.F2DOT14=xe.USHORT,re.LONGDATETIME=function(t){return[0,0,0,0,t>>24&255,t>>16&255,t>>8&255,t&255]},xe.LONGDATETIME=Pe(8),re.TAG=function(t){return he.argument(t.length===4,"Tag should be exactly 4 ASCII characters."),[t.charCodeAt(0),t.charCodeAt(1),t.charCodeAt(2),t.charCodeAt(3)]},xe.TAG=Pe(4),re.Card8=re.BYTE,xe.Card8=xe.BYTE,re.Card16=re.USHORT,xe.Card16=xe.USHORT,re.OffSize=re.BYTE,xe.OffSize=xe.BYTE,re.SID=re.USHORT,xe.SID=xe.USHORT,re.NUMBER=function(t){return t>=-107&&t<=107?[t+139]:t>=108&&t<=1131?(t=t-108,[(t>>8)+247,t&255]):t>=-1131&&t<=-108?(t=-t-108,[(t>>8)+251,t&255]):t>=-32768&&t<=32767?re.NUMBER16(t):re.NUMBER32(t)},xe.NUMBER=function(t){return re.NUMBER(t).length},re.NUMBER16=function(t){return[28,t>>8&255,t&255]},xe.NUMBER16=Pe(3),re.NUMBER32=function(t){return[29,t>>24&255,t>>16&255,t>>8&255,t&255]},xe.NUMBER32=Pe(5),re.REAL=function(t){let i=t.toString(),s=/\.(\d*?)(?:9{5,20}|0{5,20})\d{0,2}(?:e(.+)|$)/.exec(i);if(s){let u=parseFloat("1e"+((s[2]?+s[2]:0)+s[1].length));i=(Math.round(t*u)/u).toString()}let r="";for(let u=0,f=i.length;u<f;u+=1){let m=i[u];m==="e"?r+=i[++u]==="-"?"c":"b":m==="."?r+="a":m==="-"?r+="e":r+=m}r+=r.length&1?"f":"ff";let o=[30];for(let u=0,f=r.length;u<f;u+=2)o.push(parseInt(r.substr(u,2),16));return o},xe.REAL=function(t){return re.REAL(t).length},re.NAME=re.CHARARRAY,xe.NAME=xe.CHARARRAY,re.STRING=re.CHARARRAY,xe.STRING=xe.CHARARRAY,Ft.UTF8=function(t,i,s){let r=[],o=s;for(let u=0;u<o;u++,i+=1)r[u]=t.getUint8(i);return String.fromCharCode.apply(null,r)},Ft.UTF16=function(t,i,s){let r=[],o=s/2;for(let u=0;u<o;u++,i+=2)r[u]=t.getUint16(i);return String.fromCharCode.apply(null,r)},re.UTF16=function(t){let i=[];for(let s=0;s<t.length;s+=1){let r=t.charCodeAt(s);i[i.length]=r>>8&255,i[i.length]=r&255}return i},xe.UTF16=function(t){return t.length*2};var St={"x-mac-croatian":"\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\u0160\u2122\xB4\xA8\u2260\u017D\xD8\u221E\xB1\u2264\u2265\u2206\xB5\u2202\u2211\u220F\u0161\u222B\xAA\xBA\u03A9\u017E\xF8\xBF\xA1\xAC\u221A\u0192\u2248\u0106\xAB\u010C\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u0110\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\uF8FF\xA9\u2044\u20AC\u2039\u203A\xC6\xBB\u2013\xB7\u201A\u201E\u2030\xC2\u0107\xC1\u010D\xC8\xCD\xCE\xCF\xCC\xD3\xD4\u0111\xD2\xDA\xDB\xD9\u0131\u02C6\u02DC\xAF\u03C0\xCB\u02DA\xB8\xCA\xE6\u02C7","x-mac-cyrillic":"\u0410\u0411\u0412\u0413\u0414\u0415\u0416\u0417\u0418\u0419\u041A\u041B\u041C\u041D\u041E\u041F\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042A\u042B\u042C\u042D\u042E\u042F\u2020\xB0\u0490\xA3\xA7\u2022\xB6\u0406\xAE\xA9\u2122\u0402\u0452\u2260\u0403\u0453\u221E\xB1\u2264\u2265\u0456\xB5\u0491\u0408\u0404\u0454\u0407\u0457\u0409\u0459\u040A\u045A\u0458\u0405\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\u040B\u045B\u040C\u045C\u0455\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u201E\u040E\u045E\u040F\u045F\u2116\u0401\u0451\u044F\u0430\u0431\u0432\u0433\u0434\u0435\u0436\u0437\u0438\u0439\u043A\u043B\u043C\u043D\u043E\u043F\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044A\u044B\u044C\u044D\u044E","x-mac-gaelic":"\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\xC6\xD8\u1E02\xB1\u2264\u2265\u1E03\u010A\u010B\u1E0A\u1E0B\u1E1E\u1E1F\u0120\u0121\u1E40\xE6\xF8\u1E41\u1E56\u1E57\u027C\u0192\u017F\u1E60\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\u1E61\u1E9B\xFF\u0178\u1E6A\u20AC\u2039\u203A\u0176\u0177\u1E6B\xB7\u1EF2\u1EF3\u204A\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\u2663\xD2\xDA\xDB\xD9\u0131\xDD\xFD\u0174\u0175\u1E84\u1E85\u1E80\u1E81\u1E82\u1E83","x-mac-greek":"\xC4\xB9\xB2\xC9\xB3\xD6\xDC\u0385\xE0\xE2\xE4\u0384\xA8\xE7\xE9\xE8\xEA\xEB\xA3\u2122\xEE\xEF\u2022\xBD\u2030\xF4\xF6\xA6\u20AC\xF9\xFB\xFC\u2020\u0393\u0394\u0398\u039B\u039E\u03A0\xDF\xAE\xA9\u03A3\u03AA\xA7\u2260\xB0\xB7\u0391\xB1\u2264\u2265\xA5\u0392\u0395\u0396\u0397\u0399\u039A\u039C\u03A6\u03AB\u03A8\u03A9\u03AC\u039D\xAC\u039F\u03A1\u2248\u03A4\xAB\xBB\u2026\xA0\u03A5\u03A7\u0386\u0388\u0153\u2013\u2015\u201C\u201D\u2018\u2019\xF7\u0389\u038A\u038C\u038E\u03AD\u03AE\u03AF\u03CC\u038F\u03CD\u03B1\u03B2\u03C8\u03B4\u03B5\u03C6\u03B3\u03B7\u03B9\u03BE\u03BA\u03BB\u03BC\u03BD\u03BF\u03C0\u03CE\u03C1\u03C3\u03C4\u03B8\u03C9\u03C2\u03C7\u03C5\u03B6\u03CA\u03CB\u0390\u03B0\xAD","x-mac-icelandic":"\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\xDD\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\xC6\xD8\u221E\xB1\u2264\u2265\xA5\xB5\u2202\u2211\u220F\u03C0\u222B\xAA\xBA\u03A9\xE6\xF8\xBF\xA1\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\xFF\u0178\u2044\u20AC\xD0\xF0\xDE\xFE\xFD\xB7\u201A\u201E\u2030\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\uF8FF\xD2\xDA\xDB\xD9\u0131\u02C6\u02DC\xAF\u02D8\u02D9\u02DA\xB8\u02DD\u02DB\u02C7","x-mac-inuit":"\u1403\u1404\u1405\u1406\u140A\u140B\u1431\u1432\u1433\u1434\u1438\u1439\u1449\u144E\u144F\u1450\u1451\u1455\u1456\u1466\u146D\u146E\u146F\u1470\u1472\u1473\u1483\u148B\u148C\u148D\u148E\u1490\u1491\xB0\u14A1\u14A5\u14A6\u2022\xB6\u14A7\xAE\xA9\u2122\u14A8\u14AA\u14AB\u14BB\u14C2\u14C3\u14C4\u14C5\u14C7\u14C8\u14D0\u14EF\u14F0\u14F1\u14F2\u14F4\u14F5\u1505\u14D5\u14D6\u14D7\u14D8\u14DA\u14DB\u14EA\u1528\u1529\u152A\u152B\u152D\u2026\xA0\u152E\u153E\u1555\u1556\u1557\u2013\u2014\u201C\u201D\u2018\u2019\u1558\u1559\u155A\u155D\u1546\u1547\u1548\u1549\u154B\u154C\u1550\u157F\u1580\u1581\u1582\u1583\u1584\u1585\u158F\u1590\u1591\u1592\u1593\u1594\u1595\u1671\u1672\u1673\u1674\u1675\u1676\u1596\u15A0\u15A1\u15A2\u15A3\u15A4\u15A5\u15A6\u157C\u0141\u0142","x-mac-ce":"\xC4\u0100\u0101\xC9\u0104\xD6\xDC\xE1\u0105\u010C\xE4\u010D\u0106\u0107\xE9\u0179\u017A\u010E\xED\u010F\u0112\u0113\u0116\xF3\u0117\xF4\xF6\xF5\xFA\u011A\u011B\xFC\u2020\xB0\u0118\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\u0119\xA8\u2260\u0123\u012E\u012F\u012A\u2264\u2265\u012B\u0136\u2202\u2211\u0142\u013B\u013C\u013D\u013E\u0139\u013A\u0145\u0146\u0143\xAC\u221A\u0144\u0147\u2206\xAB\xBB\u2026\xA0\u0148\u0150\xD5\u0151\u014C\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\u014D\u0154\u0155\u0158\u2039\u203A\u0159\u0156\u0157\u0160\u201A\u201E\u0161\u015A\u015B\xC1\u0164\u0165\xCD\u017D\u017E\u016A\xD3\xD4\u016B\u016E\xDA\u016F\u0170\u0171\u0172\u0173\xDD\xFD\u0137\u017B\u0141\u017C\u0122\u02C7",macintosh:"\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\xC6\xD8\u221E\xB1\u2264\u2265\xA5\xB5\u2202\u2211\u220F\u03C0\u222B\xAA\xBA\u03A9\xE6\xF8\xBF\xA1\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\xFF\u0178\u2044\u20AC\u2039\u203A\uFB01\uFB02\u2021\xB7\u201A\u201E\u2030\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\uF8FF\xD2\xDA\xDB\xD9\u0131\u02C6\u02DC\xAF\u02D8\u02D9\u02DA\xB8\u02DD\u02DB\u02C7","x-mac-romanian":"\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\u0102\u0218\u221E\xB1\u2264\u2265\xA5\xB5\u2202\u2211\u220F\u03C0\u222B\xAA\xBA\u03A9\u0103\u0219\xBF\xA1\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\xFF\u0178\u2044\u20AC\u2039\u203A\u021A\u021B\u2021\xB7\u201A\u201E\u2030\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\uF8FF\xD2\xDA\xDB\xD9\u0131\u02C6\u02DC\xAF\u02D8\u02D9\u02DA\xB8\u02DD\u02DB\u02C7","x-mac-turkish":"\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\xC6\xD8\u221E\xB1\u2264\u2265\xA5\xB5\u2202\u2211\u220F\u03C0\u222B\xAA\xBA\u03A9\xE6\xF8\xBF\xA1\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\xFF\u0178\u011E\u011F\u0130\u0131\u015E\u015F\u2021\xB7\u201A\u201E\u2030\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\uF8FF\xD2\xDA\xDB\xD9\uF8A0\u02C6\u02DC\xAF\u02D8\u02D9\u02DA\xB8\u02DD\u02DB\u02C7"};Ft.MACSTRING=function(t,i,s,r){let o=St[r];if(o===void 0)return;let u="";for(let f=0;f<s;f++){let m=t.getUint8(i+f);m<=127?u+=String.fromCharCode(m):u+=o[m&127]}return u};var et=typeof WeakMap=="function"&&new WeakMap,O,R=function(t){if(!O){O={};for(let o in St)O[o]=new String(o)}let i=O[t];if(i===void 0)return;if(et){let o=et.get(i);if(o!==void 0)return o}let s=St[t];if(s===void 0)return;let r={};for(let o=0;o<s.length;o++)r[s.charCodeAt(o)]=o+128;return et&&et.set(i,r),r};re.MACSTRING=function(t,i){let s=R(i);if(s===void 0)return;let r=[];for(let o=0;o<t.length;o++){let u=t.charCodeAt(o);if(u>=128&&(u=s[u],u===void 0))return;r[o]=u}return r},xe.MACSTRING=function(t,i){let s=re.MACSTRING(t,i);return s!==void 0?s.length:0};function j(t){return t>=-128&&t<=127}function be(t,i,s){let r=0,o=t.length;for(;i<o&&r<64&&t[i]===0;)++i,++r;return s.push(128|r-1),i}function ye(t,i,s){let r=0,o=t.length,u=i;for(;u<o&&r<64;){let f=t[u];if(!j(f)||f===0&&u+1<o&&t[u+1]===0)break;++u,++r}s.push(r-1);for(let f=i;f<u;++f)s.push(t[f]+256&255);return u}function Se(t,i,s){let r=0,o=t.length,u=i;for(;u<o&&r<64;){let f=t[u];if(f===0||j(f)&&u+1<o&&j(t[u+1]))break;++u,++r}s.push(64|r-1);for(let f=i;f<u;++f){let m=t[f];s.push(m+65536>>8&255,m+256&255)}return u}re.VARDELTAS=function(t){let i=0,s=[];for(;i<t.length;){let r=t[i];r===0?i=be(t,i,s):r>=-128&&r<=127?i=ye(t,i,s):i=Se(t,i,s)}return s},re.INDEX=function(t){let i=1,s=[i],r=[];for(let m=0;m<t.length;m+=1){let g=re.OBJECT(t[m]);Array.prototype.push.apply(r,g),i+=g.length,s.push(i)}if(r.length===0)return[0,0];let o=[],u=1+Math.floor(Math.log(i)/Math.log(2))/8|0,f=[void 0,re.BYTE,re.USHORT,re.UINT24,re.ULONG][u];for(let m=0;m<s.length;m+=1){let g=f(s[m]);Array.prototype.push.apply(o,g)}return Array.prototype.concat(re.Card16(t.length),re.OffSize(u),o,r)},xe.INDEX=function(t){return re.INDEX(t).length},re.DICT=function(t){let i=[],s=Object.keys(t),r=s.length;for(let o=0;o<r;o+=1){let u=parseInt(s[o],0),f=t[u],m=re.OPERAND(f.value,f.type),g=re.OPERATOR(u);for(let S=0;S<m.length;S++)i.push(m[S]);for(let S=0;S<g.length;S++)i.push(g[S])}return i},xe.DICT=function(t){return re.DICT(t).length},re.OPERATOR=function(t){return t<1200?[t]:[12,t-1200]},re.OPERAND=function(t,i){let s=[];if(Array.isArray(i))for(let r=0;r<i.length;r+=1){he.argument(t.length===i.length,"Not enough arguments given for type"+i);let o=re.OPERAND(t[r],i[r]);for(let u=0;u<o.length;u++)s.push(o[u])}else if(i==="SID"){let r=re.NUMBER(t);for(let o=0;o<r.length;o++)s.push(r[o])}else if(i==="offset"){let r=re.NUMBER32(t);for(let o=0;o<r.length;o++)s.push(r[o])}else if(i==="number"){let r=re.NUMBER(t);for(let o=0;o<r.length;o++)s.push(r[o])}else if(i==="real"){let r=re.REAL(t);for(let o=0;o<r.length;o++)s.push(r[o])}else throw new Error("Unknown operand type "+i);return s},re.OP=re.BYTE,xe.OP=xe.BYTE;var ke=typeof WeakMap=="function"&&new WeakMap;re.CHARSTRING=function(t){if(ke){let r=ke.get(t);if(r!==void 0)return r}let i=[],s=t.length;for(let r=0;r<s;r+=1){let o=t[r],u=re[o.type](o.value);for(let f=0;f<u.length;f++)i.push(u[f])}return ke&&ke.set(t,i),i},xe.CHARSTRING=function(t){return re.CHARSTRING(t).length},re.OBJECT=function(t){let i=re[t.type];return he.argument(i!==void 0,"No encoding function for type "+t.type),i(t.value)},xe.OBJECT=function(t){let i=xe[t.type];return he.argument(i!==void 0,"No sizeOf function for type "+t.type),i(t.value)},re.TABLE=function(t){let i=[],s=(t.fields||[]).length,r=[],o=[];for(let u=0;u<s;u+=1){let f=t.fields[u],m=re[f.type];he.argument(m!==void 0,"No encoding function for field type "+f.type+" ("+f.name+")");let g=t[f.name];g===void 0&&(g=f.value);let S=m(g);if(f.type==="TABLE")g.fields!==null&&(o.push(i.length),r.push(S)),i.push(0,0);else for(let v=0;v<S.length;v++)i.push(S[v])}for(let u=0;u<r.length;u+=1){let f=o[u],m=i.length;he.argument(m<65536,"Table "+t.tableName+" too big."),i[f]=m>>8,i[f+1]=m&255;for(let g=0;g<r[u].length;g++)i.push(r[u][g])}return i},xe.TABLE=function(t){let i=0,s=(t.fields||[]).length;for(let r=0;r<s;r+=1){let o=t.fields[r],u=xe[o.type];he.argument(u!==void 0,"No sizeOf function for field type "+o.type+" ("+o.name+")");let f=t[o.name];f===void 0&&(f=o.value),i+=u(f),o.type==="TABLE"&&(i+=2)}return i},re.RECORD=re.TABLE,xe.RECORD=xe.TABLE,re.LITERAL=function(t){return t},xe.LITERAL=function(t){return t.length};function ve(t,i,s){if(i&&i.length)for(let r=0;r<i.length;r+=1){let o=i[r];this[o.name]=o.value}if(this.tableName=t,this.fields=i,s){let r=Object.keys(s);for(let o=0;o<r.length;o+=1){let u=r[o],f=s[u];this[u]!==void 0&&(this[u]=f)}}}ve.prototype.encode=function(){return re.TABLE(this)},ve.prototype.sizeOf=function(){return xe.TABLE(this)};function Ue(t,i,s){s===void 0&&(s=i.length);let r=new Array(i.length+1);r[0]={name:t+"Count",type:"USHORT",value:s};for(let o=0;o<i.length;o++)r[o+1]={name:t+o,type:"USHORT",value:i[o]};return r}function qe(t,i,s){let r=i.length,o=new Array(r+1);o[0]={name:t+"Count",type:"USHORT",value:r};for(let u=0;u<r;u++)o[u+1]={name:t+u,type:"TABLE",value:s(i[u],u)};return o}function Qe(t,i,s){let r=i.length,o=[];o[0]={name:t+"Count",type:"USHORT",value:r};for(let u=0;u<r;u++)o=o.concat(s(i[u],u));return o}function de(t){t.format===1?ve.call(this,"coverageTable",[{name:"coverageFormat",type:"USHORT",value:1}].concat(Ue("glyph",t.glyphs))):t.format===2?ve.call(this,"coverageTable",[{name:"coverageFormat",type:"USHORT",value:2}].concat(Qe("rangeRecord",t.ranges,function(i,s){return[{name:"startGlyphID"+s,type:"USHORT",value:i.start},{name:"endGlyphID"+s,type:"USHORT",value:i.end},{name:"startCoverageIndex"+s,type:"USHORT",value:i.index}]}))):he.assert(!1,"Coverage format must be 1 or 2.")}de.prototype=Object.create(ve.prototype),de.prototype.constructor=de;function gt(t){ve.call(this,"scriptListTable",Qe("scriptRecord",t,function(i,s){let r=i.script,o=r.defaultLangSys;return he.assert(!!o,"Unable to write GSUB: script "+i.tag+" has no default language system."),[{name:"scriptTag"+s,type:"TAG",value:i.tag},{name:"script"+s,type:"TABLE",value:new ve("scriptTable",[{name:"defaultLangSys",type:"TABLE",value:new ve("defaultLangSys",[{name:"lookupOrder",type:"USHORT",value:0},{name:"reqFeatureIndex",type:"USHORT",value:o.reqFeatureIndex}].concat(Ue("featureIndex",o.featureIndexes)))}].concat(Qe("langSys",r.langSysRecords,function(u,f){let m=u.langSys;return[{name:"langSysTag"+f,type:"TAG",value:u.tag},{name:"langSys"+f,type:"TABLE",value:new ve("langSys",[{name:"lookupOrder",type:"USHORT",value:0},{name:"reqFeatureIndex",type:"USHORT",value:m.reqFeatureIndex}].concat(Ue("featureIndex",m.featureIndexes)))}]})))}]}))}gt.prototype=Object.create(ve.prototype),gt.prototype.constructor=gt;function rt(t){ve.call(this,"featureListTable",Qe("featureRecord",t,function(i,s){let r=i.feature;return[{name:"featureTag"+s,type:"TAG",value:i.tag},{name:"feature"+s,type:"TABLE",value:new ve("featureTable",[{name:"featureParams",type:"USHORT",value:r.featureParams}].concat(Ue("lookupListIndex",r.lookupListIndexes)))}]}))}rt.prototype=Object.create(ve.prototype),rt.prototype.constructor=rt;function je(t,i){ve.call(this,"lookupListTable",qe("lookup",t,function(s){let r=i[s.lookupType];return he.assert(!!r,"Unable to write GSUB lookup type "+s.lookupType+" tables."),new ve("lookupTable",[{name:"lookupType",type:"USHORT",value:s.lookupType},{name:"lookupFlag",type:"USHORT",value:s.lookupFlag}].concat(qe("subtable",s.subtables,r)))}))}je.prototype=Object.create(ve.prototype),je.prototype.constructor=je;function We(t){t.format===1?ve.call(this,"classDefTable",[{name:"classFormat",type:"USHORT",value:1},{name:"startGlyphID",type:"USHORT",value:t.startGlyph}].concat(Ue("glyph",t.classes))):t.format===2?ve.call(this,"classDefTable",[{name:"classFormat",type:"USHORT",value:2}].concat(Qe("rangeRecord",t.ranges,function(i,s){return[{name:"startGlyphID"+s,type:"USHORT",value:i.start},{name:"endGlyphID"+s,type:"USHORT",value:i.end},{name:"class"+s,type:"USHORT",value:i.classId}]}))):he.assert(!1,"Class format must be 1 or 2.")}We.prototype=Object.create(ve.prototype),We.prototype.constructor=We;var $={Table:ve,Record:ve,Coverage:de,ClassDef:We,ScriptList:gt,FeatureList:rt,LookupList:je,ushortList:Ue,tableList:qe,recordList:Qe};function it(t,i){return t.getUint8(i)}function mt(t,i){return t.getUint16(i,!1)}function Pt(t,i){return t.getInt16(i,!1)}function at(t,i){return(t.getUint16(i)<<8)+t.getUint8(i+2)}function Te(t,i){return t.getUint32(i,!1)}function G(t,i){return t.getInt32(i,!1)}function Ce(t,i){let s=t.getInt16(i,!1),r=t.getUint16(i+2,!1);return s+r/65535}function Re(t,i){let s="";for(let r=i;r<i+4;r+=1)s+=String.fromCharCode(t.getInt8(r));return s}function Je(t,i,s){let r=0;for(let o=0;o<s;o+=1)r<<=8,r+=t.getUint8(i+o);return r}function Ye(t,i,s){let r=[];for(let o=i;o<s;o+=1)r.push(t.getUint8(o));return r}function Mt(t){let i="";for(let s=0;s<t.length;s+=1)i+=String.fromCharCode(t[s]);return i}var Tt={byte:1,uShort:2,f2dot14:2,short:2,uInt24:3,uLong:4,fixed:4,longDateTime:8,tag:4},pt={LONG_WORDS:32768,WORD_DELTA_COUNT_MASK:32767,SHARED_POINT_NUMBERS:32768,COUNT_MASK:4095,EMBEDDED_PEAK_TUPLE:32768,INTERMEDIATE_REGION:16384,PRIVATE_POINT_NUMBERS:8192,TUPLE_INDEX_MASK:4095,POINTS_ARE_WORDS:128,POINT_RUN_COUNT_MASK:127,DELTAS_ARE_ZERO:128,DELTAS_ARE_WORDS:64,DELTA_RUN_COUNT_MASK:63,INNER_INDEX_BIT_COUNT_MASK:15,MAP_ENTRY_SIZE_MASK:48};function H(t,i){this.data=t,this.offset=i,this.relativeOffset=0}H.prototype.parseByte=function(){let t=this.data.getUint8(this.offset+this.relativeOffset);return this.relativeOffset+=1,t},H.prototype.parseChar=function(){let t=this.data.getInt8(this.offset+this.relativeOffset);return this.relativeOffset+=1,t},H.prototype.parseCard8=H.prototype.parseByte,H.prototype.parseUShort=function(){let t=this.data.getUint16(this.offset+this.relativeOffset);return this.relativeOffset+=2,t},H.prototype.parseCard16=H.prototype.parseUShort,H.prototype.parseSID=H.prototype.parseUShort,H.prototype.parseOffset16=H.prototype.parseUShort,H.prototype.parseShort=function(){let t=this.data.getInt16(this.offset+this.relativeOffset);return this.relativeOffset+=2,t},H.prototype.parseF2Dot14=function(){let t=this.data.getInt16(this.offset+this.relativeOffset)/16384;return this.relativeOffset+=2,t},H.prototype.parseUInt24=function(){let t=at(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=3,t},H.prototype.parseULong=function(){let t=Te(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,t},H.prototype.parseLong=function(){let t=G(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,t},H.prototype.parseOffset32=H.prototype.parseULong,H.prototype.parseFixed=function(){let t=Ce(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,t},H.prototype.parseString=function(t){let i=this.data,s=this.offset+this.relativeOffset,r="";this.relativeOffset+=t;for(let o=0;o<t;o++)r+=String.fromCharCode(i.getUint8(s+o));return r},H.prototype.parseTag=function(){return this.parseString(4)},H.prototype.parseLongDateTime=function(){let t=Te(this.data,this.offset+this.relativeOffset+4);return t-=2082844800,this.relativeOffset+=8,t},H.prototype.parseVersion=function(t){let i=mt(this.data,this.offset+this.relativeOffset),s=mt(this.data,this.offset+this.relativeOffset+2);return this.relativeOffset+=4,t===void 0&&(t=4096),i+s/t/10},H.prototype.skip=function(t,i){i===void 0&&(i=1),this.relativeOffset+=Tt[t]*i},H.prototype.parseULongList=function(t){t===void 0&&(t=this.parseULong());let i=new Array(t),s=this.data,r=this.offset+this.relativeOffset;for(let o=0;o<t;o++)i[o]=s.getUint32(r),r+=4;return this.relativeOffset+=t*4,i},H.prototype.parseOffset16List=H.prototype.parseUShortList=function(t){t===void 0&&(t=this.parseUShort());let i=new Array(t),s=this.data,r=this.offset+this.relativeOffset;for(let o=0;o<t;o++)i[o]=s.getUint16(r),r+=2;return this.relativeOffset+=t*2,i},H.prototype.parseShortList=function(t){let i=new Array(t),s=this.data,r=this.offset+this.relativeOffset;for(let o=0;o<t;o++)i[o]=s.getInt16(r),r+=2;return this.relativeOffset+=t*2,i},H.prototype.parseByteList=function(t){let i=new Array(t),s=this.data,r=this.offset+this.relativeOffset;for(let o=0;o<t;o++)i[o]=s.getUint8(r++);return this.relativeOffset+=t,i},H.prototype.parseList=function(t,i){i||(i=t,t=this.parseUShort());let s=new Array(t);for(let r=0;r<t;r++)s[r]=i.call(this);return s},H.prototype.parseList32=function(t,i){i||(i=t,t=this.parseULong());let s=new Array(t);for(let r=0;r<t;r++)s[r]=i.call(this);return s},H.prototype.parseRecordList=function(t,i){i||(i=t,t=this.parseUShort());let s=new Array(t),r=Object.keys(i);for(let o=0;o<t;o++){let u={};for(let f=0;f<r.length;f++){let m=r[f],g=i[m];u[m]=g.call(this)}s[o]=u}return s},H.prototype.parseRecordList32=function(t,i){i||(i=t,t=this.parseULong());let s=new Array(t),r=Object.keys(i);for(let o=0;o<t;o++){let u={};for(let f=0;f<r.length;f++){let m=r[f],g=i[m];u[m]=g.call(this)}s[o]=u}return s},H.prototype.parseTupleRecords=function(t,i){let s=[];for(let r=0;r<t;r++){let o=[];for(let u=0;u<i;u++)o.push(this.parseF2Dot14());s.push(o)}return s},H.prototype.parseStruct=function(t){if(typeof t=="function")return t.call(this);{let i=Object.keys(t),s={};for(let r=0;r<i.length;r++){let o=i[r],u=t[o];s[o]=u.call(this)}return s}},H.prototype.parseValueRecord=function(t){if(t===void 0&&(t=this.parseUShort()),t===0)return;let i={};return t&1&&(i.xPlacement=this.parseShort()),t&2&&(i.yPlacement=this.parseShort()),t&4&&(i.xAdvance=this.parseShort()),t&8&&(i.yAdvance=this.parseShort()),t&16&&(i.xPlaDevice=void 0,this.parseShort()),t&32&&(i.yPlaDevice=void 0,this.parseShort()),t&64&&(i.xAdvDevice=void 0,this.parseShort()),t&128&&(i.yAdvDevice=void 0,this.parseShort()),i},H.prototype.parseValueRecordList=function(){let t=this.parseUShort(),i=this.parseUShort(),s=new Array(i);for(let r=0;r<i;r++)s[r]=this.parseValueRecord(t);return s},H.prototype.parsePointer=function(t){let i=this.parseOffset16();if(i>0)return new H(this.data,this.offset+i).parseStruct(t)},H.prototype.parsePointer32=function(t){let i=this.parseOffset32();if(i>0)return new H(this.data,this.offset+i).parseStruct(t)},H.prototype.parseListOfLists=function(t){let i=this.parseOffset16List(),s=i.length,r=this.relativeOffset,o=new Array(s);for(let u=0;u<s;u++){let f=i[u];if(f===0){o[u]=void 0;continue}if(this.relativeOffset=f,t){let m=this.parseOffset16List(),g=new Array(m.length);for(let S=0;S<m.length;S++)this.relativeOffset=f+m[S],g[S]=t.call(this);o[u]=g}else o[u]=this.parseUShortList()}return this.relativeOffset=r,o},H.prototype.parseCoverage=function(){let t=this.offset+this.relativeOffset,i=this.parseUShort(),s=this.parseUShort();if(i===1)return{format:1,glyphs:this.parseUShortList(s)};if(i===2){let r=new Array(s);for(let o=0;o<s;o++)r[o]={start:this.parseUShort(),end:this.parseUShort(),index:this.parseUShort()};return{format:2,ranges:r}}throw new Error("0x"+t.toString(16)+": Coverage format must be 1 or 2.")},H.prototype.parseClassDef=function(){let t=this.offset+this.relativeOffset,i=this.parseUShort();return i===1?{format:1,startGlyph:this.parseUShort(),classes:this.parseUShortList()}:i===2?{format:2,ranges:this.parseRecordList({start:H.uShort,end:H.uShort,classId:H.uShort})}:(console.warn(`0x${t.toString(16)}: This font file uses an invalid ClassDef format of ${i}. It might be corrupted and should be reacquired if it doesn't display as intended.`),{format:i})},H.list=function(t,i){return function(){return this.parseList(t,i)}},H.list32=function(t,i){return function(){return this.parseList32(t,i)}},H.recordList=function(t,i){return function(){return this.parseRecordList(t,i)}},H.recordList32=function(t,i){return function(){return this.parseRecordList32(t,i)}},H.pointer=function(t){return function(){return this.parsePointer(t)}},H.pointer32=function(t){return function(){return this.parsePointer32(t)}},H.tag=H.prototype.parseTag,H.byte=H.prototype.parseByte,H.uShort=H.offset16=H.prototype.parseUShort,H.uShortList=H.prototype.parseUShortList,H.uInt24=H.prototype.parseUInt24,H.uLong=H.offset32=H.prototype.parseULong,H.uLongList=H.prototype.parseULongList,H.fixed=H.prototype.parseFixed,H.f2Dot14=H.prototype.parseF2Dot14,H.struct=H.prototype.parseStruct,H.coverage=H.prototype.parseCoverage,H.classDef=H.prototype.parseClassDef;var _t={reserved:H.uShort,reqFeatureIndex:H.uShort,featureIndexes:H.uShortList};H.prototype.parseScriptList=function(){return this.parsePointer(H.recordList({tag:H.tag,script:H.pointer({defaultLangSys:H.pointer(_t),langSysRecords:H.recordList({tag:H.tag,langSys:H.pointer(_t)})})}))||[]},H.prototype.parseFeatureList=function(){return this.parsePointer(H.recordList({tag:H.tag,feature:H.pointer({featureParams:H.offset16,lookupListIndexes:H.uShortList})}))||[]},H.prototype.parseLookupList=function(t){return this.parsePointer(H.list(H.pointer(function(){let i=this.parseUShort();he.argument(1<=i&&i<=9,"GPOS/GSUB lookup type "+i+" unknown.");let s=this.parseUShort(),r=s&16;return{lookupType:i,lookupFlag:s,subtables:this.parseList(H.pointer(t[i])),markFilteringSet:r?this.parseUShort():void 0}})))||[]},H.prototype.parseFeatureVariationsList=function(){return this.parsePointer32(function(){let t=this.parseUShort(),i=this.parseUShort();return he.argument(t===1&&i<1,"GPOS/GSUB feature variations table unknown."),this.parseRecordList32({conditionSetOffset:H.offset32,featureTableSubstitutionOffset:H.offset32})})||[]},H.prototype.parseVariationStore=function(){let t=this.relativeOffset,i=this.parseUShort(),s={itemVariationStore:this.parseItemVariationStore()};return this.relativeOffset=t+i+2,s},H.prototype.parseItemVariationStore=function(){let t=this.relativeOffset,i={format:this.parseUShort(),variationRegions:[],itemVariationSubtables:[]},s=this.parseOffset32(),r=this.parseUShort(),o=this.parseULongList(r);this.relativeOffset=t+s,i.variationRegions=this.parseVariationRegionList();for(let u=0;u<r;u++){let f=o[u];this.relativeOffset=t+f,i.itemVariationSubtables.push(this.parseItemVariationSubtable())}return i},H.prototype.parseVariationRegionList=function(){let t=this.parseUShort(),i=this.parseUShort();return this.parseRecordList(i,{regionAxes:H.recordList(t,{startCoord:H.f2Dot14,peakCoord:H.f2Dot14,endCoord:H.f2Dot14})})},H.prototype.parseItemVariationSubtable=function(){let t=this.parseUShort(),i=this.parseUShort(),s=this.parseUShortList(),r=s.length;return{regionIndexes:s,deltaSets:t&&r?this.parseDeltaSets(t,i,r):[]}},H.prototype.parseDeltaSetIndexMap=function(){let t=this.parseByte(),i=this.parseByte(),s=[],r=0;switch(t){case 0:r=this.parseUShort();break;case 1:r=this.parseULong();break;default:console.error(`unsupported DeltaSetIndexMap format ${t}`)}if(!r)return{format:t,entryFormat:i};let o=(i&pt.INNER_INDEX_BIT_COUNT_MASK)+1,u=((i&pt.MAP_ENTRY_SIZE_MASK)>>4)+1;for(let f=0;f<r;f++){let m;if(u===1)m=this.parseByte();else if(u===2)m=this.parseUShort();else if(u===3)m=this.parseUInt24();else if(u===4)m=this.parseULong();else throw new Error(`Invalid entry size of ${u}`);let g=m>>o,S=m&(1<<o)-1;s.push({outerIndex:g,innerIndex:S})}return{format:t,entryFormat:i,map:s}},H.prototype.parseDeltaSets=function(t,i,s){let r=Array.from({length:t},()=>[]),o=i&pt.LONG_WORDS,u=i&pt.WORD_DELTA_COUNT_MASK;if(u>s)throw Error("wordCount must be less than or equal to regionIndexCount");let f=(o?this.parseLong:this.parseShort).bind(this),m=(o?this.parseShort:this.parseChar).bind(this);for(let g=0;g<t;g++)for(let S=0;S<s;S++)S<u?r[g].push(f()):r[g].push(m());return r},H.prototype.parseTupleVariationStoreList=function(t,i,s){let r=this.parseUShort(),u=this.parseUShort()&1,f=this.parseOffset32(),m=(u?this.parseULong:this.parseUShort).bind(this),g={},S=m();u||(S*=2);let v;for(let I=0;I<r;I++){v=m(),u||(v*=2);let L=v-S;g[I]=L?this.parseTupleVariationStore(f+S,t,i,s,I):void 0,S=v}return g},H.prototype.parseTupleVariationStore=function(t,i,s,r,o){let u=this.relativeOffset;this.relativeOffset=t,s==="cvar"&&(this.relativeOffset+=4);let f=this.parseUShort(),m=!!(f&pt.SHARED_POINT_NUMBERS),g=f&pt.COUNT_MASK,S=this.parseOffset16(),v=[],I=[];for(let F=0;F<g;F++){let z=this.parseTupleVariationHeader(i,s);v.push(z)}this.relativeOffset!==t+S&&(console.warn(`Unexpected offset after parsing tuple variation headers! Expected ${t+S}, actually ${this.relativeOffset}`),this.relativeOffset=t+S),m&&(I=this.parsePackedPointNumbers());let L=this.relativeOffset;for(let F=0;F<g;F++){let z=v[F];z.privatePoints=[],this.relativeOffset=L,s==="cvar"&&!z.peakTuple&&console.warn("An embedded peak tuple is required in TupleVariationHeaders for the cvar table."),z.flags.privatePointNumbers&&(z.privatePoints=this.parsePackedPointNumbers()),delete z.flags;let ie=this.offset,ze=this.relativeOffset,Ne=Xe=>{let ct,xt,Et=()=>{let wt=0;if(s==="gvar"){if(wt=z.privatePoints.length||I.length,!wt){let Vt=r.get(o);Vt.path,wt=Vt.points.length,wt+=4}}else s==="cvar"&&(wt=r.length);this.offset=ie,this.relativeOffset=ze,ct=this.parsePackedDeltas(wt),s==="gvar"&&(xt=this.parsePackedDeltas(wt))};return{configurable:!0,get:function(){return ct===void 0&&Et(),Xe==="deltasY"?xt:ct},set:function(wt){ct===void 0&&Et(),Xe==="deltasY"?xt=wt:ct=wt}}};Object.defineProperty(z,"deltas",Ne.call(this,"deltas")),s==="gvar"&&Object.defineProperty(z,"deltasY",Ne.call(this,"deltasY")),L+=z.variationDataSize,delete z.variationDataSize}this.relativeOffset=u;let B={headers:v};return B.sharedPoints=I,B},H.prototype.parseTupleVariationHeader=function(t,i){let s=this.parseUShort(),r=this.parseUShort(),o=!!(r&pt.EMBEDDED_PEAK_TUPLE),u=!!(r&pt.INTERMEDIATE_REGION),f=!!(r&pt.PRIVATE_POINT_NUMBERS),m=o?void 0:r&pt.TUPLE_INDEX_MASK,g=o?this.parseTupleRecords(1,t)[0]:void 0,S=u?this.parseTupleRecords(1,t)[0]:void 0,v=u?this.parseTupleRecords(1,t)[0]:void 0,I={variationDataSize:s,peakTuple:g,intermediateStartTuple:S,intermediateEndTuple:v,flags:{embeddedPeakTuple:o,intermediateRegion:u,privatePointNumbers:f}};return i==="gvar"&&(I.sharedTupleRecordsIndex=m),I},H.prototype.parsePackedPointNumbers=function(){let t=this.parseByte(),i=[],s=t;if(t>=128){let o=this.parseByte();s=(t&pt.POINT_RUN_COUNT_MASK)<<8|o}let r=0;for(;i.length<s;){let o=this.parseByte(),u=!!(o&pt.POINTS_ARE_WORDS),f=(o&pt.POINT_RUN_COUNT_MASK)+1;for(let m=0;m<f&&i.length<s;m++){let g;u?g=this.parseUShort():g=this.parseByte(),r=r+g,i.push(r)}}return i},H.prototype.parsePackedDeltas=function(t){let i=[];for(;i.length<t;){let s=this.parseByte(),r=!!(s&pt.DELTAS_ARE_ZERO),o=!!(s&pt.DELTAS_ARE_WORDS),u=(s&pt.DELTA_RUN_COUNT_MASK)+1;for(let f=0;f<u&&i.length<t;f++)r?i.push(0):o?i.push(this.parseShort()):i.push(this.parseChar())}return i};var _e={getByte:it,getCard8:it,getUShort:mt,getCard16:mt,getShort:Pt,getUInt24:at,getULong:Te,getFixed:Ce,getTag:Re,getOffset:Je,getBytes:Ye,bytesToString:Mt,Parser:H},nn=["copyright","fontFamily","fontSubfamily","uniqueID","fullName","version","postScriptName","trademark","manufacturer","designer","description","manufacturerURL","designerURL","license","licenseURL","reserved","preferredFamily","preferredSubfamily","compatibleFullName","sampleText","postScriptFindFontName","wwsFamily","wwsSubfamily"],$s={0:"en",1:"fr",2:"de",3:"it",4:"nl",5:"sv",6:"es",7:"da",8:"pt",9:"no",10:"he",11:"ja",12:"ar",13:"fi",14:"el",15:"is",16:"mt",17:"tr",18:"hr",19:"zh-Hant",20:"ur",21:"hi",22:"th",23:"ko",24:"lt",25:"pl",26:"hu",27:"es",28:"lv",29:"se",30:"fo",31:"fa",32:"ru",33:"zh",34:"nl-BE",35:"ga",36:"sq",37:"ro",38:"cz",39:"sk",40:"si",41:"yi",42:"sr",43:"mk",44:"bg",45:"uk",46:"be",47:"uz",48:"kk",49:"az-Cyrl",50:"az-Arab",51:"hy",52:"ka",53:"mo",54:"ky",55:"tg",56:"tk",57:"mn-CN",58:"mn",59:"ps",60:"ks",61:"ku",62:"sd",63:"bo",64:"ne",65:"sa",66:"mr",67:"bn",68:"as",69:"gu",70:"pa",71:"or",72:"ml",73:"kn",74:"ta",75:"te",76:"si",77:"my",78:"km",79:"lo",80:"vi",81:"id",82:"tl",83:"ms",84:"ms-Arab",85:"am",86:"ti",87:"om",88:"so",89:"sw",90:"rw",91:"rn",92:"ny",93:"mg",94:"eo",128:"cy",129:"eu",130:"ca",131:"la",132:"qu",133:"gn",134:"ay",135:"tt",136:"ug",137:"dz",138:"jv",139:"su",140:"gl",141:"af",142:"br",143:"iu",144:"gd",145:"gv",146:"ga",147:"to",148:"el-polyton",149:"kl",150:"az",151:"nn"},Ba={0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:5,11:1,12:4,13:0,14:6,15:0,16:0,17:0,18:0,19:2,20:4,21:9,22:21,23:3,24:29,25:29,26:29,27:29,28:29,29:0,30:0,31:4,32:7,33:25,34:0,35:0,36:0,37:0,38:29,39:29,40:0,41:5,42:7,43:7,44:7,45:7,46:7,47:7,48:7,49:7,50:4,51:24,52:23,53:7,54:7,55:7,56:7,57:27,58:7,59:4,60:4,61:4,62:4,63:26,64:9,65:9,66:9,67:13,68:13,69:11,70:10,71:12,72:17,73:16,74:14,75:15,76:18,77:19,78:20,79:22,80:30,81:0,82:0,83:0,84:4,85:28,86:28,87:28,88:0,89:0,90:0,91:0,92:0,93:0,94:0,128:0,129:0,130:0,131:0,132:0,133:0,134:0,135:7,136:4,137:26,138:0,139:0,140:0,141:0,142:0,143:28,144:0,145:0,146:0,147:0,148:6,149:0,150:0,151:0},Hi={1078:"af",1052:"sq",1156:"gsw",1118:"am",5121:"ar-DZ",15361:"ar-BH",3073:"ar",2049:"ar-IQ",11265:"ar-JO",13313:"ar-KW",12289:"ar-LB",4097:"ar-LY",6145:"ary",8193:"ar-OM",16385:"ar-QA",1025:"ar-SA",10241:"ar-SY",7169:"aeb",14337:"ar-AE",9217:"ar-YE",1067:"hy",1101:"as",2092:"az-Cyrl",1068:"az",1133:"ba",1069:"eu",1059:"be",2117:"bn",1093:"bn-IN",8218:"bs-Cyrl",5146:"bs",1150:"br",1026:"bg",1027:"ca",3076:"zh-HK",5124:"zh-MO",2052:"zh",4100:"zh-SG",1028:"zh-TW",1155:"co",1050:"hr",4122:"hr-BA",1029:"cs",1030:"da",1164:"prs",1125:"dv",2067:"nl-BE",1043:"nl",3081:"en-AU",10249:"en-BZ",4105:"en-CA",9225:"en-029",16393:"en-IN",6153:"en-IE",8201:"en-JM",17417:"en-MY",5129:"en-NZ",13321:"en-PH",18441:"en-SG",7177:"en-ZA",11273:"en-TT",2057:"en-GB",1033:"en",12297:"en-ZW",1061:"et",1080:"fo",1124:"fil",1035:"fi",2060:"fr-BE",3084:"fr-CA",1036:"fr",5132:"fr-LU",6156:"fr-MC",4108:"fr-CH",1122:"fy",1110:"gl",1079:"ka",3079:"de-AT",1031:"de",5127:"de-LI",4103:"de-LU",2055:"de-CH",1032:"el",1135:"kl",1095:"gu",1128:"ha",1037:"he",1081:"hi",1038:"hu",1039:"is",1136:"ig",1057:"id",1117:"iu",2141:"iu-Latn",2108:"ga",1076:"xh",1077:"zu",1040:"it",2064:"it-CH",1041:"ja",1099:"kn",1087:"kk",1107:"km",1158:"quc",1159:"rw",1089:"sw",1111:"kok",1042:"ko",1088:"ky",1108:"lo",1062:"lv",1063:"lt",2094:"dsb",1134:"lb",1071:"mk",2110:"ms-BN",1086:"ms",1100:"ml",1082:"mt",1153:"mi",1146:"arn",1102:"mr",1148:"moh",1104:"mn",2128:"mn-CN",1121:"ne",1044:"nb",2068:"nn",1154:"oc",1096:"or",1123:"ps",1045:"pl",1046:"pt",2070:"pt-PT",1094:"pa",1131:"qu-BO",2155:"qu-EC",3179:"qu",1048:"ro",1047:"rm",1049:"ru",9275:"smn",4155:"smj-NO",5179:"smj",3131:"se-FI",1083:"se",2107:"se-SE",8251:"sms",6203:"sma-NO",7227:"sms",1103:"sa",7194:"sr-Cyrl-BA",3098:"sr",6170:"sr-Latn-BA",2074:"sr-Latn",1132:"nso",1074:"tn",1115:"si",1051:"sk",1060:"sl",11274:"es-AR",16394:"es-BO",13322:"es-CL",9226:"es-CO",5130:"es-CR",7178:"es-DO",12298:"es-EC",17418:"es-SV",4106:"es-GT",18442:"es-HN",2058:"es-MX",19466:"es-NI",6154:"es-PA",15370:"es-PY",10250:"es-PE",20490:"es-PR",3082:"es",1034:"es",21514:"es-US",14346:"es-UY",8202:"es-VE",2077:"sv-FI",1053:"sv",1114:"syr",1064:"tg",2143:"tzm",1097:"ta",1092:"tt",1098:"te",1054:"th",1105:"bo",1055:"tr",1090:"tk",1152:"ug",1058:"uk",1070:"hsb",1056:"ur",2115:"uz-Cyrl",1091:"uz",1066:"vi",1106:"cy",1160:"wo",1157:"sah",1144:"ii",1130:"yo"};function _r(t,i,s){switch(t){case 0:if(i===65535)return"und";if(s)return s[i];break;case 1:return $s[i];case 3:return Hi[i]}}var vi="utf-16",br={0:"macintosh",1:"x-mac-japanese",2:"x-mac-chinesetrad",3:"x-mac-korean",6:"x-mac-greek",7:"x-mac-cyrillic",9:"x-mac-devanagai",10:"x-mac-gurmukhi",11:"x-mac-gujarati",12:"x-mac-oriya",13:"x-mac-bengali",14:"x-mac-tamil",15:"x-mac-telugu",16:"x-mac-kannada",17:"x-mac-malayalam",18:"x-mac-sinhalese",19:"x-mac-burmese",20:"x-mac-khmer",21:"x-mac-thai",22:"x-mac-lao",23:"x-mac-georgian",24:"x-mac-armenian",25:"x-mac-chinesesimp",26:"x-mac-tibetan",27:"x-mac-mongolian",28:"x-mac-ethiopic",29:"x-mac-ce",30:"x-mac-vietnamese",31:"x-mac-extarabic"},Sr={15:"x-mac-icelandic",17:"x-mac-turkish",18:"x-mac-croatian",24:"x-mac-ce",25:"x-mac-ce",26:"x-mac-ce",27:"x-mac-ce",28:"x-mac-ce",30:"x-mac-icelandic",37:"x-mac-romanian",38:"x-mac-ce",39:"x-mac-ce",40:"x-mac-ce",143:"x-mac-inuit",146:"x-mac-gaelic"};function js(t,i,s){switch(t){case 0:return vi;case 1:return Sr[s]||br[i];case 3:if(i===1||i===10)return vi;break}}var Mr={0:"unicode",1:"macintosh",2:"reserved",3:"windows"};function za(t){return Mr[t]}function U(t,i,s){let r={},o=new _e.Parser(t,i),u=o.parseUShort(),f=o.parseUShort(),m=o.offset+o.parseUShort();for(let g=0;g<f;g++){let S=o.parseUShort(),v=o.parseUShort(),I=o.parseUShort(),L=o.parseUShort(),B=nn[L]||L,F=o.parseUShort(),z=o.parseUShort(),ie=_r(S,I,s),ze=js(S,v,I),Ne=za(S);if(ze!==void 0&&ie!==void 0&&Ne!==void 0){let Xe;if(ze===vi?Xe=Ft.UTF16(t,m+z,F):Xe=Ft.MACSTRING(t,m+z,F,ze),Xe){let ct=r[Ne];ct===void 0&&(ct=r[Ne]={});let xt=ct[B];xt===void 0&&(xt=ct[B]={}),xt[ie]=Xe}}}return u===1&&o.parseUShort(),r}function Y(t){let i={};for(let s in t)i[t[s]]=parseInt(s);return i}function Q(t,i,s,r,o,u){return new $.Record("NameRecord",[{name:"platformID",type:"USHORT",value:t},{name:"encodingID",type:"USHORT",value:i},{name:"languageID",type:"USHORT",value:s},{name:"nameID",type:"USHORT",value:r},{name:"length",type:"USHORT",value:o},{name:"offset",type:"USHORT",value:u}])}function ne(t,i){let s=t.length,r=i.length-s+1;e:for(let o=0;o<r;o++)for(;o<r;o++){for(let u=0;u<s;u++)if(i[o+u]!==t[u])continue e;return o}return-1}function J(t,i){let s=ne(t,i);if(s<0){s=i.length;let r=0,o=t.length;for(;r<o;++r)i.push(t[r])}return s}function Ie(t,i){let s=Y(Mr),r=Y($s),o=Y(Hi),u=[],f=[];for(let g in t){let S,v=[],I={},L=Y(nn),B=s[g];for(let F in t[g]){let z=L[F];if(z===void 0&&(z=F),S=parseInt(z),isNaN(S))throw new Error('Name table entry "'+F+'" does not exist, see nameTableNames for complete list.');I[S]=t[g][F],v.push(S)}for(let F=0;F<v.length;F++){S=v[F];let z=I[S];for(let ie in z){let ze=z[ie];if(B===1||B===0){let Ne=r[ie],Xe=Ba[Ne],ct=js(B,Xe,Ne),xt=re.MACSTRING(ze,ct);if(B===0&&(Ne=i.indexOf(ie),Ne<0&&(Ne=i.length,i.push(ie)),Xe=4,xt=re.UTF16(ze)),xt!==void 0){let Et=J(xt,f);u.push(Q(B,Xe,Ne,S,xt.length,Et))}}if(B===3){let Ne=o[ie];if(Ne!==void 0){let Xe=re.UTF16(ze),ct=J(Xe,f);u.push(Q(3,1,Ne,S,Xe.length,ct))}}}}}u.sort(function(g,S){return g.platformID-S.platformID||g.encodingID-S.encodingID||g.languageID-S.languageID||g.nameID-S.nameID});let m=new $.Table("name",[{name:"format",type:"USHORT",value:0},{name:"count",type:"USHORT",value:u.length},{name:"stringOffset",type:"USHORT",value:6+u.length*12}]);for(let g=0;g<u.length;g++)m.fields.push({name:"record_"+g,type:"RECORD",value:u[g]});return m.fields.push({name:"strings",type:"LITERAL",value:f}),m}function Be(t,i,s=[]){if(i<256&&i in nn){if(s.length&&!s.includes(parseInt(i)))return;i=nn[i]}for(let r in t)for(let o in t[r])if(o===i||parseInt(o)===i)return t[r][o]}var Ze={parse:U,make:Ie,getNameByID:Be};function Ke(t,i,s,r){t.length=i.parseUShort(),t.language=i.parseUShort()-1;let o=i.parseByteList(t.length),u=Object.assign({},o),f=js(s,r,t.language),m=St[f];for(let g=0;g<m.length;g++)u[m.charCodeAt(g)]=o[128+g];t.glyphIndexMap=u}function ot(t,i,s){i.parseUShort(),t.length=i.parseULong(),t.language=i.parseULong();let r;t.groupCount=r=i.parseULong(),t.glyphIndexMap={};for(let o=0;o<r;o+=1){let u=i.parseULong(),f=i.parseULong(),m=i.parseULong();for(let g=u;g<=f;g+=1)t.glyphIndexMap[g]=m,s===12&&m++}}function tt(t,i,s,r,o){t.length=i.parseUShort(),t.language=i.parseUShort();let u;t.segCount=u=i.parseUShort()>>1,i.skip("uShort",3),t.glyphIndexMap={};let f=new _e.Parser(s,r+o+14),m=new _e.Parser(s,r+o+16+u*2),g=new _e.Parser(s,r+o+16+u*4),S=new _e.Parser(s,r+o+16+u*6),v=r+o+16+u*8;for(let I=0;I<u-1;I+=1){let L,B=f.parseUShort(),F=m.parseUShort(),z=g.parseShort(),ie=S.parseUShort();for(let ze=F;ze<=B;ze+=1)ie!==0?(v=S.offset+S.relativeOffset-2,v+=ie,v+=(ze-F)*2,L=_e.getUShort(s,v),L!==0&&(L=L+z&65535)):L=ze+z&65535,t.glyphIndexMap[ze]=L}}function st(t,i){let s={};i.skip("uLong");let r=i.parseULong();for(let o=0;o<r;o+=1){let u=i.parseUInt24(),f={varSelector:u},m=i.parseOffset32(),g=i.parseOffset32(),S=i.relativeOffset;m&&(i.relativeOffset=m,f.defaultUVS=i.parseStruct({ranges:function(){return i.parseRecordList32({startUnicodeValue:i.parseUInt24,additionalCount:i.parseByte})}})),g&&(i.relativeOffset=g,f.nonDefaultUVS=i.parseStruct({uvsMappings:function(){let v={},I=i.parseRecordList32({unicodeValue:i.parseUInt24,glyphID:i.parseUShort});for(let L=0;L<I.length;L+=1)v[I[L].unicodeValue]=I[L];return v}})),s[u]=f,i.relativeOffset=S}t.varSelectorList=s}function Nt(t,i){let s={};s.version=_e.getUShort(t,i),he.argument(s.version===0,"cmap table version should be 0."),s.numTables=_e.getUShort(t,i+2);let r=null,o=-1,u=-1,f=null,m=null,g=[0,1,2,3,4,6],S=[0,1,10];for(let I=s.numTables-1;I>=0;I-=1)if(f=_e.getUShort(t,i+4+I*8),m=_e.getUShort(t,i+4+I*8+2),f===3&&S.includes(m)||f===0&&g.includes(m)||f===1&&m===0){if(u>0)continue;if(u=_e.getULong(t,i+4+I*8+4),r)break}else if(f===0&&m===5){if(o=_e.getULong(t,i+4+I*8+4),r=new _e.Parser(t,i+o),r.parseUShort()!==14)o=-1,r=null;else if(u>0)break}if(u===-1)throw new Error("No valid cmap sub-tables found.");let v=new _e.Parser(t,i+u);if(s.format=v.parseUShort(),s.format===0)Ke(s,v,f,m);else if(s.format===12||s.format===13)ot(s,v,s.format);else if(s.format===4)tt(s,v,t,i,u);else throw new Error("Only format 0 (platformId 1, encodingId 0), 4, 12 and 14 cmap tables are supported (found format "+s.format+", platformId "+f+", encodingId "+m+").");return r&&st(s,r),s}function sn(t,i,s){t.segments.push({end:i,start:i,delta:-(i-s),offset:0,glyphIndex:s})}function zt(t){t.segments.push({end:65535,start:65535,delta:1,offset:0})}function Pn(t){if(t.length===0)return t;let i=[t[0]];for(let s=1;s<t.length;s++){let r=i[i.length-1],o=t[s];r.end+1===o.start&&r.delta===o.delta&&o.end!==65535?r.end=o.end:i.push(o)}return i}function Lt(t){let i=!0,s;for(s=t.length-1;s>0;s-=1)if(t.get(s).unicode>65535){i=!1;break}let r=[{name:"version",type:"USHORT",value:0},{name:"numTables",type:"USHORT",value:i?1:2},{name:"platformID",type:"USHORT",value:3},{name:"encodingID",type:"USHORT",value:1},{name:"offset",type:"ULONG",value:i?12:20}];i||r.push({name:"cmap12PlatformID",type:"USHORT",value:3},{name:"cmap12EncodingID",type:"USHORT",value:10},{name:"cmap12Offset",type:"ULONG",value:0}),r.push({name:"format",type:"USHORT",value:4},{name:"cmap4Length",type:"USHORT",value:0},{name:"language",type:"USHORT",value:0},{name:"segCountX2",type:"USHORT",value:0},{name:"searchRange",type:"USHORT",value:0},{name:"entrySelector",type:"USHORT",value:0},{name:"rangeShift",type:"USHORT",value:0});let o=new $.Table("cmap",r);for(o.segments=[],s=0;s<t.length;s+=1){let B=t.get(s);for(let F=0;F<B.unicodes.length;F+=1)sn(o,B.unicodes[F],s)}o.segments.sort(function(B,F){return B.start-F.start}),o.segments=Pn(o.segments),zt(o);let u=o.segments.length,f=0,m=[],g=[],S=[],v=[],I=[],L=[];for(s=0;s<u;s+=1){let B=o.segments[s];B.end<=65535&&B.start<=65535?(m.push({name:"end_"+s,type:"USHORT",value:B.end}),g.push({name:"start_"+s,type:"USHORT",value:B.start}),S.push({name:"idDelta_"+s,type:"SHORT",value:B.delta}),v.push({name:"idRangeOffset_"+s,type:"USHORT",value:B.offset}),B.glyphId!==void 0&&I.push({name:"glyph_"+s,type:"USHORT",value:B.glyphId})):f+=1,!i&&B.glyphIndex!==void 0&&(L.push({name:"cmap12Start_"+s,type:"ULONG",value:B.start}),L.push({name:"cmap12End_"+s,type:"ULONG",value:B.end}),L.push({name:"cmap12Glyph_"+s,type:"ULONG",value:B.glyphIndex}))}o.segCountX2=(u-f)*2,o.searchRange=Math.pow(2,Math.floor(Math.log(u-f)/Math.log(2)))*2,o.entrySelector=Math.log(o.searchRange/2)/Math.log(2),o.rangeShift=o.segCountX2-o.searchRange;for(let B=0;B<m.length;B++)o.fields.push(m[B]);o.fields.push({name:"reservedPad",type:"USHORT",value:0});for(let B=0;B<g.length;B++)o.fields.push(g[B]);for(let B=0;B<S.length;B++)o.fields.push(S[B]);for(let B=0;B<v.length;B++)o.fields.push(v[B]);for(let B=0;B<I.length;B++)o.fields.push(I[B]);if(o.cmap4Length=14+m.length*2+2+g.length*2+S.length*2+v.length*2+I.length*2,!i){let B=16+L.length*4;o.cmap12Offset=20+o.cmap4Length,o.fields.push({name:"cmap12Format",type:"USHORT",value:12},{name:"cmap12Reserved",type:"USHORT",value:0},{name:"cmap12Length",type:"ULONG",value:B},{name:"cmap12Language",type:"ULONG",value:0},{name:"cmap12nGroups",type:"ULONG",value:L.length/3});for(let F=0;F<L.length;F++)o.fields.push(L[F])}return o}var lt={parse:Nt,make:Lt},_i=[".notdef","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","endash","dagger","daggerdbl","periodcentered","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","questiondown","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","ring","cedilla","hungarumlaut","ogonek","caron","emdash","AE","ordfeminine","Lslash","Oslash","OE","ordmasculine","ae","dotlessi","lslash","oslash","oe","germandbls","onesuperior","logicalnot","mu","trademark","Eth","onehalf","plusminus","Thorn","onequarter","divide","brokenbar","degree","thorn","threequarters","twosuperior","registered","minus","eth","multiply","threesuperior","copyright","Aacute","Acircumflex","Adieresis","Agrave","Aring","Atilde","Ccedilla","Eacute","Ecircumflex","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Ntilde","Oacute","Ocircumflex","Odieresis","Ograve","Otilde","Scaron","Uacute","Ucircumflex","Udieresis","Ugrave","Yacute","Ydieresis","Zcaron","aacute","acircumflex","adieresis","agrave","aring","atilde","ccedilla","eacute","ecircumflex","edieresis","egrave","iacute","icircumflex","idieresis","igrave","ntilde","oacute","ocircumflex","odieresis","ograve","otilde","scaron","uacute","ucircumflex","udieresis","ugrave","yacute","ydieresis","zcaron","exclamsmall","Hungarumlautsmall","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","266 ff","onedotenleader","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","commasuperior","threequartersemdash","periodsuperior","questionsmall","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","ffi","ffl","parenleftinferior","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","exclamdownsmall","centoldstyle","Lslashsmall","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","Dotaccentsmall","Macronsmall","figuredash","hypheninferior","Ogoneksmall","Ringsmall","Cedillasmall","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall","001.000","001.001","001.002","001.003","Black","Bold","Book","Light","Medium","Regular","Roman","Semibold"],Ut=[".notdef","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","endash","dagger","daggerdbl","periodcentered","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","questiondown","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","ring","cedilla","hungarumlaut","ogonek","caron","emdash","AE","ordfeminine","Lslash","Oslash","OE","ordmasculine","ae","dotlessi","lslash","oslash","oe","germandbls","onesuperior","logicalnot","mu","trademark","Eth","onehalf","plusminus","Thorn","onequarter","divide","brokenbar","degree","thorn","threequarters","twosuperior","registered","minus","eth","multiply","threesuperior","copyright","Aacute","Acircumflex","Adieresis","Agrave","Aring","Atilde","Ccedilla","Eacute","Ecircumflex","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Ntilde","Oacute","Ocircumflex","Odieresis","Ograve","Otilde","Scaron","Uacute","Ucircumflex","Udieresis","Ugrave","Yacute","Ydieresis","Zcaron","aacute","acircumflex","adieresis","agrave","aring","atilde","ccedilla","eacute","ecircumflex","edieresis","egrave","iacute","icircumflex","idieresis","igrave","ntilde","oacute","ocircumflex","odieresis","ograve","otilde","scaron","uacute","ucircumflex","udieresis","ugrave","yacute","ydieresis","zcaron"],Qn=[".notdef","space","exclamsmall","Hungarumlautsmall","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","questionsmall","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","fi","fl","ffi","ffl","parenleftinferior","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","exclamdownsmall","centoldstyle","Lslashsmall","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","Dotaccentsmall","Macronsmall","figuredash","hypheninferior","Ogoneksmall","Ringsmall","Cedillasmall","onequarter","onehalf","threequarters","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall"],Tr=[".notdef","space","dollaroldstyle","dollarsuperior","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","fi","fl","ffi","ffl","parenleftinferior","parenrightinferior","hyphensuperior","colonmonetary","onefitted","rupiah","centoldstyle","figuredash","hypheninferior","onequarter","onehalf","threequarters","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior"],ei=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","","endash","dagger","daggerdbl","periodcentered","","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","","questiondown","","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","","ring","cedilla","","hungarumlaut","ogonek","caron","emdash","","","","","","","","","","","","","","","","","AE","","ordfeminine","","","","","Lslash","Oslash","OE","ordmasculine","","","","","","ae","","","","dotlessi","","","lslash","oslash","oe","germandbls"],Js=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclamsmall","Hungarumlautsmall","","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","questionsmall","","asuperior","bsuperior","centsuperior","dsuperior","esuperior","","","isuperior","","","lsuperior","msuperior","nsuperior","osuperior","","","rsuperior","ssuperior","tsuperior","","ff","fi","fl","ffi","ffl","parenleftinferior","","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","exclamdownsmall","centoldstyle","Lslashsmall","","","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","","Dotaccentsmall","","","Macronsmall","","","figuredash","hypheninferior","","","Ogoneksmall","Ringsmall","Cedillasmall","","","","onequarter","onehalf","threequarters","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","","","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall"],Dt=[".notdef",".null","nonmarkingreturn","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quotesingle","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","grave","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","Adieresis","Aring","Ccedilla","Eacute","Ntilde","Odieresis","Udieresis","aacute","agrave","acircumflex","adieresis","atilde","aring","ccedilla","eacute","egrave","ecircumflex","edieresis","iacute","igrave","icircumflex","idieresis","ntilde","oacute","ograve","ocircumflex","odieresis","otilde","uacute","ugrave","ucircumflex","udieresis","dagger","degree","cent","sterling","section","bullet","paragraph","germandbls","registered","copyright","trademark","acute","dieresis","notequal","AE","Oslash","infinity","plusminus","lessequal","greaterequal","yen","mu","partialdiff","summation","product","pi","integral","ordfeminine","ordmasculine","Omega","ae","oslash","questiondown","exclamdown","logicalnot","radical","florin","approxequal","Delta","guillemotleft","guillemotright","ellipsis","nonbreakingspace","Agrave","Atilde","Otilde","OE","oe","endash","emdash","quotedblleft","quotedblright","quoteleft","quoteright","divide","lozenge","ydieresis","Ydieresis","fraction","currency","guilsinglleft","guilsinglright","fi","fl","daggerdbl","periodcentered","quotesinglbase","quotedblbase","perthousand","Acircumflex","Ecircumflex","Aacute","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Oacute","Ocircumflex","apple","Ograve","Uacute","Ucircumflex","Ugrave","dotlessi","circumflex","tilde","macron","breve","dotaccent","ring","cedilla","hungarumlaut","ogonek","caron","Lslash","lslash","Scaron","scaron","Zcaron","zcaron","brokenbar","Eth","eth","Yacute","yacute","Thorn","thorn","minus","multiply","onesuperior","twosuperior","threesuperior","onehalf","onequarter","threequarters","franc","Gbreve","gbreve","Idotaccent","Scedilla","scedilla","Cacute","cacute","Ccaron","ccaron","dcroat"];function qn(t){this.font=t}qn.prototype.charToGlyphIndex=function(t){let i=t.codePointAt(0),s=this.font.glyphs;if(s)for(let r=0;r<s.length;r+=1){let o=s.get(r);for(let u=0;u<o.unicodes.length;u+=1)if(o.unicodes[u]===i)return r}return null};function us(t){this.cmap=t}us.prototype.charToGlyphIndex=function(t){return this.cmap.glyphIndexMap[t.codePointAt(0)]||0};function rn(t,i){this.encoding=t,this.charset=i}rn.prototype.charToGlyphIndex=function(t){let i=t.codePointAt(0),s=this.encoding[i];return this.charset.indexOf(s)};function Wi(t){switch(t.version){case 1:this.names=Dt.slice();break;case 2:this.names=new Array(t.numberOfGlyphs);for(let i=0;i<t.numberOfGlyphs;i++)t.glyphNameIndex[i]<Dt.length?this.names[i]=Dt[t.glyphNameIndex[i]]:this.names[i]=t.names[t.glyphNameIndex[i]-Dt.length];break;case 2.5:this.names=new Array(t.numberOfGlyphs);for(let i=0;i<t.numberOfGlyphs;i++)this.names[i]=Dt[i+t.glyphNameIndex[i]];break;case 3:this.names=[];break;default:this.names=[];break}}Wi.prototype.nameToGlyphIndex=function(t){return this.names.indexOf(t)},Wi.prototype.glyphIndexToName=function(t){return this.names[t]};function Va(t){let i,s=t.tables.cmap.glyphIndexMap,r=Object.keys(s);for(let o=0;o<r.length;o+=1){let u=r[o],f=s[u];i=t.glyphs.get(f),i.addUnicode(parseInt(u))}for(let o=0;o<t.glyphs.length;o+=1)i=t.glyphs.get(o),t.cffEncoding?i.name=t.cffEncoding.charset[o]:t.glyphNames.names&&(i.name=t.glyphNames.glyphIndexToName(o))}function Er(t){t._IndexToUnicodeMap={};let i=t.tables.cmap.glyphIndexMap,s=Object.keys(i);for(let r=0;r<s.length;r+=1){let o=s[r],u=i[o];t._IndexToUnicodeMap[u]===void 0?t._IndexToUnicodeMap[u]={unicodes:[parseInt(o)]}:t._IndexToUnicodeMap[u].unicodes.push(parseInt(o))}}function ef(t,i){i.lowMemory?Er(t):Va(t)}function tf(t,i,s,r,o){t.beginPath(),t.moveTo(i,s),t.lineTo(r,o),t.stroke()}var Xi={line:tf};function nf(t,i){let s=new H(t,i),r=s.parseShort();r!==0&&console.warn("Only CPALv0 is currently fully supported.");let o=s.parseShort(),u=s.parseShort(),f=s.parseShort(),m=s.parseOffset32(),g=s.parseUShortList(u);s.relativeOffset=m;let S=s.parseULongList(f);return s.relativeOffset=m,{version:r,numPaletteEntries:o,colorRecords:S,colorRecordIndices:g}}function sf({version:t=0,numPaletteEntries:i=0,colorRecords:s=[],colorRecordIndices:r=[0]}){return he.argument(t===0,"Only CPALv0 are supported."),he.argument(s.length,"No colorRecords given."),he.argument(r.length,"No colorRecordIndices given."),r.length>1&&he.argument(i,"Can't infer numPaletteEntries on multiple colorRecordIndices"),new $.Table("CPAL",[{name:"version",type:"USHORT",value:t},{name:"numPaletteEntries",type:"USHORT",value:i||s.length},{name:"numPalettes",type:"USHORT",value:r.length},{name:"numColorRecords",type:"USHORT",value:s.length},{name:"colorRecordsArrayOffset",type:"ULONG",value:12+2*r.length},...r.map((o,u)=>({name:"colorRecordIndices_"+u,type:"USHORT",value:o})),...s.map((o,u)=>({name:"colorRecords_"+u,type:"ULONG",value:o}))])}function Dl(t){var i=(t&4278190080)>>24,s=(t&16711680)>>16,r=(t&65280)>>8,o=t&255;return i=i+256&255,s=s+256&255,r=r+256&255,o=(o+256&255)/255,{b:i,g:s,r,a:o}}function Ga(t,i,s=0,r="hexa"){if(i==65535)return"currentColor";let o=t&&t.tables&&t.tables.cpal;if(!o)return"currentColor";if(s>o.colorRecordIndices.length-1)throw new Error(`Palette index out of range (colorRecordIndices.length: ${o.colorRecordIndices.length}, index: ${i})`);if(i>o.numPaletteEntries)throw new Error(`Color index out of range (numPaletteEntries: ${o.numPaletteEntries}, index: ${i})`);let u=o.colorRecordIndices[s]+i;if(u>o.colorRecords)throw new Error(`Color index out of range (colorRecords.length: ${o.colorRecords.length}, lookupIndex: ${u})`);let f=Dl(o.colorRecords[u]);return r==="bgra"?f:hs(f,r)}function Un(t){return("0"+parseInt(t).toString(16)).slice(-2)}function rf(t){let i=t.r/255,s=t.g/255,r=t.b/255,o=Math.max(i,s,r),u=Math.min(i,s,r),f,m,g=(o+u)/2;if(o===u)f=m=0;else{let S=o-u;switch(m=g>.5?S/(2-o-u):S/(o+u),o){case i:f=(s-r)/S+(s<r?6:0);break;case s:f=(r-i)/S+2;break;case r:f=(i-s)/S+4;break}f/=6}return{h:f*360,s:m*100,l:g*100}}function af(t){let{h:i,s,l:r,a:o}=t;i=i%360,s/=100,r/=100;let u=(1-Math.abs(2*r-1))*s,f=u*(1-Math.abs(i/60%2-1)),m=r-u/2,g=0,S=0,v=0;return 0<=i&&i<60?(g=u,S=f,v=0):60<=i&&i<120?(g=f,S=u,v=0):120<=i&&i<180?(g=0,S=u,v=f):180<=i&&i<240?(g=0,S=f,v=u):240<=i&&i<300?(g=f,S=0,v=u):300<=i&&i<=360&&(g=u,S=0,v=f),{r:Math.round((g+m)*255),g:Math.round((S+m)*255),b:Math.round((v+m)*255),a:o}}function Ol(t){return parseInt(`0x${Un(t.b)}${Un(t.g)}${Un(t.r)}${Un(t.a*255)}`,16)}function wr(t,i="hexa"){let s=i=="raw"||i=="cpal",r=Number.isInteger(t),o=!0;if(r&&s||t==="currentColor")return t;if(typeof t=="object"){if(i=="bgra")return t;if(s)return Ol(t)}else if(!r&&/^#([a-f0-9]{3}|[a-f0-9]{4}|[a-f0-9]{6}|[a-f0-9]{8})$/i.test(t.trim())){switch(t=t.trim().substring(1),t.length){case 3:t={r:parseInt(t[0].repeat(2),16),g:parseInt(t[1].repeat(2),16),b:parseInt(t[2].repeat(2),16),a:1};break;case 4:t={r:parseInt(t[0].repeat(2),16),g:parseInt(t[1].repeat(2),16),b:parseInt(t[2].repeat(2),16),a:parseInt(t[3].repeat(2),16)/255};break;case 6:t={r:parseInt(t[0]+t[1],16),g:parseInt(t[2]+t[3],16),b:parseInt(t[4]+t[5],16),a:1};break;case 8:t={r:parseInt(t[0]+t[1],16),g:parseInt(t[2]+t[3],16),b:parseInt(t[4]+t[5],16),a:parseInt(t[6]+t[7],16)/255};break}if(i=="bgra")return t}else if(typeof document<"u"&&/^[a-z]+$/i.test(t)){let u=document.createElement("canvas").getContext("2d");u.fillStyle=t;let f=hs(u.fillStyle,"hexa");f==="#000000ff"&&t.toLowerCase()!=="black"?o=!1:t=f}else{t=t.trim();let u=/rgba?\(\s*(?:(\d*\.\d+)(%?)|(\d+)(%?))\s*(?:,|\s*)\s*(?:(\d*\.\d+)(%?)|(\d+)(%?))\s*(?:,|\s*)\s*(?:(\d*\.\d+)(%?)|(\d+)(%?))\s*(?:(?:,|\s|\/)\s*(?:(0*(?:\.\d+)?()|0*1(?:\.0+)?())|(?:\.\d+)|(\d+)(%)|(\d*\.\d+)(%)))?\s*\)/;if(u.test(t)){let f=t.match(u).filter(m=>typeof m<"u");t={r:Math.round(parseFloat(f[1])/(f[2]?.39215686274509803:1)),g:Math.round(parseFloat(f[3])/(f[4]?.39215686274509803:1)),b:Math.round(parseFloat(f[5])/(f[6]?.39215686274509803:1)),a:f[7]?parseFloat(f[7])/(f[8]?100:1):1}}else{let f=/hsla?\(\s*(?:(\d*\.\d+|\d+)(deg|turn|))\s*(?:,|\s*)\s*(?:(\d*\.\d+)%?|(\d+)%?)\s*(?:,|\s*)\s*(?:(\d*\.\d+)%?|(\d+)%?)\s*(?:(?:,|\s|\/)\s*(?:(0*(?:\.\d+)?()|0*1(?:\.0+)?())|(?:\.\d+)|(\d+)(%)|(\d*\.\d+)(%)))?\s*\)/;if(f.test(t)){let m=t.match(f).filter(g=>typeof g<"u");t=af({h:parseFloat(m[1])*(m[2]==="turn"?360:1),s:parseFloat(m[3]),l:parseFloat(m[4]),a:m[5]?parseFloat(m[5])/(m[6]?100:1):1})}else o=!1}}if(!o)throw new Error(`Invalid color format: ${t}`);return hs(t,i)}function hs(t,i="hexa"){if(t==="currentColor")return t;if(Number.isInteger(t)){if(i=="raw"||i=="cpal")return t;t=Dl(t)}else typeof t!="object"&&(t=wr(t,"bgra"));let s=["hsl","hsla"].includes(i)?rf(t):null;switch(i){case"rgba":return`rgba(${t.r}, ${t.g}, ${t.b}, ${parseFloat(t.a.toFixed(3))})`;case"rgb":return`rgb(${t.r}, ${t.g}, ${t.b})`;case"hex":case"hex6":case"hex-6":return`#${Un(t.r)}${Un(t.g)}${Un(t.b)}`;case"hexa":case"hex8":case"hex-8":return`#${Un(t.r)}${Un(t.g)}${Un(t.b)}${Un(t.a*255)}`;case"hsl":return`hsl(${s.h.toFixed(2)}, ${s.s.toFixed(2)}%, ${s.l.toFixed(2)}%)`;case"hsla":return`hsla(${s.h.toFixed(2)}, ${s.s.toFixed(2)}%, ${s.l.toFixed(2)}%, ${parseFloat(t.a.toFixed(3))})`;case"bgra":return t;case"raw":case"cpal":return Ol(t);default:throw new Error("Unknown color format: "+i)}}var Nl={parse:nf,make:sf,getPaletteColor:Ga,parseColor:wr,formatColor:hs};function of(t,i){let s=i||new Ae;return{configurable:!0,get:function(){return typeof s=="function"&&(s=s()),s},set:function(r){s=r}}}function jt(t){this.bindConstructorValues(t)}jt.prototype.bindConstructorValues=function(t){if(this.index=t.index||0,t.name===".notdef"?t.unicode=void 0:t.name===".null"&&(t.unicode=0),t.unicode===0&&t.name!==".null")throw new Error('The unicode value "0" is reserved for the glyph name ".null" and cannot be used by any other glyph.');this.name=t.name||null,this.unicode=t.unicode,this.unicodes=t.unicodes||(t.unicode!==void 0?[t.unicode]:[]),"xMin"in t&&(this.xMin=t.xMin),"yMin"in t&&(this.yMin=t.yMin),"xMax"in t&&(this.xMax=t.xMax),"yMax"in t&&(this.yMax=t.yMax),"advanceWidth"in t&&(this.advanceWidth=t.advanceWidth),"leftSideBearing"in t&&(this.leftSideBearing=t.leftSideBearing),"points"in t&&(this.points=t.points),Object.defineProperty(this,"path",of(this,t.path))},jt.prototype.addUnicode=function(t){this.unicodes.length===0&&(this.unicode=t),this.unicodes.push(t)},jt.prototype.getBoundingBox=function(){return this.path.getBoundingBox()},jt.prototype.getPath=function(t,i,s,r,o){t=t!==void 0?t:0,i=i!==void 0?i:0,s=s!==void 0?s:72,r=Object.assign({},o&&o.defaultRenderOptions,r);let u,f,m=r.xScale,g=r.yScale,S=1/(this.path.unitsPerEm||1e3)*s,v=this;o&&o.variation&&(v=o.variation.getTransform(this,r.variation),u=v.path.commands),r.hinting&&o&&o.hinting&&(f=v.path&&o.hinting.exec(v,s,r)),f?(u=o.hinting.getCommands(f),t=Math.round(t),i=Math.round(i),m=g=1):(u=v.path.commands,m===void 0&&(m=S),g===void 0&&(g=S));let I=new Ae;if(r.drawSVG){let L=this.getSvgImage(o);if(L){let B=new Ae;return B._image={image:L.image,x:t+L.leftSideBearing*S,y:i-L.baseline*S,width:L.image.width*S,height:L.image.height*S},I._layers=[B],I}}if(r.drawLayers){let L=this.getLayers(o);if(L&&L.length){I._layers=[];for(let B=0;B<L.length;B+=1){let F=L[B],z=Ga(o,F.paletteIndex,r.usePalette);z==="currentColor"?z=r.fill||"black":z=hs(z,r.colorFormat||"rgba"),r=Object.assign({},r,{fill:z}),I._layers.push(this.getPath.call(F.glyph,t,i,s,r,o))}return I}}I.fill=r.fill||this.path.fill,I.stroke=this.path.stroke,I.strokeWidth=this.path.strokeWidth*S;for(let L=0;L<u.length;L+=1){let B=u[L];B.type==="M"?I.moveTo(t+B.x*m,i+-B.y*g):B.type==="L"?I.lineTo(t+B.x*m,i+-B.y*g):B.type==="Q"?I.quadraticCurveTo(t+B.x1*m,i+-B.y1*g,t+B.x*m,i+-B.y*g):B.type==="C"?I.curveTo(t+B.x1*m,i+-B.y1*g,t+B.x2*m,i+-B.y2*g,t+B.x*m,i+-B.y*g):B.type==="Z"&&I.stroke&&I.strokeWidth&&I.closePath()}return I},jt.prototype.getLayers=function(t){if(!t)throw new Error("The font object is required to read the colr/cpal tables in order to get the layers.");return t.layers.get(this.index)},jt.prototype.getSvgImage=function(t){if(!t)throw new Error("The font object is required to read the svg table in order to get the image.");return t.svgImages.get(this.index)},jt.prototype.getContours=function(t=null){if(this.points===void 0&&!t)return[];let i=[],s=[],r=t||this.points;for(let o=0;o<r.length;o+=1){let u=r[o];s.push(u),u.lastPointOfContour&&(i.push(s),s=[])}return he.argument(s.length===0,"There are still points left in the current contour."),i},jt.prototype.getMetrics=function(){let t=this.path.commands,i=[],s=[];for(let o=0;o<t.length;o+=1){let u=t[o];u.type!=="Z"&&(i.push(u.x),s.push(u.y)),(u.type==="Q"||u.type==="C")&&(i.push(u.x1),s.push(u.y1)),u.type==="C"&&(i.push(u.x2),s.push(u.y2))}let r={xMin:Math.min.apply(null,i),yMin:Math.min.apply(null,s),xMax:Math.max.apply(null,i),yMax:Math.max.apply(null,s),leftSideBearing:this.leftSideBearing};return isFinite(r.xMin)||(r.xMin=0),isFinite(r.xMax)||(r.xMax=this.advanceWidth),isFinite(r.yMin)||(r.yMin=0),isFinite(r.yMax)||(r.yMax=0),r.rightSideBearing=this.advanceWidth-r.leftSideBearing-(r.xMax-r.xMin),r},jt.prototype.draw=function(t,i,s,r,o,u){o=Object.assign({},u&&u.defaultRenderOptions,o),this.getPath(i,s,r,o,u).draw(t)},jt.prototype.drawPoints=function(t,i,s,r,o,u){if(o=Object.assign({},u&&u.defaultRenderOptions,o),o.drawLayers){let L=this.getLayers(u);if(L&&L.length){for(let B=0;B<L.length;B+=1)L[B].glyph.index!==this.index&&this.drawPoints.call(L[B].glyph,t,i,s,r);return}}function f(L,B,F,z){t.beginPath();for(let ie=0;ie<L.length;ie+=1)t.moveTo(B+L[ie].x*z,F+L[ie].y*z),t.arc(B+L[ie].x*z,F+L[ie].y*z,2,0,Math.PI*2,!1);t.fill()}i=i!==void 0?i:0,s=s!==void 0?s:0,r=r!==void 0?r:24;let m=1/this.path.unitsPerEm*r,g=[],S=[],I=this.path.commands;u&&u.variation&&(I=u.variation.getTransform(this,o.variation).path.commands);for(let L=0;L<I.length;L+=1){let B=I[L];B.x!==void 0&&g.push({x:B.x,y:-B.y}),B.x1!==void 0&&S.push({x:B.x1,y:-B.y1}),B.x2!==void 0&&S.push({x:B.x2,y:-B.y2})}t.fillStyle="blue",f(g,i,s,m),t.fillStyle="red",f(S,i,s,m)},jt.prototype.drawMetrics=function(t,i,s,r){let o;i=i!==void 0?i:0,s=s!==void 0?s:0,r=r!==void 0?r:24,o=1/this.path.unitsPerEm*r,t.lineWidth=1,t.strokeStyle="black",Xi.line(t,i,-1e4,i,1e4),Xi.line(t,-1e4,s,1e4,s);let u=this.xMin||0,f=this.yMin||0,m=this.xMax||0,g=this.yMax||0,S=this.advanceWidth||0;t.strokeStyle="blue",Xi.line(t,i+u*o,-1e4,i+u*o,1e4),Xi.line(t,i+m*o,-1e4,i+m*o,1e4),Xi.line(t,-1e4,s+-f*o,1e4,s+-f*o),Xi.line(t,-1e4,s+-g*o,1e4,s+-g*o),t.strokeStyle="green",Xi.line(t,i+S*o,-1e4,i+S*o,1e4)},jt.prototype.toPathData=function(t,i){t=Object.assign({},{variation:i&&i.defaultRenderOptions.variation},t);let s=this;i&&i.variation&&(s=i.variation.getTransform(this,t.variation));let r=s.points&&t.pointsTransform?t.pointsTransform(s.points):s.path;return t.pathTransform&&(r=t.pathTransform(r)),r.toPathData(t)},jt.prototype.fromSVG=function(t,i={}){return this.path.fromSVG(t,i)},jt.prototype.toSVG=function(t,i){let s=this.toPathData.apply(this,[t,i]);return this.path.toSVG(t,s)},jt.prototype.toDOMElement=function(t,i){t=Object.assign({},{variation:i&&i.defaultRenderOptions.variation},t);let s=this.path;return i&&i.variation&&(s=i.variation.getTransform(this,t.variation).path),s.toDOMElement(t)};var fs=jt;function ds(t,i,s){Object.defineProperty(t,i,{get:function(){return typeof t[s]>"u"&&t.path,t[s]},set:function(r){t[s]=r},enumerable:!0,configurable:!0})}function Ar(t,i){if(this.font=t,this.glyphs={},Array.isArray(i))for(let s=0;s<i.length;s++){let r=i[s];r.path.unitsPerEm=t.unitsPerEm,this.glyphs[s]=r}this.length=i&&i.length||0}typeof Symbol<"u"&&Symbol.iterator&&(Ar.prototype[Symbol.iterator]=function(){let t=-1;return{next:function(){t++;let i=t>=this.length-1;return{value:this.get(t),done:i}}.bind(this)}}),Ar.prototype.get=function(t){if(this.font._push&&this.glyphs[t]===void 0){this.font._push(t),typeof this.glyphs[t]=="function"&&(this.glyphs[t]=this.glyphs[t]());let i=this.glyphs[t],s=this.font._IndexToUnicodeMap[t];if(s)for(let r=0;r<s.unicodes.length;r++)i.addUnicode(s.unicodes[r]);this.font.cffEncoding?i.name=this.font.cffEncoding.charset[t]:this.font.glyphNames.names&&(i.name=this.font.glyphNames.glyphIndexToName(t)),this.glyphs[t].advanceWidth=this.font._hmtxTableData[t].advanceWidth,this.glyphs[t].leftSideBearing=this.font._hmtxTableData[t].leftSideBearing}else typeof this.glyphs[t]=="function"&&(this.glyphs[t]=this.glyphs[t]());return this.glyphs[t]},Ar.prototype.push=function(t,i){this.glyphs[t]=i,this.length++};function lf(t,i){return new fs({index:i,font:t})}function cf(t,i,s,r,o,u){return function(){let f=new fs({index:i,font:t});return f.path=function(){s(f,r,o);let m=u(t.glyphs,f);return m.unitsPerEm=t.unitsPerEm,m},ds(f,"numberOfContours","_numberOfContours"),ds(f,"xMin","_xMin"),ds(f,"xMax","_xMax"),ds(f,"yMin","_yMin"),ds(f,"yMax","_yMax"),ds(f,"points","_points"),f}}function uf(t,i,s,r,o){return function(){let u=new fs({index:i,font:t});return u.path=function(){let f=s(t,u,r,o);return f.unitsPerEm=t.unitsPerEm,f},u}}var Yn={GlyphSet:Ar,glyphLoader:lf,ttfGlyphLoader:cf,cffGlyphLoader:uf};function Fl(t,i){if(t===i)return!0;if(Array.isArray(t)&&Array.isArray(i)){if(t.length!==i.length)return!1;for(let s=0;s<t.length;s+=1)if(!Fl(t[s],i[s]))return!1;return!0}else return!1}var kl=10;function Cr(t){let i;return t.length<1240?i=107:t.length<33900?i=1131:i=32768,i}function Zn(t,i,s,r){let o=[],u=[],f=r>1?_e.getULong(t,i):_e.getCard16(t,i),m=r>1?4:2,g,S;if(f!==0){let v=_e.getByte(t,i+m);g=i+(f+1)*v+m;let I=i+m+1;for(let L=0;L<f+1;L+=1)o.push(_e.getOffset(t,I,v)),I+=v;S=g+o[f]}else S=i+m;for(let v=0;v<o.length-1;v+=1){let I=_e.getBytes(t,g+o[v],g+o[v+1]);s&&(I=s(I,t,i,r)),u.push(I)}return{objects:u,startOffset:i,endOffset:S}}function hf(t,i,s){let r=[],o=s>1?_e.getULong(t,i):_e.getCard16(t,i),u=s>1?4:2,f,m;if(o!==0){let g=_e.getByte(t,i+u);f=i+(o+1)*g+u;let S=i+u+1;for(let v=0;v<o+1;v+=1)r.push(_e.getOffset(t,S,g)),S+=g;m=f+r[o]}else m=i+u;return{offsets:r,startOffset:i,endOffset:m}}function ff(t,i,s,r,o,u){let f=u>1?_e.getULong(s,r):_e.getCard16(s,r),m=u>1?4:2,g=0;if(f!==0){let v=_e.getByte(s,r+m);g=r+(f+1)*v+m}let S=_e.getBytes(s,g+i[t],g+i[t+1]);return o&&(S=o(S)),S}function df(t){let i="",r=["0","1","2","3","4","5","6","7","8","9",".","E","E-",null,"-"];for(;;){let o=t.parseByte(),u=o>>4,f=o&15;if(u===15||(i+=r[u],f===15))break;i+=r[f]}return parseFloat(i)}function pf(t,i){let s,r,o,u;if(i===28)return s=t.parseByte(),r=t.parseByte(),s<<8|r;if(i===29)return s=t.parseByte(),r=t.parseByte(),o=t.parseByte(),u=t.parseByte(),s<<24|r<<16|o<<8|u;if(i===30)return df(t);if(i>=32&&i<=246)return i-139;if(i>=247&&i<=250)return s=t.parseByte(),(i-247)*256+s+108;if(i>=251&&i<=254)return s=t.parseByte(),-(i-251)*256-s-108;throw new Error("Invalid b0 "+i)}function mf(t){let i={};for(let s=0;s<t.length;s+=1){let r=t[s][0],o=t[s][1],u;if(o.length===1?u=o[0]:u=o,Object.prototype.hasOwnProperty.call(i,r)&&!isNaN(i[r]))throw new Error("Object "+i+" already has key "+r);i[r]=u}return i}function Ha(t,i,s,r){i=i!==void 0?i:0;let o=new _e.Parser(t,i),u=[],f=[];s=s!==void 0?s:t.byteLength;let m=r<2?22:28;for(;o.relativeOffset<s;){let g=o.parseByte();if(g<m){if(g===12&&(g=1200+o.parseByte()),r>1&&g===23){Mf(f);continue}u.push([g,f]),f=[]}else f.push(pf(o,g,r))}return mf(u)}function Ks(t,i){return i<=390?i=_i[i]:t?i=t[i-391]:i=void 0,i}function Wa(t,i,s){let r={},o;for(let u=0;u<i.length;u+=1){let f=i[u];if(Array.isArray(f.type)){let m=[];m.length=f.type.length;for(let g=0;g<f.type.length;g++)o=t[f.op]!==void 0?t[f.op][g]:void 0,o===void 0&&(o=f.value!==void 0&&f.value[g]!==void 0?f.value[g]:null),f.type[g]==="SID"&&(o=Ks(s,o)),m[g]=o;r[f.name]=m}else o=t[f.op],o===void 0&&(o=f.value!==void 0?f.value:null),f.type==="SID"&&(o=Ks(s,o)),r[f.name]=o}return r}function gf(t,i){let s={};if(s.formatMajor=_e.getCard8(t,i),s.formatMinor=_e.getCard8(t,i+1),s.formatMajor>2)throw new Error(`Unsupported CFF table version ${s.formatMajor}.${s.formatMinor}`);return s.size=_e.getCard8(t,i+2),s.formatMajor<2?(s.offsetSize=_e.getCard8(t,i+3),s.startOffset=i,s.endOffset=i+4):(s.topDictLength=_e.getCard16(t,i+3),s.endOffset=i+8),s}var Bl=[{name:"version",op:0,type:"SID"},{name:"notice",op:1,type:"SID"},{name:"copyright",op:1200,type:"SID"},{name:"fullName",op:2,type:"SID"},{name:"familyName",op:3,type:"SID"},{name:"weight",op:4,type:"SID"},{name:"isFixedPitch",op:1201,type:"number",value:0},{name:"italicAngle",op:1202,type:"number",value:0},{name:"underlinePosition",op:1203,type:"number",value:-100},{name:"underlineThickness",op:1204,type:"number",value:50},{name:"paintType",op:1205,type:"number",value:0},{name:"charstringType",op:1206,type:"number",value:2},{name:"fontMatrix",op:1207,type:["real","real","real","real","real","real"],value:[.001,0,0,.001,0,0]},{name:"uniqueId",op:13,type:"number"},{name:"fontBBox",op:5,type:["number","number","number","number"],value:[0,0,0,0]},{name:"strokeWidth",op:1208,type:"number",value:0},{name:"xuid",op:14,type:[],value:null},{name:"charset",op:15,type:"offset",value:0},{name:"encoding",op:16,type:"offset",value:0},{name:"charStrings",op:17,type:"offset",value:0},{name:"private",op:18,type:["number","offset"],value:[0,0]},{name:"ros",op:1230,type:["SID","SID","number"]},{name:"cidFontVersion",op:1231,type:"number",value:0},{name:"cidFontRevision",op:1232,type:"number",value:0},{name:"cidFontType",op:1233,type:"number",value:0},{name:"cidCount",op:1234,type:"number",value:8720},{name:"uidBase",op:1235,type:"number"},{name:"fdArray",op:1236,type:"offset"},{name:"fdSelect",op:1237,type:"offset"},{name:"fontName",op:1238,type:"SID"}],zl=[{name:"fontMatrix",op:1207,type:["real","real","real","real","real","real"],value:[.001,0,0,.001,0,0]},{name:"charStrings",op:17,type:"offset"},{name:"fdArray",op:1236,type:"offset"},{name:"fdSelect",op:1237,type:"offset"},{name:"vstore",op:24,type:"offset"}],Vl=[{name:"subrs",op:19,type:"offset",value:0},{name:"defaultWidthX",op:20,type:"number",value:0},{name:"nominalWidthX",op:21,type:"number",value:0}],Gl=[{name:"blueValues",op:6,type:"delta"},{name:"otherBlues",op:7,type:"delta"},{name:"familyBlues",op:7,type:"delta"},{name:"familyBlues",op:8,type:"delta"},{name:"familyOtherBlues",op:9,type:"delta"},{name:"blueScale",op:1209,type:"number",value:.039625},{name:"blueShift",op:1210,type:"number",value:7},{name:"blueFuzz",op:1211,type:"number",value:1},{name:"stdHW",op:10,type:"number"},{name:"stdVW",op:11,type:"number"},{name:"stemSnapH",op:1212,type:"number"},{name:"stemSnapV",op:1213,type:"number"},{name:"languageGroup",op:1217,type:"number",value:0},{name:"expansionFactor",op:1218,type:"number",value:.06},{name:"vsindex",op:22,type:"number",value:0},{name:"subrs",op:19,type:"offset"}],yf=[{name:"private",op:18,type:["number","offset"],value:[0,0]}];function xf(t,i,s,r){let o=Ha(t,i,t.byteLength,r);return Wa(o,r>1?zl:Bl,s)}function Xa(t,i,s,r,o){let u=Ha(t,i,s,o);return Wa(u,o>1?Gl:Vl,r)}function vf(t,i,s){let r=Ha(t,i,void 0,s);return Wa(r,yf)}function _f(t,i,s){let r=[];for(let o=0;o<s.length;o++){let u=new DataView(new Uint8Array(s[o]).buffer),f=vf(u,0,2),m=f.private[0],g=f.private[1];if(m!==0&&g!==0){let S=Xa(t,g+i,m,[],2);if(S.subrs){let v=g+S.subrs,I=Zn(t,v+i,void 0,2);f._subrs=I.objects,f._subrsBias=Cr(f._subrs)}f._privateDict=S}r.push(f)}return r}function qa(t,i,s,r,o){let u=[];for(let f=0;f<s.length;f+=1){let m=new DataView(new Uint8Array(s[f]).buffer),g=xf(m,0,r,o);g._subrs=[],g._subrsBias=0,g._defaultWidthX=0,g._nominalWidthX=0;let S=o<2?g.private[0]:0,v=o<2?g.private[1]:0;if(S!==0&&v!==0){let I=Xa(t,v+i,S,r,o);if(g._defaultWidthX=I.defaultWidthX,g._nominalWidthX=I.nominalWidthX,I.subrs!==0){let L=v+I.subrs,B=Zn(t,L+i,void 0,o);g._subrs=B.objects,g._subrsBias=Cr(g._subrs)}g._privateDict=I}u.push(g)}return u}function bf(t,i,s,r,o){let u,f,m=new _e.Parser(t,i);s-=1;let g=[".notdef"],S=m.parseCard8();if(S===0)for(let v=0;v<s;v+=1)u=m.parseSID(),o?g.push(u):g.push(Ks(r,u)||u);else if(S===1)for(;g.length<=s;){u=m.parseSID(),f=m.parseCard8();for(let v=0;v<=f;v+=1)o?g.push("cid"+("00000"+u).slice(-5)):g.push(Ks(r,u)||u),u+=1}else if(S===2)for(;g.length<=s;){u=m.parseSID(),f=m.parseCard16();for(let v=0;v<=f;v+=1)o?g.push("cid"+("00000"+u).slice(-5)):g.push(Ks(r,u)||u),u+=1}else throw new Error("Unknown charset format "+S);return g}function Sf(t,i){let s,r={},o=new _e.Parser(t,i),u=o.parseCard8();if(u===0){let f=o.parseCard8();for(let m=0;m<f;m+=1)s=o.parseCard8(),r[s]=m}else if(u===1){let f=o.parseCard8();s=1;for(let m=0;m<f;m+=1){let g=o.parseCard8(),S=o.parseCard8();for(let v=g;v<=g+S;v+=1)r[v]=s,s+=1}}else throw new Error("Unknown encoding format "+u);return r}function Mf(t){let i=t.pop();for(;t.length>i;)t.pop()}function Hl(t,i){let s=t.tables.cff&&t.tables.cff.topDict&&t.tables.cff.topDict.paintType||0;return s===2&&(i.fill=null,i.stroke="black",i.strokeWidth=t.tables.cff.topDict.strokeWidth||0),s}function Ya(t,i,s,r,o){let u,f,m,g,S=new Ae,v=[],I=0,L=!1,B=!1,F=0,z=0,ie,ze,Ne,Xe,ct=0,xt=[],Et,wt=0,Vt=t.tables.cff2||t.tables.cff;if(Ne=Vt.topDict._defaultWidthX,Xe=Vt.topDict._nominalWidthX,o=o||t.variation&&t.variation.get(),i.getBlendPath||(i.getBlendPath=function(De){return Ya(t,i,s,r,De)}),t.isCIDFont||r>1){let De=Vt.topDict._fdSelect?Vt.topDict._fdSelect[i.index]:0,Oe=Vt.topDict._fdArray[De];ie=Oe._subrs,ze=Oe._subrsBias,r>1?(xt=Vt.topDict._vstore.itemVariationStore,ct=Oe._privateDict.vsindex):(Ne=Oe._defaultWidthX,Xe=Oe._nominalWidthX)}else ie=Vt.topDict._subrs,ze=Vt.topDict._subrsBias;let Nn=Hl(t,S),ut=Ne;function vn(De,Oe){B&&Nn!==2&&S.closePath(),S.moveTo(De,Oe),B=!0}function on(){let De;De=(v.length&1)!==0,De&&!L&&(ut=v.shift()+Xe),I+=v.length>>1,v.length=0,L=!0}function Ve(De){let Oe,Jt,Ci,kr,$i,Fn,ln,En,Kt,_n,cn,un,Bt=0;for(;Bt<De.length;){let An=De[Bt];switch(Bt+=1,An){case 1:on();break;case 3:on();break;case 4:v.length>1&&!L&&(ut=v.shift()+Xe,L=!0),z+=v.pop(),vn(F,z);break;case 5:for(;v.length>0;)F+=v.shift(),z+=v.shift(),S.lineTo(F,z);break;case 6:for(;v.length>0&&(F+=v.shift(),S.lineTo(F,z),v.length!==0);)z+=v.shift(),S.lineTo(F,z);break;case 7:for(;v.length>0&&(z+=v.shift(),S.lineTo(F,z),v.length!==0);)F+=v.shift(),S.lineTo(F,z);break;case 8:for(;v.length>0;)u=F+v.shift(),f=z+v.shift(),m=u+v.shift(),g=f+v.shift(),F=m+v.shift(),z=g+v.shift(),S.curveTo(u,f,m,g,F,z);break;case 10:if($i=v.pop()+ze,Fn=ie[$i],Fn){if(wt>=kl){console.warn("CFF charstring subroutine call depth exceeded, skipping callsubr");break}wt++,Ve(Fn),wt--}break;case 11:if(r>1){console.error("CFF CharString operator return (11) is not supported in CFF2");break}return;case 12:switch(An=De[Bt],Bt+=1,An){case 35:u=F+v.shift(),f=z+v.shift(),m=u+v.shift(),g=f+v.shift(),ln=m+v.shift(),En=g+v.shift(),Kt=ln+v.shift(),_n=En+v.shift(),cn=Kt+v.shift(),un=_n+v.shift(),F=cn+v.shift(),z=un+v.shift(),v.shift(),S.curveTo(u,f,m,g,ln,En),S.curveTo(Kt,_n,cn,un,F,z);break;case 34:u=F+v.shift(),f=z,m=u+v.shift(),g=f+v.shift(),ln=m+v.shift(),En=g,Kt=ln+v.shift(),_n=g,cn=Kt+v.shift(),un=z,F=cn+v.shift(),S.curveTo(u,f,m,g,ln,En),S.curveTo(Kt,_n,cn,un,F,z);break;case 36:u=F+v.shift(),f=z+v.shift(),m=u+v.shift(),g=f+v.shift(),ln=m+v.shift(),En=g,Kt=ln+v.shift(),_n=g,cn=Kt+v.shift(),un=_n+v.shift(),F=cn+v.shift(),S.curveTo(u,f,m,g,ln,En),S.curveTo(Kt,_n,cn,un,F,z);break;case 37:u=F+v.shift(),f=z+v.shift(),m=u+v.shift(),g=f+v.shift(),ln=m+v.shift(),En=g+v.shift(),Kt=ln+v.shift(),_n=En+v.shift(),cn=Kt+v.shift(),un=_n+v.shift(),Math.abs(cn-F)>Math.abs(un-z)?F=cn+v.shift():z=un+v.shift(),S.curveTo(u,f,m,g,ln,En),S.curveTo(Kt,_n,cn,un,F,z);break;default:console.log("Glyph "+i.index+": unknown operator 1200"+An),v.length=0}break;case 14:if(r>1){console.error("CFF CharString operator endchar (14) is not supported in CFF2");break}if(v.length>=4){let ji=ei[v.pop()],ys=ei[v.pop()],Br=v.pop(),zr=v.pop();if(ji&&ys){i.isComposite=!0,i.components=[];let su=t.cffEncoding.charset.indexOf(ji),ru=t.cffEncoding.charset.indexOf(ys);i.components.push({glyphIndex:ru,dx:0,dy:0}),i.components.push({glyphIndex:su,dx:zr,dy:Br}),S.extend(t.glyphs.get(ru).path);let a0=t.glyphs.get(su),ho=JSON.parse(JSON.stringify(a0.path.commands));for(let fo=0;fo<ho.length;fo+=1){let jn=ho[fo];jn.type!=="Z"&&(jn.x+=zr,jn.y+=Br),(jn.type==="Q"||jn.type==="C")&&(jn.x1+=zr,jn.y1+=Br),jn.type==="C"&&(jn.x2+=zr,jn.y2+=Br)}S.extend(ho)}}else v.length>0&&!L&&(ut=v.shift()+Xe,L=!0);B&&Nn!==2&&(S.closePath(),B=!1);break;case 15:if(r<2){console.error("CFF2 CharString operator vsindex (15) is not supported in CFF");break}ct=v.pop();break;case 16:if(r<2){console.error("CFF2 CharString operator blend (16) is not supported in CFF");break}Et||(Et=t.variation&&o&&t.variation.process.getBlendVector(xt,ct,o));var Rt=v.pop(),dn=Et?Et.length:xt.itemVariationSubtables[ct].regionIndexes.length,wn=Rt*dn,kn=v.length-wn,ii=kn-Rt;if(Et)for(let ji=0;ji<Rt;ji++){var iu=v[ii+ji];for(let ys=0;ys<dn;ys++)iu+=Et[ys]*v[kn++];v[ii+ji]=iu}for(;wn--;)v.pop();break;case 18:on();break;case 19:case 20:on(),Bt+=I+7>>3;break;case 21:v.length>2&&!L&&(ut=v.shift()+Xe,L=!0),z+=v.pop(),F+=v.pop(),vn(F,z);break;case 22:v.length>1&&!L&&(ut=v.shift()+Xe,L=!0),F+=v.pop(),vn(F,z);break;case 23:on();break;case 24:for(;v.length>2;)u=F+v.shift(),f=z+v.shift(),m=u+v.shift(),g=f+v.shift(),F=m+v.shift(),z=g+v.shift(),S.curveTo(u,f,m,g,F,z);F+=v.shift(),z+=v.shift(),S.lineTo(F,z);break;case 25:for(;v.length>6;)F+=v.shift(),z+=v.shift(),S.lineTo(F,z);u=F+v.shift(),f=z+v.shift(),m=u+v.shift(),g=f+v.shift(),F=m+v.shift(),z=g+v.shift(),S.curveTo(u,f,m,g,F,z);break;case 26:for(v.length&1&&(F+=v.shift());v.length>0;)u=F,f=z+v.shift(),m=u+v.shift(),g=f+v.shift(),F=m,z=g+v.shift(),S.curveTo(u,f,m,g,F,z);break;case 27:for(v.length&1&&(z+=v.shift());v.length>0;)u=F+v.shift(),f=z,m=u+v.shift(),g=f+v.shift(),F=m+v.shift(),z=g,S.curveTo(u,f,m,g,F,z);break;case 28:Oe=De[Bt],Jt=De[Bt+1],v.push((Oe<<24|Jt<<16)>>16),Bt+=2;break;case 29:if($i=v.pop()+t.gsubrsBias,Fn=t.gsubrs[$i],Fn){if(wt>=kl){console.warn("CFF charstring subroutine call depth exceeded, skipping callgsubr");break}wt++,Ve(Fn),wt--}break;case 30:for(;v.length>0&&(u=F,f=z+v.shift(),m=u+v.shift(),g=f+v.shift(),F=m+v.shift(),z=g+(v.length===1?v.shift():0),S.curveTo(u,f,m,g,F,z),v.length!==0);)u=F+v.shift(),f=z,m=u+v.shift(),g=f+v.shift(),z=g+v.shift(),F=m+(v.length===1?v.shift():0),S.curveTo(u,f,m,g,F,z);break;case 31:for(;v.length>0&&(u=F+v.shift(),f=z,m=u+v.shift(),g=f+v.shift(),z=g+v.shift(),F=m+(v.length===1?v.shift():0),S.curveTo(u,f,m,g,F,z),v.length!==0);)u=F,f=z+v.shift(),m=u+v.shift(),g=f+v.shift(),F=m+v.shift(),z=g+(v.length===1?v.shift():0),S.curveTo(u,f,m,g,F,z);break;default:An<32?console.log("Glyph "+i.index+": unknown operator "+An):An<247?v.push(An-139):An<251?(Oe=De[Bt],Bt+=1,v.push((An-247)*256+Oe+108)):An<255?(Oe=De[Bt],Bt+=1,v.push(-(An-251)*256-Oe-108)):(Oe=De[Bt],Jt=De[Bt+1],Ci=De[Bt+2],kr=De[Bt+3],Bt+=4,v.push((Oe<<24|Jt<<16|Ci<<8|kr)/65536))}}}return Ve(s),t.variation&&o&&(S.commands=S.commands.map(De=>{let Oe=Object.keys(De);for(let Jt=0;Jt<Oe.length;Jt++){let Ci=Oe[Jt];Ci!=="type"&&(De[Ci]=Math.round(De[Ci]))}return De})),L&&(i.advanceWidth=ut),S}function Wl(t,i,s,r,o){let u=[],f,m=new _e.Parser(t,i),g=m.parseCard8();if(g===0)for(let S=0;S<s;S++){if(f=m.parseCard8(),f>=r)throw new Error("CFF table CID Font FDSelect has bad FD index value "+f+" (FD count "+r+")");u.push(f)}else if(g===3||o>1&&g===4){let S=g===4?m.parseULong():m.parseCard16(),v=g===4?m.parseULong():m.parseCard16();if(v!==0)throw new Error(`CFF Table CID Font FDSelect format ${g} range has bad initial GID ${v}`);let I;for(let L=0;L<S;L++){if(f=g===4?m.parseUShort():m.parseCard8(),I=g===4?m.parseULong():m.parseCard16(),f>=r)throw new Error("CFF table CID Font FDSelect has bad FD index value "+f+" (FD count "+r+")");if(I>s)throw new Error(`CFF Table CID Font FDSelect format ${o} range has bad GID ${I}`);for(;v<I;v++)u.push(f);v=I}if(I!==s)throw new Error("CFF Table CID Font FDSelect format 3 range has bad final (Sentinal) GID "+I)}else throw new Error("CFF Table CID Font FDSelect table has unsupported format "+g);return u}function Tf(t,i,s,r){let o,u=gf(t,i);u.formatMajor===2?o=s.tables.cff2={}:o=s.tables.cff={};let f=u.formatMajor>1?null:Zn(t,u.endOffset,_e.bytesToString),m=u.formatMajor>1?null:Zn(t,f.endOffset),g=u.formatMajor>1?null:Zn(t,m.endOffset,_e.bytesToString),S=Zn(t,u.formatMajor>1?i+u.size+u.topDictLength:g.endOffset,void 0,u.formatMajor);s.gsubrs=S.objects,s.gsubrsBias=Cr(s.gsubrs);let v;if(u.formatMajor>1){let L=i+u.size,B=_e.getBytes(t,L,L+u.topDictLength);v=qa(t,0,[B],void 0,u.formatMajor)[0]}else{let L=qa(t,i,m.objects,g.objects,u.formatMajor);if(L.length!==1)throw new Error("CFF table has too many fonts in 'FontSet' - count of fonts NameIndex.length = "+L.length);v=L[0]}if(o.topDict=v,v._privateDict&&(s.defaultWidthX=v._privateDict.defaultWidthX,s.nominalWidthX=v._privateDict.nominalWidthX),u.formatMajor<2&&v.ros[0]!==void 0&&v.ros[1]!==void 0&&(s.isCIDFont=!0),u.formatMajor>1){let L=v.fdArray,B=v.fdSelect;if(!L)throw new Error("This is a CFF2 font, but FDArray information is missing");let F=Zn(t,i+L,null,u.formatMajor),z=_f(t,i,F.objects);v._fdArray=z,B&&(v._fdSelect=Wl(t,i+B,s.numGlyphs,z.length,u.formatMajor))}else if(s.isCIDFont){let L=v.fdArray,B=v.fdSelect;if(L===0||B===0)throw new Error("Font is marked as a CID font, but FDArray and/or FDSelect information is missing");L+=i;let F=Zn(t,L),z=qa(t,i,F.objects,g.objects,u.formatMajor);v._fdArray=z,B+=i,v._fdSelect=Wl(t,B,s.numGlyphs,z.length,u.formatMajor)}if(u.formatMajor<2){let L=i+v.private[1],B=Xa(t,L,v.private[0],g.objects,u.formatMajor);if(s.defaultWidthX=B.defaultWidthX,s.nominalWidthX=B.nominalWidthX,B.subrs!==0){let F=L+B.subrs,z=Zn(t,F);s.subrs=z.objects,s.subrsBias=Cr(s.subrs)}else s.subrs=[],s.subrsBias=0}let I;if(r.lowMemory?(I=hf(t,i+v.charStrings,u.formatMajor),s.nGlyphs=I.offsets.length-(u.formatMajor>1?1:0)):(I=Zn(t,i+v.charStrings,null,u.formatMajor),s.nGlyphs=I.objects.length),u.formatMajor>1&&s.tables.maxp&&s.nGlyphs!==s.tables.maxp.numGlyphs&&console.error(`Glyph count in the CFF2 table (${s.nGlyphs}) must correspond to the glyph count in the maxp table (${s.tables.maxp.numGlyphs})`),u.formatMajor<2){let L=[],B=[];v.charset===0?L=Ut:v.charset===1?L=Qn:v.charset===2?L=Tr:L=bf(t,i+v.charset,s.nGlyphs,g.objects,s.isCIDFont),v.encoding===0?B=ei:v.encoding===1?B=Js:B=Sf(t,i+v.encoding),s.cffEncoding=new rn(B,L),s.encoding=s.encoding||s.cffEncoding}if(s.glyphs=new Yn.GlyphSet(s),r.lowMemory)s._push=function(L){let B=ff(L,I.offsets,t,i+v.charStrings,void 0,u.formatMajor);s.glyphs.push(L,Yn.cffGlyphLoader(s,L,Ya,B,u.formatMajor))};else for(let L=0;L<s.nGlyphs;L+=1){let B=I.objects[L];s.glyphs.push(L,Yn.cffGlyphLoader(s,L,Ya,B,u.formatMajor))}if(v.vstore){let L=new _e.Parser(t,i+v.vstore);v._vstore=L.parseVariationStore()}}function Xl(t,i){let s,r=_i.indexOf(t);return r>=0&&(s=r),r=i.indexOf(t),r>=0?s=r+_i.length:(s=_i.length+i.length,i.push(t)),s}function Ef(){return new $.Record("Header",[{name:"major",type:"Card8",value:1},{name:"minor",type:"Card8",value:0},{name:"hdrSize",type:"Card8",value:4},{name:"major",type:"Card8",value:1}])}function wf(t){let i=new $.Record("Name INDEX",[{name:"names",type:"INDEX",value:[]}]);i.names=[];for(let s=0;s<t.length;s+=1)i.names.push({name:"name_"+s,type:"NAME",value:t[s]});return i}function ql(t,i,s){let r={};for(let o=0;o<t.length;o+=1){let u=t[o],f=i[u.name];f!==void 0&&!Fl(f,u.value)&&(u.type==="SID"&&(f=Xl(f,s)),r[u.op]={name:u.name,type:u.type,value:f})}return r}function Yl(t,i,s){let r=new $.Record("Top DICT",[{name:"dict",type:"DICT",value:{}}]);return r.dict=ql(s>1?zl:Bl,t,i),r}function Zl(t){let i=new $.Record("Top DICT INDEX",[{name:"topDicts",type:"INDEX",value:[]}]);return i.topDicts=[{name:"topDict_0",type:"TABLE",value:t}],i}function Af(t){let i=new $.Record("String INDEX",[{name:"strings",type:"INDEX",value:[]}]);i.strings=[];for(let s=0;s<t.length;s+=1)i.strings.push({name:"string_"+s,type:"STRING",value:t[s]});return i}function Cf(){return new $.Record("Global Subr INDEX",[{name:"subrs",type:"INDEX",value:[]}])}function Rf(t,i){let s=new $.Record("Charsets",[{name:"format",type:"Card8",value:0}]);for(let r=0;r<t.length;r+=1){let o=t[r],u=Xl(o,i);s.fields.push({name:"glyph_"+r,type:"SID",value:u})}return s}function Lf(t,i){let s=[],r=t.path;i<2&&s.push({name:"width",type:"NUMBER",value:t.advanceWidth});let o=0,u=0;for(let f=0;f<r.commands.length;f+=1){let m,g,S=r.commands[f];if(S.type==="Q"){let v=.3333333333333333,I=2/3;S={type:"C",x:S.x,y:S.y,x1:Math.round(v*o+I*S.x1),y1:Math.round(v*u+I*S.y1),x2:Math.round(v*S.x+I*S.x1),y2:Math.round(v*S.y+I*S.y1)}}if(S.type==="M")m=Math.round(S.x-o),g=Math.round(S.y-u),s.push({name:"dx",type:"NUMBER",value:m}),s.push({name:"dy",type:"NUMBER",value:g}),s.push({name:"rmoveto",type:"OP",value:21}),o=Math.round(S.x),u=Math.round(S.y);else if(S.type==="L")m=Math.round(S.x-o),g=Math.round(S.y-u),s.push({name:"dx",type:"NUMBER",value:m}),s.push({name:"dy",type:"NUMBER",value:g}),s.push({name:"rlineto",type:"OP",value:5}),o=Math.round(S.x),u=Math.round(S.y);else if(S.type==="C"){let v=Math.round(S.x1-o),I=Math.round(S.y1-u),L=Math.round(S.x2-S.x1),B=Math.round(S.y2-S.y1);m=Math.round(S.x-S.x2),g=Math.round(S.y-S.y2),s.push({name:"dx1",type:"NUMBER",value:v}),s.push({name:"dy1",type:"NUMBER",value:I}),s.push({name:"dx2",type:"NUMBER",value:L}),s.push({name:"dy2",type:"NUMBER",value:B}),s.push({name:"dx",type:"NUMBER",value:m}),s.push({name:"dy",type:"NUMBER",value:g}),s.push({name:"rrcurveto",type:"OP",value:8}),o=Math.round(S.x),u=Math.round(S.y)}}return i<2&&s.push({name:"endchar",type:"OP",value:14}),s}function If(t,i){let s=new $.Record("CharStrings INDEX",[{name:"charStrings",type:"INDEX",value:[]}]);for(let r=0;r<t.length;r+=1){let o=t.get(r),u=Lf(o,i);s.charStrings.push({name:o.name,type:"CHARSTRING",value:u})}return s}function Pf(t,i,s){let r=new $.Record("Private DICT",[{name:"dict",type:"DICT",value:{}}]);return r.dict=ql(s>1?Gl:Vl,t,i),r}function Uf(t,i){let r=new $.Table("CFF ",[{name:"header",type:"RECORD"},{name:"nameIndex",type:"RECORD"},{name:"topDictIndex",type:"RECORD"},{name:"stringIndex",type:"RECORD"},{name:"globalSubrIndex",type:"RECORD"},{name:"charsets",type:"RECORD"},{name:"charStringsIndex",type:"RECORD"},{name:"privateDict",type:"RECORD"}]),o=1/i.unitsPerEm,u={version:i.version,fullName:i.fullName,familyName:i.familyName,weight:i.weightName,fontBBox:i.fontBBox||[0,0,0,0],fontMatrix:[o,0,0,o,0,0],charset:999,encoding:0,charStrings:999,private:[0,999]},f=i&&i.topDict||{};f.paintType&&(u.paintType=f.paintType,u.strokeWidth=f.strokeWidth||0);let m={},g=[],S;for(let B=1;B<t.length;B+=1)S=t.get(B),g.push(S.name);let v=[];r.header=Ef(),r.nameIndex=wf([i.postScriptName]);let I=Yl(u,v);r.topDictIndex=Zl(I),r.globalSubrIndex=Cf(),r.charsets=Rf(g,v),r.charStringsIndex=If(t,1),r.privateDict=Pf(m,v),r.stringIndex=Af(v);let L=r.header.sizeOf()+r.nameIndex.sizeOf()+r.topDictIndex.sizeOf()+r.stringIndex.sizeOf()+r.globalSubrIndex.sizeOf();return u.charset=L,u.encoding=0,u.charStrings=u.charset+r.charsets.sizeOf(),u.private[1]=u.charStrings+r.charStringsIndex.sizeOf(),I=Yl(u,v),r.topDictIndex=Zl(I),r}var Za={parse:Tf,make:Uf};function Df(t,i){let s={},r=new _e.Parser(t,i);return s.version=r.parseVersion(),s.fontRevision=Math.round(r.parseFixed()*1e3)/1e3,s.checkSumAdjustment=r.parseULong(),s.magicNumber=r.parseULong(),he.argument(s.magicNumber===1594834165,"Font header has wrong magic number."),s.flags=r.parseUShort(),s.unitsPerEm=r.parseUShort(),s.created=r.parseLongDateTime(),s.modified=r.parseLongDateTime(),s.xMin=r.parseShort(),s.yMin=r.parseShort(),s.xMax=r.parseShort(),s.yMax=r.parseShort(),s.macStyle=r.parseUShort(),s.lowestRecPPEM=r.parseUShort(),s.fontDirectionHint=r.parseShort(),s.indexToLocFormat=r.parseShort(),s.glyphDataFormat=r.parseShort(),s}function Of(t){let i=Math.round(new Date().getTime()/1e3)+2082844800,s=i,r=t.macStyle||0;return t.createdTimestamp&&(s=t.createdTimestamp+2082844800),new $.Table("head",[{name:"version",type:"FIXED",value:65536},{name:"fontRevision",type:"FIXED",value:65536},{name:"checkSumAdjustment",type:"ULONG",value:0},{name:"magicNumber",type:"ULONG",value:1594834165},{name:"flags",type:"USHORT",value:0},{name:"unitsPerEm",type:"USHORT",value:1e3},{name:"created",type:"LONGDATETIME",value:s},{name:"modified",type:"LONGDATETIME",value:i},{name:"xMin",type:"SHORT",value:0},{name:"yMin",type:"SHORT",value:0},{name:"xMax",type:"SHORT",value:0},{name:"yMax",type:"SHORT",value:0},{name:"macStyle",type:"USHORT",value:r},{name:"lowestRecPPEM",type:"USHORT",value:0},{name:"fontDirectionHint",type:"SHORT",value:2},{name:"indexToLocFormat",type:"SHORT",value:0},{name:"glyphDataFormat",type:"SHORT",value:0}],t)}var $l={parse:Df,make:Of};function Nf(t,i){let s={},r=new _e.Parser(t,i);return s.version=r.parseVersion(),s.ascender=r.parseShort(),s.descender=r.parseShort(),s.lineGap=r.parseShort(),s.advanceWidthMax=r.parseUShort(),s.minLeftSideBearing=r.parseShort(),s.minRightSideBearing=r.parseShort(),s.xMaxExtent=r.parseShort(),s.caretSlopeRise=r.parseShort(),s.caretSlopeRun=r.parseShort(),s.caretOffset=r.parseShort(),r.relativeOffset+=8,s.metricDataFormat=r.parseShort(),s.numberOfHMetrics=r.parseUShort(),s}function Ff(t){return new $.Table("hhea",[{name:"version",type:"FIXED",value:65536},{name:"ascender",type:"FWORD",value:0},{name:"descender",type:"FWORD",value:0},{name:"lineGap",type:"FWORD",value:0},{name:"advanceWidthMax",type:"UFWORD",value:0},{name:"minLeftSideBearing",type:"FWORD",value:0},{name:"minRightSideBearing",type:"FWORD",value:0},{name:"xMaxExtent",type:"FWORD",value:0},{name:"caretSlopeRise",type:"SHORT",value:1},{name:"caretSlopeRun",type:"SHORT",value:0},{name:"caretOffset",type:"SHORT",value:0},{name:"reserved1",type:"SHORT",value:0},{name:"reserved2",type:"SHORT",value:0},{name:"reserved3",type:"SHORT",value:0},{name:"reserved4",type:"SHORT",value:0},{name:"metricDataFormat",type:"SHORT",value:0},{name:"numberOfHMetrics",type:"USHORT",value:0}],t)}var jl={parse:Nf,make:Ff};function kf(t,i,s,r,o){let u,f,m=new _e.Parser(t,i);for(let g=0;g<r;g+=1){g<s&&(u=m.parseUShort(),f=m.parseShort());let S=o.get(g);S.advanceWidth=u,S.leftSideBearing=f}}function Bf(t,i,s,r,o){t._hmtxTableData={};let u,f,m=new _e.Parser(i,s);for(let g=0;g<o;g+=1)g<r&&(u=m.parseUShort(),f=m.parseShort()),t._hmtxTableData[g]={advanceWidth:u,leftSideBearing:f}}function zf(t,i,s,r,o,u,f){f.lowMemory?Bf(t,i,s,r,o):kf(i,s,r,o,u)}function Vf(t){let i=new $.Table("hmtx",[]);for(let s=0;s<t.length;s+=1){let r=t.get(s),o=r.advanceWidth||0,u=r.leftSideBearing||0;i.fields.push({name:"advanceWidth_"+s,type:"USHORT",value:o}),i.fields.push({name:"leftSideBearing_"+s,type:"SHORT",value:u})}return i}var Jl={parse:zf,make:Vf};function Gf(t){let i=new $.Table("ltag",[{name:"version",type:"ULONG",value:1},{name:"flags",type:"ULONG",value:0},{name:"numTags",type:"ULONG",value:t.length}]),s="",r=12+t.length*4;for(let o=0;o<t.length;++o){let u=s.indexOf(t[o]);u<0&&(u=s.length,s+=t[o]),i.fields.push({name:"offset "+o,type:"USHORT",value:r+u}),i.fields.push({name:"length "+o,type:"USHORT",value:t[o].length})}return i.fields.push({name:"stringPool",type:"CHARARRAY",value:s}),i}function Hf(t,i){let s=new _e.Parser(t,i),r=s.parseULong();he.argument(r===1,"Unsupported ltag table version."),s.skip("uLong",1);let o=s.parseULong(),u=[];for(let f=0;f<o;f++){let m="",g=i+s.parseUShort(),S=s.parseUShort();for(let v=g;v<g+S;++v)m+=String.fromCharCode(t.getInt8(v));u.push(m)}return u}var Kl={make:Gf,parse:Hf};function Wf(t,i){let s={},r=new _e.Parser(t,i);return s.version=r.parseVersion(),s.numGlyphs=r.parseUShort(),s.version===1&&(s.maxPoints=r.parseUShort(),s.maxContours=r.parseUShort(),s.maxCompositePoints=r.parseUShort(),s.maxCompositeContours=r.parseUShort(),s.maxZones=r.parseUShort(),s.maxTwilightPoints=r.parseUShort(),s.maxStorage=r.parseUShort(),s.maxFunctionDefs=r.parseUShort(),s.maxInstructionDefs=r.parseUShort(),s.maxStackElements=r.parseUShort(),s.maxSizeOfInstructions=r.parseUShort(),s.maxComponentElements=r.parseUShort(),s.maxComponentDepth=r.parseUShort()),s}function Xf(t){return new $.Table("maxp",[{name:"version",type:"FIXED",value:20480},{name:"numGlyphs",type:"USHORT",value:t}])}var Ql={parse:Wf,make:Xf},$a=[{begin:0,end:127},{begin:128,end:255},{begin:256,end:383},{begin:384,end:591},{begin:592,end:687},{begin:688,end:767},{begin:768,end:879},{begin:880,end:1023},{begin:11392,end:11519},{begin:1024,end:1279},{begin:1328,end:1423},{begin:1424,end:1535},{begin:42240,end:42559},{begin:1536,end:1791},{begin:1984,end:2047},{begin:2304,end:2431},{begin:2432,end:2559},{begin:2560,end:2687},{begin:2688,end:2815},{begin:2816,end:2943},{begin:2944,end:3071},{begin:3072,end:3199},{begin:3200,end:3327},{begin:3328,end:3455},{begin:3584,end:3711},{begin:3712,end:3839},{begin:4256,end:4351},{begin:6912,end:7039},{begin:4352,end:4607},{begin:7680,end:7935},{begin:7936,end:8191},{begin:8192,end:8303},{begin:8304,end:8351},{begin:8352,end:8399},{begin:8400,end:8447},{begin:8448,end:8527},{begin:8528,end:8591},{begin:8592,end:8703},{begin:8704,end:8959},{begin:8960,end:9215},{begin:9216,end:9279},{begin:9280,end:9311},{begin:9312,end:9471},{begin:9472,end:9599},{begin:9600,end:9631},{begin:9632,end:9727},{begin:9728,end:9983},{begin:9984,end:10175},{begin:12288,end:12351},{begin:12352,end:12447},{begin:12448,end:12543},{begin:12544,end:12591},{begin:12592,end:12687},{begin:43072,end:43135},{begin:12800,end:13055},{begin:13056,end:13311},{begin:44032,end:55215},{begin:55296,end:57343},{begin:67840,end:67871},{begin:19968,end:40959},{begin:57344,end:63743},{begin:12736,end:12783},{begin:64256,end:64335},{begin:64336,end:65023},{begin:65056,end:65071},{begin:65040,end:65055},{begin:65104,end:65135},{begin:65136,end:65279},{begin:65280,end:65519},{begin:65520,end:65535},{begin:3840,end:4095},{begin:1792,end:1871},{begin:1920,end:1983},{begin:3456,end:3583},{begin:4096,end:4255},{begin:4608,end:4991},{begin:5024,end:5119},{begin:5120,end:5759},{begin:5760,end:5791},{begin:5792,end:5887},{begin:6016,end:6143},{begin:6144,end:6319},{begin:10240,end:10495},{begin:40960,end:42127},{begin:5888,end:5919},{begin:66304,end:66351},{begin:66352,end:66383},{begin:66560,end:66639},{begin:118784,end:119039},{begin:119808,end:120831},{begin:1044480,end:1048573},{begin:65024,end:65039},{begin:917504,end:917631},{begin:6400,end:6479},{begin:6480,end:6527},{begin:6528,end:6623},{begin:6656,end:6687},{begin:11264,end:11359},{begin:11568,end:11647},{begin:19904,end:19967},{begin:43008,end:43055},{begin:65536,end:65663},{begin:65856,end:65935},{begin:66432,end:66463},{begin:66464,end:66527},{begin:66640,end:66687},{begin:66688,end:66735},{begin:67584,end:67647},{begin:68096,end:68191},{begin:119552,end:119647},{begin:73728,end:74751},{begin:119648,end:119679},{begin:7040,end:7103},{begin:7168,end:7247},{begin:7248,end:7295},{begin:43136,end:43231},{begin:43264,end:43311},{begin:43312,end:43359},{begin:43520,end:43615},{begin:65936,end:65999},{begin:66e3,end:66047},{begin:66208,end:66271},{begin:127024,end:127135}];function qf(t){for(let i=0;i<$a.length;i+=1){let s=$a[i];if(t>=s.begin&&t<s.end)return i}return-1}function Yf(t,i){let s={},r=new _e.Parser(t,i);s.version=r.parseUShort(),s.xAvgCharWidth=r.parseShort(),s.usWeightClass=r.parseUShort(),s.usWidthClass=r.parseUShort(),s.fsType=r.parseUShort(),s.ySubscriptXSize=r.parseShort(),s.ySubscriptYSize=r.parseShort(),s.ySubscriptXOffset=r.parseShort(),s.ySubscriptYOffset=r.parseShort(),s.ySuperscriptXSize=r.parseShort(),s.ySuperscriptYSize=r.parseShort(),s.ySuperscriptXOffset=r.parseShort(),s.ySuperscriptYOffset=r.parseShort(),s.yStrikeoutSize=r.parseShort(),s.yStrikeoutPosition=r.parseShort(),s.sFamilyClass=r.parseShort(),s.panose=[];for(let o=0;o<10;o++)s.panose[o]=r.parseByte();return s.ulUnicodeRange1=r.parseULong(),s.ulUnicodeRange2=r.parseULong(),s.ulUnicodeRange3=r.parseULong(),s.ulUnicodeRange4=r.parseULong(),s.achVendID=String.fromCharCode(r.parseByte(),r.parseByte(),r.parseByte(),r.parseByte()),s.fsSelection=r.parseUShort(),s.usFirstCharIndex=r.parseUShort(),s.usLastCharIndex=r.parseUShort(),s.sTypoAscender=r.parseShort(),s.sTypoDescender=r.parseShort(),s.sTypoLineGap=r.parseShort(),s.usWinAscent=r.parseUShort(),s.usWinDescent=r.parseUShort(),s.version>=1&&(s.ulCodePageRange1=r.parseULong(),s.ulCodePageRange2=r.parseULong()),s.version>=2&&(s.sxHeight=r.parseShort(),s.sCapHeight=r.parseShort(),s.usDefaultChar=r.parseUShort(),s.usBreakChar=r.parseUShort(),s.usMaxContent=r.parseUShort()),s}function Zf(t){return new $.Table("OS/2",[{name:"version",type:"USHORT",value:3},{name:"xAvgCharWidth",type:"SHORT",value:0},{name:"usWeightClass",type:"USHORT",value:0},{name:"usWidthClass",type:"USHORT",value:0},{name:"fsType",type:"USHORT",value:0},{name:"ySubscriptXSize",type:"SHORT",value:650},{name:"ySubscriptYSize",type:"SHORT",value:699},{name:"ySubscriptXOffset",type:"SHORT",value:0},{name:"ySubscriptYOffset",type:"SHORT",value:140},{name:"ySuperscriptXSize",type:"SHORT",value:650},{name:"ySuperscriptYSize",type:"SHORT",value:699},{name:"ySuperscriptXOffset",type:"SHORT",value:0},{name:"ySuperscriptYOffset",type:"SHORT",value:479},{name:"yStrikeoutSize",type:"SHORT",value:49},{name:"yStrikeoutPosition",type:"SHORT",value:258},{name:"sFamilyClass",type:"SHORT",value:0},{name:"bFamilyType",type:"BYTE",value:0},{name:"bSerifStyle",type:"BYTE",value:0},{name:"bWeight",type:"BYTE",value:0},{name:"bProportion",type:"BYTE",value:0},{name:"bContrast",type:"BYTE",value:0},{name:"bStrokeVariation",type:"BYTE",value:0},{name:"bArmStyle",type:"BYTE",value:0},{name:"bLetterform",type:"BYTE",value:0},{name:"bMidline",type:"BYTE",value:0},{name:"bXHeight",type:"BYTE",value:0},{name:"ulUnicodeRange1",type:"ULONG",value:0},{name:"ulUnicodeRange2",type:"ULONG",value:0},{name:"ulUnicodeRange3",type:"ULONG",value:0},{name:"ulUnicodeRange4",type:"ULONG",value:0},{name:"achVendID",type:"CHARARRAY",value:"XXXX"},{name:"fsSelection",type:"USHORT",value:0},{name:"usFirstCharIndex",type:"USHORT",value:0},{name:"usLastCharIndex",type:"USHORT",value:0},{name:"sTypoAscender",type:"SHORT",value:0},{name:"sTypoDescender",type:"SHORT",value:0},{name:"sTypoLineGap",type:"SHORT",value:0},{name:"usWinAscent",type:"USHORT",value:0},{name:"usWinDescent",type:"USHORT",value:0},{name:"ulCodePageRange1",type:"ULONG",value:0},{name:"ulCodePageRange2",type:"ULONG",value:0},{name:"sxHeight",type:"SHORT",value:0},{name:"sCapHeight",type:"SHORT",value:0},{name:"usDefaultChar",type:"USHORT",value:0},{name:"usBreakChar",type:"USHORT",value:0},{name:"usMaxContext",type:"USHORT",value:0}],t)}var ja={parse:Yf,make:Zf,unicodeRanges:$a,getUnicodeRange:qf};function $f(t,i){let s={},r=new _e.Parser(t,i);switch(s.version=r.parseVersion(),s.italicAngle=r.parseFixed(),s.underlinePosition=r.parseShort(),s.underlineThickness=r.parseShort(),s.isFixedPitch=r.parseULong(),s.minMemType42=r.parseULong(),s.maxMemType42=r.parseULong(),s.minMemType1=r.parseULong(),s.maxMemType1=r.parseULong(),s.version){case 1:s.names=Dt.slice();break;case 2:s.numberOfGlyphs=r.parseUShort(),s.glyphNameIndex=new Array(s.numberOfGlyphs);for(let o=0;o<s.numberOfGlyphs;o++)s.glyphNameIndex[o]=r.parseUShort();s.names=[];for(let o=0;o<s.numberOfGlyphs;o++)if(s.glyphNameIndex[o]>=Dt.length){let u=r.parseChar();s.names.push(r.parseString(u))}break;case 2.5:s.numberOfGlyphs=r.parseUShort(),s.offset=new Array(s.numberOfGlyphs);for(let o=0;o<s.numberOfGlyphs;o++)s.offset[o]=r.parseChar();break}return s}function jf(t){let{italicAngle:i=Math.round((t.italicAngle||0)*65536),underlinePosition:s=0,underlineThickness:r=0,isFixedPitch:o=0,minMemType42:u=0,maxMemType42:f=0,minMemType1:m=0,maxMemType1:g=0}=t.tables.post||{};return new $.Table("post",[{name:"version",type:"FIXED",value:196608},{name:"italicAngle",type:"FIXED",value:i},{name:"underlinePosition",type:"FWORD",value:s},{name:"underlineThickness",type:"FWORD",value:r},{name:"isFixedPitch",type:"ULONG",value:o},{name:"minMemType42",type:"ULONG",value:u},{name:"maxMemType42",type:"ULONG",value:f},{name:"minMemType1",type:"ULONG",value:m},{name:"maxMemType1",type:"ULONG",value:g}])}var ec={parse:$f,make:jf},Dn=new Array(9);Dn[1]=function(){let i=this.offset+this.relativeOffset,s=this.parseUShort();if(s===1)return{substFormat:1,coverage:this.parsePointer(H.coverage),deltaGlyphId:this.parseShort()};if(s===2)return{substFormat:2,coverage:this.parsePointer(H.coverage),substitute:this.parseOffset16List()};he.assert(!1,"0x"+i.toString(16)+": lookup type 1 format must be 1 or 2.")},Dn[2]=function(){let i=this.parseUShort();return he.argument(i===1,"GSUB Multiple Substitution Subtable identifier-format must be 1"),{substFormat:i,coverage:this.parsePointer(H.coverage),sequences:this.parseListOfLists()}},Dn[3]=function(){let i=this.parseUShort();return he.argument(i===1,"GSUB Alternate Substitution Subtable identifier-format must be 1"),{substFormat:i,coverage:this.parsePointer(H.coverage),alternateSets:this.parseListOfLists()}},Dn[4]=function(){let i=this.parseUShort();return he.argument(i===1,"GSUB ligature table identifier-format must be 1"),{substFormat:i,coverage:this.parsePointer(H.coverage),ligatureSets:this.parseListOfLists(function(){return{ligGlyph:this.parseUShort(),components:this.parseUShortList(this.parseUShort()-1)}})}};var ps={sequenceIndex:H.uShort,lookupListIndex:H.uShort};Dn[5]=function(){let i=this.offset+this.relativeOffset,s=this.parseUShort();if(s===1)return{substFormat:s,coverage:this.parsePointer(H.coverage),ruleSets:this.parseListOfLists(function(){let r=this.parseUShort(),o=this.parseUShort();return{input:this.parseUShortList(r-1),lookupRecords:this.parseRecordList(o,ps)}})};if(s===2)return{substFormat:s,coverage:this.parsePointer(H.coverage),classDef:this.parsePointer(H.classDef),classSets:this.parseListOfLists(function(){let r=this.parseUShort(),o=this.parseUShort();return{classes:this.parseUShortList(r-1),lookupRecords:this.parseRecordList(o,ps)}})};if(s===3){let r=this.parseUShort(),o=this.parseUShort();return{substFormat:s,coverages:this.parseList(r,H.pointer(H.coverage)),lookupRecords:this.parseRecordList(o,ps)}}he.assert(!1,"0x"+i.toString(16)+": lookup type 5 format must be 1, 2 or 3.")},Dn[6]=function(){let i=this.offset+this.relativeOffset,s=this.parseUShort();if(s===1)return{substFormat:1,coverage:this.parsePointer(H.coverage),chainRuleSets:this.parseListOfLists(function(){return{backtrack:this.parseUShortList(),input:this.parseUShortList(this.parseShort()-1),lookahead:this.parseUShortList(),lookupRecords:this.parseRecordList(ps)}})};if(s===2)return{substFormat:2,coverage:this.parsePointer(H.coverage),backtrackClassDef:this.parsePointer(H.classDef),inputClassDef:this.parsePointer(H.classDef),lookaheadClassDef:this.parsePointer(H.classDef),chainClassSet:this.parseListOfLists(function(){return{backtrack:this.parseUShortList(),input:this.parseUShortList(this.parseShort()-1),lookahead:this.parseUShortList(),lookupRecords:this.parseRecordList(ps)}})};if(s===3)return{substFormat:3,backtrackCoverage:this.parseList(H.pointer(H.coverage)),inputCoverage:this.parseList(H.pointer(H.coverage)),lookaheadCoverage:this.parseList(H.pointer(H.coverage)),lookupRecords:this.parseRecordList(ps)};he.assert(!1,"0x"+i.toString(16)+": lookup type 6 format must be 1, 2 or 3.")},Dn[7]=function(){let i=this.parseUShort();he.argument(i===1,"GSUB Extension Substitution subtable identifier-format must be 1");let s=this.parseUShort(),r=new H(this.data,this.offset+this.parseULong());return{substFormat:1,lookupType:s,extension:Dn[s].call(r)}},Dn[8]=function(){let i=this.parseUShort();return he.argument(i===1,"GSUB Reverse Chaining Contextual Single Substitution Subtable identifier-format must be 1"),{substFormat:i,coverage:this.parsePointer(H.coverage),backtrackCoverage:this.parseList(H.pointer(H.coverage)),lookaheadCoverage:this.parseList(H.pointer(H.coverage)),substitutes:this.parseUShortList()}};function Jf(t,i){i=i||0;let s=new H(t,i),r=s.parseVersion(1);return he.argument(r===1||r===1.1,"Unsupported GSUB table version."),r===1?{version:r,scripts:s.parseScriptList(),features:s.parseFeatureList(),lookups:s.parseLookupList(Dn)}:{version:r,scripts:s.parseScriptList(),features:s.parseFeatureList(),lookups:s.parseLookupList(Dn),variations:s.parseFeatureVariationsList()}}var qi=new Array(9);qi[1]=function(i){if(i.substFormat===1)return new $.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:1},{name:"coverage",type:"TABLE",value:new $.Coverage(i.coverage)},{name:"deltaGlyphID",type:"SHORT",value:i.deltaGlyphId}]);if(i.substFormat===2)return new $.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:2},{name:"coverage",type:"TABLE",value:new $.Coverage(i.coverage)}].concat($.ushortList("substitute",i.substitute)));he.fail("Lookup type 1 substFormat must be 1 or 2.")},qi[2]=function(i){return he.assert(i.substFormat===1,"Lookup type 2 substFormat must be 1."),new $.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:1},{name:"coverage",type:"TABLE",value:new $.Coverage(i.coverage)}].concat($.tableList("seqSet",i.sequences,function(s){return new $.Table("sequenceSetTable",$.ushortList("sequence",s))})))},qi[3]=function(i){return he.assert(i.substFormat===1,"Lookup type 3 substFormat must be 1."),new $.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:1},{name:"coverage",type:"TABLE",value:new $.Coverage(i.coverage)}].concat($.tableList("altSet",i.alternateSets,function(s){return new $.Table("alternateSetTable",$.ushortList("alternate",s))})))},qi[4]=function(i){return he.assert(i.substFormat===1,"Lookup type 4 substFormat must be 1."),new $.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:1},{name:"coverage",type:"TABLE",value:new $.Coverage(i.coverage)}].concat($.tableList("ligSet",i.ligatureSets,function(s){return new $.Table("ligatureSetTable",$.tableList("ligature",s,function(r){return new $.Table("ligatureTable",[{name:"ligGlyph",type:"USHORT",value:r.ligGlyph}].concat($.ushortList("component",r.components,r.components.length+1)))}))})))},qi[5]=function(i){if(i.substFormat===1)return new $.Table("contextualSubstitutionTable",[{name:"substFormat",type:"USHORT",value:i.substFormat},{name:"coverage",type:"TABLE",value:new $.Coverage(i.coverage)}].concat($.tableList("sequenceRuleSet",i.ruleSets,function(s){return s?new $.Table("sequenceRuleSetTable",$.tableList("sequenceRule",s,function(r){let o=$.ushortList("seqLookup",[],r.lookupRecords.length).concat($.ushortList("inputSequence",r.input,r.input.length+1));[o[0],o[1]]=[o[1],o[0]];for(let u=0;u<r.lookupRecords.length;u++){let f=r.lookupRecords[u];o=o.concat({name:"sequenceIndex"+u,type:"USHORT",value:f.sequenceIndex}).concat({name:"lookupListIndex"+u,type:"USHORT",value:f.lookupListIndex})}return new $.Table("sequenceRuleTable",o)})):new $.Table("NULL",null)})));if(i.substFormat===2)return new $.Table("contextualSubstitutionTable",[{name:"substFormat",type:"USHORT",value:i.substFormat},{name:"coverage",type:"TABLE",value:new $.Coverage(i.coverage)},{name:"classDef",type:"TABLE",value:new $.ClassDef(i.classDef)}].concat($.tableList("classSeqRuleSet",i.classSets,function(s){return s?new $.Table("classSeqRuleSetTable",$.tableList("classSeqRule",s,function(r){let o=$.ushortList("classes",r.classes,r.classes.length+1).concat($.ushortList("seqLookupCount",[],r.lookupRecords.length));for(let u=0;u<r.lookupRecords.length;u++){let f=r.lookupRecords[u];o=o.concat({name:"sequenceIndex"+u,type:"USHORT",value:f.sequenceIndex}).concat({name:"lookupListIndex"+u,type:"USHORT",value:f.lookupListIndex})}return new $.Table("classSeqRuleTable",o)})):new $.Table("NULL",null)})));if(i.substFormat===3){let s=[{name:"substFormat",type:"USHORT",value:i.substFormat}];s.push({name:"inputGlyphCount",type:"USHORT",value:i.coverages.length}),s.push({name:"substitutionCount",type:"USHORT",value:i.lookupRecords.length});for(let o=0;o<i.coverages.length;o++){let u=i.coverages[o];s.push({name:"inputCoverage"+o,type:"TABLE",value:new $.Coverage(u)})}for(let o=0;o<i.lookupRecords.length;o++){let u=i.lookupRecords[o];s=s.concat({name:"sequenceIndex"+o,type:"USHORT",value:u.sequenceIndex}).concat({name:"lookupListIndex"+o,type:"USHORT",value:u.lookupListIndex})}return new $.Table("contextualSubstitutionTable",s)}he.assert(!1,"lookup type 5 format must be 1, 2 or 3.")},qi[6]=function(i){if(i.substFormat===1)return new $.Table("chainContextTable",[{name:"substFormat",type:"USHORT",value:i.substFormat},{name:"coverage",type:"TABLE",value:new $.Coverage(i.coverage)}].concat($.tableList("chainRuleSet",i.chainRuleSets,function(r){return new $.Table("chainRuleSetTable",$.tableList("chainRule",r,function(o){let u=$.ushortList("backtrackGlyph",o.backtrack,o.backtrack.length).concat($.ushortList("inputGlyph",o.input,o.input.length+1)).concat($.ushortList("lookaheadGlyph",o.lookahead,o.lookahead.length)).concat($.ushortList("substitution",[],o.lookupRecords.length));for(let f=0;f<o.lookupRecords.length;f++){let m=o.lookupRecords[f];u=u.concat({name:"sequenceIndex"+f,type:"USHORT",value:m.sequenceIndex}).concat({name:"lookupListIndex"+f,type:"USHORT",value:m.lookupListIndex})}return new $.Table("chainRuleTable",u)}))})));if(i.substFormat===2)he.assert(!1,"lookup type 6 format 2 is not yet supported.");else if(i.substFormat===3){let s=[{name:"substFormat",type:"USHORT",value:i.substFormat}];s.push({name:"backtrackGlyphCount",type:"USHORT",value:i.backtrackCoverage.length});for(let o=0;o<i.backtrackCoverage.length;o++){let u=i.backtrackCoverage[o];s.push({name:"backtrackCoverage"+o,type:"TABLE",value:new $.Coverage(u)})}s.push({name:"inputGlyphCount",type:"USHORT",value:i.inputCoverage.length});for(let o=0;o<i.inputCoverage.length;o++){let u=i.inputCoverage[o];s.push({name:"inputCoverage"+o,type:"TABLE",value:new $.Coverage(u)})}s.push({name:"lookaheadGlyphCount",type:"USHORT",value:i.lookaheadCoverage.length});for(let o=0;o<i.lookaheadCoverage.length;o++){let u=i.lookaheadCoverage[o];s.push({name:"lookaheadCoverage"+o,type:"TABLE",value:new $.Coverage(u)})}s.push({name:"substitutionCount",type:"USHORT",value:i.lookupRecords.length});for(let o=0;o<i.lookupRecords.length;o++){let u=i.lookupRecords[o];s=s.concat({name:"sequenceIndex"+o,type:"USHORT",value:u.sequenceIndex}).concat({name:"lookupListIndex"+o,type:"USHORT",value:u.lookupListIndex})}return new $.Table("chainContextTable",s)}he.assert(!1,"lookup type 6 format must be 1, 2 or 3.")};function Kf(t){return new $.Table("GSUB",[{name:"version",type:"ULONG",value:65536},{name:"scripts",type:"TABLE",value:new $.ScriptList(t.scripts)},{name:"features",type:"TABLE",value:new $.FeatureList(t.features)},{name:"lookups",type:"TABLE",value:new $.LookupList(t.lookups,qi)}])}var tc={parse:Jf,make:Kf};function Qf(t,i){let s=new _e.Parser(t,i),r=s.parseULong();he.argument(r===1,"Unsupported META table version."),s.parseULong(),s.parseULong();let o=s.parseULong(),u={};for(let f=0;f<o;f++){let m=s.parseTag(),g=s.parseULong(),S=s.parseULong();if(m==="appl"||m==="bild")continue;let v=Ft.UTF8(t,i+g,S);u[m]=v}return u}function ed(t){let i=Object.keys(t).length,s="",r=16+i*12,o=new $.Table("meta",[{name:"version",type:"ULONG",value:1},{name:"flags",type:"ULONG",value:0},{name:"offset",type:"ULONG",value:r},{name:"numTags",type:"ULONG",value:i}]);for(let u in t){let f=s.length;s+=t[u],o.fields.push({name:"tag "+u,type:"TAG",value:u}),o.fields.push({name:"offset "+u,type:"ULONG",value:r+f}),o.fields.push({name:"length "+u,type:"ULONG",value:t[u].length})}return o.fields.push({name:"stringPool",type:"CHARARRAY",value:s}),o}var nc={parse:Qf,make:ed};function td(t,i){let s=new H(t,i),r=s.parseUShort();r!==0&&console.warn("Only COLRv0 is currently fully supported. A subset of color glyphs might be available in this font if provided in the v0 format.");let o=s.parseUShort(),u=s.parseOffset32(),f=s.parseOffset32(),m=s.parseUShort();s.relativeOffset=u;let g=s.parseRecordList(o,{glyphID:H.uShort,firstLayerIndex:H.uShort,numLayers:H.uShort});s.relativeOffset=f;let S=s.parseRecordList(m,{glyphID:H.uShort,paletteIndex:H.uShort});return{version:r,baseGlyphRecords:g,layerRecords:S}}function nd({version:t=0,baseGlyphRecords:i=[],layerRecords:s=[]}){he.argument(t===0,"Only COLRv0 supported.");let r=14,o=r+i.length*6;return new $.Table("COLR",[{name:"version",type:"USHORT",value:t},{name:"numBaseGlyphRecords",type:"USHORT",value:i.length},{name:"baseGlyphRecordsOffset",type:"ULONG",value:r},{name:"layerRecordsOffset",type:"ULONG",value:o},{name:"numLayerRecords",type:"USHORT",value:s.length},...i.map((u,f)=>[{name:"glyphID_"+f,type:"USHORT",value:u.glyphID},{name:"firstLayerIndex_"+f,type:"USHORT",value:u.firstLayerIndex},{name:"numLayers_"+f,type:"USHORT",value:u.numLayers}]).flat(),...s.map((u,f)=>[{name:"LayerGlyphID_"+f,type:"USHORT",value:u.glyphID},{name:"paletteIndex_"+f,type:"USHORT",value:u.paletteIndex}]).flat()])}var ic={parse:td,make:nd};function id(t,i){return[{name:"tag_"+t,type:"TAG",value:i.tag},{name:"minValue_"+t,type:"FIXED",value:i.minValue<<16},{name:"defaultValue_"+t,type:"FIXED",value:i.defaultValue<<16},{name:"maxValue_"+t,type:"FIXED",value:i.maxValue<<16},{name:"flags_"+t,type:"USHORT",value:0},{name:"nameID_"+t,type:"USHORT",value:i.axisNameID}]}function sd(t,i,s){let r={},o=new _e.Parser(t,i);r.tag=o.parseTag(),r.minValue=o.parseFixed(),r.defaultValue=o.parseFixed(),r.maxValue=o.parseFixed(),o.skip("uShort",1);let u=o.parseUShort();return r.axisNameID=u,r.name=Be(s,u),r}function rd(t,i,s,r={}){let o=[{name:"nameID_"+t,type:"USHORT",value:i.subfamilyNameID},{name:"flags_"+t,type:"USHORT",value:0}];for(let u=0;u<s.length;++u){let f=s[u].tag;o.push({name:"axis_"+t+" "+f,type:"FIXED",value:i.coordinates[f]<<16})}return r&&r.postScriptNameID&&o.push({name:"postScriptNameID_",type:"USHORT",value:i.postScriptNameID!==void 0?i.postScriptNameID:65535}),o}function ad(t,i,s,r,o){let u={},f=new _e.Parser(t,i),m=f.parseUShort();u.subfamilyNameID=m,u.name=Be(r,m,[2,17]),f.skip("uShort",1),u.coordinates={};for(let S=0;S<s.length;++S)u.coordinates[s[S].tag]=f.parseFixed();if(f.relativeOffset===o)return u.postScriptNameID=void 0,u.postScriptName=void 0,u;let g=f.parseUShort();return u.postScriptNameID=g==65535?void 0:g,u.postScriptName=u.postScriptNameID!==void 0?Be(r,g,[6]):"",u}function od(t,i){let s=new $.Table("fvar",[{name:"version",type:"ULONG",value:65536},{name:"offsetToData",type:"USHORT",value:0},{name:"countSizePairs",type:"USHORT",value:2},{name:"axisCount",type:"USHORT",value:t.axes.length},{name:"axisSize",type:"USHORT",value:20},{name:"instanceCount",type:"USHORT",value:t.instances.length},{name:"instanceSize",type:"USHORT",value:4+t.axes.length*4}]);s.offsetToData=s.sizeOf();for(let o=0;o<t.axes.length;o++)s.fields=s.fields.concat(id(o,t.axes[o],i));let r={};for(let o=0;o<t.instances.length;o++)if(t.instances[o].postScriptNameID!==void 0){s.instanceSize+=2,r.postScriptNameID=!0;break}for(let o=0;o<t.instances.length;o++)s.fields=s.fields.concat(rd(o,t.instances[o],t.axes,r));return s}function ld(t,i,s){let r=new _e.Parser(t,i),o=r.parseULong();he.argument(o===65536,"Unsupported fvar table version.");let u=r.parseOffset16();r.skip("uShort",1);let f=r.parseUShort(),m=r.parseUShort(),g=r.parseUShort(),S=r.parseUShort(),v=[];for(let B=0;B<f;B++)v.push(sd(t,i+u+B*m,s));let I=[],L=i+u+f*m;for(let B=0;B<g;B++)I.push(ad(t,L+B*S,v,s,S));return{axes:v,instances:I}}var sc={make:od,parse:ld},cd={tag:H.tag,nameID:H.uShort,ordering:H.uShort},Qs=new Array(5);Qs[1]=function(){return{axisIndex:this.parseUShort(),flags:this.parseUShort(),valueNameID:this.parseUShort(),value:this.parseFixed()}},Qs[2]=function(){return{axisIndex:this.parseUShort(),flags:this.parseUShort(),valueNameID:this.parseUShort(),nominalValue:this.parseFixed(),rangeMinValue:this.parseFixed(),rangeMaxValue:this.parseFixed()}},Qs[3]=function(){return{axisIndex:this.parseUShort(),flags:this.parseUShort(),valueNameID:this.parseUShort(),value:this.parseFixed(),linkedValue:this.parseFixed()}},Qs[4]=function(){let i=this.parseUShort();return{flags:this.parseUShort(),valueNameID:this.parseUShort(),axisValues:this.parseList(i,function(){return{axisIndex:this.parseUShort(),value:this.parseFixed()}})}};function ud(){let t=this.parseUShort(),i=Qs[t],s={format:t};return i===void 0?(console.warn(`Unknown axis value table format ${t}`),s):Object.assign(s,this.parseStruct(i.bind(this)))}function hd(t,i,s){i||(i=0);let r=new _e.Parser(t,i),o=r.parseUShort(),u=r.parseUShort();o!==1&&console.warn(`Unsupported STAT table version ${o}.${u}`);let f=[o,u],m=r.parseUShort(),g=r.parseUShort(),S=r.parseOffset32(),v=r.parseUShort(),I=r.parseOffset32(),L=o>1||u>0?r.parseUShort():void 0;s!==void 0&&he.argument(g>=s.axes.length,"STAT axis count must be greater than or equal to fvar axis count"),v>0&&he.argument(g>=0,"STAT axis count must be greater than 0 if STAT axis value count is greater than 0");let B=[];for(let ie=0;ie<g;ie++)r.offset=i+S,r.relativeOffset=ie*m,B.push(r.parseStruct(cd));r.offset=i,r.relativeOffset=I;let F=r.parseUShortList(v),z=[];for(let ie=0;ie<v;ie++)r.offset=i+I,r.relativeOffset=F[ie],z.push(ud.apply(r));return{version:f,axes:B,values:z,elidedFallbackNameID:L}}var er=new Array(5);er[1]=function(i,s){return[{name:`format${i}`,type:"USHORT",value:1},{name:`axisIndex${i}`,type:"USHORT",value:s.axisIndex},{name:`flags${i}`,type:"USHORT",value:s.flags},{name:`valueNameID${i}`,type:"USHORT",value:s.valueNameID},{name:`value${i}`,type:"FLOAT",value:s.value}]},er[2]=function(i,s){return[{name:`format${i}`,type:"USHORT",value:2},{name:`axisIndex${i}`,type:"USHORT",value:s.axisIndex},{name:`flags${i}`,type:"USHORT",value:s.flags},{name:`valueNameID${i}`,type:"USHORT",value:s.valueNameID},{name:`nominalValue${i}`,type:"FLOAT",value:s.nominalValue},{name:`rangeMinValue${i}`,type:"FLOAT",value:s.rangeMinValue},{name:`rangeMaxValue${i}`,type:"FLOAT",value:s.rangeMaxValue}]},er[3]=function(i,s){return[{name:`format${i}`,type:"USHORT",value:3},{name:`axisIndex${i}`,type:"USHORT",value:s.axisIndex},{name:`flags${i}`,type:"USHORT",value:s.flags},{name:`valueNameID${i}`,type:"USHORT",value:s.valueNameID},{name:`value${i}`,type:"FLOAT",value:s.value},{name:`linkedValue${i}`,type:"FLOAT",value:s.linkedValue}]},er[4]=function(i,s){let r=[{name:`format${i}`,type:"USHORT",value:4},{name:`axisCount${i}`,type:"USHORT",value:s.axisValues.length},{name:`flags${i}`,type:"USHORT",value:s.flags},{name:`valueNameID${i}`,type:"USHORT",value:s.valueNameID}];for(let o=0;o<s.axisValues.length;o++)r=r.concat([{name:`format${i}axisIndex${o}`,type:"USHORT",value:s.axisValues[o].axisIndex},{name:`format${i}value${o}`,type:"FLOAT",value:s.axisValues[o].value}]);return r};function fd(t,i){return new $.Record("axisRecord_"+t,[{name:"axisTag_"+t,type:"TAG",value:i.tag},{name:"axisNameID_"+t,type:"USHORT",value:i.nameID},{name:"axisOrdering_"+t,type:"USHORT",value:i.ordering}])}function dd(t,i){let s=i.format,r=er[s];he.argument(r!==void 0,`Unknown axis value table format ${s}`);let o=r(t,i);return new $.Table("axisValueTable_"+t,o)}function pd(t){let i=new $.Table("STAT",[{name:"majorVersion",type:"USHORT",value:1},{name:"minorVersion",type:"USHORT",value:2},{name:"designAxisSize",type:"USHORT",value:8},{name:"designAxisCount",type:"USHORT",value:t.axes.length},{name:"designAxesOffset",type:"ULONG",value:0},{name:"axisValueCount",type:"USHORT",value:t.values.length},{name:"offsetToAxisValueOffsets",type:"ULONG",value:0},{name:"elidedFallbackNameID",type:"USHORT",value:t.elidedFallbackNameID}]);i.designAxesOffset=i.offsetToAxisValueOffsets=i.sizeOf();for(let u=0;u<t.axes.length;u++){let f=fd(u,t.axes[u]);i.offsetToAxisValueOffsets+=f.sizeOf(),i.fields=i.fields.concat(f.fields)}let s=[],r=[],o=t.values.length*2;for(let u=0;u<t.values.length;u++){let f=dd(u,t.values[u]);s.push({name:"offset_"+u,type:"USHORT",value:o}),o+=f.sizeOf(),r=r.concat(f.fields)}return i.fields=i.fields.concat(s),i.fields=i.fields.concat(r),i}var rc={make:pd,parse:hd};function md(t,i){return new $.Record("axisValueMap_"+t,[{name:"fromCoordinate_"+t,type:"F2DOT14",value:i.fromCoordinate},{name:"toCoordinate_"+t,type:"F2DOT14",value:i.toCoordinate}])}function gd(t,i){let s=new $.Record("segmentMap_"+t,[{name:"positionMapCount_"+t,type:"USHORT",value:i.axisValueMaps.length}]),r=[];for(let o=0;o<i.axisValueMaps.length;o++){let u=md(`${t}_${o}`,i.axisValueMaps[o]);r=r.concat(u.fields)}return s.fields=s.fields.concat(r),s}function yd(t,i){he.argument(t.axisSegmentMaps.length===i.axes.length,"avar axis count must correspond to fvar axis count");let s=new $.Table("avar",[{name:"majorVersion",type:"USHORT",value:1},{name:"minorVersion",type:"USHORT",value:0},{name:"reserved",type:"USHORT",value:0},{name:"axisCount",type:"USHORT",value:t.axisSegmentMaps.length}]);for(let r=0;r<t.axisSegmentMaps.length;r++){let o=gd(r,t.axisSegmentMaps[r]);s.fields=s.fields.concat(o.fields)}return s}function xd(t,i,s){i||(i=0);let r=new H(t,i),o=r.parseUShort(),u=r.parseUShort();o!==1&&console.warn(`Unsupported avar table version ${o}.${u}`),r.skip("uShort",1);let f=r.parseUShort();he.argument(f===s.axes.length,"avar axis count must correspond to fvar axis count");let m=[];for(let g=0;g<f;g++){let S=[],v=r.parseUShort();for(let I=0;I<v;I++){let L=r.parseF2Dot14(),B=r.parseF2Dot14();S.push({fromCoordinate:L,toCoordinate:B})}m.push({axisValueMaps:S})}return{version:[o,u],axisSegmentMaps:m}}var ac={make:yd,parse:xd};function vd(t,i,s,r){let o=new _e.Parser(t,i),u=o.parseTupleVariationStore(o.relativeOffset,s.axes.length,"cvar",r),f=o.parseUShort(),m=o.parseUShort();return f!==1&&console.warn(`Unsupported cvar table version ${f}.${m}`),{version:[f,m],...u}}function _d(){console.warn("Writing of cvar tables is not yet supported.")}var oc={make:_d,parse:vd};function bd(t,i,s,r){let o=new _e.Parser(t,i),u=o.parseUShort(),f=o.parseUShort();u!==1&&console.warn(`Unsupported gvar table version ${u}.${f}`);let m=o.parseUShort();m!==s.axes.length&&console.warn(`axisCount ${m} in gvar table does not match the number of axes ${s.axes.length} in the fvar table!`);let g=o.parseUShort(),S=o.parsePointer32(function(){return this.parseTupleRecords(g,m)}),v=o.parseTupleVariationStoreList(m,"gvar",r);return{version:[u,f],sharedTuples:S,glyphVariations:v}}function Sd(){console.warn("Writing of gvar tables is not yet supported.")}var lc={make:Sd,parse:bd};function Md(t,i){let s={},r=new _e.Parser(t,i);s.version=r.parseUShort(),he.argument(s.version<=1,"Unsupported gasp table version."),s.numRanges=r.parseUShort(),s.gaspRanges=[];for(let o=0;o<s.numRanges;o++)s.gaspRanges[o]={rangeMaxPPEM:r.parseUShort(),rangeGaspBehavior:r.parseUShort()};return s}function Td(t){let i=new $.Table("gasp",[{name:"version",type:"USHORT",value:1},{name:"numRanges",type:"USHORT",value:t.numRanges}]);for(let s in t.gaspRanges)i.fields.push({name:"rangeMaxPPEM",type:"USHORT",value:t.gaspRanges[s].rangeMaxPPEM}),i.fields.push({name:"rangeGaspBehavior",type:"USHORT",value:t.gaspRanges[s].rangeGaspBehavior});return i}var cc={parse:Md,make:Td};function Ed(t,i){let s=new Map,r=t.buffer,o=new H(t,i);if(o.parseUShort()!==0)return s;o.relativeOffset=o.parseOffset32();let f=t.byteOffset+i+o.relativeOffset,m=o.parseUShort(),g=new Map;for(let S=0;S<m;S++){let v=o.parseUShort(),I=o.parseUShort(),L=f+o.parseOffset32(),B=o.parseULong(),F=g.get(L);F===void 0&&(F=new Uint8Array(r,L,B),g.set(L,F));for(let z=v;z<=I;z++)s.set(z,F)}return s}function wd(t){let i=Array.from(t.keys()).sort(),s=[],r=[],o=new Map,u=0,f={endGlyphID:null};for(let L=0,B=i.length;L<B;L++){let F=i[L],z=t.get(F),ie=o.get(z);ie===void 0&&(ie=u,r.push(z),o.set(z,ie),u+=z.byteLength),F-1===f.endGlyphID&&ie===f.svgDocOffset?f.endGlyphID=F:(f={startGlyphID:F,endGlyphID:F,svgDocOffset:ie,svgDocLength:z.byteLength},s.push(f))}let m=s.length,g=r.length,S=2+m*12,v=new Array(4+m*4+g),I=0;v[I++]={name:"version",type:"USHORT",value:0},v[I++]={name:"svgDocumentListOffset",type:"ULONG",value:10},v[I++]={name:"reserved",type:"ULONG",value:0},v[I++]={name:"numEntries",type:"USHORT",value:m};for(let L=0;L<m;L++){let B="documentRecord_"+L,{startGlyphID:F,endGlyphID:z,svgDocOffset:ie,svgDocLength:ze}=s[L];v[I++]={name:B+"_startGlyphID",type:"USHORT",value:F},v[I++]={name:B+"_endGlyphID",type:"USHORT",value:z},v[I++]={name:B+"_svgDocOffset",type:"ULONG",value:S+ie},v[I++]={name:B+"_svgDocLength",type:"ULONG",value:ze}}for(let L=0;L<g;L++)v[I++]={name:"svgDoc_"+L,type:"LITERAL",value:r[L]};return new $.Table("SVG ",v)}var uc={make:wd,parse:Ed};function hc(t){return Math.log(t)/Math.log(2)|0}function Ja(t){for(;t.length%4!==0;)t.push(0);let i=0;for(let s=0;s<t.length;s+=4)i+=(t[s]<<24)+(t[s+1]<<16)+(t[s+2]<<8)+t[s+3];return i%=Math.pow(2,32),i}function fc(t,i,s,r){return new $.Record("Table Record",[{name:"tag",type:"TAG",value:t!==void 0?t:""},{name:"checkSum",type:"ULONG",value:i!==void 0?i:0},{name:"offset",type:"ULONG",value:s!==void 0?s:0},{name:"length",type:"ULONG",value:r!==void 0?r:0}])}function dc(t){let i=new $.Table("sfnt",[{name:"version",type:"TAG",value:"OTTO"},{name:"numTables",type:"USHORT",value:0},{name:"searchRange",type:"USHORT",value:0},{name:"entrySelector",type:"USHORT",value:0},{name:"rangeShift",type:"USHORT",value:0}]);i.tables=t,i.numTables=t.length;let s=Math.pow(2,hc(i.numTables));i.searchRange=16*s,i.entrySelector=hc(s),i.rangeShift=i.numTables*16-i.searchRange;let r=[],o=[],u=i.sizeOf()+fc().sizeOf()*i.numTables;for(;u%4!==0;)u+=1,o.push({name:"padding",type:"BYTE",value:0});for(let f=0;f<t.length;f+=1){let m=t[f];he.argument(m.tableName.length===4,"Table name"+m.tableName+" is invalid.");let g=m.sizeOf(),S=fc(m.tableName,Ja(m.encode()),u,g);for(r.push({name:S.tag+" Table Record",type:"RECORD",value:S}),o.push({name:m.tableName+" table",type:"RECORD",value:m}),u+=g,he.argument(!isNaN(u),"Something went wrong calculating the offset.");u%4!==0;)u+=1,o.push({name:"padding",type:"BYTE",value:0})}return r.sort(function(f,m){return f.value.tag>m.value.tag?1:-1}),i.fields=i.fields.concat(r),i.fields=i.fields.concat(o),i}function pc(t,i,s){for(let r=0;r<i.length;r+=1){let o=t.charToGlyphIndex(i[r]);if(o>0)return t.glyphs.get(o).getMetrics()}return s}function Ad(t){let i=0;for(let s=0;s<t.length;s+=1)i+=t[s];return i/t.length}function Cd(t){let i=[],s=[],r=[],o=[],u=[],f=[],m=[],g,S=0,v=0,I=0,L=0,B=0;for(let Rt=0;Rt<t.glyphs.length;Rt+=1){let dn=t.glyphs.get(Rt),wn=dn.unicode|0;if(isNaN(dn.advanceWidth))throw new Error("Glyph "+dn.name+" ("+Rt+"): advanceWidth is not a number.");(g>wn||g===void 0)&&wn>0&&(g=wn),S<wn&&(S=wn);let kn=ja.getUnicodeRange(wn);if(kn<32)v|=1<<kn;else if(kn<64)I|=1<<kn-32;else if(kn<96)L|=1<<kn-64;else if(kn<123)B|=1<<kn-96;else throw new Error("Unicode ranges bits > 123 are reserved for internal usage");if(dn.name===".notdef")continue;let ii=dn.getMetrics();i.push(ii.xMin),s.push(ii.yMin),r.push(ii.xMax),o.push(ii.yMax),f.push(ii.leftSideBearing),m.push(ii.rightSideBearing),u.push(dn.advanceWidth)}let F={xMin:Math.min.apply(null,i),yMin:Math.min.apply(null,s),xMax:Math.max.apply(null,r),yMax:Math.max.apply(null,o),advanceWidthMax:Math.max.apply(null,u),advanceWidthAvg:Ad(u),minLeftSideBearing:Math.min.apply(null,f),maxLeftSideBearing:Math.max.apply(null,f),minRightSideBearing:Math.min.apply(null,m)};F.ascender=t.ascender,F.descender=t.descender;let z=0;t.weightClass>=600&&(z|=t.macStyleValues.BOLD),t.italicAngle<0&&(z|=t.macStyleValues.ITALIC);let ie=$l.make({flags:3,unitsPerEm:t.unitsPerEm,xMin:F.xMin,yMin:F.yMin,xMax:F.xMax,yMax:F.yMax,lowestRecPPEM:3,macStyle:z,createdTimestamp:t.createdTimestamp}),ze=jl.make({ascender:F.ascender,descender:F.descender,advanceWidthMax:F.advanceWidthMax,minLeftSideBearing:F.minLeftSideBearing,minRightSideBearing:F.minRightSideBearing,xMaxExtent:F.maxLeftSideBearing+(F.xMax-F.xMin),numberOfHMetrics:t.glyphs.length}),Ne=Ql.make(t.glyphs.length),Xe=ja.make(Object.assign({xAvgCharWidth:Math.round(F.advanceWidthAvg),usFirstCharIndex:g,usLastCharIndex:S,ulUnicodeRange1:v,ulUnicodeRange2:I,ulUnicodeRange3:L,ulUnicodeRange4:B,sTypoAscender:F.ascender,sTypoDescender:F.descender,sTypoLineGap:0,usWinAscent:F.yMax,usWinDescent:Math.abs(F.yMin),ulCodePageRange1:1,sxHeight:pc(t,"xyvw",{yMax:Math.round(F.ascender/2)}).yMax,sCapHeight:pc(t,"HIKLEFJMNTZBDPRAGOQSUVWXY",F).yMax,usDefaultChar:t.hasChar(" ")?32:0,usBreakChar:t.hasChar(" ")?32:0},t.tables.os2)),ct=Jl.make(t.glyphs),xt=lt.make(t.glyphs),Et=t.getEnglishName("fontFamily"),wt=t.getEnglishName("fontSubfamily"),Vt=Et+" "+wt,Nn=t.getEnglishName("postScriptName");Nn||(Nn=Et.replace(/\s/g,"")+"-"+wt);let ut={};for(let Rt in t.names)ut[Rt]=t.names[Rt];ut.unicode=ut.unicode||{},ut.macintosh=ut.macintosh||{},ut.windows=ut.windows||{};let vn=t.names.unicode||{},on=t.names.macintosh||{},Ve=t.names.windows||{};for(let Rt in ut){if(ut[Rt]=ut[Rt]||{},!ut[Rt].uniqueID){let dn=t.getEnglishName("manufacturer")||"";ut[Rt].uniqueID={en:`${dn}: ${Vt}`}}ut[Rt].postScriptName||(ut[Rt].postScriptName={en:Nn})}ut.unicode.preferredFamily||(ut.unicode.preferredFamily=vn.fontFamily||on.fontFamily||Ve.fontFamily),ut.macintosh.preferredFamily||(ut.macintosh.preferredFamily=on.fontFamily||vn.fontFamily||Ve.fontFamily),ut.windows.preferredFamily||(ut.windows.preferredFamily=Ve.fontFamily||vn.fontFamily||on.fontFamily),ut.unicode.preferredSubfamily||(ut.unicode.preferredSubfamily=vn.fontSubfamily||on.fontSubfamily||Ve.fontSubfamily),ut.macintosh.preferredSubfamily||(ut.macintosh.preferredSubfamily=on.fontSubfamily||vn.fontSubfamily||Ve.fontSubfamily),ut.windows.preferredSubfamily||(ut.windows.preferredSubfamily=Ve.fontSubfamily||vn.fontSubfamily||on.fontSubfamily);let De=[],Oe=Ze.make(ut,De),Jt=De.length>0?Kl.make(De):void 0,Ci=ec.make(t),kr=Za.make(t.glyphs,{version:t.getEnglishName("version"),fullName:Vt,familyName:Et,weightName:wt,postScriptName:Nn,unitsPerEm:t.unitsPerEm,fontBBox:[0,F.yMin,F.ascender,F.advanceWidthMax],topDict:t.tables.cff&&t.tables.cff.topDict||{}}),$i=t.metas&&Object.keys(t.metas).length>0?nc.make(t.metas):void 0,Fn=[ie,ze,Ne,Xe,Oe,xt,Ci,kr,ct];Jt&&Fn.push(Jt);let ln={gsub:tc,cpal:Nl,colr:ic,stat:rc,avar:ac,cvar:oc,fvar:sc,gvar:lc,gasp:cc,svg:uc},En={avar:[t.tables.fvar],fvar:[t.names]};for(let Rt in ln){let dn=t.tables[Rt];if(dn){let wn=ln[Rt].make.call(t,dn,...En[Rt]||[]);wn&&Fn.push(wn)}}$i&&Fn.push($i);let Kt=dc(Fn),_n=Kt.encode(),cn=Ja(_n),un=Kt.fields,Bt=!1;for(let Rt=0;Rt<un.length;Rt+=1)if(un[Rt].name==="head table"){un[Rt].value.checkSumAdjustment=2981146554-cn,Bt=!0;break}if(!Bt)throw new Error("Could not find head table with checkSum to adjust.");return Kt}var Rd={make:dc,fontToTable:Cd,computeCheckSum:Ja};function Ka(t,i){let s=0,r=t.length-1;for(;s<=r;){let o=s+r>>>1,u=t[o].tag;if(u===i)return o;u<i?s=o+1:r=o-1}return-s-1}function mc(t,i){let s=0,r=t.length-1;for(;s<=r;){let o=s+r>>>1,u=t[o];if(u===i)return o;u<i?s=o+1:r=o-1}return-s-1}function gc(t,i){let s,r=0,o=t.length-1;for(;r<=o;){let u=r+o>>>1;s=t[u];let f=s.start;if(f===i)return s;f<i?r=u+1:o=u-1}if(r>0)return s=t[r-1],i>s.end?0:s}function yc(t,i){this.font=t,this.tableName=i}yc.prototype={searchTag:Ka,binSearch:mc,getTable:function(t){let i=this.font.tables[this.tableName];return!i&&t&&(i=this.font.tables[this.tableName]=this.createDefaultTable()),i},getScriptNames:function(){let t=this.getTable();return t?t.scripts.map(function(i){return i.tag}):[]},getDefaultScriptName:function(){let t=this.getTable();if(!t)return;let i=!1;for(let s=0;s<t.scripts.length;s++){let r=t.scripts[s].tag;if(r==="DFLT")return r;r==="latn"&&(i=!0)}if(i)return"latn"},getScriptTable:function(t,i){let s=this.getTable(i);if(s){t=t||"DFLT";let r=s.scripts,o=Ka(s.scripts,t);if(o>=0)return r[o].script;if(i){let u={tag:t,script:{defaultLangSys:{reserved:0,reqFeatureIndex:65535,featureIndexes:[]},langSysRecords:[]}};return r.splice(-1-o,0,u),u.script}}},getLangSysTable:function(t,i,s){let r=this.getScriptTable(t,s);if(r){if(!i||i==="dflt"||i==="DFLT")return r.defaultLangSys;let o=Ka(r.langSysRecords,i);if(o>=0)return r.langSysRecords[o].langSys;if(s){let u={tag:i,langSys:{reserved:0,reqFeatureIndex:65535,featureIndexes:[]}};return r.langSysRecords.splice(-1-o,0,u),u.langSys}}},getFeatureTable:function(t,i,s,r){let o=this.getLangSysTable(t,i,r);if(o){let u,f=o.featureIndexes,m=this.font.tables[this.tableName].features;for(let g=0;g<f.length;g++)if(u=m[f[g]],u.tag===s)return u.feature;if(r){let g=m.length;return he.assert(g===0||s>=m[g-1].tag,"Features must be added in alphabetical order."),u={tag:s,feature:{params:0,lookupListIndexes:[]}},m.push(u),f.push(g),u.feature}}},getLookupTables:function(t,i,s,r,o){let u=this.getFeatureTable(t,i,s,o),f=[];if(u){let m,g=u.lookupListIndexes,S=this.font.tables[this.tableName].lookups;for(let v=0;v<g.length;v++)m=S[g[v]],m.lookupType===r&&f.push(m);if(f.length===0&&o){m={lookupType:r,lookupFlag:0,subtables:[],markFilteringSet:void 0};let v=S.length;return S.push(m),g.push(v),[m]}}return f},getGlyphClass:function(t,i){switch(t.format){case 1:return t.startGlyph<=i&&i<t.startGlyph+t.classes.length?t.classes[i-t.startGlyph]:0;case 2:{let s=gc(t.ranges,i);return s?s.classId:0}}},getCoverageIndex:function(t,i){switch(t.format){case 1:{let s=mc(t.glyphs,i);return s>=0?s:-1}case 2:{let s=gc(t.ranges,i);return s?s.index+i-s.start:-1}}},expandCoverage:function(t){if(t.format===1)return t.glyphs;{let i=[],s=t.ranges;for(let r=0;r<s.length;r++){let o=s[r],u=o.start,f=o.end;for(let m=u;m<=f;m++)i.push(m)}return i}}};var Rr=yc;function tr(t){Rr.call(this,t,"gpos")}tr.prototype=Rr.prototype,tr.prototype.init=function(){let t=this.getDefaultScriptName();this.defaultKerningTables=this.getKerningTables(t)},tr.prototype.getKerningValue=function(t,i,s){for(let r=0;r<t.length;r++){let o=t[r].subtables;for(let u=0;u<o.length;u++){let f=o[u],m=this.getCoverageIndex(f.coverage,i);if(!(m<0))switch(f.posFormat){case 1:{let g=f.pairSets[m];for(let S=0;S<g.length;S++){let v=g[S];if(v.secondGlyph===s)return v.value1&&v.value1.xAdvance||0}break}case 2:{let g=this.getGlyphClass(f.classDef1,i),S=this.getGlyphClass(f.classDef2,s),v=f.classRecords[g][S];return v.value1&&v.value1.xAdvance||0}}}}return 0},tr.prototype.getKerningTables=function(t,i){if(this.font.tables.gpos)return this.getLookupTables(t,i,"kern",2)};var Ld=tr;function Id(t,i){let s=t.length;if(s!==i.length)return!1;for(let r=0;r<s;r++)if(t[r]!==i[r])return!1;return!0}function Pd(t,i,s){let r=0,o=t.length-1,u=null;for(;r<=o;){let f=Math.floor((r+o)/2),m=t[f],g=m[i];if(g<s)r=f+1;else if(g>s)o=f-1;else{u=m;break}}return u}function Ud(t,i,s){let r=0,o=t.length-1;for(;r<=o;){let u=Math.floor((r+o)/2),f=t[u];if(f[i]<s)r=u+1;else if(f[i]>s)o=u-1;else return u}return-1}function Dd(t,i,s){let r=0,o=t.length,u=(f,m)=>f[i]-m[i];for(;r<o;){let f=r+o>>>1;u(t[f],s)<0?r=f+1:o=f}return t.splice(r,0,s),r}function xc(t){return t[0]===31&&t[1]===139&&t[2]===8}function Od(t){let i=new DataView(t.buffer,t.byteOffset,t.byteLength),s=10,r=t.byteLength-8,o=i.getInt8(3);if(o&4&&(s+=2+i.getUint16(s,!0)),o&8)for(;s<r&&t[s++]!==0;);if(o&16)for(;s<r&&t[s++]!==0;);if(o&2&&(s+=2),s>=r)throw new Error("Can't find compressed blocks");let u=i.getUint32(i.byteLength-4,!0);return te(t.subarray(s,r),new Uint8Array(u))}function vc(t){return{x:t.x,y:t.y,onCurve:t.onCurve,lastPointOfContour:t.lastPointOfContour}}function Nd(t){return{glyphIndex:t.glyphIndex,xScale:t.xScale,scale01:t.scale01,scale10:t.scale10,yScale:t.yScale,dx:t.dx,dy:t.dy}}function yn(t){Rr.call(this,t,"gsub")}function Qa(t,i,s){let r=t.subtables;for(let o=0;o<r.length;o++){let u=r[o];if(u.substFormat===i)return u}if(s)return r.push(s),s}yn.prototype=Rr.prototype,yn.prototype.createDefaultTable=function(){return{version:1,scripts:[{tag:"DFLT",script:{defaultLangSys:{reserved:0,reqFeatureIndex:65535,featureIndexes:[]},langSysRecords:[]}}],features:[],lookups:[]}},yn.prototype.getSingle=function(t,i,s){let r=[],o=this.getLookupTables(i,s,t,1);for(let u=0;u<o.length;u++){let f=o[u].subtables;for(let m=0;m<f.length;m++){let g=f[m],S=this.expandCoverage(g.coverage),v;if(g.substFormat===1){let I=g.deltaGlyphId;for(v=0;v<S.length;v++){let L=S[v];r.push({sub:L,by:L+I})}}else{let I=g.substitute;for(v=0;v<S.length;v++)r.push({sub:S[v],by:I[v]})}}}return r},yn.prototype.getMultiple=function(t,i,s){let r=[],o=this.getLookupTables(i,s,t,2);for(let u=0;u<o.length;u++){let f=o[u].subtables;for(let m=0;m<f.length;m++){let g=f[m],S=this.expandCoverage(g.coverage),v;for(v=0;v<S.length;v++){let I=S[v],L=g.sequences[v];r.push({sub:I,by:L})}}}return r},yn.prototype.getAlternates=function(t,i,s){let r=[],o=this.getLookupTables(i,s,t,3);for(let u=0;u<o.length;u++){let f=o[u].subtables;for(let m=0;m<f.length;m++){let g=f[m],S=this.expandCoverage(g.coverage),v=g.alternateSets;for(let I=0;I<S.length;I++)r.push({sub:S[I],by:v[I]})}}return r},yn.prototype.getLigatures=function(t,i,s){let r=[],o=this.getLookupTables(i,s,t,4);for(let u=0;u<o.length;u++){let f=o[u].subtables;for(let m=0;m<f.length;m++){let g=f[m],S=this.expandCoverage(g.coverage),v=g.ligatureSets;for(let I=0;I<S.length;I++){let L=S[I],B=v[I];for(let F=0;F<B.length;F++){let z=B[F];r.push({sub:[L].concat(z.components),by:z.ligGlyph})}}}}return r},yn.prototype.addSingle=function(t,i,s,r){let o=this.getLookupTables(s,r,t,1,!0)[0],u=Qa(o,2,{substFormat:2,coverage:{format:1,glyphs:[]},substitute:[]});he.assert(u.coverage.format===1,"Single: unable to modify coverage table format "+u.coverage.format);let f=i.sub,m=this.binSearch(u.coverage.glyphs,f);m<0&&(m=-1-m,u.coverage.glyphs.splice(m,0,f),u.substitute.splice(m,0,0)),u.substitute[m]=i.by},yn.prototype.addMultiple=function(t,i,s,r){he.assert(i.by instanceof Array&&i.by.length>1,'Multiple: "by" must be an array of two or more ids');let o=this.getLookupTables(s,r,t,2,!0)[0],u=Qa(o,1,{substFormat:1,coverage:{format:1,glyphs:[]},sequences:[]});he.assert(u.coverage.format===1,"Multiple: unable to modify coverage table format "+u.coverage.format);let f=i.sub,m=this.binSearch(u.coverage.glyphs,f);m<0&&(m=-1-m,u.coverage.glyphs.splice(m,0,f),u.sequences.splice(m,0,0)),u.sequences[m]=i.by},yn.prototype.addAlternate=function(t,i,s,r){let o=this.getLookupTables(s,r,t,3,!0)[0],u=Qa(o,1,{substFormat:1,coverage:{format:1,glyphs:[]},alternateSets:[]});he.assert(u.coverage.format===1,"Alternate: unable to modify coverage table format "+u.coverage.format);let f=i.sub,m=this.binSearch(u.coverage.glyphs,f);m<0&&(m=-1-m,u.coverage.glyphs.splice(m,0,f),u.alternateSets.splice(m,0,0)),u.alternateSets[m]=i.by},yn.prototype.addLigature=function(t,i,s,r){let o=this.getLookupTables(s,r,t,4,!0)[0],u=o.subtables[0];u||(u={substFormat:1,coverage:{format:1,glyphs:[]},ligatureSets:[]},o.subtables[0]=u),he.assert(u.coverage.format===1,"Ligature: unable to modify coverage table format "+u.coverage.format);let f=i.sub[0],m=i.sub.slice(1),g={ligGlyph:i.by,components:m},S=this.binSearch(u.coverage.glyphs,f);if(S>=0){let v=u.ligatureSets[S];for(let I=0;I<v.length;I++)if(Id(v[I].components,m))return;v.push(g)}else S=-1-S,u.coverage.glyphs.splice(S,0,f),u.ligatureSets.splice(S,0,[g])},yn.prototype.getFeature=function(t,i,s){if(/ss\d\d/.test(t))return this.getSingle(t,i,s);switch(t){case"aalt":case"salt":return this.getSingle(t,i,s).concat(this.getAlternates(t,i,s));case"dlig":case"liga":case"rlig":return this.getLigatures(t,i,s);case"ccmp":return this.getMultiple(t,i,s).concat(this.getLigatures(t,i,s));case"stch":return this.getMultiple(t,i,s)}},yn.prototype.add=function(t,i,s,r){if(/ss\d\d/.test(t))return this.addSingle(t,i,s,r);switch(t){case"aalt":case"salt":return typeof i.by=="number"?this.addSingle(t,i,s,r):this.addAlternate(t,i,s,r);case"dlig":case"liga":case"rlig":return this.addLigature(t,i,s,r);case"ccmp":return i.by instanceof Array?this.addMultiple(t,i,s,r):this.addLigature(t,i,s,r)}};var Fd=yn,_c=class{constructor(t){this.defaultValue=255,this.font=t}cpal(){return this.font.tables&&this.font.tables.cpal?this.font.tables.cpal:!1}getAll(t){let i=[],s=this.cpal();if(!s)return i;for(let r=0;r<s.colorRecordIndices.length;r++){let o=s.colorRecordIndices[r],u=[];for(let f=o;f<o+s.numPaletteEntries;f++)u.push(hs(s.colorRecords[f],t||"hexa"));i.push(u)}return i}toCPALcolor(t){return Array.isArray(t)?t.map(i=>wr(i,"raw")):wr(t,"raw")}fillPalette(t,i=[],s=this.cpal().numPaletteEntries){return t=Number.isInteger(t)?this.get(t,"raw"):t,Object.assign(Array(s).fill(this.defaultValue),this.toCPALcolor(t).concat(this.toCPALcolor(i)))}extend(t){if(this.ensureCPAL(Array(t).fill(this.defaultValue)))return;let i=this.cpal(),s=i.numPaletteEntries+t,r=this.getAll().map(o=>this.fillPalette(o,[],s));i.numPaletteEntries=s,i.colorRecords=this.toCPALcolor(r.flat()),this.updateIndices()}get(t,i="hexa"){return this.getAll(i)[t]||null}getColor(t,i=0,s="hexa"){return Ga(this.font,t,i,s)}setColor(t,i,s=0){t=parseInt(t),s=parseInt(s);let r=this.getAll("raw"),o=r[s];if(!o)throw Error(`paletteIndex ${s} out of range`);let u=this.cpal(),f=u.numPaletteEntries;Array.isArray(i)||(i=[i]),i.length+t>f&&(this.extend(i.length+t-f),r=this.getAll("raw"),o=r[s]);for(let m=0;m<i.length;m++)o[m+t]=this.toCPALcolor(i[m]);u.colorRecords=r.flat(),this.updateIndices()}add(t){if(this.ensureCPAL(t))return;let i=this.cpal(),s=i.numPaletteEntries;t&&t.length?(t=this.toCPALcolor(t),t.length>s?this.extend(t.length-s):t.length<s&&(t=this.fillPalette(t)),i.colorRecordIndices.push(i.colorRecords.length),i.colorRecords.push(...t)):(i.colorRecordIndices.push(i.colorRecords.length),i.colorRecords.push(...Array(s).fill(this.defaultValue)))}delete(t){let i=this.getAll("raw");delete i[t];let s=this.cpal();s.colorRecordIndices.pop(),s.colorRecords=i.flat()}deleteColor(t,i){if(t===i)throw Error("replacementIndex cannot be the same as colorIndex");let s=this.cpal(),r=this.getAll("raw"),o=[];if(i>s.numPaletteEntries-1)throw Error(`Replacement index out of range: numPaletteEntries after deletion: ${s.numPaletteEntries-1}, replacementIndex: ${i})`);for(let m=0;m<r.length;m++){let S=r[m].filter((v,I)=>I!==t);o.push(S)}let u=this.font.tables.colr;if(u){let m=u.layerRecords;for(let g=0;g<m.length;g++){let S=m[g].paletteIndex;if(S>t)m[g].paletteIndex-=1;else if(S===t){let v=0;for(let I=0;I<r.length;I++)if(i>t&&i<=t+r[I].length){v++;break}m[g].paletteIndex=i-v}}this.font.tables.colr={...u,layerRecords:m}}let f=o.flat();for(let m=0;m<r.length;m++)s.colorRecordIndices[m]-=m;s.numPaletteEntries=Math.max(0,s.numPaletteEntries-1),s.colorRecords=this.toCPALcolor(f)}ensureCPAL(t){return this.cpal()?!1:(!t||!t.length?t=[this.defaultValue]:t=this.toCPALcolor(t),this.font.tables.cpal={version:0,numPaletteEntries:t.length,colorRecords:t,colorRecordIndices:[0]},!0)}updateIndices(){let t=this.cpal(),i=Math.ceil(t.colorRecords.length/t.numPaletteEntries);t.colorRecordIndices=[];for(let s=0;s<i;s++)t.colorRecordIndices.push(s*t.numPaletteEntries)}},kd=class{constructor(t){this.font=t}ensureCOLR(){return this.font.tables.colr||(this.font.tables.colr={version:0,baseGlyphRecords:[],layerRecords:[]}),this.font}get(t){let i=this.font,s=[],r=i.tables.colr,o=i.tables.cpal;if(!r||!o)return s;let u=Pd(r.baseGlyphRecords,"glyphID",t);if(!u)return s;let f=u.firstLayerIndex,m=u.numLayers;for(let g=0;g<m;g++){let S=r.layerRecords[f+g];s.push({glyph:i.glyphs.get(S.glyphID),paletteIndex:S.paletteIndex})}return s}add(t,i,s){let r=this.get(t);i=Array.isArray(i)?i:[i],s===void 0||s===1/0||s>r.length?s=r.length:s<0&&(s=r.length+1+s%(r.length+1),s>=r.length+1&&(s-=r.length+1));let o=[];for(let u=0;u<s;u++){let f=Number.isInteger(r[u].glyph)?r[u].glyph:r[u].glyph.index;o.push({glyphID:f,paletteIndex:r[u].paletteIndex})}for(let u of i){let f=Number.isInteger(u.glyph)?u.glyph:u.glyph.index;o.push({glyphID:f,paletteIndex:u.paletteIndex})}for(let u=s;u<r.length;u++){let f=Number.isInteger(r[u].glyph)?r[u].glyph:r[u].glyph.index;o.push({glyphID:f,paletteIndex:r[u].paletteIndex})}this.updateColrTable(t,o)}setPaletteIndex(t,i,s){let r=this.get(t);r[i]?(r=r.map((o,u)=>({glyphID:o.glyph.index,paletteIndex:u===i?s:o.paletteIndex})),this.updateColrTable(t,r)):console.error("Invalid layer index")}remove(t,i,s=i){let r=this.get(t);r=r.map(o=>({glyphID:o.glyph.index,paletteIndex:o.paletteIndex})),r.splice(i,s-i+1),this.updateColrTable(t,r)}updateColrTable(t,i){this.ensureCOLR();let r=this.font.tables.colr,o=Ud(r.baseGlyphRecords,"glyphID",t);if(o===-1){let v={glyphID:t,firstLayerIndex:r.layerRecords.length,numLayers:0};o=Dd(r.baseGlyphRecords,"glyphID",v)}let f=r.baseGlyphRecords[o],m=f.numLayers,g=i.length,S=g-m;if(S>0){let v=i.slice(m).map(I=>({glyphID:I.glyphID,paletteIndex:I.paletteIndex}));r.layerRecords.splice(f.firstLayerIndex+m,0,...v)}else S<0&&r.layerRecords.splice(f.firstLayerIndex+g,-S);for(let v=0;v<Math.min(m,g);v++)r.layerRecords[f.firstLayerIndex+v]={glyphID:i[v].glyphID,paletteIndex:i[v].paletteIndex};if(f.numLayers=g,S!==0)for(let v=0;v<r.baseGlyphRecords.length;v++){let I=r.baseGlyphRecords[v];v===o||I.firstLayerIndex<f.firstLayerIndex||(r.baseGlyphRecords[v].firstLayerIndex+=S)}}},Bd=class{constructor(t){this.font=t,this.cache=new WeakMap}get(t){let i=this.getOrCreateSvgImageCacheEntry(t);return i&&i.image}getAsync(t){let i=this.getOrCreateSvgImageCacheEntry(t);return i&&i.promise}getOrCreateSvgImageCacheEntry(t){let i=this.font.tables.svg;if(i===void 0)return;let s=i.get(t);if(s===void 0)return;let r=this.cache.get(s);r===void 0&&(r=zd(s),this.cache.set(s,r));let o=r.images.get(t);return o===void 0&&(o=Vd(this.font,r.template,t),o.promise.then(u=>{if(o.image=u,typeof this.font.onGlyphUpdated=="function")try{this.font.onGlyphUpdated(t)}catch(f){console.error("font.onGlyphUpdated",t,f)}}),r.images.set(t,o)),o}};function zd(t){return{template:Gd(t).then(Xd),images:new Map}}function Vd(t,i,s){return{promise:i.then(r=>{let o;typeof r=="string"?o=r:(r[4]=s,o=r.join(""));let u=qd(o,t.unitsPerEm);return u.image.decode().then(()=>u)}),image:void 0}}var Gd=typeof DecompressionStream=="function"?Wd:Hd;function Hd(t){try{return Promise.resolve(new TextDecoder().decode(xc(t)?Od(t):t))}catch(i){return Promise.reject(i)}}function Wd(t){if(xc(t))return new Response(new Response(t).body.pipeThrough(new DecompressionStream("gzip"))).text();try{return Promise.resolve(new TextDecoder().decode(t))}catch(i){return Promise.reject(i)}}function Xd(t){let i=t.indexOf("<svg"),s=t.indexOf(">",i+4)+1;if(/ id=['"]glyph\d+['"]/.test(t.substring(i,s)))return t;let r=t.lastIndexOf("</svg>");return[t.substring(0,s),"<defs>",t.substring(s,r),'</defs><use href="#glyph',"",'"/>',t.substring(r)]}function qd(t,i){let r=new DOMParser().parseFromString(t,"image/svg+xml").documentElement,o=r.viewBox.baseVal,u=r.width.baseVal,f=r.height.baseVal,m=1,g=1;o.width>0&&o.height>0&&(u.unitType===1?(m=u.valueInSpecifiedUnits/o.width,g=f.unitType===1?f.valueInSpecifiedUnits/o.height:m):f.unitType===1?(g=f.valueInSpecifiedUnits/o.height,m=g):i&&(m=i/o.width,g=i/o.height));let S=document.createElement("div");S.style.position="fixed",S.style.visibility="hidden",S.appendChild(r),document.body.appendChild(S);let v=r.getBBox();document.body.removeChild(S);let I=(v.x-o.x)*m,L=(o.y-v.y)*g,B=v.width*m,F=v.height*g;r.setAttribute("viewBox",[v.x,v.y,v.width,v.height].join(" ")),m!==1&&r.setAttribute("width",B),g!==1&&r.setAttribute("height",F);let z=new Image(B,F);return z.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(r.outerHTML),{leftSideBearing:I,baseline:L,image:z}}var eo=new WeakMap;function bc(t,i,s,r,o){let u;return(i&r)>0?(u=t.parseByte(),(i&o)===0&&(u=-u),u=s+u):(i&o)>0?u=s:u=s+t.parseShort(),u}function Sc(t,i,s){let r=new _e.Parser(i,s);t._numberOfContours=r.parseShort(),t._xMin=r.parseShort(),t._yMin=r.parseShort(),t._xMax=r.parseShort(),t._yMax=r.parseShort();let o,u;if(t._numberOfContours>0){let f=t.endPointIndices=[];for(let g=0;g<t._numberOfContours;g+=1)f.push(r.parseUShort());t.instructionLength=r.parseUShort(),t.instructions=[];for(let g=0;g<t.instructionLength;g+=1)t.instructions.push(r.parseByte());let m=f[f.length-1]+1;o=[];for(let g=0;g<m;g+=1)if(u=r.parseByte(),o.push(u),(u&8)>0){let S=r.parseByte();for(let v=0;v<S;v+=1)o.push(u),g+=1}if(he.argument(o.length===m,"Bad flags."),f.length>0){let g=[],S;if(m>0){for(let L=0;L<m;L+=1)u=o[L],S={},S.onCurve=!!(u&1),S.lastPointOfContour=f.indexOf(L)>=0,g.push(S);let v=0;for(let L=0;L<m;L+=1)u=o[L],S=g[L],S.x=bc(r,u,v,2,16),v=S.x;let I=0;for(let L=0;L<m;L+=1)u=o[L],S=g[L],S.y=bc(r,u,I,4,32),I=S.y}t.points=g}else t.points=[]}else if(t._numberOfContours===0)t.points=[];else{t.isComposite=!0,t.points=[],t.components=[];let f=!0;for(;f;){o=r.parseUShort();let m={glyphIndex:r.parseUShort(),xScale:1,scale01:0,scale10:0,yScale:1,dx:0,dy:0};(o&1)>0?(o&2)>0?(m.dx=r.parseShort(),m.dy=r.parseShort()):m.matchedPoints=[r.parseUShort(),r.parseUShort()]:(o&2)>0?(m.dx=r.parseChar(),m.dy=r.parseChar()):m.matchedPoints=[r.parseByte(),r.parseByte()],(o&8)>0?m.xScale=m.yScale=r.parseF2Dot14():(o&64)>0?(m.xScale=r.parseF2Dot14(),m.yScale=r.parseF2Dot14()):(o&128)>0&&(m.xScale=r.parseF2Dot14(),m.scale01=r.parseF2Dot14(),m.scale10=r.parseF2Dot14(),m.yScale=r.parseF2Dot14()),t.components.push(m),f=!!(o&32)}if(o&256){t.instructionLength=r.parseUShort(),t.instructions=[];for(let m=0;m<t.instructionLength;m+=1)t.instructions.push(r.parseByte())}}}function Lr(t,i){let s=[];for(let r=0;r<t.length;r+=1){let o=t[r],u={x:i.xScale*o.x+i.scale10*o.y+i.dx,y:i.scale01*o.x+i.yScale*o.y+i.dy,onCurve:o.onCurve,lastPointOfContour:o.lastPointOfContour};s.push(u)}return s}function Yd(t){let i=[],s=[];for(let r=0;r<t.length;r+=1){let o=t[r];s.push(o),o.lastPointOfContour&&(i.push(s),s=[])}return he.argument(s.length===0,"There are still points left in the current contour."),i}function to(t){let i=new Ae;if(!t)return i;let s=Yd(t);for(let r=0;r<s.length;++r){let o=s[r],u=o[o.length-1],f=o[0];if(u.onCurve)i.moveTo(u.x,u.y);else if(f.onCurve)i.moveTo(f.x,f.y);else{let m={x:(u.x+f.x)*.5,y:(u.y+f.y)*.5};i.moveTo(m.x,m.y)}for(let m=0;m<o.length;++m)if(u=f,f=o[(m+1)%o.length],u.onCurve)i.lineTo(u.x,u.y);else{let g=f;f.onCurve||(g={x:(u.x+f.x)*.5,y:(u.y+f.y)*.5}),i.quadraticCurveTo(u.x,u.y,g.x,g.y)}i.closePath()}return i}function Mc(t,i){if(i.isComposite){eo.has(t)||eo.set(t,new Set);let s=eo.get(t);s.add(i.index);try{for(let r=0;r<i.components.length;r+=1){let o=i.components[r];if(s.has(o.glyphIndex))continue;let u=t.get(o.glyphIndex);if(u.getPath(),u.points){let f;if(o.matchedPoints===void 0)f=Lr(u.points,o);else{if(o.matchedPoints[0]>i.points.length-1||o.matchedPoints[1]>u.points.length-1)throw Error("Matched points out of range in "+i.name);let m=i.points[o.matchedPoints[0]],g=u.points[o.matchedPoints[1]],S={xScale:o.xScale,scale01:o.scale01,scale10:o.scale10,yScale:o.yScale,dx:0,dy:0};g=Lr([g],S)[0],S.dx=m.x-g.x,S.dy=m.y-g.y,f=Lr(u.points,S)}i.points=i.points.concat(f)}}}finally{s.delete(i.index)}}return to(i.points)}function Zd(t,i,s,r){let o=new Yn.GlyphSet(r);for(let u=0;u<s.length-1;u+=1){let f=s[u],m=s[u+1];f!==m?o.push(u,Yn.ttfGlyphLoader(r,u,Sc,t,i+f,Mc)):o.push(u,Yn.glyphLoader(r,u))}return o}function $d(t,i,s,r){let o=new Yn.GlyphSet(r);return r._push=function(u){let f=s[u],m=s[u+1];f!==m?o.push(u,Yn.ttfGlyphLoader(r,u,Sc,t,i+f,Mc)):o.push(u,Yn.glyphLoader(r,u))},o}function jd(t,i,s,r,o){return o.lowMemory?$d(t,i,s,r):Zd(t,i,s,r)}var Tc={getPath:to,parse:jd},Jd=class{constructor(t){this.font=t}normalizeCoordTags(t){for(let i in t)if(i.length<4){let s=i.padEnd(4," ");t[s]===void 0&&(t[s]=t[i]),delete t[i]}}getNormalizedCoords(t){t||(t=this.font.variation.get());let i=[];this.normalizeCoordTags(t);for(let s=0;s<this.fvar().axes.length;s++){let r=this.fvar().axes[s],o=t[r.tag];o===void 0&&(o=r.defaultValue),o<r.defaultValue?i.push((o-r.defaultValue+Number.EPSILON)/(r.defaultValue-r.minValue+Number.EPSILON)):i.push((o-r.defaultValue+Number.EPSILON)/(r.maxValue-r.defaultValue+Number.EPSILON))}if(this.avar())for(let s=0;s<this.avar().axisSegmentMaps.length;s++){let r=this.avar().axisSegmentMaps[s];for(let o=0;o<r.axisValueMaps.length;o++){let u=r.axisValueMaps[o];if(o>=1&&i[s]<u.fromCoordinate){let f=r.axisValueMaps[o-1];i[s]=((i[s]-f.fromCoordinate)*(u.toCoordinate-f.toCoordinate)+Number.EPSILON)/(u.fromCoordinate-f.fromCoordinate+Number.EPSILON)+f.toCoordinate;break}}}return i}interpolatePoints(t,i,s){if(t.length===0)return;let r=0;for(;r<t.length;){let o=r,u=r,f=t[u];for(;!f.lastPointOfContour;)f=t[++u];for(;r<=u&&!s[r];)r++;if(r>u)continue;let m=r,g=r;for(r++;r<=u;)s[r]&&(this.deltaInterpolate(g+1,r-1,g,r,i,t),g=r),r++;g===m?this.deltaShift(o,u,g,i,t):(this.deltaInterpolate(g+1,u,g,m,i,t),m>0&&this.deltaInterpolate(o,m-1,g,m,i,t)),r=u+1}}deltaInterpolate(t,i,s,r,o,u){if(t>i)return;let f=["x","y"];for(let g=0;g<f.length;g++){let S=f[g];if(o[s][S]>o[r][S]){var m=s;s=r,r=m}let v=o[s][S],I=o[r][S],L=u[s][S],B=u[r][S];if(v!==I||L===B){let F=v===I?0:(B-L)/(I-v);for(let z=t;z<=i;z++){let ie=o[z][S];ie<=v?ie+=L-v:ie>=I?ie+=B-I:ie=L+(ie-v)*F,u[z][S]=ie}}}}deltaShift(t,i,s,r,o){let u=o[s].x-r[s].x,f=o[s].y-r[s].y;if(!(u===0&&f===0))for(let m=t;m<=i;m++)m!==s&&(o[m].x+=u,o[m].y+=f)}transformComponents(t,i,s,r,o,u){let f=0;for(let m=0;m<t.components.length;m++){let g=t.components[m],S=this.font.glyphs.get(g.glyphIndex),v=Nd(g),I=r.indexOf(m);I>-1&&(v.dx+=Math.round(o.deltas[I]*u),v.dy+=Math.round(o.deltasY[I]*u));let L=Lr(this.getTransform(S,s).points,v);i.splice(f,L.length,...L),f+=S.points.length}}applyTupleVariationStore(t,i,s,r="gvar",o={}){s||(s=this.font.variation.get());let u=this.getNormalizedCoords(s),{headers:f,sharedPoints:m}=t,g=this.fvar().axes.length,S;r==="gvar"?S=i.map(vc):r==="cvar"&&(S=[...i]);for(let v=0;v<f.length;v++){let I=f[v],L=1;for(let F=0;F<g;F++){let z=[0];switch(r){case"gvar":z=I.peakTuple?I.peakTuple:this.gvar().sharedTuples[I.sharedTupleRecordsIndex];break;case"cvar":z=I.peakTuple;break}if(z[F]!==0){if(u[F]===0){L=0;break}if(I.intermediateStartTuple)if(u[F]<I.intermediateStartTuple[F]||u[F]>I.intermediateEndTuple[F]){L=0;break}else u[F]<z[F]?L=L*(u[F]-I.intermediateStartTuple[F]+Number.EPSILON)/(z[F]-I.intermediateStartTuple[F]+Number.EPSILON):L=L*(I.intermediateEndTuple[F]-u[F]+Number.EPSILON)/(I.intermediateEndTuple[F]-z[F]+Number.EPSILON);else{if(u[F]<Math.min(0,z[F])||u[F]>Math.max(0,z[F])){L=0;break}L=(L*u[F]+Number.EPSILON)/(z[F]+Number.EPSILON)}}}if(L===0)continue;let B=I.privatePoints.length?I.privatePoints:m;if(r==="gvar"&&o.glyph&&o.glyph.isComposite)this.transformComponents(o.glyph,S,s,B,I,L);else if(B.length===0)for(let F=0;F<S.length;F++){let z=S[F];r==="gvar"?S[F]={x:Math.round(z.x+I.deltas[F]*L),y:Math.round(z.y+I.deltasY[F]*L),onCurve:z.onCurve,lastPointOfContour:z.lastPointOfContour}:r==="cvar"&&(S[F]=Math.round(z+I.deltas[F]*L))}else{let F;r==="gvar"?F=S.map(vc):r==="cvar"&&(F=S);let z=Array(i.length).fill(!1);for(let ie=0;ie<B.length;ie++){let ze=B[ie];if(ze<i.length){let Ne=F[ze];r==="gvar"?(z[ze]=!0,Ne.x+=I.deltas[ie]*L,Ne.y+=I.deltasY[ie]*L):r==="cvar"&&(S[ze]=Math.round(Ne+I.deltas[ie]*L))}}if(r==="gvar"){this.interpolatePoints(F,S,z);for(let ie=0;ie<i.length;ie++){let ze=F[ie].x-S[ie].x,Ne=F[ie].y-S[ie].y;S[ie].x=Math.round(S[ie].x+ze),S[ie].y=Math.round(S[ie].y+Ne)}}}}return S}getTransform(t,i){Number.isInteger(t)&&(t=this.font.glyphs.get(t));let s=t.getBlendPath,r=!!(t.points&&t.points.length),o=t;if(s||r){if(i||(i=this.font.variation.get()),r){let u=this.gvar()&&this.gvar().glyphVariations[t.index];if(u){let f=t.points,m=this.applyTupleVariationStore(u,f,i,"gvar",{glyph:t});o=new fs(Object.assign({},t,{points:m,path:to(m)}))}}else if(s){let u=t.getBlendPath(i);o=new fs(Object.assign({},t,{path:u}))}}return this.font.tables.hvar&&(t._advanceWidth=typeof t._advanceWidth<"u"?t._advanceWidth:t.advanceWidth,t.advanceWidth=o.advanceWidth=Math.round(t._advanceWidth+this.getVariableAdjustment(o.index,"hvar","advanceWidth",i)),t._leftSideBearing=typeof t._leftSideBearing<"u"?t._leftSideBearing:t.leftSideBearing,t.leftSideBearing=o.leftSideBearing=Math.round(t._leftSideBearing+this.getVariableAdjustment(o.index,"hvar","lsb",i))),o}getCvarTransform(t){let i=this.font.tables.cvt,s=this.cvar();return!i||!i.length||!s||!s.headers.length?i:this.applyTupleVariationStore(s,i,t,"cvar")}getVariableAdjustment(t,i,s,r){r=r||this.font.variation.get();let o,u,f=this.font.tables[i];if(!f)throw Error(`trying to get variation adjustment from non-existent table "${f}"`);if(!f.itemVariationStore)throw Error(`trying to get variation adjustment from table "${f}" which does not have an itemVariationStore`);let m=f[s]&&f[s].map.length;if(m){let g=t;g>=m&&(g=m-1),{outerIndex:o,innerIndex:u}=f[s].map[g]}else o=0,u=t;return this.getDelta(f.itemVariationStore,o,u,r)}getDelta(t,i,s,r){if(i>=t.itemVariationSubtables.length)return 0;let o=t.itemVariationSubtables[i];if(s>=o.deltaSets.length)return 0;let u=o.deltaSets[s],f=this.getBlendVector(t,i,r),m=0;for(let g=0;g<o.regionIndexes.length;g++)m+=u[g]*f[g];return m}getBlendVector(t,i,s){s||(s=this.font.variation.get());let r=t.itemVariationSubtables[i],o=this.getNormalizedCoords(s),u=[];for(let f=0;f<r.regionIndexes.length;f++){let m=1,g=r.regionIndexes[f],S=t.variationRegions[g].regionAxes;for(let v=0;v<S.length;v++){let I=S[v],L;I.startCoord>I.peakCoord||I.peakCoord>I.endCoord||I.startCoord<0&&I.endCoord>0&&I.peakCoord!==0||I.peakCoord===0?L=1:o[v]<I.startCoord||o[v]>I.endCoord?L=0:o[v]===I.peakCoord?L=1:o[v]<I.peakCoord?L=(o[v]-I.startCoord+Number.EPSILON)/(I.peakCoord-I.startCoord+Number.EPSILON):L=(I.endCoord-o[v]+Number.EPSILON)/(I.endCoord-I.peakCoord+Number.EPSILON),m*=L}u[f]=m}return u}avar(){return this.font.tables.avar}cvar(){return this.font.tables.cvar}fvar(){return this.font.tables.fvar}gvar(){return this.font.tables.gvar}hvar(){return this.font.tables.hvar}},Kd=class{constructor(t){this.font=t,this.process=new Jd(this.font),this.activateDefaultVariation(),this.getTransform=this.process.getTransform.bind(this.process)}activateDefaultVariation(){let t=this.getDefaultInstanceIndex();t>-1?this.set(t):this.set(this.getDefaultCoordinates())}getDefaultCoordinates(){return this.fvar().axes.reduce((t,i)=>(t[i.tag]=i.defaultValue,t),{})}getDefaultInstanceIndex(){let t=this.getDefaultCoordinates(),i=this.getInstanceIndex(t);return i<0&&(i=this.fvar().instances.findIndex(s=>s.name&&s.name.en==="Regular")),i}getInstanceIndex(t){return this.fvar().instances.findIndex(i=>Object.keys(t).every(s=>i.coordinates[s]===t[s]))}getInstance(t){return this.fvar().instances&&this.fvar().instances[t]}set(t){let i;if(Number.isInteger(t)){let s=this.getInstance(t);if(!s)throw Error(`Invalid instance index ${t}`);i={...s.coordinates}}else i=t,this.process.normalizeCoordTags(i);i=Object.assign({},this.font.defaultRenderOptions.variation,i),this.font.defaultRenderOptions=Object.assign({},this.font.defaultRenderOptions,{variation:i})}get(){return Object.assign({},this.font.defaultRenderOptions.variation)}avar(){return this.font.tables.avar}cvar(){return this.font.tables.cvar}fvar(){return this.font.tables.fvar}gvar(){return this.font.tables.gvar}hvar(){return this.font.tables.hvar}},Ec=1e6,Ir=64,Pr=1e4,wc,Yi,Ac,no;function Cc(t){this.font=t,this.getCommands=function(i){return Tc.getPath(i).commands},this._fpgmState=this._prepState=void 0,this._errorState=0}function Qd(t){return t}function Rc(t){return Math.sign(t)*Math.round(Math.abs(t))}function ep(t){return Math.sign(t)*Math.round(Math.abs(t*2))/2}function tp(t){return Math.sign(t)*(Math.round(Math.abs(t)+.5)-.5)}function np(t){return Math.sign(t)*Math.ceil(Math.abs(t))}function ip(t){return Math.sign(t)*Math.floor(Math.abs(t))}var Lc=function(t){let i=this.srPeriod,s=this.srPhase,r=this.srThreshold,o=1;return t<0&&(t=-t,o=-1),t+=r-s,t=Math.trunc(t/i)*i,t+=s,t<0?s*o:t*o},$n={x:1,y:0,axis:"x",distance:function(t,i,s,r){return(s?t.xo:t.x)-(r?i.xo:i.x)},interpolate:function(t,i,s,r){let o,u,f,m,g,S,v;if(!r||r===this){if(o=t.xo-i.xo,u=t.xo-s.xo,g=i.x-i.xo,S=s.x-s.xo,f=Math.abs(o),m=Math.abs(u),v=f+m,v===0){t.x=t.xo+(g+S)/2;return}t.x=t.xo+(g*m+S*f)/v;return}if(o=r.distance(t,i,!0,!0),u=r.distance(t,s,!0,!0),g=r.distance(i,i,!1,!0),S=r.distance(s,s,!1,!0),f=Math.abs(o),m=Math.abs(u),v=f+m,v===0){$n.setRelative(t,t,(g+S)/2,r,!0);return}$n.setRelative(t,t,(g*m+S*f)/v,r,!0)},normalSlope:Number.NEGATIVE_INFINITY,setRelative:function(t,i,s,r,o){if(!r||r===this){t.x=(o?i.xo:i.x)+s;return}let u=o?i.xo:i.x,f=o?i.yo:i.y,m=u+s*r.x,g=f+s*r.y;t.x=m+(t.y-g)/r.normalSlope},slope:0,touch:function(t){t.xTouched=!0},touched:function(t){return t.xTouched},untouch:function(t){t.xTouched=!1}},ti={x:0,y:1,axis:"y",distance:function(t,i,s,r){return(s?t.yo:t.y)-(r?i.yo:i.y)},interpolate:function(t,i,s,r){let o,u,f,m,g,S,v;if(!r||r===this){if(o=t.yo-i.yo,u=t.yo-s.yo,g=i.y-i.yo,S=s.y-s.yo,f=Math.abs(o),m=Math.abs(u),v=f+m,v===0){t.y=t.yo+(g+S)/2;return}t.y=t.yo+(g*m+S*f)/v;return}if(o=r.distance(t,i,!0,!0),u=r.distance(t,s,!0,!0),g=r.distance(i,i,!1,!0),S=r.distance(s,s,!1,!0),f=Math.abs(o),m=Math.abs(u),v=f+m,v===0){ti.setRelative(t,t,(g+S)/2,r,!0);return}ti.setRelative(t,t,(g*m+S*f)/v,r,!0)},normalSlope:0,setRelative:function(t,i,s,r,o){if(!r||r===this){t.y=(o?i.yo:i.y)+s;return}let u=o?i.xo:i.x,f=o?i.yo:i.y,m=u+s*r.x,g=f+s*r.y;t.y=g+r.normalSlope*(t.x-m)},slope:Number.POSITIVE_INFINITY,touch:function(t){t.yTouched=!0},touched:function(t){return t.yTouched},untouch:function(t){t.yTouched=!1}};Object.freeze($n),Object.freeze(ti);function nr(t,i){this.x=t,this.y=i,this.axis=void 0,this.slope=i/t,this.normalSlope=-t/i,Object.freeze(this)}nr.prototype.distance=function(t,i,s,r){return this.x*$n.distance(t,i,s,r)+this.y*ti.distance(t,i,s,r)},nr.prototype.interpolate=function(t,i,s,r){let o,u,f,m,g,S,v;if(f=r.distance(t,i,!0,!0),m=r.distance(t,s,!0,!0),o=r.distance(i,i,!1,!0),u=r.distance(s,s,!1,!0),g=Math.abs(f),S=Math.abs(m),v=g+S,v===0){this.setRelative(t,t,(o+u)/2,r,!0);return}this.setRelative(t,t,(o*S+u*g)/v,r,!0)},nr.prototype.setRelative=function(t,i,s,r,o){r=r||this;let u=o?i.xo:i.x,f=o?i.yo:i.y,m=u+s*r.x,g=f+s*r.y,S=r.normalSlope,v=this.slope,I=t.x,L=t.y;t.x=(v*I-S*m+g-L)/(v-S),t.y=v*(t.x-I)+L},nr.prototype.touch=function(t){t.xTouched=!0,t.yTouched=!0};function ir(t,i){let s=Math.sqrt(t*t+i*i);return t/=s,i/=s,t===1&&i===0?$n:t===0&&i===1?ti:new nr(t,i)}function ni(t,i,s,r){this.x=this.xo=Math.round(t*64)/64,this.y=this.yo=Math.round(i*64)/64,this.lastPointOfContour=s,this.onCurve=r,this.prevPointOnContour=void 0,this.nextPointOnContour=void 0,this.xTouched=!1,this.yTouched=!1,Object.preventExtensions(this)}ni.prototype.nextTouched=function(t){let i=this.nextPointOnContour;for(;!t.touched(i)&&i!==this;)i=i.nextPointOnContour;return i},ni.prototype.prevTouched=function(t){let i=this.prevPointOnContour;for(;!t.touched(i)&&i!==this;)i=i.prevPointOnContour;return i};var sr=Object.freeze(new ni(0,0)),sp={cvCutIn:17/16,deltaBase:9,deltaShift:.125,loop:1,minDis:1,autoFlip:!0};function bi(t,i){switch(this.env=t,this.stack=[],this.prog=i,t){case"glyf":this.zp0=this.zp1=this.zp2=1,this.rp0=this.rp1=this.rp2=0;case"prep":this.fv=this.pv=this.dpv=$n,this.round=Rc}}Cc.prototype.exec=function(t,i){if(typeof i!="number")throw new Error("Point size is not a number!");if(this._errorState>2)return;let s=this.font,r=this._prepState;if(!r||r.ppem!==i){let o=this._fpgmState;if(!o){bi.prototype=sp,o=this._fpgmState=new bi("fpgm",s.tables.fpgm),o.funcs=[],o.font=s,o.instructionCount=0,o.callDepth=0;try{Yi(o)}catch(f){console.log("Hinting error in FPGM:"+f),this._errorState=3;return}}bi.prototype=o,r=this._prepState=new bi("prep",s.tables.prep),r.ppem=i,r.instructionCount=0,r.callDepth=0;let u=s.variation&&s.variation.process.getCvarTransform()||s.tables.cvt;if(u){let f=r.cvt=new Array(u.length),m=i/s.unitsPerEm;for(let g=0;g<u.length;g++)f[g]=u[g]*m}else r.cvt=[];try{Yi(r)}catch(f){this._errorState<2&&console.log("Hinting error in PREP:"+f),this._errorState=2}}if(!(this._errorState>1))try{return Ac(t,r)}catch(o){this._errorState<1&&(console.log("Hinting error:"+o),console.log("Note: further hinting errors are silenced")),this._errorState=1;return}},Ac=function(t,i){let s=i.ppem/i.font.unitsPerEm,r=s,o=t.components,u,f,m;if(bi.prototype=i,!o)m=new bi("glyf",t.instructions),m.instructionCount=0,m.callDepth=0,no(t,m,s,r),f=m.gZone;else{let g=i.font;f=[],u=[];for(let S=0;S<o.length;S++){let v=o[S],I=g.glyphs.get(v.glyphIndex);m=new bi("glyf",I.instructions),m.instructionCount=0,m.callDepth=0,no(I,m,s,r);let L=Math.round(v.dx*s),B=Math.round(v.dy*r),F=m.gZone,z=m.contours;for(let ze=0;ze<F.length;ze++){let Ne=F[ze];Ne.xTouched=Ne.yTouched=!1,Ne.xo=Ne.x=Ne.x+L,Ne.yo=Ne.y=Ne.y+B}let ie=f.length;f.push.apply(f,F);for(let ze=0;ze<z.length;ze++)u.push(z[ze]+ie)}t.instructions&&!m.inhibitGridFit&&(m=new bi("glyf",t.instructions),m.gZone=m.z0=m.z1=m.z2=f,m.contours=u,f.push(new ni(0,0),new ni(Math.round(t.advanceWidth*s),0)),Yi(m),f.length-=2)}return f},no=function(t,i,s,r){let o=t.points||[],u=o.length,f=i.gZone=i.z0=i.z1=i.z2=[],m=i.contours=[],g;for(let I=0;I<u;I++)g=o[I],f[I]=new ni(g.x*s,g.y*r,g.lastPointOfContour,g.onCurve);let S,v;for(let I=0;I<u;I++)g=f[I],S||(S=g,m.push(I)),g.lastPointOfContour?(g.nextPointOnContour=S,S.prevPointOnContour=g,S=void 0):(v=f[I+1],g.nextPointOnContour=v,v.prevPointOnContour=g);i.inhibitGridFit||(f.push(new ni(0,0),new ni(Math.round(t.advanceWidth*s),0)),Yi(i),f.length-=2)},Yi=function(t){let i=t.prog;if(!i)return;let s=i.length,r;for(t.ip=0;t.ip<s;t.ip++){if(++t.instructionCount>Ec)throw new Error("Hinting instructions exceeded maximum of "+Ec);if(r=wc[i[t.ip]],!r)throw new Error("unknown instruction: 0x"+Number(i[t.ip]).toString(16));r(t)}};function Ur(t){let i=t.tZone=new Array(t.gZone.length);for(let s=0;s<i.length;s++)i[s]=new ni(0,0)}function Ic(t,i){let s=t.prog,r=t.ip,o=1,u;do if(u=s[++r],u===88)o++;else if(u===89)o--;else if(u===64)r+=s[r+1]+1;else if(u===65)r+=2*s[r+1]+1;else if(u>=176&&u<=183)r+=u-176+1;else if(u>=184&&u<=191)r+=(u-184+1)*2;else if(i&&o===1&&u===27)break;while(o>0);t.ip=r}function Pc(t,i){i.fv=i.pv=i.dpv=t}function Uc(t,i){i.pv=i.dpv=t}function Dc(t,i){i.fv=t}function Oc(t,i){let s=i.stack,r=s.pop(),o=s.pop(),u=i.z2[r],f=i.z1[o],m,g;t?(m=u.y-f.y,g=f.x-u.x):(m=f.x-u.x,g=f.y-u.y),i.pv=i.dpv=ir(m,g)}function Nc(t,i){let s=i.stack,r=s.pop(),o=s.pop(),u=i.z2[r],f=i.z1[o],m,g;t?(m=u.y-f.y,g=f.x-u.x):(m=f.x-u.x,g=f.y-u.y),i.fv=ir(m,g)}function rp(t){let i=t.stack,s=i.pop(),r=i.pop();t.pv=t.dpv=ir(r,s)}function ap(t){let i=t.stack,s=i.pop(),r=i.pop();t.fv=ir(r,s)}function op(t){let i=t.stack,s=t.pv;i.push(s.x*16384),i.push(s.y*16384)}function lp(t){let i=t.stack,s=t.fv;i.push(s.x*16384),i.push(s.y*16384)}function cp(t){t.fv=t.pv}function up(t){let i=t.stack,s=i.pop(),r=i.pop(),o=i.pop(),u=i.pop(),f=i.pop(),m=t.z0,g=t.z1,S=m[s],v=m[r],I=g[o],L=g[u],B=t.z2[f],F=S.x,z=S.y,ie=v.x,ze=v.y,Ne=I.x,Xe=I.y,ct=L.x,xt=L.y,Et=(F-ie)*(Xe-xt)-(z-ze)*(Ne-ct),wt=F*ze-z*ie,Vt=Ne*xt-Xe*ct;B.x=(wt*(Ne-ct)-Vt*(F-ie))/Et,B.y=(wt*(Xe-xt)-Vt*(z-ze))/Et}function hp(t){t.rp0=t.stack.pop()}function fp(t){t.rp1=t.stack.pop()}function dp(t){t.rp2=t.stack.pop()}function pp(t){let i=t.stack.pop();switch(t.zp0=i,i){case 0:t.tZone||Ur(t),t.z0=t.tZone;break;case 1:t.z0=t.gZone;break;default:throw new Error("Invalid zone pointer")}}function mp(t){let i=t.stack.pop();switch(t.zp1=i,i){case 0:t.tZone||Ur(t),t.z1=t.tZone;break;case 1:t.z1=t.gZone;break;default:throw new Error("Invalid zone pointer")}}function gp(t){let i=t.stack.pop();switch(t.zp2=i,i){case 0:t.tZone||Ur(t),t.z2=t.tZone;break;case 1:t.z2=t.gZone;break;default:throw new Error("Invalid zone pointer")}}function yp(t){let i=t.stack.pop();switch(t.zp0=t.zp1=t.zp2=i,i){case 0:t.tZone||Ur(t),t.z0=t.z1=t.z2=t.tZone;break;case 1:t.z0=t.z1=t.z2=t.gZone;break;default:throw new Error("Invalid zone pointer")}}function xp(t){t.loop=t.stack.pop(),t.loop>Pr&&(t.loop=Pr)}function vp(t){t.round=Rc}function _p(t){t.round=tp}function bp(t){let i=t.stack.pop();t.minDis=i/64}function Sp(t){Ic(t,!1)}function Mp(t){let i=t.stack.pop();t.ip+=i-1}function Tp(t){let i=t.stack.pop();t.cvCutIn=i/64}function Ep(t){let i=t.stack;i.push(i[i.length-1])}function io(t){t.stack.pop()}function wp(t){t.stack.length=0}function Ap(t){let i=t.stack,s=i.pop(),r=i.pop();i.push(s),i.push(r)}function Cp(t){let i=t.stack;i.push(i.length)}function Rp(t){let i=t.stack,s=i.pop(),r=i.pop();if(r>Pr&&(r=Pr),++t.callDepth>Ir)throw new Error("Hinting call depth exceeded maximum of "+Ir);let o=t.ip,u=t.prog;t.prog=t.funcs[s];for(let f=0;f<r;f++)Yi(t);t.ip=o,t.prog=u,t.callDepth--}function Lp(t){let i=t.stack.pop();if(++t.callDepth>Ir)throw new Error("Hinting call depth exceeded maximum of "+Ir);let s=t.ip,r=t.prog;t.prog=t.funcs[i],Yi(t),t.ip=s,t.prog=r,t.callDepth--}function Ip(t){let i=t.stack,s=i.pop();i.push(i[i.length-s])}function Pp(t){let i=t.stack,s=i.pop();i.push(i.splice(i.length-s,1)[0])}function Up(t){if(t.env!=="fpgm")throw new Error("FDEF not allowed here");let i=t.stack,s=t.prog,r=t.ip,o=i.pop(),u=r;for(;s[++r]!==45;);t.ip=r,t.funcs[o]=s.slice(u+1,r)}function Fc(t,i){let s=i.stack.pop(),r=i.z0[s],o=i.fv,u=i.pv,f=u.distance(r,sr);t&&(f=i.round(f)),o.setRelative(r,sr,f,u),o.touch(r),i.rp0=i.rp1=s}function kc(t,i){let s=i.z2,r=s.length-2,o,u,f;for(let m=0;m<r;m++)o=s[m],!t.touched(o)&&(u=o.prevTouched(t),u!==o&&(f=o.nextTouched(t),u===f&&t.setRelative(o,o,t.distance(u,u,!1,!0),t,!0),t.interpolate(o,u,f,t)))}function Bc(t,i){let s=i.stack,r=t?i.rp1:i.rp2,o=(t?i.z0:i.z1)[r],u=i.fv,f=i.pv,m=i.loop,g=i.z2;for(;m--;){let S=s.pop(),v=g[S],I=f.distance(o,o,!1,!0);u.setRelative(v,v,I,f),u.touch(v)}i.loop=1}function zc(t,i){let s=i.stack,r=t?i.rp1:i.rp2,o=(t?i.z0:i.z1)[r],u=i.fv,f=i.pv,m=s.pop(),g=i.z2[i.contours[m]],S=g,v=f.distance(o,o,!1,!0);do S!==o&&u.setRelative(S,S,v,f),S=S.nextPointOnContour;while(S!==g)}function Vc(t,i){let s=i.stack,r=t?i.rp1:i.rp2,o=(t?i.z0:i.z1)[r],u=i.fv,f=i.pv,m=s.pop(),g;switch(m){case 0:g=i.tZone;break;case 1:g=i.gZone;break;default:throw new Error("Invalid zone")}let S,v=f.distance(o,o,!1,!0),I=g.length-2;for(let L=0;L<I;L++)S=g[L],u.setRelative(S,S,v,f)}function Dp(t){let i=t.stack,s=t.loop,r=t.fv,o=i.pop()/64,u=t.z2;for(;s--;){let f=i.pop(),m=u[f];r.setRelative(m,m,o),r.touch(m)}t.loop=1}function Op(t){let i=t.stack,s=t.rp1,r=t.rp2,o=t.loop,u=t.z0[s],f=t.z1[r],m=t.fv,g=t.dpv,S=t.z2;for(;o--;){let v=i.pop(),I=S[v];m.interpolate(I,u,f,g),m.touch(I)}t.loop=1}function Gc(t,i){let s=i.stack,r=s.pop()/64,o=s.pop(),u=i.z1[o],f=i.z0[i.rp0],m=i.fv,g=i.pv;m.setRelative(u,f,r,g),m.touch(u),i.rp1=i.rp0,i.rp2=o,t&&(i.rp0=o)}function Np(t){let i=t.stack,s=t.rp0,r=t.z0[s],o=t.loop,u=t.fv,f=t.pv,m=t.z1;for(;o--;){let g=i.pop(),S=m[g];u.setRelative(S,r,0,f),u.touch(S)}t.loop=1}function Fp(t){t.round=ep}function Hc(t,i){let s=i.stack,r=s.pop(),o=s.pop(),u=i.z0[o],f=i.fv,m=i.pv,g=i.cvt[r],S=m.distance(u,sr);t&&(Math.abs(S-g)<i.cvCutIn&&(S=g),S=i.round(S)),f.setRelative(u,sr,S,m),i.zp0===0&&(u.xo=u.x,u.yo=u.y),f.touch(u),i.rp0=i.rp1=o}function kp(t){let i=t.prog,s=t.ip,r=t.stack,o=i[++s];for(let u=0;u<o;u++)r.push(i[++s]);t.ip=s}function Bp(t){let i=t.ip,s=t.prog,r=t.stack,o=s[++i];for(let u=0;u<o;u++){let f=s[++i]<<8|s[++i];f&32768&&(f=-((f^65535)+1)),r.push(f)}t.ip=i}function zp(t){let i=t.stack,s=t.store;s||(s=t.store=[]);let r=i.pop(),o=i.pop();s[o]=r}function Vp(t){let i=t.stack,s=t.store,r=i.pop(),o=s&&s[r]||0;i.push(o)}function Gp(t){let i=t.stack,s=i.pop(),r=i.pop();t.cvt[r]=s/64}function Hp(t){let i=t.stack,s=i.pop();i.push(t.cvt[s]*64)}function Wc(t,i){let s=i.stack,r=s.pop(),o=i.z2[r];s.push(i.dpv.distance(o,sr,t,!1)*64)}function Xc(t,i){let s=i.stack,r=s.pop(),o=s.pop(),u=i.z1[r],f=i.z0[o],m=i.dpv.distance(f,u,t,t);i.stack.push(Math.round(m*64))}function Wp(t){t.stack.push(t.ppem)}function Xp(t){t.autoFlip=!0}function qp(t){let i=t.stack,s=i.pop(),r=i.pop();i.push(r<s?1:0)}function Yp(t){let i=t.stack,s=i.pop(),r=i.pop();i.push(r<=s?1:0)}function Zp(t){let i=t.stack,s=i.pop(),r=i.pop();i.push(r>s?1:0)}function $p(t){let i=t.stack,s=i.pop(),r=i.pop();i.push(r>=s?1:0)}function jp(t){let i=t.stack,s=i.pop(),r=i.pop();i.push(s===r?1:0)}function Jp(t){let i=t.stack,s=i.pop(),r=i.pop();i.push(s!==r?1:0)}function Kp(t){let i=t.stack,s=i.pop();i.push(Math.trunc(s)&1?1:0)}function Qp(t){let i=t.stack,s=i.pop();i.push(Math.trunc(s)&1?0:1)}function em(t){let i=t.stack.pop(),s;i||Ic(t,!0)}function tm(t){}function nm(t){let i=t.stack,s=i.pop(),r=i.pop();i.push(s&&r?1:0)}function im(t){let i=t.stack,s=i.pop(),r=i.pop();i.push(s||r?1:0)}function sm(t){let i=t.stack,s=i.pop();i.push(s?0:1)}function so(t,i){let s=i.stack,r=s.pop(),o=i.fv,u=i.pv,f=i.ppem,m=i.deltaBase+(t-1)*16,g=i.deltaShift,S=i.z0;for(let v=0;v<r;v++){let I=s.pop(),L=s.pop();if(m+((L&240)>>4)!==f)continue;let F=(L&15)-8;F>=0&&F++;let z=S[I];o.setRelative(z,z,F*g,u)}}function rm(t){let s=t.stack.pop();t.deltaBase=s}function am(t){let s=t.stack.pop();t.deltaShift=Math.pow(.5,s)}function om(t){let i=t.stack,s=i.pop(),r=i.pop();i.push(r+s)}function lm(t){let i=t.stack,s=i.pop(),r=i.pop();i.push(r-s)}function cm(t){let i=t.stack,s=i.pop(),r=i.pop();i.push(r*64/s)}function um(t){let i=t.stack,s=i.pop(),r=i.pop();i.push(r*s/64)}function hm(t){let i=t.stack,s=i.pop();i.push(Math.abs(s))}function fm(t){let i=t.stack,s=i.pop();i.push(-s)}function dm(t){let i=t.stack,s=i.pop();i.push(Math.floor(s/64)*64)}function pm(t){let i=t.stack,s=i.pop();i.push(Math.ceil(s/64)*64)}function Dr(t,i){let s=i.stack,r=s.pop();s.push(i.round(r/64)*64)}function mm(t){let i=t.stack,s=i.pop(),r=i.pop();t.cvt[r]=s*t.ppem/t.font.unitsPerEm}function ro(t,i){let s=i.stack,r=s.pop(),o=i.ppem,u=i.deltaBase+(t-1)*16,f=i.deltaShift;for(let m=0;m<r;m++){let g=s.pop(),S=s.pop();if(u+((S&240)>>4)!==o)continue;let I=(S&15)-8;I>=0&&I++;let L=I*f;i.cvt[g]+=L}}function gm(t){let i=t.stack.pop();t.round=Lc;let s;switch(i&192){case 0:s=.5;break;case 64:s=1;break;case 128:s=2;break;default:throw new Error("invalid SROUND value")}switch(t.srPeriod=s,i&48){case 0:t.srPhase=0;break;case 16:t.srPhase=.25*s;break;case 32:t.srPhase=.5*s;break;case 48:t.srPhase=.75*s;break;default:throw new Error("invalid SROUND value")}i&=15,i===0?t.srThreshold=0:t.srThreshold=(i/8-.5)*s}function ym(t){let i=t.stack.pop();t.round=Lc;let s;switch(i&192){case 0:s=Math.sqrt(2)/2;break;case 64:s=Math.sqrt(2);break;case 128:s=2*Math.sqrt(2);break;default:throw new Error("invalid S45ROUND value")}switch(t.srPeriod=s,i&48){case 0:t.srPhase=0;break;case 16:t.srPhase=.25*s;break;case 32:t.srPhase=.5*s;break;case 48:t.srPhase=.75*s;break;default:throw new Error("invalid S45ROUND value")}i&=15,i===0?t.srThreshold=0:t.srThreshold=(i/8-.5)*s}function xm(t){t.round=Qd}function vm(t){t.round=np}function _m(t){t.round=ip}function bm(t){let i=t.stack.pop()}function qc(t,i){let s=i.stack,r=s.pop(),o=s.pop(),u=i.z2[r],f=i.z1[o],m,g;t?(m=u.y-f.y,g=f.x-u.x):(m=f.x-u.x,g=f.y-u.y),i.dpv=ir(m,g)}function Sm(t){let i=t.stack,s=i.pop(),r=0;s&1&&(r=35),s&32&&(r|=4096),i.push(r)}function Mm(t){let i=t.stack,s=i.pop(),r=i.pop(),o=i.pop();i.push(r),i.push(s),i.push(o)}function Tm(t){let i=t.stack,s=i.pop(),r=i.pop();i.push(Math.max(r,s))}function Em(t){let i=t.stack,s=i.pop(),r=i.pop();i.push(Math.min(r,s))}function wm(t){let i=t.stack.pop()}function Am(t){let i=t.stack.pop(),s=t.stack.pop();switch(i){case 1:t.inhibitGridFit=!!s;return;case 2:t.ignoreCvt=!!s;return;default:throw new Error("invalid INSTCTRL[] selector")}}function Si(t,i){let s=i.stack,r=i.prog,o=i.ip;for(let u=0;u<t;u++)s.push(r[++o]);i.ip=o}function Mi(t,i){let s=i.ip,r=i.prog,o=i.stack;for(let u=0;u<t;u++){let f=r[++s]<<8|r[++s];f&32768&&(f=-((f^65535)+1)),o.push(f)}i.ip=s}function Fe(t,i,s,r,o,u){let f=u.stack,m=t&&f.pop(),g=f.pop(),S=u.rp0,v=u.z0[S],I=u.z1[g],L=u.minDis,B=u.fv,F=u.dpv,z,ie,ze,Ne;ie=z=F.distance(I,v,!0,!0),ze=ie>=0?1:-1,ie=Math.abs(ie),t&&(Ne=u.cvt[m],r&&Math.abs(ie-Ne)<u.cvCutIn&&(ie=Ne)),s&&ie<L&&(ie=L),r&&(ie=u.round(ie)),B.setRelative(I,v,ze*ie,F),B.touch(I),u.rp1=u.rp0,u.rp2=g,i&&(u.rp0=g)}wc=[Pc.bind(void 0,ti),Pc.bind(void 0,$n),Uc.bind(void 0,ti),Uc.bind(void 0,$n),Dc.bind(void 0,ti),Dc.bind(void 0,$n),Oc.bind(void 0,0),Oc.bind(void 0,1),Nc.bind(void 0,0),Nc.bind(void 0,1),rp,ap,op,lp,cp,up,hp,fp,dp,pp,mp,gp,yp,xp,vp,_p,bp,Sp,Mp,Tp,void 0,void 0,Ep,io,wp,Ap,Cp,Ip,Pp,void 0,void 0,void 0,Rp,Lp,Up,void 0,Fc.bind(void 0,0),Fc.bind(void 0,1),kc.bind(void 0,ti),kc.bind(void 0,$n),Bc.bind(void 0,0),Bc.bind(void 0,1),zc.bind(void 0,0),zc.bind(void 0,1),Vc.bind(void 0,0),Vc.bind(void 0,1),Dp,Op,Gc.bind(void 0,0),Gc.bind(void 0,1),Np,Fp,Hc.bind(void 0,0),Hc.bind(void 0,1),kp,Bp,zp,Vp,Gp,Hp,Wc.bind(void 0,0),Wc.bind(void 0,1),void 0,Xc.bind(void 0,0),Xc.bind(void 0,1),Wp,void 0,Xp,void 0,void 0,qp,Yp,Zp,$p,jp,Jp,Kp,Qp,em,tm,nm,im,sm,so.bind(void 0,1),rm,am,om,lm,cm,um,hm,fm,dm,pm,Dr.bind(void 0,0),Dr.bind(void 0,1),Dr.bind(void 0,2),Dr.bind(void 0,3),void 0,void 0,void 0,void 0,mm,so.bind(void 0,2),so.bind(void 0,3),ro.bind(void 0,1),ro.bind(void 0,2),ro.bind(void 0,3),gm,ym,void 0,void 0,xm,void 0,vm,_m,io,io,void 0,void 0,void 0,void 0,void 0,bm,qc.bind(void 0,0),qc.bind(void 0,1),Sm,void 0,Mm,Tm,Em,wm,Am,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,Si.bind(void 0,1),Si.bind(void 0,2),Si.bind(void 0,3),Si.bind(void 0,4),Si.bind(void 0,5),Si.bind(void 0,6),Si.bind(void 0,7),Si.bind(void 0,8),Mi.bind(void 0,1),Mi.bind(void 0,2),Mi.bind(void 0,3),Mi.bind(void 0,4),Mi.bind(void 0,5),Mi.bind(void 0,6),Mi.bind(void 0,7),Mi.bind(void 0,8),Fe.bind(void 0,0,0,0,0,0),Fe.bind(void 0,0,0,0,0,1),Fe.bind(void 0,0,0,0,0,2),Fe.bind(void 0,0,0,0,0,3),Fe.bind(void 0,0,0,0,1,0),Fe.bind(void 0,0,0,0,1,1),Fe.bind(void 0,0,0,0,1,2),Fe.bind(void 0,0,0,0,1,3),Fe.bind(void 0,0,0,1,0,0),Fe.bind(void 0,0,0,1,0,1),Fe.bind(void 0,0,0,1,0,2),Fe.bind(void 0,0,0,1,0,3),Fe.bind(void 0,0,0,1,1,0),Fe.bind(void 0,0,0,1,1,1),Fe.bind(void 0,0,0,1,1,2),Fe.bind(void 0,0,0,1,1,3),Fe.bind(void 0,0,1,0,0,0),Fe.bind(void 0,0,1,0,0,1),Fe.bind(void 0,0,1,0,0,2),Fe.bind(void 0,0,1,0,0,3),Fe.bind(void 0,0,1,0,1,0),Fe.bind(void 0,0,1,0,1,1),Fe.bind(void 0,0,1,0,1,2),Fe.bind(void 0,0,1,0,1,3),Fe.bind(void 0,0,1,1,0,0),Fe.bind(void 0,0,1,1,0,1),Fe.bind(void 0,0,1,1,0,2),Fe.bind(void 0,0,1,1,0,3),Fe.bind(void 0,0,1,1,1,0),Fe.bind(void 0,0,1,1,1,1),Fe.bind(void 0,0,1,1,1,2),Fe.bind(void 0,0,1,1,1,3),Fe.bind(void 0,1,0,0,0,0),Fe.bind(void 0,1,0,0,0,1),Fe.bind(void 0,1,0,0,0,2),Fe.bind(void 0,1,0,0,0,3),Fe.bind(void 0,1,0,0,1,0),Fe.bind(void 0,1,0,0,1,1),Fe.bind(void 0,1,0,0,1,2),Fe.bind(void 0,1,0,0,1,3),Fe.bind(void 0,1,0,1,0,0),Fe.bind(void 0,1,0,1,0,1),Fe.bind(void 0,1,0,1,0,2),Fe.bind(void 0,1,0,1,0,3),Fe.bind(void 0,1,0,1,1,0),Fe.bind(void 0,1,0,1,1,1),Fe.bind(void 0,1,0,1,1,2),Fe.bind(void 0,1,0,1,1,3),Fe.bind(void 0,1,1,0,0,0),Fe.bind(void 0,1,1,0,0,1),Fe.bind(void 0,1,1,0,0,2),Fe.bind(void 0,1,1,0,0,3),Fe.bind(void 0,1,1,0,1,0),Fe.bind(void 0,1,1,0,1,1),Fe.bind(void 0,1,1,0,1,2),Fe.bind(void 0,1,1,0,1,3),Fe.bind(void 0,1,1,1,0,0),Fe.bind(void 0,1,1,1,0,1),Fe.bind(void 0,1,1,1,0,2),Fe.bind(void 0,1,1,1,0,3),Fe.bind(void 0,1,1,1,1,0),Fe.bind(void 0,1,1,1,1,1),Fe.bind(void 0,1,1,1,1,2),Fe.bind(void 0,1,1,1,1,3)];var Cm=Cc;function ms(t){this.char=t,this.state={},this.activeState=null}function ao(t,i,s){this.contextName=s,this.startIndex=t,this.endOffset=i}function Rm(t,i,s){this.contextName=t,this.openRange=null,this.ranges=[],this.checkStart=i,this.checkEnd=s}function an(t,i){this.context=t,this.index=i,this.length=t.length,this.current=t[i],this.backtrack=t.slice(0,i),this.lookahead=t.slice(i+1)}function Or(t){this.eventId=t,this.subscribers=[]}function Lm(t){let i=["start","end","next","newToken","contextStart","contextEnd","insertToken","removeToken","removeRange","replaceToken","replaceRange","composeRUD","updateContextsRanges"];for(let r=0;r<i.length;r++){let o=i[r];Object.defineProperty(this.events,o,{value:new Or(o)})}if(t)for(let r=0;r<i.length;r++){let o=i[r],u=t[o];typeof u=="function"&&this.events[o].subscribe(u)}let s=["insertToken","removeToken","removeRange","replaceToken","replaceRange","composeRUD"];for(let r=0;r<s.length;r++){let o=s[r];this.events[o].subscribe(this.updateContextsRanges)}}function kt(t){this.tokens=[],this.registeredContexts={},this.contextCheckers=[],this.events={},this.registeredModifiers=[],Lm.call(this,t)}ms.prototype.setState=function(t,i){return this.state[t]=i,this.activeState={key:t,value:this.state[t]},this.activeState},ms.prototype.getState=function(t){return this.state[t]||null},kt.prototype.inboundIndex=function(t){return t>=0&&t<this.tokens.length},kt.prototype.composeRUD=function(t){let s=t.map(o=>this[o[0]].apply(this,o.slice(1).concat(!0))),r=o=>typeof o=="object"&&Object.prototype.hasOwnProperty.call(o,"FAIL");if(s.every(r))return{FAIL:"composeRUD: one or more operations hasn't completed successfully",report:s.filter(r)};this.dispatch("composeRUD",[s.filter(o=>!r(o))])},kt.prototype.replaceRange=function(t,i,s,r){i=i!==null?i:this.tokens.length;let o=s.every(u=>u instanceof ms);if(!isNaN(t)&&this.inboundIndex(t)&&o){let u=this.tokens.splice.apply(this.tokens,[t,i].concat(s));return r||this.dispatch("replaceToken",[t,i,s]),[u,s]}else return{FAIL:"replaceRange: invalid tokens or startIndex."}},kt.prototype.replaceToken=function(t,i,s){if(!isNaN(t)&&this.inboundIndex(t)&&i instanceof ms){let r=this.tokens.splice(t,1,i);return s||this.dispatch("replaceToken",[t,i]),[r[0],i]}else return{FAIL:"replaceToken: invalid token or index."}},kt.prototype.removeRange=function(t,i,s){i=isNaN(i)?this.tokens.length:i;let r=this.tokens.splice(t,i);return s||this.dispatch("removeRange",[r,t,i]),r},kt.prototype.removeToken=function(t,i){if(!isNaN(t)&&this.inboundIndex(t)){let s=this.tokens.splice(t,1);return i||this.dispatch("removeToken",[s,t]),s}else return{FAIL:"removeToken: invalid token index."}},kt.prototype.insertToken=function(t,i,s){return t.every(o=>o instanceof ms)?(this.tokens.splice.apply(this.tokens,[i,0].concat(t)),s||this.dispatch("insertToken",[t,i]),t):{FAIL:"insertToken: invalid token(s)."}},kt.prototype.registerModifier=function(t,i,s){this.events.newToken.subscribe(function(r,o){let u=[r,o],f=i===null||i.apply(this,u)===!0,m=[r,o];if(f){let g=s.apply(this,m);r.setState(t,g)}}),this.registeredModifiers.push(t)},Or.prototype.subscribe=function(t){return typeof t=="function"?this.subscribers.push(t)-1:{FAIL:`invalid '${this.eventId}' event handler`}},Or.prototype.unsubscribe=function(t){this.subscribers.splice(t,1)},an.prototype.setCurrentIndex=function(t){this.index=t,this.current=this.context[t],this.backtrack=this.context.slice(0,t),this.lookahead=this.context.slice(t+1)},an.prototype.get=function(t){switch(!0){case t===0:return this.current;case(t<0&&Math.abs(t)<=this.backtrack.length):return this.backtrack.slice(t)[0];case(t>0&&t<=this.lookahead.length):return this.lookahead[t-1];default:return null}},kt.prototype.rangeToText=function(t){if(t instanceof ao)return this.getRangeTokens(t).map(i=>i.char).join("")},kt.prototype.getText=function(){return this.tokens.map(t=>t.char).join("")},kt.prototype.getContext=function(t){let i=this.registeredContexts[t];return i||null},kt.prototype.on=function(t,i){let s=this.events[t];return s?s.subscribe(i):null},kt.prototype.dispatch=function(t,i){let s=this.events[t];if(s instanceof Or)for(let r=0;r<s.subscribers.length;r++)s.subscribers[r].apply(this,i||[])},kt.prototype.registerContextChecker=function(t,i,s){if(this.getContext(t))return{FAIL:`context name '${t}' is already registered.`};if(typeof i!="function")return{FAIL:"missing context start check."};if(typeof s!="function")return{FAIL:"missing context end check."};let r=new Rm(t,i,s);return this.registeredContexts[t]=r,this.contextCheckers.push(r),r},kt.prototype.getRangeTokens=function(t){let i=t.startIndex+t.endOffset;return[].concat(this.tokens.slice(t.startIndex,i))},kt.prototype.getContextRanges=function(t){let i=this.getContext(t);return i?i.ranges:{FAIL:`context checker '${t}' is not registered.`}},kt.prototype.resetContextsRanges=function(){let t=this.registeredContexts;for(let i in t)if(Object.prototype.hasOwnProperty.call(t,i)){let s=t[i];s.ranges=[]}},kt.prototype.updateContextsRanges=function(){this.resetContextsRanges();let t=this.tokens.map(i=>i.char);for(let i=0;i<t.length;i++){let s=new an(t,i);this.runContextCheck(s)}this.dispatch("updateContextsRanges",[this.registeredContexts])},kt.prototype.setEndOffset=function(t,i){let s=this.getContext(i).openRange.startIndex,r=new ao(s,t,i),o=this.getContext(i).ranges;return r.rangeId=`${i}.${o.length}`,o.push(r),this.getContext(i).openRange=null,r},kt.prototype.runContextCheck=function(t){let i=t.index;for(let s=0;s<this.contextCheckers.length;s++){let r=this.contextCheckers[s],o=r.contextName,u=this.getContext(o).openRange;if(!u&&r.checkStart(t)&&(u=new ao(i,null,o),this.getContext(o).openRange=u,this.dispatch("contextStart",[o,i])),u&&r.checkEnd(t)){let f=i-u.startIndex+1,m=this.setEndOffset(f,o);this.dispatch("contextEnd",[o,m])}}},kt.prototype.tokenize=function(t){this.tokens=[],this.resetContextsRanges();let i=Array.from(t);this.dispatch("start");for(let s=0;s<i.length;s++){let r=i[s],o=new an(i,s);this.dispatch("next",[o]),this.runContextCheck(o);let u=new ms(r);this.tokens.push(u),this.dispatch("newToken",[u,o])}return this.dispatch("end",[this.tokens]),this.tokens};var Im=kt;function Ti(t){return/[\u0600-\u065F\u066A-\u06D2\u06FA-\u06FF]/.test(t)}function Yc(t){return/[\u0630\u0690\u0621\u0631\u0661\u0671\u0622\u0632\u0672\u0692\u06C2\u0623\u0673\u0693\u06C3\u0624\u0694\u06C4\u0625\u0675\u0695\u06C5\u06E5\u0676\u0696\u06C6\u0627\u0677\u0697\u06C7\u0648\u0688\u0698\u06C8\u0689\u0699\u06C9\u068A\u06CA\u066B\u068B\u06CB\u068C\u068D\u06CD\u06FD\u068E\u06EE\u06FE\u062F\u068F\u06CF\u06EF]/.test(t)}function Ei(t){return/[\u0600-\u0605\u060C-\u060E\u0610-\u061B\u061E\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/.test(t)}function Nr(t){return/[\u0E00-\u0E7F]/.test(t)}function Fr(t){return/[A-z]/.test(t)}function Pm(t){return/\s/.test(t)}function xn(t){this.font=t,this.features={}}function wi(t){this.id=t.id,this.tag=t.tag,this.substitution=t.substitution}function Ai(t,i){if(!t)return-1;switch(i.format){case 1:return i.glyphs.indexOf(t);case 2:{let s=i.ranges;for(let r=0;r<s.length;r++){let o=s[r];if(t>=o.start&&t<=o.end){let u=t-o.start;return o.index+u}}break}default:return-1}return-1}function Um(t,i){return Ai(t,i.coverage)===-1?null:t+i.deltaGlyphId}function Dm(t,i){let s=Ai(t,i.coverage);return s===-1?null:i.substitute[s]}function oo(t,i){let s=[];for(let r=0;r<t.length;r++){let o=t[r],u=i.current;u=Array.isArray(u)?u[0]:u;let f=Ai(u,o);f!==-1&&s.push(f)}return s.length!==t.length?-1:s}function Om(t,i){let s=i.inputCoverage.length+i.lookaheadCoverage.length+i.backtrackCoverage.length;if(t.context.length<s)return[];let r=oo(i.inputCoverage,t);if(r===-1)return[];let o=i.inputCoverage.length-1;if(t.lookahead.length<i.lookaheadCoverage.length)return[];let u=t.lookahead.slice(o);for(;u.length&&Ei(u[0].char);)u.shift();let f=new an(u,0),m=oo(i.lookaheadCoverage,f),g=[].concat(t.backtrack);for(g.reverse();g.length&&Ei(g[0].char);)g.shift();if(g.length<i.backtrackCoverage.length)return[];let S=new an(g,0),v=oo(i.backtrackCoverage,S),I=r.length===i.inputCoverage.length&&m.length===i.lookaheadCoverage.length&&v.length===i.backtrackCoverage.length,L=[];if(I)for(let B=0;B<i.lookupRecords.length;B++){let F=i.lookupRecords[B],z=F.lookupListIndex,ie=this.getLookupByIndex(z);for(let ze=0;ze<ie.subtables.length;ze++){let Ne=ie.subtables[ze],Xe,ct=this.getSubstitutionType(ie,Ne);if(ct==="71"?(ct=this.getSubstitutionType(Ne,Ne.extension),Xe=this.getLookupMethod(Ne,Ne.extension),Ne=Ne.extension):Xe=this.getLookupMethod(ie,Ne),ct==="12"){let xt=t.get(F.sequenceIndex),Et=Xe(xt);Et&&L.push(Et)}else if(ct==="21"){let xt=t.get(F.sequenceIndex),Et=Xe(xt);Et&&L.push(Et)}else throw new Error(`Substitution type ${ct} is not supported in chaining substitution`)}}return L}function Nm(t,i){let s=t.current,r=Ai(s,i.coverage);if(r===-1)return null;let o,u=i.ligatureSets[r];for(let f=0;f<u.length;f++){o=u[f];for(let m=0;m<o.components.length;m++){let g=t.lookahead[m],S=o.components[m];if(g!==S)break;if(m===o.components.length-1)return o}}return null}function Fm(t,i){let s=t.current;if(Ai(s,i.coverage)===-1)return null;for(let o of i.ruleSets)for(let u of o){let f=!0;for(let m=0;m<u.input.length;m++)if(t.lookahead[m]!==u.input[m]){f=!1;break}if(f){let m=[];m.push(s);for(let S=0;S<u.input.length;S++)m.push(u.input[S]);let g=(S,v)=>{let{lookupListIndex:I,sequenceIndex:L}=v,{subtables:B}=this.getLookupByIndex(I);for(let F of B)Ai(S[L],F.coverage)!==-1&&(S[L]=F.deltaGlyphId)};for(let S=0;S<u.lookupRecords.length;S++){let v=u.lookupRecords[S];g(m,v)}return m}}return null}function km(t,i){if(t.context.length<i.coverages.length)return[];for(let r=0;r<i.coverages.length;r++){let o=t.get(r);if(o=Array.isArray(o)?o[0]:o,Ai(o,i.coverages[r])===-1)return[]}let s=[];for(let r=0;r<i.lookupRecords.length;r++){let o=i.lookupRecords[r],u=o.lookupListIndex,f=this.getLookupByIndex(u);for(let m=0;m<f.subtables.length;m++){let g=f.subtables[m],S,v=this.getSubstitutionType(f,g);if(v==="71"?(v=this.getSubstitutionType(g,g.extension),S=this.getLookupMethod(g,g.extension),g=g.extension):S=this.getLookupMethod(f,g),v==="12"){let I=t.get(o.sequenceIndex),L=S(I);L&&s.push(L)}else if(v==="21"){let I=t.get(o.sequenceIndex),L=S(I);L&&s.push(L)}}}return s}function Bm(t,i){let s=Ai(t,i.coverage);return s===-1?null:i.sequences[s]}xn.prototype.getDefaultScriptFeaturesIndexes=function(){let t=this.font.tables.gsub.scripts;for(let i=0;i<t.length;i++){let s=t[i];if(s.tag==="DFLT")return s.script.defaultLangSys.featureIndexes}return[]},xn.prototype.getScriptFeaturesIndexes=function(t){if(!this.font.tables.gsub)return[];if(!t)return this.getDefaultScriptFeaturesIndexes();let s=this.font.tables.gsub.scripts;for(let r=0;r<s.length;r++){let o=s[r];if(o.tag===t&&o.script.defaultLangSys)return o.script.defaultLangSys.featureIndexes;{let u=o.langSysRecords;if(u)for(let f=0;f<u.length;f++){let m=u[f];if(m.tag===t)return m.langSys.featureIndexes}}}return this.getDefaultScriptFeaturesIndexes()},xn.prototype.mapTagsToFeatures=function(t,i){let s={};for(let r=0;r<t.length;r++){let o=t[r].tag,u=t[r].feature;s[o]=u}this.features[i].tags=s},xn.prototype.getScriptFeatures=function(t){let i=this.features[t];if(Object.prototype.hasOwnProperty.call(this.features,t))return i;let s=this.getScriptFeaturesIndexes(t);if(!s)return null;let r=this.font.tables.gsub;return i=s.map(o=>r.features[o]),this.features[t]=i,this.mapTagsToFeatures(i,t),i},xn.prototype.getSubstitutionType=function(t,i){let s=t.lookupType.toString(),r=i.substFormat.toString();return s+r},xn.prototype.getLookupMethod=function(t,i){let s=this.getSubstitutionType(t,i);switch(s){case"11":return r=>Um.apply(this,[r,i]);case"12":return r=>Dm.apply(this,[r,i]);case"63":return r=>Om.apply(this,[r,i]);case"41":return r=>Nm.apply(this,[r,i]);case"21":return r=>Bm.apply(this,[r,i]);case"51":return r=>Fm.apply(this,[r,i]);case"53":return r=>km.apply(this,[r,i]);default:throw new Error(`substitutionType : ${s} lookupType: ${t.lookupType} - substFormat: ${i.substFormat} is not yet supported`)}},xn.prototype.lookupFeature=function(t){let i=t.contextParams,s=i.index,r=this.getFeature({tag:t.tag,script:t.script});if(!r)return new Error(`font '${(this.font.names.unicode||this.font.names.windows||this.font.names.macintosh).fullName.en}' doesn't support feature '${t.tag}' for script '${t.script}'.`);let o=this.getFeatureLookups(r),u=[].concat(i.context);for(let f=0;f<o.length;f++){let m=o[f],g=this.getLookupSubtables(m);for(let S=0;S<g.length;S++){let v=g[S],I=this.getSubstitutionType(m,v),L;I==="71"?(I=this.getSubstitutionType(v,v.extension),L=this.getLookupMethod(v,v.extension),v=v.extension):L=this.getLookupMethod(m,v);let B;switch(I){case"11":B=L(i.current),B&&u.splice(s,1,new wi({id:11,tag:t.tag,substitution:B}));break;case"12":B=L(i.current),B&&u.splice(s,1,new wi({id:12,tag:t.tag,substitution:B}));break;case"63":B=L(i),Array.isArray(B)&&B.length&&u.splice(s,1,new wi({id:63,tag:t.tag,substitution:B}));break;case"41":B=L(i),B&&u.splice(s,1,new wi({id:41,tag:t.tag,substitution:B}));break;case"21":B=L(i.current),B&&u.splice(s,1,new wi({id:21,tag:t.tag,substitution:B}));break;case"51":case"53":B=L(i),Array.isArray(B)&&B.length&&u.splice(s,1,new wi({id:parseInt(I),tag:t.tag,substitution:B}));break}i=new an(u,s),!(Array.isArray(B)&&!B.length)&&(B=null)}}return u.length?u:null},xn.prototype.supports=function(t){if(!t.script)return!1;this.getScriptFeatures(t.script);let i=Object.prototype.hasOwnProperty.call(this.features,t.script);if(!t.tag)return i;let s=this.features[t.script].some(r=>r.tag===t.tag);return i&&s},xn.prototype.getLookupSubtables=function(t){return t.subtables||null},xn.prototype.getLookupByIndex=function(t){return this.font.tables.gsub.lookups[t]||null},xn.prototype.getFeatureLookups=function(t){return t.lookupListIndexes.map(this.getLookupByIndex.bind(this))},xn.prototype.getFeature=function(i){if(!this.font)return{FAIL:"No font was found"};Object.prototype.hasOwnProperty.call(this.features,i.script)||this.getScriptFeatures(i.script);let s=this.features[i.script];return s?s.tags[i.tag]?this.features[i.script].tags[i.tag]:null:{FAIL:`No feature for script ${i.script}`}};var zm=xn;function Vm(t){let i=t.current,s=t.get(-1);return s===null&&Ti(i)||!Ti(s)&&Ti(i)}function Gm(t){let i=t.get(1);return i===null||!Ti(i)}var Hm={startCheck:Vm,endCheck:Gm};function Wm(t){let i=t.current,s=t.get(-1);return(Ti(i)||Ei(i))&&!Ti(s)}function Xm(t){let i=t.get(1);switch(!0){case i===null:return!0;case(!Ti(i)&&!Ei(i)):{let s=Pm(i);if(!s)return!0;if(s){let r=!1;if(r=t.lookahead.some(o=>Ti(o)||Ei(o)),!r)return!0}break}default:return!1}}var qm={startCheck:Wm,endCheck:Xm};function Ym(t,i,s){i[s].setState(t.tag,t.substitution)}function Zm(t,i,s){i[s].setState(t.tag,t.substitution)}function lo(t,i,s){for(let r=0;r<t.substitution.length;r++){let o=t.substitution[r],u=i[s+r];if(Array.isArray(o)){o.length?u.setState(t.tag,o[0]):u.setState("deleted",!0);continue}u.setState(t.tag,o)}}function $m(t,i,s){let r=i[s];r.setState(t.tag,t.substitution.ligGlyph);let o=t.substitution.components.length;for(let u=0;u<o;u++)r=i[s+u+1],r.setState("deleted",!0)}var Zc={11:Ym,12:Zm,63:lo,41:$m,51:lo,53:lo};function jm(t,i,s){t instanceof wi&&Zc[t.id]&&Zc[t.id](t,i,s)}var Zi=jm;function Jm(t){let i=[].concat(t.backtrack);for(let s=i.length-1;s>=0;s--){let r=i[s],o=Yc(r),u=Ei(r);if(!o&&!u)return!0;if(o)return!1}return!1}function Km(t){if(Yc(t.current))return!1;for(let i=0;i<t.lookahead.length;i++){let s=t.lookahead[i];if(!Ei(s))return!0}return!1}function Qm(t){let i="arab",s=this.featuresTags[i],r=this.tokenizer.getRangeTokens(t);if(r.length===1)return;let o=new an(r.map(f=>f.getState("glyphIndex")),0),u=new an(r.map(f=>f.char),0);for(let f=0;f<r.length;f++){let m=r[f];if(Ei(m.char))continue;o.setCurrentIndex(f),u.setCurrentIndex(f);let g=0;Jm(u)&&(g|=1),Km(u)&&(g|=2);let S;switch(g){case 1:S="fina";break;case 2:S="init";break;case 3:S="medi";break}if(s.indexOf(S)===-1)continue;let v=this.query.lookupFeature({tag:S,script:i,contextParams:o});if(v instanceof Error){console.info(v.message);continue}for(let I=0;I<v.length;I++){let L=v[I];L instanceof wi&&(Zi(L,r,I),o.context[I]=L.substitution)}}}var eg=Qm;function $c(t,i){let s=t.map(r=>r.activeState.value);return new an(s,i||0)}function tg(t){let i="arab",s=this.tokenizer.getRangeTokens(t),r=$c(s);for(let o=0;o<r.context.length;o++){r.setCurrentIndex(o);let u=this.query.lookupFeature({tag:"rlig",script:i,contextParams:r});if(u.length){for(let f=0;f<u.length;f++){let m=u[f];Zi(m,s,o)}r=$c(s)}}}var ng=tg;function ig(t){return t.index===0&&t.context.length>1}function sg(t){return t.index===t.context.length-1}var rg={startCheck:ig,endCheck:sg};function jc(t,i){let s=t.map(r=>r.activeState.value);return new an(s,i||0)}function ag(t){let i="delf",s="ccmp",r=this.tokenizer.getRangeTokens(t),o=jc(r);for(let u=0;u<o.context.length;u++){if(!this.query.getFeature({tag:s,script:i,contextParams:o}))continue;o.setCurrentIndex(u);let f=this.query.lookupFeature({tag:s,script:i,contextParams:o});if(f.length){for(let m=0;m<f.length;m++){let g=f[m];Zi(g,r,u)}o=jc(r)}}}var og=ag;function lg(t){let i=t.current,s=t.get(-1);return s===null&&Fr(i)||!Fr(s)&&Fr(i)}function cg(t){let i=t.get(1);return i===null||!Fr(i)}var ug={startCheck:lg,endCheck:cg};function Jc(t,i){let s=t.map(r=>r.activeState.value);return new an(s,i||0)}function hg(t){let i="latn",s=this.tokenizer.getRangeTokens(t),r=Jc(s);for(let o=0;o<r.context.length;o++){r.setCurrentIndex(o);let u=this.query.lookupFeature({tag:"liga",script:i,contextParams:r});if(u.length){for(let f=0;f<u.length;f++){let m=u[f];Zi(m,s,o)}r=Jc(s)}}}var fg=hg;function dg(t){let i=t.current,s=t.get(-1);return s===null&&Nr(i)||!Nr(s)&&Nr(i)}function pg(t){let i=t.get(1);return i===null||!Nr(i)}var mg={startCheck:dg,endCheck:pg};function Kc(t,i){let s=t.map(r=>r.activeState.value);return new an(s,i||0)}function gg(t){let i="thai",s=this.tokenizer.getRangeTokens(t),r=Kc(s,0);for(let o=0;o<r.context.length;o++){r.setCurrentIndex(o);let u=this.query.lookupFeature({tag:"ccmp",script:i,contextParams:r});if(u.length){for(let f=0;f<u.length;f++){let m=u[f];Zi(m,s,o)}r=Kc(s,o)}}}var yg=gg;function Qc(t,i){let s=t.map(r=>r.activeState.value);return new an(s,i||0)}function xg(t){let i="thai",s=this.tokenizer.getRangeTokens(t),r=Qc(s,0);for(let o=0;o<r.context.length;o++){r.setCurrentIndex(o);let u=this.query.lookupFeature({tag:"liga",script:i,contextParams:r});if(u.length){for(let f=0;f<u.length;f++){let m=u[f];Zi(m,s,o)}r=Qc(s,o)}}}var vg=xg;function eu(t,i){let s=t.map(r=>r.activeState.value);return new an(s,i||0)}function _g(t){let i="thai",s=this.tokenizer.getRangeTokens(t),r=eu(s,0);for(let o=0;o<r.context.length;o++){r.setCurrentIndex(o);let u=this.query.lookupFeature({tag:"rlig",script:i,contextParams:r});if(u.length){for(let f=0;f<u.length;f++){let m=u[f];Zi(m,s,o)}r=eu(s,o)}}}var bg=_g;function co(t){if(t===null)return!1;let i=t.codePointAt(0);return i>=6155&&i<=6157||i>=65024&&i<=65039||i>=917760&&i<=917999}function Sg(t){let i=t.current,s=t.get(1);return s===null&&co(i)||co(s)}function Mg(t){let i=t.get(1);return i===null||!co(i)}var Tg={startCheck:Sg,endCheck:Mg};function Eg(t){let i=this.query.font,s=this.tokenizer.getRangeTokens(t);if(s[1].setState("deleted",!0),i.tables.cmap&&i.tables.cmap.varSelectorList){let r=s[0].char.codePointAt(0),o=s[1].char.codePointAt(0),u=i.tables.cmap.varSelectorList[o];if(u!==void 0&&u.nonDefaultUVS){let f=u.nonDefaultUVS.uvsMappings;if(f[r]){let m=f[r].glyphID;i.glyphs.glyphs[m]!==void 0&&s[0].setState("glyphIndex",m)}}}}var wg=Eg;function Tn(t){this.baseDir=t||"ltr",this.tokenizer=new Im,this.featuresTags={}}Tn.prototype.setText=function(t){this.text=t},Tn.prototype.contextChecks={ccmpReplacementCheck:rg,latinWordCheck:ug,arabicWordCheck:Hm,arabicSentenceCheck:qm,thaiWordCheck:mg,unicodeVariationSequenceCheck:Tg};function gs(t){let i=this.contextChecks[`${t}Check`];return this.tokenizer.registerContextChecker(t,i.startCheck,i.endCheck)}function Ag(){return gs.call(this,"ccmpReplacement"),gs.call(this,"latinWord"),gs.call(this,"arabicWord"),gs.call(this,"arabicSentence"),gs.call(this,"thaiWord"),gs.call(this,"unicodeVariationSequence"),this.tokenizer.tokenize(this.text)}function Cg(){let t=this.tokenizer.getContextRanges("arabicSentence");for(let i=0;i<t.length;i++){let s=t[i],r=this.tokenizer.getRangeTokens(s);this.tokenizer.replaceRange(s.startIndex,s.endOffset,r.reverse())}}Tn.prototype.registerFeatures=function(t,i){let s=i.filter(r=>this.query.supports({script:t,tag:r}));Object.prototype.hasOwnProperty.call(this.featuresTags,t)?this.featuresTags[t]=this.featuresTags[t].concat(s):this.featuresTags[t]=s},Tn.prototype.applyFeatures=function(t,i){if(!t)throw new Error("No valid font was provided to apply features");this.query||(this.query=new zm(t));for(let s=0;s<i.length;s++){let r=i[s];this.query.supports({script:r.script})&&this.registerFeatures(r.script,r.tags)}},Tn.prototype.registerModifier=function(t,i,s){this.tokenizer.registerModifier(t,i,s)};function rr(){if(this.tokenizer.registeredModifiers.indexOf("glyphIndex")===-1)throw new Error("glyphIndex modifier is required to apply arabic presentation features.")}function Rg(){if(!Object.prototype.hasOwnProperty.call(this.featuresTags,"arab"))return;rr.call(this);let i=this.tokenizer.getContextRanges("arabicWord");for(let s=0;s<i.length;s++){let r=i[s];eg.call(this,r)}}function Lg(){rr.call(this);let t=this.tokenizer.getContextRanges("ccmpReplacement");for(let i=0;i<t.length;i++){let s=t[i];og.call(this,s)}}function Ig(){if(!this.hasFeatureEnabled("arab","rlig"))return;rr.call(this);let t=this.tokenizer.getContextRanges("arabicWord");for(let i=0;i<t.length;i++){let s=t[i];ng.call(this,s)}}function Pg(){if(!this.hasFeatureEnabled("latn","liga"))return;rr.call(this);let t=this.tokenizer.getContextRanges("latinWord");for(let i=0;i<t.length;i++){let s=t[i];fg.call(this,s)}}function Ug(){let t=this.tokenizer.getContextRanges("unicodeVariationSequence");for(let i=0;i<t.length;i++){let s=t[i];wg.call(this,s)}}function Dg(){rr.call(this);let t=this.tokenizer.getContextRanges("thaiWord");for(let i=0;i<t.length;i++){let s=t[i];this.hasFeatureEnabled("thai","liga")&&vg.call(this,s),this.hasFeatureEnabled("thai","rlig")&&bg.call(this,s),this.hasFeatureEnabled("thai","ccmp")&&yg.call(this,s)}}Tn.prototype.checkContextReady=function(t){return!!this.tokenizer.getContext(t)},Tn.prototype.applyFeaturesToContexts=function(){this.checkContextReady("ccmpReplacement")&&Lg.call(this),this.checkContextReady("arabicWord")&&(Rg.call(this),Ig.call(this)),this.checkContextReady("latinWord")&&Pg.call(this),this.checkContextReady("arabicSentence")&&Cg.call(this),this.checkContextReady("thaiWord")&&Dg.call(this),this.checkContextReady("unicodeVariationSequence")&&Ug.call(this)},Tn.prototype.hasFeatureEnabled=function(t,i){return(this.featuresTags[t]||[]).indexOf(i)!==-1},Tn.prototype.processText=function(t){(!this.text||this.text!==t)&&(this.setText(t),Ag.call(this),this.applyFeaturesToContexts())},Tn.prototype.getBidiText=function(t){return this.processText(t),this.tokenizer.getText()},Tn.prototype.getTextGlyphs=function(t){this.processText(t);let i=[];for(let s=0;s<this.tokenizer.tokens.length;s++){let r=this.tokenizer.tokens[s];if(r.state.deleted)continue;let o=r.activeState.value;i.push(Array.isArray(o)?o[0]:o)}return i};var Og=Tn;function uo(t){return{fontFamily:{en:t.familyName||" "},fontSubfamily:{en:t.styleName||" "},fullName:{en:t.fullName||t.familyName+" "+t.styleName},postScriptName:{en:t.postScriptName||(t.familyName+t.styleName).replace(/\s/g,"")},designer:{en:t.designer||" "},designerURL:{en:t.designerURL||" "},manufacturer:{en:t.manufacturer||" "},manufacturerURL:{en:t.manufacturerURL||" "},license:{en:t.license||" "},licenseURL:{en:t.licenseURL||" "},version:{en:t.version||"Version 0.1"},description:{en:t.description||" "},copyright:{en:t.copyright||" "},trademark:{en:t.trademark||" "}}}function bt(t){if(t=t||{},t.tables=t.tables||{},!t.empty){if(!t.familyName)throw new Error("When creating a new Font object, familyName is required.");if(!t.styleName)throw new Error("When creating a new Font object, styleName is required.");if(!t.unitsPerEm)throw new Error("When creating a new Font object, unitsPerEm is required.");if(!t.ascender)throw new Error("When creating a new Font object, ascender is required.");if(t.descender>0)throw new Error("When creating a new Font object, negative descender value is required.");this.names={},this.names.unicode=uo(t),this.names.macintosh=uo(t),this.names.windows=uo(t),this.unitsPerEm=t.unitsPerEm||1e3,this.ascender=t.ascender,this.descender=t.descender,this.createdTimestamp=t.createdTimestamp,this.italicAngle=t.italicAngle||0,this.weightClass=t.weightClass||0;let i=0;t.fsSelection?i=t.fsSelection:(this.italicAngle<0?i|=this.fsSelectionValues.ITALIC:this.italicAngle>0&&(i|=this.fsSelectionValues.OBLIQUE),this.weightClass>=600&&(i|=this.fsSelectionValues.BOLD),i===0&&(i=this.fsSelectionValues.REGULAR)),(!t.panose||!Array.isArray(t.panose))&&(t.panose=[0,0,0,0,0,0,0,0,0]),this.tables=Object.assign(t.tables,{os2:Object.assign({usWeightClass:t.weightClass||this.usWeightClasses.MEDIUM,usWidthClass:t.widthClass||this.usWidthClasses.MEDIUM,bFamilyType:t.panose[0]||0,bSerifStyle:t.panose[1]||0,bWeight:t.panose[2]||0,bProportion:t.panose[3]||0,bContrast:t.panose[4]||0,bStrokeVariation:t.panose[5]||0,bArmStyle:t.panose[6]||0,bLetterform:t.panose[7]||0,bMidline:t.panose[8]||0,bXHeight:t.panose[9]||0,fsSelection:i},t.tables.os2)})}this.supported=!0,this.glyphs=new Yn.GlyphSet(this,t.glyphs||[]),this.encoding=new qn(this),this.position=new Ld(this),this.substitution=new Fd(this),this.tables=this.tables||{},this.tables=new Proxy(this.tables,{set:(i,s,r)=>(i[s]=r,i.fvar&&(i.gvar||i.cff2)&&!this.variation&&(this.variation=new Kd(this)),!0)}),this.palettes=new _c(this),this.layers=new kd(this),this.svgImages=new Bd(this),this._push=null,this._hmtxTableData={},Object.defineProperty(this,"hinting",{get:function(){return this._hinting?this._hinting:this.outlinesFormat==="truetype"?this._hinting=new Cm(this):null}})}bt.prototype.hasChar=function(t){return this.encoding.charToGlyphIndex(t)>0},bt.prototype.charToGlyphIndex=function(t){return this.encoding.charToGlyphIndex(t)},bt.prototype.charToGlyph=function(t){let i=this.charToGlyphIndex(t),s=this.glyphs.get(i);return s||(s=this.glyphs.get(0)),s},bt.prototype.updateFeatures=function(t){return this.defaultRenderOptions.features.map(i=>i.script==="latn"?{script:"latn",tags:i.tags.filter(s=>t[s])}:i)},bt.prototype.stringToGlyphIndexes=function(t,i){let s=new Og,r=u=>this.charToGlyphIndex(u.char);s.registerModifier("glyphIndex",null,r);let o=i?this.updateFeatures(i.features):this.defaultRenderOptions.features;return s.applyFeatures(this,o),s.getTextGlyphs(t)},bt.prototype.stringToGlyphs=function(t,i){let s=this.stringToGlyphIndexes(t,i),r=s.length,o=new Array(r),u=this.glyphs.get(0);for(let f=0;f<r;f+=1)o[f]=this.glyphs.get(s[f])||u;return o},bt.prototype.nameToGlyphIndex=function(t){return this.glyphNames.nameToGlyphIndex(t)},bt.prototype.nameToGlyph=function(t){let i=this.nameToGlyphIndex(t),s=this.glyphs.get(i);return s||(s=this.glyphs.get(0)),s},bt.prototype.glyphIndexToName=function(t){return this.glyphNames.glyphIndexToName?this.glyphNames.glyphIndexToName(t):""},bt.prototype.getKerningValue=function(t,i){t=t.index||t,i=i.index||i;let s=this.position.defaultKerningTables;return s?this.position.getKerningValue(s,t,i):this.kerningPairs[t+","+i]||0},bt.prototype.defaultRenderOptions={kerning:!0,features:[{script:"arab",tags:["init","medi","fina","rlig"]},{script:"latn",tags:["liga","rlig"]},{script:"thai",tags:["liga","rlig","ccmp"]}],hinting:!1,usePalette:0,drawLayers:!0,drawSVG:!0},bt.prototype.forEachGlyph=function(t,i,s,r,o,u){i=i!==void 0?i:0,s=s!==void 0?s:0,r=r!==void 0?r:72,o=Object.assign({},this.defaultRenderOptions,o);let f=1/this.unitsPerEm*r,m=this.stringToGlyphs(t,o),g;if(o.kerning){let S=o.script||this.position.getDefaultScriptName();g=this.position.getKerningTables(S,o.language)}for(let S=0;S<m.length;S+=1){let v=m[S];if(u.call(this,v,i,s,r,o),v.advanceWidth&&(i+=v.advanceWidth*f),o.kerning&&S<m.length-1){let I=g?this.position.getKerningValue(g,v.index,m[S+1].index):this.getKerningValue(v,m[S+1]);i+=I*f}o.letterSpacing?i+=o.letterSpacing*r:o.tracking&&(i+=o.tracking/1e3*r)}return i},bt.prototype.getPath=function(t,i,s,r,o){o=Object.assign({},this.defaultRenderOptions,o);let u=new Ae;if(u._layers=[],Hl(this,u,r),u.stroke){let f=1/(u.unitsPerEm||1e3)*r;u.strokeWidth*=f}return this.forEachGlyph(t,i,s,r,o,(f,m,g,S)=>{let v=f.getPath(m,g,S,o,this);if(o.drawSVG||o.drawLayers){let I=v._layers;if(I&&I.length){for(let L=0;L<I.length;L++){let B=I[L];u._layers.push(B)}return}}u.extend(v)}),u},bt.prototype.getPaths=function(t,i,s,r,o){o=Object.assign({},this.defaultRenderOptions,o);let u=[];return this.forEachGlyph(t,i,s,r,o,function(f,m,g,S){let v=f.getPath(m,g,S,o,this);u.push(v)}),u},bt.prototype.getAdvanceWidth=function(t,i,s){return s=Object.assign({},this.defaultRenderOptions,s),this.forEachGlyph(t,0,0,i,s,function(){})},bt.prototype.draw=function(t,i,s,r,o,u){this.getPath(i,s,r,o,u).draw(t)},bt.prototype.drawPoints=function(t,i,s,r,o,u){u=Object.assign({},this.defaultRenderOptions,u),this.forEachGlyph(i,s,r,o,u,function(f,m,g,S){f.drawPoints(t,m,g,S,u,this)})},bt.prototype.drawMetrics=function(t,i,s,r,o,u){u=Object.assign({},this.defaultRenderOptions,u),this.forEachGlyph(i,s,r,o,u,function(f,m,g,S){f.drawMetrics(t,m,g,S)})},bt.prototype.getEnglishName=function(t){let i=(this.names.unicode||this.names.macintosh||this.names.windows)[t];if(i)return i.en},bt.prototype.validate=function(){let t=[],i=this;function s(o,u){o||(console.warn(`[opentype.js] ${u}`),t.push(u))}function r(o){let u=i.getEnglishName(o);s(u&&u.trim().length>0,"No English "+o+" specified.")}if(r("fontFamily"),r("weightName"),r("manufacturer"),r("copyright"),r("version"),s(this.unitsPerEm>0,"No unitsPerEm specified."),this.tables.colr){let o=this.tables.colr.baseGlyphRecords,u=-1;for(let f=0;f<o.length;f++){let m=o[f].glyphID;if(s(u<o[f].glyphID,`baseGlyphs must be sorted by GlyphID in ascending order, but glyphID ${m} comes after ${u}`),u>o[f].glyphID)break;u=m}}return t},bt.prototype.toTables=function(){return Rd.fontToTable(this)},bt.prototype.toBuffer=function(){return console.warn("Font.toBuffer is deprecated. Use Font.toArrayBuffer instead."),this.toArrayBuffer()},bt.prototype.toArrayBuffer=function(){let i=this.toTables().encode(),s=new ArrayBuffer(i.length),r=new Uint8Array(s);for(let o=0;o<i.length;o++)r[o]=i[o];return s},bt.prototype.download=function(){console.error("DEPRECATED: platform-specific actions are to be implemented on user-side")},bt.prototype.fsSelectionValues={ITALIC:1,UNDERSCORE:2,NEGATIVE:4,OUTLINED:8,STRIKEOUT:16,BOLD:32,REGULAR:64,USER_TYPO_METRICS:128,WWS:256,OBLIQUE:512},bt.prototype.macStyleValues={BOLD:1,ITALIC:2,UNDERLINE:4,OUTLINED:8,SHADOW:16,CONDENSED:32,EXTENDED:64},bt.prototype.usWidthClasses={ULTRA_CONDENSED:1,EXTRA_CONDENSED:2,CONDENSED:3,SEMI_CONDENSED:4,MEDIUM:5,SEMI_EXPANDED:6,EXPANDED:7,EXTRA_EXPANDED:8,ULTRA_EXPANDED:9},bt.prototype.usWeightClasses={THIN:100,EXTRA_LIGHT:200,LIGHT:300,NORMAL:400,MEDIUM:500,SEMI_BOLD:600,BOLD:700,EXTRA_BOLD:800,BLACK:900};var tu=bt;function Ng(t,i){let s=new _e.Parser(t,i),r=s.parseUShort(),o=s.parseUShort();r!==1&&console.warn(`Unsupported hvar table version ${r}.${o}`);let u=[r,o],f=s.parsePointer32(function(){return this.parseItemVariationStore()}),m=s.parsePointer32(function(){return this.parseDeltaSetIndexMap()}),g=s.parsePointer32(function(){return this.parseDeltaSetIndexMap()}),S=s.parsePointer32(function(){return this.parseDeltaSetIndexMap()});return{version:u,itemVariationStore:f,advanceWidth:m,lsb:g,rsb:S}}function Fg(){console.warn("Writing of hvar tables is not yet supported.")}var kg={make:Fg,parse:Ng},Bg=function(){return{coverage:this.parsePointer(H.coverage),attachPoints:this.parseList(H.pointer(H.uShortList))}},zg=function(){var t=this.parseUShort();if(he.argument(t===1||t===2||t===3,"Unsupported CaretValue table version."),t===1)return{coordinate:this.parseShort()};if(t===2)return{pointindex:this.parseShort()};if(t===3)return{coordinate:this.parseShort()}},Vg=function(){return this.parseList(H.pointer(zg))},Gg=function(){return{coverage:this.parsePointer(H.coverage),ligGlyphs:this.parseList(H.pointer(Vg))}},Hg=function(){return this.parseUShort(),this.parseList(H.pointer(H.coverage))};function Wg(t,i){i=i||0;let s=new H(t,i),r=s.parseVersion(1);he.argument(r===1||r===1.2||r===1.3,"Unsupported GDEF table version.");var o={version:r,classDef:s.parsePointer(H.classDef),attachList:s.parsePointer(Bg),ligCaretList:s.parsePointer(Gg),markAttachClassDef:s.parsePointer(H.classDef)};return r>=1.2&&(o.markGlyphSets=s.parsePointer(Hg)),o}var Xg={parse:Wg},On=new Array(10);On[1]=function(){let i=this.offset+this.relativeOffset,s=this.parseUShort();if(s===1)return{posFormat:1,coverage:this.parsePointer(H.coverage),value:this.parseValueRecord()};if(s===2)return{posFormat:2,coverage:this.parsePointer(H.coverage),values:this.parseValueRecordList()};he.assert(!1,"0x"+i.toString(16)+": GPOS lookup type 1 format must be 1 or 2.")},On[2]=function(){let i=this.offset+this.relativeOffset,s=this.parseUShort();he.assert(s===1||s===2,"0x"+i.toString(16)+": GPOS lookup type 2 format must be 1 or 2.");let r=this.parsePointer(H.coverage),o=this.parseUShort(),u=this.parseUShort();if(s===1)return{posFormat:s,coverage:r,valueFormat1:o,valueFormat2:u,pairSets:this.parseList(H.pointer(H.list(function(){return{secondGlyph:this.parseUShort(),value1:this.parseValueRecord(o),value2:this.parseValueRecord(u)}})))};if(s===2){let f=this.parsePointer(H.classDef),m=this.parsePointer(H.classDef),g=this.parseUShort(),S=this.parseUShort();return{posFormat:s,coverage:r,valueFormat1:o,valueFormat2:u,classDef1:f,classDef2:m,class1Count:g,class2Count:S,classRecords:this.parseList(g,H.list(S,function(){return{value1:this.parseValueRecord(o),value2:this.parseValueRecord(u)}}))}}},On[3]=function(){return{error:"GPOS Lookup 3 not supported"}},On[4]=function(){return{error:"GPOS Lookup 4 not supported"}},On[5]=function(){return{error:"GPOS Lookup 5 not supported"}},On[6]=function(){return{error:"GPOS Lookup 6 not supported"}},On[7]=function(){return{error:"GPOS Lookup 7 not supported"}},On[8]=function(){return{error:"GPOS Lookup 8 not supported"}},On[9]=function(){return{error:"GPOS Lookup 9 not supported"}};function qg(t,i){i=i||0;let s=new H(t,i),r=s.parseVersion(1);return he.argument(r===1||r===1.1,"Unsupported GPOS table version "+r),r===1?{version:r,scripts:s.parseScriptList(),features:s.parseFeatureList(),lookups:s.parseLookupList(On)}:{version:r,scripts:s.parseScriptList(),features:s.parseFeatureList(),lookups:s.parseLookupList(On),variations:s.parseFeatureVariationsList()}}var Yg=new Array(10);function Zg(t){return new $.Table("GPOS",[{name:"version",type:"ULONG",value:65536},{name:"scripts",type:"TABLE",value:new $.ScriptList(t.scripts)},{name:"features",type:"TABLE",value:new $.FeatureList(t.features)},{name:"lookups",type:"TABLE",value:new $.LookupList(t.lookups,Yg)}])}var $g={parse:qg,make:Zg};function jg(t){let i={};t.skip("uShort");let s=t.parseUShort();he.argument(s===0,"Unsupported kern sub-table version."),t.skip("uShort",2);let r=t.parseUShort();t.skip("uShort",3);for(let o=0;o<r;o+=1){let u=t.parseUShort(),f=t.parseUShort(),m=t.parseShort();i[u+","+f]=m}return i}function Jg(t){let i={};t.skip("uShort"),t.parseULong()>1&&console.warn("Only the first kern subtable is supported."),t.skip("uLong");let o=t.parseUShort()&255;if(t.skip("uShort"),o===0){let u=t.parseUShort();t.skip("uShort",3);for(let f=0;f<u;f+=1){let m=t.parseUShort(),g=t.parseUShort(),S=t.parseShort();i[m+","+g]=S}}return i}function Kg(t,i){let s=new _e.Parser(t,i),r=s.parseUShort();if(r===0)return jg(s);if(r===1)return Jg(s);throw new Error("Unsupported kern table version ("+r+").")}var Qg={parse:Kg};function e0(t,i,s,r){let o=new _e.Parser(t,i),u=r?o.parseUShort:o.parseULong,f=[];for(let m=0;m<s+1;m+=1){let g=u.call(o);r&&(g*=2),f.push(g)}return f}var t0={parse:e0};function nu(t,i){let s=[],r=12;for(let o=0;o<i;o+=1){let u=_e.getTag(t,r),f=_e.getULong(t,r+4),m=_e.getULong(t,r+8),g=_e.getULong(t,r+12);s.push({tag:u,checksum:f,offset:m,length:g,compression:!1}),r+=16}return s}function n0(t,i){let s=[],r=44;for(let o=0;o<i;o+=1){let u=_e.getTag(t,r),f=_e.getULong(t,r+4),m=_e.getULong(t,r+8),g=_e.getULong(t,r+12),S;m<g?S="WOFF":S=!1,s.push({tag:u,offset:f,compression:S,compressedLength:m,length:g}),r+=20}return s}function yt(t,i){if(i.compression==="WOFF"){let s=new Uint8Array(t.buffer,i.offset+2,i.compressedLength-2),r=new Uint8Array(i.length);if(te(s,r),r.byteLength!==i.length)throw new Error("Decompression error: "+i.tag+" decompressed length doesn't match recorded length");return{data:new DataView(r.buffer,0),offset:0}}else return{data:t,offset:i.offset}}function i0(t,i={}){let s,r,o=new tu({empty:!0});t.constructor!==ArrayBuffer&&(t=new Uint8Array(t).buffer);let u=new DataView(t,0),f,m=[],g=_e.getTag(u,0);if(g==="\0\0\0"||g==="true"||g==="typ1")o.outlinesFormat="truetype",f=_e.getUShort(u,4),m=nu(u,f);else if(g==="OTTO")o.outlinesFormat="cff",f=_e.getUShort(u,4),m=nu(u,f);else if(g==="wOFF"){let Ve=_e.getTag(u,4);if(Ve==="\0\0\0")o.outlinesFormat="truetype";else if(Ve==="OTTO")o.outlinesFormat="cff";else throw new Error("Unsupported OpenType flavor "+g);f=_e.getUShort(u,12),m=n0(u,f)}else if(g==="wOF2"){let Ve="https://github.com/opentypejs/opentype.js/issues/183#issuecomment-1147228025";throw new Error("WOFF2 require an external decompressor library, see examples at: "+Ve)}else throw new Error("Unsupported OpenType signature "+g);let S,v,I,L,B,F,z,ie,ze,Ne,Xe,ct,xt,Et,wt,Vt,Nn,ut;for(let Ve=0;Ve<f;Ve+=1){let De=m[Ve],Oe;switch(De.tag){case"avar":z=De;break;case"cmap":Oe=yt(u,De),o.tables.cmap=lt.parse(Oe.data,Oe.offset),o.encoding=new us(o.tables.cmap);break;case"cvt ":Oe=yt(u,De),ut=new _e.Parser(Oe.data,Oe.offset),o.tables.cvt=ut.parseShortList(De.length/2);break;case"fvar":I=De;break;case"STAT":L=De;break;case"gvar":B=De;break;case"cvar":F=De;break;case"fpgm":Oe=yt(u,De),ut=new _e.Parser(Oe.data,Oe.offset),o.tables.fpgm=ut.parseByteList(De.length);break;case"head":Oe=yt(u,De),o.tables.head=$l.parse(Oe.data,Oe.offset),o.unitsPerEm=o.tables.head.unitsPerEm,s=o.tables.head.indexToLocFormat;break;case"hhea":Oe=yt(u,De),o.tables.hhea=jl.parse(Oe.data,Oe.offset),o.ascender=o.tables.hhea.ascender,o.descender=o.tables.hhea.descender,o.numberOfHMetrics=o.tables.hhea.numberOfHMetrics;break;case"HVAR":xt=De;break;case"hmtx":ct=De;break;case"ltag":Oe=yt(u,De),r=Kl.parse(Oe.data,Oe.offset);break;case"COLR":Oe=yt(u,De),o.tables.colr=ic.parse(Oe.data,Oe.offset);break;case"CPAL":Oe=yt(u,De),o.tables.cpal=Nl.parse(Oe.data,Oe.offset);break;case"maxp":Oe=yt(u,De),o.tables.maxp=Ql.parse(Oe.data,Oe.offset),o.numGlyphs=o.tables.maxp.numGlyphs;break;case"name":Vt=De;break;case"OS/2":Oe=yt(u,De),o.tables.os2=ja.parse(Oe.data,Oe.offset);break;case"post":Oe=yt(u,De),o.tables.post=ec.parse(Oe.data,Oe.offset),o.glyphNames=new Wi(o.tables.post);break;case"prep":Oe=yt(u,De),ut=new _e.Parser(Oe.data,Oe.offset),o.tables.prep=ut.parseByteList(De.length);break;case"glyf":ie=De;break;case"loca":wt=De;break;case"CFF ":S=De;break;case"CFF2":v=De;break;case"kern":Et=De;break;case"GDEF":ze=De;break;case"GPOS":Ne=De;break;case"GSUB":Xe=De;break;case"meta":Nn=De;break;case"gasp":try{Oe=yt(u,De),o.tables.gasp=cc.parse(Oe.data,Oe.offset)}catch(Jt){console.warn("Failed to parse gasp table, skipping."),console.warn(Jt)}break;case"SVG ":Oe=yt(u,De),o.tables.svg=uc.parse(Oe.data,Oe.offset);break;default:break}}let vn=yt(u,Vt);if(o.tables.name=Ze.parse(vn.data,vn.offset,r),o.names=o.tables.name,ie&&wt){let Ve=s===0,De=yt(u,wt),Oe=t0.parse(De.data,De.offset,o.numGlyphs,Ve),Jt=yt(u,ie);o.glyphs=Tc.parse(Jt.data,Jt.offset,Oe,o,i)}else if(S){let Ve=yt(u,S);Za.parse(Ve.data,Ve.offset,o,i)}else if(v){let Ve=yt(u,v);Za.parse(Ve.data,Ve.offset,o,i)}else throw new Error("Font doesn't contain TrueType, CFF or CFF2 outlines.");let on=yt(u,ct);if(Jl.parse(o,on.data,on.offset,o.numberOfHMetrics,o.numGlyphs,o.glyphs,i),ef(o,i),Et){let Ve=yt(u,Et);o.kerningPairs=Qg.parse(Ve.data,Ve.offset)}else o.kerningPairs={};if(ze){let Ve=yt(u,ze);o.tables.gdef=Xg.parse(Ve.data,Ve.offset)}if(Ne){let Ve=yt(u,Ne);o.tables.gpos=$g.parse(Ve.data,Ve.offset),o.position.init()}if(Xe){let Ve=yt(u,Xe);o.tables.gsub=tc.parse(Ve.data,Ve.offset)}if(I){let Ve=yt(u,I);o.tables.fvar=sc.parse(Ve.data,Ve.offset,o.names)}if(L){let Ve=yt(u,L);o.tables.stat=rc.parse(Ve.data,Ve.offset,o.tables.fvar)}if(B){I||console.warn("This font provides a gvar table, but no fvar table, which is required for variable fonts."),ie||console.warn("This font provides a gvar table, but no glyf table. Glyph variation only works with TrueType outlines.");let Ve=yt(u,B);o.tables.gvar=lc.parse(Ve.data,Ve.offset,o.tables.fvar,o.glyphs)}if(F){I||console.warn("This font provides a cvar table, but no fvar table, which is required for variable fonts."),o.tables.cvt||console.warn("This font provides a cvar table, but no cvt table which could be made variable."),ie||console.warn("This font provides a gvar table, but no glyf table. Glyph variation only works with TrueType outlines.");let Ve=yt(u,F);o.tables.cvar=oc.parse(Ve.data,Ve.offset,o.tables.fvar,o.tables.cvt||[])}if(z){I||console.warn("This font provides an avar table, but no fvar table, which is required for variable fonts.");let Ve=yt(u,z);o.tables.avar=ac.parse(Ve.data,Ve.offset,o.tables.fvar)}if(xt){I||console.warn("This font provides an HVAR table, but no fvar table, which is required for variable fonts."),ct||console.warn("This font provides an HVAR table, but no hmtx table to vary.");let Ve=yt(u,xt);o.tables.hvar=kg.parse(Ve.data,Ve.offset,o.tables.fvar)}if(Nn){let Ve=yt(u,Nn);o.tables.meta=nc.parse(Ve.data,Ve.offset),o.metas=o.tables.meta}return o.palettes=new _c(o),o}function s0(){console.error("DEPRECATED! migrate to: opentype.parse(buffer, opt) See: https://github.com/opentypejs/opentype.js/issues/675")}function r0(){console.error('DEPRECATED! migrate to: opentype.parse(require("fs").readFileSync(url), opt)')}return p(d)})();(function(l,e){typeof define=="function"&&define.amd?define(e):typeof ka=="object"&&ka.exports?ka.exports=e():l.opentype=e()})(typeof self<"u"?self:Jh,()=>({...jh,default:jh}))});var v1={};d0(v1,{CSG:()=>Fa,opentype:()=>Qh.default});var g0=0,ou=1,y0=2;var Rh=1,x0=2,ci=3,Bi=0,gn=1,hi=2;var Ni=0,ks=1,lu=2,cu=3,uu=4,v0=5,ns=100,_0=101,b0=102,hu=103,fu=104,S0=200,M0=201,T0=202,E0=203,Xo=204,qo=205,w0=206,A0=207,C0=208,R0=209,L0=210,I0=211,P0=212,U0=213,D0=214,O0=0,N0=1,F0=2,ha=3,k0=4,B0=5,z0=6,V0=7,Lh=0,G0=1,H0=2,Fi=0,W0=1,X0=2,q0=3,Y0=4,Z0=5,$0=6;var Ih=300,Vs=301,Gs=302,Yo=303,Zo=304,Pa=306,$o=1e3,Gn=1001,jo=1002,fn=1003,du=1004;var po=1005;var Rn=1006,j0=1007;var dr=1008;var ki=1009,J0=1010,K0=1011,Rl=1012,Ph=1013,Di=1014,Oi=1015,pr=1016,Uh=1017,Dh=1018,ss=1020,Q0=1021,Hn=1023,ey=1024,ty=1025,rs=1026,Hs=1027,ny=1028,Oh=1029,iy=1030,Nh=1031,Fh=1033,mo=33776,go=33777,yo=33778,xo=33779,pu=35840,mu=35841,gu=35842,yu=35843,kh=36196,xu=37492,vu=37496,_u=37808,bu=37809,Su=37810,Mu=37811,Tu=37812,Eu=37813,wu=37814,Au=37815,Cu=37816,Ru=37817,Lu=37818,Iu=37819,Pu=37820,Uu=37821,vo=36492,Du=36494,Ou=36495,sy=36283,Nu=36284,Fu=36285,ku=36286;var fa=2300,da=2301,_o=2302,Bu=2400,zu=2401,Vu=2402;var Bh=3e3,as=3001,ry=3200,ay=3201,oy=0,ly=1,Ln="",Yt="srgb",pi="srgb-linear",Ll="display-p3",Ua="display-p3-linear",pa="linear",It="srgb",ma="rec709",ga="p3";var xs=7680;var Gu=519,cy=512,uy=513,hy=514,zh=515,fy=516,dy=517,py=518,my=519,Hu=35044;var Wu="300 es",Jo=1035,fi=2e3,ya=2001,zi=class{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});let a=this._listeners;a[e]===void 0&&(a[e]=[]),a[e].indexOf(n)===-1&&a[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;let a=this._listeners;return a[e]!==void 0&&a[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;let c=this._listeners[e];if(c!==void 0){let h=c.indexOf(n);h!==-1&&c.splice(h,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let a=this._listeners[e.type];if(a!==void 0){e.target=this;let c=a.slice(0);for(let h=0,p=c.length;h<p;h++)c[h].call(this,e);e.target=null}}},Qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var bo=Math.PI/180,Ko=180/Math.PI;function xr(){let l=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(Qt[l&255]+Qt[l>>8&255]+Qt[l>>16&255]+Qt[l>>24&255]+"-"+Qt[e&255]+Qt[e>>8&255]+"-"+Qt[e>>16&15|64]+Qt[e>>24&255]+"-"+Qt[n&63|128]+Qt[n>>8&255]+"-"+Qt[n>>16&255]+Qt[n>>24&255]+Qt[a&255]+Qt[a>>8&255]+Qt[a>>16&255]+Qt[a>>24&255]).toLowerCase()}function mn(l,e,n){return Math.max(e,Math.min(n,l))}function gy(l,e){return(l%e+e)%e}function So(l,e,n){return(1-n)*l+n*e}function Xu(l){return(l&l-1)===0&&l!==0}function Qo(l){return Math.pow(2,Math.floor(Math.log(l)/Math.LN2))}function ar(l,e){switch(e.constructor){case Float32Array:return l;case Uint32Array:return l/4294967295;case Uint16Array:return l/65535;case Uint8Array:return l/255;case Int32Array:return Math.max(l/2147483647,-1);case Int16Array:return Math.max(l/32767,-1);case Int8Array:return Math.max(l/127,-1);default:throw new Error("Invalid component type.")}}function pn(l,e){switch(e.constructor){case Float32Array:return l;case Uint32Array:return Math.round(l*4294967295);case Uint16Array:return Math.round(l*65535);case Uint8Array:return Math.round(l*255);case Int32Array:return Math.round(l*2147483647);case Int16Array:return Math.round(l*32767);case Int8Array:return Math.round(l*127);default:throw new Error("Invalid component type.")}}var Ct=class l{constructor(e=0,n=0){l.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let n=this.x,a=this.y,c=e.elements;return this.x=c[0]*n+c[3]*a+c[6],this.y=c[1]*n+c[4]*a+c[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){let a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(e,Math.min(n,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;let a=this.dot(e)/n;return Math.acos(mn(a,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let n=this.x-e.x,a=this.y-e.y;return n*n+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,a){return this.x=e.x+(n.x-e.x)*a,this.y=e.y+(n.y-e.y)*a,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){let a=Math.cos(n),c=Math.sin(n),h=this.x-e.x,p=this.y-e.y;return this.x=h*a-p*c+e.x,this.y=h*c+p*a+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ft=class l{constructor(e,n,a,c,h,p,d,y,x){l.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,a,c,h,p,d,y,x)}set(e,n,a,c,h,p,d,y,x){let _=this.elements;return _[0]=e,_[1]=c,_[2]=d,_[3]=n,_[4]=h,_[5]=y,_[6]=a,_[7]=p,_[8]=x,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let n=this.elements,a=e.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],this}extractBasis(e,n,a){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){let a=e.elements,c=n.elements,h=this.elements,p=a[0],d=a[3],y=a[6],x=a[1],_=a[4],M=a[7],T=a[2],w=a[5],A=a[8],C=c[0],E=c[3],b=c[6],k=c[1],P=c[4],V=c[7],Z=c[2],X=c[5],W=c[8];return h[0]=p*C+d*k+y*Z,h[3]=p*E+d*P+y*X,h[6]=p*b+d*V+y*W,h[1]=x*C+_*k+M*Z,h[4]=x*E+_*P+M*X,h[7]=x*b+_*V+M*W,h[2]=T*C+w*k+A*Z,h[5]=T*E+w*P+A*X,h[8]=T*b+w*V+A*W,this}multiplyScalar(e){let n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){let e=this.elements,n=e[0],a=e[1],c=e[2],h=e[3],p=e[4],d=e[5],y=e[6],x=e[7],_=e[8];return n*p*_-n*d*x-a*h*_+a*d*y+c*h*x-c*p*y}invert(){let e=this.elements,n=e[0],a=e[1],c=e[2],h=e[3],p=e[4],d=e[5],y=e[6],x=e[7],_=e[8],M=_*p-d*x,T=d*y-_*h,w=x*h-p*y,A=n*M+a*T+c*w;if(A===0)return this.set(0,0,0,0,0,0,0,0,0);let C=1/A;return e[0]=M*C,e[1]=(c*x-_*a)*C,e[2]=(d*a-c*p)*C,e[3]=T*C,e[4]=(_*n-c*y)*C,e[5]=(c*h-d*n)*C,e[6]=w*C,e[7]=(a*y-x*n)*C,e[8]=(p*n-a*h)*C,this}transpose(){let e,n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,a,c,h,p,d){let y=Math.cos(h),x=Math.sin(h);return this.set(a*y,a*x,-a*(y*p+x*d)+p+e,-c*x,c*y,-c*(-x*p+y*d)+d+n,0,0,1),this}scale(e,n){return this.premultiply(Mo.makeScale(e,n)),this}rotate(e){return this.premultiply(Mo.makeRotation(-e)),this}translate(e,n){return this.premultiply(Mo.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){let n=Math.cos(e),a=Math.sin(e);return this.set(n,-a,0,a,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){let n=this.elements,a=e.elements;for(let c=0;c<9;c++)if(n[c]!==a[c])return!1;return!0}fromArray(e,n=0){for(let a=0;a<9;a++)this.elements[a]=e[a+n];return this}toArray(e=[],n=0){let a=this.elements;return e[n]=a[0],e[n+1]=a[1],e[n+2]=a[2],e[n+3]=a[3],e[n+4]=a[4],e[n+5]=a[5],e[n+6]=a[6],e[n+7]=a[7],e[n+8]=a[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Mo=new ft;function Vh(l){for(let e=l.length-1;e>=0;--e)if(l[e]>=65535)return!0;return!1}function xa(l){return document.createElementNS("http://www.w3.org/1999/xhtml",l)}function yy(){let l=xa("canvas");return l.style.display="block",l}var qu={};function hr(l){l in qu||(qu[l]=!0,console.warn(l))}var Yu=new ft().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Zu=new ft().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Gr={[pi]:{transfer:pa,primaries:ma,toReference:l=>l,fromReference:l=>l},[Yt]:{transfer:It,primaries:ma,toReference:l=>l.convertSRGBToLinear(),fromReference:l=>l.convertLinearToSRGB()},[Ua]:{transfer:pa,primaries:ga,toReference:l=>l.applyMatrix3(Zu),fromReference:l=>l.applyMatrix3(Yu)},[Ll]:{transfer:It,primaries:ga,toReference:l=>l.convertSRGBToLinear().applyMatrix3(Zu),fromReference:l=>l.applyMatrix3(Yu).convertLinearToSRGB()}},xy=new Set([pi,Ua]),At={enabled:!0,_workingColorSpace:pi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(l){if(!xy.has(l))throw new Error(`Unsupported working color space, "${l}".`);this._workingColorSpace=l},convert:function(l,e,n){if(this.enabled===!1||e===n||!e||!n)return l;let a=Gr[e].toReference,c=Gr[n].fromReference;return c(a(l))},fromWorkingColorSpace:function(l,e){return this.convert(l,this._workingColorSpace,e)},toWorkingColorSpace:function(l,e){return this.convert(l,e,this._workingColorSpace)},getPrimaries:function(l){return Gr[l].primaries},getTransfer:function(l){return l===Ln?pa:Gr[l].transfer}};function Bs(l){return l<.04045?l*.0773993808:Math.pow(l*.9478672986+.0521327014,2.4)}function To(l){return l<.0031308?l*12.92:1.055*Math.pow(l,.41666)-.055}var vs,va=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{vs===void 0&&(vs=xa("canvas")),vs.width=e.width,vs.height=e.height;let a=vs.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),n=vs}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let n=xa("canvas");n.width=e.width,n.height=e.height;let a=n.getContext("2d");a.drawImage(e,0,0,e.width,e.height);let c=a.getImageData(0,0,e.width,e.height),h=c.data;for(let p=0;p<h.length;p++)h[p]=Bs(h[p]/255)*255;return a.putImageData(c,0,0),n}else if(e.data){let n=e.data.slice(0);for(let a=0;a<n.length;a++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[a]=Math.floor(Bs(n[a]/255)*255):n[a]=Bs(n[a]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},vy=0,_a=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vy++}),this.uuid=xr(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let a={uuid:this.uuid,url:""},c=this.data;if(c!==null){let h;if(Array.isArray(c)){h=[];for(let p=0,d=c.length;p<d;p++)c[p].isDataTexture?h.push(Eo(c[p].image)):h.push(Eo(c[p]))}else h=Eo(c);a.url=h}return n||(e.images[this.uuid]=a),a}};function Eo(l){return typeof HTMLImageElement<"u"&&l instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&l instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&l instanceof ImageBitmap?va.getDataURL(l):l.data?{data:Array.from(l.data),width:l.width,height:l.height,type:l.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var _y=0,Wn=class l extends zi{constructor(e=l.DEFAULT_IMAGE,n=l.DEFAULT_MAPPING,a=Gn,c=Gn,h=Rn,p=dr,d=Hn,y=ki,x=l.DEFAULT_ANISOTROPY,_=Ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_y++}),this.uuid=xr(),this.name="",this.source=new _a(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=a,this.wrapT=c,this.magFilter=h,this.minFilter=p,this.anisotropy=x,this.format=d,this.internalFormat=null,this.type=y,this.offset=new Ct(0,0),this.repeat=new Ct(1,1),this.center=new Ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof _=="string"?this.colorSpace=_:(hr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=_===as?Yt:Ln),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let a={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),n||(e.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ih)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case $o:e.x=e.x-Math.floor(e.x);break;case Gn:e.x=e.x<0?0:1;break;case jo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case $o:e.y=e.y-Math.floor(e.y);break;case Gn:e.y=e.y<0?0:1;break;case jo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return hr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Yt?as:Bh}set encoding(e){hr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===as?Yt:Ln}};Wn.DEFAULT_IMAGE=null;Wn.DEFAULT_MAPPING=Ih;Wn.DEFAULT_ANISOTROPY=1;var Zt=class l{constructor(e=0,n=0,a=0,c=1){l.prototype.isVector4=!0,this.x=e,this.y=n,this.z=a,this.w=c}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,a,c){return this.x=e,this.y=n,this.z=a,this.w=c,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let n=this.x,a=this.y,c=this.z,h=this.w,p=e.elements;return this.x=p[0]*n+p[4]*a+p[8]*c+p[12]*h,this.y=p[1]*n+p[5]*a+p[9]*c+p[13]*h,this.z=p[2]*n+p[6]*a+p[10]*c+p[14]*h,this.w=p[3]*n+p[7]*a+p[11]*c+p[15]*h,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,a,c,h,y=e.elements,x=y[0],_=y[4],M=y[8],T=y[1],w=y[5],A=y[9],C=y[2],E=y[6],b=y[10];if(Math.abs(_-T)<.01&&Math.abs(M-C)<.01&&Math.abs(A-E)<.01){if(Math.abs(_+T)<.1&&Math.abs(M+C)<.1&&Math.abs(A+E)<.1&&Math.abs(x+w+b-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;let P=(x+1)/2,V=(w+1)/2,Z=(b+1)/2,X=(_+T)/4,W=(M+C)/4,fe=(A+E)/4;return P>V&&P>Z?P<.01?(a=0,c=.707106781,h=.707106781):(a=Math.sqrt(P),c=X/a,h=W/a):V>Z?V<.01?(a=.707106781,c=0,h=.707106781):(c=Math.sqrt(V),a=X/c,h=fe/c):Z<.01?(a=.707106781,c=.707106781,h=0):(h=Math.sqrt(Z),a=W/h,c=fe/h),this.set(a,c,h,n),this}let k=Math.sqrt((E-A)*(E-A)+(M-C)*(M-C)+(T-_)*(T-_));return Math.abs(k)<.001&&(k=1),this.x=(E-A)/k,this.y=(M-C)/k,this.z=(T-_)/k,this.w=Math.acos((x+w+b-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){let a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(e,Math.min(n,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,a){return this.x=e.x+(n.x-e.x)*a,this.y=e.y+(n.y-e.y)*a,this.z=e.z+(n.z-e.z)*a,this.w=e.w+(n.w-e.w)*a,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},el=class extends zi{constructor(e=1,n=1,a={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Zt(0,0,e,n),this.scissorTest=!1,this.viewport=new Zt(0,0,e,n);let c={width:e,height:n,depth:1};a.encoding!==void 0&&(hr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),a.colorSpace=a.encoding===as?Yt:Ln),a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},a),this.texture=new Wn(c,a.mapping,a.wrapS,a.wrapT,a.magFilter,a.minFilter,a.format,a.type,a.anisotropy,a.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=a.generateMipmaps,this.texture.internalFormat=a.internalFormat,this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.depthTexture=a.depthTexture,this.samples=a.samples}setSize(e,n,a=1){(this.width!==e||this.height!==n||this.depth!==a)&&(this.width=e,this.height=n,this.depth=a,this.texture.image.width=e,this.texture.image.height=n,this.texture.image.depth=a,this.dispose()),this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let n=Object.assign({},e.texture.image);return this.texture.source=new _a(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},mi=class extends el{constructor(e=1,n=1,a={}){super(e,n,a),this.isWebGLRenderTarget=!0}},ba=class extends Wn{constructor(e=null,n=1,a=1,c=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:a,depth:c},this.magFilter=fn,this.minFilter=fn,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var tl=class extends Wn{constructor(e=null,n=1,a=1,c=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:a,depth:c},this.magFilter=fn,this.minFilter=fn,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Vi=class{constructor(e=0,n=0,a=0,c=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=a,this._w=c}static slerpFlat(e,n,a,c,h,p,d){let y=a[c+0],x=a[c+1],_=a[c+2],M=a[c+3],T=h[p+0],w=h[p+1],A=h[p+2],C=h[p+3];if(d===0){e[n+0]=y,e[n+1]=x,e[n+2]=_,e[n+3]=M;return}if(d===1){e[n+0]=T,e[n+1]=w,e[n+2]=A,e[n+3]=C;return}if(M!==C||y!==T||x!==w||_!==A){let E=1-d,b=y*T+x*w+_*A+M*C,k=b>=0?1:-1,P=1-b*b;if(P>Number.EPSILON){let Z=Math.sqrt(P),X=Math.atan2(Z,b*k);E=Math.sin(E*X)/Z,d=Math.sin(d*X)/Z}let V=d*k;if(y=y*E+T*V,x=x*E+w*V,_=_*E+A*V,M=M*E+C*V,E===1-d){let Z=1/Math.sqrt(y*y+x*x+_*_+M*M);y*=Z,x*=Z,_*=Z,M*=Z}}e[n]=y,e[n+1]=x,e[n+2]=_,e[n+3]=M}static multiplyQuaternionsFlat(e,n,a,c,h,p){let d=a[c],y=a[c+1],x=a[c+2],_=a[c+3],M=h[p],T=h[p+1],w=h[p+2],A=h[p+3];return e[n]=d*A+_*M+y*w-x*T,e[n+1]=y*A+_*T+x*M-d*w,e[n+2]=x*A+_*w+d*T-y*M,e[n+3]=_*A-d*M-y*T-x*w,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,a,c){return this._x=e,this._y=n,this._z=a,this._w=c,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){let a=e._x,c=e._y,h=e._z,p=e._order,d=Math.cos,y=Math.sin,x=d(a/2),_=d(c/2),M=d(h/2),T=y(a/2),w=y(c/2),A=y(h/2);switch(p){case"XYZ":this._x=T*_*M+x*w*A,this._y=x*w*M-T*_*A,this._z=x*_*A+T*w*M,this._w=x*_*M-T*w*A;break;case"YXZ":this._x=T*_*M+x*w*A,this._y=x*w*M-T*_*A,this._z=x*_*A-T*w*M,this._w=x*_*M+T*w*A;break;case"ZXY":this._x=T*_*M-x*w*A,this._y=x*w*M+T*_*A,this._z=x*_*A+T*w*M,this._w=x*_*M-T*w*A;break;case"ZYX":this._x=T*_*M-x*w*A,this._y=x*w*M+T*_*A,this._z=x*_*A-T*w*M,this._w=x*_*M+T*w*A;break;case"YZX":this._x=T*_*M+x*w*A,this._y=x*w*M+T*_*A,this._z=x*_*A-T*w*M,this._w=x*_*M-T*w*A;break;case"XZY":this._x=T*_*M-x*w*A,this._y=x*w*M-T*_*A,this._z=x*_*A+T*w*M,this._w=x*_*M+T*w*A;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+p)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){let a=n/2,c=Math.sin(a);return this._x=e.x*c,this._y=e.y*c,this._z=e.z*c,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(e){let n=e.elements,a=n[0],c=n[4],h=n[8],p=n[1],d=n[5],y=n[9],x=n[2],_=n[6],M=n[10],T=a+d+M;if(T>0){let w=.5/Math.sqrt(T+1);this._w=.25/w,this._x=(_-y)*w,this._y=(h-x)*w,this._z=(p-c)*w}else if(a>d&&a>M){let w=2*Math.sqrt(1+a-d-M);this._w=(_-y)/w,this._x=.25*w,this._y=(c+p)/w,this._z=(h+x)/w}else if(d>M){let w=2*Math.sqrt(1+d-a-M);this._w=(h-x)/w,this._x=(c+p)/w,this._y=.25*w,this._z=(y+_)/w}else{let w=2*Math.sqrt(1+M-a-d);this._w=(p-c)/w,this._x=(h+x)/w,this._y=(y+_)/w,this._z=.25*w}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let a=e.dot(n)+1;return a<Number.EPSILON?(a=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=a):(this._x=0,this._y=-e.z,this._z=e.y,this._w=a)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=a),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(mn(this.dot(e),-1,1)))}rotateTowards(e,n){let a=this.angleTo(e);if(a===0)return this;let c=Math.min(1,n/a);return this.slerp(e,c),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){let a=e._x,c=e._y,h=e._z,p=e._w,d=n._x,y=n._y,x=n._z,_=n._w;return this._x=a*_+p*d+c*x-h*y,this._y=c*_+p*y+h*d-a*x,this._z=h*_+p*x+a*y-c*d,this._w=p*_-a*d-c*y-h*x,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);let a=this._x,c=this._y,h=this._z,p=this._w,d=p*e._w+a*e._x+c*e._y+h*e._z;if(d<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,d=-d):this.copy(e),d>=1)return this._w=p,this._x=a,this._y=c,this._z=h,this;let y=1-d*d;if(y<=Number.EPSILON){let w=1-n;return this._w=w*p+n*this._w,this._x=w*a+n*this._x,this._y=w*c+n*this._y,this._z=w*h+n*this._z,this.normalize(),this}let x=Math.sqrt(y),_=Math.atan2(x,d),M=Math.sin((1-n)*_)/x,T=Math.sin(n*_)/x;return this._w=p*M+this._w*T,this._x=a*M+this._x*T,this._y=c*M+this._y*T,this._z=h*M+this._z*T,this._onChangeCallback(),this}slerpQuaternions(e,n,a){return this.copy(e).slerp(n,a)}random(){let e=Math.random(),n=Math.sqrt(1-e),a=Math.sqrt(e),c=2*Math.PI*Math.random(),h=2*Math.PI*Math.random();return this.set(n*Math.cos(c),a*Math.sin(h),a*Math.cos(h),n*Math.sin(c))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},ee=class l{constructor(e=0,n=0,a=0){l.prototype.isVector3=!0,this.x=e,this.y=n,this.z=a}set(e,n,a){return a===void 0&&(a=this.z),this.x=e,this.y=n,this.z=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion($u.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion($u.setFromAxisAngle(e,n))}applyMatrix3(e){let n=this.x,a=this.y,c=this.z,h=e.elements;return this.x=h[0]*n+h[3]*a+h[6]*c,this.y=h[1]*n+h[4]*a+h[7]*c,this.z=h[2]*n+h[5]*a+h[8]*c,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let n=this.x,a=this.y,c=this.z,h=e.elements,p=1/(h[3]*n+h[7]*a+h[11]*c+h[15]);return this.x=(h[0]*n+h[4]*a+h[8]*c+h[12])*p,this.y=(h[1]*n+h[5]*a+h[9]*c+h[13])*p,this.z=(h[2]*n+h[6]*a+h[10]*c+h[14])*p,this}applyQuaternion(e){let n=this.x,a=this.y,c=this.z,h=e.x,p=e.y,d=e.z,y=e.w,x=2*(p*c-d*a),_=2*(d*n-h*c),M=2*(h*a-p*n);return this.x=n+y*x+p*M-d*_,this.y=a+y*_+d*x-h*M,this.z=c+y*M+h*_-p*x,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let n=this.x,a=this.y,c=this.z,h=e.elements;return this.x=h[0]*n+h[4]*a+h[8]*c,this.y=h[1]*n+h[5]*a+h[9]*c,this.z=h[2]*n+h[6]*a+h[10]*c,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){let a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(e,Math.min(n,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,a){return this.x=e.x+(n.x-e.x)*a,this.y=e.y+(n.y-e.y)*a,this.z=e.z+(n.z-e.z)*a,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){let a=e.x,c=e.y,h=e.z,p=n.x,d=n.y,y=n.z;return this.x=c*y-h*d,this.y=h*p-a*y,this.z=a*d-c*p,this}projectOnVector(e){let n=e.lengthSq();if(n===0)return this.set(0,0,0);let a=e.dot(this)/n;return this.copy(e).multiplyScalar(a)}projectOnPlane(e){return wo.copy(this).projectOnVector(e),this.sub(wo)}reflect(e){return this.sub(wo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;let a=this.dot(e)/n;return Math.acos(mn(a,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let n=this.x-e.x,a=this.y-e.y,c=this.z-e.z;return n*n+a*a+c*c}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,a){let c=Math.sin(n)*e;return this.x=c*Math.sin(a),this.y=Math.cos(n)*e,this.z=c*Math.cos(a),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,a){return this.x=e*Math.sin(n),this.y=a,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){let n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){let n=this.setFromMatrixColumn(e,0).length(),a=this.setFromMatrixColumn(e,1).length(),c=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=a,this.z=c,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,n=Math.random()*Math.PI*2,a=Math.sqrt(1-e**2);return this.x=a*Math.cos(n),this.y=a*Math.sin(n),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},wo=new ee,$u=new Vi,os=class{constructor(e=new ee(1/0,1/0,1/0),n=new ee(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,a=e.length;n<a;n+=3)this.expandByPoint(Bn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,a=e.count;n<a;n++)this.expandByPoint(Bn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,a=e.length;n<a;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){let a=Bn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(a),this.max.copy(e).add(a),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);let a=e.geometry;if(a!==void 0){let h=a.getAttribute("position");if(n===!0&&h!==void 0&&e.isInstancedMesh!==!0)for(let p=0,d=h.count;p<d;p++)e.isMesh===!0?e.getVertexPosition(p,Bn):Bn.fromBufferAttribute(h,p),Bn.applyMatrix4(e.matrixWorld),this.expandByPoint(Bn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Hr.copy(e.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),Hr.copy(a.boundingBox)),Hr.applyMatrix4(e.matrixWorld),this.union(Hr)}let c=e.children;for(let h=0,p=c.length;h<p;h++)this.expandByObject(c[h],n);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Bn),Bn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,a;return e.normal.x>0?(n=e.normal.x*this.min.x,a=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,a=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,a+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,a+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,a+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,a+=e.normal.z*this.min.z),n<=-e.constant&&a>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(or),Wr.subVectors(this.max,or),_s.subVectors(e.a,or),bs.subVectors(e.b,or),Ss.subVectors(e.c,or),Ri.subVectors(bs,_s),Li.subVectors(Ss,bs),Ji.subVectors(_s,Ss);let n=[0,-Ri.z,Ri.y,0,-Li.z,Li.y,0,-Ji.z,Ji.y,Ri.z,0,-Ri.x,Li.z,0,-Li.x,Ji.z,0,-Ji.x,-Ri.y,Ri.x,0,-Li.y,Li.x,0,-Ji.y,Ji.x,0];return!Ao(n,_s,bs,Ss,Wr)||(n=[1,0,0,0,1,0,0,0,1],!Ao(n,_s,bs,Ss,Wr))?!1:(Xr.crossVectors(Ri,Li),n=[Xr.x,Xr.y,Xr.z],Ao(n,_s,bs,Ss,Wr))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Bn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Bn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},si=[new ee,new ee,new ee,new ee,new ee,new ee,new ee,new ee],Bn=new ee,Hr=new os,_s=new ee,bs=new ee,Ss=new ee,Ri=new ee,Li=new ee,Ji=new ee,or=new ee,Wr=new ee,Xr=new ee,Ki=new ee;function Ao(l,e,n,a,c){for(let h=0,p=l.length-3;h<=p;h+=3){Ki.fromArray(l,h);let d=c.x*Math.abs(Ki.x)+c.y*Math.abs(Ki.y)+c.z*Math.abs(Ki.z),y=e.dot(Ki),x=n.dot(Ki),_=a.dot(Ki);if(Math.max(-Math.max(y,x,_),Math.min(y,x,_))>d)return!1}return!0}var by=new os,lr=new ee,Co=new ee,mr=class{constructor(e=new ee,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){let a=this.center;n!==void 0?a.copy(n):by.setFromPoints(e).getCenter(a);let c=0;for(let h=0,p=e.length;h<p;h++)c=Math.max(c,a.distanceToSquared(e[h]));return this.radius=Math.sqrt(c),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){let a=this.center.distanceToSquared(e);return n.copy(e),a>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;lr.subVectors(e,this.center);let n=lr.lengthSq();if(n>this.radius*this.radius){let a=Math.sqrt(n),c=(a-this.radius)*.5;this.center.addScaledVector(lr,c/a),this.radius+=c}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Co.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(lr.copy(e.center).add(Co)),this.expandByPoint(lr.copy(e.center).sub(Co))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},ri=new ee,Ro=new ee,qr=new ee,Ii=new ee,Lo=new ee,Yr=new ee,Io=new ee,nl=class{constructor(e=new ee,n=new ee(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ri)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);let a=n.dot(this.direction);return a<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,a)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let n=ri.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(ri.copy(this.origin).addScaledVector(this.direction,n),ri.distanceToSquared(e))}distanceSqToSegment(e,n,a,c){Ro.copy(e).add(n).multiplyScalar(.5),qr.copy(n).sub(e).normalize(),Ii.copy(this.origin).sub(Ro);let h=e.distanceTo(n)*.5,p=-this.direction.dot(qr),d=Ii.dot(this.direction),y=-Ii.dot(qr),x=Ii.lengthSq(),_=Math.abs(1-p*p),M,T,w,A;if(_>0)if(M=p*y-d,T=p*d-y,A=h*_,M>=0)if(T>=-A)if(T<=A){let C=1/_;M*=C,T*=C,w=M*(M+p*T+2*d)+T*(p*M+T+2*y)+x}else T=h,M=Math.max(0,-(p*T+d)),w=-M*M+T*(T+2*y)+x;else T=-h,M=Math.max(0,-(p*T+d)),w=-M*M+T*(T+2*y)+x;else T<=-A?(M=Math.max(0,-(-p*h+d)),T=M>0?-h:Math.min(Math.max(-h,-y),h),w=-M*M+T*(T+2*y)+x):T<=A?(M=0,T=Math.min(Math.max(-h,-y),h),w=T*(T+2*y)+x):(M=Math.max(0,-(p*h+d)),T=M>0?h:Math.min(Math.max(-h,-y),h),w=-M*M+T*(T+2*y)+x);else T=p>0?-h:h,M=Math.max(0,-(p*T+d)),w=-M*M+T*(T+2*y)+x;return a&&a.copy(this.origin).addScaledVector(this.direction,M),c&&c.copy(Ro).addScaledVector(qr,T),w}intersectSphere(e,n){ri.subVectors(e.center,this.origin);let a=ri.dot(this.direction),c=ri.dot(ri)-a*a,h=e.radius*e.radius;if(c>h)return null;let p=Math.sqrt(h-c),d=a-p,y=a+p;return y<0?null:d<0?this.at(y,n):this.at(d,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;let a=-(this.origin.dot(e.normal)+e.constant)/n;return a>=0?a:null}intersectPlane(e,n){let a=this.distanceToPlane(e);return a===null?null:this.at(a,n)}intersectsPlane(e){let n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let a,c,h,p,d,y,x=1/this.direction.x,_=1/this.direction.y,M=1/this.direction.z,T=this.origin;return x>=0?(a=(e.min.x-T.x)*x,c=(e.max.x-T.x)*x):(a=(e.max.x-T.x)*x,c=(e.min.x-T.x)*x),_>=0?(h=(e.min.y-T.y)*_,p=(e.max.y-T.y)*_):(h=(e.max.y-T.y)*_,p=(e.min.y-T.y)*_),a>p||h>c||((h>a||isNaN(a))&&(a=h),(p<c||isNaN(c))&&(c=p),M>=0?(d=(e.min.z-T.z)*M,y=(e.max.z-T.z)*M):(d=(e.max.z-T.z)*M,y=(e.min.z-T.z)*M),a>y||d>c)||((d>a||a!==a)&&(a=d),(y<c||c!==c)&&(c=y),c<0)?null:this.at(a>=0?a:c,n)}intersectsBox(e){return this.intersectBox(e,ri)!==null}intersectTriangle(e,n,a,c,h){Lo.subVectors(n,e),Yr.subVectors(a,e),Io.crossVectors(Lo,Yr);let p=this.direction.dot(Io),d;if(p>0){if(c)return null;d=1}else if(p<0)d=-1,p=-p;else return null;Ii.subVectors(this.origin,e);let y=d*this.direction.dot(Yr.crossVectors(Ii,Yr));if(y<0)return null;let x=d*this.direction.dot(Lo.cross(Ii));if(x<0||y+x>p)return null;let _=-d*Ii.dot(Io);return _<0?null:this.at(_/p,h)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},qt=class l{constructor(e,n,a,c,h,p,d,y,x,_,M,T,w,A,C,E){l.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,a,c,h,p,d,y,x,_,M,T,w,A,C,E)}set(e,n,a,c,h,p,d,y,x,_,M,T,w,A,C,E){let b=this.elements;return b[0]=e,b[4]=n,b[8]=a,b[12]=c,b[1]=h,b[5]=p,b[9]=d,b[13]=y,b[2]=x,b[6]=_,b[10]=M,b[14]=T,b[3]=w,b[7]=A,b[11]=C,b[15]=E,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new l().fromArray(this.elements)}copy(e){let n=this.elements,a=e.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],n[9]=a[9],n[10]=a[10],n[11]=a[11],n[12]=a[12],n[13]=a[13],n[14]=a[14],n[15]=a[15],this}copyPosition(e){let n=this.elements,a=e.elements;return n[12]=a[12],n[13]=a[13],n[14]=a[14],this}setFromMatrix3(e){let n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,a){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this}makeBasis(e,n,a){return this.set(e.x,n.x,a.x,0,e.y,n.y,a.y,0,e.z,n.z,a.z,0,0,0,0,1),this}extractRotation(e){let n=this.elements,a=e.elements,c=1/Ms.setFromMatrixColumn(e,0).length(),h=1/Ms.setFromMatrixColumn(e,1).length(),p=1/Ms.setFromMatrixColumn(e,2).length();return n[0]=a[0]*c,n[1]=a[1]*c,n[2]=a[2]*c,n[3]=0,n[4]=a[4]*h,n[5]=a[5]*h,n[6]=a[6]*h,n[7]=0,n[8]=a[8]*p,n[9]=a[9]*p,n[10]=a[10]*p,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){let n=this.elements,a=e.x,c=e.y,h=e.z,p=Math.cos(a),d=Math.sin(a),y=Math.cos(c),x=Math.sin(c),_=Math.cos(h),M=Math.sin(h);if(e.order==="XYZ"){let T=p*_,w=p*M,A=d*_,C=d*M;n[0]=y*_,n[4]=-y*M,n[8]=x,n[1]=w+A*x,n[5]=T-C*x,n[9]=-d*y,n[2]=C-T*x,n[6]=A+w*x,n[10]=p*y}else if(e.order==="YXZ"){let T=y*_,w=y*M,A=x*_,C=x*M;n[0]=T+C*d,n[4]=A*d-w,n[8]=p*x,n[1]=p*M,n[5]=p*_,n[9]=-d,n[2]=w*d-A,n[6]=C+T*d,n[10]=p*y}else if(e.order==="ZXY"){let T=y*_,w=y*M,A=x*_,C=x*M;n[0]=T-C*d,n[4]=-p*M,n[8]=A+w*d,n[1]=w+A*d,n[5]=p*_,n[9]=C-T*d,n[2]=-p*x,n[6]=d,n[10]=p*y}else if(e.order==="ZYX"){let T=p*_,w=p*M,A=d*_,C=d*M;n[0]=y*_,n[4]=A*x-w,n[8]=T*x+C,n[1]=y*M,n[5]=C*x+T,n[9]=w*x-A,n[2]=-x,n[6]=d*y,n[10]=p*y}else if(e.order==="YZX"){let T=p*y,w=p*x,A=d*y,C=d*x;n[0]=y*_,n[4]=C-T*M,n[8]=A*M+w,n[1]=M,n[5]=p*_,n[9]=-d*_,n[2]=-x*_,n[6]=w*M+A,n[10]=T-C*M}else if(e.order==="XZY"){let T=p*y,w=p*x,A=d*y,C=d*x;n[0]=y*_,n[4]=-M,n[8]=x*_,n[1]=T*M+C,n[5]=p*_,n[9]=w*M-A,n[2]=A*M-w,n[6]=d*_,n[10]=C*M+T}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Sy,e,My)}lookAt(e,n,a){let c=this.elements;return bn.subVectors(e,n),bn.lengthSq()===0&&(bn.z=1),bn.normalize(),Pi.crossVectors(a,bn),Pi.lengthSq()===0&&(Math.abs(a.z)===1?bn.x+=1e-4:bn.z+=1e-4,bn.normalize(),Pi.crossVectors(a,bn)),Pi.normalize(),Zr.crossVectors(bn,Pi),c[0]=Pi.x,c[4]=Zr.x,c[8]=bn.x,c[1]=Pi.y,c[5]=Zr.y,c[9]=bn.y,c[2]=Pi.z,c[6]=Zr.z,c[10]=bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){let a=e.elements,c=n.elements,h=this.elements,p=a[0],d=a[4],y=a[8],x=a[12],_=a[1],M=a[5],T=a[9],w=a[13],A=a[2],C=a[6],E=a[10],b=a[14],k=a[3],P=a[7],V=a[11],Z=a[15],X=c[0],W=c[4],fe=c[8],D=c[12],N=c[1],ae=c[5],ge=c[9],we=c[13],q=c[2],te=c[6],le=c[10],ue=c[14],ce=c[3],se=c[7],pe=c[11],Me=c[15];return h[0]=p*X+d*N+y*q+x*ce,h[4]=p*W+d*ae+y*te+x*se,h[8]=p*fe+d*ge+y*le+x*pe,h[12]=p*D+d*we+y*ue+x*Me,h[1]=_*X+M*N+T*q+w*ce,h[5]=_*W+M*ae+T*te+w*se,h[9]=_*fe+M*ge+T*le+w*pe,h[13]=_*D+M*we+T*ue+w*Me,h[2]=A*X+C*N+E*q+b*ce,h[6]=A*W+C*ae+E*te+b*se,h[10]=A*fe+C*ge+E*le+b*pe,h[14]=A*D+C*we+E*ue+b*Me,h[3]=k*X+P*N+V*q+Z*ce,h[7]=k*W+P*ae+V*te+Z*se,h[11]=k*fe+P*ge+V*le+Z*pe,h[15]=k*D+P*we+V*ue+Z*Me,this}multiplyScalar(e){let n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){let e=this.elements,n=e[0],a=e[4],c=e[8],h=e[12],p=e[1],d=e[5],y=e[9],x=e[13],_=e[2],M=e[6],T=e[10],w=e[14],A=e[3],C=e[7],E=e[11],b=e[15];return A*(+h*y*M-c*x*M-h*d*T+a*x*T+c*d*w-a*y*w)+C*(+n*y*w-n*x*T+h*p*T-c*p*w+c*x*_-h*y*_)+E*(+n*x*M-n*d*w-h*p*M+a*p*w+h*d*_-a*x*_)+b*(-c*d*_-n*y*M+n*d*T+c*p*M-a*p*T+a*y*_)}transpose(){let e=this.elements,n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,a){let c=this.elements;return e.isVector3?(c[12]=e.x,c[13]=e.y,c[14]=e.z):(c[12]=e,c[13]=n,c[14]=a),this}invert(){let e=this.elements,n=e[0],a=e[1],c=e[2],h=e[3],p=e[4],d=e[5],y=e[6],x=e[7],_=e[8],M=e[9],T=e[10],w=e[11],A=e[12],C=e[13],E=e[14],b=e[15],k=M*E*x-C*T*x+C*y*w-d*E*w-M*y*b+d*T*b,P=A*T*x-_*E*x-A*y*w+p*E*w+_*y*b-p*T*b,V=_*C*x-A*M*x+A*d*w-p*C*w-_*d*b+p*M*b,Z=A*M*y-_*C*y-A*d*T+p*C*T+_*d*E-p*M*E,X=n*k+a*P+c*V+h*Z;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let W=1/X;return e[0]=k*W,e[1]=(C*T*h-M*E*h-C*c*w+a*E*w+M*c*b-a*T*b)*W,e[2]=(d*E*h-C*y*h+C*c*x-a*E*x-d*c*b+a*y*b)*W,e[3]=(M*y*h-d*T*h-M*c*x+a*T*x+d*c*w-a*y*w)*W,e[4]=P*W,e[5]=(_*E*h-A*T*h+A*c*w-n*E*w-_*c*b+n*T*b)*W,e[6]=(A*y*h-p*E*h-A*c*x+n*E*x+p*c*b-n*y*b)*W,e[7]=(p*T*h-_*y*h+_*c*x-n*T*x-p*c*w+n*y*w)*W,e[8]=V*W,e[9]=(A*M*h-_*C*h-A*a*w+n*C*w+_*a*b-n*M*b)*W,e[10]=(p*C*h-A*d*h+A*a*x-n*C*x-p*a*b+n*d*b)*W,e[11]=(_*d*h-p*M*h-_*a*x+n*M*x+p*a*w-n*d*w)*W,e[12]=Z*W,e[13]=(_*C*c-A*M*c+A*a*T-n*C*T-_*a*E+n*M*E)*W,e[14]=(A*d*c-p*C*c-A*a*y+n*C*y+p*a*E-n*d*E)*W,e[15]=(p*M*c-_*d*c+_*a*y-n*M*y-p*a*T+n*d*T)*W,this}scale(e){let n=this.elements,a=e.x,c=e.y,h=e.z;return n[0]*=a,n[4]*=c,n[8]*=h,n[1]*=a,n[5]*=c,n[9]*=h,n[2]*=a,n[6]*=c,n[10]*=h,n[3]*=a,n[7]*=c,n[11]*=h,this}getMaxScaleOnAxis(){let e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],a=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],c=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,a,c))}makeTranslation(e,n,a){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,a,0,0,0,1),this}makeRotationX(e){let n=Math.cos(e),a=Math.sin(e);return this.set(1,0,0,0,0,n,-a,0,0,a,n,0,0,0,0,1),this}makeRotationY(e){let n=Math.cos(e),a=Math.sin(e);return this.set(n,0,a,0,0,1,0,0,-a,0,n,0,0,0,0,1),this}makeRotationZ(e){let n=Math.cos(e),a=Math.sin(e);return this.set(n,-a,0,0,a,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){let a=Math.cos(n),c=Math.sin(n),h=1-a,p=e.x,d=e.y,y=e.z,x=h*p,_=h*d;return this.set(x*p+a,x*d-c*y,x*y+c*d,0,x*d+c*y,_*d+a,_*y-c*p,0,x*y-c*d,_*y+c*p,h*y*y+a,0,0,0,0,1),this}makeScale(e,n,a){return this.set(e,0,0,0,0,n,0,0,0,0,a,0,0,0,0,1),this}makeShear(e,n,a,c,h,p){return this.set(1,a,h,0,e,1,p,0,n,c,1,0,0,0,0,1),this}compose(e,n,a){let c=this.elements,h=n._x,p=n._y,d=n._z,y=n._w,x=h+h,_=p+p,M=d+d,T=h*x,w=h*_,A=h*M,C=p*_,E=p*M,b=d*M,k=y*x,P=y*_,V=y*M,Z=a.x,X=a.y,W=a.z;return c[0]=(1-(C+b))*Z,c[1]=(w+V)*Z,c[2]=(A-P)*Z,c[3]=0,c[4]=(w-V)*X,c[5]=(1-(T+b))*X,c[6]=(E+k)*X,c[7]=0,c[8]=(A+P)*W,c[9]=(E-k)*W,c[10]=(1-(T+C))*W,c[11]=0,c[12]=e.x,c[13]=e.y,c[14]=e.z,c[15]=1,this}decompose(e,n,a){let c=this.elements,h=Ms.set(c[0],c[1],c[2]).length(),p=Ms.set(c[4],c[5],c[6]).length(),d=Ms.set(c[8],c[9],c[10]).length();this.determinant()<0&&(h=-h),e.x=c[12],e.y=c[13],e.z=c[14],zn.copy(this);let x=1/h,_=1/p,M=1/d;return zn.elements[0]*=x,zn.elements[1]*=x,zn.elements[2]*=x,zn.elements[4]*=_,zn.elements[5]*=_,zn.elements[6]*=_,zn.elements[8]*=M,zn.elements[9]*=M,zn.elements[10]*=M,n.setFromRotationMatrix(zn),a.x=h,a.y=p,a.z=d,this}makePerspective(e,n,a,c,h,p,d=fi){let y=this.elements,x=2*h/(n-e),_=2*h/(a-c),M=(n+e)/(n-e),T=(a+c)/(a-c),w,A;if(d===fi)w=-(p+h)/(p-h),A=-2*p*h/(p-h);else if(d===ya)w=-p/(p-h),A=-p*h/(p-h);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return y[0]=x,y[4]=0,y[8]=M,y[12]=0,y[1]=0,y[5]=_,y[9]=T,y[13]=0,y[2]=0,y[6]=0,y[10]=w,y[14]=A,y[3]=0,y[7]=0,y[11]=-1,y[15]=0,this}makeOrthographic(e,n,a,c,h,p,d=fi){let y=this.elements,x=1/(n-e),_=1/(a-c),M=1/(p-h),T=(n+e)*x,w=(a+c)*_,A,C;if(d===fi)A=(p+h)*M,C=-2*M;else if(d===ya)A=h*M,C=-1*M;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return y[0]=2*x,y[4]=0,y[8]=0,y[12]=-T,y[1]=0,y[5]=2*_,y[9]=0,y[13]=-w,y[2]=0,y[6]=0,y[10]=C,y[14]=-A,y[3]=0,y[7]=0,y[11]=0,y[15]=1,this}equals(e){let n=this.elements,a=e.elements;for(let c=0;c<16;c++)if(n[c]!==a[c])return!1;return!0}fromArray(e,n=0){for(let a=0;a<16;a++)this.elements[a]=e[a+n];return this}toArray(e=[],n=0){let a=this.elements;return e[n]=a[0],e[n+1]=a[1],e[n+2]=a[2],e[n+3]=a[3],e[n+4]=a[4],e[n+5]=a[5],e[n+6]=a[6],e[n+7]=a[7],e[n+8]=a[8],e[n+9]=a[9],e[n+10]=a[10],e[n+11]=a[11],e[n+12]=a[12],e[n+13]=a[13],e[n+14]=a[14],e[n+15]=a[15],e}},Ms=new ee,zn=new qt,Sy=new ee(0,0,0),My=new ee(1,1,1),Pi=new ee,Zr=new ee,bn=new ee,ju=new qt,Ju=new Vi,Sa=class l{constructor(e=0,n=0,a=0,c=l.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=a,this._order=c}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,a,c=this._order){return this._x=e,this._y=n,this._z=a,this._order=c,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,a=!0){let c=e.elements,h=c[0],p=c[4],d=c[8],y=c[1],x=c[5],_=c[9],M=c[2],T=c[6],w=c[10];switch(n){case"XYZ":this._y=Math.asin(mn(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-_,w),this._z=Math.atan2(-p,h)):(this._x=Math.atan2(T,x),this._z=0);break;case"YXZ":this._x=Math.asin(-mn(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(d,w),this._z=Math.atan2(y,x)):(this._y=Math.atan2(-M,h),this._z=0);break;case"ZXY":this._x=Math.asin(mn(T,-1,1)),Math.abs(T)<.9999999?(this._y=Math.atan2(-M,w),this._z=Math.atan2(-p,x)):(this._y=0,this._z=Math.atan2(y,h));break;case"ZYX":this._y=Math.asin(-mn(M,-1,1)),Math.abs(M)<.9999999?(this._x=Math.atan2(T,w),this._z=Math.atan2(y,h)):(this._x=0,this._z=Math.atan2(-p,x));break;case"YZX":this._z=Math.asin(mn(y,-1,1)),Math.abs(y)<.9999999?(this._x=Math.atan2(-_,x),this._y=Math.atan2(-M,h)):(this._x=0,this._y=Math.atan2(d,w));break;case"XZY":this._z=Math.asin(-mn(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(T,x),this._y=Math.atan2(d,h)):(this._x=Math.atan2(-_,w),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,a===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,a){return ju.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ju,n,a)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Ju.setFromEuler(this),this.setFromQuaternion(Ju,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Sa.DEFAULT_ORDER="XYZ";var Ma=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Ty=0,Ku=new ee,Ts=new Vi,ai=new qt,$r=new ee,cr=new ee,Ey=new ee,wy=new Vi,Qu=new ee(1,0,0),eh=new ee(0,1,0),th=new ee(0,0,1),Ay={type:"added"},Cy={type:"removed"},Kn=class l extends zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ty++}),this.uuid=xr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=l.DEFAULT_UP.clone();let e=new ee,n=new Sa,a=new Vi,c=new ee(1,1,1);function h(){a.setFromEuler(n,!1)}function p(){n.setFromQuaternion(a,void 0,!1)}n._onChange(h),a._onChange(p),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:c},modelViewMatrix:{value:new qt},normalMatrix:{value:new ft}}),this.matrix=new qt,this.matrixWorld=new qt,this.matrixAutoUpdate=l.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=l.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ma,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Ts.setFromAxisAngle(e,n),this.quaternion.multiply(Ts),this}rotateOnWorldAxis(e,n){return Ts.setFromAxisAngle(e,n),this.quaternion.premultiply(Ts),this}rotateX(e){return this.rotateOnAxis(Qu,e)}rotateY(e){return this.rotateOnAxis(eh,e)}rotateZ(e){return this.rotateOnAxis(th,e)}translateOnAxis(e,n){return Ku.copy(e).applyQuaternion(this.quaternion),this.position.add(Ku.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Qu,e)}translateY(e){return this.translateOnAxis(eh,e)}translateZ(e){return this.translateOnAxis(th,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ai.copy(this.matrixWorld).invert())}lookAt(e,n,a){e.isVector3?$r.copy(e):$r.set(e,n,a);let c=this.parent;this.updateWorldMatrix(!0,!1),cr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ai.lookAt(cr,$r,this.up):ai.lookAt($r,cr,this.up),this.quaternion.setFromRotationMatrix(ai),c&&(ai.extractRotation(c.matrixWorld),Ts.setFromRotationMatrix(ai),this.quaternion.premultiply(Ts.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Ay)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}let n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(Cy)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ai.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ai.multiply(e.parent.matrixWorld)),e.applyMatrix4(ai),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let a=0,c=this.children.length;a<c;a++){let p=this.children[a].getObjectByProperty(e,n);if(p!==void 0)return p}}getObjectsByProperty(e,n,a=[]){this[e]===n&&a.push(this);let c=this.children;for(let h=0,p=c.length;h<p;h++)c[h].getObjectsByProperty(e,n,a);return a}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cr,e,Ey),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cr,wy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);let n=this.children;for(let a=0,c=n.length;a<c;a++)n[a].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let n=this.children;for(let a=0,c=n.length;a<c;a++)n[a].traverseVisible(e)}traverseAncestors(e){let n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let n=this.children;for(let a=0,c=n.length;a<c;a++){let h=n[a];(h.matrixWorldAutoUpdate===!0||e===!0)&&h.updateMatrixWorld(e)}}updateWorldMatrix(e,n){let a=this.parent;if(e===!0&&a!==null&&a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){let c=this.children;for(let h=0,p=c.length;h<p;h++){let d=c[h];d.matrixWorldAutoUpdate===!0&&d.updateWorldMatrix(!1,!0)}}}toJSON(e){let n=e===void 0||typeof e=="string",a={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let c={};c.uuid=this.uuid,c.type=this.type,this.name!==""&&(c.name=this.name),this.castShadow===!0&&(c.castShadow=!0),this.receiveShadow===!0&&(c.receiveShadow=!0),this.visible===!1&&(c.visible=!1),this.frustumCulled===!1&&(c.frustumCulled=!1),this.renderOrder!==0&&(c.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(c.userData=this.userData),c.layers=this.layers.mask,c.matrix=this.matrix.toArray(),c.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(c.matrixAutoUpdate=!1),this.isInstancedMesh&&(c.type="InstancedMesh",c.count=this.count,c.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(c.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(c.type="BatchedMesh",c.perObjectFrustumCulled=this.perObjectFrustumCulled,c.sortObjects=this.sortObjects,c.drawRanges=this._drawRanges,c.reservedRanges=this._reservedRanges,c.visibility=this._visibility,c.active=this._active,c.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),c.maxGeometryCount=this._maxGeometryCount,c.maxVertexCount=this._maxVertexCount,c.maxIndexCount=this._maxIndexCount,c.geometryInitialized=this._geometryInitialized,c.geometryCount=this._geometryCount,c.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(c.boundingSphere={center:c.boundingSphere.center.toArray(),radius:c.boundingSphere.radius}),this.boundingBox!==null&&(c.boundingBox={min:c.boundingBox.min.toArray(),max:c.boundingBox.max.toArray()}));function h(d,y){return d[y.uuid]===void 0&&(d[y.uuid]=y.toJSON(e)),y.uuid}if(this.isScene)this.background&&(this.background.isColor?c.background=this.background.toJSON():this.background.isTexture&&(c.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(c.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){c.geometry=h(e.geometries,this.geometry);let d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){let y=d.shapes;if(Array.isArray(y))for(let x=0,_=y.length;x<_;x++){let M=y[x];h(e.shapes,M)}else h(e.shapes,y)}}if(this.isSkinnedMesh&&(c.bindMode=this.bindMode,c.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(h(e.skeletons,this.skeleton),c.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let d=[];for(let y=0,x=this.material.length;y<x;y++)d.push(h(e.materials,this.material[y]));c.material=d}else c.material=h(e.materials,this.material);if(this.children.length>0){c.children=[];for(let d=0;d<this.children.length;d++)c.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){c.animations=[];for(let d=0;d<this.animations.length;d++){let y=this.animations[d];c.animations.push(h(e.animations,y))}}if(n){let d=p(e.geometries),y=p(e.materials),x=p(e.textures),_=p(e.images),M=p(e.shapes),T=p(e.skeletons),w=p(e.animations),A=p(e.nodes);d.length>0&&(a.geometries=d),y.length>0&&(a.materials=y),x.length>0&&(a.textures=x),_.length>0&&(a.images=_),M.length>0&&(a.shapes=M),T.length>0&&(a.skeletons=T),w.length>0&&(a.animations=w),A.length>0&&(a.nodes=A)}return a.object=c,a;function p(d){let y=[];for(let x in d){let _=d[x];delete _.metadata,y.push(_)}return y}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let a=0;a<e.children.length;a++){let c=e.children[a];this.add(c.clone())}return this}};Kn.DEFAULT_UP=new ee(0,1,0);Kn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Kn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Vn=new ee,oi=new ee,Po=new ee,li=new ee,Es=new ee,ws=new ee,nh=new ee,Uo=new ee,Do=new ee,Oo=new ee,jr=!1,Ds=class l{constructor(e=new ee,n=new ee,a=new ee){this.a=e,this.b=n,this.c=a}static getNormal(e,n,a,c){c.subVectors(a,n),Vn.subVectors(e,n),c.cross(Vn);let h=c.lengthSq();return h>0?c.multiplyScalar(1/Math.sqrt(h)):c.set(0,0,0)}static getBarycoord(e,n,a,c,h){Vn.subVectors(c,n),oi.subVectors(a,n),Po.subVectors(e,n);let p=Vn.dot(Vn),d=Vn.dot(oi),y=Vn.dot(Po),x=oi.dot(oi),_=oi.dot(Po),M=p*x-d*d;if(M===0)return h.set(0,0,0),null;let T=1/M,w=(x*y-d*_)*T,A=(p*_-d*y)*T;return h.set(1-w-A,A,w)}static containsPoint(e,n,a,c){return this.getBarycoord(e,n,a,c,li)===null?!1:li.x>=0&&li.y>=0&&li.x+li.y<=1}static getUV(e,n,a,c,h,p,d,y){return jr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),jr=!0),this.getInterpolation(e,n,a,c,h,p,d,y)}static getInterpolation(e,n,a,c,h,p,d,y){return this.getBarycoord(e,n,a,c,li)===null?(y.x=0,y.y=0,"z"in y&&(y.z=0),"w"in y&&(y.w=0),null):(y.setScalar(0),y.addScaledVector(h,li.x),y.addScaledVector(p,li.y),y.addScaledVector(d,li.z),y)}static isFrontFacing(e,n,a,c){return Vn.subVectors(a,n),oi.subVectors(e,n),Vn.cross(oi).dot(c)<0}set(e,n,a){return this.a.copy(e),this.b.copy(n),this.c.copy(a),this}setFromPointsAndIndices(e,n,a,c){return this.a.copy(e[n]),this.b.copy(e[a]),this.c.copy(e[c]),this}setFromAttributeAndIndices(e,n,a,c){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,a),this.c.fromBufferAttribute(e,c),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Vn.subVectors(this.c,this.b),oi.subVectors(this.a,this.b),Vn.cross(oi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return l.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return l.getBarycoord(e,this.a,this.b,this.c,n)}getUV(e,n,a,c,h){return jr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),jr=!0),l.getInterpolation(e,this.a,this.b,this.c,n,a,c,h)}getInterpolation(e,n,a,c,h){return l.getInterpolation(e,this.a,this.b,this.c,n,a,c,h)}containsPoint(e){return l.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return l.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){let a=this.a,c=this.b,h=this.c,p,d;Es.subVectors(c,a),ws.subVectors(h,a),Uo.subVectors(e,a);let y=Es.dot(Uo),x=ws.dot(Uo);if(y<=0&&x<=0)return n.copy(a);Do.subVectors(e,c);let _=Es.dot(Do),M=ws.dot(Do);if(_>=0&&M<=_)return n.copy(c);let T=y*M-_*x;if(T<=0&&y>=0&&_<=0)return p=y/(y-_),n.copy(a).addScaledVector(Es,p);Oo.subVectors(e,h);let w=Es.dot(Oo),A=ws.dot(Oo);if(A>=0&&w<=A)return n.copy(h);let C=w*x-y*A;if(C<=0&&x>=0&&A<=0)return d=x/(x-A),n.copy(a).addScaledVector(ws,d);let E=_*A-w*M;if(E<=0&&M-_>=0&&w-A>=0)return nh.subVectors(h,c),d=(M-_)/(M-_+(w-A)),n.copy(c).addScaledVector(nh,d);let b=1/(E+C+T);return p=C*b,d=T*b,n.copy(a).addScaledVector(Es,p).addScaledVector(ws,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Gh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ui={h:0,s:0,l:0},Jr={h:0,s:0,l:0};function No(l,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?l+(e-l)*6*n:n<1/2?e:n<2/3?l+(e-l)*6*(2/3-n):l}var vt=class{constructor(e,n,a){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,a)}set(e,n,a){if(n===void 0&&a===void 0){let c=e;c&&c.isColor?this.copy(c):typeof c=="number"?this.setHex(c):typeof c=="string"&&this.setStyle(c)}else this.setRGB(e,n,a);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,At.toWorkingColorSpace(this,n),this}setRGB(e,n,a,c=At.workingColorSpace){return this.r=e,this.g=n,this.b=a,At.toWorkingColorSpace(this,c),this}setHSL(e,n,a,c=At.workingColorSpace){if(e=gy(e,1),n=mn(n,0,1),a=mn(a,0,1),n===0)this.r=this.g=this.b=a;else{let h=a<=.5?a*(1+n):a+n-a*n,p=2*a-h;this.r=No(p,h,e+1/3),this.g=No(p,h,e),this.b=No(p,h,e-1/3)}return At.toWorkingColorSpace(this,c),this}setStyle(e,n=Yt){function a(h){h!==void 0&&parseFloat(h)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let c;if(c=/^(\w+)\(([^\)]*)\)/.exec(e)){let h,p=c[1],d=c[2];switch(p){case"rgb":case"rgba":if(h=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return a(h[4]),this.setRGB(Math.min(255,parseInt(h[1],10))/255,Math.min(255,parseInt(h[2],10))/255,Math.min(255,parseInt(h[3],10))/255,n);if(h=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return a(h[4]),this.setRGB(Math.min(100,parseInt(h[1],10))/100,Math.min(100,parseInt(h[2],10))/100,Math.min(100,parseInt(h[3],10))/100,n);break;case"hsl":case"hsla":if(h=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return a(h[4]),this.setHSL(parseFloat(h[1])/360,parseFloat(h[2])/100,parseFloat(h[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(c=/^\#([A-Fa-f\d]+)$/.exec(e)){let h=c[1],p=h.length;if(p===3)return this.setRGB(parseInt(h.charAt(0),16)/15,parseInt(h.charAt(1),16)/15,parseInt(h.charAt(2),16)/15,n);if(p===6)return this.setHex(parseInt(h,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Yt){let a=Gh[e.toLowerCase()];return a!==void 0?this.setHex(a,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bs(e.r),this.g=Bs(e.g),this.b=Bs(e.b),this}copyLinearToSRGB(e){return this.r=To(e.r),this.g=To(e.g),this.b=To(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yt){return At.fromWorkingColorSpace(en.copy(this),e),Math.round(mn(en.r*255,0,255))*65536+Math.round(mn(en.g*255,0,255))*256+Math.round(mn(en.b*255,0,255))}getHexString(e=Yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=At.workingColorSpace){At.fromWorkingColorSpace(en.copy(this),n);let a=en.r,c=en.g,h=en.b,p=Math.max(a,c,h),d=Math.min(a,c,h),y,x,_=(d+p)/2;if(d===p)y=0,x=0;else{let M=p-d;switch(x=_<=.5?M/(p+d):M/(2-p-d),p){case a:y=(c-h)/M+(c<h?6:0);break;case c:y=(h-a)/M+2;break;case h:y=(a-c)/M+4;break}y/=6}return e.h=y,e.s=x,e.l=_,e}getRGB(e,n=At.workingColorSpace){return At.fromWorkingColorSpace(en.copy(this),n),e.r=en.r,e.g=en.g,e.b=en.b,e}getStyle(e=Yt){At.fromWorkingColorSpace(en.copy(this),e);let n=en.r,a=en.g,c=en.b;return e!==Yt?`color(${e} ${n.toFixed(3)} ${a.toFixed(3)} ${c.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(a*255)},${Math.round(c*255)})`}offsetHSL(e,n,a){return this.getHSL(Ui),this.setHSL(Ui.h+e,Ui.s+n,Ui.l+a)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,a){return this.r=e.r+(n.r-e.r)*a,this.g=e.g+(n.g-e.g)*a,this.b=e.b+(n.b-e.b)*a,this}lerpHSL(e,n){this.getHSL(Ui),e.getHSL(Jr);let a=So(Ui.h,Jr.h,n),c=So(Ui.s,Jr.s,n),h=So(Ui.l,Jr.l,n);return this.setHSL(a,c,h),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let n=this.r,a=this.g,c=this.b,h=e.elements;return this.r=h[0]*n+h[3]*a+h[6]*c,this.g=h[1]*n+h[4]*a+h[7]*c,this.b=h[2]*n+h[5]*a+h[8]*c,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},en=new vt;vt.NAMES=Gh;var Ry=0,Ws=class extends zi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ry++}),this.uuid=xr(),this.name="",this.type="Material",this.blending=ks,this.side=Bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xo,this.blendDst=qo,this.blendEquation=ns,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new vt(0,0,0),this.blendAlpha=0,this.depthFunc=ha,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xs,this.stencilZFail=xs,this.stencilZPass=xs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let n in e){let a=e[n];if(a===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}let c=this[n];if(c===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}c&&c.isColor?c.set(a):c&&c.isVector3&&a&&a.isVector3?c.copy(a):this[n]=a}}toJSON(e){let n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});let a={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(e).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(e).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(e).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(e).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(e).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.shadowSide!==null&&(a.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),this.blending!==ks&&(a.blending=this.blending),this.side!==Bi&&(a.side=this.side),this.vertexColors===!0&&(a.vertexColors=!0),this.opacity<1&&(a.opacity=this.opacity),this.transparent===!0&&(a.transparent=!0),this.blendSrc!==Xo&&(a.blendSrc=this.blendSrc),this.blendDst!==qo&&(a.blendDst=this.blendDst),this.blendEquation!==ns&&(a.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(a.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(a.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(a.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(a.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(a.blendAlpha=this.blendAlpha),this.depthFunc!==ha&&(a.depthFunc=this.depthFunc),this.depthTest===!1&&(a.depthTest=this.depthTest),this.depthWrite===!1&&(a.depthWrite=this.depthWrite),this.colorWrite===!1&&(a.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(a.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Gu&&(a.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(a.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(a.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xs&&(a.stencilFail=this.stencilFail),this.stencilZFail!==xs&&(a.stencilZFail=this.stencilZFail),this.stencilZPass!==xs&&(a.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(a.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(a.rotation=this.rotation),this.polygonOffset===!0&&(a.polygonOffset=!0),this.polygonOffsetFactor!==0&&(a.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(a.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(a.linewidth=this.linewidth),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.dithering===!0&&(a.dithering=!0),this.alphaTest>0&&(a.alphaTest=this.alphaTest),this.alphaHash===!0&&(a.alphaHash=!0),this.alphaToCoverage===!0&&(a.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(a.premultipliedAlpha=!0),this.forceSinglePass===!0&&(a.forceSinglePass=!0),this.wireframe===!0&&(a.wireframe=!0),this.wireframeLinewidth>1&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(a.flatShading=!0),this.visible===!1&&(a.visible=!1),this.toneMapped===!1&&(a.toneMapped=!1),this.fog===!1&&(a.fog=!1),Object.keys(this.userData).length>0&&(a.userData=this.userData);function c(h){let p=[];for(let d in h){let y=h[d];delete y.metadata,p.push(y)}return p}if(n){let h=c(e.textures),p=c(e.images);h.length>0&&(a.textures=h),p.length>0&&(a.images=p)}return a}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let n=e.clippingPlanes,a=null;if(n!==null){let c=n.length;a=new Array(c);for(let h=0;h!==c;++h)a[h]=n[h].clone()}return this.clippingPlanes=a,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Ta=class extends Ws{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Lh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Gt=new ee,Kr=new Ct,$t=class{constructor(e,n,a=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=a,this.usage=Hu,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,a){e*=this.itemSize,a*=n.itemSize;for(let c=0,h=this.itemSize;c<h;c++)this.array[e+c]=n.array[a+c];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,a=this.count;n<a;n++)Kr.fromBufferAttribute(this,n),Kr.applyMatrix3(e),this.setXY(n,Kr.x,Kr.y);else if(this.itemSize===3)for(let n=0,a=this.count;n<a;n++)Gt.fromBufferAttribute(this,n),Gt.applyMatrix3(e),this.setXYZ(n,Gt.x,Gt.y,Gt.z);return this}applyMatrix4(e){for(let n=0,a=this.count;n<a;n++)Gt.fromBufferAttribute(this,n),Gt.applyMatrix4(e),this.setXYZ(n,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let n=0,a=this.count;n<a;n++)Gt.fromBufferAttribute(this,n),Gt.applyNormalMatrix(e),this.setXYZ(n,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let n=0,a=this.count;n<a;n++)Gt.fromBufferAttribute(this,n),Gt.transformDirection(e),this.setXYZ(n,Gt.x,Gt.y,Gt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let a=this.array[e*this.itemSize+n];return this.normalized&&(a=ar(a,this.array)),a}setComponent(e,n,a){return this.normalized&&(a=pn(a,this.array)),this.array[e*this.itemSize+n]=a,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=ar(n,this.array)),n}setX(e,n){return this.normalized&&(n=pn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=ar(n,this.array)),n}setY(e,n){return this.normalized&&(n=pn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=ar(n,this.array)),n}setZ(e,n){return this.normalized&&(n=pn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=ar(n,this.array)),n}setW(e,n){return this.normalized&&(n=pn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,a){return e*=this.itemSize,this.normalized&&(n=pn(n,this.array),a=pn(a,this.array)),this.array[e+0]=n,this.array[e+1]=a,this}setXYZ(e,n,a,c){return e*=this.itemSize,this.normalized&&(n=pn(n,this.array),a=pn(a,this.array),c=pn(c,this.array)),this.array[e+0]=n,this.array[e+1]=a,this.array[e+2]=c,this}setXYZW(e,n,a,c,h){return e*=this.itemSize,this.normalized&&(n=pn(n,this.array),a=pn(a,this.array),c=pn(c,this.array),h=pn(h,this.array)),this.array[e+0]=n,this.array[e+1]=a,this.array[e+2]=c,this.array[e+3]=h,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Hu&&(e.usage=this.usage),e}};var Ea=class extends $t{constructor(e,n,a){super(new Uint16Array(e),n,a)}};var wa=class extends $t{constructor(e,n,a){super(new Uint32Array(e),n,a)}};var di=class extends $t{constructor(e,n,a){super(new Float32Array(e),n,a)}};var Ly=0,Cn=new qt,Fo=new Kn,As=new ee,Sn=new os,ur=new os,Xt=new ee,gi=class l extends zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ly++}),this.uuid=xr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Vh(e)?wa:Ea)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,a=0){this.groups.push({start:e,count:n,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){let n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);let a=this.attributes.normal;if(a!==void 0){let h=new ft().getNormalMatrix(e);a.applyNormalMatrix(h),a.needsUpdate=!0}let c=this.attributes.tangent;return c!==void 0&&(c.transformDirection(e),c.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Cn.makeRotationFromQuaternion(e),this.applyMatrix4(Cn),this}rotateX(e){return Cn.makeRotationX(e),this.applyMatrix4(Cn),this}rotateY(e){return Cn.makeRotationY(e),this.applyMatrix4(Cn),this}rotateZ(e){return Cn.makeRotationZ(e),this.applyMatrix4(Cn),this}translate(e,n,a){return Cn.makeTranslation(e,n,a),this.applyMatrix4(Cn),this}scale(e,n,a){return Cn.makeScale(e,n,a),this.applyMatrix4(Cn),this}lookAt(e){return Fo.lookAt(e),Fo.updateMatrix(),this.applyMatrix4(Fo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(As).negate(),this.translate(As.x,As.y,As.z),this}setFromPoints(e){let n=[];for(let a=0,c=e.length;a<c;a++){let h=e[a];n.push(h.x,h.y,h.z||0)}return this.setAttribute("position",new di(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new os);let e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new ee(-1/0,-1/0,-1/0),new ee(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let a=0,c=n.length;a<c;a++){let h=n[a];Sn.setFromBufferAttribute(h),this.morphTargetsRelative?(Xt.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint(Xt),Xt.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint(Xt)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mr);let e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new ee,1/0);return}if(e){let a=this.boundingSphere.center;if(Sn.setFromBufferAttribute(e),n)for(let h=0,p=n.length;h<p;h++){let d=n[h];ur.setFromBufferAttribute(d),this.morphTargetsRelative?(Xt.addVectors(Sn.min,ur.min),Sn.expandByPoint(Xt),Xt.addVectors(Sn.max,ur.max),Sn.expandByPoint(Xt)):(Sn.expandByPoint(ur.min),Sn.expandByPoint(ur.max))}Sn.getCenter(a);let c=0;for(let h=0,p=e.count;h<p;h++)Xt.fromBufferAttribute(e,h),c=Math.max(c,a.distanceToSquared(Xt));if(n)for(let h=0,p=n.length;h<p;h++){let d=n[h],y=this.morphTargetsRelative;for(let x=0,_=d.count;x<_;x++)Xt.fromBufferAttribute(d,x),y&&(As.fromBufferAttribute(e,x),Xt.add(As)),c=Math.max(c,a.distanceToSquared(Xt))}this.boundingSphere.radius=Math.sqrt(c),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let a=e.array,c=n.position.array,h=n.normal.array,p=n.uv.array,d=c.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $t(new Float32Array(4*d),4));let y=this.getAttribute("tangent").array,x=[],_=[];for(let N=0;N<d;N++)x[N]=new ee,_[N]=new ee;let M=new ee,T=new ee,w=new ee,A=new Ct,C=new Ct,E=new Ct,b=new ee,k=new ee;function P(N,ae,ge){M.fromArray(c,N*3),T.fromArray(c,ae*3),w.fromArray(c,ge*3),A.fromArray(p,N*2),C.fromArray(p,ae*2),E.fromArray(p,ge*2),T.sub(M),w.sub(M),C.sub(A),E.sub(A);let we=1/(C.x*E.y-E.x*C.y);isFinite(we)&&(b.copy(T).multiplyScalar(E.y).addScaledVector(w,-C.y).multiplyScalar(we),k.copy(w).multiplyScalar(C.x).addScaledVector(T,-E.x).multiplyScalar(we),x[N].add(b),x[ae].add(b),x[ge].add(b),_[N].add(k),_[ae].add(k),_[ge].add(k))}let V=this.groups;V.length===0&&(V=[{start:0,count:a.length}]);for(let N=0,ae=V.length;N<ae;++N){let ge=V[N],we=ge.start,q=ge.count;for(let te=we,le=we+q;te<le;te+=3)P(a[te+0],a[te+1],a[te+2])}let Z=new ee,X=new ee,W=new ee,fe=new ee;function D(N){W.fromArray(h,N*3),fe.copy(W);let ae=x[N];Z.copy(ae),Z.sub(W.multiplyScalar(W.dot(ae))).normalize(),X.crossVectors(fe,ae);let we=X.dot(_[N])<0?-1:1;y[N*4]=Z.x,y[N*4+1]=Z.y,y[N*4+2]=Z.z,y[N*4+3]=we}for(let N=0,ae=V.length;N<ae;++N){let ge=V[N],we=ge.start,q=ge.count;for(let te=we,le=we+q;te<le;te+=3)D(a[te+0]),D(a[te+1]),D(a[te+2])}}computeVertexNormals(){let e=this.index,n=this.getAttribute("position");if(n!==void 0){let a=this.getAttribute("normal");if(a===void 0)a=new $t(new Float32Array(n.count*3),3),this.setAttribute("normal",a);else for(let T=0,w=a.count;T<w;T++)a.setXYZ(T,0,0,0);let c=new ee,h=new ee,p=new ee,d=new ee,y=new ee,x=new ee,_=new ee,M=new ee;if(e)for(let T=0,w=e.count;T<w;T+=3){let A=e.getX(T+0),C=e.getX(T+1),E=e.getX(T+2);c.fromBufferAttribute(n,A),h.fromBufferAttribute(n,C),p.fromBufferAttribute(n,E),_.subVectors(p,h),M.subVectors(c,h),_.cross(M),d.fromBufferAttribute(a,A),y.fromBufferAttribute(a,C),x.fromBufferAttribute(a,E),d.add(_),y.add(_),x.add(_),a.setXYZ(A,d.x,d.y,d.z),a.setXYZ(C,y.x,y.y,y.z),a.setXYZ(E,x.x,x.y,x.z)}else for(let T=0,w=n.count;T<w;T+=3)c.fromBufferAttribute(n,T+0),h.fromBufferAttribute(n,T+1),p.fromBufferAttribute(n,T+2),_.subVectors(p,h),M.subVectors(c,h),_.cross(M),a.setXYZ(T+0,_.x,_.y,_.z),a.setXYZ(T+1,_.x,_.y,_.z),a.setXYZ(T+2,_.x,_.y,_.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let n=0,a=e.count;n<a;n++)Xt.fromBufferAttribute(e,n),Xt.normalize(),e.setXYZ(n,Xt.x,Xt.y,Xt.z)}toNonIndexed(){function e(d,y){let x=d.array,_=d.itemSize,M=d.normalized,T=new x.constructor(y.length*_),w=0,A=0;for(let C=0,E=y.length;C<E;C++){d.isInterleavedBufferAttribute?w=y[C]*d.data.stride+d.offset:w=y[C]*_;for(let b=0;b<_;b++)T[A++]=x[w++]}return new $t(T,_,M)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let n=new l,a=this.index.array,c=this.attributes;for(let d in c){let y=c[d],x=e(y,a);n.setAttribute(d,x)}let h=this.morphAttributes;for(let d in h){let y=[],x=h[d];for(let _=0,M=x.length;_<M;_++){let T=x[_],w=e(T,a);y.push(w)}n.morphAttributes[d]=y}n.morphTargetsRelative=this.morphTargetsRelative;let p=this.groups;for(let d=0,y=p.length;d<y;d++){let x=p[d];n.addGroup(x.start,x.count,x.materialIndex)}return n}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let y=this.parameters;for(let x in y)y[x]!==void 0&&(e[x]=y[x]);return e}e.data={attributes:{}};let n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});let a=this.attributes;for(let y in a){let x=a[y];e.data.attributes[y]=x.toJSON(e.data)}let c={},h=!1;for(let y in this.morphAttributes){let x=this.morphAttributes[y],_=[];for(let M=0,T=x.length;M<T;M++){let w=x[M];_.push(w.toJSON(e.data))}_.length>0&&(c[y]=_,h=!0)}h&&(e.data.morphAttributes=c,e.data.morphTargetsRelative=this.morphTargetsRelative);let p=this.groups;p.length>0&&(e.data.groups=JSON.parse(JSON.stringify(p)));let d=this.boundingSphere;return d!==null&&(e.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let n={};this.name=e.name;let a=e.index;a!==null&&this.setIndex(a.clone(n));let c=e.attributes;for(let x in c){let _=c[x];this.setAttribute(x,_.clone(n))}let h=e.morphAttributes;for(let x in h){let _=[],M=h[x];for(let T=0,w=M.length;T<w;T++)_.push(M[T].clone(n));this.morphAttributes[x]=_}this.morphTargetsRelative=e.morphTargetsRelative;let p=e.groups;for(let x=0,_=p.length;x<_;x++){let M=p[x];this.addGroup(M.start,M.count,M.materialIndex)}let d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());let y=e.boundingSphere;return y!==null&&(this.boundingSphere=y.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},ih=new qt,Qi=new nl,Qr=new mr,sh=new ee,Cs=new ee,Rs=new ee,Ls=new ee,ko=new ee,ea=new ee,ta=new Ct,na=new Ct,ia=new Ct,rh=new ee,ah=new ee,oh=new ee,sa=new ee,ra=new ee,In=class extends Kn{constructor(e=new gi,n=new Ta){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){let c=n[a[0]];if(c!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let h=0,p=c.length;h<p;h++){let d=c[h].name||String(h);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=h}}}}getVertexPosition(e,n){let a=this.geometry,c=a.attributes.position,h=a.morphAttributes.position,p=a.morphTargetsRelative;n.fromBufferAttribute(c,e);let d=this.morphTargetInfluences;if(h&&d){ea.set(0,0,0);for(let y=0,x=h.length;y<x;y++){let _=d[y],M=h[y];_!==0&&(ko.fromBufferAttribute(M,e),p?ea.addScaledVector(ko,_):ea.addScaledVector(ko.sub(n),_))}n.add(ea)}return n}raycast(e,n){let a=this.geometry,c=this.material,h=this.matrixWorld;c!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),Qr.copy(a.boundingSphere),Qr.applyMatrix4(h),Qi.copy(e.ray).recast(e.near),!(Qr.containsPoint(Qi.origin)===!1&&(Qi.intersectSphere(Qr,sh)===null||Qi.origin.distanceToSquared(sh)>(e.far-e.near)**2))&&(ih.copy(h).invert(),Qi.copy(e.ray).applyMatrix4(ih),!(a.boundingBox!==null&&Qi.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(e,n,Qi)))}_computeIntersections(e,n,a){let c,h=this.geometry,p=this.material,d=h.index,y=h.attributes.position,x=h.attributes.uv,_=h.attributes.uv1,M=h.attributes.normal,T=h.groups,w=h.drawRange;if(d!==null)if(Array.isArray(p))for(let A=0,C=T.length;A<C;A++){let E=T[A],b=p[E.materialIndex],k=Math.max(E.start,w.start),P=Math.min(d.count,Math.min(E.start+E.count,w.start+w.count));for(let V=k,Z=P;V<Z;V+=3){let X=d.getX(V),W=d.getX(V+1),fe=d.getX(V+2);c=aa(this,b,e,a,x,_,M,X,W,fe),c&&(c.faceIndex=Math.floor(V/3),c.face.materialIndex=E.materialIndex,n.push(c))}}else{let A=Math.max(0,w.start),C=Math.min(d.count,w.start+w.count);for(let E=A,b=C;E<b;E+=3){let k=d.getX(E),P=d.getX(E+1),V=d.getX(E+2);c=aa(this,p,e,a,x,_,M,k,P,V),c&&(c.faceIndex=Math.floor(E/3),n.push(c))}}else if(y!==void 0)if(Array.isArray(p))for(let A=0,C=T.length;A<C;A++){let E=T[A],b=p[E.materialIndex],k=Math.max(E.start,w.start),P=Math.min(y.count,Math.min(E.start+E.count,w.start+w.count));for(let V=k,Z=P;V<Z;V+=3){let X=V,W=V+1,fe=V+2;c=aa(this,b,e,a,x,_,M,X,W,fe),c&&(c.faceIndex=Math.floor(V/3),c.face.materialIndex=E.materialIndex,n.push(c))}}else{let A=Math.max(0,w.start),C=Math.min(y.count,w.start+w.count);for(let E=A,b=C;E<b;E+=3){let k=E,P=E+1,V=E+2;c=aa(this,p,e,a,x,_,M,k,P,V),c&&(c.faceIndex=Math.floor(E/3),n.push(c))}}}};function Iy(l,e,n,a,c,h,p,d){let y;if(e.side===gn?y=a.intersectTriangle(p,h,c,!0,d):y=a.intersectTriangle(c,h,p,e.side===Bi,d),y===null)return null;ra.copy(d),ra.applyMatrix4(l.matrixWorld);let x=n.ray.origin.distanceTo(ra);return x<n.near||x>n.far?null:{distance:x,point:ra.clone(),object:l}}function aa(l,e,n,a,c,h,p,d,y,x){l.getVertexPosition(d,Cs),l.getVertexPosition(y,Rs),l.getVertexPosition(x,Ls);let _=Iy(l,e,n,a,Cs,Rs,Ls,sa);if(_){c&&(ta.fromBufferAttribute(c,d),na.fromBufferAttribute(c,y),ia.fromBufferAttribute(c,x),_.uv=Ds.getInterpolation(sa,Cs,Rs,Ls,ta,na,ia,new Ct)),h&&(ta.fromBufferAttribute(h,d),na.fromBufferAttribute(h,y),ia.fromBufferAttribute(h,x),_.uv1=Ds.getInterpolation(sa,Cs,Rs,Ls,ta,na,ia,new Ct),_.uv2=_.uv1),p&&(rh.fromBufferAttribute(p,d),ah.fromBufferAttribute(p,y),oh.fromBufferAttribute(p,x),_.normal=Ds.getInterpolation(sa,Cs,Rs,Ls,rh,ah,oh,new ee),_.normal.dot(a.direction)>0&&_.normal.multiplyScalar(-1));let M={a:d,b:y,c:x,normal:new ee,materialIndex:0};Ds.getNormal(Cs,Rs,Ls,M.normal),_.face=M}return _}var gr=class l extends gi{constructor(e=1,n=1,a=1,c=1,h=1,p=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:a,widthSegments:c,heightSegments:h,depthSegments:p};let d=this;c=Math.floor(c),h=Math.floor(h),p=Math.floor(p);let y=[],x=[],_=[],M=[],T=0,w=0;A("z","y","x",-1,-1,a,n,e,p,h,0),A("z","y","x",1,-1,a,n,-e,p,h,1),A("x","z","y",1,1,e,a,n,c,p,2),A("x","z","y",1,-1,e,a,-n,c,p,3),A("x","y","z",1,-1,e,n,a,c,h,4),A("x","y","z",-1,-1,e,n,-a,c,h,5),this.setIndex(y),this.setAttribute("position",new di(x,3)),this.setAttribute("normal",new di(_,3)),this.setAttribute("uv",new di(M,2));function A(C,E,b,k,P,V,Z,X,W,fe,D){let N=V/W,ae=Z/fe,ge=V/2,we=Z/2,q=X/2,te=W+1,le=fe+1,ue=0,ce=0,se=new ee;for(let pe=0;pe<le;pe++){let Me=pe*ae-we;for(let Le=0;Le<te;Le++){let oe=Le*N-ge;se[C]=oe*k,se[E]=Me*P,se[b]=q,x.push(se.x,se.y,se.z),se[C]=0,se[E]=0,se[b]=X>0?1:-1,_.push(se.x,se.y,se.z),M.push(Le/W),M.push(1-pe/fe),ue+=1}}for(let pe=0;pe<fe;pe++)for(let Me=0;Me<W;Me++){let Le=T+Me+te*pe,oe=T+Me+te*(pe+1),me=T+(Me+1)+te*(pe+1),Ae=T+(Me+1)+te*pe;y.push(Le,oe,Ae),y.push(oe,me,Ae),ce+=6}d.addGroup(w,ce,D),w+=ce,T+=ue}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new l(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Xs(l){let e={};for(let n in l){e[n]={};for(let a in l[n]){let c=l[n][a];c&&(c.isColor||c.isMatrix3||c.isMatrix4||c.isVector2||c.isVector3||c.isVector4||c.isTexture||c.isQuaternion)?c.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][a]=null):e[n][a]=c.clone():Array.isArray(c)?e[n][a]=c.slice():e[n][a]=c}}return e}function hn(l){let e={};for(let n=0;n<l.length;n++){let a=Xs(l[n]);for(let c in a)e[c]=a[c]}return e}function Py(l){let e=[];for(let n=0;n<l.length;n++)e.push(l[n].clone());return e}function Hh(l){return l.getRenderTarget()===null?l.outputColorSpace:At.workingColorSpace}var Uy={clone:Xs,merge:hn},Dy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Oy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,yi=class extends Ws{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Dy,this.fragmentShader=Oy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Xs(e.uniforms),this.uniformsGroups=Py(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(let c in this.uniforms){let p=this.uniforms[c].value;p&&p.isTexture?n.uniforms[c]={type:"t",value:p.toJSON(e).uuid}:p&&p.isColor?n.uniforms[c]={type:"c",value:p.getHex()}:p&&p.isVector2?n.uniforms[c]={type:"v2",value:p.toArray()}:p&&p.isVector3?n.uniforms[c]={type:"v3",value:p.toArray()}:p&&p.isVector4?n.uniforms[c]={type:"v4",value:p.toArray()}:p&&p.isMatrix3?n.uniforms[c]={type:"m3",value:p.toArray()}:p&&p.isMatrix4?n.uniforms[c]={type:"m4",value:p.toArray()}:n.uniforms[c]={value:p}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;let a={};for(let c in this.extensions)this.extensions[c]===!0&&(a[c]=!0);return Object.keys(a).length>0&&(n.extensions=a),n}},Aa=class extends Kn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qt,this.projectionMatrix=new qt,this.projectionMatrixInverse=new qt,this.coordinateSystem=fi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Mn=class extends Aa{constructor(e=50,n=1,a=.1,c=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=a,this.far=c,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let n=.5*this.getFilmHeight()/e;this.fov=Ko*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(bo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ko*2*Math.atan(Math.tan(bo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,n,a,c,h,p){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=c,this.view.width=h,this.view.height=p,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,n=e*Math.tan(bo*.5*this.fov)/this.zoom,a=2*n,c=this.aspect*a,h=-.5*c,p=this.view;if(this.view!==null&&this.view.enabled){let y=p.fullWidth,x=p.fullHeight;h+=p.offsetX*c/y,n-=p.offsetY*a/x,c*=p.width/y,a*=p.height/x}let d=this.filmOffset;d!==0&&(h+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(h,h+c,n,n-a,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}},Is=-90,Ps=1,il=class extends Kn{constructor(e,n,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;let c=new Mn(Is,Ps,e,n);c.layers=this.layers,this.add(c);let h=new Mn(Is,Ps,e,n);h.layers=this.layers,this.add(h);let p=new Mn(Is,Ps,e,n);p.layers=this.layers,this.add(p);let d=new Mn(Is,Ps,e,n);d.layers=this.layers,this.add(d);let y=new Mn(Is,Ps,e,n);y.layers=this.layers,this.add(y);let x=new Mn(Is,Ps,e,n);x.layers=this.layers,this.add(x)}updateCoordinateSystem(){let e=this.coordinateSystem,n=this.children.concat(),[a,c,h,p,d,y]=n;for(let x of n)this.remove(x);if(e===fi)a.up.set(0,1,0),a.lookAt(1,0,0),c.up.set(0,1,0),c.lookAt(-1,0,0),h.up.set(0,0,-1),h.lookAt(0,1,0),p.up.set(0,0,1),p.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),y.up.set(0,1,0),y.lookAt(0,0,-1);else if(e===ya)a.up.set(0,-1,0),a.lookAt(-1,0,0),c.up.set(0,-1,0),c.lookAt(1,0,0),h.up.set(0,0,1),h.lookAt(0,1,0),p.up.set(0,0,-1),p.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),y.up.set(0,-1,0),y.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let x of n)this.add(x),x.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();let{renderTarget:a,activeMipmapLevel:c}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[h,p,d,y,x,_]=this.children,M=e.getRenderTarget(),T=e.getActiveCubeFace(),w=e.getActiveMipmapLevel(),A=e.xr.enabled;e.xr.enabled=!1;let C=a.texture.generateMipmaps;a.texture.generateMipmaps=!1,e.setRenderTarget(a,0,c),e.render(n,h),e.setRenderTarget(a,1,c),e.render(n,p),e.setRenderTarget(a,2,c),e.render(n,d),e.setRenderTarget(a,3,c),e.render(n,y),e.setRenderTarget(a,4,c),e.render(n,x),a.texture.generateMipmaps=C,e.setRenderTarget(a,5,c),e.render(n,_),e.setRenderTarget(M,T,w),e.xr.enabled=A,a.texture.needsPMREMUpdate=!0}},Ca=class extends Wn{constructor(e,n,a,c,h,p,d,y,x,_){e=e!==void 0?e:[],n=n!==void 0?n:Vs,super(e,n,a,c,h,p,d,y,x,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},sl=class extends mi{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;let a={width:e,height:e,depth:1},c=[a,a,a,a,a,a];n.encoding!==void 0&&(hr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===as?Yt:Ln),this.texture=new Ca(c,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Rn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let a={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},c=new gr(5,5,5),h=new yi({name:"CubemapFromEquirect",uniforms:Xs(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:gn,blending:Ni});h.uniforms.tEquirect.value=n;let p=new In(c,h),d=n.minFilter;return n.minFilter===dr&&(n.minFilter=Rn),new il(1,10,this).update(e,p),n.minFilter=d,p.geometry.dispose(),p.material.dispose(),this}clear(e,n,a,c){let h=e.getRenderTarget();for(let p=0;p<6;p++)e.setRenderTarget(this,p),e.clear(n,a,c);e.setRenderTarget(h)}},Bo=new ee,Ny=new ee,Fy=new ft,ui=class{constructor(e=new ee(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,a,c){return this.normal.set(e,n,a),this.constant=c,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,a){let c=Bo.subVectors(a,n).cross(Ny.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(c,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){let a=e.delta(Bo),c=this.normal.dot(a);if(c===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;let h=-(e.start.dot(this.normal)+this.constant)/c;return h<0||h>1?null:n.copy(e.start).addScaledVector(a,h)}intersectsLine(e){let n=this.distanceToPoint(e.start),a=this.distanceToPoint(e.end);return n<0&&a>0||a<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){let a=n||Fy.getNormalMatrix(e),c=this.coplanarPoint(Bo).applyMatrix4(e),h=this.normal.applyMatrix3(a).normalize();return this.constant=-c.dot(h),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},es=new mr,oa=new ee,Ra=class{constructor(e=new ui,n=new ui,a=new ui,c=new ui,h=new ui,p=new ui){this.planes=[e,n,a,c,h,p]}set(e,n,a,c,h,p){let d=this.planes;return d[0].copy(e),d[1].copy(n),d[2].copy(a),d[3].copy(c),d[4].copy(h),d[5].copy(p),this}copy(e){let n=this.planes;for(let a=0;a<6;a++)n[a].copy(e.planes[a]);return this}setFromProjectionMatrix(e,n=fi){let a=this.planes,c=e.elements,h=c[0],p=c[1],d=c[2],y=c[3],x=c[4],_=c[5],M=c[6],T=c[7],w=c[8],A=c[9],C=c[10],E=c[11],b=c[12],k=c[13],P=c[14],V=c[15];if(a[0].setComponents(y-h,T-x,E-w,V-b).normalize(),a[1].setComponents(y+h,T+x,E+w,V+b).normalize(),a[2].setComponents(y+p,T+_,E+A,V+k).normalize(),a[3].setComponents(y-p,T-_,E-A,V-k).normalize(),a[4].setComponents(y-d,T-M,E-C,V-P).normalize(),n===fi)a[5].setComponents(y+d,T+M,E+C,V+P).normalize();else if(n===ya)a[5].setComponents(d,M,C,P).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),es.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),es.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(es)}intersectsSprite(e){return es.center.set(0,0,0),es.radius=.7071067811865476,es.applyMatrix4(e.matrixWorld),this.intersectsSphere(es)}intersectsSphere(e){let n=this.planes,a=e.center,c=-e.radius;for(let h=0;h<6;h++)if(n[h].distanceToPoint(a)<c)return!1;return!0}intersectsBox(e){let n=this.planes;for(let a=0;a<6;a++){let c=n[a];if(oa.x=c.normal.x>0?e.max.x:e.min.x,oa.y=c.normal.y>0?e.max.y:e.min.y,oa.z=c.normal.z>0?e.max.z:e.min.z,c.distanceToPoint(oa)<0)return!1}return!0}containsPoint(e){let n=this.planes;for(let a=0;a<6;a++)if(n[a].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Wh(){let l=null,e=!1,n=null,a=null;function c(h,p){n(h,p),a=l.requestAnimationFrame(c)}return{start:function(){e!==!0&&n!==null&&(a=l.requestAnimationFrame(c),e=!0)},stop:function(){l.cancelAnimationFrame(a),e=!1},setAnimationLoop:function(h){n=h},setContext:function(h){l=h}}}function ky(l,e){let n=e.isWebGL2,a=new WeakMap;function c(x,_){let M=x.array,T=x.usage,w=M.byteLength,A=l.createBuffer();l.bindBuffer(_,A),l.bufferData(_,M,T),x.onUploadCallback();let C;if(M instanceof Float32Array)C=l.FLOAT;else if(M instanceof Uint16Array)if(x.isFloat16BufferAttribute)if(n)C=l.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else C=l.UNSIGNED_SHORT;else if(M instanceof Int16Array)C=l.SHORT;else if(M instanceof Uint32Array)C=l.UNSIGNED_INT;else if(M instanceof Int32Array)C=l.INT;else if(M instanceof Int8Array)C=l.BYTE;else if(M instanceof Uint8Array)C=l.UNSIGNED_BYTE;else if(M instanceof Uint8ClampedArray)C=l.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+M);return{buffer:A,type:C,bytesPerElement:M.BYTES_PER_ELEMENT,version:x.version,size:w}}function h(x,_,M){let T=_.array,w=_._updateRange,A=_.updateRanges;if(l.bindBuffer(M,x),w.count===-1&&A.length===0&&l.bufferSubData(M,0,T),A.length!==0){for(let C=0,E=A.length;C<E;C++){let b=A[C];n?l.bufferSubData(M,b.start*T.BYTES_PER_ELEMENT,T,b.start,b.count):l.bufferSubData(M,b.start*T.BYTES_PER_ELEMENT,T.subarray(b.start,b.start+b.count))}_.clearUpdateRanges()}w.count!==-1&&(n?l.bufferSubData(M,w.offset*T.BYTES_PER_ELEMENT,T,w.offset,w.count):l.bufferSubData(M,w.offset*T.BYTES_PER_ELEMENT,T.subarray(w.offset,w.offset+w.count)),w.count=-1),_.onUploadCallback()}function p(x){return x.isInterleavedBufferAttribute&&(x=x.data),a.get(x)}function d(x){x.isInterleavedBufferAttribute&&(x=x.data);let _=a.get(x);_&&(l.deleteBuffer(_.buffer),a.delete(x))}function y(x,_){if(x.isGLBufferAttribute){let T=a.get(x);(!T||T.version<x.version)&&a.set(x,{buffer:x.buffer,type:x.type,bytesPerElement:x.elementSize,version:x.version});return}x.isInterleavedBufferAttribute&&(x=x.data);let M=a.get(x);if(M===void 0)a.set(x,c(x,_));else if(M.version<x.version){if(M.size!==x.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");h(M.buffer,x,_),M.version=x.version}}return{get:p,remove:d,update:y}}var rl=class l extends gi{constructor(e=1,n=1,a=1,c=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:a,heightSegments:c};let h=e/2,p=n/2,d=Math.floor(a),y=Math.floor(c),x=d+1,_=y+1,M=e/d,T=n/y,w=[],A=[],C=[],E=[];for(let b=0;b<_;b++){let k=b*T-p;for(let P=0;P<x;P++){let V=P*M-h;A.push(V,-k,0),C.push(0,0,1),E.push(P/d),E.push(1-b/y)}}for(let b=0;b<y;b++)for(let k=0;k<d;k++){let P=k+x*b,V=k+x*(b+1),Z=k+1+x*(b+1),X=k+1+x*b;w.push(P,V,X),w.push(V,Z,X)}this.setIndex(w),this.setAttribute("position",new di(A,3)),this.setAttribute("normal",new di(C,3)),this.setAttribute("uv",new di(E,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new l(e.width,e.height,e.widthSegments,e.heightSegments)}},By=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zy=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Vy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hy=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Wy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Xy=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,qy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yy=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Zy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,$y=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jy=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ky=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Qy=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ex=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,tx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,nx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ix=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,sx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,rx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ax=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,ox=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,lx=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ux=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,hx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,fx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,dx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,px=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,mx="gl_FragColor = linearToOutputTexel( gl_FragColor );",gx=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,yx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,xx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,vx=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,_x=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Sx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Mx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Tx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ex=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,wx=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ax=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Cx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Rx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lx=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ix=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Px=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ux=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Dx=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ox=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Nx=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Fx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,kx=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Bx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,zx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Vx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Gx=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Hx=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wx=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Xx=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,qx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Yx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Zx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$x=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Jx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Kx=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,ev=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,tv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,nv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,iv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,sv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,av=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ov=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,lv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,cv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,uv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,fv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,dv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,pv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_v=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,bv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Sv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Mv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Tv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ev=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,wv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Av=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Cv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Iv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Pv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Uv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Dv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ov=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Nv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Fv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,kv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Bv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Xv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,qv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Yv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Zv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$v=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Kv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Qv=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,t_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,n_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,i_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,s_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,r_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,a_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,o_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,l_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,c_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,u_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,h_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,f_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,d_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,p_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,m_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,g_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,y_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ht={alphahash_fragment:By,alphahash_pars_fragment:zy,alphamap_fragment:Vy,alphamap_pars_fragment:Gy,alphatest_fragment:Hy,alphatest_pars_fragment:Wy,aomap_fragment:Xy,aomap_pars_fragment:qy,batching_pars_vertex:Yy,batching_vertex:Zy,begin_vertex:$y,beginnormal_vertex:jy,bsdfs:Jy,iridescence_fragment:Ky,bumpmap_pars_fragment:Qy,clipping_planes_fragment:ex,clipping_planes_pars_fragment:tx,clipping_planes_pars_vertex:nx,clipping_planes_vertex:ix,color_fragment:sx,color_pars_fragment:rx,color_pars_vertex:ax,color_vertex:ox,common:lx,cube_uv_reflection_fragment:cx,defaultnormal_vertex:ux,displacementmap_pars_vertex:hx,displacementmap_vertex:fx,emissivemap_fragment:dx,emissivemap_pars_fragment:px,colorspace_fragment:mx,colorspace_pars_fragment:gx,envmap_fragment:yx,envmap_common_pars_fragment:xx,envmap_pars_fragment:vx,envmap_pars_vertex:_x,envmap_physical_pars_fragment:Px,envmap_vertex:bx,fog_vertex:Sx,fog_pars_vertex:Mx,fog_fragment:Tx,fog_pars_fragment:Ex,gradientmap_pars_fragment:wx,lightmap_fragment:Ax,lightmap_pars_fragment:Cx,lights_lambert_fragment:Rx,lights_lambert_pars_fragment:Lx,lights_pars_begin:Ix,lights_toon_fragment:Ux,lights_toon_pars_fragment:Dx,lights_phong_fragment:Ox,lights_phong_pars_fragment:Nx,lights_physical_fragment:Fx,lights_physical_pars_fragment:kx,lights_fragment_begin:Bx,lights_fragment_maps:zx,lights_fragment_end:Vx,logdepthbuf_fragment:Gx,logdepthbuf_pars_fragment:Hx,logdepthbuf_pars_vertex:Wx,logdepthbuf_vertex:Xx,map_fragment:qx,map_pars_fragment:Yx,map_particle_fragment:Zx,map_particle_pars_fragment:$x,metalnessmap_fragment:jx,metalnessmap_pars_fragment:Jx,morphcolor_vertex:Kx,morphnormal_vertex:Qx,morphtarget_pars_vertex:ev,morphtarget_vertex:tv,normal_fragment_begin:nv,normal_fragment_maps:iv,normal_pars_fragment:sv,normal_pars_vertex:rv,normal_vertex:av,normalmap_pars_fragment:ov,clearcoat_normal_fragment_begin:lv,clearcoat_normal_fragment_maps:cv,clearcoat_pars_fragment:uv,iridescence_pars_fragment:hv,opaque_fragment:fv,packing:dv,premultiplied_alpha_fragment:pv,project_vertex:mv,dithering_fragment:gv,dithering_pars_fragment:yv,roughnessmap_fragment:xv,roughnessmap_pars_fragment:vv,shadowmap_pars_fragment:_v,shadowmap_pars_vertex:bv,shadowmap_vertex:Sv,shadowmask_pars_fragment:Mv,skinbase_vertex:Tv,skinning_pars_vertex:Ev,skinning_vertex:wv,skinnormal_vertex:Av,specularmap_fragment:Cv,specularmap_pars_fragment:Rv,tonemapping_fragment:Lv,tonemapping_pars_fragment:Iv,transmission_fragment:Pv,transmission_pars_fragment:Uv,uv_pars_fragment:Dv,uv_pars_vertex:Ov,uv_vertex:Nv,worldpos_vertex:Fv,background_vert:kv,background_frag:Bv,backgroundCube_vert:zv,backgroundCube_frag:Vv,cube_vert:Gv,cube_frag:Hv,depth_vert:Wv,depth_frag:Xv,distanceRGBA_vert:qv,distanceRGBA_frag:Yv,equirect_vert:Zv,equirect_frag:$v,linedashed_vert:jv,linedashed_frag:Jv,meshbasic_vert:Kv,meshbasic_frag:Qv,meshlambert_vert:e_,meshlambert_frag:t_,meshmatcap_vert:n_,meshmatcap_frag:i_,meshnormal_vert:s_,meshnormal_frag:r_,meshphong_vert:a_,meshphong_frag:o_,meshphysical_vert:l_,meshphysical_frag:c_,meshtoon_vert:u_,meshtoon_frag:h_,points_vert:f_,points_frag:d_,shadow_vert:p_,shadow_frag:m_,sprite_vert:g_,sprite_frag:y_},Ee={common:{diffuse:{value:new vt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ft},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ft}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ft},normalScale:{value:new Ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0},uvTransform:{value:new ft}},sprite:{diffuse:{value:new vt(16777215)},opacity:{value:1},center:{value:new Ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ft},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0}}},Jn={basic:{uniforms:hn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:hn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new vt(0)}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:hn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new vt(0)},specular:{value:new vt(1118481)},shininess:{value:30}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:hn([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:hn([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new vt(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:hn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:hn([Ee.points,Ee.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:hn([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:hn([Ee.common,Ee.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:hn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:hn([Ee.sprite,Ee.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distanceRGBA:{uniforms:hn([Ee.common,Ee.displacementmap,{referencePosition:{value:new ee},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distanceRGBA_vert,fragmentShader:ht.distanceRGBA_frag},shadow:{uniforms:hn([Ee.lights,Ee.fog,{color:{value:new vt(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};Jn.physical={uniforms:hn([Jn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ft},clearcoatNormalScale:{value:new Ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ft},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ft},sheen:{value:0},sheenColor:{value:new vt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ft},transmissionSamplerSize:{value:new Ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ft},attenuationDistance:{value:0},attenuationColor:{value:new vt(0)},specularColor:{value:new vt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ft},anisotropyVector:{value:new Ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ft}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};var la={r:0,b:0,g:0};function x_(l,e,n,a,c,h,p){let d=new vt(0),y=h===!0?0:1,x,_,M=null,T=0,w=null;function A(E,b){let k=!1,P=b.isScene===!0?b.background:null;P&&P.isTexture&&(P=(b.backgroundBlurriness>0?n:e).get(P)),P===null?C(d,y):P&&P.isColor&&(C(P,1),k=!0);let V=l.xr.getEnvironmentBlendMode();V==="additive"?a.buffers.color.setClear(0,0,0,1,p):V==="alpha-blend"&&a.buffers.color.setClear(0,0,0,0,p),(l.autoClear||k)&&l.clear(l.autoClearColor,l.autoClearDepth,l.autoClearStencil),P&&(P.isCubeTexture||P.mapping===Pa)?(_===void 0&&(_=new In(new gr(1,1,1),new yi({name:"BackgroundCubeMaterial",uniforms:Xs(Jn.backgroundCube.uniforms),vertexShader:Jn.backgroundCube.vertexShader,fragmentShader:Jn.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1})),_.geometry.deleteAttribute("normal"),_.geometry.deleteAttribute("uv"),_.onBeforeRender=function(Z,X,W){this.matrixWorld.copyPosition(W.matrixWorld)},Object.defineProperty(_.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),c.update(_)),_.material.uniforms.envMap.value=P,_.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,_.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,_.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,_.material.toneMapped=At.getTransfer(P.colorSpace)!==It,(M!==P||T!==P.version||w!==l.toneMapping)&&(_.material.needsUpdate=!0,M=P,T=P.version,w=l.toneMapping),_.layers.enableAll(),E.unshift(_,_.geometry,_.material,0,0,null)):P&&P.isTexture&&(x===void 0&&(x=new In(new rl(2,2),new yi({name:"BackgroundMaterial",uniforms:Xs(Jn.background.uniforms),vertexShader:Jn.background.vertexShader,fragmentShader:Jn.background.fragmentShader,side:Bi,depthTest:!1,depthWrite:!1,fog:!1})),x.geometry.deleteAttribute("normal"),Object.defineProperty(x.material,"map",{get:function(){return this.uniforms.t2D.value}}),c.update(x)),x.material.uniforms.t2D.value=P,x.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,x.material.toneMapped=At.getTransfer(P.colorSpace)!==It,P.matrixAutoUpdate===!0&&P.updateMatrix(),x.material.uniforms.uvTransform.value.copy(P.matrix),(M!==P||T!==P.version||w!==l.toneMapping)&&(x.material.needsUpdate=!0,M=P,T=P.version,w=l.toneMapping),x.layers.enableAll(),E.unshift(x,x.geometry,x.material,0,0,null))}function C(E,b){E.getRGB(la,Hh(l)),a.buffers.color.setClear(la.r,la.g,la.b,b,p)}return{getClearColor:function(){return d},setClearColor:function(E,b=1){d.set(E),y=b,C(d,y)},getClearAlpha:function(){return y},setClearAlpha:function(E){y=E,C(d,y)},render:A}}function v_(l,e,n,a){let c=l.getParameter(l.MAX_VERTEX_ATTRIBS),h=a.isWebGL2?null:e.get("OES_vertex_array_object"),p=a.isWebGL2||h!==null,d={},y=E(null),x=y,_=!1;function M(q,te,le,ue,ce){let se=!1;if(p){let pe=C(ue,le,te);x!==pe&&(x=pe,w(x.object)),se=b(q,ue,le,ce),se&&k(q,ue,le,ce)}else{let pe=te.wireframe===!0;(x.geometry!==ue.id||x.program!==le.id||x.wireframe!==pe)&&(x.geometry=ue.id,x.program=le.id,x.wireframe=pe,se=!0)}ce!==null&&n.update(ce,l.ELEMENT_ARRAY_BUFFER),(se||_)&&(_=!1,fe(q,te,le,ue),ce!==null&&l.bindBuffer(l.ELEMENT_ARRAY_BUFFER,n.get(ce).buffer))}function T(){return a.isWebGL2?l.createVertexArray():h.createVertexArrayOES()}function w(q){return a.isWebGL2?l.bindVertexArray(q):h.bindVertexArrayOES(q)}function A(q){return a.isWebGL2?l.deleteVertexArray(q):h.deleteVertexArrayOES(q)}function C(q,te,le){let ue=le.wireframe===!0,ce=d[q.id];ce===void 0&&(ce={},d[q.id]=ce);let se=ce[te.id];se===void 0&&(se={},ce[te.id]=se);let pe=se[ue];return pe===void 0&&(pe=E(T()),se[ue]=pe),pe}function E(q){let te=[],le=[],ue=[];for(let ce=0;ce<c;ce++)te[ce]=0,le[ce]=0,ue[ce]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:te,enabledAttributes:le,attributeDivisors:ue,object:q,attributes:{},index:null}}function b(q,te,le,ue){let ce=x.attributes,se=te.attributes,pe=0,Me=le.getAttributes();for(let Le in Me)if(Me[Le].location>=0){let me=ce[Le],Ae=se[Le];if(Ae===void 0&&(Le==="instanceMatrix"&&q.instanceMatrix&&(Ae=q.instanceMatrix),Le==="instanceColor"&&q.instanceColor&&(Ae=q.instanceColor)),me===void 0||me.attribute!==Ae||Ae&&me.data!==Ae.data)return!0;pe++}return x.attributesNum!==pe||x.index!==ue}function k(q,te,le,ue){let ce={},se=te.attributes,pe=0,Me=le.getAttributes();for(let Le in Me)if(Me[Le].location>=0){let me=se[Le];me===void 0&&(Le==="instanceMatrix"&&q.instanceMatrix&&(me=q.instanceMatrix),Le==="instanceColor"&&q.instanceColor&&(me=q.instanceColor));let Ae={};Ae.attribute=me,me&&me.data&&(Ae.data=me.data),ce[Le]=Ae,pe++}x.attributes=ce,x.attributesNum=pe,x.index=ue}function P(){let q=x.newAttributes;for(let te=0,le=q.length;te<le;te++)q[te]=0}function V(q){Z(q,0)}function Z(q,te){let le=x.newAttributes,ue=x.enabledAttributes,ce=x.attributeDivisors;le[q]=1,ue[q]===0&&(l.enableVertexAttribArray(q),ue[q]=1),ce[q]!==te&&((a.isWebGL2?l:e.get("ANGLE_instanced_arrays"))[a.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](q,te),ce[q]=te)}function X(){let q=x.newAttributes,te=x.enabledAttributes;for(let le=0,ue=te.length;le<ue;le++)te[le]!==q[le]&&(l.disableVertexAttribArray(le),te[le]=0)}function W(q,te,le,ue,ce,se,pe){pe===!0?l.vertexAttribIPointer(q,te,le,ce,se):l.vertexAttribPointer(q,te,le,ue,ce,se)}function fe(q,te,le,ue){if(a.isWebGL2===!1&&(q.isInstancedMesh||ue.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;P();let ce=ue.attributes,se=le.getAttributes(),pe=te.defaultAttributeValues;for(let Me in se){let Le=se[Me];if(Le.location>=0){let oe=ce[Me];if(oe===void 0&&(Me==="instanceMatrix"&&q.instanceMatrix&&(oe=q.instanceMatrix),Me==="instanceColor"&&q.instanceColor&&(oe=q.instanceColor)),oe!==void 0){let me=oe.normalized,Ae=oe.itemSize,He=n.get(oe);if(He===void 0)continue;let Ge=He.buffer,he=He.type,nt=He.bytesPerElement,$e=a.isWebGL2===!0&&(he===l.INT||he===l.UNSIGNED_INT||oe.gpuType===Ph);if(oe.isInterleavedBufferAttribute){let dt=oe.data,K=dt.stride,Ft=oe.offset;if(dt.isInstancedInterleavedBuffer){for(let re=0;re<Le.locationSize;re++)Z(Le.location+re,dt.meshPerAttribute);q.isInstancedMesh!==!0&&ue._maxInstanceCount===void 0&&(ue._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let re=0;re<Le.locationSize;re++)V(Le.location+re);l.bindBuffer(l.ARRAY_BUFFER,Ge);for(let re=0;re<Le.locationSize;re++)W(Le.location+re,Ae/Le.locationSize,he,me,K*nt,(Ft+Ae/Le.locationSize*re)*nt,$e)}else{if(oe.isInstancedBufferAttribute){for(let dt=0;dt<Le.locationSize;dt++)Z(Le.location+dt,oe.meshPerAttribute);q.isInstancedMesh!==!0&&ue._maxInstanceCount===void 0&&(ue._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let dt=0;dt<Le.locationSize;dt++)V(Le.location+dt);l.bindBuffer(l.ARRAY_BUFFER,Ge);for(let dt=0;dt<Le.locationSize;dt++)W(Le.location+dt,Ae/Le.locationSize,he,me,Ae*nt,Ae/Le.locationSize*dt*nt,$e)}}else if(pe!==void 0){let me=pe[Me];if(me!==void 0)switch(me.length){case 2:l.vertexAttrib2fv(Le.location,me);break;case 3:l.vertexAttrib3fv(Le.location,me);break;case 4:l.vertexAttrib4fv(Le.location,me);break;default:l.vertexAttrib1fv(Le.location,me)}}}}X()}function D(){ge();for(let q in d){let te=d[q];for(let le in te){let ue=te[le];for(let ce in ue)A(ue[ce].object),delete ue[ce];delete te[le]}delete d[q]}}function N(q){if(d[q.id]===void 0)return;let te=d[q.id];for(let le in te){let ue=te[le];for(let ce in ue)A(ue[ce].object),delete ue[ce];delete te[le]}delete d[q.id]}function ae(q){for(let te in d){let le=d[te];if(le[q.id]===void 0)continue;let ue=le[q.id];for(let ce in ue)A(ue[ce].object),delete ue[ce];delete le[q.id]}}function ge(){we(),_=!0,x!==y&&(x=y,w(x.object))}function we(){y.geometry=null,y.program=null,y.wireframe=!1}return{setup:M,reset:ge,resetDefaultState:we,dispose:D,releaseStatesOfGeometry:N,releaseStatesOfProgram:ae,initAttributes:P,enableAttribute:V,disableUnusedAttributes:X}}function __(l,e,n,a){let c=a.isWebGL2,h;function p(_){h=_}function d(_,M){l.drawArrays(h,_,M),n.update(M,h,1)}function y(_,M,T){if(T===0)return;let w,A;if(c)w=l,A="drawArraysInstanced";else if(w=e.get("ANGLE_instanced_arrays"),A="drawArraysInstancedANGLE",w===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}w[A](h,_,M,T),n.update(M,h,T)}function x(_,M,T){if(T===0)return;let w=e.get("WEBGL_multi_draw");if(w===null)for(let A=0;A<T;A++)this.render(_[A],M[A]);else{w.multiDrawArraysWEBGL(h,_,0,M,0,T);let A=0;for(let C=0;C<T;C++)A+=M[C];n.update(A,h,1)}}this.setMode=p,this.render=d,this.renderInstances=y,this.renderMultiDraw=x}function b_(l,e,n){let a;function c(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){let W=e.get("EXT_texture_filter_anisotropic");a=l.getParameter(W.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function h(W){if(W==="highp"){if(l.getShaderPrecisionFormat(l.VERTEX_SHADER,l.HIGH_FLOAT).precision>0&&l.getShaderPrecisionFormat(l.FRAGMENT_SHADER,l.HIGH_FLOAT).precision>0)return"highp";W="mediump"}return W==="mediump"&&l.getShaderPrecisionFormat(l.VERTEX_SHADER,l.MEDIUM_FLOAT).precision>0&&l.getShaderPrecisionFormat(l.FRAGMENT_SHADER,l.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=typeof WebGL2RenderingContext<"u"&&l.constructor.name==="WebGL2RenderingContext",d=n.precision!==void 0?n.precision:"highp",y=h(d);y!==d&&(console.warn("THREE.WebGLRenderer:",d,"not supported, using",y,"instead."),d=y);let x=p||e.has("WEBGL_draw_buffers"),_=n.logarithmicDepthBuffer===!0,M=l.getParameter(l.MAX_TEXTURE_IMAGE_UNITS),T=l.getParameter(l.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=l.getParameter(l.MAX_TEXTURE_SIZE),A=l.getParameter(l.MAX_CUBE_MAP_TEXTURE_SIZE),C=l.getParameter(l.MAX_VERTEX_ATTRIBS),E=l.getParameter(l.MAX_VERTEX_UNIFORM_VECTORS),b=l.getParameter(l.MAX_VARYING_VECTORS),k=l.getParameter(l.MAX_FRAGMENT_UNIFORM_VECTORS),P=T>0,V=p||e.has("OES_texture_float"),Z=P&&V,X=p?l.getParameter(l.MAX_SAMPLES):0;return{isWebGL2:p,drawBuffers:x,getMaxAnisotropy:c,getMaxPrecision:h,precision:d,logarithmicDepthBuffer:_,maxTextures:M,maxVertexTextures:T,maxTextureSize:w,maxCubemapSize:A,maxAttributes:C,maxVertexUniforms:E,maxVaryings:b,maxFragmentUniforms:k,vertexTextures:P,floatFragmentTextures:V,floatVertexTextures:Z,maxSamples:X}}function S_(l){let e=this,n=null,a=0,c=!1,h=!1,p=new ui,d=new ft,y={value:null,needsUpdate:!1};this.uniform=y,this.numPlanes=0,this.numIntersection=0,this.init=function(M,T){let w=M.length!==0||T||a!==0||c;return c=T,a=M.length,w},this.beginShadows=function(){h=!0,_(null)},this.endShadows=function(){h=!1},this.setGlobalState=function(M,T){n=_(M,T,0)},this.setState=function(M,T,w){let A=M.clippingPlanes,C=M.clipIntersection,E=M.clipShadows,b=l.get(M);if(!c||A===null||A.length===0||h&&!E)h?_(null):x();else{let k=h?0:a,P=k*4,V=b.clippingState||null;y.value=V,V=_(A,T,P,w);for(let Z=0;Z!==P;++Z)V[Z]=n[Z];b.clippingState=V,this.numIntersection=C?this.numPlanes:0,this.numPlanes+=k}};function x(){y.value!==n&&(y.value=n,y.needsUpdate=a>0),e.numPlanes=a,e.numIntersection=0}function _(M,T,w,A){let C=M!==null?M.length:0,E=null;if(C!==0){if(E=y.value,A!==!0||E===null){let b=w+C*4,k=T.matrixWorldInverse;d.getNormalMatrix(k),(E===null||E.length<b)&&(E=new Float32Array(b));for(let P=0,V=w;P!==C;++P,V+=4)p.copy(M[P]).applyMatrix4(k,d),p.normal.toArray(E,V),E[V+3]=p.constant}y.value=E,y.needsUpdate=!0}return e.numPlanes=C,e.numIntersection=0,E}}function M_(l){let e=new WeakMap;function n(p,d){return d===Yo?p.mapping=Vs:d===Zo&&(p.mapping=Gs),p}function a(p){if(p&&p.isTexture){let d=p.mapping;if(d===Yo||d===Zo)if(e.has(p)){let y=e.get(p).texture;return n(y,p.mapping)}else{let y=p.image;if(y&&y.height>0){let x=new sl(y.height/2);return x.fromEquirectangularTexture(l,p),e.set(p,x),p.addEventListener("dispose",c),n(x.texture,p.mapping)}else return null}}return p}function c(p){let d=p.target;d.removeEventListener("dispose",c);let y=e.get(d);y!==void 0&&(e.delete(d),y.dispose())}function h(){e=new WeakMap}return{get:a,dispose:h}}var al=class extends Aa{constructor(e=-1,n=1,a=1,c=-1,h=.1,p=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=a,this.bottom=c,this.near=h,this.far=p,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,a,c,h,p){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=c,this.view.width=h,this.view.height=p,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,c=(this.top+this.bottom)/2,h=a-e,p=a+e,d=c+n,y=c-n;if(this.view!==null&&this.view.enabled){let x=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;h+=x*this.view.offsetX,p=h+x*this.view.width,d-=_*this.view.offsetY,y=d-_*this.view.height}this.projectionMatrix.makeOrthographic(h,p,d,y,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}},Os=4,lh=[.125,.215,.35,.446,.526,.582],is=20,zo=new al,ch=new vt,Vo=null,Go=0,Ho=0,ts=(1+Math.sqrt(5))/2,Us=1/ts,uh=[new ee(1,1,1),new ee(-1,1,1),new ee(1,1,-1),new ee(-1,1,-1),new ee(0,ts,Us),new ee(0,ts,-Us),new ee(Us,0,ts),new ee(-Us,0,ts),new ee(ts,Us,0),new ee(-ts,Us,0)],La=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,a=.1,c=100){Vo=this._renderer.getRenderTarget(),Go=this._renderer.getActiveCubeFace(),Ho=this._renderer.getActiveMipmapLevel(),this._setSize(256);let h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(e,a,c,h),n>0&&this._blur(h,0,0,n),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=dh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Vo,Go,Ho),e.scissorTest=!1,ca(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Vs||e.mapping===Gs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Vo=this._renderer.getRenderTarget(),Go=this._renderer.getActiveCubeFace(),Ho=this._renderer.getActiveMipmapLevel();let a=n||this._allocateTargets();return this._textureToCubeUV(e,a),this._applyPMREM(a),this._cleanup(a),a}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,a={magFilter:Rn,minFilter:Rn,generateMipmaps:!1,type:pr,format:Hn,colorSpace:pi,depthBuffer:!1},c=hh(e,n,a);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hh(e,n,a);let{_lodMax:h}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=T_(h)),this._blurMaterial=E_(h,e,n)}return c}_compileMaterial(e){let n=new In(this._lodPlanes[0],e);this._renderer.compile(n,zo)}_sceneToCubeUV(e,n,a,c){let d=new Mn(90,1,n,a),y=[1,-1,1,1,1,1],x=[1,1,1,-1,-1,-1],_=this._renderer,M=_.autoClear,T=_.toneMapping;_.getClearColor(ch),_.toneMapping=Fi,_.autoClear=!1;let w=new Ta({name:"PMREM.Background",side:gn,depthWrite:!1,depthTest:!1}),A=new In(new gr,w),C=!1,E=e.background;E?E.isColor&&(w.color.copy(E),e.background=null,C=!0):(w.color.copy(ch),C=!0);for(let b=0;b<6;b++){let k=b%3;k===0?(d.up.set(0,y[b],0),d.lookAt(x[b],0,0)):k===1?(d.up.set(0,0,y[b]),d.lookAt(0,x[b],0)):(d.up.set(0,y[b],0),d.lookAt(0,0,x[b]));let P=this._cubeSize;ca(c,k*P,b>2?P:0,P,P),_.setRenderTarget(c),C&&_.render(A,d),_.render(e,d)}A.geometry.dispose(),A.material.dispose(),_.toneMapping=T,_.autoClear=M,e.background=E}_textureToCubeUV(e,n){let a=this._renderer,c=e.mapping===Vs||e.mapping===Gs;c?(this._cubemapMaterial===null&&(this._cubemapMaterial=dh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fh());let h=c?this._cubemapMaterial:this._equirectMaterial,p=new In(this._lodPlanes[0],h),d=h.uniforms;d.envMap.value=e;let y=this._cubeSize;ca(n,0,0,3*y,2*y),a.setRenderTarget(n),a.render(p,zo)}_applyPMREM(e){let n=this._renderer,a=n.autoClear;n.autoClear=!1;for(let c=1;c<this._lodPlanes.length;c++){let h=Math.sqrt(this._sigmas[c]*this._sigmas[c]-this._sigmas[c-1]*this._sigmas[c-1]),p=uh[(c-1)%uh.length];this._blur(e,c-1,c,h,p)}n.autoClear=a}_blur(e,n,a,c,h){let p=this._pingPongRenderTarget;this._halfBlur(e,p,n,a,c,"latitudinal",h),this._halfBlur(p,e,a,a,c,"longitudinal",h)}_halfBlur(e,n,a,c,h,p,d){let y=this._renderer,x=this._blurMaterial;p!=="latitudinal"&&p!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let _=3,M=new In(this._lodPlanes[c],x),T=x.uniforms,w=this._sizeLods[a]-1,A=isFinite(h)?Math.PI/(2*w):2*Math.PI/(2*is-1),C=h/A,E=isFinite(h)?1+Math.floor(_*C):is;E>is&&console.warn(`sigmaRadians, ${h}, is too large and will clip, as it requested ${E} samples when the maximum is set to ${is}`);let b=[],k=0;for(let W=0;W<is;++W){let fe=W/C,D=Math.exp(-fe*fe/2);b.push(D),W===0?k+=D:W<E&&(k+=2*D)}for(let W=0;W<b.length;W++)b[W]=b[W]/k;T.envMap.value=e.texture,T.samples.value=E,T.weights.value=b,T.latitudinal.value=p==="latitudinal",d&&(T.poleAxis.value=d);let{_lodMax:P}=this;T.dTheta.value=A,T.mipInt.value=P-a;let V=this._sizeLods[c],Z=3*V*(c>P-Os?c-P+Os:0),X=4*(this._cubeSize-V);ca(n,Z,X,3*V,2*V),y.setRenderTarget(n),y.render(M,zo)}};function T_(l){let e=[],n=[],a=[],c=l,h=l-Os+1+lh.length;for(let p=0;p<h;p++){let d=Math.pow(2,c);n.push(d);let y=1/d;p>l-Os?y=lh[p-l+Os-1]:p===0&&(y=0),a.push(y);let x=1/(d-2),_=-x,M=1+x,T=[_,_,M,_,M,M,_,_,M,M,_,M],w=6,A=6,C=3,E=2,b=1,k=new Float32Array(C*A*w),P=new Float32Array(E*A*w),V=new Float32Array(b*A*w);for(let X=0;X<w;X++){let W=X%3*2/3-1,fe=X>2?0:-1,D=[W,fe,0,W+2/3,fe,0,W+2/3,fe+1,0,W,fe,0,W+2/3,fe+1,0,W,fe+1,0];k.set(D,C*A*X),P.set(T,E*A*X);let N=[X,X,X,X,X,X];V.set(N,b*A*X)}let Z=new gi;Z.setAttribute("position",new $t(k,C)),Z.setAttribute("uv",new $t(P,E)),Z.setAttribute("faceIndex",new $t(V,b)),e.push(Z),c>Os&&c--}return{lodPlanes:e,sizeLods:n,sigmas:a}}function hh(l,e,n){let a=new mi(l,e,n);return a.texture.mapping=Pa,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function ca(l,e,n,a,c){l.viewport.set(e,n,a,c),l.scissor.set(e,n,a,c)}function E_(l,e,n){let a=new Float32Array(is),c=new ee(0,1,0);return new yi({name:"SphericalGaussianBlur",defines:{n:is,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${l}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:a},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:c}},vertexShader:Il(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ni,depthTest:!1,depthWrite:!1})}function fh(){return new yi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Il(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ni,depthTest:!1,depthWrite:!1})}function dh(){return new yi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Il(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ni,depthTest:!1,depthWrite:!1})}function Il(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function w_(l){let e=new WeakMap,n=null;function a(d){if(d&&d.isTexture){let y=d.mapping,x=y===Yo||y===Zo,_=y===Vs||y===Gs;if(x||_)if(d.isRenderTargetTexture&&d.needsPMREMUpdate===!0){d.needsPMREMUpdate=!1;let M=e.get(d);return n===null&&(n=new La(l)),M=x?n.fromEquirectangular(d,M):n.fromCubemap(d,M),e.set(d,M),M.texture}else{if(e.has(d))return e.get(d).texture;{let M=d.image;if(x&&M&&M.height>0||_&&M&&c(M)){n===null&&(n=new La(l));let T=x?n.fromEquirectangular(d):n.fromCubemap(d);return e.set(d,T),d.addEventListener("dispose",h),T.texture}else return null}}}return d}function c(d){let y=0,x=6;for(let _=0;_<x;_++)d[_]!==void 0&&y++;return y===x}function h(d){let y=d.target;y.removeEventListener("dispose",h);let x=e.get(y);x!==void 0&&(e.delete(y),x.dispose())}function p(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:a,dispose:p}}function A_(l){let e={};function n(a){if(e[a]!==void 0)return e[a];let c;switch(a){case"WEBGL_depth_texture":c=l.getExtension("WEBGL_depth_texture")||l.getExtension("MOZ_WEBGL_depth_texture")||l.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":c=l.getExtension("EXT_texture_filter_anisotropic")||l.getExtension("MOZ_EXT_texture_filter_anisotropic")||l.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":c=l.getExtension("WEBGL_compressed_texture_s3tc")||l.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||l.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":c=l.getExtension("WEBGL_compressed_texture_pvrtc")||l.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:c=l.getExtension(a)}return e[a]=c,c}return{has:function(a){return n(a)!==null},init:function(a){a.isWebGL2?(n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance")):(n("WEBGL_depth_texture"),n("OES_texture_float"),n("OES_texture_half_float"),n("OES_texture_half_float_linear"),n("OES_standard_derivatives"),n("OES_element_index_uint"),n("OES_vertex_array_object"),n("ANGLE_instanced_arrays")),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture")},get:function(a){let c=n(a);return c===null&&console.warn("THREE.WebGLRenderer: "+a+" extension not supported."),c}}}function C_(l,e,n,a){let c={},h=new WeakMap;function p(M){let T=M.target;T.index!==null&&e.remove(T.index);for(let A in T.attributes)e.remove(T.attributes[A]);for(let A in T.morphAttributes){let C=T.morphAttributes[A];for(let E=0,b=C.length;E<b;E++)e.remove(C[E])}T.removeEventListener("dispose",p),delete c[T.id];let w=h.get(T);w&&(e.remove(w),h.delete(T)),a.releaseStatesOfGeometry(T),T.isInstancedBufferGeometry===!0&&delete T._maxInstanceCount,n.memory.geometries--}function d(M,T){return c[T.id]===!0||(T.addEventListener("dispose",p),c[T.id]=!0,n.memory.geometries++),T}function y(M){let T=M.attributes;for(let A in T)e.update(T[A],l.ARRAY_BUFFER);let w=M.morphAttributes;for(let A in w){let C=w[A];for(let E=0,b=C.length;E<b;E++)e.update(C[E],l.ARRAY_BUFFER)}}function x(M){let T=[],w=M.index,A=M.attributes.position,C=0;if(w!==null){let k=w.array;C=w.version;for(let P=0,V=k.length;P<V;P+=3){let Z=k[P+0],X=k[P+1],W=k[P+2];T.push(Z,X,X,W,W,Z)}}else if(A!==void 0){let k=A.array;C=A.version;for(let P=0,V=k.length/3-1;P<V;P+=3){let Z=P+0,X=P+1,W=P+2;T.push(Z,X,X,W,W,Z)}}else return;let E=new(Vh(T)?wa:Ea)(T,1);E.version=C;let b=h.get(M);b&&e.remove(b),h.set(M,E)}function _(M){let T=h.get(M);if(T){let w=M.index;w!==null&&T.version<w.version&&x(M)}else x(M);return h.get(M)}return{get:d,update:y,getWireframeAttribute:_}}function R_(l,e,n,a){let c=a.isWebGL2,h;function p(w){h=w}let d,y;function x(w){d=w.type,y=w.bytesPerElement}function _(w,A){l.drawElements(h,A,d,w*y),n.update(A,h,1)}function M(w,A,C){if(C===0)return;let E,b;if(c)E=l,b="drawElementsInstanced";else if(E=e.get("ANGLE_instanced_arrays"),b="drawElementsInstancedANGLE",E===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}E[b](h,A,d,w*y,C),n.update(A,h,C)}function T(w,A,C){if(C===0)return;let E=e.get("WEBGL_multi_draw");if(E===null)for(let b=0;b<C;b++)this.render(w[b]/y,A[b]);else{E.multiDrawElementsWEBGL(h,A,0,d,w,0,C);let b=0;for(let k=0;k<C;k++)b+=A[k];n.update(b,h,1)}}this.setMode=p,this.setIndex=x,this.render=_,this.renderInstances=M,this.renderMultiDraw=T}function L_(l){let e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function a(h,p,d){switch(n.calls++,p){case l.TRIANGLES:n.triangles+=d*(h/3);break;case l.LINES:n.lines+=d*(h/2);break;case l.LINE_STRIP:n.lines+=d*(h-1);break;case l.LINE_LOOP:n.lines+=d*h;break;case l.POINTS:n.points+=d*h;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",p);break}}function c(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:c,update:a}}function I_(l,e){return l[0]-e[0]}function P_(l,e){return Math.abs(e[1])-Math.abs(l[1])}function U_(l,e,n){let a={},c=new Float32Array(8),h=new WeakMap,p=new Zt,d=[];for(let x=0;x<8;x++)d[x]=[x,0];function y(x,_,M){let T=x.morphTargetInfluences;if(e.isWebGL2===!0){let w=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,A=w!==void 0?w.length:0,C=h.get(_);if(C===void 0||C.count!==A){let q=function(){ge.dispose(),h.delete(_),_.removeEventListener("dispose",q)};C!==void 0&&C.texture.dispose();let k=_.morphAttributes.position!==void 0,P=_.morphAttributes.normal!==void 0,V=_.morphAttributes.color!==void 0,Z=_.morphAttributes.position||[],X=_.morphAttributes.normal||[],W=_.morphAttributes.color||[],fe=0;k===!0&&(fe=1),P===!0&&(fe=2),V===!0&&(fe=3);let D=_.attributes.position.count*fe,N=1;D>e.maxTextureSize&&(N=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);let ae=new Float32Array(D*N*4*A),ge=new ba(ae,D,N,A);ge.type=Oi,ge.needsUpdate=!0;let we=fe*4;for(let te=0;te<A;te++){let le=Z[te],ue=X[te],ce=W[te],se=D*N*4*te;for(let pe=0;pe<le.count;pe++){let Me=pe*we;k===!0&&(p.fromBufferAttribute(le,pe),ae[se+Me+0]=p.x,ae[se+Me+1]=p.y,ae[se+Me+2]=p.z,ae[se+Me+3]=0),P===!0&&(p.fromBufferAttribute(ue,pe),ae[se+Me+4]=p.x,ae[se+Me+5]=p.y,ae[se+Me+6]=p.z,ae[se+Me+7]=0),V===!0&&(p.fromBufferAttribute(ce,pe),ae[se+Me+8]=p.x,ae[se+Me+9]=p.y,ae[se+Me+10]=p.z,ae[se+Me+11]=ce.itemSize===4?p.w:1)}}C={count:A,texture:ge,size:new Ct(D,N)},h.set(_,C),_.addEventListener("dispose",q)}let E=0;for(let k=0;k<T.length;k++)E+=T[k];let b=_.morphTargetsRelative?1:1-E;M.getUniforms().setValue(l,"morphTargetBaseInfluence",b),M.getUniforms().setValue(l,"morphTargetInfluences",T),M.getUniforms().setValue(l,"morphTargetsTexture",C.texture,n),M.getUniforms().setValue(l,"morphTargetsTextureSize",C.size)}else{let w=T===void 0?0:T.length,A=a[_.id];if(A===void 0||A.length!==w){A=[];for(let P=0;P<w;P++)A[P]=[P,0];a[_.id]=A}for(let P=0;P<w;P++){let V=A[P];V[0]=P,V[1]=T[P]}A.sort(P_);for(let P=0;P<8;P++)P<w&&A[P][1]?(d[P][0]=A[P][0],d[P][1]=A[P][1]):(d[P][0]=Number.MAX_SAFE_INTEGER,d[P][1]=0);d.sort(I_);let C=_.morphAttributes.position,E=_.morphAttributes.normal,b=0;for(let P=0;P<8;P++){let V=d[P],Z=V[0],X=V[1];Z!==Number.MAX_SAFE_INTEGER&&X?(C&&_.getAttribute("morphTarget"+P)!==C[Z]&&_.setAttribute("morphTarget"+P,C[Z]),E&&_.getAttribute("morphNormal"+P)!==E[Z]&&_.setAttribute("morphNormal"+P,E[Z]),c[P]=X,b+=X):(C&&_.hasAttribute("morphTarget"+P)===!0&&_.deleteAttribute("morphTarget"+P),E&&_.hasAttribute("morphNormal"+P)===!0&&_.deleteAttribute("morphNormal"+P),c[P]=0)}let k=_.morphTargetsRelative?1:1-b;M.getUniforms().setValue(l,"morphTargetBaseInfluence",k),M.getUniforms().setValue(l,"morphTargetInfluences",c)}}return{update:y}}function D_(l,e,n,a){let c=new WeakMap;function h(y){let x=a.render.frame,_=y.geometry,M=e.get(y,_);if(c.get(M)!==x&&(e.update(M),c.set(M,x)),y.isInstancedMesh&&(y.hasEventListener("dispose",d)===!1&&y.addEventListener("dispose",d),c.get(y)!==x&&(n.update(y.instanceMatrix,l.ARRAY_BUFFER),y.instanceColor!==null&&n.update(y.instanceColor,l.ARRAY_BUFFER),c.set(y,x))),y.isSkinnedMesh){let T=y.skeleton;c.get(T)!==x&&(T.update(),c.set(T,x))}return M}function p(){c=new WeakMap}function d(y){let x=y.target;x.removeEventListener("dispose",d),n.remove(x.instanceMatrix),x.instanceColor!==null&&n.remove(x.instanceColor)}return{update:h,dispose:p}}var Ia=class extends Wn{constructor(e,n,a,c,h,p,d,y,x,_){if(_=_!==void 0?_:rs,_!==rs&&_!==Hs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");a===void 0&&_===rs&&(a=Di),a===void 0&&_===Hs&&(a=ss),super(null,c,h,p,d,y,_,a,x),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=d!==void 0?d:fn,this.minFilter=y!==void 0?y:fn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}},Xh=new Wn,qh=new Ia(1,1);qh.compareFunction=zh;var Yh=new ba,Zh=new tl,$h=new Ca,ph=[],mh=[],gh=new Float32Array(16),yh=new Float32Array(9),xh=new Float32Array(4);function Ys(l,e,n){let a=l[0];if(a<=0||a>0)return l;let c=e*n,h=ph[c];if(h===void 0&&(h=new Float32Array(c),ph[c]=h),e!==0){a.toArray(h,0);for(let p=1,d=0;p!==e;++p)d+=n,l[p].toArray(h,d)}return h}function Ht(l,e){if(l.length!==e.length)return!1;for(let n=0,a=l.length;n<a;n++)if(l[n]!==e[n])return!1;return!0}function Wt(l,e){for(let n=0,a=e.length;n<a;n++)l[n]=e[n]}function Da(l,e){let n=mh[e];n===void 0&&(n=new Int32Array(e),mh[e]=n);for(let a=0;a!==e;++a)n[a]=l.allocateTextureUnit();return n}function O_(l,e){let n=this.cache;n[0]!==e&&(l.uniform1f(this.addr,e),n[0]=e)}function N_(l,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(l.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ht(n,e))return;l.uniform2fv(this.addr,e),Wt(n,e)}}function F_(l,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(l.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(l.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Ht(n,e))return;l.uniform3fv(this.addr,e),Wt(n,e)}}function k_(l,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(l.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ht(n,e))return;l.uniform4fv(this.addr,e),Wt(n,e)}}function B_(l,e){let n=this.cache,a=e.elements;if(a===void 0){if(Ht(n,e))return;l.uniformMatrix2fv(this.addr,!1,e),Wt(n,e)}else{if(Ht(n,a))return;xh.set(a),l.uniformMatrix2fv(this.addr,!1,xh),Wt(n,a)}}function z_(l,e){let n=this.cache,a=e.elements;if(a===void 0){if(Ht(n,e))return;l.uniformMatrix3fv(this.addr,!1,e),Wt(n,e)}else{if(Ht(n,a))return;yh.set(a),l.uniformMatrix3fv(this.addr,!1,yh),Wt(n,a)}}function V_(l,e){let n=this.cache,a=e.elements;if(a===void 0){if(Ht(n,e))return;l.uniformMatrix4fv(this.addr,!1,e),Wt(n,e)}else{if(Ht(n,a))return;gh.set(a),l.uniformMatrix4fv(this.addr,!1,gh),Wt(n,a)}}function G_(l,e){let n=this.cache;n[0]!==e&&(l.uniform1i(this.addr,e),n[0]=e)}function H_(l,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(l.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ht(n,e))return;l.uniform2iv(this.addr,e),Wt(n,e)}}function W_(l,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(l.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ht(n,e))return;l.uniform3iv(this.addr,e),Wt(n,e)}}function X_(l,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(l.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ht(n,e))return;l.uniform4iv(this.addr,e),Wt(n,e)}}function q_(l,e){let n=this.cache;n[0]!==e&&(l.uniform1ui(this.addr,e),n[0]=e)}function Y_(l,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(l.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ht(n,e))return;l.uniform2uiv(this.addr,e),Wt(n,e)}}function Z_(l,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(l.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ht(n,e))return;l.uniform3uiv(this.addr,e),Wt(n,e)}}function $_(l,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(l.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ht(n,e))return;l.uniform4uiv(this.addr,e),Wt(n,e)}}function j_(l,e,n){let a=this.cache,c=n.allocateTextureUnit();a[0]!==c&&(l.uniform1i(this.addr,c),a[0]=c);let h=this.type===l.SAMPLER_2D_SHADOW?qh:Xh;n.setTexture2D(e||h,c)}function J_(l,e,n){let a=this.cache,c=n.allocateTextureUnit();a[0]!==c&&(l.uniform1i(this.addr,c),a[0]=c),n.setTexture3D(e||Zh,c)}function K_(l,e,n){let a=this.cache,c=n.allocateTextureUnit();a[0]!==c&&(l.uniform1i(this.addr,c),a[0]=c),n.setTextureCube(e||$h,c)}function Q_(l,e,n){let a=this.cache,c=n.allocateTextureUnit();a[0]!==c&&(l.uniform1i(this.addr,c),a[0]=c),n.setTexture2DArray(e||Yh,c)}function eb(l){switch(l){case 5126:return O_;case 35664:return N_;case 35665:return F_;case 35666:return k_;case 35674:return B_;case 35675:return z_;case 35676:return V_;case 5124:case 35670:return G_;case 35667:case 35671:return H_;case 35668:case 35672:return W_;case 35669:case 35673:return X_;case 5125:return q_;case 36294:return Y_;case 36295:return Z_;case 36296:return $_;case 35678:case 36198:case 36298:case 36306:case 35682:return j_;case 35679:case 36299:case 36307:return J_;case 35680:case 36300:case 36308:case 36293:return K_;case 36289:case 36303:case 36311:case 36292:return Q_}}function tb(l,e){l.uniform1fv(this.addr,e)}function nb(l,e){let n=Ys(e,this.size,2);l.uniform2fv(this.addr,n)}function ib(l,e){let n=Ys(e,this.size,3);l.uniform3fv(this.addr,n)}function sb(l,e){let n=Ys(e,this.size,4);l.uniform4fv(this.addr,n)}function rb(l,e){let n=Ys(e,this.size,4);l.uniformMatrix2fv(this.addr,!1,n)}function ab(l,e){let n=Ys(e,this.size,9);l.uniformMatrix3fv(this.addr,!1,n)}function ob(l,e){let n=Ys(e,this.size,16);l.uniformMatrix4fv(this.addr,!1,n)}function lb(l,e){l.uniform1iv(this.addr,e)}function cb(l,e){l.uniform2iv(this.addr,e)}function ub(l,e){l.uniform3iv(this.addr,e)}function hb(l,e){l.uniform4iv(this.addr,e)}function fb(l,e){l.uniform1uiv(this.addr,e)}function db(l,e){l.uniform2uiv(this.addr,e)}function pb(l,e){l.uniform3uiv(this.addr,e)}function mb(l,e){l.uniform4uiv(this.addr,e)}function gb(l,e,n){let a=this.cache,c=e.length,h=Da(n,c);Ht(a,h)||(l.uniform1iv(this.addr,h),Wt(a,h));for(let p=0;p!==c;++p)n.setTexture2D(e[p]||Xh,h[p])}function yb(l,e,n){let a=this.cache,c=e.length,h=Da(n,c);Ht(a,h)||(l.uniform1iv(this.addr,h),Wt(a,h));for(let p=0;p!==c;++p)n.setTexture3D(e[p]||Zh,h[p])}function xb(l,e,n){let a=this.cache,c=e.length,h=Da(n,c);Ht(a,h)||(l.uniform1iv(this.addr,h),Wt(a,h));for(let p=0;p!==c;++p)n.setTextureCube(e[p]||$h,h[p])}function vb(l,e,n){let a=this.cache,c=e.length,h=Da(n,c);Ht(a,h)||(l.uniform1iv(this.addr,h),Wt(a,h));for(let p=0;p!==c;++p)n.setTexture2DArray(e[p]||Yh,h[p])}function _b(l){switch(l){case 5126:return tb;case 35664:return nb;case 35665:return ib;case 35666:return sb;case 35674:return rb;case 35675:return ab;case 35676:return ob;case 5124:case 35670:return lb;case 35667:case 35671:return cb;case 35668:case 35672:return ub;case 35669:case 35673:return hb;case 5125:return fb;case 36294:return db;case 36295:return pb;case 36296:return mb;case 35678:case 36198:case 36298:case 36306:case 35682:return gb;case 35679:case 36299:case 36307:return yb;case 35680:case 36300:case 36308:case 36293:return xb;case 36289:case 36303:case 36311:case 36292:return vb}}var ol=class{constructor(e,n,a){this.id=e,this.addr=a,this.cache=[],this.type=n.type,this.setValue=eb(n.type)}},ll=class{constructor(e,n,a){this.id=e,this.addr=a,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=_b(n.type)}},cl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,a){let c=this.seq;for(let h=0,p=c.length;h!==p;++h){let d=c[h];d.setValue(e,n[d.id],a)}}},Wo=/(\w+)(\])?(\[|\.)?/g;function vh(l,e){l.seq.push(e),l.map[e.id]=e}function bb(l,e,n){let a=l.name,c=a.length;for(Wo.lastIndex=0;;){let h=Wo.exec(a),p=Wo.lastIndex,d=h[1],y=h[2]==="]",x=h[3];if(y&&(d=d|0),x===void 0||x==="["&&p+2===c){vh(n,x===void 0?new ol(d,l,e):new ll(d,l,e));break}else{let M=n.map[d];M===void 0&&(M=new cl(d),vh(n,M)),n=M}}}var zs=class{constructor(e,n){this.seq=[],this.map={};let a=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let c=0;c<a;++c){let h=e.getActiveUniform(n,c),p=e.getUniformLocation(n,h.name);bb(h,p,this)}}setValue(e,n,a,c){let h=this.map[n];h!==void 0&&h.setValue(e,a,c)}setOptional(e,n,a){let c=n[a];c!==void 0&&this.setValue(e,a,c)}static upload(e,n,a,c){for(let h=0,p=n.length;h!==p;++h){let d=n[h],y=a[d.id];y.needsUpdate!==!1&&d.setValue(e,y.value,c)}}static seqWithValue(e,n){let a=[];for(let c=0,h=e.length;c!==h;++c){let p=e[c];p.id in n&&a.push(p)}return a}};function _h(l,e,n){let a=l.createShader(e);return l.shaderSource(a,n),l.compileShader(a),a}var Sb=37297,Mb=0;function Tb(l,e){let n=l.split(`
`),a=[],c=Math.max(e-6,0),h=Math.min(e+6,n.length);for(let p=c;p<h;p++){let d=p+1;a.push(`${d===e?">":" "} ${d}: ${n[p]}`)}return a.join(`
`)}function Eb(l){let e=At.getPrimaries(At.workingColorSpace),n=At.getPrimaries(l),a;switch(e===n?a="":e===ga&&n===ma?a="LinearDisplayP3ToLinearSRGB":e===ma&&n===ga&&(a="LinearSRGBToLinearDisplayP3"),l){case pi:case Ua:return[a,"LinearTransferOETF"];case Yt:case Ll:return[a,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",l),[a,"LinearTransferOETF"]}}function bh(l,e,n){let a=l.getShaderParameter(e,l.COMPILE_STATUS),c=l.getShaderInfoLog(e).trim();if(a&&c==="")return"";let h=/ERROR: 0:(\d+)/.exec(c);if(h){let p=parseInt(h[1]);return n.toUpperCase()+`

`+c+`

`+Tb(l.getShaderSource(e),p)}else return c}function wb(l,e){let n=Eb(e);return`vec4 ${l}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function Ab(l,e){let n;switch(e){case W0:n="Linear";break;case X0:n="Reinhard";break;case q0:n="OptimizedCineon";break;case Y0:n="ACESFilmic";break;case $0:n="AgX";break;case Z0:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+l+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function Cb(l){return[l.extensionDerivatives||l.envMapCubeUVHeight||l.bumpMap||l.normalMapTangentSpace||l.clearcoatNormalMap||l.flatShading||l.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(l.extensionFragDepth||l.logarithmicDepthBuffer)&&l.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",l.extensionDrawBuffers&&l.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(l.extensionShaderTextureLOD||l.envMap||l.transmission)&&l.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ns).join(`
`)}function Rb(l){return[l.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ns).join(`
`)}function Lb(l){let e=[];for(let n in l){let a=l[n];a!==!1&&e.push("#define "+n+" "+a)}return e.join(`
`)}function Ib(l,e){let n={},a=l.getProgramParameter(e,l.ACTIVE_ATTRIBUTES);for(let c=0;c<a;c++){let h=l.getActiveAttrib(e,c),p=h.name,d=1;h.type===l.FLOAT_MAT2&&(d=2),h.type===l.FLOAT_MAT3&&(d=3),h.type===l.FLOAT_MAT4&&(d=4),n[p]={type:h.type,location:l.getAttribLocation(e,p),locationSize:d}}return n}function Ns(l){return l!==""}function Sh(l,e){let n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return l.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Mh(l,e){return l.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Pb=/^[ \t]*#include +<([\w\d./]+)>/gm;function ul(l){return l.replace(Pb,Db)}var Ub=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Db(l,e){let n=ht[e];if(n===void 0){let a=Ub.get(e);if(a!==void 0)n=ht[a],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,a);else throw new Error("Can not resolve #include <"+e+">")}return ul(n)}var Ob=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Th(l){return l.replace(Ob,Nb)}function Nb(l,e,n,a){let c="";for(let h=parseInt(e);h<parseInt(n);h++)c+=a.replace(/\[\s*i\s*\]/g,"[ "+h+" ]").replace(/UNROLLED_LOOP_INDEX/g,h);return c}function Eh(l){let e="precision "+l.precision+` float;
precision `+l.precision+" int;";return l.precision==="highp"?e+=`
#define HIGH_PRECISION`:l.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:l.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Fb(l){let e="SHADOWMAP_TYPE_BASIC";return l.shadowMapType===Rh?e="SHADOWMAP_TYPE_PCF":l.shadowMapType===x0?e="SHADOWMAP_TYPE_PCF_SOFT":l.shadowMapType===ci&&(e="SHADOWMAP_TYPE_VSM"),e}function kb(l){let e="ENVMAP_TYPE_CUBE";if(l.envMap)switch(l.envMapMode){case Vs:case Gs:e="ENVMAP_TYPE_CUBE";break;case Pa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Bb(l){let e="ENVMAP_MODE_REFLECTION";return l.envMap&&l.envMapMode===Gs&&(e="ENVMAP_MODE_REFRACTION"),e}function zb(l){let e="ENVMAP_BLENDING_NONE";if(l.envMap)switch(l.combine){case Lh:e="ENVMAP_BLENDING_MULTIPLY";break;case G0:e="ENVMAP_BLENDING_MIX";break;case H0:e="ENVMAP_BLENDING_ADD";break}return e}function Vb(l){let e=l.envMapCubeUVHeight;if(e===null)return null;let n=Math.log2(e)-2,a=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:a,maxMip:n}}function Gb(l,e,n,a){let c=l.getContext(),h=n.defines,p=n.vertexShader,d=n.fragmentShader,y=Fb(n),x=kb(n),_=Bb(n),M=zb(n),T=Vb(n),w=n.isWebGL2?"":Cb(n),A=Rb(n),C=Lb(h),E=c.createProgram(),b,k,P=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(b=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,C].filter(Ns).join(`
`),b.length>0&&(b+=`
`),k=[w,"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,C].filter(Ns).join(`
`),k.length>0&&(k+=`
`)):(b=[Eh(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,C,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+_:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors&&n.isWebGL2?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+y:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ns).join(`
`),k=[w,Eh(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,C,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+x:"",n.envMap?"#define "+_:"",n.envMap?"#define "+M:"",T?"#define CUBEUV_TEXEL_WIDTH "+T.texelWidth:"",T?"#define CUBEUV_TEXEL_HEIGHT "+T.texelHeight:"",T?"#define CUBEUV_MAX_MIP "+T.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+y:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Fi?"#define TONE_MAPPING":"",n.toneMapping!==Fi?ht.tonemapping_pars_fragment:"",n.toneMapping!==Fi?Ab("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,wb("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ns).join(`
`)),p=ul(p),p=Sh(p,n),p=Mh(p,n),d=ul(d),d=Sh(d,n),d=Mh(d,n),p=Th(p),d=Th(d),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(P=`#version 300 es
`,b=[A,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+b,k=["precision mediump sampler2DArray;","#define varying in",n.glslVersion===Wu?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Wu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+k);let V=P+b+p,Z=P+k+d,X=_h(c,c.VERTEX_SHADER,V),W=_h(c,c.FRAGMENT_SHADER,Z);c.attachShader(E,X),c.attachShader(E,W),n.index0AttributeName!==void 0?c.bindAttribLocation(E,0,n.index0AttributeName):n.morphTargets===!0&&c.bindAttribLocation(E,0,"position"),c.linkProgram(E);function fe(ge){if(l.debug.checkShaderErrors){let we=c.getProgramInfoLog(E).trim(),q=c.getShaderInfoLog(X).trim(),te=c.getShaderInfoLog(W).trim(),le=!0,ue=!0;if(c.getProgramParameter(E,c.LINK_STATUS)===!1)if(le=!1,typeof l.debug.onShaderError=="function")l.debug.onShaderError(c,E,X,W);else{let ce=bh(c,X,"vertex"),se=bh(c,W,"fragment");console.error("THREE.WebGLProgram: Shader Error "+c.getError()+" - VALIDATE_STATUS "+c.getProgramParameter(E,c.VALIDATE_STATUS)+`

Program Info Log: `+we+`
`+ce+`
`+se)}else we!==""?console.warn("THREE.WebGLProgram: Program Info Log:",we):(q===""||te==="")&&(ue=!1);ue&&(ge.diagnostics={runnable:le,programLog:we,vertexShader:{log:q,prefix:b},fragmentShader:{log:te,prefix:k}})}c.deleteShader(X),c.deleteShader(W),D=new zs(c,E),N=Ib(c,E)}let D;this.getUniforms=function(){return D===void 0&&fe(this),D};let N;this.getAttributes=function(){return N===void 0&&fe(this),N};let ae=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return ae===!1&&(ae=c.getProgramParameter(E,Sb)),ae},this.destroy=function(){a.releaseStatesOfProgram(this),c.deleteProgram(E),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Mb++,this.cacheKey=e,this.usedTimes=1,this.program=E,this.vertexShader=X,this.fragmentShader=W,this}var Hb=0,hl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let n=e.vertexShader,a=e.fragmentShader,c=this._getShaderStage(n),h=this._getShaderStage(a),p=this._getShaderCacheForMaterial(e);return p.has(c)===!1&&(p.add(c),c.usedTimes++),p.has(h)===!1&&(p.add(h),h.usedTimes++),this}remove(e){let n=this.materialCache.get(e);for(let a of n)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let n=this.materialCache,a=n.get(e);return a===void 0&&(a=new Set,n.set(e,a)),a}_getShaderStage(e){let n=this.shaderCache,a=n.get(e);return a===void 0&&(a=new fl(e),n.set(e,a)),a}},fl=class{constructor(e){this.id=Hb++,this.code=e,this.usedTimes=0}};function Wb(l,e,n,a,c,h,p){let d=new Ma,y=new hl,x=[],_=c.isWebGL2,M=c.logarithmicDepthBuffer,T=c.vertexTextures,w=c.precision,A={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function C(D){return D===0?"uv":`uv${D}`}function E(D,N,ae,ge,we){let q=ge.fog,te=we.geometry,le=D.isMeshStandardMaterial?ge.environment:null,ue=(D.isMeshStandardMaterial?n:e).get(D.envMap||le),ce=ue&&ue.mapping===Pa?ue.image.height:null,se=A[D.type];D.precision!==null&&(w=c.getMaxPrecision(D.precision),w!==D.precision&&console.warn("THREE.WebGLProgram.getParameters:",D.precision,"not supported, using",w,"instead."));let pe=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,Me=pe!==void 0?pe.length:0,Le=0;te.morphAttributes.position!==void 0&&(Le=1),te.morphAttributes.normal!==void 0&&(Le=2),te.morphAttributes.color!==void 0&&(Le=3);let oe,me,Ae,He;if(se){let H=Jn[se];oe=H.vertexShader,me=H.fragmentShader}else oe=D.vertexShader,me=D.fragmentShader,y.update(D),Ae=y.getVertexShaderID(D),He=y.getFragmentShaderID(D);let Ge=l.getRenderTarget(),he=we.isInstancedMesh===!0,nt=we.isBatchedMesh===!0,$e=!!D.map,dt=!!D.matcap,K=!!ue,Ft=!!D.aoMap,re=!!D.lightMap,xe=!!D.bumpMap,Pe=!!D.normalMap,St=!!D.displacementMap,et=!!D.emissiveMap,O=!!D.metalnessMap,R=!!D.roughnessMap,j=D.anisotropy>0,be=D.clearcoat>0,ye=D.iridescence>0,Se=D.sheen>0,ke=D.transmission>0,ve=j&&!!D.anisotropyMap,Ue=be&&!!D.clearcoatMap,qe=be&&!!D.clearcoatNormalMap,Qe=be&&!!D.clearcoatRoughnessMap,de=ye&&!!D.iridescenceMap,gt=ye&&!!D.iridescenceThicknessMap,rt=Se&&!!D.sheenColorMap,je=Se&&!!D.sheenRoughnessMap,We=!!D.specularMap,$=!!D.specularColorMap,it=!!D.specularIntensityMap,mt=ke&&!!D.transmissionMap,Pt=ke&&!!D.thicknessMap,at=!!D.gradientMap,Te=!!D.alphaMap,G=D.alphaTest>0,Ce=!!D.alphaHash,Re=!!D.extensions,Je=!!te.attributes.uv1,Ye=!!te.attributes.uv2,Mt=!!te.attributes.uv3,Tt=Fi;return D.toneMapped&&(Ge===null||Ge.isXRRenderTarget===!0)&&(Tt=l.toneMapping),{isWebGL2:_,shaderID:se,shaderType:D.type,shaderName:D.name,vertexShader:oe,fragmentShader:me,defines:D.defines,customVertexShaderID:Ae,customFragmentShaderID:He,isRawShaderMaterial:D.isRawShaderMaterial===!0,glslVersion:D.glslVersion,precision:w,batching:nt,instancing:he,instancingColor:he&&we.instanceColor!==null,supportsVertexTextures:T,outputColorSpace:Ge===null?l.outputColorSpace:Ge.isXRRenderTarget===!0?Ge.texture.colorSpace:pi,map:$e,matcap:dt,envMap:K,envMapMode:K&&ue.mapping,envMapCubeUVHeight:ce,aoMap:Ft,lightMap:re,bumpMap:xe,normalMap:Pe,displacementMap:T&&St,emissiveMap:et,normalMapObjectSpace:Pe&&D.normalMapType===ly,normalMapTangentSpace:Pe&&D.normalMapType===oy,metalnessMap:O,roughnessMap:R,anisotropy:j,anisotropyMap:ve,clearcoat:be,clearcoatMap:Ue,clearcoatNormalMap:qe,clearcoatRoughnessMap:Qe,iridescence:ye,iridescenceMap:de,iridescenceThicknessMap:gt,sheen:Se,sheenColorMap:rt,sheenRoughnessMap:je,specularMap:We,specularColorMap:$,specularIntensityMap:it,transmission:ke,transmissionMap:mt,thicknessMap:Pt,gradientMap:at,opaque:D.transparent===!1&&D.blending===ks,alphaMap:Te,alphaTest:G,alphaHash:Ce,combine:D.combine,mapUv:$e&&C(D.map.channel),aoMapUv:Ft&&C(D.aoMap.channel),lightMapUv:re&&C(D.lightMap.channel),bumpMapUv:xe&&C(D.bumpMap.channel),normalMapUv:Pe&&C(D.normalMap.channel),displacementMapUv:St&&C(D.displacementMap.channel),emissiveMapUv:et&&C(D.emissiveMap.channel),metalnessMapUv:O&&C(D.metalnessMap.channel),roughnessMapUv:R&&C(D.roughnessMap.channel),anisotropyMapUv:ve&&C(D.anisotropyMap.channel),clearcoatMapUv:Ue&&C(D.clearcoatMap.channel),clearcoatNormalMapUv:qe&&C(D.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Qe&&C(D.clearcoatRoughnessMap.channel),iridescenceMapUv:de&&C(D.iridescenceMap.channel),iridescenceThicknessMapUv:gt&&C(D.iridescenceThicknessMap.channel),sheenColorMapUv:rt&&C(D.sheenColorMap.channel),sheenRoughnessMapUv:je&&C(D.sheenRoughnessMap.channel),specularMapUv:We&&C(D.specularMap.channel),specularColorMapUv:$&&C(D.specularColorMap.channel),specularIntensityMapUv:it&&C(D.specularIntensityMap.channel),transmissionMapUv:mt&&C(D.transmissionMap.channel),thicknessMapUv:Pt&&C(D.thicknessMap.channel),alphaMapUv:Te&&C(D.alphaMap.channel),vertexTangents:!!te.attributes.tangent&&(Pe||j),vertexColors:D.vertexColors,vertexAlphas:D.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,vertexUv1s:Je,vertexUv2s:Ye,vertexUv3s:Mt,pointsUvs:we.isPoints===!0&&!!te.attributes.uv&&($e||Te),fog:!!q,useFog:D.fog===!0,fogExp2:q&&q.isFogExp2,flatShading:D.flatShading===!0,sizeAttenuation:D.sizeAttenuation===!0,logarithmicDepthBuffer:M,skinning:we.isSkinnedMesh===!0,morphTargets:te.morphAttributes.position!==void 0,morphNormals:te.morphAttributes.normal!==void 0,morphColors:te.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:Le,numDirLights:N.directional.length,numPointLights:N.point.length,numSpotLights:N.spot.length,numSpotLightMaps:N.spotLightMap.length,numRectAreaLights:N.rectArea.length,numHemiLights:N.hemi.length,numDirLightShadows:N.directionalShadowMap.length,numPointLightShadows:N.pointShadowMap.length,numSpotLightShadows:N.spotShadowMap.length,numSpotLightShadowsWithMaps:N.numSpotLightShadowsWithMaps,numLightProbes:N.numLightProbes,numClippingPlanes:p.numPlanes,numClipIntersection:p.numIntersection,dithering:D.dithering,shadowMapEnabled:l.shadowMap.enabled&&ae.length>0,shadowMapType:l.shadowMap.type,toneMapping:Tt,useLegacyLights:l._useLegacyLights,decodeVideoTexture:$e&&D.map.isVideoTexture===!0&&At.getTransfer(D.map.colorSpace)===It,premultipliedAlpha:D.premultipliedAlpha,doubleSided:D.side===hi,flipSided:D.side===gn,useDepthPacking:D.depthPacking>=0,depthPacking:D.depthPacking||0,index0AttributeName:D.index0AttributeName,extensionDerivatives:Re&&D.extensions.derivatives===!0,extensionFragDepth:Re&&D.extensions.fragDepth===!0,extensionDrawBuffers:Re&&D.extensions.drawBuffers===!0,extensionShaderTextureLOD:Re&&D.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Re&&D.extensions.clipCullDistance&&a.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:_||a.has("EXT_frag_depth"),rendererExtensionDrawBuffers:_||a.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:_||a.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:a.has("KHR_parallel_shader_compile"),customProgramCacheKey:D.customProgramCacheKey()}}function b(D){let N=[];if(D.shaderID?N.push(D.shaderID):(N.push(D.customVertexShaderID),N.push(D.customFragmentShaderID)),D.defines!==void 0)for(let ae in D.defines)N.push(ae),N.push(D.defines[ae]);return D.isRawShaderMaterial===!1&&(k(N,D),P(N,D),N.push(l.outputColorSpace)),N.push(D.customProgramCacheKey),N.join()}function k(D,N){D.push(N.precision),D.push(N.outputColorSpace),D.push(N.envMapMode),D.push(N.envMapCubeUVHeight),D.push(N.mapUv),D.push(N.alphaMapUv),D.push(N.lightMapUv),D.push(N.aoMapUv),D.push(N.bumpMapUv),D.push(N.normalMapUv),D.push(N.displacementMapUv),D.push(N.emissiveMapUv),D.push(N.metalnessMapUv),D.push(N.roughnessMapUv),D.push(N.anisotropyMapUv),D.push(N.clearcoatMapUv),D.push(N.clearcoatNormalMapUv),D.push(N.clearcoatRoughnessMapUv),D.push(N.iridescenceMapUv),D.push(N.iridescenceThicknessMapUv),D.push(N.sheenColorMapUv),D.push(N.sheenRoughnessMapUv),D.push(N.specularMapUv),D.push(N.specularColorMapUv),D.push(N.specularIntensityMapUv),D.push(N.transmissionMapUv),D.push(N.thicknessMapUv),D.push(N.combine),D.push(N.fogExp2),D.push(N.sizeAttenuation),D.push(N.morphTargetsCount),D.push(N.morphAttributeCount),D.push(N.numDirLights),D.push(N.numPointLights),D.push(N.numSpotLights),D.push(N.numSpotLightMaps),D.push(N.numHemiLights),D.push(N.numRectAreaLights),D.push(N.numDirLightShadows),D.push(N.numPointLightShadows),D.push(N.numSpotLightShadows),D.push(N.numSpotLightShadowsWithMaps),D.push(N.numLightProbes),D.push(N.shadowMapType),D.push(N.toneMapping),D.push(N.numClippingPlanes),D.push(N.numClipIntersection),D.push(N.depthPacking)}function P(D,N){d.disableAll(),N.isWebGL2&&d.enable(0),N.supportsVertexTextures&&d.enable(1),N.instancing&&d.enable(2),N.instancingColor&&d.enable(3),N.matcap&&d.enable(4),N.envMap&&d.enable(5),N.normalMapObjectSpace&&d.enable(6),N.normalMapTangentSpace&&d.enable(7),N.clearcoat&&d.enable(8),N.iridescence&&d.enable(9),N.alphaTest&&d.enable(10),N.vertexColors&&d.enable(11),N.vertexAlphas&&d.enable(12),N.vertexUv1s&&d.enable(13),N.vertexUv2s&&d.enable(14),N.vertexUv3s&&d.enable(15),N.vertexTangents&&d.enable(16),N.anisotropy&&d.enable(17),N.alphaHash&&d.enable(18),N.batching&&d.enable(19),D.push(d.mask),d.disableAll(),N.fog&&d.enable(0),N.useFog&&d.enable(1),N.flatShading&&d.enable(2),N.logarithmicDepthBuffer&&d.enable(3),N.skinning&&d.enable(4),N.morphTargets&&d.enable(5),N.morphNormals&&d.enable(6),N.morphColors&&d.enable(7),N.premultipliedAlpha&&d.enable(8),N.shadowMapEnabled&&d.enable(9),N.useLegacyLights&&d.enable(10),N.doubleSided&&d.enable(11),N.flipSided&&d.enable(12),N.useDepthPacking&&d.enable(13),N.dithering&&d.enable(14),N.transmission&&d.enable(15),N.sheen&&d.enable(16),N.opaque&&d.enable(17),N.pointsUvs&&d.enable(18),N.decodeVideoTexture&&d.enable(19),D.push(d.mask)}function V(D){let N=A[D.type],ae;if(N){let ge=Jn[N];ae=Uy.clone(ge.uniforms)}else ae=D.uniforms;return ae}function Z(D,N){let ae;for(let ge=0,we=x.length;ge<we;ge++){let q=x[ge];if(q.cacheKey===N){ae=q,++ae.usedTimes;break}}return ae===void 0&&(ae=new Gb(l,N,D,h),x.push(ae)),ae}function X(D){if(--D.usedTimes===0){let N=x.indexOf(D);x[N]=x[x.length-1],x.pop(),D.destroy()}}function W(D){y.remove(D)}function fe(){y.dispose()}return{getParameters:E,getProgramCacheKey:b,getUniforms:V,acquireProgram:Z,releaseProgram:X,releaseShaderCache:W,programs:x,dispose:fe}}function Xb(){let l=new WeakMap;function e(h){let p=l.get(h);return p===void 0&&(p={},l.set(h,p)),p}function n(h){l.delete(h)}function a(h,p,d){l.get(h)[p]=d}function c(){l=new WeakMap}return{get:e,remove:n,update:a,dispose:c}}function qb(l,e){return l.groupOrder!==e.groupOrder?l.groupOrder-e.groupOrder:l.renderOrder!==e.renderOrder?l.renderOrder-e.renderOrder:l.material.id!==e.material.id?l.material.id-e.material.id:l.z!==e.z?l.z-e.z:l.id-e.id}function wh(l,e){return l.groupOrder!==e.groupOrder?l.groupOrder-e.groupOrder:l.renderOrder!==e.renderOrder?l.renderOrder-e.renderOrder:l.z!==e.z?e.z-l.z:l.id-e.id}function Ah(){let l=[],e=0,n=[],a=[],c=[];function h(){e=0,n.length=0,a.length=0,c.length=0}function p(M,T,w,A,C,E){let b=l[e];return b===void 0?(b={id:M.id,object:M,geometry:T,material:w,groupOrder:A,renderOrder:M.renderOrder,z:C,group:E},l[e]=b):(b.id=M.id,b.object=M,b.geometry=T,b.material=w,b.groupOrder=A,b.renderOrder=M.renderOrder,b.z=C,b.group=E),e++,b}function d(M,T,w,A,C,E){let b=p(M,T,w,A,C,E);w.transmission>0?a.push(b):w.transparent===!0?c.push(b):n.push(b)}function y(M,T,w,A,C,E){let b=p(M,T,w,A,C,E);w.transmission>0?a.unshift(b):w.transparent===!0?c.unshift(b):n.unshift(b)}function x(M,T){n.length>1&&n.sort(M||qb),a.length>1&&a.sort(T||wh),c.length>1&&c.sort(T||wh)}function _(){for(let M=e,T=l.length;M<T;M++){let w=l[M];if(w.id===null)break;w.id=null,w.object=null,w.geometry=null,w.material=null,w.group=null}}return{opaque:n,transmissive:a,transparent:c,init:h,push:d,unshift:y,finish:_,sort:x}}function Yb(){let l=new WeakMap;function e(a,c){let h=l.get(a),p;return h===void 0?(p=new Ah,l.set(a,[p])):c>=h.length?(p=new Ah,h.push(p)):p=h[c],p}function n(){l=new WeakMap}return{get:e,dispose:n}}function Zb(){let l={};return{get:function(e){if(l[e.id]!==void 0)return l[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new ee,color:new vt};break;case"SpotLight":n={position:new ee,direction:new ee,color:new vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new ee,color:new vt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new ee,skyColor:new vt,groundColor:new vt};break;case"RectAreaLight":n={color:new vt,position:new ee,halfWidth:new ee,halfHeight:new ee};break}return l[e.id]=n,n}}}function $b(){let l={};return{get:function(e){if(l[e.id]!==void 0)return l[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return l[e.id]=n,n}}}var jb=0;function Jb(l,e){return(e.castShadow?2:0)-(l.castShadow?2:0)+(e.map?1:0)-(l.map?1:0)}function Kb(l,e){let n=new Zb,a=$b(),c={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let _=0;_<9;_++)c.probe.push(new ee);let h=new ee,p=new qt,d=new qt;function y(_,M){let T=0,w=0,A=0;for(let ge=0;ge<9;ge++)c.probe[ge].set(0,0,0);let C=0,E=0,b=0,k=0,P=0,V=0,Z=0,X=0,W=0,fe=0,D=0;_.sort(Jb);let N=M===!0?Math.PI:1;for(let ge=0,we=_.length;ge<we;ge++){let q=_[ge],te=q.color,le=q.intensity,ue=q.distance,ce=q.shadow&&q.shadow.map?q.shadow.map.texture:null;if(q.isAmbientLight)T+=te.r*le*N,w+=te.g*le*N,A+=te.b*le*N;else if(q.isLightProbe){for(let se=0;se<9;se++)c.probe[se].addScaledVector(q.sh.coefficients[se],le);D++}else if(q.isDirectionalLight){let se=n.get(q);if(se.color.copy(q.color).multiplyScalar(q.intensity*N),q.castShadow){let pe=q.shadow,Me=a.get(q);Me.shadowBias=pe.bias,Me.shadowNormalBias=pe.normalBias,Me.shadowRadius=pe.radius,Me.shadowMapSize=pe.mapSize,c.directionalShadow[C]=Me,c.directionalShadowMap[C]=ce,c.directionalShadowMatrix[C]=q.shadow.matrix,V++}c.directional[C]=se,C++}else if(q.isSpotLight){let se=n.get(q);se.position.setFromMatrixPosition(q.matrixWorld),se.color.copy(te).multiplyScalar(le*N),se.distance=ue,se.coneCos=Math.cos(q.angle),se.penumbraCos=Math.cos(q.angle*(1-q.penumbra)),se.decay=q.decay,c.spot[b]=se;let pe=q.shadow;if(q.map&&(c.spotLightMap[W]=q.map,W++,pe.updateMatrices(q),q.castShadow&&fe++),c.spotLightMatrix[b]=pe.matrix,q.castShadow){let Me=a.get(q);Me.shadowBias=pe.bias,Me.shadowNormalBias=pe.normalBias,Me.shadowRadius=pe.radius,Me.shadowMapSize=pe.mapSize,c.spotShadow[b]=Me,c.spotShadowMap[b]=ce,X++}b++}else if(q.isRectAreaLight){let se=n.get(q);se.color.copy(te).multiplyScalar(le),se.halfWidth.set(q.width*.5,0,0),se.halfHeight.set(0,q.height*.5,0),c.rectArea[k]=se,k++}else if(q.isPointLight){let se=n.get(q);if(se.color.copy(q.color).multiplyScalar(q.intensity*N),se.distance=q.distance,se.decay=q.decay,q.castShadow){let pe=q.shadow,Me=a.get(q);Me.shadowBias=pe.bias,Me.shadowNormalBias=pe.normalBias,Me.shadowRadius=pe.radius,Me.shadowMapSize=pe.mapSize,Me.shadowCameraNear=pe.camera.near,Me.shadowCameraFar=pe.camera.far,c.pointShadow[E]=Me,c.pointShadowMap[E]=ce,c.pointShadowMatrix[E]=q.shadow.matrix,Z++}c.point[E]=se,E++}else if(q.isHemisphereLight){let se=n.get(q);se.skyColor.copy(q.color).multiplyScalar(le*N),se.groundColor.copy(q.groundColor).multiplyScalar(le*N),c.hemi[P]=se,P++}}k>0&&(e.isWebGL2?l.has("OES_texture_float_linear")===!0?(c.rectAreaLTC1=Ee.LTC_FLOAT_1,c.rectAreaLTC2=Ee.LTC_FLOAT_2):(c.rectAreaLTC1=Ee.LTC_HALF_1,c.rectAreaLTC2=Ee.LTC_HALF_2):l.has("OES_texture_float_linear")===!0?(c.rectAreaLTC1=Ee.LTC_FLOAT_1,c.rectAreaLTC2=Ee.LTC_FLOAT_2):l.has("OES_texture_half_float_linear")===!0?(c.rectAreaLTC1=Ee.LTC_HALF_1,c.rectAreaLTC2=Ee.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),c.ambient[0]=T,c.ambient[1]=w,c.ambient[2]=A;let ae=c.hash;(ae.directionalLength!==C||ae.pointLength!==E||ae.spotLength!==b||ae.rectAreaLength!==k||ae.hemiLength!==P||ae.numDirectionalShadows!==V||ae.numPointShadows!==Z||ae.numSpotShadows!==X||ae.numSpotMaps!==W||ae.numLightProbes!==D)&&(c.directional.length=C,c.spot.length=b,c.rectArea.length=k,c.point.length=E,c.hemi.length=P,c.directionalShadow.length=V,c.directionalShadowMap.length=V,c.pointShadow.length=Z,c.pointShadowMap.length=Z,c.spotShadow.length=X,c.spotShadowMap.length=X,c.directionalShadowMatrix.length=V,c.pointShadowMatrix.length=Z,c.spotLightMatrix.length=X+W-fe,c.spotLightMap.length=W,c.numSpotLightShadowsWithMaps=fe,c.numLightProbes=D,ae.directionalLength=C,ae.pointLength=E,ae.spotLength=b,ae.rectAreaLength=k,ae.hemiLength=P,ae.numDirectionalShadows=V,ae.numPointShadows=Z,ae.numSpotShadows=X,ae.numSpotMaps=W,ae.numLightProbes=D,c.version=jb++)}function x(_,M){let T=0,w=0,A=0,C=0,E=0,b=M.matrixWorldInverse;for(let k=0,P=_.length;k<P;k++){let V=_[k];if(V.isDirectionalLight){let Z=c.directional[T];Z.direction.setFromMatrixPosition(V.matrixWorld),h.setFromMatrixPosition(V.target.matrixWorld),Z.direction.sub(h),Z.direction.transformDirection(b),T++}else if(V.isSpotLight){let Z=c.spot[A];Z.position.setFromMatrixPosition(V.matrixWorld),Z.position.applyMatrix4(b),Z.direction.setFromMatrixPosition(V.matrixWorld),h.setFromMatrixPosition(V.target.matrixWorld),Z.direction.sub(h),Z.direction.transformDirection(b),A++}else if(V.isRectAreaLight){let Z=c.rectArea[C];Z.position.setFromMatrixPosition(V.matrixWorld),Z.position.applyMatrix4(b),d.identity(),p.copy(V.matrixWorld),p.premultiply(b),d.extractRotation(p),Z.halfWidth.set(V.width*.5,0,0),Z.halfHeight.set(0,V.height*.5,0),Z.halfWidth.applyMatrix4(d),Z.halfHeight.applyMatrix4(d),C++}else if(V.isPointLight){let Z=c.point[w];Z.position.setFromMatrixPosition(V.matrixWorld),Z.position.applyMatrix4(b),w++}else if(V.isHemisphereLight){let Z=c.hemi[E];Z.direction.setFromMatrixPosition(V.matrixWorld),Z.direction.transformDirection(b),E++}}}return{setup:y,setupView:x,state:c}}function Ch(l,e){let n=new Kb(l,e),a=[],c=[];function h(){a.length=0,c.length=0}function p(M){a.push(M)}function d(M){c.push(M)}function y(M){n.setup(a,M)}function x(M){n.setupView(a,M)}return{init:h,state:{lightsArray:a,shadowsArray:c,lights:n},setupLights:y,setupLightsView:x,pushLight:p,pushShadow:d}}function Qb(l,e){let n=new WeakMap;function a(h,p=0){let d=n.get(h),y;return d===void 0?(y=new Ch(l,e),n.set(h,[y])):p>=d.length?(y=new Ch(l,e),d.push(y)):y=d[p],y}function c(){n=new WeakMap}return{get:a,dispose:c}}var dl=class extends Ws{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ry,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},pl=class extends Ws{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},e1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,t1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function n1(l,e,n){let a=new Ra,c=new Ct,h=new Ct,p=new Zt,d=new dl({depthPacking:ay}),y=new pl,x={},_=n.maxTextureSize,M={[Bi]:gn,[gn]:Bi,[hi]:hi},T=new yi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ct},radius:{value:4}},vertexShader:e1,fragmentShader:t1}),w=T.clone();w.defines.HORIZONTAL_PASS=1;let A=new gi;A.setAttribute("position",new $t(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let C=new In(A,T),E=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rh;let b=this.type;this.render=function(X,W,fe){if(E.enabled===!1||E.autoUpdate===!1&&E.needsUpdate===!1||X.length===0)return;let D=l.getRenderTarget(),N=l.getActiveCubeFace(),ae=l.getActiveMipmapLevel(),ge=l.state;ge.setBlending(Ni),ge.buffers.color.setClear(1,1,1,1),ge.buffers.depth.setTest(!0),ge.setScissorTest(!1);let we=b!==ci&&this.type===ci,q=b===ci&&this.type!==ci;for(let te=0,le=X.length;te<le;te++){let ue=X[te],ce=ue.shadow;if(ce===void 0){console.warn("THREE.WebGLShadowMap:",ue,"has no shadow.");continue}if(ce.autoUpdate===!1&&ce.needsUpdate===!1)continue;c.copy(ce.mapSize);let se=ce.getFrameExtents();if(c.multiply(se),h.copy(ce.mapSize),(c.x>_||c.y>_)&&(c.x>_&&(h.x=Math.floor(_/se.x),c.x=h.x*se.x,ce.mapSize.x=h.x),c.y>_&&(h.y=Math.floor(_/se.y),c.y=h.y*se.y,ce.mapSize.y=h.y)),ce.map===null||we===!0||q===!0){let Me=this.type!==ci?{minFilter:fn,magFilter:fn}:{};ce.map!==null&&ce.map.dispose(),ce.map=new mi(c.x,c.y,Me),ce.map.texture.name=ue.name+".shadowMap",ce.camera.updateProjectionMatrix()}l.setRenderTarget(ce.map),l.clear();let pe=ce.getViewportCount();for(let Me=0;Me<pe;Me++){let Le=ce.getViewport(Me);p.set(h.x*Le.x,h.y*Le.y,h.x*Le.z,h.y*Le.w),ge.viewport(p),ce.updateMatrices(ue,Me),a=ce.getFrustum(),V(W,fe,ce.camera,ue,this.type)}ce.isPointLightShadow!==!0&&this.type===ci&&k(ce,fe),ce.needsUpdate=!1}b=this.type,E.needsUpdate=!1,l.setRenderTarget(D,N,ae)};function k(X,W){let fe=e.update(C);T.defines.VSM_SAMPLES!==X.blurSamples&&(T.defines.VSM_SAMPLES=X.blurSamples,w.defines.VSM_SAMPLES=X.blurSamples,T.needsUpdate=!0,w.needsUpdate=!0),X.mapPass===null&&(X.mapPass=new mi(c.x,c.y)),T.uniforms.shadow_pass.value=X.map.texture,T.uniforms.resolution.value=X.mapSize,T.uniforms.radius.value=X.radius,l.setRenderTarget(X.mapPass),l.clear(),l.renderBufferDirect(W,null,fe,T,C,null),w.uniforms.shadow_pass.value=X.mapPass.texture,w.uniforms.resolution.value=X.mapSize,w.uniforms.radius.value=X.radius,l.setRenderTarget(X.map),l.clear(),l.renderBufferDirect(W,null,fe,w,C,null)}function P(X,W,fe,D){let N=null,ae=fe.isPointLight===!0?X.customDistanceMaterial:X.customDepthMaterial;if(ae!==void 0)N=ae;else if(N=fe.isPointLight===!0?y:d,l.localClippingEnabled&&W.clipShadows===!0&&Array.isArray(W.clippingPlanes)&&W.clippingPlanes.length!==0||W.displacementMap&&W.displacementScale!==0||W.alphaMap&&W.alphaTest>0||W.map&&W.alphaTest>0){let ge=N.uuid,we=W.uuid,q=x[ge];q===void 0&&(q={},x[ge]=q);let te=q[we];te===void 0&&(te=N.clone(),q[we]=te,W.addEventListener("dispose",Z)),N=te}if(N.visible=W.visible,N.wireframe=W.wireframe,D===ci?N.side=W.shadowSide!==null?W.shadowSide:W.side:N.side=W.shadowSide!==null?W.shadowSide:M[W.side],N.alphaMap=W.alphaMap,N.alphaTest=W.alphaTest,N.map=W.map,N.clipShadows=W.clipShadows,N.clippingPlanes=W.clippingPlanes,N.clipIntersection=W.clipIntersection,N.displacementMap=W.displacementMap,N.displacementScale=W.displacementScale,N.displacementBias=W.displacementBias,N.wireframeLinewidth=W.wireframeLinewidth,N.linewidth=W.linewidth,fe.isPointLight===!0&&N.isMeshDistanceMaterial===!0){let ge=l.properties.get(N);ge.light=fe}return N}function V(X,W,fe,D,N){if(X.visible===!1)return;if(X.layers.test(W.layers)&&(X.isMesh||X.isLine||X.isPoints)&&(X.castShadow||X.receiveShadow&&N===ci)&&(!X.frustumCulled||a.intersectsObject(X))){X.modelViewMatrix.multiplyMatrices(fe.matrixWorldInverse,X.matrixWorld);let we=e.update(X),q=X.material;if(Array.isArray(q)){let te=we.groups;for(let le=0,ue=te.length;le<ue;le++){let ce=te[le],se=q[ce.materialIndex];if(se&&se.visible){let pe=P(X,se,D,N);X.onBeforeShadow(l,X,W,fe,we,pe,ce),l.renderBufferDirect(fe,null,we,pe,X,ce),X.onAfterShadow(l,X,W,fe,we,pe,ce)}}}else if(q.visible){let te=P(X,q,D,N);X.onBeforeShadow(l,X,W,fe,we,te,null),l.renderBufferDirect(fe,null,we,te,X,null),X.onAfterShadow(l,X,W,fe,we,te,null)}}let ge=X.children;for(let we=0,q=ge.length;we<q;we++)V(ge[we],W,fe,D,N)}function Z(X){X.target.removeEventListener("dispose",Z);for(let fe in x){let D=x[fe],N=X.target.uuid;N in D&&(D[N].dispose(),delete D[N])}}}function i1(l,e,n){let a=n.isWebGL2;function c(){let G=!1,Ce=new Zt,Re=null,Je=new Zt(0,0,0,0);return{setMask:function(Ye){Re!==Ye&&!G&&(l.colorMask(Ye,Ye,Ye,Ye),Re=Ye)},setLocked:function(Ye){G=Ye},setClear:function(Ye,Mt,Tt,pt,H){H===!0&&(Ye*=pt,Mt*=pt,Tt*=pt),Ce.set(Ye,Mt,Tt,pt),Je.equals(Ce)===!1&&(l.clearColor(Ye,Mt,Tt,pt),Je.copy(Ce))},reset:function(){G=!1,Re=null,Je.set(-1,0,0,0)}}}function h(){let G=!1,Ce=null,Re=null,Je=null;return{setTest:function(Ye){Ye?nt(l.DEPTH_TEST):$e(l.DEPTH_TEST)},setMask:function(Ye){Ce!==Ye&&!G&&(l.depthMask(Ye),Ce=Ye)},setFunc:function(Ye){if(Re!==Ye){switch(Ye){case O0:l.depthFunc(l.NEVER);break;case N0:l.depthFunc(l.ALWAYS);break;case F0:l.depthFunc(l.LESS);break;case ha:l.depthFunc(l.LEQUAL);break;case k0:l.depthFunc(l.EQUAL);break;case B0:l.depthFunc(l.GEQUAL);break;case z0:l.depthFunc(l.GREATER);break;case V0:l.depthFunc(l.NOTEQUAL);break;default:l.depthFunc(l.LEQUAL)}Re=Ye}},setLocked:function(Ye){G=Ye},setClear:function(Ye){Je!==Ye&&(l.clearDepth(Ye),Je=Ye)},reset:function(){G=!1,Ce=null,Re=null,Je=null}}}function p(){let G=!1,Ce=null,Re=null,Je=null,Ye=null,Mt=null,Tt=null,pt=null,H=null;return{setTest:function(_t){G||(_t?nt(l.STENCIL_TEST):$e(l.STENCIL_TEST))},setMask:function(_t){Ce!==_t&&!G&&(l.stencilMask(_t),Ce=_t)},setFunc:function(_t,_e,nn){(Re!==_t||Je!==_e||Ye!==nn)&&(l.stencilFunc(_t,_e,nn),Re=_t,Je=_e,Ye=nn)},setOp:function(_t,_e,nn){(Mt!==_t||Tt!==_e||pt!==nn)&&(l.stencilOp(_t,_e,nn),Mt=_t,Tt=_e,pt=nn)},setLocked:function(_t){G=_t},setClear:function(_t){H!==_t&&(l.clearStencil(_t),H=_t)},reset:function(){G=!1,Ce=null,Re=null,Je=null,Ye=null,Mt=null,Tt=null,pt=null,H=null}}}let d=new c,y=new h,x=new p,_=new WeakMap,M=new WeakMap,T={},w={},A=new WeakMap,C=[],E=null,b=!1,k=null,P=null,V=null,Z=null,X=null,W=null,fe=null,D=new vt(0,0,0),N=0,ae=!1,ge=null,we=null,q=null,te=null,le=null,ue=l.getParameter(l.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ce=!1,se=0,pe=l.getParameter(l.VERSION);pe.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(pe)[1]),ce=se>=1):pe.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(pe)[1]),ce=se>=2);let Me=null,Le={},oe=l.getParameter(l.SCISSOR_BOX),me=l.getParameter(l.VIEWPORT),Ae=new Zt().fromArray(oe),He=new Zt().fromArray(me);function Ge(G,Ce,Re,Je){let Ye=new Uint8Array(4),Mt=l.createTexture();l.bindTexture(G,Mt),l.texParameteri(G,l.TEXTURE_MIN_FILTER,l.NEAREST),l.texParameteri(G,l.TEXTURE_MAG_FILTER,l.NEAREST);for(let Tt=0;Tt<Re;Tt++)a&&(G===l.TEXTURE_3D||G===l.TEXTURE_2D_ARRAY)?l.texImage3D(Ce,0,l.RGBA,1,1,Je,0,l.RGBA,l.UNSIGNED_BYTE,Ye):l.texImage2D(Ce+Tt,0,l.RGBA,1,1,0,l.RGBA,l.UNSIGNED_BYTE,Ye);return Mt}let he={};he[l.TEXTURE_2D]=Ge(l.TEXTURE_2D,l.TEXTURE_2D,1),he[l.TEXTURE_CUBE_MAP]=Ge(l.TEXTURE_CUBE_MAP,l.TEXTURE_CUBE_MAP_POSITIVE_X,6),a&&(he[l.TEXTURE_2D_ARRAY]=Ge(l.TEXTURE_2D_ARRAY,l.TEXTURE_2D_ARRAY,1,1),he[l.TEXTURE_3D]=Ge(l.TEXTURE_3D,l.TEXTURE_3D,1,1)),d.setClear(0,0,0,1),y.setClear(1),x.setClear(0),nt(l.DEPTH_TEST),y.setFunc(ha),et(!1),O(ou),nt(l.CULL_FACE),Pe(Ni);function nt(G){T[G]!==!0&&(l.enable(G),T[G]=!0)}function $e(G){T[G]!==!1&&(l.disable(G),T[G]=!1)}function dt(G,Ce){return w[G]!==Ce?(l.bindFramebuffer(G,Ce),w[G]=Ce,a&&(G===l.DRAW_FRAMEBUFFER&&(w[l.FRAMEBUFFER]=Ce),G===l.FRAMEBUFFER&&(w[l.DRAW_FRAMEBUFFER]=Ce)),!0):!1}function K(G,Ce){let Re=C,Je=!1;if(G)if(Re=A.get(Ce),Re===void 0&&(Re=[],A.set(Ce,Re)),G.isWebGLMultipleRenderTargets){let Ye=G.texture;if(Re.length!==Ye.length||Re[0]!==l.COLOR_ATTACHMENT0){for(let Mt=0,Tt=Ye.length;Mt<Tt;Mt++)Re[Mt]=l.COLOR_ATTACHMENT0+Mt;Re.length=Ye.length,Je=!0}}else Re[0]!==l.COLOR_ATTACHMENT0&&(Re[0]=l.COLOR_ATTACHMENT0,Je=!0);else Re[0]!==l.BACK&&(Re[0]=l.BACK,Je=!0);Je&&(n.isWebGL2?l.drawBuffers(Re):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Re))}function Ft(G){return E!==G?(l.useProgram(G),E=G,!0):!1}let re={[ns]:l.FUNC_ADD,[_0]:l.FUNC_SUBTRACT,[b0]:l.FUNC_REVERSE_SUBTRACT};if(a)re[hu]=l.MIN,re[fu]=l.MAX;else{let G=e.get("EXT_blend_minmax");G!==null&&(re[hu]=G.MIN_EXT,re[fu]=G.MAX_EXT)}let xe={[S0]:l.ZERO,[M0]:l.ONE,[T0]:l.SRC_COLOR,[Xo]:l.SRC_ALPHA,[L0]:l.SRC_ALPHA_SATURATE,[C0]:l.DST_COLOR,[w0]:l.DST_ALPHA,[E0]:l.ONE_MINUS_SRC_COLOR,[qo]:l.ONE_MINUS_SRC_ALPHA,[R0]:l.ONE_MINUS_DST_COLOR,[A0]:l.ONE_MINUS_DST_ALPHA,[I0]:l.CONSTANT_COLOR,[P0]:l.ONE_MINUS_CONSTANT_COLOR,[U0]:l.CONSTANT_ALPHA,[D0]:l.ONE_MINUS_CONSTANT_ALPHA};function Pe(G,Ce,Re,Je,Ye,Mt,Tt,pt,H,_t){if(G===Ni){b===!0&&($e(l.BLEND),b=!1);return}if(b===!1&&(nt(l.BLEND),b=!0),G!==v0){if(G!==k||_t!==ae){if((P!==ns||X!==ns)&&(l.blendEquation(l.FUNC_ADD),P=ns,X=ns),_t)switch(G){case ks:l.blendFuncSeparate(l.ONE,l.ONE_MINUS_SRC_ALPHA,l.ONE,l.ONE_MINUS_SRC_ALPHA);break;case lu:l.blendFunc(l.ONE,l.ONE);break;case cu:l.blendFuncSeparate(l.ZERO,l.ONE_MINUS_SRC_COLOR,l.ZERO,l.ONE);break;case uu:l.blendFuncSeparate(l.ZERO,l.SRC_COLOR,l.ZERO,l.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case ks:l.blendFuncSeparate(l.SRC_ALPHA,l.ONE_MINUS_SRC_ALPHA,l.ONE,l.ONE_MINUS_SRC_ALPHA);break;case lu:l.blendFunc(l.SRC_ALPHA,l.ONE);break;case cu:l.blendFuncSeparate(l.ZERO,l.ONE_MINUS_SRC_COLOR,l.ZERO,l.ONE);break;case uu:l.blendFunc(l.ZERO,l.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}V=null,Z=null,W=null,fe=null,D.set(0,0,0),N=0,k=G,ae=_t}return}Ye=Ye||Ce,Mt=Mt||Re,Tt=Tt||Je,(Ce!==P||Ye!==X)&&(l.blendEquationSeparate(re[Ce],re[Ye]),P=Ce,X=Ye),(Re!==V||Je!==Z||Mt!==W||Tt!==fe)&&(l.blendFuncSeparate(xe[Re],xe[Je],xe[Mt],xe[Tt]),V=Re,Z=Je,W=Mt,fe=Tt),(pt.equals(D)===!1||H!==N)&&(l.blendColor(pt.r,pt.g,pt.b,H),D.copy(pt),N=H),k=G,ae=!1}function St(G,Ce){G.side===hi?$e(l.CULL_FACE):nt(l.CULL_FACE);let Re=G.side===gn;Ce&&(Re=!Re),et(Re),G.blending===ks&&G.transparent===!1?Pe(Ni):Pe(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),y.setFunc(G.depthFunc),y.setTest(G.depthTest),y.setMask(G.depthWrite),d.setMask(G.colorWrite);let Je=G.stencilWrite;x.setTest(Je),Je&&(x.setMask(G.stencilWriteMask),x.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),x.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),j(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?nt(l.SAMPLE_ALPHA_TO_COVERAGE):$e(l.SAMPLE_ALPHA_TO_COVERAGE)}function et(G){ge!==G&&(G?l.frontFace(l.CW):l.frontFace(l.CCW),ge=G)}function O(G){G!==g0?(nt(l.CULL_FACE),G!==we&&(G===ou?l.cullFace(l.BACK):G===y0?l.cullFace(l.FRONT):l.cullFace(l.FRONT_AND_BACK))):$e(l.CULL_FACE),we=G}function R(G){G!==q&&(ce&&l.lineWidth(G),q=G)}function j(G,Ce,Re){G?(nt(l.POLYGON_OFFSET_FILL),(te!==Ce||le!==Re)&&(l.polygonOffset(Ce,Re),te=Ce,le=Re)):$e(l.POLYGON_OFFSET_FILL)}function be(G){G?nt(l.SCISSOR_TEST):$e(l.SCISSOR_TEST)}function ye(G){G===void 0&&(G=l.TEXTURE0+ue-1),Me!==G&&(l.activeTexture(G),Me=G)}function Se(G,Ce,Re){Re===void 0&&(Me===null?Re=l.TEXTURE0+ue-1:Re=Me);let Je=Le[Re];Je===void 0&&(Je={type:void 0,texture:void 0},Le[Re]=Je),(Je.type!==G||Je.texture!==Ce)&&(Me!==Re&&(l.activeTexture(Re),Me=Re),l.bindTexture(G,Ce||he[G]),Je.type=G,Je.texture=Ce)}function ke(){let G=Le[Me];G!==void 0&&G.type!==void 0&&(l.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function ve(){try{l.compressedTexImage2D.apply(l,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ue(){try{l.compressedTexImage3D.apply(l,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function qe(){try{l.texSubImage2D.apply(l,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Qe(){try{l.texSubImage3D.apply(l,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function de(){try{l.compressedTexSubImage2D.apply(l,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function gt(){try{l.compressedTexSubImage3D.apply(l,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function rt(){try{l.texStorage2D.apply(l,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function je(){try{l.texStorage3D.apply(l,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function We(){try{l.texImage2D.apply(l,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function $(){try{l.texImage3D.apply(l,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function it(G){Ae.equals(G)===!1&&(l.scissor(G.x,G.y,G.z,G.w),Ae.copy(G))}function mt(G){He.equals(G)===!1&&(l.viewport(G.x,G.y,G.z,G.w),He.copy(G))}function Pt(G,Ce){let Re=M.get(Ce);Re===void 0&&(Re=new WeakMap,M.set(Ce,Re));let Je=Re.get(G);Je===void 0&&(Je=l.getUniformBlockIndex(Ce,G.name),Re.set(G,Je))}function at(G,Ce){let Je=M.get(Ce).get(G);_.get(Ce)!==Je&&(l.uniformBlockBinding(Ce,Je,G.__bindingPointIndex),_.set(Ce,Je))}function Te(){l.disable(l.BLEND),l.disable(l.CULL_FACE),l.disable(l.DEPTH_TEST),l.disable(l.POLYGON_OFFSET_FILL),l.disable(l.SCISSOR_TEST),l.disable(l.STENCIL_TEST),l.disable(l.SAMPLE_ALPHA_TO_COVERAGE),l.blendEquation(l.FUNC_ADD),l.blendFunc(l.ONE,l.ZERO),l.blendFuncSeparate(l.ONE,l.ZERO,l.ONE,l.ZERO),l.blendColor(0,0,0,0),l.colorMask(!0,!0,!0,!0),l.clearColor(0,0,0,0),l.depthMask(!0),l.depthFunc(l.LESS),l.clearDepth(1),l.stencilMask(4294967295),l.stencilFunc(l.ALWAYS,0,4294967295),l.stencilOp(l.KEEP,l.KEEP,l.KEEP),l.clearStencil(0),l.cullFace(l.BACK),l.frontFace(l.CCW),l.polygonOffset(0,0),l.activeTexture(l.TEXTURE0),l.bindFramebuffer(l.FRAMEBUFFER,null),a===!0&&(l.bindFramebuffer(l.DRAW_FRAMEBUFFER,null),l.bindFramebuffer(l.READ_FRAMEBUFFER,null)),l.useProgram(null),l.lineWidth(1),l.scissor(0,0,l.canvas.width,l.canvas.height),l.viewport(0,0,l.canvas.width,l.canvas.height),T={},Me=null,Le={},w={},A=new WeakMap,C=[],E=null,b=!1,k=null,P=null,V=null,Z=null,X=null,W=null,fe=null,D=new vt(0,0,0),N=0,ae=!1,ge=null,we=null,q=null,te=null,le=null,Ae.set(0,0,l.canvas.width,l.canvas.height),He.set(0,0,l.canvas.width,l.canvas.height),d.reset(),y.reset(),x.reset()}return{buffers:{color:d,depth:y,stencil:x},enable:nt,disable:$e,bindFramebuffer:dt,drawBuffers:K,useProgram:Ft,setBlending:Pe,setMaterial:St,setFlipSided:et,setCullFace:O,setLineWidth:R,setPolygonOffset:j,setScissorTest:be,activeTexture:ye,bindTexture:Se,unbindTexture:ke,compressedTexImage2D:ve,compressedTexImage3D:Ue,texImage2D:We,texImage3D:$,updateUBOMapping:Pt,uniformBlockBinding:at,texStorage2D:rt,texStorage3D:je,texSubImage2D:qe,texSubImage3D:Qe,compressedTexSubImage2D:de,compressedTexSubImage3D:gt,scissor:it,viewport:mt,reset:Te}}function s1(l,e,n,a,c,h,p){let d=c.isWebGL2,y=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,x=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),_=new WeakMap,M,T=new WeakMap,w=!1;try{w=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(O,R){return w?new OffscreenCanvas(O,R):xa("canvas")}function C(O,R,j,be){let ye=1;if((O.width>be||O.height>be)&&(ye=be/Math.max(O.width,O.height)),ye<1||R===!0)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap){let Se=R?Qo:Math.floor,ke=Se(ye*O.width),ve=Se(ye*O.height);M===void 0&&(M=A(ke,ve));let Ue=j?A(ke,ve):M;return Ue.width=ke,Ue.height=ve,Ue.getContext("2d").drawImage(O,0,0,ke,ve),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+O.width+"x"+O.height+") to ("+ke+"x"+ve+")."),Ue}else return"data"in O&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+O.width+"x"+O.height+")."),O;return O}function E(O){return Xu(O.width)&&Xu(O.height)}function b(O){return d?!1:O.wrapS!==Gn||O.wrapT!==Gn||O.minFilter!==fn&&O.minFilter!==Rn}function k(O,R){return O.generateMipmaps&&R&&O.minFilter!==fn&&O.minFilter!==Rn}function P(O){l.generateMipmap(O)}function V(O,R,j,be,ye=!1){if(d===!1)return R;if(O!==null){if(l[O]!==void 0)return l[O];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+O+"'")}let Se=R;if(R===l.RED&&(j===l.FLOAT&&(Se=l.R32F),j===l.HALF_FLOAT&&(Se=l.R16F),j===l.UNSIGNED_BYTE&&(Se=l.R8)),R===l.RED_INTEGER&&(j===l.UNSIGNED_BYTE&&(Se=l.R8UI),j===l.UNSIGNED_SHORT&&(Se=l.R16UI),j===l.UNSIGNED_INT&&(Se=l.R32UI),j===l.BYTE&&(Se=l.R8I),j===l.SHORT&&(Se=l.R16I),j===l.INT&&(Se=l.R32I)),R===l.RG&&(j===l.FLOAT&&(Se=l.RG32F),j===l.HALF_FLOAT&&(Se=l.RG16F),j===l.UNSIGNED_BYTE&&(Se=l.RG8)),R===l.RGBA){let ke=ye?pa:At.getTransfer(be);j===l.FLOAT&&(Se=l.RGBA32F),j===l.HALF_FLOAT&&(Se=l.RGBA16F),j===l.UNSIGNED_BYTE&&(Se=ke===It?l.SRGB8_ALPHA8:l.RGBA8),j===l.UNSIGNED_SHORT_4_4_4_4&&(Se=l.RGBA4),j===l.UNSIGNED_SHORT_5_5_5_1&&(Se=l.RGB5_A1)}return(Se===l.R16F||Se===l.R32F||Se===l.RG16F||Se===l.RG32F||Se===l.RGBA16F||Se===l.RGBA32F)&&e.get("EXT_color_buffer_float"),Se}function Z(O,R,j){return k(O,j)===!0||O.isFramebufferTexture&&O.minFilter!==fn&&O.minFilter!==Rn?Math.log2(Math.max(R.width,R.height))+1:O.mipmaps!==void 0&&O.mipmaps.length>0?O.mipmaps.length:O.isCompressedTexture&&Array.isArray(O.image)?R.mipmaps.length:1}function X(O){return O===fn||O===du||O===po?l.NEAREST:l.LINEAR}function W(O){let R=O.target;R.removeEventListener("dispose",W),D(R),R.isVideoTexture&&_.delete(R)}function fe(O){let R=O.target;R.removeEventListener("dispose",fe),ae(R)}function D(O){let R=a.get(O);if(R.__webglInit===void 0)return;let j=O.source,be=T.get(j);if(be){let ye=be[R.__cacheKey];ye.usedTimes--,ye.usedTimes===0&&N(O),Object.keys(be).length===0&&T.delete(j)}a.remove(O)}function N(O){let R=a.get(O);l.deleteTexture(R.__webglTexture);let j=O.source,be=T.get(j);delete be[R.__cacheKey],p.memory.textures--}function ae(O){let R=O.texture,j=a.get(O),be=a.get(R);if(be.__webglTexture!==void 0&&(l.deleteTexture(be.__webglTexture),p.memory.textures--),O.depthTexture&&O.depthTexture.dispose(),O.isWebGLCubeRenderTarget)for(let ye=0;ye<6;ye++){if(Array.isArray(j.__webglFramebuffer[ye]))for(let Se=0;Se<j.__webglFramebuffer[ye].length;Se++)l.deleteFramebuffer(j.__webglFramebuffer[ye][Se]);else l.deleteFramebuffer(j.__webglFramebuffer[ye]);j.__webglDepthbuffer&&l.deleteRenderbuffer(j.__webglDepthbuffer[ye])}else{if(Array.isArray(j.__webglFramebuffer))for(let ye=0;ye<j.__webglFramebuffer.length;ye++)l.deleteFramebuffer(j.__webglFramebuffer[ye]);else l.deleteFramebuffer(j.__webglFramebuffer);if(j.__webglDepthbuffer&&l.deleteRenderbuffer(j.__webglDepthbuffer),j.__webglMultisampledFramebuffer&&l.deleteFramebuffer(j.__webglMultisampledFramebuffer),j.__webglColorRenderbuffer)for(let ye=0;ye<j.__webglColorRenderbuffer.length;ye++)j.__webglColorRenderbuffer[ye]&&l.deleteRenderbuffer(j.__webglColorRenderbuffer[ye]);j.__webglDepthRenderbuffer&&l.deleteRenderbuffer(j.__webglDepthRenderbuffer)}if(O.isWebGLMultipleRenderTargets)for(let ye=0,Se=R.length;ye<Se;ye++){let ke=a.get(R[ye]);ke.__webglTexture&&(l.deleteTexture(ke.__webglTexture),p.memory.textures--),a.remove(R[ye])}a.remove(R),a.remove(O)}let ge=0;function we(){ge=0}function q(){let O=ge;return O>=c.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+O+" texture units while this GPU supports only "+c.maxTextures),ge+=1,O}function te(O){let R=[];return R.push(O.wrapS),R.push(O.wrapT),R.push(O.wrapR||0),R.push(O.magFilter),R.push(O.minFilter),R.push(O.anisotropy),R.push(O.internalFormat),R.push(O.format),R.push(O.type),R.push(O.generateMipmaps),R.push(O.premultiplyAlpha),R.push(O.flipY),R.push(O.unpackAlignment),R.push(O.colorSpace),R.join()}function le(O,R){let j=a.get(O);if(O.isVideoTexture&&St(O),O.isRenderTargetTexture===!1&&O.version>0&&j.__version!==O.version){let be=O.image;if(be===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(be.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ae(j,O,R);return}}n.bindTexture(l.TEXTURE_2D,j.__webglTexture,l.TEXTURE0+R)}function ue(O,R){let j=a.get(O);if(O.version>0&&j.__version!==O.version){Ae(j,O,R);return}n.bindTexture(l.TEXTURE_2D_ARRAY,j.__webglTexture,l.TEXTURE0+R)}function ce(O,R){let j=a.get(O);if(O.version>0&&j.__version!==O.version){Ae(j,O,R);return}n.bindTexture(l.TEXTURE_3D,j.__webglTexture,l.TEXTURE0+R)}function se(O,R){let j=a.get(O);if(O.version>0&&j.__version!==O.version){He(j,O,R);return}n.bindTexture(l.TEXTURE_CUBE_MAP,j.__webglTexture,l.TEXTURE0+R)}let pe={[$o]:l.REPEAT,[Gn]:l.CLAMP_TO_EDGE,[jo]:l.MIRRORED_REPEAT},Me={[fn]:l.NEAREST,[du]:l.NEAREST_MIPMAP_NEAREST,[po]:l.NEAREST_MIPMAP_LINEAR,[Rn]:l.LINEAR,[j0]:l.LINEAR_MIPMAP_NEAREST,[dr]:l.LINEAR_MIPMAP_LINEAR},Le={[cy]:l.NEVER,[my]:l.ALWAYS,[uy]:l.LESS,[zh]:l.LEQUAL,[hy]:l.EQUAL,[py]:l.GEQUAL,[fy]:l.GREATER,[dy]:l.NOTEQUAL};function oe(O,R,j){if(j?(l.texParameteri(O,l.TEXTURE_WRAP_S,pe[R.wrapS]),l.texParameteri(O,l.TEXTURE_WRAP_T,pe[R.wrapT]),(O===l.TEXTURE_3D||O===l.TEXTURE_2D_ARRAY)&&l.texParameteri(O,l.TEXTURE_WRAP_R,pe[R.wrapR]),l.texParameteri(O,l.TEXTURE_MAG_FILTER,Me[R.magFilter]),l.texParameteri(O,l.TEXTURE_MIN_FILTER,Me[R.minFilter])):(l.texParameteri(O,l.TEXTURE_WRAP_S,l.CLAMP_TO_EDGE),l.texParameteri(O,l.TEXTURE_WRAP_T,l.CLAMP_TO_EDGE),(O===l.TEXTURE_3D||O===l.TEXTURE_2D_ARRAY)&&l.texParameteri(O,l.TEXTURE_WRAP_R,l.CLAMP_TO_EDGE),(R.wrapS!==Gn||R.wrapT!==Gn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),l.texParameteri(O,l.TEXTURE_MAG_FILTER,X(R.magFilter)),l.texParameteri(O,l.TEXTURE_MIN_FILTER,X(R.minFilter)),R.minFilter!==fn&&R.minFilter!==Rn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),R.compareFunction&&(l.texParameteri(O,l.TEXTURE_COMPARE_MODE,l.COMPARE_REF_TO_TEXTURE),l.texParameteri(O,l.TEXTURE_COMPARE_FUNC,Le[R.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let be=e.get("EXT_texture_filter_anisotropic");if(R.magFilter===fn||R.minFilter!==po&&R.minFilter!==dr||R.type===Oi&&e.has("OES_texture_float_linear")===!1||d===!1&&R.type===pr&&e.has("OES_texture_half_float_linear")===!1)return;(R.anisotropy>1||a.get(R).__currentAnisotropy)&&(l.texParameterf(O,be.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,c.getMaxAnisotropy())),a.get(R).__currentAnisotropy=R.anisotropy)}}function me(O,R){let j=!1;O.__webglInit===void 0&&(O.__webglInit=!0,R.addEventListener("dispose",W));let be=R.source,ye=T.get(be);ye===void 0&&(ye={},T.set(be,ye));let Se=te(R);if(Se!==O.__cacheKey){ye[Se]===void 0&&(ye[Se]={texture:l.createTexture(),usedTimes:0},p.memory.textures++,j=!0),ye[Se].usedTimes++;let ke=ye[O.__cacheKey];ke!==void 0&&(ye[O.__cacheKey].usedTimes--,ke.usedTimes===0&&N(R)),O.__cacheKey=Se,O.__webglTexture=ye[Se].texture}return j}function Ae(O,R,j){let be=l.TEXTURE_2D;(R.isDataArrayTexture||R.isCompressedArrayTexture)&&(be=l.TEXTURE_2D_ARRAY),R.isData3DTexture&&(be=l.TEXTURE_3D);let ye=me(O,R),Se=R.source;n.bindTexture(be,O.__webglTexture,l.TEXTURE0+j);let ke=a.get(Se);if(Se.version!==ke.__version||ye===!0){n.activeTexture(l.TEXTURE0+j);let ve=At.getPrimaries(At.workingColorSpace),Ue=R.colorSpace===Ln?null:At.getPrimaries(R.colorSpace),qe=R.colorSpace===Ln||ve===Ue?l.NONE:l.BROWSER_DEFAULT_WEBGL;l.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,R.flipY),l.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),l.pixelStorei(l.UNPACK_ALIGNMENT,R.unpackAlignment),l.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,qe);let Qe=b(R)&&E(R.image)===!1,de=C(R.image,Qe,!1,c.maxTextureSize);de=et(R,de);let gt=E(de)||d,rt=h.convert(R.format,R.colorSpace),je=h.convert(R.type),We=V(R.internalFormat,rt,je,R.colorSpace,R.isVideoTexture);oe(be,R,gt);let $,it=R.mipmaps,mt=d&&R.isVideoTexture!==!0&&We!==kh,Pt=ke.__version===void 0||ye===!0,at=Z(R,de,gt);if(R.isDepthTexture)We=l.DEPTH_COMPONENT,d?R.type===Oi?We=l.DEPTH_COMPONENT32F:R.type===Di?We=l.DEPTH_COMPONENT24:R.type===ss?We=l.DEPTH24_STENCIL8:We=l.DEPTH_COMPONENT16:R.type===Oi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),R.format===rs&&We===l.DEPTH_COMPONENT&&R.type!==Rl&&R.type!==Di&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),R.type=Di,je=h.convert(R.type)),R.format===Hs&&We===l.DEPTH_COMPONENT&&(We=l.DEPTH_STENCIL,R.type!==ss&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),R.type=ss,je=h.convert(R.type))),Pt&&(mt?n.texStorage2D(l.TEXTURE_2D,1,We,de.width,de.height):n.texImage2D(l.TEXTURE_2D,0,We,de.width,de.height,0,rt,je,null));else if(R.isDataTexture)if(it.length>0&&gt){mt&&Pt&&n.texStorage2D(l.TEXTURE_2D,at,We,it[0].width,it[0].height);for(let Te=0,G=it.length;Te<G;Te++)$=it[Te],mt?n.texSubImage2D(l.TEXTURE_2D,Te,0,0,$.width,$.height,rt,je,$.data):n.texImage2D(l.TEXTURE_2D,Te,We,$.width,$.height,0,rt,je,$.data);R.generateMipmaps=!1}else mt?(Pt&&n.texStorage2D(l.TEXTURE_2D,at,We,de.width,de.height),n.texSubImage2D(l.TEXTURE_2D,0,0,0,de.width,de.height,rt,je,de.data)):n.texImage2D(l.TEXTURE_2D,0,We,de.width,de.height,0,rt,je,de.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){mt&&Pt&&n.texStorage3D(l.TEXTURE_2D_ARRAY,at,We,it[0].width,it[0].height,de.depth);for(let Te=0,G=it.length;Te<G;Te++)$=it[Te],R.format!==Hn?rt!==null?mt?n.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,Te,0,0,0,$.width,$.height,de.depth,rt,$.data,0,0):n.compressedTexImage3D(l.TEXTURE_2D_ARRAY,Te,We,$.width,$.height,de.depth,0,$.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):mt?n.texSubImage3D(l.TEXTURE_2D_ARRAY,Te,0,0,0,$.width,$.height,de.depth,rt,je,$.data):n.texImage3D(l.TEXTURE_2D_ARRAY,Te,We,$.width,$.height,de.depth,0,rt,je,$.data)}else{mt&&Pt&&n.texStorage2D(l.TEXTURE_2D,at,We,it[0].width,it[0].height);for(let Te=0,G=it.length;Te<G;Te++)$=it[Te],R.format!==Hn?rt!==null?mt?n.compressedTexSubImage2D(l.TEXTURE_2D,Te,0,0,$.width,$.height,rt,$.data):n.compressedTexImage2D(l.TEXTURE_2D,Te,We,$.width,$.height,0,$.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):mt?n.texSubImage2D(l.TEXTURE_2D,Te,0,0,$.width,$.height,rt,je,$.data):n.texImage2D(l.TEXTURE_2D,Te,We,$.width,$.height,0,rt,je,$.data)}else if(R.isDataArrayTexture)mt?(Pt&&n.texStorage3D(l.TEXTURE_2D_ARRAY,at,We,de.width,de.height,de.depth),n.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,rt,je,de.data)):n.texImage3D(l.TEXTURE_2D_ARRAY,0,We,de.width,de.height,de.depth,0,rt,je,de.data);else if(R.isData3DTexture)mt?(Pt&&n.texStorage3D(l.TEXTURE_3D,at,We,de.width,de.height,de.depth),n.texSubImage3D(l.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,rt,je,de.data)):n.texImage3D(l.TEXTURE_3D,0,We,de.width,de.height,de.depth,0,rt,je,de.data);else if(R.isFramebufferTexture){if(Pt)if(mt)n.texStorage2D(l.TEXTURE_2D,at,We,de.width,de.height);else{let Te=de.width,G=de.height;for(let Ce=0;Ce<at;Ce++)n.texImage2D(l.TEXTURE_2D,Ce,We,Te,G,0,rt,je,null),Te>>=1,G>>=1}}else if(it.length>0&&gt){mt&&Pt&&n.texStorage2D(l.TEXTURE_2D,at,We,it[0].width,it[0].height);for(let Te=0,G=it.length;Te<G;Te++)$=it[Te],mt?n.texSubImage2D(l.TEXTURE_2D,Te,0,0,rt,je,$):n.texImage2D(l.TEXTURE_2D,Te,We,rt,je,$);R.generateMipmaps=!1}else mt?(Pt&&n.texStorage2D(l.TEXTURE_2D,at,We,de.width,de.height),n.texSubImage2D(l.TEXTURE_2D,0,0,0,rt,je,de)):n.texImage2D(l.TEXTURE_2D,0,We,rt,je,de);k(R,gt)&&P(be),ke.__version=Se.version,R.onUpdate&&R.onUpdate(R)}O.__version=R.version}function He(O,R,j){if(R.image.length!==6)return;let be=me(O,R),ye=R.source;n.bindTexture(l.TEXTURE_CUBE_MAP,O.__webglTexture,l.TEXTURE0+j);let Se=a.get(ye);if(ye.version!==Se.__version||be===!0){n.activeTexture(l.TEXTURE0+j);let ke=At.getPrimaries(At.workingColorSpace),ve=R.colorSpace===Ln?null:At.getPrimaries(R.colorSpace),Ue=R.colorSpace===Ln||ke===ve?l.NONE:l.BROWSER_DEFAULT_WEBGL;l.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,R.flipY),l.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),l.pixelStorei(l.UNPACK_ALIGNMENT,R.unpackAlignment),l.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);let qe=R.isCompressedTexture||R.image[0].isCompressedTexture,Qe=R.image[0]&&R.image[0].isDataTexture,de=[];for(let Te=0;Te<6;Te++)!qe&&!Qe?de[Te]=C(R.image[Te],!1,!0,c.maxCubemapSize):de[Te]=Qe?R.image[Te].image:R.image[Te],de[Te]=et(R,de[Te]);let gt=de[0],rt=E(gt)||d,je=h.convert(R.format,R.colorSpace),We=h.convert(R.type),$=V(R.internalFormat,je,We,R.colorSpace),it=d&&R.isVideoTexture!==!0,mt=Se.__version===void 0||be===!0,Pt=Z(R,gt,rt);oe(l.TEXTURE_CUBE_MAP,R,rt);let at;if(qe){it&&mt&&n.texStorage2D(l.TEXTURE_CUBE_MAP,Pt,$,gt.width,gt.height);for(let Te=0;Te<6;Te++){at=de[Te].mipmaps;for(let G=0;G<at.length;G++){let Ce=at[G];R.format!==Hn?je!==null?it?n.compressedTexSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Te,G,0,0,Ce.width,Ce.height,je,Ce.data):n.compressedTexImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Te,G,$,Ce.width,Ce.height,0,Ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):it?n.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Te,G,0,0,Ce.width,Ce.height,je,We,Ce.data):n.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Te,G,$,Ce.width,Ce.height,0,je,We,Ce.data)}}}else{at=R.mipmaps,it&&mt&&(at.length>0&&Pt++,n.texStorage2D(l.TEXTURE_CUBE_MAP,Pt,$,de[0].width,de[0].height));for(let Te=0;Te<6;Te++)if(Qe){it?n.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,0,0,de[Te].width,de[Te].height,je,We,de[Te].data):n.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,$,de[Te].width,de[Te].height,0,je,We,de[Te].data);for(let G=0;G<at.length;G++){let Re=at[G].image[Te].image;it?n.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Te,G+1,0,0,Re.width,Re.height,je,We,Re.data):n.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Te,G+1,$,Re.width,Re.height,0,je,We,Re.data)}}else{it?n.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,0,0,je,We,de[Te]):n.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,$,je,We,de[Te]);for(let G=0;G<at.length;G++){let Ce=at[G];it?n.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Te,G+1,0,0,je,We,Ce.image[Te]):n.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Te,G+1,$,je,We,Ce.image[Te])}}}k(R,rt)&&P(l.TEXTURE_CUBE_MAP),Se.__version=ye.version,R.onUpdate&&R.onUpdate(R)}O.__version=R.version}function Ge(O,R,j,be,ye,Se){let ke=h.convert(j.format,j.colorSpace),ve=h.convert(j.type),Ue=V(j.internalFormat,ke,ve,j.colorSpace);if(!a.get(R).__hasExternalTextures){let Qe=Math.max(1,R.width>>Se),de=Math.max(1,R.height>>Se);ye===l.TEXTURE_3D||ye===l.TEXTURE_2D_ARRAY?n.texImage3D(ye,Se,Ue,Qe,de,R.depth,0,ke,ve,null):n.texImage2D(ye,Se,Ue,Qe,de,0,ke,ve,null)}n.bindFramebuffer(l.FRAMEBUFFER,O),Pe(R)?y.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,be,ye,a.get(j).__webglTexture,0,xe(R)):(ye===l.TEXTURE_2D||ye>=l.TEXTURE_CUBE_MAP_POSITIVE_X&&ye<=l.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&l.framebufferTexture2D(l.FRAMEBUFFER,be,ye,a.get(j).__webglTexture,Se),n.bindFramebuffer(l.FRAMEBUFFER,null)}function he(O,R,j){if(l.bindRenderbuffer(l.RENDERBUFFER,O),R.depthBuffer&&!R.stencilBuffer){let be=d===!0?l.DEPTH_COMPONENT24:l.DEPTH_COMPONENT16;if(j||Pe(R)){let ye=R.depthTexture;ye&&ye.isDepthTexture&&(ye.type===Oi?be=l.DEPTH_COMPONENT32F:ye.type===Di&&(be=l.DEPTH_COMPONENT24));let Se=xe(R);Pe(R)?y.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,Se,be,R.width,R.height):l.renderbufferStorageMultisample(l.RENDERBUFFER,Se,be,R.width,R.height)}else l.renderbufferStorage(l.RENDERBUFFER,be,R.width,R.height);l.framebufferRenderbuffer(l.FRAMEBUFFER,l.DEPTH_ATTACHMENT,l.RENDERBUFFER,O)}else if(R.depthBuffer&&R.stencilBuffer){let be=xe(R);j&&Pe(R)===!1?l.renderbufferStorageMultisample(l.RENDERBUFFER,be,l.DEPTH24_STENCIL8,R.width,R.height):Pe(R)?y.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,be,l.DEPTH24_STENCIL8,R.width,R.height):l.renderbufferStorage(l.RENDERBUFFER,l.DEPTH_STENCIL,R.width,R.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.DEPTH_STENCIL_ATTACHMENT,l.RENDERBUFFER,O)}else{let be=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let ye=0;ye<be.length;ye++){let Se=be[ye],ke=h.convert(Se.format,Se.colorSpace),ve=h.convert(Se.type),Ue=V(Se.internalFormat,ke,ve,Se.colorSpace),qe=xe(R);j&&Pe(R)===!1?l.renderbufferStorageMultisample(l.RENDERBUFFER,qe,Ue,R.width,R.height):Pe(R)?y.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,qe,Ue,R.width,R.height):l.renderbufferStorage(l.RENDERBUFFER,Ue,R.width,R.height)}}l.bindRenderbuffer(l.RENDERBUFFER,null)}function nt(O,R){if(R&&R.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(l.FRAMEBUFFER,O),!(R.depthTexture&&R.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!a.get(R.depthTexture).__webglTexture||R.depthTexture.image.width!==R.width||R.depthTexture.image.height!==R.height)&&(R.depthTexture.image.width=R.width,R.depthTexture.image.height=R.height,R.depthTexture.needsUpdate=!0),le(R.depthTexture,0);let be=a.get(R.depthTexture).__webglTexture,ye=xe(R);if(R.depthTexture.format===rs)Pe(R)?y.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,l.DEPTH_ATTACHMENT,l.TEXTURE_2D,be,0,ye):l.framebufferTexture2D(l.FRAMEBUFFER,l.DEPTH_ATTACHMENT,l.TEXTURE_2D,be,0);else if(R.depthTexture.format===Hs)Pe(R)?y.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,l.DEPTH_STENCIL_ATTACHMENT,l.TEXTURE_2D,be,0,ye):l.framebufferTexture2D(l.FRAMEBUFFER,l.DEPTH_STENCIL_ATTACHMENT,l.TEXTURE_2D,be,0);else throw new Error("Unknown depthTexture format")}function $e(O){let R=a.get(O),j=O.isWebGLCubeRenderTarget===!0;if(O.depthTexture&&!R.__autoAllocateDepthBuffer){if(j)throw new Error("target.depthTexture not supported in Cube render targets");nt(R.__webglFramebuffer,O)}else if(j){R.__webglDepthbuffer=[];for(let be=0;be<6;be++)n.bindFramebuffer(l.FRAMEBUFFER,R.__webglFramebuffer[be]),R.__webglDepthbuffer[be]=l.createRenderbuffer(),he(R.__webglDepthbuffer[be],O,!1)}else n.bindFramebuffer(l.FRAMEBUFFER,R.__webglFramebuffer),R.__webglDepthbuffer=l.createRenderbuffer(),he(R.__webglDepthbuffer,O,!1);n.bindFramebuffer(l.FRAMEBUFFER,null)}function dt(O,R,j){let be=a.get(O);R!==void 0&&Ge(be.__webglFramebuffer,O,O.texture,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,0),j!==void 0&&$e(O)}function K(O){let R=O.texture,j=a.get(O),be=a.get(R);O.addEventListener("dispose",fe),O.isWebGLMultipleRenderTargets!==!0&&(be.__webglTexture===void 0&&(be.__webglTexture=l.createTexture()),be.__version=R.version,p.memory.textures++);let ye=O.isWebGLCubeRenderTarget===!0,Se=O.isWebGLMultipleRenderTargets===!0,ke=E(O)||d;if(ye){j.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(d&&R.mipmaps&&R.mipmaps.length>0){j.__webglFramebuffer[ve]=[];for(let Ue=0;Ue<R.mipmaps.length;Ue++)j.__webglFramebuffer[ve][Ue]=l.createFramebuffer()}else j.__webglFramebuffer[ve]=l.createFramebuffer()}else{if(d&&R.mipmaps&&R.mipmaps.length>0){j.__webglFramebuffer=[];for(let ve=0;ve<R.mipmaps.length;ve++)j.__webglFramebuffer[ve]=l.createFramebuffer()}else j.__webglFramebuffer=l.createFramebuffer();if(Se)if(c.drawBuffers){let ve=O.texture;for(let Ue=0,qe=ve.length;Ue<qe;Ue++){let Qe=a.get(ve[Ue]);Qe.__webglTexture===void 0&&(Qe.__webglTexture=l.createTexture(),p.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(d&&O.samples>0&&Pe(O)===!1){let ve=Se?R:[R];j.__webglMultisampledFramebuffer=l.createFramebuffer(),j.__webglColorRenderbuffer=[],n.bindFramebuffer(l.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let Ue=0;Ue<ve.length;Ue++){let qe=ve[Ue];j.__webglColorRenderbuffer[Ue]=l.createRenderbuffer(),l.bindRenderbuffer(l.RENDERBUFFER,j.__webglColorRenderbuffer[Ue]);let Qe=h.convert(qe.format,qe.colorSpace),de=h.convert(qe.type),gt=V(qe.internalFormat,Qe,de,qe.colorSpace,O.isXRRenderTarget===!0),rt=xe(O);l.renderbufferStorageMultisample(l.RENDERBUFFER,rt,gt,O.width,O.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+Ue,l.RENDERBUFFER,j.__webglColorRenderbuffer[Ue])}l.bindRenderbuffer(l.RENDERBUFFER,null),O.depthBuffer&&(j.__webglDepthRenderbuffer=l.createRenderbuffer(),he(j.__webglDepthRenderbuffer,O,!0)),n.bindFramebuffer(l.FRAMEBUFFER,null)}}if(ye){n.bindTexture(l.TEXTURE_CUBE_MAP,be.__webglTexture),oe(l.TEXTURE_CUBE_MAP,R,ke);for(let ve=0;ve<6;ve++)if(d&&R.mipmaps&&R.mipmaps.length>0)for(let Ue=0;Ue<R.mipmaps.length;Ue++)Ge(j.__webglFramebuffer[ve][Ue],O,R,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Ue);else Ge(j.__webglFramebuffer[ve],O,R,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);k(R,ke)&&P(l.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Se){let ve=O.texture;for(let Ue=0,qe=ve.length;Ue<qe;Ue++){let Qe=ve[Ue],de=a.get(Qe);n.bindTexture(l.TEXTURE_2D,de.__webglTexture),oe(l.TEXTURE_2D,Qe,ke),Ge(j.__webglFramebuffer,O,Qe,l.COLOR_ATTACHMENT0+Ue,l.TEXTURE_2D,0),k(Qe,ke)&&P(l.TEXTURE_2D)}n.unbindTexture()}else{let ve=l.TEXTURE_2D;if((O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(d?ve=O.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),n.bindTexture(ve,be.__webglTexture),oe(ve,R,ke),d&&R.mipmaps&&R.mipmaps.length>0)for(let Ue=0;Ue<R.mipmaps.length;Ue++)Ge(j.__webglFramebuffer[Ue],O,R,l.COLOR_ATTACHMENT0,ve,Ue);else Ge(j.__webglFramebuffer,O,R,l.COLOR_ATTACHMENT0,ve,0);k(R,ke)&&P(ve),n.unbindTexture()}O.depthBuffer&&$e(O)}function Ft(O){let R=E(O)||d,j=O.isWebGLMultipleRenderTargets===!0?O.texture:[O.texture];for(let be=0,ye=j.length;be<ye;be++){let Se=j[be];if(k(Se,R)){let ke=O.isWebGLCubeRenderTarget?l.TEXTURE_CUBE_MAP:l.TEXTURE_2D,ve=a.get(Se).__webglTexture;n.bindTexture(ke,ve),P(ke),n.unbindTexture()}}}function re(O){if(d&&O.samples>0&&Pe(O)===!1){let R=O.isWebGLMultipleRenderTargets?O.texture:[O.texture],j=O.width,be=O.height,ye=l.COLOR_BUFFER_BIT,Se=[],ke=O.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,ve=a.get(O),Ue=O.isWebGLMultipleRenderTargets===!0;if(Ue)for(let qe=0;qe<R.length;qe++)n.bindFramebuffer(l.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+qe,l.RENDERBUFFER,null),n.bindFramebuffer(l.FRAMEBUFFER,ve.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+qe,l.TEXTURE_2D,null,0);n.bindFramebuffer(l.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer),n.bindFramebuffer(l.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let qe=0;qe<R.length;qe++){Se.push(l.COLOR_ATTACHMENT0+qe),O.depthBuffer&&Se.push(ke);let Qe=ve.__ignoreDepthValues!==void 0?ve.__ignoreDepthValues:!1;if(Qe===!1&&(O.depthBuffer&&(ye|=l.DEPTH_BUFFER_BIT),O.stencilBuffer&&(ye|=l.STENCIL_BUFFER_BIT)),Ue&&l.framebufferRenderbuffer(l.READ_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.RENDERBUFFER,ve.__webglColorRenderbuffer[qe]),Qe===!0&&(l.invalidateFramebuffer(l.READ_FRAMEBUFFER,[ke]),l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,[ke])),Ue){let de=a.get(R[qe]).__webglTexture;l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,de,0)}l.blitFramebuffer(0,0,j,be,0,0,j,be,ye,l.NEAREST),x&&l.invalidateFramebuffer(l.READ_FRAMEBUFFER,Se)}if(n.bindFramebuffer(l.READ_FRAMEBUFFER,null),n.bindFramebuffer(l.DRAW_FRAMEBUFFER,null),Ue)for(let qe=0;qe<R.length;qe++){n.bindFramebuffer(l.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+qe,l.RENDERBUFFER,ve.__webglColorRenderbuffer[qe]);let Qe=a.get(R[qe]).__webglTexture;n.bindFramebuffer(l.FRAMEBUFFER,ve.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+qe,l.TEXTURE_2D,Qe,0)}n.bindFramebuffer(l.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}}function xe(O){return Math.min(c.maxSamples,O.samples)}function Pe(O){let R=a.get(O);return d&&O.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function St(O){let R=p.render.frame;_.get(O)!==R&&(_.set(O,R),O.update())}function et(O,R){let j=O.colorSpace,be=O.format,ye=O.type;return O.isCompressedTexture===!0||O.isVideoTexture===!0||O.format===Jo||j!==pi&&j!==Ln&&(At.getTransfer(j)===It?d===!1?e.has("EXT_sRGB")===!0&&be===Hn?(O.format=Jo,O.minFilter=Rn,O.generateMipmaps=!1):R=va.sRGBToLinear(R):(be!==Hn||ye!==ki)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",j)),R}this.allocateTextureUnit=q,this.resetTextureUnits=we,this.setTexture2D=le,this.setTexture2DArray=ue,this.setTexture3D=ce,this.setTextureCube=se,this.rebindTextures=dt,this.setupRenderTarget=K,this.updateRenderTargetMipmap=Ft,this.updateMultisampleRenderTarget=re,this.setupDepthRenderbuffer=$e,this.setupFrameBufferTexture=Ge,this.useMultisampledRTT=Pe}function r1(l,e,n){let a=n.isWebGL2;function c(h,p=Ln){let d,y=At.getTransfer(p);if(h===ki)return l.UNSIGNED_BYTE;if(h===Uh)return l.UNSIGNED_SHORT_4_4_4_4;if(h===Dh)return l.UNSIGNED_SHORT_5_5_5_1;if(h===J0)return l.BYTE;if(h===K0)return l.SHORT;if(h===Rl)return l.UNSIGNED_SHORT;if(h===Ph)return l.INT;if(h===Di)return l.UNSIGNED_INT;if(h===Oi)return l.FLOAT;if(h===pr)return a?l.HALF_FLOAT:(d=e.get("OES_texture_half_float"),d!==null?d.HALF_FLOAT_OES:null);if(h===Q0)return l.ALPHA;if(h===Hn)return l.RGBA;if(h===ey)return l.LUMINANCE;if(h===ty)return l.LUMINANCE_ALPHA;if(h===rs)return l.DEPTH_COMPONENT;if(h===Hs)return l.DEPTH_STENCIL;if(h===Jo)return d=e.get("EXT_sRGB"),d!==null?d.SRGB_ALPHA_EXT:null;if(h===ny)return l.RED;if(h===Oh)return l.RED_INTEGER;if(h===iy)return l.RG;if(h===Nh)return l.RG_INTEGER;if(h===Fh)return l.RGBA_INTEGER;if(h===mo||h===go||h===yo||h===xo)if(y===It)if(d=e.get("WEBGL_compressed_texture_s3tc_srgb"),d!==null){if(h===mo)return d.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(h===go)return d.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(h===yo)return d.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(h===xo)return d.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(d=e.get("WEBGL_compressed_texture_s3tc"),d!==null){if(h===mo)return d.COMPRESSED_RGB_S3TC_DXT1_EXT;if(h===go)return d.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(h===yo)return d.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(h===xo)return d.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(h===pu||h===mu||h===gu||h===yu)if(d=e.get("WEBGL_compressed_texture_pvrtc"),d!==null){if(h===pu)return d.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(h===mu)return d.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(h===gu)return d.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(h===yu)return d.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(h===kh)return d=e.get("WEBGL_compressed_texture_etc1"),d!==null?d.COMPRESSED_RGB_ETC1_WEBGL:null;if(h===xu||h===vu)if(d=e.get("WEBGL_compressed_texture_etc"),d!==null){if(h===xu)return y===It?d.COMPRESSED_SRGB8_ETC2:d.COMPRESSED_RGB8_ETC2;if(h===vu)return y===It?d.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:d.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(h===_u||h===bu||h===Su||h===Mu||h===Tu||h===Eu||h===wu||h===Au||h===Cu||h===Ru||h===Lu||h===Iu||h===Pu||h===Uu)if(d=e.get("WEBGL_compressed_texture_astc"),d!==null){if(h===_u)return y===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:d.COMPRESSED_RGBA_ASTC_4x4_KHR;if(h===bu)return y===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:d.COMPRESSED_RGBA_ASTC_5x4_KHR;if(h===Su)return y===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:d.COMPRESSED_RGBA_ASTC_5x5_KHR;if(h===Mu)return y===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:d.COMPRESSED_RGBA_ASTC_6x5_KHR;if(h===Tu)return y===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:d.COMPRESSED_RGBA_ASTC_6x6_KHR;if(h===Eu)return y===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:d.COMPRESSED_RGBA_ASTC_8x5_KHR;if(h===wu)return y===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:d.COMPRESSED_RGBA_ASTC_8x6_KHR;if(h===Au)return y===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:d.COMPRESSED_RGBA_ASTC_8x8_KHR;if(h===Cu)return y===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:d.COMPRESSED_RGBA_ASTC_10x5_KHR;if(h===Ru)return y===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:d.COMPRESSED_RGBA_ASTC_10x6_KHR;if(h===Lu)return y===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:d.COMPRESSED_RGBA_ASTC_10x8_KHR;if(h===Iu)return y===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:d.COMPRESSED_RGBA_ASTC_10x10_KHR;if(h===Pu)return y===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:d.COMPRESSED_RGBA_ASTC_12x10_KHR;if(h===Uu)return y===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:d.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(h===vo||h===Du||h===Ou)if(d=e.get("EXT_texture_compression_bptc"),d!==null){if(h===vo)return y===It?d.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:d.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(h===Du)return d.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(h===Ou)return d.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(h===sy||h===Nu||h===Fu||h===ku)if(d=e.get("EXT_texture_compression_rgtc"),d!==null){if(h===vo)return d.COMPRESSED_RED_RGTC1_EXT;if(h===Nu)return d.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(h===Fu)return d.COMPRESSED_RED_GREEN_RGTC2_EXT;if(h===ku)return d.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return h===ss?a?l.UNSIGNED_INT_24_8:(d=e.get("WEBGL_depth_texture"),d!==null?d.UNSIGNED_INT_24_8_WEBGL:null):l[h]!==void 0?l[h]:null}return{convert:c}}var ml=class extends Mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Fs=class extends Kn{constructor(){super(),this.isGroup=!0,this.type="Group"}},a1={type:"move"},fr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ee,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ee),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ee,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ee),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let n=this._hand;if(n)for(let a of e.hand.values())this._getHandJoint(n,a)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,a){let c=null,h=null,p=null,d=this._targetRay,y=this._grip,x=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(x&&e.hand){p=!0;for(let C of e.hand.values()){let E=n.getJointPose(C,a),b=this._getHandJoint(x,C);E!==null&&(b.matrix.fromArray(E.transform.matrix),b.matrix.decompose(b.position,b.rotation,b.scale),b.matrixWorldNeedsUpdate=!0,b.jointRadius=E.radius),b.visible=E!==null}let _=x.joints["index-finger-tip"],M=x.joints["thumb-tip"],T=_.position.distanceTo(M.position),w=.02,A=.005;x.inputState.pinching&&T>w+A?(x.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!x.inputState.pinching&&T<=w-A&&(x.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else y!==null&&e.gripSpace&&(h=n.getPose(e.gripSpace,a),h!==null&&(y.matrix.fromArray(h.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,h.linearVelocity?(y.hasLinearVelocity=!0,y.linearVelocity.copy(h.linearVelocity)):y.hasLinearVelocity=!1,h.angularVelocity?(y.hasAngularVelocity=!0,y.angularVelocity.copy(h.angularVelocity)):y.hasAngularVelocity=!1));d!==null&&(c=n.getPose(e.targetRaySpace,a),c===null&&h!==null&&(c=h),c!==null&&(d.matrix.fromArray(c.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,c.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(c.linearVelocity)):d.hasLinearVelocity=!1,c.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(c.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(a1)))}return d!==null&&(d.visible=c!==null),y!==null&&(y.visible=h!==null),x!==null&&(x.visible=p!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){let a=new Fs;a.matrixAutoUpdate=!1,a.visible=!1,e.joints[n.jointName]=a,e.add(a)}return e.joints[n.jointName]}},gl=class extends zi{constructor(e,n){super();let a=this,c=null,h=1,p=null,d="local-floor",y=1,x=null,_=null,M=null,T=null,w=null,A=null,C=n.getContextAttributes(),E=null,b=null,k=[],P=[],V=new Ct,Z=null,X=new Mn;X.layers.enable(1),X.viewport=new Zt;let W=new Mn;W.layers.enable(2),W.viewport=new Zt;let fe=[X,W],D=new ml;D.layers.enable(1),D.layers.enable(2);let N=null,ae=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(oe){let me=k[oe];return me===void 0&&(me=new fr,k[oe]=me),me.getTargetRaySpace()},this.getControllerGrip=function(oe){let me=k[oe];return me===void 0&&(me=new fr,k[oe]=me),me.getGripSpace()},this.getHand=function(oe){let me=k[oe];return me===void 0&&(me=new fr,k[oe]=me),me.getHandSpace()};function ge(oe){let me=P.indexOf(oe.inputSource);if(me===-1)return;let Ae=k[me];Ae!==void 0&&(Ae.update(oe.inputSource,oe.frame,x||p),Ae.dispatchEvent({type:oe.type,data:oe.inputSource}))}function we(){c.removeEventListener("select",ge),c.removeEventListener("selectstart",ge),c.removeEventListener("selectend",ge),c.removeEventListener("squeeze",ge),c.removeEventListener("squeezestart",ge),c.removeEventListener("squeezeend",ge),c.removeEventListener("end",we),c.removeEventListener("inputsourceschange",q);for(let oe=0;oe<k.length;oe++){let me=P[oe];me!==null&&(P[oe]=null,k[oe].disconnect(me))}N=null,ae=null,e.setRenderTarget(E),w=null,T=null,M=null,c=null,b=null,Le.stop(),a.isPresenting=!1,e.setPixelRatio(Z),e.setSize(V.width,V.height,!1),a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(oe){h=oe,a.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(oe){d=oe,a.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return x||p},this.setReferenceSpace=function(oe){x=oe},this.getBaseLayer=function(){return T!==null?T:w},this.getBinding=function(){return M},this.getFrame=function(){return A},this.getSession=function(){return c},this.setSession=async function(oe){if(c=oe,c!==null){if(E=e.getRenderTarget(),c.addEventListener("select",ge),c.addEventListener("selectstart",ge),c.addEventListener("selectend",ge),c.addEventListener("squeeze",ge),c.addEventListener("squeezestart",ge),c.addEventListener("squeezeend",ge),c.addEventListener("end",we),c.addEventListener("inputsourceschange",q),C.xrCompatible!==!0&&await n.makeXRCompatible(),Z=e.getPixelRatio(),e.getSize(V),c.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let me={antialias:c.renderState.layers===void 0?C.antialias:!0,alpha:!0,depth:C.depth,stencil:C.stencil,framebufferScaleFactor:h};w=new XRWebGLLayer(c,n,me),c.updateRenderState({baseLayer:w}),e.setPixelRatio(1),e.setSize(w.framebufferWidth,w.framebufferHeight,!1),b=new mi(w.framebufferWidth,w.framebufferHeight,{format:Hn,type:ki,colorSpace:e.outputColorSpace,stencilBuffer:C.stencil})}else{let me=null,Ae=null,He=null;C.depth&&(He=C.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,me=C.stencil?Hs:rs,Ae=C.stencil?ss:Di);let Ge={colorFormat:n.RGBA8,depthFormat:He,scaleFactor:h};M=new XRWebGLBinding(c,n),T=M.createProjectionLayer(Ge),c.updateRenderState({layers:[T]}),e.setPixelRatio(1),e.setSize(T.textureWidth,T.textureHeight,!1),b=new mi(T.textureWidth,T.textureHeight,{format:Hn,type:ki,depthTexture:new Ia(T.textureWidth,T.textureHeight,Ae,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:C.stencil,colorSpace:e.outputColorSpace,samples:C.antialias?4:0});let he=e.properties.get(b);he.__ignoreDepthValues=T.ignoreDepthValues}b.isXRRenderTarget=!0,this.setFoveation(y),x=null,p=await c.requestReferenceSpace(d),Le.setContext(c),Le.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(c!==null)return c.environmentBlendMode};function q(oe){for(let me=0;me<oe.removed.length;me++){let Ae=oe.removed[me],He=P.indexOf(Ae);He>=0&&(P[He]=null,k[He].disconnect(Ae))}for(let me=0;me<oe.added.length;me++){let Ae=oe.added[me],He=P.indexOf(Ae);if(He===-1){for(let he=0;he<k.length;he++)if(he>=P.length){P.push(Ae),He=he;break}else if(P[he]===null){P[he]=Ae,He=he;break}if(He===-1)break}let Ge=k[He];Ge&&Ge.connect(Ae)}}let te=new ee,le=new ee;function ue(oe,me,Ae){te.setFromMatrixPosition(me.matrixWorld),le.setFromMatrixPosition(Ae.matrixWorld);let He=te.distanceTo(le),Ge=me.projectionMatrix.elements,he=Ae.projectionMatrix.elements,nt=Ge[14]/(Ge[10]-1),$e=Ge[14]/(Ge[10]+1),dt=(Ge[9]+1)/Ge[5],K=(Ge[9]-1)/Ge[5],Ft=(Ge[8]-1)/Ge[0],re=(he[8]+1)/he[0],xe=nt*Ft,Pe=nt*re,St=He/(-Ft+re),et=St*-Ft;me.matrixWorld.decompose(oe.position,oe.quaternion,oe.scale),oe.translateX(et),oe.translateZ(St),oe.matrixWorld.compose(oe.position,oe.quaternion,oe.scale),oe.matrixWorldInverse.copy(oe.matrixWorld).invert();let O=nt+St,R=$e+St,j=xe-et,be=Pe+(He-et),ye=dt*$e/R*O,Se=K*$e/R*O;oe.projectionMatrix.makePerspective(j,be,ye,Se,O,R),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert()}function ce(oe,me){me===null?oe.matrixWorld.copy(oe.matrix):oe.matrixWorld.multiplyMatrices(me.matrixWorld,oe.matrix),oe.matrixWorldInverse.copy(oe.matrixWorld).invert()}this.updateCamera=function(oe){if(c===null)return;D.near=W.near=X.near=oe.near,D.far=W.far=X.far=oe.far,(N!==D.near||ae!==D.far)&&(c.updateRenderState({depthNear:D.near,depthFar:D.far}),N=D.near,ae=D.far);let me=oe.parent,Ae=D.cameras;ce(D,me);for(let He=0;He<Ae.length;He++)ce(Ae[He],me);Ae.length===2?ue(D,X,W):D.projectionMatrix.copy(X.projectionMatrix),se(oe,D,me)};function se(oe,me,Ae){Ae===null?oe.matrix.copy(me.matrixWorld):(oe.matrix.copy(Ae.matrixWorld),oe.matrix.invert(),oe.matrix.multiply(me.matrixWorld)),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.updateMatrixWorld(!0),oe.projectionMatrix.copy(me.projectionMatrix),oe.projectionMatrixInverse.copy(me.projectionMatrixInverse),oe.isPerspectiveCamera&&(oe.fov=Ko*2*Math.atan(1/oe.projectionMatrix.elements[5]),oe.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(T===null&&w===null))return y},this.setFoveation=function(oe){y=oe,T!==null&&(T.fixedFoveation=oe),w!==null&&w.fixedFoveation!==void 0&&(w.fixedFoveation=oe)};let pe=null;function Me(oe,me){if(_=me.getViewerPose(x||p),A=me,_!==null){let Ae=_.views;w!==null&&(e.setRenderTargetFramebuffer(b,w.framebuffer),e.setRenderTarget(b));let He=!1;Ae.length!==D.cameras.length&&(D.cameras.length=0,He=!0);for(let Ge=0;Ge<Ae.length;Ge++){let he=Ae[Ge],nt=null;if(w!==null)nt=w.getViewport(he);else{let dt=M.getViewSubImage(T,he);nt=dt.viewport,Ge===0&&(e.setRenderTargetTextures(b,dt.colorTexture,T.ignoreDepthValues?void 0:dt.depthStencilTexture),e.setRenderTarget(b))}let $e=fe[Ge];$e===void 0&&($e=new Mn,$e.layers.enable(Ge),$e.viewport=new Zt,fe[Ge]=$e),$e.matrix.fromArray(he.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(he.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(nt.x,nt.y,nt.width,nt.height),Ge===0&&(D.matrix.copy($e.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),He===!0&&D.cameras.push($e)}}for(let Ae=0;Ae<k.length;Ae++){let He=P[Ae],Ge=k[Ae];He!==null&&Ge!==void 0&&Ge.update(He,me,x||p)}pe&&pe(oe,me),me.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:me}),A=null}let Le=new Wh;Le.setAnimationLoop(Me),this.setAnimationLoop=function(oe){pe=oe},this.dispose=function(){}}};function o1(l,e){function n(E,b){E.matrixAutoUpdate===!0&&E.updateMatrix(),b.value.copy(E.matrix)}function a(E,b){b.color.getRGB(E.fogColor.value,Hh(l)),b.isFog?(E.fogNear.value=b.near,E.fogFar.value=b.far):b.isFogExp2&&(E.fogDensity.value=b.density)}function c(E,b,k,P,V){b.isMeshBasicMaterial||b.isMeshLambertMaterial?h(E,b):b.isMeshToonMaterial?(h(E,b),M(E,b)):b.isMeshPhongMaterial?(h(E,b),_(E,b)):b.isMeshStandardMaterial?(h(E,b),T(E,b),b.isMeshPhysicalMaterial&&w(E,b,V)):b.isMeshMatcapMaterial?(h(E,b),A(E,b)):b.isMeshDepthMaterial?h(E,b):b.isMeshDistanceMaterial?(h(E,b),C(E,b)):b.isMeshNormalMaterial?h(E,b):b.isLineBasicMaterial?(p(E,b),b.isLineDashedMaterial&&d(E,b)):b.isPointsMaterial?y(E,b,k,P):b.isSpriteMaterial?x(E,b):b.isShadowMaterial?(E.color.value.copy(b.color),E.opacity.value=b.opacity):b.isShaderMaterial&&(b.uniformsNeedUpdate=!1)}function h(E,b){E.opacity.value=b.opacity,b.color&&E.diffuse.value.copy(b.color),b.emissive&&E.emissive.value.copy(b.emissive).multiplyScalar(b.emissiveIntensity),b.map&&(E.map.value=b.map,n(b.map,E.mapTransform)),b.alphaMap&&(E.alphaMap.value=b.alphaMap,n(b.alphaMap,E.alphaMapTransform)),b.bumpMap&&(E.bumpMap.value=b.bumpMap,n(b.bumpMap,E.bumpMapTransform),E.bumpScale.value=b.bumpScale,b.side===gn&&(E.bumpScale.value*=-1)),b.normalMap&&(E.normalMap.value=b.normalMap,n(b.normalMap,E.normalMapTransform),E.normalScale.value.copy(b.normalScale),b.side===gn&&E.normalScale.value.negate()),b.displacementMap&&(E.displacementMap.value=b.displacementMap,n(b.displacementMap,E.displacementMapTransform),E.displacementScale.value=b.displacementScale,E.displacementBias.value=b.displacementBias),b.emissiveMap&&(E.emissiveMap.value=b.emissiveMap,n(b.emissiveMap,E.emissiveMapTransform)),b.specularMap&&(E.specularMap.value=b.specularMap,n(b.specularMap,E.specularMapTransform)),b.alphaTest>0&&(E.alphaTest.value=b.alphaTest);let k=e.get(b).envMap;if(k&&(E.envMap.value=k,E.flipEnvMap.value=k.isCubeTexture&&k.isRenderTargetTexture===!1?-1:1,E.reflectivity.value=b.reflectivity,E.ior.value=b.ior,E.refractionRatio.value=b.refractionRatio),b.lightMap){E.lightMap.value=b.lightMap;let P=l._useLegacyLights===!0?Math.PI:1;E.lightMapIntensity.value=b.lightMapIntensity*P,n(b.lightMap,E.lightMapTransform)}b.aoMap&&(E.aoMap.value=b.aoMap,E.aoMapIntensity.value=b.aoMapIntensity,n(b.aoMap,E.aoMapTransform))}function p(E,b){E.diffuse.value.copy(b.color),E.opacity.value=b.opacity,b.map&&(E.map.value=b.map,n(b.map,E.mapTransform))}function d(E,b){E.dashSize.value=b.dashSize,E.totalSize.value=b.dashSize+b.gapSize,E.scale.value=b.scale}function y(E,b,k,P){E.diffuse.value.copy(b.color),E.opacity.value=b.opacity,E.size.value=b.size*k,E.scale.value=P*.5,b.map&&(E.map.value=b.map,n(b.map,E.uvTransform)),b.alphaMap&&(E.alphaMap.value=b.alphaMap,n(b.alphaMap,E.alphaMapTransform)),b.alphaTest>0&&(E.alphaTest.value=b.alphaTest)}function x(E,b){E.diffuse.value.copy(b.color),E.opacity.value=b.opacity,E.rotation.value=b.rotation,b.map&&(E.map.value=b.map,n(b.map,E.mapTransform)),b.alphaMap&&(E.alphaMap.value=b.alphaMap,n(b.alphaMap,E.alphaMapTransform)),b.alphaTest>0&&(E.alphaTest.value=b.alphaTest)}function _(E,b){E.specular.value.copy(b.specular),E.shininess.value=Math.max(b.shininess,1e-4)}function M(E,b){b.gradientMap&&(E.gradientMap.value=b.gradientMap)}function T(E,b){E.metalness.value=b.metalness,b.metalnessMap&&(E.metalnessMap.value=b.metalnessMap,n(b.metalnessMap,E.metalnessMapTransform)),E.roughness.value=b.roughness,b.roughnessMap&&(E.roughnessMap.value=b.roughnessMap,n(b.roughnessMap,E.roughnessMapTransform)),e.get(b).envMap&&(E.envMapIntensity.value=b.envMapIntensity)}function w(E,b,k){E.ior.value=b.ior,b.sheen>0&&(E.sheenColor.value.copy(b.sheenColor).multiplyScalar(b.sheen),E.sheenRoughness.value=b.sheenRoughness,b.sheenColorMap&&(E.sheenColorMap.value=b.sheenColorMap,n(b.sheenColorMap,E.sheenColorMapTransform)),b.sheenRoughnessMap&&(E.sheenRoughnessMap.value=b.sheenRoughnessMap,n(b.sheenRoughnessMap,E.sheenRoughnessMapTransform))),b.clearcoat>0&&(E.clearcoat.value=b.clearcoat,E.clearcoatRoughness.value=b.clearcoatRoughness,b.clearcoatMap&&(E.clearcoatMap.value=b.clearcoatMap,n(b.clearcoatMap,E.clearcoatMapTransform)),b.clearcoatRoughnessMap&&(E.clearcoatRoughnessMap.value=b.clearcoatRoughnessMap,n(b.clearcoatRoughnessMap,E.clearcoatRoughnessMapTransform)),b.clearcoatNormalMap&&(E.clearcoatNormalMap.value=b.clearcoatNormalMap,n(b.clearcoatNormalMap,E.clearcoatNormalMapTransform),E.clearcoatNormalScale.value.copy(b.clearcoatNormalScale),b.side===gn&&E.clearcoatNormalScale.value.negate())),b.iridescence>0&&(E.iridescence.value=b.iridescence,E.iridescenceIOR.value=b.iridescenceIOR,E.iridescenceThicknessMinimum.value=b.iridescenceThicknessRange[0],E.iridescenceThicknessMaximum.value=b.iridescenceThicknessRange[1],b.iridescenceMap&&(E.iridescenceMap.value=b.iridescenceMap,n(b.iridescenceMap,E.iridescenceMapTransform)),b.iridescenceThicknessMap&&(E.iridescenceThicknessMap.value=b.iridescenceThicknessMap,n(b.iridescenceThicknessMap,E.iridescenceThicknessMapTransform))),b.transmission>0&&(E.transmission.value=b.transmission,E.transmissionSamplerMap.value=k.texture,E.transmissionSamplerSize.value.set(k.width,k.height),b.transmissionMap&&(E.transmissionMap.value=b.transmissionMap,n(b.transmissionMap,E.transmissionMapTransform)),E.thickness.value=b.thickness,b.thicknessMap&&(E.thicknessMap.value=b.thicknessMap,n(b.thicknessMap,E.thicknessMapTransform)),E.attenuationDistance.value=b.attenuationDistance,E.attenuationColor.value.copy(b.attenuationColor)),b.anisotropy>0&&(E.anisotropyVector.value.set(b.anisotropy*Math.cos(b.anisotropyRotation),b.anisotropy*Math.sin(b.anisotropyRotation)),b.anisotropyMap&&(E.anisotropyMap.value=b.anisotropyMap,n(b.anisotropyMap,E.anisotropyMapTransform))),E.specularIntensity.value=b.specularIntensity,E.specularColor.value.copy(b.specularColor),b.specularColorMap&&(E.specularColorMap.value=b.specularColorMap,n(b.specularColorMap,E.specularColorMapTransform)),b.specularIntensityMap&&(E.specularIntensityMap.value=b.specularIntensityMap,n(b.specularIntensityMap,E.specularIntensityMapTransform))}function A(E,b){b.matcap&&(E.matcap.value=b.matcap)}function C(E,b){let k=e.get(b).light;E.referencePosition.value.setFromMatrixPosition(k.matrixWorld),E.nearDistance.value=k.shadow.camera.near,E.farDistance.value=k.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:c}}function l1(l,e,n,a){let c={},h={},p=[],d=n.isWebGL2?l.getParameter(l.MAX_UNIFORM_BUFFER_BINDINGS):0;function y(k,P){let V=P.program;a.uniformBlockBinding(k,V)}function x(k,P){let V=c[k.id];V===void 0&&(A(k),V=_(k),c[k.id]=V,k.addEventListener("dispose",E));let Z=P.program;a.updateUBOMapping(k,Z);let X=e.render.frame;h[k.id]!==X&&(T(k),h[k.id]=X)}function _(k){let P=M();k.__bindingPointIndex=P;let V=l.createBuffer(),Z=k.__size,X=k.usage;return l.bindBuffer(l.UNIFORM_BUFFER,V),l.bufferData(l.UNIFORM_BUFFER,Z,X),l.bindBuffer(l.UNIFORM_BUFFER,null),l.bindBufferBase(l.UNIFORM_BUFFER,P,V),V}function M(){for(let k=0;k<d;k++)if(p.indexOf(k)===-1)return p.push(k),k;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function T(k){let P=c[k.id],V=k.uniforms,Z=k.__cache;l.bindBuffer(l.UNIFORM_BUFFER,P);for(let X=0,W=V.length;X<W;X++){let fe=Array.isArray(V[X])?V[X]:[V[X]];for(let D=0,N=fe.length;D<N;D++){let ae=fe[D];if(w(ae,X,D,Z)===!0){let ge=ae.__offset,we=Array.isArray(ae.value)?ae.value:[ae.value],q=0;for(let te=0;te<we.length;te++){let le=we[te],ue=C(le);typeof le=="number"||typeof le=="boolean"?(ae.__data[0]=le,l.bufferSubData(l.UNIFORM_BUFFER,ge+q,ae.__data)):le.isMatrix3?(ae.__data[0]=le.elements[0],ae.__data[1]=le.elements[1],ae.__data[2]=le.elements[2],ae.__data[3]=0,ae.__data[4]=le.elements[3],ae.__data[5]=le.elements[4],ae.__data[6]=le.elements[5],ae.__data[7]=0,ae.__data[8]=le.elements[6],ae.__data[9]=le.elements[7],ae.__data[10]=le.elements[8],ae.__data[11]=0):(le.toArray(ae.__data,q),q+=ue.storage/Float32Array.BYTES_PER_ELEMENT)}l.bufferSubData(l.UNIFORM_BUFFER,ge,ae.__data)}}}l.bindBuffer(l.UNIFORM_BUFFER,null)}function w(k,P,V,Z){let X=k.value,W=P+"_"+V;if(Z[W]===void 0)return typeof X=="number"||typeof X=="boolean"?Z[W]=X:Z[W]=X.clone(),!0;{let fe=Z[W];if(typeof X=="number"||typeof X=="boolean"){if(fe!==X)return Z[W]=X,!0}else if(fe.equals(X)===!1)return fe.copy(X),!0}return!1}function A(k){let P=k.uniforms,V=0,Z=16;for(let W=0,fe=P.length;W<fe;W++){let D=Array.isArray(P[W])?P[W]:[P[W]];for(let N=0,ae=D.length;N<ae;N++){let ge=D[N],we=Array.isArray(ge.value)?ge.value:[ge.value];for(let q=0,te=we.length;q<te;q++){let le=we[q],ue=C(le),ce=V%Z;ce!==0&&Z-ce<ue.boundary&&(V+=Z-ce),ge.__data=new Float32Array(ue.storage/Float32Array.BYTES_PER_ELEMENT),ge.__offset=V,V+=ue.storage}}}let X=V%Z;return X>0&&(V+=Z-X),k.__size=V,k.__cache={},this}function C(k){let P={boundary:0,storage:0};return typeof k=="number"||typeof k=="boolean"?(P.boundary=4,P.storage=4):k.isVector2?(P.boundary=8,P.storage=8):k.isVector3||k.isColor?(P.boundary=16,P.storage=12):k.isVector4?(P.boundary=16,P.storage=16):k.isMatrix3?(P.boundary=48,P.storage=48):k.isMatrix4?(P.boundary=64,P.storage=64):k.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",k),P}function E(k){let P=k.target;P.removeEventListener("dispose",E);let V=p.indexOf(P.__bindingPointIndex);p.splice(V,1),l.deleteBuffer(c[P.id]),delete c[P.id],delete h[P.id]}function b(){for(let k in c)l.deleteBuffer(c[k]);p=[],c={},h={}}return{bind:y,update:x,dispose:b}}var yl=class{constructor(e={}){let{canvas:n=yy(),context:a=null,depth:c=!0,stencil:h=!0,alpha:p=!1,antialias:d=!1,premultipliedAlpha:y=!0,preserveDrawingBuffer:x=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:M=!1}=e;this.isWebGLRenderer=!0;let T;a!==null?T=a.getContextAttributes().alpha:T=p;let w=new Uint32Array(4),A=new Int32Array(4),C=null,E=null,b=[],k=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Yt,this._useLegacyLights=!1,this.toneMapping=Fi,this.toneMappingExposure=1;let P=this,V=!1,Z=0,X=0,W=null,fe=-1,D=null,N=new Zt,ae=new Zt,ge=null,we=new vt(0),q=0,te=n.width,le=n.height,ue=1,ce=null,se=null,pe=new Zt(0,0,te,le),Me=new Zt(0,0,te,le),Le=!1,oe=new Ra,me=!1,Ae=!1,He=null,Ge=new qt,he=new Ct,nt=new ee,$e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function dt(){return W===null?ue:1}let K=a;function Ft(U,Y){for(let Q=0;Q<U.length;Q++){let ne=U[Q],J=n.getContext(ne,Y);if(J!==null)return J}return null}try{let U={alpha:!0,depth:c,stencil:h,antialias:d,premultipliedAlpha:y,preserveDrawingBuffer:x,powerPreference:_,failIfMajorPerformanceCaveat:M};if("setAttribute"in n&&n.setAttribute("data-engine","three.js r160"),n.addEventListener("webglcontextlost",Te,!1),n.addEventListener("webglcontextrestored",G,!1),n.addEventListener("webglcontextcreationerror",Ce,!1),K===null){let Y=["webgl2","webgl","experimental-webgl"];if(P.isWebGL1Renderer===!0&&Y.shift(),K=Ft(Y,U),K===null)throw Ft(Y)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&K instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),K.getShaderPrecisionFormat===void 0&&(K.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(U){throw console.error("THREE.WebGLRenderer: "+U.message),U}let re,xe,Pe,St,et,O,R,j,be,ye,Se,ke,ve,Ue,qe,Qe,de,gt,rt,je,We,$,it,mt;function Pt(){re=new A_(K),xe=new b_(K,re,e),re.init(xe),$=new r1(K,re,xe),Pe=new i1(K,re,xe),St=new L_(K),et=new Xb,O=new s1(K,re,Pe,et,xe,$,St),R=new M_(P),j=new w_(P),be=new ky(K,xe),it=new v_(K,re,be,xe),ye=new C_(K,be,St,it),Se=new D_(K,ye,be,St),rt=new U_(K,xe,O),Qe=new S_(et),ke=new Wb(P,R,j,re,xe,it,Qe),ve=new o1(P,et),Ue=new Yb,qe=new Qb(re,xe),gt=new x_(P,R,j,Pe,Se,T,y),de=new n1(P,Se,xe),mt=new l1(K,St,xe,Pe),je=new __(K,re,St,xe),We=new R_(K,re,St,xe),St.programs=ke.programs,P.capabilities=xe,P.extensions=re,P.properties=et,P.renderLists=Ue,P.shadowMap=de,P.state=Pe,P.info=St}Pt();let at=new gl(P,K);this.xr=at,this.getContext=function(){return K},this.getContextAttributes=function(){return K.getContextAttributes()},this.forceContextLoss=function(){let U=re.get("WEBGL_lose_context");U&&U.loseContext()},this.forceContextRestore=function(){let U=re.get("WEBGL_lose_context");U&&U.restoreContext()},this.getPixelRatio=function(){return ue},this.setPixelRatio=function(U){U!==void 0&&(ue=U,this.setSize(te,le,!1))},this.getSize=function(U){return U.set(te,le)},this.setSize=function(U,Y,Q=!0){if(at.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}te=U,le=Y,n.width=Math.floor(U*ue),n.height=Math.floor(Y*ue),Q===!0&&(n.style.width=U+"px",n.style.height=Y+"px"),this.setViewport(0,0,U,Y)},this.getDrawingBufferSize=function(U){return U.set(te*ue,le*ue).floor()},this.setDrawingBufferSize=function(U,Y,Q){te=U,le=Y,ue=Q,n.width=Math.floor(U*Q),n.height=Math.floor(Y*Q),this.setViewport(0,0,U,Y)},this.getCurrentViewport=function(U){return U.copy(N)},this.getViewport=function(U){return U.copy(pe)},this.setViewport=function(U,Y,Q,ne){U.isVector4?pe.set(U.x,U.y,U.z,U.w):pe.set(U,Y,Q,ne),Pe.viewport(N.copy(pe).multiplyScalar(ue).floor())},this.getScissor=function(U){return U.copy(Me)},this.setScissor=function(U,Y,Q,ne){U.isVector4?Me.set(U.x,U.y,U.z,U.w):Me.set(U,Y,Q,ne),Pe.scissor(ae.copy(Me).multiplyScalar(ue).floor())},this.getScissorTest=function(){return Le},this.setScissorTest=function(U){Pe.setScissorTest(Le=U)},this.setOpaqueSort=function(U){ce=U},this.setTransparentSort=function(U){se=U},this.getClearColor=function(U){return U.copy(gt.getClearColor())},this.setClearColor=function(){gt.setClearColor.apply(gt,arguments)},this.getClearAlpha=function(){return gt.getClearAlpha()},this.setClearAlpha=function(){gt.setClearAlpha.apply(gt,arguments)},this.clear=function(U=!0,Y=!0,Q=!0){let ne=0;if(U){let J=!1;if(W!==null){let Ie=W.texture.format;J=Ie===Fh||Ie===Nh||Ie===Oh}if(J){let Ie=W.texture.type,Be=Ie===ki||Ie===Di||Ie===Rl||Ie===ss||Ie===Uh||Ie===Dh,Ze=gt.getClearColor(),Ke=gt.getClearAlpha(),ot=Ze.r,tt=Ze.g,st=Ze.b;Be?(w[0]=ot,w[1]=tt,w[2]=st,w[3]=Ke,K.clearBufferuiv(K.COLOR,0,w)):(A[0]=ot,A[1]=tt,A[2]=st,A[3]=Ke,K.clearBufferiv(K.COLOR,0,A))}else ne|=K.COLOR_BUFFER_BIT}Y&&(ne|=K.DEPTH_BUFFER_BIT),Q&&(ne|=K.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Te,!1),n.removeEventListener("webglcontextrestored",G,!1),n.removeEventListener("webglcontextcreationerror",Ce,!1),Ue.dispose(),qe.dispose(),et.dispose(),R.dispose(),j.dispose(),Se.dispose(),it.dispose(),mt.dispose(),ke.dispose(),at.dispose(),at.removeEventListener("sessionstart",H),at.removeEventListener("sessionend",_t),He&&(He.dispose(),He=null),_e.stop()};function Te(U){U.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),V=!0}function G(){console.log("THREE.WebGLRenderer: Context Restored."),V=!1;let U=St.autoReset,Y=de.enabled,Q=de.autoUpdate,ne=de.needsUpdate,J=de.type;Pt(),St.autoReset=U,de.enabled=Y,de.autoUpdate=Q,de.needsUpdate=ne,de.type=J}function Ce(U){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",U.statusMessage)}function Re(U){let Y=U.target;Y.removeEventListener("dispose",Re),Je(Y)}function Je(U){Ye(U),et.remove(U)}function Ye(U){let Y=et.get(U).programs;Y!==void 0&&(Y.forEach(function(Q){ke.releaseProgram(Q)}),U.isShaderMaterial&&ke.releaseShaderCache(U))}this.renderBufferDirect=function(U,Y,Q,ne,J,Ie){Y===null&&(Y=$e);let Be=J.isMesh&&J.matrixWorld.determinant()<0,Ze=js(U,Y,Q,ne,J);Pe.setMaterial(ne,Be);let Ke=Q.index,ot=1;if(ne.wireframe===!0){if(Ke=ye.getWireframeAttribute(Q),Ke===void 0)return;ot=2}let tt=Q.drawRange,st=Q.attributes.position,Nt=tt.start*ot,sn=(tt.start+tt.count)*ot;Ie!==null&&(Nt=Math.max(Nt,Ie.start*ot),sn=Math.min(sn,(Ie.start+Ie.count)*ot)),Ke!==null?(Nt=Math.max(Nt,0),sn=Math.min(sn,Ke.count)):st!=null&&(Nt=Math.max(Nt,0),sn=Math.min(sn,st.count));let zt=sn-Nt;if(zt<0||zt===1/0)return;it.setup(J,ne,Ze,Q,Ke);let Pn,Lt=je;if(Ke!==null&&(Pn=be.get(Ke),Lt=We,Lt.setIndex(Pn)),J.isMesh)ne.wireframe===!0?(Pe.setLineWidth(ne.wireframeLinewidth*dt()),Lt.setMode(K.LINES)):Lt.setMode(K.TRIANGLES);else if(J.isLine){let lt=ne.linewidth;lt===void 0&&(lt=1),Pe.setLineWidth(lt*dt()),J.isLineSegments?Lt.setMode(K.LINES):J.isLineLoop?Lt.setMode(K.LINE_LOOP):Lt.setMode(K.LINE_STRIP)}else J.isPoints?Lt.setMode(K.POINTS):J.isSprite&&Lt.setMode(K.TRIANGLES);if(J.isBatchedMesh)Lt.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else if(J.isInstancedMesh)Lt.renderInstances(Nt,zt,J.count);else if(Q.isInstancedBufferGeometry){let lt=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,_i=Math.min(Q.instanceCount,lt);Lt.renderInstances(Nt,zt,_i)}else Lt.render(Nt,zt)};function Mt(U,Y,Q){U.transparent===!0&&U.side===hi&&U.forceSinglePass===!1?(U.side=gn,U.needsUpdate=!0,vi(U,Y,Q),U.side=Bi,U.needsUpdate=!0,vi(U,Y,Q),U.side=hi):vi(U,Y,Q)}this.compile=function(U,Y,Q=null){Q===null&&(Q=U),E=qe.get(Q),E.init(),k.push(E),Q.traverseVisible(function(J){J.isLight&&J.layers.test(Y.layers)&&(E.pushLight(J),J.castShadow&&E.pushShadow(J))}),U!==Q&&U.traverseVisible(function(J){J.isLight&&J.layers.test(Y.layers)&&(E.pushLight(J),J.castShadow&&E.pushShadow(J))}),E.setupLights(P._useLegacyLights);let ne=new Set;return U.traverse(function(J){let Ie=J.material;if(Ie)if(Array.isArray(Ie))for(let Be=0;Be<Ie.length;Be++){let Ze=Ie[Be];Mt(Ze,Q,J),ne.add(Ze)}else Mt(Ie,Q,J),ne.add(Ie)}),k.pop(),E=null,ne},this.compileAsync=function(U,Y,Q=null){let ne=this.compile(U,Y,Q);return new Promise(J=>{function Ie(){if(ne.forEach(function(Be){et.get(Be).currentProgram.isReady()&&ne.delete(Be)}),ne.size===0){J(U);return}setTimeout(Ie,10)}re.get("KHR_parallel_shader_compile")!==null?Ie():setTimeout(Ie,10)})};let Tt=null;function pt(U){Tt&&Tt(U)}function H(){_e.stop()}function _t(){_e.start()}let _e=new Wh;_e.setAnimationLoop(pt),typeof self<"u"&&_e.setContext(self),this.setAnimationLoop=function(U){Tt=U,at.setAnimationLoop(U),U===null?_e.stop():_e.start()},at.addEventListener("sessionstart",H),at.addEventListener("sessionend",_t),this.render=function(U,Y){if(Y!==void 0&&Y.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(V===!0)return;U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),at.enabled===!0&&at.isPresenting===!0&&(at.cameraAutoUpdate===!0&&at.updateCamera(Y),Y=at.getCamera()),U.isScene===!0&&U.onBeforeRender(P,U,Y,W),E=qe.get(U,k.length),E.init(),k.push(E),Ge.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),oe.setFromProjectionMatrix(Ge),Ae=this.localClippingEnabled,me=Qe.init(this.clippingPlanes,Ae),C=Ue.get(U,b.length),C.init(),b.push(C),nn(U,Y,0,P.sortObjects),C.finish(),P.sortObjects===!0&&C.sort(ce,se),this.info.render.frame++,me===!0&&Qe.beginShadows();let Q=E.state.shadowsArray;if(de.render(Q,U,Y),me===!0&&Qe.endShadows(),this.info.autoReset===!0&&this.info.reset(),gt.render(C,U),E.setupLights(P._useLegacyLights),Y.isArrayCamera){let ne=Y.cameras;for(let J=0,Ie=ne.length;J<Ie;J++){let Be=ne[J];$s(C,U,Be,Be.viewport)}}else $s(C,U,Y);W!==null&&(O.updateMultisampleRenderTarget(W),O.updateRenderTargetMipmap(W)),U.isScene===!0&&U.onAfterRender(P,U,Y),it.resetDefaultState(),fe=-1,D=null,k.pop(),k.length>0?E=k[k.length-1]:E=null,b.pop(),b.length>0?C=b[b.length-1]:C=null};function nn(U,Y,Q,ne){if(U.visible===!1)return;if(U.layers.test(Y.layers)){if(U.isGroup)Q=U.renderOrder;else if(U.isLOD)U.autoUpdate===!0&&U.update(Y);else if(U.isLight)E.pushLight(U),U.castShadow&&E.pushShadow(U);else if(U.isSprite){if(!U.frustumCulled||oe.intersectsSprite(U)){ne&&nt.setFromMatrixPosition(U.matrixWorld).applyMatrix4(Ge);let Be=Se.update(U),Ze=U.material;Ze.visible&&C.push(U,Be,Ze,Q,nt.z,null)}}else if((U.isMesh||U.isLine||U.isPoints)&&(!U.frustumCulled||oe.intersectsObject(U))){let Be=Se.update(U),Ze=U.material;if(ne&&(U.boundingSphere!==void 0?(U.boundingSphere===null&&U.computeBoundingSphere(),nt.copy(U.boundingSphere.center)):(Be.boundingSphere===null&&Be.computeBoundingSphere(),nt.copy(Be.boundingSphere.center)),nt.applyMatrix4(U.matrixWorld).applyMatrix4(Ge)),Array.isArray(Ze)){let Ke=Be.groups;for(let ot=0,tt=Ke.length;ot<tt;ot++){let st=Ke[ot],Nt=Ze[st.materialIndex];Nt&&Nt.visible&&C.push(U,Be,Nt,Q,nt.z,st)}}else Ze.visible&&C.push(U,Be,Ze,Q,nt.z,null)}}let Ie=U.children;for(let Be=0,Ze=Ie.length;Be<Ze;Be++)nn(Ie[Be],Y,Q,ne)}function $s(U,Y,Q,ne){let J=U.opaque,Ie=U.transmissive,Be=U.transparent;E.setupLightsView(Q),me===!0&&Qe.setGlobalState(P.clippingPlanes,Q),Ie.length>0&&Ba(J,Ie,Y,Q),ne&&Pe.viewport(N.copy(ne)),J.length>0&&Hi(J,Y,Q),Ie.length>0&&Hi(Ie,Y,Q),Be.length>0&&Hi(Be,Y,Q),Pe.buffers.depth.setTest(!0),Pe.buffers.depth.setMask(!0),Pe.buffers.color.setMask(!0),Pe.setPolygonOffset(!1)}function Ba(U,Y,Q,ne){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;let Ie=xe.isWebGL2;He===null&&(He=new mi(1,1,{generateMipmaps:!0,type:re.has("EXT_color_buffer_half_float")?pr:ki,minFilter:dr,samples:Ie?4:0})),P.getDrawingBufferSize(he),Ie?He.setSize(he.x,he.y):He.setSize(Qo(he.x),Qo(he.y));let Be=P.getRenderTarget();P.setRenderTarget(He),P.getClearColor(we),q=P.getClearAlpha(),q<1&&P.setClearColor(16777215,.5),P.clear();let Ze=P.toneMapping;P.toneMapping=Fi,Hi(U,Q,ne),O.updateMultisampleRenderTarget(He),O.updateRenderTargetMipmap(He);let Ke=!1;for(let ot=0,tt=Y.length;ot<tt;ot++){let st=Y[ot],Nt=st.object,sn=st.geometry,zt=st.material,Pn=st.group;if(zt.side===hi&&Nt.layers.test(ne.layers)){let Lt=zt.side;zt.side=gn,zt.needsUpdate=!0,_r(Nt,Q,ne,sn,zt,Pn),zt.side=Lt,zt.needsUpdate=!0,Ke=!0}}Ke===!0&&(O.updateMultisampleRenderTarget(He),O.updateRenderTargetMipmap(He)),P.setRenderTarget(Be),P.setClearColor(we,q),P.toneMapping=Ze}function Hi(U,Y,Q){let ne=Y.isScene===!0?Y.overrideMaterial:null;for(let J=0,Ie=U.length;J<Ie;J++){let Be=U[J],Ze=Be.object,Ke=Be.geometry,ot=ne===null?Be.material:ne,tt=Be.group;Ze.layers.test(Q.layers)&&_r(Ze,Y,Q,Ke,ot,tt)}}function _r(U,Y,Q,ne,J,Ie){U.onBeforeRender(P,Y,Q,ne,J,Ie),U.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,U.matrixWorld),U.normalMatrix.getNormalMatrix(U.modelViewMatrix),J.onBeforeRender(P,Y,Q,ne,U,Ie),J.transparent===!0&&J.side===hi&&J.forceSinglePass===!1?(J.side=gn,J.needsUpdate=!0,P.renderBufferDirect(Q,Y,ne,J,U,Ie),J.side=Bi,J.needsUpdate=!0,P.renderBufferDirect(Q,Y,ne,J,U,Ie),J.side=hi):P.renderBufferDirect(Q,Y,ne,J,U,Ie),U.onAfterRender(P,Y,Q,ne,J,Ie)}function vi(U,Y,Q){Y.isScene!==!0&&(Y=$e);let ne=et.get(U),J=E.state.lights,Ie=E.state.shadowsArray,Be=J.state.version,Ze=ke.getParameters(U,J.state,Ie,Y,Q),Ke=ke.getProgramCacheKey(Ze),ot=ne.programs;ne.environment=U.isMeshStandardMaterial?Y.environment:null,ne.fog=Y.fog,ne.envMap=(U.isMeshStandardMaterial?j:R).get(U.envMap||ne.environment),ot===void 0&&(U.addEventListener("dispose",Re),ot=new Map,ne.programs=ot);let tt=ot.get(Ke);if(tt!==void 0){if(ne.currentProgram===tt&&ne.lightsStateVersion===Be)return Sr(U,Ze),tt}else Ze.uniforms=ke.getUniforms(U),U.onBuild(Q,Ze,P),U.onBeforeCompile(Ze,P),tt=ke.acquireProgram(Ze,Ke),ot.set(Ke,tt),ne.uniforms=Ze.uniforms;let st=ne.uniforms;return(!U.isShaderMaterial&&!U.isRawShaderMaterial||U.clipping===!0)&&(st.clippingPlanes=Qe.uniform),Sr(U,Ze),ne.needsLights=za(U),ne.lightsStateVersion=Be,ne.needsLights&&(st.ambientLightColor.value=J.state.ambient,st.lightProbe.value=J.state.probe,st.directionalLights.value=J.state.directional,st.directionalLightShadows.value=J.state.directionalShadow,st.spotLights.value=J.state.spot,st.spotLightShadows.value=J.state.spotShadow,st.rectAreaLights.value=J.state.rectArea,st.ltc_1.value=J.state.rectAreaLTC1,st.ltc_2.value=J.state.rectAreaLTC2,st.pointLights.value=J.state.point,st.pointLightShadows.value=J.state.pointShadow,st.hemisphereLights.value=J.state.hemi,st.directionalShadowMap.value=J.state.directionalShadowMap,st.directionalShadowMatrix.value=J.state.directionalShadowMatrix,st.spotShadowMap.value=J.state.spotShadowMap,st.spotLightMatrix.value=J.state.spotLightMatrix,st.spotLightMap.value=J.state.spotLightMap,st.pointShadowMap.value=J.state.pointShadowMap,st.pointShadowMatrix.value=J.state.pointShadowMatrix),ne.currentProgram=tt,ne.uniformsList=null,tt}function br(U){if(U.uniformsList===null){let Y=U.currentProgram.getUniforms();U.uniformsList=zs.seqWithValue(Y.seq,U.uniforms)}return U.uniformsList}function Sr(U,Y){let Q=et.get(U);Q.outputColorSpace=Y.outputColorSpace,Q.batching=Y.batching,Q.instancing=Y.instancing,Q.instancingColor=Y.instancingColor,Q.skinning=Y.skinning,Q.morphTargets=Y.morphTargets,Q.morphNormals=Y.morphNormals,Q.morphColors=Y.morphColors,Q.morphTargetsCount=Y.morphTargetsCount,Q.numClippingPlanes=Y.numClippingPlanes,Q.numIntersection=Y.numClipIntersection,Q.vertexAlphas=Y.vertexAlphas,Q.vertexTangents=Y.vertexTangents,Q.toneMapping=Y.toneMapping}function js(U,Y,Q,ne,J){Y.isScene!==!0&&(Y=$e),O.resetTextureUnits();let Ie=Y.fog,Be=ne.isMeshStandardMaterial?Y.environment:null,Ze=W===null?P.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:pi,Ke=(ne.isMeshStandardMaterial?j:R).get(ne.envMap||Be),ot=ne.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,tt=!!Q.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),st=!!Q.morphAttributes.position,Nt=!!Q.morphAttributes.normal,sn=!!Q.morphAttributes.color,zt=Fi;ne.toneMapped&&(W===null||W.isXRRenderTarget===!0)&&(zt=P.toneMapping);let Pn=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Lt=Pn!==void 0?Pn.length:0,lt=et.get(ne),_i=E.state.lights;if(me===!0&&(Ae===!0||U!==D)){let rn=U===D&&ne.id===fe;Qe.setState(ne,U,rn)}let Ut=!1;ne.version===lt.__version?(lt.needsLights&&lt.lightsStateVersion!==_i.state.version||lt.outputColorSpace!==Ze||J.isBatchedMesh&&lt.batching===!1||!J.isBatchedMesh&&lt.batching===!0||J.isInstancedMesh&&lt.instancing===!1||!J.isInstancedMesh&&lt.instancing===!0||J.isSkinnedMesh&&lt.skinning===!1||!J.isSkinnedMesh&&lt.skinning===!0||J.isInstancedMesh&&lt.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&lt.instancingColor===!1&&J.instanceColor!==null||lt.envMap!==Ke||ne.fog===!0&&lt.fog!==Ie||lt.numClippingPlanes!==void 0&&(lt.numClippingPlanes!==Qe.numPlanes||lt.numIntersection!==Qe.numIntersection)||lt.vertexAlphas!==ot||lt.vertexTangents!==tt||lt.morphTargets!==st||lt.morphNormals!==Nt||lt.morphColors!==sn||lt.toneMapping!==zt||xe.isWebGL2===!0&&lt.morphTargetsCount!==Lt)&&(Ut=!0):(Ut=!0,lt.__version=ne.version);let Qn=lt.currentProgram;Ut===!0&&(Qn=vi(ne,Y,J));let Tr=!1,ei=!1,Js=!1,Dt=Qn.getUniforms(),qn=lt.uniforms;if(Pe.useProgram(Qn.program)&&(Tr=!0,ei=!0,Js=!0),ne.id!==fe&&(fe=ne.id,ei=!0),Tr||D!==U){Dt.setValue(K,"projectionMatrix",U.projectionMatrix),Dt.setValue(K,"viewMatrix",U.matrixWorldInverse);let rn=Dt.map.cameraPosition;rn!==void 0&&rn.setValue(K,nt.setFromMatrixPosition(U.matrixWorld)),xe.logarithmicDepthBuffer&&Dt.setValue(K,"logDepthBufFC",2/(Math.log(U.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&Dt.setValue(K,"isOrthographic",U.isOrthographicCamera===!0),D!==U&&(D=U,ei=!0,Js=!0)}if(J.isSkinnedMesh){Dt.setOptional(K,J,"bindMatrix"),Dt.setOptional(K,J,"bindMatrixInverse");let rn=J.skeleton;rn&&(xe.floatVertexTextures?(rn.boneTexture===null&&rn.computeBoneTexture(),Dt.setValue(K,"boneTexture",rn.boneTexture,O)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}J.isBatchedMesh&&(Dt.setOptional(K,J,"batchingTexture"),Dt.setValue(K,"batchingTexture",J._matricesTexture,O));let us=Q.morphAttributes;if((us.position!==void 0||us.normal!==void 0||us.color!==void 0&&xe.isWebGL2===!0)&&rt.update(J,Q,Qn),(ei||lt.receiveShadow!==J.receiveShadow)&&(lt.receiveShadow=J.receiveShadow,Dt.setValue(K,"receiveShadow",J.receiveShadow)),ne.isMeshGouraudMaterial&&ne.envMap!==null&&(qn.envMap.value=Ke,qn.flipEnvMap.value=Ke.isCubeTexture&&Ke.isRenderTargetTexture===!1?-1:1),ei&&(Dt.setValue(K,"toneMappingExposure",P.toneMappingExposure),lt.needsLights&&Mr(qn,Js),Ie&&ne.fog===!0&&ve.refreshFogUniforms(qn,Ie),ve.refreshMaterialUniforms(qn,ne,ue,le,He),zs.upload(K,br(lt),qn,O)),ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&(zs.upload(K,br(lt),qn,O),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&Dt.setValue(K,"center",J.center),Dt.setValue(K,"modelViewMatrix",J.modelViewMatrix),Dt.setValue(K,"normalMatrix",J.normalMatrix),Dt.setValue(K,"modelMatrix",J.matrixWorld),ne.isShaderMaterial||ne.isRawShaderMaterial){let rn=ne.uniformsGroups;for(let Wi=0,Va=rn.length;Wi<Va;Wi++)if(xe.isWebGL2){let Er=rn[Wi];mt.update(Er,Qn),mt.bind(Er,Qn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Qn}function Mr(U,Y){U.ambientLightColor.needsUpdate=Y,U.lightProbe.needsUpdate=Y,U.directionalLights.needsUpdate=Y,U.directionalLightShadows.needsUpdate=Y,U.pointLights.needsUpdate=Y,U.pointLightShadows.needsUpdate=Y,U.spotLights.needsUpdate=Y,U.spotLightShadows.needsUpdate=Y,U.rectAreaLights.needsUpdate=Y,U.hemisphereLights.needsUpdate=Y}function za(U){return U.isMeshLambertMaterial||U.isMeshToonMaterial||U.isMeshPhongMaterial||U.isMeshStandardMaterial||U.isShadowMaterial||U.isShaderMaterial&&U.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return W},this.setRenderTargetTextures=function(U,Y,Q){et.get(U.texture).__webglTexture=Y,et.get(U.depthTexture).__webglTexture=Q;let ne=et.get(U);ne.__hasExternalTextures=!0,ne.__hasExternalTextures&&(ne.__autoAllocateDepthBuffer=Q===void 0,ne.__autoAllocateDepthBuffer||re.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ne.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(U,Y){let Q=et.get(U);Q.__webglFramebuffer=Y,Q.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(U,Y=0,Q=0){W=U,Z=Y,X=Q;let ne=!0,J=null,Ie=!1,Be=!1;if(U){let Ke=et.get(U);Ke.__useDefaultFramebuffer!==void 0?(Pe.bindFramebuffer(K.FRAMEBUFFER,null),ne=!1):Ke.__webglFramebuffer===void 0?O.setupRenderTarget(U):Ke.__hasExternalTextures&&O.rebindTextures(U,et.get(U.texture).__webglTexture,et.get(U.depthTexture).__webglTexture);let ot=U.texture;(ot.isData3DTexture||ot.isDataArrayTexture||ot.isCompressedArrayTexture)&&(Be=!0);let tt=et.get(U).__webglFramebuffer;U.isWebGLCubeRenderTarget?(Array.isArray(tt[Y])?J=tt[Y][Q]:J=tt[Y],Ie=!0):xe.isWebGL2&&U.samples>0&&O.useMultisampledRTT(U)===!1?J=et.get(U).__webglMultisampledFramebuffer:Array.isArray(tt)?J=tt[Q]:J=tt,N.copy(U.viewport),ae.copy(U.scissor),ge=U.scissorTest}else N.copy(pe).multiplyScalar(ue).floor(),ae.copy(Me).multiplyScalar(ue).floor(),ge=Le;if(Pe.bindFramebuffer(K.FRAMEBUFFER,J)&&xe.drawBuffers&&ne&&Pe.drawBuffers(U,J),Pe.viewport(N),Pe.scissor(ae),Pe.setScissorTest(ge),Ie){let Ke=et.get(U.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Ke.__webglTexture,Q)}else if(Be){let Ke=et.get(U.texture),ot=Y||0;K.framebufferTextureLayer(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,Ke.__webglTexture,Q||0,ot)}fe=-1},this.readRenderTargetPixels=function(U,Y,Q,ne,J,Ie,Be){if(!(U&&U.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ze=et.get(U).__webglFramebuffer;if(U.isWebGLCubeRenderTarget&&Be!==void 0&&(Ze=Ze[Be]),Ze){Pe.bindFramebuffer(K.FRAMEBUFFER,Ze);try{let Ke=U.texture,ot=Ke.format,tt=Ke.type;if(ot!==Hn&&$.convert(ot)!==K.getParameter(K.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let st=tt===pr&&(re.has("EXT_color_buffer_half_float")||xe.isWebGL2&&re.has("EXT_color_buffer_float"));if(tt!==ki&&$.convert(tt)!==K.getParameter(K.IMPLEMENTATION_COLOR_READ_TYPE)&&!(tt===Oi&&(xe.isWebGL2||re.has("OES_texture_float")||re.has("WEBGL_color_buffer_float")))&&!st){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=U.width-ne&&Q>=0&&Q<=U.height-J&&K.readPixels(Y,Q,ne,J,$.convert(ot),$.convert(tt),Ie)}finally{let Ke=W!==null?et.get(W).__webglFramebuffer:null;Pe.bindFramebuffer(K.FRAMEBUFFER,Ke)}}},this.copyFramebufferToTexture=function(U,Y,Q=0){let ne=Math.pow(2,-Q),J=Math.floor(Y.image.width*ne),Ie=Math.floor(Y.image.height*ne);O.setTexture2D(Y,0),K.copyTexSubImage2D(K.TEXTURE_2D,Q,0,0,U.x,U.y,J,Ie),Pe.unbindTexture()},this.copyTextureToTexture=function(U,Y,Q,ne=0){let J=Y.image.width,Ie=Y.image.height,Be=$.convert(Q.format),Ze=$.convert(Q.type);O.setTexture2D(Q,0),K.pixelStorei(K.UNPACK_FLIP_Y_WEBGL,Q.flipY),K.pixelStorei(K.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),K.pixelStorei(K.UNPACK_ALIGNMENT,Q.unpackAlignment),Y.isDataTexture?K.texSubImage2D(K.TEXTURE_2D,ne,U.x,U.y,J,Ie,Be,Ze,Y.image.data):Y.isCompressedTexture?K.compressedTexSubImage2D(K.TEXTURE_2D,ne,U.x,U.y,Y.mipmaps[0].width,Y.mipmaps[0].height,Be,Y.mipmaps[0].data):K.texSubImage2D(K.TEXTURE_2D,ne,U.x,U.y,Be,Ze,Y.image),ne===0&&Q.generateMipmaps&&K.generateMipmap(K.TEXTURE_2D),Pe.unbindTexture()},this.copyTextureToTexture3D=function(U,Y,Q,ne,J=0){if(P.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let Ie=U.max.x-U.min.x+1,Be=U.max.y-U.min.y+1,Ze=U.max.z-U.min.z+1,Ke=$.convert(ne.format),ot=$.convert(ne.type),tt;if(ne.isData3DTexture)O.setTexture3D(ne,0),tt=K.TEXTURE_3D;else if(ne.isDataArrayTexture||ne.isCompressedArrayTexture)O.setTexture2DArray(ne,0),tt=K.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}K.pixelStorei(K.UNPACK_FLIP_Y_WEBGL,ne.flipY),K.pixelStorei(K.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ne.premultiplyAlpha),K.pixelStorei(K.UNPACK_ALIGNMENT,ne.unpackAlignment);let st=K.getParameter(K.UNPACK_ROW_LENGTH),Nt=K.getParameter(K.UNPACK_IMAGE_HEIGHT),sn=K.getParameter(K.UNPACK_SKIP_PIXELS),zt=K.getParameter(K.UNPACK_SKIP_ROWS),Pn=K.getParameter(K.UNPACK_SKIP_IMAGES),Lt=Q.isCompressedTexture?Q.mipmaps[J]:Q.image;K.pixelStorei(K.UNPACK_ROW_LENGTH,Lt.width),K.pixelStorei(K.UNPACK_IMAGE_HEIGHT,Lt.height),K.pixelStorei(K.UNPACK_SKIP_PIXELS,U.min.x),K.pixelStorei(K.UNPACK_SKIP_ROWS,U.min.y),K.pixelStorei(K.UNPACK_SKIP_IMAGES,U.min.z),Q.isDataTexture||Q.isData3DTexture?K.texSubImage3D(tt,J,Y.x,Y.y,Y.z,Ie,Be,Ze,Ke,ot,Lt.data):Q.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),K.compressedTexSubImage3D(tt,J,Y.x,Y.y,Y.z,Ie,Be,Ze,Ke,Lt.data)):K.texSubImage3D(tt,J,Y.x,Y.y,Y.z,Ie,Be,Ze,Ke,ot,Lt),K.pixelStorei(K.UNPACK_ROW_LENGTH,st),K.pixelStorei(K.UNPACK_IMAGE_HEIGHT,Nt),K.pixelStorei(K.UNPACK_SKIP_PIXELS,sn),K.pixelStorei(K.UNPACK_SKIP_ROWS,zt),K.pixelStorei(K.UNPACK_SKIP_IMAGES,Pn),J===0&&ne.generateMipmaps&&K.generateMipmap(tt),Pe.unbindTexture()},this.initTexture=function(U){U.isCubeTexture?O.setTextureCube(U,0):U.isData3DTexture?O.setTexture3D(U,0):U.isDataArrayTexture||U.isCompressedArrayTexture?O.setTexture2DArray(U,0):O.setTexture2D(U,0),Pe.unbindTexture()},this.resetState=function(){Z=0,X=0,W=null,Pe.reset(),it.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let n=this.getContext();n.drawingBufferColorSpace=e===Ll?"display-p3":"srgb",n.unpackColorSpace=At.workingColorSpace===Ua?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Yt?as:Bh}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===as?Yt:pi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},xl=class extends yl{};xl.prototype.isWebGL1Renderer=!0;function ua(l,e,n){return!l||!n&&l.constructor===e?l:typeof e.BYTES_PER_ELEMENT=="number"?new e(l):Array.prototype.slice.call(l)}function c1(l){return ArrayBuffer.isView(l)&&!(l instanceof DataView)}var qs=class{constructor(e,n,a,c){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=c!==void 0?c:new n.constructor(a),this.sampleValues=n,this.valueSize=a,this.settings=null,this.DefaultSettings_={}}evaluate(e){let n=this.parameterPositions,a=this._cachedIndex,c=n[a],h=n[a-1];e:{t:{let p;n:{i:if(!(e<c)){for(let d=a+2;;){if(c===void 0){if(e<h)break i;return a=n.length,this._cachedIndex=a,this.copySampleValue_(a-1)}if(a===d)break;if(h=c,c=n[++a],e<c)break t}p=n.length;break n}if(!(e>=h)){let d=n[1];e<d&&(a=2,h=d);for(let y=a-2;;){if(h===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(a===y)break;if(c=h,h=n[--a-1],e>=h)break t}p=a,a=0;break n}break e}for(;a<p;){let d=a+p>>>1;e<n[d]?p=d:a=d+1}if(c=n[a],h=n[a-1],h===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(c===void 0)return a=n.length,this._cachedIndex=a,this.copySampleValue_(a-1)}this._cachedIndex=a,this.intervalChanged_(a,h,c)}return this.interpolate_(a,h,e,c)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let n=this.resultBuffer,a=this.sampleValues,c=this.valueSize,h=e*c;for(let p=0;p!==c;++p)n[p]=a[h+p];return n}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},vl=class extends qs{constructor(e,n,a,c){super(e,n,a,c),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Bu,endingEnd:Bu}}intervalChanged_(e,n,a){let c=this.parameterPositions,h=e-2,p=e+1,d=c[h],y=c[p];if(d===void 0)switch(this.getSettings_().endingStart){case zu:h=e,d=2*n-a;break;case Vu:h=c.length-2,d=n+c[h]-c[h+1];break;default:h=e,d=a}if(y===void 0)switch(this.getSettings_().endingEnd){case zu:p=e,y=2*a-n;break;case Vu:p=1,y=a+c[1]-c[0];break;default:p=e-1,y=n}let x=(a-n)*.5,_=this.valueSize;this._weightPrev=x/(n-d),this._weightNext=x/(y-a),this._offsetPrev=h*_,this._offsetNext=p*_}interpolate_(e,n,a,c){let h=this.resultBuffer,p=this.sampleValues,d=this.valueSize,y=e*d,x=y-d,_=this._offsetPrev,M=this._offsetNext,T=this._weightPrev,w=this._weightNext,A=(a-n)/(c-n),C=A*A,E=C*A,b=-T*E+2*T*C-T*A,k=(1+T)*E+(-1.5-2*T)*C+(-.5+T)*A+1,P=(-1-w)*E+(1.5+w)*C+.5*A,V=w*E-w*C;for(let Z=0;Z!==d;++Z)h[Z]=b*p[_+Z]+k*p[x+Z]+P*p[y+Z]+V*p[M+Z];return h}},_l=class extends qs{constructor(e,n,a,c){super(e,n,a,c)}interpolate_(e,n,a,c){let h=this.resultBuffer,p=this.sampleValues,d=this.valueSize,y=e*d,x=y-d,_=(a-n)/(c-n),M=1-_;for(let T=0;T!==d;++T)h[T]=p[x+T]*M+p[y+T]*_;return h}},bl=class extends qs{constructor(e,n,a,c){super(e,n,a,c)}interpolate_(e){return this.copySampleValue_(e-1)}},Xn=class{constructor(e,n,a,c){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ua(n,this.TimeBufferType),this.values=ua(a,this.ValueBufferType),this.setInterpolation(c||this.DefaultInterpolation)}static toJSON(e){let n=e.constructor,a;if(n.toJSON!==this.toJSON)a=n.toJSON(e);else{a={name:e.name,times:ua(e.times,Array),values:ua(e.values,Array)};let c=e.getInterpolation();c!==e.DefaultInterpolation&&(a.interpolation=c)}return a.type=e.ValueTypeName,a}InterpolantFactoryMethodDiscrete(e){return new bl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new _l(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new vl(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let n;switch(e){case fa:n=this.InterpolantFactoryMethodDiscrete;break;case da:n=this.InterpolantFactoryMethodLinear;break;case _o:n=this.InterpolantFactoryMethodSmooth;break}if(n===void 0){let a="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(a);return console.warn("THREE.KeyframeTrack:",a),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return fa;case this.InterpolantFactoryMethodLinear:return da;case this.InterpolantFactoryMethodSmooth:return _o}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let n=this.times;for(let a=0,c=n.length;a!==c;++a)n[a]+=e}return this}scale(e){if(e!==1){let n=this.times;for(let a=0,c=n.length;a!==c;++a)n[a]*=e}return this}trim(e,n){let a=this.times,c=a.length,h=0,p=c-1;for(;h!==c&&a[h]<e;)++h;for(;p!==-1&&a[p]>n;)--p;if(++p,h!==0||p!==c){h>=p&&(p=Math.max(p,1),h=p-1);let d=this.getValueSize();this.times=a.slice(h,p),this.values=this.values.slice(h*d,p*d)}return this}validate(){let e=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let a=this.times,c=this.values,h=a.length;h===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let p=null;for(let d=0;d!==h;d++){let y=a[d];if(typeof y=="number"&&isNaN(y)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,d,y),e=!1;break}if(p!==null&&p>y){console.error("THREE.KeyframeTrack: Out of order keys.",this,d,y,p),e=!1;break}p=y}if(c!==void 0&&c1(c))for(let d=0,y=c.length;d!==y;++d){let x=c[d];if(isNaN(x)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,d,x),e=!1;break}}return e}optimize(){let e=this.times.slice(),n=this.values.slice(),a=this.getValueSize(),c=this.getInterpolation()===_o,h=e.length-1,p=1;for(let d=1;d<h;++d){let y=!1,x=e[d],_=e[d+1];if(x!==_&&(d!==1||x!==e[0]))if(c)y=!0;else{let M=d*a,T=M-a,w=M+a;for(let A=0;A!==a;++A){let C=n[M+A];if(C!==n[T+A]||C!==n[w+A]){y=!0;break}}}if(y){if(d!==p){e[p]=e[d];let M=d*a,T=p*a;for(let w=0;w!==a;++w)n[T+w]=n[M+w]}++p}}if(h>0){e[p]=e[h];for(let d=h*a,y=p*a,x=0;x!==a;++x)n[y+x]=n[d+x];++p}return p!==e.length?(this.times=e.slice(0,p),this.values=n.slice(0,p*a)):(this.times=e,this.values=n),this}clone(){let e=this.times.slice(),n=this.values.slice(),a=this.constructor,c=new a(this.name,e,n);return c.createInterpolant=this.createInterpolant,c}};Xn.prototype.TimeBufferType=Float32Array;Xn.prototype.ValueBufferType=Float32Array;Xn.prototype.DefaultInterpolation=da;var ls=class extends Xn{};ls.prototype.ValueTypeName="bool";ls.prototype.ValueBufferType=Array;ls.prototype.DefaultInterpolation=fa;ls.prototype.InterpolantFactoryMethodLinear=void 0;ls.prototype.InterpolantFactoryMethodSmooth=void 0;var Sl=class extends Xn{};Sl.prototype.ValueTypeName="color";var Ml=class extends Xn{};Ml.prototype.ValueTypeName="number";var Tl=class extends qs{constructor(e,n,a,c){super(e,n,a,c)}interpolate_(e,n,a,c){let h=this.resultBuffer,p=this.sampleValues,d=this.valueSize,y=(a-n)/(c-n),x=e*d;for(let _=x+d;x!==_;x+=4)Vi.slerpFlat(h,0,p,x-d,p,x,y);return h}},yr=class extends Xn{InterpolantFactoryMethodLinear(e){return new Tl(this.times,this.values,this.getValueSize(),e)}};yr.prototype.ValueTypeName="quaternion";yr.prototype.DefaultInterpolation=da;yr.prototype.InterpolantFactoryMethodSmooth=void 0;var cs=class extends Xn{};cs.prototype.ValueTypeName="string";cs.prototype.ValueBufferType=Array;cs.prototype.DefaultInterpolation=fa;cs.prototype.InterpolantFactoryMethodLinear=void 0;cs.prototype.InterpolantFactoryMethodSmooth=void 0;var El=class extends Xn{};El.prototype.ValueTypeName="vector";var wl=class{constructor(e,n,a){let c=this,h=!1,p=0,d=0,y,x=[];this.onStart=void 0,this.onLoad=e,this.onProgress=n,this.onError=a,this.itemStart=function(_){d++,h===!1&&c.onStart!==void 0&&c.onStart(_,p,d),h=!0},this.itemEnd=function(_){p++,c.onProgress!==void 0&&c.onProgress(_,p,d),p===d&&(h=!1,c.onLoad!==void 0&&c.onLoad())},this.itemError=function(_){c.onError!==void 0&&c.onError(_)},this.resolveURL=function(_){return y?y(_):_},this.setURLModifier=function(_){return y=_,this},this.addHandler=function(_,M){return x.push(_,M),this},this.removeHandler=function(_){let M=x.indexOf(_);return M!==-1&&x.splice(M,2),this},this.getHandler=function(_){for(let M=0,T=x.length;M<T;M+=2){let w=x[M],A=x[M+1];if(w.global&&(w.lastIndex=0),w.test(_))return A}return null}}},u1=new wl,Al=class{constructor(e){this.manager=e!==void 0?e:u1,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,n){let a=this;return new Promise(function(c,h){a.load(e,c,n,h)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Al.DEFAULT_MATERIAL_NAME="__DEFAULT";var Pl="\\[\\]\\.:\\/",h1=new RegExp("["+Pl+"]","g"),Ul="[^"+Pl+"]",f1="[^"+Pl.replace("\\.","")+"]",d1=/((?:WC+[\/:])*)/.source.replace("WC",Ul),p1=/(WCOD+)?/.source.replace("WCOD",f1),m1=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ul),g1=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ul),y1=new RegExp("^"+d1+p1+m1+g1+"$"),x1=["material","materials","bones","map"],Cl=class{constructor(e,n,a){let c=a||Ot.parseTrackName(n);this._targetGroup=e,this._bindings=e.subscribe_(n,c)}getValue(e,n){this.bind();let a=this._targetGroup.nCachedObjects_,c=this._bindings[a];c!==void 0&&c.getValue(e,n)}setValue(e,n){let a=this._bindings;for(let c=this._targetGroup.nCachedObjects_,h=a.length;c!==h;++c)a[c].setValue(e,n)}bind(){let e=this._bindings;for(let n=this._targetGroup.nCachedObjects_,a=e.length;n!==a;++n)e[n].bind()}unbind(){let e=this._bindings;for(let n=this._targetGroup.nCachedObjects_,a=e.length;n!==a;++n)e[n].unbind()}},Ot=class l{constructor(e,n,a){this.path=n,this.parsedPath=a||l.parseTrackName(n),this.node=l.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,n,a){return e&&e.isAnimationObjectGroup?new l.Composite(e,n,a):new l(e,n,a)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(h1,"")}static parseTrackName(e){let n=y1.exec(e);if(n===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let a={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},c=a.nodeName&&a.nodeName.lastIndexOf(".");if(c!==void 0&&c!==-1){let h=a.nodeName.substring(c+1);x1.indexOf(h)!==-1&&(a.nodeName=a.nodeName.substring(0,c),a.objectName=h)}if(a.propertyName===null||a.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return a}static findNode(e,n){if(n===void 0||n===""||n==="."||n===-1||n===e.name||n===e.uuid)return e;if(e.skeleton){let a=e.skeleton.getBoneByName(n);if(a!==void 0)return a}if(e.children){let a=function(h){for(let p=0;p<h.length;p++){let d=h[p];if(d.name===n||d.uuid===n)return d;let y=a(d.children);if(y)return y}return null},c=a(e.children);if(c)return c}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,n){e[n]=this.targetObject[this.propertyName]}_getValue_array(e,n){let a=this.resolvedProperty;for(let c=0,h=a.length;c!==h;++c)e[n++]=a[c]}_getValue_arrayElement(e,n){e[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,n){this.resolvedProperty.toArray(e,n)}_setValue_direct(e,n){this.targetObject[this.propertyName]=e[n]}_setValue_direct_setNeedsUpdate(e,n){this.targetObject[this.propertyName]=e[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,n){this.targetObject[this.propertyName]=e[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,n){let a=this.resolvedProperty;for(let c=0,h=a.length;c!==h;++c)a[c]=e[n++]}_setValue_array_setNeedsUpdate(e,n){let a=this.resolvedProperty;for(let c=0,h=a.length;c!==h;++c)a[c]=e[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,n){let a=this.resolvedProperty;for(let c=0,h=a.length;c!==h;++c)a[c]=e[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,n){this.resolvedProperty[this.propertyIndex]=e[n]}_setValue_arrayElement_setNeedsUpdate(e,n){this.resolvedProperty[this.propertyIndex]=e[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,n){this.resolvedProperty[this.propertyIndex]=e[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,n){this.resolvedProperty.fromArray(e,n)}_setValue_fromArray_setNeedsUpdate(e,n){this.resolvedProperty.fromArray(e,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,n){this.resolvedProperty.fromArray(e,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,n){this.bind(),this.getValue(e,n)}_setValue_unbound(e,n){this.bind(),this.setValue(e,n)}bind(){let e=this.node,n=this.parsedPath,a=n.objectName,c=n.propertyName,h=n.propertyIndex;if(e||(e=l.findNode(this.rootNode,n.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(a){let x=n.objectIndex;switch(a){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let _=0;_<e.length;_++)if(e[_].name===x){x=_;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[a]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[a]}if(x!==void 0){if(e[x]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[x]}}let p=e[c];if(p===void 0){let x=n.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+x+"."+c+" but it wasn't found.",e);return}let d=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?d=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(d=this.Versioning.MatrixWorldNeedsUpdate);let y=this.BindingType.Direct;if(h!==void 0){if(c==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[h]!==void 0&&(h=e.morphTargetDictionary[h])}y=this.BindingType.ArrayElement,this.resolvedProperty=p,this.propertyIndex=h}else p.fromArray!==void 0&&p.toArray!==void 0?(y=this.BindingType.HasFromToArray,this.resolvedProperty=p):Array.isArray(p)?(y=this.BindingType.EntireArray,this.resolvedProperty=p):this.propertyName=c;this.getValue=this.GetterByBindingType[y],this.setValue=this.SetterByBindingTypeAndVersioning[y][d]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ot.Composite=Cl;Ot.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ot.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ot.prototype.GetterByBindingType=[Ot.prototype._getValue_direct,Ot.prototype._getValue_array,Ot.prototype._getValue_arrayElement,Ot.prototype._getValue_toArray];Ot.prototype.SetterByBindingTypeAndVersioning=[[Ot.prototype._setValue_direct,Ot.prototype._setValue_direct_setNeedsUpdate,Ot.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ot.prototype._setValue_array,Ot.prototype._setValue_array_setNeedsUpdate,Ot.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ot.prototype._setValue_arrayElement,Ot.prototype._setValue_arrayElement_setNeedsUpdate,Ot.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ot.prototype._setValue_fromArray,Ot.prototype._setValue_fromArray_setNeedsUpdate,Ot.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var b1=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="160");var Zs=class{constructor(e){this.top=0,this.array=new Float32Array(e)}write(e){this.array[this.top++]=e.x,this.array[this.top++]=e.y,this.array[this.top++]=e.z}},Oa=class{constructor(e){this.top=0,this.array=new Float32Array(e)}write(e){this.array[this.top++]=e.x,this.array[this.top++]=e.y}};var xi=class l{constructor(e){this.plane=null,this.front=null,this.back=null,this.polygons=[],e&&this.build(e)}clone(){let e=new l;return e.plane=this.plane&&this.plane.clone(),e.front=this.front&&this.front.clone(),e.back=this.back&&this.back.clone(),e.polygons=this.polygons.map(n=>n.clone()),e}invert(){for(let n=0;n<this.polygons.length;n++)this.polygons[n].flip();this.plane&&this.plane.flip(),this.front&&this.front.invert(),this.back&&this.back.invert();let e=this.front;this.front=this.back,this.back=e}clipPolygons(e){if(!this.plane)return e.slice();let n=new Array,a=new Array;for(let c=0;c<e.length;c++)this.plane.splitPolygon(e[c],n,a,n,a);return this.front&&(n=this.front.clipPolygons(n)),this.back?a=this.back.clipPolygons(a):a=[],n.concat(a)}clipTo(e){this.polygons=e.clipPolygons(this.polygons),this.front&&this.front.clipTo(e),this.back&&this.back.clipTo(e)}allPolygons(){let e=this.polygons.slice();return this.front&&(e=e.concat(this.front.allPolygons())),this.back&&(e=e.concat(this.back.allPolygons())),e}build(e){if(!e.length)return;this.plane||(this.plane=e[0].plane.clone());let n=[],a=[];for(let c=0;c<e.length;c++)this.plane.splitPolygon(e[c],this.polygons,this.polygons,n,a);n.length&&(this.front||(this.front=new l),this.front.build(n)),a.length&&(this.back||(this.back=new l),this.back.build(a))}};var tn=class l{constructor(e=0,n=0,a=0){this.x=e,this.y=n,this.z=a}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}clone(){return new l(this.x,this.y,this.z)}negate(){return this.x*=-1,this.y*=-1,this.z*=-1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}times(e){return this.x*=e,this.y*=e,this.z*=e,this}dividedBy(e){return this.x/=e,this.y/=e,this.z/=e,this}lerp(e,n){return this.add(new l().copy(e).sub(this).times(n))}unit(){return this.dividedBy(this.length())}length(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2))}normalize(){return this.unit()}cross(e){let n=this.clone(),a=n.x,c=n.y,h=n.z,p=e.x,d=e.y,y=e.z;return this.x=c*y-h*d,this.y=h*p-a*y,this.z=a*d-c*p,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}toVector3(){return new ee(this.x,this.y,this.z)}};var vr=class l{constructor(e,n){this.normal=e,this.w=n,this.normal=e,this.w=n}clone(){return new l(this.normal.clone(),this.w)}flip(){this.normal.negate(),this.w=-this.w}splitPolygon(e,n,a,c,h){let _=0,M=[];for(let T=0;T<e.vertices.length;T++){let w=this.normal.dot(e.vertices[T].pos)-this.w,A=w<-l.EPSILON?2:w>l.EPSILON?1:0;_|=A,M.push(A)}switch(_){case 0:(this.normal.dot(e.plane.normal)>0?n:a).push(e);break;case 1:c.push(e);break;case 2:h.push(e);break;case 3:{let T=[],w=[];for(let A=0;A<e.vertices.length;A++){let C=(A+1)%e.vertices.length,E=M[A],b=M[C],k=e.vertices[A],P=e.vertices[C];if(E!=2&&T.push(k),E!=1&&w.push(E!=2?k.clone():k),(E|b)==3){let V=(this.w-this.normal.dot(k.pos))/this.normal.dot(new tn().copy(P.pos).sub(k.pos)),Z=k.interpolate(P,V);T.push(Z),w.push(Z.clone())}}T.length>=3&&c.push(new Gi(T,e.shared)),w.length>=3&&h.push(new Gi(w,e.shared));break}}}static fromPoints(e,n,a){let c=new tn().copy(n).sub(e).cross(new tn().copy(a).sub(e)).normalize();return new l(c.clone(),c.dot(e))}};vr.EPSILON=1e-5;var Gi=class l{constructor(e,n){this.vertices=e,this.shared=n,this.plane=vr.fromPoints(e[0].pos,e[1].pos,e[2].pos)}clone(){return new l(this.vertices.map(e=>e.clone()),this.shared)}flip(){this.vertices.reverse().map(e=>e.flip()),this.plane.flip()}};var Na=class l{constructor(e,n,a,c){this.pos=new tn().copy(e),this.normal=new tn().copy(n),this.uv=new tn().copy(a),this.uv.z=0,c&&(this.color=new tn().copy(c))}clone(){return new l(this.pos,this.normal,this.uv,this.color)}flip(){this.normal.negate()}interpolate(e,n){return new l(this.pos.clone().lerp(e.pos,n),this.normal.clone().lerp(e.normal,n),this.uv.clone().lerp(e.uv,n),this.color&&e.color&&this.color.clone().lerp(e.color,n))}};var Fa=class l{constructor(){this.polygons=[]}static fromPolygons(e){let n=new l;return n.polygons=e,n}static fromGeometry(e,n){let a=[],c=e.attributes.position,h=e.attributes.normal,p=e.attributes.uv,d=e.attributes.color,y=e.groups,x;if(e.index)x=e.index.array;else{x=new Uint16Array(c.array.length/c.itemSize|0);for(let M=0;M<x.length;M++)x[M]=M}let _=x.length/3|0;a=new Array(_);for(let M=0,T=0,w=x.length;M<w;M+=3,T++){let A=new Array(3);for(let C=0;C<3;C++){let E=x[M+C],b=E*3,k=E*2,P=c.array[b],V=c.array[b+1],Z=c.array[b+2],X=h.array[b],W=h.array[b+1],fe=h.array[b+2],D=p?.array[k],N=p?.array[k+1];A[C]=new Na(new tn(P,V,Z),new tn(X,W,fe),new tn(D,N,0),d&&new tn(d.array[b],d.array[b+1],d.array[b+2]))}if(n===void 0&&y&&y.length>0)for(let C of y)M>=C.start&&M<C.start+C.count&&(a[T]=new Gi(A,C.materialIndex));else a[T]=new Gi(A,n)}return l.fromPolygons(a.filter(M=>!Number.isNaN(M.plane.normal.x)))}static toGeometry(e,n){let a=0,c=e.polygons;for(let w of c)a+=w.vertices.length-2;let h=new gi,p=new Zs(a*3*3),d=new Zs(a*3*3),y=new Oa(a*2*3),x,_=[],M=[];for(let w of c){let A=w.vertices,C=A.length;w.shared!==void 0&&(_[w.shared]||(_[w.shared]=[])),C&&A[0].color!==void 0&&(x||(x=new Zs(a*3*3)));for(let E=3;E<=C;E++)(w.shared===void 0?M:_[w.shared]).push(p.top/3,p.top/3+1,p.top/3+2),p.write(A[0].pos),p.write(A[E-2].pos),p.write(A[E-1].pos),d.write(A[0].normal),d.write(A[E-2].normal),d.write(A[E-1].normal),y&&(y.write(A[0].uv),y.write(A[E-2].uv),y.write(A[E-1].uv)),x&&(x.write(A[0].color),x.write(A[E-2].color),x.write(A[E-1].color))}h.setAttribute("position",new $t(p.array,3)),h.setAttribute("normal",new $t(d.array,3)),y&&h.setAttribute("uv",new $t(y.array,2)),x&&h.setAttribute("color",new $t(x.array,3));for(let w=0;w<_.length;w++)_[w]===void 0&&(_[w]=[]);if(_.length){let w=[],A=0;for(let C=0;C<_.length;C++)h.addGroup(A,_[C].length,C),A+=_[C].length,w=w.concat(_[C]);h.addGroup(A,M.length,_.length),w=w.concat(M),h.setIndex(w)}let T=new qt().copy(n).invert();return h.applyMatrix4(T),h.computeBoundingSphere(),h.computeBoundingBox(),h}static fromMesh(e,n){let a=l.fromGeometry(e.geometry,n),c=new ee,h=new ft;h.getNormalMatrix(e.matrix);for(let p=0;p<a.polygons.length;p++){let d=a.polygons[p];for(let y=0;y<d.vertices.length;y++){let x=d.vertices[y];x.pos.copy(c.copy(x.pos.toVector3()).applyMatrix4(e.matrix)),x.normal.copy(c.copy(x.normal.toVector3()).applyMatrix3(h))}}return a}static toMesh(e,n,a){let c=l.toGeometry(e,n),h=new In(c,a);return h.matrix.copy(n),h.matrix.decompose(h.position,h.quaternion,h.scale),h.rotation.setFromQuaternion(h.quaternion),h.updateMatrixWorld(),h.castShadow=h.receiveShadow=!0,h}static union(e,n){let a=l.fromMesh(e),c=l.fromMesh(n);return l.toMesh(a.union(c),e.matrix,e.material)}static subtract(e,n){let a=l.fromMesh(e),c=l.fromMesh(n);return l.toMesh(a.subtract(c),e.matrix,e.material)}static intersect(e,n){let a=l.fromMesh(e),c=l.fromMesh(n);return l.toMesh(a.intersect(c),e.matrix,e.material)}clone(){let e=new l;return e.polygons=this.polygons.map(n=>n.clone()).filter(n=>Number.isFinite(n.plane.w)),e}toPolygons(){return this.polygons}union(e){let n=new xi(this.clone().polygons),a=new xi(e.clone().polygons);return n.clipTo(a),a.clipTo(n),a.invert(),a.clipTo(n),a.invert(),n.build(a.allPolygons()),l.fromPolygons(n.allPolygons())}subtract(e){let n=new xi(this.clone().polygons),a=new xi(e.clone().polygons);return n.invert(),n.clipTo(a),a.clipTo(n),a.invert(),a.clipTo(n),a.invert(),n.build(a.allPolygons()),n.invert(),l.fromPolygons(n.allPolygons())}intersect(e){let n=new xi(this.clone().polygons),a=new xi(e.clone().polygons);return n.invert(),a.clipTo(n),a.invert(),n.clipTo(a),a.clipTo(n),n.build(a.allPolygons()),n.invert(),l.fromPolygons(n.allPolygons())}inverse(){let e=this.clone();for(let n of e.polygons)n.flip();return e}toMesh(e,n){return l.toMesh(this,e,n)}toGeometry(e){return l.toGeometry(this,e)}};var Qh=p0(Kh());return m0(v1);})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2023 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
