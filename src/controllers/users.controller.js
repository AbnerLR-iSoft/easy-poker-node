const { User } = require("../models");

const findUsersForGame = async (userIds) => {
  try {
    if (userIds.length < 4) {
      return {
        ok: false,
        users: [],
        msg: "No provide four ids",
      };
    }

    const users = await User.findAll({
      where: {
        id: userIds,
      },
    });

    return {
      ok: true,
      users: users,
      msg: "Found users",
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      users: [],
      msg: "An error occurred while trying to find users",
    };
  }
};

module.exports = { findUsersForGame };
