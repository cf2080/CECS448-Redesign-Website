﻿var dnnJscriptVersion="6.0.0";if(typeof(Sys.Browser.Chrome)=="undefined"){Sys.Browser.Chrome={};if(navigator.userAgent.indexOf("https://hbhonda.com/Chrome/")>-1){Sys.Browser.agent=Sys.Browser.Chrome;Sys.Browser.version=parseFloat(navigator.userAgent.match(/Chrome\/(\d+\.\d+)/)[1]);Sys.Browser.name="Chrome";Sys.Browser.hasDebuggerStatement=true}}else{if(Sys.Browser.agent===Sys.Browser.InternetExplorer&&Sys.Browser.version>10){HTMLAnchorElement.prototype.attachEvent=function(a,b){if(a.substr(0,2)=="on"){a=a.substr(2)}this.addEventListener(a,b,false)};HTMLAnchorElement.prototype.detachEvent=function(a,b){if(a.substr(0,2)=="on"){a=a.substr(2)}this.removeEventListener(a,b,false)}}}if($&&$.ui&&$.ui.dialog){$.extend($.ui.dialog.prototype.options,{open:function(){var e=$(document).find("html");e.css("overflow","hidden");var f=e.find("body").scrollTop();if(f>0){e.scrollTop(0);var d=$(this);d.data("cacheScrollTop",f)}var a=$(this).closest(".ui-dialog");if(!$("html").hasClass("mobileView")){var c=$(window).height();var b=a.outerHeight();if(c-20>=b){a.css({position:"fixed",left:"50%",top:"50%",marginLeft:"-"+(a.outerWidth()/2)+"px",marginTop:"-"+(a.outerHeight()/2)+"px",maxHeight:"inherit",overflow:"initial"})}else{a.css({position:"fixed",left:"50%",top:"0",marginLeft:"-"+(a.outerWidth()/2)+"px",marginTop:"0",maxHeight:(c-20)+"px",overflow:"auto"})}}a.find(".ui-dialog-titlebar-close").attr("aria-label","Close")},beforeClose:function(){var b=$(document).find("html");b.css("overflow","");var c=$(this).data("cacheScrollTop");if(c){b.find("body").scrollTop(c);$(this).data("cacheScrollTop",null)}var a=$(this).closest(".ui-dialog");a.css({overflow:"initial"})}})}var DNN_HIGHLIGHT_COLOR="#9999FF";var COL_DELIMITER=String.fromCharCode(18);var ROW_DELIMITER=String.fromCharCode(17);var QUOTE_REPLACEMENT=String.fromCharCode(19);var KEY_LEFT_ARROW=37;var KEY_UP_ARROW=38;var KEY_RIGHT_ARROW=39;var KEY_DOWN_ARROW=40;var KEY_RETURN=13;var KEY_ESCAPE=27;Type.registerNamespace("dnn");dnn.extend=function(a,b){for(s in b){a[s]=b[s]}return a};dnn.extend(dnn,{apiversion:new Number("04.02"),pns:"",ns:"dnn",diagnostics:null,vars:null,dependencies:new Array(),isLoaded:false,delay:[],_delayedSet:null,getVars:function(){if(this.vars==null){var a=dnn.dom.getById("__dnnVariable");if(a!=null){if(a.value.indexOf("`")==0){a.value=a.value.substring(1).replace(/`/g,'"')}if(a.value.indexOf("__scdoff")!=-1){COL_DELIMITER="~|~";ROW_DELIMITER="~`~";QUOTE_REPLACEMENT="~!~"}}if(a!=null&&a.value.length>0){this.vars=Sys.Serialization.JavaScriptSerializer.deserialize(a.value)}else{this.vars=[]}}return this.vars},getVar:function(key,def){if(this.getVars()[key]!=null){var re=eval("/"+QUOTE_REPLACEMENT+"/g");return this.getVars()[key].replace(re,'"')}return def},setVar:function(b,c){if(this.vars==null){this.getVars()}this.vars[b]=c;var a=dnn.dom.getById("__dnnVariable");if(a==null){a=dnn.dom.createElement("INPUT");a.type="hidden";a.id="__dnnVariable";dnn.dom.appendChild(dnn.dom.getByTagName("body")[0],a)}if(dnn.isLoaded){a.value=Sys.Serialization.JavaScriptSerializer.serialize(this.vars)}else{dnn._delayedSet={key:b,val:c}}return true},callPostBack:function(action){var postBack=dnn.getVar("__dnn_postBack");var data="";if(postBack.length>0){data+=action;for(var i=1;i<arguments.length;i++){var aryParam=arguments[i].split("=");data+=COL_DELIMITER+aryParam[0]+COL_DELIMITER+aryParam[1]}eval(postBack.replace("[DATA]",data));return true}return false},createDelegate:function(a,b){return Function.createDelegate(a,b)},doDelay:function(b,c,d,a){if(this.delay[b]==null){this.delay[b]=new dnn.delayObject(d,a,b);this.delay[b].num=window.setTimeout(dnn.createDelegate(this.delay[b],this.delay[b].complete),c)}},cancelDelay:function(a){if(this.delay[a]!=null){window.clearTimeout(this.delay[a].num);this.delay[a]=null}},decodeHTML:function(a){return a.toString().replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"')},encode:function(a,c){var b=a;if(encodeURIComponent){b=encodeURIComponent(b)}else{b=escape(b)}if(c==false){return b}return b.replace(/%/g,"%25")},encodeHTML:function(a){return a.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/\"/g,"&quot;")},encodeJSON:function(a){return a.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"\u0027").replace(/\"/g,"&quot;").replace(/\\/g,"\\\\")},evalJSON:function(a){return Sys.Serialization.JavaScriptSerializer.deserialize(a)},escapeForEval:function(a){return a.replace(/\\/g,"\\\\").replace(/\'/g,"\\'").replace(/\r/g,"").replace(/\n/g,"\\n").replace(/\./,"\\.")},getEnumByValue:function(a,b){for(var c in a){if(typeof(a[c])=="number"&&a[c]==b){return c}}},_onload:function(){dnn.isLoaded=true;if(dnn._delayedSet){dnn.setVar(dnn._delayedSet.key,dnn._delayedSet.val)}},addIframeMask:function(c){if(dnn.dom.browser.isType("ie")&&(c.previousSibling==null||c.previousSibling.nodeName.toLowerCase()!="iframe")){var a=document.createElement("iframe");c.parentNode.insertBefore(a,c);var b=c.getBoundingClientRect();a.style.position="absolute";a.style.left=c.offsetLeft+"px";a.style.top=c.offsetTop+"px";a.style.width=(b.right-b.left)+"px";a.style.height=(b.bottom-b.top)+"px";a.style.opacity="0";a.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity=0)";a.style.zIndex="-1";return a}return null},removeIframeMask:function(a){if(dnn.dom.browser.isType("ie")&&(a.previousSibling!=null&&a.previousSibling.nodeName.toLowerCase()=="iframe")){a.parentNode.removeChild(a.previousSibling)}}});dnn.delayObject=function(c,a,b){this.num=null;this.pfunc=c;this.context=a;this.type=b};dnn.delayObject.prototype={complete:function(){dnn.delay[this.type]=null;this.pfunc(this.context)}};dnn.delayObject.registerClass("dnn.delayObject");dnn.ScriptRequest=function(e,d,c){this.ctl=null;this.xmlhttp=null;this.src=null;this.text=null;if(e!=null&&e.length>0){var b=dnn.dom.scriptFile(e);var a=dnn.getVar(b+".resx","");if(a.length>0){this.src=a}else{this.src=e}}if(d!=null&&d.length>0){this.text=d}this.callBack=c;this.status="init";this.timeOut=5000;this._xmlhttpStatusChangeDelegate=dnn.createDelegate(this,this.xmlhttpStatusChange);this._statusChangeDelegate=dnn.createDelegate(this,this.statusChange);this._completeDelegate=dnn.createDelegate(this,this.complete);this._reloadDelegate=dnn.createDelegate(this,this.reload)};dnn.ScriptRequest.prototype={load:function(){this.status="loading";this.ctl=document.createElement("script");this.ctl.type="text/javascript";if(this.src!=null){if(dnn.dom.browser.isType(dnn.dom.browser.Safari)){this.xmlhttp=new XMLHttpRequest();this.xmlhttp.open("GET",this.src,true);this.xmlhttp.onreadystatechange=this._xmlhttpStatusChangeDelegate;this.xmlhttp.send(null);return}else{if(dnn.dom.browser.isType(dnn.dom.browser.InternetExplorer)){this.ctl.onreadystatechange=this._statusChangeDelegate}else{if(dnn.dom.browser.isType(dnn.dom.browser.Opera)==false){this.ctl.onload=this._completeDelegate}}this.ctl.src=this.src}dnn.dom.scriptElements[this.src]=this.ctl}else{if(dnn.dom.browser.isType(dnn.dom.browser.Safari)){this.ctl.innerHTML=dnn.encodeHTML(this.text)}else{this.ctl.text=this.text}}var a=dnn.dom.getByTagName("HEAD");if(a){if(dnn.dom.browser.isType(dnn.dom.browser.Opera)==false||this.src!=null){a[0].appendChild(this.ctl)}}else{alert("Cannot load dynamic script, no HEAD tag present.")}if(this.src==null||dnn.dom.browser.isType(dnn.dom.browser.Opera)){this.complete()}else{if(this.timeOut){dnn.doDelay("loadScript_"+this.src,this.timeOut,this._reloadDelegate,null)}}},xmlhttpStatusChange:function(){if(this.xmlhttp.readyState!=4){return}this.src=null;this.text=this.xmlhttp.responseText;this.load()},statusChange:function(){if((this.ctl.readyState=="loaded"||this.ctl.readyState=="complete")&&this.status!="complete"){this.complete()}},reload:function(){if(dnn.dom.scriptStatus(this.src)=="complete"){this.complete()}else{this.load()}},complete:function(){dnn.cancelDelay("loadScript_"+this.src);this.status="complete";if(typeof(this.callBack)!="undefined"){this.callBack(this)}this.dispose()},dispose:function(){this.callBack=null;if(this.ctl){if(this.ctl.onreadystatechange){this.ctl.onreadystatechange=new function(){}}else{if(this.ctl.onload){this.ctl.onload=null}}this.ctl=null}this.xmlhttp=null;this._xmlhttpStatusChangeDelegate=null;this._statusChangeDelegate=null;this._completeDelegate=null;this._reloadDelegate=null}};dnn.ScriptRequest.registerClass("dnn.ScriptRequest");Type.registerNamespace("dnn.dom");dnn.extend(dnn.dom,{pns:"dnn",ns:"dom",browser:null,__leakEvts:[],scripts:[],scriptElements:[],tweens:[],attachEvent:function(a,c,d){if(a.addEventListener){var b=c.substring(2);a.addEventListener(b,function(e){dnn.dom.event=new dnn.dom.eventObject(e,e.target);return d()},false)}else{a.attachEvent(c,function(){dnn.dom.event=new dnn.dom.eventObject(window.event,window.event.srcElement);return d()})}return true},cursorPos:function(b){if(b.value.length==0){return 0}var h=-1;if(b.selectionStart){h=b.selectionStart}else{if(b.createTextRange){var f=window.document.selection.createRange();var a=b.createTextRange();if(a==null||f==null||((f.text!="")&&a.inRange(f)==false)){return -1}if(f.text==""){if(a.boundingLeft==f.boundingLeft){h=0}else{var d=b.tagName.toLowerCase();if(d=="input"){var g=a.text;var c=1;while(c<g.length){a.findText(g.substring(c));if(a.boundingLeft==f.boundingLeft){break}c++}}else{if(d=="textarea"){var c=b.value.length+1;var e=document.selection.createRange().duplicate();while(e.parentElement()==b&&e.move("character",1)==1){--c}if(c==b.value.length+1){c=-1}}}h=c}}else{h=a.text.indexOf(f.text)}}}return h},cancelCollapseElement:function(a){dnn.cancelDelay(a.id+"col");a.style.display="none"},collapseElement:function(b,c,d){if(c==null){c=10}b.style.overflow="hidden";var a=new Object();a.num=c;a.ctl=b;a.pfunc=d;b.origHeight=b.offsetHeight;dnn.dom.__collapseElement(a)},__collapseElement:function(a){var c=a.num;var b=a.ctl;var d=b.origHeight/c;if(b.offsetHeight-(d*2)>0){b.style.height=(b.offsetHeight-d).toString()+"px";dnn.doDelay(b.id+"col",10,dnn.dom.__collapseElement,a)}else{b.style.display="none";if(a.pfunc!=null){a.pfunc()}}},cancelExpandElement:function(a){dnn.cancelDelay(a.id+"exp");a.style.overflow="";a.style.height=""},disableTextSelect:function(a){if(typeof a.onselectstart!="undefined"){a.onselectstart=function(){return false}}else{if(typeof a.style.MozUserSelect!="undefined"){a.style.MozUserSelect="none"}else{a.onmousedown=function(){return false}}}},expandElement:function(b,c,d){if(c==null){c=10}if(b.style.display=="none"&&b.origHeight==null){b.style.display="";b.style.overflow="";b.origHeight=b.offsetHeight;b.style.overflow="hidden";b.style.height="1px"}b.style.display="";var a=new Object();a.num=c;a.ctl=b;a.pfunc=d;dnn.dom.__expandElement(a)},__expandElement:function(a){var c=a.num;var b=a.ctl;var d=b.origHeight/c;if(b.offsetHeight+d<b.origHeight){b.style.height=(b.offsetHeight+d).toString()+"px";dnn.doDelay(b.id+"exp",10,dnn.dom.__expandElement,a)}else{b.style.overflow="";b.style.height="";if(a.pfunc!=null){a.pfunc()}}},deleteCookie:function(a,c,b){if(this.getCookie(a)){this.setCookie(a,"",-1,c,b);return true}return false},getAttr:function(b,a,c){if(b.getAttribute==null){return c}var d=b.getAttribute(a);if(d==null||d==""){return c}else{return d}},getById:function(b,a){return $get(b,a)},getByTagName:function(a,b){if(b==null){b=document}if(b.getElementsByTagName){return b.getElementsByTagName(a)}else{if(b.all&&b.all.tags){return b.all.tags(a)}else{return null}}},getParentByTagName:function(b,a){var c=b.parentNode;a=a.toLowerCase();while(c!=null){if(c.tagName&&c.tagName.toLowerCase()==a){return c}c=c.parentNode}return null},getCookie:function(c){var e=" "+document.cookie;var d=" "+c+"=";var b=null;var f=0;var a=0;if(e.length>0){f=e.indexOf(d);if(f!=-1){f+=d.length;a=e.indexOf(";",f);if(a==-1){a=e.length}b=unescape(e.substring(f,a))}}return(b)},getNonTextNode:function(a){if(this.isNonTextNode(a)){return a}while(a!=null&&this.isNonTextNode(a)){a=this.getSibling(a,1)}return a},addSafeHandler:function(b,a,c,d){b[a]=this.getObjMethRef(c,d);if(dnn.dom.browser.isType(dnn.dom.browser.InternetExplorer)){if(this.__leakEvts.length==0){dnn.dom.attachEvent(window,"onunload",dnn.dom.destroyHandlers)}this.__leakEvts[this.__leakEvts.length]=new dnn.dom.leakEvt(a,b,b[a])}},destroyHandlers:function(){var c=dnn.dom.__leakEvts.length-1;for(var a=c;a>=0;a--){var b=dnn.dom.__leakEvts[a];b.ctl.detachEvent(b.name,b.ptr);b.ctl[b.name]=null;dnn.dom.__leakEvts.length=dnn.dom.__leakEvts.length-1}},getObjMethRef:function(b,a){return(function(c){c=c||window.event;return b[a](c,this)})},getSibling:function(a,c){if(a!=null&&a.parentNode!=null){for(var b=0;b<a.parentNode.childNodes.length;b++){if(a.parentNode.childNodes[b].id==a.id){if(a.parentNode.childNodes[b+c]!=null){return a.parentNode.childNodes[b+c]}}}}return null},isNonTextNode:function(a){return(a.nodeType!=3&&a.nodeType!=8)},getScript:function(c){if(this.scriptElements[c]){return this.scriptElements[c]}var a=dnn.dom.getByTagName("SCRIPT");for(var b=0;b<a.length;b++){if(a[b].src!=null&&a[b].src.indexOf(c)>-1){this.scriptElements[c]=a[b];return a[b]}}},getScriptSrc:function(b){var a=dnn.getVar(b+".resx","");if(a.length>0){return a}return b},getScriptPath:function(){var a=dnn.dom.getScript("dnn.js");if(a){var b=a.src;if(b.indexOf("?")>-1){b=b.substr(0,b.indexOf("?"))}return b.replace("dnn.js","")}var c=dnn.getVar("__sp");if(c){return c}return location.protocol + "//" + location.host + "/js/";},scriptFile:function(b){var a=b.split("/");return a[a.length-1]},loadScript:function(e,d,b){var c;if(e!=null&&e.length>0){c=this.scriptFile(e);if(this.scripts[c]!=null){return}}var a=new dnn.ScriptRequest(e,d,b);if(c){this.scripts[c]=a}a.load();return a},loadScripts:function(a,b,c){if(dnn.scripts==null){var e=function(f,g,h){return(function(){dnn.dom.loadScripts(f,g,h)})};dnn.dom.loadScript(dnn.dom.getScriptPath()+"dnn.scripts.js",null,e(a,b,c));return}var d=new dnn.scripts.ScriptBatchRequest(a,b,c);d.load()},scriptStatus:function(c){var b=this.scriptFile(c);if(this.scripts[b]){return this.scripts[b].status}var a=this.getScript(c);if(a!=null){return"complete"}else{return""}},setScriptLoaded:function(b){var a=this.scriptFile(b);if(this.scripts[a]&&dnn.dom.scripts[a].status!="complete"){dnn.dom.scripts[a].complete()}},navigate:function(b,a){if(a!=null&&a.length>0){if(a=="_blank"||a=="_new"){window.open(b)}else{document.frames[a].location.href=b}}else{if(Sys.Browser.agent===Sys.Browser.InternetExplorer){window.navigate(b)}else{window.location.href=b}}return false},setCookie:function(b,f,h,e,d,c,a){var g;if(h){g=new Date();g.setTime(g.getTime()+(h*24*60*60*1000))}if(a){g=new Date();g.setTime(g.getTime()+(a))}document.cookie=b+"="+escape(f)+((g)?"; expires="+g.toGMTString():"")+((e)?"; path="+e:"")+((d)?"; domain="+d:"")+((c)?"; secure":"");if(document.cookie.length>0){return true}},getCurrentStyle:function(b,c){var a=Sys.UI.DomElement._getCurrentStyle(b);if(a){return a[c]}return""},getFormPostString:function(a){var c="";if(a!=null){if(a.tagName&&a.tagName.toLowerCase()=="form"){for(var b=0;b<a.elements.length;b++){c+=this.getElementPostString(a.elements[b])}}else{c=this.getElementPostString(a);for(var b=0;b<a.childNodes.length;b++){c+=this.getFormPostString(a.childNodes[b])}}}return c},getElementPostString:function(a){var c;if(a.tagName){c=a.tagName.toLowerCase()}if(c=="input"){var d=a.type.toLowerCase();if(d=="text"||d=="password"||d=="hidden"||((d=="checkbox"||d=="radio")&&a.checked)){return a.name+"="+dnn.encode(a.value,false)+"&"}}else{if(c=="select"){for(var b=0;b<a.options.length;b++){if(a.options[b].selected){return a.name+"="+dnn.encode(a.options[b].value,false)+"&"}}}else{if(c=="textarea"){return a.name+"="+dnn.encode(a.value,false)+"&"}}}return""},appendChild:function(b,a){return b.appendChild(a)},removeChild:function(a){return a.parentNode.removeChild(a)},createElement:function(a){return document.createElement(a.toLowerCase())}});dnn.dom.leakEvt=function(c,a,b){this.name=c;this.ctl=a;this.ptr=b};dnn.dom.leakEvt.registerClass("dnn.dom.leakEvt");dnn.dom.eventObject=function(b,a){this.object=b;this.srcElement=a};dnn.dom.eventObject.registerClass("dnn.dom.eventObject");dnn.dom.browserObject=function(){this.InternetExplorer="ie";this.Netscape="ns";this.Mozilla="mo";this.Opera="op";this.Safari="safari";this.Konqueror="kq";this.MacIE="macie";var b;var d=navigator.userAgent.toLowerCase();if(d.indexOf("konqueror")!=-1){b=this.Konqueror}else{if(d.indexOf("msie")!=-1&&d.indexOf("mac")!=-1){b=this.MacIE}else{if(Sys.Browser.agent===Sys.Browser.InternetExplorer){b=this.InternetExplorer}else{if(Sys.Browser.agent===Sys.Browser.FireFox){b=this.Mozilla}else{if(Sys.Browser.agent===Sys.Browser.Safari){b=this.Safari}else{if(Sys.Browser.agent===Sys.Browser.Opera){b=this.Opera}else{b=this.Mozilla}}}}}}this.type=b;this.version=Sys.Browser.version;var c=navigator.userAgent.toLowerCase();if(this.type==this.InternetExplorer){var a=navigator.appVersion.split("MSIE");this.version=parseFloat(a[1])}if(this.type==this.Netscape){var a=c.split("netscape");this.version=parseFloat(a[1].split("/")[1])}};dnn.dom.browserObject.prototype={toString:function(){return this.type+" "+this.version},isType:function(){for(var a=0;a<arguments.length;a++){if(dnn.dom.browser.type==arguments[a]){return true}}return false}};dnn.dom.browserObject.registerClass("dnn.dom.browserObject");dnn.dom.browser=new dnn.dom.browserObject();if(typeof($)=="undefined"){eval("function $() {var ary = new Array(); for (var i=0; i<arguments.length; i++) {var arg = arguments[i]; var ctl; if (typeof arg == 'string') ctl = dnn.dom.getById(arg); else ctl = arg; if (ctl != null && typeof(Element) != 'undefined' && typeof(Element.extend) != 'undefined') Element.extend(ctl); if (arguments.length == 1) return ctl; ary[ary.length] = ctl;} return ary;}")}try{document.execCommand("BackgroundImageCache",false,true)}catch(err){}Sys.Application.add_load(dnn._onload);
;;;!function(o,e){function i(o){for(var e=i.options,t=e.parser[e.strictMode?"strict":"loose"].exec(o),n={},a=14;a--;)n[e.key[a]]=t[a]||"";return n[e.q.name]={},n[e.key[12]].replace(e.q.parser,function(o,i,t){i&&(n[e.q.name][i]=t)}),n}i.options={strictMode:!1,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};var t=function(){var e=!1;return function(o){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(o)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(o.substr(0,4)))&&(e=!0)}(navigator.userAgent||navigator.vendor||o.opera),e}();o.dnnModal={load:function(){try{if(void 0!==parent.location.href){var o=parent;if(void 0!==o.parent.$find)if(-1==location.href.indexOf("popUp")||o.location.href.indexOf("popUp")>-1){var e=o.jQuery("#iPopUp"),i=e.dialog("option","refresh"),t=e.dialog("option","closingUrl"),n=e.dialog("option","minWidth"),a=e.dialog("option","minHeight"),r=e.dialog("option","showReturn");t||(t=location.href),!0===e.dialog("isOpen")&&e.dialog("option",{close:function(o,e){dnnModal.refreshPopup({url:t,width:n,height:a,showReturn:r,refresh:i})}}).dialog("close")}else o.jQuery("#iPopUp").dialog({autoOpen:!1,title:document.title})}return!1}catch(o){return!0}},show:function(n,a,r,l,d,s){var p=e("#iPopUp");p.length&&(p[0].src="about:blank",p.remove()),p=e('<iframe id="iPopUp" name="iPopUp" src="about:blank" scrolling="auto" frameborder="0"></iframe>'),e(document.body).append(p),e(document).find("html").css("overflow","hidden");for(var c=document.styleSheets,h=!1,m=0,g=c.length;m<g;m++){var u=c[m].href;if("string"==typeof u&&u.indexOf("admin.css")>-1){h=!0;break}}var f=!h&&(e(o).width()<481||t);f?e("html").addClass("mobileView"):e("html").removeClass("mobileView");var w=0,b=function(){p.prev(".dnnLoading").remove()},v=function(){p.on("load",function(){b();var e=document.getElementById("iPopUp"),t=o.location.hostname.toLowerCase(),a=o.location.port.toLowerCase(),r=i(n),l=r.host.toLowerCase(),d=r.port.toLowerCase();if(l=l||t,d=d||a,t===l&&a===d)try{if(f){var s=e.contentDocument.body,c=e.contentDocument.documentElement;c.style.width=w+"px",s.className+="mobileView dnnFormPopup dnnFormPopupMobileView";var h=Math.max(s.scrollHeight,s.offsetHeight,c.clientHeight,c.scrollHeight,c.offsetHeight);p.css("height",h+100).dialog("option","position",{my:"top",at:"top"})}e.contentWindow.dnnModal.show=function(o,e,i,t,n,a){var r=parent.jQuery("#iPopUp");a||(a=location.href),r.dialog("isOpen")&&r.dialog("option",{close:function(){parent.dnnModal.show(o,e,i,t,n,a)}}).dialog("close")}}catch(o){}}),p[0].src=n,"function"==typeof e.ui.dialog.prototype.options.open&&e.ui.dialog.prototype.options.open.apply(this,arguments)};if(f){w=e(o).width()-100;var y=e("body").css("height");p.dialog({modal:!0,autoOpen:!0,dialogClass:"dnnFormPopup dnnFormPopupMobileView",resizable:!1,closeOnEscape:!0,refresh:d,showReturn:a,closingUrl:s,minHeight:r,position:{my:"top",at:"top"},draggable:!1,open:function(){e("#Form").hide(),e("body").css("height","auto"),p.parent().css({width:"auto",left:"0",right:"0",top:"0","box-shadow":"none"}),o.scrollTo(0,0),v()},close:function(){e("#Form").show(),y&&e("body").css("height",y),o.scrollTo(0,0),o.dnnModal.closePopUp(d,s)}})}else if(p.dialog({modal:!0,autoOpen:!0,dialogClass:"dnnFormPopup",position:{my:"center",at:"center"},minWidth:l,minHeight:r,maxWidth:1920,maxHeight:1080,resizable:!0,closeOnEscape:!0,refresh:d,showReturn:a,closingUrl:s,open:v,close:function(){o.dnnModal.closePopUp(d,s)}}).width(l-11).height(r-11),0===p.parent().find(".ui-dialog-title").next("a.dnnModalCtrl").length){var k=e('<a class="dnnModalCtrl"></a>');p.parent().find(".ui-dialog-titlebar-close").wrap(k);var x=e('<a href="#" class="dnnToggleMax"><span>Max</span></a>');p.parent().find(".ui-dialog-titlebar-close").before(x),x.click(function(i){i.preventDefault();var t,n,a=e(o),r="center",l="center",d=0,s=0;if(e("button.ui-dialog-titlebar-close").length&&(s=e("button.ui-dialog-titlebar-close").parent(".dnnModalCtrl").height(),d=e("button.ui-dialog-titlebar-close").parent(".dnnModalCtrl").width()),p.data("isMaximized")){var c=p.data("height")+100;c>=a.height()&&(c=p.data("height")),t=c-s,n=p.data("width"),p.data("isMaximized",!1)}else{p.data("height",p.dialog("option","minHeight")).data("width",p.dialog("option","minWidth"));var h=0;e("#personaBar-iframe").length&&(h=e("#personaBar-iframe").width()),n=a.outerWidth()-h-d/7.5-40,t=a.height()-s,r="right-"+d/5.5+" center",l="right center-"+s/11,p.data("isMaximized",!0)}p.dialog("option","height",t),p.dialog("option","width",n),p.dialog("option","position",{my:r,at:l,of:o})})}if(function(){var o=e('<div class="dnnLoading"></div>');o.css({width:p.width(),height:p.height()}),p.before(o)}(),"true"===a.toString())return!1},closePopUp:function(o,i){var t=parent,n=t.jQuery("#iPopUp");void 0!==o&&null!=o||(o=!0),"true"==o.toString()?(void 0!==i&&""!=i||(i=t.location.href),t.location.href=i,n.hide()):n.dialog("option","close",null).dialog("close"),e(t.document).find("html").css("overflow","")},refreshPopup:function(o){var e=parent,i=e.parent;e.location.href!==i.location.href&&e.location.href!==o.url?i.dnnModal.show(o.url,o.showReturn,o.height,o.width,o.refresh,o.closingUrl):dnnModal.closePopUp(o.refresh,o.url)}},o.dnnModal.load()}(window,jQuery);
;;;/*globals initViewForm */

(function ($) {
    var existForm;

    if (window.FormDialog === undefined) {
        window.FormDialog = {};
    }

    function mergePageValidators(pageValidators) {
        if (!pageValidators || pageValidators.length === 0) {
            return;
        }
        pageValidators.forEach(function (item) {
            window.Page_Validators.push(item);
        });
    }

    function getLoadingDialog() {
        return $('<div class="modal fade in" id="loadingDialog" role="dialog" aria-hidden="true" aria-labelledby="loadingDialogLabel"><div class="modal-dialog modal-sm"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title" id="myModalLabel">Loading..</h5> </div><div class="modal-body"><div class="progress"> <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%"></div></div></div></div></div></div>');
    }

    function displayDialog(option) {
        if (existForm) {
            existForm.clearReCaptcha();
        }
        var deferred = $.Deferred();
        var $requestMoreInfomationPanel = $(option.panelSelector);
        if (option.isPhoto && $requestMoreInfomationPanel.data("loaded")) {
            $requestMoreInfomationPanel.modal("show");
            $requestMoreInfomationPanel.find(".error-message").hide();
            return deferred.resolve().promise();
        }

        var requestData = {
            portalId: option.portalId,
            moduleId: option.moduleId,
            productId: option.productId,
            formId: option.formId
        };

        var ajaxOption = {
            url: "//" + window.location.hostname + option.url,
            data: requestData,
            cache: false
        };

        $requestMoreInfomationPanel.on("hidden.bs.modal", function () {
            $('html, body').removeClass('modal-open'); //add class to body
        });

        var currentPageValidators = window.Page_Validators;
        var $loadingDialog = getLoadingDialog();
        $loadingDialog.modal({show:true,backdrop:"static"});
        $.ajax(ajaxOption).then(function (responseData) {
            if (responseData) {
                $requestMoreInfomationPanel.find(".modal-body").html(responseData);
                $requestMoreInfomationPanel.find(".recaptcha-section .error-message").hide();
                $requestMoreInfomationPanel.data("loaded", true);
                mergePageValidators(currentPageValidators);
                $loadingDialog.one("hidden.bs.modal", function () {
                    $requestMoreInfomationPanel.modal({show:true,backdrop:"static"});
                    var handlers = $(window).data('viewFormHandlers');
                    if (handlers) {
                        for (var i = 0; i < handlers.length; i++) {
                            var handler = handlers[i];
                            if ($requestMoreInfomationPanel.find('#' + handler.clientId).length > 0) {
                                existForm = handler.init($requestMoreInfomationPanel);
                                break;
                            }
                        }
                    }
                    deferred.resolve();
                }).modal("hide");
            }
        });
        return deferred.promise();
    }

    FormDialog.init = function(option) {
        $(option.buttonSelector).off('click')
            .on("click",
                function() {
                    displayDialog(option);
                });
    };

    FormDialog.displayDialog = function(option) {
        return displayDialog(option);
    };

    return self;
}(jQuery));
;;;function QuickRequestInformationForm() {

    var validForm = true;
    var recaptcha;
    // All selectors should be specific in RequestMoreInformation div scope.
    // as ancestor is RequestMoreInformation div.
    // BEWARE: DO NOT REMOVE SPACE before descendant selector.

    const elementIds = {
        firstNameError: "#FirstNameError",
        lastNameError: "#LastNameError",
        phoneNumberError: "#PhoneNumberError",
        phoneNumberInvalid: "#PhoneNumberInvalid",
        emailAddressError: "#EmailAddressError",
        emailAddressInvalid: "#EmailAddressInvalid"
    };


    var formContainer = $("#RequestMoreInformation");
    var selector = {
        firstName: formContainer.find("#FirstName"),
        lastName: formContainer.find("#LastName"),
        phoneNumber: formContainer.find("#PhoneNumber"),
        emailAddress: formContainer.find("#EmailAddress"),
        isSubscribeNewsletter: formContainer.find("#IsSubscribeNewsletter"),
        requestSubmitButton: formContainer.find("#RequestSubmitButton"),

        productId: formContainer.find("#ProductId"),
        siteId: formContainer.find("#SiteId"),
        brandIntegrityTemplateSiteId: formContainer.find("#BrandIntegrityTemplateSiteId"),
        tabModuleId: formContainer.find("#TabModuleId"), 

       
        reCaptchaType: formContainer.find("#ReCaptchaType"),
        reCaptchaSiteKey: formContainer.find("#ReCaptchaSiteKey"),
        recaptchaError: formContainer.find("#RecaptchaError"),

        hostPortalAlias: formContainer.find("#HostPortalAlias"),
        completionMessageText: formContainer.find("#CompletionMessageText"),
        finalUrl: formContainer.find("#FinalUrl"),        
        isSendToShiftDigital: formContainer.find("#IsSendToShiftDigital")
    };

    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zaA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var phoneNumberRegex = /^[\d+_.() \-]+$/;


    function checkReCaptcha() {
        const recaptchaResponse = grecaptcha.getResponse(recaptcha.widgetId);
        const errorMessageCtrl = $(formContainer).find('.recaptcha-section').find('.error-message');
        if (recaptchaResponse.length === 0) {
            errorMessageCtrl.show();
            errorMessageCtrl.css('display', 'inline');
            return false;
        }
        errorMessageCtrl.hide();
        return true;
    } 


    function showErrorMessage(errorMessageIdSelector, message, inputSelector) {
        var $control = $(errorMessageIdSelector);
        if ($control && $control.length) {
            $control.show();
        } else {
            $("<span class=\"error-message\" id=\"" + errorMessageIdSelector.replace("#", "") + "\"><span class=\"error-text\">" +
                message +
                "</span></span>").insertAfter($(inputSelector));
        }
    }

    function hideErrorMessage(errorMessageIdSelector) {
        var $control = $(errorMessageIdSelector);
        if (!$control || !$control.length) {
            return;
        }
        $control.hide();
    }

    function validateMessage(input, inputmessage) {
        if ($(input).val().trim().length === 0) {
            showErrorMessage(inputmessage, "Required", input);
            validForm = false;
        } else {
            hideErrorMessage(inputmessage);
        }
    }

    function firstNameValidate() {
        validateMessage(selector.firstName, elementIds.firstNameError);
    }

    function lastNameValidate() {
        validateMessage(selector.lastName, elementIds.lastNameError);
    }
    
    function phoneNumberValidate() {
        if ($(selector.phoneNumber).val().length !== 0 && !phoneNumberRegex.test($(selector.phoneNumber).val())) {
            showErrorMessage(elementIds.phoneNumberInvalid, "Invalid Format", selector.phoneNumber);
            validForm = false;
        } else {
            hideErrorMessage(elementIds.phoneNumberInvalid);
        }
        validateMessage(selector.phoneNumber, elementIds.phoneNumberError);
    }

    function emailAddressValidate() {
        if ($(selector.emailAddress).val().trim().length !== 0 && !emailRegex.test($(selector.emailAddress).val())) {
            showErrorMessage(elementIds.emailAddressInvalid, "Invalid Format", selector.emailAddress);
            validForm = false;
        } else {
            hideErrorMessage(elementIds.emailAddressInvalid);
        }
        validateMessage(selector.emailAddress, elementIds.emailAddressError);
    }

    function validate() {
        firstNameValidate();
        lastNameValidate();
        phoneNumberValidate();
        emailAddressValidate();
    }

    $(selector.firstName).blur(function () {
        firstNameValidate();
    });

    $(selector.lastName).blur(function () {
        lastNameValidate();
    });

    $(selector.phoneNumber).blur(function () {
        phoneNumberValidate();
    });

    $(selector.emailAddress).blur(function () {
        emailAddressValidate();
    });

    function getFormData() {
        var data = {};
        data.FormName = "Request More Information";
        data.FirstName = selector.firstName.val();
        data.LastName =  selector.lastName.val();
        data.Phone = selector.phoneNumber.val();
        data.Email = selector.emailAddress.val();
        data.ProductId = selector.productId.val();
        data.SiteId = selector.siteId.val();
        data.BrandIntegrityTemplateSiteId = selector.brandIntegrityTemplateSiteId.val();
        data.TabModuleId = selector.tabModuleId.val();
        data.IsSubscribeNewsletter = selector.isSubscribeNewsletter.is(':checked');
        data.IsSendToShiftDigital = selector.isSendToShiftDigital.val();
        return data;
    }

    function sendGoogleAnalyticForFormSubmission() {
        if (!$.isFunction(ga)) {
            return;
        }
        var trackers = ga.getAll();
        if (!$.isArray(trackers)) {
            return;
        }
        var tracker = trackers[0];        
        if (!tracker) {
            return;
        }
        tracker.send('pageview', '/Submission-Confirmation');
    }

    function showModal(title, message) {
        var dialogHtml = '<div class="modal fade in" role="dialog" aria-hidden="true"><div class="modal-dialog modal-m"><div class="modal-content">';
        dialogHtml += '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title">' + title + '</h4></div>';
        dialogHtml += '<div class="modal-body">' + message + '</div>';
        dialogHtml += '<div class="modal-footer" style="text-align:left;"><button type="button" class="btn btn-primary" data-dismiss="modal">OK</button></div>';
        dialogHtml += '</div></div></div>';
        var $dialog = $(dialogHtml);
        $dialog.modal("show");
        $dialog.on("hidden.bs.modal", function (e) {
            $(e.currentTarget).remove();
            sendGoogleAnalyticForFormSubmission();
        });
    }

    function setDefaultButtonState() {
        $(selector.requestSubmitButton).val("submit");
        $(selector.requestSubmitButton).prop('disabled', false);
    }

    function clearForm() { 
        $(selector.firstName).val("");
        $(selector.lastName).val("");
        $(selector.phoneNumber).val("");
        $(selector.emailAddress).val("");
    }

    function checkPaidExisting() {
        var dx1SemName = "Dx1Sem";
        value = getCookie(dx1SemName);

        if (value === "") {
            return false;
        }
        return Boolean.parse(value);
    }

    function getCookie(cookieName) {
        var name = cookieName + "=";
        var allCookie = decodeURIComponent(document.cookie).split(';');
        var cVal = [];
        for (var i = 0; i < allCookie.length; i++) {
            if (allCookie[i].trim().indexOf(name) === 0) {
                cVal = allCookie[i].trim().split("=");
            }
        }
        return cVal.length <= 0 ? "" : cVal[1];
    }

    function sendFormSubmissionEventToShiftDigitalAnalytics(formName) {
        if (!window.sd || !formName) {
            return;
        }
        var data = {
            formType: formName,
            events: 'formSubmission'
        };
        sd('dataLayer', data);
        sd('send');
    }

    function submitForm() {
        recaptcha.clearReCaptchaTimeout();
        var recaptchaResponse = grecaptcha.getResponse(recaptcha.widgetId);
        var isSemFromCookie = checkPaidExisting();
        var formData = getFormData();
        var requestData = {
            isDx1Sem: isSemFromCookie,
            formData: formData,
            reCaptchaResponse: recaptchaResponse,
            reCaptchaEnabled: true
        };
        var requestJson = JSON.stringify(requestData);
        $.ajax({
            type: "POST",
            url: "https://" + $(selector.hostPortalAlias).val() + "/desktopmodules/dominion/forms/api/Forms/SubmitForm",
            data: requestJson,
            crossDomain: true,
            dataType: "json",
            error: function () {
                recaptcha.resetReCaptcha();
                setDefaultButtonState();
                alert("Sorry there was an error submitting your form.");
            },
            success: function () {
                sendFormSubmissionEventToShiftDigitalAnalytics(formData.FormName);
                var completionMessageText = $(selector.completionMessageText).val();
                if (completionMessageText) {
                    recaptcha.resetReCaptcha();
                    setDefaultButtonState();
                    clearForm();
                    showModal("Request Information", completionMessageText);
                } else {
                    window.location = $(selector.finalUrl).val();
                }
            }
        });
    }

    function initQuickRequestInformationForm() {
        recaptcha = ReCaptcha(formContainer,
            $(selector.reCaptchaType).val(),
            $(selector.reCaptchaSiteKey).val(),
            submitForm);

        if (recaptcha.reCaptchaType === "invisible") {
            formContainer.find('.recaptcha-section').parent().remove();
        }

        $(selector.requestSubmitButton).click(function () {
            validForm = true;

            $(selector.recaptchaError).hide();
            validate();
            if (recaptcha.reCaptchaType !== "invisible") {
                validForm = validForm && checkReCaptcha();
            }

            if (!validForm) {
                return false;
            }

            $(selector.requestSubmitButton).val("submitting...");
            $(selector.requestSubmitButton).prop('disabled', true);

            if (recaptcha.reCaptchaType === "invisible") {
                grecaptcha.execute(recaptcha.widgetId);
            } else {
                submitForm();
            }
        });
    }

    initQuickRequestInformationForm();

};
;;;function CalculatePaymentDialog($, productName, calculateButton, interestRate, productId, requestMoreInformationOption) {
    var originalPrice = $('#CalculatePaymentPanel' + productId + ' .Price').val();
    $('#CalculatePaymentPanel' + productId + ' .DownPayment').val('');
    $('#CalculatePaymentPanel' + productId + ' .Price').val(originalPrice);
    $('#CalculatePaymentPanel' + productId + ' .InterestRate').val(interestRate);
    $('#CalculatePaymentPanel' + productId + ' .LoanTerm').val('60');


    function clearForm($form) {
        $form.find(".form-control").val("");
        $form.find(":radio").prop("checked", false);
        $form.find(".error-message").hide();

        var captchaWrapper = $form.find(".captcha-wrapper");
        if (captchaWrapper && captchaWrapper.length > 0 && grecaptcha) {
            var widgetId = captchaWrapper.attr("widget-id");
            if (grecaptcha.getResponse(widgetId)) {
                grecaptcha.reset(widgetId);
            }
        }
    }

    var $dialog1 = $("#RequestMoreInformationPanel" + productId);
    $calculatePaymentPanel = $('#' + calculateButton).next("#CalculatePaymentPanel" + productId);
    $calculatePaymentPanel.find('#SubmitButton').on('click', function() {
        CalculateNewPayment();
        if ($dialog1 && $dialog1.length) {

            FormDialog.displayDialog(requestMoreInformationOption).then(function() {
                clearForm($dialog1);

                var priceWithFormat = format($('#CalculatePaymentPanel' + productId + ' .Price').val(), { places: 2, thousand: ","});
                var paymentWithFormat = format($('#CalculatePaymentPanel' + productId + ' .DownPayment').val(), { places: 2, thousand: "," });
                var interestRateWithFormat = $('#CalculatePaymentPanel' + productId + ' .InterestRate').val();
                var paymentPerMonthWithFormat = format($('#CalculatePaymentPanel' + productId + ' .EstimatedMonthlyPayment').val(), { places: 2, thousand: "," });

                var comment = 'I have used the payment calculator' +
                    ' to estimate my payments for this ' + productName + ' with' +
                    ' a price of $' + priceWithFormat +
                    ', down payment of $' + paymentWithFormat +
                    ', interest rate of ' + interestRateWithFormat + '%' +
                    ', for a loan term of ' + $('#CalculatePaymentPanel' + productId + ' .LoanTerm').val() + ' months' +
                    ', and an estimated monthly payment of $' + paymentPerMonthWithFormat + '.';

                $dialog1.find('.CommentsField').val(comment);
            });
        }
    });

    $calculatePaymentPanel.find('#CloseButton').on('click', function () {
        ClearBoxes();
    });

    $('#' + calculateButton).on('click', function() {
        $('#CalculatePaymentPanel' + productId + ' .DownPayment').val('');
        $('#CalculatePaymentPanel' + productId + ' .Price').val(originalPrice);
        $('#CalculatePaymentPanel' + productId + ' .InterestRate').val(interestRate);
        $('#CalculatePaymentPanel' + productId + ' .LoanTerm').val('60');
        CalculateNewPayment();
    });

    var ClearBoxes = function() {
        $('.First').val('');
        $('.Last').val('');
        $('.Email').val('');
        $('.Phone').val('');
        $('.Zip').val('');
        $('.CommentsField').val('');
    };

    var CalculateNewPayment = function () {
        RemoveFormat();
        var price = $('#CalculatePaymentPanel' + productId + ' .Price').val();
        var downPayment = $('#CalculatePaymentPanel' + productId + ' .DownPayment').val();
        var interestRate = parseFloat($('#CalculatePaymentPanel' + productId + ' .InterestRate').val());
        var months = $('#CalculatePaymentPanel' + productId + ' .LoanTerm').val();

        if (parseFloat(downPayment) > parseFloat(price)) {
            $('#CalculatePaymentPanel' + productId + ' .error').show();
            $('#CalculatePaymentPanel' + productId + ' .EstimatedMonthlyPayment').val('');
            $calculatePaymentPanel.find('#SubmitButton').prop('disabled', true);
            return;
        } else {
            $('#CalculatePaymentPanel' + productId + ' .error').hide();
            $calculatePaymentPanel.find('#SubmitButton').removeAttr("disabled");
        }

        var payment;
        if (!interestRate) {
            payment = (price - downPayment) / months;    
        } else {
            var mi = interestRate / (12 * 100);
            payment = (price - downPayment) * (mi / (1 - Math.pow((1 + mi), -months)));
        }

        if (payment < 0) {
            $('#CalculatePaymentPanel' + productId + ' .DownPayment').val('Invalid data entered.');
        } else {
            $('#CalculatePaymentPanel' + productId + ' .EstimatedMonthlyPayment').val(payment);
            FormatNumbers();
        }
    };

    var FormatNumbers = function() {
        $('#CalculatePaymentPanel' + productId + ' .Price').val(format($('#CalculatePaymentPanel' + productId + ' .Price').val(), { places: 2 }));
        $('#CalculatePaymentPanel' + productId + ' .DownPayment').val(format($('#CalculatePaymentPanel' + productId + ' .DownPayment').val(), { places: 2 }));
        $('#CalculatePaymentPanel' + productId + ' .EstimatedMonthlyPayment').val(format($('#CalculatePaymentPanel' + productId + ' .EstimatedMonthlyPayment').val(), { places: 2 }));
};

    var RemoveFormat = function() {
        $('#CalculatePaymentPanel' + productId + ' .Price').val($('#CalculatePaymentPanel' + productId + ' .Price').val().replace('$', ''));
        $('#CalculatePaymentPanel' + productId + ' .Price').val($('#CalculatePaymentPanel' + productId + ' .Price').val().replace(',', ''));
        $('#CalculatePaymentPanel' + productId + ' .DownPayment').val($('#CalculatePaymentPanel' + productId + ' .DownPayment').val().replace('$', ''));
        $('#CalculatePaymentPanel' + productId + ' .DownPayment').val($('#CalculatePaymentPanel' + productId + ' .DownPayment').val().replace(',', ''));
    };

    $('#CalculatePaymentPanel' + productId + ' .Price').change(CalculateNewPayment);
    $('#CalculatePaymentPanel' + productId + ' .DownPayment').change(CalculateNewPayment);
    $('#CalculatePaymentPanel' + productId + ' .InterestRate').change(CalculateNewPayment);
    $('#CalculatePaymentPanel' + productId + ' .LoanTerm').change(CalculateNewPayment);

    var format = function(input, options) {
        var defaults = {
            places: 0,
            currencySymbol: "",
            decimal: ".",
            negativeSign: "-",
            positiveSign: "",
            round: true,
            convertToPercent: false
        };
        var settings = $.extend({}, defaults, options);
        var numberIn = Number(input || 0),
            sign = numberIn < 0 ? settings.negativeSign : settings.positiveSign,
            decimalPart = "",
            wholePart;
        if (settings.convertToPercent) {
            numberIn = numberIn * 100;
        }
        wholePart = Math.abs(numberIn).toString().split(/\./)[0];
        if (settings.thousand) {
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(wholePart)) {
                wholePart = wholePart.replace(rgx, "$1" + settings.thousand + "$2");
            }
        }
        if (settings.places > 0) {
            if (settings.round) {
                decimalPart = settings.decimal + numberIn.toFixed(settings.places).split(/\./)[1];
            } else {
                decimalPart = numberIn.toString().match(/\.\d+/)[0] + new Array(settings.places + 1).join("0");
                decimalPart = settings.decimal + decimalPart.substring(1, settings.places + 1);
            }
        }
        return sign + settings.currencySymbol + wholePart + decimalPart;
    };

    CalculateNewPayment();
};


;;;var DNN_COL_DELIMITER=String.fromCharCode(16);var DNN_ROW_DELIMITER=String.fromCharCode(15);var __dnn_m_bPageLoaded=false;if(window.addEventListener){window.addEventListener("load",__dnn_Page_OnLoad,false)}else{window.attachEvent("onload",__dnn_Page_OnLoad)}function __dnn_ClientAPIEnabled(){return typeof(dnn)!="undefined"&&typeof (dnn.dom)!="undefined"}function __dnn_Page_OnLoad(){if(__dnn_ClientAPIEnabled()){dnn.dom.attachEvent(window,"onscroll",__dnn_bodyscroll)}__dnn_m_bPageLoaded=true}function __dnn_KeyDown(iKeyCode,sFunc,e){if(e==null){e=window.event}if(e.keyCode==iKeyCode){eval(unescape(sFunc));return false}}function __dnn_bodyscroll(){var a=document.forms[0];if(__dnn_ClientAPIEnabled()&&__dnn_m_bPageLoaded&&typeof(a.ScrollTop)!="undefined"){a.ScrollTop.value=document.documentElement.scrollTop?document.documentElement.scrollTop:dnn.dom.getByTagName("body")[0].scrollTop}}function __dnn_setScrollTop(c){if(__dnn_ClientAPIEnabled()){if(c==null){c=document.forms[0].ScrollTop.value}var a=dnn.getVar("ScrollToControl");if(a!=null&&a.length>0){var b=dnn.dom.getById(a);if(b!=null){c=dnn.dom.positioning.elementTop(b);dnn.setVar("ScrollToControl","")}}if(document.getElementsByTagName("html")[0].style.overflow!="hidden"){window.scrollTo(0,c)}}}function __dnn_SetInitialFocus(a){var b=dnn.dom.getById(a);if(b!=null&&__dnn_CanReceiveFocus(b)){b.focus()}}function __dnn_CanReceiveFocus(b){if(b.style.display!="none"&&b.tabIndex>-1&&b.disabled==false&&b.style.visible!="hidden"){var a=b.parentElement;while(a!=null&&a.tagName!="BODY"){if(a.style.display=="none"||a.disabled||a.style.visible=="hidden"){return false}a=a.parentElement}return true}else{return false}}function __dnn_ContainerMaxMin_OnClick(i,b){var g=dnn.dom.getById(b);if(g!=null){var e=i.childNodes[0];var l=dnn.getVar("containerid_"+b);var j=dnn.getVar("cookieid_"+b);var d=e.src.toLowerCase().substr(e.src.lastIndexOf("/"));var a;var h;var k;if(dnn.getVar("min_icon_"+l)){k=dnn.getVar("min_icon_"+l)}else{k=dnn.getVar("min_icon")}if(dnn.getVar("max_icon_"+l)){h=dnn.getVar("max_icon_"+l)}else{h=dnn.getVar("max_icon")}a=h.toLowerCase().substr(h.lastIndexOf("/"));var c=5;var f=dnn.getVar("animf_"+b);if(f!=null){c=new Number(f)}if(d==a){e.src=k;dnn.dom.expandElement(g,c);e.title=dnn.getVar("min_text");if(j!=null){if(dnn.getVar("__dnn_"+l+":defminimized")=="true"){dnn.dom.setCookie(j,"true",365)}else{dnn.dom.deleteCookie(j)}}else{dnn.setVar("__dnn_"+l+"_Visible","true")}}else{e.src=h;dnn.dom.collapseElement(g,c);e.title=dnn.getVar("max_text");if(j!=null){if(dnn.getVar("__dnn_"+l+":defminimized")=="true"){dnn.dom.deleteCookie(j)}else{dnn.dom.setCookie(j,"false",365)}}else{dnn.setVar("__dnn_"+l+"_Visible","false")}}return true}return false}function __dnn_Help_OnClick(a){var b=dnn.dom.getById(a);if(b!=null){if(b.style.display=="none"){b.style.display=""}else{b.style.display="none"}return true}return false}function __dnn_SectionMaxMin(f,c){var d=dnn.dom.getById(c);if(d!=null){var g=f.getAttribute("max_icon");var e=f.getAttribute("min_icon");var a=f.getAttribute("userctr")!=null;var b;if(d.style.display=="none"){f.src=e;d.style.display="";if(a){b="True"}else{dnn.setVar(f.id+":exp",1)}}else{f.src=g;d.style.display="none";if(a){b="False"}else{dnn.setVar(f.id+":exp",0)}}if(a){dnncore.setUserProp(f.getAttribute("userctr"),f.getAttribute("userkey"),b,null)}return true}return false}function __dnn_enableDragDrop(){var b=dnn.getVar("__dnn_dragDrop").split(";");var e;for(var c=0;c<b.length;c++){e=b[c].split(" ");if(e[0].length>0){var a=dnn.dom.getById(e[0]);var d=dnn.dom.getById(e[1]);if(a!=null&&d!=null){a.setAttribute("moduleid",e[2]);dnn.dom.positioning.enableDragAndDrop(a,d,"__dnn_dragComplete()","__dnn_dragOver()")}}}}var __dnn_oPrevSelPane;var __dnn_oPrevSelModule;var __dnn_dragEventCount=0;function __dnn_dragOver(){__dnn_dragEventCount++;if(__dnn_dragEventCount%75!=0){return}var c=dnn.dom.getById(dnn.dom.positioning.dragCtr.contID);var a=__dnn_getMostSelectedPane(dnn.dom.positioning.dragCtr);if(__dnn_oPrevSelPane!=null){__dnn_oPrevSelPane.pane.style.border=__dnn_oPrevSelPane.origBorder}if(a!=null){__dnn_oPrevSelPane=a;a.pane.style.border="4px double "+DNN_HIGHLIGHT_COLOR;var e=__dnn_getPaneControlIndex(c,a);var b;var f;for(var d=0;d<a.controls.length;d++){if(e>d&&a.controls[d].id!=c.id){b=a.controls[d]}if(e<=d&&a.controls[d].id!=c.id){f=a.controls[d];break}}if(__dnn_oPrevSelModule!=null){dnn.dom.getNonTextNode(__dnn_oPrevSelModule.control).style.border=__dnn_oPrevSelModule.origBorder}if(f!=null){__dnn_oPrevSelModule=f;dnn.dom.getNonTextNode(f.control).style.borderTop="5px groove "+DNN_HIGHLIGHT_COLOR}else{if(b!=null){__dnn_oPrevSelModule=b;dnn.dom.getNonTextNode(b.control).style.borderBottom="5px groove "+DNN_HIGHLIGHT_COLOR}}}}function __dnn_dragComplete(){var f=dnn.dom.getById(dnn.dom.positioning.dragCtr.contID);var d=f.getAttribute("moduleid");if(__dnn_oPrevSelPane!=null){__dnn_oPrevSelPane.pane.style.border=__dnn_oPrevSelPane.origBorder}if(__dnn_oPrevSelModule!=null){dnn.dom.getNonTextNode(__dnn_oPrevSelModule.control).style.border=__dnn_oPrevSelModule.origBorder}var b=__dnn_getMostSelectedPane(dnn.dom.positioning.dragCtr);var e;if(b==null){var a=__dnn_Panes();for(var c=0;c<a.length;c++){if(a[c].id==f.parentNode.id){b=a[c]}}}if(b!=null){e=__dnn_getPaneControlIndex(f,b);__dnn_MoveToPane(b,f,e);dnn.callPostBack("MoveToPane","moduleid="+d,"pane="+b.paneName,"order="+e*2)}}function __dnn_MoveToPane(a,e,d){if(a!=null){var c=new Array();for(var b=d;b<a.controls.length;b++){if(a.controls[b].control.id!=e.id){c[c.length]=a.controls[b].control}dnn.dom.removeChild(a.controls[b].control)}dnn.dom.appendChild(a.pane,e);e.style.top=0;e.style.left=0;e.style.position="relative";for(var b=0;b<c.length;b++){dnn.dom.appendChild(a.pane,c[b])}__dnn_RefreshPanes()}else{e.style.top=0;e.style.left=0;e.style.position="relative"}}function __dnn_RefreshPanes(){var b=dnn.getVar("__dnn_Panes").split(";");var a=dnn.getVar("__dnn_PaneNames").split(";");__dnn_m_aryPanes=new Array();for(var c=0;c<b.length;c++){if(b[c].length>0){__dnn_m_aryPanes[__dnn_m_aryPanes.length]=new __dnn_Pane(dnn.dom.getById(b[c]),a[c])}}}var __dnn_m_aryPanes;var __dnn_m_aryModules;function __dnn_Panes(){if(__dnn_m_aryPanes==null){__dnn_m_aryPanes=new Array();__dnn_RefreshPanes()}return __dnn_m_aryPanes}function __dnn_Modules(a){if(__dnn_m_aryModules==null){__dnn_RefreshPanes()}return __dnn_m_aryModules[a]}function __dnn_getMostSelectedPane(g){var c=new dnn.dom.positioning.dims(g);var f=0;var a;var h;for(var e=0;e<__dnn_Panes().length;e++){var b=__dnn_Panes()[e];var d=new dnn.dom.positioning.dims(b.pane);a=dnn.dom.positioning.elementOverlapScore(d,c);if(a>f){f=a;h=b}}return h}function __dnn_getPaneControlIndex(f,b){if(b==null){return}var a=new dnn.dom.positioning.dims(f);var e;if(b.controls.length==0){return 0}for(var c=0;c<b.controls.length;c++){e=b.controls[c];var d=new dnn.dom.positioning.dims(e.control);if(a.t<d.t){return e.index}}if(e!=null){return e.index+1}else{return 0}}function __dnn_Pane(a,b){this.pane=a;this.id=a.id;this.controls=new Array();this.origBorder=a.style.border;this.paneName=b;var f=0;var e="";for(var d=0;d<a.childNodes.length;d++){var g=a.childNodes[d];if(dnn.dom.isNonTextNode(g)){if(__dnn_m_aryModules==null){__dnn_m_aryModules=new Array()}var c=g.getAttribute("moduleid");if(c!=null&&c.length>0){e+=c+"~";this.controls[this.controls.length]=new __dnn_PaneControl(g,f);__dnn_m_aryModules[c]=g.id;f+=1}}}this.moduleOrder=e}function __dnn_PaneControl(a,b){this.control=a;this.id=a.id;this.index=b;this.origBorder=a.style.border}function __dnn_ShowModalPage(a){dnnModal.show(a,true,550,950,true,"")}function __dnncore(){this.GetUserVal=0;this.SetUserVal=1}__dnncore.prototype={getUserProp:function(b,c,a){this._doUserCallBack(dnncore.GetUserVal,b,c,null,new dnncore.UserPropArgs(b,c,a))},setUserProp:function(c,d,a,b){this._doUserCallBack(dnncore.SetUserVal,c,d,a,new dnncore.UserPropArgs(c,d,b))},_doUserCallBack:function(c,d,e,a,b){if(dnn&&dnn.xmlhttp){var f=c+COL_DELIMITER+d+COL_DELIMITER+e+COL_DELIMITER+a;dnn.xmlhttp.doCallBack("__Page",f,dnncore._callBackSuccess,b,dnncore._callBackFail,null,true,null,0)}else{alert("Client Personalization not enabled")}},_callBackSuccess:function(a,b,c){if(b.pFunc){b.pFunc(b.namingCtr,b.key,a)}},_callBackFail:function(a,b){window.status=a}};__dnncore.prototype.UserPropArgs=function(b,c,a){this.namingCtr=b;this.key=c;this.pFunc=a};var dnncore=new __dnncore();
;;;
(function ($) { $.dnnSF = function (moduleId) { var base = this; base.getServiceRoot = function (moduleName) { var serviceRoot = dnn.getVar("sf_siteRoot", "/"); serviceRoot += "API/" + moduleName + "/"; return serviceRoot; }; base.getTabId = function () { return dnn.getVar("sf_tabId", -1); }; base.getModuleId = function () { return moduleId; }; base.setModuleHeaders = function (xhr) { var tabId = base.getTabId(); if (tabId > -1) { xhr.setRequestHeader("ModuleId", base.getModuleId()); xhr.setRequestHeader("TabId", tabId); } var afValue = base.getAntiForgeryValue(); if (afValue) { xhr.setRequestHeader("RequestVerificationToken", afValue); } }; base.getAntiForgeryKey = function () { return "__RequestVerificationToken"; }; base.getAntiForgeryValue = function () { return $('[name="__RequestVerificationToken"]').val(); }; return base; }; $.ServicesFramework = function (moduleId) { return new $.dnnSF(moduleId); }; })(jQuery);

;;;