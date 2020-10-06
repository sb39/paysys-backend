const WorkflowController = require('../controllers/workflowController');

module.exports = (wagner) => {
  wagner.factory('WorkflowManager', () => {
    const WorkflowController = require('./workflowManager');
    return new WorkflowController(wagner);
  });
  wagner.factory('UsersManager', () => {
    const UsersManager = require('./usersManager');
    return new UsersManager(wagner);
  });
  wagner.factory('JobsManager', () => {
    const JobsManager = require('./jobsManager');
    return new JobsManager(wagner);
  });
  wagner.factory('PaymentManager', () => {
    const PaymentManager = require('./paymentManager');
    return new PaymentManager(wagner);
  });
};
