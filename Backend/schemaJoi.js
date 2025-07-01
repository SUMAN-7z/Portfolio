const Joi = require("joi");
module.exports.messageSchema = Joi.object({
  message: Joi.object({
    Name: Joi.string().required(),
    Email: Joi.string().required(),
    Message: Joi.string().required(),
  }).required(),
});
