var express = require("express");
var router = express.Router();

let registerController = require("../controllers/register");

router.get("/", registerController.displayRegister);

router.post("/", registerController.processRegister);

module.exports = router;
