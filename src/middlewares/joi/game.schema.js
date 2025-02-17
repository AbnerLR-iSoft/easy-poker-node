const Joi = require("joi");

const startGameSchema = Joi.object({
  userIds: Joi.array().items(Joi.number().required()).min(3).required(),
  userStartedGameId: Joi.number().required(),
});

module.exports = {
  startGameSchema,
};
