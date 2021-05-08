const router = require("express").Router();
const workModel = require("../models/Work");
const jwt = require("jsonwebtoken");
const verifyToken = require("../util/verifyToken");

// 上传作品
router.post("/",verifyToken, async (req, res) => {
    const token = req.header("auth-token");
    const userId = jwt.decode(token)._id

    const new_work = workModel({
        workName: req.body.workName,
        workIntro: req.body.workIntro,
        workFile: req.body.workFile,
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