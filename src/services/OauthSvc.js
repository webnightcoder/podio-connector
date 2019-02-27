
function OauthSvc(oauth2BuilderSvc, htmlService, config, logger){

    this._OauthBuilder      =   oauth2BuilderSvc;

    this._htmlSvc           =   htmlService;

    this._config            =   config;

    this._logger            =   logger;

}

OauthSvc.prototype = {

    authCallback : function(request){
        var self = this;
        var authorized = this.getInternalService().handleCallback(request);
        var htmlContent = authorized ? 'Success! You can close this tab.' : 'Denied. You can close this tab';
        self._logger.log("Html Content Is : " + htmlContent);
        return this._htmlSvc.createHtmlOutput(htmlContent);
    },

    isAuthValid : function(){
        var service = this.getInternalService();

        if(service == null){
            return false;
        }
        this._logger.log("Is Auth Valid :  " + service.hasAccess());
        return service.hasAccess();
    },

    get3PAuthorizationUrls : function(){
        var service = this.getInternalService();
        if (service == null) {
            return '';
        }
        this._logger.log("Authorization URL is : " + service.get3PAuthorizationUrls());
        return service.getAuthorizationUrl();
    },

    resetAuth  : function(){
        this.getInternalService().reset();
    },

    getAccessToken : function(){
        var service = this.getInternalService();
        return service.getAccessToken();
    },

    getInternalService  : function(){
        return this._OauthBuilder.build();
    }
}

if (typeof(exports) !== 'undefined') {
  exports['__esModule'] = true;
  exports['default'] = OauthSvc;
}
