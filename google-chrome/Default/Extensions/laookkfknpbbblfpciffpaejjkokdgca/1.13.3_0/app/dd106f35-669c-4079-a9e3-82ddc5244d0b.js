var fn_addin=function(l,d,t){var i=i||{};i.styles=i.styles||{},i.commands=i.commands||{},i.dependencies=t||i.dependencies||{},i.styles.style=function(){},i.views=i.views||{},i.collect=i.collect||{},i.models=i.models||{},i.templates=i.templates||{},i.info={addin:"dd106f35-669c-4079-a9e3-82ddc5244d0b",id:"settings_quotes",dependencies:["settings"],commands:["settings.panels.quotes"]},l.console.log(l.elapsed()+": "+i.info.id+" started"),i.templates=i.templates||{},i.templates.custom=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(t,e,s,i){return'<div class="settings-empty loading" data-test="subnav-custom-empty">\n\t<p class="settings-empty-loading"><i class="loading-icon"></i>Loading...</p>\n\t<p class="settings-empty-title empty-add-shortcut">Power up your day with your favorite quotes</p>\n\t<p class="settings-empty-description empty-add-shortcut">Click + Add Quote to get started</p>\n</div>\n\n<ul class="settings-list quote-list hidden" data-test="custom-list"></ul>\n'},useData:!0}),i.templates.favorites=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(t,e,s,i){return'<div class="settings-empty loading" data-test="subnav-favs-empty">\n\t<p class="settings-empty-loading"><i class="loading-icon"></i>Loading...</p>\n\t<p class="settings-empty-title">No favorite quotes yet</p>\n\t<p class="settings-empty-description">Click the heart icon under a quote to start your collection</p>\n</div>\n\n<ul class="settings-list quote-list hidden" data-test="favs-list"></ul>\n'},useData:!0}),i.templates.history=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(t,e,s,i){return'<div class="settings-empty loading">\n\t<p class="settings-empty-loading"><i class="loading-icon"></i>Loading...</p>\n\t<p class="settings-empty-title">No quote history yet</p>\n\t<p class="settings-empty-description">Your past quotes will appear here</p>\n</div>\n\n<ul class="settings-list quote-list hidden" data-test="history-list"></ul>\n<div class="load-more">\n\t<span class="button load-more-button">Load More</span>\n</div>\n'},useData:!0}),i.templates.item=Handlebars.template({1:function(t,e,s,i){var n,o=e.helperMissing,a="function",l=this.escapeExpression;return'\t\t\t--\x3e<span class="control control-svg control-heart u--clickable '+l(typeof(n=null!=(n=e.isFavClass||(null!=t?t.isFavClass:t))?n:o)==a?n.call(t,{name:"isFavClass",hash:{},data:i}):n)+'" title="'+l(typeof(n=null!=(n=e.isFavTitle||(null!=t?t.isFavTitle:t))?n:o)==a?n.call(t,{name:"isFavTitle",hash:{},data:i}):n)+'" data-test="button-fav">\n\t\t\t\t<svg class="icon icon-heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 953 1000" data-test="icon-fav"><path d="M1 329q7-115 79-191h2l2-2q88-76 199-76t191 70q32-28 67-45l2-2h2q56-23 117-23 88-2 161 43t110 124v2l2 4q30 106 10 202t-80 175q-62 88-162 172 0 2-2 2-49 45-107 90-34 25-59 41-33 23-55 23l-6 2-5-2q-28-3-59-29-10-6-21-16t-16-13h-2Q125 692 43 540v-2Q-6 444 1 329zm85 1"></path></svg>\n\t\t\t</span>\x3c!--\n'},3:function(t,e,s,i){return'\t\t\t--\x3e<span class="control control-edit u--clickable" title="Edit" data-test="button-edit"><i class="icon-edit" data-test="icon-edit"></i></span>\x3c!--\n\t\t\t--\x3e<span class="control control-delete u--clickable" title="Delete" data-test="button-delete">\n\t\t\t\t<i class="icon-trash" data-test="icon-delete">\n\t\t\t\t\t<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 24"><path d="M19.15 7.5H2.838a.5.5 0 0 0-.5.5l1.81 14a2 2 0 0 0 2 2h9.954a2 2 0 0 0 2-2L19.65 8a.5.5 0 0 0-.5-.5zm-9.9 13a.75.75 0 0 1-1.5 0v-9a.75.75 0 0 1 1.5 0v9zm5 0a.75.75 0 0 1-1.5 0v-9a.75.75 0 0 1 1.5 0v9zM20.43 4h-4.18a.25.25 0 0 1-.25-.25V2.5A2.5 2.5 0 0 0 13.5 0h-5A2.5 2.5 0 0 0 6 2.5v1.25a.25.25 0 0 1-.25.25h-4.5a1 1 0 0 0 0 2h19.18a1 1 0 0 0 0-2zM8 3.75V2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v1.25a.25.25 0 0 1-.25.25h-5.5A.25.25 0 0 1 8 3.75z" fill-rule="nonzero"/></svg>\n\t\t\t\t</i>\n\t\t\t</span>\x3c!--\n\t\t\t--\x3e<span class="delete-group">\x3c!--\n\t\t\t\t--\x3e<span class="control delete-msg">Delete?</span>\x3c!--\n\t\t\t\t--\x3e<span class="control delete-loading">Deleting...</span>\x3c!--\n\t\t\t\t--\x3e<span class="control delete-failed u--clickable" title="Click to retry">Trouble connecting...</span>\x3c!--\n\t\t\t\t--\x3e<span class="control delete-yes u--clickable" title="Confirm" data-test="button-delete-yes">\n\t\t\t\t\t<i class="icon icon-checkmark">\n\t\t\t\t\t\t<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 577.95 469.42"><polygon points="195.09 469.42 137.44 424.64 140.4 421.42 0 298 46.22 245.43 187.68 369.79 526.33 0 577.95 47.28 229.72 427.53 195.09 469.42"/></svg>\n\t\t\t\t\t</i>\n\t\t\t\t</span>\x3c!--\n\t\t\t\t--\x3e<span class="control delete-no u--clickable" title="Cancel">\n\t\t\t\t\t<i class="icon icon-x">\n\t\t\t\t\t\t<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.97 47.97"><path d="M28.23,24,47.09,5.12A3,3,0,0,0,42.85.88L24,19.74,5.12.88A3,3,0,0,0,.88,5.12L19.74,24,.88,42.85a3,3,0,1,0,4.24,4.24L24,28.23,42.85,47.09a3,3,0,0,0,4.24-4.24Z" transform="translate(0 0)"/></svg>\n\t\t\t\t\t</i>\n\t\t\t\t</span>\n\t\t\t</span>\x3c!--\n'},compiler:[6,">= 2.0.0-beta.1"],main:function(t,e,s,i){var n,o,a=e.helperMissing,l="function",d=this.escapeExpression;return'<div class="view">\n\t<div class="cquote">\x3c!--\n\t\t--\x3e<span class="cquote-body" data-test="body"><span class="quote-mark">&ldquo;</span>'+d(typeof(o=null!=(o=e.body||(null!=t?t.body:t))?o:a)==l?o.call(t,{name:"body",hash:{},data:i}):o)+'<span class="quote-mark">&rdquo;</span></span>\x3c!--\n\t\t--\x3e<span class="cquote-source" data-test="source">'+d(typeof(o=null!=(o=e.source||(null!=t?t.source:t))?o:a)==l?o.call(t,{name:"source",hash:{},data:i}):o)+'</span>\n\t</div>\n\n\t<span class="controls">\x3c!--\n\t\t--\x3e<span class="control control-select u--clickable" title="'+d(typeof(o=null!=(o=e.labelSelect||(null!=t?t.labelSelect:t))?o:a)==l?o.call(t,{name:"labelSelect",hash:{},data:i}):o)+'" data-test="button-activate"><i class="icon-check" data-test="icon-activate"></i><i class="loading-icon"></i><i class="error-icon error-select" title="'+d(typeof(o=null!=(o=e.labelSyncError||(null!=t?t.labelSyncError:t))?o:a)==l?o.call(t,{name:"labelSyncError",hash:{},data:i}):o)+'">!</i></span>\x3c!--\n'+(null!=(n=e.if.call(t,null!=t?t.showFavControl:t,{name:"if",hash:{},fn:this.program(1,i,0),inverse:this.noop,data:i}))?n:"")+(null!=(n=e.if.call(t,null!=t?t.onCustomSubnav:t,{name:"if",hash:{},fn:this.program(3,i,0),inverse:this.noop,data:i}))?n:"")+' \t--\x3e</span>\n</div>\n\n<form class="edit quote-form list-edit-form">\x3c!--\n\t--\x3e<textarea class="list-edit-body textarea-body autoexpand" rows="1" placeholder="Quote" maxlength="'+d(typeof(o=null!=(o=e.inputLengthMaxHtml||(null!=t?t.inputLengthMaxHtml:t))?o:a)==l?o.call(t,{name:"inputLengthMaxHtml",hash:{},data:i}):o)+'" data-test="body-edit">'+d(typeof(o=null!=(o=e.body||(null!=t?t.body:t))?o:a)==l?o.call(t,{name:"body",hash:{},data:i}):o)+'</textarea>\x3c!--\n\t--\x3e<input type="text" class="list-edit-source input input-source" value="'+d(typeof(o=null!=(o=e.source||(null!=t?t.source:t))?o:a)==l?o.call(t,{name:"source",hash:{},data:i}):o)+'" maxlength="'+d(typeof(o=null!=(o=e.inputLengthMaxHtmlSource||(null!=t?t.inputLengthMaxHtmlSource:t))?o:a)==l?o.call(t,{name:"inputLengthMaxHtmlSource",hash:{},data:i}):o)+'" placeholder="Source">\x3c!--\n\t--\x3e<span class="buttons">\x3c!--\n  \t--\x3e<span class="char-count"></span>\x3c!--\n\t\t--\x3e<button class="button submit"><i class="loading-icon"></i><i class="error-icon" title="'+d(typeof(o=null!=(o=e.labelSyncError||(null!=t?t.labelSyncError:t))?o:a)==l?o.call(t,{name:"labelSyncError",hash:{},data:i}):o)+'">!</i>Save</button>\x3c!--\n    --\x3e<button class="cancel u--clickable">Cancel</button>\x3c!--\n\t--\x3e</span>\n</form>\n'},useData:!0}),i.templates.main=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(t,e,s,i){var n,o=e.helperMissing,a="function",l=this.escapeExpression;return'\x3c!-- Header --\x3e\n\n<div class="subpanel-header">\n\t<span class="button-advanced" data-test="button-settings">Settings<i class="icon icon-angle-down"></i></span>\n\t<h3>'+l(typeof(n=null!=(n=e.title||(null!=t?t.title:t))?n:o)==a?n.call(t,{name:"title",hash:{},data:i}):n)+'</h3>\n\t<p class="description">'+l(typeof(n=null!=(n=e.description||(null!=t?t.description:t))?n:o)==a?n.call(t,{name:"description",hash:{},data:i}):n)+'</p>\n</div>\n\n\n\x3c!-- Feeds --\x3e\n\n<div class="wrapper-advanced">\n\t<h4>Feeds</h4>\n\t<ul class="settings-list">\n\t\t<li class="slide-toggle has-toggle '+l(typeof(n=null!=(n=e.feedMomentumClass||(null!=t?t.feedMomentumClass:t))?n:o)==a?n.call(t,{name:"feedMomentumClass",hash:{},data:i}):n)+'" id="feed-momentum-slider">\n\t\t\t<span class="toggle-slider"><svg class="toggle-switch" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50"/></svg></span>\n\t\t\t<span class="setting-name">Momentum Quotes</span>\n\t\t\t<span class="option-message">See a daily quote from our curated feed</span>\n\t\t</li>\n\t\t<li class="slide-toggle has-toggle '+l(typeof(n=null!=(n=e.feedCustomClass||(null!=t?t.feedCustomClass:t))?n:o)==a?n.call(t,{name:"feedCustomClass",hash:{},data:i}):n)+'" id="feed-custom-slider" data-test="feed-custom-slider">\n\t\t\t<span class="toggle-slider"><svg class="toggle-switch" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50"/></svg></span>\n\t\t\t<span class="setting-name">'+l(typeof(n=null!=(n=e.labelCustom||(null!=t?t.labelCustom:t))?n:o)==a?n.call(t,{name:"labelCustom",hash:{},data:i}):n)+'</span>\n\t\t\t<span class="badge plus-badge">PLUS</span>\n\t\t\t<span class="option-message">Add your own quotes and change the quote anytime</span>\n\t\t</li>\n\t</ul>\n</div>\n\n\n\x3c!-- Subnav + add button --\x3e\n\n<nav class="settings-subnav">\n\t<div class="subnav-titles">\n\t\t<h4 class="custom" data-test="subnav-custom">'+l(typeof(n=null!=(n=e.labelCustom||(null!=t?t.labelCustom:t))?n:o)==a?n.call(t,{name:"labelCustom",hash:{},data:i}):n)+'</h4>\x3c!--\n\t\t--\x3e<h4 class="favorites" data-test="subnav-favs">Favorites</h4>\x3c!--\n\t\t--\x3e<h4 class="history" data-test="subnav-history">History</h4>\n\t</div>\n\t<button class="button list-add-button" data-test="button-add">'+l(typeof(n=null!=(n=e.labelAdd||(null!=t?t.labelAdd:t))?n:o)==a?n.call(t,{name:"labelAdd",hash:{},data:i}):n)+'</button>\n</nav>\n<div class="settings-subnav-placeholder"></div>\n\n\n\x3c!-- Add form + lists --\x3e\n\n<div class="list-wrapper has-subnav">\n\t<form class="quote-form list-add-form">\x3c!--\n\t\t--\x3e<textarea class="list-add-body textarea-body autoexpand" rows="1" placeholder="Quote" maxlength="'+l(typeof(n=null!=(n=e.inputLengthMaxHtml||(null!=t?t.inputLengthMaxHtml:t))?n:o)==a?n.call(t,{name:"inputLengthMaxHtml",hash:{},data:i}):n)+'" data-test="textarea-body"></textarea>\x3c!--\n\t\t--\x3e<input type="text" class="list-add-source input input-source" maxlength="'+l(typeof(n=null!=(n=e.inputLengthMaxHtmlSource||(null!=t?t.inputLengthMaxHtmlSource:t))?n:o)==a?n.call(t,{name:"inputLengthMaxHtmlSource",hash:{},data:i}):n)+'" placeholder="Source" data-test="input-source">\x3c!--\n\t\t--\x3e<span class="buttons">\x3c!--\n    \t--\x3e<span class="char-count"></span>\x3c!--\n      \t--\x3e<button class="button submit" data-test="button-submit"><i class="loading-icon"></i><i class="error-icon" title="'+l(typeof(n=null!=(n=e.labelSyncError||(null!=t?t.labelSyncError:t))?n:o)==a?n.call(t,{name:"labelSyncError",hash:{},data:i}):n)+'">!</i>Add</button>\x3c!--\n        --\x3e<button class="cancel u--clickable">Cancel</button>\n\t\t\t</span>\n\t</form>\n\n\t<div class="list-body list-body-custom"></div>\n\t<div class="list-body list-body-favorites"></div>\n\t<div class="list-body list-body-history"></div>\n</div>\n'},useData:!0}),i.styles=i.styles||{},i.styles.style=function(){var t=document.createElement("style");t.type="text/css",t.innerHTML=".settings-quotes .list-wrapper{margin-right:-30px;margin-left:-30px;padding-right:30px;padding-left:30px;user-select:text}.settings-quotes .list-add-form{padding-top:5px}.settings-quotes .list-edit-form{padding:3px 0 6px}.settings-quotes .list-edit-body{padding-top:0}.quote-form .textarea-body{margin-bottom:5px;background:0 0;box-sizing:border-box;overflow:hidden;resize:none}.quote-form .input-source{width:60%}.quote-form .buttons{margin-top:1px;float:right}.quote-form .char-count{margin-right:8px}.quote-form .submit{margin:0;padding:6px 23px;position:relative}.quote-form .submit.disabled{cursor:auto;opacity:.5}.quote-form .submit.disabled:hover{background:rgba(255,255,255,.3)}.light .quote-form .submit.disabled:hover{background:rgba(0,0,0,.4)}.quote-form .submit .loading-icon{top:8px;left:7px}.quote-form .submit .error-icon{top:7px;left:7px}.quote-form .cancel{padding:5px 10px}.quote-list{display:block}.delete-group.loading .delete-no,.delete-group.loading .delete-yes,.quote-item .delete-group.loading .delete-msg,.quote-list.hidden{display:none}.quote-item{padding-left:8px}.quote-item .cquote{margin-right:100px;text-indent:-7px}.quote-item .quote-mark{opacity:.5}.quote-item .cquote-source{margin:3px 0 0 3px;font-size:85%;opacity:.5}.quote-item .delete-group .delete-loading{display:none;opacity:.5}.quote-item .delete-group.loading .delete-loading{display:inline-block}.delete-group.failed .delete-no,.delete-group.failed .delete-yes,.quote-item .delete-group .delete-failed,.quote-item .delete-group.failed .delete-msg{display:none}.quote-item .delete-group.failed .delete-failed,.quote-item.loading .control-select .loading-icon{display:inline-block}.quote-item.failed .controls,.quote-item.loading .controls,.quote-item.selected .control-select,.quote-item.selected .controls{opacity:1}.quote-item.selected .control-select:hover{cursor:auto;opacity:1}.quote-item .control-select .loading-icon{top:-4px;left:-10px}.quote-item.loading .control-select .icon-check{display:none}.quote-item .control-select .error-icon{position:relative}.quote-item.failed .control-select .error-select{display:inline-block}.quote-item.failed .control-select .icon-check{display:none}",document.getElementsByTagName("head")[0].appendChild(t)},i.collect.Quotes=Backbone.Collection.extend({initialize:function(){this.model=i.models.Quote,this.listenTo(this,"reset",this.onReset)},onReset:function(){this.loadedOnce=!0},comparator:function(t,e){var s=this.sortAttribute||"sort_order",i=t.get(s),n=e.get(s);return i==n?0:i<n?this.reverse_sort?1:-1:n<i?this.reverse_sort?-1:1:void 0}}),i.models.Quote=Backbone.Model.extend({defaults:function(){return{body:"New Quote",source:"Unknown",display_date:l.date()}},save:function(t,e){(e=e||{}).patch=!0,Backbone.Model.prototype.save.call(this,t,e)},setActive:function(e,s){var t=l.globals.urlRootApi+"settings/quote/active",i={},n=this.get("_id")||this.get("id");this.get("is_custom")?i.custom_quote_id=n:i.quote_id=n,d.ajax({type:"POST",contentType:"application/json",beforeSend:setMomentumAuthHeader,data:JSON.stringify(i),url:t}).done(function(t){t&&t.success?(l.trigger("sync:download","quote"),e(this)):s(this)}).fail(function(){s(this)})},getFriendlyDate:function(t){return getFriendlyDate(t)}}),i.models.QuoteSettingsManager=Backbone.Model.extend({feedCustomName:"quote-feed-custom",feedMomentumName:"quote-feed-momentum",gaTitle:"Quote Settings",labelCustom:"My Quotes",newModels:[],initialize:function(){this.plusUser=l.conditionalFeatures.featureEnabled("plus"),this.settings=new l.models.GenericSettings("settings/quote"),this.CustomQuotes(),this.listenTo(l,"quote:favorite",this.onQuoteFavorited),this.listenTo(l,"quote:active_changed",this.onActiveQuoteChanged)},onQuoteFavorited:function(t){if(this.favorites){var e=this.favorites.get(t.id);e?(e.set({is_favorite:t.is_favorite,last_updated:l.date().toISOString()}),this.favorites.sort()):this.favorites.fetch()}if(this.history){var s=this.history.findWhere({_id:t.id});s?(s.set({is_favorite:t.is_favorite,last_updated:l.date().toISOString()}),this.history.sort()):this.history.fetch()}},onActiveQuoteChanged:function(t){if(this.lastActiveQuote!==t&&this.history){var e=this.history.at(0);if(e&&e.get("_id")!==t){var s=this.history.findWhere({_id:t});if(!s&&this.collection&&(s=this.collection.findWhere({id:t})),!s&&this.favorites&&(s=this.favorites.findWhere({id:t})),s){var i=s.clone();i.has("_id")||i.set("id",t),i.set("sort_order",i.get("sort_order")+"-"+l.now()),i.prepend=!0,this.history.add(i),this.history.sort(),this.lastActiveQuote=t}}}},CustomQuotes:function(){return this.collection||(this.collection=new i.collect.Quotes,this.collection.url=l.globals.urlRoot+"settings/quote/quotes",this.listenTo(this.collection,"remove",this.onCollectionRemove),this.listenTo(this.collection,"user-change",this.onCollectionUserChange)),this.collection},customEmpty:function(){return 0===this.collection.length},Favorites:function(){return this.favorites||(this.favorites=new i.collect.Quotes,this.favorites.url=l.globals.urlRoot+"quotes/favorites",this.favorites.sortAttribute="last_updated",this.favorites.reverse_sort=!1),this.favorites},History:function(){var e=this;return this.history||(this.history=new i.collect.Quotes,this.history.url=l.globals.urlRoot+"quotes/history",this.history.reverse_sort=!0,this.history.load_more=l.utils.getActiveDateString(),this.history.parse=function(t){return e.history.load_more=t.load_more,t.history}),this.history},LoadMoreHistory:function(){this.history.load_more&&this.history.fetch({remove:!1,data:{priorToDate:this.history.load_more}})},onCollectionRemove:function(){l.trigger("sync:download","quote"),this.customEmpty()&&this.collection.trigger("user-change"),this.history&&(this.history.loadedOnce=!1),this.favorites&&(this.favorites.loadedOnce=!1)},toggleFavorite:function(e,s){var t=l.globals.urlRootApi+"quotes/favorites",i=e.get("_id")||e.get("id"),n=!e.get("is_favorite"),o=e.get("is_custom"),a={operation:"favorite",active_uuid:i,is_favorite:n,is_custom:o};try{d.ajax({type:"POST",contentType:"application/json",beforeSend:setMomentumAuthHeader,data:JSON.stringify(a),url:t}).done(function(t){t&&t.success&&(e.set({is_favorite:n}),l.trigger("sync:download","quote"),l.trigger("quote:favorite",{id:a.active_uuid,is_favorite:a.is_favorite}))}).fail(function(t,e){s&&s()})}catch(t){l.commandManager.execute("notification.show.enhanced","Connection error."),s&&s()}},toggleFeedMomentum:function(){this.plusUser&&(this.settings.toggle(this.feedMomentumName),sendEventToggleFeed(this.gaTitle,"Toggle Momentum",this.settings.get(this.feedMomentumName)))},toggleFeedCustom:function(){this.plusUser?(this.settings.toggle(this.feedCustomName),sendEventToggleFeed(this.gaTitle,"Toggle Custom",this.settings.get(this.feedCustomName))):this.showPlusUpsellNotif()},showPlusUpsellNotif:function(){var t={targetRegion:"settings",sourceEvent:"customQuotes-toggleFeed",buttonText:"Learn more",title:this.labelCustom,description:"Activate your favorite quotes or add your own"};l.commandManager.execute("upsell.message",t)},onCollectionUserChange:function(){var t=this.settings.get(this.feedCustomName),e=this.customEmpty();e||t||this.toggleFeedCustom(),e&&t&&this.toggleFeedCustom()}}),i.views.Custom=Backbone.View.extend({template:i.templates.custom,events:{"click .empty-add-shortcut":"handleEmptyAddShortcutClick"},initialize:function(t){this.main=t.main,this.subViews=[],l.quoteSettingsManager||(l.quoteSettingsManager=new i.models.QuoteSettingsManager),this.manager=l.quoteSettingsManager,this.collection=this.manager.CustomQuotes(),this.listenTo(this.collection,"reset",this.addAll),this.listenTo(this.collection,"add",this.onCollectionAdd),this.listenTo(this.collection,"update",this.handleCollectionUpdate),this.listenTo(this.manager,"toggle-add-form",this.handleToggleAddForm)},render:function(){return this.$el.html(this.template()),this.main.setSubnavViewVars(this),this.main.expiredPlusUser||this.main.plusUser?this.collection.loadedOnce?this.addAll():this.collection.fetch({reset:!0}):this.$empty.removeClass("loading"),this},addAll:function(){subnavAddAll(this,!1,this.$quoteList,this.main.syncActiveItem.bind(this.main))},addOne:function(t,e){var s=new i.views.CustomQuote({model:t,main:this.main,subnav:"custom"});subnavAddOne(this,s,this.$quoteList,!0,e)},onCollectionAdd:function(t){this.addOne(t,!0),this.collection.trigger("user-change")},handleCollectionUpdate:function(){handleCollectionUpdateCustom(this.main,this.$empty,this.manager.customEmpty())},handleToggleAddForm:function(){this.manager.customEmpty()&&!this.main.deletingFinalItem&&this.$empty.mToggle("block",this.main.$addForm.is(":visible"))},handleEmptyAddShortcutClick:function(){this.main.handleClickAddButton()}}),i.views.Favorites=Backbone.View.extend({template:i.templates.favorites,initialize:function(t){this.main=t.main,this.subViews=[],l.quoteSettingsManager||(l.quoteSettingsManager=new i.models.QuoteSettingsManager),this.collection=l.quoteSettingsManager.Favorites(),this.listenTo(this.collection,"reset sync",this.addAll),this.listenTo(this.collection,"add",this.onCollectionAdd),this.listenTo(this.collection,"update",this.handleCollectionUpdate)},render:function(){return this.$el.html(this.template()),this.main.setSubnavViewVars(this),this.collection.loadedOnce?this.addAll():this.collection.fetch({reset:!0}),this},addAll:function(){subnavAddAll(this,!1,this.$quoteList,this.main.syncActiveItem.bind(this.main))},addOne:function(t){if(t.get("is_favorite")){var e=new i.views.CustomQuote({model:t,main:this.main,subnav:"favorites"});subnavAddOne(this,e,this.$quoteList,!0,!1)}},onCollectionAdd:function(t){this.addOne(t)},handleCollectionUpdate:function(){updateEmptyState(this)}}),i.views.History=Backbone.View.extend({template:i.templates.history,events:{"click .load-more-button":"loadMore"},initialize:function(t){this.main=t.main,this.subViews=[],l.quoteSettingsManager||(l.quoteSettingsManager=new i.models.QuoteSettingsManager),this.collection=l.quoteSettingsManager.History(),this.listenTo(this.collection,"reset sync",this.addAll),this.listenTo(this.collection,"add",this.onCollectionAdd),this.listenTo(this.collection,"update",this.handleCollectionUpdate)},render:function(){return this.$el.html(this.template()),this.main.setSubnavViewVars(this),this.collection.loadedOnce?this.addAll():this.collection.fetch({reset:!0}),this},addAll:function(){subnavAddAll(this,!1,this.$quoteList,this.main.syncActiveItem.bind(this.main),subnavHistoryUpdateLoadMore.bind(this))},addOne:function(t){var e=new i.views.CustomQuote({model:t,main:this.main,subnav:"history"});subnavAddOne(this,e,this.$quoteList,t.prepend,!1)},onCollectionAdd:function(t){this.addOne(t)},handleCollectionUpdate:function(){updateEmptyState(this),this.main.syncActiveItem()},loadMore:function(t){subnavHistoryLoadMore(t,this,l.quoteSettingsManager)}}),i.views.CustomQuote=Backbone.View.extend({attributes:{class:"content-item quote-item","data-test":"item"},tagName:"li",template:i.templates.item,events:{"click .control-select":"handleClickSetActive","click .control-heart":"handleClickFavorite","click .control-edit":"handleClickEdit","click .control-delete":"toggleDeleteConf","click .delete-yes":"deleteItem","click .delete-no":"toggleDeleteConf","click .delete-failed":"deleteItem","keyup .list-edit-form":"handleKeyupEsc","keypress .list-edit-form":"handleKeypressEnter","click .submit":"processEditForm","click .cancel":"handleClickCancel"},initialize:function(t){this.main=t.main,this.subnav=t.subnav,this.manager=this.main.manager,this.listenTo(this.model,"change",this.render),this.listenTo(this.model,"destroy",onDestroyModel),this.listenTo(this.manager,"item-editing",preventMultipleEdits),this.listenTo(this.manager,"toggle-add-form",returnToViewMode)},render:function(){this.isFavorite=this.model.get("is_favorite"),this.quoteId=this.model.get("_id")||this.model.id;var t={body:this.model.get("body"),source:this.model.get("source")||this.model.defaults.source,labelSelect:this.main.labelSelect,showFavControl:"favorites"===this.subnav||"history"===this.subnav,isFavClass:this.isFavorite?"active":"",isFavTitle:this.isFavorite?"Unfavorite":"Favorite",onCustomSubnav:"custom"===this.subnav,labelSyncError:this.main.labelSyncError,inputLengthMaxHtml:this.main.inputLengthMaxHtml,inputLengthMaxHtmlSource:this.main.inputLengthMaxHtmlSource};return this.$el.html(this.template(t)),this.setViewVars(),this.$el.attr("data-quote-id",this.quoteId),this.updateTooltip(),this},setViewVars:function(){this.$deleteGroup=this.$(".delete-group"),this.$listEditForm=this.$(".list-edit-form"),this.$listEditBody=this.$(".list-edit-body"),this.$listEditSource=this.$(".list-edit-source")},updateTooltip:function(){this.$el.attr("title",this.$el.hasClass("editing")?"":this.model.getFriendlyDate(this.model.get("display_date")))},handleClickSetActive:function(){this.main.plusUser?(this.setQuoteActive(),l.sendEvent(this.manager.gaTitle,"Set Active")):this.manager.showPlusUpsellNotif()},setQuoteActive:function(){var t=this;l.models.quoteManager.setActiveInProgress||this.$el.hasClass("selected")||(this.setActiveInProgress=!0,l.models.quoteManager.setActiveInProgress=!0,this.$el.removeClass("failed").addClass("loading"),this.model.setActive(function(){t.$el.removeClass("loading"),t.setActiveInProgress=!1,l.models.quoteManager.setActiveInProgress=!1,t.model.get("is_custom")&&t.main.collection.trigger("user-change")},function(){t.$el.removeClass("loading").addClass("failed"),t.setActiveInProgress=!1,l.models.quoteManager.setActiveInProgress=!1}))},handleClickFavorite:function(){l.sendEvent(this.manager.gaTitle,"Favorite",this.model.get("is_favorite")?"unfavorite":"favorite"),l.quoteSettingsManager.toggleFavorite(this.model)},handleClickEdit:function(){this.$listEditForm.removeClass("loading failed"),changeToEditMode(this,this.$listEditBody),this.updateTooltip()},toggleDeleteConf:function(){toggleDeleteConf(this)},deleteItem:function(){var t=this;this.$deleteGroup.hasClass("loading")||(this.$deleteGroup.removeClass("failed").addClass("loading"),this.model.destroy({wait:!0,success:function(){t.$deleteGroup.removeClass("loading")},error:function(){t.$deleteGroup.removeClass("loading").addClass("failed")}}),l.sendEvent(this.manager.gaTitle,"Delete"))},handleKeypressEnter:function(t){handleKeypressEnter(t,this.processEditForm.bind(this))},handleKeyupEsc:function(t){handleKeyupEsc(t,this.abortEdit.bind(this))},processEditForm:function(t){this.main.processForm(t,this.$listEditForm,this.updateItem.bind(this))},updateItem:function(t,e){var s=this;this.model.save(t,{wait:!0,success:function(){e.removeClass("loading"),l.trigger("sync:download","quote"),getOutOfEditMode(s),s.main.collection.trigger("user-change")},error:function(){e.removeClass("loading").addClass("failed")}}),l.sendEvent(this.manager.gaTitle,"Edit")},handleClickCancel:function(t){t.preventDefault(),this.abortEdit()},abortEdit:function(){this.$listEditBody.val(this.model.get("body")),this.$listEditSource.val(this.model.get("source")),getOutOfEditMode(this)},destroy:function(){this.remove(),this.unbind()}});var e=i.dependencies.settings;return i.views.Main=e.views.SettingsPanel.extend({attributes:{id:"settings-quotes",class:"settings-view settings-content settings-quotes settings-online","data-test":"settings-quotes"},deletingFinalItem:!1,inputLengthMaxDatabase:250,inputLengthMaxHtml:260,inputLengthMaxHtmlSource:100,inputLengthShow:50,inputLengthWarn:100,itemEditingId:null,labelAdd:"+ Add Quote",labelDeselect:"(Already Active)",labelSelect:"Set Active",labelSyncError:"Trouble connecting… Click to retry",panelid:"quotes",subnav:void 0,template:i.templates.main,events:{"click .button-advanced":"toggleAdvanced","click #feed-custom-slider":"toggleFeedCustom","click #feed-momentum-slider":"toggleFeedMomentum","click .list-add-button":"handleClickAddButton","keyup .list-add-form":"handleKeyupEsc","keypress .list-add-form":"handleKeypressEnter","click .list-add-form .submit":"processAddForm","click .list-add-form .cancel":"cancelAdd","focus .textarea-body":"updateCharCount","input .textarea-body":"updateCharCount","focus textarea.autoexpand":"textareaAutoexpandInitial","input textarea.autoexpand":"textareaAutoexpandLive","click .subnav-titles .custom":"selectCustom","click .subnav-titles .favorites":"selectFavorites","click .subnav-titles .history":"selectHistory"},initialize:function(t){t&&(this.subnav=t.subnav),l.quoteSettingsManager||(l.quoteSettingsManager=new i.models.QuoteSettingsManager),this.manager=l.quoteSettingsManager,this.plusUser=l.conditionalFeatures.featureEnabled("custom-quote"),this.expiredPlusUser=l.conditionalFeatures.featureEnabled("custom-quote-degraded"),this.settings=this.manager.settings,this.listenTo(this.settings,"change",this.updateSettings),this.listenTo(this.settings,"change:allocation_changed",this.allocationChanged),this.listenTo(l,"quote:downloaded",this.syncActiveItem),this.plusUser&&this.settings.fetch(),(this.expiredPlusUser||this.plusUser)&&(this.collection=this.manager.CustomQuotes()),l.sendEvent(this.manager.gaTitle,"Panel Opened")},render:function(){var t={description:"A daily reminder for inspiration and growth",inputLengthMaxHtml:this.inputLengthMaxHtml,inputLengthMaxHtmlSource:this.inputLengthMaxHtmlSource,labelAdd:this.labelAdd,labelCustom:this.manager.labelCustom,labelSyncError:this.labelSyncError,title:"Quotes"};return this.$el.html(this.template(d.extend(t,getInitialFeedSettings(this.manager)))),this.setViewVars(),this.plusUser?this.renderCustom():(this.$feedMomentumSlider.addClass("fixed"),this.renderHistory()),this},setViewVars:function(){setFeedVars(this),this.$addButton=this.$(".list-add-button"),this.$addForm=this.$(".list-add-form"),this.$addBody=this.$(".list-add-body"),this.$addSource=this.$(".list-add-source"),this.$customList=this.$(".list-body-custom"),this.$favoritesList=this.$(".list-body-favorites"),this.$historyList=this.$(".list-body-history")},setSubnavViewVars:function(t){t.$empty=t.$(".settings-empty"),t.$quoteList=t.$(".quote-list")},selectCustom:function(t){this.selectSubnav("custom",t,this.renderCustom.bind(this))},selectFavorites:function(t){this.selectSubnav("favorites",t,this.renderFavorites.bind(this))},selectHistory:function(t){this.selectSubnav("history",t,this.renderHistory.bind(this))},selectSubnav:function(t,e,s){e.stopPropagation(),this.subnav!==t?(this.hideAddForm(),this.resetAdd(),s(),l.sendEvent(this.manager.gaTitle,"Select Subnav",t)):toggleClassTwice(d(e.currentTarget),"active")},renderCustom:function(){this.customView||(this.customView=new i.views.Custom({el:this.$customList,main:this})),renderSubnav(this,this.customView,"custom")},renderFavorites:function(){this.favoritesView||(this.favoritesView=new i.views.Favorites({el:this.$favoritesList,main:this})),renderSubnav(this,this.favoritesView,"favorites")},renderHistory:function(){this.historyView||(this.historyView=new i.views.History({el:this.$historyList,main:this})),renderSubnav(this,this.historyView,"history")},updateSettings:function(){updateFeedSettings(this)},allocationChanged:function(){this.settings.has("allocation_changed")&&l.trigger("sync:download","quote")},syncActiveItem:function(){if(l.models.customization.get("quoteVisible")){var t=l.models.quoteManager.getActiveItem().get("_id");this.syncActiveItemHelper(this.$customList,t),this.syncActiveItemHelper(this.$favoritesList,t),this.syncActiveItemHelper(this.$historyList,t)}},syncActiveItemHelper:function(t,e){t.find(".quote-item.selected").removeClass("selected").find(".control-select").attr("title",this.labelSelect),t.find('[data-quote-id="'+e+'"]').first().addClass("selected").find(".control-select").attr("title",this.labelDeselect)},toggleAdvanced:function(){toggleAdvanced(this)},toggleFeedMomentum:function(t){t.stopPropagation(),this.manager.toggleFeedMomentum()},toggleFeedCustom:function(t){t.stopPropagation(),this.manager.toggleFeedCustom()},handleClickAddButton:function(){this.plusUser?this.toggleAddForm():this.manager.showPlusUpsellNotif()},toggleAddForm:function(){"custom"!==this.subnav&&this.renderCustom(),this.manager.trigger("toggle-add-form"),this.$addForm.is(":visible")?this.hideAddForm():(this.$addButton.hide(),this.$addForm.css("display","block"),this.$addBody.trigger("focus"))},hideAddForm:function(){this.$addButton.css("display","block"),this.$addForm.hide()},resetAdd:function(t){this.$addBody.val(""),this.$addSource.val(""),t||this.$addBody.trigger("focus"),this.$addForm.removeClass("loading failed")},handleKeypressEnter:function(t){handleKeypressEnter(t,this.processAddForm.bind(this))},handleKeyupEsc:function(t){handleKeyupEsc(t,this.cancelAdd.bind(this))},processAddForm:function(t){this.processForm(t,this.$addForm,this.createItem.bind(this))},createItem:function(t,e){var s=this;this.collection.create(t,{wait:!0,success:function(){s.resetAdd(!1)},error:function(){e.removeClass("loading").addClass("failed")}}),l.sendEvent(this.manager.gaTitle,"Add")},cancelAdd:function(t){cancelAddGeneral(this,t)},updateCharCount:function(t){updateCharCount(t,this,this.updateSubmitButton.bind(this),d(t.currentTarget.form).find(".textarea-body"))},updateSubmitButton:function(t,e,s){var i=0===e||s<0;t.find(".submit").prop("disabled",i).toggleClass("disabled",i)},processForm:function(t,e,s){if(t&&t.preventDefault(),!e.find(".submit").prop("disabled")&&!e.hasClass("loading")){var i=this.validateForm(e),n={body:i.body,source:i.source};i.valid&&(e.removeClass("failed").addClass("loading"),s(n,e))}},validateForm:function(t){var e=t.find(".textarea-body"),s=t.find(".input-source"),i=this.ensureEndsInPeriod(this.removeQuotationMarks(e.val().trim()));return{valid:!!i,body:i,source:s.val().trim()}},removeQuotationMarks:function(t){var e=[34,39,8216,8217,8220,8221];return _.contains(e,t.charCodeAt(0))&&(t=t.slice(1)),_.contains(e,t.charCodeAt(t.length-1))&&(t=t.slice(0,-1)),t},ensureEndsInPeriod:function(t){return!!t&&(endsWithEndPunctuation(t)||(t+="."),t)},textareaAutoexpandInitial:function(t){var e=t.currentTarget,s=e.value;e.value="",e.rows=1,e.baseScrollHeight=e.scrollHeight;var i=getComputedStyle(e);e.baseContentHeight=e.baseScrollHeight-parseInt(i.paddingTop,10)-parseInt(i.paddingBottom,10),e.value=s,this.textareaAutoexpandLive(t)},textareaAutoexpandLive:function(t){var e,s=t.currentTarget;s.rows=1,e=Math.ceil((s.scrollHeight-s.baseScrollHeight)/s.baseContentHeight),s.rows=1+e}}),l.commandManager&&l.commandManager.registerCommand("settings.panels.quotes",function(t){return new i.views.Main(t)}),i.styles.style(),l.trigger("settings:register:nav",{id:"quote-settings",title:"Quotes",cmd:"settings.panels.quotes",position:35}),i};m.addinManager&&m.addinManager.registerAddinFn("dd106f35-669c-4079-a9e3-82ddc5244d0b",fn_addin);