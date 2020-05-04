(this["webpackJsonpmonitor-server"]=this["webpackJsonpmonitor-server"]||[]).push([[0],{392:function(e,t,a){e.exports=a(535)},397:function(e,t,a){},427:function(e,t){},534:function(e,t,a){},535:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(15),s=a.n(l),o=(a(397),a(374)),i=a(375),r=a(385),m=a(384),d=a(190),u=a.n(d),b=a(144),p=a(44),E=a(376),f=a.n(E),v=a(383),h=a.n(v),_=(a(534),u()("https://commandingserver.herokuapp.com/command")),O=c.a.memo((function(e){var t=Object(n.useState)(""),a=Object(p.a)(t,2),l=a[0],s=a[1],o=Object(n.useState)(e.globalCommand),i=Object(p.a)(o,2),r=i[0],m=i[1],d=Object(n.useState)(""),u=Object(p.a)(d,2),b=u[0],E=u[1],f=Object(n.useState)(""),v=Object(p.a)(f,2),h=v[0],O=v[1],j=Object(n.useState)(""),S=Object(p.a)(j,2),N=S[0],k=S[1],y=Object(n.useState)(""),g=Object(p.a)(y,2),C=g[0],I=g[1],D=Object(n.useState)(""),w=Object(p.a)(D,2),x=w[0],M=w[1],T=Object(n.useState)(!1),A=Object(p.a)(T,2),P=A[0],J=A[1],B=Object(n.useState)(""),W=Object(p.a)(B,2),q=W[0],F=W[1];Object(n.useEffect)((function(){m(e.globalCommand)}),[e.globalCommand]),e.socket.on("output_from_client_to_web",(function(t){var a=JSON.parse(t);a.session_ID===e.client_Session_ID&&(E(a.stdout),O(a.stderr),k(a.return_code),I(a.return_code_meaning),M(a.execution_timestamp),F(a.latest_command)),J(!0)}));var L={client_ID:e.client_Session_ID,command:r};Object(n.useEffect)((function(){_.emit("command_from_web",L)}),[r]);var U=0===N?"#00d1b2":"lightcoral";return c.a.createElement("div",{className:"tile is-parent"},c.a.createElement("article",{className:"tile is-child notification is-bordered has-text-centered"},c.a.createElement("div",{className:"title"},e.client_ID),c.a.createElement("div",{style:{display:"block"}},0!==q.length?c.a.createElement("div",{className:"is-pulled-right"},"Latest Command Supplied :"," ",c.a.createElement("span",{style:{fontFamily:"monospace"}},q)):null,c.a.createElement("div",{className:"is-pulled-left"},"Session ID : ",e.client_Session_ID)),c.a.createElement("br",null),P?c.a.createElement("div",{style:{backgroundColor:U,display:"block"},className:"output_metadata is-family-monospace"},c.a.createElement("div",{class:"return_code"},N," \u25b6\ufe0f ",C),c.a.createElement("div",null,"EXECUTION TIMESTAMP : ",x)):null,c.a.createElement("br",null),c.a.createElement("form",{onSubmit:function(e){e.preventDefault(),m(l)}},c.a.createElement("div",{className:"field has-addons is-centered"},c.a.createElement("div",{className:"control is-expanded"},c.a.createElement("input",{className:"input is-family-monospace",type:"text",placeholder:"Enter command here",onChange:function(e){s(e.target.value)}})),c.a.createElement("div",{className:"control"},c.a.createElement("button",{type:"submit",className:"button is-primary"},"Command")))),b.length>0?c.a.createElement("div",{className:"is-family-monospace disp output"},b):null,h.length>0?c.a.createElement("div",{className:"is-family-monospace disp error"},h):null))}));function j(e){var t=e.className,a=e.style,n=e.onClick;return c.a.createElement("div",{className:t,style:Object(b.a)({},a,{display:"block",background:"#00d1b2"}),onClick:n})}function S(e){var t=e.className,a=e.style,n=e.onClick;return c.a.createElement("div",{className:t,style:Object(b.a)({},a,{display:"block",background:"#00d1b2"}),onClick:n})}var N={dots:!0,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,arrows:!0,accessibility:!0,swipeToSlide:!0,centerMode:!0,centerPadding:"0px",nextArrow:c.a.createElement(j,null),prevArrow:c.a.createElement(S,null)},k=c.a.memo((function(e){var t;return t=c.a.createElement(h.a,N,e.selected_clients.map((function(t){return c.a.createElement(O,{key:t.client_Session_ID,client_ID:t.client_ID,client_Session_ID:t.client_Session_ID,socket:e.socket,globalCommand:e.globalCommand})}))),c.a.createElement("div",{className:""},t)})),y=c.a.memo((function(e){var t=Object(n.useState)([]),a=Object(p.a)(t,2),l=a[0],s=a[1],o=Object(n.useState)(""),i=Object(p.a)(o,2),r=i[0],m=i[1],d=Object(n.useState)(),u=Object(p.a)(d,2),E=u[0],v=u[1],h=Object(n.useState)(!1),_=Object(p.a)(h,2),O=_[0],j=_[1],S=[];e.clients.map((function(e){S.push(Object(b.a)({},e))}));return c.a.createElement("div",null,c.a.createElement(k,{selected_clients:l,socket:e.socket,globalCommand:E}),O?c.a.createElement("div",null,c.a.createElement("form",{onSubmit:function(e){e.preventDefault(),v(r)}},c.a.createElement("div",{className:"field has-addons is-centered"},c.a.createElement("div",{className:"control is-expanded"},c.a.createElement("input",{className:"input is-family-monospace",type:"text",placeholder:"Command to all selected clients",onChange:function(e){m(e.target.value)}})),c.a.createElement("div",{className:"control"},c.a.createElement("button",{type:"submit",className:"button is-primary"},"Command Selected Clients")))),c.a.createElement("br",null)," "):null,c.a.createElement(f.a,{title:"Connected Clients",columns:[{title:"Name",field:"client_ID"},{title:"Session ID",field:"client_Session_ID"},{title:"Connection Time",field:"connection_timestamp"},{title:"IP Address",field:"client_IP"}],data:S,options:{selection:!0},actions:[{tooltip:"Command all selected clients",icon:"code",onClick:function(e,t){s(t),t.length>1&&j(!0)}}]}))})),g=function(){return c.a.createElement("section",{className:"hero is-primary"},c.a.createElement("div",{className:"hero-body"},c.a.createElement("div",{className:"container"},c.a.createElement("h1",{className:"title"},"Monitor Server"),c.a.createElement("h2",{className:"subtitle"},"Monitors the connected clients with commands."))))},C=function(e){Object(r.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={socket:u()("https://commandingserver.herokuapp.com"),response:[]},n.state.socket.emit("populate_me","Some Message is required here."),n.state.socket.on("update_connections_list",(function(e){n.setState({response:e})})),n}return Object(i.a)(a,[{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement(g,null),c.a.createElement("div",{className:"container"},c.a.createElement("br",null),c.a.createElement(y,{clients:this.state.response,socket:this.state.socket})))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[392,1,2]]]);
//# sourceMappingURL=main.e9435c31.chunk.js.map