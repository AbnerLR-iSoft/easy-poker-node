const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const GameResults = sequelize.define(
  "game_results",
  {
    player_name_1: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [1, 120],
      },
    },
    player_one_hand: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [1, 255],
      },
    },
    player_name_2: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [1, 120],
      },
    },
    player_two_hand: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [1, 255],
      },
    },
    player_name_3: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [1, 120],
      },
    },
    player_three_hand: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [1, 255],
      },
    },
    player_name_4: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [1, 120],
      },
    },
    player_four_hand: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [1, 255],
      },
    },
    winner_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [1, 120],
      },
    },
    winner_hand: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [1, 255],
      },
    },
    created_at: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  GameResults,
};
