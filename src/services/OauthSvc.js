
function OauthSvc(oauth2BuilderSvc, htmlService, config){

    this._OauthBuilder      =   oauth2BuilderSvc;

    this._htmlSvc           =   htmlService;

    this._config            =   config;

}

OauthSvc.prototype = {

    authCallback : function(request){
        var self = this;
        var authorized = this.getInternalService().handleCallback(request);
        var htmlContent = authorized ? 'Success! You can close this tab.' : 'Denied. You can close this tab';
        return this.htmlService.createHtmlOutput(htmlContent);
    },

    isAuthValid : function(){
        var service = this.getInternalService();

        if(service == null){
            return false;
        }
        return service.hasAccess();
    },

    get3PAuthorizationUrls : function(){
        var service = this.getInternalService();
        if (service == null) {
            return '';
        }
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
