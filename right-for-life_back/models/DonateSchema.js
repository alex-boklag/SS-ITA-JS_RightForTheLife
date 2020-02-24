const mongoose = require('mongoose');

const PaymentMethodSchema = new mongoose.Schema({
  name: String,
  details: String,
});

const PaymentSchema = new mongoose.Schema({
  title: String,
  paymentMethods: [PaymentMethodSchema],
});

const MoneySchema = new mongoose.Schema({
  title: String,
  details: String,
  accounts: Array,
  paymentPurpose: String,
});

const DonateSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    manager: String,
    summary: String,
    paymentMethodsInfo: PaymentSchema,
    moneyTransferInfo: MoneySchema,
    privat24Token: String,
  });

module.exports = DonateSchema;