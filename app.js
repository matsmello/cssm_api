const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/config");
const datasource = require("./config/datasource");


const indexRouter = require("./routes/index");

const app = express();
const port = 4000;
app.set('port', port);


app.config = config;
app.datasource = datasource(app);

console.log(app.config);


indexRouter(app);


module.exports = app;