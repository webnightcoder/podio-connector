var OauthBuilderSvc     =   require('./services/OauthBuilderSvc.js'),
    OauthSvc            =   require('./services/OauthSvc.js');

function ConnectorSvc(services){

    this._services      =   services;

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
        return {type : "OAUTH2"}
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
        var builder = new Oauth2Builder(this.services.PropertiesService, this.services.OAuth2);
        return new OauthSvc(builder, this.services.HtmlService);
    },

    getData : function(request){

        var dataSchema = this.prepareSchema(request);

        // var startDate = new Date(request.dateRange.startDate);
        // var endDate = new Date(request.dateRange.endDate);
        // endDate.setUTCHours(23, 59, 59, 999);
        // var apiKey = this.getOauthService().getAccessToken();
        // var spotifyClient = new SpotifyClient(this.services.CacheService, this.services.UrlFetchApp, apiKey);

        // var plays = spotifyClient.getRecentPlays(startDate, endDate);

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