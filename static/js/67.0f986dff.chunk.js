"use strict";(self.webpackChunkgoit_react_hw_05_movies=self.webpackChunkgoit_react_hw_05_movies||[]).push([[67],{67:function(e,t,n){n.r(t),n.d(t,{default:function(){return w}});var r=n(439),a=n(791),s=n(689),i=n(87),c=n(809),o=n(861),u=n(757),l=n.n(u),h=n(243),d="80b919ebaba440b66b502ccefd484b0d",m="https://api.themoviedb.org/3/";function f(){return(f=(0,o.Z)(l().mark((function e(){var t;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.Z.get("".concat(m,"trending/movie/day?api_key=").concat(d,"&language=en-US"));case 3:return t=e.sent,e.abrupt("return",t);case 7:throw e.prev=7,e.t0=e.catch(0),console.log(e.t0.message),new Error(e.t0.message);case 11:case 12:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}var g=function(){return f.apply(this,arguments)},p="Home_homeTitle__duF7K",_="Home_homeMovieList__1QmHK",v="Home_homeMovieLink__0fTAt",b=n(184),w=function(){var e=(0,a.useState)([]),t=(0,r.Z)(e,2),n=t[0],o=t[1],u=(0,a.useState)("idle"),l=(0,r.Z)(u,2),h=l[0],d=l[1],m=(0,a.useState)(null),f=(0,r.Z)(m,2),w=f[0],x=f[1],j=(0,s.TH)();return(0,a.useEffect)((function(){0===n.length&&d("pending"),g().then((function(e){o(e.data.results),d("idle")})).catch((function(e){x(e)}))}),[n.length]),(0,b.jsxs)(b.Fragment,{children:["pending"===h&&(0,b.jsx)(c.a,{}),w&&(0,b.jsx)("div",{children:"Something wents wrong. Try again."}),(0,b.jsx)("h1",{className:p,children:"Trending today"}),(0,b.jsx)("ol",{className:_,children:n.map((function(e){var t=e.id,n=e.title;return(0,b.jsx)("li",{children:(0,b.jsx)(i.rU,{to:"movies/".concat(t),state:{from:j},className:v,children:n})},t)}))})]})}}}]);
//# sourceMappingURL=67.0f986dff.chunk.js.map