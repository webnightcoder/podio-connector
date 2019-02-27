
if (typeof(require) !== 'undefined') {
var OauthBuilderSvc     =   require('./services/OauthBuilderSvc.js')['default'],
    OauthSvc            =   require('./services/OauthSvc.js')['default'],
    CONF                =   require('./conf.js')['default'],
    LOGGER              =   require('./services/logger.js')['default'];
}

LOGGER.setLogger(CONF);

function ConnectorSvc(services){
    this._services      =   services;

    this._logger        =   LOGGER;
}
ConnectorSvc.prototype = {
    getSchema : function(){
        return {
            schema : [
                {
                    name : 'orgnization_id',
                    label : "Orgnization Id",
                    dataType : "STRING",
                    semantics: {
                        conceptType: 'DIMENSION'
                    }
                },
                {
                    name : 'space_id',
                    label : "Space Id",
                    dataType : "STRING",
                    semantics: {
                        conceptType: 'DIMENSION'
                    }
                },
                {
                    name : 'app_id',
                    label : "App Id",
                    dataType : "STRING",
                    semantics: {
                        conceptType: 'DIMENSION'
                    }
                }
            ]
        }
    },

    getConfig : function(){
        return {
            dateRangeRequired : true
        }
    },

    getAuthType : function(){
        return { type : "OAUTH2" }
    },

    isAdminUser : function(){
        return true;
    },

    authCallback : function(request){
        return this.getOauthService().authCallback(request);
    },

    isAuthValid : function(request){
        return this.getOauthService().isAuthValid()
    },

    get3PAuthorizationUrls : function(){
        return this.getOauthService().get3PAuthorizationUrls();
    },

    resetAuth : function(){
        this.getOauthService().resetAuth();
    },
    
    getOauthService : function(){
        var builder = new OauthBuilderSvc(this._services.PropertiesService, this._services.OAuth2, CONF, this._logger);
        return new OauthSvc(builder, this._services.HtmlService, CONF, this._logger);
    },

    getData : function(request){

        var dataSchema = this.prepareSchema(request);
        var apiKey = this.getOauthService().getAccessToken();
        this._logger.log('API KEY is : ' + apiKey);
        // var spotifyClient = new SpotifyClient(this.services.CacheService, this.services.UrlFetchApp, apiKey);

        return this.buildTabularData(plays, dataSchema);
    },
    
    prepareSchema : function(){
        var dataSchema = [];
        var fixedSchema = this.getSchema().schema;
        request.fields.forEach(function(field) {
            for (var i = 0; i < fixedSchema.length; i++) {
            if (fixedSchema[i].name == field.name) {
                dataSchema.push(fixedSchema[i]);
                break;
            }
            }
        });

        return dataSchema;
    },
    
    buildTabularData  : function(){
        // var dataBuilder = new Data
        return {
            schema: dataSchema,
            rows: [{},{}]
        }
    }
}

if (typeof(exports) !== 'undefined') {
  exports['__esModule'] = true;
  exports['default'] = connectorSvc;;
}