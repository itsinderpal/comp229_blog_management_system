var express = require("express");
var router = express.Router();

let loginController = require("../controllers/login");

router.get("/", loginController.displayLogin);

module.exports = router;
