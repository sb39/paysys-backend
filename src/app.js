const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const wagner = require('wagner-core');
const swaggerUi = require('swagger-ui-express');
const config = require('config');
const swaggerDocument = require('./endpoints-desc.json');

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

wagner.factory('mongoose', () => mongoose);

mongoose
  .connect(`${config.db.connectOn}/${config.db.dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('Sucessfully connected to mongo'))
  .catch((err) => console.log('Connection to mongoose failed', err));

app.get('/', (req, res) => res.redirect('/endpoints-docs'));
app.use('/endpoints-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require('./utils/middlewares')(wagner);
require('./utils/helpers')(wagner);
require('./controllers')(wagner);
require('./managers')(wagner);
require('./models')(wagner);
require('./routes')(app, wagner);

module.exports = app;
