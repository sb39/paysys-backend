module.exports = (mongoose) => {
  const usersSchema = new mongoose.Schema(
    {
      name: {
        type: String,
      },
      email: {
        type: String,
        unique: true,
        index: true,
      },
      accessToken: {
        type: String,
      },
      userType: {
        type: String,
        enum: ['User', 'Vendor'],
        default: 'User',
      },
      levelAccess: {
        type: Array,
      },
      lastloginIp: {
        type: String,
      },
      accessGrant: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User',
      },
      superUser: {
        type: Boolean,
        default: false,
      },
      password: {
        type: String,
      },
    },
    {
      timestamps: true,
    },
  );
  return mongoose.model('Users', usersSchema);
};
