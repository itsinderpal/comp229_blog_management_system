var express = require("express");
var router = express.Router();

let loginController = require("../controllers/login");

router.get("/login", loginController.displayLogin);

module.exports = router;
