(this["webpackJsonpworkday-schedule-exporter"]=this["webpackJsonpworkday-schedule-exporter"]||[]).push([[0],[,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),s=n(8),o=n.n(s),c=(n(13),n(3)),i=n(4),l=n(2),u=n(6),h=n(5),p=(n(14),n(0)),d=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var r;return Object(c.a)(this,n),(r=t.call(this,e)).state={counter:0},r.onDragEnter=r.onDragEnter.bind(Object(l.a)(r)),r.onDragLeave=r.onDragLeave.bind(Object(l.a)(r)),r.onDrop=r.onDrop.bind(Object(l.a)(r)),r}return Object(i.a)(n,[{key:"suppress",value:function(e){e.stopPropagation(),e.preventDefault()}},{key:"onDragEnter",value:function(e){this.suppress(e),this.setState({counter:this.state.counter+1})}},{key:"onDragLeave",value:function(e){this.suppress(e),this.setState({counter:this.state.counter-1})}},{key:"onDrop",value:function(e){this.suppress(e);var t=e.dataTransfer.files;t&&t[0]&&(this.setState({counter:0}),this.props.handleFile(t[0]))}},{key:"render",value:function(){return Object(p.jsx)("div",{onDrop:this.onDrop,onDragEnter:this.onDragEnter,onDragLeave:this.onDragLeave,onDragOver:this.suppress,className:"FileInputDragDrop"+(0===this.state.counter?"":" active"),children:this.props.children})}}]),n}(a.a.Component),j=["xlsx","xlsb","xlsm","xls","xml","csv","txt","ods","fods","uos","sylk","dif","dbf","prn","qpw","123","wb*","wq*","html","htm"].map((function(e){return"."+e})).join(","),b=(n(16),function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var r;return Object(c.a)(this,n),(r=t.call(this,e)).handleChange=r.handleChange.bind(Object(l.a)(r)),r}return Object(i.a)(n,[{key:"handleChange",value:function(e){var t=e.target.files;t&&t[0]&&this.props.handleFile(t[0])}},{key:"render",value:function(){return Object(p.jsxs)("form",{className:"FileInputButton",children:[Object(p.jsx)("label",{htmlFor:"file",children:"Select File"}),Object(p.jsx)("input",{type:"file",id:"file",accept:j,onChange:this.handleChange})]})}}]),n}(a.a.Component));n(17);var f=function(){return Object(p.jsxs)("div",{className:"App",children:[Object(p.jsx)(d,{handleFile:function(e){console.log(e)},children:Object(p.jsx)("p",{children:"Drop to Upload"})}),Object(p.jsxs)("header",{className:"App-header",children:[Object(p.jsx)("h1",{children:"Workday Schedule Exporter"}),Object(p.jsx)("p",{children:"Upload an .XLSX or .CSV spreadsheet and convert it to an .ICS"})]}),Object(p.jsx)(b,{handleFile:function(e){console.log(e)}})]})};o.a.render(Object(p.jsx)(a.a.StrictMode,{children:Object(p.jsx)(f,{})}),document.getElementById("root"))}],[[18,1,2]]]);
//# sourceMappingURL=main.f13d9772.chunk.js.map