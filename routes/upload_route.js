const router = require("express").Router();
const workModel = require("../models/Work");
const jwt = require("jsonwebtoken");
const verifyToken = require("../util/verifyToken");


// 上传整个作品(文件+标题+简介)
router.post("/",verifyToken, async (req, res) => {
    const token = req.header("auth-token");
    const userId = jwt.decode(token)._id

    const new_work = workModel({
        workName: req.fields.workName,
        workIntro: req.fields.workIntro,
        workFile: req.fields.workFile,
        userId: userId
    });

    try{
        await new_work.save();
        res.status(200).send({_id: new_work._id});
    }catch(err){
        res.status(400).send(err);
    }
    

});

























module.exports = router