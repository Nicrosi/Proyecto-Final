const { Router } = require("express");
const router = Router();
const { Category } = require('../db'); 
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

router.post('/', async (req, res) => {
  let {
    type
  } = req.body;
  try {
    await Category.create({
      type
    });
    res.status(200).send('Created');
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
