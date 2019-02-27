if (typeof(require) !== 'undefined') {
  var connectorSvc   = require('./connectorSvc.js')['default'];
}


function getConnector(){
  return new this.ConnectorSvc({
    CacheService: CacheService,
    UrlFetchApp: UrlFetchApp,
    HtmlService: HtmlService,
    PropertiesService: PropertiesService,
    OAuth2: OAuth2
  });
}

function getConfig() {
  return getConnector().getConfig();
}

function getSchema() {
  return getConnector().getSchema();
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
