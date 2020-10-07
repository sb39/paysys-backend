class PaymentManager {
  constructor(wagner) {
    this.wagner = wagner;
    this.payments = this.wagner.get('Payments');
    this.status = this.wagner.get('Stat');
  }

  async create(obj) {
    try {
      const createR = await this.payments.create(obj);
      return createR;
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

  async getStat(condition) {
    try {
      const status = await this.status.findOne(condition).populate([
        {
          path: 'paymentId',
          select: '-createdAt -updatedAt -__v',
        },
      ]);
      return status;
    } catch (error) {
      throw error;
    }
  }

  async getAllStat() {
    try {
      const status = await this.status.find();
      return status;
    } catch (error) {
      throw error;
    }
  }
  async createStat(createObj) {
    try {
      const createR = await this.status.create(createObj);
      return createR;
    } catch (error) {
      throw error;
    }
  }

  async updateStat(conditions, updateObjs) {
    try {
      const u = await this.status.updateOne(conditions, updateObjs);
      if (u.nModified > 0) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async updateSubDocs(condition, subdoc) {
    console.log(condition, subdoc);
    try {
      const update = await this.status.updateOne(condition, update);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PaymentManager;
