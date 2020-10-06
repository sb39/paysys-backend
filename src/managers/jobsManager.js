class JobsManager {
  constructor(wagner) {
    this.wagner = wagner;
    this.jobs = this.wagner.get('Jobs');
  }

  async getSingle(condition) {
    try {
      const singleResult = await this.jobs.findOne(condition);
      return singleResult;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const massResult = await this.jobs.find(condition);
      return massResult;
    } catch (error) {
      throw error;
    }
  }

  async create(createObj) {
    try {
      await this.jobs.create(createObj);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = JobsManager;
