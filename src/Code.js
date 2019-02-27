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

/* istanbul ignore next */
// eslint-disable-next-line no-unused-vars
function getSchema() {
  return getConnector().getSchema();
}

/* istanbul ignore next */
// eslint-disable-next-line no-unused-vars
function getData(request) {
  console.log('REQUEST:', request);
  return getConnector().getData(request);
}

/* istanbul ignore next */
// eslint-disable-next-line no-unused-vars
function getAuthType() {

  console.log("Auth Type is  : " + getConnector().getAuthType() );
  return getConnector().getAuthType();
}

/* istanbul ignore next */
// eslint-disable-next-line no-unused-vars
function isAdminUser() {
  return getConnector().isAdminUser();
}

/* istanbul ignore next */
// eslint-disable-next-line no-unused-vars
function authCallback(request) {
  return getConnector().authCallback(request);
}

/* istanbul ignore next */
// eslint-disable-next-line no-unused-vars
function isAuthValid() {
  return getConnector().isAuthValid();
}

/* istanbul ignore next */
// eslint-disable-next-line no-unused-vars
function resetAuth() {
  getConnector().resetAuth();
}

/* istanbul ignore next */
// eslint-disable-next-line no-unused-vars
function get3PAuthorizationUrls() {
  return getConnector().get3PAuthorizationUrls();
}


module.exports = getConfig;