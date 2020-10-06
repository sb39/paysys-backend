module.exports = (mongoose) => {
  const TransactionSchema = new mongoose.Schema(
    {
      paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
      },
      success: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    },
  );
  return mongoose.model('Transactions', TransactionSchema);
};
