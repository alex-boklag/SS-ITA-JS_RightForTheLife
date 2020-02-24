const mongoose = require('mongoose');
const dbOptions = require('../utils/configs.js').dbOptions;
const connectionURI = require('../utils/configs.js').connectionURI;

mongoose.connect(connectionURI, dbOptions);

mongoose.connection.dropDatabase().then(() => {
  console.log('---DB dropped---');
});

setTimeout(() => {
  require('../json-db/init/read-home.js');
  require('../json-db/init/read-animals.js');
  require('../json-db/init/read-happy-stories.js');
  require('../json-db/init/read-news.js');
  require('../json-db/init/read-supplies.js');
  require('../json-db/init/read-about.js');
  require('../json-db/init/read-donate.js');
  require('../json-db/init/read-emergency.js');
  require('../json-db/init/read-reports.js');
  console.log('---init finished---');
}, 3000);

mongoose.connection.close();
