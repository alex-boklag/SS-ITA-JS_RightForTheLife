const mongoose = require('mongoose');
const fs = require('fs');
const dbOptions = require('../../utils/configs.js').dbOptions;
const connectionURI = require('../../utils/configs.js').connectionURI;
const DonateSchema = require('../../models/DonateSchema.js');

initDonate();

function readDonate() {
  return fs.readFileSync('./json-db/donate.json', 'utf8');
}

function getConnection() {
  return mongoose.createConnection(connectionURI, dbOptions);
}

function initDonate() {
  const connection = getConnection();
  const DonateModel = connection.model('Donate', DonateSchema);
  extractedDonate(DonateModel).save()
    .then(() => {
      console.log('Donate collection created');
      connection.close();
    })
    .catch(err => {
      console.log('Donate save error\n' + err);
      connection.close();
    });
}

function extractedDonate(DonateModel) {
  const donateContent = JSON.parse(readDonate());
  const newDonate = new DonateModel({
    _id: new mongoose.Types.ObjectId(),
    title: donateContent.title,
    manager: donateContent.manager,
    summary: donateContent.summary,
    paymentMethodsInfo: donateContent.paymentMethodsInfo,
    moneyTransferInfo: donateContent.moneyTransferInfo,
    privat24Token: donateContent.privat24Token,
  });
  donateContent.paymentMethodsInfo.paymentMethods.forEach(el => {
    return newDonate.paymentMethodsInfo.paymentMethods.create(el);
  });
  return newDonate;
}

module.exports = initDonate;