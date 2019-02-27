// var connectorSvc   = require('./connectorSvc.js');
// var CONF           = require('./conf.js');
// var LOGGER         = require('./services/logger.js');

// LOGGER.setLogger(CONF);

// LOGGER.log("Starting App.");

// function getConnector(){
//   return new connectorSvc({
//     CacheService: CacheService,
//     UrlFetchApp: UrlFetchApp,
//     HtmlService: HtmlService,
//     PropertiesService: PropertiesService,
//     OAuth2: OAuth2
//   })
// }

// function getConfig() {
//   LOGGER.log("COnfig is  :" + getConnector().getConfig());
//   return getConnector().getConfig();
// }


// function getSchema() {
//   return getConnector().getSchema();
// }


// function getData(request) {
//   LOGGER.log('REQUEST:', request);
//   return getConnector().getData(request);
// }


// function getAuthType() {

//   LOGGER.log("Auth Type is  : " + getConnector().getAuthType() );
//   return getConnector().getAuthType();
// }

// function isAdminUser() {
//   return getConnector().isAdminUser();
// }

// function authCallback(request) {
//   return getConnector().authCallback(request);
// }

// function isAuthValid() {
//   return getConnector().isAuthValid();
// }

// function resetAuth() {
//   getConnector().resetAuth();
// }


// function get3PAuthorizationUrls() {
//   return getConnector().get3PAuthorizationUrls();
// }



// module.exports = getConfig;


function getConfig() {
  return {
    dateRangeRequired: true
  };
}

function getSchema() {
  return {
    schema: [
      {
        name: 'track_name',
        label: 'Track Name',
        dataType: 'STRING',
        semantics: {
          conceptType: 'DIMENSION'
        }
      },
      {
        name: 'artist',
        label: 'Artist',
        dataType: 'STRING',
        semantics: {
          conceptType: 'DIMENSION'
        }
      },
      {
        name: 'played_at_hour',
        label: 'Played at (date + hour)',
        dataType: 'STRING',
        semantics: {
          conceptType: 'DIMENSION',
          semanticGroup: 'DATETIME',
          semanticType: 'YEAR_MONTH_DAY_HOUR'
        }
      },
      {
        name: 'played_at_date',
        label: 'Played at (date)',
        dataType: 'STRING',
        semantics: {
          conceptType: 'DIMENSION',
          semanticGroup: 'DATETIME',
          semanticType: 'YEAR_MONTH_DAY'
        }
      },
      {
        name: 'plays',
        label: 'Plays',
        dataType: 'NUMBER',
        formula: 'COUNT(track_name)',
        semantics: {
          conceptType: 'METRIC',
          isReaggregatable: false
        }
      },
      {
        name: 'tracks_count',
        label: 'Played Tracks',
        dataType: 'NUMBER',
        formula: 'COUNT(track_name)',
        semantics: {
          conceptType: 'METRIC',
          isReaggregatable: false
        }
      },
      {
        name: 'popularity',
        label: 'Popularity',
        dataType: 'NUMBER',
        semantics: {
          conceptType: 'METRIC'
        }
      }
    ]
  };
}

function getData(request) {
  // Prepare the schema for the fields requested.
  var dataSchema = [];
  var fixedSchema = getSchema().schema;
  request.fields.forEach(function(field) {
    for (var i = 0; i < fixedSchema.length; i++) {
      if (fixedSchema[i].name == field.name) {
        dataSchema.push(fixedSchema[i]);
        break;
      }
    }
  });

  // We'll query Spotify API here. For now let's just return two mocked records
  var mockedData = {
    items: [
      {
        track: {
          name: "Voice of the New Generation",
          popularity: 25,
          artists: [
            {
              name: "Santa Cruz"
            }
          ]
        },
        played_at: "2019-02-09T16:16:13.185Z"
      },
      {
        track: {
          name: "Shorty Wanna Be A Thug",
          popularity: 59,
          artists: [
            {
              name: "2Pac"
            }
          ]
        },
        played_at: "2019-02-09T15:11:02Z"
      },
      {
          track: {
              name: "Shorty Wanna Be A Thug",
              popularity: 59,
              artists: [
              {
                  name: "2Pac"
              }
              ]
          },
          played_at: "2019-02-09T16:11:02Z"
      },
      {
          track: {
            name: "Shorty Wanna Be A Thug",
            popularity: 59,
            artists: [
              {
                name: "2Pac"
              }
            ]
          },
          played_at: "2019-02-09T17:11:02Z"
      }
    ]
  };

  // Prepare the tabular data.
  var data = [];
  mockedData.items.forEach(function(play) {
    var values = [];
    var playTime = new Date(play.played_at);
    // Google expects YYMMDD format
    var playedAtDate = playTime.toISOString().slice(0, 10).replace(/-/g, "");
    // Provide values in the order defined by the schema.
    dataSchema.forEach(function(field) {
      switch (field.name) {
      case 'track_name':
        values.push(play.track.name);
        break;
      case 'artist':
        values.push(play.track.artists[0].name);
        break;
      case 'played_at_hour':
        values.push(
          playedAtDate +
          (playTime.getHours() < 10 ? '0' : '') + playTime.getHours()
        );
        break;
      case 'played_at_date':
        values.push(playedAtDate);
        break;
      case 'popularity':
        values.push(play.track.popularity);
        break;
      default:
        values.push('');
      }
    });
    data.push({
      values: values
    });
  });

  return {
    schema: dataSchema,
    rows: data
  };
}

function getAuthType() {
  return { type: "OAUTH2" };
}

function isAdminUser() {
  return true;
}