const WorkflowController = require('./workflowController');

module.exports = (wagner) => {
  wagner.factory('WorkflowController', () => {
    const WorkflowController = require('./workflowController');
    return new WorkflowController(wagner);
  });
  wagner.factory('JobsController', () => {
    const JobsController = require('./jobsController');
    return new JobsController(wagner);
  });
  wagner.factory('UsersController', () => {
    const UsersController = require('./usersController');
    return new UsersController(wagner);
  });
  wagner.factory('PaymentController', () => {
    const PaymentController = require('./paymentController');
    return new PaymentController(wagner);
  });
};
