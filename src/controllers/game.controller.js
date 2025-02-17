const { findUsersForGame } = require("./users.controller");
const {
  generatePlayers,
  generateDeck,
  shuffleDeck,
  determineWinner,
} = require("../helpers");

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

    const players = generatePlayers(
      shuffleDeck(generateDeck()),
      resFindUsers.users
    );

    const winner = determineWinner(players);

    res.status(200).json({
      ok: false,
      players: players,
      winner: winner,
      msg: "Generated players for game",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      players: [],
      winner: null,
      msg: "Error while creating game",
    });
  }
};

module.exports = {
  startGame,
};
