const express = require('express')
const {connection} = require('./db')
require("dotenv").config()
const {userRouter} = require("./routes/user.routes")
const {noteRouter} = require("./routes/notes.routes")
const {auth} = require("./middlewares/note.middleware")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/users",userRouter)
app.use(auth)
app.use("/notes",noteRouter)


app.listen(process.env.port, async ()=>{
    await connection
    console.log('Server is running at port 8080')
})






