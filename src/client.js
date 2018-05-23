let elasticsearch = require('elasticsearch');

let client = new elasticsearch.Client({
  host: 'localhost:'+process.env.ES_PORT,
  log: process.env.LOG || 'info'
});

exports.client = client;