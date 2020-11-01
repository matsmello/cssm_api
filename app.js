const express = require("express");
const bodyParser = require("body-parser");

const config = require("./config/config");
const datasource = require("./config/datasource");
const Email = require('./utils/email');

const indexRouter = require("./routes/index");
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const geolocalizationRouter = require('./routes/geolocalizations');
const user_acesssRouter = require('./routes/user_accesses');
const presetRouter = require('./routes/presets');
const sharingRouter = require('./routes/sharings');

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
geolocalizationRouter(app);
user_acesssRouter(app);
presetRouter(app);
sharingRouter(app);

module.exports = app;