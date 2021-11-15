var express = require("express");
var router = express.Router();

let blogController = require("../controllers/blog");

router.get("/add", blogController.displayAddPage);
router.post("/add", blogController.processAddPage);

router.get("/edit/:id", blogController.displayEditPage);
router.post("/edit/:id", blogController.processEditPage);

router.get("/delete/:id", blogController.processDelete);

module.exports = router;
