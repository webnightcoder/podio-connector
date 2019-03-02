function DataBuilderSvc(dataSchema){

    this._dataSchema = dataSchema;

}

DataBuilderSvc.prototype = {

    build : function(orgData){
        var values = [];
        console.log('Org data for Build are : ' + JSON.stringify(orgData));
        console.log('dataSchema : ' +JSON.stringify(this._dataSchema));
        this._dataSchema.forEach(function(field) {
            switch (field.name) {
            case 'org_id':
            values.push(orgData.org_id);
            break;
            case 'org_name':
            values.push(orgData.org_name);
            break;
            case 'spaces':
            values.push(orgData.space_length);
            break;
            default:
            console.log('Unknown field:', field.name);
            values.push('');
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
  