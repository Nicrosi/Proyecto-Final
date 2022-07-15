const { Score, Category, User } = require("../db");

const category = async (id) => {
  try {
    if (id) {
      const score = await Score.findByPk(id),
        category = detCategory(score);
      const categoryDb = await Category.findOrCreate({
        where: { type: category },
      });
      const categoryDbId = categoryDb[0].dataValues.id_category;
      await User.update(
        {
          id_category: categoryDbId,
        },
        {
          where: {
            id_score: id,
          },
        }
      );
      return categoryDbId;
    } else {
      const dbCategory = await Category.findAll();
      return dbCategory;
    }
  } catch (err) {
    console.log(err);
  }
};

const detCategory = ({
  previous_tournaments,
  hit_knowledge,
  other_strokes,
  special_hits,
  kick_serve_control,
  game_strategy,
}) => {
  let category;
  if (previous_tournaments > 1) {
    if (
      hit_knowledge >= 4 &&
      other_strokes >= 3 &&
      special_hits >= 2 &&
      kick_serve_control >= 3 &&
      game_strategy > 3
    ) {
      category = "A";
    } else if (
      hit_knowledge >= 3 &&
      other_strokes >= 2 &&
      special_hits >= 1 &&
      kick_serve_control >= 2 &&
      game_strategy > 1
    ) {
      category = "B";
    } else if (
      hit_knowledge >= 2 &&
      other_strokes >= 1 &&
      special_hits >= 0 &&
      kick_serve_control >= 1 &&
      game_strategy > 0
    ) {
      category = "C";
    } else {
      category = "E";
    }
  } else {
    category = "E";
  }
  return category;
};

module.exports = {
  category,
};

//with promedy
/* const detCategory = (score) => {
  let category;
  if (score.previous_tournaments > 1) {
    const scoreAcum =
      score.hit_knowledge +
      score.other_strokes +
      score.special_hits +
      score.kick_serve_control +
      score.game_strategy;
    if (scoreAcum >= 16) {
      category = "A";
    } else if (scoreAcum >= 9) {
      category = "B";
    } else if (scoreAcum >= 4) {
      category = "C";
    } else {
      category = "E";
    }
  } else {
    category = "E";
  }
  return category;
}; */
