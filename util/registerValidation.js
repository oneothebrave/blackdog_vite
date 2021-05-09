// @hapi/joi 就是一个检查的工具
const joi = require("@hapi/joi");
const userModel = require("../models/User");

// register validation
const registerValidation = async (data) => {
    const schema = joi.object({
        username: joi.string().min(6).required(),
        password: joi.string().min(6).required(),
        email: joi.string().required().email(),
        avatar: joi.string()
    });

    // lets validate the data before we commit a user using joi
    // basic data format checking
    const { error } = schema.validate(data);
    if(error){
        return error.details[0].message;
    }

    // check if username already exists
    const username = await userModel.findOne({username: data.username});
    if(username){
        return "This name has been used."
    }

    // check if email already exists
    const emailExist = await userModel.findOne({email: data.email});
    if(emailExist){
        return"Email already exists."
    }

};


module.exports.registerValidation = registerValidation;