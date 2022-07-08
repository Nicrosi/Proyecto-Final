const { Router } = require("express");
const router = Router();
const { category } = require("../utils/Category_Controllers.js");

router.get("/", async (req, res, next) => {
  try {
    const allCategory = await category();
    res.json(allCategory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
