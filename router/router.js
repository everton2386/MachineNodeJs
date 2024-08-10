const express = require("express");
const web = require("../controllers/web");
const api = require("../controllers/api");

const app = express();

app.use("/", web);
app.use("/api", api);

module.exports = app;