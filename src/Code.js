if (typeof(require) !== 'undefined') {
  var ConnectorSvc   = require('./connectorSvc.js')['default'];
}


function getConnector(){
  return new ConnectorSvc({
    CacheService: CacheService,
    UrlFetchApp: UrlFetchApp,
    HtmlService: HtmlService,
    PropertiesService: PropertiesService,
    OAuth2: OAuth2
  });
}

function getConfig(request) {
  console.log("Request on get COnfig : " + JSON.stringify(request));
  return getConnector().getConfig();
}

function getSchema() {
  return getConnector().getSchema();
}


function getData(request) {
  console.log("Request : " + JSON.stringify(request));
  return getConnector().getData(request);
}

function getAuthType() {
  console.log( 'Auth TYpe is  '  + JSON.stringify(getConnector().getAuthType()))
  return getConnector().getAuthType();
}

function isAdminUser() {
  return getConnector().isAdminUser();
}

function authCallback(request) {
  return getConnector().authCallback(request);
}

function isAuthValid() {
  return getConnector().isAuthValid();
}

function resetAuth() {
  getConnector().resetAuth();
}

function get3PAuthorizationUrls() {
  return getConnector().get3PAuthorizationUrls();
}
