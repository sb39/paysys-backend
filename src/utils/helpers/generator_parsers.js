const crypto = require('crypto');
const publicIp = require('public-ip');

class GeneratorParser {
  constructor(wagner) {
    this.wagner = wagner;
  }

  passwordEncrypter(stringInp) {
    const h = crypto.createHash('sha256');
    h.update(stringInp);
    return h.digest('hex');
  }

  tokenGenerator() {
    return crypto.randomBytes(16).toString('hex');
  }

  async ipGetter() {
    let ip = await publicIp.v4();
    if (!ip) {
      ip = await publicIp.v6();
      if (!ip) {
        ip = '';
      }
    }
    return ip;
  }

  userabstracter(user) {
    const outputObj = {
      useId: user.id,
      userType: user.userType,
      levelAccess: user.levelAccess,
      accessGrant: user.accessGrant,
      superUser: user.superUser,
      email: user.email,
      name: user.name,
      // ip_addr: user.ip_addr,
    };
    return { code: 200, data: outputObj };
  }

  passwordDecryptor(enc_password) {
    var crypt = require('crypto');
    var key = crypt.createDecipheriv(
      'aes-128-cbc',
      process.env.ENC_KEY,
      process.env.IV,
    );
    var decrypted_str = key.update(enc_password, 'hex', 'utf8');
    decrypted_str += key.final('utf8');
    return decrypted_str;
  }
}

module.exports = GeneratorParser;
