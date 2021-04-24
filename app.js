(async function(){
    const express = require("express");
    const mongoose = require("mongoose");
    const {PORT, MONGO_URL} = require("./config");

    // import apis
    const userApi  = require("./api/bd_user_api")

    
    const app = express();
    
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }).then( () => {console.log('MongoDB database Connected...')} )
      .catch( () => {(err) => {console.log(err)}} );
    
    app.listen(PORT, () => {
        console.log(`We are now listening at http://localhost:${PORT}. Bee...Bee...Bee...`)
    });

    // 产品环境下
    if(process.env.NODE_ENT === "production"){
        app.use(express.static("client/dist"))
        app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
        })
    };

    // express middleware
    app.use("/api", userApi)

})()
