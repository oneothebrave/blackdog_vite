
const router = require("express").Router();
const workModel = require("../models/Work");
const userModel = require("../models/User");
const limitNum = 6;


router.get("/getBasic", async (req, res) => {
    const works = await workModel.find({}, {workFile:0}).sort({date: -1}).skip(parseInt(req.query.skip)).limit(limitNum).lean(); // mongoose返回的data默认是不可编辑的，得在返回的结果后面加上.lean()才可以进行编辑 或者obj = obj.toObject()也可以
    if(works.length == 0){
        console.log("no more")
        return res.status(403).send("No more works.")
    }
    // const works = await workModel.find().sort({date: -1}).skip(parseInt(req.query.skip)).limit(limitNum).lean(); // mongoose返回的data默认是不可编辑的，得在返回的结果后面加上.lean()才可以进行编辑 或者obj = obj.toObject()也可以

    const completely_works = [];
    const findedUsers = new Map(); // 储存已经查询过的用户id与用于的map,避免重复查询
    for(let work of works){
        let author = null;
        let userId = work.userId;
        // 如果当前用户id已经被查询过
        if (findedUsers.has(userId.toString())){
            author = findedUsers.get(userId.toString())
        }else{
            author = await userModel.findById(userId);
            findedUsers.set(userId.toString(), author);
        }
        const author_name = author.username;
        const author_avatar = author.avatar;
        // work = work.toObject();
        work.authorName = author_name;
        work.authorAvatar = author_avatar;
        completely_works.push(work);
    }
    completely_works.push({"limitNum": limitNum});
    return res.status(200).send(completely_works)
});

router.get("/getWorkFile", async (req, res) => {
    const works = await workModel.find({}, {workFile:1}).sort({date: -1}).skip(parseInt(req.query.skip)).limit(limitNum).lean();
    return res.status(200).send(works)
    
});





module.exports = router