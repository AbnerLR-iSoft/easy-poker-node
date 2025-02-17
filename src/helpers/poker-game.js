const { SUITS, RANKS } = require("../constants");

const generateDeck = () => {
  let deck = [];
  for (let suit of SUITS) {
    for (let rank of RANKS) {
      deck.push({ suit, rank });
    }
  }
  return deck;
};

const shuffleDeck = (deck) => {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);
    let tmp = deck[i];
    deck[i] = deck[j];
    deck[j] = tmp;
  }
  return deck;
};

const generateHandImgs = (hand) => {
  let handImgs = hand.map((h) => {
    let handImg = `${h.rank}_${h.suit}.png`;
    return { src: handImg, alt: `${h.rank} ${h.suit}` };
  });

  return handImgs;
};

const generatePlayers = (deck, users) => {
  let newDeck = [...deck];
  let players = users.map((u) => {
    let hand = newDeck.splice(0, 5);
    let handImgs = generateHandImgs(hand);
    return {
      userId: u.id,
      username: u.username,
      hand: hand,
      handImgs: handImgs,
    };
  });

  return players;
};

const handValue = (hand) => {
  return hand.reduce((sum, card) => sum + RANKS.indexOf(card.rank), 0);
};

const determineWinner = (players) => {
  let highestValue = 0;
  let winner = null;
  players.forEach((player) => {
    const score = handValue(player.hand);
    if (score > highestValue) {
      highestValue = score;
      winner = player;
    }
  });
  return winner;
};

module.exports = {
  generateDeck,
  shuffleDeck,
  generatePlayers,
  determineWinner,
};
