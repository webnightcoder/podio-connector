function DataBuilderSvc(dataSchema){

    this._dataSchema = dataSchema;
    
}

DataBuilderSvc.prototype = {

    build : function(itemData){
        var values = [];

        this._dataSchema.forEach(function(field) {
            var stat = false;
            for(data in itemData){
                if(field.name == data){
                    values.push(itemData[data]);
                    stat = true;
                    break;
                }
            }
            if(!stat){
                values.push('');
            }
        });
        return values;
    }

}

/* global exports */
/* istanbul ignore next */
if (typeof(exports) !== 'undefined') {
    exports['__esModule'] = true;
    exports['default'] = DataBuilderSvc;
  }
  