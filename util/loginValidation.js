// @hapi/joi 就是一个检查的工具
const joi = require("@hapi/joi");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// check if account exist
const userExistValidation = async (data, res) => {
    const schema = joi.object({
        email: joi.string().email().required()
    });

    const { error } = schema.validate(data);
    if(error){
        return res.status(400).send(err.details[0].message)
    };

    const user = User.findOne({email: data.email});
    if(!user){
        return res.status(400).send("User does not exist")
    };
};

// log validation
const loginValidation = async (data, res) => {
    const result = {};
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    });

    // lets validate the data before we commit a user using joi
    // basic data format checking
    const { error } = schema.validate(data);
    if (error) {
        result.validationError = res.status(400).send(error.details[0].message);
        return result;
    };

    // check if email exists
    const user = await User.findOne({email: data.email});
    if(!user){
        result.validationError = res.status(400).send("Email does not exist.");
        return result;
    };

    // check if password correct
    const passwordCorrect = await bcrypt.compareSync(data.password, user.password);
    if(!passwordCorrect){
        result.validationError = res.status(400).send("Password does not match your email.");
        return result;
    };

    result.user = user;

    return result;

};




module.exports.userExistValidation = userExistValidation;
module.exports.loginValidation = loginValidation;