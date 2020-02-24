const mongoose = require('mongoose');
const fs = require('fs');
const dbOptions = require('../../utils/configs.js').dbOptions;
const connectionURI = require('../../utils/configs.js').connectionURI;
const ReportSchema = require('../../models/ReportSchema.js');

initReports();

function readReports() {
  return fs.readFileSync('./json-db/reports.json', 'utf8');
}

function getConnection() {
  return mongoose.createConnection(connectionURI, dbOptions);
}

function initReports() {
  const connection = getConnection();
  const ReportModel = connection.model('Report', ReportSchema);
  ReportModel.insertMany(extractedReports(ReportModel))
    .then(() => {
      console.log('Reports collection created');
      connection.close();
    })
    .catch(err => console.log('save error\n' + err));
}

function extractedReports(Report) {
  const reportsContent = JSON.parse(readReports());
  const newReports = [];
  for (report of reportsContent) {
    newReports.push(new Report({
      _id: new mongoose.Types.ObjectId(),
      date: report.date,
      title: report.title,
      gallery: report.gallery
    }));
  }
  return newReports;
}

module.exports = initReports;