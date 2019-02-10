const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express();

//引入user.JS
const users = require("./routes/api/users")

//DB config
const db = require("./config/keys").mongoURL

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


//Connect to mongodb
mongoose.connect(db)
    .then(()=>console.log("MongoDB Connected"))
    .catch(err=>console.log(err.message))

// 配置路由
app.get("/",(req,res)=>{
    res.send("Hello world")
})

//使用routes
app.use("/api/users",users)


//配置端口与监听
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})

