Ext.define("Ozone.data.Group",{extend:"Ext.data.Model",idProperty:"id",fields:[{name:"name",type:"string"},{name:"id",type:"int"},{name:"description",type:"string"},{name:"totalWidgets",type:"int"},{name:"totalUsers",type:"int"},{name:"totalStacks",type:"int"},{name:"automatic",type:"boolean"},{name:"stackDefault",type:"boolean"},{name:"status",type:"string"},{name:"displayName",type:"string"},{name:"email",type:"string"},{name:"title",mapping:"displayName"}]});Ext.define("Ozone.data.GroupStore",{extend:"Ozone.data.OWFStore",model:"Ozone.data.Group",sorters:[{property:"displayName",direction:"ASC"}],constructor:function(a){a=a?a:{};Ext.applyIf(a,{api:{read:"/group",create:"/group",update:"/group",destroy:"/group"},fields:["id","name","description","totalWidgets","totalUsers","totalStacks","automatic","stackDefault","status","displayName","email"],autoDestroy:true});this.callParent(arguments)}});Ext.define("Ozone.components.admin.GroupsGrid",{extend:"Ext.grid.Panel",alias:["widget.groupsgrid"],plugins:new Ozone.components.focusable.FocusableGridPanel(),title:"Groups",columns:[{itemId:"id",header:"ID",dataIndex:"id",sortable:true,hidden:true},{header:"Group Name",dataIndex:"displayName",flex:3,renderer:function(e,b,a,f,d,c){return this.renderCell(Ext.htmlEncode(e?e:a.data.name),b,a)}},{header:"Users",dataIndex:"totalUsers",flex:1,sortable:false,renderer:function(e,b,a,f,d,c){return this.renderCell(e,b,a)}},{header:"Widgets",dataIndex:"totalWidgets",flex:1,sortable:false,renderer:function(e,b,a,f,d,c){return this.renderCell(e,b,a)}},{header:"Stacks",dataIndex:"totalStacks",flex:1,sortable:false,renderer:function(e,b,a,f,d,c){return this.renderCell(e,b,a)}}],defaultPageSize:50,multiSelect:true,initComponent:function(){Ext.apply(this,{columnLines:true});this.store=Ext.create("Ozone.data.GroupStore",{id:"groupstore",autoLoad:false,pageSize:this.defaultPageSize});this.bbar=Ext.create("Ext.toolbar.Paging",{itemId:"bottomBar",store:this.store,pageSize:this.pageSize,displayInfo:true});this.relayEvents(this.store,["datachanged"]);this.callParent(arguments)},applyFilter:function(d,a){this.store.proxy.extraParams=undefined;if(d){var c=[];for(var b=0;b<a.length;b++){c.push({filterField:a[b],filterValue:d})}this.store.proxy.extraParams={filters:Ext.JSON.encode(c),filterOperator:"OR"}}if(this.baseParams){this.setBaseParams(this.baseParams)}this.store.loadPage(1,{params:{offset:0,max:this.pageSize}})},clearFilter:function(){this.store.proxy.extraParams=undefined;if(this.baseParams){this.setBaseParams(this.baseParams)}this.store.load({params:{start:0,max:this.pageSize}})},renderCell:function(b,c,a){if(a.get("status")=="inactive"){c.tdCls+=" x-item-disabled"}return b},setBaseParams:function(a){this.baseParams=a;if(this.store.proxy.extraParams){Ext.apply(this.store.proxy.extraParams,a)}else{this.store.proxy.extraParams=a}},setStore:function(b,c){this.reconfigure(b,c);var a=this.getBottomToolbar();if(a){a.bindStore(b)}},getTopToolbar:function(){return this.getDockedItems('toolbar[dock="top"]')[0]},getBottomToolbar:function(){return this.getDockedItems('toolbar[dock="bottom"]')[0]},load:function(){this.store.loadPage(1)},refresh:function(){this.store.loadPage(this.store.currentPage)}});Ext.define("Ozone.components.admin.group.GroupDetailPanel",{extend:"Ext.panel.Panel",alias:["widget.groupdetailpanel"],viewGroup:null,initComponent:function(){this.viewGroup=Ext.create("Ext.view.View",{store:Ext.create("Ext.data.Store",{storeId:"storeGroupItem",fields:[{name:"name",type:"string"},{name:"status",type:"string"},{name:"automatic",type:"string"},{name:"description",type:"string"}]}),deferEmptyText:false,tpl:new Ext.XTemplate('<tpl for=".">','<div class="selector">','<div id="detail-info" class="detail-info">','<div class="detail-block">','<div class="detail-title">{name:htmlEncode}</div>','<div><span class="detail-label">Status:</span> {status:this.renderStatus}</div>','<div><span class="detail-label">User Management:</span> {automatic:this.renderUserMgmt}</div>',"</div>",'<div><span class="detail-label">Description:</span></div>',"<div>{description:htmlEncode}</div>","</div>","</div>","</tpl>",{compiled:true,renderStatus:function(a){if(a=="active"){return"active"}else{return"inactive"}},renderUserMgmt:function(a){if(a){return"Automatic"}else{return"Manual"}}}),emptyText:"No group selected",itemSelector:"div.selector",autoScroll:"true"});this.items=[this.viewGroup];this.callParent(arguments)},loadData:function(a){this.viewGroup.store.loadData([a],false)},removeData:function(){this.viewGroup.store.removeAll(false)}});Ext.define("Ozone.components.admin.group.GroupManagementPanel",{extend:"Ozone.components.admin.ManagementPanel",alias:["widget.groupmanagement"],layout:"fit",gridGroups:null,pnlGroupDetail:null,txtHeading:null,lastAction:null,guid_EditCopyWidget:null,widgetStateHandler:null,dragAndDrop:true,launchesWidgets:true,channel:"AdminChannel",defaultTitle:"Groups",minButtonWidth:80,detailsAutoOpen:true,initComponent:function(){var a=this;OWF.Preferences.getUserPreference({namespace:"owf.admin.GroupEditCopy",name:"guid_to_launch",onSuccess:function(b){a.guid_EditCopyWidget=b.value},onFailure:function(b){a.showAlert("Preferences Error","Error looking up Group Editor: "+b)}});this.gridGroups=Ext.create("Ozone.components.admin.GroupsGrid",{preventHeader:true,region:"center",border:false});this.gridGroups.store.load({params:{offset:0,max:this.pageSize}});this.relayEvents(this.gridGroups,["datachanged","select","deselect","itemdblclick"]);this.pnlGroupDetail=Ext.create("Ozone.components.admin.group.GroupDetailPanel",{layout:{type:"fit",align:"stretch"},region:"east",preventHeader:true,collapseMode:"mini",collapsible:true,collapsed:true,split:true,border:false,width:200});this.txtHeading=Ext.create("Ext.toolbar.TextItem",{text:'<span class="heading-bold">'+this.defaultTitle+"</span>"});this.searchBox=Ext.widget("searchbox");this.items=[{xtype:"panel",layout:"border",border:false,items:[this.gridGroups,this.pnlGroupDetail]}];this.dockedItems=[{xtype:"toolbar",dock:"top",layout:{type:"hbox",align:"stretchmax"},items:[this.txtHeading,{xtype:"tbfill"},this.searchBox]},{xtype:"toolbar",dock:"bottom",ui:"footer",defaults:{minWidth:this.minButtonWidth},items:[{xtype:"button",text:"Create",handler:function(c,b){b.stopPropagation();a.doCreate()}},{xtype:"splitbutton",text:"Edit",itemId:"btnEdit",handler:function(){var b=a.gridGroups.getSelectionModel().getSelection();if(b&&b.length>0){for(var c=0;c<b.length;c++){a.doEdit(b[c].data.id,b[c].data.displayName)}}else{a.showAlert("Error","You must select at least one group to edit.")}},menu:{xtype:"menu",plain:true,hideMode:"display",defaults:{minWidth:this.minButtonWidth},items:[{xtype:"owfmenuitem",text:"Activate",handler:function(b){a.doActivate()}},{xtype:"owfmenuitem",text:"Deactivate",handler:function(b){a.doDeactivate()}}]}},{xtype:"button",text:"Delete",itemId:"btnDelete",handler:function(b){a.doDelete()}}]}];this.on("datachanged",function(b,c){if(this.pnlGroupDetail!=null){this.pnlGroupDetail.collapse();this.pnlGroupDetail.removeData()}if(!this.disableLaunchMenuRefresh){this.refreshWidgetLaunchMenu()}},this);this.on("select",function(e,b,c,d){this.pnlGroupDetail.loadData(b);if(this.pnlGroupDetail.collapsed&&this.detailsAutoOpen){this.pnlGroupDetail.expand()}this.updateDeleteButton(e.selected)},this);this.on("deselect",function(e,b,c,d){this.updateDeleteButton(e.selected)},this);this.searchBox.on("searchChanged",function(b,c){this.gridGroups.applyFilter(c,["name","description","displayName"])},this);this.on("itemdblclick",function(d,c,g,e,b,f){this.doEdit(c.data.id,c.data.displayName)},this);this.gridGroups.getView().on("itemkeydown",function(d,c,f,e,b){switch(b.getKey()){case b.SPACE:case b.ENTER:this.doEdit(c.data.id,c.data.displayName)}},this);this.callParent(arguments);OWF.Eventing.subscribe("AdminChannel",owfdojo.hitch(this,function(b,d,c){if(d.domain==="Group"){this.gridGroups.getBottomToolbar().doRefresh()}}));this.on("afterrender",function(){var b=this.el.down(".x-collapse-el");b.on("click",function(){var c=this.el.down(".x-splitter-collapsed");if(c){this.detailsAutoOpen=true}else{this.detailsAutoOpen=false}},this)},this)},launchFailedHandler:function(a){if(a.error){this.showAlert("Launch Error","Group Editor Launch Failed: "+a.message)}},doEdit:function(c,b){var a=Ozone.util.toString({id:c,copyFlag:false});OWF.Launcher.launch({title:"$1 - "+b,titleRegex:/(.*)/,guid:this.guid_EditCopyWidget,launchOnlyIfClosed:false,data:a},this.launchFailedHandler)},doActivate:function(){var b=this.gridGroups.getSelectionModel().getSelection();if(b&&b.length>0){for(var c=0;c<b.length;c++){var d=b[c];if(d){d.set("status","active")}}var a=this.gridGroups.getStore();a.save();this.refreshWidgetLaunchMenu()}else{this.showAlert("Error","You must select at least one group to activate.")}},doDeactivate:function(){var b=this.gridGroups.getSelectionModel().getSelection();if(b&&b.length>0){for(var c=0;c<b.length;c++){var d=b[c];if(d){d.set("status","inactive")}}var a=this.gridGroups.getStore();a.save();this.refreshWidgetLaunchMenu()}else{this.showAlert("Error","You must select at least one group to deactivate.")}},doDelete:function(){var b=this.gridGroups.getSelectionModel().getSelection();if(b&&b.length>0){var a=false;for(var c=0;c<b.length;c++){if((b[c].get("name")=="OWF Users"||b[c].get("name")=="OWF Administrators")&&b[c].get("automatic")==true){a=true;break}}var e="This action will permanently delete the selected group(s).";if(a){var d=[];for(var c=0;c<b.length;c++){if((b[c].get("name")=="OWF Users"||b[c].get("name")=="OWF Administrators")&&b[c].get("automatic")==true){d.push(b[c].get("name"))}}if(d.length==1){e='You have chosen to delete <span class="heading-bold">'+b.length+' groups</span>.<br>However, the <span class="heading-bold">'+d[0]+"</span> group cannot be deleted.<br>Pressing OK will permanently delete your other selection(s)."}else{if(d.length==2){e='You have chosen to delete <span class="heading-bold">'+b.length+' groups</span>.<br>However, the <span class="heading-bold">'+d[0]+'</span> and <span class="heading-bold">'+d[1]+"</span> groups cannot be deleted.<br>Pressing OK will permanently delete your other selection(s)."}}for(var c=0;c<b.length;c++){if((b[c].get("name")=="OWF Users"||b[c].get("name")=="OWF Administrators")&&b[c].get("automatic")==true){b[c]=null}}b=Ext.Array.clean(b)}else{if(b.length==1){e='This action will permanently delete <span class="heading-bold">'+Ext.htmlEncode(b[0].data.name)+"</span>."}else{e='This action will permanently delete the selected <span class="heading-bold">'+b.length+" groups</span>."}}this.showConfirmation("Warning",e,function(h,j,i){if(h=="ok"){var f=this.gridGroups.getStore();f.remove(b);var g=f.getTotalCount()-b.length;f.on({write:{fn:function(m,k,o){if(f.data.items.length===0&&f.currentPage>1){var n=f.getPageFromRecordIndex(g-1);var l=(n>=f.currentPage)?f.currentPage:n;f.loadPage(l)}this.gridGroups.getBottomToolbar().doRefresh();this.refreshWidgetLaunchMenu()},single:true,scope:this}});f.save()}})}else{this.showAlert("Error","You must select at least one group to delete.")}},updateDeleteButton:function(a){var d=this.down("#btnDelete");if(a.length==1){if((a.get(0).get("name")=="OWF Users"||a.get(0).get("name")=="OWF Administrators")&&a.get(0).get("automatic")==true){d.disable()}else{d.enable()}}else{if(a.length==2){var b=0;for(var c=0;c<2;c++){if((a.get(c).get("name")=="OWF Users"||a.get(c).get("name")=="OWF Administrators")&&a.get(c).get("automatic")==true){b++}}if(b==2){d.disable()}else{d.enable()}}else{d.enable()}}}});