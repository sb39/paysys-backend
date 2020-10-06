module.exports = (app, wagner) => {
  require('./api/workflow')(app, wagner);
  require('./api/jobs')(app, wagner);
  require('./api/users')(app, wagner);
  require('./api/pay')(app, wagner);
};
