const { getCategory } = require("../utils/Category_Controllers.js");
const { Router } = require("express");
const router = Router();

router.get("/", getCategory);

module.exports = router;
