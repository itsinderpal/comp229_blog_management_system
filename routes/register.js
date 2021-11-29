var express = require("express");
var router = express.Router();

let registerController = require("../controllers/register");

router.get("/register", indexController.displayRegister);

module.exports = router;
