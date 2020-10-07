module.exports = (app, wagner) => {
  const UsersController = wagner.get('UsersController');
  const { body } = require('express-validator');
  const userMiddleware = wagner.get('UserAccessMiddleware');
  const EValidator = wagner.get('ExpressValidatorMiddleware');

  app.post(
    '/api/auth/login',
    [
      body('email', 'Email ID must be present and Valid').exists().isEmail(),
      body('password', 'password '),
    ],
    EValidator,
    async (req, res) => {
      const authGen = await UsersController.authGen(req.body);
      return res.status(authGen.code).json(authGen.data);
    },
  );

  // app.get('/api/auth/temp'); // will generate temp tokens for login access
};
