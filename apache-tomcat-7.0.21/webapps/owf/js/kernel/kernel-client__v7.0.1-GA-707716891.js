var Ozone=Ozone||{};Ozone.eventing=Ozone.eventing||{};Ozone.eventing.priv=Ozone.eventing.priv||{};(function(o){if(typeof f==="undefined"){var f=gadgets.json}var g="_widgetReady",w="_getWidgetReady",v=null,n={},l={};function u(){if(v==null){v={};if(window.name.charAt(0)!="{"){v.rpcId=window.name}else{v=f.parse(window.name);v.rpcId=v.id;return v}}else{return v}}function d(){return l}function q(){return u().rpcId}function k(z){if(o.handleDirectMessage){o.handleDirectMessage(z)}else{if(console&&console.log){console.log("ChildWidget: Kernel: Default direct message handler, doing nothing.  Override by defining Ozone.eventing.handleDirectMessage")}}}function p(){var E=Array.prototype.slice.call(arguments);var C=Array.prototype.slice.call(arguments,3);var D=E[0];var B=E[1];var F=E[2];var A=n[F];A.fn.widgetIdCaller=B;var z=A.fn.apply(A.scope,C[0]);gadgets.rpc.call("..","FUNCTION_CALL_RESULT",null,D,B,F,z)}function r(B,C,A){var D=l[B];if(D!=null){var z=D.callbacks[C];if(typeof z==="function"){z.call(window,A)}}}function s(z){var A=o.priv.clientEventNameToHandler[z];var B=Array.prototype.slice.call(arguments,1);A.apply(window,B)}o.priv.clientEventNameToHandler={};o.after_container_init=function(){};function m(B){if(B){var z=[];for(var A=0;A<B.length;A++){var C=B[A].name;z.push(C)}return z}}function j(z,B,A){l[z]=new Ozone.eventing.WidgetProxy(z,B,q(),A);return l[z]}function b(A){var C=A.indexOf("//");var B=A.indexOf("/",C+2);var z=A.indexOf("/",B+1);var D=A.substring(0,z+1)+"rpc_relay.html";return D}function y(C){var A;for(var B=0,z=C.length;B<z;B++){A=C[B];if(!A.name){throw"Error: name is not set"}if(!A.fn){throw"Error: fn is not set"}n[A.name]=A}}function i(E,A){gadgets.rpc.setRelayUrl("..",u().relayUrl,false,true);gadgets.rpc.register("after_container_init",o.after_container_init);E=[].concat(E);y(E);var D=m(E);var F=q();if(A==null){A=b(document.location.href)}var z='{"id":"'+F+'"}';var C={id:z,version:"1.0",useMultiPartMessagesForIFPC:true,relayUrl:A};var B=f.stringify(C);gadgets.rpc.call("..","container_init",null,z,B,D)}function c(z){z=[].concat(z);y(z);gadgets.rpc.call("..","register_functions",null,window.name,m(z))}function h(D,B){if(D.charAt(0)==="{"){D=OWF.Util.parseJson(D).id}var A=j(D);function z(F){A=j(D,F,A);gadgets.rpc.call("..",w,function(G){if(G){A.fireReady()}if(typeof B=="function"){B.call(this,A)}},D,C)}var E=q();var C='{"id":"'+E+'"}';gadgets.rpc.call("..","GET_FUNCTIONS",z,D,C);return A}function a(z,A){o.priv.clientEventNameToHandler[z]=A;var B=q();gadgets.rpc.call("..","ADD_EVENT",null,B,z)}function e(z,A){gadgets.rpc.call("..","CALL_EVENT",null,z,A)}function t(z){document.body.display="none";gadgets.rpc.call("..","CLOSE_EVENT",null,q(),z)}function x(A){function z(B){A(B)}gadgets.rpc.call("..","LIST_WIDGETS",z)}gadgets.rpc.register("DIRECT_MESSAGEL_CLIENT",k);gadgets.rpc.register("FUNCTION_CALL_CLIENT",p);gadgets.rpc.register("FUNCTION_CALL_RESULT_CLIENT",r);gadgets.rpc.register("EVENT_CLIENT",s);gadgets.rpc.register(g,function(z){var A=l[z];if(A!=null){A.fireReady()}});o.clientInitialize=i;o.registerFunctions=c;o.importWidget=h;o.addEventHandler=a;o.raiseEvent=e;o.closeDialog=t;o.getAllWidgets=x;o.getWidgetProxyMap=d})(Ozone.eventing);