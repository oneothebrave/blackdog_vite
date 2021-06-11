const router = require("express").Router();
const workModel = require("../models/Work");
const jwt = require("jsonwebtoken");
const verifyToken = require("../util/verifyToken");
// express解析formdata需要用到
const formidableMiddleware = require('express-formidable');
const qiniu = require("qiniu");
// 通过npm install dotenv安装的插件，可以将一些机密配置写在.env文件里面，这些配置不会被别人看到
const dotenv = require("dotenv");
dotenv.config();


// qiniu configure
const mac = new qiniu.auth.digest.Mac(process.env.QINIU_ACCESSKEY, process.env.QINIU_SECRETKEY);
const qiniu_options = {
    scope: process.env.QINIU_BUCKET,
};
const putPolicy = new qiniu.rs.PutPolicy(qiniu_options);
const uploadToken = putPolicy.uploadToken(mac);


// 上传整个作品(文件+标题+简介)
router.post("/", verifyToken, formidableMiddleware(), async (req, res) => {
    const token = req.header("auth-token");
    const userId = jwt.decode(token)._id
    console.log(req)
    var formUploader = new qiniu.form_up.FormUploader();
    var putExtra = new qiniu.form_up.PutExtra();
    var key = 'test4.png';
    formUploader.put(uploadToken, key, req.fields.workFile, putExtra,
        function (respErr, respBody, respInfo) {
            if (respErr) {
                console.log(JSON.stringify({ status: '-1', msg: '上传失败', error: respErr }));
            }
            if (respInfo.statusCode == 200) {
                var imageSrc = process.env.QINIU_DOMAIN + respBody.key;
                console.log(JSON.stringify({ status: '200', msg: '上传成功', imageUrl: imageSrc }));
            } else {
                console.log(JSON.stringify({ status: '-1', msg: '上传失败', error: JSON.stringify(respBody) }));
            }
        }
    );

    // const new_work = workModel({
    //     workName: req.fields.workName,
    //     workIntro: req.fields.workIntro,
    //     workFile: req.fields.workFile,
    //     userId: userId
    // });

    // try {
    //     await new_work.save();
    //     res.status(200).send({ _id: new_work._id });
    // } catch (err) {
    //     res.status(400).send(err);
    // }


});






module.exports = router