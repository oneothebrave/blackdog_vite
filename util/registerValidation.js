// @hapi/joi 就是一个检查的工具
const joi = require("@hapi/joi");
const User = require("../models/User");

// register validation
const registerValidation = async (data, res) => {
    const schema = joi.object({
        username: joi.string().min(6).required(),
        password: joi.string().min(6).required(),
        email: joi.string().required().email()
    });

    // lets validate the data before we commit a user using joi
    // basic data format checking
    const { error } = schema.validate(data);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    // check if username already exists
    const username = await User.findOne({username: data.username});
    if(username){
        return res.status(400).send("This name has been used.")
    }

    // check if email already exists
    const emailExist = await User.findOne({email: data.email});
    if(emailExist){
        return res.status(400).send("Email already exists.")
    }

};


module.exports.registerValidation = registerValidation;