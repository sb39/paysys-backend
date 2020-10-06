class WorkflowManager {
  constructor(wagner) {
    this.wagner = wagner;
    this.workflow = this.wagner.get('Workflows');
  }

  async getSingle(condition) {
    try {
      const singleResult = await this.workflow.findOne(condition, {
        // _id: 0,
        'levelArrangements._id': 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      });
      return singleResult;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const massResult = await this.workflow.find(
        {},
        {
          // _id: 0,
          'levelArrangements._id': 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      );
      return massResult;
    } catch (error) {
      throw error;
    }
  }

  async createNew(createObj) {
    try {
      await this.workflow.create(createObj);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async editOne(condition, update) {
    try {
      const u = await this.workflow.update(condition, update);
      if (!(u.nModified > 0)) {
        throw { name: 'NoModify' };
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async editAll(condition, update) {
    try {
      await this.workflow.updateMany(condition, update);
      if (!(u.nModified > 0)) {
        throw { name: 'NoModify' };
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
  async singleDelete(condition) {
    try {
      const deleteR = await this.workflow.deleteOne(condition);
      if (!(deleteR > 0)) {
        throw { name: 'NoDel' };
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async multiDelete(condition) {
    try {
      const deleteR = await this.workflow.deleteMany(condition);
      if (!(deleteR > 0)) {
        throw { name: 'NoDel' };
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = WorkflowManager;
