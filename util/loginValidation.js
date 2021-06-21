// @hapi/joi 就是一个检查的工具
const joi = require("@hapi/joi");
const userModel = require("../models/User");
const bcrypt = require("bcryptjs");

// check if email exist  -- for login
const emailExistValidation = async (data) => {
    const schema = joi.object({
        email: joi.string().email().required()
    });

    const { error } = schema.validate(data);
    if(error){
        return error.details[0].message
    };

    const email = await userModel.findOne({email: data.email});
    if(!email){
        return "Email does not exist"
    };
};

// check if username exist -- for router examination
const usernameExistValidation = async (data) => {
    const schema = joi.object({
        username: joi.string().min(6).required()
    });

    const { error } = schema.validate(data);
    if(error){
        return {err: true, data: error.details[0].message}
    };

    const user = await userModel.findOne({username: data.username}, {avatar: 1, username: 1});
    if(!user){
        return {err: true, data:"User does not exist"}
    }else{
        return {err: false, data: user}
    }
};

// log validation
const loginValidation = async (data) => {
    const result = {};
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    });

    // lets validate the data before we commit a user using joi
    // basic data format checking
    const { error } = schema.validate(data);
    if (error) {
        result.validationError = error.details[0].message;
        return result;
    };

    // check if email exists
    const user = await userModel.findOne({email: data.email});
    if(!user){
        result.validationError ="Email does not exist.";
        return result;
    };

    // check if password correct
    const passwordCorrect = await bcrypt.compareSync(data.password, user.password);
    if(!passwordCorrect){
        result.validationError = "Password does not match your email.";
        return result;
    };

    result.user = user;

    return result;

};




module.exports.emailExistValidation = emailExistValidation;
module.exports.usernameExistValidation = usernameExistValidation;
module.exports.loginValidation = loginValidation;