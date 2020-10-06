module.exports = (mongoose) => {
  const { Schema, model } = mongoose;
  const LevelSchema = Schema({
    maxUsers: {
      type: Number,
    },
    levelType: {
      type: 'String',
      enum: ['Sequential', 'RoundRobin', 'Any'],
    },
  });

  const WorkflowSchema = new Schema(
    {
      defaultWorkflow: {
        type: Boolean,
        index: true,
        default: false,
      },
      levelArrangements: [LevelSchema],
      status: {
        type: Number, // [Active : 1, Reject: 0, Reject & Remove from workflow: 2]
        default: 1,
      },
    },
    {
      timestamps: true,
    },
  );
  return model('Workflow', WorkflowSchema);
};
