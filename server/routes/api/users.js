const router = require("express").Router();
const { User } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");
const authentication = require("../../util/authentication");

// find users by username
router.get("/:username", async (req, res, next) => {
  try {
    // check cookie for auth and req for the correct user id declared
    if (authentication.isRouteAuthenticated(req) === null) {
      return res.sendStatus(401);
    }

    const { username } = req.params;

    const users = await User.findAll({
      where: {
        username: {
          [Op.substring]: username,
        },
        id: {
          [Op.not]: req.user.id,
        },
      },
    });

    // add online status to each user that is online
    for (let i = 0; i < users.length; i++) {
      const userJSON = users[i].toJSON();
      if (onlineUsers.includes(userJSON.id)) {
        userJSON.online = true;
      }
      users[i] = userJSON;
    }
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
