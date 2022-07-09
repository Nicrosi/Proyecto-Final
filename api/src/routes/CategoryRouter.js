const { Router } = require("express");
const router = Router();
const { category } = require("../utils/Category_Controllers.js");

router.get("/", async (req, res, next) => {
  const { id_category } = req.query;
  try {
    if (id_category) {
      const user_category = await category(id_category);
      user_category
        ? res.json(user_category)
        : res.status(404).send("Category doesn't exist!");
    } else {
      const allCategory = await category();
      res.json(allCategory);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
