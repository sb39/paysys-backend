module.exports = (wagner) => {
  wagner.factory('UserAccessMiddleware', () => {
    const UserAccessMiddleware = require('./userMiddleware');
    return UserAccessMiddleware(wagner);
  });
  wagner.factory('ExpressValidatorMiddleware', () => {
    const ExpressValidatorMiddleware = require('./expressValidatorMiddleware');
    return ExpressValidatorMiddleware();
  });
};
