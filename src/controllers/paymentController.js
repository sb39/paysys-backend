class PaymentController {
  constructor(wagner) {
    this.wagner = wagner;
    this.mongoose = wagner.get('mongoose');
    this.paymentManager = this.wagner.get('PaymentManager');
  }

  async startPayCycle(bodyObj) {
    try {
      const createObj = {
        vendor: this.mongoose.Types.ObjectId(bodyObj.vendor),
        amount: bodyObj.amount,
        workflow: this.mongoose.Types.ObjectId(bodyObj.workflow),
      };
      await this.paymentManager.create(createObj);
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
}

module.exports = PaymentController;
