module.exports = (app, wagner) => {
  const PaymentController = wagner.get('PaymentController');
  const { body, header, param } = require('express-validator');
  const userMiddleware = wagner.get('UserAccessMiddleware');
  const EValidator = wagner.get('ExpressValidatorMiddleware');

  app.get(
    '/api/pay',
    [
      header('user_id', 'User_id must be present').exists(),
      header('authToken', 'authToken must be present').exists(),
    ],
    EValidator,
    userMiddleware,
    async (req, res) => {
      const payments = await PaymentController.getPayDetails();
      return res.status(payments.code).json(payments.data);
    },
  );

  app.get(
    '/api/pay/:payid',
    [
      param('payid', 'Pay Id must be present').exists(),
      header('user_id', 'User_id must be present').exists(),
      header('authToken', 'authToken must be present').exists(),
    ],
    EValidator,
    userMiddleware,
    async (req, res) => {
      const payments = await PaymentController.getParticularPayDetails(
        req.params.payid,
      );
      return res.status(payments.code).json(payments.data);
    },
  );
  app.post(
    '/api/pay',
    [
      header('user_id', 'User_id must be present').exists(),
      header('authToken', 'authToken must be present').exists(),
      body('vendor', 'Pay Id must be present').exists(),
      body('amount', 'Amount should be numberic and is required')
        .exists()
        .isNumeric(),
      body('paid', 'Paid should be boolean').isBoolean().optional(),
      body('workflow', 'Workflow should be present').exists(),
    ],
    EValidator,
    userMiddleware,
    async (req, res) => {
      const payments = await PaymentController.startPayCycle(req.body);
      return res.status(payments.code).json(payments.data);
    },
  );

  // Pay stat
  app.get(
    '/api/pay/stat/:payid',
    [
      param('payid', 'Pay Id is Required').exists(),
      header('user_id', 'User_id must be present').exists(),
      header('authToken', 'authToken must be present').exists(),
    ],
    EValidator,
    async (req, res) => {
      const paymentStat = await PaymentController.payStatus(req.params.payid);
      return res.status(paymentStat.code).json(paymentStat.data);
    },
  );

  // User approve
  app.patch(
    '/api/pay/approve/:payid',
    [
      header('authToken', 'authToken must be present').exists(),
      param('payid', 'Pay Id is Required').exists(),
      header('user_id', 'User_id must be present').exists(),
      body(
        'approveLevel',
        'You must pass the level you want to approve',
      ).exists(),
      body('approveAction', 'You must pass the action you are taking')
        .isIn(['Approve', 'Reject', 'RejectRemove'])
        .exists(),
    ],
    EValidator,
    userMiddleware,
    async (req, res) => {
      const updatePaymentState = await PaymentController.updatePaymentState(
        req.params.payid,
        req.user,
        req.body,
      );
      return res.status(updatePaymentState.code).json(updatePaymentState.data);
    },
  );
};
