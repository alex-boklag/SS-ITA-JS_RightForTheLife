const mongoose = require('mongoose');
const fs = require('fs');
const dbOptions = require('../../utils/configs.js').dbOptions;
const connectionURI = require('../../utils/configs.js').connectionURI;
const SupplySchema = require('../../models/SupplySchema.js');

initSupplies();

function readSupplies() {
  return fs.readFileSync('./json-db/supplies.json', 'utf8');
}

function getConnection() {
  return mongoose.createConnection(connectionURI, dbOptions);
}

function initSupplies() {
  const connection = getConnection();
  const SupplyModel = connection.model('Supply', SupplySchema);
  SupplyModel.insertMany(extractedSupplies(SupplyModel))
    .then(() => {
      console.log('Supplies collection created');
      connection.close();
    })
    .catch(err => console.log('save error\n' + err));
}

function extractedSupplies(Supply) {
  const suppliesContent = JSON.parse(readSupplies());
  const newSupplies = [];
  for (supply of suppliesContent) {
    newSupplies.push(new Supply({
      _id: new mongoose.Types.ObjectId(),
      name: supply.name,
      info: supply.info,
      type: supply.type,
    }));
  }
  return newSupplies;
}

module.exports = initSupplies;