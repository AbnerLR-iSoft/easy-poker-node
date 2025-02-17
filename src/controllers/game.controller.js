const { GameResults } = require("../models");
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
    let ids = userIds;
    ids.push(userStartedGameId);
    let resFindUsers = await findUsersForGame(ids);

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

    await createGameResult(players, winner);

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

const createGameResult = async (players, winner) => {
  try {
    const result = await GameResults.create({
      player_name_1: players[0]["username"],
      player_one_hand: generateHandMessage(players[0]["hand"]),
      player_name_2: players[1]["username"],
      player_two_hand: generateHandMessage(players[1]["hand"]),
      player_name_3: players[2]["username"],
      player_three_hand: generateHandMessage(players[2]["hand"]),
      player_name_4: players[3]["username"],
      player_four_hand: generateHandMessage(players[3]["hand"]),
      winner_name: winner["username"],
      winner_hand: generateHandMessage(winner["hand"]),
    });

    return {
      ok: true,
      result: result,
      msg: "Create history successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      result: null,
      msg: "Error while creating game result",
    };
  }
};

const generateHandMessage = (hand) => {
  return hand
    .map((h) => {
      return `${h.rank} of ${h.suit}`;
    })
    .toString();
};

module.exports = {
  startGame,
};
