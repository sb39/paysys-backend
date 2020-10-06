class UsersManager {
  constructor(wagner) {
    this.wagner = wagner;
    this.users = this.wagner.get('Users');
  }

  async getSingle(condition) {
    try {
      const singleResult = await this.users.findOne(condition);
      return singleResult;
    } catch (error) {
      throw error;
    }
  }

  async getAll(condition) {
    try {
      const massResult = await this.users.find(condition);
      return massResult;
    } catch (error) {
      throw error;
    }
  }

  async create(createObj) {
    try {
      await this.users.create(createObj);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async update(condition, update) {
    try {
      await this.users.update(condition, update);
      return true;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UsersManager;
