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
      header('user_id', 'User_id must be present').exists(),
      header('authToken', 'authToken must be present').exists(),
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
      header('user_id', 'User_id must be present').exists(),
      header('authToken', 'authToken must be present').exists(),
      body('defaultWorkflow', 'Default should be Boolean').exists().isBoolean(),
      body('levelArrangements').exists().isArray(),
      body(
        'levelArrangements.*.levelType',
        'Must be within "Sequential", "RoundRobin", "Any"',
      )
        .exists()
        .isIn(['Sequential', 'RoundRobin', 'Any']),
      body('levelArrangements.*.maxUsers', 'MaxUsers must be present')
        .custom((value) => {
          if (typeof value === 'number') {
            return true;
          }
          throw 'should ne numeric';
        })
        .exists(),
    ],
    EValidator,
    async (req, res) => {
      const workflow = await workflowController.registerWorkflow(req.body);
      return res.status(workflow.code).json(workflow.data || {});
    },
  );
};
