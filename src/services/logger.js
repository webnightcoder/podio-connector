
if (typeof(require) !== 'undefined') {
  var SYSTEM_INFO   =   require('systeminformation')['default'];

}

function LOGGER(){

    this._counter = 0;

}
LOGGER.prototype = {
    setLogger : function(conf){
        var logger, self = this;
        if(conf.LOGZ_IO.USE == true && conf.LOGZ_IO.DEBUG == false){

            logger = require('logzio-nodejs').createLogger({
                token : conf.LOGZ_IO.TOKEN,
                type  : conf.LOGZ_IO.TYPE
            })

        }else if(conf.LOGZ_IO.USE == true && conf.LOGZ_IO.DEBUG == true){
            logger = require('logzio-nodejs').createLogger({
                token : conf.LOGZ_IO.TOKEN,
                type  : conf.LOGZ_IO.TYPE,
                bufferSize : 10,
                debug : true
            })
        }else{
            logger = console;
        }

        SYSTEM_INFO.networkInterfaces(function(data){
            self._ip = data[1].ip4;
        })

        this._logger = logger;
        this._conf   = conf;

    },

    log : function(message){
        var self = this;

        if(message != ""){
            this._counter++;
            var logMessage = {
                'ip'   : self._ip,
                'message' : message + ' : ' + self._counter
            };
            self._logger.log(logMessage);

            if(this._conf.LOGZ_IO.DEBUG == true){
                console.log(logMessage);
            }

        }
    },
    resetCounter : function(){
        this._counter = 0;
    }
}


if (typeof(exports) !== 'undefined') {
  exports['__esModule'] = true;
  exports['default'] = new LOGGER();
}
