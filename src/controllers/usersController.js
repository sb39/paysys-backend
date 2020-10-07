class UsersController {
  constructor(wagner) {
    this.wagner = wagner;
    this.usersManager = this.wagner.get('UsersManager');
    this.genParsers = this.wagner.get('GenParser');
    this.paymentManager = this.wagner.get('PaymentManager');
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

  async authGen(bodyObj) {
    try {
      const password = this.genParsers.passwordDecryptor(bodyObj.password);
      const response = await this.usersManager.getSingle({
        userId: bodyObj.email,
        password: this.genParsers.passwordEncrypter(password),
      });
      const outputObj = {
        userId: response._id,
        authToken: response.accessToken,
      };
      return { code: 200, data: outputObj };
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

  async searchAvailable(userObj) {
    try {
      if (!userObj.levelAccess.length)
        throw err('No proper access for given user');
      const status = await this.paymentManager.getAllStat();
      if (!status) {
        return { code: 202, data: {} };
      }
      const available = status.filter((e) => {
        if (userObj.levelAccess.includes(e.currentStage)) {
          return e;
        }
      });
      if (available.length) {
        return { code: 200, data: available };
      }
      return { code: 204, data: {} };
    } catch (error) {
      error.status = error.status || 400;
      return { code: error.status, data: error.message };
    }
  }
}

module.exports = UsersController;
