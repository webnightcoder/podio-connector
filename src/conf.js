var CONF = {
    PODIO : {
        CLIENT_ID : 'podio-connector-rsc6pi',
        CLIENT_SECRET : 'OtgEIBAKqUNXMBn8hBSNyun0jDdPgIG11UDsDSMbpIja9kpkMym5trvq9pAtZOP0'
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