const router = require("express").Router();
const userModel = require("../models/User"); // 引入 Model
const bcrypt = require("bcryptjs"); // 加密密码的插件
const jwt = require("jsonwebtoken");
const { registerValidation } = require("../util/registerValidation"); // 注册验证中间件
const { loginValidation, emailExistValidation, usernameExistValidation } = require("../util/loginValidation");
const verifyToken = require("../util/verifyToken"); // token middleware

// 注册
router.post("/register", async (req, res) => {
    // validations
    const validationError = await registerValidation(req.body);
    if (validationError) {
        return res.status(400).send(validationError);
    }
    // hash password
    const salt = await bcrypt.genSalt(10); //生成一个盐值(别疑惑，文档就是这么写的)，默认是计算12次。
    const hassedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user instantce to save
    const new_user = new userModel({
        username: req.body.username,
        password: hassedPassword,
        email: req.body.email
    });

    try {
        await new_user.save();
        res.status(200).send({ user: new_user._id })
    } catch (err) {
        res.status(400).send(err);
    };
});

// 邮箱是否存在(通过看邮箱是不是在数据库判断)  -- 登录时判断
router.post("/emailExist", async (req, res) => {
    const validationError = await emailExistValidation(req.body);
    if(validationError){
        return res.status(400).send(validationError);
    }else{
        return res.status(200).send(true);
    }
});

// 用户名是否存在(通过看邮箱是不是在数据库判断)  -- 跳转个人中心时判断
router.post("/usernameExist", async (req, res) => {
    const result = await usernameExistValidation(req.body);
    if(result.err){
        return res.status(400).send(result.data);
    }else{
        return res.status(200).send(result.data);
    }
});

// 登录
router.post("/login", async (req, res) => {
    // validations
    const validationResult = await loginValidation(req.body);
    if (validationResult.validationError) {
        return res.status(400).send(validationResult.validationError);
    };
    // create and assign a token !!!
    const token = jwt.sign(
        { _id: validationResult.user._id },
        process.env.TOKEN_SECRET,
        { expiresIn: 86400 }
    ); // expire in 1 day
    const user = await userModel.findOne({email: req.body.email});
    return res.status(200).json({
        "auth-token": token,
        "email": req.body.email,
        "username": user.username
        
    })
});


// 直接输url时进行验证
router.get("/auth",verifyToken, async (req, res) => {
    res.status(200).send(true)

});

// 获取用户头像
router.get("/getAvatar", async (req, res) => {
    const email = req.header('email');
    const user = await userModel.findOne({email: email});
    return res.status(200).send(user.avatar)
});
















module.exports = router