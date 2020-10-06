// Differenciates between a normal user and an Admin User
module.exports = (wagner) => async (req, res, next) => {
  const UserController = wagner.get('UsersController');
  try {
    const user = await UserController.getUser({
      _id: req.params.id || req.headers.user_id,
    });
    const { data } = user;
    if (!data || !data.accessToken) {
      return res.sendStatus(401);
    }
    req.user = data;
    next();
  } catch (error) {
    return res.status(401).json(error);
  }
};
