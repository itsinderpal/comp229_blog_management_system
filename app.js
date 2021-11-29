var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var session = require("express-session");
var passport = require("passport");

var passportJWT = require("passport-jwt");
var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;

var passportLocal = require("passport-local");
var localStrategy = passportLocal.Strategy;
var flash = require("connect-flash");

// routes
var indexRouter = require("./routes/index");
var blogRouter = require("./routes/blog");
var loginRouter = require("./routes/login");
var registerRouter = require("./routes/register");

var app = express();
// var passport = passport();

//Database setup
let mongoose = require("mongoose");
let dbURI = require("./config/db");

// Connect to the Database
mongoose.connect(dbURI.AtlasDB);

let mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "Connection Error:"));
mongoDB.once("open", () => {
	console.log("Connected to MongoDB...");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));

//setup express session
app.use(
	session({
		secret: "SomeSecret",
		saveUninitialized: false,
		resave: false,
	})
);

// initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// passport user configuration

// create a User Model Instance
let userModel = require("./models/user");
let User = userModel.User;

// implement a User Authentication Strategy
passport.use(User.createStrategy());

// serialize and deserialize the User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = dbURI.Secret;

let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
	User.findById(jwt_payload.id)
		.then((user) => {
			return done(null, user);
		})
		.catch((err) => {
			return done(err, false);
		});
});

passport.use(strategy);

app.use("/", indexRouter);
app.use("/blog", blogRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
