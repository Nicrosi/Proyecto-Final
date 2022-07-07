const { Score, Category } = require("../db");

const category = async () => {
  const dbScore = await Score.findAll();
  let create;
  const score = dbScore.forEach((el) => {
    if (el.previous_tournaments > 1) {
      //A,B,C
      //A
      if (el.hit_knowledge >= 4 && el.hit_knowledge >= 3) {
        if (el.other_strokes >= 3 && el.other_strokes >= 3) {
          if (el.special_hits >= 2 && el.special_hits >= 2) {
            if (el.kick_serve_control >= 3 && el.kick_serve_control >= 3) {
              if (el.game_strategy > 3) {
                Category.findOrCreate({ where: { type: "A" } });
              }
            }
          }
        }
      }
      //B
      if (el.hit_knowledge >= 3 && el.hit_knowledge >= 2) {
        if (el.other_strokes >= 2 && el.other_strokes >= 2) {
          if (el.special_hits >= 1 && el.special_hits >= 1) {
            if (el.kick_serve_control >= 2 && el.kick_serve_control >= 2) {
              if (el.game_strategy > 1) {
                Category.findOrCreate({ where: { type: "B" } });
              }
            }
          }
        }
      }
      //C
      if (el.hit_knowledge >= 2 && el.hit_knowledge >= 1) {
        if (el.other_strokes >= 1 && el.other_strokes >= 1) {
          if (el.special_hits >= 0 && el.special_hits >= 0) {
            if (el.kick_serve_control >= 1 && el.kick_serve_control >= 1) {
              if (el.game_strategy === 0) {
                Category.findOrCreate({ where: { type: "C" } });
              }
            }
          }
        }
      }
    }

    if (el.previous_tournaments === 0) {
      //E
      Category.findOrCreate({ where: { type: "E" } });
    }
  });

  const dbCategory = await Category.findAll();

  return dbCategory;
};

const getCategory = async (req, res, next) => {
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
    console.log(allCategory);
    res.send(allCategory);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  getCategory,
  category,
};
