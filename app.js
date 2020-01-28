var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("./auth/local");

var users = require("./routes/users");

var app = express();


app.use(express.static(path.join(__dirname, "public")));

app.use("/users", users);

app.listen(3100, () => {console.log("Express listening on 3100")})

module.exports = app;
