const { Score, Category, User } = require("../db");

const category = async () => {
  const dbScore = await Score.findAll();

  const score = dbScore.forEach(async (el) => {
    if (el.previous_tournaments > 1) {
      //A,B,C
      //A
      if (el.hit_knowledge >= 4 && el.hit_knowledge >= 3) {
        if (el.other_strokes >= 3 && el.other_strokes >= 3) {
          if (el.special_hits >= 2 && el.special_hits >= 2) {
            if (el.kick_serve_control >= 3 && el.kick_serve_control >= 3) {
              if (el.game_strategy > 3) {
                await Category.findOrCreate({ where: { type: "A" } });
                const db_category = await Category.findAll({
                  where: {
                    type: "A",
                  },
                });
                const id = db_category[0].dataValues.id_category;
                const db_user = await User.update(
                  {
                    id_category: id,
                  },
                  {
                    where: {
                      id_score: el.id_score,
                    },
                  }
                );
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
                await Category.findOrCreate({ where: { type: "B" } });
                const db_category = await Category.findAll({
                  where: {
                    type: "B",
                  },
                });
                const id = db_category[0].dataValues.id_category;
                const db_user = await User.update(
                  {
                    id_category: id,
                  },
                  {
                    where: {
                      id_score: el.id_score,
                    },
                  }
                );
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
                await Category.findOrCreate({ where: { type: "C" } });
                const db_category = await Category.findAll({
                  where: {
                    type: "C",
                  },
                });
                const id = db_category[0].dataValues.id_category;
                const db_user = await User.update(
                  {
                    id_category: id,
                  },
                  {
                    where: {
                      id_score: el.id_score,
                    },
                  }
                );
              }
            }
          }
        }
      }
    }

    if (el.previous_tournaments === 0) {
      //E
      await Category.findOrCreate({ where: { type: "E" } });
      const db_category = await Category.findAll({
        where: {
          type: "E",
        },
      });
      const id = db_category[0].dataValues.id_category;
      const db_user = await User.update(
        {
          id_category: id,
        },
        {
          where: {
            id_score: el.id_score,
          },
        }
      );
    }
  });

  const dbCategory = await Category.findAll();

  return dbCategory;
};

module.exports = {
  category,
};
