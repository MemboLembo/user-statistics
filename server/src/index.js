const runApp = require('./app');
const db = require('./db');

db.init().then(runApp);
