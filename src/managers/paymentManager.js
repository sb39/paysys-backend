class PaymentManager {
  constructor(wagner) {
    this.wagner = wagner;
    this.payments = this.wagner.get('Payments');
  }

  async create(obj) {
    try {
      await this.payments.create(obj);
      return true;
    } catch (error) {
      throw error;
    }
  }
  async get(condition) {
    try {
      const payments = await this.payments
        .findOne(condition, { __v: 0 })
        .populate([
          {
            path: 'vendor',
            select: '-_id -password -accessToken -createdAt -updatedAt -__v',
          },
          {
            path: 'workflow',
            select: '-_id -levelArrangements._id -createdAt -updatedAt -__v',
          },
        ]);
      return payments;
    } catch (error) {
      throw error;
    }
  }
  async getAll(condition) {
    try {
      const payments = await this.payments
        .find(condition, { __v: 0 })
        .populate([
          {
            path: 'vendor',
            select: '-_id -password -accessToken -createdAt -updatedAt -__v',
          },
          {
            path: 'workflow',
            select: '-_id -levelArrangements._id -createdAt -updatedAt -__v',
          },
        ]);
      return payments;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PaymentManager;
