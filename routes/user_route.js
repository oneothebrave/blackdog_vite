const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs"); // 加密密码的插件
const { registerValidation } = require("../util/registerValidation");

router.post("/register", async (req, res) => {
    const { error } = registerValidation(req.body);
    console.log('------------')
    console.log(error)
    // if (error) {
    //     return res.status(400).send(error.details[0].message);
    // }

});













module.exports = router