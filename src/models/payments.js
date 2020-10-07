module.exports = (mongoose) => {
  const { Schema, model } = mongoose;

  const PaymentSchema = new Schema(
    {
      vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
      amount: {
        type: Number,
        default: 0,
      },
      paid: {
        type: Boolean, // by default false [paid means "Executed" or else not executed]
        default: false,
      },
      workflow: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workflow',
      },
    },
    {
      timestamps: true,
    },
  );
  return model('Payment', PaymentSchema);
};
