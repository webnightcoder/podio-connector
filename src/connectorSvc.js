if (typeof (require) !== 'undefined') {
    var OauthBuilderSvc     = require('./services/OauthBuilderSvc.js')['default'],
        OauthSvc            = require('./services/OauthSvc.js')['default'],
        CONF                = require('./conf.js')['default'],
        DataBuilderSvc      = require('./dataBuilder.js'),
        PODIO_SVC           = require('./services/podioSvc.js')['default'];
}


function ConnectorSvc(services) {
    this._services = services;
}
ConnectorSvc.prototype = {
    getSchema: function () {
        return {
            schema: [
                {
                    name: 'org_id',
                    label: "org Id",
                    dataType: "STRING",
                    semantics: {
                        conceptType: 'DIMENSION'
                    }
                },
                {
                    name: 'org_name',
                    label: "name of orgnization",
                    dataType: "STRING",
                    semantics: {
                        conceptType: 'DIMENSION'
                    }
                },
                {
                    name: 'spaces',
                    label: "Number Of Spaces into orgnization",
                    dataType: "NUMBER",
                    semantics: {
                        conceptType: 'METRIC'
                    }
                }
            ]
        }
    },

    getConfig: function () {
        // var apiKey = this.getOauthService().getAccessToken();
        // var podioSvc = new PODIO_SVC(this._services.CacheService, this._services.UrlFetchApp, apiKey);
        // var orgData = podioSvc.getOrgnizations();

        var cc = DataStudioApp.createCommunityConnector();
        var config = cc.getConfig();
        
        config
            .newTextInput()
            .setId('org_id')
            .setName('org_id')
            .setHelpText('Enter the Id of Orgnization')
            .setAllowOverride(true)
            .setPlaceholder('Enter the Id of Orgnization')

        config
            .newTextInput()
            .setId('space_id')
            .setName('space_id')
            .setHelpText('Enter the id of space')
            .setAllowOverride(true)
            .setPlaceholder('Enter the id of space')
        
        config
            .newTextInput()
            .setId('app_id')
            .setName('app_id')
            .setHelpText('Enter the id of app')
            .setAllowOverride(true)
            .setPlaceholder('Enter the id of app')
            
        // var temp = config.newSelectSingle()
        // .setId('Org_name')
        // .setAllowOverride(false)

        // for(var i =0; i < orgData.length ; i++){
        //     temp.addOption(config.newOptionBuilder()
        //     .setLabel(orgData[i].org_name)
        //     .setValue(orgData[i].org_id))
        // } //  append the dynamic name from org details
        
        config.setDateRangeRequired(true);
        return config.build();
    },

    getAuthType: function () {
        return {
            type: "OAUTH2"
        }
    },

    isAdminUser: function () {
        return true;
    },

    authCallback: function (request) {
        return this.getOauthService().authCallback(request);
    },

    isAuthValid: function (request) {
        return this.getOauthService().isAuthValid()
    },

    get3PAuthorizationUrls: function () {
        return this.getOauthService().get3PAuthorizationUrls();
    },

    resetAuth: function () {
        this.getOauthService().resetAuth();
    },

    getOauthService: function () {
        var builder = new OauthBuilderSvc(this._services.PropertiesService, this._services.OAuth2, CONF);
        return new OauthSvc(builder, this._services.HtmlService, CONF);
    },

    getData: function (request) {

        var dataSchema = this.prepareSchema(request);
        console.log('dataSchema is : ' + JSON.stringify(dataSchema));

        var apiKey = this.getOauthService().getAccessToken();
        var podioSvc = new PODIO_SVC(this._services.CacheService, this._services.UrlFetchApp, apiKey);
        var orgData = podioSvc.getOrgnizations();
        
        return this.buildTabularData(orgData, dataSchema);
    },

    prepareSchema: function (request) {
        var dataSchema = [];
        var fixedSchema = this.getSchema().schema;
        request.fields.forEach(function (field) {
            for (var i = 0; i < fixedSchema.length; i++) {
                if (fixedSchema[i].name == field.name) {
                    dataSchema.push(fixedSchema[i]);
                    break;
                }
            }
        });

        return dataSchema;
    },

    buildTabularData: function (orgData, dataSchema) {
        var dataBuilder = new DataBuilderSvc(dataSchema);
        var data        = [];
        orgData.forEach(function(org){
            data.push({
                values : dataBuilder.build(org)
            })
        })
        console.log("buildTabularData : " + JSON.stringify({
            schema: dataSchema,
            rows: data
        }))
        return {
            schema: dataSchema,
            rows: data
        }
    }
}

if (typeof (exports) !== 'undefined') {
    exports['__esModule'] = true;
    exports['default'] = ConnectorSvc;;
}