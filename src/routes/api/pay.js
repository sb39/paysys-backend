module.exports = (app, wagner) => {
  const PaymentController = wagner.get('PaymentController');
  const { body, header, param } = require('express-validator');
  const userMiddleware = wagner.get('UserAccessMiddleware');
  const EValidator = wagner.get('ExpressValidatorMiddleware');

  app.get('/api/pay', userMiddleware, async (req, res) => {
    const payments = await PaymentController.getPayDetails();
    return res.status(payments.code).json(payments.data);
  });

  app.get(
    '/api/pay/:payid',
    [param('payid', 'Pay Id must be present').exists()],
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
};
