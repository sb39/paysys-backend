module.exports = (wagner) => {
  const mongoose = wagner.get('mongoose');
  wagner.factory('Jobs', () => require('./jobs')(mongoose));
  wagner.factory('Users', () => require('./users')(mongoose));
  wagner.factory('Workflows', () => require('./workflow')(mongoose));
  wagner.factory('Payments', () => require('./payments')(mongoose));
};
