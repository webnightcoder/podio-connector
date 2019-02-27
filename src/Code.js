var connectorSvc   = require('./connectorSvc.js');

function getConnector(){
  return new connectorSvc({
    CacheService: CacheService,
    UrlFetchApp: UrlFetchApp,
    HtmlService: HtmlService,
    PropertiesService: PropertiesService,
    OAuth2: OAuth2
  })
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

module.exports = isAdminUser;

function authCallback(request) {
  return getConnector().authCallback(request);
}

module.exports = authCallback;

function isAuthValid() {
  return getConnector().isAuthValid();
}
module.exports = isAuthValid;

function resetAuth() {
  getConnector().resetAuth();
}
module.exports = resetAuth;
function get3PAuthorizationUrls() {
  return getConnector().get3PAuthorizationUrls();
}
module.exports = get3PAuthorizationUrls;

module.exports = getConfig;

module.exports = getSchema;

module.exports = getAuthType;

module.exports = getData;