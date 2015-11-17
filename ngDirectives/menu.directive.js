define(["require","angular"], function(require,ng) { 
    var module=ng.module("app.menu",[]);
	module.directive('menuList',['$location','$q','$http','funcUtils','httpUtils','$rootScope','$state',function($location,$q,$http,funcUtils,httpUtils,$rootScope,$state){
		return {
			trstrice:"EA",
			/*scope:{
				url:"@",
                menudata:"@"
			},*/
			controller:"layoutCtrl",
			templateUrl:cmpConfig.directivesPath+"menu-list.html",
			link:function(scope,ele,attrs){
				if($location.search()["debug"]){
					scope.url = "../testdata/menu.json";
				}
		        $rootScope.$on('$stateChangeStart', 
				function(event, toState, toParams, fromState, fromParams){ 
				/*	httpUtils.httpGet(tempUrl).then(function(data) {
		            scope.menus = data.resultObject || data;
		            if("app"!=$state.current.name)
		            	_setActive(scope.menus,$state.current.name);  
		        }, function() {
		             scope.menus = [];
		        }); */
		        console.log(scope.menus)
				    _setActive(scope.menus,toState.name);
				}); 

				scope.expand=function(menu){
					menu.expand=!menu.expand; 
				}
				_checkUrl=function(state,url){
					return url.indexOf(state)!=-1 
				};
				_setActive=function(children,url){
					console.log(children);
					if(children&&children!=''&&typeof (children)!='undefined'){
						$.each(children,function(i,v){
							v.children = v.children || v.childen;
							v.activate=false;
							if(_checkUrl(v.href,url)&&(!v.children || v.children.length == 0))
								v.activate=true;
							if(v.children&&v.children.length>0){
								_setActive(v.children,url);
							}
						});
					}

				};   
			}
		}
	}]);
});