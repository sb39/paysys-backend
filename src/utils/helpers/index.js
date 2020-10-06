module.exports = (wagner) => {
  wagner.factory('GenParser', () => {
    const GeneratorParsers = require('./generator_parsers');
    return new GeneratorParsers(wagner);
  });
};
