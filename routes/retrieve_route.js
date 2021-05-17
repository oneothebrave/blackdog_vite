const router = require("express").Router();
const workModel = require("../models/Work");
const userModel = require("../models/User");
const { object } = require("@hapi/joi");



router.get("/", async (req, res) => {
    const works = await workModel.find({},{workFile: 0}).lean(); // mongoose返回的data默认是不可编辑的，得在返回的结果后面加上.lean()才可以进行编辑 或者obj = obj.toObject()也可以
    const completely_works = [];
    for(let work of works){
        const author = await userModel.findById(work.userId);
        const author_name = author.username;
        const author_avatar = author.avatar;
        // work = work.toObject();
        work.authorName = author_name;
        work.authorAvatar = author_avatar;
        completely_works.push(work);
        console.log(work)
    }
    return res.status(200).send(completely_works)
});





module.exports = router