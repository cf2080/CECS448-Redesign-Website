!function(n,e,t){var s="capture_base_site_id",c=function(e){return"string"==typeof e},a=function(){return function(e){for(var o={strictMode:!1,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@?]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}},t=o.parser[o.strictMode?"strict":"loose"].exec(e),n={},r=14;r--;)n[o.key[r]]=t[r]||"";n[o.q.name]={},n[o.key[12]].replace(o.q.parser,function(e,t,r){t&&(t=decodeURIComponent(t),n[o.q.name][t]&&n[o.q.name][t].constructor===Array?n[o.q.name][t].push(decodeURIComponent(r)):n[o.q.name][t]?n[o.q.name][t]=[n[o.q.name][t],decodeURIComponent(r)]:n[o.q.name][t]=decodeURIComponent(r))});var s=n.host.split(".");return n.rootDomain=2<=s.length?s[s.length-2]+"."+s[s.length-1]:"",n.href=e,n}(n.location.href)},r=e.createElement("script");if(n.rl_widget_cfg||n.test_mode)r.src="https://cdn.rlets.com/capture_static/mms/capture.js";else{var o=function(){var e,t,r,o=((e=a().queryKey.rl_siteid||n.rl_siteid||(n.rl_widget_cfg||{}).id)&&localStorage.setItem(s,e),localStorage.getItem(s));if(o&&c(o)&&32===(o=(t=o,c(t)?!1!==r&&t.trim?t.trim():t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""):t).replace(/-/g,"")).length)return"/"+o.substr(0,3)+"/"+o.substr(3,3)+"/"+o.substr(6,3)+"/"+o.substr(9)+".js"}();o&&(r.src="https://cdn.rlets.com/capture_configs"+o)}e.head.appendChild(r)}(window,document);