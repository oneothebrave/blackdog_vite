const router = require("express").Router();
const workModel = require("../models/Work");
const jwt = require("jsonwebtoken");
const verifyToken = require("../util/verifyToken");
// express解析formdata需要用到
const formidableMiddleware = require('express-formidable');
const fs = require("fs");
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
    const formUploader = new qiniu.form_up.FormUploader();
    const putExtra = new qiniu.form_up.PutExtra();
    const key = req.fields.workFileName;

    // 接收前端图片数据流
    const workFile = req.fields.workFile;
    // 构建图片名 这个主要是生成唯一图片名字利于存储 当然为了方便就写时间戳 实际开发可千万别 可能出现两人同一时间
    const fileName = Date.now() + '.png';
    // 构建图片路径 需要在上一层目录下新建一个image
    const filePath = './.tmp/' + fileName;
    // 过滤data:URL
    const base64Data = workFile.replace(/^data:image\/\w+;base64,/, "");
    const dataBuffer = new Buffer.from(base64Data, 'base64');
    let workFileUrl = null;

    const token = req.header("auth-token");
    const userId = jwt.decode(token)._id
    // 思路是通过fs.writeFile把图片保存到本地，再上传本地的地址，最后删除本地的图片缓存
    fs.writeFile(filePath, dataBuffer, function(err){
        if(err){
            console.log(JSON.stringify({status: '102', msg: '文件写入失败:'+err}))
        }else{
            formUploader.putFile(uploadToken, key, filePath, putExtra,
                async function (respErr, respBody, respInfo) {
                    if (respErr) {
                        console.log(JSON.stringify({ status: '-1', msg: '上传失败', error: respErr }));
                    }
                    if (respInfo.statusCode == 200) {
                        workFileUrl = process.env.QINIU_DOMAIN + respBody.key;
                        console.log(JSON.stringify({ status: '200', msg: '上传成功', imageUrl: workFileUrl }));
                        const new_work = workModel({
                            workName: req.fields.workName,
                            workIntro: req.fields.workIntro,
                            workFile: workFileUrl,
                            userId: userId
                        });
                    
                        try {
                            await new_work.save();
                            res.status(200).send({ _id: new_work._id });
                        } catch (err) {
                            res.status(400).send(err);
                        }
                    
                    } else {
                        console.log(JSON.stringify({ status: '-1', msg: '上传失败', error: JSON.stringify(respBody) }));
                    }
                    // 上传之后删除本地文件
                    fs.unlinkSync(filePath);
                }
            );
        }
    });



    

    

});






module.exports = router