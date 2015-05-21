var Ozone=Ozone||{};Ozone.pref=Ozone.pref||{};(function(d,a,e){Ozone.pref.PrefServer=function(j){if(j===e||j==="null"||j.indexOf("$")!==-1||j.length===0){}else{if(j.lastIndexOf("/")===(j.length-1)){j=j.substring(0,j.length-1)}}var h=function(o){o.method="GET";o.async=true;Ozone.util.Transport.send(o)};var k=function(o){o.method="DELETE";n(o)};var l=function(o){o.url=j+"/"+o.url;h(o)};var i=function(o){o.method=o.content._method;if(o.onSuccess){if(!o.onFailure){o.onFailure=function(p){alert(Ozone.util.ErrorMessageString.saveUserPreferences+" : "+p)}}Ozone.util.Transport.send(o)}else{Ozone.util.Transport.sendAndForget(o)}};var n=function(o){if(o.method==null){o.method="PUT"}var p={_method:o.method};if(o.json){p={_method:o.method,name:o.json.name,description:o.json.description,guid:o.json.guid,isdefault:o.json.isdefault,locked:o.json.locked,state:o.json.state,layoutConfig:o.json.layoutConfig,stack:o.json.stack};if(o.json.cloned===true){p.cloned=true}if(o.json.bypassLayoutRearrange===true){p.bypassLayoutRearrange=true}}o.content=p;i(o)};var m=function(o){if(o.jsonObject._method===e){if(o.method==null){o.method="PUT"}o.jsonObject._method=o.method}o.json=o.jsonObject;n(o)};var g=function(o){var p={name:o.name,description:o.description,guid:o.guid,isdefault:o.isdefault,locked:o.locked,state:o.state,layoutConfig:typeof o.layoutConfig==="string"?o.layoutConfig:Ozone.util.toString(o.layoutConfig),stack:o.stack};return p};return{version:Ozone.version.owfversion+Ozone.version.preference,getUrl:function(){return j},setUrl:function(o){j=o},getDashboard:function(o){o.url=j+"/dashboard/"+o.dashboardId;h(o)},getDefaultDashboard:function(o){o.url=j+"/dashboard?isdefault=true";o.method="POST";Ozone.util.Transport.send(o)},setDefaultDashboard:function(o){o.url=j+"/dashboard/"+o.dashboardId+"?isdefault="+o.isDefault;o.method="PUT";n(o)},createOrUpdateDashboard:function(o){o.url=j+"/dashboard/"+o.json.guid;var p=g(o.json);p.bypassLayoutRearrange=true;o.method=o.saveAsNew?"POST":"PUT";o.jsonObject=p;m(o)},cloneDashboard:function(o){o.url=j+"/dashboard/"+o.json.guid;var p=g(o.json);p.cloned=true;o.method="POST";o.jsonObject=p;m(o)},updateAndDeleteDashboards:function(o){o.url=j+"/dashboard";var p={_method:"PUT",viewsToUpdate:Ozone.util.toString(o.viewsToUpdate),viewGuidsToDelete:Ozone.util.toString(o.viewGuidsToDelete),updateOrder:o.updateOrder};o.method="POST";o.content=p;Ozone.util.Transport.send(o)},deleteDashboard:function(o){o.url=j+"/dashboard/"+o.dashboardId;k(o)},findDashboards:function(o){o.url="dashboard";l(o)},findDashboardsByType:function(o){if(typeof o.onSuccess==="function"){var p={data:[],results:0,success:true};o.onSuccess(p)}},getWidget:function(o){o.url=j+"/widget/"+o.widgetId;if(o.universalName){o.url+="?universalName="+o.universalName}h(o)},findWidgets:function(o){o.url=j+"/widget";if(!o.userOnly){o.url+="/listUserAndGroupWidgets"}var q={_method:"GET"};if(o.searchParams){if(o.searchParams.widgetName&&o.searchParams.widgetName.length>0){var p=o.searchParams.widgetName;if(!o.searchParams.widgetNameExactMatch){p="%"+p+"%"}q.widgetName=p}if(o.searchParams.widgetVersion&&o.searchParams.widgetVersion.length>0){q.widgetVersion=o.searchParams.widgetVersion}if(o.searchParams.widgetGuid&&o.searchParams.widgetGuid.length>0){q.widgetGuid=o.searchParams.widgetGuid}if(o.searchParams.universalName&&o.searchParams.universalName.length>0){q.universalName=o.searchParams.universalName}if(o.searchParams.group_id){q.group_id=o.searchParams.group_id}}o.method="POST";o.content=q;Ozone.util.Transport.send(o)},updateAndDeleteWidgets:function(o){o.url=j+"/widget";var p={_method:"PUT",widgetsToUpdate:Ozone.util.toString(o.widgetsToUpdate),widgetGuidsToDelete:Ozone.util.toString(o.widgetGuidsToDelete),updateOrder:o.updateOrder};o.method="POST";o.content=p;Ozone.util.Transport.send(o)},getUserPreference:function(o){o.url=j+"/preference/"+o.namespace+"/"+o.name;o.ignoredErrorCodes=[404];h(o)},doesUserPreferenceExist:function(o){o.url=j+"/hasPreference/"+o.namespace+"/"+o.name;h(o)},getCurrentUser:function(o){o.url=j+"/person/whoami";h(o)},getServerVersion:function(o){o.url=j+"/server/resources";h(o)},setUserPreference:function(o){o.url=j+"/preference/"+o.namespace+"/"+o.name;if(o.method==null){o.method="PUT"}o.content={_method:o.method,value:o.value};if(o.onSuccess){if(!o.onFailure){o.onFailure=function(p){alert(Ozone.util.ErrorMessageString.saveUserPreferences+" : "+p)}}Ozone.util.Transport.send(o)}else{Ozone.util.Transport.sendAndForget(o)}},deleteUserPreference:function(o){o.method="DELETE";o.ignoredErrorCodes=[404];o.path=o.name;Ozone.pref.PrefServer.setUserPreference(o)},getDependentWidgets:function(o){o.url=j+"/widgetDefinition/dependents";o.method="POST";if(!o.content){o.content={}}Ozone.util.Transport.send(o)},getDependentPersonWidgets:function(o){o.url=j+"/personWidgetDefinition/dependents";o.method="POST";if(!o.content){o.content={}}Ozone.util.Transport.send(o)},deleteWidgetDefs:function(o){o.url=j+"/widgetDefinition";o.method="DELETE";if(!o.content){o.content={}}Ozone.util.Transport.send(o)}}};var b=Ozone.util.parseWindowNameData();var c=null;if(b!=null&&b.preferenceLocation!=null){c=b.preferenceLocation}else{c=Ozone.config.prefsLocation}Ozone.pref.PrefServer=Ozone.pref.PrefServer(c);if(c==null){for(var f in Ozone.pref.PrefServer){if(typeof Ozone.pref.PrefServer[f]=="function"){Ozone.pref.PrefServer[f]=function(){}}}}}(window,document));