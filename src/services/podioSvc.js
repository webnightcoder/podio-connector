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
        console.log("Fetching Orgnization Details.");
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
        console.log('Org Details are  :' + JSON.stringify(orgObj) );
        return orgObj;
    }

}


if (typeof(exports) !== 'undefined') {
    exports['__esModule'] = true;
    exports['default'] = PODIO_SVC;;
}