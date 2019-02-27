function OauthBuilderSvc(propertiesSvc, oauth2Service, config, logger){
    
    this._propertiesSvc     =   propertiesSvc;

    this.oauth2Service      =   oauth2Service;

    this._config            =   config;

    this._clientId          =   this._config.PODIO.CLIENT_ID;

    this._clientSecret      =   this._config.PODIO.CLIENT_SECRET;

    this._logger            =   logger;

}

OauthBuilderSvc.prototype = {

    build : function(){
        var self = this;
        return this.oauth2Service.createService('podio')
            .setAuthorizationBaseUrl('https://podio.com/oauth/authorize')
            .setTokenUrl('https://podio.com/oauth/token')
            .setClientId(self._clientId)
            .setClientSecret(self._clientSecret)
            .setPropertyStore(this._propertiesSvc.getUserProperties())
            .setScope('granted_scope_string')
            .setCallbackFunction('authCallback');
    }

}
if (typeof(exports) !== 'undefined') {
  exports['__esModule'] = true;
  exports['default'] = OauthBuilderSvc;;
}
