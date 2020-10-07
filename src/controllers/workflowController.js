class WorkflowController {
  constructor(wagner) {
    this.wagner = wagner;
    this.workflowManager = this.wagner.get('WorkflowManager');
    this.mongoose = wagner.get('mongoose');
  }

  async registerWorkflow(bodyObj) {
    try {
      await this.workflowManager.createNew(bodyObj);
      return { code: 201 };
    } catch (error) {
      error.status = error.status || 400;
      return { code: error.status, data: { message: error.message } };
    }
  }

  async getAllWorkflows() {
    try {
      const workflow = await this.workflowManager.getAll();
      if (!workflow.length) {
        return { code: 204 };
      }
      const returObj = {
        defaultWorkflow: workflow.defaultWorkflow,
        status: workflow.status,
        // levelArrangements
      };
      return { code: 200, data: workflow };
    } catch (error) {
      error.status = error.status || 400;
      return { code: error.status, data: { message: error.message } };
    }
  }

  async getWorflow(workflowId) {
    try {
      const workflow = await this.workflowManager.getSingle({
        _id: this.mongoose.Types.ObjectId(workflowId),
      });
      if (workflow) {
        return { code: 200, data: workflow };
      }
      return { code: 204 };
    } catch (error) {
      error.status = error.status || 400;
      return { code: error.status, data: { message: error.message } };
    }
  }

  async editWorkflow(bodyObj) {
    try {
      const workflow = await this.workflowManager.editOne(condition, bodyObj);
      return { code: 204, data: workflow };
    } catch (error) {
      error.status = error.status || 400;
      return { code: error.status, data: { message: error.message } };
    }
  }

  async deleteWorkflow() {
    try {
      const workflow = await this.workflowManager.singleDelete(condition);
      return { code: 204 };
    } catch (error) {
      error.status = error.status || 400;
      return { code: error.status, data: { message: error.message } };
    }
  }
}

module.exports = WorkflowController;
