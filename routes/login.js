var express = require("express");
var router = express.Router();
const passport = require('passport');

let loginController = require("../controllers/login");

router.get("/", loginController.displayLogin);

router.post("/", loginController.processLogin);

module.exports = router;
