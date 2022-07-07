const { Router } = require("express");
const router = Router();
const { category } = require("../utils/Category_Controllers.js");

router.get("/", async (req, res, next) => {
  try {
    // const newScore = await Score.create({
    //   previous_tournaments: 0,
    //   hit_knowledge: 2,
    //   other_strokes: 1,
    //   special_hits: 0,
    //   kick_serve_control: 1,
    //   game_strategy: 0,
    // }); // momentaneo

    const allCategory = await category();
    res.json(allCategory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
