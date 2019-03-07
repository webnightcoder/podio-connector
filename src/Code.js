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
  return getConnector().getConfig();
}

function getSchema(request) {
  return getConnector().getSchema(request);
}


function getData(request) {
  return getConnector().getData(request);
}

function getAuthType() {
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
