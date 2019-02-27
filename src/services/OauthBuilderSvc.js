function OauthBuilderSvc(propertiesSvc, oauth2Service, config){
    
    this._propertiesSvc     =   propertiesSvc;

    this.oauth2Service      =   oauth2Service;

    this._config            =   config;

    this._cliendId          =   this._config.PODIO.CLIENT_ID;

    this._clientSecret      =   this._config.PODIO.CLIENT_SECRET;

}

OauthBuilderSvc.prototype = {

    build : function(){
        var self = this;
        return this.oauth2Service.createService('podio')
            .setAuthorizationBaseUrl('https://podio.com/oauth/authorize')
            .setTokenUrl('https://podio.com/oauth/token')
            .setClientId(self._cliendId)
            .setClientSecret(self._clientSecret)
            .setPropertyStore(this._propertiesSvc.getUserProperties())
            .setScope('granted_scope_string')
            .setCallbackFunction('authCallback');
    }

}

module.exports = OauthBuilderSvc;