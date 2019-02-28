
if (typeof(require) !== 'undefined') {
var OauthBuilderSvc     =   require('./services/OauthBuilderSvc.js')['default'],
    OauthSvc            =   require('./services/OauthSvc.js')['default'],
    CONF                =   require('./conf.js')['default'];
}


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
        var apiKey = this.getOauthService().getAccessToken();
        console.log(apiKey);
        var cc = DataStudioApp.createCommunityConnector();
        var config = cc.getConfig();
        
        config.newInfo()
        .setId('instructions')
        .setText('Enter npm package names to fetch their download count.');
        
        var optionBuilder = config.newOptionBuilder()
        .setLabel('option label')
        .setValue('Option value');
        
        
        config.newSelectSingle()
        .setId('Org_name')
        .addOption(optionBuilder);
        
        config.newTextInput()
        .setId('package')
        .setName('Enter a single package name.')
        .setHelpText('for example, googleapis or lighthouse')
        .setPlaceholder('googleapis')
        .setAllowOverride(true);
        
        config.setDateRangeRequired(true);
        return config.build();
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
        var builder = new OauthBuilderSvc(this._services.PropertiesService, this._services.OAuth2, CONF);
        return new OauthSvc(builder, this._services.HtmlService, CONF);
    },

    getData : function(request){

        var dataSchema = this.prepareSchema(request);
        var apiKey = this.getOauthService().getAccessToken();
        this.Logger.log("API_KEY is : " + apiKey);
        // var podioSvc = new PODIO_SVC(this.services.CacheService, this.services.UrlFetchApp, apiKey);

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
  exports['default'] = ConnectorSvc;;
}