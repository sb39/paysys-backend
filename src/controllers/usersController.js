class UsersController {
  constructor(wagner) {
    this.wagner = wagner;
    this.usersManager = this.wagner.get('UsersManager');
    this.genParsers = this.wagner.get('GenParser');
  }

  async registerUsers(bodyObj) {
    try {
      const createObj = { ...bodyObj };
      createObj.password = this.genParsers.passwordEncrypter(
        createObj.password,
      );
      createObj.accessToken = this.genParsers.tokenGenerator();
      await this.usersManager.create(createObj);
      return { code: 201, data: {} };
    } catch (error) {
      error.status = error.status || 400;
      if (error.message.includes('E11000'))
        error.message = 'Email Already registered';
      return { code: error.status, data: { message: error.message } };
    }
  }

  async getUser(condition) {
    try {
      const user = await this.usersManager.getSingle(condition);
      if (!user) {
        return { code: 204, data: {} };
      }
      // user.last_ip_logged = await this.genParsers.ipGetter();
      return { code: 200, data: user };
    } catch (error) {
      error.status = error.status || 400;
      return { code: error.status, data: error.message };
    }
  }

  async getAllUsers() {
    try {
      const allusers = await this.usersManager.getAll();
      if (!allusers.length) {
        return { code: 204, data: allusers };
      }
      const output = allusers.map(
        (e) => this.genParsers.userabstracter(e).data,
      );
      return { code: 200, data: output };
    } catch (error) {
      error.status = error.status || 400;
      return { code: error.status, data: { message: error.message } };
    }
  }

  async updateUser(update, condition) {
    try {
      await this.usersManager.update(condition, update);
      return true;
    } catch (error) {
      error.status = error.status || 400;
      return { code: error.status, data: error.message };
    }
  }
}

module.exports = UsersController;
