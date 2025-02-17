const { findUsersForGame } = require("./users.controller");
const { generatePlayers, generateDeck, shuffleDeck } = require("../helpers");

const startGame = async (req, res) => {
  try {
    const { userIds, userStartedGameId } = req.body;

    let resFindUsers = await findUsersForGame(userIds);

    if (resFindUsers.ok === false) {
      res.status(400).json({
        ok: false,
        players: [],
        msg: "Error while finding players for game",
      });
    }

    let players = generatePlayers(
      shuffleDeck(generateDeck()),
      resFindUsers.users
    );

    res.status(200).json({
      ok: false,
      players: players,
      msg: "Generated players for game",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      players: [],
      msg: "Error while creating game",
    });
  }
};

module.exports = {
  startGame,
};
