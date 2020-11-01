const express = require("express");
const bodyParser = require("body-parser");

const config = require("./config/config");
const datasource = require("./config/datasource");
const Email = require('./utils/email');

const indexRouter = require("./routes/index");
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const authorization = require('./auth');

const app = express();
const port = 4000;
app.set('port', port);

app.config = config;
app.datasource = datasource(app);

app.email = new Email(app.config);

console.log(app.config);

app.use(bodyParser.json({
  limit:'5mb'
}));

const auth = authorization(app);
app.use(auth.initialize());
app.auth = auth;

indexRouter(app);
userRouter(app);
authRouter(app);

module.exports = app;