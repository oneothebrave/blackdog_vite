// @hapi/joi 就是一个检查的工具
const joi = require("@hapi/joi");

// register validation
const registerValidation = (data) => {
    const schema = joi.object({
        username: joi.string().min(6).required(),
        password: joi.string().min(6).required(),
        email: joi.string().email()
    });

    // lets validate the data before we commit a user
    return schema.validate(data)
};


module.exports.registerValidation = registerValidation;