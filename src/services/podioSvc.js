function PODIO_SVC(cacheSvc, UrlFetchApp, apiKey){
    
    this._cacheSvc       =   cacheSvc;

    this._UrlFetchApp    =   UrlFetchApp;

    this._API_KEY        =   apiKey;

}

PODIO_SVC.prototype = {

    getOrgnizations : function(){
        var headers = {
            Authorization : "Bearer " + this._API_KEY
        }
        var url = 'https://api.podio.com/org/';
        var result = this._UrlFetchApp.fetch(url, {headers : headers});
        var orgObj = []
        var context = JSON.parse(result.getContentText());
        for(var i =0 ; i < context.length; i++){
            var tempObj = {};
            tempObj.org_name = context[i].name;
            tempObj.org_id   = context[i].org_id;
            tempObj.space_length = context[i].spaces.length;
            orgObj.push(tempObj);
        }
        return orgObj;
    },

    getFieldsName : function(appId, apiKey){
        var headers = {
            Authorization : "Bearer " + apiKey
        }
        var url = 'https://api.podio.com/app/'+appId + '/';
        var result = this._UrlFetchApp.fetch(url, {headers : headers});
        var orgObj = []
        var context = JSON.parse(result.getContentText());
        var fields  = context.fields;
        var configSchema = {};
        configSchema.schema = [];
        configSchema.schema.push({
            name  : 'item_id',
            dataType : "NUMBER",
            semantics: {
                conceptType: 'DIMENSION'
            }
        })
        for(var i =0; i < fields.length; i++){
            if(fields[i].type == 'app' || fields[i].type == 'text'){
                if(fields[i].status == 'active'){
                    configSchema.schema.push({
                        name  : fields[i].external_id,
                        dataType : "STRING",
                        semantics: {
                            conceptType: 'DIMENSION'
                        }
                    })
                }
            }else if(fields[i].type == 'date'){
                if(fields[i].status == 'active'){
                    configSchema.schema.push({
                        name  : fields[i].external_id,
                        dataType : "DATE",
                        semantics: {
                            'conceptType': 'METRIC'
                        }
                    })
                }
            }else if(fields[i].type == 'calculation'){
                if(fields[i].status == "active"){
                    configSchema.schema.push({
                        name  : fields[i].external_id,
                        dataType : "NUMBER",
                        semantics: {
                            conceptType: 'METRIC',
                        }
                    })
                }
            }else if(fields[i].type == "number"){
                if(fields[i].status == 'active'){
                    configSchema.schema.push({
                        name  : fields[i].external_id,
                        dataType : "NUMBER",
                        semantics: {
                            conceptType: 'METRIC',
                        }
                    })
                }
            }else if(fields[i].type == 'location'){
                if(fields[i].status == 'active'){
                    configSchema.schema.push({
                        name  : fields[i].external_id,
                        dataType : "STRING",
                        semantics: {
                            conceptType: 'DIMENSION'
                        }
                    })
                }
            }else if(fields.type == 'catagory'){
                if(fields[i].status == 'active'){
                    configSchema.schema.push({
                        name  : fields[i].external_id,
                        dataType : "STRING",
                        semantics: {
                            conceptType: 'DIMENSION'
                        }
                    })
                }
            }
        }
        return configSchema;
    },

    getItems : function(appId, apiKey){
        var headers = {
            Authorization : "Bearer " + apiKey
        }
        var url = 'https://api.podio.com/item/app/'+appId+'/';
        var result = this._UrlFetchApp.fetch(url, {headers : headers});
        var context = JSON.parse(result.getContentText());
        var items = context.items;
        var itemData = [];
        for(var i =0 ; i < items.length; i++){
            var item_id = items[i].item_id;
            var fields = items[i].fields;
            var tempObj = {};
            tempObj['item_id'] = item_id;
            for(var j =0; j < fields.length; j++){
                var external_id = fields[j].external_id;
                
                if(fields[j].type == 'text'){
                    tempObj[external_id] = fields[j].values[0].value;
                }else if(fields[j].type == 'app'){
                    
                     tempObj[external_id]  = fields[j].values[0].value.item_id;

                }else if(fields[j].type == 'date'){

                    tempObj[external_id]  = (fields[j].values[0].start_date).split('-').join('');
                    console.log("date : " + fields[j].values[0].start_date );
                }else if(fields[j].type == 'calculation'){

                    tempObj[external_id]  = fields[j].values[0].value;

                }else if(fields[j].type == "number"){
                    tempObj[external_id]  = parseInt(fields[j].values[0].value);

                }else if(fields[j].type == 'location'){
                    tempObj[external_id]  = fields[j].values[0].value;

                }else if(fields[j].type == 'catagory'){

                    tempObj[external_id]  = fields[j].values[0].value.id;
                }
            }
            itemData.push(tempObj);
            tempObj = {};
        }
        return itemData;
    }
}


if (typeof(exports) !== 'undefined') {
    exports['__esModule'] = true;
    exports['default'] = PODIO_SVC;;
}


if (typeof(require) !== 'undefined') {
    var ConnectorSvc   = require('./connectorSvc.js')['default'];
  }
  
  
//   function getConnector(){
//     return new ConnectorSvc({
//       CacheService: CacheService,
//       UrlFetchApp: UrlFetchApp,
//       HtmlService: HtmlService,
//       PropertiesService: PropertiesService,
//       OAuth2: OAuth2
//     });
//   }
  
//   function getConfig(request) {
//     return getConnector().getConfig();
//   }
  
//   function getSchema(request) {
//     return getConnector().getSchema(request);
//   }
  
  
//   function getData(request) {
//     console.log("GET Data : " + JSON.stringify(request));
//     return getConnector().getData(request);
//   }
  
//   function getAuthType() {
//     return getConnector().getAuthType();
//   }
  
//   function isAdminUser() {
//     return getConnector().isAdminUser();
//   }
  
//   function authCallback(request) {
//     return getConnector().authCallback(request);
//   }
  
//   function isAuthValid() {
//     return getConnector().isAuthValid();
//   }
  
//   function resetAuth() {
//     getConnector().resetAuth();
//   }
  
//   function get3PAuthorizationUrls() {
//     return getConnector().get3PAuthorizationUrls();
//   }
  