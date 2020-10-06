const { body, param, header } = require('express-validator');

module.exports = (app, wagner) => {
  const UsersController = wagner.get('UsersController');
  const EValidator = wagner.get('ExpressValidatorMiddleware');
  const GenParsers = wagner.get('GenParser');
  const userMiddleware = wagner.get('UserAccessMiddleware');

  app.post(
    '/api/users',
    [
      body('email', 'Email should be present and valid').exists().isEmail(),
      body('name', 'Name should be present and valid')
        .exists()
        .isLength({ min: 3 }),
      body(
        'userType',
        'User should be present and must be one of "Vendor or User" ',
      )
        .isIn(['User', 'Vendor'])
        .exists(),
      body(
        'levelAccess',
        'LevelAccess array should be present, valid entries "Sequential", "RoundRobin" or "Any"',
      )
        .exists()
        .isArray()
        .isLength({ min: 1 }),
      body(
        'accessGrant',
        'AccessGrant should be present and should be "Admin" or "User"',
      )
        .isIn(['Admin', 'User'])
        .exists(),
      body('superUser', 'SuperUser value must be present and must be Boolean')
        .isBoolean()
        .exists(),
      body('password', 'Password should be present').exists(),
    ],
    EValidator,
    async (req, res) => {
      const userRegister = await UsersController.registerUsers(req.body);
      return res.status(userRegister.code).json(userRegister.data);
    },
  );

  app.get(
    '/api/users/:id',
    [param('id', 'id should be present and must be valid').isAlphanumeric()],
    EValidator,
    userMiddleware,
    async (req, res) => {
      const response = GenParsers.userabstracter(req.user);
      return res.status(response.code).json(response.data);
    },
  );

  app.get(
    '/api/users',
    [header('user_id', 'User_id must be present to proceed').exists()],
    EValidator,
    userMiddleware,
    (req, res, next) => {
      if (req.user.accessGrant === 'Admin') {
        next();
        return null;
      }
      return res.sendStatus(401);
    },
    async (req, res) => {
      const response = await UsersController.getAllUsers();
      return res.status(response.code).json(response.data);
    },
  );

  app.patch('/api/users/:userid', async (req, res) => {});

  app.delete('/api/users/:userid', async (req, res) => {});
};
