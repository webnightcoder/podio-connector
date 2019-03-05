var CONF = {
    PODIO : {
        CLIENT_ID : 'podio-connector-220bvh',
        CLIENT_SECRET : 'meRpc8a76owj3pOLH2eq2QiMR7fv1QB6V8eCToO8i7yb6mh8D7YqnuzJUxEpISQZ'
    },
    LOGZ_IO : {
        USE: true,
        DEBUG: false,
        TOKEN: 'rqpfQfDadwGaQrszNlhHVZLOUZRqqAUk',
        TYPE: "google-connector" 
    },
    schema : {}
}
if (typeof(exports) !== 'undefined') {
  exports['__esModule'] = true;
  exports['default'] = CONF;
}