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
            label : 'Item Id',
            dataType : "STRING",
            semantics: {
                conceptType: 'DIMENSION'
            }
        })
        for(var i =0; i < fields.length; i++){
            if(fields[i].type == 'app' || fields[i].type == 'text'){

                configSchema.schema.push({
                    name  : fields[i].external_id,
                    label : fields[i].label,
                    dataType : "STRING",
                    semantics: {
                        conceptType: 'DIMENSION'
                    }
                })
            }else if(fields[i].type == 'date'){
                configSchema.schema.push({
                    name  : fields[i].external_id,
                    label : fields[i].label,
                    dataType : "STRING",
                    semantics: {
                        conceptType: 'DIMENSION',
                        semanticGroup: 'DATETIME'
                    }
                })
            }else if(fields[i].type == 'calculation'){
                configSchema.schema.push({
                    name  : fields[i].external_id,
                    label : fields[i].label,
                    dataType : "NUMBER",
                    semantics: {
                        conceptType: 'METRIC',
                    }
                })
            }else if(fields[i].type == "number"){
                configSchema.schema.push({
                    name  : fields[i].external_id,
                    label : fields[i].label,
                    dataType : "NUMBER",
                    semantics: {
                        conceptType: 'METRIC',
                    }
                })
            }else if(fields[i].type == 'location'){
                configSchema.schema.push({
                    name  : fields[i].external_id,
                    label : fields[i].label,
                    dataType : "STRING",
                    semantics: {
                        conceptType: 'DIMENSION'
                    }
                })
            }else if(fields.type == 'catagory'){
                configSchema.schema.push({
                    name  : fields[i].external_id,
                    label : fields[i].label,
                    dataType : "STRING",
                    semantics: {
                        conceptType: 'DIMENSION'
                    }
                })
            }
        }
        return configSchema;
    },

    getItems : function(appId, apiKey){
        try{var headers = {
            Authorization : "Bearer " + apiKey,
                limit : 500
        }
        var url = 'https://api.podio.com/item/app/'+appId+'/';
        var result = this._UrlFetchApp.fetch(url, {headers : headers});
        var context = JSON.parse(result.getContentText());
        var items = context.items;
        var itemData = [];
        for(var i =0 ; i < items.length; i++){
            var item_id = items[i].item_id;
            var fields = items[i].fields;
            itemData.push({item_id : item_id});
            for(var j =0; j < fields.length; j++){
                var external_id = fields[j].external_id;
                if(fields[j].type == 'app'){
                    
                    itemData.push({  [external_id] : fields[j].values[0].value.title })

                }else if(fields[j].type == 'date'){

                    itemData.push({ [external_id]: fields[j].values[0].start })

                }else if(fields[j].type == 'calculation'){
                    itemData.push({ [external_id]: fields[j].values[0].value })

                }else if(fields[j].type == "number"){
                    itemData.push({ [external_id]: fields[j].values[0].value })

                }else if(fields[j].type == 'location'){
                    itemData.push({ [external_id]: fields[j].values[0].value })

                }else if(fields[j].type == 'catagory'){
                    itemData.push({ [external_id]: fields[j].values[0].value })
                }
            }
        }
        return itemData;}catch(error){
            console.log(JSON.stringify(error));
        }
    }
}


if (typeof(exports) !== 'undefined') {
    exports['__esModule'] = true;
    exports['default'] = PODIO_SVC;;
}