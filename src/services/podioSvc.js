function PodioSvc(cacheSvc, UrlFetchApp, apiKey){
    
    this._cacheSvc       =   cacheSvc;

    this._UrlFetchApp    =   UrlFetchApp;

    this._API_KEY        =   apiKey;

}

PodioSvc.prototype = {

    getOrgnizations : function(){
        var headers = {
            Authorization : "Bearer " + this._API_KEY
        }
        var url = 'https.api.podio.com/org/';
        console.log("Fetching Orgnization Details.");
        var result = this._UrlFetchApp.fetch(url, {headers : headers});
        console.log('Result :' + JSON.stringify(result));
        return result;
    }

}


if (typeof(exports) !== 'undefined') {
    exports['__esModule'] = true;
    exports['default'] = PodioSvc;;
}