const router = require("express").Router();
const User = require("../models/User"); // 引入 Model
const bcrypt = require("bcryptjs"); // 加密密码的插件
const jwt = require("jsonwebtoken");
const { registerValidation } = require("../util/registerValidation"); // 注册验证中间件
const { loginValidation, userExistValidation } = require("../util/loginValidation");

// 注册
router.post("/register", async (req, res) => {
    // validations
    const validationError = await registerValidation(req.body, res);
    if (validationError) {
        return validationError
    }
    // hash password
    const salt = await bcrypt.genSalt(10); //生成一个盐值(别疑惑，文档就是这么写的)，默认是计算12次。
    const hassedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user instantce to save
    const new_user = new User({
        username: req.body.username,
        password: hassedPassword,
        email: req.body.email
    });

    try {
        await new_user.save();
        res.send({ user: new_user._id })
    } catch (err) {
        res.status(400).send(err);
    };
});

// 账号是否存在(通过看邮箱是不是在数据库判断)
router.post("/userExist", async (req, res) => {
    const validationError = await userExistValidation(req.body, res);
    if(validationError){
        return validationError
    }else{
        return true
    }
});

// 登录
router.post("/login", async (req, res) => {
    // validations
    const validationResult = await loginValidation(req.body, res);
    if (validationResult.validationError) {
        return validationResult.validationError
    };

    // create and assign a token !!!
    const token = jwt.sign(
        { _id: validationResult.user._id },
        process.env.TOKEN_SECRET,
        { expiresIn: 86400 }
    ); // expire in 1 day
    res.header('auth-token', token).send("Login success!");

});
















module.exports = router