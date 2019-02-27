if (typeof(require) !== 'undefined') {
  var connectorSvc   = require('./connectorSvc.js');
}


function getConnector(){
  return new connectorSvc({
    CacheService: CacheService,
    UrlFetchApp: UrlFetchApp,
    HtmlService: HtmlService,
    PropertiesService: PropertiesService,
    OAuth2: OAuth2
  })
  console.log(connectorSvc);
}

function getConfig() {
  return getConnector().getConfig();
}

function getSchema() {
  return getConnector().getSchema();
}

function getData(request) {
  console.log('REQUEST:', request);
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
