var connectorSvc   = require('./connectorSvc.js');
var CONF           = require('./conf.js');
var LOGGER         = require('./services/logger.js');

LOGGER.setLogger(CONF);

LOGGER.log("Starting App.");

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
  LOGGER.log("COnfig is  :" + getConnector().getConfig());
  return getConnector().getConfig();
}


function getSchema() {
  return getConnector().getSchema();
}


function getData(request) {
  LOGGER.log('REQUEST:', request);
  return getConnector().getData(request);
}


function getAuthType() {

  LOGGER.log("Auth Type is  : " + getConnector().getAuthType() );
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



module.exports = getConfig;