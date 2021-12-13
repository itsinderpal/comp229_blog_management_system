const express = require("express");
const router = express.Router();
const passport = require('passport');

const loginController = require("../controllers/login");

router.get("/", loginController.displayLogin);

router.post("/", loginController.processLogin);

module.exports = router;
