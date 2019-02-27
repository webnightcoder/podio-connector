var CONF = {
    PODIO : {
        CLIENT_ID : 'catalog-marc',
        CLIENT_SECRET : 'lvS4P81xbzNgdFrYvYumsrrPIp4UoDCnMRQU2LrmTVQ95VZvvmvgQcaALRzfsZrP'
    },
    LOGZ_IO : {
        USE: true,
        DEBUG: false,
        TOKEN: 'rqpfQfDadwGaQrszNlhHVZLOUZRqqAUk',
        TYPE: "google-connector" 
    }
}
if (typeof(exports) !== 'undefined') {
  exports['__esModule'] = true;
  exports['default'] = CONF;
}