const dbName = 'right-for-life';
const dbOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  dbName: dbName,
};

module.exports.jwt_secret = 'ita-right.for.life_secret';
module.exports.dbName = dbName;
module.exports.dbURL = `mongodb://localhost:27017/${dbName}`;
module.exports.animalsCollectionName = 'animals';
module.exports.serverPort = 4000;
module.exports.frontURL = 'http://localhost:5000';
module.exports.dbOptions = dbOptions;
module.exports.connectionURI = `mongodb+srv://${process.argv[2]}:${process.argv[3]}@animalsforlife-goij5.mongodb.net/${dbName}?retryWrites=true&w=majority`;