module.exports = (app, wagner) => {
  const workflowController = wagner.get('WorkflowController');
  const EValidator = wagner.get('ExpressValidatorMiddleware');
  const { body, param, header } = require('express-validator');

  app.get('/api/workflows', async (req, res) => {
    const workflow = await workflowController.getAllWorkflows();
    return res.status(workflow.code).json(workflow.data || {});
  });

  app.get(
    '/api/workflows/:workflowid',
    [
      param(
        'workflowid',
        'WorkflowId must be present and should be of type string',
      )
        .exists()
        .isAlphanumeric(),
    ],
    EValidator,
    async (req, res) => {
      const workflow = await workflowController.getWorflow(
        req.params.workflowid,
      );
      return res.status(workflow.code).json(workflow.data || {});
    },
  );

  app.post(
    '/api/workflows',
    [
      body('defaultWorkflow', 'Default should be Boolean').exists().isBoolean(),
      body('levelArrangements').exists().isArray(),
      body('levelArrangements.*.levelType')
        .exists()
        .isIn(['Sequential', 'RoundRobin', 'Any']),
      body('levelArrangements.*.maxUsers', 'MaxUsers must be present')
        .exists()
        .isInt(),
    ],
    EValidator,
    async (req, res) => {
      const workflow = await workflowController.registerWorkflow(req.body);
      return res.status(workflow.code).json(workflow.data || {});
    },
  );

  // app.patch(
  //   '/api/workflows/:workflowid',
  //   // import workflow controller here check if editable or not if not DO NOT PROCEED
  //   body('approvalTypeByLevels', 'approvalTypeByLevels should be array')
  //     .isArray()
  //     .custom((array) => {
  //       if (this.value !== array.length) {
  //         throw new Error(
  //           "approvalTypeByLevels 's array length should equal to value of levels value",
  //         );
  //       }
  //       return true;
  //     }),
  //   async (req, res) => {
  //     const workflow = await workflowController.editWorkflow(req.params.body);
  //     return res.status(workflow.code).json(workflow.data || {});
  //   },
  // );

  // app.delete(
  //   '/api/workflows/:workflowid',
  //   body('workflowid'),
  //   async (req, res) => {
  //     const workflow = await workflowController.deleteWorkflow(
  //       req.params.workflowid,
  //     );
  //     return res.status(workflow.code).json(workflow.data || {});
  //   },
  // );
};
