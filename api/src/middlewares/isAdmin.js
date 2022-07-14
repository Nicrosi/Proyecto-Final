const { User } = require("../db");

const isAdmin = async (req, res, next) => {
  const { e_mail } = req;
  try {
    const user = await User.findOne({
      where: {
        e_mail: e_mail,
      },
    });
    if (!user.is_admin) {
      res.status(401).res("Unauthorized for create a sponsor!");
    }
    next();
  } catch (err) {
    res.send(err);
  }
};

module.exports = isAdmin;
