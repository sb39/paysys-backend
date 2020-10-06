module.exports = (mongoose) => {
  const { Schema, model } = mongoose;

  const PaymentSchema = new Schema({
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    amount: {
      type: Number,
      default: 0,
    },
    paid: {
      type: Boolean, // by default false
      default: false,
    },
    workflow: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workflow',
    },
  });
  return model('Payment', PaymentSchema);
};
