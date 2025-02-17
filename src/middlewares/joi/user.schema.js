const Joi = require("joi");

const getPlayersSchema = Joi.object({
  id: Joi.string().pattern(new RegExp("^[0-9]*$")).min(1).required(),
});

module.exports = { getPlayersSchema };
