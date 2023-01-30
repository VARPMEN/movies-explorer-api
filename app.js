require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DATABASE_URL, PORT, allowedCors } = require('./utils/config');
const routes = require('./routes/index');
const { errorHandler } = require('./middlewares/errorHandler');
const limiter = require('./middlewares/limiter');

const app = express();

app.use(cors(allowedCors));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);
app.use(helmet());
app.use(limiter);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

mongoose.connect(DATABASE_URL);

app.listen(PORT);
