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
    },
    {
      timestamps: true,
    },
  );
  return model('Workflow', WorkflowSchema);
};
