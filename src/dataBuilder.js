function DataBuilderSvc(dataSchema){

    this._dataSchema = dataSchema;

}

DataBuilderSvc.prototype = {

    build : function(itemData){
        var values = [];
        
        this._dataSchema.forEach(function(field) {
            for(i = 0; i < itemData.length; i++){
                var key = Object.keys(itemData[i])[i];
                if(field.name == Object.keys(itemData[i])[i]){
                    values.push(itemData[i][key]);
                }
            }
        });
        console.log('Values are : ' + JSON.stringify(values));
        return values;
    }

}

/* global exports */
/* istanbul ignore next */
if (typeof(exports) !== 'undefined') {
    exports['__esModule'] = true;
    exports['default'] = DataBuilderSvc;
  }
  