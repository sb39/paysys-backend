module.exports = (mongoose) => {
  const { Schema, model } = mongoose;

  const stageStatus = Schema({
    stageName: {
      type: String,
      enum: ['Sequential', 'RoundRobin', 'Any'],
    },
    approvedAction: {
      type: Number,
      enum: [-1, 0, 1], // [-1 => reject, 0 => reject and remove from workflow, 1 => approved],
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
  });
  const PaymentStat = Schema({
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
    },
    currentStage: {
      type: String,
      enum: ['Sequential', 'RoundRobin', 'Any'],
    },
    approveCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: Number, // [Terminated: 0, Active : 1, , Executed: 2]
    },
    lastStageUpdate: [stageStatus],
  });

  return model('PaymentStat', PaymentStat);
};
