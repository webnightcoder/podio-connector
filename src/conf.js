var CONF = {
    PODIO : {
        CLIENT_ID : 'podio-connector-a0jt5l',
        CLIENT_SECRET : 'gRv6UrGjGwwDeed6lHlR9yejrWEPlUipBAIAqoz0Hjub08t0NjZwAmg87xVGvuCR'
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