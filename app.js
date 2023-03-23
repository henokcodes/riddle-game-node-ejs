const express = require('express');
const routes = require("./routes/routes")
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const path = require("path");
const cookieParser = require("cookie-parser");
var ejs = require("ejs");
const methodOverride = require('method-override');

app.use(express.static('public'))
app.listen(80, () => {
    console.log('Your Server is running on 80');
})
mongoose
  .connect("mongodb://localhost:27017/riddle_game", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "html");
app.engine("html", ejs.renderFile);

app.use(methodOverride('_method'));

app.use("/",routes);