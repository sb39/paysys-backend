class PaymentController {
  constructor(wagner) {
    this.wagner = wagner;
    this.mongoose = wagner.get('mongoose');
    this.paymentManager = this.wagner.get('PaymentManager');
    this.workflowManager = this.wagner.get('WorkflowManager');
  }

  async startPayCycle(bodyObj) {
    try {
      const createObj = {
        vendor: this.mongoose.Types.ObjectId(bodyObj.vendor),
        amount: bodyObj.amount,
        workflow: this.mongoose.Types.ObjectId(bodyObj.workflow),
      };
      const payment = await this.paymentManager.create(createObj);
      const paymentDetails = await this.paymentManager.get(payment._id);
      await this.paymentManager.createStat({
        paymentId: payment._id,
        currentStage: paymentDetails.workflow.levelArrangements[0].levelType,
        status: 1,
      });
      return { code: 201, data: {} };
    } catch (error) {
      error.status = error.status || 400;
      return { code: error.status, data: { message: error.message } };
    }
  }

  async getParticularPayDetails(payid) {
    try {
      const paymentDetails = await this.paymentManager.get(
        this.mongoose.Types.ObjectId(payid),
      );
      if (!paymentDetails) {
        return { code: 204, data: {} };
      }
      return { code: 200, data: paymentDetails };
    } catch (error) {
      error.status = error.status || 400;
      return { code: error.status, data: { message: error.message } };
    }
  }

  async getPayDetails() {
    try {
      const paymentDetails = await this.paymentManager.getAll();
      if (!paymentDetails.length) {
        return { code: 204, data: {} };
      }
      return { code: 200, data: paymentDetails };
    } catch (error) {
      error.status = error.status || 400;
      return { code: error.status, data: { message: error.message } };
    }
  }

  async payStatus(payid) {
    try {
      const status = await this.paymentManager.getStat({ paymentId: payid });
      if (!status) {
        return { code: 204, data: {} };
      }
      const returnObj = {
        currentStage: status.currentStage,
        currentStageApprovals: status.approveCount,
        overallStat:
          status.status === 0
            ? 'Terminated'
            : status.status === 1
            ? 'Active'
            : 'Executed',
      };
      return { code: 200, data: returnObj };
    } catch (error) {
      error.status = error.status || 400;
      return { code: error.status, data: { message: error.message } };
    }
  }

  async updatePaymentState(payid, userData, bodyObj) {
    try {
      const currstatus = await this.paymentManager.getStat({
        paymentId: payid,
      });
      if (
        !currstatus ||
        !currstatus.paymentId ||
        !currstatus.paymentId.workflow
      ) {
        return { code: 202, data: {} };
      }
      if (
        !userData.levelAccess.includes(currstatus.currentStage) ||
        !userData.levelAccess.includes(bodyObj.approveLevel)
      ) {
        return {
          code: 401,
          data: { message: 'Cannot modify levels outside scope ' },
        };
      }
      let wData = await this.workflowManager.getSingle({
        _id: currstatus.paymentId.workflow,
      });
      let totcount = 0;
      const newarr = wData.levelArrangements.map((e) => {
        const tmp = totcount;
        totcount += e.maxUsers;
        return { l: e.levelType, max: totcount, min: tmp };
      });
      const [f] = newarr.filter((e) => e.l === bodyObj.approveLevel);
      if (currstatus.approveCount > f.max) {
        return {
          code: 202,
          data: {
            message: 'stage already approved',
          },
        };
      }
      if (currstatus.approveCount < f.min) {
        return {
          code: 202,
          data: {
            message: 'previous stage must be passed',
          },
        };
      }
      const result = await this.StageUpdater(
        currstatus,
        bodyObj.approveLevel,
        userData,
      );
      if (!result) {
        return { code: 202, data: {} };
      }
      return { code: 204, data: {} };
    } catch (error) {
      error.status = error.status || 400;
      return { code: error.status, data: { message: error.message } };
    }
  }

  async StageUpdater(payStat, leveltoApprove, userData) {
    try {
      const result = await this.paymentManager.addLevelSubDoc(
        {
          _id: payStat._id,
          'lastStageUpdate.stageName': leveltoApprove,
          'lastStageUpdate.approvedBy': userData._id,
        },
        {
          stageName: leveltoApprove,
          approvedBy: userData._id,
        },
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PaymentController;
