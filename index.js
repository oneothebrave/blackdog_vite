(async function () {
  const express = require("express");
  const app = express();
  const mongoose = require("mongoose");
  // 通过npm install dotenv安装的插件，可以将一些机密配置写在.env文件里面，这些配置不会被别人看到
  const dotenv = require("dotenv");
  dotenv.config();

  // import routes
  const userApi = require("./routes/user_route")


  // connect db
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(() => { console.log('MongoDB database Connected...') })
    .catch(() => { (err) => { console.log(err) } });


  // MIDDLEWARES
  app.use(express.json())  // parse request body

  // route middlewares
  app.use("/api", userApi)







  // 产品环境下
  if (process.env.NODE_ENT === "production") {
    app.use(express.static("client/dist"))
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
    })
  };

  app.listen(process.env.PORT, () => {
    console.log(`We are now listening at http://localhost:${PORT}. Bee...Bee...Bee...`)
  });

})()

