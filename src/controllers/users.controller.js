const { Op } = require("sequelize");
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

const getPlayers = async (req, res) => {
  try {
    const { id } = req.params;

    const players = await User.findAll({
      where: {
        id: {
          [Op.ne]: id,
        },
      },
      attributes: ["id", "username"],
    });

    res.status(200).json({
      ok: true,
      players: players,
      msg: "Finding players successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      ok: false,
      players: [],
      msg: "An error occurred while trying to find players",
    });
  }
};

module.exports = { findUsersForGame, getPlayers };
